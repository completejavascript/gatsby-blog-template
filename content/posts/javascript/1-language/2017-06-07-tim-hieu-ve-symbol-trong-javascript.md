---
date: "2017-06-07T23:00:14Z"
update: "2019-03-06T23:00:14Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/tim-hieu-symbol-trong-javascript-completejavascript.com_.png"
keywords: "symbol trong JavaScript"
description: "Symbol là một kiểu dữ liệu mới được giới thiệu từ phiên bản ES6. Bài này mình sẽ tìm hiểu cơ bản về Symbol trong JavaScript với các ứng dụng của nó."
slug: tim-hieu-ve-symbol-trong-javascript
title: "Tìm hiểu về Symbol trong JavaScript"
tags:
  - ES6
  - Symbol
---

Symbol là một kiểu dữ liệu mới được giới thiệu từ phiên bản [ES6](/tag/es6). Tuy nhiên, mình cũng chưa từng dùng Symbol trong JavaScript bao giờ cả. Nếu vậy thì người ta đưa ra kiểu dữ liệu này để làm gì nhỉ? Nó có ưu điểm gì? Ứng dụng của Symbol như thế nào? Cách sử dụng Symbol trong JavaScript ra sao?

Bài viết này, mình sẽ đi tìm lời giải cho những câu hỏi trên. Và nếu nó thật sự có ích thì chẳng tội gì mà mình không dùng nhỉ!

## Symbol là gì?

Symbol là một kiểu dữ liệu dạng [primative data](https://developer.mozilla.org/en-US/docs/Glossary/Primitive). Để tạo mới một Symbol, bạn có thể dùng phương thức **Symbol()**, ví dụ:

```js
let myId = Symbol();
```

Hoặc bạn có thể thêm **description** để miêu tả Symbol:

```js
let myId = Symbol("id");
```

**Chú ý:** Symbol không có hàm khởi tạo. Do đó, bạn không thể dùng từ khoá **new** để tạo mới một Symbol:

```js
let myId = new Symbol("id");
// => Uncaught TypeError: Symbol is not a constructor
```

Cơ bản về Symbol là vậy. Tiếp theo, mình sẽ tìm hiểu về một số đặc điểm, tính chất của nó nhé!

## Một số đặc điểm của Symbol trong JavaScript

### Symbol là unique (duy nhất)

Nghĩa là dù bạn có tạo ra bao nhiêu Symbol với cùng description thì nó vẫn khác nhau:

```js
let myId1 = Symbol("id");
let myId2 = Symbol("id");

console.log(myId1 == myId2); // => false
console.log(myId1 === myId2); // => false
```

### Symbol không tự convert sang string

Hầu hết các kiểu dữ liệu trong JavaScript đều hỗ trợ tự động convert sang [String](/values-types-va-operators-trong-javascript-phan-2), nhưng Symbol thì không. Ví dụ khi bạn sử dụng Symbol với phương thức [alert()](https://developer.mozilla.org/en-US/docs/Web/API/Window/alert):

```js
let a = true;
let b = [1, 2];
let c = { x: 1, y: 2 };
let d = Symbol();

alert(a); // => true
alert(b); // => 1,2
alert(c); // => [object Object]
alert(d); // => TypeError: Cannot convert a Symbol value to a string
```

## Sử dụng Global Symbol

### Sử dụng Symbol.for

Như mình đã nói ở trên, Symbol là unique dù cho bạn có tạo ra nhiều Symbol với cùng description. Tuy nhiên, nhiều khi mình muốn các description giống nhau sẽ ứng với một Symbol duy nhất. Lúc này, description có thể coi là **key**.

Để làm được việc này, mình có thể sử dụng phương thức **Symbol.for(key)**. Phương thức này sẽ tìm trong một đối tượng **Global** nào đó, xem có tồn tại một Symbol tương ứng với _key_ hay không. Nếu chưa có Symbol nào thoả mãn thì nó sẽ tạo ra một Symbol mới được xác định bởi _key_. Ngược lại, nó sẽ trả về Symbol đó.

```js
// Tạo một Symbol mới với description là "id"
let id1 = Symbol("id");

/*
 * Tìm trong Global một Symbol với key là "id".
 * Nếu Symbol chưa tồn tại thì tạo mới một Symbol
 */
let id2 = Symbol.for("id");

/*
 * Tiếp tục tìm trong Global một Symbol với key là "id".
 * Lần này thì Symbol đã tồn tại rồi, nên sẽ trả về Symbol trên.
 */
let id3 = Symbol.for("id");

// Kết quả
console.log(id1 === id2); // => false
console.log(id2 === id3); // => true
```

Việc sử dụng _Symbol.for_ như thế này sẽ giúp cho Symbol có thể được sử dụng rộng rãi, nhiều nơi trong ứng dụng hơn.

### Sử dụng Symbol.keyFor

Ngược lại với phương thức trên, phương thức **Symbol.keyFor(symbol)** sẽ trả về giá trị _key_ tương ứng với _symbol_. Tuy nhiên, phương thức này chỉ có tác dụng với Symbol được tạo ra từ phương thức _Symbol.for(key)_ bên trên.

```js
let sym1 = Symbol("id");
let key1 = Symbol.keyFor(sym1);

let sym2 = Symbol.for("name");
let key2 = Symbol.keyFor(sym2);

console.log("key1: ", key1); // => undefined
console.log("key2: ", key2); // => name
```

## Ứng dụng của Symbol

### Symbol có thể làm key cho thuộc tính của Object

Đối với [Object](/javascript-object-last-but-not-least) thì ngoài String, Symbol cũng có thể làm key cho thuộc tính của Object. Ví dụ:

```js
const id = Symbol("id");
const obj = {
  [id]: "abc123",
};

console.log(obj);
// => {Symbol(id): "abc123"}
```

Tuy nhiên, thuộc tính với Symbol sẽ là **non-enumerable**. Do đó, bạn không thể dùng _for...in_ để duyệt nó.

```js
const id = Symbol("id");
const obj = {
  [id]: "abc123",
  x: 1,
  y: 2,
};

console.log(obj);
// => {x: 1, y: 2, Symbol(id): "abc123"}

for (let key in obj) {
  console.log(key);
}
/*
 * x
 * y
 */
```

Để duyệt các thuộc tính với key là Symbol, bạn có thể sử dụng phương thức [Object.getOwnPropertySymbols()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertySymbols). Phương thức này trả về mảng của tất cả các thuộc tính có key là Symbol, ví dụ:

```js
const id = Symbol("id");
const name = Symbol("name");

const obj = {
  [id]: "abc123",
  [name]: "obj",
  y: 2,
};

console.log(obj);
// => {y: 2, Symbol(id): "abc123", Symbol(name): "obj"}

const arr = Object.getOwnPropertySymbols(obj);
console.log(arr);
// => [Symbol(id), Symbol(name)]
```

### Symbol được dùng để tránh gây xung đột về tên

#### Ví dụ khi không dùng Symbol

Giả sử mình định nghĩa một [module](/su-dung-es-modules-tren-trinh-duyet) như là một object, với một key dạng string là "id". Trường "id" sẽ được sử dụng với mục đích nào đó bên trong module.

**lib.js:**

```js
let module = {
  id: "abc",
  printId: function () {
    console.log("id in lib:", this.id);
  },
};

export default module;
```

Khi một người khác sử dụng module của mình, do không biết nên người đó lại tiếp tục sử dụng thuộc tính với key là "id". Dẫn đến giá trị của "id" bị thay đổi. Cuối cùng, các logic khác cũng bị thay đổi theo. Và đây là điều mà mình không mong muốn.

**main.js:**

```js
import module from "./lib.js";

module.id = "123";
module.printId();
// => id in lib: 123

console.log("id in main:", module.id);
// => id in main: 123
```

Nhưng nếu mình sử dụng "id" là Symbol thì sao?

#### Ví dụ khi sử dụng Symbol

**lib.js:**

```js
let id = Symbol("id");

let module = {
  [id]: "abc",
  printId: function () {
    console.log("id in lib:", this[id]);
  },
};

export default module;
```

**main.js:**

```js
import module from "./lib.js";

let id = Symbol("id");
module[id] = "123";

module.printId();
// => id in lib: abc

console.log("id in main:", module[id]);
// => id in main: 123
```

Rõ ràng, dù ở _main.js_ có thay đổi _id_ như nào thì hàm _printId_ vẫn không hề thay đổi.

## Lời kết

Trên đây là một số kiến thức cơ bản về Symbol. Để biết thêm về các phương thức hỗ trợ của Symbol trong JavaScript, bạn có thể tham khảo thêm trong các bài viết dưới đây.

Theo bạn ứng dụng của Symbol có thật sự quan trọng? Mình có cần thiết sử dụng Symbol hay không? Chia sẻ quan điểm của bạn xuống phần bình luận phía dưới nhé.

Xin chào và hẹn gặp lại, thân ái!

Tham khảo:

- [Symbol - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol)
- [Symbol type - javascript.info](https://javascript.info/symbol)
- [A quick overview of JavaScript symbols](https://medium.freecodecamp.org/how-did-i-miss-javascript-symbols-c1f1c0e1874a)
