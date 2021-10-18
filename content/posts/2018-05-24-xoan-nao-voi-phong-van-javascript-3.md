---
date: "2018-05-24T12:36:10Z"
template: "post"
directory: "JavaScript"
cover: "../images/xoan-nao-voi-phong-van-javascript-3-completejavascript.com_.png"
keywords: "xoắn não với phỏng vấn javascript 3"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 3, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!"
slug: xoan-nao-voi-phong-van-javascript-3
title: "Xoắn não với phỏng vấn JavaScript 3"
tags:
  - IIFE
  - Strict Mode
  - Quiz
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 3**, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!

## Xoắn não với phỏng vấn JavaScript 3 - Câu 1

```js
let a = {
  x: 1,
  getX: function () {
    return this.x;
  },
};

let b = Object.create(a);
b.x = 10;

delete b.x;
console.log(b.getX());
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** 1

**Giải thích:**

Theo định nghĩa của [Object.create()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/create):

> The Object.create() method creates a new object, using an existing object to provide the newly created object's **proto**

Tức là Object.create sẽ tạo ra một object mới, sử dụng object cho trước làm **proto** cho object mới tạo ra.

Trong câu hỏi này, [object](/javascript-object-last-but-not-least) a sẽ được dùng làm **proto** cho object b.

Giả sử không có câu lệnh _delete b.x_ thì bạn có thể đoán được kết quả sẽ trả về của phương thức _getX()_ là **this.x = b.x = 10**. Nhưng nếu _delete b.x_ thì JavaScript sẽ tìm đến thằng cha gần nhất của b, thông qua **proto**, và đó chính là object a. Vì vậy, kết quả **this.x = a.x = 1**.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 3 - Câu 2

```js
let a = [1, "a", { x: 1 }, { y: 2 }, [1, 2], { x: 1 }];
console.log(a.indexOf({ x: 1 }));
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** -1

**Giải thích:**

Đúng vậy, kết quả là -1 chứ không phải là 2 hay 5 (vị trí của {x : 1} trong mảng). Bởi phương thức này đã [định nghĩa](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf#Description) rõ rằng:

> indexOf() compares searchElement to elements of the Array using strict equality (the same method used by the === or triple-equals operator).

Nghĩa là nó compare phần tử bằng dấu ===. Mà trong JavaScript, bạn không thể sử dụng toán tử này để so sánh 2 object. Ví dụ:

```js
console.log({ x: 1 } === { x: 1 });
// => false
```

Về mặt trực quan, bạn sẽ thấy 2 object trên giống nhau nên chúng phải bằng nhau. Không phải, chúng là 2 object hoàn toàn khác nhau.

> Vậy, nếu tôi vẫn muốn tìm vị trí của object có dạng {x : 1} thì sao?

Bạn có thể sử dụng phương thức [findIndex](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex).

Ví dụ:

```js
[1, "a", { x: 1 }, { y: 2 }, [1, 2], { x: 1 }].findIndex(function (element) {
  return (
    typeof element === "object" &&
    Object.keys(element).length === 1 &&
    Object.keys(element)[0] === "x" &&
    element.x === 1
  );
});
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 3 - Câu 3

```js
(function () {
  var x = (y = 10);
})();
console.log(y);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** 10

**Giải thích:**

Đoạn code trên thực chất có thể tách ra thành như sau:

```js
(function () {
  y = 10;
  var x = y;
})();
console.log(y);
```

Biến _y_ viết như vậy sẽ có phạm vi global, tức nó trở thành một thuộc tính của window. Do đó, **console.log(y) = 10**.

Trong khi đó, nếu bạn in ra giá trị của x bằng console.log(x) thì kết quả báo lỗi **ReferenceError: x is not defined**. Bởi vì, biến _x_ kiểu [var sẽ có phạm vi là block](/phan-biet-var-va-let-trong-javascript), tức là chỉ nó chỉ tồn tại trong [function](/tim-hieu-function-javascript) trên.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 3 - Câu 4

```js
let a = [1, 2, 3];
a[-1] = 4;
a[10] = 5;

console.log(a[6], a.length);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** undefined 11

**Giải thích:**

Như mình đã giải thích trong bài viết trước, bạn có thể sử dụng chỉ số âm trong mảng. Vì vậy, sau câu lệnh đầu tiên, mảng a trở thành:

```js
let a = [1, 2, 3];
a[-1] = 4;
//[1, 2, 3, -1: 4]
```

Tuy nhiên, cái này lại không ảnh hưởng đến độ dài của mảng, tức là a.length vẫn bằng 3.

Khi thực hiện câu lệnh tiếp theo là _a[10] = 5_, vì 10 là số tự nhiên lớn hơn độ dài hiện tại của mảng nên JavaScript sẽ cấp phát thêm bộ nhớ cho mảng thành 11 phần tử để lưu a[10] tại vị trí cuối cùng của mảng.

```js
a = [1, 2, 3, , , , , , , , 5, -1: 4]
```

Do đó, độ dài mảng a.length = 11

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 3 - Câu 5

```js
let a = {},
  b = { x: 12 },
  c = [1, 2],
  d = { m: "a", n: "b" };

a[b] = 34;
a[c] = 56;
a[d] = 78;

console.log(a[b], a[c], a[d]);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible5" class="toggle" type="checkbox">
  <label for="collapsible5" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** 78 56 78

**Giải thích:**

Ở đây, mình sử dụng object b, array c và object d làm giá trị key cho object a. Và đối với object trong JavaScript, vì key luôn luôn có [kiểu string](/values-types-va-operators-trong-javascript-phan-2) nên object b, array c và object d sẽ được convert sang kiểu string. Khi đó, sẽ có một số trường hợp đặc biệt sau:

Với mọi object khi convert sang kiểu string ta đều thu được string có dạng **[object Object]**;

Ví dụ:

```js
console.log({ x: 12 }.toString()); // => [object Object]
console.log({ x: 1, y: 2 }.toString()); // => [object Object]
```

Array khi convert sang string sẽ thu được string có dạng _các phần tử cách nhau bởi dấu phẩy (,)_. Ví dụ:

```js
console.log([1, 2].toString()); // => 1, 2
console.log([1, { x: 1 }].toString()); // => 1, [object Object]
```

Do đó, đoạn code trên sẽ tương đương với:

```js
let a = {},
  b = { x: 12 },
  c = [1, 2],
  d = { m: "a", n: "b" };

a["[object Object]"] = 34;
a["1, 2"] = 56;
a["[object Object]"] = 78;

console.log(a["[object Object]"], a["1, 2"], a["[object Object]"]);
```

Như vậy, kết quả thu được sẽ phải là: 78, 56, 78

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 3 - Câu 6

```js
var x = ((x = 0), x++, x);
let y = ((y = 0), y++, y);
console.log(x, y);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible6" class="toggle" type="checkbox">
  <label for="collapsible6" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** 1 ReferenceError: y is not defined

**Giải thích:**

Trước tiên, bạn cần quan tâm đến cú pháp **(expression1, expression2, expression3)**. Nó liên quan đến toán tử [comma](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Comma_Operator) (dấu phẩy) trong JavaScript.

Khi sử dụng toán tử này, các biểu thức sẽ được thực hiện từ trái sang phải và kết quả trả về sẽ là kết quả của biểu thức cuối cùng.

**Xét câu lệnh thứ nhất:**

```js
var x = ((x = 0), x++, x);
```

Biến x được khai báo kiểu var nên sẽ được hoisted. Do đó, câu lệnh này sẽ tương đương với:

```js
var x = undefined;
x = ((x = 0), x++, x);
```

Sau đó, _(x = 0, x++, x)_ sẽ thực hiện lần lượt thực hiện: x = 0, x++, x và trả về giá trị của biểu thức cuối cùng. Như vậy, x = 1;

**Xét biểu thức thứ 2:**

```js
let y = ((y = 0), y++, y);
```

Lần này, biến y được khai báo sử dụng let, nên nó sẽ không được hoisted. Vì vậy, khi _(y = 0, y++, y)_ thực hiện lần lượt các lệnh, thì ngay câu lệnh đầu tiên _y = 0_ sẽ báo lỗi ReferenceError: y is not defined. Bởi vì, biến y lúc này chưa được khai báo.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Kết luận

Trên đây là 6 câu hỏi phỏng vấn JavaScript cũng rất hay. Nếu bạn có cùng nhận xét với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/xoan-nao-voi-phong-van-javascript-4), thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
