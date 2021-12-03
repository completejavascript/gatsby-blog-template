---
date: "2017-05-23T07:00:00Z"
update: "2021-12-02T20:30:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/chuyen-object-ve-kieu-nguyen-thuy.png"
keywords: "chuyển đổi object về kiểu nguyên thủy"
description: "Việc chuyển đổi object về kiểu nguyên thủy được sử dụng với nhiều hàm và toán tử trong JavaScript. Có ba phương thức được sử dụng là obj[Symbol.toPrimitive](hint), toString() và valueOf()."
slug: chuyen-object-ve-kieu-nguyen-thuy
title: "Chuyển đổi object về kiểu nguyên thủy"
series: "JavaScript: Object"
tags:
  - Object
  - Kiểu dữ liệu
---

Trong bài viết [chuyển đổi kiểu dữ liệu](/chuyen-doi-kieu-du-lieu-trong-javascript/), mình đã giới thiệu về cách chuyển đổi các kiểu dữ liệu nguyên thủy sang **number** và **string**.

Nhưng nếu toán hạng **không phải kiểu dữ liệu nguyên thủy mà là object** thì sao? Hay làm sao để chuyển đổi object về kiểu dữ liệu nguyên thủy?

Sau đây là những kiến thức cơ bản bạn cần biết.

## Quy luật chuyển đổi object về kiểu nguyên thủy

Có ba kiểu dữ liệu nguyên thủy bạn cần quan tâm là: **string, number và boolean**.

Khi chuyển đổi object về boolean thì kết quả luôn là `true`.

Ví dụ sử dụng object với [câu lệnh `if`](/cau-truc-re-nhanh-trong-javascript/):

```js
let obj = {};

if (obj) {
  console.log("obj is true"); // obj is true
}
```

Hoặc chủ động convert sang kiểu boolean sử dụng `Boolean()`:

```js
let obj = {};
console.log(Boolean(obj)); // true
```

> Với kiểu dữ liệu boolean là như vậy, đối với **string** và **number** thì sao?

JavaScript có **ba kiểu chuyển đổi**, ứng với giá trị ngầm định của "hint" là: `string`, `number` hoặc `default`.

► Trong những ngữ cảnh cần **string** thì giá trị của "hint" là `string`. Ví dụ sử dụng object trong hàm [`alert`](/ham-tuong-tac-nguoi-dung-alert-confirm-prompt/) hoặc làm thuộc tính của object khác,... JavaScript sẽ chuyển đổi object về dạng string:

```js
let obj = {};

// sử dụng trong hàm alert()
alert(obj); // kết quả hiển thị trên dialog là: [object Object]

// sử dụng làm thuộc tính của object khác
let anotherObj = {};
anotherObj[obj] = 1;

console.log(anotherObj["[object Object]"]); // 1
```

Đối tượng `obj` đã được chuyển đổi sang string, trở thành `[object Object]`.

► Trong những ngữ cảnh cần **number**, giá trị của "hint" là `number`. Ví dụ thực hiện các phép toán số học, so sánh,... JavaScript chuyển đổi object về dạng number:

```js
let obj = {};

// chủ động convert sang number
let num = Number(obj);
console.log(num); // NaN

// sử dụng toán tử một ngôi +
let n = +obj;
console.log(num); // NaN

// trừ date
let date1 = new Date("December 01, 2021 00:00:00");
let date2 = new Date("December 02, 2021 00:00:00");
let delta = date2 - date1;
console.log(delta); // 86400000 - giá trị miliseconds của 1 ngày

// so sánh
let p1 = { x: 1 };
let p2 = { x: 2 };
let greater = p2 > p1;
console.log(greater); // false
```

► Trong những trường hợp **không chắc chắn**, ví dụ cộng hai object với toán tử `+`, so sánh bằng không nghiêm ngặt `==`,...

JavaScript "không biết" nên chuyển object về kiểu dữ liệu nào, vì các toán tử này áp dụng được với cả **number và string**.

Khi đó, JavaScript sẽ xử lý theo **quy luật mặc định**.

```js
// sử dụng toán tử +
let total = obj1 + obj2;

// so sánh == với number
if (user == 1) {
  // do something
}
```

**Để chuyển đổi object về kiểu nguyên thủy, JavaScript sẽ tìm và gọi ba phương thức trong object:**

1. Gọi phương thức `obj[Symbol.toPrimitive](hint)` nếu tồn tại - với `Symbol.toPrimitive` là giá trị [symbol](/tim-hieu-ve-symbol-trong-javascript/) của hệ thống.
2. Trường hợp không tồn tại phương thức trên, nếu "hint" là `string`: ưu tiên gọi `obj.toString()` rồi đến `obj.valueOf()` (bất kể phương thức nào tồn tại).
3. Trường hợp "hint" là `number` hoặc `default`: ưu tiên gọi `obj.valueOf()` rồi đến `obj.toString()` (bất kể phương thức nào tồn tại).

## Chi tiết về `Symbol.toPrimitive`

`Symbol.toPrimitive` là một giá trị **symbol mặc định của hệ thống** và thường được sử dụng như sau:

```js
let obj = {};

obj[Symbol.toPrimitive] = function (hint) {
  // Code trong này dùng để chuyển đổi object về kiểu nguyên thủy.
  // Vì vậy, hàm này phải return về kiểu kiểu nguyên thủy.
  // Giá trị của hint có thể là: string, number hoặc default.
};
```

Khi chuyển đổi object về kiểu nguyên thủy, JavaScript kiểm tra `Symbol.toPrimitive` đầu tiên và gọi phương thức `obj[Symbol.toPrimitive](hint)` với "hint" là một trong các giá trị **string, number hoặc default**, ví dụ:

```js{6-8}
let user = {
  name: "Alex",
  age: 28,

  // sử dụng cú pháp rút gọn khai báo phương thức
  [Symbol.toPrimitive](hint) {
    return hint === "string" ? `{name: ${this.name}}` : this.age;
  },
};

// hint là string
alert(user); // {name: Alex}

// hint là number
alert(+user); // 28

// hint là default
alert(user + 1); // 29
```

Trong ví dụ trên, `user` có thể chuyển thành string hoặc number tùy thuộc vào "hint". Và tất cả xử lý đều nằm trong phương thức `obj[Symbol.toPrimitive](hint)`.

## Chi tiết về `toString` và `valueOf`

Trường hợp object không tồn tại thuộc tính `Symbol.toPrimitive` thì JavaScript sẽ tìm đến hai phương thức `toString` và `valueOf`.

- Nếu "hint" là `string`: JavaScript ưu tiên tìm `toString` trước. Nếu `toString` không tồn tại thì tìm `valueOf` (`toString` có độ ưu tiên cao hơn).
- Nếu "hint" là `number` hoặc `default`: JavaScript ưu tiên tìm `valueOf` trước. Nếu `valueOf` không tồn tại thì tìm `toString` (`valueOf` có độ ưu tiên cao hơn).

`toString` và `valueOf` là hai **phương thức mặc định**, luôn luôn tồn tại khi khởi tạo object, ví dụ:

```js
let obj = {};

console.log(obj.toString()); // [object Object]
console.log(obj.valueOf()); // {}

console.log(obj === obj.valueOf()); // true
```

Qua ví dụ trên, bạn thấy rằng:

- Phương thức `toString` mặc định trả về string có giá trị là `[object Object]`.
- Phương thức `valueOf` mặc định trả về **tham chiếu của chính object** đó.

Bây giờ, mình sẽ thử tùy biến hai phương thức này mà không sử dụng `Symbol.toPrimitive` nữa:

```js{6-8,11-13}
let user = {
  name: "Alex",
  age: 28,

  // hint là string
  toString() {
    return `{name: ${this.name}}`;
  },

  // hint là number hoặc default
  valueOf() {
    return this.age;
  },
};

// hint là string
alert(user); // {name: Alex}

// hint là number
alert(+user); // 28

// hint là default
alert(user + 1); // 29
```

Như bạn thấy là kết quả hoàn toàn giống với cách sử dụng `Symbol.toPrimitive`.

> 📝 **Chú ý**: hai phương thức `toString` và `valueOf` có thể trả về bất kỳ kiểu dữ liệu nguyên thủy nào, không nhất thiết phải trả về **number** hay **string**.
>
> Chỉ cần giá trị trả về **khác object** là được.

Ví dụ:

```js{7,12}
let user = {
  name: "Alex",
  age: 28,

  // hint là string
  toString() {
    return true;
  },

  // hint là number hoặc default
  valueOf() {
    return null;
  },
};

// hint là string
alert(user); // true

// hint là number
alert(+user); // 0 - vì +null chuyển thành 0

// hint là default
alert(user + 1); // 1
```

## Một số vấn đề khác về chuyển đổi kiểu dữ liệu

Có thể bạn đã biết, nhiều toán tử trong JavaScript thực hiện chuyển đổi kiểu dữ liệu nếu giá trị các toán hạng không phù hợp. Ví dụ toán tử `*` sẽ chuyển giá trị các toán hạng thành **number**.

Khi đó, JavaScript sẽ thực hiện hai quá trình:

1. Chuyển đổi object về kiểu nguyên thủy (theo quy luật trên).
2. Nếu kết quả trên không phù hợp thì chuyển đổi về kiểu dữ liệu phù hợp.

Ví dụ:

```js
let obj = {
  [Symbol.toPrimitive](hint) {
    return "3";
  },
};

console.log(obj * 2); // 6
```

Trong ví dụ trên, `obj` sử dụng `Symbol.toPrimitive` để chuyển đổi kiểu dữ liệu về nguyên thủy, và kết quả luôn là string `"3"` (không phụ thuộc giá trị của "hint").

Theo các bước trên thì:

1. `obj` chuyển về string thành `"3"`.
2. Phép toán `"3" * 2` trở thành `3 * 2` (vì string `"3"` chuyển thành số `3`).

## Tổng kết

Việc chuyển đổi object về kiểu nguyên thủy được sử dụng với nhiều hàm và toán tử trong JavaScript.

Có ba kiểu "hint" là:

- `string`: áp dụng cho hàm `alert` và các toán tử yêu cầu toán hạng là string.
- `number`: áp dụng cho các phép toán số học.
- `default`: áp dụng cho **một số ít** toán tử dùng được cho cả string và number (không biết chắc nên chuyển về kiểu dữ liệu nào).

Quy luật chuyển đổi object về kiểu nguyên thủy là:

1. Gọi `obj[Symbol.toPrimitive](hint)` nếu phương thức này tồn tại.
2. Trường hợp phương thức trên không tồn tại, nếu "hint" là `string`: ưu tiên gọi phương thức `obj.toString()`, nếu không tồn tại thì gọi phương thức `obj.valueOf()`.
3. Nếu "hint" là `number` hoặc `default`: ưu tiên gọi phương thức `obj.valueOf()`, nếu không tồn tại thì gọi phương thức `obj.toString()`.

Tham khảo:

- [ECMAScript toPrimitive](https://tc39.github.io/ecma262/#sec-toprimitive)
- [Object to primitive conversion](https://javascript.info/object-toprimitive)
