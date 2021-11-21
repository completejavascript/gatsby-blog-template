---
date: "2017-06-18T07:59:28Z"
update: "2017-06-18T07:59:28Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/cac-khia-canh-lap-trinh-huong-doi-tuong-javascript-completejavascript.com_.png"
keywords: "hướng đối tượng"
description: "Trong bài viết này, chúng ta sẽ cùng tìm hiểu sâu hơn về các khía cạnh liên quan đến lập trình hướng đối tượng của ngôn ngữ lập trình JavaScript."
slug: cac-khia-canh-lap-trinh-huong-doi-tuong-trong-javascript
title: "Các khía cạnh lập trình hướng đối tượng trong JavaScript"
series: "JavaScript: Lập trình hướng đối tượng"
tags:
  - OOP
---

Trong bài viết [Lập trình hướng đối tượng với JavaScript?](/lap-trinh-huong-doi-tuong-voi-javascript/), mình đã so sánh ngôn ngữ lập trình dựa trên đối tượng với ngôn ngữ lập trình hướng đối tượng. Trong bài viết này, chúng ta sẽ cùng tìm hiểu sâu hơn về các khía cạnh liên quan đến lập trình hướng đối tượng của ngôn ngữ lập trình JavaScript.

## Lịch sử object

Có một câu nói mang đầy tính triết học như này:

> Một vấn đề phức tạp có thể được quản lý bằng cách chia nó thành những phần nhỏ độc lập với nhau.

Mỗi thành phần nhỏ ở đây chính là [**object**](/javascript-object-last-but-not-least/). Object cung cấp cho chúng ta những phương thức để gọi mà không cần biết nội dung bên trong nó như thế nào. Sau khi xây dựng được những object hoạt động theo đúng yêu cầu, ta sẽ sử dụng chúng để giải quyết những bài toán lớn hơn một cách đơn giản. Đây cũng chính là tư tưởng **chia để trị**.

## Method (phương thức)

Method là một thành phần vô cùng quan trọng trong object. Đối với C++ hay Java, chúng ta chỉ có thể sử dụng được những method dạng public. Chúng ta sẽ sử dụng những method này để lấy giá trị hay thay đổi thông tin các thuộc tính của object.

Trong JavaScript, method chính là một thuộc tính mà giá trị của nó là [function](/ham-la-gi-ham-trong-javascript/). Sau đây là một phương thức đơn giản:

```js
var rabbit = {};
rabbit.speak = function (line) {
  console.log("The rabbit says '" + line + "'");
};

rabbit.speak("I'm alive.");
// => The rabbit says 'I'm alive.'
```

Thông thường, một method sẽ làm một vài thứ với object gọi nó. Để biểu thị object đã gọi method, JavaScript cung cấp từ khoá **this** để chúng ta sử dụng bên trong method.

Ví dụ trên có thể thay đổi như sau:

```js
function speak(line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
}
var whiteRabbit = { type: "white", speak: speak };
var fatRabbit = { type: "fat", speak: speak };

whiteRabbit.speak("I'm alive.");
// => The white rabbit says 'I'm alive.'
fatRabbit.speak("I'm alive.");
// => The fat rabbit says 'I'm alive.'
```

Tư tưởng sử dụng từ khoá **this** này cũng được áp dụng trong C++ hay Java.

### Sự tương quan với bind, call, apply

Nếu bạn chưa biết **bind**, **call** hay **apply** là gì thì bạn có thể tham khảo tại [đây](/phan-biet-call-apply-va-bind-trong-javascript/). Khi gọi 3 hàm này, tham số đầu tiên chính là giá trị của con trỏ **this**.

```js
function speak(line) {
  console.log("The " + this.type + " rabbit says '" + line + "'");
}
var whiteRabbit = { type: "white" };
var fatRabbit = { type: "fat" };
var sexyRabbit = { type: "sexy" };

speak.apply(whiteRabbit, ["I'm alive."]);
// => The white rabbit says 'I'm alive.'

speak.call(fatRabbit, "I'm alive.");
// => The fat rabbit says 'I'm alive.'

var sexyRabbitSpeak = speak.bind(sexyRabbit, "I'm alive.");
sexyRabbitSpeak();
// => The sexy rabbit says 'I'm alive.'
```

## Prototypes

**Prototype** là khái niệm rất riêng của JavaScript. Không giống như C++, Java, một JavaScript Object luôn có sẵn ít nhất một thuộc tính bên trong nó, là prototype. Và prototype cũng chính là một object. Khi một object gọi đến một thuộc tính mà nó không có thì nó sẽ tìm trong prototype.

Hãy xem ví dụ sau:

```js
var empty = {};
console.log(empty.toString);
// => function toString() { [native code] }
console.log(empty.toString());
// => [object Object]
```

Rõ ràng, mình chỉ khai báo **empty** là một object mà không định nghĩa thêm thuộc tính nào. Tuy nhiên, ví dụ trên chỉ ra rằng thuộc tính **toString** tồn tại trong object **empty**. Đó là vì: **toString** là một thuộc tính của **prototype** mà một **object** thì luôn chứa thuộc tính **prototype**.

```js
var empty = {};

console.log(Object.getPrototypeOf(empty) == Object.prototype);
// => true
console.log(Object.getPrototypeOf(Object.prototype));
// => null
```

## Constructors (Hàm khởi tạo)

Nếu bạn đã biết về lập trình hướng đối tượng thì bạn sẽ không còn xa lạ gì với **constructor**. Trong JavaScript, hàm khởi tạo constructor sẽ chứa từ khoá **this** để biểu thị object được tạo ra từ nó.

Thông thường, constructor sẽ được bắt đầu bằng chữ cái viết hoa - dùng để phân biệt nó với các function khác.

Bạn sẽ phải sử dụng từ khoá **new** đứng trước tên function để tạo ra một đối tượng mới từ hàm constructor này.

Sau đây là một ví dụ đơn giản về constructor:

```js
function Rabbit(type) {
  this.type = type;
  this.greeting = function () {
    console.log(this.type + " rabbit" + " say Hello!");
  };
}

var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type);
// => black
blackRabbit.greeting();
// => black rabbit say Hello!

var killerRabbit = new Rabbit("killer");
console.log(killerRabbit.type);
// => killer
killerRabbit.greeting();
// => killer rabbit say Hello!
```

Lúc này, mỗi đối tượng được tạo ra từ constructor **Rabbit** sẽ có hai thuộc tính **type** và **greeting**. Tuy nhiên, bạn vẫn có thể tạo thêm thuộc tính cho nó thông qua **Object.prototype** như sau:

```js
function Rabbit(type) {
  this.type = type;
  this.greeting = function () {
    console.log(this.type + " rabbit" + " say Hello!");
  };
}

Rabbit.prototype.sayBye = function () {
  console.log(this.type + " rabbit" + " say GoodBye!");
};

var blackRabbit = new Rabbit("black");
blackRabbit.sayBye();
// => black rabbit say GoodBye!
```

## Ghi đè thuộc tính

Trong ví dụ trên, **Rabbit** chứa thuộc tính **type**. Đối với mỗi object được tạo ra từ constructor Rabbit, bạn có thể thay đổi giá trị thuộc tính của một object mà không làm ảnh hưởng tới các object khác.

```js
function Rabbit(type) {
  this.type = type;
  this.greeting = function () {
    console.log(this.type + " rabbit" + " say Hello!");
  };
}

Rabbit.prototype.teeth = "small";

var blackRabbit = new Rabbit("black");
var killerRabbit = new Rabbit("killer");

console.log(blackRabbit.teeth); // => small
console.log(killerRabbit.teeth); // => small

killerRabbit.teeth = "long";
console.log(blackRabbit.teeth); // => small
console.log(killerRabbit.teeth); // => long
```

## Tính chất đặc trưng của lập trình hướng đối tượng trong JavaScript

### Tính đóng gói (Encapsulation)

Tính đóng gói: che giấu dữ liệu, không cho phép truy cập dữ liệu trực tiếp từ bên ngoài, mà phải thông qua các method được cung cấp.

```js
function Person(_name) {
  var name = _name;
  this.setName = function (_name) {
    name = _name;
  };
  this.getName = function () {
    return name;
  };
}

var person = new Person("LamPham");
console.log(person.name); // => undefined
console.log(person.getName()); // => LamPham

person.setName("LP Devs");
console.log(person.getName()); // => LP Devs
```

### Tính kế thừa (inheritance)

Tính kế thừa: đối tượng con sẽ kế thừa những thuộc tính của đối tượng cha mà không cần phải định nghĩa lại.

Mặc dù, JavaScript không hỗ trợ trực tiếp tính kế thừa, tuy nhiên ta vẫn có thể tuỳ biến để áp dụng tính chất này trong JavaScript.

```js
function Person(_name) {
  var name = _name;
  this.setName = function (_name) {
    name = _name;
  };
  this.getName = function () {
    return name;
  };
}

function Student(_name, _school) {
  var school = _school;
  Person.call(this, _name);
  this.setSchool = function (_school) {
    school = _school;
  };
  this.getSchool = function () {
    return school;
  };
}

var student = new Student("LamPham", "HUST");
console.log(student.getName()); // => LamPham
console.log(student.getSchool()); // => HUST

student.setSchool("NEU");
student.setName("Ronaldo");

console.log(student.getName()); // => Ronaldo
console.log(student.getSchool()); // => NEU
```

Ngoài ra, còn hai tính chất nữa là: tính **đa hình** và tính **trừu tượng**. Tuy nhiên, việc áp dụng hai tính chất này trong JavaScript là không rõ ràng. Do đó, mình sẽ không trình bày về chúng nữa.

## Kết luận

Trên đây là những khía cạnh cơ bản của lập trình hướng đối tượng được áp dụng trong JavaScript. Mình có thể tóm tắt ngắn gọn lại như sau:

- Method: chúng ta sẽ sử dụng method để lấy giá trị và sửa đổi giá trị thuộc tính của object.
- Prototype: mọi object đều chứa thuộc tính prototype. Chúng ta có thể thay đổi, thêm thuộc tính của object dựa vào prototype.
- Constructor: Có thể tạo mới một object từ một hàm khởi tạo constructor sử dụng từ khoá **new**.
- Tính đóng gói: che giấu dữ liệu; không cho phép truy cập dữ liệu trực tiếp từ bên ngoài, mà phải thông qua các method được cung cấp.
- Tính kế thừa: đối tượng con sẽ kế thừa những thuộc tính của đối tượng cha mà không cần phải định nghĩa lại.

Việc áp dụng lập trình hướng đối tượng vào JavaScript là tương đối khó. Tuy nhiên, nếu bạn nắm vững những kiến thức cơ bản mà mình đã trình bày trên đây, thì mình tin chắc rằng bạn sẽ dễ dàng tìm hiểu thêm và áp dụng lập trình hướng đối tượng trong JavaScript.

## Thực hành

### Vector

Xây dựng constructor Vector biểu diễn một vector trong không gian hai chiều, có hai tham số đầu vào là x, y. Xây dựng 2 methods cho Vector prototype là **plus** và **minus** như ví dụ sau:

```js
console.log(new Vector(1, 2).plus(new Vector(2, 3)));
// => Vector{x: 3, y: 5}
console.log(new Vector(1, 2).minus(new Vector(2, 3)));
// => Vector{x: -1, y: -1}
```

Tham khảo tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/OOP_javascript/vector_completejavascript.com.js).

### Interface

Định nghĩa hàm **logFive** với đầu vào là một **object**. Thực hiện ghi ra log 5 phần tử đầu tiên hoặc ít hơn nếu số phần tử thoả mãn ít hơn 5.

Implement object kiểu **ArraySeg** với đầu vào là một mảng và một object khác kiểu **RangeSeq** với đầu vào là 2 số nguyên biểu diễn khoảng.

```js
// Your code here.

logFive(new ArraySeq([1, 2]));
/*
 * 1
 * 2
 */
logFive(new RangeSeq(100, 1000));
/*
 * 100
 * 101
 * 102
 * 103
 * 104
 */
```

Tham khảo code tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/OOP_javascript/interface_completejavascript.com.js).

Xin chào và hẹn gặp lại bạn ở [bài viết sau](/debug-javascript-de-hay-kho/), thân ái!

## Tham khảo

- [The Secret Life of Objects](http://eloquentjavascript.net/06_object.html)
- [Object-oriented programming](https://en.wikipedia.org/wiki/Object-oriented_programming)
