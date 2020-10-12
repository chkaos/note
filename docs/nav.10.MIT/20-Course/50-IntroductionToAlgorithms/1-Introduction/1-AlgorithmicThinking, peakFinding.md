## Peak Finding

#### One dimensional peak finder
可参考 leecode 162. Find Peak Element, 输入时数字数组， 输出是“峰值”

~~~
Input: nums = [1,2,1,3,5,6,4]
Output: 1 or 5 
Explanation: Your function can return either index number 1 where the peak element is 2, or index number 5 where the peak element is 6.
~~~

1. 最直接的暴力循环方法
~~~go
func findPeakElement(nums []int) int {
    lenn:=len(nums)
    // 只有一个元素不满足条件 返回0
    if lenn==1{
        return 0
    }
    // 数组大于1时，最后一个元素大于倒数第二个元素直接返回
    if lenn>1&&nums[lenn-2]<nums[lenn-1]{
        return lenn-1
    }
    // 暴力循环部分 复杂度为 O(n)
    for i:=0;i<len(nums)-2;i++{
        if i==0{
            if nums[i+1]<nums[i]{
                return i
            }
        }
        if nums[i]<nums[i+1]&&nums[i+1]>nums[i+2]{
            return i+1
        }
    }
    return 0
}
~~~

2. 二分法


todo 
2D peak finder
problem set1
渐进复杂度
