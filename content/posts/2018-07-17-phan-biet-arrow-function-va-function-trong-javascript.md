---
date: "2018-07-17T15:11:26Z"
template: "post"
cover: "../images/"
keywords: ""
slug: phan-biet-arrow-function-va-function-trong-javascript
title: "Phân biệt arrow function và function trong JavaScript"
categories:
  - Thủ thuật JavaScript
tags:
  - ES6
---

[Arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions) là một trong những tính năng mới rất hay của ES6. Việc sử dụng đúng cách arrow function giúp code trở nên ngắn gọn và dễ hiểu hơn. Tuy nhiên, theo mình, arrow function không thể thay thế hoàn toàn function được. Vì vậy, bài viết này sẽ giúp bạn phân biệt arrow function và function trong JavaScript. Qua đó, bạn sẽ biết cách sử dụng chúng sao cho phù hợp nhất với từng hoàn cảnh.

## Giống nhau

- Arrow function và function đều là [function](https://completejavascript.com/tim-hieu-function-javascript/).

## Khác nhau cơ bản

### Cú pháp

Arrow function sử dụng kí tự **=>**:

    <code>let sayHi = () => {
      console.log("Hi");
    }
    sayHi();
    // => Hi</code>

Function sử dụng từ khoá **function**:

    <code>let sayHi = function() {
      console.log("Hi");
    }
    sayHi();
    // => Hi</code>

### Arrow function thường ngắn gọn hơn function

Với hàm số có 1 tham số, arrow function có thể bỏ qua cặp dấu ngoặc đơn.

    <code>// Sử dụng arrow function
    let greeting = name => {
      console.log(`Hello, my name is ${name}`);
    }
    greeting("Lam");
    // => Hello, my name is Lam</code>







    <code>// Tương đương với function
    let greeting = function(name) {
      console.log(`Hello, my name is ${name}`);
    }
    greeting("Lam");
    // => Hello, my name is Lam</code>

Ngoài ra, arrow function cũng có thể bỏ qua từ khoá **return**.

    <code>// Sử dụng arrow function
    let double = x => x * 2;
    double(1); // 2</code>







    <code>// Tương đương với function
    let double = function(x) {
      return x * 2;
    }
    double(1); // 2</code>

Ví dụ sử dụng arrow function với các [higher-order functions](https://eloquentjavascript.net/05_higher_order.html), như: [forEach](https://completejavascript.com/javascript-foreach-la-cai-quai-gi/), map, filter,...

    <code>let arr = [1, 2, 3, 4];

    // Sử dụng map với function
    let square1 = arr.map(function(e) {
      return e * e;
    });
    console.log(square1); // => [1, 4, 9, 16]</code>







    <code>let arr = [1, 2, 3, 4];

    // Sử dụng map với arrow function
    let square2 = arr.map(e => e * e);
    console.log(square2); // => [1, 4, 9, 16]</code>

### Arrow function không bind this

Arrow function không định nghĩa giá trị **this** của riêng nó giống như function.

Ví dụ sử dụng function:

    <code>var x = 0;

    function DelayPrint(x, timeout) {
      this.x = x;

      setTimeout(function print() {
        console.log(`The value is ${this.x}.`);
      }, timeout);
    }

    let p = new DelayPrint(1, 1000);
    // => The value is 0.</code>

Trong chế độ **none-strict**, function _print_ định nghĩa _this_ chính là đối tượng global (đối với trình duyệt thì đó là window). Do đó, _this.x_ tương đương với _window.x_ và bằng 0.

Để đoạn code trên hoạt động theo đúng mong muốn thì bạn phải sửa lại như sau:

    <code>var x = 0;

    function DelayPrint(x, timeout) {
      this.x = x;
      let self = this;

      setTimeout(function print() {
        console.log(`The value is ${self.x}.`);
      }, timeout);
    }

    let p = new DelayPrint(1, 1000);
    // => The value is 1.</code>

Ví dụ sử dụng arrow function:

    <code>var x = 0;

    function DelayPrint(x, timeout) {
      this.x = x;

      setTimeout(() => {
        console.log(`The value is ${this.x}.`);
      }, timeout);
    }

    let p = new DelayPrint(1, 1000);
    // => The value is 1.</code>

Ngược lại với function, arrow function không định nghĩa lại _this_. Do đó, giá trị của _this_ sẽ ứng với ngữ cảnh gần nhất của nó. Vì vậy, trong đoạn code trên _this.x_ sẽ tương ứng với giá trị x được truyền vào và bằng 1.

_Xem thêm: [Sự khác biệt giữa Arrow Function và Function thông thường](https://thienanblog.com/javascript/javascript-co-ban/su-khac-biet-giua-arrow-function-va-function-thong-thuong/)_

### Arrow function không bind arguments

Tương tự như đối với _this_, arrow function cũng không định nghĩa giá trị _arguments_ của riêng nó.

[Đối tượng arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) đặc biệt hữu ích đối với những function không xác định trước số lượng tham số.

    <code>function sum() {
      return Array.from(arguments).reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    console.log(sum(1, 2));         // => 3
    console.log(sum(1, 2, 3));      // => 6
    console.log(sum(1, 2, 3, 4));   // => 10</code>

Đối với arrow function, sử dụng _arguments_ sẽ lỗi vì biến này không được định nghĩa ở arrow function.

    <code>let sum = () => {
      return Array.from(arguments).reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    console.log(sum(1, 2));
    // Uncaught ReferenceError: arguments is not defined</code>

Tuy nhiên, bạn vẫn có thể sử dụng [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) để thay thế cho _arguments_.

    <code>let sum = (...args) => {
      return Array.from(args).reduce((accumulator, currentValue) => accumulator + currentValue);
    }

    console.log(sum(1, 2));         // => 3
    console.log(sum(1, 2, 3));      // => 6
    console.log(sum(1, 2, 3, 4));   // => 10</code>

### Arrow function không phù hợp làm _method_ cho object

Chính vì arrow function không định nghĩa giá trị this của riêng nó, nên cũng không phù hợp là _method_ cho object.

    <code>let obj = {
      a: 1,
      b: () => console.log(this.a, this),
      c: function() {
        console.log(this.a, this);
      }
    }

    obj.b(); // prints undefined, Window {...} (or the global object)
    obj.c(); // prints 1, Object {...}</code>

Vì vậy, nếu muốn định nghĩa _method_ cho object thì bạn nên sử dụng **function**.

### Arrow function không thể sử dụng làm hàm constructor

Trước khi ES6 ra đời, người ta có thể sử dụng function làm [hàm khởi tạo](https://completejavascript.com/js-pattern-constructor-pattern/) cho object.

    <code>function Dog(name, color) {
      this.name = name;
      this.color = color;
    }

    let myDog = new Dog("Nick", "White");
    console.log(myDog.name, myDog.color);
    // => Nick White</code>

Nếu thay đoạn code trên bằng arrow function thì bạn sẽ bị lỗi: **TypeError: Dog is not a constructor**.

    <code>let Dog = (name, color) => {
      this.name = name;
      this.color = color;
    }

    let myDog = new Dog("Nick", "White");
    console.log(myDog.name, myDog.color);
    // => TypeError: Dog is not a constructor</code>

### Arrow function không có thuộc tính prototype

Về cơ bản, mọi [đối tượng](https://completejavascript.com/javascript-object-last-but-not-least/) trong JavaScript đều có thuộc tính prototype và [kế thừa](https://completejavascript.com/ke-thua-co-ban-trong-javascript/) cũng theo prototype.

Tuy nhiên, nếu _arrow function_ không thể sử dụng làm constructor thì mình cho rằng điều này cũng hợp lý.

    <code>let Foo = () => {};
    console.log(Foo.prototype); // undefined</code>

### Arrow function không được hoisted

Để hiểu thêm về hoisting bạn có thể tham khảo thêm tại bài viết: [Understanding Hoisting in JavaScript](https://scotch.io/tutorials/understanding-hoisting-in-javascript).

Về cơ bản, hoisting được hiểu là biến và hàm số được đưa lên đầu của phạm vi biến, hàm số trước khi đoạn code đó được thực hiện.

Arrow function không được hoisted: nghĩa là bạn phải định nghĩa arrow function trước khi sử dụng nó.

    <code>let myFunc1 = () => {}
    myFunc1(); // OK

    myFunc2(); // => ReferenceError: myFunc2 is not defined
    let myFunc2 = () => {}</code>

Ngược lại, **function declaration** được hoisted nên bạn có thể gọi hàm trước khi định nghĩa nó.

    <code>myFunc(); // OK
    function myFunc() {}</code>

## Kết luận

Trên đây là một số điểm giúp bạn phân biệt arrow function và function trong JavaScript. Để tiện theo dõi, mình sẽ tóm tắt lại các đặc điểm khác nhau của chúng như sau:

- Cú pháp
- Arrow function thường ngắn gọn hơn function
- Arrow function không bind this
- Arrow function không bind arguments
- Arrow function không phù hợp làm _method_ cho object
- Arrow function không thể sử dụng làm hàm constructor
- Arrow function không có thuộc tính prototype
- Arrow function không được hoisted

Nếu bạn thấy arrow function khác với function ở điểm nào nữa thì có thể chia sẻ lại với mình và mọi người bằng cách bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](https://completejavascript.com/tim-hieu-ki-thuat-method-chaining-co-ban/), thân ái!

---

★ Theo dõi [Lam Pham](https://completejavascript.com/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

**☛ Facebook Fanpage:** [Complete JavaScript](https://www.facebook.com/completejavascript/)  
**☛ Facebook Group:** [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
**☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
