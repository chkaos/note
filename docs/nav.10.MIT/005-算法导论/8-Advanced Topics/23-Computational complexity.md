# 23. Computational complexity

### P, EXP, R
P = {problems solvable in polynomial O(n^c) time}
EXP = {problems solvable in exponential O(2^(n^c)) time}
R = {有限时间内能解决的问题}  “recursive”  (!R 表示无法解决)

#### 证明某些迷题无解
- negative-weight cycle detection(P)
- n * n 象棋 (EXP)
- halting problem: 程序是否会中止 (!R)

#### 大部分决策问题是 incomputable
- 程序是二进制文本, 最终是个数字
- 决策问题(decision problem)看成输入是二进制文本返回布尔

#### NP
NP = {problems solvable in polynomial O(n^c) time via a "lucky" 算法}
- non deterministic model 非确定性算法模型
- 在计算机科学中，与确定性算法相反，非确定性算法是一种即使对于相同输入也可以在不同运行中表现出不同行为的算法。算法的运行方式可能会因运行方式而有所不同。由于争用条件，并发算法在不同的运行中执行的方式可能会有所不同。概率算法的行为取决于随机数生成器。
- Tetris 俄罗斯方块 (NP)
- 另一种说法 {decision problems with "solutions" that can be checked in polynomial O(n^c) time}
- proof of YES: list what moves to make

#### P 不等于 NP
-  cannot engineer luck
-  generating (proofs of) solutions can be harder than checking them

~[np complete](~@assets/50/np.png)

### Reductions
Convert your problem into a problem you already know how to solve (instead of solving from scratch)
像高中写作文一样, 当你不知道如何写的时候, 强行和你熟悉的写法扯上关系然后动手写....
- most common algorithm design technique
- unweighted shortest path → weighted (set weights = 1)
- min-product path → shortest path (take logs) [PS6-1]
- longest path → shortest path (negate weights) [Quiz 2, P1k]
- shortest ordered tour → shortest path (k copies of the graph) [Quiz 2, P5]
- cheapest leaky-tank path → shortest path (graph reduction) [Quiz 2, P6]

### Examples of NP-Complete Problems
- Knapsack (pseudopoly, not poly)
- 3-Partition: given n integers, can you divide them into triples of equal sum?
- Traveling Salesman Problem: shortest path that visits all vertices of a given graph
— decision version: is minimum weight ≤ x?
- longest common subsequence of k strings
- Minesweeper, Sudoku, and most puzzles
- SAT: given a Boolean formula (and, or, not), is it ever true? x and not x → NO
- shortest paths amidst obstacles in 3D
- 3-coloring a given graph
- find largest clique in a given graph