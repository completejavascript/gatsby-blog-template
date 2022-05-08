---
date: "2021-12-30T21:00:00Z"
update: "2021-12-30T21:00:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-dom.png"
keywords: "kiểm tra javascript object là dom"
description: "DOM là thành phần cơ bản để biểu diễn cấu trúc dữ liệu của một trang web, bao gồm các tag, phần tử, thuộc tính, class,... Sau đây là cách để kiểm tra một JavaScript object là DOM object."
slug: kiem-tra-javascript-object-la-dom-object
title: "Cách kiểm tra JavaScript Object là DOM object?"
shortTitle: "Kiểm tra JavaScript Object là DOM?"
series: "JavaScript Question: DOM"
tags:
  - Câu hỏi JS DOM
---

DOM (Document Object Model): là thành phần biểu diễn cấu trúc dữ liệu của một trang web, bao gồm các tag, phần tử, thuộc tính, class,...

Trong HTML DOM, **Element** là một đối tượng tổng quát để biểu diễn một phần tử DOM bất kỳ.

Để **kiểm tra một JavaScript object là DOM object**, bạn có thể sử dụng toán tử `instanceof` với cú pháp:

```js
obj instanceof Element;
```

Nếu kết quả trả về là `true` thì nghĩa là đối tượng `obj` có kiểu `Element`. Nói cách khác, đối tượng `obj` chính là một DOM object.

Ví dụ cấu trúc DOM:

```html:title=index.html
<div id="div1"></div>
```

Code kiểm tra:

```js
// hàm kiểm tra một object là DOM object
function isDOM(Obj) {
  return Obj instanceof Element;
}

// DOM object
let div = document.getElementById("div1");

// object bình thường
let obj = { x: 1 };

console.log(isDOM(div)); // true
console.log(isDOM(obj)); // false
```

Tham khảo:

- [DOM là gì?](/co-ban-ve-dom-javascript/)
- [Object là gì? Object trong JavaScript](/object-la-gi-object-trong-javascript/)
- [How to check a JavaScript Object is a DOM Object?](https://www.geeksforgeeks.org/how-to-check-a-javascript-object-is-a-dom-object/)
