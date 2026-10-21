---
title: "2022-07-20 记录react开头写法"
description: "2022-07-20 记录react开头写法"
date: 2022-07-20
collection: react
tags: ["React"]
readingTime: 1
wordage: 215
originalUrl: "https://www.jianshu.com/p/2453dfbe77fc"
---
```
// 广告位编辑器
const Editor = inject('operatorStore')(
  observer((props) => {
    const {
      currentBannerType,
      currentBanners,
      templates,
    } = props.operatorStore.operatorBannerState
    const currentTemplate = templates[currentBannerType] || {}
...
```
