---
title: "react懒加载"
description: "lazy.js 路由router.js，贴上自己的代码"
date: 2019-07-24
collection: react
tags: ["React"]
readingTime: 1
wordage: 14
originalUrl: "https://www.jianshu.com/p/adad9ab565d6"
---
lazy.js

```
import React, {Component} from 'react';

const asyncComponent = (importComponent) => {
    return class extends Component {
        state = {
            component: null
        }
        
        componentDidMount() {
            importComponent() //传进来的函数返回我们想要的组件
                .then(cmp => {//这里的cmp估计就是组件的返回值，类似promise的resolve写法
                    this.setState({component: cmp.default}); //把组件存起来
                });
        }
        
        render() {
            const C = this.state.component; //渲染的时候把组件B拿出来
            return C ? <C {...this.props}/> : null; //返回的其实就是组件B，并且把传给A的属性也转移到B上
        }
    }
};

export default asyncComponent;
```

路由router.js，贴上自己的代码

```
//路由
import React from 'react'
import {Route} from 'react-router-dom'
// import {BrowserRouter} from 'react-router-dom'
import {HashRouter} from 'react-router-dom'
// import {Link,Switch} from 'react-router-dom'

import asyncComponent from '../lazy';

//引入组件
import Login from './login.js'
//---------------------------------------
// import Main from './main.js'//这里就是原来没懒加载的写法
const Main=asyncComponent(()=>import('./main.js'));//这里是懒加载的写法
//------------------------------------------

class MyRouter extends React.Component {
    constructor(props){
      super(props);
      this.state={
           
      };
    }
    
    handleClick(i){
      
    }     

    xuanran(){
      // const arr2=arr
    }
  
    render() {
      return (    
        <div id="sider">            
            <HashRouter>
              <Route exact path="/" component={Login}></Route>
              <Route path="/main" component={Main}></Route>             
            </HashRouter>
          </div>           
      );
    }
  }

export default MyRouter;
```
