---
title: "tcp协议"
description: "TCP的三次握手 传输控制协议TCP 面向连接的可靠的基于字节流的传输层通信协议 将应用层的数据流分割成成报文段并发送给目标节点的TCP层 数据包都有序号，对方收到则发送ac..."
date: 2019-03-01
collection: browser-network
tags: []
readingTime: 2
wordage: 691
originalUrl: "https://www.jianshu.com/p/a97f69510fdb"
---
### TCP的三次握手

#### 传输控制协议TCP

1.  面向连接的可靠的基于字节流的传输层通信协议
2.  将应用层的数据流分割成成报文段并发送给目标节点的TCP层
3.  数据包都有序号，对方收到则发送ack确认，未收到则重传
4.  使用奇偶校验来校验数据在传输过程中是否有误

![](/images/blog/tcp-xie-yi/01.png)

1、TCP服务器处于LISTEN状态，准备接受客户端请求。  
2、客户端发出连接请求报文（SYN报文段） SYN=1 seq=x （初始序号，任意正整数）第一次握手  
3、服务器发出确认连接（ACK=1,SYN=1,seq=y,ack=x+1 上一个报文消耗掉一个序列号）第二次握手  
4、客户端收到确认连接报文，再给服务端发个报文。（ACK=1，seq=x+1,ack=y+1）可以携带数据  
5、建立连接

第一次握手：客户端发送SYN包（syn=j）到服务器，进入SYN\_SEND状态，等待服务器确认  
第二次握手：服务器收到SYN包，必须确认客户端的SYN（ack=j+1），同时自己也发送一个SYN包（syn=k），即SYN+ACK包，此时服务器进入SYN\_RECV状态  
第三次握手：客户端收到服务器的SYN+ACK包，向服务器发送确认包ACK(ack=k+1)此包发送完，客户端和服务器进入ESTABLISHED状态，完成三次握手

三次握手是为了初始化sequence number的初始值

首次握手的隐患：SYN超时  
客户端发送SYN报文后下线，服务端将会重发SYN报文，一共等待63秒（1+2+4+8+16+32）

### TCP的四次回收

挥手是为了终止连接

![](/images/blog/tcp-xie-yi/02.png)

第一次挥手：客户端发送FIN报文，用来关闭客户端到服务端的数据传送（单向，仍可接受数据），客户端进入FIN\_WAIT\_1状态  
第二次挥手：服务端收到FIN报文后，发送一个ACK给客户端，确认序号为收到的序号+1，服务端进入CLOSE\_WAIT状态。  
第三次挥手：服务端发送一个FIN，用来关闭服务端到客户端的数据传送，服务端进入LAST\_ACK状态  
第四次挥手：客户端收到FIN后，客户端进入TIME\_WAIT状态，接着发送一个ACK给服务端，确认序号为收到的序号+1，服务端进入CLOSE状态，完成四次挥手

链接：[https://www.jianshu.com/p/7c47114a8b0a](https://www.jianshu.com/p/7c47114a8b0a)
