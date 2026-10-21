---
title: "2022-10-10 Webpack打包流程"
description: "整体我们将会从上边5个方面来分析Webpack打包流程:1.初始化参数阶段这一步会从我们配置的webpack.config.js中读取到对应的配置参数和shell命令中传入的..."
date: 2022-10-10
collection: engineering
tags: ["Webpack"]
readingTime: 1
wordage: 306
originalUrl: "https://www.jianshu.com/p/9964a9b478b0"
---
整体我们将会从上边5个方面来分析Webpack打包流程:  
1.初始化参数阶段  
这一步会从我们配置的webpack.config.js中读取到对应的配置参数和shell命令中传入的参数进行合并得到最终打包配置参数。

2.开始编译准备阶段  
这一步我们会通过调用webpack()方法返回一个compiler方法，创建我们的compiler对象，并且注册各个Webpack Plugin。找到配置入口中的entry代码，调用compiler.run()方法进行编译。

3.模块编译阶段  
从入口模块进行分析，调用匹配文件的loaders对文件进行处理。同时分析模块依赖的模块，递归进行模块编译工作。

4.完成编译阶段  
在递归完成后，每个引用模块通过loaders处理完成同时得到模块之间的相互依赖关系。

5.输出文件阶段  
整理模块依赖关系，同时将处理后的文件输出到ouput的磁盘目录中。

链接：[https://www.zhihu.com/question/473737575/answer/2339126396](https://links.jianshu.com/go?to=https%3A%2F%2Fwww.zhihu.com%2Fquestion%2F473737575%2Fanswer%2F2339126396)
