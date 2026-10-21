---
title: "2020-05-08 $attrs/$listeners适用于 隔代组件通信"
description: "https://blog.csdn.net/mouday/article/details/101174233A B C"
date: 2020-05-08
collection: vue
tags: ["组件"]
readingTime: 1
wordage: 11
originalUrl: "https://www.jianshu.com/p/f9abfba6bfd0"
---
[https://blog.csdn.net/mouday/article/details/101174233](https://links.jianshu.com/go?to=https%3A%2F%2Fblog.csdn.net%2Fmouday%2Farticle%2Fdetails%2F101174233)  
A

```
<template>
  <div id="app">
    <!-- 此处监听了事件，可以在C组件中直接触发 -->
    <b-child
    nameToB="nameToB" 
    nameToC="nameToC" 
    @buttonClick="buttonClick" 
   >
    </b-child>
  </div>
</template>

<script>
import BChild from "./B.vue";

export default {
  data() {
    return {};
  },
  
  components: { BChild },

  methods: {
    buttonClick() {
      console.log("buttonClick...");
    }
  }
};
</script>
```

B

```
<template>
    <div>
        <h1>B组件</h1>
        <p>name: {{nameToB}}</p>
        <p>$attrs: {{$attrs}}</p>
        <hr>
        <!-- C组件中能直接触发buttonClick的原因在于 B组件调用C组件时 使用 v-on 绑定了$listeners 属性 -->
        <!-- 通过v-bind 绑定$attrs属性，C组件可以直接获取到A组件中传递下来的props（除了B组件中props声明的） -->
        <c-child v-bind="$attrs" v-on="$listeners"></c-child>

    </div>
</template>

<script>
 import CChild from './C.vue';

 export default {
    props: ['nameToB'],
    
    components: { CChild },

    data () {
        return {};
    },

    // inheritAttrs: false,
 };
</script>
```

C

```
<template>
    <div>
        <h1>C组件</h1>
        <p>name: {{nameToC}}</p>
        <p>$attrs: {{$attrs}}</p>
        <button @click="buttonClick">点击C按钮</button>
    </div>
</template>

<script>
    export default {
    // inheritAttrs: false,

        props: ['nameToC'],

        data () {
            return {};
        },
        
        methods: {
            buttonClick(){
                this.$emit('buttonClick');
            }
        }
    };
</script>
```

![](/images/blog/attrs-listeners-shi-yong-yu-ge-dai-zu-jian-tong-xin/01.png)
