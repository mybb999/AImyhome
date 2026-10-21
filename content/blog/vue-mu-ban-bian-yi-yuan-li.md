---
title: "2021-03-03 Vue 模板编译原理"
description: "关于 Vue 编译原理这块的整体逻辑主要分三个部分 第一步是将 模板字符串 转换成 element ASTs（解析器）第二步是对 AST 进行静态节点标记，主要用来做虚拟DO..."
date: 2021-03-03
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 174
originalUrl: "https://www.jianshu.com/p/c971fb869250"
---
关于 Vue 编译原理这块的整体逻辑主要分三个部分

第一步是将 模板字符串 转换成 element ASTs（解析器）  
第二步是对 AST 进行静态节点标记，主要用来做虚拟DOM的渲染优化（优化器）  
第三步是 使用 element ASTs 生成 render 函数代码字符串（代码生成器）

解释：  
解析器（parser）的作用是将 模板字符串 转换成 element ASTs。

优化器（optimizer）的作用是找出那些静态节点和静态根节点并打上标记。

代码生成器（code generator）的作用是使用 element ASTs 生成 render函数代码（generate render function code from element ASTs）。
