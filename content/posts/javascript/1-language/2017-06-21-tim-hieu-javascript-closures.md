---
date: "2017-06-21T00:35:17Z"
update: "2021-10-16T00:35:17Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/tim-hieu-javascript-closures-completejavascript.com_.png"
keywords: "JavaScript Closure"
description: "Bài viết này sẽ giúp bạn hiểu về JavaScript closure. Việc hiểu closure là gì sẽ giúp bạn viết code tốt hơn (ngắn gọn, súc tích hơn và thậm chí dễ hiểu hơn). Hãy cùng tìm hiểu xem closure trong JavaScript là gì và cách dùng closure thế nào nhé!"
slug: tim-hieu-javascript-closures
title: "Tìm hiểu JavaScript Closure - Closure là gì?"
series: "JavaScript: Kiến thức nâng cao về hàm"
---

Như đã nói trong bài [tìm hiểu function JavaScipt](/tim-hieu-function-javascript), bài viết này mình sẽ giới thiệu với bạn về JavaScript closure. Việc hiểu closure là gì sẽ giúp bạn viết code tốt hơn (ngắn gọn, súc tích hơn và thậm chí dễ hiểu hơn). Tuy nhiên, trước khi đi vào những ưu, nhược điểm của việc sử dụng closure trong JavaScript, chúng ta sẽ xem closure là gì và cách sử dụng nó như thế nào.

## Khái niệm JavaScript closure

Closures là tập hợp bao gồm một hàm và _môi trường_ nơi hàm số đó được khai báo. Ở đây, môi trường bao gồm tất cả những biến cục bộ trong phạm vi hàm số được khai báo (để đơn giản, từ nay mình sẽ sử dụng _hàm closures_ khi nói về JavaScript closures).

Hàm closures có thể truy cập [biến số](/cau-truc-chuong-trinh-trong-javascript) ở **3 phạm vi** khác nhau là:

- Biến toàn cục (global)
- Biến được khai báo ở hàm số chứa hàm closures (outer function)
- Biến ở trên trong hàm closures

Ví dụ:

```js
var YEAR = "2017";
function greet(name) {
  var intro = "Hello ";
  function sayHello() {
    var hello = intro + name + " in " + YEAR;
    console.log(hello);
  }
  sayHello();
}
greet("Lam Pham");
// => Hello Lam Pham in 2017
```

Ở đây, hàm _sayHello_ là một hàm closures. Hàm này có thể sử dụng biến số ở toàn cục là _YEAR_, biến ở hàm chứa nó là _intro_ và _hello_.

## Một số đặc điểm quan trọng của JavaScript Closures

Nếu bạn muốn hiểu sâu và vận dụng closure trong JavaScript thì sau đây là những đặc điểm quan trọng mà bạn cần nắm vững.

### Hàm closures có thể truy cập tới biến số của hàm chứa nó, dù cho hàm đó đã return

Thông thường, khi một hàm số đã return thì biến cục bộ trong nó cũng sẽ được giải phóng. Nhưng với closures, bạn vẫn có thể truy cập đến những biến cục bộ đó ngay cả khi outer function đã thực hiện xong.

```js
function adder(n) {
  var intro = "This answer is ";
  var local = n;
  return function (number) {
    var result = number + local;
    console.log(intro + result);
  };
}
var adder2 = adder(2);
adder2(10);
// => This answer is 12
```

Trong ví dụ trên, hàm closures là một hàm số không tên _function(number)_. Hàm closures này sử dụng biến cục bộ của outer function là _intro_ và _local_.

Khi mình gọi hàm _adder(2)_, hàm số này thực hiện và kết quả trả về được gán vào biến _adder2_. Khi gọi _adder2(10)_, kết quả trả về là _12_, chứng tỏ hàm closures vẫn có thể truy cập tới biến cục bộ của outer function khi hàm đó thực hiện xong.

### Hàm closures lưu trữ biến số của outer function theo kiểu tham chiếu

Xét ví dụ dưới đây:

```js
function ObjId() {
  var id = 1;
  return {
    getId: function () {
      return id;
    },
    setId: function (_id) {
      id = _id;
    },
  };
}

var myObject = ObjId();
console.log(myObject.getId()); // => 1
myObject.setId(10);
console.log(myObject.getId()); // => 10
```

Hàm _objId_ trả về một đối tượng bao gồm 2 hàm closures là _getId_ và _setId_. Các hàm closures này sử dụng chung một biến cục bộ là _id_.

Ban đầu, mình gọi _myObject.getId()_ thì kết quả trả về là 1 (giá trị của biến cục bộ). Sau đó, mình gọi _myObject.setId(10)_. Nếu hàm closures chỉ lưu biến cục bộ theo giá trị thì nghĩa là giá trị của biến cục bộ id sẽ không thay đổi. Nhưng khi mình gọi tiếp _myObject.getId()_ thì giá trị trả về là 10. Chứng tỏ, hàm closures phải lưu biến cục bộ theo kiểu tham chiếu.

Bây giờ đọc lại ví dụ trên một lần nữa, bạn có thấy nó giống với cách sử dụng class (lớp) trong C++ hay Java không? Mình thì thấy có giống. Thực ra đây là một trong những cách tạo đối tượng ([object](/lap-trinh-huong-doi-tuong-voi-javascript)) trong JavaScript mà mình sẽ giới thiệu trong những bài viết tiếp theo.

## So sánh hiệu năng giữa việc sử dụng closures và prototype

Ví dụ trên minh hoạ cách sử dụng closures. Bây giờ mình sẽ viết lại nó theo cách sử dụng _prototype_:

```js
function ObjId() {
  this.id = 1;
}

ObjId.prototype.getId = function () {
  return this.id;
};

ObjId.prototype.setId = function (_id) {
  this.id = _id;
};

var myObject = new ObjId();
console.log(myObject.getId()); // => 1
myObject.setId(10);
console.log(myObject.getId()); // => 10
```

Kết quả trả về vẫn giống y hệt như trên. Tuy nhiên, cách nào sẽ chạy nhanh hơn? **Closures** hay **Prototype?**

Dựa theo kết quả so sánh tại bài viết [_Performance of prototype vs closure code in JavaScript_](https://ssobczak.wordpress.com/2014/02/16/prototype-vs-closure-js/), mình tóm tắt lại như sau:

- Định nghĩa đối tượng: JavaScript closures nhanh hơn.
- Khả năng tiết kiệm bộ nhớ và khởi tạo đối tượng mới: Prototype nhanh hơn.
- Truy cập hàm (getter, setter): Prototype nhanh hơn.

Một cách khách quan, việc sử dụng prototype sẽ nhanh hơn và tiết kiệm bộ nhớ hơn việc sử dụng closures. Tuy nhiên, mình vẫn không phủ nhận vai trò của closures trong việc giúp bạn viết code ngắn gọn và rõ ràng hơn. Và dù sao, việc sử dụng closures là không bắt buộc. Tất cả tuỳ thuộc vào bạn.

Bài viết trên là khá ngắn gọn. Hy vọng nó phần nào giúp bạn hiểu được JavaScript closure là gì và cách sử dụng closure trong JavaScript.

Cuối cùng, hẹn gặp lại bạn ở [bài viết tiếp theo](/javascript-array-co-ban), thân ái!

## Tham khảo

- [Closures](https://developer.mozilla.org/en/docs/Web/JavaScript/Closures/)
- [Understand JavaScript Closures With Ease](http://javascriptissexy.com/understand-javascript-closures-with-ease/)
