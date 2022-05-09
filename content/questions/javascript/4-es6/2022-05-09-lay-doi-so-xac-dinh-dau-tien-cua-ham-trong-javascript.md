---
date: "2022-05-09T22:21:00Z"
update: "2022-05-09T22:21:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "lấy đối số xác định đầu tiên, đối số không null, đối số không undefined"
description: "Bài viết sau đây sẽ giúp bạn lấy đối số đầu tiên xác định, hay đối số đầu tiên không null, không undefined của hàm trong JavaScript."
slug: lay-doi-so-xac-dinh-dau-tien-cua-ham-trong-javascript
title: "Lấy đối số xác định đầu tiên của hàm trong JavaScript"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Có nhiều trường hợp bạn cần tìm ra **đối số không null** hoặc **không `undefined` đầu tiên** được truyền vào một hàm. Điều này được gọi là **coalescing**.

## Cách 1: trước khi có ES6

Bạn có thể triển khai **coalescing** trong JavaScript trước khi có ES6 bằng cách lặp qua các đối số từ đối tượng [`arguments`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments) và kiểm tra đối số nào khác `null` thì trả về ngay lập tức và thoát khỏi hàm.

Ví dụ:

```js
function coalesce() {
  for (let i = 0; i < arguments.length; i++) {
    if (arguments[i] != null) {
      return arguments[i];
    }
  }
}

console.log(coalesce(null, undefined, "First", 1, 2, 3, null));
// "First"
```

## Cách 2: sử dụng ES6

Bạn có thể sử dụng ES6 thay cho cách làm trên để đạt được hiệu quả tương tự. Đó là sử dụng [Rest Parameters](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters) trong ES6.

Cụ thể, bạn thu thập tất cả các đối số trong đối tượng `args` - [iterable object](/iterable-la-gi-iterable-trong-javascript/).

Sau đó, bạn sử dụng phương thức [`array.find`](/phuong-thuc-cua-mang-trong-javascript/) để tìm phần tử đầu tiên thỏa mãn điều kiện.

```js
const coalesceES6 = (...args) => {
  // Tìm phần tử đầu tiên không thuộc mảng [null, undefined]
  return args.find((value) => ![null, undefined].includes(value));
};

console.log(coalesceES6(null, undefined, "First", 1, 2, 3, null));
// First
```

## Các trường hợp sử dụng của Coalescing

Bây giờ, bạn đã biết cách triển khai **Coalesce**. Sau đây là một số trường hợp sử dụng trong thực tế.

### Trường hợp 1

Thay thế giá trị cho `null` hoặc `undefined` trong một mảng đối tượng.

**Ví dụ:** bạn có danh mục sản phẩm với một danh sách. Mỗi sản phẩm có **mô tả** và **tóm tắt**.

Bạn muốn hiển thị các mô tả và tóm tắt bằng cách lấy dữ liệu ra từ cơ sở dữ liệu này. Trong trường hợp như vậy, bạn có thể sử dụng **Coalescing** với hai đối số là: **giá trị tóm tắt** và **giá trị mô tả bị cắt bớt** để thay thế khi **phần tóm tắt** không có.

```js
let products = [
  {
    id: 1,
    desc: `The best in class toaster that has 140
    watt power consumption with nice features that
    roast your bread just fine. Also comes bundled 
    in a nice cute case.`,
    summ: `Get world class breakfasts`,
  },
  {
    id: 2,
    desc: `A massager that relieves all your pains 
    without the hassles of charging it daily 
    or even hourly as it comes packed with Li-Ion
    batteries that last upto 8 hrs.`,
    summ: "Warm comfort for your back",
  },
  {
    id: 3,
    desc: `An air conditioner with a difference that
    not only cools your room to the best temperatures 
    but also provides cleanliness and disinfection at
    best in class standards`,
    summ: null,
  },
];

const coalesceES6 = (...args) => {
  return args.find((value) => ![null, undefined].includes(value));
};

function displayProdCat(products) {
  for (let product of products) {
    console.log(`ID = ${product.id}`);
    console.log(`Description = ${product.desc}`);
    let summProd = coalesceES6(product.summ, product.desc.slice(0, 50) + "...");
    console.log(`Summary = ${summProd}`);
  }
}

displayProdCat(products);
```

**Kết quả:** với **Coalescing**, nếu giá trị của phần tóm tắt `summ` tồn tại thì nó sẽ được hiển thị.

Trong trường hợp phần tóm tắt bị thiếu (`null` hoặc `undefined`), hàm `coalesceES6` sẽ chọn đối số thứ hai và hiển thị mô tả `desc` bị cắt ngắn.

```
ID = 1
Description = The best in class toaster that has 140
    watt power consumption with nice features that
    roast your bread just fine. Also comes bundled
    in a nice cute case.
Summary = Get world class breakfasts
ID = 2
Description = A massager that relieves all your pains
    without the hassles of charging it daily
    or even hourly as it comes packed with Li-Ion
    batteries that last upto 8 hrs.
Summary = Warm comfort for your back
ID = 3
Description = An air conditioner with a difference that
    not only cools your room to the best temperatures
    but also provides cleanliness and disinfection at
    best in class standards
Summary = An air conditioner with a difference that
    not ...
```

### Trường hợp sử dụng 2

Thay giá trị trong trường hợp thiếu giá trị số trong biểu thức để thực hiện tính toán.

**Ví dụ:** bạn có một mảng thu nhập hàng tháng trong một năm với một vài giá trị bị thiếu. Bây giờ, bạn muốn tìm tổng thu nhập hàng năm. Bạn quyết định thay thế giá trị mặc định là `1000` cho những tháng thiếu dữ liệu.

Bạn áp dụng phương thức `reduce` trên mảng dữ liệu hàng tháng. Bạn lưu trữ tổng của mỗi lần lặp lại trong bộ tích lũy với sự thay đổi.

Bạn cũng áp dụng **coalescing** với thu nhập hàng tháng và giá trị mặc định (nếu thu nhập hàng tháng là rỗng hoặc không xác định) để đưa kết quả vào bộ tích lũy.

```js
const incomeFigures = {
  default: 1000,
  monthWise: [1200, , 600, 2100, , 329, 1490, , 780, 980, , 1210],
};

const coalesceES6 = (...args) => {
  return args.find((value) => ![null, undefined].includes(value));
};

function yearlyIncome(incomeFig) {
  return incomeFig.monthWise.reduce(
    (total, inc) => total + coalesceES6(inc, incomeFig.default)
  );
}

console.log(
  `Yearly income equals 
  ${yearlyIncome(incomeFigures)}`
);

// Yearly income equals 8689
```

Tham khảo:

- [Hàm là gì? Hàm trong JavaScript](/ham-la-gi-ham-trong-javascript/)
- [Arrow function là gì? Arrow function trong JS](/arrow-function-la-gi-arrow-function-trong-js/)
- [Toán tử Nullish Coalescing (??) trong JS](/toan-tu-nullish-coalescing-trong-javascript/)
- [How to get the first non-null/undefined argument in JavaScript?](https://www.geeksforgeeks.org/how-to-get-the-first-non-null-undefined-argument-in-javascript/)
