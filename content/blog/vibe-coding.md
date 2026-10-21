---
title: "2026-07-08 vibe coding"
description: "创建了个个人主页网站，步骤如下 1.简单介绍下，这个主页技术栈采用的是Nuxt3+ts+Vue3搭建而成，由于kimi要付费，使用版本还不给用的那种，服了......还有那个..."
date: 2026-07-08
collection: ai-tools
tags: []
readingTime: 1
wordage: 511
originalUrl: "https://www.jianshu.com/p/e28e5502aff3"
---
创建了个个人主页网站，步骤如下

1.简单介绍下，这个主页技术栈采用的是Nuxt3+ts+Vue3搭建而成，由于kimi要付费，使用版本还不给用的那种，服了......还有那个那个破google ai studio只能生成react相关的项目，我又没用过next.js，搞轻量级的vue就好了  
2.简单的SEO是有的，看下代码就知道在useHead函数里  
3.由于没打算买服务器，所以采用的是Vercel前端云托管平台，其实有点类似于小程序的云开发，将每个云函数化成多个node小模块运行这样，实现动态效果，免费yyds  
4.开发的步骤其实可以先从Gemeni或者通过Claude Code的plan mode去生成PRD需求文档，再放到kimi或Google stitch生成设计稿，然后导出代码，目前kimi付费，stitch只能生成react项目的代码，所以可以先通过stitch导出.zip压缩包，里面有个markdown文件叫Design.md，再将对应的PRD以及设计稿和Design.md文件通通交给ClaudeCode，让他生成对应项目就好，只是多少会跟设计稿有所出入，细节可以自己调。  
5.claudeCode对应的skills可以推荐使用andrej-karpathy-skills、Superpower插件plugin（里面有携带skill），协助输出文档和理解作用  
6.留言板采用Twikoo，免登录  
7.数据库采用的是免费的MongoDB，有钱去搞个腾讯云也行

其实vibe coding难度不高，大部分也是通过AI方便搭建基建平台，不用一个一个去查绕了许多弯路。接下来应该会主攻基于Node的全栈或ai agent，ai agent开发类似于简化版龙虾的智能体，langchain+rag+向量知识库等开发，到时候再丢到博客里记录。
