---
title: "js-cookie插件"
description: "官方地址：https://www.npmjs.com/package/js-cookie 一、安装npm install js-cookie --save 二、引用impor..."
date: 2019-07-10
collection: browser-network
tags: []
readingTime: 1
wordage: 254
originalUrl: "https://www.jianshu.com/p/85a0bcbbf9ec"
---
官方地址：[https://www.npmjs.com/package/js-cookie](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fjs-cookie)

一、安装  
npm install js-cookie --save

二、引用  
import Cookies from 'js-cookie'

三、一般使用

存到Cookie去

// Create a cookie, valid across the entire site:  
Cookies.set('name', 'value');

// Create a cookie that expires 7 days from now, valid across the entire site:  
Cookies.set('name', 'value', { expires: 7 });

// Create an expiring cookie, valid to the path of the current page:  
Cookies.set('name', 'value', { expires: 7, path: '' });

2.从Cookie中取出  
// Read cookie:  
Cookies.get('name'); // => 'value'  
Cookies.get('nothing'); // => undefined

// Read all visible cookies:  
Cookies.get(); // => { name: 'value' }

3.删除  
// Delete cookie:  
Cookies.remove('name');

// Delete a cookie valid to the path of the current page:  
Cookies.set('name', 'value', { path: '' });  
Cookies.remove('name'); // fail!  
Cookies.remove('name', { path: '' }); // removed!

四、特殊使用（在Cookie中存对象）  
跟一般使用不同的是，从Cookie中取出的时候，要从字符串转换成json格式：  
const user = {  
name: 'lia',  
age: 18  
}  
Cookies.set('user', user)  
const liaUser = JSON.parse(Cookies.get('user'))

PS：其实官网用谷歌浏览器翻译一下再渣也看得懂
