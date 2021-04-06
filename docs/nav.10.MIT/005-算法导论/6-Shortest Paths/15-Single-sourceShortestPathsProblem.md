# 15.Single-source shortest paths problem

In many applications, each edge of a graph has an associated numerical value, called a weight. Usually, the edge weights are non- negative integers. 

Weighted graphs may be either directed or undirected. The weight of an edge is often referred to as the "cost" of the edge.

这节课简单介绍两个最短路径搜索算法 Dijkstra 和 Bellman-Ford, 其时间复杂度和路径的weight无关.

### Dijkstra O(V*logV+E)
works on non-negative, weight edges
戴克斯特拉算法使用类似广度优先搜索的方法解决赋权图的单源最短路径问题。

该算法存在很多变体：戴克斯特拉的原始版本仅适用于找到两个顶点之间的最短路径，后来更常见的变体固定了一个顶点作为源结点然后找到该顶点到图中所有其它结点的最短路径，产生一个最短路径树。

在计算机科学的人工智能等领域也被称为均一开销搜索，并被认为是最良优先搜索的一个特例.

### Bellman-Ford O(VE)
works on positive and negative, weight edges
- reverse tolls
- social networks

求解单源最短路径问题的一种算法，它的原理是对图进行 |V|-1次松弛操作，得到所有可能的最短路径。其优于迪科斯彻算法的方面是边的权值可以为负数、实现简单，缺点是时间复杂度过高，高达O(|V||E|)。但算法可以进行若干种优化，提高了效率。

寻找最短路径的同时可以搜寻 负-循环.

![Bellman-Ford-For-Non-Negative-Circles](~@assets/50/Bellman-Ford.png)

优化点:
- 最短路径的子路径均是最短路径

### 解路径图的一种思路
假如一个节点应该有2个状态， 映射出`two graphs with different states`. 