---
title: "javascript （柯里化）函数后面有多个小括号"
description: "有时我们看见js函数后面跟着多个小括号是怎么回事？f( )( )( )... f()意思是执行f函数，返回子函数 f()()执行子函数，返回孙函数 f()()()执行孙函数 ..."
date: 2019-05-23
collection: javascript
tags: []
readingTime: 1
wordage: 194
originalUrl: "https://www.jianshu.com/p/306fe3e24f14"
---
有时我们看见js函数后面跟着多个小括号是怎么回事？f( )( )( )...

f()意思是执行f函数，返回子函数

f()()执行子函数，返回孙函数

f()()()执行孙函数

但注意，如果想这样执行，函数结构必须是这样，f的函数体里要return 子函数，子函数里要return 孙函数，如果没有return关键字，是不能这样连续执行的，会报错的。

```
var i=1;
    function f(){
        i++;
        console.log("-------------  :  "+i)
        return k;
        function k() {
            return "I love you!"
        }
    }
    f();
    console.log("111111111111")
    f()()
    alert(f()())
```

![](/images/blog/javascript-ke-li-hua-han-shu-hou-mian-you-duo-ge-xiao-kuo-hao/01.png)

```

/这里为自己写/
function a(){ 
let a=10;
for(var x=1;x<2;x++){ let a=8;console.log(a) }
return function b(){return 1};
console.log(a)
}

a()()
```

![](/images/blog/javascript-ke-li-hua-han-shu-hou-mian-you-duo-ge-xiao-kuo-hao/02.png)

\------------------------------------2021.1.28补充  
其实这个就是个柯里化过程，将接受的参数分割成一个个来处理，再回调一个函数传给下一个执行过程，它的孙函数也可以接受参数进行传递
