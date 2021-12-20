---
date: "2017-06-27T06:00:54Z"
update: "2018-04-16T00:00:54Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/cac-cach-ke-thua-co-ban-javascript-completejavascript.com_.png"
keywords: "kế thừa cơ bản trong JavaScript"
description: "Khi lập trình, việc kế thừa là cần thiết nếu bạn muốn giảm lượng code phải viết và quản lý code dễ dàng hơn. Vậy triển khai kế thừa trong JavaScript như thế nào? Bài viết này, mình sẽ giới thiệu với các bạn các cách triển khai kế thừa cơ bản trong JavaScript."
slug: ke-thua-co-ban-trong-javascript
title: "Các cách kế thừa cơ bản trong JavaScript"
series: "JavaScript: Lập trình hướng đối tượng"
tags:
  - ES6
  - OOP
---

Khi lập trình, việc kế thừa là cần thiết nếu bạn muốn giảm lượng code phải viết và quản lý code dễ dàng hơn. Vậy triển khai [kế thừa trong JavaScript](/cac-khia-canh-lap-trinh-huong-doi-tuong-trong-javascript/) như thế nào? Bài viết này, mình sẽ giới thiệu với bạn các cách triển khai kế thừa cơ bản trong JavaScript.

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
myDog.shout(); // => shout: Go Go Go !!!
myDog.sayType(); // => type: Dog
myDog.sayName(); // => TypeError: myDog.sayName is not a function
```

Lớp cha **Animal** có một thuộc tính là _type_, phương thức là _sayType_ và một phương thức khác được định nghĩa thêm trong prototype của Animal là _sayName_.

Lớp con **Dog** kế thừa lớp cha Animal. Trong đó, mình gán **this.super\_ = Animal** để hiểu rằng lớp cha của Dog là Animal. Sau đó, gọi ra hàm khởi tạo của lớp cha ứng với đối tượng **this** là Dog (nếu bạn vẫn chưa biết ý nghĩa của hàm **call** thì có thể đọc bài viết [này](/phan-biet-call-apply-va-bind-trong-javascript/)).

Việc tiếp theo là ghi đè thuộc tính type của lớp cha **this.type = "Dog"**, và định nghĩa thêm một phương thức khác là **shout**.

Cuối cùng, để test thử, mình có tạo mới một [object](/object-la-gi-object-trong-javascript/) _myDog_ kiểu Dog và gọi ra các phương thức của nó với các phương thức của lớp cha Animal. Bạn có thể thấy rằng việc gọi ra phương thức _shout()_ và _sayType()_ đã thành công. Tuy nhiên, phương thức _sayName()_ thì bị lỗi:

**TypeError: myDog.sayName is not a function**

Điều đó có nghĩa là lớp con Dog mới chỉ kế thừa các thuộc tính của lớp cha mà chưa kế thừa các phương thức trong prototype. Để kế thừa được prototype, mời bạn chuyển đến phần tiếp theo.

## Kế thừa Prototype

Để kế thừa được prototype, mình đã sửa lại đoạn code phía trên như sau:

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
myDog.shout(); // => shout: Go Go Go !!!
myDog.sayType(); // => type: Dog
myDog.sayName(); // => name: Rex
```

Trong đó, mình có định nghĩa một [hàm số](/ham-la-gi-ham-trong-javascript/) là **inherits**, với hai tham số đầu vào là child và parent, lần lượt là 2 hàm khởi tạo của lớp con và lớp cha. Ở đây, child là Dog và parent là Animal.

Hàm này có nhiệm vụ là tạo ra một đối tượng mới từ prototype của lớp cha và gán nó cho prototype của lớp con. Vì vậy mà các đối tượng thuộc lớp con đã có thể truy cập đến các phương thức trong prototype của lớp cha (ví dụ: **sayName**).

Tuy vậy, cách viết này vẫn rất dài dòng. Cách thứ 3 sau đây sẽ rất ngắn gọn.

## Kế thừa với từ khóa class, extends trong ES6

JavaScript ES6 cung cấp từ khóa **class** với **extends** cho phép triển khai kế thừa prototype một cách ngắn gọn. Tuy nhiên, bạn nên nhớ rằng đây chỉ là một cách viết khác, thực chất, nó vẫn chỉ là kế thừa prototype mà thôi.

Áp dụng class, extends cho ví dụ trên:

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
myDog.shout(); // => shout: Go Go Go !!!
myDog.sayType(); // => type: Dog
myDog.sayName(); // => name: Rex
```

Bạn thấy đó, kết quả vẫn như vậy mà cách viết ngắn gọn và trực quan hơn rất nhiều. Đó chính là lợi ích rất lớn của việc sử dụng ES6 so với ES5.

## Kết luận

Trên đây là 3 cách kế thừa cơ bản trong JavaScript.

- Kế thừa cơ bản: kế thừa các phương thức và thuộc tính của lớp cha nhưng không kế thừa prototype
- Kế thừa prototype: kế thừa các phương thức và thuộc tính của lớp cha cùng với prototype
- Kế thừa với từ khóa class, extends trong ES6: tương tự như kế thừa prototype nhưng cách viết ngắn gọn, trực quan hơn.

Nếu bạn có thắc mắc, hay góp ý gì thì vui lòng để lại dưới phần bình luận cho mình nhé.

Hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!

## Tham khảo

- [Triển khai hàm inherits trong nodejs](https://github.com/nodejs/node-v0.x-archive/blob/master/lib/util.js#L634-L644)
- [Object.create() - JavaScript | MDN](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/create)
- [Class Extends trong JavaScript](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends)
