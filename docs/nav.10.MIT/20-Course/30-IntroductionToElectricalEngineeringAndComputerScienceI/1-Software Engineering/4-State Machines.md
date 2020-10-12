# Chapter 4 State Machines

## 介绍

状态机是对系统建模的一种方法，是表示有限个状态以及在这些状态之间的转移和动作等行为的数学计算模型. 其输出取决于整个历史记录的输入，而不仅仅是最近的输入。

状态机的性能由其输入历史决定;

状态机可用于建模各种系统, 例如用户界面, 对话, 航天器, DNA等各种系统

状态机模型可以是连续时间，也可以是离散时间。

在连续时间模型中，我们通常假设输入和输出的值范围为连续空间，并使用用来描述系统动力学的微分方程。这是一个有趣且重要的方法，但是很难用它来描述我们的机器人的期望行为。的读取传感器，计算和生成输出的循环本质上是离散的并且太慢可以很好地建模为连续的过程。同样，我们的控制策略通常是高度非线性且不连续的。

在本课程中，我们将专注于离散时间模型，这意味着这些模型的输入和输出是在特定的时间增量上确定的，并且同步到那些特定的时间样本。(连续时间模型在金融领域应用比较多)

## 用途
1.综合：状态机可以为嵌入式机器人或其他系统指定“程序”，输入是传感器读数，输出是控制命令。

2.分析：状态机可以描述控制系统组合的行为以及它所控制的环境；输入通常是整个的简单命令系统，并且输出是对系统状态的一些简单度量。这里的目标是分析耦合系统的全局特性，例如它是否会收敛到稳定状态状态，或者会振荡，或者会发散。

3.可预测：状态机可以描述环境的工作方式，例如，如果我从某个十字路口驶过一段路，我将最终结束。在这种情况下，输入为控制命令和输出是外部世界的状态。这样的模型可以是用于计划通过外部世界空间达到理想状态的轨迹，方法是考虑不同的行动方案，并使用模型预测其结果。


## 原始状态机
state machine (SM):
 •a set of states, S, 
 •a set of inputs, I, also called the input vocabulary, 
 •a set of outputs, O, also called the output vocabulary, 
 •a next-state function, n(it,st)7→st+1, that maps the input at time t and the state at time t to the state at time t + 1, 
 •an output function, o(it,st)7→ot, that maps the input at time t and the state at time t to the output at time t; and 
 •an initial state, s0, which is the state at time 0.

状态机最简单的一种是纯函数: 没有不同的状态, 输入和输出有直接函数关系. 
有限状态机
还有另一类大型的 SM 描述为线性非时变系统（LTI）.

## 状态机 Example
(Accumulator)[../Accumulator.js]

#### 级联组合
组合两个状态机, 第一个的输出作为第二个的输入

#### 并行组合
两个平行状态机并行, 分相同输入以及不同输入值两种情况