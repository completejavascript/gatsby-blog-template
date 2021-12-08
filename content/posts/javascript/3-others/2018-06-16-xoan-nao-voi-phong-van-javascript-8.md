---
date: "2018-06-16T06:00:00Z"
update: "2019-08-20T06:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/xoan-nao-voi-phong-van-javascript-8-completejavascript.com.png"
keywords: "Xoắn não với phỏng vấn JavaScript 8"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 8, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay."
slug: xoan-nao-voi-phong-van-javascript-8
title: "Xoắn não với phỏng vấn JavaScript 8"
series: "JavaScript Quiz"
tags:
  - ES6
  - Destructuring Assignment
  - Spread syntax
  - Quiz
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 8**, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay.

Mời bạn theo dõi bài viết!

## Xoắn não với phỏng vấn JavaScript 8 – Câu 1

```js
const a = [{ x: 1 }, { y: 2 }];
const clone_a = [...a];

clone_a[0].x = 10;
clone_a[1].y = 20;

console.log(clone_a === a);
console.log(clone_a[0].x, clone_a[1].y);
console.log(a[0].x, a[1].y);
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
10 20
10 20
```

**Giải thích:**

Trước tiên, bạn nhận thấy biến **a** là một [mảng](/array-la-gi-array-trong-javascript/) gồm 2 phần tử <code>{x : 1}</code> và <code>{y : 2}</code>. Trong đó, mỗi phần tử lại là một [object](/object-la-gi-object-trong-javascript/).

Tiếp theo, trong câu lệnh <code>const clone_a = [...a]</code>, mình sử dụng [spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) để copy array a sang một biến mới là **clone_a**.

Vì vậy, khi so sánh <code>clone_a === a</code> thì kết quả chắc chắn sẽ là **false** (dòng 1 trong kết quả hiển thị).

Sau đó, mình thay đổi giá trị của x, y trong clone_a. Dễ thấy, kết quả dòng 2 sẽ là: 10 20.

Tuy nhiên, vấn đề nằm ở dòng thứ 3: tại sao kết quả lại là **10 20** mà không phải **1 2**?

Có thể bạn chưa biết, spread syntax có một chú ý quan trọng sau:

> Spread syntax effectively goes one level deep while copying an array. Therefore, it may be unsuitable for copying multidimensional arrays.

Nghĩa là, spread syntax chỉ thực hiện copy ở _level_ ngoài cùng. Còn đối với các level sâu bên trong thì cú pháp này không có tác dụng.

Mà 2 phần tử của mảng trên đều là đối tượng, do đó, chúng vẫn được _reference_ sang nhau. Hay nói cách khác, khi bạn thay đổi <code>clone_a[0].x</code> và <code>clone_a[1].y</code> thì <code>a[0].x</code> và <code>a[1].y</code> cũng sẽ thay đổi theo.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 8 – Câu 2

```js
const numbers = [0, 1, 2];
const points = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
];

numbers.forEach((n) => n++);

points.forEach((p) => {
  p.x++, p.y++;
});

console.log(numbers);
console.log(points);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```
[0, 1, 2]
[{x: 1, y: 2}, {x: 2, y: 3}]
```

**Giải thích:**

Khi thực hiện [forEach](/javascript-foreach-la-cai-quai-gi/), hiểu đơn giản là nó sẽ thực hiện một hành động đối với từng phần tử của mảng.

Đối với câu lệnh <code>numbers.forEach(n => n++)</code>, **n** sẽ tương ứng với các phần tử trong mảng là: **1, 2, 3**. Tuy nhiên, đây là các **primitive value**. Do đó, khi thực hiện <code>n++</code> thì giá trị của n sẽ thay đổi nhưng các giá trị 1, 2, 3 trong mảng _numbers_ trên vẫn thay đổi (kết quả dòng 1).

Đối với lần thực hiện forEach tiếp theo, **p** sẽ tương ứng với các phần tử trong mảng là: **{x: 0, y: 1}, {x: 1, y: 2}**. Các giá trị này là object (**reference value**) chứ không phải số bình thường. Tương tự như câu hỏi 1 trên, khi thay đổi giá trị của p, giá trị của các phần tử trong mảng cũng được **reference** theo nên sẽ bị thay đổi. Điều này dẫn đến kết quả như dòng thứ 2 bên trên.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 8 – Câu 3

```js
const x = { y: { z: { a: 1, b: 2 } } };
const {
  y: {
    z: { a, b },
  },
} = x;

console.log(a);
console.log(b);
console.log(z);
console.log(y);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```
1
2
Uncaught ReferenceError: z is not defined
```

**Giải thích:**

Mấu chốt của câu hỏi này liên quan đến cách hoạt động của [Destructuring Assignment](/destructuring-assignment-trong-javascript/) trên [ES6](/tag/es6/). Destructuring Assignment có thể áp dụng cho Object hoặc Array.

Ở đây, mình có biến x - là một object với rất nhiều lớp bên trong. Nếu như không áp dụng ES6 thì để lấy ra giá trị của a, b, z, y thì mình phải làm như sau:

```js
const x = { y: { z: { a: 1, b: 2 } } };
const a = x.y.z.a;
const b = x.y.z.b;
const z = x.y.z;
const y = x.y;

console.log(a); // 1
console.log(b); // 2
console.log(z); // { a: 1, b: 2 }
console.log(y); // { z: { a: 1, b: 2 } }
```

Bạn có thể thấy cách viết này khá dài dòng phải không? Đó chính là lý do Destructuring Assignment ra đời.

Khi áp dụng phương pháp này, thực chất là mình sẽ map giá trị với biến theo đúng thứ tự. Khi đó, dòng code thứ 2 bên trên có thể viết thành:

```js
const {
  y: {
    z: { a, b },
  },
} = { y: { z: { a: 1, b: 2 } } };
```

Ở đây, biến a, b sẽ được map với key tương ứng ở vế phải. Suy ra, giá trị của a và b lần lượt là 1 và 2 (đáp án dòng 1, 2).

**Đối với z và y thì sao?**

Một chú ý quan trọng trong Destructuring Assignment, biến số là thành phần nằm bên phải dấu **hai chấm** (:). Còn thành phần bên trái dấu hai chấm, nói nôm na là _thành phần dẫn đường_.

Do vậy, z và y ở trên vẫn chưa được định nghĩa, dẫn đến lỗi **Uncaught ReferenceError**.

Câu hỏi đặt ra bây giờ là: nếu mình muốn lấy hết tất cả giá trị của a, b, z, y thì làm thế nào?

Đơn giản, bạn cần sửa lại đoạn code trên như sau:

```js
const x = { y: { z: { a: 1, b: 2 } } };
const {
  y,
  y: {
    z,
    z: { a, b },
  },
} = x;

console.log(a); // 1
console.log(b); // 2
console.log(z); // { a: 1, b: 2 }
console.log(y); // { z: { a: 1, b: 2 } }
```

Trong đó, thành phần y, z **đứng một mình** chính là các biến số mà mình trích xuất ra.

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 8 – Câu 4

```js
let metadata = {
  title: "Window",
  size: [300, 400]
};

let title, size, width, height;

{
  title,
  size: [width, height]
} = metadata;

console.log(title, size, width, height);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án**:

```
Uncaught SyntaxError: Unexpected token :
```

**Giải thích**:

Khi mới nhìn câu hỏi này, rất nhiều bạn sẽ nghĩ ngay là: "câu hỏi này thì khác quái gì câu trên". Do đó, kết quả sẽ là:

```
Window undefined 300 400
```

Nhưng thực tế thì không phải như vậy. Vì khi bạn viết dạng gần giống như Destructuring Assignment mà lại không có khai báo kiểu (const, [var và let](/phan-biet-var-va-let-trong-javascript/)) ở đầu, thì JS sẽ hiểu đây là một block. Do đó, nó sẽ không hiểu cú pháp dạng <code>site : [width, height]</code> nghĩa là gì.

Để tránh bị lỗi trên, bạn có thể đặt Destructuring Assignment bên trong cặp dấu ngoặc đơn như sau:

```js
let metadata = {
  title: "Window",
  size: [300, 400],
};

let title, size, width, height;

({
  title,
  size: [width, height],
} = metadata);

console.log(title, size, width, height);
```

Kết quả thu được lúc này sẽ đúng như mong đợi:

```
Window undefined 300 400
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Lời kết

Trên đây là 4 câu hỏi phỏng vấn JavaScript cũng rất hay. Nếu bạn có cùng nhận xét với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!
