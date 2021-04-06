# 20.Thread Safety

在共享内存并发中，基本上有四种方法可以确保变量访问安全：

- 限制。不在线程之间共享数据。
- 不变性。共享，但保持数据不可变
- 线程安全数据类型。将共享数据封装在现有的线程安全数据类型中，该类型可进行协调。
- 同步。使用同步防止线程同时访问变量。同步是构建自己的线程安全数据类型所需的

### 线程安全的含义
A data type or static method is threadsafe if it behaves correctly when used from multiple threads, regardless of how those threads are executed, and without demanding additional coordination from the calling code.

### Confinement 限制
Our first way of achieving thread safety is confinement . Thread confinement is a simple idea: you avoid races on mutable data by keeping that data confined to a single thread. Don’t give any other threads the ability to read or write the data directly.
变量存在单一线程， 其他线程不允许读写

避免全局变量

### 不变性

实现线程安全的第二种方法是使用不可变引用和数据类型。不变性解决了场条件的共享可变数据原因，只需使共享数据不可变来解决它。

### 线程安全数据类型

实现线程安全的第三个主要策略是将共享的可变数据存储在现有的线程安全数据类型中。

### 线程安全验证

### 概要
- 远离错误: 我们试图消除一类主要的并发错误，线程竞争，从设计层面消除它们，而不仅仅是偶然。
- 易于理解: 应用这些通用的、简单的设计模式比关于哪些线程交错是可能的和哪些不是的复杂论点更容易理解。
- 准备改变: 我们在线程安全参数中显式写下这些理由，以便维护程序员知道代码对线程安全性所依赖的是什么。