---
date: "2017-05-18T05:00:00Z"
update: "2021-11-29T06:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/phuong-thuc-object-va-this-trong-javascript.png"
keywords: "this trong javaScript"
description: "Bài viết này tập trung tìm hiểu về phương thức trong object và từ khóa this trong JavaScript. Đây là đặc điểm quan trọng trong lập trình hướng đối tượng."
slug: phuong-thuc-object-va-this-trong-javascript
title: "Phương thức của Object và this trong JavaScript"
series: "JavaScript: Object"
tags:
  - Object
  - Kiểu dữ liệu
---

Như mình đã đề cập trong bài viết đầu tiên về [object](/object-la-gi-object-trong-javascript/), object trong JavaScript dùng để biểu diễn một đối tượng cụ thể. Mà đối tượng không chỉ có các thuộc tính, đối tượng còn có **hành động**.

Sau đây, mình sẽ tìm hiểu về **phương thức của object** và một từ khóa quan trọng, đó là **`this` trong JavaScript**.

## Phương thức của Object

Trong JavaScript, hành động của object được biểu diễn bởi [hàm](/ham-la-gi-ham-trong-javascript/). Ví dụ đối tượng `user` với hành động `sayHello()` như sau:

```js{6-8}
let user = {
  name: "Alex",
  age: "28",
};

user.sayHello = function () {
  console.log("Hello!");
};

user.sayHello(); // Hello!
```

Trong ví dụ trên, mình sử dụng [function expression](/function-expression-trong-javascript/) để tạo một hàm, rồi gán hàm đó cho thuộc tính `sayHello` của `user`.

Tiếp theo, mình gọi `user.sayHello()`. Và kết quả là `Hello!` được hiển thị ra console.

> 📝 Một hàm là thuộc tính của object thì nó được gọi là **phương thức**.

Vì vậy, `sayHello` chính là một phương thức của object `user`.

Ngoài cách sử dụng function expression như trên, bạn có thể dùng **function declaration** để khai báo hàm như sau:

```js{6-10}
let user = {
  name: "Alex",
  age: "28",
};

function sayHello() {
  console.log("Hello!");
};

user.sayHello = sayHello;

user.sayHello(); // Hello!
```

> 💡 Cách sử dụng object để biểu diễn đối tượng với các thuộc tính và hành động như trên gọi là [**lập trình hướng đối tượng**](https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91i_t%C6%B0%E1%BB%A3ng) hay **OOP**.

## Cú pháp ngắn gọn khai báo phương thức

Trong các ví dụ trên, mình khởi tạo object xong rồi mới định nghĩa thêm phương thức. Bạn cũng có thể **định nghĩa phương thức** từ khi khởi tạo object.

Ví dụ khởi tạo object với phương thức:

```js{4-6}
let user = {
  name: "Alex",
  age: "28",
  sayHello: function () {
    console.log("Hello!");
  },
};

user.sayHello(); // Hello!
```

Ngoài ra, bạn cũng có thể **bỏ qua từ khóa `function`** như sau:

```js{4-6}
let user = {
  name: "Alex",
  age: "28",
  sayHello() {
    console.log("Hello!");
  },
};

user.sayHello(); // Hello!
```

Trên đây là một số kiến thức cơ bản về phương thức của object. Sau đây, mình tiếp tục tìm hiểu về từ khóa `this` trong JavaScript.

## Từ khóa this trong JavaScript

Một trường hợp khá phổ biến đối với object là việc **truy cập vào thuộc tính của object** ngay bên trong phương thức.

Ví dụ phương thức `sayHello` trên muốn truy cập và hiển thị giá trị của thuộc tính `name`. Để làm được điều này, bạn có thể sử dụng từ khóa `this`.

Giá trị của `this` trong JavaScript chính là **object gọi phương thức** - đối tượng trước dấu chấm (`.`), ví dụ:

```js{5,9}
let user = {
  name: "Alex",
  age: "28",
  sayHello() {
    console.log(this.name + " says Hello!");
  },
};

user.sayHello(); // Alex says Hello!
```

Khi chương trình thực thi, giá trị của `this` chính là `user`. Hay nói cách khác `this.name` chính là `user.name`.

**Vậy tại sao không sử dụng trực tiếp `user` bên trong phương thức `sayHello`?**

Ví dụ sử dụng trực tiếp `user`:

```js{5}
let user = {
  name: "Alex",
  age: "28",
  sayHello() {
    console.log(user.name + " says Hello!");
  },
};

user.sayHello(); // Alex says Hello!
```

Kết quả vẫn **đúng**. Nhưng liệu vấn đề gì có thể xảy ra?

Giả sử, bạn muốn [copy object dạng tham chiếu](/copy-object-trong-javascript/) từ `user` sang `admin` rồi ghi đè giá trị của `user`:

```js{9-13}
let user = {
  name: "Alex",
  age: "28",
  sayHello() {
    console.log(user.name + " says Hello!");
  },
};

let admin = user;
user = null;

admin.sayHello();
// Uncaught TypeError: Cannot read properties of null (reading 'name')
```

Câu lệnh cuối cùng bị lỗi.

Vì khi bạn gọi `admin.sayHello()`, bên trong phương thức `sayHello` đang gọi `user.name`. Mà giá trị `user` đã bị gán bằng `null`.

Kết quả, bạn bị lỗi **Uncaught TypeError: Cannot read properties of null (reading 'name')**.

> Nếu bạn dùng `this.name` thì sẽ không bị lỗi trên. Vì `this` lúc này được hiểu là `admin`.

## This trong JavaScript không được "bind"

Khác với các ngôn ngữ lập trình khác, từ khóa `this` có thể dùng ở bất kỳ hàm nào (không chỉ là phương thức của object),.

Ví dụ sau đây không bị lỗi cú pháp:

```js{2}
function sayHello() {
  console.log(this.name);
}
```

Giá trị của `this` được **xác định trong thời gian chạy**, phụ thuộc vào đối tượng gọi hàm, ví dụ:

```js{9-13}
let user1 = { name: "Alex" };
let user2 = { name: "John" };

function sayHello() {
  console.log(this.name);
}

// Sử dụng cùng 1 hàm cho 2 objects
user1.sayHi = sayHello;
user2.sayHi = sayHello;

user1.sayHi(); // Alex (this tương ứng với user1)
user2.sayHi(); // John (this tương ứng với user2)
```

Bạn thấy rằng, tùy thuộc vào đối tượng gọi hàm là `user1` hay `user2` mà giá trị của `this` được xác định tương ứng.

> Điều này giải thích lý do tại sao **this trong JavaScript** không được "bind".

**Nếu hàm `sayHello` trên được gọi trực tiếp không qua object nào thì sao?**

Ví dụ gọi trực tiếp `sayHello()`:

```js{7}
"use strict";

function sayHello() {
  console.log(this);
}

sayHello(); // undefined
```

Trong trường hợp này, giá trị của `this` là `undefined` ở [strict mode](/use-strict-trong-js/). Nếu bạn truy cập `this.name` thì sẽ bị lỗi **Uncaught TypeError: Cannot read properties of undefined (reading 'name')**.

```js{4}
"use strict";

function sayHello() {
  console.log(this.name);
}

sayHello();
// Uncaught TypeError: Cannot read properties of undefined (reading 'name')
```

Nếu **không sử dụng strict mode** thì giá trị của `this` sẽ là **đối tượng global** (đối tượng `window` trên trình duyệt).

Khi đó, `this.name` tương đương với `window.name` (thường là `undefined`).

## Arrow function không có this

[Arrow function](/arrow-function-la-gi-arrow-function-trong-js/) là một hàm đặc biệt, vì nó không có `this`.

Nếu bạn truy cập `this` bên trong arrow function thì JavaScript sẽ hiểu `this` là đối tượng ứng với **ngữ cảnh gần nhất bên ngoài có `this`** lúc gọi hàm.

Ví dụ dùng arrow function:

```js{5,6}
let user = {
  name: "Alex",
  age: "28",
  sayHello() {
    let arrowFunc = () => console.log(this.name);
    arrowFunc();
  },
};

user.sayHello(); // Alex
```

Trong ví dụ trên, ngữ cảnh gần nhất bên ngoài có `this` là phương thức `sayHello`. Mà trong phương thức `sayHello`, giá trị của `this` được xác định lúc gọi `user.sayHello()`.

Do đó, `this` chính là `user`. Và kết quả là `this.name` bằng `user.name`.

**Nếu phương thức `sayHello` được gán trực tiếp bằng arrow function thì sao?**

Ví dụ:

```js{4}
let user = {
  name: "Alex",
  age: "28",
  sayHello: () => console.log(this.name),
};

user.sayHello(); // undefined
```

Lúc này, ngữ cảnh gần nhất có `this` lúc gọi hàm là **global**. Trong trường hợp không dùng **strict mode** thì `this` chính là `window`. Vì vậy, `this.name` bằng `undefined`.

> Arrow function có nhiều vấn đề khác nữa cần quan tâm. Bạn có thể tham khảo bài [phân biệt arrow function và function](/phan-biet-arrow-function-va-function-trong-javascript/) để hiểu thêm về arrow function.

## Tổng kết

Sau đây là một số kiến thức cần nhớ về phương thức của object và từ khóa `this` trong JavaScript:

- Hàm được gán cho thuộc tính của object gọi là **phương thức**.
- Trong phương thức, bạn có thể truy cập đến các thuộc tính khác của object thông qua từ khóa `this`.

Từ khóa `this` trong JavaScript được xác định khi chạy chương trình:

- Khi định nghĩa hàm, `this` có thể được sử dụng. Nhưng lúc này `this` chưa có giá trị, cho đến khi hàm được gọi.
- Một hàm có thể được sử dụng trong nhiều object.
- Khi một hàm được gọi thông qua object dạng `object.method()` thì giá trị của `this` chính là `object`.

Đặc biệt, **arrow function không có `this`**. Giá trị của `this` trong arrow function được lấy từ ngữ cảnh gần nhất bên ngoài lúc gọi hàm.

## Thực hành

### Bài 1

Cho đoạn code sau:

```js
"use strict";

function createUser(name) {
  return {
    name,
    ref: this,
  };
}

let alex = createUser("Alex");
console.log(alex.ref.name);
```

Kết quả của `console.log` là gì?

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Kết quả:** Uncaught TypeError: Cannot read properties of undefined (reading 'name').

**Giải thích:**

- Vì giá trị của `this` được xác định tại thời điểm thực thi chương trình.
- Mà hàm `createUser` được gọi như một hàm bình thường, không thông qua object nào cả. Do đó, giá trị của `this` là `undefined`. Nói cách khác, `user.ref` trả về `undefined`.
- Trong **strict mode**, truy cập vào thuộc tính của `undefined` sẽ bị lỗi **Uncaught TypeError: Cannot read properties of undefined (reading 'name')**.

</div>
  </div>
</div>

### Bài 2

Triển khai object `calculator` với ba phương thức:

- `read()`: sử dụng hàm [`prompt`](/ham-tuong-tac-nguoi-dung-alert-confirm-prompt/) đọc hai giá trị và lưu vào hai thuộc tính của object (giả sử người dùng nhập vào là số).
- `add()`: trả về tổng của hai số đã nhập.
- `mul()`: trả về tích của hai số đã nhập.

```js
let calculator = {
  // viết code trong đây
};

calculator.read();
console.log(calculator.sum());
console.log(calculator.mul());
```

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

```js
let calculator = {
  // Phương thức read()
  read() {
    this.a = +prompt("Nhập vào số a:", 0);
    this.b = +prompt("Nhập vào số b:", 0);
  },

  // Phương thức add()
  add() {
    return this.a + this.b;
  },

  // Phương thức mul()
  mul() {
    return this.a * this.b;
  },
};

calculator.read();
console.log(calculator.add());
console.log(calculator.mul());
```

**Chú ý:** hàm `prompt` trả về kết quả là string. Vì vậy, mình thêm toán tử `+` đằng trước để [chuyển đổi kiểu dữ liệu](/chuyen-doi-kieu-du-lieu-trong-javascript/) về number, trước khi gán cho `this.a` và `this.b`.

</div>
  </div>
</div>

### Bài 3

Cho đoạn code sau:

```js
// Khởi tạo obj
let obj = {
  count: 0,
  increase() {
    this.count++;
  },
  decrease() {
    this.count--;
  },
  showCount() {
    console.log(this.count);
  },
};

// Sử dụng obj
obj.increase();
obj.increase();
obj.decrease();
obj.showCount(); // 1
```

Hãy sửa lại các phương thức của `obj` để có thể gọi code theo kiểu:

```js
obj.increase().increase().decrease().showCount(); // 1
```

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

Kĩ thuật này gọi là [**Method chaining**](/tim-hieu-ki-thuat-method-chaining-co-ban/).

Ý tưởng là: trong mỗi phương thức, bạn sẽ `return` về `this` (đối tượng hiện tại).

```js{6,10,14}
// Khởi tạo obj
let obj = {
  count: 0,
  increase() {
    this.count++;
    return this;
  },
  decrease() {
    this.count--;
    return this;
  },
  showCount() {
    console.log(this.count);
    return this;
  },
};

// Sử dụng obj
obj.increase().increase().decrease().showCount(); // 1
```

Bạn hiểu là `increase()`, `decrease()` hay `showCount()` đều trả về `this` - chính là `obj`.

</div>
  </div>
</div>
