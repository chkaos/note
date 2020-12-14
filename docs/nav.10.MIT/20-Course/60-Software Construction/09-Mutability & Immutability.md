# 9. Mutability & Immutability

### 可变性
Some objects are mutable : they have methods that change the value of the object.

### 可变性的风险
不可变的类型更安全，更容易理解，更易于更改;

传递/返回 可变类型值都是为程序增加了不稳定性;
aliases: 对于同一可变对象有多个引用存在风险

### 可变性与合约
- Mutable objects can make simple contracts very complex
- Mutable objects reduce changeability

### Useful immutable types

### 总结
这里的关键设计原则是 不变性 ：尽可能使用不变的对象和不变的引用。让我们回顾一下不变性如何帮助实现本课程的主要目标：

- 安全的错误: 不可变的对象不易受到别名引起的错误的影响。不可变的引用始终指向同一对象。

- 容易理解: 由于不可变的对象或引用始终意味着同一件事，因此代码阅读者可以更轻松地进行推理-他们不必遍历所有代码来查找可能更改对象或引用的所有位置，因为它无法更改。

- 准备改变: 如果不能在运行时更改对象或引用，则在程序更改时不必修改依赖于该对象或引用的代码。