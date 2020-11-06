# 散列 Hashing(哈希)
散列是重要的数据结构，其设计为使用称为散列函数的特殊函数，该函数用于使用特定键映射给定值，以更快地访问元素。映射的效率取决于所使用的哈希函数的效率。

Hashing: set of items each with a key
- insert 新增或覆盖
- delete
- search 获取对应key的值或者返回"key不存在"的报错

### 哈希的实际使用例子
Dictionaries are perhaps the most popular data structure in CS
• built into most modern programming languages (Python 字典, Perl, Ruby, JavaScript 对象, GO 结构体 Java, C++, C#, . . . )
• e.g. best docdist code: word counts & inner product
• implement databases: (DB HASH in Berkeley DB. 数据库类型(使用查找树或哈希构成))
– English word → definition (literal dict.)
– English words: for spelling correction
– word → all webpages containing that word
– username → get account object
• compilers & interpreters: names → variables
• network routers: IP address → wire
• network server: port number → socket/app.
• virtual memory: virtual address → physical

Less obvious, using hashing techniques:
• substring search (grep, Google) [L9]
• string commonalities (DNA) [PS4]
• file or directory synchronization (rsync)
• cryptography: file transfer & identification [L10]

- Simple Approach: Direct Access Table

### 缺点及对应解决方案
1. keys 不一定是数字
- prehash function : 映射任意类型的key成一个非负整数, 
(python环境下)但是理论上任何值在机器上就是一段文本, 存在极少数不同文本预哈希后返回相同的key可以用内存空间id代替

2. 巨大memory log
- Reduce universe U of all keys (say, integers) down to reasonable size m for table
- hash function h: U → {0, 1, . . . , m − 1}

### Collisions Problem
同时插入两个相同key的item导致的问题

1. chaining
插入相同位置的items 在地址上以链表方式共存
worse case O(n)
2. open addressing

Open Addressing: better cache performance (better memory usage, no pointers
needed)
Chaining: less sensitive to hash functions (OA requires extra care to avoid clustering)
and the load factor α (OA degrades past 70% or so and in any event cannot support values larger than 1)

### Simple uniform hashing 假想推测(实际上是错误的, 只用来做推导 略)

### Hash Functions

又称散列算法、哈希函数，是一种从任何一种数据中创建小的数字“指纹”的方法。散列函数把消息或数据压缩成摘要，使得数据量变小，将数据的格式固定下来。该函数将数据打乱混合，重新创建一个叫做散列值（hash values，hash codes，hash sums，或hashes）的指纹。散列值通常用一个短的随机字母和数字组成的字符串来代表。好的散列函数在输入域中很少出现散列冲突。在散列表和数据处理中，不抑制冲突来区别数据，会使得数据库记录更难找到。

![hash-function]("~@assets/50/hash-function.png")

#### Division Method
`h(k) = k mod m`
This is practical when m is prime but not too close to power of 2 or 10 (then just depending on low bits/digits).
But it is inconvenient to find a prime number, and division is slow.

#### Multiplication Method (w => w bit machine)
`h(k) = [(a · k) mod 2w] >> (w − r)`
where a is random, k is w bits, and m = 2r
.
This is practical when a is odd & 2w−1 < a < 2
w & a not too close to 2w−1 or 2w.
Multiplication and bit extraction are faster than division.

#### Universal Hashing

In mathematics and computing, universal hashing (in a randomized algorithm or data structure) refers to selecting a hash function at random from a family of hash functions with a certain mathematical property (see definition below). This guarantees a low number of collisions in expectation, even if the data is chosen by an adversary. Many universal families are known (for hashing integers, vectors, strings), and their evaluation is often very efficient. Universal hashing has numerous uses in computer science, for example in implementations of hash tables, randomized algorithms, and cryptography.

For example: h(k) = [(ak+b) mod p] mod m where a and b are random ∈ {0, 1, . . . p−1},
and p is a large prime (> |U|).
This implies that for worst case keys k1 = k2, (and for a, b choice of h):
1
P ra,b{event Xk1k2} = P ra,b{h(k1) = h(k2)} = 1/m

理论上链总长度为 n/m