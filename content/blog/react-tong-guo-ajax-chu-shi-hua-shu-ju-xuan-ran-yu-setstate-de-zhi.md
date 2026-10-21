---
title: "react通过ajax初始化数据渲染与setState的执行顺序"
description: "所有初始化时间或通过ajax获取到的数据进行初始化渲染的一般不能通过state控制，因为setState不是同步而是异步。但却可以优先在componentWillmount设..."
date: 2019-09-30
collection: react
tags: ["React"]
readingTime: 2
wordage: 992
originalUrl: "https://www.jianshu.com/p/63026de427be"
---
所有初始化时间或通过ajax获取到的数据进行初始化渲染的一般不能通过state控制，因为  
setState不是同步而是异步。  
但却可以优先在componentWillmount设置state，然后在componentDidmount执行渲染，因为willmount已经执行  
完毕。

componentDidmount和componentWillmount的setState将在render之后设置。

```
一般执行顺序：
componentWillmount设置setState

执行render

执行setState

componentDidmount设置setState(假如你前面有componentWillmount设置了setState也没关系，因为已经执行完毕了，可以取state值)

执行render

执行setState
```

## 例外问题

问题：假设我要设置setState里的一个数组\[\[1,2\],\[3,4\]\]怎么办？没错，数组嵌套数组。  
1.首先在componentWillmount设置setState

```
this.state={
  arr:[]
}
......................................省略一大段
this.setState({
  arr:[[1,2],[3,4]]
})
```

此时你的render用了{this.state.arr\[0\]\[0\]}，你的本意是取数组arr里的第一个数组的值，这时会报错Cannot read property '0' of undefined。  
原因是setState将在render之后，所以取不到值，无法显示，因为还没执行setState进行赋值，另外格式也不相同。例如arr:\[\]和arr\[0\]\[0\]，一维对二维。

但如果你的arr不是数组嵌套数组，而是一般正常化的数组则是正常，但还是会报"另一个"undefined，因为arr\[\]的第一个就是不存在的值。  
但因为格式相同所以能正常显示。例如arr:\[\]和arr\[0\]，一维对一维。

方案1：在state设置好格式，例如arr:\[\[\],\[\]\]跟arr:\[\[1,2\],\[3,4\]\]遥辉相映。

```
例子：
let arr=[];
console.log(arr[0]);
console.log(arr[0][0]);
```

方案2：在ajax请求数据之后用return返回参数，然后在下面用调用该方法（注意，切记不能与setState同时使用，否则会触发死循环渲染）。  
方案3：条件渲染，例如data==true?arr\[0\]:arr\[0\]\[0\]  
方案4：数据写死吧。

## 总结：

setState是异步操作，但在之前的文章上已经知道它在原生操作例如onclick方法里是同步操作。可以用来初始化数据，也可以用来初始化参数。  
当做初始化数据的话，例如相同字符串格式和相等的一维数据格式可以直接用来渲染；当做初始化参数的话，可以借助它进行ajax传递参数再去渲染，因为不会直接渲染触发问题。如果不考虑条件渲染的话可以使用方案1和方案2。  
我个人是比较倾向方案3，因为比较灵活，首先如果你用来初始化数据的话也可以直接拿来渲染，如果不直接渲染可以变成参数。  
state貌似不太支持嵌套数据，但是vue的话貌似没这个问题。  
因为整个渲染异步和同步细节上比较细分，所以如果在哪一步过程出现了差误请提出来，欢迎在下边评论。

2019.9.30号补----------------------------------------------------------------  
这段时期开发中发现了部分问题，因为是在render下处理循环数组而做了一些判断，而数组的数据来源于state，而state的数据则是由ajax通过setState传递。由于还有其他setState条件存在，所以处理循环时判断出了问题。  
在上面说过的setState一般来说是异步的并且是在render之后触发，我在render时候打断点会发现已经触发了setState，只能说明因为这时是已经算render之后对setState的更改开始进行操作了；但是与此同时的ajax里面也存在setState，触发却在之后，只能说明ajax是在setState之后才触发。如下图所示：

setState->ajax（包含setState，暂时不触发里面的setState）->触发setState->render->触发ajax里面的setState

所以又得出一个结论，ajax是在setState之后，setState无疑是个磨人的小妖精。
