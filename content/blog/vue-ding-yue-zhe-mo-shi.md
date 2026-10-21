---
title: "2021-04-12 VUE订阅者模式"
description: "引入部分例子：https://juejin.im/post/5c94b63a51882511c832fa98heading-0[https://juejin.im/post..."
date: 2021-04-12
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 23
originalUrl: "https://www.jianshu.com/p/0b976f0d85b1"
---
引入部分例子：[https://juejin.im/post/5c94b63a51882511c832fa98#heading-0](https://links.jianshu.com/go?to=https%3A%2F%2Fjuejin.im%2Fpost%2F5c94b63a51882511c832fa98%23heading-0)

```
   // 全局的依赖收集器Dep
   window.Dep = class Dep {
       constructor() {
           this.subscribers = new Set(); // 保证依赖不重复添加
       }
       // 追加订阅者
       depend() {
           if(activeUpdate) { // activeUpdate注册为订阅者
               this.subscribers.add(activeUpdate)
           }

       }
       // 运行所有的订阅者更新方法
       notify() {
           this.subscribers.forEach(sub => {
              sub();
          })
       }
   }
   let activeUpdate
   // js单线程语言，任一时刻只能有一个函数执行，也就是任一时刻，只可能有一个依赖在更新 //用一个全局变量activeUpdate来标志
   // autorun接受一个更新函数
   function autorun(update) {
       function wrapperUpdate() {
           activeUpdate = wrapperUpdate
           update() // wrapperUpdate, 闭包
           activeUpdate = null;
       }
       wrapperUpdate();
   }
   function observer(obj) {
       Object.keys(obj).forEach(key => {
           var dep = new Dep(); // 为每个key创建订阅器Dep
           let internalValue = obj[key]
           Object.defineProperty(obj, key, {
               get() {                  
                   // 将当前正在运行的更新函数追加进订阅者列表
                   if(activeUpdate) { 
                       dep.depend() //收集依赖
                   }
                   return internalValue
               },
               set(newVal) {
                //console.log(`setting key "${key}" to: ${internalValue}`)
                // 加个if判断，数据发生变化再触发更新
                if(internalValue !== newVal) {
                       internalValue = newVal
                       dep.notify() // 触发依赖的更新
                }
               }
           })
       })
   }
   let state = {
       count:0
   }
   observer(state);
   autorun(() => {
       console.log('state.count发生变化了', state.count)
   })
   state.count = state.count + 5;
   // state.count发生变化了 0
   // state.count发生变化了 5

```
