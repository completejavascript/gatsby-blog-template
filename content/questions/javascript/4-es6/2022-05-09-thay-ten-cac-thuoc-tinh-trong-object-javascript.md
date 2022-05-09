---
date: "2022-05-09T21:41:00Z"
update: "2022-05-09T21:41:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "thay tên thuộc tính trong object"
description: "Bài viết sau giới thiệu một số cách để thay tên các thuộc tính trong object JavaScript với các giá trị cho trước."
slug: thay-ten-cac-thuoc-tinh-trong-object-javascript
title: "Thay tên các thuộc tính trong object JavaScript"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Bài viết sau giới thiệu một số cách để thay tên các thuộc tính trong object JavaScript với các giá trị cho trước.

## Bài toán

Cho trước một đối tượng chứa các cặp **key-value** khác nhau. Trong đó, `key` là thuộc tính và `value` là giá trị của thuộc tính.

Bạn cần thay đổi một hoặc nhiều tên ban đầu của **key** bằng tên mới.

Ví dụ, ban đầu đối tượng chứa các cặp **key-value** như `name: "Hello"`, v.v. Và mình cần thay đổi thuộc tính `name` thành `firstName`.

Trước khi đi vào các hướng giải quyết, mình hãy khai báo đối tượng sẽ sử dụng cho bài toán trên như sau:

```js
let object = {
  name: "Hello",
  age: 20,
  gender: "Male",
};

console.log(object);
// { name: 'Hello', age: 20, gender: 'Male' }
```

Sau đây, hãy xem các cách để giải quyết vấn đề đã nêu trên.

## Cách 1

Đây là cách tiếp cận khá đơn giản.

Trong cách này, mình sẽ trực tiếp lấy giá trị của `name` rồi thay đổi tên của thuộc tính đó bằng tên mới. Sau đó, mình xóa tên đã khai báo trước đó và thay thế bằng tên mới.

```js
let object = {
  name: "Hello",
  age: 20,
  gender: "Male",
};

let renameObjectKey = (object) => {
  // gán giá trị của name vào thuộc tính `firstName`
  object.firstName = object.name;

  // xóa thuộc tính `name`
  delete object.name;
};

renameObjectKey(object);

console.log(object);
// {age: 20, gender: 'Male', firstName: 'Hello'}
```

Giả sử, bạn cần thay đổi thuộc tính `age` thành `currentAge` thì cách làm như sau:

```js
let object = {
  name: "Hello",
  age: 20,
  gender: "Male",
};

let renameObjectKey = (object) => {
  // gán giá trị cũ vào thuộc tính mới
  object.firstName = object.name;
  object.currentAge = object.age;

  // xóa thuộc tính mới
  delete object.name;
  delete object.age;
};

renameObjectKey(object);

console.log(object);
// {gender: 'Male', firstName: 'Hello', currentAge: 20}
```

Tóm lại, với cách 1 thì kết quả thu được đã như mong muốn. Tuy nhiên có hai vấn đề là:

- Vị trí các thuộc tính trong đối tượng đã bị thay đổi.
- Khó mở rộng khi bạn cần thay đổi tên nhiều thuộc tính.

## Cách 2

Trong cách 2, mình sẽ khai báo một hàm với đầy đủ tham số để giải quyết bài toán. Hàm này nhận vào hai tham số là:

- `keysMap` là đối tượng với các cặp **key - value** tương ứng với **tên cũ - tên mới**.
- `object` là đối tượng cần thay đổi key.

Bên trong hàm, mình sử dụng [`Object.keys()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys) để trả về một mảng các key trong `object`.

Sau đó, mình dùng phương thức [`reduce`](/ung-dung-cua-reduce-javascript/) kết hợp với [toán tử spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) để biến đổi `object` cũ thành đối tượng mới.

```js
let object = {
  name: "Hello",
  age: 20,
  gender: "Male",
};

let renameKeys = (keysMap, object) =>
  Object.keys(object).reduce(
    (acc, key) => ({
      ...acc,
      ...{ [keysMap[key] || key]: object[key] },
    }),
    {}
  );

let result = renameKeys(
  {
    name: "firstName",
    age: "currentAge",
  },
  object
);

console.log(result);
// {firstName: 'Hello', currentAge: 20, gender: 'Male'}
```

Như bạn thấy, cách làm này đã giải quyết được hai vấn đề của cách 1 là:

- Giữ được vị trí của các thuộc tính và cả giá trị tương ứng.
- Dễ dàng thêm các thuộc tính (cần đổi tên).

Tham khảo:

- [Object là gì? Object trong JavaScript](/object-la-gi-object-trong-javascript/)
- [Hàm là gì? Hàm trong JavaScript](/ham-la-gi-ham-trong-javascript/)
- [Arrow function là gì? Arrow function trong JS](/arrow-function-la-gi-arrow-function-trong-js/)
- [How to replace the names of multiple object keys with the values provided using JavaScript?](https://www.geeksforgeeks.org/how-to-replace-the-names-of-multiple-object-keys-with-the-values-provided-using-javascript/)
