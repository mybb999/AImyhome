---
title: "var和let和const区别"
description: "var和let和const区别"
date: 2018-10-18
collection: javascript
tags: []
readingTime: 1
wordage: 163
originalUrl: "https://www.jianshu.com/p/57fe85984ce1"
---
```
let x=true;
function a(){
  let i=10;
  if(x==true){
    let i=11;
  }
  else{
   console.log("false")
  }
  console.log(i)
}
a();//输出10，因为let只作用当前的块域，var影响全局，const只能拥有一个变量且无法更改（也有特殊的例外，具体百度）
```
