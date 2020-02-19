---
title: 基础数据类型
date: 2020-02-19 
tags: promise
categories: javascript
---

Promise 是异步编程的一种解决方案。
有三种状态：pending(等待态)，fulfilled(成功态)，rejected(失败态)；
状态一旦改变，就不会再变。创造promise实例后，它会立即执行。

#### promise用法
##### 立即执行
Promise中传入的函数会立即执行，返回的是一个Promise对象。

then方法中的回调是异步的，`then`方法两个参数`onfulfilled` 和 `onrejected`，`Promise`成功态时，调用`onfulfilled` ，状态为失败态时，调用 `onrejected` 方法。

`then`方法返回promise对象，所以可以链式调用，返回的是另一个promise对象（catch也是），与原promise不相等。
```
//new Promise(executor) executor会立即执行，有两个参数resolve, reject
let promise = new Promise((resolve, reject) => {
    console.log("promise"); //证明promise是立即执行的
    resolve("promise resolve");
});

//2. then方法中的回调是异步的
promise.then(d => console.log(d)); //证明then方法的回调是异步的
console.log('证明then方法的回调是异步的');
promise.then(d => d).then(d => console.log(d));

let promise2 = promise.then(d => d)
//then返回的promise对象与原promise相等
console.log(promise === promise2); //false

// 输出结果
// promise
// 证明then方法的回调是异步的
// false
// promise resolve
// promise resolve
```


#### 方法
1. `Promise.all(iterable)` 返回一个promise对象。

    iterable：是一个promise数组，数组中所有promise对象成功，则成功；若有一个失败，将失败信息作为返回结果。
    ```
    let promise1 = new Promise((resolve, reject) => {
      resolve("promise111");
    });
    let promise2 = new Promise((resolve, reject) => {
      resolve("promise222");
    });
    let promise3 = new Promise((resolve, reject) => {
      // resolve("promise333");
      reject("不好意思，我失败了~~");
    });

    let p = Promise.all([promise1, promise2, promise3]);

    p.then(
      d => {
        console.log(d); //[ 'promise111', 'promise222', 'promise333' ]
      },
      function (e) {
        // 返回失败的promise的错误
        console.log(e); //不好意思，我失败了~~
      }
    );
    ```

2. Promise.race(iterable)  返回一个promise对象。

    iterable：是一个promise数组，数组中所有promise对象谁先执行完，就返回谁的结果，无论其他的promise是失败还是成功。
    ```
    let promise1 = new Promise((resolve, reject) => {
      setTimeout(() => resolve("promise111"), 0);
    });
    let promise2 = new Promise((resolve, reject) => {
      reject("不好意思，我失败了~~");
    });

    let p = Promise.race([promise1, promise2]);

    p.then(
      d => {
        console.log(d); //[ 'promise111', 'promise222', 'promise333' ]
      },
      function (e) {
        // 返回失败的promise的错误
        console.log(e); //不好意思，我失败了~~
      }
    );
    ```

3. Promise.reject(reason)  返回一个失败状态的promise对象。
    ```
    let promise1 = Promise.reject("失败");
    promise1.then(null, e => console.log(e));
    ```

4. Promise.resolve(value) 返回值由value决定。

    如果value是thenable(即，带有then方法的对象)，返回结果由thenable上的then方法决定；
    如果value是一个普通值，则将值传给对应的then方法。
    ```
    // let value = {
    //   then: function(resolve, reject) {
    //     resolve("thenable");
    //   }
    // };
    let value = 1;
    let p = Promise.resolve(value);
    p.then(value => {
      console.log(value);
    });
    ```
####  原型

1. Promise.prototype.then(onFulfilled, onRejected)  根据promise不同的状态返回不同的结果，可以链式操作，返回一个promise对象。

2. Promise.prototype.catch(onRejected) 返回promise中的错误。

3. Promise.prototype.finally(onFinally) 前方promise都执行结束才会执行，即使前方promise中有异步代码，也会等异步代码执行完再执行，传参中的函数没有任何参数。
```
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("promise111"), 0);
});
promise1.then(d => console.log(d)).finally(() => console.log("finally"));```