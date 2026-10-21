---
title: "react的bind(this)"
description: "在调用this.setState()的时候出现了this为undefined的情况，如何处理。（四种写法，其中一种ES6的写法，无需bind的写法，用箭头函数） 第一种：在E..."
date: 2019-07-05
collection: react
tags: ["React"]
readingTime: 1
wordage: 183
originalUrl: "https://www.jianshu.com/p/74f08b9e0896"
---
在调用this.setState()的时候出现了this为undefined的情况，如何处理。（四种写法，其中一种ES6的写法，无需bind的写法，用箭头函数）

第一种：在ES6中可以在构造函数中，直接将当前组件（或者叫类）的实例与函数绑定。

如this.handleClick = this.handleClick.bind(this);

第二种：在方法编写结尾的时候绑定this，bind（this），如下图。

第三种：在方法调用的时候绑定this，如onClick={this.handleClick.bind(this)}。

![](/images/blog/react-de-bind-this/01.png)

第四种：箭头函数，ES6中的写法，分为两种有参和无参数。直接上代码。

![](/images/blog/react-de-bind-this/02.png)

调用的时候的写法：

![](/images/blog/react-de-bind-this/03.png)
