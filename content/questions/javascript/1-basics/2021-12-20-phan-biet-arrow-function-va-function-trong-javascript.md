---
date: "2021-12-20T21:11:00Z"
update: "2021-12-20T21:30:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-basics.png"
keywords: "phân biệt arrow function và function"
description: "Arrow function hữu ích nhưng không thể thay thế function được. Vì vậy, bài viết này sẽ giúp bạn phân biệt arrow function và function trong JavaScript."
slug: phan-biet-arrow-function-va-function-trong-javascript
title: "Phân biệt arrow function và function trong JavaScript"
shortTitle: "Phân biệt arrow function và function"
series: "JavaScript Question: cơ bản"
tags:
  - Câu hỏi JS cơ bản
---

[Arrow function](/arrow-function-la-gi-arrow-function-trong-js/) là một trong những tính năng mới rất hay của ES6. Việc sử dụng đúng cách arrow function giúp code trở nên ngắn gọn và dễ hiểu hơn. Tuy nhiên, arrow function không thể thay thế hoàn toàn function được.

Vì vậy, bài viết này sẽ giúp bạn **phân biệt arrow function và function** trong JavaScript. Qua đó, bạn biết cách sử dụng chúng sao cho phù hợp nhất với từng hoàn cảnh.

## Giống nhau

Arrow function và function đều là [function](/ham-la-gi-ham-trong-javascript/).

## Khác nhau cơ bản

### Cú pháp

Arrow function sử dụng kí tự `=>`:

```js
let sayHi = () => {
  console.log("Hi");
};

sayHi();
// Hi
```

Function sử dụng từ khoá `function`:

```js
let sayHi = function () {
  console.log("Hi");
};

sayHi();
// Hi
```

### Arrow function thường ngắn gọn hơn function

Với hàm có 1 tham số, arrow function có thể bỏ qua cặp dấu ngoặc đơn.

```
// Sử dụng arrow function
let greeting = name => {
  console.log(`Hello, my name is ${name}`);
};

greeting("Lam");
// Hello, my name is Lam
```

Tương đương với function:

```js
let greeting = function (name) {
  console.log(`Hello, my name is ${name}`);
};

greeting("Lam");
// Hello, my name is Lam
```

Ngoài ra, arrow function cũng có thể bỏ qua từ khoá **return**.

```js
// Sử dụng arrow function
let double = (x) => x * 2;
double(1); // 2
```

Tương đương với function:

```js
let double = function (x) {
  return x * 2;
};

double(1); // 2
```

Ví dụ sử dụng arrow function với các [higher-order functions](https://eloquentjavascript.net/05_higher_order.html) như: [forEach](/javascript-foreach-la-cai-quai-gi/), map, filter,...

► Sử dụng `map` với function:

```js{3-5}
let arr = [1, 2, 3, 4];

let square1 = arr.map(function (e) {
  return e * e;
});

console.log(square1); // [1, 4, 9, 16]
```

► Sử dụng `map` với arrow function:

```js{3}
let arr = [1, 2, 3, 4];

let square2 = arr.map((e) => e * e);

console.log(square2); // [1, 4, 9, 16]
```

### Arrow function không bind `this`

Arrow function không định nghĩa giá trị `this` của riêng nó giống như function.

Ví dụ sử dụng function:

```js
var x = 0;

function DelayPrint(x, timeout) {
  this.x = x;

  setTimeout(function print() {
    console.log(`The value is ${this.x}.`);
  }, timeout);
}

let p = new DelayPrint(1, 1000);
// The value is 0.
```

Trong chế độ **none-strict**, function `print` định nghĩa `this` chính là đối tượng global (đối với trình duyệt thì đó là `window`). Do đó, `this.x` tương đương với `window.x` và bằng `0`.

Để đoạn code trên hoạt động theo đúng mong muốn thì bạn phải sửa lại như sau:

```js
var x = 0;

function DelayPrint(x, timeout) {
  this.x = x;
  let self = this;

  setTimeout(function print() {
    console.log(`The value is ${self.x}.`);
  }, timeout);
}

let p = new DelayPrint(1, 1000);
// The value is 1.
```

Ví dụ sử dụng arrow function:

```js
var x = 0;

function DelayPrint(x, timeout) {
  this.x = x;

  setTimeout(() => {
    console.log(`The value is ${this.x}.`);
  }, timeout);
}

let p = new DelayPrint(1, 1000);
// The value is 1.
```

Ngược lại với function, arrow function không định nghĩa lại `this`.

Do đó, giá trị của `this` sẽ ứng với ngữ cảnh gần nhất của nó. Vì vậy, trong đoạn code trên `this.x` tương ứng với giá trị `x` được truyền vào và bằng `1`.

### Arrow function không bind `arguments`

Tương tự như đối với `this`, arrow function cũng không định nghĩa giá trị `arguments` của riêng nó.

[Đối tượng arguments](/object-la-gi-object-trong-javascript/#đối-tượng-arguments) đặc biệt hữu ích đối với những function **không xác định trước số lượng tham số**.

Ví dụ hàm tính tổng tất cả giá trị các tham số truyền vào:

```js
function sum() {
  return Array.from(arguments).reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
}

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
```

Đối với arrow function, việc sử dụng `arguments` sẽ lỗi vì biến này không được định nghĩa ở arrow function.

```js
let sum = () => {
  return Array.from(arguments).reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
};

console.log(sum(1, 2));
// Uncaught ReferenceError: arguments is not defined
```

Tuy nhiên, bạn vẫn có thể sử dụng [rest parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) để thay thế cho `arguments`.

```js
let sum = (...args) => {
  return Array.from(args).reduce(
    (accumulator, currentValue) => accumulator + currentValue
  );
};

console.log(sum(1, 2)); // 3
console.log(sum(1, 2, 3)); // 6
console.log(sum(1, 2, 3, 4)); // 10
```

### Arrow function không phù hợp làm phương thức cho object

Chính vì arrow function không định nghĩa giá trị `this` của riêng nó, nên arrow function **không phù hợp làm phương thức cho object**.

```js
let obj = {
  a: 1,
  b: () => console.log(this.a, this),
  c: function () {
    console.log(this.a, this);
  },
};

obj.b(); // prints undefined, Window {...} (or the global object)
obj.c(); // prints 1, Object {...}
```

Vì vậy, nếu muốn **định nghĩa phương thức cho object** thì bạn nên sử dụng **function**.

### Arrow function không thể sử dụng làm hàm constructor

Trước khi ES6 ra đời, bạn có thể sử dụng function làm [hàm khởi tạo](/js-pattern-constructor-pattern/) cho object.

```js
function Dog(name, color) {
  this.name = name;
  this.color = color;
}

let myDog = new Dog("Nick", "White");
console.log(myDog.name, myDog.color);
// Nick White
```

Nếu thay đoạn code trên bằng arrow function, bạn sẽ bị lỗi: **TypeError: Dog is not a constructor**.

```js
let Dog = (name, color) => {
  this.name = name;
  this.color = color;
};

let myDog = new Dog("Nick", "White");
console.log(myDog.name, myDog.color);
// TypeError: Dog is not a constructor
```

### Arrow function không có thuộc tính `prototype`

Mọi [đối tượng](/object-la-gi-object-trong-javascript/) trong JavaScript đều có thuộc tính `prototype` và [kế thừa](/ke-thua-co-ban-trong-javascript/) cũng theo `prototype`.

Tuy nhiên, nếu arrow function đã không thể làm constructor cho object thì điều này cũng hoàn toàn hợp lý.

```js
let Foo = () => {};
console.log(Foo.prototype); // undefined
```

### Arrow function không được hoisted

Để hiểu thêm về **hoisting** bạn có thể tham khảo thêm tại bài viết: [Understanding Hoisting in JavaScript](https://scotch.io/tutorials/understanding-hoisting-in-javascript).

Về cơ bản, hoisting được hiểu là **biến và hàm được đưa lên đầu của phạm vi** biến, hàm trước khi đoạn code đó được thực hiện.

**Arrow function không được hoisted**. Nghĩa là bạn phải định nghĩa arrow function trước khi sử dụng nó.

```js
// sử dụng hàm sau khi định nghĩa
let myFunc1 = () => {};
myFunc1(); // OK

// sử dụng hàm trước khi định nghĩa
myFunc2(); // => ReferenceError: myFunc2 is not defined
let myFunc2 = () => {};
```

Ngược lại, **function declaration được hoisted** nên bạn có thể gọi hàm trước khi định nghĩa nó.

```js
myFunc(); // OK
function myFunc() {}
```

## Tổng kết

Trên đây là một số điểm giúp bạn phân biệt arrow function và function trong JavaScript. Để tiện theo dõi, mình tóm tắt lại các đặc điểm khác nhau của chúng như sau:

- Cú pháp
- Arrow function thường ngắn gọn hơn function
- Arrow function không bind `this`
- Arrow function không bind `arguments`
- Arrow function không phù hợp làm phương thức cho object
- Arrow function không thể sử dụng làm hàm khởi tạo
- Arrow function không có thuộc tính `prototype`
- Arrow function không được hoisted

Tham khảo:

- [Hàm là gì? Hàm trong JavaScript](/ham-la-gi-ham-trong-javascript/)
- [Function expression trong JavaScript](/function-expression-trong-javascript/)
- [Arrow function là gì? Arrow function trong JS](/arrow-function-la-gi-arrow-function-trong-js/)
