# Chapter5 Signals and Systems

## Linear time-invariant systems

In an LTI system:
- Inputs and outputs are real numbers;
- The state is some fixed number of previous inputs to the system as well as a fixed number of
previous outputs of the system; and

1. Unit sample signal 单脉冲信号(Unit impulse)

It is defined on all positive and negative integer indices as follows. 在原点值为1, 其他地方都是 0;

> Signal combinators 信号组合 (R->delay L->left shift)

此处有图

> 信号操作 (基本符合结合律和分配律)
> Sinusoidal primitives

2. 前馈系统 (LTI系统的子类) Feedforward Systems

> Difference Equation 差分方程

3. 反馈系统 Feedback Systems

4. 系统行为预测
> First order system : The system whose input-output equation is a first order differential equation is called first order system

A first-order differential equationis an equation in which ƒ(x,y) is a function of two variables defined  on a region in the xy-plane. (在xy坐标轴上定义的两个变量的函数)

> Second-order systems: As we build more complex systems, they will have multiple modes, which manifest as more complex behavior. Second-order systems are characterized by a system function whose denominator polynomial is second order; they will generally exhibit two modes.

5. summary of system behavior
- A signal is transient if it has finitely many non-zero samples. 瞬态
- Otherwise, it is persistent. 稳态
- A signal is bounded if there is exist upper and lower bound values such that the samples of
the signal never exceed those bounds; item otherwise it is unbounded.  有界/无界 信号
Now, using those terms, here is what we can say about system behavior.
- A transient input to an acyclic (feed-forward) system results in a transient output.
- A transient input to a cyclic (feed-back) system results in a persistent output.
- The poles of a system are the roots of the denominator polynomial of the system function in
1/R .
- The dominant pole is the pole with the largest magnitude.
- If the dominant pole has magnitude > 1 , then in response to a bounded input, the output
signal will be unbounded.
- If the dominant pole has magnitude < 1 , then in response to a bounded input, the output
signal will be bounded; in response to a transient input, the output signal will converge to 0 .
- If the dominant pole has magnitude 1 , then in response to a bounded input, the output signal
will be bounded; in response to a transient input, it will converge to some constant value.
- If the dominant pole is real and positive, then in response to a transient input, the signal will,
after finitely many steps, begin to increase or decrease monotonically.
- If the dominant pole is real and negative, then in response to a transient input, the signal will,
after finitely many steps, begin to alternate signs.
- If the dominant pole is complex, then in response to a transient input, the signal will, after
finitely many steps, begin to be periodic, with a period of 2π/Ω , where Ω is the ’angle’ of the
pole.