const map1 = {
  "S": ["A", "B"],
  "A": ["S", "C", "D"],
  "B": ["S", "D", "E"],
  "C": ["A", "F"],
  "D": ["A", "B", "F", "H"],
  "E": ["B", "H"],
  "F": ["C", "D", "G"],
  "H": ["D", "E", "G"],
  "G": ["F", "H"],
}

function map1successors(s, a) {
  return map1[s][a]
}

class SearchNode {
  constructor(action, state, parent) {
    this.action = action
    this.state = state
    this.parent = parent
  }
  path() {
    if (!this.parent) {
      return [[this.action, this.state]]
    } else {
      return [].concat(this.parent.path()).concat([[this.action, this.state]])
    }
  }
  inPath(s) {
    if (s == this.state) return true
    else if (this.parent == null) return false
    else { return this.parent.inPath(s) }
  }
}

// Configurable search
function search(initialState, goalTest, actions, successor, depthFirst = false, DP = true, maxNodes = 10000) {
  if (goalTest(initialState)) {
    return [[null, initialState]]
  }

  let agenda = depthFirst ? new Stack() : new Queue()
  const startNode = new SearchNode(null, initialState, null)
  agenda.push(startNode)

  let visited
  if (DP) visited = { initialState: true }
  let count = 1

  while (!agenda.isEmpty() && maxNodes > count) {
    const parent = agenda.pop()
    const newStates = []
    actions.forEach(a => {
      const newS = successor(parent.state, a)
      const newN = new SearchNode(a, newS, parent)
      if (goalTest(newS)) {
        return newN.path()
      } else if (DP ? visited[newS] : parent.inPath(newS)) {
        // pass
      } else if (newStates.includes(newS)) {
        // pass
      } else {
        count += 1
        if (DP) visited[newS] = true
        newStates.push(newS)
        agenda.push(newN)
      }
    })
  }

  return null

}

class Stack {
  constructor() {
    this.data = []
    this._size = 0
  }
  push(item) {
    this.data.push(item)
    this._size += 1
  }
  pop() {
    this.data.pop()
    if (this._size > 0) this._size -= 1
  }
  isEmpty() {
    return this._size == 0
  }
}

class Queue {
  constructor() {
    this.data = []
    this._size = 0
  }
  push(item) {
    this.data.push(item)
    this._size += 1
  }
  pop() {
    this.data.shift()
    if (this._size > 0) this._size -= 1
  }
  isEmpty() {
    return this._size == 0
  }
}

function depthFirstSearch(initialState, goalTest, actions, successor) {
  return search(initialState, goalTest, actions, successor, true, true)
}

depthFirstSearch("S", (x) => { x == "F" }, map1LegalAction, map1successors)

function breadthFirstSearch(initialState, goalTest, actions, successor) {
  return search(initialState, goalTest, actions, successor, false, true)
}

depthFirstSearch("S", (x) => { x == "G" }, map1LegalAction, map1successors)

// def smSearch(smToSearch, initialState = None, goalTest = None, maxNodes = 10000,
//   depthFirst = False, DP = True):
//   if initialState == None:
//   initialState = smToSearch.startState
//   if goalTest == None:
//   goalTest = smToSearch.done
//   return search(initialState, goalTest, smToSearch.legalInputs,
//   # This returns the next state
//   lambda s, a: smToSearch.getNextValues(s, a)[0],
//   maxNodes = maxNodes,
//   depthFirst=depthFirst, DP=DP)

// lass NumberTestSM(sm.SM):
// startState = 1
// legalInputs = [’x*2’, ’x+1’, ’x-1’, ’x**2’, ’-x’]
// def __init__(self, goal):
// self.goal = goal
// def nextState(self, state, action):
// if action == ’x*2’:
// return state*2
// elif action == ’x+1’:
// return state+1
// elif action == ’x-1’:
// return state-1
// elif action == ’x**2’:
// return state**2
// elif action == ’-x’:
// return -state
// def getNextValues(self, state, action):
// nextState = self.nextState(state, action)
// return (nextState, nextState)
// def done(self, state):
// return state == self.goal

// uniform-cost search && PQ

// def ucSearch(initialState, goalTest, actions, successor):
// startNode = SearchNode(None, initialState, None, 0)
// if goalTest(initialState):
//   return startNode.path()
// agenda = PQ()
// agenda.push(startNode, 0)
// while not agenda.isEmpty():
// n = agenda.pop()
// if goalTest(n.state):
//   return n.path()
// for a in actions:
//   (newS, cost) = successor(n.state, a)
// if not n.inPath(newS):
// newN = SearchNode(a, newS, n, cost)
// agenda.push(newN, newN.cost)
// return None