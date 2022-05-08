---
date: "2021-12-17T06:15:00Z"
update: "2021-12-17T06:15:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-dom.png"
keywords: "kiểm tra phần tử DOM chứa class"
description: "Đôi khi bạn cần kiểm tra phần tử DOM chứa class cho trước 'X' hay không. Để giải quyết vấn đề này, bạn có thể sử dụng phương thức `contains(class-name)` của thuộc tính 'classList' trong phần tử DOM."
slug: kiem-tra-phan-tu-dom-co-class-cho-truoc
title: "Cách kiểm tra phần tử DOM chứa class cho trước trong JavaScript?"
shortTitle: "Kiểm tra phần tử DOM chứa class 'X'?"
series: "JavaScript Question: DOM"
tags:
  - Câu hỏi JavaScript
---

Đôi khi bạn cần kiểm tra phần tử DOM chứa class cho trước "X" hay không.

Để giải quyết vấn đề này, bạn có thể sử dụng phương thức `contains(class-name)` của thuộc tính `classList` trong phần tử DOM.

## Cú pháp

Cú pháp kiểm tra:

```js
element.classList.contains("class-name");
```

Phương thức trên trả về `true` nếu phần tử chứa class `class-name`, ngược lại thì trả về `false`.

## Ví dụ

Phần tử DOM như sau:

```html:title=index.html
<h1 id="main" class="main">Welcome to JavaScript</h1>
```

Các bước kiểm tra phần tử DOM chứa class cho trước hay không như sau:

- Query để tìm phần tử DOM cần kiểm tra.
- Sử dụng phương thức `elem.classList.contains()` để kiểm tra với class cho trước.

```js:title=main.js
// query phần tử DOM cần kiểm tra
let elem = document.querySelector("#main");

// ví dụ kiểm tra class main
let hasClassMain = elem.classList.contains("main");

if (hasClassMain) {
  console.log("Found class: main"); // đoạn log này được ghi ra
} else {
  console.log("Not found class: main");
}

// ví dụ kiểm tra class other
let hasClassOther = elem.classList.contains("other");

if (hasClassOther) {
  console.log("Found class: other");
} else {
  console.log("Not found class: other"); // đoạn log này được ghi ra
}
```

Tham khảo:

- [DOM là gì?](/co-ban-ve-dom-javascript/)
- [How to check the given element has the specified class in JavaScript?](https://www.geeksforgeeks.org/how-to-check-the-given-element-has-the-specified-class-in-javascript/)
