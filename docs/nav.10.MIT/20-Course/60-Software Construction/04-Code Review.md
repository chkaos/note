# 04. Code Review

### 代码审查
目的: 
- 改进代码: 查找错误，预见可能的错误，检查代码的清晰度以及检查与项目样式标准的一致性
- 改进程序员: 代码审查是程序员彼此学习和教导的重要方式，涉及新的语言功能，项目设计或其编码标准的更改以及新技术。特别是在开源项目中，在代码审查的上下文中发生的很多对话。

#### 代码标准
大多数公司和大型项目都有编码样式标准（例如 Google Java Style）。这些可以变得非常详细，甚至可以指定空格（缩进的深度）以及大括号和括号应放在何处。这些问题通常导致`圣战`， 因为它们最终成为品味和风格的问题。

这点 Golang 官方做得很好, 制定了统一的官方代码风格.

#### DRY - Don't Repeat Yourself

#### 代码注释(好的注释应该使代码更易于理解，更易于避免错误)
注释是给人看的, 格式上尽量往可阅读方向优化.

#### Fail Fast 在编码过程中采取越早发现问题越好
越早发现问题（越接近问题的起因），就越容易解决.
#### 避免用奇怪数字做常量
There are really only two constants that computer scientists recognize as valid in and of themselves: 0, 1, and maybe 2.

不然就加注释!加注释!

#### 一个变量有且只有一个存在的目的, 并起一个好名字

#### 少用全局变量

#### 方法应该返回一个值, 而不是打印

### 总结
- 避免错误:通常，代码审查使用人工审查员来发现错误。通过DRY代码，您可以仅在一个地方修复错误，而不必担心它会传播到其他地方。注释您的假设显然可以减少其他程序员引入错误的可能性。快速失败原理会尽早发现错误。避免使用全局变量，可以更轻松地定位与变量值相关的错误，因为非全局变量只能在代码的有限位置进行更改。

- 容易明白:代码审查确实是找到晦涩或令人困惑的代码的唯一方法，因为其他人正在阅读并试图理解它。使用明智的注释，避免使用幻数，为每个变量保留一个目的，使用好名字以及很好地使用空格都可以提高代码的可理解性。

- 准备好进行更改:当经验丰富的软件开发人员完成代码审查时，他们可以提供帮助，他们可以预见可能发生的变化并提出预防措施。DRY代码更易于更改，因为更改只需在一个地方进行。返回结果而不是打印结果，使代码更容易适应新的目的。