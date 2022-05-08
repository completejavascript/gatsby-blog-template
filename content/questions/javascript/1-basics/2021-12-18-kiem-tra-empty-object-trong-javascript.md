---
date: "2021-12-18T20:00:00Z"
update: "2021-12-18T21:30:00Z"
template: "question"
directory: "Question"
title: "Cách kiểm tra empty object trong JavaScript?"
shortTitle: "Kiểm tra empty object trong JS?"
slug: kiem-tra-empty-object-trong-javascript
keywords: "kiểm tra empty object"
description: "Bạn đã biết cách kiểm tra empty object trong JavaScript hay chưa? Bài viết này sẽ giới thiệu với bạn cách đơn giản để kiểm tra empty object."
cover: "../../../images/questions/javascript-question-basics.png"
series: "JavaScript Question: cơ bản"
tags:
  - Câu hỏi JavaScript
---

Giả sử bạn đang muốn **kiểm tra empty object** đối với một giá trị cho trước, với empty object được hiểu như sau:

- Đó là một [object](/object-la-gi-object-trong-javascript/).
- Và object đó không có một thuộc tính [enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) nào cả.

Nói cách khác, **empty object** được biểu diễn như sau:

```js
const emptyObject = {};
```

Vậy cách để kiểm tra empty object là gì?

## Cách kiểm tra empty object trong JavaScript

Như mình đã nói ở trên, empty object phải thỏa mãn cả 2 điều kiện: là object và không có thuộc tính enumerable. Vì vậy, mình sẽ kiểm tra từng thành phần như sau.

### Kiểm tra là object

Để một giá trị là object:

- **Điều kiện cần:** khác `null` và khác `undefined`.
- **Điều kiện đủ:** hàm khởi tạo `constructor` phải là `Object`.

Một số ví dụ:

```js
const a = 1,
  b = "hello",
  c = [1, 2],
  d = { x: 6 },
  e = () => {};

console.log(a.constructor); // Number
console.log(b.constructor); // String
console.log(c.constructor); // Array
console.log(d.constructor); // Object
console.log(e.constructor); // Function
```

Như vậy, mình sẽ viết hàm để kiểm tra object như sau:

```js
const isObject = (v) => {
  return !!v && v.constructor === Object;
};
```

Thử kiểm tra lại:

```js
const a = 1,
  b = "hello",
  c = [1, 2],
  d = { x: 6 },
  e = () => {},
  f = null,
  g = undefined;

console.log(isObject(a)); // false
console.log(isObject(b)); // false
console.log(isObject(c)); // false
console.log(isObject(d)); // true
console.log(isObject(e)); // false
console.log(isObject(f)); // false
console.log(isObject(g)); // false
```

Kết quả hiện thị bên trên là **đúng với yêu cầu**. Tiếp theo, mình sẽ triển khai phần **kiểm tra object là empty**.

### Kiểm tra object là empty

Để kiểm tra object là empty trong [ES6](/tag/es6/), mình sử dụng phương thức [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys). Phương thức này trả về một mảng chứa tất cả các thuộc tính **enumerable** của object.

Nếu kết quả trả về là **mảng rỗng** thì suy ra object đó **không chứa thuộc tính enumerable** nào.

Ví dụ sử dụng `Object.keys()`:

```js
const a = {},
  b = { x: 1 },
  c = { m: "a", n: "b" };

console.log(Object.keys(a)); // []
console.log(Object.keys(b)); // ["x"]
console.log(Object.keys(c)); // ["m", "n"]
```

Bây giờ, mình sẽ viết **hàm kiểm tra object có empty hay không** như sau:

```js
const isEmpty = (v) => {
  return Object.keys(v).length === 0;
};
```

Kiểm tra lại hàm `isEmpty()`:

```js
const a = {},
  b = { x: 1 },
  c = { m: "a", n: "b" };

console.log(isEmpty(a)); // true
console.log(isEmpty(b)); // false
console.log(isEmpty(c)); // false
```

Kết quả lần này lại đúng như mong đợi.

### Tổng hợp cách kiểm tra empty object trong JavaScript

Kết hợp 2 đoạn kiểm tra trên, mình suy ra [hàm](/ham-la-gi-ham-trong-javascript/) để kiểm tra empty object trong JavaScript là:

```js
const isEmptyObject = (v) => {
  return !!v && v.constructor === Object && Object.keys(v).length === 0;
};
```

Một số ví dụ:

```js
const a = 1,
  b = "hello",
  c = [1, 2],
  d = {},
  e = () => {},
  f = null,
  g = undefined,
  h = { a: 1, b: 2, c: "3" };

console.log(isEmptyObject(a)); // false
console.log(isEmptyObject(b)); // false
console.log(isEmptyObject(c)); // false
console.log(isEmptyObject(d)); // true
console.log(isEmptyObject(e)); // false
console.log(isEmptyObject(f)); // false
console.log(isEmptyObject(g)); // false
console.log(isEmptyObject(h)); // false
```

Tham khảo:

- [Object là gì? Object trong JavaScript](/object-la-gi-object-trong-javascript/)
- [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys)
