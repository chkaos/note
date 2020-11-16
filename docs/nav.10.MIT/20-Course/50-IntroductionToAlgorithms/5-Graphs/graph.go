package main

// Graph : represents a Graph
type Graph struct {
	nodes []*GraphNode
}

// GraphNode : represents a Graph node
type GraphNode struct {
	id    int
	edges map[int]int
}

// New : returns a new instance of a Graph
func New() *Graph {
	return &Graph{
		nodes: []*GraphNode{},
	}
}

// AddNode : adds a new node to the Graph
func (g *Graph) AddNode() (id int) {
	id = len(g.nodes)
	g.nodes = append(g.nodes, &GraphNode{
		id:    id,
		edges: make(map[int]int),
	})
	return
}

// FindNode 寻找节点
func (g *Graph) FindNode(id int) *GraphNode {
	for i := 0; i < len(g.nodes); i++ {
		if g.nodes[i].id == id {
			return g.nodes[i]
		}
	}
	return nil
}

// AddEdge : adds a directional edge together with a weight
func (g *Graph) AddEdge(n1, n2 int, w int) {
	g.nodes[n1].edges[n2] = w
}

// Neighbors : returns a list of node IDs that are linked to this node
func (g *Graph) Neighbors(id int) []int {
	neighbors := []int{}
	for _, node := range g.nodes {
		for edge := range node.edges {
			if node.id == id {
				neighbors = append(neighbors, edge)
			}
			if edge == id {
				neighbors = append(neighbors, node.id)
			}
		}
	}
	return neighbors
}

// Nodes : returns a list of node IDs
func (g *Graph) Nodes() []int {
	nodes := make([]int, len(g.nodes))
	for i := range g.nodes {
		nodes[i] = i
	}
	return nodes
}

// Edges : returns a list of edges with weights
func (g *Graph) Edges() [][3]int {
	edges := make([][3]int, 0, len(g.nodes))
	for i := 0; i < len(g.nodes); i++ {
		for k, v := range g.nodes[i].edges {
			edges = append(edges, [3]int{i, k, int(v)})
		}
	}
	return edges
}

// BFS 广度优先
func (g *Graph) BFS() {
	root := g.nodes[0]
	visited := make(map[int]int)
	level := 1
	visited[root.id] = 0

	frontier := []*GraphNode{root}
	for len(frontier) > 0 {
		next := []*GraphNode{}
		for i := 0; i < len(frontier); i++ {
			edges := frontier[i].edges
			for k := range edges {
				_, ok := visited[k]
				if !ok {
					visited[k] = level
					next = append(next, g.FindNode(k))
				}
			}
		}
		frontier = next
		level++
	}
}

// DFS 深度优先
func (g *Graph) DFS() {
	root := g.nodes[0]
	parents := make(map[int]*GraphNode)
	parents[root.id] = nil

	var dfsVisit func(node *GraphNode)

	dfsVisit = func(node *GraphNode) {
		for k := range node.edges {
			_, ok := parents[k]
			if !ok {
				edgeNode := g.FindNode(k)
				parents[k] = node
				dfsVisit(edgeNode)
			}
		}
	}

	// 保证第一层离散的点被遍历到
	for i := 0; i < len(g.nodes); i++ {
		node := g.nodes[i]
		_, ok := parents[node.id]
		if !ok {
			parents[node.id] = nil
			dfsVisit(node)
		}
	}
}

func main() {

}
