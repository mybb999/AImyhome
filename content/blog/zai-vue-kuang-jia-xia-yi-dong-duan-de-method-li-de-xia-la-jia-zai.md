---
title: "在vue框架下移动端的method里的下拉加载"
description: "在vue框架下移动端的method里的下拉加载"
date: 2018-08-28
collection: vue
tags: ["Vue", "移动端"]
readingTime: 2
wordage: 627
originalUrl: "https://www.jianshu.com/p/c615457cf176"
---
```
//下拉刷新实验
            scrollDrop:function(){
                var _this=this;
                // var switchC=true;
                                
                $(window).on("scroll",function(){                   
                    if(window.location.hash.indexOf('managerListTab3')!=-1){//这一步只是检验当前地址而已

                        if($(document).scrollTop() + $(window).height() >= $(document).height()&&_this.switchC==true){                      
                            //执行方法体                     
                            setTimeout(_this.implement,500)
                            _this.switchC=false;
                        }

                    }
                    else{                       
                        $ (window).unbind('scroll');                        
                    }
                                        
                })
            },
            //下拉执行，执行你写的方法，我直接复制过来而已
            implement:function(){
                var _this=this;
                console.log("fuck")
                var index=$(".board").last().index();                                                   
                for(var i=1+index;i<11+index;i++){
                    if(!_this.allBoard[i]==""){
                        _this.board.push(_this.allBoard[i]);                                
                    }
                    else{                                   
                        $("#loadTip").html("已经没有更多信息")
                    }
                }
                _this.switchC=true;
            }
```
