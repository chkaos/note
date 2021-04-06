# 9 Table Doubling && Karp Rabin

### Table Doubling

#### insert
随着元素插入, 哈希表的预留空间不足的话. 每个位置的链表长度会增加, 哈希表各种操作的时间复杂度不将再是常量.

所以必须有方法在元素插入的同时动态扩/缩容. 使得 m 既不过小也不浪费.

复杂度O(n+m+m')n遍历哈希表元素 + m遍历插槽 + m'构建新表

步骤
1. 分配内存
2. 创建table of new size
3. build new hash function
4. rehash: 将已存在的元素插入到新哈希表

插入个数分析
m+1 : 每次插入的cost为O(n^2)
2m: 每次插入的cost为O(n), 摊销后cost约等于为O(1)

尽管对现有哈希表使用`Table Doubling`能使插入操作时间复杂度剧增, 所以我们需要`amortization`

#### delete
删除操作分析
1.如果 m = n/2 则缩小一半 每次删除的cost为O(n)
2.如果 m = n/4 则缩小一半 摊销后的cost为O(1)  (n <= m <= 4n)

一般来说插入数为2或其他常数, 删除常数比插入数稍大;

### amortization 平摊化
[平摊化解释](https://stackoverflow.com/questions/200384/constant-amortized-time)
~~~
Amortised time explained in simple terms:

If you do an operation say a million times, you don't really care about the worst-case or the best-case of that operation - what you care about is how much time is taken in total when you repeat the operation a million times.

So it doesn't matter if the operation is very slow once in a while, as long as "once in a while" is rare enough for the slowness to be diluted away. Essentially amortised time means "average time taken per operation, if you do many operations". Amortised time doesn't have to be constant; you can have linear and logarithmic amortised time or whatever else.

Let's take mats' example of a dynamic array, to which you repeatedly add new items. Normally adding an item takes constant time (that is, O(1)). But each time the array is full, you allocate twice as much space, copy your data into the new region, and free the old space. Assuming allocates and frees run in constant time, this enlargement process takes O(n) time where n is the current size of the array.

So each time you enlarge, you take about twice as much time as the last enlarge. But you've also waited twice as long before doing it! The cost of each enlargement can thus be "spread out" among the insertions. This means that in the long term, the total time taken for adding m items to the array is O(m), and so the amortised time (i.e. time per insertion) is O(1).
~~~

简单讲就是将一次高额的操作成本分摊到多次操作上, 可用月租类比->摊销复杂度;

### String Matching 查看子串问题
字符串`T`和子串`S`, 各自长度为`t`,`s`
普通循环: 循环次数为 t - s, 复杂度 O(s*(t-s)) => O(s*t)

使用哈希使遍历操作复杂度恢复到线性的 O(s+t)
1. 给定一个散列值 r ,每次操作添加一个新元素到末尾, 并弹出首位
2. r(): hash value of x = h(x)

Karp-Rabin 字符串匹配算法 关键在于构造(Rolling Hash)滚动哈希表的数据结构
1. 循环`S`, 计算目标子串的哈希值 设定第一个滚动哈希值
2. 截取`T`前`s`个元素 设定第二个滚动哈希值
3. 循环一遍