---
title: "vuex"
description: "vuex即是一个仓库，保存着你所需要的状态，换个意思就是保存着你所需要用到的东西，必要时才拿出来核心：state、getter、mutation、action、module辅..."
date: 2019-02-28
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 307
originalUrl: "https://www.jianshu.com/p/a9fd5a32c95a"
---
vuex即是一个仓库，保存着你所需要的状态，换个意思就是保存着你所需要用到的东西，必要时才拿出来  
核心：state、getter、mutation、action、module  
辅助函数：mapState

## 一、

vuex仓库实例

```
// 如果在模块化构建系统中，请确保在开头调用了 Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  mutations: {
    increment (state) {
      state.count++
    }
  }
})
```

组件使用方法  
现在，你可以通过 store.state 来获取状态对象，以及通过 store.commit 方法触发状态变更：

```
store.commit('increment')

console.log(store.state.count) // -> 1
```

根实例注册  
Vuex 通过 store 选项，提供了一种机制将状态从根组件“注入”到每一个子组件中（需调用 Vue.use(Vuex)）：

```
const app = new Vue({
  el: '#app',
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `
})
```

注册组件

```
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count () {
      return this.$store.state.count
    }
  }
}
```

## 二、

mapState辅助函数  
当一个组件需要获取多个状态时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 mapState 辅助函数帮助我们生成计算属性，让你少按几次键：

```
// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...吧啦吧啦巴拉忽略
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}
```

其实上面的代码相当于

```
import { mapState } from 'vuex' 
export default { 
    computed: { 
        count() { 
            return this.$store.state.count
         }, 
        countAlias() { 
            return this.$store.state['count'] 
        },
         countPlusLocalState() { 
            return this.$store.state.count + this.localCount 
        } 
    } 
}
```

当映射的计算属性的名称与 state 的子节点名称相同时，我们也可以给 mapState 传一个字符串数组。

```
computed: mapState([
  // 映射 this.count 为 store.state.count
  'count'
])
```

如果多个状态

```
computed: {
  localComputed () { /* ... */ },
  // 使用对象展开运算符将此对象混入到外部对象中
  ...mapState({
    // ...
    'count',
    'countAlias'
  })
}
```

剩余四个核心以后补充
