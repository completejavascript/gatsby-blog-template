---
date: "2017-05-16T05:00:00Z"
update: "2021-11-26T06:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/copy-object-trong-javascript.png"
keywords: "copy object trong JavaScript"
description: "Việc copy object trong JavaScript bản chất cũng là copy địa chỉ. Sau đây, mình sẽ tìm hiểu một số cách để copy object thành đối tượng độc lập."
slug: copy-object-trong-javascript
title: "Copy object trong JavaScript"
series: "JavaScript: Object"
tags:
  - Kiểu dữ liệu
  - Object
---

Trong bài viết [so sánh 2 object trong JavaScript](/so-sanh-object-trong-javascript/), bạn biết rằng object có kiểu dữ liệu tham chiếu. Vì vậy, copy object trong JavaScript thực chất là **copy địa chỉ**.

```js
let p1 = { x: 1, y: 2 };
let p2 = p1;

p2.x = 5;
console.log(p2.x); // 5
console.log(p1.x); // 5
```

Trong ví dụ trên, hai biến `p2` và `p1` đang cùng tham chiếu đến một địa chỉ. Khi bạn thay đổi giá trị thuộc tính của `p2` thì `p1` cũng thay đổi theo.

**Nếu bạn muốn copy object thành hai đối tượng độc lập nhau thì làm thế nào?**

Sau đây là một số cách để copy object thành hai đối tượng độc lập:

- Copy từng thuộc tính sử dụng vòng lặp [`for...in`](/vong-lap-trong-javascript/).
- Copy nông (shallow copy) sử dụng hàm [`Object.assign()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign) hoặc [cú pháp spread (...)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)
- Copy sâu (deep copy) sử dụng [`JSON.stringify()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) và [`JSON.parse()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) hoặc thư viện có sẵn.

## Copy object sử dụng vòng lặp `for...in`

Các đơn giản nhất để copy object trong JavaScript là sử dụng vòng lặp `for...in` để duyệt tất cả các thuộc tính của object. Rồi lấy giá trị ứng với từng thuộc tính để gán cho object mới.

Ví dụ copy object bằng `for...in`:

```js{3-7}
let p1 = { x: 1, y: 2 };

let p2 = {};

for (let key in p1) {
  p2[key] = p1[key];
}

console.log(p2.x); // 1
console.log(p2.y); // 2

p2.x = 5;
console.log(p2.x); // 5
console.log(p1.x); // 1
```

Bạn thấy rằng, giá trị các thuộc tính `x` và `y` của `p2` hoàn toàn giống `p1`. Nhưng khi thay đổi giá trị `p2.x = 5` thì giá trị `p1.x` vẫn không thay đổi.

## Copy nông (shallow copy) dùng `Object.assign()`

Ngoài cách sử dụng vòng lặp `for...in` như trên, bạn có thể dùng hàm tương tự là `Object.assign()` với cú pháp:

```js
Object.assign(dest, [src1, src2, src3...]);
```

Trong đó:

- `dest`: là object đích.
- `[src1, src2, src3...]`: là các object nguồn.

Phương thức trên sẽ copy toàn bộ các thuộc tính của các object nguồn `src1, src2,...,srcN` vào object đích `dest`. Và giá trị trả về chính là object đích `dest`.

Ví dụ sử dụng `Object.assign`:

```js{6}
let user = { name: "Alex" };
let permission1 = { canView: true };
let permission2 = { canEdit: false };

// copy toàn bộ thuộc tính từ permission1 và permission2 vào user
Object.assign(user, permission1, permission2);

// user trở thành { name: "Alex", canView: true, canEdit: false }
for (let key in user) {
  console.log(key, ":", user[key]);
}

// name : Alex
// canView: true
// canEdit: false
```

Nếu **tên thuộc tính giống nhau** thì kết quả là giá trị của object cuối cùng:

```js{3}
let user = { name: "Alex" };
let permission1 = { canView: true };
let permission2 = { canView: false, canEdit: false };

// copy toàn bộ thuộc tính từ permission1 và permission2 vào user
Object.assign(user, permission1, permission2);

// user trở thành { name: "Alex", canView: false, canEdit: false }
for (let key in user) {
  console.log(key, ":", user[key]);
}

// name : Alex
// canView: false
// canEdit: false
```

Trong ví dụ trên, thuộc tính `canView` đều có ở `permission1` và `permission2` nên kết quả cuối cùng là giá trị ứng với object `permission2`.

Để thay thế ví dụ với vòng lặp `for...in` phần trước, bạn có áp dụng `Object.assign` như sau:

```js{4}
let p1 = { x: 1, y: 2 };
let p2 = {};

Object.assign(p2, p1);
```

**Tại sao gọi là copy nông?**

Tương tự như **so sánh nông**, **copy nông** chỉ thực hiện sao chép trên một cấp độ. Nếu giá trị của thuộc tính trong object **cũng là một object** thì object copy sẽ không hoàn toàn độc lập với object nguồn.

Ví dụ:

```js{8-10}
let point1 = { x: 1, y: 2, metadata: { type: "point" } };

let point2 = {};

Object.assign(point2, point1);
console.log(point2.metadata.type); // point

point2.metadata.type = "CHANGED";
console.log(point2.metadata.type); // CHANGED
console.log(point1.metadata.type); // CHANGED
```

Trong ví dụ trên, giá trị ứng với `metadata` là một object. Với copy nông, hai biến `point2` và `point1` vẫn đang dùng chung bộ nhớ đối với `metadata`.

Vì vậy, khi thay đổi ở `point2` thì `point1` cũng thay đổi theo.

> 📝 Ngoài cách trên để copy nông, bạn cũng có thể dùng cú pháp spread `(...)` như sau:
>
> ```js
> let p1 = { x: 1, y: 2 };
> let p2 = { ...p1 };
> ```
>
> Cú pháp spread `(...)` có nhiều điều để nói và được áp dụng ở nhiều trường hợp nên mình sẽ trình bày ở bài viết sau.

## Copy sâu (deep copy)

Khi object bao gồm nhiều đối tượng lồng nhau, bạn cần copy sâu (deep copy) để có thể tạo ra đối tượng độc lập.

Lấy lại ví dụ ở trên:

```js{4-6}
let point1 = {
  x: 1,
  y: 2,
  metadata: {
    type: "point",
  },
};
```

Trong ví dụ này, giá trị của thuộc tính `metadata` không phải giá trị nguyên thủy mà là một object.

Để thực hiện copy sâu, bạn có thể dùng hàm `JSON.stringify()` để chuyển object về dạng [JSON](/tim-hieu-ve-json-trong-javascript/). Rồi sau đó, bạn dùng hàm `JSON.parse()` để tạo lại một object mới từ JSON.

```js{10,14}
let point1 = {
  x: 1,
  y: 2,
  metadata: {
    type: "point",
  },
};

// chuyển object về dạng JSON
let jsonPoint1 = JSON.stringify(point1);
console.log(jsonPoint1); // {"x":1,"y":2,"metadata":{"type":"point"}}

// parse JSON lại thành object mới
let point2 = JSON.parse(jsonPoint1);
console.log(point2.metadata.type); // point

point2.metadata.type = "CHANGED";
console.log(point2.metadata.type); // CHANGED
console.log(point1.metadata.type); // point
```

Bạn thấy là khi thay đổi giá trị của `metadata` trong `point2` thì giá trị tương ứng trong `point1` vẫn không thay đổi. Chứng tỏ `point2` hoàn toàn độc lập với `point1`.

Đó chính là **copy sâu**.

**Giới hạn của `JSON.stringify` và `JSON.parse`**

Hàm `JSON.stringify` có giới hạn là nó sẽ bỏ qua thuộc tính mà giá trị của nó là [hàm](/ham-la-gi-ham-trong-javascript/) (mặc dù về bản chất hàm cũng là object).

Ví dụ giá trị của thuộc tính là hàm:

```js
let point1 = {
  x: 1,
  y: 2,
  getDisplayName: function () {
    return "(x: " + x + ", y: " + y + ")";
  },
};

// chuyển object về dạng JSON
let jsonPoint1 = JSON.stringify(point1);
console.log(jsonPoint1); // {"x":1,"y":2}

// parse JSON lại thành object mới
let point2 = JSON.parse(jsonPoint1);
console.log(point2.getDisplayName); // undefined
```

Bạn thấy rằng, `JSON.stringify(point1)` đã bỏ qua thuộc tính `getDisplayName`. Vì vậy, khi dùng `JSON.parse(jsonPoint1)` để tạo ra object `point2` thì object `point2` không có `getDisplayName`.

Hay nói các khác là giá trị `point2.getDisplayName` bằng `undefined`.

> 💡 Để giải quyết vấn đề này, bạn cần xử lý thêm nhiều trường hợp nữa (nằm ngoài phạm vi bài viết này).
>
> Hoặc bạn có thể sử dụng hàm thư viện [`_.cloneDeep(value)`](https://lodash.com/docs/4.17.15#cloneDeep) để giải quyết bài toán nhanh hơn.

## Tổng kết

Vì object là kiểu dữ liệu tham chiếu nên việc copy object trong JavaScript thực chất là copy địa chỉ.

Một số cách để copy object thành đối tượng độc lập:

- Dùng vòng lặp `for...in` để duyệt tất cả các thuộc tính trong object rồi gán giá trị tương ứng cho object mới.
- Dùng `Object.assign` hoặc cú pháp spread `(...)` để copy nông (shallow copy).
- Dùng `JSON.stringify` và `JSON.parse` hoặc hàm thư viện `_.cloneDeep(value)` để copy sâu (deep copy).
