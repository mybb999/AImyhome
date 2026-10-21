---
title: "2020-03-11Failed to configure a DataSource: 'url' attribute is not specified and no embedded"
description: "一般通过利用JDBC或者Mybaties连接数据库，或者在程序入口文件中新增配置注解 “ 详细可看下面的教程：https://blog.csdn.net/qq3432200..."
date: 2020-03-11
collection: java-spring
tags: []
readingTime: 1
wordage: 52
originalUrl: "https://www.jianshu.com/p/8d9fe778f28c"
---
一般通过利用JDBC或者Mybaties连接数据库，或者在程序入口文件中新增配置注解 “

```
@SpringBootApplication(exclude=DataSourceAutoConfiguration.class)
```

详细可看下面的教程：  
[https://blog.csdn.net/qq\_34322008/article/details/89954934](https://links.jianshu.com/go?to=https%3A%2F%2Fblog.csdn.net%2Fqq_34322008%2Farticle%2Fdetails%2F89954934)
