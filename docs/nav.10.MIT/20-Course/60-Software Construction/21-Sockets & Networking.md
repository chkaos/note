# 21.Sockets & Networking

### 客户端/服务器设计模式

在此模式中，有两种类型的进程：客户端和服务器。客户端通过连接到服务器启动通信。客户端向服务器发送请求，服务器发送回回复。最后，客户端断开连接。服务器可以同时处理来自多个客户端的连接，客户端也可能连接到多个服务器。

### Network sockets

#### ip地址
A network interface is identified by an IP address . IPv4 addresses are 32-bit numbers written in four 8-bit parts.

127.0.0.1 is the loopback or localhost address: it always refers to the local machine. Technically, any address whose first octet is 127 is a loopback address, but 127.0.0.1 is standard.

#### 主机名称，又称节点名称（nodename）

Hostnames are names that can be translated into IP addresses. A single hostname can map to different IP addresses at different times; and multiple hostnames can map to the same IP address.

#### 端口号
A single machine might have multiple server applications that clients wish to connect to, so we need a way to direct traffic on the same network interface to different processes.

Network interfaces have multiple ports identified by a 16-bit number from 0 (which is reserved, so we effectively start at 1) to 65535.

服务器进程绑定到特定端口 - 它现在正在侦听该端口。

- 端口 22 是标准 SSH 端口。当您连接到使用 SSH 时，软件会自动使用端口 22。 athena.dialup.mit.edu
- 端口 25 是标准的电子邮件服务器端口。
- 端口 80 是标准 Web 服务器端口。当您连接到 Web 浏览器中的 URL 时，它将连接到端口 80 上。 http://web.mit.edu 18.9.22.69

#### Network sockets

sockets表示客户端和服务器之间连接的一端
- listening socket is used by a server process to wait for connections from remote clients.
- A connected socket can send and receive messages to and from the process on the other end of the connection. It is identified by both the local IP address and port number plus the remote address and port, which allows a server to differentiate between concurrent connections from different IPs, or from the same IP on different remote ports.

### I/O

#### Buffers 缓冲区
客户端和服务器通过网络交换的数据以区块发送;
发送端（发送请求的客户端或发送响应的服务器）通常写入一大块（可能是整个字符串，如"HELLO，World！网络将该块分块切成数据包，并且每个数据包通过网络分别路由。另一端，接收方将数据包重新组合成字节流。

结果是一种突发的数据传输 - 当您想要读取它们时，数据可能已经存在，或者您可能需要等待它们到达并重新组合。

#### Streams　流
进入或从sockets中输入的数据是字节流。

### 阻塞
阻止意味着线程等待（不执行进一步工作），直到发生事件。我们可以用这个术语来描述方法和方法调用：如果方法是阻塞方法，那么对该方法的调用可以阻塞，等到发生某些事件后再返回调用方。

sockets输入/输出流表现出阻塞行为：

- 当传入sockets的缓冲区为空时，调用块直到数据可用。 read
- 当目标sockets的缓冲区已满时，调用将阻塞，直到空间可用。 write

阻塞发生在整个并发编程中，而不仅仅是在 I/O中（与进程进行和传输，可能通过网络、文件或与命令行或 GUI 上的用户通信，......）。并发模块不像顺序程序那样按锁步工作，因此它们通常必须等待对方在需要协调操作时赶上。

### Wire protocols

协议是一组可由两个通信方交换的信息。有线协议是一组表示为字节序列的消息，例如 hello world 和 bye（假设我们已经商定了将这些字符编码为字节的方法）。  

大多数互联网应用程序使用基于 ASCII 的简单有线协议。
- HTTP: Hypertext Transfer Protocol (HTTP) is the language of the World Wide Web.
- SMTP: Simple Mail Transfer Protocol (SMTP) is the protocol for sending email (different protocols are used for client programs that retrieve email from your inbox). 

#### [设计无线协议](https://ocw.mit.edu/ans7870/6/6.005/s16/classes/21-sockets-networking/index.html#wire_protocols)
- 保持不同消息的数量较小。最好有一些可以组合的命令和响应，而不是许多复杂的消息。
- 每个消息都应该有明确的目的和连贯的行为。
- 消息集必须足够客户端发出所需的请求，服务器必须能够传递结果。
- 争取平台独立性

序列化是将内存中的数据结构转换为易于存储或传输的格式的过程。

### 测试客户端/服务器代码

- 将网络代码与数据结构和算法分开
- 将套接字代码与流代码分开

为了隔离和测试，我们将其通常依赖的组件（来自套接字的输入/输出流）替换为满足相同规格但具有罐装行为的组件：具有固定输入的输入流和将输出存储在内存中的输出流。 

更复杂的模块的测试策略可能使用模拟对象来模拟真实客户端或服务器的行为，通过生成整个罐装交互序列并断言从其他组件接收的每条消息的正确性。

### 总结
在客户端/服务器设计模式中，并发是不可避免的：多个客户端和多个服务器在网络上连接，同时发送和接收消息，并期望及时地响应。当有其他客户端等待连接到客户端或接收答复时，阻止等待一个慢速客户端的服务器不会使这些客户端满意。同时，由于不同客户端对共享的可变数据进行并发修改而执行错误计算或返回虚假结果的服务器不会使任何人满意。

当我们设计网络客户端和服务器时，使我们的多线程代码免受错误、易于理解和随时可以更改的所有挑战都适用。这些进程彼此同时运行（如果在不同的计算机上），并且任何希望同时与多个客户端（或希望与多个服务器通信的客户端）通信的服务器都必须管理该多线程通信。