# 13 Breadth-first search (BFS)

### Graph Search 图搜索

graph G=(Vertices, Edges) 一个图由点和边构成

(V1,V2) 和 <V1,V2> 的区别
无向图中描述两顶点（V1 和 V2）之间的关系可以用 (V1,V2) 来表示，而有向图中描述从 V1 到 V2 的"单向"关系用 <V1,V2> 来表示。

• find a path from start vertex s to a desired vertex
• visit all vertices or edges of graph, or only those reachable from s

### 应用场景
- 爬虫
- 社交网络
- 广播
- 编程语言里的垃圾回收
- 模型检查(用于验证功能)
- 其他数学验证
- 解谜(Rubik's Cube)

### Rubik's Cube
2*2*2 的魔方可以确定在11步之内复原
3*3*3 的魔方可以确定在20步之内复原
n*n*n 的魔方 时间复杂度在O(n^2/lg n)

### 图数据结构
- 邻接表 (Adjacency list) 一个链表数组 O(V+E)
- 隐式图 (Incidence Lists)
  - 节点是对象, 将edges储存到节点上

### Breadth-First Search
- 在O(V+E)时间内访问所有节点

代码是 Incidence Lists 版本实现
~~~go
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

// FindNode 寻找节点
func (g *Graph) FindNode(id int) *GraphNode {
	for i := 0; i < len(g.nodes); i++ {
		if g.nodes[i].id == id {
			return g.nodes[i]
		}
	}
	return nil
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
~~~

### 最短路径问题
In graph theory, the shortest path problem is the problem of finding a path between two vertices (or nodes) in a graph such that the sum of the weights of its constituent edges is minimized.