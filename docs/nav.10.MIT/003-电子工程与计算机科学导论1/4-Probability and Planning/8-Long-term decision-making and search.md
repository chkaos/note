# charter8 - Long-term decision-making and search

## 状态空间搜索

是在包括人工智能的计算机科学领域中使用的过程，在该过程中，考虑实例的连续配置或状态，目的是找到具有期望属性的目标状态。

We’ll model a state-space search problem formally as
• a (possibly infinite) set of states the system can be in;
• a starting state, which is an element of the set of states;
• a goal test, which is a procedure that can be applied to any state, and returns True if that state
can serve as a goal; 47
• a successor function, which takes a state and an action as input, and returns the new state that
will result from taking the action in the state; and
• a legal action list, which is just a list of actions that can be legally executed in this domain.

## Representing search trees

## Basic search algorithm
深度优先搜索 (depth-first search)
广度优先搜索 (Breadth-first search)

## uniform-cost search 统一代价搜索算法

## Heuristic function