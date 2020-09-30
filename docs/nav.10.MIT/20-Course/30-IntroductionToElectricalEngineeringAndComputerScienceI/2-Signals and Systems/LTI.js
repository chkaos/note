function dotProd(v1, v2) {
  const len1 = v1.length
  const len2 = v2.length
  if (len1 == 0 || len2 == 0 || len1 != len2) {
    console.error("invalid format of vectors")
    return
  }
  // 向量点乘
  let product = 0
  v1.forEach((item1, index) => {
    product += item1 * v2[index]
  })
  return product
}
// The state is a tuple, containing a list of the j previous input values and a list of the k previous
// output values.
class LTISM extends SM {
  constructor(dCoeffs, cCoeffs) {
    let j = dCoeffs.length
    let k = cCoeffs.length - 1

    this.dCoeffs = dCoeffs
    this.cCoeffs = cCoeffs
    this.startState = { inputs: Array(j).fill(0), outputs: Array(k).fill(0) }
  }
  getNextValues(state, input) {
    const { inputs, outputs } = state
    inputs.unshift(input)

    const currentOutput = dotProd(outputs, this.cCoeffs) + dotProd(inputs, this.dCoeffs)
    outputs.unshift(currentOutput)
    return { inputs: inputs.slice(0, inputs.length - 1), state: { inputs: outputs.slice(0, outputs.length - 1), outputs: currentOutput } }
  }
}
