---
title: "2025-04-07 常用低代码函数方法"
description: "tpl内嵌函数传入对象到evalfunction，再在里面做逻辑处理渲染出来\"tpl\": \"${{'payLineTicketList': payLineTicketLis..."
date: 2025-04-07
collection: ai-tools
tags: ["低代码"]
readingTime: 1
wordage: 95
originalUrl: "https://www.jianshu.com/p/bec3bdcd2b49"
---
tpl内嵌函数  
传入对象到eval\_function，再在里面做逻辑处理渲染出来  
"tpl": "$\{\{'payLineTicketList': payLineTicketList, isEditStatus: isEditStatus, 'ticketSumAmount': ticketSumAmount }|eval\_function:'function transData(params){ const {payLineTicketList = \[\], ticketSumAmount, isEditStatus} = params; return isEditStatus ? (payLineTicketList || \[\]).reduce((pre,cur) => pre+= Number(cur.remainingAmount || 0),0).toFixed(2) : ticketSumAmount || \\'0.00\\' }'|number }",

通过表单id和属性取表单值  
GETRENDERERDATA("orderCreationDetailForm", "prNum")
