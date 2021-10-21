---
date: "2018-04-18T00:00:31Z"
template: "post"
directory: "JavaScript"
cover: "../images/21-thu-thuat-javascript-huu-ich-completejavascript.com_.png"
keywords: "thủ thuật javascript hữu ích"
description: "Trong bài viết này, mình sẽ chia sẻ với các bạn 21 thủ thuật JavaScript hữu ích. Qua đó, bạn có thể viết code ngắn gọn hơn và cảm thấy yêu ngôn ngữ lập trình JavaScript hơn."
slug: 21-thu-thuat-javascript-huu-ich
title: "3x7 = 21 thủ thuật JavaScript hữu ích"
tags:
  - DOM
  - ES6
  - JSON
---

Trong bài viết này, mình sẽ chia sẻ với các bạn 21 thủ thuật JavaScript hữu ích. Qua đó, bạn có thể viết code ngắn gọn hơn và cảm thấy yêu ngôn ngữ lập trình JavaScript hơn.

## Tạo hàm query DOM ngắn gọn hơn với bind

Có thể bạn thừa biết, JavaScript cung cấp phương thức [document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) cho phép bạn query [DOM](/co-ban-ve-dom-javascript) dựa trên selector. Tuy nhiên, việc sử dụng phương thức này khá dài dòng. Ví dụ:

```js
let ele1 = document.querySelector("#id1");
let ele2 = document.querySelector(".class2");
let ele3 = document.querySelector("div.user-panel.main input[name='login']");
```

Bạn có thể lợi dụng phương thức [bind](/phan-biet-call-apply-va-bind-trong-javascript) để rút gọn phương thức này:

```js
let $ = document.querySelector.bind(document);

// Usage
let ele1 = $("#id1");
let ele2 = $(".class2");
let ele3 = $("div.user-panel.main input[name='login']");
```

Ở đây, mình đặt tên hàm mới là \$, nên bạn nhìn thấy nó giống với jQuery, nhưng nhớ rằng đây vẫn chỉ là JavaScript thuần mà thôi.

## Rút gọn hàm console.log

Tương tự như trên, bạn cũng có thể sử dụng bind để rút gọn phương thức console.log như sau:

```js
let log = console.log.bind(document);
log("hello"); // => hello
```

## Sao chép (clone) object

Mời bạn xem ví dụ sau:

```js
let obj1 = {
  a: 1,
  b: 2,
};

let obj2 = obj1;
console.log(obj2 === obj1); // => true

obj2.a = 10;
obj2.b = 20;
console.log(obj1.a, obj1.b); // => 10, 20
```

Bạn có thể thấy là obj2 thực chất là tham chiếu của obj1. Khi obj2 thay đổi thì obj1 cũng sẽ bị thay đổi. Để có thể clone object, tạo ra một object hoàn toàn mới, bạn có thể làm theo 2 cách sau:

```js
// shallow clone an object
let newObj = Object.assign({}, obj);

// deep clone an object
let newObj = JSON.parse(JSON.stringify(obj));
```

## Hoán đổi giá trị 2 số

Để có thể hoán đổi giá trị 2 biến số trong JavaScript, bạn có thể làm như sau:

```js
let x = 1,
  y = 2;
console.log(x, y); // 1, 2

[x, y] = [y, x];
console.log(x, y); // 2, 1
```

## Đặt giá trị mặc định cho tham số của hàm

Có hai cách để làm việc này:

**ES5: sử dụng toán tử ||**

```js
function Person(name, age) {
  this.name = name || "Alex";
  this.age = age || 20;
}

let p1 = new Person();
console.log(p1.name, p1.age); // => Alex, 20

let p2 = new Person("John", 25);
console.log(p2.name, p2.age); // => John, 25
```

**ES6: hỗ trợ trực tiếp**

```js
function Person(name = "Alex", age = 20) {
  this.name = name;
  this.age = age;
}

let p1 = new Person();
console.log(p1.name, p1.age); // => Alex, 20

let p2 = new Person("John", 25);
console.log(p2.name, p2.age); // => John, 25
```

## Lấy random trong một đoạn

Hàm random sau trả về một số ngẫu nhiên trong đoạn từ min đến max:

```js
let random = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

// Usage
let a = random(1, 100);
```

## Loại bỏ kí tự trống (trim) 2 đầu string

Bạn có thể sử dụng phương thức trim() hỗ trợ sẵn của string:

```js
let str = "       Hello World!        ";
console.log(str); // =>        Hello World!
console.log(str.trim()); // => Hello World!
```

Trong trường hợp trình duyệt không hỗ trợ phương thức trên, bạn có thể sử dụng [Regex](/tim-hieu-regular-expression-javascript):

```js
function trim(x) {
  return x.replace(/^\s+|\s+$/gm, "");
}

let str = "       Hello World!        ";
console.log(str); // =>        Hello World!
console.log(trim(str)); // => Hello World!
```

## Chuyển đối tượng arguments thành array

[Hàm số](/tim-hieu-function-javascript) trong JavaScript luôn có một đối tượng mặc định là [arguments](/javascript-object-last-but-not-least) để quản lý tham số của hàm. Tuy nhiên, đối tượng này không phải là [array](/javascript-array-co-ban) nên bạn không thể sử dụng các phương thức như [forEach](/javascript-foreach-la-cai-quai-gi), map,...

Để chuyển đối tượng này thành array, bạn có thể sử dụng một trong các cách sau:

```js
let args = Array.prototype.slice.call(arguments);
let args = [].slice.call(arguments);

// ES2015
let args = Array.from(arguments);
```

## Tìm max và min của các phần tử trong mảng

```js
let numbers = [1, 8, 10, -125, 28, 100, 215, -85];
let maxInNumbers = Math.max.apply(Math, numbers);
let minInNumbers = Math.min.apply(Math, numbers);

console.log(maxInNumbers, minInNumbers);
// => 215 -125
```

## Đưa mảng về rỗng

Nhiều bạn đưa mảng về rỗng bằng cách:

```js
let a = [1, 2, 3];
a = [];
```

Khi đó, thực chất là bạn đã tạo thêm một mảng mới. Cách đơn giản để giải quyết vấn đề này là:

```js
let a = [1, 2, 3];
a.length = 0;

console.log(a); // => []
```

## Loại bỏ một phần tử ra khỏi mảng

Bạn không nên sử dụng **delete** để loại bỏ một phần tử ra khỏi mảng. Hàm này không loại bỏ 1 phần tử ra khỏi mảng mà thay vào đó, nó làm cho giá trị của phần tử đó thành **undefined** và độ dài của mảng vẫn không thay đổi.

```js
let arr = ["a", 1, -5, "cde"];
console.log(arr); // => ["a", 1, -5, "cde"]

delete arr[2];
console.log(arr); // => ["a", 1, undefined, "cde"]
console.log(arr.length); // => 4
```

Thay vào đó, bạn có thể dùng hàm **splice**:

```js
let arr = ["a", 1, -5, "cde"];
console.log(arr); // => ["a", 1, -5, "cde"]

arr.splice(2, 1);
console.log(arr); // => ["a", 1, "cde"]
console.log(arr.length); // => 3
```

## Sử dụng and (&&) và or (||) thay cho if

Giả sử bạn có các câu điều kiện sử dụng if như sau:

```js
let a = 10;
if (a === 10) console.log("a === 10"); // => a === 10
if (a !== 5) console.log("a !== 5"); // => a !== 5
```

Khi đó, bạn có thể sử dụng toán tử **&&** và **||** để thay thế như sau:

```js
let a = 10;
a === 10 && console.log("a === 10"); // => a === 10
a === 5 || console.log("a !== 5"); // => a !== 5
```

Hoặc kết hợp cả hai toán tử, thay vì:

```js
// Hoặc kết hợp cả 2 toán tử
let a = 10;
if (a === 5) console.log("a === 5");
else console.log("a !== 5");
```

thì bạn có thể làm như sau:

```js
let a = 10;
(a === 5 && console.log("a === 5")) || console.log("a !== 5");
```

## Duyệt tất cả các properties của object sử dụng for-in loop

```js
for (let name in object) {
  if (object.hasOwnProperty(name)) {
    // do something with name
  }
}
```

## Convert Object sang JSON và ngược lại

```js
let obj1 = { a: 1, b: 2 };

let strJSON = JSON.stringify(obj1); // Object => JSON string
console.log(strJSON); // => {"a":1,"b":2}

let obj2 = JSON.parse(strJSON); // JSON string => object
console.log(obj2); // => {a: 1, b: 2}
```

## Viết hàm ngắn hơn với arrow function

Ví dụ sau sử dụng map để trả về mảng mới với mỗi phần tử là bình phương của mỗi phần tử trong mảng ban đầu:

```js
let a = [1, 2, 3, 4, 5];
let a2 = a.map(function (item) {
  return item * item;
});

console.log(a2);
// => [1, 4, 9, 16, 25]
```

Nếu sử dụng arrow function thì sẽ thế này:

```js
let a = [1, 2, 3, 4, 5];
let a2 = a.map((item) => item * item);

console.log(a2);
// => [1, 4, 9, 16, 25]
```

## Sử dụng string template literals thay vì +

Có phải bạn thường sử dụng toán tử **+** để cộng (ghép) string, ví dụ:

```js
let a = 10,
  b = 20;
console.log("Sum of " + a + " and " + b + " is " + (a + b) + ".");
// => Sum of a and b is 30.
```

Thay vào đó, bạn có thể sử dụng string template literals:

```js
let a = 10,
  b = 20;
console.log(`Sum of ${a} and ${b} is ${a + b}.`);
// => Sum of 10 and 20 is 30.
```

## Sao chép (copy) mảng

```js
let a = [1, 2, 3];
let b = a.slice();

console.log(b); // => [1, 2, 3]
console.log(b === a); // => false
```

## Sử dụng Promise thay vì dùng callback

Code khi sử dụng callback:

```js
func1(function (value1) {
  func2(value1, function (value2) {
    func3(value2, function (value3) {
      func4(value3, function (value4) {
        func5(value4, function (value5) {
          // Do something with value 5
        });
      });
    });
  });
});
```

Code khi implement bằng Promise:

```js
func1(value1)
  .then(func2)
  .then(func3)
  .then(func4)
  .then(func5, (value5) => {
    // Do something with value 5
  });
```

## Nối mảng

Có 3 cách nối mảng như sau:

```js
let one = ["a", "b", "c"];
let two = ["d", "e", "f"];
let three = ["g", "h", "i"];

const result1 = one.concat(two, three); // Old way #1
console.log(result1);
// => ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

const result2 = [].concat(one, two, three); // Old way #2
console.log(result2);
// => ["a", "b", "c", "d", "e", "f", "g", "h", "i"]

const result3 = [...one, ...two, ...three]; // New
console.log(result3);
// => ["a", "b", "c", "d", "e", "f", "g", "h", "i"]
```

## Clone object và array sử dụng Spread

Clone object:

```js
let obj = { a: 1, b: 2 };
let obj2 = { ...obj };
console.log(obj2); // => {a: 1, b: 2};
```

Clone mảng:

```js
let arr = [1, 2];
let arr2 = [...arr];
console.log(arr2); // => [1, 2];
```

## Set key của object một cách linh động

Với cách thông thường:

```js
let myKey = "key3";
let obj = {
  key1: "One",
  key2: "Two",
};
obj[myKey] = "Three";
console.log(obj); // => {key1: "One", key2: "Two", variableKey: "Three"}
```

Với cách ngắn gọn hơn sử dụng []:

```js
let myKey = "variableKey";
let obj = {
  key1: "One",
  key2: "Two",
  [myKey]: "Three",
};
console.log(obj); // => {key1: "One", key2: "Two", variableKey: "Three"}
```

Trên đây là 21 thủ thuật JavaScript hữu ích mà mình đã sưu tầm được. Hy vọng nó có thể giúp ích cho bạn. Ngoài ra, nếu bạn biết thêm các thủ thuật khác hay có góp ý gì thì vui lòng để lại bình luận cho mình.

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/su-dung-es6-template-string-co-gi-hay), thân ái!
