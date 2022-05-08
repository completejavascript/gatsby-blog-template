---
date: "2021-12-17T06:45:00Z"
update: "2021-12-17T06:45:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-dom.png"
keywords: "gộp nhiều phần tử rồi cho kết quả vào một thẻ div"
description: "Sau đây là cách để gộp nhiều phần tử rồi cho kết quả vào một thẻ div trong JavaScript."
slug: gop-nhieu-phan-tu-cho-ket-qua-vao-div-trong-javascript
title: "Cách gộp nhiều phần tử rồi cho kết quả vào một thẻ div trong JavaScript?"
shortTitle: "Gộp nhiều phần tử cho vào một thẻ div?"
series: "JavaScript Question: DOM"
tags:
  - Câu hỏi JS DOM
---

Sau đây là cách để gộp nhiều phần tử rồi cho kết quả vào một thẻ div trong JavaScript.

Ví dụ DOM có cấu trúc như sau:

```html:title=index.html
<div id="container">
  <!-- thêm phần tử vào đây -->
</div>
```

Các bước để gộp nhiều phần tử rồi cho kết quả vào một thẻ div trong JavaScript là:

- Tạo một fragment ("document ảo") để chứa các phần tử DOM.
- Duyệt mảng dữ liệu đầu vào:
  - Sử dụng phương thức `createElement()` để tạo phần tử DOM với dữ liệu được gán thông qua `innerHTML`.
  - Dùng phương thức `appendChild()` để thêm phần tử DOM vào fragment.
- Sử dụng phương thức `appendChild()` để thêm fragment vào phần tử div.

```js:title=main.js
// dữ liệu để tạo phần tử DOM
let fruits = ["apple", "orange", "banana"];

// tạo fragment để chứa các phần tử
let fragment = document.createDocumentFragment();

// duyệt mảng fruits để tạo ra các phần tử và thêm vào fragment
for (let item of fruits) {
  // tạo phần tử DOM
  let elm = document.createElement("li");

  // gán nội dung cho phần tử DOM
  elm.innerHTML = item;

  // thêm phần tử DOM vào fragment
  fragment.appendChild(elm);
}

// query phần tử DIV là container
let container = document.querySelector("#container");

// append fragment vào container
container.appendChild(fragment);
```

Tham khảo:

- [DOM là gì?](/co-ban-ve-dom-javascript/)
- [How to Combine multiple elements and append the result into a div using JavaScript?](https://www.geeksforgeeks.org/how-to-combine-multiple-elements-and-append-the-result-into-a-div-using-javascript/)
