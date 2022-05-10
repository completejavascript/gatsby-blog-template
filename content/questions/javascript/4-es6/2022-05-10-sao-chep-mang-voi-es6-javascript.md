---
date: "2022-05-10T21:46:00Z"
update: "2022-05-10T21:46:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "sao chép mảng với es6, sao chép mảng, clone array, sao chép array"
description: "Sao chép mảng là bài toán thường gặp khi lập trình JavaScript. Vậy bạn đã biết cách sao chép mảng với ES6 trong JavaScript hay chưa?"
slug: sao-chep-mang-voi-es6-javascript
title: "Sao chép mảng với ES6 trong JavaScript"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Toán tử [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) trong ES6 thường được sử dụng để **sao chép một mảng**. Trong khi, phương thức [`slice()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) trong JavaScript là một cách cũ hơn với đối số đầu tiên là `0`.

Hai phương thức này đều tạo một mảng mới, độc lập và sao chép tất cả các phần tử của mảng cũ sang mảng mới. Nói cách khác, cả hai phương thức này đều thực hiện **sao chép nông** của mảng ban đầu.

## Cú pháp

Cú pháp phương thức `slice()`:

```js
let clonedArray = oldArray.slice(0);
```

Cách sử dụng toán tử spread để sao chép mảng trong ES6:

```js
let clonedArrayES6 = [...oldArray];
```

Ví dụ về clone mảng trong ES6:

```js
const oldArray = ["dog1", "dog2", "dog3"];
const clonedArrayES6 = [...oldArray];
console.log(clonedArrayES6); // ["dog1", "dog2", "dog3"]
```

# Chú ý

- Toán tử gán `=` - tạo ra biến mới chỉ trỏ đến mảng ban đầu thay vì sao chép các phần tử của mảng.
- Toán tử spread `...` - tạo ra một mảng mới, các phần tử mảng được sao chép, với các tham chiếu khác nhau nhưng có cùng giá trị.

Tham khảo:

- [Array là gì? Array trong JavaScript](/array-la-gi-array-trong-javascript/)
- [Các phương thức của mảng trong JS](/phuong-thuc-cua-mang-trong-javascript/)
- [How to clone array in ES6?](https://www.geeksforgeeks.org/how-to-clone-array-in-es6/)
