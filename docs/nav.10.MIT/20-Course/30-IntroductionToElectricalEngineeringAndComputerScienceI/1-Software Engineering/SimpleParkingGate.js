// import { SM } from "./SM"
// 另一个更加贴近生活的状态机例子-停车栏杆三种基础状态 停车杆的位置, 是否有车在门口, 车是否刚离开
class SimpleParkingGate extends SM {
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