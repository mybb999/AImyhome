---
title: "2026-04-02 vite原理（豆包搬过来的）"
description: "好好复习，天天向上~八股文还是要背背 Vite 原理（前端面试高频考点，精简好记版） 核心一句话：Vite 利用浏览器原生 ES Modules（ESM），开发阶段不打包、按..."
date: 2026-04-02
collection: engineering
tags: ["Vite"]
readingTime: 2
wordage: 789
originalUrl: "https://www.jianshu.com/p/d69c712dd6c0"
---
好好复习，天天向上~八股文还是要背背

## Vite 原理（前端面试高频考点，精简好记版）

核心一句话：**Vite 利用浏览器原生 ES Modules（ESM），开发阶段不打包、按需编译，启动极快；生产环境用 Rollup 打包，兼顾体积与兼容性。**

* * *

### 1\. 开发环境原理（核心亮点）

#### ① 基于浏览器原生 ESM

-   现代浏览器支持 `<script type="module">`
-   浏览器会**自动发起请求**去加载对应的 `import` 模块
-   Vite 做的是：**启动一个 dev server，拦截这些请求，实时编译后返回**

#### ② 不进行全量打包

-   Webpack 等是：启动前先把所有依赖打包成 bundle
-   Vite：**启动时不打包**，只预构建依赖，代码文件**用到哪个才编译哪个**  
    → 所以项目越大，Vite 启动速度优势越明显

#### ③ 依赖预构建（Dependency Pre-bundling）

-   目的：
    1.  将 CommonJS/UMD 依赖转为 ESM
    2.  把多个依赖文件打包成一个，减少请求数量
-   工具：**esbuild**（Go 编写，比 Webpack 快 10~100 倍）

#### ④ 热更新（HMR）极致快

-   Webpack 修改文件后要重新编译相关 chunk
-   Vite 利用 ESM 特性：
    -   只**精准热更新修改的模块**
    -   不刷新页面，不重新编译无关代码
    -   缓存机制保证极快响应

* * *

### 2\. 生产环境原理

-   开发用 esbuild 提速
-   **生产环境默认使用 Rollup 打包**  
    原因：
    -   esbuild 快，但**代码分割、CSS 处理、兼容、tree-shaking**不如 Rollup 成熟
    -   Vite 在 Rollup 之上做了一层优化配置，保证打包体积与性能

* * *

### 3\. 整体工作流程（一句话串起来）

1.  启动 dev server
2.  对第三方依赖做 **esbuild 预构建**
3.  浏览器加载入口 ESM 文件
4.  拦截浏览器的 import 请求
5.  实时编译 Vue/TS/JSX 等文件并返回
6.  修改文件时，**精准 HMR 热更新**
7.  生产构建时，使用 Rollup 打包输出

* * *

### 4\. 面试标准回答（背这个）

> Vite 的核心原理是利用浏览器原生支持 ES Module，在开发环境下**不需要像 Webpack 那样全量打包**，而是启动一个开发服务器，拦截浏览器发起的模块请求，实时编译并返回对应文件，实现按需加载、按需编译，所以启动非常快。  
> 同时它会用 esbuild 对第三方依赖进行预构建，把 CommonJS 转成 ESM 并减少请求。热更新也是只更新修改的模块，速度极快。  
> 生产环境则基于 Rollup 打包，保证构建产物的兼容性和打包优化能力。

* * *

### 5\. 常被追问

-   **为什么开发用 esbuild，生产用 Rollup？**  
    答：esbuild 快但生态和优化不如 Rollup 成熟，生产需要更稳定的代码分割、摇树、兼容等能力。
    
-   **Vite 比 Webpack 快在哪？**  
    答：**免打包 + 按需编译 + esbuild 预构建 + 精准 HMR**。
    

需要我顺便给你整理 **Vite + Vue3 项目优化面试题** 吗？
