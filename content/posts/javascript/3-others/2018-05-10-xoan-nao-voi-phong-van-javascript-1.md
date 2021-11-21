---
date: "2018-05-10T00:00:25Z"
update: "2018-05-10T00:00:25Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/xoan-nao-voi-phong-van-javascript-1-completejavascript.com_.png"
keywords: "Xoắn não với phỏng vấn JavaScript 1"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 1 trong chuyên mục những câu hỏi phỏng vấn JavaScript. Hôm nay, mình sẽ giới thiệu với các bạn những câu đố cực kỳ hóc búa về JavaScript."
slug: xoan-nao-voi-phong-van-javascript-1
title: "Xoắn não với phỏng vấn JavaScript 1"
series: "JavaScript Quiz"
tags:
  - ES6
  - IIFE
  - Quiz
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 1** trong chuyên mục những câu hỏi phỏng vấn JavaScript. Hôm nay, mình sẽ giới thiệu với các bạn những câu đố cực kỳ hóc búa về JavaScript.

Việc suy nghĩ trả lời những câu hỏi đó sẽ giúp bạn hiểu rõ hơn về ngôn ngữ lập trình này. Rồi bạn sẽ cảm thấy tự tin hơn với kiến thức của mình. Còn trường hợp bạn không thể trả lời được thì cũng đừng buồn nhé!

> You are not alone.

Nào, bắt tay vào tìm hiểu thôi và nhớ là hãy suy nghĩ thật kĩ trước khi chạy thử hoặc xem đáp án nhé!

## Xoắn não với phỏng vấn JavaScript 1 - Câu 1

```js
const x = [1, 2, 3];
x[-1] = -1;
console.log(x[x.indexOf(10000)]);
```

Hỏi console in ra kết quả như thế nào?

<div class="wrap-collapsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án**: -1

**Giải thích**:

Theo mình đánh giá thì đây là một câu hỏi khá hay. Vì bạn sẽ học được 3 thứ sau:

- Sử dụng [const](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/const) (hằng số)
- Sử dụng chỉ số âm trong mảng
- Phương thức [Array.prototype.indexOf()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf)

**1. Sử dụng const (hằng số)**

Theo quan niệm thông thường, khi bạn khai báo một biến là hằng số thì giá trị của nó sẽ không bao giờ thay đổi. Tuy nhiên, const trong JavaScript sẽ hơi khác một chút, cụ thể như này:

> The **const** declaration creates a read-only reference to a value. It does **not** mean the value it holds is immutable, just that the variable identifier cannot be reassigned. For instance, in the case where the content is an object, this means the object's contents (e.g., its parameters) can be altered.\_

**Nghĩa là sao?**

Nghĩa là chỉ có **địa chỉ** của biến số là không thay đổi. Còn **giá trị** của biến số vẫn có thể thay đổi. Bây giờ, mình sẽ xét 3 kiểu dữ liệu chính của biến số là: [Number](/kieu-du-lieu-trong-javascript/), [Object](/javascript-object-last-but-not-least/) và [Array](/javascript-array-co-ban/) (chú ý: String và Boolean sẽ giống với trường hợp của Number).

**Number**

```js
const x = 1;
x = 2;
// => TypeError: Assignment to constant variable.
```

Trường hợp này, x là kiểu Number, mà bạn lại gán x cho một số khác. Thì thực chất bạn đã thay đổi địa chỉ của biến x rồi. Nên lỗi trên xảy ra là đương nhiên.

**Object**

**Trường hợp 1:**

```js
const a = { x: 1, y: 2 };

a.x = 10;
a.y = 20;
a.z = 30;
console.log(a);
// => {x: 10, y: 20, z: 30}
```

Trường hợp 1 đúng vì bạn chỉ thay đổi giá trị các thành phần bên trong object a. Bản thân object a vẫn giữ nguyên địa chỉ ban đầu.

**Trường hợp 2:**

```js
const a = { x: 1, y: 2 };

a = { x: 10, y: 20 };
// => TypeError: Assignment to constant variable.
```

Trường hợp 2 bị lỗi trên vì bạn đã gán biến a cho một object hoàn toàn mới – địa chỉ khác với object ban đầu.

**Array**

**Trường hợp 1:**

```js
const a = [1, 2];

a[0] = 10;
a[1] = 20;
a[2] = 30;
console.log(a);
// => [10, 20, 30]
```

Cũng tương tự như object, bạn chỉ thay đổi giá trị các thành phần bên trong array a. Bản thân địa chỉ array a vẫn không thay đổi.

**Trường hợp 2:**

```js
const a = [1, 2];
a = [10, 20, 30];
// => TypeError: Assignment to constant variable.
```

Lại tương tự như object, bạn đã gán biến a cho một array hoàn toàn mới nên kết quả là bị lỗi như trên.

**Quay lại với câu hỏi trên**, việc khai báo x là const kiểu mảng rồi thay đổi giá trị **x[-1] = -1** là hoàn toàn đúng so với định nghĩa về const.

**Tuy nhiên, sử dụng chỉ số âm thì lạ quá nhỉ? Liệu có đúng không?**

**2. Sử dụng chỉ số âm trong mảng**

Có lẽ bạn chỉ quen với việc là: chỉ số của mảng sẽ từ 0, 1, 2, 3,…

Điều trên đúng, nhưng chưa đủ với JavaScript. Thực chất, chỉ số của mảng có thể là bất kỳ thứ gì. Nếu hiểu rộng ra một chút thì array sẽ gần giống object với **key** chính là chỉ số của mảng.

Ví dụ: một array là a = [1, 2, 3] thì sẽ gần tương đương với object a = {0: 1, 1: 2, 2: 3}. Dĩ nhiên, mình chỉ nói là **gần tương đương** thôi nhé, vì đây là 2 kiểu dữ liệu khác nhau, prototype cũng khác nhau,…

Nếu áp dụng điều này thì bạn có thể thấy chỉ số mảng có thể là số âm (-1) hay cũng có thể là string:

```js
const a = [1, 2, 3];
a[-1] = -1;

console.log(a);
// => [1, 2, 3, -1: -1]

a["x"] = 100;
console.log(a);
// => [1, 2, 3, -1: -1, x: 100]
```

Như vậy, sau 2 câu lệnh đầu tiên trong câu hỏi, ta thu được:

```js
const x = [1, 2, 3];
x[-1] = -1;

console.log(x);
// => [1, 2, 3, -1: -1]
```

**3. Phương thức Array.prototype.indexOf()**

Phương thức này đơn giản là tìm ra chỉ số của một giá trị cho trước trong mảng. Nếu không tìm thấy thì kết quả trả về là -1.

Với mảng x như trên thì **x.indexOf(10000)** sẽ trả về -1, vì mảng x không có phần tử nào có giá trị là 10000. Do đó, kết quả hiển thị trên console sẽ là kết quả của x[-1]. Và đó chính là -1.

Các bạn thấy câu hỏi này thế nào? Rất hay phải không?

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 1 - Câu 2

```js
//let i = ?

console.log(i * i); // => 0
console.log(i + 1); // => 1
console.log(i - 1); // => -1
console.log(i / i); // => 1
```

Tìm số i thỏa mãn đồng thời 4 câu lệnh trên?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án**: _let i = Number.MIN_VALUE;_

**Giải thích**:

Câu này thực ra cũng hơi khó để giải thích. Trước tiên, bạn phải biết một số hằng số trong JavaScript như:

- Number.MIN_VALUE : số dương nhỏ nhất
- Number.MAX_VALUE: số dương lớn nhất
- Number.NEGATIVE_INFINITY: số âm vô cùng
- Number.POSITIVE_INFINITY: số dương vô cùng
- …

Do đó, mình thấy rằng chỉ có số Number.MIN_VALUE là thỏa mãn vì:

- Tích của 2 số dương nhỏ nhất sẽ làm tròn về 0 nên Number.MIN_VALUE \* Number.MIN_VALUE = 0.
- Một số dương nhỏ nhất (gần bằng 0) mà cộng với số a bất kì thì kết quả trả về vẫn sẽ làm tròn về a nên Number.MIN_VALUE + a = a.
- Thương của 2 số dương bất kì luôn trả về 1 nên Number.MIN_VALUE / Number.MIN_VALUE = 1.

Cũng lập luận tương tự như vậy, bạn thử đoán xem nếu thay i bằng các giá trị Number còn lại thì kết quả sẽ như thế nào?

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 1 - Câu 3

```js
let a = [1, 2, 3] + [4, 5, 6];
console.log(a);
```

Hỏi console in ra kết quả như thế nào?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án**: 1, 2, 34, 5, 6

**Giải thích**:

Có thể bạn sẽ trả lời đáp án là: [1, 2, 3, 4, 5, 6]. Nhưng tiếc thay, bạn không thể sử dụng toán tử + để ghép nối mảng. Việc sử dụng toán tử + với 2 mảng sẽ dẫn đến 2 mảng ban đầu được tự động convert sang kiểu string. Cuối cùng, kết quả sẽ là 2 string được nối vào với nhau, như trong đáp án trên.

Để thu được kết quả là [1, 2, 3, 4, 5, 6], bạn có thể sử dụng một trong hai cách sau:

**Phương thức [concat](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/concat)**

```js
let a = [1, 2, 3].concat([4, 5, 6]);
console.log(a);
// => [1, 2, 3, 4, 5, 6]
```

**Sử dụng Array [Spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) với ES6**

```js
let a = [...[1, 2, 3], ...[4, 5, 6]];
console.log(a);
// => [1, 2, 3, 4, 5, 6]
```

  </div>
  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 1 - Câu 4

```js
(function () {
  let x = 100;
})();

console.log(x);
```

Hỏi console in ra kết quả như thế nào?

<div class="wrap-collapsible">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án**: **ReferenceError: x is not defined**

**Giải thích**:

Câu này có vẻ dễ hơn phải không? Bạn chỉ cần biết những điều sau thì sẽ trả lời được câu hỏi:

- Cú pháp **(function() {/\* code here \*/})()**: gọi là **[IIFE](https://developer.mozilla.org/en-US/docs/Glossary/IIFE)** (Immediately Invoked Function Expression) – tức là hàm số thực thi ngay sau khi nó được khai báo.
- Biến x có phạm vi **block**, nên nó chỉ được tìm thấy ở bên trong [function](/ham-la-gi-ham-trong-javascript/) trên. Ra ngoài function thì biến x sẽ không được định nghĩa.
</div>
  </div>
</div>
<div class="margin-bottom"></div>

## Kết luận

Trên đây là 4 câu hỏi phỏng vấn JavaScript rất hóc búa. Hy vọng những câu hỏi này sẽ giúp bạn hiểu thêm nhiều hơn về ngôn ngữ lập trình JavaScript và thêm yêu ngôn ngữ lập trình này giống mình.

Nếu bạn thích những bài viết kiểu như này và mong muốn được thử sức với những câu hỏi JavaScript khó hơn thì vui lòng bình luận **tôi muốn** xuống phía dưới.

Xin chào và hẹn gặp lại bạn ở [bài viết tiếp theo](/xoan-nao-voi-phong-van-javascript-2/), thân ái!

_Nguồn: [Top Tricky JavaScript Interview Questions and Answers](https://www.youtube.com/watch?v=3qnrouysbG8)_
