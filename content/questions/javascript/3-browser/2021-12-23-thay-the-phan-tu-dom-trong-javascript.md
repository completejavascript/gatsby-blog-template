---
date: "2021-12-23T21:30:00Z"
update: "2021-12-23T21:30:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-dom.png"
keywords: "thay thế phần tử DOM"
description: "Để thay thế phần tử DOM trong JavaScript bằng một phần tử khác, bạn cần dùng thuộc tính parentNode và phương thức replaceChild(newNode, oldNode)."
slug: thay-the-phan-tu-dom-trong-javascript
title: "Cách thay thế phần tử DOM trong JavaScript?"
shortTitle: "Thay thế phần tử DOM trong JavaScript?"
series: "JavaScript Question: DOM"
tags:
  - Câu hỏi JS DOM
---

Làm sao để thay thế phần tử DOM trong JavaScript bằng một phần tử khác?

Sau đây là thuộc tính và phương thức cần thiết:

- Thuộc tính `parentNode`: trả về phần tử cha của một phần tử DOM `node.parentNode`.
- Phương thức `replaceChild(newNode, oldNode)`: thay thế phần tử DOM cũ `oldNode` bằng phần tử DOM mới `newNode`. Trong đó, `newNode` có thể là phần tử DOM đang tồn tại trên `document` hoặc phần tử được tạo mới.

## Ví dụ 1

Ví dụ sau thay thế phần tử DOM `<a>` bằng phần tử DOM mới `<span>` sử dụng thuộc tính `parentNode` và phương thức `replaceChild()`.

Cấu trúc DOM:

```html:title=index.html
<div>
  <a id="ida" href="#">Complete JavaScript</a>
</div>
```

Code thay thế phần tử DOM:

```js:title=main.js
// query phần tử cần thay thế
let aElement = document.querySelector("#ida");

// tạo phần tử mới để thay thế
let spanElement = document.createElement("span");

// cập nhật nội dung cho phần tử mới
spanElement.innerHTML = "Replaced Text!";

// thay thế phần tử DOM cũ bằng phần tử DOM mới
aElement.parentNode.replaceChild(spanElement, aElement);
```

## Ví dụ 2

Ví dụ này thay thế phần tử DOM `<a>` bằng phần tử DOM mới `<a>` và giữ nguyên giá trị của thuộc tính `href`.

Cấu trúc DOM:

```html:title=index.html
<div>
  <a id="ida" href="https://completejavascript.com/">Complete JavaScript</a>
</div>
```

Code thay thế phần tử DOM:

```js:title=main.js
// query phần tử cần thay thế
let currentA = document.querySelector("#ida");

// tạo phần tử mới để thay thế
let newA = document.createElement("a");

// cập nhật nội dung cho phần tử mới
newA.innerHTML = "Replaced Text!";
newA.href = currentA.href;

// thay thế phần tử DOM cũ bằng phần tử DOM mới
currentA.parentNode.replaceChild(newA, currentA);
```

Tham khảo:

- [DOM là gì?](/co-ban-ve-dom-javascript/)
- [Replace a DOM element with another DOM element in place?](https://www.geeksforgeeks.org/replace-a-dom-element-with-another-dom-element-in-place/)
