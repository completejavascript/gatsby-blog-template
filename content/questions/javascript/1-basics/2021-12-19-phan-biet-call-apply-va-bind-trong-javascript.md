---
date: "2021-12-19T06:19:42Z"
update: "2021-12-20T20:19:42Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-basics.png"
keywords: "call apply và bind"
description: "Mình có đọc được cách sử dụng ba hàm call, apply và bind trong JavaScript. Vì hơi khó hiểu nên mình quyết định so sánh ba hàm này. Hy vọng bài viết giúp bạn phân biệt được call, apply và bind trong JavaScript."
slug: phan-biet-call-apply-va-bind-trong-javascript
title: "Phân biệt call, apply và bind trong JavaScript"
shortTitle: "Phân biệt call, apply và bind trong JS"
series: "JavaScript Question: cơ bản"
tags:
  - Câu hỏi JavaScript
---

Gần đây, mình có đọc được cách sử dụng ba hàm `call`, `apply` và `bind` trong JavaScript.

Đọc xong thấy khó hiểu quá nên mình quyết định viết một bài so sánh về ba hàm này, cũng như cách sử dụng chúng.

Hy vọng bài viết sẽ giúp bạn **phân biệt được call, apply và bind** trong JavaScript.

## Prototype của function

Ba hàm `call`, `apply` và `bind` là các [prototype](/cac-khia-canh-lap-trinh-huong-doi-tuong-trong-javascript/) của [Function](/ham-la-gi-ham-trong-javascript/). Nên chỉ có Function mới gọi được 3 hàm này.

Sở dĩ, một Function có thể gọi function khác vì trong JavaScript, Function cũng là một loại [Object](/object-la-gi-object-trong-javascript/). Mà đã là Object thì sẽ có prototype, hay nói cách khác là gọi được phương thức của nó.

Bạn có thể tham khảo ba phương thức `call`, `apply` và `bind` tại các bài viết sau:

- [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call)
- [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)
- [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind)

## Tóm tắt nội dung của 3 hàm

Bạn có thể nhớ nội dung của `call`, `apply` và `bind` một cách ngắn gọn như sau:

### call

Gọi hàm và cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy (**C**omma)

```js
fun.call(thisArg, arg1, arg2, ...)
```

### apply

Gọi hàm và cho phép bạn truyền vào một object và các đối số thông qua mảng (**A**rray)

```js
fun.apply(thisArg, [argsArray]);
```

### bind

Trả về một hàm mới, cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy.

```js
let newFunction = fun.bind(thisArg[, arg1[, arg2[, ...]]])
```

## So sánh call, apply và bind thông qua ví dụ

### Hàm call

```js
let person1 = { firstName: "Jon", lastName: "Kuperman" };
let person2 = { firstName: "Kelly", lastName: "King" };

function say(greeting1, greeting2) {
  console.log(
    greeting1 + "," + greeting2 + " " + this.firstName + " " + this.lastName
  );
}

say.call(person1, "Hello", "Good morning");
// Hello,Good morning Jon Kuperman

say.call(person2, "Hello", "Good morning");
// Hello,Good morning Kelly King
```

### Hàm apply

```js
let person1 = { firstName: "Jon", lastName: "Kuperman" };
let person2 = { firstName: "Kelly", lastName: "King" };

function say(greeting0, greeting1) {
  console.log(
    greeting0 + "," + greeting1 + " " + this.firstName + " " + this.lastName
  );
}

say.apply(person1, ["Hello", "Good moring"]);
// Hello,Good moring Jon Kuperman

say.apply(person2, ["Hello", "Good moring"]);
// Hello,Good moring Kelly King
```

### Hàm bind

```js
let person1 = { firstName: "Jon", lastName: "Kuperman" };
let person2 = { firstName: "Kelly", lastName: "King" };

function say(greeting0, greeting1) {
  console.log(
    greeting0 + "," + greeting1 + " " + this.firstName + " " + this.lastName
  );
}

let sayHelloJon = say.bind(person1, "Hello", "Good morning");
let sayHelloKelly = say.bind(person2, "Hello", "Good morning");

sayHelloJon(); // Hello,Good morning Jon Kuperman
sayHelloKelly(); // Hello,Good morning Kelly King
```

## Kết luận

- Nhìn chung, hàm `call` và `apply` là gần giống nhau. Chúng đều gọi hàm trực tiếp. Chỉ khác ở cách truyền tham số vào (với **c**all thì đối số phân cách bởi dấu phẩy **c**omma và với **a**pply thì đối số cho bởi mảng **a**rray)
- Hàm `bind` thì hơi khác hơn một chút. Hàm này không gọi hàm trực tiếp mà trả về một hàm mới. Sau đó, bạn có thể sử dụng hàm mới này. Về cách truyền tham số vào thì hàm `bind` giống với hàm `call`.

Trên đây là một số sự khác nhau giữa `call`, `apply` và `bind` trong JavaScript. Hy vọng là đủ để bạn phân biệt được `call`, `apply` và `bind` trong JavaScript và biết cách sử dụng chúng.

**Tham khảo:**

- [Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)
- [Hàm là gì? Hàm trong JavaScript](/ham-la-gi-ham-trong-javascript/)
- [Object là gì? Object trong JavaScript](/object-la-gi-object-trong-javascript/)
- [Phương thức của Object và this trong JavaScript](/phuong-thuc-object-va-this-trong-javascript/)
