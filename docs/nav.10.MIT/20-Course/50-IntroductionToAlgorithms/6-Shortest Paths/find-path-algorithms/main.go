// https://github.com/jonatasbaldin/grokking-algorithms-golang/blob/master/ch7/dijkstra.go
package main

import (
	"fmt"
	"math"
	"sort"
	"strconv"
)

type Graph struct {
	Edges []*Edge
	Nodes map[*Node]bool
}

type Edge struct {
	Parent *Node
	Child  *Node
	Cost   int
}

type Node struct {
	Name string
}

const NegInfinity = int(^uint(0) >> 1)
const PosInfinity = math.MaxInt64

// AddEdge adds an Edge to the Graph
func (g *Graph) AddEdge(parent, child *Node, cost int) {
	edge := &Edge{
		Parent: parent,
		Child:  child,
		Cost:   cost,
	}

	g.Edges = append(g.Edges, edge)
	g.AddNode(parent)
	g.AddNode(child)
}

// AddNode adds a Node to the Graph list of Nodes, if the the node wasn't already added
// g.Nodes is a map for better caching reasons (https://www.reddit.com/r/golang/comments/diptj9/implementing_dijkstra_algorithm_in_go/f3xcffh?utm_source=share&utm_medium=web2x)
func (g *Graph) AddNode(node *Node) {
	if g.Nodes == nil {
		g.Nodes = make(map[*Node]bool)
	}

	_, ok := g.Nodes[node]
	if !ok {
		g.Nodes[node] = true
	}
}

// String returns a string representation of the Graph
func (g *Graph) String() string {
	var s string

	s += "Edges:\n"
	for _, edge := range g.Edges {
		s += edge.Parent.Name + " -> " + edge.Child.Name + " = " + strconv.Itoa(edge.Cost)
		s += "\n"
	}
	s += "\n"

	s += "Nodes: "
	i := 0
	for node, _ := range g.Nodes {
		if i == len(g.Nodes)-1 {
			s += node.Name
		} else {
			s += node.Name + ", "
		}
		i++
	}
	s += "\n"

	return s
}

// Dijkstra implements THE Dijkstra algorithm
// Returns the shortest path from startNode to all the other Nodes
func (g *Graph) Dijkstra(startNode *Node) (costTable map[*Node]int) {

	// First, we instantiate a "Cost Table", it will hold the information:
	// "From startNode, what's is the cost to all the other Nodes?"
	// When initialized, It looks like this:
	// NODE  COST
	//  A     0    // The startNode has always the lowest cost to itself, in this case, 0
	//  B    Inf   // the distance to all the other Nodes are unknown, so we mark as Infinity
	//  C    Inf
	// ...
	costTable = g.NewCostTable(startNode, "Dijkstra")

	// An empty list of "visited" Nodes. Everytime the algorithm runs on a Node, we add it here
	var visited []*Node

	// A loop to visit all Nodes
	for len(visited) != len(g.Nodes) {

		// Get closest non visited Node (lower cost) from the costTable
		node := getClosestNonVisitedNode(costTable, visited)

		// Mark Node as visited
		visited = append(visited, node)

		// Get Node's Edges (its neighbors)
		nodeEdges := g.GetNodeEdges(node)

		for _, edge := range nodeEdges {

			// The distance to that neighbor, let's say B is the cost from the costTable + the cost to get there (Edge cost)
			// In the first run, the costTable says it's "Infinity"
			// Plus the actual cost, let's say "5"
			// The distance becomes "5"
			distanceToNeighbor := costTable[node] + edge.Cost

			// If the distance above is lesser than the distance currently in the costTable for that neighbor
			if distanceToNeighbor < costTable[edge.Child] {

				// Update the costTable for that neighbor
				costTable[edge.Child] = distanceToNeighbor
			}
		}
	}

	return costTable
}

// BellmanFord 实现, 时间复杂度O(VE)
func (g *Graph) BellmanFord(startNode *Node) (costTable map[*Node]int) {

	// First, we instantiate a "Cost Table", it will hold the information:
	// "From startNode, what's is the cost to all the other Nodes?"
	// When initialized, It looks like this:
	// NODE  COST
	//  A     0    // The startNode has always the lowest cost to itself, in this case, 0
	//  B    POSInf   // the distance to all the other Nodes are unknown, so we mark as Infinity
	//  C    POSInf
	// ...
	costTable = g.NewCostTable(startNode, "BellmanFord")

	// An empty list of "visited" Nodes. Everytime the algorithm runs on a Node, we add it here
	var visited []*Node

	// A loop to visit all Nodes
	for len(visited) != len(g.Nodes) {

		// Get closest non visited Node (lower cost) from the costTable
		node := getClosestNonVisitedNode(costTable, visited)

		// Mark Node as visited
		visited = append(visited, node)

		// Get Node's Edges (its neighbors)
		nodeEdges := g.GetNodeEdges(node)

		for _, edge := range nodeEdges {

			if costTable[edge.Parent] != PosInfinity && costTable[edge.Child] > costTable[edge.Parent]+edge.Cost {
				costTable[edge.Child] = costTable[edge.Parent] + edge.Cost
			}
		}
	}

	return costTable
}

// NewCostTable returns an initialized cost table for the Dijkstra algorithm work with
// by default, the lowest cost is assigned to the startNode – so the algorithm starts from there
// all the other Nodes in the Graph receives the Infinity value
func (g *Graph) NewCostTable(startNode *Node, method string) map[*Node]int {
	costTable := make(map[*Node]int)
	costTable[startNode] = 0

	for node := range g.Nodes {
		if node != startNode {
			if method == "Dijkstra" {
				costTable[node] = NegInfinity
			} else {
				costTable[node] = PosInfinity
			}
		}
	}

	return costTable
}

// GetNodeEdges returns all the Edges that start with the specified Node
// In other terms, returns all the Edges connecting to the Node's neighbors
func (g *Graph) GetNodeEdges(node *Node) (edges []*Edge) {
	for _, edge := range g.Edges {
		if edge.Parent == node {
			edges = append(edges, edge)
		}
	}

	return edges
}

// getClosestNonVisitedNode returns the closest Node (with the lower cost) from the costTable
// **if the node hasn't been visited yet**
func getClosestNonVisitedNode(costTable map[*Node]int, visited []*Node) *Node {
	type CostTableToSort struct {
		Node *Node
		Cost int
	}
	var sorted []CostTableToSort

	// Verify if the Node has been visited already
	for node, cost := range costTable {
		var isVisited bool
		for _, visitedNode := range visited {
			if node == visitedNode {
				isVisited = true
			}
		}
		// If not, add them to the sorted slice
		if !isVisited {
			sorted = append(sorted, CostTableToSort{node, cost})
		}
	}

	// We need the Node with the lower cost from the costTable
	// So it's important to sort it
	// Here I'm using an anonymous struct to make it easier to sort a map
	sort.Slice(sorted, func(i, j int) bool {
		return sorted[i].Cost < sorted[j].Cost
	})

	return sorted[0].Node
}

func main() {
	a := &Node{Name: "a"}
	b := &Node{Name: "b"}
	c := &Node{Name: "c"}
	d := &Node{Name: "d"}
	e := &Node{Name: "e"}
	f := &Node{Name: "f"}
	g := &Node{Name: "g"}

	graph := Graph{}
	graph.AddEdge(a, c, 2)
	graph.AddEdge(a, b, 5)
	graph.AddEdge(c, b, 1)
	graph.AddEdge(c, d, 9)
	graph.AddEdge(b, d, 4)
	graph.AddEdge(d, e, 2)
	graph.AddEdge(d, g, 30)
	graph.AddEdge(d, f, 10)
	graph.AddEdge(f, g, 1)

	fmt.Println(graph.String())

	// costTable := graph.Dijkstra(a)
	costTable := graph.BellmanFord(a)

	// Make the costTable nice to read :)
	for node, cost := range costTable {
		fmt.Printf("Distance from %s to %s = %d\n", a.Name, node.Name, cost)
	}

	// Executes exercises from other file
	// Exercises()
}
