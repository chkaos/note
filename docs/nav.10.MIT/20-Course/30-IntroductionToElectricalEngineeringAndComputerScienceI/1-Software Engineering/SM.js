class SM {
  constructor(initialValue) {
    if (initialValue == undefined) initialValue = 0
    this.startState = initialValue // 记住初始值
    this.state = 0
    this.input = 0   // input output 不一定需要
<<<<<<< HEAD
    this.output = 0 
=======
    this.output = 0
>>>>>>> 31af18abdd67409776fad02b8112503aa370eba9
    this.indent = 0  // log 部分
  }
  // 启动方法 startState 赋值给 state
  start() {
    this.state = this.startState
  }
  // 给一个输入值, 改变内部 state 并返回输出
  step(input, verbose = false) {
    // if (input === undefined || input === null) input = null
    const { state, output } = this.getNextValues(this.state, input)

    if (verbose) this.debug()

    this.state = state
    this.input = input
    this.output = output
    return output
  }
  transduce(inputs, verbose = false, compact = false) {
    this.start()
    if (verbose) {
      console.log(`StartState: ${this.state}`)
      let n = inputs.length
<<<<<<< HEAD
      for(let i=0; i < n; i++){
=======
      for (let i = 0; i < n; i++) {
>>>>>>> 31af18abdd67409776fad02b8112503aa370eba9
        console.log("Step: ", i)
        // console.log(" ",  this.constructor.name)
        this.step(inputs[i], verbose)
      }
    } else {
<<<<<<< HEAD
      let outputs = inputs.map(input => this.step(input))

      return outputs
    }
    
=======
      let outputs = []
      for (let input in inputs) {
        outputs.push(this.step(input))
      }
      return outputs
    }

>>>>>>> 31af18abdd67409776fad02b8112503aa370eba9
  }
  // 无输入状态机调用run, n为次数
  run(n = 10, verbose = false) {
    return this.transduce(Array(n).fill(null), verbose)
  }
  getNextValues(state, input) {
    const nextState = this.getNextState(state, input)
    return { state: nextState, output: nextState }
  }
<<<<<<< HEAD
  debug(indent = 0){
    this.indent = indent
    console.log(`${this.indent + " "+ this.constructor.name} In: ${this.input} Out: ${this.output} Next State: ${this.state}`)
  }
  done(){
=======
  debug(indent = 0) {
    this.indent = indent
    console.log(`${this.indent + " " + this.constructor.name} In: ${this.input} Out: ${this.output} Next State: ${this.state}`)
  }
  done() {
>>>>>>> 31af18abdd67409776fad02b8112503aa370eba9
    return false
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
class Delay extends SM {
  constructor(initialValue) {
    super(initialValue)
  }

  getNextValues(state, input) {
    return { state: input, output: state }
  }
}

// todo js测试

// const a = new Accumulator()

// a.transduce([100, -3, 4, -123, 10], true)

// const d = new Delay()
// d.transduce([3, 1, 2, 5, 9], true)

class Increment extends SM {
  constructor(incr) {
    super()
    this.incr = incr
  }
  getNextState(state, input) {
    console.log("Increment", input, this.incr)
    return this.safeAdd(input, this.incr)
  }
  safeAdd(input, incr) {
    if (input == undefined || incr == undefined) return undefined
    return input + incr
  }
}

class Cascade extends SM {
  constructor(sm1, sm2) {
    super()
    this.sm1 = sm1
    this.sm2 = sm2
  }
  start() {
    super.start()
    this.sm1.start()
    this.sm2.start()
  }
  getNextValues(state, input) {
    const { state: nextState1, output: output1 } = this.sm1.getNextValues(state, input)
    const res2 = this.sm2.getNextValues(nextState1, output1)
    return res2
  }
}

class Parallel extends SM {
  constructor(sm1, sm2) {
    super({ startState1: sm1.startState, startState2: sm2.startState })
    this.sm1 = sm1
    this.sm2 = sm2
  }
  getNextValues(state, input) {
    const { state1, state2 } = state
    const { state: nextState1, output: output1 } = this.sm1.getNextValues(state1, input)
    const { state: nextState2, output: output2 } = this.sm2.getNextValues(state2, input)
    return { state: { state1: nextState1, state2: nextState2 }, output: { output1, output2 } }
  }
}

class Parallel2 extends Parallel {

  getNextValues(state, input) {
    const { state1, state2 } = state
    const { input1, input2 } = this.splitValue(input)
    const { state: nextState1, output: output1 } = this.sm1.getNextValues(state1, input1)
    const { state: nextState2, output: output2 } = this.sm2.getNextValues(state2, input2)
    return { state: { state1: nextState1, state2: nextState2 }, output: { output1, output2 } }
  }

  splitValue(v) {
    if (v == undefined) {
      return { output1: null, output2: null }
    }
    return v
  }
}

class ParallelAdd extends Parallel {

  getNextValues(state, input) {
    const { state1, state2 } = state
    const { state: nextState1, output: output1 } = this.sm1.getNextValues(state1, input)
    const { state: nextState2, output: output2 } = this.sm2.getNextValues(state2, input)
    return { state: { nextState1, nextState2 }, output: output1 + output2 }
  }

}

class Feedback extends SM {
  constructor(sm) {
    super(sm.startState)
    this.sm = sm
  }
  getNextValues(state, input) {
    const { output } = this.sm.getNextValues(state, undefined)
    const { state: nextState } = this.sm.getNextValues(state, output)
    return { state: nextState, output }
  }
}

function makeCounter(init, step) {
  return new Feedback(new Cascade(new Increment(step), new Delay(init)))
}

const c = makeCounter(3, 2)
c.run(10, true)

// export { SM }