---
title: "2020-09-11 当v-model绑定在组件上"
description: "当v-model绑定在组件上时，相当于拆分v-model的语法糖父组件： 子组件："
date: 2020-09-11
collection: vue
tags: ["组件"]
readingTime: 1
wordage: 30
originalUrl: "https://www.jianshu.com/p/6b6c4cebcc1e"
---
当v-model绑定在组件上时，相当于拆分v-model的语法糖  
父组件：

```
//拆分前
<child v-model="show"></child>
<span>{{show}}</span>
//拆分后
<child v-bind:value="show" v-on:input="show=$event.target.value"></child>
......................................
export default {
  name: 'HelloWorld',
  components:{
      child,
  },
  data () {
    return {
            show:'熊仔',
    }
  }
}
```

子组件：

```
<template>
  <input
    :value="value"
    @input="change"
  />   
</template>

<script>
export default {
  props: {
    value: String,  
  },
  data(){
    return{}
  },
  method:{
    change(){
      //组件用v-model绑定的属性，一般组件内部用$emit传递，并且父组件用了v-model的话，子组件默认传递是input方法
      this.$emit('input', $event.target.value);
    }
  }
}
</script>
```
