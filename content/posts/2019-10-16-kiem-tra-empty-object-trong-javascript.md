---
date: "2019-10-16T06:00:00Z"
template: "post"
title: "Cách kiểm tra empty object trong JavaScript"
slug: kiem-tra-empty-object-trong-javascript
keywords: "kiểm tra empty object"
description: "Bạn đã biết cách kiểm tra empty object trong JavaScript hay chưa? Bài viết này sẽ giới thiệu với bạn cách đơn giản để kiểm tra empty object."
cover: "../images/kiem-tra-empty-object-trong-javascript-completejavascript.com.png"
categories:
  - Thủ thuật JavaScript
tags:
  - ES6
---

Giả sử bạn đang muốn kiểm tra empty object đối với một giá trị cho trước. Với empty object được hiểu như sau:

- Đó là một [object](/javascript-object-last-but-not-least).
- Và nó không có một thuộc tính [enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties) nào cả.

Tức là nó được biểu diễn như sau:

```js
const emptyObject = {};
```

Vậy cách để kiểm tra empty object là gì?

## Cách kiểm tra empty object trong JavaScript

Như mình đã nói ở trên, empty object phải thỏa mãn cả 2 điều kiện: là object và không có thuộc tính enumerable. Vì vậy, mình sẽ kiểm tra từng thành phần như sau.

### Kiểm tra là object

Để một giá trị là object thì điều kiện cần là nó phải khác **null** và khác **undefined**. Tiếp theo, điều kiện đủ là **constructor** của nó là **Object**.

Ví dụ:

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

Như vậy, mình sẽ viết hàm check object như sau:

```js
const isObject = (v) => {
  return !!v && v.constructor === Object;
};
```

Thử kiểm tra lại xem sao:

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

Kết quả hiện thị bên trên là đúng với yêu cầu. Tiếp theo mình sẽ triển khai phần kiểm tra object là empty.

### Kiểm tra object là empty

Để kiểm tra object là empty trong [ES6](/tag/es6), mình sẽ sử dụng phương thức [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys). Phương thức này trả về một mảng chứa tất cả các thuộc tính **enumerable** của object.

Vì vậy, nếu kết quả trả về là mảng rỗng thì suy ra object đó không chứa thuộc tính enumerable nào.

Ví dụ:

```js
const a = {},
  b = { x: 1 },
  c = { m: "a", n: "b" };

console.log(Object.keys(a)); // []
console.log(Object.keys(b)); // ["x"]
console.log(Object.keys(c)); // ["m", "n"]
```

Bây giờ, mình sẽ viết hàm kiểm tra object có empty hay không như sau:

```js
const isEmpty = (v) => {
  return Object.keys(v).length === 0;
};
```

Kiểm tra lại phương thức trên:

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

Kết hợp 2 đoạn kiểm tra trên, mình suy ra [hàm](/tim-hieu-function-javascript) để kiểm tra empty object trong JavaScript là:

```js
const isEmptyObject = (v) => {
  return !!v && v.constructor === Object && Object.keys(v).length === 0;
};
```

Ví dụ:

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

## Lời kết

Như vậy là mình đã giới thiệu với bạn cách để kiểm tra empty object trong JavaScript. Nếu có gì thắc mắc hay góp ý thì bạn có thể để lại bình luận xuống phía dưới nhé.

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com)
