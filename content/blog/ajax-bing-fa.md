---
title: "ajax并发"
description: "昨天面试的时候看到的一个题1.有三个ajax请求，如何让这三个ajax请求串行执行，即第一个执行完成后在执行另一个？我回答的是判断上一个请求返回结果，执行完成之后在执行下一个..."
date: 2019-04-23
collection: browser-network
tags: []
readingTime: 1
wordage: 288
originalUrl: "https://www.jianshu.com/p/c6fc0c231bc9"
---
昨天面试的时候看到的一个题  
1.有三个ajax请求，如何让这三个ajax请求串行执行，即第一个执行完成后在执行另一个？  
我回答的是判断上一个请求返回结果，执行完成之后在执行下一个，对吗？  
2.如何让他们并行执行，然后三个请求都执行完成后，再执行某个操作？  
我觉得写三个$.ajax不就是并发执行了吗，然后遍历看是否都返回结果了，如果都返回结果了，再进行继续的操作，这么想对吗？

意义是什么呢？

经过csdn的大神的解答明白了，其实考察的就是同步和异步。

//串行执行分两种。  
//一是用同步模式async: false，三个ajax请求连着写就可以了。

```
$.ajax({
    url: "ajax请求1",
    async: false,
    success: function (data) {
        console.log("ajax请求1 完成");
    }
});
$.ajax({
    url: "ajax请求2",
    async: false,
    success: function (data) {
        console.log("ajax请求2 完成");
    }
});
$.ajax({
    url: "ajax请求3",
    async: false,
    success: function (data) {
        console.log("ajax请求2 完成");
    }
});
```

//二是用异步模式async: true，三个ajax请求嵌套写。

```
$.ajax({
    url: "ajax请求1",
    async: true,
    success: function (data) {
        console.log("ajax请求1 完成");
        $.ajax({
            url: "ajax请求2",
            async: true,
            success: function (data) {
                console.log("ajax请求2 完成");
                $.ajax({
                    url: "ajax请求3",
                    async: true,
                    success: function (data) {
                        console.log("ajax请求3 完成");
                    }
                });
            }
        });
    }
});
```

//并行执行就只能用异步模式。并设置变量进行计数

```
var num = 0;
function isAllSuccess() {
    num++;
    if (num>=3)
        console.log("三个ajax请求全部完成");
}
$.ajax({
    url: "ajax请求1",
    async: true,
    success: function (data) {
        console.log("ajax请求1 完成");
        isAllSuccess();
    }
});
$.ajax({
    url: "ajax请求2",
    async: true,
    success: function (data) {
        console.log("ajax请求3 完成");
        isAllSuccess();
    }
});
$.ajax({
    url: "ajax请求3",
    async: true,
    success: function (data) {
        console.log("ajax请求3 完成");
        isAllSuccess();
    }
});
```

若需要同步可以考虑Promise
