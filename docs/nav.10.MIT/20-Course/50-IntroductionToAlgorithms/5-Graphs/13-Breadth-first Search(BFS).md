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
- 邻接表 (Adjacency list)
- 隐式图

### Breadth-First Search