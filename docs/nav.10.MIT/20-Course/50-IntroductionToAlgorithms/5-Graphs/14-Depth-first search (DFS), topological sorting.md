# 14 Depth-first search (DFS), topological sorting

### DFS
- 递归, 回溯

```go
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
```

### Edge Classification
- tree edge(父指针): visit new vertex via edge
- forward edge: to descendant
- backward edge: to ancestor
- cross edge: to siblings (子树之间的边)

无向图只有1和4

一种在有向图判断一条边是向前/向后的方法是统计他们被访问的次数

### Cycle Detection

如果存在 backward edge, 则存在至少一个循环

### 任务调度
Given Directed Acylic Graph (DAG), where vertices represent tasks & edges represent dependencies, order tasks without violating dependencies

lower order to higher order

### Topological Sort 拓扑排序
Reverse of DFS finishing times (time at which DFS-Visit(v) finishes)
有向图的拓扑排序是对其顶点的一种线性排序，使得对于从顶点 u 到顶点 v的每个有向边 uv，u 在排序中都在 v 之前