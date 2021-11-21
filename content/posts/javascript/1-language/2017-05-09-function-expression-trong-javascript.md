---
date: "2017-05-09T09:00:00Z"
update: "2021-11-21T14:30:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/function-expression-trong-javascript.png"
keywords: "function expression"
description: "Trong JavaScript, hàm cũng là một loại giá trị. Vì vậy, bạn có thể định nghĩa hàm như một biểu thức. Cái đó gọi là function expression."
slug: function-expression-trong-javascript
title: "Function expression trong JavaScript"
series: "JavaScript: JavaScript cơ bản"
tags:
  - Hàm
---

Trong bài viết trước, mình đã tìm hiểu về [hàm trong JavaScript](/ham-la-gi-ham-trong-javascript/). Cách khai báo hàm đó gọi là "function declaration". Bài viết này mình sẽ tìm hiểu về một khái niệm khác gọi là "function expression" hay dịch ra là "biểu thức hàm".

## Function expression là gì?

Function expression hiểu đơn giản là hàm được định nghĩa trong một biểu thức, ví dụ:

```js
let sayHello = function () {
  console.log("Hello from completejavascript.com");
};
```

Có thể hiểu là mình khởi tạo một hàm, rồi gán hàm đó cho biến `sayHello` giống như bất kỳ loại giá trị nào khác (number, string, boolean,...). Bạn có thể in ra giá trị biến `sayHello`:

```js{5}
let sayHello = function () {
  console.log("Hello from completejavascript.com");
};

console.log(sayHello);
// ƒ () {
//  console.log("Hello from completejavascript.com");
// }
```

Kết quả hiển thị ra là một string biểu diễn hàm.

**Chú ý**: trong câu lệnh `console.log` trên mình viết là `sayHello` mà không có cặp dấu ngoặc đơn `()`. Vì nếu có cặp dấu `()` thì đó nghĩa là **gọi hàm**.

```js{5}
let sayHello = function () {
  console.log("Hello from completejavascript.com");
};

console.log(sayHello());
// Hello from completejavascript.com
// undefined
```

Kết quả là function expression với `sayHello` được gọi, nên dòng chữ **Hello from completejavascript.com** được in ra.

Sau đó là dòng `undefined` - vì biểu thức hàm `sayHello` không có `return` giá trị nào cả.

## Đặc điểm của function expression

Vì biểu thức hàm cũng là một giá trị, nên bạn hoàn toàn có thể gán nó cho một biến khác, ví dụ:

```js{5}
let sayHello = function () {
  console.log("Hello from completejavascript.com");
};

let sayHi = sayHello;
sayHi(); // Hello from completejavascript.com
```

Khi đó, bạn gọi `sayHi()` cũng giống như gọi `sayHello()`.

> 📝 Không chỉ **function expression** mà **function declaration** cũng là một giá trị.

Ví dụ:

```js{1}
function sayHello() {
  console.log("Hello from completejavascript.com");
}

let sayHi = sayHello;
sayHi(); // Hello from completejavascript.com
```

## Hàm callback

Vì bản chất hàm là một giá trị, nên bạn có thể truyền hàm vào một hàm khác.

Ví dụ mình cần viết một hàm `ask(question, handleYes, handleNo)` với ba tham số:

- `question`: là một string, biểu thị câu hỏi.
- `handleYes`: là hàm được gọi nếu câu trả lời là `yes`.
- `handleNo`: là hàm được gọi nếu câu trả lời là `no`.

Code triển khai hàm `ask` như sau:

```js{4,6}
function ask(question, handleYes, handleNo) {
  const answer = confirm(question);
  if (answer) {
    handleYes();
  } else {
    handleNo();
  }
}

function handleYes() {
  console.log("You chose Yes!");
}

function handleNo() {
  console.log("You chose No!");
}

ask("Bạn muốn tiếp tục thực hiện chương trình không?", handleYes, handleNo);
```

Trong ví dụ trên, [hàm confirm](/ham-tuong-tac-nguoi-dung-alert-confirm-prompt/) bật ra một hộp thoại hỏi người dùng "Bạn muốn tiếp tục thực hiện chương trình không?".

Nếu người dùng chọn **OK** thì giá trị của `answer` là `true`. Khi đó, hàm `handleYes` được gọi. Ngược lại, khi `answer` là `false` thì hàm `handleNo` được gọi.

Ở đây, hai tham số `handleYes` và `handleNo` gọi là **hàm callback** hay gọi tắt là **callback**.

> 💡 Ý tưởng của **hàm callback** là hàm này được truyền vào hàm khác, để gọi lúc cần thiết.
>
> Liên hệ thực tế như khi bạn gọi điện đến nhà một người bạn. Nhưng người bạn cần tìm không có nhà, mà bạn không thể giữ điện thoại đợi cho đến khi người đó về.
>
> Vì vậy, bạn để lại lời nhắn, kèm số điện thoại để khi nào người đó về sẽ gọi lại cho bạn.
>
> _Có thể bạn quan tâm: [Xử lý bất đồng bộ với callback, promise, async/await](/xu-ly-bat-dong-bo-callback-promise-async-await/#sử-dụng-callback-để-xử-lý-bất-đồng-bộ)_

Trong ví dụ trên, mình viết định nghĩa hai hàm `handleYes` và `handleNo` sử dụng "function declaration". Nhưng bạn có thể thay thế bằng biểu thức hàm như sau:

```js{12-17}
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
  function () {
    console.log("You chose Yes!");
  },
  function () {
    console.log("You chose No!");
  }
);
```

Vì thực tế là hai hàm `handleYes` và `handleNo` chỉ sử dụng bên trong hàm `ask`, nên mình có thể dùng function expression như trên mà không cần khai báo tên hàm.

> 📝 Những hàm như trên còn có tên gọi khác là "anonymous function" hay "hàm ẩn danh".

## So sánh function expression với function declaration

Đọc đến đấy chắc bạn cũng đã khá hiểu về biểu thức hàm rồi phải không?

Sau đây, mình cùng xem những điểm khác nhau giữa biểu thức hàm (function expression) và định nghĩa hàm (function declaration).

**► Cú pháp khai báo:**

**Function declaration**: là hàm được định nghĩa độc lập, không nằm trong biểu thức hay câu lệnh nào cả.

```js
function sayHello() {
  console.log("Hello!");
}
```

**Function expression**: là hàm được định nghĩa với một biểu thức, sử dụng [toán tử gán](/toan-tu-la-gi-toan-tu-trong-javascript/) `=`.

```js
let sayHello = function () {
  console.log("Hello!");
};
```

**► Thời gian khởi tạo:**

**Function declaration**: hàm được xử lý sớm hơn vị trí mà hàm được định nghĩa. Nghĩa là bạn có thể gọi hàm trước khi định nghĩa hàm.

```js
sayHello(); // Hello!

function sayHello() {
  console.log("Hello!");
}
```

**Function expression**: hàm được tạo ra tại thời điểm chương trình thực thi xử lý tới đó. Nghĩa là bạn không thể gọi biểu thức hàm trước khi định nghĩa nó.

Ví dụ sau bị lỗi cú pháp:

```js
sayHello(); // Uncaught ReferenceError: sayHello is not defined

let sayHello = function () {
  console.log("Hello!");
};
```

**► Phạm vi của function declaration và function expression:**

Khi sử dụng [strict mode](/use-strict-trong-js/), function declaration có phạm vi trong **block**. Bạn có thể gọi hàm ở bất kỳ đâu trong block đó, nhưng không sử dụng được ở bên ngoài.

Ví dụ sau bị lỗi cú pháp:

```js{1, 6-8, 10-12, 15}
"use strict";

let isVietnamese = confirm("Bạn có phải người Việt Nam không?");

if (isVietnamese) {
  function welcome() {
    console.log("Chào bạn!");
  }
} else {
  function welcome() {
    console.log("Hello!");
  }
}

welcome(); // Uncaught ReferenceError: welcome is not defined
```

Bởi vì hàm `welcome` được định nghĩa bên trong block của `if` nên chỉ dùng được bên trong block đó.

Để sử dụng hàm `welcome` bên ngoài block, bạn có thể dùng function expression như sau:

```js{4, 7-9, 11-13}
"use strict";

let isVietnamese = confirm("Bạn có phải người Việt Nam không?");
let welcome;

if (isVietnamese) {
  welcome = function () {
    console.log("Chào bạn!");
  };
} else {
  welcome = function () {
    console.log("Hello!");
  };
}

welcome(); // Không có lỗi
```

> 📝 Dĩ nhiên, đoạn code trên chỉ là ví dụ minh họa. Thực tế, bạn có nhiều cách để giải quyết bài toán này.

**Nên viết hàm theo function declaration hay function expression?**

Câu trả lời là: **tùy bạn**.

Tùy thuộc vào phong cách và mục đích của bạn mà lựa chọn cho phù hợp.

Tuy nhiên, theo quan điểm cá nhân thì mình thấy dùng **function declaration** sẽ dễ nhìn hơn. Ngoài ra, **function declaration** còn giúp bạn thoải mái hơn trong việc cấu trúc code (không phụ thuộc nhiều vào thứ tự code).

## Tổng kết

Bản chất của hàm là **giá trị**. Vì vậy, bạn có thể thoải mái **gán, sao chép và truyền một hàm vào hàm khác** dạng tham số.

Khi một hàm được định nghĩa độc lập thì đó gọi là "function declaration". Ngược lại, khi một hàm được định nghĩa bên trong một biểu thức, đó gọi là "function expression".

Khi một hàm được truyền vào bên trong hàm khác để gọi lại khi cần thiết, hàm đó được gọi là "hàm callback".

**Function declaration** được xử lý trước khi chương trình chạy đến đó. Function declaration có phạm vi trong block, nên bạn có thể gọi hàm ở bất kỳ đâu trong block.

**Function expression** được tạo ra tại thời điểm chương trình chạy đến vị trí khởi tạo hàm. Nên bạn chỉ gọi được hàm sau khi đã khởi tạo.
