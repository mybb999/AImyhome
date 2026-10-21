---
title: "2019-11-19 JS对象深拷贝"
description: "JS对象深拷贝： 1.JSON方法深拷贝 JSON.parse(JSON.stringify(obj)); 2.解构赋值深拷贝 3.Object.assign()深拷贝备注：..."
date: 2019-11-19
collection: javascript
tags: ["深拷贝"]
readingTime: 1
wordage: 555
originalUrl: "https://www.jianshu.com/p/1bd25f7f6ccd"
---
JS对象深拷贝：

1.JSON方法深拷贝

JSON.parse(JSON.stringify(obj));

2.解构赋值深拷贝

```
var arr=[{a:1,b:2},{c:1,d:2}];
    var arr2=[];
    
    arr.forEach(item=>{
      var {...obj}=item;
      arr2.push(obj);
    })
    arr2[1].d=7
    
    console.log(arr,arr2)
```

3.Object.assign()深拷贝  
备注：Object.assign() 方法用于将所有可枚举属性的值从一个或多个源对象复制到目标对象。它将返回目标对象。  
如果目标对象中的属性具有相同的键，则属性将被源对象中的属性覆盖。后面的源对象的属性将类似地覆盖前面的源对象的属性。

Object.assign 方法只会拷贝源对象自身的并且可枚举的属性到目标对象。该方法使用源对象的\[\[Get\]\]和目标对象的\[\[Set\]\]，所以它会调用相关 getter 和 setter。因此，它分配属性，而不仅仅是复制或定义新的属性。如果合并源包含getter，这可能使其不适合将新属性合并到原型中。为了将属性定义（包括其可枚举性）复制到原型，应使用Object.getOwnPropertyDescriptor()和Object.defineProperty() 。

String类型和 Symbol 类型的属性都会被拷贝。

在出现错误的情况下，例如，如果属性不可写，会引发TypeError，如果在引发错误之前添加了任何属性，则可以更改target对象。

Object.assign 不会在那些source对象值为 null或 undefined 的时候抛出错误。

针对深拷贝，需要使用其他办法，因为 Object.assign()拷贝的是属性值。假如源对象的属性值是一个对象的引用，那么它也只指向那个引用。也就是说，如果对象的属性值为简单类型（如string， number），通过Object.assign({},srcObj);得到的新对象为深拷贝；如果属性值为对象或其它引用类型，那对于这个对象而言其实是浅拷贝的。

总结，其实该玩意在众多技术博客上写是深拷贝是错误的，复制的仅仅是该对象的引用，像引用数据类型这种就不行了。

```
var obj = { a: {a: "hello", b: 21} }; 
var obj2 = Object.assign({}, obj); 
obj2.a.a = "changed"; 
console.log(obj.a.a); // 输出"changed"，此时obj和obj2都发生了改变为浅拷贝。
```

4.递归函数深拷贝

```
function _deepClone(source) {
  let target;
  if (typeof source === 'object') {
    target = Array.isArray(source) ? [] : {}
    for (let key in source) {
      if (source.hasOwnProperty(key)) {
        if (typeof source[key] !== 'object') {
          target[key] = source[key]
        } else {
          target[key] = _deepClone(source[key])
        }
      }
    }
  } else {
    target = source
  }
  return target
}
```
