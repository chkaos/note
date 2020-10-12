# Chapter 1 Software Engineering

## Modularity, abstraction, and modeling

- 模块化: 构建可复用组件
- 抽象: 隐藏模块的复杂度, 达到黑盒的效果 

We can often make a design job easier by limiting the space of possible designs, and by standardizing on:
• a basis set of primitive components;
• ways of combining the primitive components to make more complex systems;
• ways of “packaging” or abstracting pieces of a design so they can be reused (in essence creating new “primitives”); and
• ways of capturing common patterns of abstraction (essentially, abstracting our abstractions).
Very complicated design problems can become tractable using such a primitive-combinationabstraction-pattern (PCAP) approach. 

## PCAP (primitive-combination-abstraction-pattern)
- 一系列的基础组件
- 组合基础组件构成复杂系统
- 打包或抽象设计利于可复用方法
- 捕获常见抽象模式

编程语言被称为编译器或解释器，会被其他计算机程序转换为计算机的机器语言。编程语言就属于PCAP系统，提供了基础操作，组合和抽象的方式以及捕捉常用抽象模式的方式。

## 模型
简易版原型，保留了原系统的所需重要特征。难点：
- 1. 决定原系统各方面的去留
- 2. Another important dimension in modeling is whether the model is deterministic or not. We
might, for example, model the effect of the robot executing a command to set its velocity as making an instantaneous change to the commanded velocity. 

分析模型 Analytical models

模型广泛应用于分析。

综合模型 Synthetic models

综合（仿生）模型（SM）由现存的，自治的软件组件构成，这些组件的存在和目的独立于它们所包含的基础模型。它以系统的方式将这些元素组合在一起，形成一个连贯的整体。

人类使用非正式系统模型进行综合。软件文档描述各种程序功能的库用作非正式模型，程序员可以用来组装这些组件以构建新的复杂系统。

内部模型 Internal models 
在控制理论的领域中，内部模型也称为内模型，是指为了估计系统扰动的影响，而去模拟系统特定输入下反应的程序。

## 嵌入式系统 (Embedded system)
- 与环境交互，计算行为大概可以分为以下
1. 从传感器获取信息
2. 计算并缓存结果
3. 采取行动改变外界

这些操作可以以不同方式组合；

> 顺序执行: 命令式编程

> 事件驱动: 用户界面程序通常是事件驱动程序, 程序被指定为与可能发生的特定事件相关的一系列过程（称为“处理程序”或“回调”)
> 底层存在“事件循环”连续运行中，检查是否有任何触发事件发生，并且，如果有的话，调用关联的过程。

> 变换器式程序 transducer
- transducer 能感受到被测量的信息，并能将感受到的信息，按一定规律变换成为电信号或其他所需形式的信息输出，以满足信息的传输、处理、存储、显示、记录和控制等要求。
- 变换器以固定的间隔（每秒可能多次）读取所有传感器，进行少量计算，存储一些下一个所需的值计算，然后生成操作的输出值。是一种系统设计思想的参考，缺点是偏向于"命令式".

## 编程模型 
- Imperative computation: 命令式计算， 例如计算机内部的处理器
- Functional computation: 函数式计算, 更像是通过询问来获取答案。 需要条件语句/递归支持; 我们使用函数定义作为方法抽象，以及高阶函数的思想（将函数作为参数传递给其他函数）作为捕获常见高级模式的一种方式。
- 数据结构: 组合数据体现了另一种抽象的方式；比如可以构造一个社交网络。
- OOP: computation + data structures
Object-oriented programming is a style that applies the ideas of modularity and abstraction to
execution and data at the same time. 