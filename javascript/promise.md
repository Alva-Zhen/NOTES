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

3. Promise.prototype.finally(onFinally) 前方promise都执行结束才会执行，即使前方promise中有异步代码，也会等异步代码执行完再执行。
还可以将值传递给后方的then.

```
let promise1 = new Promise((resolve, reject) => {
  setTimeout(() => resolve("promise111"), 0);
});
promise1.then(d => console.log(d)).finally(() => console.log("finally"));

```


#### 尝试实现promise

测试promise规范使用`promises-aplus-tests`
```
//全局安装
npm install -g promises-aplus-tests
//测试
npx promises-aplus-tests promise.js
```


```
/**
 * promise是一个包含了兼容promise规范then方法的对象或函数，
 * thenable 是一个包含了then方法的对象或函数。
 * value 是任何Javascript值。 (包括 undefined, thenable, promise等).
 * exception 是由throw表达式抛出来的值。
 * reason 是一个用于描述Promise被拒绝原因的值
 */

//记录promise的三个状态，promise必须是这三个状态之一
let pending = "pending"; //执行中
let fulfilled = "fulfilled"; //成功
let rejected = "rejected"; //失败

class Promise {
	//类传参是在constructor中
	constructor(executor) {
		this.status = pending
		this.value = undefined;
		this.reason = undefined;

		this.onResolvedCallbacks = [];
		this.onRejectedCallbacks = [];

		let resolve = (value) => {
			if (this.status === pending) {
				//解决new Promise的时候resolve一个promise
				if (value instanceof Promise) {
					value.then(resolve, reject)
					return
				}
				this.status = fulfilled;
				this.value = value;
				this.onResolvedCallbacks.forEach(fn => fn())
			}
		}
		let reject = (reason) => {
			if (this.status === pending) {
				//这里不需要特别的处理，只要返回错误就好
				this.status = rejected;
				this.reason = reason;
				this.onRejectedCallbacks.forEach(fn => fn())
			}
		}

		try {
			executor(resolve, reject)
		} catch (e) {
			reject(e)
		}

	}

	then(onFulfilled, onRejected) {
		let promise2 = new Promise((resolve, reject) => {
			//如果没有传相应的函数，应该把相应的接收的值传递下去
			onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value;
			onRejected = typeof onRejected === 'function' ? onRejected : e => {
				return reject(e)
			};

			if (this.status === fulfilled) {
				setTimeout(() => {
					try {
						let x = onFulfilled(this.value);
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				}, 0)
			}

			if (this.status === rejected) {
				setTimeout(() => {
					try {
						let x = onRejected(this.reason);
						resolvePromise(promise2, x, resolve, reject)
					} catch (e) {
						reject(e)
					}
				}, 0)
			}

			// 发布订阅：当一个对象的状态发生改变时，所有依赖于它的对象都将得到状态改变的通知
			if (this.status === pending) {
				this.onResolvedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onFulfilled(this.value);
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					}, 0)
				});
				this.onRejectedCallbacks.push(() => {
					setTimeout(() => {
						try {
							let x = onRejected(this.reason);
							resolvePromise(promise2, x, resolve, reject)
						} catch (e) {
							reject(e)
						}
					}, 0)
				})
			}
		})
		return promise2
	}
	catch (errCallback) { // catch就是没有成功的then方法
		return this.then(null, errCallback)
	}
	
	//想象成只走成功方法的then，
	// 因为他无论成功还是失败都会执行，那可以把不管还是成功失败的结果只要传到成功的方法中就可以了
	// 而then方法刚好返回的是一个promise 对象
	finally(onFinally) {
		return this.then(onFinally, null)
	}
}

Promise.resolve = (value) => {
	if (value instanceof Promise) {
		return value
	}
	return new Promise((resolve, reject) => {
		resolve(value)
	})
}

Promise.reject = (value) => {
	return new Promise((resolve, reject) => {
		reject(value)
	})
}

Promise.all = (iterable) => {
	if (!Array.isArray(iterable)) {
		return new TypeError('object is not iterable (cannot read property Symbol(Symbol.iterator))')
	}
	return new Promise((resolve, reject) => {
		let fulfilledRes = [];
		let rejectedRes = [];
		if (iterable.length === 0) {
			resolve(fulfilledRes)
		} else {
			iterable.forEach((fn) => {
				if (fn.status === fulfilled) {
					fulfilledRes.push(fn.value);
				}
				if (fn.status === rejected) {
					rejectedRes.push(fn.reason)
				}
			})
			if (rejectedRes.length > 0) {
				reject(rejectedRes[0])
			} else {
				resolve(fulfilledRes)
			}
		}
	})
}

Promise.race = (iterable) => {
	if (!Array.isArray(iterable)) {
		return new TypeError('object is not iterable (cannot read property Symbol(Symbol.iterator))')
	}
	return new Promise((resolve, reject) => {
		if (iterable.length === 0) {
			resolve('')
		} else {
			iterable.forEach((fn) => {
				if (fn.status === fulfilled) {
					resolve(fn.value);
				}
				if (fn.status === rejected) {
					reject(fn.reason)
				}
			})
		}
	})
}


function resolvePromise(promise2, x, resolve, reject) {
	if (promise2 === x) {
		reject(new TypeError('promise2===x'))
	}

	if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
		let called;
		try {
			let then = x.then;
			if (typeof then === 'function') {
				then.call(x, y => {
					if (called) return;
					called = true;
					resolvePromise(promise2, y, resolve, reject)
				}, r => {
					if (called) return;
					called = true;
					reject(r)
				})
			} else {
				if (called) return;
				called = true;
				resolve(x)
			}
		} catch (e) {
			if (called) return;
			called = true;
			reject(e)
		}
	} else {
		resolve(x)
	}
}


Promise.defer = Promise.deferred = function () { // 稍后继续说 catch
	let dfd = {}
	dfd.promise = new Promise((resolve, reject) => {
		dfd.resolve = resolve;
		dfd.reject = reject;
	})
	return dfd;
}

module.exports = Promise;

```