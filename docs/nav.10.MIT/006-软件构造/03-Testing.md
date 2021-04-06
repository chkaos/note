# 3. Testing

### 验证方式
- Formal reasoning about a program
- 代码审查
- 测试

以下是 每千位（一千行源代码）的一些典型 残留缺陷率 （软件交付后遗留的bug）：

1-10个缺陷/千位：典型的行业软件。
0.1-1个缺陷/千位：高质量验证。Java库可能会达到这种正确性级别。
0.01-0.1个缺陷/千公里：最好的，对安全性至关重要的验证。NASA和Praxis等公司都可以达到这一水平。

### 软件测试为什么难
- Exhaustive testing is infeasible. 事无俱细的测试方法是不可行的
- Haphazard testing 过于浅尝即止的测试
- 随机或统计测试 不适用于软件。其他工程学科可以测试少量随机样本（例如，制造的硬盘的1％），并推断整个生产批次的缺陷率。物理系统可以使用许多技巧来加快时间，例如在24小时内打开冰箱1000次而不是10年。这些技巧给出了已知的故障率（例如，硬盘的平均寿命），但它们在缺陷空间中具有连续性或一致性。对于物理伪像来说确实如此。

> Testing requires having the right attitude. When you’re coding, your goal is to make the program work, but as a tester, you want to make it fail .

### Test-first Programming
Test early and often. Don’t leave testing until the end, when you have a big pile of invalidated code. Leaving testing until the end only makes debugging longer and more painful, because bugs may be anywhere in your code. It’s far more pleasant to test your code as you develop it.

测试驱动过程: 

1. Write a specification for the function.
2. Write tests that exercise the specification.
3. Write the actual code. Once your code passes the tests you wrote, you’re done.

### 通过分区选择测试用例
创建一个好的测试套件是一个具有挑战性和有趣的设计问题。我们想选择一组测试用例，这些测试用例足够小，可以快速运行，但又足够大，可以验证程序。

划分函数的输入空间: 我们将输入空间划分为子域 ，每个子域由一组输入组成。子域合在一起完全覆盖了输入空间，因此每个输入都位于至少一个子域中。然后，我们从每个子域中选择一个测试用例，这就是我们的测试套件。

### 覆盖范围
判断测试套件的一种方法是询问其如何充分执行程序。这个概念称为 覆盖率 。以下是三种常见的覆盖范围：

语句覆盖率 ：每个语句是否由某个测试用例运行？
分支覆盖 ：对于程序中的每个 if 或 while 语句，某个测试用例是否同时遵循正确与错误的方向？
路径覆盖 ：某个测试用例是否采用了分支的所有可能组合（贯穿程序的每个路径）？

### Unit Testing and Stubs
一个经过良好测试的程序将对其包含的每个模块（模块是方法或类）进行测试。隔离测试单个模块的测试称为 单元测试 。隔离地测试模块可以使调试更加容易。当某个模块的单元测试失败时，您可以更有信心在该模块中找到该错误，而不是在程序中的任何位置。

单元测试的对立面是 集成测试 ，它测试模块的组合，甚至整个程序。如果您拥有的只是集成测试，那么当测试失败时，您必须寻找错误。

自动化测试 是指运行测试并自动检查其结果。测试驱动程序不应是交互式程序，它会提示您输入信息并打印出结果以供您手动检查。相反，测试驱动程序应在固定的测试用例上调用模块本身，并自动检查结果是否正确。

一旦有了测试自动化，在修改代码时重新运行测试就非常重要。这样可以防止您的程序 退步 -修复新错误或添加新功能时会引入其他错误。每次更改后运行所有测试称为 回归测试 。

### 总结
- 避免错误:测试是关于在代码中发现错误，而测试优先编程是关于在引入错误之后尽快发现它们。

- 容易明白:测试不能像代码审查那样帮助您。

- 准备好进行更改:通过编写仅依赖于规范中行为的测试来考虑是否准备好进行更改。我们还讨论了自动回归测试，该测试有助于防止对代码进行更改时错误再次出现。