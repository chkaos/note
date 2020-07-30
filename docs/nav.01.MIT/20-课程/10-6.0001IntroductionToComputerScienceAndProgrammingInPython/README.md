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

## 	4.Decomposition, Abstractions, Functions

## 	5.Tuples, Lists, Aliasing, Mutability, Cloning

## 	6. Recursion, Dictionaries
 递归 汉娜塔 斐波那契优化 利用字典缓存计算过的结果

## 	7. Testing, Debugging, Exceptions, Assertions

## 	8. Object Oriented Programming

## 	9.	Python Classes and Inheritance

## 	10. Understanding Program Efficiency, Part 1

## 	11. Understanding Program Efficiency, Part 2

##  12.	Searching and Sorting