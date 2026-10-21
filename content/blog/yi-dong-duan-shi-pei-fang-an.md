---
title: "2019-10-17移动端适配方案"
description: "2019-10-17移动端适配方案"
date: 2019-10-17
collection: css-mobile
tags: ["移动端"]
readingTime: 3
wordage: 1000
originalUrl: "https://www.jianshu.com/p/882bb6531581"
---
```
//横竖屏分开
(function (win, doc) {
    if (!win.addEventListener) return;
    var html = document.documentElement;

    function setFont() {
        var html = document.documentElement;
        var k = 750;
        html.style.fontSize = html.clientWidth / k * 100 + "px";
    }

    setFont();
    setTimeout(function () {
        setFont();
    }, 300);
    doc.addEventListener('DOMContentLoaded', setFont, false);
    win.addEventListener('resize', setFont, false);
    win.addEventListener('load', setFont, false);
})(window, document);
// 适配PC端
// if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent)) {
//     window.location.href = "/cp/20190724download/index.html"+location.search;
// }

// 横竖屏共用
(function (win, doc) {
    if (!win.addEventListener) return;
    function setFont() {
        var html = document.documentElement;
        var k = (html.clientWidth > html.clientHeight) ? 1334 : 750;
        html.style.fontSize = html.clientWidth / k * 100 + "px";
    }
    setFont();
    setTimeout(function () {
        setFont();
    }, 300);
    doc.addEventListener('DOMContentLoaded', setFont, false);
    win.addEventListener('resize', setFont, false);
    win.addEventListener('load', setFont, false);
})(window, document);
```
