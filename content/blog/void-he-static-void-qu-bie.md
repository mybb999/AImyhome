---
title: "2019-11-29void和static void区别"
description: "public void 修饰是非静态方法，该类方法属于对象，在对象初始化（new Object()）后才能被调用；public static void 修饰是静态方法，属于类..."
date: 2019-11-29
collection: java-spring
tags: []
readingTime: 1
wordage: 233
originalUrl: "https://www.jianshu.com/p/8d1dd4ca57e8"
---
public void 修饰是非静态方法，该类方法属于对象，在对象初始化（new Object()）后才能被调用；  
public static void 修饰是静态方法，属于类，使用类名.方法名直接调用。

非静态方法之间可以互相调用，非静态方法也可以调用静态方法；但是静态方法不可以直接调用（未初始化的）非静态方法。由于 public static void main 作静态方法，所以遵循这个原则。

但是 Java 可以通过对象名调用静态方法（对象名.静态方法）。Java 中不会导致语法错误（syntax error），但是不推荐这样使用，静态方法与非静态方法调用时应当绝对区分；而且其他 OOP 语言如 C#，Swift，Objective-C 都没有这样的语法。

void方法不返回值
