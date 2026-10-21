---
title: "2021-02-05 js递归题目"
description: "在一次面试中遇到一个递归问题，记录一下：在一个有64个格子的棋盘中的第一格子里放下一粒米,在第二个格子里放下两粒米,在第三 个格子里放下四粒米,然后在以后的每一个格子里都放进..."
date: 2021-02-05
collection: javascript
tags: []
readingTime: 1
wordage: 132
originalUrl: "https://www.jianshu.com/p/57d9707d89d7"
---
在一次面试中遇到一个递归问题，记录一下：  
在一个有64个格子的棋盘中的第一格子里放下一粒米,在第二个格子里放下两粒米,在第三 个格子里放下四粒米,然后在以后的每一个格子里都放进比前一个格子多一倍的米,当64个格子放满了,将会有多少米呢?

在没有用到Math.pow()返回幂的值情况下另外写了个遍历方法

```
function a(gezi,count){  
  
  let num=1;
  for(let i=1;i<gezi;i++){
    num=num*2;
  }
  count=count+num;

  if(gezi<64){
    return a(gezi+1,count);    
  }
  else{    
    return count
  }

}
console.log(a(1,0))
```
