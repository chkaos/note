# 10 Open Addressing, Cryptographic Hashing

### Open Addressing

#### 插入
探测 probing: 给定一个key, 尝试看看能否找到插槽进行插入操作
试算数(0, m-1)

hash 方法接收2个参数, 密钥和试算数
每次插入的时候一直寻找新的插槽, 没找到的话增加试算数, keep probing till the end.

#### 删除

replace deleted item with "DeleteMe" Flag (区别于 nil)
插入操作对应改变, 插入的时候视 "DeleteMe" 和 nil相同, 查找的时候则跳过对项目经理应插槽

#### Probing Strategy
cluster 开始获得的连续占用插槽组
- Linear Probing
- Double hashing

### Cryptographic Hashing

例子: 密码存储, 文件修改检测, 电子签名
