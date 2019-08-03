---
date: "2017-06-04T00:19:42Z"
template: "post"
cover: "../images/"
keywords: ""
slug: phan-biet-call-apply-va-bind-trong-javascript
title: "Phân biệt call, apply và bind trong JavaScript"
categories:
  - Javascript cơ bản
---

Gần đây, mình có đọc được cách sử dụng ba hàm **call**, **apply** và **bind** trong JavaScript. Đọc xong thấy khó hiểu quá nên mình quyết định viết một bài so sánh về ba hàm này, cũng như là cách sử dụng chúng.

## Prototype của function

Đúng vậy, ba hàm **call**, **apply** và **bind** là các [prototype](https://completejavascript.com/cac-khia-canh-lap-trinh-huong-doi-tuong-trong-javascript/) của [Function](https://completejavascript.com/tim-hieu-function-javascript/). Nên chỉ có Function mới có thể gọi được 3 hàm này.

Sở dĩ, một Function có thể gọi function khác vì trong JavaScript, Function cũng là một loại [Object](https://completejavascript.com/javascript-object-last-but-not-least/), mà đã là Object thì sẽ có prototype, hay nói cách khác là gọi được phương thức của nó.

Bạn có thể tham khảo về 3 hàm **call**, **apply** và **bind **tại: [Function.prototype.call()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/call),  [Function.prototype.apply()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/apply)  và [Function.prototype.bind()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/bind).

## Tóm tắt nội dung của 3 hàm số

Bạn có thể nhớ nội dung của **call**, **apply** và **bind** một cách ngắn gọn như sau:

### **call**

Gọi hàm và cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy (**C**omma)

    <code>function.call(thisArg, arg1, arg2, ...)</code>

### **apply**

Gọi hàm và cho phép bạn truyền vào một object và các đối số thông qua mảng (**A**rray)

    <code>fun.apply(thisArg, [argsArray])</code>

### **bind**

Trả về một hàm số mới, cho phép bạn truyền vào một object và các đối số phân cách nhau bởi dấu phẩy.

    <code>var newFunction = fun.bind(thisArg[, arg1[, arg2[, ...]]])</code>

## So sánh call, apply và bind thông qua ví dụ

### Hàm call

    <code>var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
    var person2 = {firstName: 'Kelly', lastName: 'King'};

    function say(greeting1, greeting2) {
     console.log(greeting1 + ',' + greeting2 + ' ' + this.firstName + ' ' + this.lastName);
    }

    say.call(person1, 'Hello', 'Good morning'); // => Hello,Good morning Jon Kuperman
    say.call(person2, 'Hello', 'Good morning'); // => Hello,Good morning Kelly King</code>

### Hàm apply

    <code>var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
    var person2 = {firstName: 'Kelly', lastName: 'King'};

    function say(greeting0, greeting1) {
     console.log(greeting0 + ',' + greeting1 + ' ' + this.firstName + ' ' + this.lastName);
    }

    say.apply(person1, ['Hello', 'Good moring']); // => Hello,Good moring Jon Kuperman
    say.apply(person2, ['Hello', 'Good moring']); // => Hello,Good moring Kelly King</code>

### Hàm bind

    <code>var person1 = {firstName: 'Jon', lastName: 'Kuperman'};
    var person2 = {firstName: 'Kelly', lastName: 'King'};

    function say(greeting0, greeting1) {
     console.log(greeting0 + ',' + greeting1 + ' ' + this.firstName + ' ' + this.lastName);
    }

    var sayHelloJon = say.bind(person1, 'Hello', 'Good morning');
    var sayHelloKelly = say.bind(person2, 'Hello', 'Good morning');

    sayHelloJon(); // => Hello,Good morning Jon Kuperman
    sayHelloKelly(); // => Hello,Good morning Kelly King</code>

## Kết luận

- Nhìn chung, hàm **call** và **apply** là gần giống nhau. Chúng đều gọi hàm trực tiếp. Chỉ khác ở cách truyền tham số vào (với **c**all thì đối số phân cách bởi dấu phẩy **c**omma và với **a**pply thì đối số cho bởi mảng **a**rray)

- Hàm **bind** thì hơi khác hơn một chút. Hàm này không gọi hàm trực tiếp mà nó sẽ trả về một hàm mới. Và bạn có thể sử dụng hàm số mới này sau. Về cách truyền tham số vào thì nó giống với hàm **call**.

Trên đây là một số sự khác nhau giữa **call**, **apply** và **bind **trong JavaScript. Mình nghĩ đến đây là đã đủ để bạn thấy được sự khác nhau giữa chúng và cách sử dụng chúng như thế nào.

Xin chào và hẹn gặp lại bạn ở [bài viết tiếp theo](https://completejavascript.com/tim-hieu-ve-json-trong-javascript/), thân ái!

## Tham khảo

- [Apply vs. Call vs. Bind in JavaScript](https://codeplanet.io/javascript-apply-vs-call-vs-bind/)

- [Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)

---

★ Theo dõi [Lam Pham](https://completejavascript.com/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

**☛ Facebook Fanpage:** [Complete JavaScript](https://www.facebook.com/completejavascript/)
**☛ Facebook Group:** [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
**☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
