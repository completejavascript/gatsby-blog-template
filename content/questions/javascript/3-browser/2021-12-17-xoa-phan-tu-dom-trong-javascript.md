---
date: "2021-12-17T06:00:00Z"
update: "2021-12-17T06:00:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-dom.png"
keywords: "xóa phần tử dom"
description: "Để xóa phần tử DOM trong JavaScript, bạn có thể sử dụng phương thức `remove()` hoặc `removeChild()`."
slug: xoa-phan-tu-dom-node-trong-javascript
title: "Cách xóa phần tử DOM trong JavaScript?"
series: "JavaScript Question: DOM"
tags:
  - Câu hỏi JS DOM
---

Để xóa phần tử DOM trong JavaScript, bạn có thể sử dụng phương thức `remove()` hoặc `removeChild()`.

Ví dụ DOM như sau:

```html:title=index.html
<div id="toRemove">
  Thẻ div này cần được xóa
</div>
```

## Sử dụng phương thức `remove()`

Các bước để xóa phần tử DOM với phương thức `remove()` như sau:

- Dùng `document.querySelector("#toRemove")` để tìm phần tử cần xóa.
- Sử dụng `toRemove.remove()` để xóa phần tử `toRemove`.

```js:title=main.js
// query để tìm DOM cần xóa
let toRemove = document.querySelector("#toRemove");

// gọi remove để xóa phần tử DOM
toRemove.remove();
```

## Sử dụng phương thức `removeChild()`

Các bước để xóa phần tử DOM với phương thức `removeChild()` như sau:

- Dùng `document.querySelector("#toRemove")` để tìm phần tử cần xóa.
- Sử dụng `toRemove.parentNode.removeChild(toRemove)` để xóa phần tử `toRemove`.

```js:title=main.js
// query để tìm DOM cần xóa
let toRemove = document.querySelector("#toRemove");

// gọi parentNode.removeChild để xóa phần tử DOM
toRemove.parentNode.removeChild(toRemove);
```

Tham khảo:

- [DOM là gì?](/co-ban-ve-dom-javascript/)
- [How to remove an HTML element using JavaScript?](https://www.geeksforgeeks.org/how-to-remove-an-html-element-using-javascript/)
