---
date: "2018-06-14T12:00:20Z"
template: "post"
directory: "JavaScript"
cover: "../images/xoan-nao-voi-phong-van-javascript-6-completejavascript.com_.png"
keywords: "xoắn não với phỏng vấn javascript 6"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 6, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!"
slug: xoan-nao-voi-phong-van-javascript-6
title: "Xoắn não với phỏng vấn JavaScript 6"
tags:
  - Quiz
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 6**, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay.

Mời bạn theo dõi bài viết!

## Xoắn não với phỏng vấn JavaScript 6 - Câu 1

```js
let foo = function bar() {
  return "hello";
};

console.log(typeof bar);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** undefined

**Giải thích:**

Cách khai báo [hàm số](/tim-hieu-function-javascript) như trên được gọi là **Named function expression**, tức là bạn đặt tên cho function expression. Khi đó, bạn có thể sử dụng hàm số ngay bên trong nội dung của hàm.

Ví dụ:

```js
var math = {
  factit: function factorial(n) {
    console.log(n);
    if (n <= 1) return 1;
    return n * factorial(n - 1);
  },
};

math.factit(3);
// => 3;2;1;
```

Ngược lại, khi bạn không sử dụng **Named function expression** thì ví dụ trên phải sửa thành:

```js
var math = {
  factit: function (n) {
    console.log(n);
    if (n <= 1) return 1;
    return n * this.factit(n - 1);
  },
};

math.factit(3);
// => 3;2;1;
```

Vậy **Named function expression** có đặc điểm gì?

**Named function expression** có đặc điểm là phạm vi sử dụng của nó chỉ ở bên trong hàm số.

Quay lại câu hỏi trên, _bar_ sẽ chỉ có ý nghĩa ở bên trong hàm số, ra bên ngoài thì _bar_ sẽ là **undefined**.

```js
let foo = function bar() {
  console.log(typeof bar);

  return "hello";
};

foo(); // => function
console.log(typeof bar); // => undefined
```

Tóm lại, đáp án của câu hỏi 1 là undefined.

Ngoài ra, bạn có thể xem thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function#Named_function_expression) để hiểu rõ hơn về **Named function expression**.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 6 - Câu 2

```js
let person = {
  name: "foo",
};

Object.preventExtensions(person);

person.name = "bar";
person.job = "teacher";

console.log(person);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** {name: "bar"}

**Giải thích:**

[Object.preventExtensions](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions) ngăn chặn việc thêm thuộc tính vào [object](/javascript-object-last-but-not-least).

Do đó, việc thêm thuộc tính **person.job = "teacher"** sẽ không có ý nghĩa. Vì vậy, kết quả của câu hỏi sẽ là: **{name: "bar"}**.

Ngoài ra, nếu bạn sử dụng code trên ở chế độ [strict mode](/mot-so-loi-khi-su-dung-strict-mode-javascript) thì bạn sẽ nhận được thông báo lỗi: **TypeError: Cannot add property job, object is not extensible**.

```js
"use strict";
let person = {
  name: "foo",
};

Object.preventExtensions(person);

person.name = "bar";
person.job = "teacher";

console.log(person);
// => TypeError: Cannot add property job, object is not extensible
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 6 - Câu 3

```js
let person = {
  name: "foo",
};

Object.preventExtensions(person);
person.__proto__.sayHi = function () {
  console.log("Hi");
};

console.log(person.sayHi());
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** Hi

**Giải thích:**

**Object.preventExtensions()** chỉ ngăn chặn việc thêm thuộc tính vào bản thân object. Đối với prototype của object thì bạn vẫn có thể thêm vào.

Trong câu hỏi này, mình đã thêm thuộc tính _sayHi_ vào prototype của đối tượng person. Điều này là hoàn toàn hợp lệ, nên bạn sẽ nhận được kết quả là _Hi_.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 6 - Câu 4

```js
let person = {
  name: "foo",
};

Object.preventExtensions(person);
person.__proto__ = { job: "teacher" };

console.log(person.job);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án: TypeError: #&lt;Object&gt; is not extensible**

**Giải thích:**

Một đặc điểm quan trọng nữa của **Object.preventExtensions()** là: nó làm cho **\_\_proto\_\_** trở thành **immutable** – tức là bạn có thể thay đổi giá trị của nó, nhưng không thể gán nó cho một object mới.

Trong khi đó, câu lệnh _person.\_\_proto\_\_ = { job: "teacher" }_ đã gán object mới cho **\_\_proto\_\_** của person.

Vì vậy, bạn sẽ nhận được lỗi như trên.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 6 - Câu 5

```js
let a = { x: 1, y: 2 };
let b = { y: 3, z: 4 };

Object.assign(a, b);
console.log(a, b);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible5" class="toggle" type="checkbox">
  <label for="collapsible5" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** {x: 1, y: 3, z: 4} {y: 3, z: 4}

**Giải thích:**

Phương thức [Object.assign](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) được định nghĩa như sau:

> The Object.assign() method is used to copy the values of all enumerable own properties from one or more source objects to a target object. It will return the target object.

Dịch ra là:

> Object.assign() được sử dụng để sao chép các giá trị của tất cả thuộc tính có thể liệt kê từ một hoặc nhiều đối tượng nguồn đến một đối tượng đích. Nó sẽ trả về đối tượng đích đó.

Trong câu hỏi trên:

- Các thuộc tính x, y, z đều là **enumerable**.
- a là đối tượng đích, b là đối tượng nguồn.

Do đó, các thuộc tính của b sẽ được copy sang a và b vẫn giữ nguyên. Trường hợp thuộc tính của a và b giống nhau (thuộc tính y) thì giá trị của thuộc tính đích sẽ bị ghi đè bởi giá trị của thuộc tính nguồn.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 6 - Câu 6

```js
let a = Object.create(
  { foo: 1 },
  {
    bar: { value: 2 },
    baz: { value: 3, enumerable: true },
  }
);

let b = Object.assign({}, a);
console.log(b);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible6" class="toggle" type="checkbox">
  <label for="collapsible6" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** {baz: 3}

**Giải thích:**

Khi sử dụng [Object.create](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create) để tạo object như trên thì _{ foo: 1 }_ sẽ là **\_\_proto\_\_** của object mới. Nên nó sẽ không được sao chép thông qua _Object.assign_.

Tiếp theo là việc định nghĩa các thuộc tính cho object:

```js
{
  bar: { value: 2 },
  baz: { value: 3, enumerable: true }
}
```

Thuộc tính _bar_ không chỉ rõ giá trị của _enumerable_ nên nó sẽ lấy giá trị mặc định là _false_. Do đó, thuộc tính _bar_ cũng sẽ không được sao chép thông qua _Object.assign_.

Còn lại thuộc tính _baz_, giá trị _enumerable_ của nó là true. Nên thuộc tính này sẽ được sao chép thông qua _Object.assign_.

Vì vậy, đối tượng b chỉ có 1 thuộc tính là _baz_ và kết quả thu được là _{baz: 3}_.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Kết luận

Trên đây là 6 câu hỏi phỏng vấn JavaScript cũng rất hay. Nếu bạn có cùng nhận xét với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
