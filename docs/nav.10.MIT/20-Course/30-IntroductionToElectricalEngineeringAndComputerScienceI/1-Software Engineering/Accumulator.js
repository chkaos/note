class SM {
  constructor(initialValue) {
    if (initialValue == undefined) initialValue = 0
    this.startState = initialValue // 记住初始值
    this.state = 0
    this.verbose = false
  }
  // 启动方法 startState 赋值给 state
  start() {
    this.state = this.startState
  }
  // 给一个输入值, 改变内部 state 并返回输出
  step(input) {
    const { state, output } = this.getNextValues(this.state, input)
    if (this.verbose) {
      console.log(`In: ${input} Out: ${output} Next State: ${state}`)
    }
    this.state = state
    return output
  }
  transduce(inputs, verbose = false, compact = false) {
    this.start()
    if (verbose) {
      console.log(`StartState: ${this.state}`)
      this.verbose = verbose
    }
    let outputs = inputs.map(input => this.step(input))
    this.verbose = false

    return outputs
  }
  // 无输入状态机调用run, n为次数
  run(n = 10) {
    return this.transduce(Array(n).fill(null))
  }
  getNextValues(state, input) {
    const nextState = this.getNextState(state, input)
    return { state: nextState, output: nextState }
  }
}

class Accumulator extends SM {
  constructor(initialValue) {
    super(initialValue)
  }
  // getNextValues(state, input) {
  //   return { state: state + input, output: state + input }
  // }
  getNextState(state, input) {
    return state + input
  }
}

// delay
class R extends SM {
  constructor(initialValue) {
    super(initialValue)
  }

  getNextValues(state, input) {
    return { state: input, output: state }
  }
}

// todo js测试

const a = new Accumulator()

a.transduce([100, -3, 4, -123, 10], true)

const d = new R()
d.transduce([3, 1, 2, 5, 9], true)

// 另一个更加贴近生活的状态机例子-停车栏杆三种基础状态 停车杆的位置, 是否有车在门口, 车是否刚离开
class SimpleParkingGate extends SM() {
  constructor() {
    super("waiting")
  }
  generateOutput(state) {
    switch (state) {
      case "raising":
        return "raise"
      case "lowering":
        return "lower"
      default:
        return "nop"
    }
  }
  getNextValues(state, input) {
    const { gatePosition, carAtGate, carJustExited } = input
    let nextState = state

    if (state == "waiting" && carAtGate) nextState = "raising"
    else if (state == "raising" && gatePosition == "top") nextState = "raised"
    else if (state == "raised" && carJustExited) nextState = "lowering"
    else if (state == "lowering" && gatePosition == "bottom") nextState = "waiting"

    return { state: nextState, input: this.generateOutput(nextState) }
  }
}
