---
title: 引用类型-Array
date: 2020-02-02
tags: 红皮书
categories: 红皮书
---

##### 创建方式

```
//1. 构造函数(new 可以省略)
var arr = new Array();
var arr = new Array(X);//创建 length 值为 X（数字） 的数组
var arr= new Array("red", "blue", "green");// 包含数组项

//4. 字面量方式
var arr=[]
var arr=[1,2,3]
```

数组具有长度，通过设置数组的长度可以实现数组添加和移除项。

```
var arr=[1,2,3];
console.log(arr.length);//3 初始化长度为3
//将arr的长度修改为5，数据将从末尾添加项，并赋值为undefined
arr.length=5；
console.log(arr);//[1, 2, 3, undefined,undefined]
//将arr的长度修改为2，数组将移除项
arr.length=2;
console.log(arr);//[1, 2]
```

##### 判断方法

1. <p>instanceof</p>
   该方法假定只有一个全局执行环境，但是如果有不同框架，那么就有可能有多个不同的全局执行环境，就会有不同版本的构造函数，判断就不会很准确。
2. Array.isArray()
   可以跨域不同执行环境的歧视来判断。
   ```
   var arr=[1,2,3];
   console.log(Array.isArray(arr));//true
   ```

##### 转换方法

1. 数组转字符串
   使用对象都具有的 toLocaleString()、toString()和 valueOf()方法。
   在使用 toString()、toLocaleString()方法时，实际上是调用数组每一项的 toString()、toLocaleString()方法，拼接成字符串。

```
var a1 = {
  toLocaleString: function() {
    return "a1+toLocaleString";
  },
  toString: function() {
    return "a1+toString";
  },
  valueOf: function() {
    return "a1+valueOf";
  }
};
var a2 = {
  toLocaleString: function() {
    return "a2+toLocaleString";
  },
  toString: function() {
    return "a2+toString";
  },
  valueOf: function() {
    return "a2+valueOf";
  }
};
var arr = [a1, a2];
arr.toString();//"a1+toString,a2+toString"
arr.toLocaleString();//"a1+toLocaleString,a2+toLocaleString";
arr.valueOf();// [{…}, {…}]  a1和a2两个对象
```

使用 join()方法，join()接收一个参数，作为分隔字符串的分隔符。省略参数，默认都好分隔。

```
var arr=[1,2,3];
arr.join();//"1,2,3"
arr.join('|');//"1|2|3"
```

##### 添加和移除

```
var arr=[1,2,3];

//1. push()：向数组末尾添加项，返回新数组的长度，参数不限个，无参数，则不添加。
var newArr=arr.push(4,5,6);
console.log(newArr);//6
console.log(arr);//[1, 2, 3, 4, 5, 6]

//2. pop()：从数组末尾移除项，返回移除项，无参数。
var popArr=arr.pop();
console.log(popArr);//6
console.log(arr);//[1, 2, 3, 4, 5]

//3. shift()：从数组前端移除项。返回移除项，无参数。
var shiftArr=arr.shift();
var shiftArr=arr.shift();//1
console.log(arr);//[2, 3, 4, 5]

//4. unshift()：向数组前端添加项，返回新数组的长度，参数不限个，无参数，则不添加。
var unshiftArr=arr.unshift('a','b');
console.log(unshiftArr);//6
console.log(arr);//["a", "b", 2, 3, 4, 5]
```

##### 排序

1. reverse()：倒叙排列，返回排序之后的数组。

```
var arr=[1,2,3,4,5];
arr.reverse();//[5, 4, 3, 2, 1]
```

2. sort()：升序排列，返回排序之后的数组，接收一个比较函数为参数。比较的事字符串，在比较时，会调用数组每一项的 toString()方法，然后再进行比较，即使每一项都输数字，也会调用此方法，转成字符串在比较。

```
var arr=[1,15,10,35,3,34,2];
arr.sort();//[1, 10, 15, 2, 3, 34, 35] 因为是根据字符串进行比较的，得到的结果并不是我们想要的。

//传递比较函数参数：
//如果a > b则返回负数；如果a = b则返回 0，如果a < b则返回一个正数。
function positiveOrder(a, b) {
    <!-- if (a < b) {
        return -1;
    } else if (a > b) {
        return 1;
    } else {
        return 0;
    } -->
    //简化
    return a-b
}
arr.sort(positiveOrder);// [1, 2, 3, 10, 15, 34, 35]

//交互比较函数的返回值，实现倒序排列
function invertedOrder(a, b) {
    <!-- if (a < b) {
        return 1;
    } else if (a > b) {
        return -;
    } else {
        return 0;
    } -->
    //简化
    return b-a
}
arr.sort(invertedOrder);//[35, 34, 15, 10, 3, 2, 1]
```

##### 合并

concat()：会创建数组的副本，把需要合并的数组添加到副本末尾，返回合并后的数组。

```
var arr=[1,2,3];
//没有传递参数时，只是返回当前数组的副本
var conArr=arr.concat();
console.log(conArr);//[1, 2, 3]
console.log(arr);//[1, 2, 3]

//传递一个不是数组的参数
var conArr1=arr.concat(4,5);
console.log(conArr1);// [1, 2, 3, 4,5]
console.log(arr);//[1, 2, 3]

//传递参数为数组
var conArr2=arr.concat([4,5,6],[7,8]);
console.log(conArr2);//[1, 2, 3, 4, 5, 6, 7, 8]
console.log(arr);//[1, 2, 3]
```

##### 截取数组

slice()：参数 1 到 2 个参数，返回截取后的数组，对于原来的数组并没有影响。

```
var arr=[1,2,3,4,5];
//传递一个参数时，返回以该参数为开始到末尾的所有项
arr.slice(2);//[3, 4, 5]

//传递两个参数时，返回以第一个参数为开始，第二个参数为末尾的所有项，不包含结束位置的项
arr.slice(1,3);//[2, 3]

//如果传递了负数，使用数组的长度加上这个负数来确定位置
arr.slice(2,-1);//[3, 4]
arr.slice(2,arr.length-1)//[3, 4]
```

##### 插入

splice()：返回从原始数组删除的项，对原始数有影响。
有三种使用方法

```
var arr=[1,2,3,4,5]
//1. 删除。两个参数，删除以第一个参数为开始，第二个参数为要删除的项，返回删除的项
arr.splice(1,2);//[2, 3]
console.log(arr);//[1, 4, 5]

//2. 插入。参数，3个或3个以上，第一个参数为要插入的位置，第二个参数为要删除的项，第三个或三个以上的位置为要插入的项，返回空数组
arr.splice(1,0,'a');//[]
console.log(arr);//[1, "a", 4, 5]

//3. 替换。
arr.splice(1,2,'b','c');//["a", 4]
console.log(arr);//[1, "b", "c", 5]
```

##### 位置

indexOf()：从数组开头查找。
lastIndexOf()：从数组末尾查找。
两个方法都接收两个参数：要查找的项和要要查找的开始位置（可选）
如果找到了要查找的项，返回其在数组中的索引；没有找到返回-1.

```
var arr=[1,2,3,4,5];
arr.indexOf(2);//1
arr.indexOf(6);//-1
arr.lastIndexOf(2);//1
arr.lastIndexOf(6);//-1
```

##### 迭代

有 5 个迭代方法，传递的参数都是两个，第一个是要在每一项上运行的函数，第二个是运行该函数的作用域对象就是 this 的指向（可选参数）。在每一项上的运行的函数有三个参数：数组的项、该项的索引、数组对象本身。

- every()：对数组中的每一项运行给定函数，如果该函数对每一项都返回 true，则返回 true。
- filter()：对数组中的每一项运行给定函数，返回该函数会返回 true 的项组成的数组。
- forEach()：对数组中的每一项运行给定函数。这个方法没有返回值。
- map()：对数组中的每一项运行给定函数，返回每次函数调用的结果组成的数组。
- some()：对数组中的每一项运行给定函数，如果该函数对任一项返回 true，则返回 true。

```
var arr = [1, 2, 3, 4, 5];

arr.every(function(item, index, arr) {
  if (item > 0) {
    return item;
  }
});//true

arr.every(function(item, index, arr) {
  if (item > 3) {
    return item;
  }
});//[4, 5]

arr.forEach(function(item, index, arr) {
  if (item > 4) {
    console.log(item)
  }
});//5

arr.map(function(item, index, arr) {
  return item*2
});//[2, 4, 6, 8, 10]

arr.some(function(item, index, arr) {
  if (item === 5) {
    return item;
  }
});//true
```

##### 遍历

reduce()：从头遍历。
reduceRight()：从末尾开始遍历。
参数：第一个参数每一项上调用的函数；第二个参数是作为归并基础的初始值（可选）。
函数参数：前一个值、当前值、项的索引和数组对象。在首次执行是，前一个值是数组的第一项，当前值是数组的第二项；首次执行后，前一个值是上一次执行迭代的值。项的索引从第二项开始。

```
var arr=[1,2,3,4,5];

arr.reduce(function(prev,current,index,arr){
    return prev+current
})//15

arr.reduceRight(function(prev,current,index,arr){
    return prev+current
})//15
```
