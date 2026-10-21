---
title: "2026-08-31 mysql和postgrsSql"
description: "B+树其实就是把整行数据存在叶子节点里，然后再把键值、索引、指针存在内部节点 PostgreSQL 和 MySQL 的核心差异集中在架构设计、功能特性和适用场景上，PG 更偏..."
date: 2026-08-31
collection: server-db
tags: ["数据库"]
readingTime: 2
wordage: 635
originalUrl: "https://www.jianshu.com/p/d5d2036063cd"
---
```
https://blog.csdn.net/2502_93300404/article/details/161522375
```

B+树其实就是把整行数据存在叶子节点里，然后再把键值、索引、指针存在内部节点

PostgreSQL 和 MySQL 的核心差异集中在架构设计、功能特性和适用场景上，PG 更偏向功能完备的企业级数据库，MySQL 更偏向轻量高效的互联网场景数据库。

🏗️ 架构与设计差异  
MySQL：采用插件式存储引擎架构，默认使用 InnoDB，可灵活切换不同引擎适配场景；整体设计追求简单快速，上手门槛低。  
PostgreSQL：单引擎一体化架构，存储引擎与内核深度绑定，不可更换但扩展能力极强；完全遵循 ANSI SQL 标准，严谨性更高。  
📊 数据类型与索引能力  
MySQL：以基础数据类型为主，JSON 功能仅支持基础操作，原生索引几乎全依赖 B+ 树，高级索引能力有限。  
PostgreSQL：支持 JSONB、数组、几何类型、网络地址等丰富的高级类型；提供 6 种索引类型（B-Tree、GIN、GiST 等），你之前关注的 GIN 索引就是它的特色能力，能大幅加速 JSONB、数组和全文检索场景 。  
⚡ 并发与性能表现  
MySQL：基于 undo log 实现 MVCC，读多写少场景下简单 CRUD 性能更优，超高并发连接下资源消耗更低。  
PostgreSQL：通过行级多版本标记实现 MVCC，读写完全互不阻塞，复杂查询、高并发写入场景下稳定性更强；但需要定期执行 VACUUM 清理旧版本数据 。  
🔌 扩展与生态  
MySQL：扩展能力有限，主要通过存储过程和 UDF 实现自定义功能；生态集中在 Web 应用、电商 OLTP 场景，主从复制方案非常成熟。  
PostgreSQL：通过 Extension 机制实现极强的扩展能力，PostGIS 地理空间扩展、pgvector 向量搜索扩展等，能直接支撑 GIS、AI RAG 等复杂场景，无需额外引入专用数据库 。  
📋 典型选型参考  
表格  
场景 优先选择  
电商订单、高并发 Web 应用、读多写少的标准 CRUD 项目 MySQL  
地理信息系统、JSONB/向量检索、复杂分析查询、金融医疗强一致性场景 PostgreSQL
