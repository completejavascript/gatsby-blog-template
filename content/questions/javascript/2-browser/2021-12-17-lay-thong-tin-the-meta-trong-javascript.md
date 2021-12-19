---
date: "2021-12-17T07:00:00Z"
update: "2021-12-17T07:00:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-dom.png"
keywords: "lấy thông tin thẻ meta"
description: "Để lấy thông tin của thẻ meta trong JavaScript, bạn có thể sử dụng một trong hai phương thức sau để tìm thẻ meta: querySelectorAll('meta') hoặc querySelector('meta')."
slug: lay-thong-tin-the-meta-trong-javascript
title: "Lấy thông tin thẻ meta trong JavaScript?"
series: "JavaScript Question: DOM"
tags:
  - Câu hỏi JavaScript
---

Để lấy thông tin của thẻ meta trong JavaScript, bạn có thể sử dụng một trong hai phương thức sau để tìm thẻ meta:

- Phương thức `document.querySelectorAll("meta")`: tìm ra tất cả các thẻ meta.
- Phương thức `document.querySelector("meta")`: trả về thẻ meta đầu tiên thỏa mãn.

> Mỗi thẻ meta thường có thông tin `name` và `content`,...

## Sử dụng phương thức `querySelectorAll()`

Phương thức `querySelectorAll()` để tìm tất cả thẻ meta với cú pháp:

```js
let metaList = document.querySelectorAll("meta");
```

Câu lệnh trên trả về một mảng ("array-like") các phần tử meta có trong trang web, nếu không có thì trả về mảng rỗng.

```js
let metaList = document.querySelectorAll("meta");
for (let meta of metaList) {
  console.log("name:", meta.name);
  console.log("content:", meta.content);
}
```

## Sử dụng phương thức `querySelector()`

Phương thức `querySelector()` trả về một thẻ meta đầu tiên tìm thấy trên trang web với cú pháp:

```js
let meta = document.querySelector("meta");
```

Nếu trang web không có thẻ meta thì câu lệnh trên trả về `undefined`.

Để tìm thẻ meta với điều kiện `name` bằng một giá trị cho trước, bạn có thể sử dụng như sau:

```js
let meta = document.querySelector("meta[name='viewport']");

/*
<meta 
  name="viewport" 
  content="width=device-width,initial-scale=1,maximum-scale=1">
*/
```

Tương tự, bạn có thể sử dụng các thuộc tính khác - không chỉ là `name`, ví dụ `charset`:

```js
let meta = document.querySelector("meta[charset='utf-8']");

// <meta charset="utf-8">
```

Tham khảo:

- [DOM là gì?](/co-ban-ve-dom-javascript/)
- [How to get the information from a meta tag using JavaScript?](https://www.geeksforgeeks.org/how-to-get-the-information-from-a-meta-tag-using-javascript/)
