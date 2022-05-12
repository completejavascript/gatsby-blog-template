---
date: "2022-05-12T23:00:00Z"
update: "2022-05-12T23:00:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "phương thức mảng trong es6"
description: "Các phương thức mảng trong ES6 (JavaScript) rất hữu ích để làm việc với dữ liệu được lưu trữ dạng mảng. Sau đây là một số phương thức mảng hữu ích trong ES6."
slug: phuong-thuc-mang-es6-javascript
title: "Một số phương thức mảng hữu ích trong ES6 JavaScript"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Các phương thức mảng trong ES6 (JavaScript) rất hữu ích để làm việc với dữ liệu được lưu trữ dạng mảng.

Bởi vì khi lập trình JavaScript, bạn sẽ phải làm việc với dữ liệu mảng rất nhiều. Chúng có thể là mảng số đơn giản hoặc thậm chí là mảng các đối tượng phức tạp.

Sau đây là một số phương thức mảng hữu ích trong ES6.

## Phương thức "forEach"

Phương thức [`forEach()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) được sử dụng để lặp qua tất cả các phần tử của mảng.

Ví dụ, để tìm tổng của tất cả các số trong một mảng số.

```js
let sum = 0;
const numbers = [1, 2, 3, 4, 5];

numbers.forEach((num) => {
  sum = sum + num;
});

console.log(sum); // 15
```

## Phương thức "map"

Phương thức [`map()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map) được dùng để lặp qua tất cả các phần tử của mảng, sửa đổi chúng và trả về một mảng mới nhưng không làm thay đổi mảng cũ.

**Ví dụ 1:** nhân mỗi số của mảng với 2 và tạo ra mảng mới.

```js
const numbers = [1, 2, 3, 4, 5];

// nhân từng phần tử với 2
let double = numbers.map((num) => {
  return num * 2;
});

console.log(double); // [2, 4, 6, 8, 10]
```

**Ví dụ 2:** trích xuất các thuộc tính từ một mảng đối tượng và lưu trữ chúng trong một mảng khác.

```js
const objects = [
  { a: 1, b: 2 },
  { a: 3, b: 4 },
  { a: 5, b: 6 },
];

// dùng map để trích xuất thuộc tính b trong mỗi đối tượng
let onlybs = objects.map((object) => {
  return object.b;
});

console.log(onlybs); // [2, 4, 6]
```

## Phương thức filter"

Phương thức [`filter()`](https://developer.mozilla.org/en-US/docs/web/javascript/reference/global_objects/array/filter) được sử dụng để lặp qua tất cả các phần tử của mảng và lọc ra các phần tử thỏa mãn một điều kiện (cho trước) thành một mảng khác.

Ví dụ, để lọc tất cả các đối tượng có `flag` là `1`.

```js
let objects = [
  { flag: 1, a: 1 },
  { flag: 0, a: 2 },
  { flag: 1, a: 3 },
];

const newArray = objects.filter((object) => {
  return object.flag === 1;
});

newArray.forEach((item) => {
  console.log("flag:" + item.flag + ", a:" + item.a);
});
```

Kết quả:

```
flag:1, a:1
flag:1, a:3
```

## Phương thức "find"

Phương thức `find()` được dùng để tìm và trả về phần tử đầu tiên trong mảng thỏa mãn một điều kiện (cho trước).

Nếu không tìm thấy đối tượng nào thỏa mãn thì phương thức `find()` trả về `undefined`.

Ví dụ để tìm một đối tượng có `flag` là `0`.

```js
let objects = [
  { flag: 1, a: 1 },
  { flag: 0, a: 2 },
  { flag: 1, a: 3 },
  { flag: 0, a: 4 },
];

const item = objects.find((object) => {
  return object.flag === 0;
});

console.log(item);
// {flag: 0, a: 2}
```

**Chú ý:** Phương thức `filter`() trả về một mảng các phần tử, còn phương thức`find()` trả về một phần tử.

Tham khảo:

- [Array là gì? Array trong JavaScript](/array-la-gi-array-trong-javascript/)
- [Các phương thức của mảng trong JS](/phuong-thuc-cua-mang-trong-javascript/)
- [JavaScript forEach là cái quái gì?](/javascript-foreach-la-cai-quai-gi/)
- [Ứng dụng reduce trong mảng](/ung-dung-cua-reduce-javascript/)
- [Array Helper Methods in ES6](https://www.geeksforgeeks.org/array-helper-methods-in-es6/)
