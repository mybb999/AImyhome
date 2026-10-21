---
title: "on bind live delegate"
description: "bind:缺少元素选择器，无法选择动态添加元素，多次注册，附加操作前期完成，页面加载可能性能问题。 live:事件委托，将与事件处理函数关联的选择器和事件信息一起附加docu..."
date: 2018-10-18
collection: javascript
tags: []
readingTime: 1
wordage: 263
originalUrl: "https://www.jianshu.com/p/0691993700ff"
---
bind:缺少元素选择器，无法选择动态添加元素，多次注册，附加操作前期完成，页面加载可能性能问题。

live:事件委托，将与事件处理函数关联的选择器和事件信息一起附加document中，只被注册一次，可以选中动态添加的元素。缺点是jq1.7以后抛弃，某些操作没用是因为它在document上注册处理函数，dom级很深则会影响性能不断的match。

delegate:委托事件附加到元素上而不是document上，可以匹配动态添加的元素。缺点，仍需要在附加到该元素的选择器或事件中筛选marchesSelector，操作大量匹配元素时有性能问题，附加操作前期完成，页面加载可能性能问题。

on:各种方法重载，统一上面三种方式，绑定方法一致，避免混乱。
