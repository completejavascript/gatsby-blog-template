---
date: "2022-05-09T21:00:00Z"
update: "2022-05-09T21:00:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "kiểm tra hai số, kiểm tra hai số gần bằng, hai số gần bằng nhau"
description: "Bài viết này giới thiệu với bạn cách để kiểm tra hai số gần bằng nhau trong JavaScript."
slug: kiem-tra-hai-so-gan-bang-nhau-trong-javascript
title: "Cách kiểm tra hai số gần bằng nhau trong JavaScript"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Cho hai số và nhiệm vụ là kiểm tra hai số đó có **xấp xỉ bằng nhau hay không**. Nếu hai số gần bằng nhau thì trả về `true`, ngược lại trả về `false`.

## Ví dụ kiểm tra hai số gần bằng nhau

**Đầu vào:**

```js
num1 = 10.3;
num2 = 10;
```

**Đầu ra:** `true`

## Hướng tiếp cận

Để kiểm tra các số có gần bằng nhau hay không, trước tiên, bạn phải quyết định giá trị `epsilon`.

**Epsilon** là hiệu số lớn nhất giữa hai số. Nếu hiệu của hai số **nhỏ hơn hoặc bằng epsilon** thì hai số đó xấp xỉ bằng nhau.

Vì vậy, đầu tiên bạn tạo hàm `checkApprox` có ba đối số là `num1`, `num2` và `epsilon`.

Bây giờ, hãy kiểm tra **giá trị tuyệt đối** của `num1` và `num2` có nhỏ hơn epsilon hay không.

```js
// giá trị epsilon là tùy bạn định nghĩa
const checkApprox = (num1, num2, epsilon = 0.004) => {
  return Math.abs(num1 - num2) < epsilon;
};
```

Các ví dụ:

```js
const checkApprox = (num1, num2, epsilon = 0.004) => {
  return Math.abs(num1 - num2) < epsilon;
};

console.log(checkApprox(10.003, 10.001, 0.005)); // true
console.log(checkApprox(Math.PI / 2.0, 1.5708, 0.004)); // true
console.log(checkApprox(0.003, 0.03, 0.004)); // false
```

Tham khảo:

- [Hàm là gì? Hàm trong JavaScript](/ham-la-gi-ham-trong-javascript/)
- [Đối tượng global trong JavaScript](/doi-tuong-global-trong-javascript/)
- [Difference between ES6 and TypeScript](https://www.geeksforgeeks.org/difference-between-es6-and-typescript/)
