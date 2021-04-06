(window.webpackJsonp=window.webpackJsonp||[]).push([[66],{438:function(t,a,e){"use strict";e.r(a);var v=e(45),r=Object(v.a)({},(function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[e("h1",{attrs:{id:"_19-concurrency"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#_19-concurrency"}},[t._v("#")]),t._v(" 19.Concurrency")]),t._v(" "),e("h3",{attrs:{id:"并发"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#并发"}},[t._v("#")]),t._v(" 并发")]),t._v(" "),e("p",[t._v("并发意味着同时进行"),e("code",[t._v("多个计算")]),t._v("。并发在现代编程中无处不在：")]),t._v(" "),e("ul",[e("li",[t._v("网络中的多台计算机")]),t._v(" "),e("li",[t._v("一台计算机上运行的多个应用程序")]),t._v(" "),e("li",[t._v("一台计算机中的多个处理器（今天，通常在单个芯片上有多个处理器内核）")]),t._v(" "),e("li",[t._v("网站必须同时处理多个用户。")]),t._v(" "),e("li",[t._v("移动应用程序需要在服务器上（云端）进行一些处理。")]),t._v(" "),e("li",[t._v("图形用户界面几乎总是需要不打断用户的后台工作。例如，Eclipse仍在编辑Java代码时对其进行编译。")])]),t._v(" "),e("p",[t._v("能够并发编程在将来仍然很重要。处理器时钟速度不再增加, 而是我们在每个新一代芯片中都拥有更多的内核。因此为了使计算更快地运行，我们将必须将计算拆分为多个并行部分。")]),t._v(" "),e("h3",{attrs:{id:"两种并发编程模型"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#两种并发编程模型"}},[t._v("#")]),t._v(" 两种并发编程模型")]),t._v(" "),e("p",[t._v("共享内存。 在并发共享内存模型中，并发模块通过在内存中读写共享对象进行交互。")]),t._v(" "),e("p",[t._v("示例：")]),t._v(" "),e("ul",[e("li",[t._v("A和B可能是同一台计算机中的两个处理器（或处理器核心），共享相同的物理内存。")]),t._v(" "),e("li",[t._v("A和B可能是同一台计算机上运行的两个程序，它们可以读写的文件共享一个公共文件系统。")]),t._v(" "),e("li",[t._v("A和B可能是同一Java程序中的两个线程，它们共享相同的Java对象。")])]),t._v(" "),e("p",[t._v("信息传递。 在信息传递模型中，并发模块通过通过通信通道相互发送消息来进行交互。模块发送消息，并且将每个模块的传入消息排队等待处理。\n示例：")]),t._v(" "),e("ul",[e("li",[t._v("A和B可能是网络中的两台计算机，通过网络连接进行通信。")]),t._v(" "),e("li",[t._v("A和B可能是Web浏览器和Web服务器– A打开与B的连接并请求网页，然后B将网页数据发送回A。")]),t._v(" "),e("li",[t._v("A和B可能是即时消息客户端和服务器。")]),t._v(" "),e("li",[t._v("A和B可能是在同一台计算机上运行的两个程序，它们的输入和输出已通过管道连接，就像 ls | grep 在命令提示符下键入的一样。")])]),t._v(" "),e("h3",{attrs:{id:"进程-线程-时间分片"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#进程-线程-时间分片"}},[t._v("#")]),t._v(" 进程，线程，时间分片")]),t._v(" "),e("p",[t._v("消息传递和共享内存模型与并发模块如何通信有关。并发模块本身分为两种：进程和线程。")]),t._v(" "),e("p",[t._v("进程。进程是 与同一台计算机上的其他进程 隔离 的正在运行的程序的实例。它在机器内存中有自己的专用部分。")]),t._v(" "),e("p",[t._v("进程抽象化可以看作是一台 虚拟计算机 。它使程序感觉好像它拥有整个机器一样-就像已经创建了一个新的计算机，并拥有新的内存，只是为了运行该程序。")]),t._v(" "),e("p",[t._v("就像通过网络连接的计算机一样，进程之间通常不共享内存。一个进程根本无法访问另一个进程的内存或对象。 在大多数操作系统上， 可以 在进程之间共享内存 ，但是需要特别的努力。相比之下，新流程自动准备好进行消息传递，因为它是使用标准输入和输出流（即 您在Java中使用过的 System.out 和 System.in 流）创建的 。")]),t._v(" "),e("p",[t._v("线程 。线程是正在运行的程序内部的控制源。可以将其视为正在运行的程序中的一个位置，再加上导致该位置的方法调用堆栈（因此，线程在到达 return 语句时可以返回堆栈 ）。")]),t._v(" "),e("p",[t._v("正如进程代表虚拟计算机一样，线程抽象也代表 虚拟处理器 。生成新线程模拟了在该进程所代表的虚拟计算机中创建新处理器。这个新的虚拟处理器与进程中的其他线程运行相同的程序并共享相同的内存。")]),t._v(" "),e("p",[t._v("线程自动准备好共享内存，因为线程共享进程中的所有内存。要获得单个线程专用的“线程本地”内存，需要花费很多精力。还需要通过创建和使用队列数据结构来显式设置消息传递。我们将在以后的阅读中讨论如何做到这一点。")]),t._v(" "),e("p",[t._v("时间分片\n如何在计算机中只有一个或两个处理器的情况下有多个并发线程？当线程多于处理器时，并发是通过 时间切片 模拟的 ，这意味着处理器在线程之间切换。右图显示了如何在只有两个实际处理器的机器上对三个线程T1，T2和T3进行时间分割。在图中，时间向下进行，因此，首先一个处理器运行线程T1，另一个运行线程T2，然后第二个处理器切换到运行线程T3。线程T2只是暂停，直到在同一处理器或另一个处理器上的下一个时间片为止。")]),t._v(" "),e("p",[t._v("在大多数系统上，时间分片是不可预知的和不确定的，这意味着线程可以随时暂停或恢复。")]),t._v(" "),e("h3",{attrs:{id:"interleaving"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#interleaving"}},[t._v("#")]),t._v(" Interleaving")]),t._v(" "),e("p",[t._v("Suppose two cash machines, A and B, are both working on a deposit at the same time.")]),t._v(" "),e("h3",{attrs:{id:"race-condition"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#race-condition"}},[t._v("#")]),t._v(" race condition")]),t._v(" "),e("p",[t._v(". A race condition means that the correctness of the program (the satisfaction of postconditions and invariants) depends on the relative timing of events in concurrent computations A and B. When this happens, we say “A is in a race with B.”")]),t._v(" "),e("p",[t._v("Some interleavings of events may be OK, in the sense that they are consistent with what a single, nonconcurrent process would produce, but other interleavings produce wrong answers – violating postconditions or invariants.")]),t._v(" "),e("h3",{attrs:{id:"reordering"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#reordering"}},[t._v("#")]),t._v(" reordering")]),t._v(" "),e("h3",{attrs:{id:"并发很难测试和调试"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#并发很难测试和调试"}},[t._v("#")]),t._v(" 并发很难测试和调试")]),t._v(" "),e("p",[t._v("使用测试很难发现race condition。即使测试发现了错误，也可能很难将其本地化到导致该错误的程序部分。")]),t._v(" "),e("p",[t._v("并发错误很难复现, 很难使它们以相同的方式发生两次。指令或消息的交织取决于受环境强烈影响的事件的相对时间。延迟可能是由其他正在运行的程序，其他网络流量，操作系统调度决策，处理器时钟速度的变化等引起的。每次运行包含race condition的程序时，您可能会得到不同的行为。")]),t._v(" "),e("p",[t._v("这些bug是 heisenbug ，它们是不确定的且难以复现;\n而 bohrbug则 在您每次查看时都会反复出现, 顺序编程中的几乎所有bug都是bohrbug;")]),t._v(" "),e("h3",{attrs:{id:"概要"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#概要"}},[t._v("#")]),t._v(" 概要")]),t._v(" "),e("p",[t._v("避免错误。 并发错误是一些最难发现和修复的错误，需要仔细设计才能避免。")]),t._v(" "),e("p",[t._v("容易明白。 对于程序员而言，很难预测并发代码如何与其他并发代码交织。最好以这样一种方式来设计代码，即程序员根本不必考虑交错。")])])}),[],!1,null,null,null);a.default=r.exports}}]);