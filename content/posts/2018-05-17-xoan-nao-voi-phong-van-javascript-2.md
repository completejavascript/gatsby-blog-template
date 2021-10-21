---
date: "2018-05-17T12:19:36Z"
template: "post"
directory: "JavaScript"
cover: "../images/xoan-nao-voi-phong-van-javascript-2-completejavascript.com_.png"
keywords: "xoắn não với phỏng vấn javascript 2"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 2, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!"
slug: xoan-nao-voi-phong-van-javascript-2
title: "Xoắn não với phỏng vấn JavaScript 2"
tags:
  - ES6
  - IIFE
  - Quiz
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 2**, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay. Mời bạn theo dõi bài viết!

## Xoắn não với phỏng vấn JavaScript 2 – Câu 1

Cho bạn 4 đoạn code sau:

**Đoạn 1:**

```js
let person = {
  name: "Bob",
  sayName: function () {
    setTimeout(function () {
      console.log(`I'm ${this.name}`);
    }, 1000);
  },
};
person.sayName();
```

**Đoạn 2:**

```js
let person = {
  name: "Bob",
  sayName: () => {
    setTimeout(() => {
      console.log(`I'm ${this.name}`);
    }, 1000);
  },
};
person.sayName();
```

**Đoạn 3:**

```js
let person = {
  name: "Bob",
  sayName: function () {
    setTimeout(() => {
      console.log(`I'm ${this.name}`);
    }, 1000);
  },
};
person.sayName();
```

**Đoạn 4:**

```js
let person = {
  name: "Bob",
  sayName: () => {
    setTimeout(function () {
      console.log(`I'm ${this.name}`);
    }, 1000);
  },
};
person.sayName();
```

Hỏi console in ra kết quả thế nào và tại sao?

<div class="wrap-collapsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

- Đoạn code 1, 2, 4: I'm
- Đoạn code 3: I'm Bob

Như vậy đoạn code 3 là đoạn code in ra kết quả như mong muốn.

**Giải thích:**

Để giải quyết bài toán này bạn cần nắm được sự khác biệt giữa [function](/tim-hieu-function-javascript) và [arrow function](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions). Cụ thể là về **[this](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this)**.

➤ Đối với function:

> In most cases, the value of this is determined by how a function is called. It can't be set by assignment during execution, and it may be different each time the function is called.

Tức là: trong hầu hết các trường hợp, _this_ được xác định dựa trên cách function được gọi như thế nào. Nó không thể set trong quá trình chạy, và có thể khác nhau trong mỗi lần function được gọi.

Nếu so sánh với các ngôn ngữ khác như C++, Java,… thì có thể hiểu _this_ chính là một con trỏ, và mình có thể trỏ nó đến các đối tượng khác nhau.

Hãy thử xem xét 4 ví dụ sau:

**Ví dụ 1:**

```js
function func1() {
  console.log("function 1: ", this);
}
func1();
// => function 1:  Window {
//  postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …
// }
```

Ở đây, việc bạn gọi _func1()_ sẽ tương đương với _window.func1()_. Vì vậy, _this_ sẽ là đối tượng _window_.

**Ví dụ 2:**

```js
function func2() {
  console.log("function 2: ", this);
}

let obj = { x: 1 };
func2.bind(obj)();
// => function 2:  {x: 1}
```

Ở đây, mình dùng phương thức [bind](/phan-biet-call-apply-va-bind-trong-javascript) để bind _this_ với đối tượng _obj_. Vì vậy, _this_ sẽ là tương ứng với đối tượng _obj_.

**Ví dụ 3:**

```js
let person = {
  name: "Bob",
  test: function () {
    console.log("test: ", this);
  },
};
person.test();
// => test:  {name: "Bob", test: ƒ}
```

Ở ví dụ này, hàm _test_ là một phương thức của obj _person_ và chính đối tượng này chịu trách nhiệm gọi hàm. Vì vậy, _this_ sẽ trỏ tới _person_.

**Ví dụ 4:**

```js
setTimeout(function () {
  console.log("callback: ", this);
}, 1000);
// => callback:  Window {
// postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …
// }
```

Ở đây, function được truyền vào setTimeout, dạng callback. Thực chất, khi những hàm callback này được gọi thì thằng gọi nó chính là window. Vì vậy, _this_ sẽ ứng với _window_.

Tóm lại, thằng nào gọi function thì _this_ chính là thằng đó.

➤ Đối với arrow function:

> An arrow function expression has a shorter syntax than a function expression and does not have its own this, arguments, super, or new.target.

Theo như định nghĩa, hàm arrow function không có thuộc tính _this_. Vì vậy, _this_ sẽ được duy trì với ngữ cảnh gần nhất chứa nó.

**Ví dụ:**

```js
let person = {
  name: "Bob",
  test: () => {
    console.log("test: ", this);
  },
};
person.test();
// => test:  Window {postMessage: ƒ, blur: ƒ, focus: ƒ, close: ƒ, frames: Window, …}
```

Mặc dù, hàm _test_ được gọi bởi đối tượng _person_, nhưng vì hàm này là arrow function nên _this_ sẽ ứng với ngữ cảnh gần nhất – là window.

Như vậy, ứng với mỗi đoạn code trên thì _this_ sẽ được xác định như sau:

**Đoạn 1:**

```js
let person = {
  name: "Bob",
  sayName: function () {
    // this = person
    setTimeout(function () {
      // this = window
      console.log(`I'm ${this.name}`);
    }, 1000);
  },
};
person.sayName();
```

**Đoạn 2:**

```js
let person = {
  name: "Bob",
  sayName: () => {
    // this = window
    setTimeout(() => {
      // this = window
      console.log(`I'm ${this.name}`);
    }, 1000);
  },
};
person.sayName();
```

**Đoạn 3:**

```js
let person = {
  name: "Bob",
  sayName: function () {
    // this = person
    setTimeout(() => {
      // this = person
      console.log(`I'm ${this.name}`);
    }, 1000);
  },
};
person.sayName();
```

**Đoạn 4:**

```js
let person = {
  name: "Bob",
  sayName: () => {
    // this = window
    setTimeout(function () {
      // this = window
      console.log(`I'm ${this.name}`);
    }, 1000);
  },
};
person.sayName();
```

Với cách xác định _this_ như trên thì đoạn code 3 sẽ cho ra kết quả như mong muốn.

**Bonus:**

➤ Với đoạn code 1 phía trên, mình có thể sửa đi 1 chút để ra kết quả như mong muốn mà không cần dùng arrow function:

**Cách 1**: sử dụng biến tạm để lưu lại giá trị của _this_

```js
let person = {
  name: "Bob",
  sayName: function () {
    let self = this;
    // this = person, self = person
    setTimeout(function () {
      // this = window, self = person
      console.log(`I'm ${self.name}`);
    }, 1000);
  },
};
person.sayName();
```

**Cách 2**: sử dụng phương thức bind để gán _this_ cho đối tượng mong muốn

```js
let person = {
  name: "Bob",
  sayName: function () {
    // this = person
    setTimeout(
      function () {
        // this = person
        console.log(`I'm ${this.name}`);
      }.bind(this),
      1000
    );
  },
};
person.sayName();
```

Cụ thể, mình đã bind hàm callback trên với this – person. Vì vậy, _this_ bên trong hàm callback sẽ tương ứng với _person_.

> Với các đoạn code còn lại, tại sao kết quả không phải là "I'm undefined" mà chỉ là "I'm". Bởi vì, đối tượng window có sẵn một thuộc tính là "name". Khi bạn chưa set giá trị cho nó thì mặc định name là một string rỗng "", chứ không phải **undefined**. Điều đó giải thích cho kết quả phía trên.

Trên đây là lời giải thích khá chi tiết cho câu hỏi số 1. Mời bạn đến với câu số 2.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 2 – Câu 2

```js
(function (foo) {
  console.log(typeof foo);
})([1, 2, 3]);
```

Hỏi console in ra kết quả như thế nào?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** object

**Giải thích:**

Với câu hỏi này, bạn cần quan tâm đến 2 vấn đề:

**[IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE) (Immediately Invoked Function Expression):** tức là hàm số thực thi ngay sau khi nó được khai báo. Và bạn có thể truyền tham số vào hàm này, bằng cách:

```js
(function (p) {})(parameter);
```

Trong đó, _parameter_ sẽ tương ứng với _p_.Quay lại với câu hỏi, _foo_ chính là [array](/javascript-array-co-ban) [1, 2, 3].

**Toán tử [typeof](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof)** sẽ trả về string biểu diễn kiểu dữ liệu của toán hạng tương ứng. Tuy nhiên, bạn cần chú ý là **typeof (array)** luôn trả về "object" chứ không phải "array".

Như vậy, đáp án cho câu hỏi này phải là: "object".

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 2 – Câu 3

```js
// Cách 1:
function func() {}

// Cách 2:
let func = function () {};
```

Hai cách khai báo function trên khác nhau như thế nào? Nêu ví dụ minh họa?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

Hai cách trên đều dùng để khai báo function, nhưng chúng khác nhau ở những điểm sau:

Cách 1 gọi là **function declaration**. Trong khi, cách 2 gọi là **function expression**.

Cách 1 bắt buộc phải có tên. Ngược lại, cách thứ 2 bạn có thể bỏ qua tên của function. Chú ý: tên của function là thành phần ở giữa _function_ và _()_. Tức là:

```js
// Function declaration
function name() {}          // Đúng
function (){}               // Lỗi: SyntaxError: Unexpected token (

// Function expression
let name = function (){}    // Đúng
let name = function a(){}   // Đúng
```

Function declaration được **hoisted**. Function expression thì không. Và **[hoisting](https://developer.mozilla.org/en-US/docs/Glossary/Hoisting)** được hiểu nôm na là mọi biến, hàm được hoisted sẽ được _đưa lên_ vị trí đầu tiên trong block chứa nó.

Do đó, nếu sử dụng cách 1, bạn có thể gọi hàm trước khi khai báo hàm. Ngược lại, khi sử dụng cách 2, bạn buộc phải định nghĩa hàm trước khi sử dụng nó.

```js
// Cách 1:
func(); // Đúng
function func() {
  console.log("Hello");
}

// Cách 2:
func(); // Lỗi: ReferenceError: func is not defined
let func = function () {
  console.log("Hello");
};
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 2 – Câu 4

```js
let cat = function () {
  return;
  {
    say: "meow";
  }
};
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án**: undefined

**Giải thích**:

Bởi vì, với JavaScript bạn có thể không cần sử dụng dấu chấm phẩy (;). Do đó, đoạn code trên sẽ tương đương với:

```js
let cat = function () {
  return undefined;

  {
    say: "meow";
  }
};
console.log(cat());
// => undefined
```

Vì vậy, đoạn code phía sau _return_ sẽ không bao giờ được chạy đến. Để sửa lại kết quả sao cho đúng thì bạn có thể làm như sau:

```js
let cat = function () {
  return {
    say: "meow",
  };
};
console.log(cat());
// => {say: "meow"}
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 2 – Câu 5

```js
console.log(Math.max());
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible5" class="toggle" type="checkbox">
  <label for="collapsible5" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** -Infinity

**Giải thích:**

**-Infinity** tương ứng với [Number.NEGATIVE_INFINITY](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/NEGATIVE_INFINITY) – là số âm vô cùng.

Khi không có tham số được truyền vào hàm [Math.max](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max) thì kết quả trả về sẽ là -Infinity.

Nhưng tại sao kết quả lại là số này? Trước tiên cần xem xét thuật toán tìm số lớn nhất trong một mảng. Mình có thể implement lại như sau:

```js
function max(arr) {
  let ans = -Infinity;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > ans) ans = arr[i];
  }
  return ans;
}
```

Tức là để tìm ra số lớn nhất của mảng, mình cần khởi tạo _ans_ với giá trị nhỏ nhất có thể. Sau đó, mình duyệt từng phần tử của mảng và kiểm tra nếu như phần tử đó lớn hơn giá trị nhỏ nhất hiện tại thì gán ans = giá trị phần tử hiện tại. Đó chính là lý do tại sao bạn có thể suy ra kết quả là -Infinity mà không cần đọc tài liệu.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 2 – Câu 6

```js
console.log(0 + "0");
console.log(0 - "0");
console.log(0 * "0");
console.log(0 / "0");
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible6" class="toggle" type="checkbox">
  <label for="collapsible6" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:**

```
00
0
0
NaN
```

**Giải thích:**

Khi thực hiện [tính toán trong JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Arithmetic_Operators) mà kiểu dữ liệu của các toán hạng là khác nhau thì JavaScript sẽ tự động convert chúng về cùng 1 kiểu dữ liệu.

Ở câu hỏi, 2 toán hạng có kiểu dữ liệu lần lượt là number và string. Do đó, JavaScript sẽ phải convert chúng về cùng 1 kiểu.

**Vấn đề là kiểu nào, number hay string?**

Với toán tử + thì JavaScript sẽ ưu tiên convert về string. Do đó:

```
0 + '0' = '0' + '0' = '00'
```

Với các toán tử còn lại (-, \*, /), JavaScript sẽ convert về number. Bởi lẽ, các toán tử này không áp dụng được với string. Do đó:

```
0 - '0' = 0 - 0 = 0;
0 * '0' = 0 * 0 = 0;
0 / '0' = 0 / 0 = NaN;
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Kết luận

Trên đây là 6 câu hỏi phỏng vấn JavaScript cũng rất hay. Nếu bạn có cùng nhận xét với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/xoan-nao-voi-phong-van-javascript-3), thân ái!
