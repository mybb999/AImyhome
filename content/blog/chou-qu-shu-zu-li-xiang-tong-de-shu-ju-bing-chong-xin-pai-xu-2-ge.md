---
title: "2026-01-24 抽取数组里相同的数据并重新排序，2个例子"
description: "2026-01-24 抽取数组里相同的数据并重新排序，2个例子"
date: 2026-01-24
collection: javascript
tags: []
readingTime: 2
wordage: 721
originalUrl: "https://www.jianshu.com/p/7945e5867eee"
---
```
1.
const arr = Object.values(
  details.reduce((acc, item) => {
    const groupKey = item.parentMaterialCode
    if (!acc[groupKey]) {
      acc[groupKey] = { ...item, parentMaterialCode: groupKey, childMaterial: [] }
    }
    acc[groupKey].childMaterial.push({
      ...item,
      // materialName: item.materialName,
      // materialCode: item.materialCode,
      // materialTypeId: item.materialTypeId,
      sampleAttachments: item.sampleAttachments && item.sampleAttachments[0]?.files?.map((v) => {
        const { fileName, url, value, state, name, id } = v
        return {
          originName: name,
          fileName,
          url,
          id,
          value,
          state,
          name
        }
      }) || []
    })

    return acc
  }, {})
)

2.
const objFilter = data.details.reduce((acc, item) => {
            const groupKey = item.parentMaterialCode;
            if (!acc[groupKey]) {
              acc[groupKey] = [{ ...item }];
            } else {
              acc[groupKey].push({ ...item });
            }

            return acc;
          }, {});

```
