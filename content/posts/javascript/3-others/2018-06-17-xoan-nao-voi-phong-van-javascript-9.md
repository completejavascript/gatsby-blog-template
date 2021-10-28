---
date: "2018-06-17T06:00:00Z"
update: "2019-08-22T06:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../images/xoan-nao-voi-phong-van-javascript-9-completejavascript.com.png"
keywords: "Xoắn não với phỏng vấn JavaScript 9"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 9, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay."
slug: xoan-nao-voi-phong-van-javascript-9
title: "Xoắn não với phỏng vấn JavaScript 9"
tags:
  - ES6
  - Destructuring Assignment
  - Symbol
  - Array
  - Quiz
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 9**, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay.

Mời bạn theo dõi bài viết!

## Xoắn não với phỏng vấn JavaScript 9 – Câu 1

```js
let s1 = Symbol("id");
let s2 = Symbol.for("id");
let s3 = Symbol.for("id");

console.log(s1 === s2); // 1
console.log(s2 === s3); // 2
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```
false
true
```

**Giải thích:**

Nếu bạn đã đọc bài viết [Tìm hiểu về Symbol trong JavaScript](/tim-hieu-ve-symbol-trong-javascript), mình chắc chắn bạn sẽ trả lời được câu hỏi này.

Phương thức <code>Symbol("id")</code> sẽ tạo mới một biến kiểu **Symbol** với **description** là "id". Mà một đặc điểm quan trọng của Symbol là tính duy nhất. Nghĩa là bạn tạo ra bao nhiêu Symbol với cùng description thì nó vẫn khác nhau:

```js
let myId1 = Symbol("id");
let myId2 = Symbol("id");
let myId3 = Symbol("id");

console.log(myId1 === myId2); // => false
console.log(myId2 === myId3); // => false
```

Tiếp theo là phương thức <code>Symbol.for("id")</code>. Phương thức này sẽ tìm trong một đối tượng Global, xem có tồn tại Symbol với key là "id" hay không. Nếu chưa có Symbol nào thoả mãn thì một Symbol mới với key "id" sẽ được tạo ra. Ngược lại, phương thức trên sẽ trả về Symbol đã tồn tại.

Do đó, s2 và s3 ở trên chắc chắn bằng nhau và khác s1.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 9 – Câu 2

```js
const a = [0, 1, undefined, "a", "b", null, false, true];
const b = a.filter(Boolean);

console.log(b);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```
[1, "a", "b", true]
```

**Giải thích:**

Trước tiên, mình nói về hàm [filter](/javascript-foreach-la-cai-quai-gi#arrayprototypefilter). Phương thức này lọc lấy các phần tử trong [mảng](/javascript-array-co-ban) thoả mãn một điều kiện cho trước và trả về một mảng mới chứa những phần tử đó.

Nói cách khác, phương thức **filter** nhận tham số đầu tiên là một [hàm](/tim-hieu-function-javascript) và trả về một mảng các phần tử làm cho hàm trên **return true**.

Cái này chắc nhiều bạn đã biết rồi. Tuy nhiên, vấn đề chính ở đây là tham số đầu tiên truyền vào là [Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean). Đây là một built-in [object](/javascript-object-last-but-not-least) trong JavaScript.

Nhưng thú vị ở chỗ, bạn có thể sử dụng Boolean như một function để convert một giá trị bất kỳ về kiểu Boolean. Cụ thể trong câu hỏi trên:

```js
Boolean(0); // false
Boolean(1); // true
Boolean(undefined); // false
Boolean("a"); // true
Boolean("b"); // true
Boolean(null); // false
Boolean(false); // false
Boolean(true); // true
```

Đến đây thì đáp án của câu hỏi đã được giải thích rồi phải không nào?

**Note**: nếu bạn muốn viết code tường minh hơn thì có thể sửa lại đoạn code trên như sau mà vẫn cho kết quả tương tự:

```js
const a = [0, 1, undefined, "a", "b", null, false, true];
const b = a.filter((v) => Boolean(v));

console.log(b);
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 9 – Câu 3

```js
const f = ({ x = 0, y = "a", z = true }) => {
  console.log(x, y, z);
};

f();
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án**:

```
Uncaught TypeError: Cannot destructure property `x` of 'undefined' or 'null'
```

**Giải thích**:

Thoạt nhìn, nhiều bạn sẽ nghĩ đáp án là: **0, "a", true"**. Nhưng thực tế thì không phải vậy.

Trước tiên, function **f** ở trên tương đương:

```js
const f = (param) => {
  const { x = 0, y = "a", z = true } = param;
  console.log(x, y, z);
};

f();
```

Khi bạn gọi hàm **f()** mà không có tham số truyền vào, giá trị của **param** sẽ là **undefined**. Do đó, khi thực hiện [Destructuring Assignment](/tag/destructuring-assignment), bạn sẽ gặp lỗi như trên **Cannot destructure property 'x' of 'undefined' or 'null'**.

Để tránh lỗi trên, bạn có thể sửa lại function ban đầu như sau:

```js
const f = ({ x = 0, y = "a", z = true } = {}) => {
  console.log(x, y, z);
};

f();
```

Ở đây, mình khai báo giá trị **default** cho tham số đầu tiên là một object rỗng. Nghĩa là khi bạn không truyền bất kỳ tham số nào khi gọi hàm f() thì giá trị mặc định của nó sẽ là **{}**.

Tức là **param** ở trên sẽ bằng **{}**. Và khi thực hiện Destructuring Assignment:

```js
const { x = 0, y = "a", z = true } = {};
```

Các biến số x, y và z nhận giá trị default tương ứng là: 0, "a" và "true".

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Lời kết

Trên đây là 3 câu hỏi phỏng vấn JavaScript cũng rất hay. Nếu bạn có cùng nhận xét với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!
