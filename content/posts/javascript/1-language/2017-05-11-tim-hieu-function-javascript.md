---
date: "2017-05-11T15:05:14Z"
update: "2021-10-16T15:05:14Z"
template: "post"
directory: "JavaScript"
cover: "../images/tim-hieu-function-javascript-completejavascript.com_.png"
keywords: "function JavaScript"
description: "Function JavaScript (hàm trong JavaScript) là một thành phần không thể thiếu trong cấu trúc chương trình. Function giúp cho chương trình trở nên rõ ràng, dễ hiểu bằng cách gộp những đoạn code lặp lại thành một hàm."
slug: tim-hieu-function-javascript
title: "Tìm hiểu function JavaScript - Hàm trong JavaScript"
---

Function JavaScript (hàm trong JavaScript) là một thành phần không thể thiếu trong [cấu trúc chương trình](/cau-truc-chuong-trinh-trong-javascript). Function giúp cho chương trình trở nên rõ ràng, dễ hiểu bằng cách gộp những đoạn code lặp lại thành một hàm. Nhờ vậy mà việc bảo trì phần mềm cũng dễ dàng hơn.

Ngoài ra, khi đã xây dựng được một hàm tốt (độc lập và thực hiện một chức năng nhất định), bạn có thể tái sử dụng nó trong các project khác nhau. Điều này làm nâng cao hiệu suất công việc của bạn.

Bài viết này, mình sẽ giới thiệu những [thành phần cơ bản](/values-types-va-operators-trong-javascript-phan-1) của hàm trong JavaScript. Qua đó, bạn sẽ biết cách xây dựng hàm và ứng dụng vào các project của mình.

## Định nghĩa function JavaScript

Để định nghĩa hàm trong JavaScript, bạn phải sử dụng từ khoá _function_. Cấu trúc chung của function là:

```js
function functionName([parameter1], [parameter2],...){
  statement1;
  statement2;
  ...
}
```

Hoặc bạn có thể sử dụng một biến và gán giá trị cho nó là nội dung function. Khi đó, tên biến số cũng chính là tên của hàm.

```js
var param = function([parameter1], [parameter2],...){
  statement1;
  statement2;
  ...
};
```

Một số đặc điểm của hàm trong JavaScript là:

- Hàm có thể không có tham số, 1 tham số hay thậm chí là nhiều tham số
- Nội dung của hàm phải được đặt trong cặp dấu ngoặc nhọn ({}), dù cho không có câu lệnh nào hoặc nhiều câu lệnh bên trong nó.
- Hàm có thể có giá trị trả về hoặc không có giá trị trả về.
- Kiểu của tham số hay giá trị trả về trong hàm là không được quy định. Do đó, bạn thường phải kiểm tra kiểu của giá trị truyền vào hàm. Nếu không, bạn sẽ rất dễ bị sai.

```js
var greet = function (name) {
  console.log("Hello " + name + "!");
};

greet("Lam Pham"); // => Hello Lam Pham!

function min(a, b) {
  return a < b ? a : b;
}

console.log(min(3, 4)); // => 3
```

## Tham số và phạm vi (scope)

Tham số của hàm giống như là một biến số với giá trị của nó được khởi tạo khi function được gọi.

Một đặc điểm quan trọng của function JavaScript là tham số và biến số khởi tạo trong hàm có phạm vi cục bộ (local). Nghĩa là nó chỉ có ý nghĩa và chỉ được truy cập ở trong hàm. Hãy xem ví dụ sau:

```js
function increase(number) {
  var x = 5;
  number += x;
  console.log("number inside function:" + number);
}

var number = 3;
increase(number);
// => number inside function: 8

console.log(number);
// => 3 (không thay đổi)

console.log(x);
// => Uncaught ReferenceError: x is not defined
```

Bạn có thể thấy rằng là: giá trị của number trong function là 8. Tuy nhiên, giá trị của nó ở bên ngoài hàm vẫn là 3. Và biến x được khai báo ở trong hàm, nhưng lại không được nhìn thấy phía ngoài hàm.

Tính chất này có ưu điểm là: khi bạn khai báo biến số ở trong hàm, bạn không cần quan tâm xem nó có trùng với biến số nào khác ở bên ngoài không. Bạn hoàn toàn có thể đặt tên chúng giống nhau mà không có chút xung đột nào.

## Nested scope

Ngoài biến số ra, bạn còn có thể khai báo function JavaScript ở trong một hàm khác. Tính chất này gọi là _nested scope_. Tạm dịch là "phạm vi lồng vào nhau" (thực tế, mình không biết dịch thế nào cho hợp lý, nên tốt nhất là dùng từ tiếng anh cho chuẩn bài).

Tương tự như biến số, nếu bạn sử dụng hàm *nested scope*, thì những hàm này cũng có phạm vi sử dụng cục bộ trong hàm chứa nó. Bạn không thể gọi những hàm này ở _global_.

```js
function displayMax(a, b, c, d) {
  var max = function (m, n) {
    if (m > n) return m;
    return n;
  };

  var t1 = max(a, b);
  var t2 = max(c, d);
  var t3 = max(t1, t2);

  console.log(t3);
}

displayMax(3, 5, 4, 10); // => 10

var t = max(10, 11); // => Uncaught ReferenceError: max is not defined
```

Ở ví dụ trên, hàm _displayMax_ chứa hàm _max_. Do đó, hàm _max_ có thể được gọi bên trong hàm _displayMax_. Nhưng khi mình gọi hàm _max_ ở phạm vi global thì nó báo lỗi hàm _max_ không được định nghĩa.

## Functions và values

Như mình đã đề cập trong bài viết trước, _function_ JavaScript là một loại [value](/values-types-va-operators-trong-javascript-phan-2). Hay nói cách khác: tên hàm là biến số và nội dung hàm là giá trị của biến số.

Nghĩa là bạn có thể gán giá trị khác cho biến số đó bằng cách:

- Định nghĩa lại hàm khác (trường hợp này khiến mình liên tưởng đến con trỏ hàm trong C/C++)
- Gán cho biến số đó một giá trị khác như: number, string, boolean...

```js
var minValue = function (a, b) {
  if (a < b) return a;
  return b;
};
console.log(minValue(4, 6));
// => 4

minValue = function (a, b, c) {
  var min = a;
  if (b < min) min = b;
  if (c < min) min = c;
  return min;
};
console.log(minValue(3, 5, 8));
// => 3

minValue = 0;
console.log(minValue);
// => 0
```

Hoặc bạn có thể sử dụng hàm trong biểu thức (expression):

```js
function sum(a, b) {
  return a + b;
}

function hello() {
  console.log("Hello");
}

var a = 1,
  b = 2;
var x = 5 + sum(1, 2);
console.log(x);
// => 8

var z = hello();
// => Hello
console.log(z);
// => underfined
```

Trường hợp, function JavaScript không có giá trị trả về thì mặc định giá trị trả về là _underfined_ (hàm hello() ở ví dụ trên).

## Vị trí khai báo function JavaScript

**Chú ý rằng**: nếu bạn sử dụng hàm theo ví dụ trên thì chương trình vẫn sẽ thực hiện tuần tự từ trên xuống dưới.

Tuy nhiên, bạn có thể gọi hàm trước khi định nghĩa hàm.

```js
console.log("Dog: " + dog());
// => Dog: go go go

function dog() {
  return "go go go";
}
```

Khi thực hiện, trình duyệt sẽ đưa phần định nghĩa hàm lên trên đầu của chương trình. Do đó, bạn có thể gọi hàm ở bất cứ đâu bạn muốn.

Hay hiểu theo cách khác là: trình duyệt sẽ bỏ qua phần định nghĩa function JavaScript, cho đến khi hàm này được gọi thì trình duyệt sẽ tìm đến vị trí hàm được định nghĩa.

Có một vị trí khác để định nghĩa hàm là ở trong block _if_ hoặc _loop (for, while,...)._ Tuy nhiên, cách này không được khuyến khích sử dụng vì một số trình duyệt không hỗ trợ và đã bị cấm trong phiên bản mới nhất của JavaScript.

## Call stack

Ở bài viết về cấu trúc chương trình, bạn đã biết về một số loại _flow_. Tuy nhiên, nếu mình sử dụng hàm thì flow chương trình sẽ như thế nào?

Hãy xem ví dụ:

```js
function greet(who) {
  console.log("Hello " + who);
}
greet("Harry");
console.log("Bye");
```

Khi đó, luồng chương trình có thể được biểu diễn đơn giản như sau:

```
top
    greet
        console.log
    greet
top
    console.log
top
```

Lúc này, máy tính sẽ đưa những lời gọi hàm vào _stack_. Và thực hiện theo đúng nguyên lý của nó: _vào sau ra trước_. Cho đến khi stack rỗng thì chương trình kết thúc.

Việc lưu lời gọi hàm vào stack sẽ tốn không gian bộ nhớ (memory). Do đó, trong trường hợp bạn thực hiện quá nhiều lời gọi hàm (đệ quy vô hạn) thì bạn sẽ bị lỗi *maximum call stack size exceed* hay *stack overflow*. Tức là tràn stack. Do đó, khi viết đệ quy bạn cần phải chú ý đến điều kiện dừng.

```js
function chicken() {
  return egg();
}
function egg() {
  return chicken();
}
console.log(chicken() + " came first.");
// → Uncaught RangeError: Maximum call stack size exceeded
```

## Truyền tham số vào function JavaScript

Trong C/C++, chúng ta phải định nghĩa rõ ràng kiểu tham số, số lượng tham số của hàm. Và khi gọi hàm thì phải gọi đúng như vậy. Nếu muốn đa dạng các kiểu giá trị thì bạn có thể dùng _template_. Nếu không muốn truyền một tham số nào vào hàm thì bạn có thể dùng giá trị mặc định (_default_). Điều này giúp cho C/C++ trở nên rất chặt chẽ.

Ngược lại, JavaScript cung cấp cho chúng ta cách thức sử dụng function rất linh động. Bạn không cần phải quy định kiểu giá trị truyền vào hay trả về. Bạn có thể đưa vào số lượng tham số bằng, nhiều hơn hay ít hơn so với định nghĩa.

Nếu bạn đưa vào nhiều tham số hơn so với định nghĩa thì nó sẽ bỏ qua thành phần thừa. Còn nếu bạn đưa vào ít tham số hơn thì những thành phần thiếu mặc định sẽ là _undefined_.

Ví dụ về hàm tính luỹ thừa:

```js
function power(base, exponent) {
  if (exponent == undefined) exponent = 2;
  var result = 1;
  for (var count = 0; count < exponent; count++) result *= base;
  return result;
}

console.log(power(4));
// => 16
console.log(power(4, 3));
// => 64
console.log(power(3, 2, 1));
// => 9
```

Trường hợp bạn không truyền giá trị cho tham số _exponent_ thì mặc định _exponent_ bằng _undefined_. Khi đó, mình gán exponent bằng 2. Ngược lại, mình sẽ tính như bình thường.

## Closure

Thực sự, khái niệm _closure_ đối với mình cũng khá trừu tượng. Do đó, mình sẽ cố gắng hết sức có thể để giải thích khái niệm này.

> _Closure_ tạm dịch là _sự đóng kín_.

Hãy xem ví dụ sau:

```js
function wrapValue(n) {
  var localVariable = n;
  return function () {
    return localVariable;
  };
}

var wrap1 = wrapValue(1);
var wrap2 = wrapValue(2);
console.log(wrap1());
// => 1
console.log(wrap2());
// => 2
```

Trong hàm _wrapValue_, mình có khởi tạo một biến số là _localVariable_. Khi mình gọi _wrapValue(1)_ thì kết quả trả về là 1. Tức là _localVariable_ = 1.  Và khi mình gọi _wrapValue(2)_ thì kết quả trả về là 2. Chứng tỏ, *localVariable* = 2.

**Như vậy, sau khi hàm được gọi thì biến số cục bộ sẽ ở đâu?**

Thực tế, bạn không cần quan tâm đến vấn đề này. Vì dù sao, việc này cũng không làm ảnh hưởng gì đến kết quả chương trình của bạn.

Tuy nhiên, JavaScript đã đưa ra khái niệm _closure_, giúp bạn không cần phải bận tâm đến vòng đời của những biến cục bộ nữa. Hơn nữa, _closure_ còn mang đến cho bạn sự linh hoạt và sáng tạo khi sử dụng hàm.

```js
function multiplier(factor) {
  return function (number) {
    return number * factor;
  };
}

var twice = multiplier(2);
console.log(twice(5));
// => 10
```

Đây là một ví dụ về hàm _closure_. Bạn có thể thấy hàm _multiplier_ không hề chứa một biến cục bộ nào. Như vậy, ta có thể hiểu _đóng kín_ tức là nó bao gói lấy biến cục bộ trong hàm.

Khái niệm _closure_ là khá mới mẻ và trông cũng rất thú vị. Vì vậy, mình quyết định sẽ dành riêng một bài viết về hàm _closure_. Qua đó, bạn có thể hiểu rõ hơn về hàm này và những ứng dụng của nó.

## Recursion - hàm đệ quy

_Recursion_ hay còn gọi là hàm đệ quy. Recursion cho phép một hàm có thể gọi đến chính nó, miễn sao không bị tràn stack.

Sau đây là một ví dụ về đệ quy:

```js
function power(base, exponent) {
  if (exponent == 0) return 1;
  else return base * power(base, exponent - 1);
}

console.log(power(2, 3));
// => 8
```

Ví dụ trên miêu tả cách tính luỹ thừa sử dụng đệ quy. Và bạn có thể thấy rằng cách biểu diễn này rất gần với định nghĩa mà chúng ta đã học trong toán học.

```
a^b = 1, nếu b = 0
a^b = a * a^(b-1), nếu b > 0
```

Khi sử dụng _recursion_ trong một số bài toán, bạn chỉ cần chuyển từ công thức toán học sang ngôn ngữ lập trình một cách đơn giản. Do đó, sử dụng đệ quy thường ngắn gọn và dễ dàng hơn so với sử dụng vòng lặp.

Nhưng trong JavaScript, việc sử dụng đệ quy sẽ chậm hơn khoảng 10 lần so với sử dụng vòng lặp. Do đó, bạn nên cân nhắc trước khi quyết định sử dụng phương án này.

Cụ thể, bạn nên so sánh giữa cách triển khai và tốc độ thực hiện chương trình. Cách triển khai có thể hiểu là *tính rõ ràng, dễ hiểu* khi viết code. Thông thường, hai yếu tố này sẽ tỉ lệ nghịch với nhau. Và bạn sẽ phải tìm ra một điểm cân bằng.

## Sự phát sinh hàm trong chương trình

Khi viết chương trình, thông thường sẽ có 2 khả năng khiến một hàm được sinh ra:

- Một đoạn chương trình được lặp đi, lặp lại nhiều lần. Việc gom chúng lại thành một hàm sẽ giúp chương trình ngắn gọn hơn, dễ hiểu hơn. Và khi cần thay đổi, bạn chỉ cần sửa một lần trong nội dung hàm, thay vì phải sửa nhiều chỗ.
- Khi viết chương trình, bạn cần tách toàn bộ chương trình thành những phần nhỏ hơn. Hay còn gọi là _module hoá_. Lúc này, bạn có thể xây dựng logic cho toàn bộ chương trình trước khi thật sự định nghĩa nội dung hàm.
  Tại những công ty lớn, thường bạn sẽ chỉ được làm những module nhỏ trong toàn bộ một project lớn. Sau đó, team leader hay project leader... sẽ là người ghép những module nhỏ đó thành một chương trình hoàn chỉnh. Do đó, việc phân chia chương trình thành những hàm tốt là vô cùng quan trọng.

**Như thế nào là một hàm tốt?**

Đây là một câu hỏi rất khó để trả lời. Theo mình, hàm tốt là hàm thỏa mãn một số điều kiện sau:

- Một hàm chỉ thực hiện một chức năng duy nhất
- Độc lập với các yếu tố bên ngoài (biến toàn cục, môi trường thực thi,...)
- Dễ dàng tái sử dụng

Tuy nhiên, không phải lúc nào bạn cũng có thể thoả mãn những yêu cầu trên. Hoặc không nhất thiết phải thoả mãn tất cả những yêu cầu trên.

## Pure function và non-pure function

Nhìn chung, có hai loại function JavaScript là **pure** function (hàm thuần khiết) và **non-pure** function (hàm không thuần khiết).

_Pure_ function là hàm không phụ thuộc vào yếu tố bên ngoài (biến toàn cục, môi trường thực thi,...). Bất cứ khi nào bạn gọi hàm _pure_ function với cùng một đối số thì kết quả trả về luôn giống nhau. Do đó, *pure* function rất dễ để sử dụng, tái sử dụng hay bảo trì,... Theo mình, _pure_ function là một hàm tốt.

_None-pure_ function, ngược lại với _pure_ function, là hàm phụ thuộc vào biến toàn cục hay môi trường thực thi. Do đó, khi bạn gọi cùng một hàm với cùng một đối số, nhưng kết quả lại khác nhau.

```js
// pure function
function f1(number, factor) {
  return number * factor;
}
console.log(f1(2, 10)); // => 20

// non-pure function
var factor = 10;
function f2(number) {
  return number * factor;
}
console.log(f2(3)); // => 30
factor = 11;
console.log(f2(3)); // => 33
```

Trong ví dụ trên, hàm f1 là _pure_ function. Còn hàm f2 là hàm _non-pure_ function (hai lần gọi f2(3), nhưng kết quả một lần là 30 và một lần là 33).

Rõ ràng, hàm _non-pure_ function là khó để tái sử dụng. Nhưng trong rất nhiều trường hợp, mình vẫn phải sử dụng hàm này để đảm bảo hiệu năng chương trình hoặc đơn giản là nó dễ viết hơn.

## Tổng kết

Trên đây là những kiến thức cơ bản về function JavaScript. Hy vọng qua đây bạn có thể hiểu về hàm là gì, cách xây dựng hàm sao cho phù hợp với yêu cầu của từng bài toán.

Như đã trình bày ở trên, bài viết sau mình sẽ trình bày chi tiết về _closure_ trong JavaScript. Đây là kiến thức rất hay mà mình muốn tìm hiểu và áp dụng nó.

Còn bây giờ, đã đến lúc thực hành những kiến thức được học.

> Practice makes perfect.

## Thực hành

### Bài 1:

Viết function JavaScript kiểm tra xem một số nhập vào là số nguyên tố hay không. Nếu là số nguyên tố thì trả về true. Ngược lại, trả về false.

Xem code tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/function/function_check_prime_1.js).

### Bài 2:

Cho dãy fibonaci có công thức như sau:

```
f(0) = f(1) = 1;
f(n) = f(n-1) + f(n-2) với n là số nguyên, n >= 2
```

Hãy viết hàm tính f(6) sử dụng hai cách (vòng lặp và đệ quy).

Xem code tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/function/function_fibonaci_2.js).

Chỉ có 2 bài đơn giản vậy thôi.

Cuối cùng hẹn gặp lại bạn ở [bài viết sau](/tim-hieu-javascript-closures), thân ái!

## Tham khảo

- [Functions](http://eloquentjavascript.net/03_functions.html)
- [Functional Programming: Pure Functions](https://www.sitepoint.com/functional-programming-pure-functions/)
