---
date: "2018-01-03T06:00:07Z"
update: "2018-12-26T06:00:07Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/remove-item-in-array-javascript-completejavascript.com_.png"
keywords: "Remove item in Array JavaScript"
description: "Remove item in Array JavaScript - bạn thường thực hiện việc này theo mutable ways hay immutable ways. Hãy xem các cách mà mình áp dụng sau đây."
slug: remove-item-in-array-javascript
title: "Remove item in Array JavaScript"
series: "JavaScript: Thủ thuật JavaScript"
tags:
  - Array
---

**Remove item in Array JavaScript** là một bài toán mà hầu hết mọi người đều gặp phải khi lập trình JavaScript. Để giải quyết bài toán này, JavaScript cung cấp rất nhiều giải pháp khác nhau. Mỗi giải pháp lại có một ưu, nhược điểm riêng và phù hợp với từng bài toán cụ thể. Vì vậy, bài viết này sẽ tổng hợp lại các cách để loại bỏ một hoặc nhiều phần tử ra khỏi [Array](/array-la-gi-array-trong-javascript/) trong JavaScript.

Về cơ bản, các cách mà mình trình bày sau đây sẽ được chia ra làm 2 loại:

- **Mutable ways**: làm thay đổi mảng gốc
- **Immutable ways**: không làm thay đổi mảng gốc (phù hợp với **Functional Programming**)

Về chi tiết, mời bạn theo dõi bài viết!

## Remove item in Array JavaScript theo mutable ways

### Loại bỏ phần tử cuối cùng với pop()

Phương thức [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) loại bỏ phần tử cuối cùng của mảng và trả về giá trị phần tử đó. Nếu mảng rỗng thì giá trị trả về sẽ là **undefinded**.

Ví dụ:

```js
const arr = ["a", "b", "c", "d"];
console.log(arr); // => (4) ["a", "b", "c", "d"]

const item = arr.pop();
console.log(arr); // => (3) ["a", "b", "c"]
console.log(item); // => d
```

### Loại bỏ phần tử đầu tiên với shift()

Phương thức [shift()](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) loại bỏ phần tử đầu tiên của mảng và trả về giá trị phần tử đó. Nếu mảng rỗng thì giá trị trả về sẽ là **undefinded**.

Ví dụ:

```js
const arr = ["a", "b", "c", "d"];
console.log(arr); // => (4) ["a", "b", "c", "d"]

const item = arr.shift();
console.log(arr); // => (3) ["b", "c", "d"]
console.log(item); // => a
```

### Loại bỏ một hay nhiều phần tử tại vị trí xác định với splice()

Thực tế, phương thức [splice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) không chỉ loại bỏ một hay nhiều phần tử của Array mà nó còn có thể thêm phần tử vào Array. Tuy nhiên, trong phạm vi bài viết này, mình sẽ chỉ đề cập tới vấn đề loại bỏ phần tử khỏi Array.

Cú pháp sử dụng **splice()** để loại bỏ phần tử của Array Javascript là:

```js
array.splice(start, deleteCount);
```

Trong đó:

- **start**: đơn giản là vị trí phần tử bắt đầu bị loại bỏ khỏi mảng.
- **deleteCount**: là số lượng phần tử bị loại bỏ.
- **Giá trị trả về** chính là mảng các phần tử bị loại bỏ.

Ví dụ:

```js
const arr = ["a", "b", "c", "d"];
console.log(arr); // => (4) ["a", "b", "c", "d"]

const removed = arr.splice(1, 2);
console.log(arr); // => (2) ["a", "d"]
console.log(removed); // => (2) ["b", "c"]
```

Trong đoạn code trên, câu lệnh **arr.splice(1, 2)** loại bỏ phần tử khỏi mảng bắt đầu từ vị trí có chỉ số là 1 (ứng với 'b') và số phần tử bị loại bỏ là 2. Do đó, 2 phần tử bị loại bỏ sẽ là 'b' và 'c'.

Vì vậy, mảng các phần tử bị loại bỏ là **["b", "c"]** và mảng ban đầu trở thành **["a", "d"]**.

## Remove item in Array JavaScript theo immutable ways

### Loại bỏ phần tử trong mảng dựa vào chỉ số với slice() và concat()

Giả sử mình cần loại bỏ 1 phần tử ở chỉ số **i** khỏi mảng **arr**. Khi đó, ý tưởng để giải quyết bài toán này là: mình sẽ sử dụng phương thức [slice()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) 2 lần để copy từ mảng ban đầu ra 2 mảng con mới (không làm thay đổi mảng ban đầu).

Lần thứ nhất, mình copy ra các phần tử từ vị trí **0** đến vị trí **i - 1**. Lần thứ hai, mình copy ra các phần tử từ vị trí **i + 1** đến **phần tử cuối cùng**.

Sau đó, mình sẽ sử dụng phương thức [concat()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) để ghép 2 mảng con đó lại thành 1 mảng duy nhất thỏa mãn yêu cầu bài toán.

Ví dụ:

```js
const arr = ["a", "b", "c", "d", "e"];
console.log(arr); // => (5) ["a", "b", "c", "d", "e"]

const i = 2;
const a1 = arr.slice(0, i);
const a2 = arr.slice(i + 1, arr.length);
const new_arr = a1.concat(a2);

console.log(arr); // => (5) ["a", "b", "c", "d", "e"]
console.log(new_arr); // => (4) ["a", "b", "d", "e"]
```

Ngoài ra, bạn có thể sử dụng [spread operator](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) để ghép 2 array lại với nhau như sau:

```js
const new_arr = [...a1, ...a2];
```

Trên đây là cách loại bỏ một phần tử khỏi mảng, tuy nhiên bạn cũng có thể áp dụng nó để loại bỏ nhiều phần tử dựa vào chỉ số và số lượng phần tử.

Ví dụ:

```js
const arr = ["a", "b", "c", "d", "e"];
console.log(arr); // => (5) ["a", "b", "c", "d", "e"]

const i = 1;
const amount = 2;
const a1 = arr.slice(0, i);
const a2 = arr.slice(i + amount, arr.length);
const new_arr = a1.concat(a2);

console.log(arr); // => (5) ["a", "b", "c", "d", "e"]
console.log(new_arr); // => (3) ["a", "d", "e"]
```

Đoạn code trên loại bỏ 2 phần tử từ vị trí có chỉ số 1 trong mảng, đó là "b" và "c".

### Loại bỏ phần tử trong mảng dựa vào giá trị với filter()

Trong trường hợp bạn biết giá trị của phần tử muốn loại bỏ khỏi mảng thì có thể sử dụng phương thức [filter()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter). Phương thức này sẽ tạo ra một mảng mới chứa tất cả những phần tử thỏa mãn testing [function](/ham-la-gi-ham-trong-javascript/).

Ví dụ:

```js
const arr = ["a", "b", "c", "d", "e"];
console.log(arr); // => (5) ["a", "b", "c", "d", "e"]

const valueToRemove = "b";
const new_arr = arr.filter((item) => item !== valueToRemove);

console.log(arr); // => (5) ["a", "b", "c", "d", "e"]
console.log(new_arr); // => (4) ["a", "c", "d", "e"]
```

Đoạn code trên sẽ tạo ra một mảng mới bao gồm các phần tử có giá trị khác với giá trị cần remove là "b". Dĩ nhiên, bạn có thể dùng cách này để loại bỏ nhiều phần tử.

Ví dụ:

```js
const arr = ["a", "b", "c", "d", "e"];
console.log(arr); // => (5) ["a", "b", "c", "d", "e"]

const valuesToRemove = ["b", "e"];
const new_arr = arr.filter((item) => !valuesToRemove.includes(item));

console.log(arr); // => (5) ["a", "b", "c", "d", "e"]
console.log(new_arr); // => (3) ["a", "c", "d"]
```

Hoặc bạn cũng có thể thay đổi hàm test trên để loại bỏ một hoặc nhiều phần tử khỏi mảng thỏa mãn những yêu cầu tùy thích.

## Lời kết

Như vậy là mình giới thiệu với bạn một số cách để loại bỏ một hoặc nhiều phần tử ra khỏi Array trong JavaScript. Vậy trong những cách đó, bạn thích cách nào nhất?

Ngoài ra, bạn có biết thêm những cách nào khác nữa không? Nếu có thì không ngại chia sẻ với mình nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!

**Tham khảo:**

- [9 Ways to Remove Elements From A JavaScript Array](https://love2dev.com/blog/javascript-remove-from-array/)
- [How to remove an item from an Array in JavaScript](https://flaviocopes.com/how-to-remove-item-from-array/)
