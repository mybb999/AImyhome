---
title: "提交表单form"
description: "除了html里的 ，js还有通过ajax提交表单new FormData()方法，以下是我项目一部分"
date: 2019-03-01
collection: browser-network
tags: []
readingTime: 1
wordage: 30
originalUrl: "https://www.jianshu.com/p/2a3a5f94415e"
---
除了html里的<form name="input" action="地址" method="get/post">，js还有通过ajax提交表单new FormData()方法，以下是我项目一部分

```
$(".upload").click(function(){
        var file=new FormData($(".upload_contant")[0]);        
        // var fileName=$(".uploadName").val();
        // var typeId=$(".uploadTypeId option:selected").val();
        // var vendor=$(".supplierName").val();
        // var blob = new Blob([content],{type:"text/xml"});
        // file.append("fileName",fileName);
        // file.append("typeId",typeId);
        // file.append("vendor",vendor);
        // var jsonStr="fileName="+fileName+"&typeId="+typeId+"&vendor="+vendor+"&file="+file;
        var replaceUpload=$(".uploadName").val().replace(/\s+/g,'');
        var replaceVendor=$(".supplierName").val().replace(/\s+/g,'');
        /*if(replaceUpload.length==0||replaceVendor.length==0||$(".uploadFile").val()==""){
          alert("不能输入为空");
        }*/
        var uploadTypeOpt = $(".uploadTypeId option:selected").val();
        var reg = /^[A-Za-z0-9_\u4e00-\u9fa5]{0,30}$/;//30位数字字母下划线汉字
        if(!reg.test($(".uploadName").val())){
          alert("资料名只能30位以内数字字母下划线汉字");
          return;
        }
        if(!reg.test($(".supplierName").val())){
          alert("供应商只能30位以内数字字母下划线汉字");
          return;
        }

        if($(".uploadFile").val()==""){
          alert("请选择文件！");
          return;
        }

        if(uploadTypeOpt=="-1"){
          alert("选择或新增分类！");
          return;
        }
        else{
          $.ajax({
            url:"/mss/technicalDoc/upload",
            // dataType:"json",
            type:"post",
            data: file,
            async: true,
            cache: false,
            contentType: false,
            processData: false,
            success: function(data){
              alert("上传成功！");
              $(".upload_data").hide();
              technical_ifo(pageNumTest);
              $(".uploadName").val("");
              $(".supplierName").val("");
              $(".uploadFile").val("");
            },
            error: function(){
              alert("上传失败！");
              $(".uploadFile").val("");
            }
          })
        }        
      })
```
