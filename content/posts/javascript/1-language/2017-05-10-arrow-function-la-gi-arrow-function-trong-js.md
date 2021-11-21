---
date: "2017-05-10T09:00:00Z"
update: "2021-11-21T16:30:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/arrow-function-la-gi-arrow-function-trong-js.png"
keywords: "arrow function là gì"
description: ""
slug: arrow-function-la-gi-arrow-function-trong-js
title: "Arrow function là gì? Arrow function trong JavaScript"
shortTitle: "Arrow function là gì?"
series: "JavaScript: JavaScript cơ bản"
tags:
  - Hàm
  - ES6
---

Ngoài [function declaration](/ham-la-gi-ham-trong-javascript) và [function expression](/function-expression-trong-javascript), JavaScript còn có **arrow function**. Trong bài viết này, mình sẽ trình bày về arrow function là gì và cách sử dụng arrow function cơ bản.

> 📝 Ngoài ra, mình có bài viết về [phân biệt arrow function và function](/phan-biet-arrow-function-va-function-trong-javascript). Để hiểu bài viết này, bạn cần biết thêm nhiều kiến thức như [object trong JavaScript](/javascript-object-last-but-not-least).
>
> Đó là lý do mình tách riêng ra bài viết khác.

## Arrow function là gì?

Arrow function trong JavaScript là hàm sử dụng kí hiệu `=>` để định nghĩa, với cú pháp cơ bản như sau:

```js
let func = (arg1, arg2,..., argN) => expression;
```

Hàm trên nhận danh sách tham số là `(arg1, arg2,..., argN)`, sau đó thực hiện biểu thức `expression` rồi `return` về kết quả của biểu thức `expression`.

Nói cách khác, đây là cách biểu diễn rút gọn của biểu thức hàm:

```js
let func = function(arg1, arg2,..., argN) {
  return expression;
}
```

Ví dụ sử dụng arrow function trả về tổng của hai số:

```js{1}
let sum = (a, b) => a + b;

console.log(sum(1, 2)); // 3
```

Hàm `sum` nhận vào hai tham số là `a` và `b`. Sau đó, hàm này tính tổng `a + b` rồi trả về giá trị tổng đó.

Nếu arrow function có một tham số thì bạn có thể bỏ qua cặp dấu `()`, ví dụ:

```
let square = n => n * n;
```

Trường hợp, arrow function không có tham số nào, thì bạn nên viết cặp dấu `()`:

```js
let sayHello = () => console.log("Hello!");
```

## Sử dụng arrow function

Arrow function có thể được sử dụng giống như function expression.

Ví dụ khởi tạo hàm dựa trên điều kiện:

```js{3,4}
let isVietnamese = confirm("Bạn có phải người Việt Nam không?");
let welcome = isVietnamese
  ? () => console.log("Chào bạn!")
  : () => console.log("Hello!");

welcome();
```

Ví dụ sử dụng arrow function làm hàm callback:

```js{12,13}
function ask(question, handleYes, handleNo) {
  const answer = confirm(question);
  if (answer) {
    handleYes();
  } else {
    handleNo();
  }
}

ask(
  "Bạn muốn tiếp tục thực hiện chương trình không?",
  () => console.log("You chose Yes!"),
  () => console.log("You chose No!")
);
```

## Arrow function với nhiều dòng code

Trong các ví dụ trên, thành phần `expression` chỉ là một dòng code. Tuy nhiên, bạn cũng có thể viết nhiều dòng code bằng cách đặt chúng vào trong cặp dấu `{}` và sử dụng từ khóa `return` để trả về giá trị.

Ví dụ arrow function tính tổng hai số với nhiều dòng code:

```js
let sum = (a, b) => {
  return a + b;
};

console.log(sum(1, 2)); // 3
```

## Tổng kết

Vậy arrow function là gì?

Arrow function là hàm sử dụng kí tự `=>` để khai báo hàm, giúp việc khai báo hàm trở nên ngắn gọn hơn.

Cú pháp cơ bản là:

```js
let func = (arg1, arg2,..., argN) => expression;
```

Arrow function trên nhận vào danh sách tham số `(arg1, arg2,..., argN)`, thành phần `expression` được xử lý và trả về giá trị của `expression`.

Trường hợp có dấu `{}`, bạn cần sử dụng thêm từ khóa `return` để trả về giá trị của hàm.

```js
let func = (arg1, arg2,..., argN) => {
  expression;
  return something;
}
```

Arrow function có thể được sử dụng giống như function expression.

## Thực hành

### Bài 1

Viết arrow function trả về giá trị nhỏ nhất của hai số (giả sử giá trị truyền nào luôn là số).

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

```js
let min = (a, b) => (a < b ? a : b);

min(2, 5); // 2
min(4, -1); // -1
min(3, 3); // 3
```

Trường hợp hai số truyền vào bằng nhau thì dĩ nhiên kết quả là giá trị của hai số đó.

</div>
  </div>
</div>

### Bài 2

Viết arrow function kiểm tra xem một số có phải là số nguyên tố hay không. Nếu là số nguyên tố thì trả về `true`. Ngược lại, trả về `false`.

Sau đó, in ra các số nguyên tố từ 1 đến 10.

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

```js
// Hàm kiểm tra số nguyên tố
const isPrime = (number) => {
  if (isNaN(number)) return false;

  if (number < 2) return false;
  if (number === 2) return true;

  for (i = 2; i * i <= number; i++) {
    if (number % i === 0) return false;
  }

  return true;
};

// Duyệt từ 1 đến 10 để in ra số nguyên tố
for (let i = 1; i <= 10; i++) {
  if (isPrime(i)) {
    console.log(i);
  }
}

// 2
// 3
// 5
// 7
```

Trong đó:

- Hàm `isNaN(number)` dùng để kiểm tra giá trị của biến `number` xem có phải là `NaN` hay không. Nói cách khác, nếu `isNaN(number)` trả về `false` thì giá trị của `number` là số.
- [Vòng lặp for](/vong-lap-trong-javascript) dùng để duyệt các số từ 1 đến 10.
