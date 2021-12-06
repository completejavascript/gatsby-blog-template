---
date: "2017-05-29T07:00:00Z"
update: "2021-12-06T20:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/array-trong-javascript.png"
keywords: "array trong javascript"
description: "Array trong JavaScript là một loại object dùng để lưu trữ dữ liệu theo thứ tự. Sau đây là những kiến thức cơ bản về array trong JavaScript."
slug: array-la-gi-array-trong-javascript
title: "Array là gì? Array trong JavaScript"
series: "JavaScript: Các kiểu dữ liệu"
tags:
  - Array
  - Kiểu dữ liệu
---

Array trong JavaScript cũng là một loại [object](/object-la-gi-object-trong-javascript/). Nhưng array khác object bình thường ở chỗ là:

- Array (mảng) được thiết kế để **lưu trữ dữ liệu theo thứ tự**.
- Object (đối tượng) bình thường chỉ là tập hợp của các cặp **key-value**.

Sau đây, mình sẽ tìm hiểu chi tiết về array trong JavaScript.

## Khởi tạo array trong JavaScript

Có **hai cách** để khởi tạo array rỗng là:

- Sử dụng dấu ngoặc vuông `[]`.
- Sử dụng hàm khởi tạo `new Array()`.

```js
let a1 = [];
let a2 = new Array();
```

Trong đó, cú pháp sử dụng `[]` là phổ biển hơn cả vì cách này **nhanh và ngắn gọn hơn**.

Ngoài ra, bạn có thể khởi tạo array trong JavaScript với **một số phần tử cho trước**:

```js
let letters = ["a", "b", "c"];
```

Khi đó, các phần tử trong mảng được sắp xếp theo thứ tự, phần tử đầu tiên có chỉ số là `0`. Phần tử cuối cùng có chỉ số bằng độ dài mảng trừ đi 1 đơn vị.

Để truy cập các phần tử trong mảng, bạn sử dụng `arr[index]` với `index` là chỉ số của phần tử:

```js
let letters = ["a", "b", "c"];

console.log(letters[0]); // a
console.log(letters[1]); // b
console.log(letters[2]); // c

// trường hợp chỉ số ngoài phạm vi giới hạn thì kết quả là undefined
console.log(letters[-1]); // undefined
console.log(letters[3]); // undefined
```

Bạn cũng có thể thay đổi giá trị của phần tử trong mảng:

```js
let letters = ["a", "b", "c"];

// thay đổi giá trị của mảng tại chỉ số 0
letters[0] = "A";
console.log(letters[0]); // A
```

Hoặc thêm phần tử mới vào mảng:

```js
let letters = ["a", "b", "c"];

// thêm phần tử vào mảng tại chỉ số 3
letters[3] = "d";
console.log(letters[3]); // d
```

## Một số đặc điểm của array trong JavaScript

Tổng số phần tử trong mảng được xác định qua thuộc tính `length`:

```js
let letters = ["a", "b", "c"];

console.log(letters.length); // 3
```

Bạn có thể in ra toàn bộ giá trị của mảng:

```js
let letters = ["a", "b", "c"];

console.log(letters); // (3) ['a', 'b', 'c']
```

Giá trị các phần tử trong mảng có thể thuộc bất kỳ [kiểu dữ liệu](/kieu-du-lieu-trong-javascript/) nào:

```js
let arr = [
  "a", // string
  1, // number
  null, // null
  undefined, // undefined
  { x: 1 }, // object
  function () {
    // hàm
    console.log("hello");
  },
];

// giá trị tại chỉ số 4 là object { x: 1}
console.log(arr[4].x); // 1

// giá trị tại chỉ số 5 là hàm
arr[5](); // hello
```

Tương tự như object, array có thể **có hoặc không** dùng "dấu phẩy đuôi" - dấu phẩy sau phần tử cuối cùng.

```js{9}
let arr = [
  "a",
  1,
  null,
  undefined,
  { x: 1 },
  function () {
    console.log("hello");
  },
];
```

Việc thêm dấu phẩy sau phần tử cuối cùng giúp **phần biểu diễn các thuộc tính giống nhau**. Qua đó, việc **thêm/xóa** phần tử trở nên dễ dàng hơn.

## Một số phương thức cơ bản của array

Một số phương thức cơ bản của array trong JavaScript là: `arr.pop()`, `arr.push()`, `arr.shift()` và `arr.unshift()`.

► Phương thức [`arr.pop()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)

Lấy ra và trả về phần tử cuối cùng của mảng.

```js
let letters = ["a", "b", "c"];
let item = letters.pop();

console.log(item); // c
console.log(letters); // (2) ['a', 'b']
```

► Phương thức [`arr.push()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)

Thêm **một hoặc nhiều** phần tử vào cuối mảng và trả về độ dài mới của mảng.

```js
let letters = ["a", "b", "c"];

// thêm một phần tử vào cuối mảng
let length = letters.push("d");
console.log(length); // 4
console.log(letters); // (4) ['a', 'b', 'c', 'd']

// thêm nhiều phần tử vào cuối mảng
length = letters.push("e", "f");
console.log(length); // 6
console.log(letters); // (6) ['a', 'b', 'c', 'd', 'e', 'f']
```

► Phương thức [`arr.shift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)

Lấy ra và trả về phần tử đầu tiên của mảng.

```js
let letters = ["a", "b", "c"];
let item = letters.shift();

console.log(item); // a
console.log(letters); // (2) ['b', 'c']
```

► Phương thức [`arr.unshift()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)

Thêm **một hoặc nhiều** phần tử vào đầu mảng.

```js
let letters = ["a", "b", "c"];

// thêm một phần tử vào đầu mảng
let length = letters.unshift("d");
console.log(length); // 4
console.log(letters); // (4) ['d', 'a', 'b', 'c']

// thêm nhiều phần tử vào đầu mảng
length = letters.unshift("e", "f");
console.log(length); // 6
console.log(letters); // (6) ['e', 'f', 'd', 'a', 'b', 'c']
```

## Mối liên hệ giữa array và object

Như mình đã nói ở trên, array về bản chất cũng là object. Cú pháp truy cập phần tử của mảng `arr[index]` tương tự như cú pháp của object `obj[key]`. Nói cách khác, `index` ở array tương đương `key` của object.

Và khi **copy array** thì đó cũng là **copy qua tham chiếu** - tương tự như [copy object](/copy-object-trong-javascript/):

```js
let letters = ["a", "b", "c"];
let copied = letters;

// giá trị của copied hoàn toàn giống letters
console.log(copied); // (3) ['a', 'b', 'c']

// khi thay đổi giá trị của copied
copied[1] = "new value";

// giá trị của letters cũng thay đổi
console.log(letters[1]); // new value
```

Điều đặc biệt hơn của array so với object là: array lưu trữ dữ liệu theo thứ tự.

[JavaScript Engine](/javascript-la-gi/#javascript-engine-là-gì) sẽ cố gắng lưu trữ các phần tử của mảng vào các vùng nhớ liên tiếp nhau. Và tối ưu hóa để làm sao truy cập các phần tử mảng nhanh nhất.

Nhưng tất cả những điều này sẽ không còn đúng nữa, nếu bạn **sử dụng array theo kiểu của object**, ví dụ:

```js
// mảng ban đầu có 3 phần tử
let letters = ["a", "b", "c"];

// thêm một phần tử vào mảng ở chỉ số lớn hơn kích thước mảng
letters[1000] = "d";
console.log(letters[1000]); // d

// thêm thuộc tính với tên tùy ý vào mảng
letters.x = 100;
console.log(letters.x); // 100

// độ dài của mảng tăng bất thường
console.log(letters.length); // 1001
```

Cách sử dụng trên **không có lỗi cú pháp** nhưng không đúng với ý nghĩa khi tạo ra **array trong JavaScript**.

Mục đích của array là để lưu trữ dữ liệu theo thứ tự. Nếu bạn muốn lưu trữ thuộc tính với key bất kỳ thì hãy sử dụng object thông thường `{}`.

## Duyệt tất cả các phần tử trong mảng

Cách cơ bản nhất để **duyệt tất cả các phần tử** của mảng trong JavaScript là dùng [vòng lặp for](/vong-lap-trong-javascript/) với chỉ số:

```js{3}
let letters = ["a", "b", "c"];

for (let i = 0; i < letters.length; i++) {
  console.log(letters[i]);
}
```

Kết quả:

```
a
b
c
```

Nếu không quan tâm đến chỉ số, bạn có thể dùng vòng lặp `for...of` cho ngắn gọn hơn:

```js{3}
let letters = ["a", "b", "c"];

for (let value of letters) {
  console.log(value);
}
```

Ngoài ra, bạn cũng có thể dùng vòng lặp `for...in` tương tự như cách duyệt tất cả các key trong object:

```js{3}
let letters = ["a", "b", "c"];

for (let key in letters) {
  console.log(letters[key]);
}
```

Cách sử dụng `for...in` không sai, nhưng có một số vấn đề là:

- Cách này không tối ưu cho duyệt mảng nên thường chậm hơn hai cách trên.
- Đối với một số object dạng "array-like", ngoài `length` và chỉ số ra thì "array-like" còn có thêm một số thuộc tính khác nữa. Việc sử dụng `for...in` sẽ duyệt hết tất cả các thuộc tính (bao gồm dạng số và không phải dạng số). Điều này là không cần thiết.

Nói chung, không nên sử dụng `for...in` để duyệt hết tất cả các phần tử của array trong JavaScript.

## Vấn đề liên quan đến `length` của array

Thuộc tính `length` được tự động cập nhật mỗi khi bạn thêm/xóa phần tử trong mảng. Nhưng `length` không thật sự biểu thị số lượng phần tử trong mảng.

Giá trị của `length` bằng chỉ số lớn nhất trong mảng cộng thêm 1 đơn vị, ví dụ:

```js
let arr = [];
arr[1000] = "a";
console.log(arr.length); // 1001
```

> **Chú ý:** đây chỉ là ví dụ minh họa, bạn **không nên** sử dụng array theo cách này.

Thuộc tính `length` là **writable**. Nghĩa là bạn có thể thay đổi giá trị của thuộc tính `length`.

Nếu bạn tăng nó lên thì không sao. Nhưng ngược lại, nếu bạn giảm giá trị của `length` thì mảng sẽ bị cắt ngắn đi:

```js
let letters = ["a", "b", "c"];
console.log(letters.length); // 3

// giảm length xuống thành 2
letters.length = 2;
console.log(letters); // (2) ['a', 'b']

// tăng length thành 5
letters.length = 5;
console.log(letters[2]); // undefined - giá trị cũ là "c"
```

Trong ví dụ trên, khi bạn giảm `length` rồi tăng `length` trở lại, giá trị trước đó trong mảng (`letters[2]`) không được khôi phục trở lại.

> 💡 Cách đơn giản nhất để xóa mảng là gán `length` bằng 0: `arr.length = 0`.

## Vấn đề về cú pháp `new Array()`

Đây là một cú pháp khác để khởi tạo array trong JavaScript:

```js
let letters = new Array("a", "b", "c");

console.log(letters); // (3) ['a', 'b', 'c']
```

Cú pháp trên khởi tạo array với ba phần tử tương tự như sau:

```js
let letters = ["a", "b", "c"];
```

Tuy nhiên, việc sử dụng `new Array()` lại khá ít dùng vì nó chậm và có một trường hợp khó hiểu.

Câu lệnh `new Array(number)` với `number` là một số, không khởi tạo mảng có 1 phần tử là `number` mà khởi tạo mảng có `number` phần tử.

```js
// Tham số truyền vào là string
let arr1 = new Array("1");
console.log(arr1); // ["1"]

// Tham số truyền vào là số
let arr2 = new Array(1);
console.log(arr2); // [empty]
```

> 💡 Để tránh nhầm lẫn, bạn chỉ nên sử dụng dấu ngoặc vuông `[]` để khởi tạo mảng (trừ khi bạn có mục đích đặc biệt nào khác).

## Mảng nhiều chiều

Mảng trong JavaScript có thể chứa phần tử cũng là một mảng. Đó gọi là **mảng nhiều chiều**.

Ví dụ sử dụng mảng hai chiều để lưu ma trận 2x2:

```js
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

// truy cập phần tử ở hàng 1, cột 1
console.log(matrix[1][1]); // 5
```

## Phương thức `toString()`

Array có triển khai phương thức `toString()` theo cách riêng. Phương thức này trả về một string chứa giá trị của các phần tử mảng - được ngăn cách nhau bởi dấu phẩy:

```js
let letters = ["a", "b", "c"];
console.log(letters.toString()); // a,b,c
```

Ví dụ cộng array với số:

```js
console.log([] + 3); // 3
console.log([1] + 3); // 13
console.log([1, 2] + 3); // 1,23
```

Bởi vì, array không có phương thức [`Symbol.toPrimitive` và `valueOf()`](/phuong-thuc-object-va-this-trong-javascript/) mà chỉ có phương thức `toString()`.

Vì vậy khi thực hiện phép cộng trên, `[]` trở thành string rỗng, `[1]` trở thành `"1"` và `[1,2]` trở thành `"1,2"`. Nên đoạn code trên tương đương với:

```js
console.log("" + 3); // 3
console.log("1" + 3); // 13
console.log("1,2" + 3); // 1,23
```

Tiếp theo, khi cộng string với số thì số sẽ được [chuyển đổi kiểu dữ liệu](/kieu-du-lieu-trong-javascript/) về string. Nên kết quả thu được như trên.

## So sánh array trong JavaScript

Tương tự như object, array cũng là kiểu dữ liệu tham chiếu. Vì vậy, việc so sánh array là **so sánh qua tham chiếu**.

Nghĩa là hai array chỉ bằng nhau khi chúng cùng tham chiếu. Ngược lại, dù cho hai array có các phần tử giống nhau thì chúng cũng không bằng nhau.

```js
let a = [];
let b = [];

// a và b cùng là mảng rỗng nhưng không bằng nhau
console.log(a === a); // true
console.log(a === b); // false
```

Để so sánh hai array với nhau theo giá trị các phần tử, bạn có thể tham khảo cách mình triển khai với object trong bài viết: [So sánh hai object trong JavaScript](/so-sanh-object-trong-javascript/).

## Tổng kết

Array trong JavaScript là một loại object đặc biệt dùng để lưu trữ dữ liệu theo thứ tự.

Để khởi tạo array, bạn có hai cách:

```js
// cách phổ biến
let a1 = [item1, item2,...];

// cách ít dùng
let a2 = new Array(item1, item2,...);
```

Cách gọi `new Array(number)` với `number` là số sẽ tạo một mảng mới có giá trị `length` là `number`, nhưng lại không có phần tử nào.

Thuộc tính `length` có giá trị là độ dài của mảng, chính xác hơn thì `length` bằng giá trị chỉ số lớn nhất cộng thêm 1 đơn vị. Mỗi khi bạn thêm/xóa phần tử trong mảng thì thuộc tính `length` tăng/giảm tương ứng.

Nhưng bạn cũng có thể thay đổi trực tiếp giá trị của `length`. Nếu giá trị của `length` giảm đi thì mảng cũng bị cắt ngắn đi. Và khi `length` bằng 0, đồng nghĩa với mảng bị xóa.

Một số phương thức phổ biến trong mảng là:

- `arr.push(item1, item2,...)`: thêm một hoặc nhiều phần tử vào cuối mảng.
- `arr.pop()`: lấy ra và trả về phần tử cuối cùng của mảng.
- `arr.shift()`: lấy ra và trả về phần tử đầu tiên của mảng.
- `arr.unshift(item1, item2,...)`: thêm một hay nhiều phần tử vào đầu mảng.

Có ba cách để duyệt hết tất cả các phần tử của mảng:

- Vòng lặp `for` với chỉ số `for (let i=0; i < arr.length; i++)`: cách này chạy nhanh nhất.
- Vòng lặp `for (let item of arr)`: cách này ngắn gọn, nên dùng khi không quan tâm chỉ số.
- Vòng lặp `for (let i in arr)`: cách này không tối ưu cho array, **không nên dùng**.

So sánh array thực chất là so sánh theo tham chiếu. Để so sánh từng phần tử của mảng, bạn có thể dùng vòng lặp `for...of` để duyệt hết tất cả các phần tử hoặc sử dụng thư viện [`_.isEqual`](https://docs-lodash.com/v4/is-equal/).

## Thực hành

### Bài 1

Đoạn code sau hiển thị như thế nào:

```js
let letters = ["a", "b", "c"];
let otherArr = letters;
otherArr.push("d");

// giá trị length của letters bằng bao nhiêu?
console.log(letters.length); // ?
```

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

Kết quả là: 4

Giải thích:

- Bởi vì array là kiểu dữ liệu tham chiếu, nên khi gán `otherArr = letters` thì `otherArr` có cùng tham chiếu với `letters`.
- Câu lệnh `otherArr.push("d")` thêm phần tử mới vào `otherArr` thì cũng làm thay đổi `letters`.

</div>
  </div>
</div>

### Bài 2

Hãy viết code thực hiện các bước sau:

1. Tạo mảng `letters` với hai phần tử "a" và "b".
2. Thêm phần tử "c" vào cuối mảng.
3. Thay đổi giá trị của phần tử ở giữa thành "d".
4. Lấy ra và trả về giá trị phần tử đầu tiên của mảng.
5. Thêm hai số 1, 2 vào đầu mảng.

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

```js
// 1. Tạo mảng `letters` với hai phần tử "a" và "b".
let letters = ["a", "b"];

// 2. Thêm phần tử "c" vào cuối mảng.
letters.push("c");

// 3. Thay đổi giá trị của phần tử ở giữa thành "d".
let length = letters.length;
letters[Math.floor(length / 2)] = "d";
console.log(letters); // (3) ['a', 'd', 'c']

// 4. Lấy ra và trả về giá trị phần tử đầu tiên của mảng.
let first = letters.shift();
console.log(first); // a

// 5. Thêm hai số 1, 2 vào đầu mảng.
letters.unshift(1, 2);
console.log(letters); // (4) [1, 2, 'd', 'c']
```

</div>
  </div>
</div>

### Bài 3

Kết quả hiển thị là gì?

```js
let letters = ["a", "b"];

letters.push(function () {
  alert(this);
});

letters[2](); // ?
```

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

```js{7}
let letters = ["a", "b"];

letters.push(function () {
  console.log(this);
});

letters[2](); // a,b,function(){...}
```

Cách viết `letters[2]` tương tự như cách truy cập phần tử trong object `obj[key]`. Mà giá trị tại `letters[2]` là một hàm. Nói cách khác, đó là phương thức của object.

Vì vậy, giá trị của [`this`](/phuong-thuc-object-va-this-trong-javascript/) được bind với đối tượng gọi phương thức. Nên `this` chính là `letters`.

</div>
  </div>
</div>

### Bài 4

Viết hàm `sumInput` thực hiện các yêu cầu sau:

1. Sử dụng hàm [`prompt`](/ham-tuong-tac-nguoi-dung-alert-confirm-prompt/) để yêu cầu người dùng nhập vào các số và lưu vào một mảng.
2. Dừng hỏi người dùng khi giá trị nhập vào không phải là số bình thường.
3. Tính và in ra tổng các số người dùng nhập.

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

```js
// định nghĩa hàm
function sumInput() {
  // khởi tạo mảng rỗng để lưu số
  let arr = [];

  // 1. hỏi người dùng để nhập vào số
  while (true) {
    let n = prompt("Nhập vào một số:", 0);

    // 2. kiểm tra điều kiện dừng
    if (n === "" || n === null || n === undefined || !isFinite(n)) {
      break;
    }

    // lưu lại số vào mảng
    arr.push(+n);
  }

  // 3. tính tổng các số nhập vào
  let s = 0;
  for (let num of arr) {
    s += num;
  }
  return s;
}

// gọi hàm
sumInput();
```

</div>
  </div>
</div>

Tham khảo:

- [MDN Arrays](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)
- [Arrays](https://javascript.info/array)
