---
date: "2017-07-03T20:00:00Z"
update: "2022-05-06T20:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/kiem-tra-lop-toan-tu-instanceof-trong-javascript.png"
keywords: "kiểm tra lớp, toán tử instanceof"
description: "Toán tử instanceof cho phép kiểm tra một đối tượng có thuộc lớp nào đó hay không. Và toán tử này cũng tính đến kế thừa. Sau đây là cách sử dụng instanceof trong JavaScript."
slug: kiem-tra-lop-toan-tu-instanceof-trong-javascript
title: "Kiểm tra lớp với toán tử instanceof trong JavaScript"
shortTitle: "Kiểm tra lớp với toán tử instanceof trong JS"
series: "JavaScript: class"
tags:
  - Class
---

Toán tử [`instanceof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/instanceof) cho phép kiểm tra một đối tượng có thuộc [lớp](/cu-phap-class-trong-javascript-co-ban/) nào đó hay không. Và toán tử này cũng tính đến [kế thừa](/ke-thua-class-trong-javascript/).

**Việc kiểm tra kiểu của class** là cần thiết trong nhiều trường hợp. Ví dụ, toán tử `instanceof` có thể được sử dụng để xây dựng một hàm [đa hình](https://vi.wikipedia.org/wiki/%C4%90a_h%C3%ACnh) - một hàm xử lý các đối số khác nhau tùy thuộc vào kiểu của chúng.

## Toán tử instanceof

Cú pháp sử dụng toán tử `instanceof` là:

```js
obj instanceof Class;
```

Câu lệnh trên trả về `true` nếu `obj` thuộc về `Class` hoặc một lớp kế thừa từ `Class` đó, ví dụ:

```js
class Rabbit {}
let rabbit = new Rabbit();

console.log(rabbit instanceof Rabbit); // true
```

Toán tử `instanceof` cũng hoạt động với các [hàm khởi tạo](/khoi-tao-object-new-trong-javascript/) như sau:

```js
function Rabbit() {}

console.log(new Rabbit() instanceof Rabbit); // true
```

Và kể cả các [**built-in class**](/ke-thua-built-in-class-trong-javascript/) như `Array`:

```js
let arr = [1, 2, 3];
console.log(arr instanceof Array); // true
console.log(arr instanceof Object); // true
```

**Chú ý:** `arr` cũng thuộc về lớp `Object`. Đó là bởi vì `Array` kế thừa nguyên mẫu - [kế thừa prototype](/prototype-la-gi-prototype-trong-javascript/) từ `Object`.

Thông thường, toán tử `instanceof` dựa trên chuỗi prototype để kiểm tra class. Ngoài ra, bạn cũng có thể tùy chỉnh phương thức static [`Symbol.hasInstance`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/hasInstance) trong class.

Bởi vì, thuật toán của `obj instanceof Class` hoạt động theo cách sau:

1. Nếu class có một phương thức tĩnh là `Symbol.hasInstance`, thì toán tử `instanceof` chỉ cần gọi phương thức đó dạng `Class[Symbol.hasInstance](obj)`. Và kết quả trả về sẽ là `true` hoặc `false`. Đó chính là cách để tùy chỉnh hoạt động của toán tử `instanceof`, ví dụ:

```js
// tùy biến Symbol.hasInstance sao cho
// tất cả các object mà canEat=true thì đều thuộc class Animal
class Animal {
  static [Symbol.hasInstance](obj) {
    if (obj.canEat) {
      return true;
    }

    return false;
  }
}

let obj = { canEat: true };
console.log(obj instanceof Animal); // true
// Bởi vì Animal[Symbol.hasInstance](obj) được gọi.
```

2. Hầu hết các class không có phương thức `Symbol.hasInstance`. Trong trường hợp đó, logic cơ bản được sử dụng cho `obj instanceOf Class` là kiểm tra xem `Class.prototype` có bằng một trong các prototype trong chuỗi prototype của `obj` hay không. Nói cách khác, thuật toán để kiểm tra như sau:

```js
// Lần lượt kiểm tra các prototype trong chuỗi
obj.__proto__ === Class.prototype;
obj.__proto__.__proto__ === Class.prototype;
obj.__proto__.__proto__.__proto__ === Class.prototype;
//...

// Nếu bất cứ phép so sánh nào trả về true thì kết quả cuối cùng là true.
// Ngược lại thì kết quả là false.
```

Trong ví dụ trên `rabbit.__proto__ === Rabbit.prototype`, do đó kết quả là `true` ngay lập tức.

Với trường hợp kế thừa, quá trình so sánh sẽ dừng lại ở bước thứ hai:

```js
class Animal {}
class Rabbit extends Animal {}

let rabbit = new Rabbit();
console.log(rabbit instanceof Animal); // true
// Kiểm tra: rabbit.__proto__ === Animal.prototype (không đúng)
// Kiểm tra: rabbit.__proto__.__proto__ === Animal.prototype (đúng -> dừng lại)
```

Ngoài toán tử `instanceof`, cũng có một phương thức [objA.isPrototypeOf(objB)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/object/isPrototypeOf), trả về `true` nếu `objA` ở đâu đó trong chuỗi prototype của `objB`.

Vì vậy, `obj instanceof Class` có thể được thay thế bằng câu lệnh `Class.prototype.isPrototypeOf(obj)`.

> **Chú ý**: Bản thân hàm khởi tạo `Class` không tham gia vào việc kiểm tra.
>
> Chỉ có chuỗi prototype và `Class.prototype` được sử dụng với toán tử `instanceof`.

Điều đó có thể dẫn đến những **kết quả không mong muốn** khi thuộc tính `prototype` bị thay đổi sau khi đối tượng được tạo ra, như sau:

```js
function Rabbit() {}
let rabbit = new Rabbit();

// thay đổi prototype
Rabbit.prototype = {};

// dẫn đến đối tượng rabbit không thuộc Rabbit nữa
console.log(rabbit instanceof Rabbit); // false
```

## Đôi điều về Object.prototype.toString

Bạn biết rằng các object thuần (plain object) được chuyển đổi thành **string** dưới dạng `[object Object]`, ví dụ:

```js
let obj = {};

alert(obj); // [object Object]
console.log(obj.toString()); // [object Object]
```

Đó chính là cách JavaScript triển khai phương thức `toString`.

Tuy nhiên, có một **tính năng ẩn** làm cho `toString` thực sự linh hoạt hơn thế. Bạn có thể sử dụng `toString` như một cách mở rộng của toán tử [`typeof`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof) để thay thế cho `instanceof`.

Theo [đặc tả của `toString`](https://tc39.github.io/ecma262/#sec-object.prototype.tostring), phương thức này có thể được lấy ra từ object và thực thi trong ngữ cảnh (context) của bất kỳ giá trị (kiểu dữ liệu) nào khác. Và kết quả thu được sẽ phụ thuộc vào giá trị đó.

- Đối với một số, kết quả là `[object Number]`.
- Đối với boolean, kết quả là `[object Boolean]`
- Đối với `null` là: `[object Null]`.
- Đối với `undefined` là: `[object Undefined]`.
- Đối với mảng là `[object Array]`.
- ...vv (có thể tùy chỉnh).

Bạn có thể xem ví dụ sau để thấy rõ:

```js
// copy phương thức `toString` sang một biến khác
let objectToString = Object.prototype.toString;

// khai báo 1 biến
let arr = [];

// kiểm tra kiểu dữ liệu của biến
console.log(objectToString.call(arr)); // [object Array]
```

Cụ thể, mình đã sử dụng hàm `call` như được mô tả từ bài [function binding trong JavaScript](/function-binding-trong-javascript/). Ở đây, thuật toán `toString` kiểm tra `this` và trả về kết quả tương ứng.

Ngoài ra còn các ví dụ khác:

```js
let s = Object.prototype.toString;

console.log(s.call(123)); // [object Number]
console.log(s.call(null)); // [object Null]
console.log(s.call(console.log)); // [object Function]
```

### Symbol.toStringTag

Hoạt động của phương thức `toString` trong object có thể được tùy chỉnh bằng cách sử dụng một [symbol](/tim-hieu-ve-symbol-trong-javascript/) đặc biệt là `Symbol.toStringTag`.

Ví dụ:

```js
let user = {
  [Symbol.toStringTag]: "User",
};

console.log({}.toString.call(user)); // [object User]
```

Hầu hết các đối tượng của môi trường cụ thể (trình duyệt, Node.js,...) đều có một thuộc tính như vậy. Và dưới đây là ví dụ về một số đối tượng trên trình duyệt:

```js
console.log(window[Symbol.toStringTag]); // Window
console.log(XMLHttpRequest.prototype[Symbol.toStringTag]); // XMLHttpRequest

console.log({}.toString.call(window)); // [object Window]
console.log({}.toString.call(new XMLHttpRequest())); // [object XMLHttpRequest]
```

Như bạn thấy, kết quả chính xác là `Symbol.toStringTag` (nếu tồn tại) và có dạng `[object...]`.

Tóm lại, bạn có thể sử dụng `{}.toString.call` thay vì `instanceof` cho các đối tượng có sẵn khi muốn lấy kiểu **dưới dạng string** thay vì chỉ để kiểm tra.

## Tổng kết

Dưới đây là tóm tắt các phương pháp kiểm tra kiểu (class):

|               | Áp dụng cho                                                         | Kiểu trả về |
| ------------- | ------------------------------------------------------------------- | ----------- |
| `typeof`      | Kiểu nguyên thủy                                                    | `string`    |
| `{}.toString` | Kiểu nguyên thủy, built-in class, đối tượng có `Symbol.toStringTag` | `string`    |
| `instanceof`  | Các đối tượng                                                       | `boolean`   |

Như bạn có thể thấy, `{}.toString` về cơ bản là nâng cao hơn so với `typeof`.

Và toán tử `instanceof` thực sự hiệu quả khi bạn đang làm việc với hệ thống các class có phân cấp và muốn kiểm tra class có tính đến tính kế thừa.

Tham khảo: [Class checking: "instanceof"](https://javascript.info/instanceof)
