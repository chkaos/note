package main

import (
	"fmt"
)

func Exercises() {
	start := &Node{Name: "start"}
	finish := &Node{Name: "finish"}
	a := &Node{Name: "a"}
	b := &Node{Name: "b"}
	c := &Node{Name: "c"}
	d := &Node{Name: "d"}

	fmt.Println("Exercise 7.1 - A")
	g71a := Graph{}
	g71a.AddEdge(start, a, 5)
	g71a.AddEdge(start, b, 2)
	g71a.AddEdge(b, a, 8)
	g71a.AddEdge(b, c, 7)
	g71a.AddEdge(a, c, 4)
	g71a.AddEdge(a, d, 2)
	g71a.AddEdge(c, d, 3)
	g71a.AddEdge(c, finish, 6)
	g71a.AddEdge(d, finish, 1)
	costTable := g71a.Dijkstra(start)
	for node, cost := range costTable {
		fmt.Printf("Distance from %s to %s = %d\n", a.Name, node.Name, cost)
	}

	fmt.Println("Exercise 7.1 - B")
	g71b := Graph{}
	g71b.AddEdge(start, a, 10)
	g71b.AddEdge(a, c, 20)
	g71b.AddEdge(b, a, 1)
	g71b.AddEdge(c, b, 1)
	g71b.AddEdge(c, finish, 30)
	costTable = g71b.Dijkstra(start)
	for node, cost := range costTable {
		fmt.Printf("Distance from %s to %s = %d\n", a.Name, node.Name, cost)
	}

	fmt.Println("Exercise 7.1 - C")
	fmt.Println("Can't, have negative weighted edges")
}
