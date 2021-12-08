---
date: "2017-06-02T09:49:44Z"
update: "2021-10-14T16:25:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/javascript-foreach-la-cai-quai-gi-completejavascript.com_.png"
keywords: "forEach"
description: "Trong JavaScript, để duyệt array thì forEach là một hàm rất hay. Vậy hàm forEach trong JavaScript là như thế nào và cách sử dụng forEach JavaScript ra sao? Chúng ta hãy cùng tìm hiểu để làm chủ forEach js nhé!"
slug: javascript-foreach-la-cai-quai-gi
title: "JavaScript forEach là cái quái gì?"
series: "JavaScript: Các kiểu dữ liệu"
tags:
  - Array
  - Kiểu dữ liệu
---

Trong JavaScript, để duyệt [array](/array-la-gi-array-trong-javascript/) thì **forEach** là một hàm rất hay. Vậy hàm forEach trong JavaScript cụ thể là như thế nào? Cách sử dụng forEach JavaScript ra sao? Chúng ta hãy cùng tìm hiểu để làm chủ forEach js nhé!

## Đặt vấn đề

Cho một mảng [numbers](/kieu-du-lieu-trong-javascript/) = [1, 2, 3, 4, 5, 6,7, 8, 9, 10]. Hãy tính tổng các số trong mảng và hiển thị ra console.

Thông thường, chúng ta sẽ giải bài toán này như sau:

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;

for (let i = 0; i < numbers.length; i++) {
  sum += numbers[i];
}

console.log(sum);
// => 55
```

Cách giải trên là khá dễ hiểu. Chúng ta lấy từng phần tử trong mảng ra theo chỉ số, rồi cộng với biến _sum_.

Tuy nhiên có một vấn đề với cách này, đó là việc sử dụng chỉ số **i** có thể khiến bạn bị nhầm với một biến số trước đó. Dẫn đến những sai lầm không thể đoán trước.

Lúc này, **forEach** JavaScript xuất hiện giúp bạn giải quyết vấn đề trên.

### Cách triển khai hàm forEach JavaScript

Một cách đơn giản để triển khai hàm forEach như sau:

```js
function forEach(array, action) {
  for (let i = 0; i < array.length; i++) action(array[i]);
}
```

Hàm *forEach* trên nhận đầu vào là một mảng _array_ và một hàm _action_ - thực hiện hành động đối với mỗi phần tử của mảng (_array[i]_).

### Áp dụng hàm forEach để giải quyết bài toán trên

```js
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
let sum = 0;

forEach(numbers, function (element) {
  sum += element;
});

console.log(sum);
// => 55
```

Ta có thể diễn giải thuật toán trên bằng lới như sau: _Với mỗi phần tử trong mảng numbers, ta sẽ lấy nó ra và cộng dồn với biến sum. Kết quả thu được, sẽ ghi ra console._

Nếu so sánh với cách trình bày ở trên thì cách này rõ ràng sẽ dài hơn. Tuy nhiên, đây chỉ là một ví dụ cơ bản, nên ta sẽ không bàn về độ dài, ngắn của code. Vấn đề mình và bạn quan tâm trước tiên đó là: **code-đọc-dễ-hiểu**.

Theo quan điểm cá nhân mình thì việc sử dụng hàm **forEach** giúp code gần giống với ngôn ngữ tự nhiên hơn. Không biết quan điểm của bạn về vấn đề này thế nào?

## Giới thiệu hàm forEach trong JavaScript

Hàm forEach là gì? Hay vòng lặp forEach trong JavaScript là gì?

Trả lời: **forEach** là một phương thức có sẵn của [array](/array-sorting-van-de-muon-thuo/), để duyệt qua mỗi phần tử của mảng và thực hiện một hành động nào đó.

### Cú pháp

```js
arr.forEach(function callback(currentValue, index, array) {
    // your iterator
}[, thisArg]);
```

### Giải thích

- **callback**: Hàm callback là hàm để thực hiện với mỗi phần tử của mảng, bao gồm 3 tham số:
  - **currentValue**: phần tử hiện tại đang được xử lý của array.
  - **index**: chỉ số của phần tử hiện tại đang được xử lý của array.
  - **array**: mảng hiện tại đang gọi hàm forEach.
- **thisArg**: giá trị được sử dụng như là **this**, là tham chiếu tới đối tượng khi thực hiện hàm callback.

**Chú ý**: Nếu _thisArg_ bị bỏ qua thì mặc định giá trị đó là **undefined**.

### Ví dụ in ra nội dung của mảng

```js
function printContentArray(array) {
  array.forEach(function print(element) {
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

Counter.prototype.add = function (array) {
  array.forEach(function (entry) {
    this.sum += entry;
    ++this.count;
  }, this);
  // ^---- Note
};

const obj = new Counter();
obj.add([2, 5, 9]);
console.log(obj.count); // => 3
console.log(obj.sum); // => 16
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

## Một số từ khóa trong vòng lặp forEach JS

Khi so sánh với các vòng lặp khác, ngôn ngữ lập trình khác, bạn sẽ thấy một số từ khóa hay sử dụng trong vòng lặp như: **return**, **break** và **continue**.

Câu hỏi đặt ra là liệu những từ khóa này có sử dụng được trong vòng lặp forEach JavaScript hay không? Cách sử dụng của chúng có giống hay không?

Sau đây là câu trả lời.

### Từ khóa return trong forEach

Từ khóa **return** dùng để dừng lại một hàm và trả về giá trị từ hàm đó.

Giả sử, bạn cần viết một hàm tìm vị trí của số chẵn đầu tiên trong một mảng. Nếu không tìm thấy thì trả về giá trị -1.

Sau đây là code sử dụng vòng lặp for thông thường:

```js
function findFirstEvenIndex(arr) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] % 2 === 0) return i;
  }

  return -1;
}

// Example:
const arr = [1, 2, 3, 4, 5];
const ret = findFirstEvenIndex(arr);
console.log("ret=", ret);
// ret= 1
```

Nếu chuyển đoạn code trên sang forEach thì sẽ thế này:

```js
function findFirstEvenIndex(arr) {
  arr.forEach(function (item, i) {
    if (arr[i] % 2 === 0) return i;
  });

  return -1;
}

// Example:
const arr = [1, 2, 3, 4, 5];
const ret = findFirstEvenIndex(arr);
console.log("ret=", -1);
// ret= -1
```

Tại sao kết quả lại là **-1**?

Tại vì từ khóa **return** trong forEach chỉ có tác dụng để thoát khỏi hàm callback bên trong forEach mà thôi. Do đó, kết quả của hàm trên sẽ là giá trị của cái **return -1**.

Vì vậy, để giải quyết bài toán này mình khuyên bạn không nên dùng forEach. Thay vào đó bạn có thể dùng vòng lặp for thông thường như trên, hoặc sử dụng vòng lặp **for...in** như sau:

```js
function findFirstEvenIndex(arr) {
  for (let i in arr) {
    if (arr[i] % 2 === 0) return i;
  }

  return -1;
}

// Example:
const arr = [1, 2, 3, 4, 5];
const ret = findFirstEvenIndex(arr);
console.log("ret=", ret);
// ret= 1
```

### Từ khóa break trong forEach

Từ khóa **break** thường được dùng để thoát khỏi câu lệnh **switch** hoặc thoát khỏi vòng lặp (for, while, do ... while, for ... in).

Ví dụ đoạn code sau dùng để thoát khỏi vòng lặp for khi **i bằng 3**:

```js
const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  if (i === 3) break;
  console.log("i=", i);
}

/* Kết quả trên console:
i= 0
i= 1
i= 2
*/
```

Nếu sử dụng từ khóa break với forEach thì sao?

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach((item, i) => {
  if (i === 3) break;
  console.log("i=", i);
});

/* Kết quả trên console:
Uncaught SyntaxError: Illegal break statement
*/
```

Đúng vậy, bạn sẽ bị lỗi cú pháp **Illegal break statement** vì từ khóa break là không hợp lệ với forEach JS.

Nghĩa là bạn không thể sử dụng từ khóa break với forEach. Thay vào đó bạn có thể sử dụng vòng lặp **for** như trên hoặc dùng phương thức **Array.prototype.some()** để thay thế:

```js
const arr = [1, 2, 3, 4, 5];

arr.some(function (item, index) {
  if (index === 3) return true;
  console.log("i=", index);
});

/* Kết quả trên console:
i= 0
i= 1
i= 2
*/
```

### Từ khóa continue trong forEach

Từ khóa **continue** thường được dùng để bỏ qua một lượt lặp trong vòng lặp.

Ví dụ đoạn code sau dùng để bỏ qua lượt lặp khi **i bằng 3**:

```js
const arr = [1, 2, 3, 4, 5];

for (let i = 0; i < arr.length; i++) {
  if (i === 3) continue;
  console.log("i=", i);
}

/* Kết quả trên console:
i= 0
i= 1
i= 2
i= 4
*/
```

Nếu chuyển sang dùng với forEach:

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach(function(item, i) {
  if (i === 3) continue;
  console.log("i=", i);
});

/* Kết quả trên console:
Uncaught SyntaxError:
Illegal continue statement: no surrounding iteration statement
*/
```

Đúng vậy, bạn sẽ bị lỗi **Illegal continue statement: no surrounding iteration statement**. Vì từ khóa **continue** không hợp lệ trong forEach JavaScript.

Nghĩa là bạn cũng không thể dùng continue bên trong forEach được. Thay vào đó bạn có thể dùng vòng lặp for như trên hoặc sử dụng từ khóa **return** như sau:

```js
const arr = [1, 2, 3, 4, 5];

arr.forEach(function (item, i) {
  if (i === 3) return;
  console.log("i=", i);
});

/* Kết quả trên console:
i= 0
i= 1
i= 2
i= 4
*/
```

## Từ JavaScript forEach đến các phương thức khác

Ngoài forEach, JavaScript còn cung cấp một số phương thức khác, tương tự dành cho array. Đó là: _entries, every, filter, find, findIndex, keys, map, reduce, reduceRight, some, values._

### Hàm [array.prototype.entries()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries)

Trả về một mảng đối tượng mới, chứa **key/value** cho mỗi phần tử trong array.

```js
a.entries();
```

Để duyệt mảng đối tượng mới này, ta sử dụng vòng lặp **for...of**

```js
const a = ["a", "b", "c"];
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

### Hàm [array.prototype.every()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/every)

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

### Hàm [array.prototype.filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)

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

### Hàm [array.prototype.find()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find)

Trả về giá trị của phần tử đầu tiên trong mảng thoả mãn điều kiện cho trước, nếu không tìm thấy thì trả về **undefined**.

```js
var var1 = arr.find(callback[, thisArg])
```

Tham số truyền vào cũng giống hệt như hàm forEach.

Ví dụ sau tìm ra một [object](/object-la-gi-object-trong-javascript/) với tên của nó thoả mãn điều kiện cho trước:

```js
const inventory = [
  { name: "apples", from: "usa" },
  { name: "bananas", from: "vietnam" },
  { name: "cherries", from: "usa" },
  { name: "cherries", from: "china" },
];

function findCherries(fruit) {
  return fruit.name === "cherries";
}

console.log(inventory.find(findCherries));
// {name: 'cherries', from: 'usa'}
```

### Hàm [array.prototype.findIndex()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex)

Trả về chỉ số đầu tiên của phần tử thoả mãn điều kiện cho trước, ngược lại trả về -1.

```js
var id = arr.findIndex(callback[, thisArg])
```

Tham số truyền vào cũng giống hệt như hàm forEach.

Ví dụ sau tìm ra chỉ số object với tên của nó thoả mãn điều kiện cho trước:

```js
const inventory = [
  { name: "apples", from: "usa" },
  { name: "bananas", from: "vietnam" },
  { name: "cherries", from: "usa" },
  { name: "cherries", from: "china" },
];

function findCherries(fruit) {
  return fruit.name === "cherries";
}

console.log(inventory.findIndex(findCherries));
// => 2
```

### Hàm [array.prototype.map()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)

Trả về mảng mới với mỗi phần tử là kết quả của việc gọi hàm callback ứng với mỗi phần tử của mảng ban đầu.

```js
var new_array = arr.map(callback[, thisArg])
```

Tham số truyền vào cũng giống hệt như hàm forEach JavaScript.

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

## Kết luận

Trên đây là một số kiến thức cơ bản về forEach trong JavaScript. Hy vọng qua bài viết này bạn hiểu được forEach JavaScript là gì? Cách sử dụng forEach và khi nào nên sử dụng forEach JS.

Nếu bạn có thắc mắc thì hãy để lại bình luận xuống phía dưới. Mình sẽ cố gắng giải đáp khi có thể.

Chúc bạn thực hành vui vẻ và hẹn gặp lại ở [bài viết sau](/phan-biet-call-apply-va-bind-trong-javascript/), thân ái!

**Tham khảo:**

[Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)
