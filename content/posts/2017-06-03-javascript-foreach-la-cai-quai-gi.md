---
date: "2017-06-03T09:49:44Z"
template: "post"
cover: "../images/javascript-foreach-la-cai-quai-gi-completejavascript.com_.png"
keywords: "forEach"
description: "Trong JavaScript, để duyệt array thì forEach là một hàm rất hay. Vậy hàm forEach trong JavaScript là như thế nào và cách sử dụng forEach JavaScript ra sao?"
slug: javascript-foreach-la-cai-quai-gi
title: "JavaScript forEach là cái quái gì?"
categories:
  - Javascript cơ bản
tags:
  - Array
---

Trong JavaScript, để có thể duyệt [array](/javascript-array-co-ban/) thì **forEach** là một hàm rất hay. Vậy hàm **forEach** trong JavaScript cụ thể là như thế nào và cách sử dụng nó ra sao? Chúng ta sẽ cùng tìm hiểu ngay sau đây.

## Đặt vấn đề

Cho một mảng [numbers](/values-types-va-operators-trong-javascript-phan-1/) = [1, 2, 3, 4, 5, 6,7, 8, 9, 10]. Hãy tính tổng các số trong mảng và hiển thị ra console.

Thông thường, chúng ta sẽ giải bài toán này như sau:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;
for(let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}
console.log(sum);
// => 55
```

Cách giải trên là khá dễ hiểu. Chúng ta lấy từng phần tử trong mảng ra theo chỉ số, rồi cộng với biến _sum_.

Tuy nhiên có một vấn đề với cách này (cũng không hẳn là một vấn đề), đó là việc sử dụng chỉ số **i** có thể khiến bạn bị nhầm với một biến số trước đó. Dẫn đến những sai lầm không thể đoán trước.

Lúc này, **forEach** JavaScript xuất hiện giúp bạn giải quyết vấn đề trên.

### Cách triển khai hàm forEach trong JavaScript

Một cách đơn giản để triển khai hàm forEach như sau:

```js
function forEach(array, action){
  for(let i = 0; i < array.length; i++)
    action(array[i]);
}
```

Hàm *forEach* trên nhận đầu vào là một mảng _array_ và một hàm số _action_ - thực hiện hành động đối với mỗi phần tử của mảng (_array[i]_).

### Áp dụng hàm forEach để giải quyết bài toán trên

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;
forEach(numbers, function(element){
    sum += element;
});
console.log(sum);
// => 55
```

Ta có thể diễn giải thuật toán trên bằng lới như sau: _Với mỗi phần tử trong mảng numbers, ta sẽ lấy nó ra và cộng dồn với biến sum. Kết quả thu được, sẽ ghi ra console._

Nếu so sánh với cách trình bày ở trên thì cách này rõ ràng sẽ dài hơn. Tuy nhiên, đây chỉ là một ví dụ cơ bản, nên ta sẽ không bàn về độ dài, ngắn của code. Vấn đề mình và bạn quan tâm trước tiên đó là: **code-đọc-dễ-hiểu**.

Theo quan điểm cá nhân mình thì việc sử dụng hàm **forEach** giúp code gần giống với ngôn ngữ tự nhiên hơn. Không biết quan điểm của bạn về vấn đề này thế nào?

## Giới thiệu hàm forEach trong JavaScript

[JavaScript](/category/javascript-co-ban/) cung cấp sẵn phương thức **forEach **- là một phương thức có sẵn của [array](/array-sorting-van-de-muon-thuo/), để thực hiện hành động với mỗi phần tử của mảng.

### Cú pháp

```js
arr.forEach(function callback(currentValue, index, array) {
    // your iterator
}[, thisArg]);
```

### Giải thích

- **callback**: là hàm để thực hiện với mỗi phần tử của mảng, bao gồm 3 tham số:
- **currentValue**: phần tử hiện tại đang được xử lý của array.
- **index**: chỉ số của phần tử hiện tại đang được xử lý của array.
- **array**: mảng hiện tại đang gọi hàm forEach.
- **thisArg**: giá trị được sử dụng như là **this**, là tham chiếu tới đối tượng khi thực hiện hàm callback.

**Chú ý**: Nếu _thisArg_ bị bỏ qua thì mặc định giá trị đó là **undefined**.

### Ví dụ in ra nội dung của mảng

```js
function printContentArray(array){
  array.forEach(function print(element){
    console.log(element);
  });
}

printContentArray([1, 3, 5]);
/*
* 1
* 3
* 5
*/
```

### Ví dụ sử dụng _thisArg_

```js
function Counter() {
  this.sum = 0;
  this.count = 0;
}
Counter.prototype.add = function(array) {
  array.forEach(function(entry) {
    this.sum += entry;
    ++this.count;
  }, this);
  // ^---- Note
};

const obj = new Counter();
obj.add([2, 5, 9]);
console.log(obj.count); // => 3
console.log(obj.sum);   // => 16
```

## Ưu, nhược điểm của việc sử dụng forEach

Bất cứ thứ gì cũng có hai mặt của nó, **forEach** JavaScript cũng không ngoại lệ. Sau đây là một số ưu, nhược điểm của nó:

### Ưu điểm

- Code rõ ràng, gần với ngôn ngữ tự nhiên
- Trong nhiều trường hợp sẽ ngắn gọn hơn việc sử dụng _for_, _while_.

### Nhược điểm

- Chắc chắn code sẽ chạy chậm hơn so với việc sử dụng vòng lặp (tuy nhiên không đáng kể)
- Không giống các ngôn ngữ lập trình khác như C/C++, Java (hầu như chỉ sử dụng vòng lặp)

Trên đây là một số ưu, nhược điểm của việc sử dụng forEach. Mình không khuyên bạn nên sử dụng phương thức này. Đây chỉ đơn giản là một cách thức duyệt mảng, bạn có thể sử dụng nó hoặc bạn chỉ cần sử dụng vòng lặp for, while.

> It's the choice.

## Từ JavaScript forEach đến các phương thức khác

Ngoài forEach, JavaScript còn cung cấp một số phương thức khác, tương tự dành cho array. Đó là: _entries, every, filter, find, findIndex, keys, map, reduce, reduceRight, some, values._

### [array.prototype.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

Trả về một mảng đối tượng mới, chứa **key/value** cho mỗi phần tử trong array.

```js
a.entries()
```

Để duyệt mảng đối tượng mới này, ta sử dụng vòng lặp **for...of**

```js
const a = ['a', 'b', 'c'];
const iterator = a.entries();

for (let e of iterator) {
  console.log(e);
}
/*
* [0, 'a']
* [1, 'b']
* [2, 'c']
*/
```

### [array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

Trả về true nếu như tất cả các phần tử trong mảng thoả mãn 1 hàm kiểm tra, ngược lại trả về false.

```js
arr.every(callback[, thisArg])
```

Tham số truyền vào giống hệt với hàm forEach.

Ví dụ sau trả về true nếu tất cả các phần tử trong mảng thoả mãn đều >= 10:

```js
function isBigEnough(element, index, array) {
  return element >= 10;
}
console.log([12, 5, 8, 130, 44].every(isBigEnough)); // => false
console.log([12, 54, 18, 130, 44].every(isBigEnough)); // => true
```

### [array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

Giống như cái tên của nó, phương thức này dùng để lọc ra các phần tử trong mảng thoả mãn một điều kiện cho trước. Và trả về một mảng mới chứa những phần tử đó.

```js
var newArray = arr.filter(callback[, thisArg])
```

Tham số truyền vào giống hệt với hàm forEach.

Ví dụ sau lọc ra những phần tử trong mảng có giá trị >= 10:

```js
function isBigEnough(value) {
  return value >= 10;
}

const filtered = [12, 5, 8, 130, 44].filter(isBigEnough);
console.log(filtered);
// [12, 130, 44]
```

### [array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

Trả về giá trị của phần tử đầu tiên trong mảng thoả mãn điều kiện cho trước, nếu không tìm thấy thì trả về **undefined**.

```js
var var1 = arr.find(callback[, thisArg])
```

Tham số truyền vào cũng giống hệt như hàm forEach.

Ví dụ sau tìm ra một [object](/javascript-object-last-but-not-least/) với tên của nó thoả mãn điều kiện cho trước:

```js
const inventory = [
    {name: 'apples', from: 'usa'},
    {name: 'bananas', from: 'vietnam'},
    {name: 'cherries', from: 'usa'},
    {name: 'cherries', from: 'china'}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(inventory.find(findCherries));
// {name: 'cherries', from: 'usa'}
```

### [array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

Trả về chỉ số đầu tiên của phần tử thoả mãn điều kiện cho trước, ngược lại trả về -1.

```js
var id = arr.findIndex(callback[, thisArg])
```

Tham số truyền vào cũng giống hệt như hàm forEach.

Ví dụ sau tìm ra chỉ số object với tên của nó thoả mãn điều kiện cho trước:

```js
const inventory = [
    {name: 'apples', from: 'usa'},
    {name: 'bananas', from: 'vietnam'},
    {name: 'cherries', from: 'usa'},
    {name: 'cherries', from: 'china'}
];

function findCherries(fruit) {
    return fruit.name === 'cherries';
}

console.log(inventory.findIndex(findCherries));
// => 2
```

### [array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

Trả về mảng mới với mỗi phần tử là kết quả của việc gọi hàm callback ứng với mỗi phần tử của mảng ban đầu.

```js
var new_array = arr.map(callback[, thisArg])
```

Tham số truyền vào cũng giống hệt như hàm forEach trong JavaScript.

Ví dụ sau trả về mảng mới mà mỗi phần tử của mảng mới là căn bậc hai của phần tử tương ứng trong mảng ban đầu:

```js
const numbers = [1, 4, 9];
const roots = numbers.map(Math.sqrt);
console.log(roots);
// => [1, 2, 3]
console.log(numbers);
// => [1, 4, 9]
```

Những phương thức còn lại bạn có thể tham khảo thêm tại [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array). Mình sẽ không trình bày thêm vì bài viết sẽ quá dài.

## Thực hành

### 1. Flattening

Cho một mảng hai chiều. Hãy chuyển mảng đó thành mảng một chiều:

- Sử dụng phương thức [array.prototype.reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) và concat(). ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/iteration/iteration-flattening-completejavascript.com.js))
- Sử dụng vòng lặp for, while thông thường. ([tham khảo](https://github.com/completejavascript/practical-javascript/blob/master/iteration/loop-flattening-completejavascript.com.js))

Ví dụ:

```js
var arrays = [[1, 2, 3], [4, 5], [6]];
/*
* Your code here.
* // => [1, 2, 3, 4, 5, 6]
*/
```

### 2. Every and some

Hãy viết hàm every() và some() thoả mãn:

```js
console.log(every([NaN, NaN, NaN], isNaN));
// => true
console.log(every([NaN, NaN, 4], isNaN));
// => false
console.log(some([NaN, 3, 4], isNaN));
// => true
console.log(some([2, 3, 4], isNaN));
// => false
```

(tham khảo [every](https://github.com/completejavascript/practical-javascript/blob/master/iteration/every-prototype-completejavascript.com.js), [some](https://github.com/completejavascript/practical-javascript/blob/master/iteration/some-prototype-completejavascript.com.js)).

Chúc bạn thực hành vui vẻ và hẹn gặp lại ở [bài viết sau](/phan-biet-call-apply-va-bind-trong-javascript/)[,](/category/javascript-co-ban/) thân ái!

**Tham khảo:**

[Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
