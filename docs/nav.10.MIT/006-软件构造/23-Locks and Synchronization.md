# 23.Locks and Synchronization

### 同步

由于与时处理共享可变数据引起的`Data Race`是灾难性的错误-很难发现，很难重现，很难调试——我们需要一种共享内存的并发模块彼此同步的方法。

锁是一种同步技术。锁是一种抽象，一次最多允许一个线程拥有它。持有锁是一个线程告诉其他线程的方式："我正在更改此操作，现在不要触摸它。

锁有两个操作：

- 获取允许线程获取锁的所有权。如果线程尝试获取当前由另一个线程拥有的锁，它将阻止，直到其他线程释放锁。此时，它将与尝试获取锁的所有其他线程竞争。一次最多一个线程可以拥有锁。
- 释放放弃锁的所有权，允许另一个线程获取锁的所有权。

使用锁还可以告诉编译器和处理器您同时使用共享内存，以便将寄存器和缓存刷新到共享存储。这避免了重新排序的问题，确保锁的所有者始终在查看最新的数据。

### Deadlock 死锁

由于使用锁需要线程等待（当另一个线程持有锁时阻止），因此有可能进入两个线程相互等待的情况，

###  locking

锁非常常用，Java 将它们作为内置语言功能提供。

在 Java 中，每个对象都有一个隐式关联的锁 — 数组、和您创建的每个类，它们的所有对象实例都有一个锁。即使是简单的对象也有锁，所以裸锁经常用于显式锁定

###　Locks guard access to data／Monitor pattern

### Thread safety argument with synchronization

#### 锁定约束
锁定约束是确保同步代码是线程安全的策略。我们必须满足两个条件：

每个共享的可变变量都必须由一些锁保护。除获取该锁的同步块内外，不得读取或写入数据。

如果不变变量涉及多个共享可变变量（甚至可能在不同的对象中），则所涉及的所有变量都必须由同一锁进行保护。线程获取锁后，在释放锁之前必须重新建立不变。

此处使用的监视器模式满足这两个规则。代表中所有共享的可变数据（代表不变依赖于这些数据）都由同一锁进行保护。

### 原子操作

#### Giving clients access to a lock

### Deadlock rears its ugly head
线程安全性的锁定方法非常强大，但（与限制和不变性不同）它引入了阻塞到程序中。线程有时必须等待其他线程离开同步区域，然后才能继续。阻止会增加死锁的可能性 —— 这是一种非常真实的风险，坦率地说，在此设置中，比在通过阻塞 I/O 传递的消息中（我们首先提到它的地方）中更为常见。

- Deadlock solution 1: lock ordering
- Deadlock solution 2: coarse-grained locking

### Concurrency in practice
What strategies are typically followed in real programs?

Library data structures either use no synchronization (to offer high performance to single-threaded clients, while leaving it to multithreaded clients to add locking on top) or the monitor pattern.

Mutable data structures with many parts typically use either coarse-grained locking or thread confinement. Most graphical user interface toolkits follow one of these approaches, because a graphical user interface is basically a big mutable tree of mutable objects. Java Swing, the graphical user interface toolkit, uses thread confinement. Only a single dedicated thread is allowed to access Swing’s tree. Other threads have to pass messages to that dedicated thread in order to access the tree.

Search often uses immutable datatypes. Our Boolean formula satisfiability search would be easy to make multithreaded, because all the datatypes involved were immutable. There would be no risk of either races or deadlocks.

Operating systems often use fine-grained locks in order to get high performance, and use lock ordering to deal with deadlock problems.

We’ve omitted one important approach to mutable shared data because it’s outside the scope of this course, but it’s worth mentioning: a database . Database systems are widely used for distributed client/server systems like web applications. Databases avoid race conditions using transactions , which are similar to synchronized regions in that their effects are atomic, but they don’t have to acquire locks, though a transaction may fail and be rolled back if it turns out that a race occurred. Databases can also manage locks, and handle locking order automatically. For more about how to use databases in system design, 6.170 Software Studio is strongly recommended; for more about how databases work on the inside, take 6.814 Database Systems.

And if you’re interested in the performance of concurrent programs — since performance is often one of the reasons we add concurrency to a system in the first place — then 6.172 Performance Engineering is the course for you.

### 总结
- 对数据类型进行线程安全参数，并在代码中记录它们。
- 获取锁允许线程对该锁保护的数据具有独占访问权限，从而强制其他线程阻止 — 只要这些线程也尝试获取同一锁。
- 监视器模式使用每种方法获取的单个锁保护数据类型的代表。
- 获取多个锁导致的阻止会产生死锁的可能性。