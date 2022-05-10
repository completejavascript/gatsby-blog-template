---
date: "2022-05-10T20:47:00Z"
update: "2022-05-10T20:47:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "tại sao có symbol, symbol trong es6"
description: "Symbol là một kiểu dữ liệu quan trọng mới có trong ES6. Vậy tại sao có symbol và symbol trong ES6 có đặc điểm gì nổi bật. Bài viết này sẽ giúp bạn hiểu thêm về ES6."
slug: tai-sao-co-symbol-trong-es6
title: "Tại sao có kiểu dữ liệu Symbol trong ES6 JavaScript"
shortTitle: "Tại sao có kiểu dữ liệu Symbol trong ES6"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Trước khi có ES6, Javascript bao gồm 6 kiểu dữ liệu là `undefined`, `null`, boolean, string, number và object. **Symbol** là kiểu dữ liệu mới được giới thiệu trong ES6, làm cho tổng số kiểu dữ liệu trong JavaScript là 7.

**Symbol** là một kiểu dữ liệu nguyên thủy chứ không phải kiểu dữ liệu tham chiếu như object. Nói cách khác, **symbol** là kiểu dữ liệu bất biến (immutable) và thường dùng làm mã định danh duy nhất cho các **key** trong đối tượng. Trước khi symbol ra đời, rất khó tạo ra các **key duy nhất**.

Điều quan trọng là phải duy trì các key duy nhất để **ngăn việc ghi đè** các giá trị có key tương tự, vì điều này sẽ dẫn đến mất dữ liệu.

Sự ra đời của Symbol đã giúp khắc phục vấn đề trên vì các khóa duy nhất được tạo ra mà không cần viết một đoạn mã phức tạp.

Các **key duy nhất** có thể được tạo bằng cách dùng hàm `Symbol()`. Hàm **Symbol()** trả về một giá trị kiểu **Symbol**.

## Cú pháp khởi tạo Symbol

```js
let Symbol = Symbol();
```

Dưới đây là các ví dụ chứng minh vai trò quan trọng của Symbol.

### Ví dụ 1

Trong ví dụ này, mình sẽ tạo ra các symbol.

```js
let sym1 = Symbol();
let sym2 = Symbol("mysymbol");

console.log("Type of sym1: ", typeof sym1);
console.log("Type of sym2: ", typeof sym2);
```

**Kết quả:**

```
Type of sym1:  symbol
Type of sym2:  symbol
```

### Ví dụ 2

Trong ví dụ này, bạn sẽ thấy hàm `Symbol()` tạo ra các **key duy nhất**.

```js
let sym1 = Symbol("mysymbol");
let sym2 = Symbol("mysymbol");
console.log("sym1===sym2: ", sym1 === sym2);
```

**Kết quả:**

```
sym1===sym2: false
```

**Chú ý:** Kiểu dữ liệu Symbol là kiểu dữ liệu nguyên thủy và không thể thay đổi.

## So sánh Symbol và kiểu dữ liệu khác

Để thấy rõ sự khác nhau của Symbol với kiểu dữ liệu khác, cũng như ứng dụng của Symbol, sau đây là một ví dụ.

Giả sử, mình có một danh sách điểm các học sinh với:

- **key**: tên học sinh.
- **value**: điểm tương ứng của học sinh.

### Khi không sử dụng symbol

```js
var marks = {};
marks["Joe"] = 100;
marks["Ana"] = 90;
marks["Chloe"] = 95;
marks["Marie"] = 75;

console.log(marks);
// {Joe: 100, Ana: 90, Chloe: 95, Marie: 75}

console.log("Another student with name Chloe appears");
// Another student with name Chloe appears

marks["Chloe"] = 60;

console.log("After the marks of the fifth student is entered");
// After the marks of the fifth student is entered

console.log(marks);
// {Joe: 100, Ana: 90, Chloe: 60, Marie: 75}
```

**Kết quả:** Điểm của học sinh Chloe **bị ghi đè** bởi vì có hai học sinh cùng tên.

### Khi sử dụng Symbol

```js
var marks = {};
var sym1 = Symbol("Joe");
marks[sym1] = 100;

var sym2 = Symbol("Ana");
marks[sym2] = 90;

var sym3 = Symbol("Chloe");
marks[sym3] = 95;

var sym4 = Symbol("Marie");
marks[sym4] = 75;

console.log(marks);
// {
//   Symbol(Joe): 100, Symbol(Ana): 90, Symbol(Chloe): 95,
//   Symbol(Marie): 75
// }

console.log("Another student with name Chloe appears");
// Another student with name Chloe appears

var sym5 = Symbol("Chloe");
marks[sym5] = 60;

console.log("After the marks of the fifth student is entered");
// After the marks of the fifth student is entered

console.log(marks);
// {
//  Symbol(Joe): 100, Symbol(Ana): 90, Symbol(Chloe): 95,
//  Symbol(Marie): 75, Symbol(Chloe): 60
// }
```

**Kết quả:** Điểm của Chloe **không bị ghi đè** khi học sinh khác trùng tên xuất hiện, không bị mất dữ liệu.

## Hạn chế của Symbol

- Các symbol bị bỏ qua trong [vòng lặp `for..in`](/vong-lap-trong-javascript/).
- Symbol bị bỏ qua bởi các hàm như [Object.keys()](https://www.geeksforgeeks.org/object-keys-javascript/), [Object.getOwnPropertyNames()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames) và [JSON.stringify()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
- Symbol chủ yếu được sử dụng để đảm bảo **tính riêng tư**. Nhưng các phương thức như [Object.getOwnPropertySymbols()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols) trả về một mảng các key kiểu Symbol và [Reflect.ownKeys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Reflect/ownKeys) trả về một mảng tất cả các key, bao gồm cả symbol.

Tham khảo:

- [Symbol trong JavaScript](/tim-hieu-ve-symbol-trong-javascript/)
- [Object là gì? Object trong JavaScript](/object-la-gi-object-trong-javascript/)
- [Motivation to bring symbols in ES6](https://www.geeksforgeeks.org/motivation-to-bring-symbols-in-es6/)
