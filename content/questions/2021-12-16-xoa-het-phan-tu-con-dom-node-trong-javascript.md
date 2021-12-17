---
date: "2021-12-16T06:00:00Z"
update: "2021-12-16T06:00:00Z"
template: "question"
directory: "Question"
cover: "../images/questions/javascript-question-dom.png"
keywords: "xóa hết các phần tử con của DOM node"
description: "Để xóa hết các phần tử con của DOM node trong JavaScript, bạn có thể sử dụng một trong những cách sau đây: vòng lặp với removeChild, innerHTML hoặc textContent."
slug: xoa-het-phan-tu-con-dom-node-trong-javascript
title: "Cách xóa hết các phần tử con của DOM node trong JavaScript?"
shortTitle: "Xóa hết các phần tử con của DOM node?"
series: "JavaScript Question: DOM"
tags:
  - Câu hỏi JavaScript
---

Để xóa hết các phần tử con của DOM node trong JavaScript, bạn có thể sử dụng vòng lặp kết hợp với phương thức `removeChild()`, `innerHTML` hoặc `textContent`.

Ví dụ các DOM node có cấu trúc như sau:

```html:title=index.html
<ul>
    <li>Apple</li>
    <li>Orange</li>
    <li>Banana</li>
    <li>Coconut</li>
    <li>Mango</li>
</ul>
```

## Sử dụng phương thức `removeChild()`

Các bước để xóa hết các phần tử con của DOM node trong JavaScript như sau:

- Query để tìm DOM node cần xóa các phần tử con `document.querySelector("ul")`.
- Dùng `e.lastElementChild` hoặc `e.firstElementChild` để lấy phần tử con cuối cùng hoặc đầu tiên.
- Sử dụng vòng lặp để duyệt hết tất cả các phần tử con của DOM node.
  - Nếu phần tử con `child` vẫn tồn tại thì dùng `e.removeChild(child)` để xóa `child`.
  - Cho đến khi không còn phần tử con `child` thì dừng lại.

```js:title=main.js
// query để tìm DOM node cần xóa các phần tử con
let e = document.querySelector("ul");

// có thể sử dụng e.firstElementChild
let child = e.lastElementChild;

// loop cho đến khi child không tồn tại thì dừng lại
while (child) {
    // xóa child
    e.removeChild(child);

    // gán child bằng phần tử con cuối cùng mới
    child = e.lastElementChild;
}
```

## Sử dụng `innerHTML`

Đây là cách đơn giản hơn để xóa hết các phần tử con của DOM node trong JavaScript:

```js:title=main.js
// query để tìm DOM node cần xóa các phần tử con
let e = document.querySelector("ul");

// gán innerHTML bằng empty string
e.innerHTML = "";
```

## Sử dụng `textContent`

Thay vì dùng `innerHTML`, bạn cũng có thể sử dụng `textContent` để xóa hết các phần tử con của DOM node trong JavaScript:

```js:title=main.js
// query để tìm DOM node cần xóa các phần tử con
let e = document.querySelector("ul");

// gán textContent bằng empty string
e.textContent = "";
```

Tham khảo:

- [DOM là gì?](/co-ban-ve-dom-javascript/)
- [Remove all the child elements of a DOM node in JavaScript](https://www.geeksforgeeks.org/remove-all-the-child-elements-of-a-dom-node-in-javascript/)
- [How to Remove All Child Elements of a DOM Node in JavaScript?](https://javascript.plainenglish.io/how-to-remove-all-child-elements-of-a-dom-node-in-javascript-2773cb6d2600)
