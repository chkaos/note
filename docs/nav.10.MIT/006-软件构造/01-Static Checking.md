# 1. Static Checking

### 静态类型[参考](https://medium.com/swlh/static-typing-vs-dynamic-typing-83f0d8b82ef)

Static typing refers to when data types need to be static at run time. This means they need to be set properly at compilation and cannot change without a properly defined operation in the language

The types of all variables are known at compile time (before the program runs), and the compiler can therefore deduce the types of all expressions as well. 

像 js 这种动态语言只有在运行时才能检查到, 为了拟补一定程度上的类型检查才有了 typescript;

Here are some rules of thumb for what errors you can expect to be caught at each of these times.

Static checking can catch:

syntax errors, like extra punctuation or spurious words. Even dynamically-typed languages like Python do this kind of static checking. If you have an indentation error in your Python program, you’ll find out before the program starts running.
- wrong names, like Math.sine(2) . (The right name is sin .)
- wrong number of arguments, like Math.sin(30, 20) .
- wrong argument types, like Math.sin("30") .
- wrong return types, like return "30"; from a function that’s declared to return an int .

Dynamic checking can catch:

- illegal argument values. For example, the integer expression x/y is only erroneous when y is actually zero; otherwise it works. So in this expression, divide-by-zero is not a static error, but a dynamic error.
- unrepresentable return values, i.e., when the specific return value can’t be represented in the type.
- out-of-range indexes, e.g., using a negative or too-large index on a string.
- calling a method on a null object reference ( null is like Python None ).

### 好的程序员应该会多种类型的语言, 语言归根结底是工具, use the right tool for the job!

### 悲观主义者, 安全第一
- "测试驱动开发(Test-driven development)"
- 写好文档
- defend your code against stupidity – especially your own! Static checking helps with that.

### 总结
这门课旨在教会如何写好代码, 而不是掌握一门语言.

- 避免错误: 静态检查通过在运行时捕获类型错误和其他错误来帮助提高安全性。

- 容易明白: 因为类型在代码中明确说明，所以有助于理解。

- 容易更改: 静态检查通过识别需要串联更改的其他位置，使更改代码变得更加容易。例如，当您更改变量的名称或类型时，编译器会立即在使用该变量的所有位置显示错误，并提醒您也更新它们。