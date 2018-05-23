
/* 
  使用观察者模式模式：
    被观察者（主体）发布事件（通常是DOM事件，也可是自定义事件）， 观察者（即具体的事件处理程序）订阅事件来监听主体
 */

/*
redux模块: 对象
  1. createStore(reducer): 接收一个reducer函数, 返回一个store对象
    使用: createStore(reducer)
  2. combineReducers(reducers): 接收一个包含多个reducer函数的对象, 返回一个新的reducer函数
    使用: combineReducers({count, msgs})
  3. store对象
    getState(): 得到内部管理state对象
    distpatch(action): 分发action, 会触发reducer调用,返回一个新的state, 调用所有绑定的listener
    subscribe(listener): 订阅一个state的监听器
 */

export function createStore(reducer) {
  let state
  const listeners = []

  state = reducer(state, {type: '@beta-redux'})

  function getState () {
    return state
  }

  // 分发action, 会触发reducer调用,返回一个新的state, 调用所有绑定的listener
  function dispatch (action) {
    state = reducer(state, action)
    // 调用listeners中所有的监视回调函数
    listeners.forEach(listener => listener())
  }

  // 订阅一个state的监听器
  function subscribe (listener) {
    listeners.push(listener)
  }


  return {getState, dispatch, subscribe}
}

// 接收一个包含多个reducer函数的对象, 返回一个新的reducer函数
export function combineReducers(reducers) {

  return function (state={}, action) {
    const newState = {}
    const keys = Object.keys(reducers)
    keys.forEach(key => {
      const childReducer = reducers[key]
      const childState = state[key]
      const newChildState = childReducer(childState, action)
      newState[key] = newChildState
    })
    return newState
  }
}
