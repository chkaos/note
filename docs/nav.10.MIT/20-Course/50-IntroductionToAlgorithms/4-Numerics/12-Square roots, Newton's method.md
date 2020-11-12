# 12-Square roots, Newton's method

一些 multiplication 算法的讲解

#### [Toom-Cook算法](https://zh.wikipedia.org/zh-hans/Toom-Cook%E7%AE%97%E6%B3%95)

Toom-Cook 的原理是：对于给定的两个大整数 a 和 b ，将 a 和 b 分成 k 个较小的部分，每个部分的长度为 l ，并对这些部分执行运算。随着 k 的增长，可以组合许多乘法子运算，从而降低算法的整体复杂度，然后再次使用 Toom-Cook 算法递归计算乘法子运算，依此类推。Toom-3 和 Toom-Cook 两个术语有时会被错误的混用，但事实上 Toom-3 只是 Toom-Cook 算法在 `k=3` 时的常见实现。

#### Schönhage–Strassen {O(n*log n*log log n)} 

除法复杂度 === 乘法复杂度