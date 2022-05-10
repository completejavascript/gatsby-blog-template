---
date: "2022-05-10T20:30:00Z"
update: "2022-05-10T20:30:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "viết tắt giá trị thuộc tính"
description: "Object trong JavaScript có một cách đặc biệt để viết tắt giá trị thuộc tính. Bài viết này giới thiệu với bạn cách để viết tắt giá trị thuộc tính."
slug: viet-tat-gia-tri-thuoc-tinh-doi-tuong-javascript
title: "Viết tắt giá trị thuộc tính đối tượng trong JavaScript"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Đối tượng trong JavaScript là kiểu dữ liệu quan trọng nhất xây dựng lên JavaScript hiện đại.

Đối tượng hoàn toàn khác với các kiểu dữ liệu nguyên thủy (số, chuỗi, boolean, `null`, `undefined` và symbol) vì các kiểu dữ liệu nguyên thủy đều lưu trữ một giá trị duy nhất mỗi loại. Còn object là kiểu dữ liệu tham chiếu - với giá trị là các cặp **key-value**.

Cú pháp viết tắt cho giá trị thuộc tính đối tượng rất phổ biến và được sử dụng rộng rãi hiện nay. Với cách viết này, mã nguồn trông sẽ **gọn gàng và dễ đọc hơn**.

Ví dụ sau hiển thị chi tiết của đối tượng bằng cách **sử dụng cú pháp viết tắt** cho giá trị thuộc tính đối tượng trong ES6:

```js{6,7}
const name = "Alex";
const age = 29;

// Có sử dụng cú pháp rút gọn trong ES6
const user = {
  name,
  age,
};

console.log(user);
// {name: 'Alex', age: 29}
```

Ví dụ sau hiển thị chi tiết của đối tượng mà **không sử dụng cú pháp viết tắt** cho giá trị thuộc tính đối tượng.

```js{6,7}
const name = "Alex";
const age = 29;

// Không sử dụng cú pháp rút gọn
const user = {
  name: name,
  age: age,
};

console.log(user);
// {name: 'Alex', age: 29}
```

Như bạn thấy rằng, khi sử dụng cú pháp rút gọn, mã nguồn của bạn đã tránh việc bị lặp lại:

```js
name: name,
age: age,
```

Tham khảo:

- [Object là gì? Object trong JavaScript](/object-la-gi-object-trong-javascript/)
- [Shorthand Syntax for Object Property Value in ES6](https://www.geeksforgeeks.org/shorthand-syntax-for-object-property-value-in-es6/)
