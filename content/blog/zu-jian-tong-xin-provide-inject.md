---
title: "2020-05-08 组件通信provide / inject"
description: "https://segmentfault.com/a/1190000014095107a b c provide / inject 需要一起使用，以允许一个祖先组件向其所有子..."
date: 2020-05-08
collection: vue
tags: ["组件"]
readingTime: 1
wordage: 154
originalUrl: "https://www.jianshu.com/p/88290fdf1b89"
---
[https://segmentfault.com/a/1190000014095107](https://links.jianshu.com/go?to=https%3A%2F%2Fsegmentfault.com%2Fa%2F1190000014095107)  
a

```
<template>
  <div>
<childOne></childOne>
  </div>
</template>

<script>
  import childOne from '../components/test/ChildOne'
  export default {
    name: "Parent",
    provide: {
      for: "demo"
    },
    components:{
      childOne
    }
  }
```

b

```
<template>
  <div>
    {{demo}}
    <childtwo></childtwo>
  </div>
</template>

<script>
  import childtwo from './ChildTwo'
  export default {
    name: "childOne",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    },
    components: {
      childtwo
    }
  }
</script>
```

c

```
<template>
  <div>
    {{demo}}
  </div>
</template>

<script>
  export default {
    name: "",
    inject: ['for'],
    data() {
      return {
        demo: this.for
      }
    }
  }
</script>
```

![](/images/blog/zu-jian-tong-xin-provide-inject/01.png)  

provide / inject 需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在起上下游关系成立的时间里始终生效。就是说祖先组件使用provide提供数据，所有后代都可以通过inject接收数据。

provide 和 inject 绑定并不是可响应的，当祖先组件改变provide提供的数据后，后代组件接收到的数据不会发生变化，依然是之前的数据。
