---
date: "2018-05-31T12:00:59Z"
template: "post"
cover: "../images/xoan-nao-voi-phong-van-javascript-4-completejavascript.com_.png"
keywords: "xoắn não với phỏng vấn javascript 4"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 4, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!"
slug: xoan-nao-voi-phong-van-javascript-4
title: "Xoắn não với phỏng vấn JavaScript 4"
categories:
  - Phỏng vấn JavaScript
tags:
  - JSON
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 4**, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!

## Xoắn não với phỏng vấn JavaScript 4 – Câu 1

```js
Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};

let a = [3, 5, 7];
a.x = "hello";

Object.defineProperty(a, "y", {});
Object.defineProperty(a, "z", {
  enumerable: true,
});

for (let i of a) {
  console.log(i);
}
```

Hỏi console in ra kết quả như thế nào, tại sao?

<div class="wrap-collapsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```js
// 3
// 5
// 7
```

**Giải thích:**

Trước tiên, mình muốn nhấn mạnh rằng: về bản chất [Array](/javascript-array-co-ban) được [kế thừa từ prototype](/ke-thua-co-ban-trong-javascript) của [Object](/javascript-object-last-but-not-least). Đoạn code sau có thể chứng minh điều đó.

```js
let a = [];
let p1 = Object.getPrototypeOf(a);
let p2 = Object.getPrototypeOf(p1);

console.log(p1 === Array.prototype); // => true
console.log(p2 === Object.prototype); // => true
```

Cụ thể, **Object.getPrototypeOf(a)** trả về prototype của a là p1 – Array.prototype. Tiếp theo, **Object.getPrototypeOf(p1)** trả về prototype của p1 là p2 – Object.prototype.

Do đó, bạn hoàn toàn có thể thêm thuộc tính cho array giống trên object như các cách sau:

```js
a.x = "hello";

Object.defineProperty(a, "y", {});
Object.defineProperty(a, "z", {
  enumerable: true,
});
```

Vì vậy, nếu bạn hiển thị mảng a trên console thì sẽ thấy giá trị của mảng a như sau:

```js
console.log(a);
// => [3, 5, 7, x: "hello", z: undefined, y: undefined]
```

Tuy nhiên, mảng a vẫn có độ dài là 3.

```js
console.log(a.length);
// => 3
```

Nghĩa là các phần tử của **mảng** a vẫn chỉ là: 3, 5, 7.

Đó là lý do dẫn đến kết quả trên.

**Mở rộng:**

Thoạt nhìn, bạn có thể thấy rằng **for of** chả khác gì [forEach](/javascript-foreach-la-cai-quai-gi).

```js
a.forEach((item) => {
  console.log(item);
});
/*
 * 3
 * 5
 * 7
 */
```

Nhưng thực tế, **forEach** sẽ khác **for of** ở chỗ là: **for of** cho phép bạn sử dụng _break_, _continue_ hay _return_. Ngược lại, với **forEach** thì bạn không thể sử dụng các từ khoá này.

Nếu bạn chưa tin thì có thể tự thử nghiệm là sẽ thấy sự khác biệt. Mình chỉ gợi ý vậy thôi nhé!

Bây giờ mời bạn chuyển đến câu hỏi số 2.

**Tham khảo:**

- [ES6 In Depth: Iterators and the for-of loop](https://hacks.mozilla.org/2015/04/es6-in-depth-iterators-and-the-for-of-loop/)
- [for…of](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of)
- [Object.getPrototypeOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getPrototypeOf)
</div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 4 – Câu 2

```js
Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};

let a = [3, 5, 7];
a.x = "hello";

Object.defineProperty(a, "y", {});
Object.defineProperty(a, "z", {
  enumerable: true,
});

for (let i in a) {
  console.log(i);
}
```

Hỏi console in ra kết quả như thế nào, tại sao?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```js
// 0
// 1
// 2
// x
// z
// arrCustom
// objCustom
```

**Giải thích:**

Câu 2 chỉ khác câu 1 ở chỗ là mình sử dụng **for in** thay vì **for of**. Vậy mà kết quả lại khác biệt như vậy, tại sao?

Bởi lẽ, **for in** sẽ duyệt hết tất cả các thuộc tính **[enumerable](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Enumerability_and_ownership_of_properties)** của bản thân object và những cái mà nó kế thừa từ prototype.

Trong đó:

- _0_, _1_, _2_ lần lượt là chỉ số các phần tử của mảng, đồng thời cũng là các thuộc tính enumerable.
- _x_ là thuộc tính định nghĩa thêm như vậy, nên cũng là enumerable.
- _y_ và _z_ định nghĩa bằng cách sử dụng [Object.defineProperty](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) nên mặc định giá trị của **_enumerable_** là **_false_** – khi không chỉ rõ. Do đó, _y_ thuộc loại _non-enumerable_ và _z_ là _enumerable_. Vì vậy, y sẽ không được in ra.
- _arrCustom_ và _objCustom_ là các thuộc tính (phương thức) được định nghĩa thêm ở prototype của Array và Object. Chúng thuộc loại _enumerable_. Mà theo câu 1, Array có kế thừa prototype của Object, nên cả 2 thuộc tính này đều được in ra.

**Tham khảo:**

- [for…in](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in#Array_iteration_and_for...in)
- [Object.prototype](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype)
</div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 4 – Câu 3

```js
Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};

let a = [3, 5, 7];
a.x = "hello";

Object.defineProperty(a, "y", {});
Object.defineProperty(a, "z", {
  enumerable: true,
});

for (let i in a) {
  if (a.hasOwnProperty(i)) console.log(i);
}
```

Hỏi console in ra kết quả như thế nào, tại sao?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```js
// 0
// 1
// 2
// x
// z
```

**Giải thích:**

Câu 3 khác với câu 2 ở chỗ có sử dụng thêm phương thức [Object.prototype.hasOwnProperty()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty). Phương thức này kiểm tra xem object có chứa một thuộc tính cho trước hay không.

Nếu đúng thì kết quả trả về là **true**. Ngược lại, nếu thuộc tính đó không tồn tại, hoặc nó là thuộc tính của prototype, hay nó được kế thừa từ prototype thì kết quả trả về là **false**.

Trong khi đó, _arrCustom_ và _objCustom_ lần lượt là thuộc tính của **Array.prototype** và **Object.prototype** nên chúng sẽ không được in ra.
</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 4 – Câu 4

```js
let obj = {
  x: 1,
  y: "hello",
  z: { a: 1 },
  t: [1, 2],
};

Object.freeze(obj);

obj.x = 2;
obj.y = "bye";
obj.z.a = 2;
obj.t[0] = 3;
obj.t[1] = 4;

console.log(obj);
```

Hỏi console in ra kết quả như thế nào, tại sao?

<div class="wrap-collapsible">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```js
// {x: 1, y: "hello", z: {a : 2}, t: [3, 4]}
```

**Giải thích:**

Trước tiên, bạn thấy rằng giá trị của x và y không đổi. Trong khi đó, giá trị của z và t đã thay đổi.

Vậy ý nghĩa của [Object.freeze](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze) là gì?

**Object.freeze** sẽ không cho phép thêm, sửa và xoá thuộc tính. Tuy nhiên, nếu giá trị của thuộc tính là Object thì giá trị đó vẫn có thể thay đổi. Như trong câu hỏi, giá trị của z, t đều là Object (Array), nên giá trị của chúng vẫn thay đổi được.

Tuy nhiên, bạn sẽ không thể gán z, t cho Object (Array) mới như sau:

```js
let obj = {
  x: 1,
  y: "hello",
  z: { a: 1 },
  t: [1, 2],
};

Object.freeze(obj);

obj.x = 2;
obj.y = "bye";
obj.z = { a: 2 };
obj.t = [3, 4];

console.log(obj);
// => {x: 1, y: "hello", z: {a : 1}, t: [1, 2]}
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 4 – Câu 5

```js
let obj = {
  x: 1,
  y: "Hi",
  z: function () {
    console.log(this.x, this.y);
  },
};

let str = JSON.stringify(obj);
console.log(str);
```

Hỏi console in ra kết quả như thế nào, tại sao?

<div class="wrap-collapsible">
  <input id="collapsible5" class="toggle" type="checkbox">
  <label for="collapsible5" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```js
// {"x":1,"y":"Hi"}
```

**Giải thích:**

Phương thức [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) sẽ convert mỗi giá trị JavaScript thành dạng [JSON string](/tim-hieu-ve-json-trong-javascript).

Và giá trị JavaScript thường dùng nhất chính là object. Tuy nhiên, nếu giá trị của một thuộc tính là [function](/tim-hieu-function-javascript) thì **JSON.stringify** sẽ bỏ qua thuộc tính này.

Đó là lý do tại sao bạn không thấy thuộc tính z trong kết quả.
</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 4 – Câu 6

```js
let a = { y: 1 };
a.x = a;

let str = JSON.stringify(a);
console.log(str);
```

Hỏi console in ra kết quả như thế nào, tại sao?

<div class="wrap-collapsible">
  <input id="collapsible6" class="toggle" type="checkbox">
  <label for="collapsible6" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```js
// TypeError: Converting circular structure to JSON
```

**Giải thích:**

Bạn sẽ nhận được lỗi: **TypeError: Converting circular structure to JSON**. Bởi lẽ, object a ở trên có cấu trúc lặp vô hạn.

Xem thêm: [Issue with JSON.stringify() when serializing circular references](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify#Issue_with_JSON.stringify()_when_serializing_circular_references>)
</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Kết luận

Trên đây là 6 câu hỏi phỏng vấn JavaScript cũng rất hay. Nếu bạn có cùng nhận xét với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/xoan-nao-voi-phong-van-javascript-5), thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
