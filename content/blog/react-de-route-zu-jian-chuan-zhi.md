---
title: "react的Route组件传值"
description: "react的Route组件传值"
date: 2019-08-02
collection: react
tags: ["React", "组件"]
readingTime: 1
wordage: 100
originalUrl: "https://www.jianshu.com/p/c34964872b23"
---
```
<Route 
  path="/test/child" 
  render={(props) => (
    <Child 
      {...props}                         
      handleClick={this.handleClick} 
    />
  )} 
 />
```
