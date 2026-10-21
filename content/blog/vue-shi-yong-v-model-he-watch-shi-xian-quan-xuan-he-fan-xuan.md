---
title: "vue使用v-model和watch实现全选和反选"
description: "html js"
date: 2019-02-27
collection: vue
tags: ["Vue", "组件"]
readingTime: 1
wordage: 2
originalUrl: "https://www.jianshu.com/p/e87477a463df"
---
html

```
<div id="app">
    <p>
        全选：
    </p>
    <input type="checkbox" id="checkbox" v-model="checked" @change="changeAllChecked()">
    <label for="checkbox">
        {{checked}}
    </label>
    <p>
        多个复选框：
    </p>
    <input type="checkbox" id="runoob" value="Runoob" v-model="checkedNames">
    <label for="runoob">
        Runoob
    </label>
    <input type="checkbox" id="google" value="Google" v-model="checkedNames">
    <label for="google">
        Google
    </label>
    <input type="checkbox" id="taobao" value="Taobao" v-model="checkedNames">
    <label for="taobao">
        taobao
    </label>
    <br>
    <span>
        选择的值为:{{checkedNames}}
    </span>
</div>
```

js

```
new Vue({
    el: '#app',
    data: {
        checked: false,
        checkedNames: [],
        checkedArr: ["Runoob", "Taobao", "Google"]
    },
    methods: {
        changeAllChecked: function() {
            if (this.checked) {
                this.checkedNames = this.checkedArr
            } else {
                this.checkedNames = []
            }
        }
    },
    watch: {
        "checkedNames": function() {
            if (this.checkedNames.length == this.checkedArr.length) {
                this.checked = true
            } else {
                this.checked = false
            }
        }
    }
})
```

![](/images/blog/vue-shi-yong-v-model-he-watch-shi-xian-quan-xuan-he-fan-xuan/01.png)
