# 计划

[原文地址](http://chkaos.top/posts/6cd4881c.html)

作为一名野生程序员, 其实非常羡慕科班出身4年以上的计算机科学基础. 前端这些年看似百花齐放，各种框架,工具层出不穷但其实并没有太多新鲜的东西。 相反计算机科学基础相当长一段时间都没有大变化,基础才是真的决定了你可能达到的高度。 有了这样的想法, 决定先参考MIT的计算机专业本科课程并制定学习计划来弥补我薄弱的计算机基础.

事实证明,当你有一个想法时,大概率会有很多人已经做过...

![](https://chkaos.oss-cn-hangzhou.aliyuncs.com/image/scott-young.jpg)

国外有个博主 Scott Young 在2011年开始花了 1 年学完麻省理工 4 年计算机本科33门课程(有一门8.01 Classical Mechanics是之前学的).他的 MIT 挑战也在他本人的[博客](https://www.scotthyoung.com/blog/myprojects/mit-challenge-2/)上作了详细说明.

尽管 Scott 给出了评分标准, 但是实际学习的效果还是很难评估。 但是看了他的其他视频和博客, 的确他在学习能力这方面是毋庸置疑. 兼听则明，偏信则暗。 为了修正学习计划,我先到相关网站(知乎, quora, 油管)上看了其他人的部分评价。

整体反对的声音如下:
1. 课程只是学业的一部分, 除了教科书内容, 还有各种形式的项目, 团队协作; 缺乏人文课程, 交流密集型课程及高级本科课程（AUS）, 不算是MIT CS的完整教育.
2. 资源: 缺乏课堂以外的资源. MIT自带庞大的资源, 研究成果, 实验室, 师资等力量不可能从在网课方式上获得;
3. 课程通过评分标准过低 50%, 且自己又踢球又当裁判;
4. 时间太快: 短时间的学习后达到考试或类似问题后，知识就消失了. 因为他可以立即测试他的知识，而只需要在很短的时间内掌握该知识即可。无法确定这种方式是否对他真正有用。
5. 利益相关: 最重要的一点, Scott Young 是卖有关学习生产力之类的书籍, 这个项目用于宣传自己的成功，展示他如何以“ 4倍的速度”和 "1/100的花费" 完成MIT CS课程的工作符合他的财务和市场利益.

尽管Scott实际达到的学习效果不一定有他宣传的那个程度, 但还是有不少肯定的声音, MIT Challenge 无疑是他最成功的项目之一. 他成功地使用在线免费资源来按自己的步调学习了很多有关计算机科学的知识，这对于那些试图在不上大学的情况下学习更多知识的人来说非常有借鉴意义, 所以我也有样学样立个 FLAG, 打算给自己也来一个 MIT Challenge.

Scott是为了宣传自己的博客和书所设的项目, 为了尽量还原CS本科课程按照MIT一样的学分制. 我作为入行有段时间的前端,主要是想扩展计算机科学基础.因为学习的目的不同, 所以课程表的设计也要有所侧重. 基于他的课表参考, 首先要注意几个问题:

1. 小部分课程比较老旧, 需要更新;
2. 不需要为了修够学分选择物理, 力学, 生物, 甚至经济学之类和计算机类联系较弱的基础课程, 数学优先级稍微高一点, 如果是计算机科学类的前置课程就需要加进课程, 否则根据实际情况灵活调整;
3. MIT CS课程是涵盖了电气工程偏硬件方向, 我会选择跳过大多数电气工程课程，而将重点更多地放在CS上;
4. 人类社科类, 交流密集型课程,独立资讯项目该抛弃还是得抛弃. 还有些课程无法评估（包括实验室和研究课程），而另一些则无法在线访问,根据实际情况而定.
5. 总体来说, 课程数目会变少, 因为是业余时间学习周期也会变长, 因此在评分的标准上要更高一点;
6. MIT的CS课程相比其他会梗侧重数学和理论知识, 根据课程实际习题情况, 可能会自行结合一些个人感兴趣的编程相关项目来作为拓展补充;

先到 MIT 官网上查看最新的CS本科教案..恩找到了一份 roadmap 直接拿来用好了.

![](https://chkaos.oss-cn-hangzhou.aliyuncs.com/image/mit6.3roadmap.png)

| 课程编号        | 课程名称                                                   | 类别                              | 方案                                                                |
|-------------|--------------------------------------------------------|---------------------------------|-------------------------------------------------------------------|
| 6\.0001     | Introduction to Computer Science Programming in Python | introductory subjects           | 先简单过一遍, 如果内容已经大部分知晓就酌情跳过或选用熟悉的编程语言完成练习                            |
| 6\.042\[J\] | Mathematics for Computer Science                       | introductory subjects           |                                                                   |
| 6\.03       | Introduction to EECS via Medical Technology            | introductory subjects           | Introduction to EECS 6\.01 or 6\.02 or 6\.03 or 6\.08,选了这门是因为医学相关 |
| 6\.006      | Introduction to Algorithms                             | foundation subjects             |                                                                   |
| 6\.004      | Computation Structures                                 | foundation subjects             |                                                                   |
| 6\.009      | Fundamentals of Programming                            | foundation subjects             |                                                                   |
| 6\.031      | Elements of Software Construction                      | header subjects                 |                                                                   |
| 6\.033      | Computer Systems Engineering                           | header subjects/CI\-M课程         |                                                                   |
| 6\.034      | Artificial Intelligence                                | header subjects                 | 人工智能相关优先级不是很高,  不选6\.036是因为还多一门前置课程 Calculus II \(GIR\)           |
| 6\.046\[J\] | Design and Analysis of Algorithms                      | header subjects                 |                                                                   |
| 6\.207\[J\] | Networks                                               | advanced undergraduate subjects |                                                                   |
| 6\.035      | Computer Language Engineering                          | advanced undergraduate subjects |                                                                   |
| 6\.S081     | Introduction to Operating Systems                      | foundation subjects             | 在课表6\-3: Computer Science and Engineering没有找到操作系统, 补充的基础课程        |
| 6\.828      |  Operating System Engineering                          | advanced undergraduate subjects | 同上, 根据实际情况计划学习, 补充的高级课程                                          |
                                                               |

1. 第一期暂定课程 13门, 包括入门科目三门, 基础科目4门, header subjects(更高级的学科?翻译不出来)4门, 高级课程2门(感兴趣的高级课程有很多, 暂选了前端相关的网络和一门感兴趣的编译相关);
2. 时间: 一年
3. 学习顺序: 课程顺序由简到难, 完成前置课程后才能继续对应课程, 可能会存在计划以外的其他前置课程, 非数学,计算机类只看出现的相关概念, 其他酌情增加;
4. 教材选择: 能在OCW上找到视频是最好滴, 次选教材课本及其他资料, 实在找不到只能考虑选替代的课
5. 学习方法: 
  - 目录, 内容快速过一遍, 习题作业也过一遍决定该科目是练习题类or项目类, 再决定是否需要替换课程或者结合一些个人感兴趣的编程相关项目
  - 使用费曼技巧精读第二遍: 
    1.选择要理解的概念,拿一张空白的纸，在页面顶部写下该概念的名称
    3.对自己讲解它一样进行解释,一个经常拿来举例子的对象, 扫地阿姨...
    4.每当遇到困难时，请返回参考资料，讲座或助教，然后重新阅读或重新学习该资料，直到获得足够的知识以至于可以在纸上进行解释
    5.每当您写下某些东西的冗长或令人困惑的解释时，请尝试简化该语言，或者创建一个类比以更好地理解它 
    6.如果您想更好地理解某件事或记住得更好，请进一步尝试开发，简化和完善说明
    7.对所学知识的一个很好的自我测试是：在不看任何参考资料的情况下，通过技巧来进行学习，看看是否可以深入地解释它
  - 完成习题,项目,考试评分标准达到 60%以上

因为是个前端,为了恰饭,工作需要的东西该学还是得学。 所以这项目只能利用业余时间完成, 计算机基础知识的长远投资价值比较大,细水长流吧, 能解决你很多高层次不懂的问题，让你学习计算机方面的知识更加省力；数学方面当然也很重要, 但是实用至上, 需要多少补多少。 通过思考和实践将计算机基础真正成为自己的东西, 作为一种长期习惯将知识引入工作。

虽然计划是基于 MIT CS 本科课程设计, 但目的不是为了证明获得MIT毕业生同等学历之类。 纯粹是为了和自己的过往水平进行比较, 提高计算机科学素养的一种低成本方式。 如果有幸能完成的话, 再考虑其他高级课程, 数学甚至研究生课程也不一定。

> There is nothing noble in being superior to your fellow man. True nobility is being superior to your former self.

MIT课程参考链接:

http://student.mit.edu/catalog/m6c.html

http://catalog.mit.edu/

https://ocw.mit.edu/courses/electrical-engineering-and-computer-science/
