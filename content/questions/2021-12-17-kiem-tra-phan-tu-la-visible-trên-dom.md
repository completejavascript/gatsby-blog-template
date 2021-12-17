---
date: "2021-12-17T19:45:00Z"
update: "2021-12-17T19:45:00Z"
template: "question"
directory: "Question"
cover: "../images/questions/javascript-question-dom.png"
keywords: "kiểm tra phần tử là visible"
description: "Hai cách để kiểm tra phần tử là visible trên DOM gồm: kiểm tra width, height, bounding rectangle và dùng phương thức getComputedStyle() kiểm tra thuộc tính display."
slug: kiem-tra-phan-tu-la-visible-trên-dom
title: "Cách kiểm tra phần tử là visible trên DOM?"
shortTitle: "Kiểm tra phần tử là visible trên DOM?"
series: "JavaScript Question: DOM"
tags:
  - Câu hỏi JavaScript
---

Có hai cách để **kiểm tra phần tử là visible** trên DOM.

- Kiểm tra **width, height và bounding rectangle** của phần tử.
- Sử dụng phương thức `getComputedStyle()` để kiểm tra thuộc tính `display`.

## Kiểm tra width, height và bounding rectangle

Bạn có thể kiểm tra phần tử là visible trên DOM bằng cách kiểm tra **width, height và bounding rectangle**.

- Thuộc tính `offsetHeight` dùng để lấy `height` của phần tử bao gồm **padding** và **border** theo chiều dọc (nếu có). Kết quả trả về là **số nguyên** xác định `height`.
- Thuộc tính `offsetWidth` dùng để lấy `width` của phần tử bao gồm **padding** và **border** theo chiều ngang (nếu có). Kết quả trả về là **số nguyên** xác định `width`.
- Phương thức `getClientRects()` trả về tập hợp các hình chữ nhật bao quanh phần tử. Kết quả trả về là các đối tượng `DOMRect`. Bạn có thể sử dụng thuộc tính `length` để xác định có tồn tại hình chữ nhật bao quanh phần tử hay không.

Kết hợp ba thành phần trên giúp bạn kiểm tra phần tử là visible trên DOM hay không.

Ví dụ cấu trúc DOM:

```html:title=index.html
<html>
  <head>
    <style>
      .visible {
        height: 100px;
        width: 100px;
        background-color: green;
      }
      .invisible {
        height: 100px;
        width: 100px;
        background-color: green;
        display: none;
      }
    </style>
  </head>
  <body>
    <div class="visible"></div>
    <div class="invisible"></div>
  </body>
</html>
```

Code kiểm tra:

```js:title=main.js
function isElementVisible(element) {
  return Boolean(
    element.offsetWidth ||
      element.offsetHeight ||
      element.getClientRects().length
  );
}

let visibleObj = document.querySelector(".visible");
console.log(isElementVisible(visibleObj)); // true

let invisibleObj = document.querySelector(".invisible");
console.log(isElementVisible(invisibleObj)); // false
```

## Sử dụng phương thức `getComputedStyle()`

Phương thức `getComputedStyle()` trả về một đối tượng bao gồm các thuộc tính CSS của phần tử.

Bạn chỉ cần kiểm tra giá trị của thuộc tính `display` là biết phần tử visible trên DOM hay không.

- Nếu giá trị bằng `none` thì phần tử là **invisible**.
- Nếu giá trị khác `none` thì phần tử là **visible**.

Ví dụ tương tự với cấu trúc DOM trên:

```js
function isElementVisible(element) {
  let style = window.getComputedStyle(element);
  return style.display !== "none";
}

let visibleObj = document.querySelector(".visible");
console.log(isElementVisible(visibleObj)); // true

let invisibleObj = document.querySelector(".invisible");
console.log(isElementVisible(invisibleObj)); // false
```

Tham khảo:

- [DOM là gì?](/co-ban-ve-dom-javascript/)
- [How to check if an element is visible in DOM?](https://www.geeksforgeeks.org/how-to-check-if-an-element-is-visible-in-dom/)
