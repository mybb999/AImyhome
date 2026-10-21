---
title: "React转义字符"
description: "首先贴上自己一小段code 其中dangerouslySetInnerHTML就是负责html展示的内容，同时该标签内不允许写入文字，只能在这个属性里写"
date: 2019-08-29
collection: react
tags: ["React"]
readingTime: 1
wordage: 47
originalUrl: "https://www.jianshu.com/p/a245895d5d95"
---
首先贴上自己一小段code

```
{/* 图表 */}
                            <div className="chartWaveDay"></div>
                            <span style={{margin:'20px 0px 0px 20px',fontSize:12,position:'relative'}}>DAU(日活跃用户量)</span>                            
                            <span className="todayDataNum">{this.state.todayDataNum[0]}</span>
                            <div className="todayDataD">                                
                                <div className='todayDataInB'>
                                    <span style={{color:'black'}}>日</span>
                                    <span className="todayDataIcon" style={{color:(this.state.todayDataIcon1[0]==1?"red":"green")}} dangerouslySetInnerHTML = {{ __html:this.state.todayDataIcon1[0]==1?'&#8593;':'&#8595;' }}></span>
                                    <span className="dataVal">{this.state.dataVal1[0]}</span>                                    
                                </div>                                                                
                                <div className='todayDataInB'>
                                    <span style={{color:'black'}}>周</span>
                                    <span className="todayDataIcon" style={{color:(this.state.todayDataIcon1[1]==1?"red":"green")}} dangerouslySetInnerHTML = {{ __html:this.state.todayDataIcon1[1]==1?'&#8593;':'&#8595;' }}></span>
                                    <span className="dataVal">{this.state.dataVal1[1]}</span>                                    
                                </div>                                                                
                                <div className='todayDataInB'>
                                    <span style={{color:'black'}}>月</span>
                                    <span className="todayDataIcon" style={{color:(this.state.todayDataIcon1[2]==1?"red":"green")}} dangerouslySetInnerHTML = {{ __html:this.state.todayDataIcon1[2]==1?'&#8593;':'&#8595;' }}></span>
                                    <span className="dataVal">{this.state.dataVal1[2]}</span>                                    
                                </div>
                            </div>
```

其中dangerouslySetInnerHTML就是负责html展示的内容，同时该标签内不允许写入文字，只能在这个属性里写
