# css命名方式哪家强？驼峰 or 连字符 or 各种方法论？
### 驼峰 
输入不方便、引入了大小写的复杂度、可读性无优势
### 连字符
易读易输入
### 方法论
就是编写CSS代码的规范和方法（第一次听说这些叫做方法论，孤陋寡闻。。。）
#### 1.OOCSS
js有面向对象编程思想，CSS模仿js，面向对象的CSS。
原则有两个

1. 结构和样式分离。像bootstrap按钮的写法。
```css

  .btn{	
    display: inline-block;
    font-weight: 400;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    border: 1px solid transparent;
    padding: .375rem .75rem;
    font-size: 1rem;
    line-height: 1.5;
    border-radius: .25rem;
    transition: color .15s ease-in-out,background-color .15s ease-in-out,bordercolor .15s 
  }

```
2. 容器和内容分离。

#### 2.SMACSS（Scalable and Modular Architecture for CSS 可扩展和模块化的CSS架构）
他将样式分成5中类型：Base，Layout，Module，State，Theme。

1. Base 基础样式表，定义了基本的样式，我们平时写CSS比如reset.css就是属于基础样式表，另外我认为清除浮动，一些动画也可以归类为基础样式。
2. Layout 布局样式，用于实现网页的基本布局，搭起整个网页的基本骨架。
3. Module 网页中不同的区域有这个不同的功能，这些功能是相对独立的，我们可以称其为模块。模块是独立的，可重用的组件，它们不依赖于布局组件，可以安全的删除修改而不影响其他模块。
4. State 状态样式，通常和js一起配合使用，表示某个组件或功能不同的状态，比如菜单选中状态，按钮不可用状态等


#### 3.BEM（block-element-modifier)
基于组件方式的web开发方法。
基本思想：讲用户界面分为独立的模块。
BEM 命名给 CSS 以及 html 提供清晰结构，命名空间提供更多信息，模块化提高代码的重用，以达到 CSS 命名语义化、可重用性高、后期维护容易、加载渲染快的要求。
允许重现现有代码。
	
##### a)block：模块，名字单词间用 - 连接
模块名称描述这个组件是什么，不是它的颜色或者他是文字。

	<!-- 正确的，这个 'error' 模块是具有语义上的意义的 -->
	<div class="error"></div>
	<!-- 不正确的，它描述了模块的外观 -->
	<div class="red-text"></div>

具有独立性，在使用模块时，不应该影响它所在的环境，比如padding、position都不应该使用，也不应该使用css标签选择器和ID选择器。模块之间可以嵌套，也可以多层级嵌套。

##### b)element：元素，模块的子元素，以 __ 与 block 连接
元素名称是描述这个懂事是什么，比如他是个text、button等等。

	<!-- 'search-form' 模块 -->
	<form class="search-form">
	    <!-- 在 'search-form' 模块内的 'input' 元素 -->
	    <input class="search-form__input"/>
	    <!-- 在 'search-form' 模块内的 'button' 元素 -->
	    <button class="search-form__button"></button>
	</form>
	
元素是模块的一部分，依赖于模块，因此元素不可单独使用，名称也是依赖于模块；元素下面也不可以再定义元素，可以嵌套元素；在模块中，多个元素的情况下，有些元素可有可无，并不是必须所有的元素都存在。

##### c)modifier：修饰，模块的变体，定义特殊模块，以 -- 与 block 连接

其实就是描述这个东西的外观，比如他是红色的，他是大的小的，他应该改变的事他的外观，行为或者行为状态。当然，修饰符不能单独使用，是依赖于模块和元素的。

	<!-- 正确的。'search-form' 模块有值为 'islands' 的 'theme' 修饰符 -->
	<form class="search-form search-form_theme_islands">
	    <input class="search-form__input">
	
	    <button class="search-form__button">Search</button>
	</form>
	
	<!-- 不正确的。'search-form' 丢失了 -->
	<form class="search-form_theme_islands">
	    <input class="search-form__input">
	
	    <button class="search-form__button">Search</button>
	</form>
	
##### d)什么时候使用元素 or 模块？
1.	如果这段代码可能被重用，并且它不依赖于页面上的其他组件，那你应该创建一个模块。
2.	如果这段代码在没有父实体（模块）的情况下不能使用，那你应该创建一个元素。

参考：http://www.jianshu.com/p/407bd68a5677
		https://jiandanxinli.github.io/2016-08-11.html
		https://github.com/Tencent/tmt-workflow/wiki/%E2%92%9B-%5B%E8%A7%84%E8%8C%83%5D--CSS-BEM-%E4%B9%A6%E5%86%99%E8%A7%84%E8%8C%83
		
# 如何写出可维护的CSS和HTML
可维护的CSS具有可重用性、可扩展性、可修改性。

1. 可重用性：一个组件，在项目中有不同的样式，那么就可以把相同的样子提取出来，不同的样式分别作出。
2. 可扩展性：若增加了一个新的功能，那么要保证新的代码不会影响旧的代码，并且要尽可能用旧的代码。
3. 可修改性：如果某个组件不要了，可以完整的删掉，而不影响其他的组件。

1. 内容和样式分离。尽量不要在HTML代码中写行内样式，易于管理和维护。
2. 不要使用@important。影响CSS文件的加载速度。
3. 选择器的嵌套尽量不要吵过三层。简洁的选择器可以减少CSS文件大小，提高页面的加载性能，浏览器解析时也会更加高效，也会提高开发人员的开发效率，降低维护成本。
4. 把CSS中不用的样式去掉，缩小CSS文件的大小。
5. 命名和备注。（个人观点）命名统一，以防止出现命名冲突。在每个小文件的开头备注这个文件中的内容，比如这个文件中有组件A的样式，B的样式等等。在组件A的样式部分备注A样式的start和end，增加的和A组件有关的样式均写在其中。
命名推荐：
	
		头:header                                      
		内容:content/container
		尾:footer                                      
		导航:nav
		侧栏:sidebar                                    
		栏目:column
		页面外围控制整体佈局宽度:wrapper                   
		左右中:left right center
		登录条:loginbar                                 
		标志:logo
		广告:banner
		页面主体:main
		热点:hot
		新闻:news
		下载:download
		子导航:subnav
		菜单:menu
		子菜单:submenu
		搜索:search
		友情链接:friendlink
		页脚:footer
		版权:copyright
		滚动:scroll
		内容:content
		标签:tags
		文章列表:list
		提示信息:msg
		小技巧:tips
		栏目标题:title
		加入:joinus
		指南:guide
		服务:service
		注册:regsiter
		状态:status
		投票:vote
		合作伙伴:partner
		导航:nav
		主导航:mainnav
		子导航:subnav
		顶导航:topnav
		边导航:sidebar
		左导航:leftsidebar
		右导航:rightsidebar
		菜单:menu
		子菜单:submenu
		标题: title
		摘要: summary
6. 书写规范：

		http://codeguide.bootcss.com/

参考：

		http://luopq.com/2016/01/05/css-optimize/
		https://segmentfault.com/a/1190000000388784/

# inline-block和float
都可以实现使元素水平排列。
inline-block的元素具有行内和块状元素的特性，float则还属于块状元素。

	1.inline-block不会脱离文档流，float会使元素脱离文档流，其它元素会环绕他，并产生相应的浮动问题，比如父元素没有高度。
	2.inline-block元素，可以使用vertical-align元素使其上下居中 or 以上边界对齐 or 下边界对齐，float不可以；可以使用text-align使inline-block元素左右居中，float不可以。
	3.inline-block使用时元素中间会产生空白，float不会，可以在父元素中使用font-size:0去掉空白（还有方法，个人觉得这个是最好用）
	
使用float:
![](/Users/Alva/Desktop/cssMD/float.png
)
使用inline-block:
![](/Users/Alva/Desktop/cssMD/inlineBlock.png
)

http://www.zhangxinxu.com/wordpress/2010/11/%E6%8B%9C%E6%8B%9C%E4%BA%86%E6%B5%AE%E5%8A%A8%E5%B8%83%E5%B1%80-%E5%9F%BA%E4%BA%8Edisplayinline-block%E7%9A%84%E5%88%97%E8%A1%A8%E5%B8%83%E5%B1%80/









		

