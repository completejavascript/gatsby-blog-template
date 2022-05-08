---
date: "2021-12-19T06:15:00Z"
update: "2021-12-19T20:00:00Z"
template: "question"
directory: "Question"
title: "Làm sao để bắt buộc truyền tham số vào hàm?"
shortTitle: "Cách bắt buộc truyền tham số vào hàm?"
slug: lam-sao-bat-buoc-truyen-tham-so-vao-ham
keywords: "bắt buộc truyền tham số"
description: "Khi lập trình, nhiều hàm phải bắt buộc truyền tham số vào. Ngược lại thì hàm sẽ không có ý nghĩa gì cả. Bài viết này sẽ giới thiệu với bạn cách để làm được điều đó."
cover: "../../../images/questions/javascript-question-basics.png"
series: "JavaScript Question: cơ bản"
tags:
  - Câu hỏi JS cơ bản
---

Khi lập trình, nhiều hàm **phải bắt buộc truyền tham số vào**. Ngược lại thì hàm sẽ không có ý nghĩa gì cả. Vì vậy, bài viết này sẽ giới thiệu với bạn cách để làm được điều đó.

Trước khi bắt đầu, mình sẽ tìm hiểu về **tham số mặc định của hàm** trước.

## Tham số mặc định của hàm

Trong JavaScript, khi bạn không truyền tham số vào [hàm](/ham-la-gi-ham-trong-javascript/) thì giá trị của tham số trong hàm là **undefined**, ví dụ:

```js
const sayHello = (name) => {
  console.log(`Hello ${name}!`);
};

sayHello(); // Hello undefined!
```

Giá trị của `name` trong hàm trên là `undefined`. Để **set giá trị mặc định** cho `name` khi không truyền giá trị vào, mình có thể làm theo hai cách sau đây.

## Set giá trị mặc định cho tham số hàm với ES5

Với ES5, mình có thể sử dụng toán tử OR `||` để set giá trị mặc định cho tham số hàm như sau:

```js
function sayHello(name) {
  let finalName = name || "World";
  console.log(`Hello ${finalName}!`);
}

// có truyền tham số
sayHello("Alex"); // Hello Alex!

// không truyền tham số
sayHello(); // Hello World!
```

Toán tử OR `||` thực hiện ước lượng biểu thức **từ trái sang phải** và dừng lại khi gặp giá trị [truthy](/toan-tu-logic-trong-javascript/#truthy-và-falsy-trong-javascript-là-gì) đầu tiên.

Nếu bạn không truyền tham số vào hàm, nghĩa là giá trị của `name` bằng `undefined`. Mà giá trị `undefined` là **falsy**. Do đó, kết quả `finalName` bằng string `"World"`.

Ngược lại, nếu bạn truyền vào hàm **một string khác rỗng** (mà string khác rỗng lại là **truthy**) thì `finalName` sẽ bằng giá trị truyền vào `name`.

> **Chú ý:** nếu bạn truyền vào các giá trị **falsy** khác như `false`, `null`, `0`, `""`, `NaN` thì kết quả cũng tương tự như `undefined`.

Ví dụ truyền vào các giá trị **falsy** khác nhau:

```js
function sayHello(name) {
  let finalName = name || "World";
  console.log(`Hello ${finalName}!`);
}

sayHello(""); // Hello World!
sayHello(0); // Hello World!
sayHello(false); // Hello World!
sayHello(undefined); // Hello World!
sayHello(null); // Hello World!
```

## Set giá trị mặc định cho tham số hàm với ES6

Với [ES6](/tag/es6/), mình có thể **khởi tạo giá trị mặc định** cho tham số của hàm bằng cách dùng toán tử gán `=` như sau:

```js
const sayHello = (name = "World") => {
  console.log(`Hello ${name}!`);
};

// truyền tham số
sayHello("Alex"); // Hello Alex!

// không truyền tham số
sayHello(); // Hello World!
```

Tuy nhiên, việc truyền các giá trị **falsy** vào lại cho **kết quả khác** so với cách ES5 trên:

```js
const sayHello = (name = "World") => {
  console.log(`Hello ${name}!`);
};

sayHello(""); // Hello !
sayHello(0); // Hello 0!
sayHello(false); // Hello false!
sayHello(undefined); // Hello World! - trường hợp nhận giá trị mặc định
sayHello(null); // Hello World!
```

Nghĩa là chỉ khi nào giá trị của tham số là `undefined` thì giá trị mặc định mới được nhận.

## Cách bắt buộc truyền tham số vào hàm

Nhiều khi mình không muốn sử dụng giá trị mặc định, mà bắt buộc truyền tham số vào hàm thì sao?

Mình có thể tận dụng cách làm trên, nhưng cần phải thay đổi lại giá trị mặc định như sau:

```js
const isRequired = (param) => {
  throw Error(`Parameter: ${param} is required!`);
};

const sayHello = (name = isRequired("name")) => {
  console.log(`Hello ${name}!`);
};

// truyền tham số
sayHello("Alex"); // Hello Alex!

// không truyền tham số
sayHello(); // Uncaught Error: Parameter: name is required!
```

Ở đây, giá trị mặc định là kết quả của việc gọi hàm `isRequired()`. Nghĩa là nếu bạn không truyền tham số vào thì hàm `isRequired()` sẽ được gọi.

Dẫn đến kết quả là một thông báo lỗi được `throw` ra như trên.

Tham khảo:

- [Toán tử logic trong JavaScript](/toan-tu-logic-trong-javascript/)
- [Hàm là gì? Hàm trong JavaScript](/ham-la-gi-ham-trong-javascript/)
