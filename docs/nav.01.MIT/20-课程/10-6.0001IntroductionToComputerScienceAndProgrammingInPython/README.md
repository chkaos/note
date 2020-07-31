6.0001 Introduction to Computer Science and Programming in Python is intended for students with little or no programming experience. It aims to provide students with an understanding of the role computation can play in solving problems and to help students, regardless of their major, feel justifiably confident of their ability to write small programs that allow them to accomplish useful goals. The class will use the Python 3.5 programming language.

This is a half-semester course. Students who successfully complete 6.0001 may continue into 6.0002 Introduction to Computational Thinking and Data Science, which is taught in the second half of the semester.

前面基础内容包括课堂习题是1.5倍速快速过了一遍, 换了个老爷子来讲，不太习惯声音没办法只能原速慢慢看，后面部分相对比较难，老爷子水平还是很牛的。暂时无意学习新的语言 Python, 所以题目解答用了Go尽量还原练练手，除了面向对象和继承那一块用了Js。
因为是入门级科目，总体来说大部分内容都是了解过的，所以只对模糊或者比较难的知识点做记录。

课程参考资料来源: 
https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/6-0001-introduction-to-computer-science-and-programming-in-python-fall-2016/

(问题解答在这)[https://github.com/chkaos/mit-solution/6.0001]


## 	1.What is computation?
计算机的作用: 
- 功能上执行计算和记住运算的结果；
- A computer does two things, and two things only: it performs calculations and it remembers the results of those calculations.

算力受到计算速度和储存计算结果的能力影响。即使是现代计算机仍然存在超出现代计算模型的问题例如气候变化之类

Types of knowledge
- Declarative Knowledge(声明式知识):tell you what; 陈述性知识
- Imperative Knowledge(命令式知识): tell you how;像菜谱，跟随预设好的步骤一步步进行烹饪做出美味佳肴...一系列简单步骤以及指定何时执行每个步骤的控制流程，这样的描述称为算法。

how to capture a recipe in a mechanical process
- fixed program computer: calculator 固定式计算机，只能完成固定的任务
- stored program computer : machine stores and executes instructions 可以保存不同指令序列并执行

1936年，英国数学家艾伦·图灵（Alan Turing）设想了可对输入进行运算的理论机器模型称为通用图灵机。这种机器具有磁带形式的无限制内存，可以在其上写0和1，以及一些非常简单的原始指令来移动，读取和写入磁带。

邱奇-图灵论题认为「任何在算法上可计算的问题可由图灵机计算。

现代编程语音基本具备图灵完备性，尽管特定的编程语言可能在某些方面更具备有优势，但是理论上任意功能可以在不同语言上迁移。所有语言在计算能力上都是平等的。所以过分追寻某门特定的语言乃至框架是很愚蠢的决定。

BASIC MACHINE ARCHITECTURE
MEMORY：指令写入内存
CONTROL UNIT
ARITHMETIC LOGIC UNIT
INPUT OUTPUT

和js一样，python也有万物皆对象这么一说。

integrated development environment (IDE) : 集成开发环境

从第二节开始，很大部分内容讲解了Python的各种数据类型及其操作，控制流，函数、常用的api等编程语言基本元素不再赘述。看书这些章节会快速过并完成对应的finger excercise。

## 	2.Branching and Iteration

## 	3.String Manipulation, Guess and Check, Approximations, Bisection

二分法

## 	4.Decomposition, Abstractions, Functions
Decomposition: 合理地将问题逐步分解成的不同独立的小模块

Abstraction: 抽象, 隐藏细节. 即不需要了解内部构造及其原理也可以使用. 有效使用抽象的关键在于寻找一种适用于抽象的构建者和抽象的潜在客户的相关性概念.
。
## 	5.Tuples, Lists, Aliasing, Mutability, Cloning

Higher-order programming is a style of computer programming that uses software components, like functions, modules or objects, as values. It is usually instantiated with, or borrowed from, models of computation such as lambda calculus which make heavy use of higher-order functions.

## 	6. Recursion, Dictionaries
 递归(recursion): 在数学与计算机科学中，语义上是指在函数的定义中使用函数自身的方法
 <!-- 计算机科学中，分治法是建基于多项分支递归的一种很重要的算法范式。字面上的解释是“分而治之”，就是把一个复杂的问题分成两个或更多的相同或相似的子问题，直到最后子问题可以简单的直接求解，原问题的解即子问题的解的合并。这个技巧是很多高效算法的基础，如排序算法、傅立叶变换。 -->
 汉娜塔 斐波那契优化 利用字典缓存计算过的结果

Algorithmically: a way to design soluSons to problems
by divide-and-conquer or decrease-and-conquer
◦ reduce a problem to simpler versions of the same
problem
 SemanScally: a programming technique where a
func0on calls itself
◦ in programming, goal is to NOT have infinite recursion
◦ must have 1 or more base cases that are easy to solve
◦ must solve the same problem on some other input with the goal
of simplifying the larger problem input

## 	7. Testing, Debugging, Exceptions, Assertions

## 	8. Object Oriented Programming

## 	9.	Python Classes and Inheritance

## 	10-11. Understanding Program Efficiency

##  12.	Searching and Sorting