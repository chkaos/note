class DDist {
  constructor(dictionary){
    // map 对象
    this.d = new Map
    for (var [k, v] of dictionary) {
      this.d.set(JSON.stringify(k),v)
    }
    this.tem = dictionary
  }
  prob(elt) {
    elt = JSON.stringify(elt)
    if(this.d.get(elt)!= undefined){
      return this.d.get(elt)
    }
    return 0
  }
  support(){
    let res = []
    for (var [k, v] of this.d) {
      if(v > 0 ) {
        res.push(k)
      }
    }
    return res
  }
  draw(){
    const r = Math.random()
    let sum = 0
    this.support().forEach(val => {
      sum += this.prob(val)
      if(r < sum) {
        return val
      }
    })
  }
}

const dict = new DDist(new Map([[[0, 0], 0.5], [[0, 1], 0.2], [[1, 0], 0.1], [[1, 1], 0.2]]))

console.log(dict.prob([0, 0]))

function TgivenD(D) {
  if (D == 'disease') {
    return new DDist([["positive" , 0.99], ["negative" , 0.01]])
  }

  else if (D == "nodisease") {
    return new DDist([["positive" , 0.001], ["negative" , 0.999]])
  }

  else {return new Error("invalid value for D")}

}

console.log(TgivenD("disease").prob("negative"))

// PA = dist.DDist({’a1’ : 0.9, ’a2’ : 0.1}) def PBgA(a): if a == ’a1’: return dist.DDist({’b1’ : 0.7, ’b2’ : 0.3}) else:return dist.DDist({’b1’ : 0.2, ’b2’ : 0.8})
// >>> PAB = JDist(PA, PBgA)
// >>> PAB
// DDist((a1, b2): 0.270000, (a1, b1): 0.630000, (a2, b2): 0.080000, (a2, b1): 0.020000)

function removeElt(items, i){
  const result = items.slice().splice(i, 1)
  if(result.length == 1) return result[0]
  return result
}

function incrDictEntry(d, k, v) {
    k = JSON.stringify(k)
    v = d.has(k) ? d.get(k) + v: v
    d.set(k, v)
}

function marginalizeOut(){}

