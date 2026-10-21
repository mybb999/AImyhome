---
title: "vue请求数据方法$http"
description: "GET传递参数要加上params POST传递参数方法 另外说一句，现在VUE官方推荐使用axios，例如我这种人有点懒，当初就直接用了jq的ajax代替了"
date: 2019-02-26
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 56
originalUrl: "https://www.jianshu.com/p/595580b45052"
---
GET传递参数要加上params

```
<script>
            var vm=new Vue({
                el:'#app',
                data:{},
                methods:{
                    get:function(){
                            //get请求 需要向后台传参数 语法：{params:{a:10,b:2}}
                            //this.$http.get('get.php',{params:{a:10,b:2}}).then(function(res){}
                        this.$http.get('get.php',{params:{a:10,b:2}}).then(function(res){
                            console.log(res);
                            console.log(res.data);
                        },function(res){
                            console.log('失败')
                        })
                    }
                }
            })
        </script>
```

POST传递参数方法

```
<script>
            var vm=new Vue({
                el:'#app',
                data:{},
                methods:{
                    post:function(){
                        //post方法有三个参数post("php文件"，"参数","emulateJSON:true")
                //emulateJSON:true  模拟一个JSON数据发送到服务器，这样才可以成功运行 
                        this.$http.post('post.php',{a:10,b:2},{emulateJSON:true}).then(function(res){
                            console.log(res);
                            console.log(res.data);
                        },function(res){
                            console.log('失败')
                        })
                    }
                }
            })
        </script>
```

另外说一句，现在VUE官方推荐使用axios，例如我这种人有点懒，当初就直接用了jq的ajax代替了
