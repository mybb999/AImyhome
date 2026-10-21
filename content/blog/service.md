---
title: "2020-03-14 @service"
description: "因为这是要实现的类的一个对象名而已，比如在一个Student实现类上加@Service(“student”)，括号里面就是给实例化后的Student对象取个名字。这是在一个接..."
date: 2020-03-14
collection: java-spring
tags: []
readingTime: 1
wordage: 166
originalUrl: "https://www.jianshu.com/p/b80d271cb208"
---
因为这是要实现的类的一个对象名而已，比如在一个Student实现类上加@Service(“student”)，括号里面就是给实例化后的Student对象取个名字。这是在一个接口有多个实现类的情况下区分实现类的方式。

比如Student实现了Person接口，在controller里面@Autowired Person时，假如这时Person还有另一个实现类User，为了确定实例化Student还是User， @Service括号里面的东西就有用了，

@Autowired

@Qualifier(“student”)

private Person person;

这样就确定实例化了一个Person指向一个Student对象。
