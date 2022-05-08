---
date: "2022-01-14T08:00:00Z"
update: "2022-01-14T08:00:00Z"
template: "question"
directory: "Question"
cover: "../../../images/javascript/cac-cach-ke-thua-co-ban-javascript-completejavascript.com_.png"
keywords: "kế thừa cơ bản trong JavaScript"
description: "Khi lập trình, việc kế thừa là cần thiết nếu bạn muốn giảm lượng code phải viết và quản lý code dễ dàng hơn. Vậy triển khai kế thừa trong JavaScript như thế nào? Bài viết này, mình sẽ giới thiệu với các bạn các cách triển khai kế thừa cơ bản trong JavaScript."
slug: ke-thua-co-ban-trong-javascript
title: "Các cách kế thừa cơ bản trong JavaScript"
series: "JavaScript Question: object-oriented"
tags:
  - Câu hỏi JS OOP
---

Việc kế thừa trong lập trình là cần thiết nếu bạn muốn giảm lượng code phải viết và quản lý dễ dàng hơn. Vậy triển khai [kế thừa trong JavaScript](/cac-khia-canh-lap-trinh-huong-doi-tuong-trong-javascript/) như thế nào?

Sau đây, mình sẽ giới thiệu với bạn các cách triển khai kế thừa cơ bản trong JavaScript.

## Kế thừa cơ bản trong JavaScript

Mời bạn xem ví dụ sau:

```js
function Animal(name) {
  this.type = "Animal";
  this.name = name;
  this.sayType = function () {
    console.log("type: " + this.type);
  };
}

Animal.prototype.sayName = function () {
  console.log("name: " + this.name);
};

function Dog(name) {
  this.super_ = Animal;
  this.super_.call(this, name);

  this.type = "Dog";
  this.shout = function () {
    console.log("shout: " + "Go Go Go !!!");
  };
}

let myDog = new Dog("Rex");
myDog.shout(); // shout: Go Go Go !!!
myDog.sayType(); // type: Dog
myDog.sayName(); // TypeError: myDog.sayName is not a function
```

Lớp cha `Animal` có một thuộc tính `type`, phương thức `sayType` và một phương thức `sayName` được định nghĩa thêm trong prototype của `Animal`.

Lớp con `Dog` kế thừa lớp cha `Animal`, trong đó:

- Gán `this.super_ = Animal` để hiểu rằng lớp cha của `Dog` là `Animal`.
- Gọi ra hàm khởi tạo của lớp cha ứng với đối tượng `this` là `Dog` (nếu bạn vẫn chưa biết ý nghĩa của hàm `call` thì có thể đọc bài viết [phân biệt call, apply và bind trong JavaScript](/phan-biet-call-apply-va-bind-trong-javascript/)).
- Tiếp theo là ghi đè thuộc tính `type` của lớp cha `this.type = "Dog"` và định nghĩa thêm một phương thức khác là `shout`.

Để test thử, mình tạo mới một [object](/object-la-gi-object-trong-javascript/) `myDog` kiểu `Dog`. Sau đó, mình gọi các phương thức của `Dog` và các phương thức của lớp cha `Animal`.

Bạn thấy rằng việc gọi ra phương thức `shout()` và `sayType()` đã thành công. Tuy nhiên, phương thức `sayName()` thì bị lỗi:

```
TypeError: myDog.sayName is not a function
```

Điều đó nghĩa là lớp con `Dog` mới chỉ kế thừa các thuộc tính của lớp cha mà chưa kế thừa các phương thức trong **prototype**.

Để kế thừa được prototype, mời bạn chuyển đến phần tiếp theo.

## Kế thừa Prototype

Để kế thừa được prototype, mình đã sửa lại đoạn code phía trên như sau:

```js{21-32}
function Animal(name) {
  this.type = "Animal";
  this.name = name;
  this.sayType = function () {
    console.log("type: " + this.type);
  };
}
Animal.prototype.sayName = function () {
  console.log("name: " + this.name);
};

function Dog(name) {
  this.super_ = Animal;
  this.super_.call(this, name);
  this.type = "Dog";
  this.shout = function () {
    console.log("shout: " + "Go Go Go !!!");
  };
}

inherits(Dog, Animal);

function inherits(child, parent) {
  child.prototype = Object.create(parent.prototype, {
    constructor: {
      value: child,
      enumerable: false,
      writable: true,
      configurable: true,
    },
  });
}

let myDog = new Dog("Rex");
myDog.shout(); // shout: Go Go Go !!!
myDog.sayType(); // type: Dog
myDog.sayName(); // name: Rex
```

Trong đoạn code trên, mình định nghĩa một [hàm](/ham-la-gi-ham-trong-javascript/) là `inherits`, với hai tham số đầu vào là `child` và `parent` - lần lượt là 2 hàm khởi tạo của lớp con và lớp cha. Ở đây, `child` là `Dog` và `parent` là `Animal`.

Hàm này có nhiệm vụ là tạo ra một đối tượng mới từ **prototype của lớp cha** và gán cho **prototype của lớp con**.

Nhờ đó, các đối tượng thuộc lớp con có thể truy cập đến các phương thức trong prototype của lớp cha, ví dụ: **sayName**.

Tuy nhiên, cách viết này vẫn rất dài dòng. Và cách thứ 3 sau đây sẽ ngắn gọn hơn nữa.

## Kế thừa với từ khóa class, extends trong ES6

JavaScript ES6 cung cấp từ khóa `class` với `extends` cho phép triển khai kế thừa prototype một cách ngắn gọn.

Tuy nhiên, bạn nhớ rằng đây chỉ là **một cách viết khác**. Thực chất, cách này vẫn chỉ là kế thừa prototype mà thôi.

Áp dụng `class` và `extends` cho ví dụ trên:

```js
class Animal {
  constructor(name) {
    this.type = "Animal";
    this.name = name;
  }
  sayType() {
    console.log("type: " + this.type);
  }
  sayName() {
    console.log("name: " + this.name);
  }
}

class Dog extends Animal {
  constructor(name) {
    super(name);
    this.type = "Dog";
  }
  shout() {
    console.log("shout: " + "Go Go Go !!!");
  }
}

let myDog = new Dog("Rex");
myDog.shout(); // shout: Go Go Go !!!
myDog.sayType(); // type: Dog
myDog.sayName(); // name: Rex
```

Rõ ràng, kết quả vẫn không đổi mà **cách viết ngắn gọn và trực quan hơn rất nhiều**. Đó chính là lợi ích rất lớn của việc sử dụng ES6 so với ES5.

## Kết luận

Trên đây là 3 cách kế thừa cơ bản trong JavaScript.

- **Kế thừa cơ bản**: kế thừa các phương thức và thuộc tính của lớp cha nhưng không kế thừa prototype.
- **Kế thừa prototype**: kế thừa các phương thức và thuộc tính của lớp cha cùng với prototype.
- **Kế thừa với từ khóa `class` và `extends` trong ES6**: tương tự như kế thừa prototype nhưng cách viết ngắn gọn, trực quan hơn.

## Tham khảo

- [Triển khai hàm inherits trong nodejs](https://github.com/nodejs/node-v0.x-archive/blob/master/lib/util.js#L634-L644)
- [Object.create() - JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [Class Extends trong JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
