---
title: "2020-12-15 vue表单的el-form-item循环验证绑定数据问题"
description: "先上代码： 数据格式： 在对其中的标签<el-form-item进行for循环的时候，需要动态添加prop和rule，其中特别注意的是prop内部的写法"
date: 2020-12-15
collection: vue
tags: ["Vue"]
readingTime: 1
wordage: 55
originalUrl: "https://www.jianshu.com/p/bbbb3cd28287"
---
先上代码：

```
.........
<div class="dialogCheckbox">
        <el-form
          ref="dialogCheckbox"
          :model="dialogCheckbox"
          label-width="200px"
          label-position="left"
          :rules="dialogCheckRules"
        >
          <el-form-item label="选项名称（可不写）" prop="label">
            <el-input v-model="dialogCheckbox.label"></el-input>
          </el-form-item>
          <el-form-item
            label="多选框名称（可不写）"
            v-for="(item, index) in dialogCheckbox.nameArr"
            :key="index"
            :prop="'nameArr.' + index + ('.name' + index)"
            :rules="dialogCheckRules['name' + index]"
          >
            <!-- :prop="'name' + index" -->

            <!-- <el-form-item
            label="多选框名称（可不写）"
            v-for="(item, index) in dialogCheckbox.nameArr"
            :key="index"            
            :prop="dialogCheckbox.nameArr[index].name"
          > -->
            <el-input v-model="item['name' + index]"></el-input>
          </el-form-item>
        </el-form>
      </div>
```

数据格式：

```
...........
dialogCheckbox: {
        label: "",
        nameArr: [
          // {
          //   name0: "",
          //   name:"name0"
          // }
        ],
      },
      dialogCheckRules: {
        label: [{ required: true, message: "请输入选项名称", trigger: "blur" }],
        // name0: [
        //   { required: true, message: '请输入多选框名称', trigger: 'blur' },
        // ],
      },
```

在对其中的标签<el-form-item>进行for循环的时候，需要动态添加prop和rule，其中特别注意的是prop内部的写法
