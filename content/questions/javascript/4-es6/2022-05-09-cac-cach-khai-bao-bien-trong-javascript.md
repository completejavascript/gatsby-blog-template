---
date: "2022-05-09T21:15:00Z"
update: "2022-05-09T21:15:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "khai báo biến"
description: "Bạn đã biết các cách khác nhau để khai báo biến trong JavaScript. Sau đây là tổng hợp cách cách giúp bạn khai báo biến trong JavaScript."
slug: cac-cach-khai-bao-bien-trong-javascript
title: "Các cách khai báo biến trong JavaScript"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Trong JavaScript, bạn có thể khai báo biến theo nhiều cách khác nhau bằng cách **sử dụng các từ khóa khác nhau**. Mỗi từ khóa có một số lý do hoặc tính năng cụ thể.

Về cơ bản, bạn có thể khai báo biến theo **ba cách khác nhau** với các từ khóa là:

- Từ khóa `var`.
- Từ khóa `let`.
- Từ khóa `const`.

Mỗi từ khóa được sử dụng trong một số điều kiện cụ thể.

## Khai báo biến với "var"

Từ khóa `var` dùng để khai báo biến trên toàn cục.

Nếu bạn sử dụng từ khóa này để khai báo biến thì biến đó có thể truy cập toàn cục và cũng thay đổi được.

Cách này tuy đã lỗi thời nhưng vẫn có thể dùng tốt nếu số lượng dòng code ngắn. Ngược lại, bạn sẽ rất dễ bị nhầm lẫn.

**Cú pháp:**

```js
var variableName = "giá trị của biến";
```

**Ví dụ:**

```js
var x = "Complete JavaScript";
console.log(x); // Complete JavaScript
```

## Khai báo biến với "let"

Từ khóa `let` dùng để khai báo biến cục bộ.

Nếu bạn sử dụng từ khóa này để khai báo biến thì biến đó có thể truy cập trong phạm vi cục bộ và cũng thay đổi được.

Cách khai báo biến này tốt kể cả khi số lượng dòng code trở nên nhiều hơn.

**Cú pháp:**

```js
let variableName = "giá trị của biến";
```

**Ví dụ:**

```js
if (true) {
  let x = "Complete JavaScript";
  console.log(x); // Complete JavaScript
}

console.log(x);
// Lỗi: Uncaught ReferenceError: x is not defined
// Lỗi vì x chưa được định nghĩa.
```

## Khai báo biến với "const"

Từ khóa `const` được sử dụng để khai báo biến cục bộ.

Nếu bạn dùng từ khóa này để khai báo biến thì biến chỉ có thể truy cập được trong khối đó, tương tự như biến được định nghĩa với `let`.

Và sự khác biệt giữa `let` và `const` là: bạn không thể gán lại giá trị cho các biến được khai báo với từ khóa `const`.

Vì vậy, bạn nên gán giá trị trong khi khai báo biến với `const`.

**Cú pháp:**

```js
const variableName = "giá trị của biến";
```

**Ví dụ:**

```js
const x = "Complete JavaScript";
console.log(x); // Complete JavaScript

x = "other";
// Lỗi: Uncaught TypeError: Assignment to constant variable.
// Lỗi khi gán lại giá trị cho hằng số.
```

Tham khảo:

- [Biến là gì? Biến trong JS](/bien-la-gi-bien-trong-javascript/)
- [Hằng là gì? Hằng trong JS](/hang-la-gi-hang-trong-javascript/)
- [Phân biệt var và let trong JavaScript](/phan-biet-var-va-let-trong-javascript/)
- [How to declare variables in different ways in JavaScript?](https://www.geeksforgeeks.org/how-to-declare-variables-in-different-ways-in-javascript/)
