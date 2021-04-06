(window.webpackJsonp=window.webpackJsonp||[]).push([[54],{427:function(e,t,r){"use strict";r.r(t);var a=r(45),n=Object(a.a)({},(function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[r("h1",{attrs:{id:"_1-static-checking"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#_1-static-checking"}},[e._v("#")]),e._v(" 1. Static Checking")]),e._v(" "),r("h3",{attrs:{id:"静态类型参考"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#静态类型参考"}},[e._v("#")]),e._v(" 静态类型"),r("a",{attrs:{href:"https://medium.com/swlh/static-typing-vs-dynamic-typing-83f0d8b82ef",target:"_blank",rel:"noopener noreferrer"}},[e._v("参考"),r("OutboundLink")],1)]),e._v(" "),r("p",[e._v("Static typing refers to when data types need to be static at run time. This means they need to be set properly at compilation and cannot change without a properly defined operation in the language")]),e._v(" "),r("p",[e._v("The types of all variables are known at compile time (before the program runs), and the compiler can therefore deduce the types of all expressions as well.")]),e._v(" "),r("p",[e._v("像 js 这种动态语言只有在运行时才能检查到, 为了拟补一定程度上的类型检查才有了 typescript;")]),e._v(" "),r("p",[e._v("Here are some rules of thumb for what errors you can expect to be caught at each of these times.")]),e._v(" "),r("p",[e._v("Static checking can catch:")]),e._v(" "),r("p",[e._v("syntax errors, like extra punctuation or spurious words. Even dynamically-typed languages like Python do this kind of static checking. If you have an indentation error in your Python program, you’ll find out before the program starts running.")]),e._v(" "),r("ul",[r("li",[e._v("wrong names, like Math.sine(2) . (The right name is sin .)")]),e._v(" "),r("li",[e._v("wrong number of arguments, like Math.sin(30, 20) .")]),e._v(" "),r("li",[e._v('wrong argument types, like Math.sin("30") .')]),e._v(" "),r("li",[e._v('wrong return types, like return "30"; from a function that’s declared to return an int .')])]),e._v(" "),r("p",[e._v("Dynamic checking can catch:")]),e._v(" "),r("ul",[r("li",[e._v("illegal argument values. For example, the integer expression x/y is only erroneous when y is actually zero; otherwise it works. So in this expression, divide-by-zero is not a static error, but a dynamic error.")]),e._v(" "),r("li",[e._v("unrepresentable return values, i.e., when the specific return value can’t be represented in the type.")]),e._v(" "),r("li",[e._v("out-of-range indexes, e.g., using a negative or too-large index on a string.")]),e._v(" "),r("li",[e._v("calling a method on a null object reference ( null is like Python None ).")])]),e._v(" "),r("h3",{attrs:{id:"好的程序员应该会多种类型的语言-语言归根结底是工具-use-the-right-tool-for-the-job"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#好的程序员应该会多种类型的语言-语言归根结底是工具-use-the-right-tool-for-the-job"}},[e._v("#")]),e._v(" 好的程序员应该会多种类型的语言, 语言归根结底是工具, use the right tool for the job!")]),e._v(" "),r("h3",{attrs:{id:"悲观主义者-安全第一"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#悲观主义者-安全第一"}},[e._v("#")]),e._v(" 悲观主义者, 安全第一")]),e._v(" "),r("ul",[r("li",[e._v('"测试驱动开发(Test-driven development)"')]),e._v(" "),r("li",[e._v("写好文档")]),e._v(" "),r("li",[e._v("defend your code against stupidity – especially your own! Static checking helps with that.")])]),e._v(" "),r("h3",{attrs:{id:"总结"}},[r("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[e._v("#")]),e._v(" 总结")]),e._v(" "),r("p",[e._v("这门课旨在教会如何写好代码, 而不是掌握一门语言.")]),e._v(" "),r("ul",[r("li",[r("p",[e._v("避免错误: 静态检查通过在运行时捕获类型错误和其他错误来帮助提高安全性。")])]),e._v(" "),r("li",[r("p",[e._v("容易明白: 因为类型在代码中明确说明，所以有助于理解。")])]),e._v(" "),r("li",[r("p",[e._v("容易更改: 静态检查通过识别需要串联更改的其他位置，使更改代码变得更加容易。例如，当您更改变量的名称或类型时，编译器会立即在使用该变量的所有位置显示错误，并提醒您也更新它们。")])])])])}),[],!1,null,null,null);t.default=n.exports}}]);