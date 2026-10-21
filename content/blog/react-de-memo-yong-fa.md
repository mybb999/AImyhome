---
title: "2020-10-26 react的memo用法"
description: "与PureComponent不同的是PureComponent只是进行浅对比props来决定是否跳过更新数据这个步骤，memo可以自己决定是否更新，但它是一个函数组件而非一个..."
date: 2020-10-26
collection: react
tags: ["React"]
readingTime: 1
wordage: 91
originalUrl: "https://www.jianshu.com/p/37f20bdcfebb"
---
与PureComponent不同的是PureComponent只是进行浅对比props来决定是否跳过更新数据这个步骤，memo可以自己决定是否更新，但它是一个函数组件而非一个类，但请不要依赖它来“阻止”渲染，因为这会产生 bug。  
一般memo用法：

```
import React from "react";

function MyComponent({props}){
    console.log('111);
    return (
        <div> {props} </div>
    )
};

function areEqual(prevProps, nextProps) {
    if(prevProps.seconds===nextProps.seconds){
        return true
    }else {
        return false
    }

}
export default React.memo(MyComponent,areEqual)
```

redux和memo:

```
import React from "react";

function MyComponent({props,state}){    
    return (
      <div>
        <div>{props} </div>
        <p>{state}</p>
      </div>
    )
};
const mapStateToProps = state => ({
    state: '我是state'
});
export default connect(mapStateToProps)(React.memo(MyComponent))
```
