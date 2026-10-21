---
title: "2020-03-30 @RestController与@Controller的区别"
description: "如果@RestController注解Controller，则返回的内容就是Return 里的内容。例如：@RestController@RequestMappingpubl..."
date: 2020-03-30
collection: java-spring
tags: []
readingTime: 1
wordage: 104
originalUrl: "https://www.jianshu.com/p/bd56a686524f"
---
如果@RestController注解Controller，则返回的内容就是Return 里的内容。  
例如：  
@RestController  
@RequestMapping  
public class TestController {  
@RequestMapping("/index")  
public String index() {  
return "user/hello";  
}  
}  
页面显示的是user/hello字符串  
如果@Controller注解Controller，则返回到指定页面。  
例如：  
@Controller  
@RequestMapping  
public class TestController {  
@RequestMapping("/index")  
public String index() {  
return "user/hello";  
}  
}  
显示user底下的hello页面上的内容  
来自百度：[https://zhidao.baidu.com/question/1610921295047549307.html](https://links.jianshu.com/go?to=https%3A%2F%2Fzhidao.baidu.com%2Fquestion%2F1610921295047549307.html)
