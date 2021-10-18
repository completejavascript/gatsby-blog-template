---
date: "2018-10-22T22:30:12Z"
template: "post"
directory: "JavaScript"
cover: "../images/so-sanh-map-voi-object-trong-javascript.png"
keywords: "so sánh map với object"
description: "Map là một kiểu dữ liệu vừa giống vừa khác Object. Vì vậy, bài viết này sẽ tập trung vào so sánh Map với Object trong JavaScript để làm rõ vấn đề trên."
slug: so-sanh-map-voi-object-trong-javascript
title: "So sánh Map với Object trong JavaScript"
tags:
  - ES6
  - Map
  - Object
---

Có thể bạn đã quen với việc sử dụng Object trong JavaScript. Trong khi đó, Map là một kiểu dữ liệu mới xuất hiện trong ES6. Map có những đặc điểm **giống và khác** so với Object. Cụ thể là như thế nào ? Trong bài viết này, mình sẽ đi vào so sánh Map với Object trong JavaScript.

Mời bạn theo dõi bài viết!

## Nhắc lại khái niệm

**[Object](/javascript-object-last-but-not-least)** là một khái niệm trừu tượng dùng để biểu diễn một vật thể (cụ thể). Trong đó, các thuộc tính dùng để miêu tả đặc điểm, tính chất của đối tượng. Và các phương thức dùng để chỉ các hoạt động của đối tượng.

**[Map](/map-trong-javascript-thi-sao)** là một cấu trúc dữ liệu cho phép lưu trữ dữ liệu theo kiểu **key-value**, tương tự như object.

## So sánh Map với Object trong JavaScript

### Giống nhau

- Đều cho phép lưu trữ dữ liệu theo kiểu key-value.
- Đều cho phép lấy dữ liệu theo key, xoá key, kiểm tra xem 1 key đã tồn tại hay chưa (dĩ nhiên, cách làm vẫn khác nhau nhé!).

### Khác nhau

Trước khi Map xuất hiện, người ta vẫn thường sử dụng Object cho việc lưu trữ dữ liệu dạng key-value. Tuy nhiên, khái niệm Object lại quá rộng, mọi thứ đều có thể là Object. Còn Map thì hướng nhiều hơn đến việc lưu trữ dữ liệu.

**Vậy Map khác Object như thế nào?**

#### Kiểu dữ liệu của key

Object chỉ cho phép lưu trữ **key** kiểu [String](/values-types-va-operators-trong-javascript-phan-2) hoặc [Symbol](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Symbol).

```js
const symbol1 = Symbol(1);
const obj = {
  x: 1,
  "a b": 2,
  symbol1: 3,
};
console.log(obj);
// => {x: 1, a b: 2, symbol1: 3}
```

Trong khi đó, Map cho phép **mọi kiểu dữ liệu** có thể làm key, kể cả [Number](/values-types-va-operators-trong-javascript-phan-1), NaN, [Function](/tim-hieu-function-javascript), Object,...

```js
const fun = function () {};
const set = new Set();
const map = new Map();
map
  .set(NaN, 1)
  .set(1, 2)
  .set("a", 3)
  .set([2], 4)
  .set({ x: 3 }, 5)
  .set(fun, 6)
  .set(set, 7);

// Map(7) {
//  NaN => 1, 1 => 2, "a" => 3, [2] => 4, {x : 3} => 5, function() {} => 6, Set(0) => 7
// }
```

#### Thứ tự của key

Map duy trì thứ tự của key giống như khi nó được thêm vào.

```js
const map = new Map();
map.set("xyz", 1);
map.set("b", 2);
map.set("1", 4);

for (const key of map.keys()) {
  console.log(key);
}
/*
 * xyz
 * b
 * 1
 */
```

Object thì không đảm bảo thứ tự này.

```js
const obj = { xyz: 1 };
obj.b = 2;
obj["1"] = 4;
for (const key in obj) {
  console.log(key);
}
/*
 * 1
 * xyz
 * b
 */
```

#### Xác định kích thước

Bạn có thể lấy kích thước của Map thông qua thuộc tính _size_.

```js
const map = new Map();
map.set("xyz", 1);
map.set("b", 2);
map.set("1", 4);

console.log(map.size);
// => 3
```

Đối với Object, bạn phải đếm số lượng các thuộc tính thủ công. Hoặc bạn cũng có thể tính được số lượng này thông qua phương thức [Object.keys()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys).

Bởi lẽ, phương thức này trả về một mảng chứa các thuộc tính của Object. Lúc này, bạn chỉ cần sử dụng thuộc tính _length_ của [Array](/javascript-array-co-ban) là được.

```js
const obj = { xyz: 1 };
obj.b = 2;
obj["1"] = 4;

let size = 0;
for (const key in obj) size++;
console.log(size);
// => 3

console.log(Object.keys(obj).length);
// => 3
```

#### Kiểm tra tính tồn tại của key

Để kiểm tra xem một key có tồn tại trong Map hay chưa, bạn có thể dùng phương thức có sẵn là _has_.

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
console.log(map.has("a")); // => true
console.log(map.has("c")); // => false
```

Còn đối với Object, bạn phải sử dụng gián tiếp thông qua phương thức _Object.keys()_ như bên trên.

```js
const obj = { a: 1, b: 2 };
const hasKey = (obj, key) => Object.keys(obj).indexOf(key) !== -1;
console.log(hasKey(obj, "a")); // => true
console.log(hasKey(obj, "c")); // => false
```

Trong đó, hàm _hasKey_ là do mình tự định nghĩa. Và bạn có thể thấy là <code>Object.keys(obj)</code> trả về một mảng chứa các property của _obj_.

Tiếp theo, mình sử dụng phương thức [Array.prototype.indexOf()](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) để kiểm tra xem key đã tồn tại trong mảng hay chưa.

Nếu tồn tại thì phương thức này trả về giá trị index đầu tiên thoả mãn trong mảng (>= 0), ngược lại thì trả về -1.

Hay nói cách khác, nếu index tìm được mà khác -1 thì key đang tìm tồn tại trong Map.

#### Duyệt qua các phần tử

Bạn có thể duyệt qua các phần tử của Map (để lấy _key_, _value_ hoặc _entry_) một cách trực tiếp thông qua <code>for...of</code>.

_Entry là một phần tử của Map, có dạng mảng [key, value]_.

```js
const map = new Map([
  ["a", 1],
  ["b", 2],
]);
for (const key of map.keys()) {
  console.log(key);
}
/*
 * a
 * b
 */

for (const value of map.values()) {
  console.log(value);
}
/*
 * 1
 * 2
 */

for (const [key, value] of map) {
  console.log(key, value);
}
/*
 * a 1
 * b 2
 */
```

Ngược lại, với Object, bạn chỉ có thể duyệt qua các _key_, sau đó mới lấy _value_ thông qua _key_.

```js
const obj = { a: 1, b: 2 };
for (const key in obj) {
  console.log(key, obj[key]);
}
/*
 * a 1
 * b 2
 */
```

## Lời kết

Như vậy là mình đã so sánh Map với Object. Qua đây, mình thấy rằng Map đúng là rất phù hợp với các yêu cầu liên quan đến lưu trữ dữ liệu.

Vì nó hỗ trợ sẵn các phương thức liên quan đến việc **thêm, sửa, xoá** dữ liệu dựa theo _key_.

Còn đối với các yêu cầu khác thì mình vẫn phải / nên sử dụng Object.

Các bạn thấy Map và Object giống và khác nhau ở những điểm nào nữa không? Nếu biết thì chia sẻ với mình và mọi người với nhé!

Xin chào và hẹn gặp lại!

**Tham khảo:**

- [Map - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Object - JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object)
- [Out Of Order Keys in ES6 Objects](https://hackernoon.com/out-of-order-keys-in-es6-objects-d5cede7dc92e)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
