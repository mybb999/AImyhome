---
title: "2020-07-15 redux笔记之一"
description: "直接先引入阮一峰老师的例子先： 1.Store 就是把它们联系到一起的对象2.action就是负责通过store.dispatch()传递数据到store3.Reducer指..."
date: 2020-07-15
collection: react
tags: []
readingTime: 1
wordage: 209
originalUrl: "https://www.jianshu.com/p/fa28027d1d64"
---
直接先引入阮一峰老师的例子先：

```
const Counter = ({ value, onIncrement, onDecrement }) => (
  <div>
  <h1>{value}</h1>
  <button onClick={onIncrement}>+</button>
  <button onClick={onDecrement}>-</button>
  </div>
);

//描述这种状态该怎么变化，加法该怎么加，减法该怎么减
const reducer = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT': return state + 1;
    case 'DECREMENT': return state - 1;
    default: return state;
  }
};

const store = createStore(reducer);

const render = () => {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      //表示将要变化哪种状态，要加还是要减
      onIncrement={() => store.dispatch({type: 'INCREMENT'})}
      onDecrement={() => store.dispatch({type: 'DECREMENT'})}
    />,
    document.getElementById('root')
  );
};

render();
store.subscribe(render);
```

1.Store 就是把它们联系到一起的对象  
2.action就是负责通过store.dispatch()传递数据到store  
3.Reducer指定了应用状态的变化如何响应action并发送到 store 的，记住 actions 只是描述了*有事情发生了*这一事实，并没有描述应用如何更新 state。  
4.上面的例子其实就是一个计算器Counter组件，包含着一个action的加减的2种变化状态，并且reducer已经初始化创建了个store对象，而这个reducer里有描述加减2种状态该怎么变化的组合。  
其中包含着subscribe()监听器，一旦通过action变化就渲染render，解除监听器有unsubscribe()，例如：

```
let unsubscribe = store.subscribe(handleChange)
unsubscribe()
```
