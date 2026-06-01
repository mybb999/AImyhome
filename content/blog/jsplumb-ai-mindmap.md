# 基于 jsplumb 和大模型的思维导图架构实践

## 背景与挑战

在金融数据可视化领域，思维导图作为一种直观展示数据关联关系的工具，被广泛应用于风险分析、投资决策等场景。然而，传统思维导图存在两个核心痛点：

1. **手动编排效率低**：大型金融知识图谱动辄上千个节点，人工拖拽布局耗时巨大
2. **静态结构无法自适应**：数据更新后需要重新调整布局，维护成本高

## 架构设计

我们设计了一套 **"jsplumb + LLM"** 的双引擎架构：

### 渲染引擎层

jsplumb 社区版提供了强大的节点连线能力。我们封装了一个 `MindMapCanvas` 类：

```typescript
class MindMapCanvas {
  private instance: jsPlumbInstance
  
  constructor(container: HTMLElement) {
    this.instance = jsPlumbBrowserUI.newInstance({
      container,
      paintStyle: { stroke: '#4edea3', strokeWidth: 2 },
      connector: ['Flowchart', { cornerRadius: 8 }],
    })
  }
  
  addNode(config: NodeConfig) {
    // 动态创建可拖拽节点
  }
  
  connect(source: string, target: string, label?: string) {
    // 创建带标签的连线
  }
}
```

### AI 生成层

大语言模型负责两件事：
- **结构化输出**：将自然语言描述转换为 JSON 节点关系图
- **布局建议**：根据节点关系密度推荐最优排列算法

## 性能优化

经过几轮迭代，我们将 1000 节点的渲染从 8 秒优化到 1.5 秒：

1. **虚拟化渲染**：仅渲染可视区域内的节点
2. **Web Worker 计算**：将布局算法移至 Worker 线程
3. **增删改差分**：避免全量重绘

## 总结

这套架构已在某金融机构的生产环境中稳定运行 6 个月，支撑了日均 500+ 次的导图生成请求。
