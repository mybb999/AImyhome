---
title: "gitlab开始搭建"
description: "1.先配置用户名密码 git config --global user.name \"名字\" git config --global user.email \"邮箱\" 2.生成S..."
date: 2018-08-28
collection: engineering
tags: []
readingTime: 2
wordage: 705
originalUrl: "https://www.jianshu.com/p/8d4f7a735fab"
---
## 1.先配置用户名密码

git config --global user.name "名字"

git config --global user.email "邮箱"

2.生成SSH公钥与gitlab绑定，ssh-keygen -t rsa -C "[your\_email@example.com](https://links.jianshu.com/go?to=mailto%3Ayour_email%40example.com)"，邮箱写你自己邮箱

3.git init初始化，ls -al查询当前文件夹文件

4.git remote add origin 仓库地址，这一步是添加远程仓库（git remote remove origin 删除远程仓库地址）

5.add . 提交所有文件，那个点可以替换成+指定文件名，有没+号忘了

6.git commit -m "描述文字"，提交参数，-m不能丢，描述文字意思一样就是描述这个文件的

7.git push origin master，同步gitlab和本地文件，这一步有个问题说一下，之前我尝试过更换过global user.name或邮箱啥的，密钥就出问题了，提示refusing to merge unrelated histories，这是用户指针的改变造成的，可以输入git pull --allow-unrelated-histories解决

8.切换分支git checkout abcde

9.合并分支git merge qq，假如在abcde上合并qq文件，然后git push origin abcde；冲突的话需要到提示的文件里去查看版本冲突的地方修改，然后git add和git commit再push

命令行：  
配置用户密码git config --global user.name "名字"，git config --global user.email "邮箱"  
生成SSH：ssh-keygen -t rsa -C "[your\_email@example.com](https://links.jianshu.com/go?to=mailto%3Ayour_email%40example.com)"  
git初始化:git init  
提交所有文件:add .  
提交参数:git commit -m "描述"  
同步文件:git push origin master  
查看分支：git branch  
创建分支：git branch 文件名  
切换分支：git checkout 文件名  
合并分支：git merge 文件名  
删除分支：git branch -d 文件名

<-----------------------分界线，二次理解---------------------->  
在git remote add origin时候发现了一个问题，在自己另外新建的一个文件夹中，打算让本地库与gitlab的远程库相关联时候push错误，网上有这样一个原因：  
出现错误的主要原因是github中的README.md文件不在本地代码目录中  
可以通过如下命令进行代码合并【注：pull=fetch+merge\]

git pull --rebase origin master

其实readme.md有没相关不清楚，但至少是pull下来合并了，问题得到解决。

注明：  
1.git push -u origin master把本地库的所有内容推送到远程库上，第一次加上了-u参数，Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，在以后的推送或者拉取时就可以简化命令 为git push origin master  
2.git pull则是更新本地文件
