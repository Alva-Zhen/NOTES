1. Doctype作用？标准模式与兼容模式各有什么区别?

    <! DOCTYPE> 声明位于HTML文档中的第一行，处于 <html> 标签之前。告知浏览器的解析器用什么文档标准解析这个文档。
    
    DOCTYPE不存在或格式不正确会导致文档以兼容模式呈现。

    标准模式的排版和JS运作模式都是以该浏览器支持的最高标准运行。在兼容模式中，页面以宽松的向后兼容方式显示,模拟老式浏览器的行为以防止站点无法工作。

2. 行内元素有哪些？块级元素有哪些？ 空(void)元素有那些？

    CSS规范规定，每个元素都有display属性，确定该元素的类型，每个元素都有默认的display值，如div的display默认值为“block”，则为“块级”元素；span默认display属性值为“inline”，是“行内”元素。

    行内元素有：`a b span img input select strong（强调的语气）`

    块级元素有：`div ul ol li dl dt dd h1 h2 h3 h4…p`

    常见的空元素：`<br> <hr> <img> <input> <link> <meta>`
    
    鲜为人知的是：`<area> <base> <col> <command> <embed> <keygen> <param> <source> <track> <br>`

3. 页面导入样式时，使用link和@import有什么区别？

    link属于XHTML标签，除了加载CSS外，还能用于定义RSS, 定义rel连接属性等作用；而@import是CSS提供的，只能用于加载CSS;

    页面被加载的时，link会同时被加载，而@import引用的CSS会等到页面被加载完再加载;

    import是CSS2.1 提出的，只在IE5以上才能被识别，而link是XHTML标签，无兼容问题;

    link支持使用js控制DOM去改变样式，而@import不支持;

4. 介绍一下你对浏览器内核的理解？

    主要分成两部分：渲染引擎(layout engineer或Rendering Engine)和JS引擎。
    
    渲染引擎：负责取得网页的内容（HTML、XML、图像等等）、整理讯息（例如加入CSS等），以及计算网页的显示方式，然后会输出至显示器或打印机。浏览器的内核的不同对于网页的语法解释会有不同，所以渲染的效果也不相同。所有网页浏览器、电子邮件客户端以及其它需要编辑、显示网络内容的应用程序都需要内核。

    JS引擎：解析和执行javascript来实现网页的动态效果。

    最开始渲染引擎和JS引擎并没有区分的很明确，后来JS引擎越来越独立，内核就倾向于只指渲染引擎。

5. 常见的浏览器内核有哪些？

    Trident内核：IE,MaxThon,TT,The World,360,搜狗浏览器等。[又称MSHTML]

    Gecko内核：Netscape6及以上版本，FF,MozillaSuite/SeaMonkey等

    Presto内核：Opera7及以上。      [Opera内核原为：Presto，现为：Blink;]

    Webkit内核：Safari,Chrome等。   [ Chrome的：Blink（WebKit的分支）]

6. 简述一下你对HTML语义化的理解？

    html语义化让页面的内容结构化，结构更清晰，便于对浏览器、搜索引擎解析;
    即使在没有样式CSS情况下也以一种文档格式显示，并且是容易阅读的;
    搜索引擎的爬虫也依赖于HTML标记来确定上下文和各个关键字的权重，利于SEO;
    使阅读源代码的人对网站更容易将网站分块，便于阅读维护理解。

7. 如何实现浏览器内多个标签页之间的通信? (阿里)
    WebSocket、SharedWorker；

    也可以调用localstorge、cookies等本地存储方式,localstorge另一个浏览上下文里被添加、修改或删除时，它都会触发一个事件，我们通过监听事件，控制它的值来进行页面信息通信；

    注意quirks：Safari 在无痕模式下设置localstorge值时会抛QuotaExceededError 的异常；

8. webSocket如何兼容低浏览器？(阿里)

    Adobe Flash Socket 、ActiveX HTMLFile (IE) 、基于 multipart 编码发送 XHR、基于长轮询的 XHR

9. 网页验证码是干嘛的，是为了解决什么安全问题。

    区分用户是计算机还是人的公共全自动程序。可以防止恶意破解密码、刷票、论坛灌水；

    有效防止黑客对某一个特定注册用户用特定程序暴力破解方式进行不断的登陆尝试。

10. cookies，sessionStorage 和 localStorage 的区别？

    cookie是网站为了标示用户身份而储存在用户本地终端（Client Side）上的数据（通常经过加密）。

    cookie数据始终在同源的http请求中携带（即使不需要），记会在浏览器和服务器间来回传递。

    sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。

    存储大小：

        cookie数据大小不能超过4k。

        sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

    有期时间：

        localStorage    存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；
        sessionStorage  数据在当前浏览器窗口关闭后自动删除。
        cookie          设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭
