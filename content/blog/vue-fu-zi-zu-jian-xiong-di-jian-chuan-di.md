---
title: "Vue父子组件、兄弟间传递"
description: "1.父传子父组件 子组件 2.子传父子组件 父组件 3.兄弟间传值公共bus组件 组件A 组件B"
date: 2019-02-26
collection: vue
tags: ["Vue", "组件"]
readingTime: 1
wordage: 37
originalUrl: "https://www.jianshu.com/p/7a4b308f27f0"
---
1.父传子  
父组件

```
<template>
  <div>
    父组件:
    <input type="text" v-model="name">
    <br>
    <br>
    <!-- 引入子组件 -->
    <child :inputName="name"></child>//绑定父组件的name值
  </div>
</template>
<script>
  import child from './child'
  export default {
    components: {
      child
    },
    data () {
      return {
        name: ''
      }
    }
  }
</script>
```

子组件

```
<template>
  <div>
    子组件:
    <span>{{inputName}}</span>//从父组件接收过来的值
  </div>
</template>
<script>
  export default {
    // 接受父组件的值
    props: {
      inputName: String,//自定义中间件inputName，负责接收
      required: true
    }
  }
</script>
```

2.子传父  
子组件

```
<template>
  <div>
    子组件:
    <span>{{childValue}}</span>
    <!-- 定义一个子组件传值的方法 -->
    <input type="button" value="点击触发" @click="childClick">
  </div>
</template>
<script>
  export default {
    data () {
      return {
        childValue: '我是子组件的数据'
      }
    },
    methods: {
      childClick () {
        // childByValue是在父组件on监听的方法
        // 第二个参数this.childValue是需要传的值
        this.$emit('childByValue', this.childValue)//$emit触发自定义方法，第一个参数方法名，第二个传递参数值
      }
    }
  }
</script>
```

父组件

```
<template>
  <div>
    父组件:
    <span>{{name}}</span>
    <br>
    <br>
    <!-- 引入子组件 定义一个on的方法监听子组件的状态-->
    <child v-on:ListenchildByValue="childByValue"></child>//用个v-on负责接收自定义方法
  </div>
</template>
<script>
  import child from './child'
  export default {
    components: {
      child
    },
    data () {
      return {
        name: ''
      }
    },
    methods: {
      childByValue: function (ListenchildValue) {
        // childValue就是子组件传过来的值
        this.name = childValue
      }
    }
  }
</script>
```

3.兄弟间传值  
公共bus组件

```
//bus.js
import Vue from 'vue'
export default new Vue()
```

组件A

```
<template>
  <div>
    A组件:
    <span>{{elementValue}}</span>
    <input type="button" value="点击触发" @click="elementByValue">
  </div>
</template>
<script>
  // 引入公共的bug，来做为中间传达的工具
  import Bus from './bus.js'
  export default {
    data () {
      return {
        elementValue: 4
      }
    },
    methods: {
      elementByValue: function () {
        Bus.$emit('val', this.elementValue)//这里由原先的this改变成公共组件名字
      }
    }
  }
</script>
```

组件B

```
<template>
  <div>
    B组件:
    <input type="button" value="点击触发" @click="getData">//如果不想手动获取A组件的值，可以把方法写在mounted里面自动启动，这里只是个示范，实际只是在值上+1，详看下面
    <span>{{name}}</span>
  </div>
</template>
<script>
  import Bus from './bus.js'
  export default {
    data () {
      return {
        name: 0
      }
    },
    mounted: function () {
      var vm = this
      // 用$on事件来接收参数
      Bus.$on('val', (data) => {//这里使用了$on负责接收A组件自定义方法val，data为参数值
        console.log(data)//输出4
        vm.name = data//输出4
      })
    },
    methods: {
      getData: function () {
        this.name++//+1不用说了
      }
    }
  }
</script>
```
