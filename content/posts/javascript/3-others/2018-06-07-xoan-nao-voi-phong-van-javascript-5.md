---
date: "2018-06-07T12:00:14Z"
update: "2018-06-07T12:00:14Z"
template: "post"
directory: "JavaScript"
cover: "../images/xoan-nao-voi-phong-van-javascript-5-completejavascript.com_.png"
keywords: "xoắn não với phỏng vấn javascript 5"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 5, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!"
slug: xoan-nao-voi-phong-van-javascript-5
title: "Xoắn não với phỏng vấn JavaScript 5"
tags:
  - IIFE
  - Strict Mode
  - Quiz
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 5**, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!

## Xoắn não với phỏng vấn JavaScript 5 - Câu 1

```js
let arr = [1, "hi", { x: 2 }, [3, 4]];
delete arr[1];
console.log(arr.length);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** 4

**Giải thích:**

Toán tử [delete](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete) gỡ bỏ một thuộc tính của Object, kể cả đó là một Array.

Trong câu hỏi này, Array _arr_ có 4 thuộc tính là: _0_, _1_, _2_, _3_. Khi **delete arr[1]** thì thuộc tính _1_ bị xoá, nghĩa là **arr[1] = undefined**. Và _arr_ còn lại 3 thuộc tính _0_, _2_, _3_.

Tuy nhiên, xét trên khía cạnh của Array thì mảng arr vẫn có độ dài là 4.

```js
console.log(arr);
// => (4)[1, empty, {…}, Array(2)]
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 5 - Câu 2

```js
let arr = [1, "hi", { x: 2 }, [3, 4]];
for (let i = 0; i < arr.length; i++) {
  if (arr[i] === "hi") arr.splice(i, 1);
  else console.log(arr[i]);
}
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```js
// 1
// [3, 4]
```

**Giải thích:**

Khác với **delete**, phương thức [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) không những cho phép xoá bỏ phần tử của mảng mà còn làm thay đổi số phần tử của mảng.

Vì vậy, vòng lặp trên sẽ hoạt động như sau:

- (i = 0, arr.length = 4, arr[i] = 1) => (arr[i] === "hi") trả về **false** => console.log(arr[i]) thực hiện => log: 1
- (i = 1, arr.length = 4, arr[i] = "hi") => (arr[i] === "hi") trả về **true** => arr.splice(i, 1) thực hiện => arr = [1, {x : 2}, [3, 4]] (không có log được ghi)
- (i = 2, arr.length = 3, arr[2] = [3, 4]) => (arr[i] === "hi") trả về **false** => console.log(arr[i]) thực hiện => log: [3, 4]
- (i = 3, arr.length = 3) không thoả mãn điều kiện i < arr.length nên vòng lặp dừng lại

Do đó, mình thu được kết quả như trên.

**Mở rộng:**

Như bạn thấy, phần tử **{x : 2}** đã không được in ra. Nếu mình muốn phần tử này được in ra thì phải làm sao?

Đơn giản là bạn chỉ cần duyệt mảng theo thứ tự ngược lại:

```js
let arr = [1, "hi", { x: 2 }, [3, 4]];
for (let i = arr.length - 1; i >= 0; i--) {
  if (arr[i] === "hi") arr.splice(i, 1);
  else console.log(arr[i]);
}
/*
 * [3, 4]
 * {x : 2}
 * 1
 */
```

Nếu muốn biết lý do tại sao thì bạn cứ phân tích như trên là sẽ hiểu.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 5 - Câu 3

```js
var x = 1;
var z = y + 3;
var y = 2;
console.log(x, y, z);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** 1 2 NaN

**Giải thích:**

Nếu bạn sử dụng **var** để khai báo biến thì biến số đó sẽ được [hoisted](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting). Do đó, đoạn code phía trên sẽ tương đương với:

```js
var x, y, z;
x = 1;
z = y + 3;
y = 2;
console.log(x, y, z);
```

Sau câu lệnh đầu tiên, giá trị của x, y, z đều là **undefined**. Vì vậy, sau 3 phép toán tiếp theo, giá trị của chúng là:

- x = 1
- z = y + 3 = undefined + 3 = NaN
- y = 2

Ngược lại, nếu bạn thay var bằng let thì bạn sẽ nhận được lỗi: **ReferenceError: y is not defined**

```js
let x = 1;
let z = y + 3;
let y = 2;
console.log(x, y, z);
// => ReferenceError: y is not defined
```

_Xem thêm: [Phân biệt var và let trong JavaScript](/phan-biet-var-va-let-trong-javascript)_

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 5 - Câu 4

```js
"use strict";
function func() {
  return this;
}
console.log(func());
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** undefined

**Giải thích:**

Vì trong [chế độ strict mode](/mot-so-loi-khi-su-dung-strict-mode-javascript), **this** sẽ không được bind với đối tượng **window**.

_Xem thêm bài viết sau để hiểu thêm về chế độ strict mode: [Strict mode – JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Strict_mode)._

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 5 - Câu 5

```js
function Foo() {
  this.bar = 10;
}
Foo.prototype.bar = 42;

var foo = new Foo();
console.log("1", foo.bar);

delete foo.bar;
console.log("2", foo.bar);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible5" class="toggle" type="checkbox">
  <label for="collapsible5" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```js
// 1 10
// 2 42
```

**Giải thích:**

Khi truy cập đến một thuộc tính nào đó của object, JavaScript sẽ tìm trực tiếp trong Object đó đầu tiên.

Nếu không tìm thấy thì JavaScript sẽ tìm kiếm tiếp đến prototype của Object.

Nếu vẫn không tìm thấy thì sẽ chuyển đến prototype của thằng cha nó cho đến khi tìm thấy, hoặc không còn prototype nào nữa thì thôi.

Ban đầu, đối tượng _foo_ chứa thuộc tính _bar_ của chính nó, và cả trong prototype của nó nữa. Khi đó, thuộc tính của chính nó sẽ được ưu tiên, nên _foo.bar_ có kết quả là 10.

Nhưng sau khi **delete foo.bar**, đối tượng _foo_ không còn thuộc tính _bar_ nữa. Nhưng may thay, trong prototype của **foo** vẫn có _bar_ nên kết quả _foo.bar_ lúc này là 42.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 5 - Câu 6

```js
let a = (function(x, y, z){
  delete x, delete y, delete z;
  return x + y + z;
})(1, [2, 3], {x: 4});

console.log(a);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible6" class="toggle" type="checkbox">
  <label for="collapsible6" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** 12,3[object Object]

**Giải thích:**

- Toán tử **delete** chỉ xoá bỏ thuộc tính của object mà không có tác dụng đối với biến số thông thường. Vì vậy, 3 câu lệnh **delete** trên là vô tác dụng.
- Câu hỏi trên sử dụng [IIFE (Immediately Invoked Function Expression)](https://developer.mozilla.org/en-US/docs/Glossary/IIFE), nên giá trị của x, y, z lần lượt là 1, [2, 3], {x: 4}. Khi cộng 3 giá trị này lại với nhau, thự tự phép tính là từ trái sang phải. Trước tiên, **1 + [2, 3] = "12,3"** do [2, 3] được chuyển đổi sang string thành **"2, 3"**. Tiếp theo, **"12,3" + {x: 4} = "12,3[object Object]"**, do mọi object khi convert sang string thì đều trở thành **"[object Object]"**.
</div>
  </div>
</div>
<div class="margin-bottom"></div>

## Kết luận

Trên đây là 6 câu hỏi phỏng vấn JavaScript cũng rất hay. Nếu bạn có cùng nhận xét với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/xoan-nao-voi-phong-van-javascript-6), thân ái!
