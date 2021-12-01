---
date: "2017-05-21T20:35:00Z"
update: "2021-11-30T20:35:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/optional-chaining-trong-javascript.png"
keywords: "optional chaining trong javascript"
description: "Optional chaining trong JavaScript là cách an toàn để truy cập vào thuộc tính của object lồng nhau, thậm chí thuộc tính không tồn tại. Sau đây là những kiến thức cơ bản về ?."
slug: optional-chaining-trong-javascript
title: "Optional chaining trong JavaScript"
series: "JavaScript: Object"
tags:
  - ES6
  - Object
  - Kiểu dữ liệu
---

**Optional chaining trong JavaScript** `?.` là cách an toàn để truy cập vào thuộc tính của object lồng nhau, thậm chí thuộc tính không tồn tại.

## Vấn đề với thuộc tính không tồn tại

Giả sử mình có đối tượng `user`. Trong đối tượng `user` lại có thuộc tính `address` (cũng là một [object](/object-la-gi-object-trong-javascript/)). Nhưng thuộc tính `address` là **không bắt buộc**.

Nghĩa là không phải đối tượng nào cũng cung cấp `address` hay giá trị của `user.address` có thể bằng `undefined`.

Tiếp theo, trong `address` lại có các thuộc tính như `street`, `city`,... Nếu mình muốn truy cập vào `address` thì sẽ làm như sau:

```js{3-5,7,10-12}
// user có thuộc tính address
let user1 = {
  address: {
    street: "Hai Ba Trung",
  },
};
console.log(user1.address.street); // Hai Ba Trung

// user không có thuộc tính address
let user2 = {};
console.log(user2.address.street);
// Uncaught TypeError: Cannot read properties of undefined (reading 'street')
```

Trường hợp `user2` không có `address` mà mình truy cập `user2.address.street` thì sẽ bị lỗi **Uncaught TypeError: Cannot read properties of undefined (reading 'street')**.

> Tạm dịch: không thể đọc giá trị thuộc tính của `undefined`.

**Kết quả mong muốn** thường là: nếu `user2.address` bằng `undefined` thì `user2.address.street` cũng trả về `undefined`.

Có một số cách để giải quyết vấn đề này. Bạn có thể sử dụng [câu lệnh `if` hoặc toán tử `?:`](/cau-truc-re-nhanh-trong-javascript/) hoặc dùng [toán tử AND `&&`](/toan-tu-logic-trong-javascript/) như sau:

```js
let user2 = {};

// sử dụng if
let street1;
if (user2.address) {
  street1 = user2.address.street;
}

// sử dụng ?:
let street2 = user2.address ? user2.address.street : undefined;

// sử dụng toán tử &&
let street3 = user2.address && user2.address.street;
```

Rõ ràng, cả ba cách trên đều quá dài dòng. Và `user2.address` bị **lặp lại hai lần**. Và nếu object có **nhiều lớp lồng nhau** thì việc lặp lại còn xảy ra nhiều hơn.

Đó là lý do **optional chaining trong JavaScript** xuất hiện để giải quyết vấn đề trên.

## Optional chaining trong JavaScript là gì?

Optional chaining trong Javascript kí hiệu là `?.`, dùng để dừng lại quá trình xử lý nếu giá trị trước `?.` có [kiểu dữ liệu](/kieu-du-lieu-trong-javascript/) là `undefined` hoặc `null`.

Nói cách khác, `value?.prop`:

- Tương đương với `value.prop` nếu `value` khác `undefined` và `null`.
- Ngược lại, nếu `value` bằng `undefined` hoặc `null` thì trả về giá trị `undefined`.

Ví dụ sử dụng optional chaining trong JavaScript:

```js{7,11}
// user có thuộc tính address
let user1 = {
  address: {
    street: "Hai Ba Trung",
  },
};
console.log(user1?.address?.street); // Hai Ba Trung

// user không có thuộc tính address
let user2 = {};
console.log(user2?.address?.street); // undefined
```

Cách viết trên rõ ràng là **gọn gàng hơn**. Và kết quả trả về đúng như mong đợi.

Ngoài ra, cách viết trên vẫn hoạt động đúng trong trường hợp `user` bằng `null` hoặc `undefined`.

```js
let user = null;

console.log(user?.address); // undefined
console.log(user?.address?.street); // undefined
```

> **Chú ý:** optional chaining trong JavaScript `?.` chỉ kiểm tra điều kiện của **một giá trị** đứng trước nó.

Ví dụ đoạn code sau bị lỗi:

```js{3}
let user = null;

console.log(user.address?.street);
// Uncaught TypeError: Cannot read properties of null (reading 'address')
```

Đoạn code trên bị lỗi vì `?.` đặt sau `address` nên chỉ dùng để kiểm tra giá trị của `address`.

Nhưng vấn đề ở đây là, giá trị `user` bằng `null`. Nên bước truy cập `user.address` đã bị lỗi **cannot read properties of null (reading 'address')**.

## Một số chú ý về optional chaining

Bên trên là những **ưu điểm** của Optional Chaining trong JavaScript. Nhưng không phải trường hợp nào cũng nên sử dụng optional chaining.

Sau đây là một số chú ý:

► **Không nên lạm dụng optional chaining**

Bạn chỉ nên sử dụng `?.` nếu giá trị trước `?.` bằng `null` hoặc `undefined` là **có thể chấp nhận được**.

Trong ví dụ trên, giá trị của `address` trong `user` là **không bắt buộc**. Nên việc sử dụng `address?.street` là hoàn toàn hợp lý.

Về phía `user`, nếu giá trị của `user` cũng không bắt buộc thì bạn nên sử dụng `user?.address`.

Nhưng nếu giá trị của `user` là **bắt buộc phải có** (không có sẽ là sai logic code) thì bạn chỉ nên viết `user.address`.

Với cách viết này, nếu `user` bằng `null` hoặc `undefined` thì bạn sẽ thấy lỗi hiển thị ra [console](/dev-tools-la-gi/). Nhờ vậy, bạn **biết lỗi để sửa lại logic** cho đúng (thay vì phải rất khó khăn để tìm ra lỗi sai).

► **Biến trước `?.` phải được khai báo trước**

Trường hợp biến đứng trước `?.` chưa được khai báo, bạn sẽ bị lỗi:

```js
console.log(user?.address);
// Uncaught ReferenceError: user is not defined
```

Nghĩa là giá trị trước `?.` phải được khai báo biến với `let` / `const` / `var` hoặc là một hàm (sử dụng `function`).

## Optional chaining có thể làm "short-circuiting"

Như mình đã nói ở trên, `?.` sẽ dừng lại quá trình xử lý nếu giá trị trước `?.` là `null` hoặc `undefined`. Khi đó, những phần phía sau `?.` không được thực hiện.

Ví dụ:

```js
let user = null;
let x = 0;

user?.sayHi(x++); // sayHi không được thực thi vì user là null

console.log(x); // 0, giá trị của x không tăng lên
```

## Các biến thể của optional chaining `?.()` và `?.[]`

Optional chaining trong JavaScript **không phải là toán tử** nhưng có thể sử dụng với **hàm** và **toán tử `[]`**.

► **Ví dụ `?.` với hàm:**

```js{7,9}
let userAdmin = {
  admin() {
    console.log("I am admin");
  },
};

let userGuest = {};

userAdmin.admin?.(); // I am admin

userGuest.admin?.(); // không có gì hiển thị
```

Trong ví dụ trên, `?.` dùng để kiểm tra xem [phương thức](/phuong-thuc-object-va-this-trong-javascript/) `admin` có tồn tại hay không. Nếu tồn tại thì phương thức `admin` được gọi.

Đối tượng `userAdmin` có phương thức `admin` nên `userAdmin.admin` khác `null` và `undefined`. Vì vậy, `userAdmin.admin()` được gọi.

Đối tượng `userGuest` không có phương thức `admin` nên `userGuest.admin` bằng `undefined`. Do đó, `userGuest.admin()` không được gọi.

► **Ví dụ `?.` với toán tử `[]`:**

```js
let user1 = {
  name: "Alex",
};

let user2 = null;

console.log(user1?.["name"]); // Alex
console.log(user2?.["name"]); // undefined
```

Trong ví dụ trên, `?.` dùng để kiểm tra xem `user1` và `user2` có tồn tại hay không. Nếu tồn tại thì dùng `["name"]` để truy cập giá trị thuộc tính `"name"` trong các đối tượng.

Đối tượng `user1` khác `null` và `undefined` nên `user1?.["name"]` tương đương với `user1.["name"]` (bằng **Alex**).

Đối tượng `user2` bằng `null` nên `user2?.["name"]` trả về `undefined`.

► Ngoài ra, bạn có thể dùng `?.` với `delete`:

```js
delete user?.name; // xóa thuộc tính user.name nếu user tồn tại.
```

> 💡 **Chú ý:** bạn có thể dùng `?.` để **đọc và xóa** thuộc tính trong object, nhưng không thể **thay đổi giá trị** của thuộc tính.

Ví dụ:

```js
let user = null;

user?.name = "Alex";
// Uncaught SyntaxError: Invalid left-hand side in assignment
```

Bởi vì `user` là `null`, nên `user?.name` trả về `undefined`. Bạn tưởng tượng câu lệnh trên trở thành `undefined = "Alex"` - **hoàn toàn vô nghĩa**.

## Tổng kết

Optional chaining trong JavaScript có ba dạng:

1. `obj?.prop`: trả về `obj.prop` nếu `obj` khác `null` và `undefined`, ngược lại trả về `undefined`.
2. `obj?.[prop]`: trả về `obj[prop]` nếu `obj` khác `null` và `undefined`, ngược lại trả về `undefined`.
3. `obj.method?.()`: trả về `obj.method()` nếu `obj.method` khác `null` và `undefined`, ngược lại trả về `undefined`.

Về cơ bản, optional chaining kiểm tra giá trị phía trước `?.` khác `null` và `undefined` thì thực hiện tiếp, nếu không thì dừng lại.

Vì vậy, optional chaining cho phép truy cập một cách an toàn vào các thuộc tính của **object lồng nhau**.

Mặc dù, optional chaining có nhiều lợi ích, nhưng bạn cũng cần chú ý tránh lạm dụng `?.`.

Chỉ nên sử dụng optional chaining khi giá trị phía trước `?.` bằng `null` hoặc `undefined` là **có thể chấp nhận được**.
