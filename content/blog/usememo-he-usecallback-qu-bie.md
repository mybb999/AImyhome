---
title: "2024-12-05 useMemo和useCallback区别"
description: "React 中的 useMemo 和 useCallback 是 React Hooks 的一部分，它们用于性能优化。 useMemo 用于记住某个值的计算结果，如果依赖项没..."
date: 2024-12-05
collection: react
tags: []
readingTime: 1
wordage: 86
originalUrl: "https://www.jianshu.com/p/5071177d9c9e"
---
React 中的 useMemo 和 useCallback 是 React Hooks 的一部分，它们用于性能优化。

useMemo 用于记住某个值的计算结果，如果依赖项没有变化，则不会重新计算。

useCallback 用于记住函数的引用，如果依赖项没有变化，则不会创建新的函数。
