 > flex容器：采用了flex布局的元素。
 
 > 主轴由flex-direction 定义。<br/>
 交叉轴垂直于主轴

 <image src="./flex.png">
 css:
 
 ```
 .flex{
    display: flex;
}
```
html:
```
 <!--flex容器-->
 <div class="flex">
    <!--flex 元素-->
    <div>1</div>
    <!--flex 元素-->
    <div>2</div>
    <!--flex 元素-->
    <div>3</div>
</div>
 ```
 
flex元素的行为：

* 元素排列为一行 (flex-direction 属性的初始值是 row)。
* 元素从主轴的起始线开始。
* 元素不会在主维度方向拉伸，但是可以缩小。
* 元素被拉伸来填充交叉轴大小。
* flex-basis 属性为 auto。
* flex-wrap 属性为 nowrap。
 
 #### flex-direction 更改轴的方向
 * row：默认主轴方向横向。
 * row-reverse ：交换横向主轴的起始线和终止线。
 * column：主轴方向设置为竖直方向。
 * column-reverse：交换竖直方向主轴的起始线和终止线（将主轴设置成了竖直方向）。


#### flex-wrap 多行flex容器
* nowrap：默认不换行，如果子元素总体宽度大于外层父元素宽度，会适当缩小。
* wrap：换行，如果子元素总体宽度大于外层父元素宽度，会换行，此时应该把每一行看做一个flex容器。
* wrap-reverse：交换主轴的起始线和终止线。

#### flex-flow 简写属性
flex-direction 和 flex-wrap的简写属性。
```
flex-flow:[flex-direction] [flex-wrap]
```
