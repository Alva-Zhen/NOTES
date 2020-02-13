---
title: 引用类型-Date
date: 2020-02-04
tags: 红皮书
categories: 红皮书
---

Date 类型保存的日期可以精确到 1970 年 1 月 1 日之前或之后的 285 616 年。 </br>
创建方式：

```
 new Date();
```

范围： </br>
年：正常，比如现在是 2020 年就是 2020 年； </br>
月：0-11，也就是 0 月是正常的 1 月； </br>
日：1-31，正常日期； </br>
时：0-23； </br>
分：0-59； </br>
秒：0-59。 </br>

> UTC 日期：区偏差的情况下（将日期转换为 GMT 时间）的日期值

```
//无参数时，返回当前日期时间
var myDate=new Date();
console.log(myDate);//Tue Feb 04 2020 17:43:46 GMT+0800 (中国标准时间)

//传递特定日期的毫秒数（基于UTC时间1970年1月1日午夜）
new Date(1580809917571);//Tue Feb 04 2020 17:51:57 GMT+0800 (中国标准时间)

//也可以以下面的方式传入年月份时分秒，和Date.UTC()方法一样
new Date(2020,0,1);//Wed Jan 01 2020 00:00:00 GMT+0800 (中国标准时间)

```

#### 获取日期毫秒数

Date.parse()：返回相应日期的毫秒数，参数表示日期的字符串。

```
Date.parse(2020-01-01);//1514764800000
//如果传入的参数不能表示日期
Date.parse('a');//NaN
```

Date.UTC()：返回日期毫秒数，参数分别是年份、基于 0 的月份（一月是 0，二月是 1，以此类推）、月中的哪一天（1 到 31）、小时数（0 到 23）、分钟、秒以及毫秒数。

```
Date.UTC(2020,0,1);//1577836800000
```

Date.now()：返回调用时的时间毫秒数。可以使用该方法获取时间差

```
//+new Date()和Date.now()具有同样的效果
Date.now();//1580811028320


//获取时间差
var start = Date.now();
var end = Date.now();
var res = end - start;
```

#### 比较日期

```
var date1 = new Date(2020, 0, 1);//2020-01-1
var date2 = new Date(2020, 1, 1);//2020-02-1
date1 < date2;//true
```

#### 格式化日期

这些方法因浏览器而异，不能统一显示方法。

```
var myDate=new Date();//Tue Feb 04 2020 18:21:49 GMT+0800 (中国标准时间)

//toDateString()——以特定于实现的格式显示星期几、月、日和年；
myDate.toDateString();//"Tue Feb 04 2020"

//toTimeString()——以特定于实现的格式显示时、分、秒和时区；
myDate.toTimeString();//"18:21:49 GMT+0800 (中国标准时间)"

//toLocaleDateString()——以特定于地区的格式显示星期几、月、日和年；
myDate.toLocaleDateString();//"2020/2/4"

//toLocaleTimeString()——以特定于实现的格式显示时、分、秒；
myDate.toLocaleTimeString();//"下午6:21:49"

//toUTCString()——以特定于实现的格式完整的 UTC 日期。
myDate.toUTCString();//"Tue, 04 Feb 2020 10:21:49 GMT"

```

#### 从红皮书上获取的其他日期操作

| 方法                     | 说明                                                                                                            |
| ------------------------ | --------------------------------------------------------------------------------------------------------------- |
| getTime()                | 返回表示日期的毫秒数；与 valueOf()方法返回的值相同                                                              |
| setTime(毫秒)            | 以毫秒数设置日期，会改变整个日期                                                                                |
| getFullYear()            | 取得 4 位数的年份（如 2007 而非仅 07）                                                                          |
| getUTCFullYear()         | 返回 UTC 日期的 4 位数年份                                                                                      |
| setFullYear(年)          | 设置日期的年份。传入的年份值必须是 4 位数字（如 2007 而非仅 07）                                                |
| setUTCFullYear(年)       | 设置 UTC 日期的年份。传入的年份值必须是 4 位数字（如 2007 而非仅 07）                                           |
| getMonth()               | 返回日期中的月份，其中 0 表示一月，11 表示十二月                                                                |
| getUTCMonth()            | 返回 UTC 日期中的月份，其中 0 表示一月，11 表示十二月                                                           |
| setMonth(月)             | 设置日期的月份。传入的月份值必须大于 0，超过 11 则增加年份                                                      |
| setUTCMonth(月)          | 设置 UTC 日期的月份。传入的月份值必须大于 0，超过 11 则增加年份                                                 |
| getDate()                | 返回日期月份中的天数（1 到 31）                                                                                 |
| getUTCDate()             | 返回 UTC 日期月份中的天数（1 到 31）                                                                            |
| setDate(日)              | 设置日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份                                            |
| setUTCDate(日)           | 设置 UTC 日期月份中的天数。如果传入的值超过了该月中应有的天数，则增加月份                                       |
| getDay()                 | 返回日期中星期的星期几（其中 0 表示星期日，6 表示星期六）                                                       |
| getUTCDay()              | 返回 UTC 日期中星期的星期几（其中 0 表示星期日，6 表示星期六）                                                  |
| getHours()               | 返回日期中的小时数（0 到 23）                                                                                   |
| getUTCHours()            | 返回 UTC 日期中的小时数（0 到 23）                                                                              |
| setHours(时)             | 设置日期中的小时数。传入的值超过了 23 则增加月份中的天数                                                        |
| setUTCHours(时)          | 设置 UTC 日期中的小时数。传入的值超过了 23 则增加月份中的天数                                                   |
| getMinutes()             | 返回日期中的分钟数（0 到 59）                                                                                   |
| getUTCMinutes()          | 返回 UTC 日期中的分钟数（0 到 59）                                                                              |
| setMinutes(分)           | 设置日期中的分钟数。传入的值超过 59 则增加小时数                                                                |
| setUTCMinutes(分)        | 设置 UTC 日期中的分钟数。传入的值超过 59 则增加小时数                                                           |
| getSeconds()             | 返回日期中的秒数（0 到 59）                                                                                     |
| getUTCSeconds()          | 返回 UTC 日期中的秒数（0 到 59）                                                                                |
| setSeconds(秒)           | 设置日期中的秒数。传入的值超过了 59 会增加分钟数                                                                |
| setUTCSeconds(秒)        | 设置 UTC 日期中的秒数。传入的值超过了 59 会增加分钟数                                                           |
| getMilliseconds()        | 返回日期中的毫秒数                                                                                              |
| getUTCMilliseconds()     | 返回 UTC 日期中的毫秒数                                                                                         |
| setMilliseconds(毫秒)    | 设置日期中的毫秒数                                                                                              |
| setUTCMilliseconds(毫秒) | 设置 UTC 日期中的毫秒数                                                                                         |
| getTimezoneOffset()      | 返回本地时间与 UTC 时间相差的分钟数。例如，美国东部标准时间返回 300。在某地进入夏令时的情况下，这个值会有所变化 |
