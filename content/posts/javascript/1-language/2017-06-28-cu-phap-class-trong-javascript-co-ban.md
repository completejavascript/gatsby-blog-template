---
date: "2017-06-28T08:00:00Z"
update: "2022-02-13T08:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/cu-phap-class-trong-javascript-co-ban.png"
keywords: "class trong javascript, cú pháp class, class cơ bản"
description: "Class trong JavaScript là một syntactic sugar cho hàm khởi tạo. Class giúp khai báo các phương thức đơn giản và dễ đọc hơn. Ngoài ra, class giúp áp dụng các tính chất của lập trình hướng đối tượng tốt hơn."
slug: cu-phap-class-trong-javascript-co-ban
title: "Cú pháp class trong JavaScript cơ bản"
series: "JavaScript: class"
tags:
  - Class
  - ES6
---

Khi lập trình, chúng ta thường sẽ phải tạo ra nhiều [object](/object-la-gi-object-trong-javascript/) với cùng kiểu, ví dụ như: các đối tượng người dùng hay các đối tượng sản phẩm,...

Để giải quyết vấn đề này, bạn có thể sử dụng [hàm khởi tạo với từ khóa new](/cu-phap-new-function-trong-javascript/).

Tuy nhiên, từ [ES6](/tag/es6/) trở đi, JavaScript có thêm từ khóa **class**, với nhiều đặc điểm và tính năng hữu ích được áp dụng trong [lập trình hướng đối tượng](https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91i_t%C6%B0%E1%BB%A3ng).

## Cú pháp cơ bản của class trong JavaScript

Cú pháp class cơ bản là:

```js
class MyClass {
  // các phương thức của class
  constructor() { ... }
  method1() { ... }
  method2() { ... }
  method3() { ... }
  ...
}
```

Bạn sử dụng `new MyClass()` để **tạo mới một đối tượng** chứa tất cả các phương thức được định nghĩa trên.

Phương thức `constructor()` được gọi một cách **tự động** với từ khóa `new`. Do đó, bạn có thể khởi tạo các thuộc tính cho object trong hàm khởi tạo.

Ví dụ class `User` như sau:

```js
class User {
  // hàm khởi tạo
  constructor(name) {
    // khởi tạo thuộc tính `this.name` với giá trị bằng `name`
    this.name = name;
  }

  // phương thức
  sayHi() {
    console.log(this.name);
  }
}

// Sử dụng:
let user = new User("Alex");
user.sayHi(); // Alex
```

Khi `new User("Alex")` được gọi:

- Một đối tượng mới được tạo ra.
- Hàm khởi tạo `constructor` được gọi với giá trị tham số truyền vào là `"Alex"` - gán cho `this.name`.

Sau đó, bạn có thể gọi phương thức của object, ví dụ: `user.sayHi()`.

> 📝 **Chú ý:** Không tồn tại **dấu phẩy** giữa các phương thức. Việc thêm vào dấu phẩy vào giữa các phương thức sẽ gây **lỗi cú pháp**.
>
> Bạn cần chú ý để tránh nhầm lẫn giữa việc **định nghĩa class** với việc **định nghĩa object**.

## Class là gì?

Trong JavaScript, class thực chất là một loại [Function](/ham-la-gi-ham-trong-javascript/). Và bạn có thể xem ví dụ sau để thấy rõ điều đó:

```js{11}
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}

// sử dụng typeof để xác định kiểu của User
console.log(typeof User); // function
```

Bản chất của `class User {...}` như sau:

1. Tạo mới một hàm với tên là `User`, nội dung của hàm được lấy từ hàm khởi tạo `constructor` (mặc định là **empty** nếu bạn không định nghĩa).
2. Lưu các phương thức của hàm (ví dụ `sayHi`) trong `User.prototype`.

Sau khi đối tượng mới được tạo ra và gọi một phương thức, JavaScript sẽ **tự động tìm kiếm** phương thức đó trong prototype (như đã miêu tả trong bài [F.prototype](/f-prototype-prototype-ham-trong-javascript/)).

Ví dụ chứng minh:

```js
class User {
  constructor(name) {
    this.name = name;
  }
  sayHi() {
    console.log(this.name);
  }
}

// class là function
console.log(typeof User); // function

// User.prototype.constructor chính là User
console.log(User === User.prototype.constructor); // true

// Các phương thức được lưu trong User.prototype
console.log(User.prototype.sayHi); // code của phương thức sayHi

// Có tất cả 2 phương thức trong prototype
console.log(Object.getOwnPropertyNames(User.prototype)); // constructor, sayHi
```

## Class không chỉ là "syntactic sugar"

Khái niệm **syntactic sugar** dùng để chỉ một **cú pháp mới** được sinh ra nhằm mục đích **dễ đọc, dễ viết**, chứ không tạo thêm những đặc điểm, tính chất mới so với **cú pháp cũ**.

Mọi người thường coi **class là syntatic sugar của function**. Vì thực chất là ta có thể định nghĩa được thứ **tương tự class** mà không cần từ khóa **class** như sau:

```js
// *** Viết lại `class User` sử dụng hàm ***

// 1. viết hàm khởi tạo
function User(name) {
  this.name = name;
}

// prototype của hàm luôn có thuộc tính constructor mặc định,
// nên không cần định nghĩa lại

// 2. thêm thuộc tính vào prototype
User.prototype.sayHi = function () {
  console.log(this.name);
};

// Sử dụng:
let user = new User("Alex");
user.sayHi(); // Alex
```

Bạn có thể thấy cách định nghĩa hàm trên cho kết quả khá giống với cách dùng class. Tuy nhiên, vẫn có một số đặc điểm khác giữa class và hàm như sau:

► Một hàm được tạo bởi từ khóa **class** luôn có một thuộc tính mặc định là `[[IsClassConstructor]]: true`. Và JavaScript engine thường dùng thuộc tính này để phân biệt giữa hàm bình thường và class.

Ví dụ class bắt buộc phải gọi với từ khóa `new` trong khi hàm bình thường thì không:

```js
// hàm bình thường
function User1() {}

// class
class User2 {
  constructor() {}
}

User1(); // không lỗi
User2(); // lỗi: Class constructor User2 cannot be invoked without 'new'
```

String biểu diễn class cũng luôn bắt đầu bằng **class**:

```js
// hàm bình thường
function User1() {}

// class
class User2 {
  constructor() {}
}

console.log(User1); // ƒ User1() {}
console.log(User2); // class User2 { constructor() {} }
```

► Các phương thức của class là **non-enumerable** - tức là không xuất hiện trong `for...in`. Bởi vì class luôn gán giá trị `enumerable : false` cho tất cả các phương thức trong `prototype`.

► Code trong class luôn sử dụng ở [strict mode](/use-strict-trong-js/).

Ngoài ra, class còn có nhiều cú pháp và tính năng hay ho khác nữa sẽ được trình bày ở các bài viết sau.

## Class expression

Giống như function, class cũng có **class expression** - biểu thức class. Nghĩa là nó có thể được định nghĩa bên trong một biểu thức khác, truyền giữa các hàm, làm giá trị trả về của hàm hoặc dùng để gán cho biến,...

Sau đây là ví dụ về class expression:

```js
let User = class {
  sayHi() {
    console.log("Hello");
  }
};
```

Tương tự như [Named Function Expression](/function-object-trong-javascript/#biểu-thức-hàm-được-đặt-tên) - NFE, class expression cũng có thể có **tên**. Và nếu một class expression có tên thì tên đó **chỉ được nhìn thấy bên trong class**, ví dụ:

```js{1}
let User = class MyClass {
  sayHi() {
    // MyClass is chỉ được nhìn thấy bên trong class
    console.log(MyClass);
  }
};

new User().sayHi(); // hiển thị định nghĩa MyClass

// MyClass không được nhìn thấy bên ngoài
console.log(MyClass); // ReferenceError: MyClass is not defined
```

Hoặc bạn có thể **tạo động** class như sau:

```js{3-7}
function makeClass(message) {
  // khai báo class và trả về nó
  return class {
    sayHi() {
      console.log(message);
    }
  };
}

// Tạo mới một class
let User = makeClass("Hello");

// Tạo mới một đối tượng từ class
new User().sayHi(); // Hello
```

## Getter/setter trong class

Class cũng có **getter/setter** như trong object. Ví dụ sau sử dụng `user.name` làm **getter/setter**:

```js{7,12}
class User {
  constructor(name) {
    this.name = name; // gọi hàm setter
  }

  // getter
  get name() {
    return this._name;
  }

  // setter
  set name(value) {
    if (value.length < 4) {
      alert("Name is too short.");
      return;
    }
    this._name = value;
  }
}

// Sử dụng:
let user = new User("Alex");
console.log(user.name); // Alex

user = new User(""); // Name is too short.
```

Về cơ bản, cách định nghĩa **getter/setter** trong class như trên cũng giống như định nghĩa **getter/setter** trong `User.prototype`.

## Tạo tên phương thức qua biểu thức

Tên của phương thức trong class có thể được **tạo động thông qua một biểu thức**, ví dụ:

```js{2-4}
class User {
  ["say" + "Hi"]() {
    console.log("Hello");
  }
}

new User().sayHi(); // Hello
```

Tính năng này tương tự như trong object.

## Thuộc tính trong class

Trong các phần trên, mình mới đề cập đến phương thức trong class. Thực tế, bạn có thể thêm bất cứ thuộc tính nào vào class như sau:

```js{3}
class User {
  // thêm thuộc tính name vào class
  name = "Alex";

  sayHi() {
    console.log(`Hello, ${this.name}!`);
  }
}

new User().sayHi(); // Hello, Alex!
```

> **Chú ý:** nhiều **trình duyệt cũ** không hỗ trợ cách định nghĩa thuộc tính trong class như trên.

Điểm khác nhau quan trọng giữa việc định nghĩa phương thức và thuộc tính trong class là:

- **Phương thức** trong class được định nghĩa **bên trong prototype**.
- **Thuộc tính** trong class **tồn tại ở mỗi object** được tạo ra từ class.

Ví dụ:

```js{6,7}
class User {
  name = "Alex";
}

let user = new User();
console.log(user.name); // Alex
console.log(User.prototype.name); // undefined
```

Bạn có thể gán giá trị cho thuộc tính thông qua một biểu thức hoặc qua gọi hàm như sau:

```js{2}
class User {
  name = prompt("Name, please?", "Alex");
}

let user = new User();
alert(user.name); // Alex
```

## Tạo phương thức bind với thuộc tính trong class

Như mình đã đề cập trong bài viết về [function binding](/function-binding-trong-javascript/), hàm trong JavaScript xử lý `this` một cách **rất động**.

Vì vậy, khi một object được truyền qua lại các hàm và được gọi ở một **ngữ cảnh khác** thì `this` có thể được tham chiếu đến **object khác với object ban đầu**.

Ví dụ đoạn code sau sẽ hiển thị `undefined`:

```js
class Button {
  constructor(value) {
    this.value = value;
  }

  click() {
    console.log(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined
```

Vấn đề ở đây là khi phương thức `button.click` được truyền vào hàm `setTimeout`, phương thức này sẽ được gọi bởi một đối tượng khác, không phải `button`.

Có ba cách để giải quyết vấn đề này là:

► **Cách 1:** Sử dụng [arrow function](/arrow-function-la-gi-arrow-function-trong-js/) ở hàm `setTimeout` như sau:

```js
setTimeout(() => button.click(), 1000);
```

Khi đó, đối tượng gọi hàm `click` vẫn là `button`. Vì vậy, kết quả hiển thị vẫn chính xác.

► **Cách 2:** Sử dụng arrow function khi định nghĩa hàm `click`:

```js{6-8,13}
class Button {
  constructor(value) {
    this.value = value;
  }

  click = () => {
    console.log(this.value);
  };
}

let button = new Button("hello");

setTimeout(button.click, 1000); // hello
```

Vì arrow function **không có `this`** nên khi hàm `click` được gọi, `this` sẽ được lấy ở ngữ cảnh bên ngoài hàm - đó chính là đối tượng `button`.

► **Cách 3:** bind phương thức `click` cho đối tượng trong hàm khởi tạo.

```js{4}
class Button {
  constructor(value) {
    this.value = value;
    this.click = this.click.bind(this);
  }

  click() {
    console.log(this.value);
  }
}

let button = new Button("hello");

setTimeout(button.click, 1000); // undefined
```

Với cách này, giá trị của `this` bên trong phương thức `click` luôn là đối tượng `button`.

## Tổng kết

Cú pháp cơ bản của class trong JavaScript như sau:

```js
class MyClass {
  prop = value; // thuộc tính

  constructor(...) { // hàm khởi tạo
    // ...
  }

  method(...) {} // phương thức

  get something(...) {} // phương thức getter
  set something(...) {} // phương thức setter

  [Symbol.iterator]() {} // phương thức với tên được tính toán qua biểu thức
  // ...
}
```

`MyClass` thực chất là một hàm với nội dung của hàm lấy từ `constructor` và các phương thức, getter/setter được viết trong `MyClass.prototype`.

Trong các bài viết sau, mình sẽ tìm hiểu nhiều hơn về class, bao gồm tính kế thừa và các tính chất khác của lập trình hướng đối tượng.

Tham khảo: [Class basic syntax](https://javascript.info/class)
