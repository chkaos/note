# 2 Models Of Computation, PythonCostModel, DocumentDistance

## 什么是算法
- Mathematical abstraction of computer program
- Computational procedure to solve a problem

计算机(计算模型)-> 计算机语言(伪代码)-> 计算程序(算法)

#### 计算模型指定
- 算法允许的操作
- 每项操作的 cost
- 算法的cost等于操作cost的总和

## Random Access Machine (RAM) && Pointer Machine

#### Random Access Machine (RAM)
在理论计算机科学中，随机存取机是一种抽象机器，属于寄存器机的一种。近似于计数器机，但是它拥有能对暂存器间接定址的能力。随机存取机是图灵机的一种，等价于通用图灵机。随机存取机属于哈佛架构，与电子计算机的特征近似；如果修改为冯纽曼架构，则成为随机存取储存程式机。 

- Random Access Memory (RAM) modeled by a big array
- Θ(1) registers (each 1 word)
- In Θ(1) time, can
  - load word @ ri into register rj
  - compute (+, −, ∗, /, &, |, ˆ) on registers
  - store register rj into memory @ ri
- What’s a word? w ≥ lg (memory size) bits
  - assume basic objects (e.g., int) fit in word
  - unit 4 in the course deals with big numbers
- realistic and powerful → implement abstractions

拓展: 随机存取存储器（英語：Random Access Memory，也叫主存）是与CPU直接交换数据的内部存储器。相似思想同缩写的一个计算机硬件.

#### Pointer Machine

在理论计算机科学中，指针机是类似于随机存取机的“原子”抽象计算机模型。指针算法是限于指针机器模型的算法。根据类型的不同，指针机器可以称为链接自动机，KU机器，SMM，原子LISP机器，树形指针机器等

- dynamically allocated objects (namedtuple)
- object has O(1) fields
- field = word (e.g., int) or pointer to object/null (a.k.a. reference)
- weaker than (can be implemented on) RAM

## Python Model
介绍了 Python的数据结构及上述计算思想的联系, 和往常一样会使用 Go 来实现相应数据结构. 包含以下但不限于:

- 栈和队列
- 链表
- 哈希表
- 拓展: 指针/对象, 有根树, 二叉搜索树, 红黑树

## 文件距离计算
距离的定义: 两个文件词频向量的夹角
用途: 寻找相似文件, 反剽窃, 搜索等

#### Document Distance Algorithm
- 将每个文件以单词为单位切割
- 统计单词频率 (document vectors)
- 计算点积 (dot product & divide)

