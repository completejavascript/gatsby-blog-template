---
date: "2017-05-19T14:10:56Z"
update: "2021-10-16T14:10:56Z"
template: "post"
directory: "JavaScript"
cover: "../images/javascript-array-co-ban-completejavascript.com_.png"
keywords: "JavaScript array"
description: "JavaScript array giúp bạn có thể biểu diễn được những dữ liệu phức tạp và dễ dàng hơn trong việc quản lý cũng như xử lý dữ liệu."
slug: javascript-array-co-ban
title: "JavaScript Array cơ bản"
tags:
  - Array
---

Trong những bài viết trước, mình đã giới thiệu với bạn về những kiểu dữ liệu cơ bản là: [numbers](/values-types-va-operators-trong-javascript-phan-1), [strings](/values-types-va-operators-trong-javascript-phan-2), boolean. Hôm nay, mình sẽ nói về kiểu dữ liệu nâng cao hơn. Đó là _array_ hay là _mảng_ trong JavaScript. JavaScript array giúp bạn có thể biểu diễn được những dữ liệu phức tạp và dễ dàng hơn trong việc quản lý cũng như xử lý dữ liệu.

## Vậy array là gì?

Array (mảng trong JavaScript) là kiểu dữ liệu mà giá trị của nó chứa nhiều giá trị khác. Mỗi giá trị trong một mảng được gọi là _element_ (phần tử).

Trước tiên, giả sử bạn có dãy 6 chữ số: 1, 2, 6, 7, 3, 4. Để lưu trữ sáu số này bạn có thể sử dụng 6 biến:

```js
var num1 = 1;
var num2 = 2;
var num3 = 6;
var num4 = 7;
var num5 = 3;
var num6 = 4;
```

Nhưng nếu không phải là 6 số mà là 100, 1000, 10000 số,... thì chắc chắn bạn sẽ không thể sử dụng cách này được.

Thật may mắn, với việc sử dụng JavaScript array, bạn có thể biểu diễn sáu số này một cách gọn hơn:

```js
var array1 = [1, 2, 6, 7, 3, 4];
```

Trong đó, _array1_ chứa các phần tử cùng kiểu là number.

## Đặc điểm quan trọng của JavaScript array

Thông thường, trong nhiều ngôn ngữ lập trình như C/C++, Java, các phần tử trong một array sẽ có cùng kiểu dữ liệu. Tuy nhiên, JavaScript array có thể chứa các phần tử với kiểu dữ liệu khác nhau.

Do đó, mảng sau là hợp lệ:

```js
var array2 = [1, "hai", true, 4.5, -7, NaN, null, undefined];
```

Ở đây, *array2* chứa các phần tử với các kiểu hoàn toàn khác nhau (number, string, boolean, NaN, null,...).

Ngoài ra, trong một mảng cũng có thể chứa những mảng khác.

```js
var array1 = [1, 2, [6, 4, 8], 7, [3, 5], 4];
```

## Cách truy cập phần tử của mảng trong JavaScript

Để truy cập một phần tử trong JavaScript array, bạn cần sử dụng cặp dấu ngoặc vuông [], và một số nguyên dương xác định chỉ số (số thứ tự) của phần tử trong mảng.

**Chú ý**: chỉ số mảng luôn bắt đầu từ 0. Và nếu bạn truy cập vào chỉ số ngoài mảng hoặc chỉ số không phải số nguyên dương thì kết quả trả về sẽ là _undefined_.

```js
var arr = [1, 3, 5, 0];
console.log(arr[0]); // => 1
console.log(arr[1]); // => 3
console.log(arr[4]); // => undefined
console.log(arr[-1]); // => undefined
console.log(arr[1.4]); // => undefined
```

Trong ví dụ này, mảng arr có 4 phần tử, mà chỉ số bắt đầu từ 0 nên các chỉ số hợp lệ là: 0, 1, 2, 3. Khi truy cập vào những chỉ số không hợp lệ như 4, -1, 1.4 thì kết quả đều là undefined.

## Thuộc tính của Array trong JavaScript

Một thuộc tính quan trọng của array trong JavaScript là _length_. Thuộc tính này lưu trữ độ dài (số phần tử) của mảng.

```js
var a = [];
console.log(a.length);
// => 0

var b = [1, 2, 3, 4, 5];
console.log(b.length);
// => 5
```

Nếu sử dụng thuộc tính _length_, mình có thể dễ dàng truy cập vào phần tử cuối mảng - có chỉ số là _length - 1_:

```js
var a = ["cat", "dog", "fish", "chicken"];
console.log(a[a.length - 1]);
// => chicken
```

## Phương thức của Array JS

JavaScript cung cấp sẵn nhiều phương thức có thể sử dụng với array. Sau đây là một số phương thức phổ biến:

### Hàm Array.isArray(obj)

Kiểm tra obj có phải là array hay không. Nếu đúng thì trả về true, ngược lại trả về false.

```js
console.log(Array.isArray([1, 2, 3])); // => true
console.log(Array.isArray(1, 2, 3)); // => false
console.log(Array.isArray("hehe")); // => false
console.log(Array.isArray({ a: 1, b: 2 })); // => false
```

### Hàm Array.of([e1], [e2], ...)

Trả về một Array mới chứa các phần tử là e1, e2...

```js
var a = Array.of();
console.log(a);
// => []

var b = Array.of(1, 2, 3);
console.log(b);
// => [1, 2, 3]

var c = Array.of(1, "hai", null, NaN);
console.log(c);
// => [1, 'hai', null, NaN]
```

### Hàm array.fill(value, [start], [end])

Thay thế tất cả các phần tử trong mảng với chỉ số &gt;= _start_ và &lt; _end_ bởi giá trị là _value_. Với _start_ mặc định là 0 và _end_ mặc định là độ dài _length_ của array.

**Chú ý**: _start_ hoặc _end_ có thể âm. Khi đó ta sẽ hiểu start tương ứng với chỉ số _length + start_ và end tương ứng với chỉ số _length + end_.

```js
var a = [2, 4, 5, 10];
a.fill(6);
console.log(a);
// => [6, 6, 6, 6]

a.fill(3, 1);
console.log(a);
// => [6, 3, 3, 3]

a.fill(2, 2, 4);
console.log(a);
// => [6, 3, 2, 2]

a.fill(5, -4, -2);
console.log(a);
// => [5, 5, 2, 2]
```

### Hàm array.push([e1], [e2], ...)

Thêm vào cuối của array giá trị *e1, e2,...* và trả về độ dài mới của mảng.

```js
var a = [];
console.log(a);
// => []

var len = a.push(10);
console.log(len, a);
// => 1 [10]

len = a.push(2, 3);
console.log(len, a);
// => 3 [10, 2, 3];

len = a.push([4, 1], "hihi");
console.log(len, a);
// => 5 [10, 2, 3, [4, 1], 'hihi']
```

### Hàm array.pop()

Bỏ đi phần tử cuối của mảng và trả về giá trị của phần tử đó. Nếu ban đầu mảng là rỗng thì kết quả trả về là _undefined_.

```js
var a = ["one", "two", "three"];
var t = a.pop();
console.log(t); // => three
console.log(a); // => ['one', 'two']

var e = [];
t = e.pop();
console.log(t); // => undefinded
```

### Hàm array.reverse()

Đảo ngược giá trị của mảng (phần tử cuối lên đầu và phần tử đầu tiên xuống cuối). Đồng thời trả về giá trị của mảng mới đã được reverse.

```js
var b = [9, 10, 11, 12];
var r = b.reverse();
console.log(b); // => [12, 11, 10, 9]
console.log(r); // => [12, 11, 10, 9]
```

### Hàm array.shift()

Bỏ đi phần tử đầu tiên của mảng và trả về giá trị của phần tử đó.

```js
var s = ["car", "bike", "train"];
var e = s.shift();
console.log(e); // => car
console.log(s); // => ['bike', 'train']
```

### Hàm array.unshift([e1], [e2], ...)

Thêm một hay nhiều phần tử vào đầu tiên của mảng và độ dài mới của mảng.

```js
var m = [1, 3, 5, 7];
var len = m.unshift(9, 8, NaN);
console.log(m); // => [9, 8, NaN, 1, 3, 5, 7]
console.log(len); // => 7
```

### Hàm array.splice(start, [deleteCount], [e1], [e2], ...)

Bỏ đi số lượng phần tử là _deleteCount_ tại vị trí _start_ và sau đó thêm vào đó các phần tử _e1, e2_. Kết quả trả về là mảng các phần tử bị bỏ đi.

**start**: nếu _start &gt;= 0_ thì _start_ là chỉ số tại phần tử bắt đầu thay đổi, ngược lại _start &lt; 0_ thì _start_ là số lượng phần tử tính từ cuối mảng.

**deleteCount**: Là số nguyên xác định số lượng phần tử bị xoá. Nếu _deleteCount = 0_ thì không phần tử nào bị xoá. Nếu bạn không sử dụng _deleteCount_ thì mặc định _deleteCount = (array.length - start)_, đồng nghĩa với các phần tử từ start đến cuối array sẽ bị xoá.

**e1, e2,...:** Thêm vào vị trí start các phần tử e1, e2,...

```js
var a = [10, 11, 12, 13];
var b = a.splice(2, 0);
console.log(a); // => [10, 11, 12, 13]
console.log(b); // => []

var c = a.splice(2, 1);
console.log(a); // => [10, 11, 13]
console.log(c); // => [12]

var d = a.splice(2, 1, 15, 16, 17);
console.log(a); // => [10, 11, 15, 16, 17]
console.log(d); // => [13]

var e = a.splice(-2, 1);
console.log(a); // => [10, 11, 15, 17]
console.log(e); // => [16]

var f = a.splice(2);
console.log(a); // => [10, 11]
console.log(f); // => [15, 17]
```

### Hàm array.concat([value1], [value2], ...)

Trả về mảng mới bằng cách lấy mảng hiện tại nối với các phần tử value1, value2,...

```js
var c = ["a", "b", "c"];
var d = [1, 2, 3];

var e = c.concat(d);
console.log(c); // => ['a', 'b', 'c']
console.log(e); // => ['a', 'b', 'c', 1, 2, 3]

var f = c.concat(1, 2);
console.log(f); // => ['a', 'b', 'c', 1, 2]

var g = c.concat(["hello", "hi"], 1);
console.log(g); // => ['a', 'b', 'c', 'hello', 'hi', 1]
```

### Hàm array.includes(searchElement, [fromIndex])

Kiểm tra xem trong mảng hiện tại tính từ _fromIndex_ có chứa phần tử _searchElement_ không. Nếu tồn tại thì trả về true, ngược lại thì trả về false.

**fromIndex**: Nếu không khai báo thì mặc định là 0. Nếu _fromIndex &lt; 0_ thì vị trí bắt đầu tìm kiếm là _array.length + fromIndex_.

```js
var a = [0, 2, 4, 6, 8];
console.log(a.includes(1)); // => false
console.log(a.includes(2)); // => true
console.log(a.includes(4, 1)); // => true
console.log(a.includes(4, 3)); // => false
console.log(a.includes(6, -2)); // => true
console.log(a.includes(2, -2)); // => false
```

### Hàm array.indexOf(searchElement, [fromIndex])

Trả về vị trí phần tử đầu tiên trong mảng có giá trị _searchElement_, tính từ vị trí _fromIndex_. Nếu không tìm thấy thì trả về -1.

**fromIndex**: Nếu không khai báo thì mặc định là 0. Nếu _fromIndex_ &gt; _array.length_ thì kết quả trả về là -1. Nếu _fromIndex_ &lt; 0 thì vị trí bắt đầu tìm kiếm là _array.length + fromIndex_. Nếu vị trí bắt đầu tìm kiếm &lt; 0 thì toàn bộ array sẽ được tìm kiếm.

```js
var a = [0, 2, 3, 4];
console.log(a.indexOf(2)); // => 1
console.log(a.indexOf(2, 2)); // => -1
console.log(a.indexOf(3, -2)); // => 2
console.log(a.indexOf(4, 10)); // => -1
```

### Hàm array.lastIndexOf(searchElement, [fromIndex])

Tương tự như _array.indexOf_, nhưng kết quả trả về sẽ là phần tử đầu tiên tìm được tính từ vị trí _fromIndex_ trở về đầu (tìm kiếm ngược lại so với _array.indexOf_).

```js
var x = [1, 2, 3, 4, 3, 2, 1];
console.log(x.lastIndexOf(2)); // => 5
console.log(x.lastIndexOf(3, 3)); // => 2
console.log(x.lastIndexOf(3, 5)); // => 2
```

### Hàm array.toString()

Convert tất cả các phần tử trong mảng thành string và ghép chúng thành một string mới. Nếu một phần tử là null hoặc undefined thì nó sẽ được convert thành string rỗng.

```js
var a = [1, 2, [3, 4], "hello", null, NaN, undefined];
var b = a.toString();
console.log(b);
// => 1,2,3,4,hello,,NaN,
```

### Hàm array.join([seperator])

Tương tự như _array.toString()_, tuy nhiên bạn có thể tuỳ biến thành phần phân cách. Lúc này các phần tử sẽ phân cách nhau bởi _seperator_. Nếu không được khai báo thì mặc định seperator là dấu phẩy ",".

```js
var a = [1, 2, [3, 4], "hello", null, NaN, undefined];
var b = a.join();
console.log(b);
// => 1,2,3,4,hello,,NaN,

var c = a.join("-");
console.log(c);
// => 1-2-3,4-hello--NaN-
```

## Thực hành

Cho một mảng các số. Hãy sắp xếp các số trong mảng theo thứ tự tăng dần bằng cách triển khai hàm sắp xếp theo những thuật toán sau:

- Sắp xếp chọn trực tiếp - selection sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/selection_sort_completejavascript.com.js))
- Sắp xếp chèn trực tiếp - insertion sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/insertion_sort_completejavascript.com.js))
- Sắp xếp chèn trực tiếp dựa vào tìm kiếm nhị phân - binary insertion sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/binary_insertion_sort_completejavascript.com.js))
- Sắp xếp đổi chỗ trực tiếp - interchange sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/interchange_sort_completejavascript.com.js))
- Sắp xếp nổi bọt - bubble sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/bubble_sort_completejavascript.com.js))
- Thuật toán shaker sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/shaker_sort_completejavascript.com.js))
- Sắp xếp nhanh - quick sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/quick_sort_completejavascript.com.js))
- Sắp xếp trộn - merge sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/merge_sort_completejavascript.com.js))
- Sắp xếp vun đống - heap sort ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/array_sorting/heap_sort_completejavascript.com.js))

Nếu bạn thấy khó khăn thì có thể xem cách mình triển khai các thuật toán sắp xếp bằng C/C++ tại [đây](https://thuattoan.phamvanlam.com/tong-hop-mot-so-thuat-toan-co-ban-ve-sap-xep-phan-1) và [đây](https://thuattoan.phamvanlam.com/tong-hop-mot-so-thuat-toan-co-ban-ve-sap-xep-phan-2).

Trên đây là một số những phương thức cơ bản về JavaScript array. Còn nhiều những phương thức khác, nhưng mình sẽ không trình bày ở bài viết này. Bạn có thể tham khảo thêm tại các link cuối bài viết.

Xin chào và hẹn gặp lại ở [bài viết sau](/array-sorting-van-de-muon-thuo), thân ái!

## Tham khảo

- [Array - JavaScript | MDN - Mozilla](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
