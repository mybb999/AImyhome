---
title: "create-react-app执行慢"
description: "解决方案是换源，这个解决方法是从网上找到的，特此整理过来收藏一下。虽然平常使用cnpm来代替npm，但也只是使用新的指令而已。而在寻求create-react-app的相关配..."
date: 2019-07-02
collection: engineering
tags: ["React"]
readingTime: 1
wordage: 179
originalUrl: "https://www.jianshu.com/p/6c03bb7dda9f"
---
解决方案是换源，这个解决方法是从网上找到的，特此整理过来收藏一下。虽然平常使用cnpm来代替npm，但也只是使用新的指令而已。而在寻求create-react-app的相关配置希望修改registry时失败了，最后发现create-react-app指令默认调用npm，于是直接把npm的register给永久设置过来就好了，这样使用cnpm或者npm就没差别。  
输入以下命令  
npm config set registry [https://registry.npm.taobao.org](https://links.jianshu.com/go?to=https%3A%2F%2Fregistry.npm.taobao.org)  
\-- 配置后可通过下面方式来验证是否成功  
npm config get registry  
\-- 显示出上述地址的话就是更换成功
