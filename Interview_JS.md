> 参考：
>前端面试复习之JS复习 https://juejin.im/post/6844904069773950983


1. 基础数据类型和引用数据类型

    基础数据类型：String、Number、Boolean、undefined、null

    引用数据类型：Object

2. 数据类型的存储形式

    * 栈内存（stack）和堆内存（heap）；
    * Stack自动分配内存，Heap动态分配内存；
    * 一般在项目中将对象类型置为null，减少内存消耗
    * 基础数据类型按值存在stack中，可按值直接访问
    * 对象类型在stack中存放引用地址，在heap中存放具体对象

3. this指向

    a. 谁调用this，this就指向谁。
    b. 通过new 的方式，this永远指向新创建的对象。
    ```
    function Person(name,age){
        this.name = name
        this.age = age
        console.log(this)
    }

    var xiaohu = new Person('小胡',24)// this = > xiaohu
    ```
    b. 箭头函数中没有this，会继承所创建位置的this。
    ```    
    console.log(this)
    let A = {
        get: function () {
            console.log(1, this)
            let get1 = () => {
                console.log(2, this)
            }
            get1();
        }
    }
    A.get();//两个console出来的this值相同
    ```

4. new过程

    a. 创建一个新对象；
    b. 将新对象的__proto__指向构造函数的原型对象；
    c. 将构造函数的this指向新对象；
        d. 将新对象返回给实例。
    ```    
    function A(){};
    var b=new A()
    /**
    过程：
        a. 创建一个新对象:let o=new Object()
        b. 将新对象的__proto__指向构造函数的原型对象 o.__proto__=A.prototypr
        c. 将构造函数的this指向新对象；A.call(o)
        d. 将新对象返回给实例。b=o
    **/``
    ```
    ```
    function newInstance(cons) {
        let o = new Object();
        o.__proto__ = cons.prototype;
        cons.call(o)
        return o
    }
    function A() { }
    A.prototype.get = function () {
        console.log('get')
    }
    let b = newInstance(A)
    b.get() //get
    ```

5. 改变this的指向call、apply、bind

    共同点： 第一个参数是this指向的对象，后续为传的参数
    
    不同点： 

    a. call是单个传参，apply是数组行驶传参，bind都可以

    b. call和apply直接执行，bind需要手动调用。


6. new/字面量与Object.create(null)创建对象

    new和字面量创建的对象的原型指向Object.prototype，会继承Object的属性和方法, 而Object.create(null)创建的对象，其原型指向null，null作为原型链的顶端，没有也不会继承任何属性和方法

7. 作用域链

    作用域：规定变量和函数的可使用范围叫做作用域。
    
    a. 每个函数都会有一个作用域，查找变量或函数时，由局部作用域到全局作用域依次查找，这些作用域的集合就叫做作用域链。

    b. 当我们调用一个函数时，会创建这个函数的执行环境；执行环境又称为执行上下文，他定义了变量或函数有权访问的其他数据，决定了他们的各自行为。最外围的执行环境称为全局执行环境，在 web 浏览器中，被认为是 window 对象；每个执行环境都有一个变量对象，这个对象我们是无法访问的，变量对象上保存的是当前执行环境中定义的函数和变量。当我们查找一个变量时，会先从当前执行环境的变量对象上查找，找到了则返回这个变量，如果没有找到，会去父级执行环境的变量对象上查找，直到全局执行环境的变量对象，这种形式，会形成作用域链。作用域链本质上是一个指向变量对象的指针列表，它只引用但不实际包含变量对象。

8. 闭包

    有权访问另一个函数作用域中的变量的函数。

    创建闭包的常见方式是在一个函数返回另一个函数。

    缺点：
    * 内存泄漏。因为匿名函数会在外部被调用，导致外层函数的变量对象一直被引用，一直存放在内存中，无法清除。解决办法是清除匿名函数。
    * this指向window。匿名函数的执行环境具有全局性，所以匿名函数中的this是指向全局的，所以需要记录一下外层函数的this值，才能传到匿名函数中。
    ```   
    let A = {
        get: function () {
            console.log(1, this)
            return (function () {
                console.log(2, this)
            })()
        }
    }
    A.get();//第2个console打印出window

    ```

9. 原型和原型链

    原型：每个JS对象都有__proto__属性，这个属性指向了原型。

    原型链：多个对象通过__proto__的方式连接起来。

    每个构造函数都有一个原型对象 prototype，原型对象 prototype 都有一个指针 constructor 指向构造函数，每个对象都有一个属性__proto__指向原型对象，让原型对象等于另一个构造函数的实例，那么这个原型对象的属性__proto__就会指向另一个构造函数的原型对象，这样层层递进，就形成了原型链。



10. 继承

    A. 经典继承(构造函数)

    ```
    //1、当用调用 call 方法时，this 指向 son 。
    //2、此时 Father 构造函数中的 this 指向 son。
    //3、也就是说 son 有了 colors 的属性。
    //4、每 new 一个 son ，都会产生不同的对象，每个对象的属性都是相互独立的。
    function Father(){
        this.colors = ["red","blue","green"];
    }

    function Son(){
        // this 是通过 new 操作内部的新对象 {} ，
        // 此时 Father 中的 this 就是为 Son 中的新对象{}
        // 新对象就有了新的属性，并返回得到 new 的新对象实例
        // 继承了Father,且向父类型传递参数
        Father.call(this);
    }

    let s = new Son();
    console.log(s.color)
    
    ```

    基本思想：在子类的构造函数的内部调用父类的构造函数。 

    优点：

    * 保证了原型链中引用类型的独立，不被所有实例共享。

    * 子类创建的时候可以向父类传参。

    缺点：
    * 继承的方法都在构造函数中定义，构造函数不能复用。

    * 父类中的方法对子类而言是不可见的，子类所有属性都定义在父类的构造函数中。


    B. 组合继承
    
    ```
    function Father(name){
        this.name = name;
        this.colors = ["red","blue","green"];
    }

    // 方法定义在原型对象上（共享）
    Father.prototype.sayName = function(){
        alert(this.name);
    };

    function Son(name,age){
        // 子类继承父类的属性  
        Father.call(this,name);     //继承实例属性，第一次调用 Father()
        // 每个实例都有自己的属性
        this.age = age;
    }

    // 子类和父类共享的方法（实现了父类属性和方法的复用）                              
    Son.prototype = new Father();   //继承父类方法,第二次调用 Father()

    // 子类实例对象共享的方法
    Son.prototype.sayAge = function(){
        alert(this.age);
    }

    var instance1 = new Son("louis",5);
    instance1.colors.push("black");
    console.log(instance1.colors);//"red,blue,green,black"
    instance1.sayName();//louis
    instance1.sayAge();//5

    var instance1 = new Son("zhai",10);
    console.log(instance1.colors);//"red,blue,green"
    instance1.sayName();//zhai
    instance1.sayAge();//10
    ```
    基本思想：

    * 使用原型链实现对原型对象属性和方法的继承

    * 借用构造函数来实现对实例属性的继承

    优点：

    * 在原型兑现上定义的方法实现了函数的复用。

    * 每个实例都有属于自己的属性。

    缺点：组合继承调用了两次父类的构造函数，造成了不必要的消耗。

    C. 原型继承

    ```
    function object(o){
        function F(){}
        F.prototype = o;
        // 每次返回的 new 是不同的
        return new F();
    }

    var person = {
        friends : ["Van","Louis","Nick"]
    };

    // 实例 1
    var anotherPerson = object(person);
    anotherPerson.friends.push("Rob");

    // 实例 2
    var yetAnotherPerson = object(person);
    yetAnotherPerson.friends.push("Style");

    // 都添加至原型对象的属性(所共享)
    alert(person.friends); // "Van,Louis,Nick,Rob,Style"
    ```

    基本思想：创建临时的构造函数，将传入的对象作为该构造函数的原型对象，然后返回新构造函数的实例。

    浅拷贝：object产生的对象是不相同的，但是原型对象都是person对象，所改变存在原型对象的属性被所有生成的实例所共享，不仅Person拥有，而且子类生成的实例也共享。
    Object.create()：在ECMAScript5中新增了此方法。

    参数一：新对象的原型对象

    参数二：新对象定义的额外的属性。(可选)

    D. 寄生式继承

    ```
    function createAnother(original){
        var clone = object(original); // 通过调用object函数创建一个新对象
        clone.sayHi = function(){ // 以某种方式来增强这个对象
            alert("hi");
        };
        return clone; //返回这个对象
    }
    ```
    基本思想：不必为了指定子类的原型而调用父类的构造函数。

    优点：解决组合继承中两次调用构造函数的开销。


11. 深拷贝浅拷贝

    浅拷贝：拷贝第一层，与原来的拷贝对象还有点关系。

    深拷贝：多层全部拷贝下来，与原来的拷贝对象没有关系。

    深拷贝和浅拷贝的区别是内存中存储类型不同。基本数据类型的值和大小是固定的，存储在栈中，释放的时候是系统自动释放；引用类型是存储在堆中，大小是动态分配的，不会自动释放。对于一个基本数据类型，例如一个变量a=1；我将a的值赋给变量b，会在栈中生成一个a的副本，对于对象，如果以赋值方法将一个对象付给另一个变量，只是将一个指针付给了这个变量，然后，需要我们对于堆中的对象也进行复制，对于对象中的引用类型没有进行复制的是浅拷贝，对于对象中引用类型也进行复制的是深拷贝。


