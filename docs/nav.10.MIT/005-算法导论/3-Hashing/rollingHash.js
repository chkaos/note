class RollingHash {
  // 用module p 将大数哈希成小数
  constructor(base, p){
    this.base = base
    this.p = p // 某质数
    this.base = 0
    this.magic = 1
  }
  append(newVal){
    this.hash = (this.hash * this.base + newVal) % this.p
    this.magic = this.magic * this.base % this.p
  }
  skip(oldVal){
    // 因为 magic < p, oldVal < base 所以 oldVal * this.magic <= this.p * this.base 保证第一个大括号结果为正数
    this.hash = (this.hash - oldVal * this.magic + this.p * this.base) % this.p
    // this.magic = this.magic * (math.pow(this.base, -1) % this.p ) % this.p
    this.magic = this.magic % this.p
  }
  hash(){

  }
}