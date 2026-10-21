---
title: "vue——解决“You may use special comments to disable some warnings. Use // eslint-disable-next-line to..."
description: "在build/webpack.base.conf.js文件中，注释或者删除掉：module-rules中有关eslint的规则 然后 nmp run dev 就能正常运行了"
date: 2019-03-18
collection: engineering
tags: ["Vue"]
readingTime: 1
wordage: 40
originalUrl: "https://www.jianshu.com/p/3f1fa98a2306"
---
在build/webpack.base.conf.js文件中，注释或者删除掉：module->rules中有关eslint的规则

```
module: {
  rules: [
    //...(config.dev.useEslint ? [createLintingRule()] : []), // 注释或者删除
    {
      test: /\.vue$/,
      loader: 'vue-loader',
      options: vueLoaderConfig
    },
    ...
    }
  ]
}
```

然后 nmp run dev 就能正常运行了
