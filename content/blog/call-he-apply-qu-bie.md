---
title: "call和apply区别"
description: "apply()方法function.apply(thisObj[, argArray])//最多传递两个参数，用中括号传递 call()方法function.call(thi..."
date: 2019-02-26
collection: javascript
tags: []
readingTime: 1
wordage: 53
originalUrl: "https://www.jianshu.com/p/ece0a29616f4"
---
apply()方法  
function.apply(thisObj\[, argArray\])//最多传递两个参数，用中括号传递

call()方法  
function.call(thisObj\[, arg1\[, arg2\[, \[,...argN\]\]\]\]);//传递多个参数，用逗号区分

用法：

```
function add(a,b){
  return a+b;  
}
function sub(a,b){
  return a-b;  
}

//上面两个是处理方法
var a1 = add.apply(sub,[4,2]);　　//add调用sub的方法
var a2 = sub.apply(add,[4,2]);
alert(a1);  //6     
alert(a2);  //2

/*call的用法*/
var a1 = add.call(sub,4,2);
```

继承：

```
function Animal(name){
  this.name = name;
  this.showName = function(){
        alert(this.name);    
    }    
}

function Cat(name){
  Animal.apply(this,[name]);    
}

var cat = new Cat("哈哈");
cat.showName();
```

/*call的用法*/

```
Animal.call(this,name);
```
