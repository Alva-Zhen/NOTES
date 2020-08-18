1. 介绍一下标准的CSS的盒子模型？低版本IE的盒子模型有什么不同的？

    （1）有两种， IE 盒子模型、W3C 盒子模型；

    （2）盒模型： 内容(content)、填充(padding)、边界(margin)、 边框(border)；
    
    （3）区  别： IE的content部分把 border 和 padding计算了进去;

2. CSS选择符有哪些？哪些属性可以继承？
    * 1.id选择器（ # myid）

        2.类选择器（.myclassname）

        3.标签选择器（div, h1, p）

        4.相邻选择器（h1 + p）

        5.子选择器（ul > li）

        6.后代选择器（li a）

        7.通配符选择器（ * ）

        8.属性选择器（a[rel = "external"]）

        9.伪类选择器（a:hover, li:nth-child）

    * 可继承的样式： font-size font-family color, UL LI DL DD DT;
    * 不可继承的样式：border padding margin width height ;

3. CSS优先级算法如何计算？

    优先级就近原则，同权重情况下样式定义最近者为准;

    载入样式以最后载入的定位为准;

    优先级为:

        同权重: 内联样式表（标签内部）> 嵌入样式表（当前文件中）> 外部样式表（外部文件中）。
        !important >  id > class > tag
        important > 内联优先级高

4. display有哪些值？说明他们的作用。

    block：块类型。默认宽度为父元素宽度，可设置宽高，换行显示。

    none：元素不显示，并从文档流中移除。

    inline：行内元素类型。默认宽度为内容宽度，不可设置宽高，同行显示。

    inline-block：默认宽度为内容宽度，可以设置宽高，同行显示。

    list-item：象块类型元素一样显示，并添加样式列表标记。

    table ：此元素会作为块级表格来显示。

    inherit：规定应该从父元素继承 display 属性的值。

5. position的值relative和absolute定位原点是？

    static：默认值。元素使用正常的布局行为，即元素在文档常规流中当前的布局位置。（忽略 top, bottom, left, right z-index 声明）。

    relative：生成相对定位的元素，相对于其正常位置进行定位。

    absolute：生成绝对定位的元素，相对于值不为 static的第一个父元素进行定位，不为元素预留空间，若没有值不为static的父元素定位时，则相对于ICB（inital container block, 初始包含块）进行定位。

    sticky：盒位置根据正常流计算(这称为正常流动中的位置)，然后相对于该元素在流中的 flow root（BFC）和 containing block（最近的块级祖先元素）定位。

    fixed：生成绝对定位的元素，相对于浏览器窗口进行定位，不为元素预留空间。

    inherit：规定从父元素继承 position 属性的值。

6. CSS3有哪些新特性？

    新增各种CSS选择器	（: not(.input)：所有 class 不是“input”的节点）

    圆角		    （border-radius:8px）

    多列布局	    （multi-column layout）

    阴影和反射	（Shadow\Reflect）

    文字特效		（text-shadow、）

    文字渲染		（Text-decoration）

    线性渐变		（gradient）

    旋转		 	（transform）

    缩放,定位,倾斜,动画,多背景，例如:transform:\scale(0.85,0.90)\ translate(0px,-30px)\ skew(-9deg,0deg)\Animation:

7. 请解释一下CSS3的Flexbox（弹性盒布局模型）,以及适用场景？

   一个用于页面布局的全新CSS3功能，Flexbox可以把列表放在同一个方向（从上到下排列，从左到右），并让列表能延伸到占用可用的空间。较为复杂的布局还可以通过嵌套一个伸缩容器（flex container）来实现采用Flex布局的元素，称为Flex容器（flex container），简称"容器"。它的所有子元素自动成为容器成员，称为Flex元素（flex item），简称"元素"。常规布局是基于块和内联流方向，而Flex布局是基于flex-flow流可以很方便的用来做居中，能对不同屏幕大小自适应。在布局上有了比以前更加灵活的空间。

8. li与li之间有看不见的空白间隔是什么原因引起的？有什么解决办法？

    行框的排列会受到中间空白（回车\空格）等的影响，因为空格也属于字符,这些空白也会被应用样式，占据空间，所以会有间隔，把字符大小设为0，就没有空格了。

9. 为什么要初始化CSS样式。

    因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异；

    当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

    最简单的初始化方法： * {padding: 0; margin: 0;} （强烈不建议）

10. position跟display、margin collapse、overflow、float这些特性相互叠加后会怎么样？

    * 如果元素的display为none,那么元素不被渲染，position,float不起作用；
    * 如果元素拥有position:absolute或者position:fixed属性那么元素将为绝对定位，float不起作用；
    * 如果元素float属性不是none,元素会脱离文档流,根据float属性值来显示.有浮动；
    * 绝对定位,inline-block属性的元素,margin不会和垂直方向上的其他元素margin折叠.

11. css定义的权重

    以下是权重的规则：
    
    标签的权重为1，class的权重为10，id的权重为100。 如果权重相同，则最后定义的样式会起作用。

12. 请解释一下为什么需要清除浮动？清除浮动的方式

    清除浮动是为了清除使用浮动元素产生的影响。浮动的元素，高度会塌陷，而高度的塌陷使我们页面后面的布局不能正常显示。

13. 什么是外边距合并？

  外边距合并指的是，当两个垂直外边距相遇时，它们将形成一个外边距。
  合并后的外边距的高度等于两个发生合并的外边距的高度中的较大者。

14. CSS优化、提高性能的方法有哪些？

  关键选择器（key selector）。选择器的最后面的部分为关键选择器（即用来匹配目标元素的部分）；

  如果规则拥有 ID 选择器作为其关键选择器，则不要为规则增加标签。过滤掉无关的规则（这样样式系统就不会浪费时间去匹配它们了）；

  提取项目的通用公有样式，增强可复用性，按模块编写组件；增强项目的协同开发性、可维护性和可扩展性;

  使用预处理工具或构建工具（gulp对css进行语法检查、自动补前缀、打包压缩、自动优雅降级）；

15. 浏览器是怎样解析CSS选择器的？

    样式系统从关键选择器开始匹配，然后左移查找规则选择器的祖先元素。

    只要选择器的子树一直在工作，样式系统就会持续左移，直到和规则匹配，或者是因为不匹配而放弃该规则。

16. margin和padding分别适合什么场景使用？

    margin是用来隔开元素与元素的间距；padding是用来隔开元素与内容的间隔。

    margin用于布局分开元素使元素与元素互不相干；padding用于元素与内容之间的间隔，让内容（文字）与（包裹）元素之间有一段。