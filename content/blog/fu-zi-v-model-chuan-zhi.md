---
title: "2020-07-28 父子v-model传值"
description: "父组件 子组件 看来父组件里的name是可以接纳子组件里的emit，$emit默认是input"
date: 2020-07-28
collection: vue
tags: ["组件"]
readingTime: 1
wordage: 31
originalUrl: "https://www.jianshu.com/p/c7de32da3415"
---
父组件

```
<template>
  <div>
    这里是父组件<br>
    {{ name }}
    <hr>
    <Son1 v-model="name"></Son1>
  </div>
</template>

<script>
import Son1 from './son.vue'
export default {
  data () {
    return {
      name: '小红'
    }
  },
  components: { Son1 }
}
</script>
```

子组件

```
<template>
  <div class="son">
    这里是子组件<br>
    {{ value }}
    <button @click="changeName">修改value</button>
    
  </div>
</template>
<script>
  export default {
    props: ['value'],
    methods: {
      changeName () {
        this.$emit('input', '小明')
      }
    }
  }
</script>
```

看来父组件里的name是可以接纳子组件里的![emit参数，并且子组件里应该可以有多个](https://math.jianshu.com/math?formula=emit%E5%8F%82%E6%95%B0%EF%BC%8C%E5%B9%B6%E4%B8%94%E5%AD%90%E7%BB%84%E4%BB%B6%E9%87%8C%E5%BA%94%E8%AF%A5%E5%8F%AF%E4%BB%A5%E6%9C%89%E5%A4%9A%E4%B8%AA)emit，$emit默认是input
