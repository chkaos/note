# 13. Abstraction Functions & Rep Invariants

### Invariants
Rep invariants can often be translated to code, and used to periodically check whether an object is in a valid state. 

例如 面向对象语言有 private 和 public 等修饰符来控制可见性, golang在package内通过首字母大小写来简单控制其可见性.

### Rep不变和抽象函数
![rep]("~@assets/60/rep.png")

### Documenting the AF, RI, and Safety from Rep Exposure

### ADT invariants replace preconditions
An enormous advantage of a well-designed abstract data type is that it encapsulates and enforces properties that we would otherwise have to stipulate in a precondition instead of a spec.

### 概要
- 在对象的生存期内，不变性是ADT对象实例始终为true的属性。
- 好的ADT会保留自己的不变式。不变式必须由创建者和生产者确定，并由观察者和变异者保留。
- rep不变式指定表示形式的合法值，并且应在运行时使用进行检查 checkRep() 。
- 抽象函数将具体表示映射到它表示的抽象值。
- 制图表达暴露威胁制图表达独立性和不变性。
今天的阅读主题与我们的优质软件的以下三个属性有关：

- 避免错误:好的ADT会保留自己的不变式，因此这些不变式不易受到ADT客户中错误的侵害，并且在ADT本身的实现中可以更容易地将违反不变式的行为隔离开来。显式说明rep不变式，并在运行时使用checkRep（）对其进行检查，这样可以更早地发现误解和错误，而不是继续使用损坏的数据结构。
- 容易明白:Rep不变式和抽象函数阐明了数据类型表示的含义以及它与抽象的关系。
- 准备好进行更改:抽象数据类型将抽象与具体表示分离开来，从而可以更改表示而不必更改客户端代码。

[链接](https://ocw.mit.edu/ans7870/6/6.005/s16/classes/13-abstraction-functions-rep-invariants/index.html#invariants)