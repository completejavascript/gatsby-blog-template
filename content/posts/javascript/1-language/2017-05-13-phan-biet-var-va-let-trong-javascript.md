---
date: "2017-05-13T23:19:32Z"
update: "2021-11-21T18:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/phan-biet-var-va-let-trong-javascript-complete-javascript.png"
keywords: "phân biệt var và let"
description: "let giống và khác var như thế nào? Bài viết này sẽ giúp bạn phân biệt var và let trong JavaScript. Qua đó, bạn biết cách sử dụng var và let sao cho phù hợp nhất."
slug: phan-biet-var-va-let-trong-javascript
title: "Phân biệt var và let trong JavaScript"
series: "JavaScript: JavaScript cơ bản"
tags:
  - ES6
  - Biến
---

Trước đây, có thể nhiều bạn đã quen dùng `var` để khai báo [biến](/kieu-du-lieu-trong-javascript/) trong JavaScript. Tuy nhiên, từ phiên bản ES6, mình khuyên bạn **chỉ** nên dùng từ khóa `let`. Vậy `let` giống và khác `var` như thế nào? Bài viết này sẽ giúp bạn phân biệt `var` và `let` trong JavaScript.

Qua đó, bạn biết cách sử dụng `var` và `let` sao cho phù hợp nhất. Cũng như, bạn có thể chuyển đổi mã nguồn từ `var` sang `let` mà không làm ảnh hưởng tới logic của chương trình hiện tại (những chương trình có mã nguồn từ trước khi `let` xuất hiện).

## Giống nhau giữa `var` và `let`

Hai từ khóa `var` và `let` giống nhau là:

- Đều là từ khoá - keyword.
- Cùng được dùng để khai báo biến trong [JavaScript](/javascript/)

## Khác nhau giữa `var` và `let`

Hai từ khóa `var` và `let` khác nhau ở **phạm vi sử dụng của biến**:

- Phạm vi của biến sử dụng **var** là phạm vi hàm hoặc bên ngoài [hàm](/ham-la-gi-ham-trong-javascript/), toàn cục.
- Phạm vi của biến sử dụng **let** là phạm vi một khối (block), xác định bởi cặp `{}`.

**Ví dụ sử dụng `let`:**

```js
function useLet() {
  console.log(j); // ReferenceError: j is not defined

  for (let j = 0; j < 3; j++) {
    console.log("j inside ", j); // 0, 1, 2
  }

  console.log("j outside ", j); // ReferenceError: j is not defined
}

useLet();
```

Biến `j` ở trên được khai báo sử dụng từ khóa `let`. Nên biến `j` chỉ được phép sử dụng trong vòng lặp for.

Nếu bạn truy cập biến `j` ngoài vòng lặp for thì đều bị lỗi **ReferenceError: j is not defined**.

**Ví dụ sử dụng `var`:**

```js
function useVar() {
  console.log(i); // undefined

  for (var i = 0; i < 3; i++) {
    console.log("i inside ", i); // 0, 1, 2
  }

  console.log("i outside ", i); // 3
}

useVar();
```

Phạm vi của biến sử dụng `var` là phạm vi của hàm chứa phần khai báo biến.

Mặc dù biến `i` được khai báo trong vòng lặp for, nhưng bạn vẫn có thể truy cập biến `i` ở mọi vị trí trong hàm.

Lúc đầu, giá trị của biến `i` là `undefined`, nên khi gọi `console.log(i)` lần đầu tiên, giá trị in ra là `undefined` chứ không phải là lỗi **ReferenceError: i is not defined**.

Và sau vòng lặp for, giá trị của biến `i` vẫn giữ nguyên là `3` thay vì `undefined`.

> 📝 Vấn đề với `var` là: bạn khó kiểm soát giá trị của biến và dễ dàng bị xung đột nếu như khai báo tên biến giống nhau ở nhiều nơi.

## Nên sử dụng `var` hay `let`?

Như mình đã nói trong các bài viết trước, từ khóa `var` đã lỗi thời. Nên mình khuyên bạn chỉ nên sử dụng từ khóa `let` để khai báo biến.

> 💡 Một số bài viết trên trang **Complete JavaScript** vẫn đang sử dụng từ khóa `var`, vì mình đã viết chúng từ năm 2017.
>
> Mình đang cập nhật nội dung từ từ và sẽ dần thay thế từ khóa `var` bằng từ khóa `let`.

**Tham khảo:**

- [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)
