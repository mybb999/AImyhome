---
title: "vue的监听属性watch"
description: "})"
date: 2019-02-27
collection: vue
tags: ["Vue"]
readingTime: 2
wordage: 615
originalUrl: "https://www.jianshu.com/p/4a20e30f5a55"
---
```
<div id = "computed_props">
    千米 : <input type = "text" v-model = "kilometers">
    米 : <input type = "text" v-model = "meters">
</div>
<p id="info"></p>
<script type = "text/javascript">
    var vm = new Vue({
    el: '#computed_props',
    data: {
        kilometers : 0,
        meters:0
    },
    methods: {
    },
    computed :{
    },
    watch : {
        kilometers:function(val) {
            this.kilometers = val;
            this.meters = val * 1000;
        },
        meters : function (val) {
            this.kilometers = val/ 1000;
            this.meters = val;
        }
    }
    });
    // $watch 是一个实例方法
```

```
命令式的vm.$watch
vm.$watch('kilometers', function (newValue, oldValue) {//oldValue变化前值，newValue为新值
// 这个回调将在 vm.kilometers 改变后调用
document.getElementById ("info").innerHTML = "修改前值为: " + oldValue + "，修改后值为: " + newValue;
```

})  
</script>
