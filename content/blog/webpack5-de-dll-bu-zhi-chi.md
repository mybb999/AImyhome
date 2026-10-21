---
title: "2026-08-26 Webpack5的dll不支持"
description: "Webpack DLL 机制（DllPlugin/DllReferencePlugin）在 Webpack 5 中已被官方废弃（deprecated），不再推荐使用，但并未从..."
date: 2026-08-26
collection: engineering
tags: ["Webpack", "构建优化"]
readingTime: 1
wordage: 399
originalUrl: "https://www.jianshu.com/p/8339fccf03af"
---
Webpack DLL 机制（DllPlugin/DllReferencePlugin）在 Webpack 5 中已被官方废弃（deprecated），不再推荐使用，但并未从代码库中彻底移除（仍可运行，但无新特性支持且可能在未来版本移除）。

现状说明：

Webpack 4 起内置缓存、splitChunks、Terser 多进程压缩等优化已大幅削弱 DLL 收益；  
Webpack 5 正式弃用 DLL，官方推荐替代方案为：  
内置持久化缓存（cache: { type: 'filesystem' }）；  
更智能的 Module Federation（微前端/共享依赖场景）；  
构建工具迁移（如 vite/esbuild/swc 原生更快）。  
Vue CLI 3+、Create React App 自 2018 年起已移除 DLL 支持；主流脚手架不再默认提供。  
是否还能用？

✅ Webpack 4/5 项目中仍可配置使用（需手动维护多配置文件 + manifest 同步）；  
⚠️ 风险高：依赖变更易导致 manifest 过期引发白屏（需严格 CI 流程保证 DLL 重建）；  
❌ 新项目或重构项目强烈不建议引入 DLL。  
当前时间（2026 年）建议：

若项目仍用 Webpack 4：可短期沿用，但应规划升级；  
若已用 Webpack 5：优先启用 cache.type: 'filesystem' 替代 DLL；  
超大型单体项目（多仓库共享基础库）可考虑 Module Federation 或独立构建公共库 + 外部化（externals）。  
注：部分第三方插件（如 AutoDllPlugin）已停止维护，兼容性存疑；2026 年仍有零星教程提及 DLL，多为历史遗留案例，非最佳实践。
