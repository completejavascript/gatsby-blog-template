---
date: "2017-05-05T20:00:00Z"
update: "2021-11-09T21:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/toan-tu-logic-trong-javascript.png"
keywords: "toán tử logic"
description: "JavaScript có bốn toán tử logic là: OR, AND, NOT và 'Nullish Coalescing'. Trong đó, ba toán tử OR, AND và NOT là ba toán tử logic cơ bản nên mình tìm hiểu trước."
slug: toan-tu-logic-trong-javascript
title: "Toán tử logic trong JavaScript"
series: "JavaScript: JavaScript cơ bản"
tags:
  - Toán tử
---

JavaScript có bốn toán tử logic là: OR `||`, AND `&&`, NOT `!` và "Nullish Coalescing" `??`. Trong đó, ba toán tử OR, AND và NOT là ba toán tử logic cơ bản mà hầu như ngôn ngữ lập trình nào cũng có.

Vì vậy, bài viết này sẽ tập trung vào tìm hiểu về ba toán tử OR, AND và NOT. Còn toán tử "Nullish Coalescing" sẽ được giới thiệu ở bài viết sau.

## Toán tử logic là gì?

**Toán tử logic** là [toán tử](/toan-tu-la-gi-toan-tu-trong-javascript) kết nối hai hay nhiều biểu thức, dùng để kiểm tra mối quan hệ logic giữa các biểu thức. Kết quả cuối cùng phụ thuộc vào giá trị của từng biểu thức và loại toán tử logic.

Theo định nghĩa thông thường, toán tử logic chỉ áp dụng cho [kiểu dữ liệu boolean](/kieu-du-lieu-trong-javascript) và kết quả trả về cũng là giá trị **boolean**.

Nhưng với JavaScript thì khác, toán tử logic áp dụng cho **bất kỳ kiểu dữ liệu nào** và kết quả trả về cũng là **bất kỳ kiểu dữ liệu nào**. Để làm được điều này, các toán hạng tham gia đều được chuyển về kiểu dữ liệu boolean để kiểm tra tính logic.

Trước khi tìm hiểu kỹ hơn về các toán tử logic, bạn cần biết hai khái niệm: **truthy** và **falsy**.

## Truthy và falsy trong JavaScript là gì?

Như bạn đã biết thì kiểu dữ liệu boolean chỉ có hai giá trị là: `true` và `false`. Vì vậy, khi một giá trị được chuyển về kiểu dữ liệu boolean, kết quả sẽ là `true` hoặc `false`.

Những giá trị mà khi chuyển về kiểu dữ liệu boolean ra giá trị `true` gọi là **truthy**.

Tương tự, những giá trị mà khi chuyển về kiểu dữ liệu boolean ra giá trị `false` gọi là **falsy**.

> Để chuyển một giá trị về kiểu dữ liệu boolean, bạn có thể dùng [hàm](/ham-la-gi-ham-trong-javascript) `Boolean()`.

Ví dụ các giá trị **truthy**:

```js
console.log(Boolean(true)); // true (giá trị true)
console.log(Boolean(1)); // true (số nguyên dương)
console.log(Boolean(-1)); // true (số nguyên âm)
console.log(Boolean(100n)); // true (số BigInt khác 0)
console.log(Boolean(1.5)); // true (số thực dương)
console.log(Boolean(-1.5)); // true (số thực âm)
console.log(Boolean("0")); // true (string khác rỗng)
console.log(Boolean("abc")); // true (string khác rỗng)
console.log(Boolean([])); // true (mảng - array)
console.log(Boolean({ x: 1 })); // true (đối tượng - object)
console.log(Boolean(Infinity)); // true (số dương vô cùng)
console.log(Boolean(-Infinity)); // true (số âm vô cùng)
console.log(Boolean(alert)); // true (hàm)
```

Ví dụ về các giá trị **falsy**:

```js
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean("")); // false (string rỗng)
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false
```

## Các toán tử logic trong JavaScript

Sau đây là những kiến thức cơ bản cần biết về toán tử logic OR (`||`), AND (`&&`) và NOT (`!`) trong JavaScript.

### Toán tử OR (`||`)

Toán tử OR trong JavaScript kí hiệu là `||` (tạm dịch là toán tử "hoặc").

Trong lập trình nói chung, toán tử OR trả về giá trị `true` nếu có ít nhất một toán hạng là `true`, ngược lại sẽ trả về `false`.

```js
console.log(true || true); // true
console.log(true || false); // true
console.log(false || true); // true
console.log(false || false); // false
```

Ngoài ra, bạn cũng có thể kết hợp nhiều toán tử OR:

```js
console.log(true || true || true); // true
console.log(true || false || true); // true
console.log(false || true || false); // true
console.log(false || false || false); // false
```

Đó là với logic thông thông thường, còn JavaScript thì phức tạp hơn một chút.

#### Quá trình xử lý của toán tử OR (`||`)

Toán tử OR trong JavaScript sẽ tìm và trả về giá trị **truthy** đầu tiên. Nếu không có giá trị **truthy** nào thì kết quả sẽ là giá trị của toán hạng cuối cùng.

> **Quá trình xử lý như sau**:
>
> - Thứ tự thực hiện **từ trái sang phải**.
> - Lần lượt chuyển mỗi toán hạng về kiểu boolean.
>   - Nếu kết quả là `true` thì trả về giá trị gốc của toán hạng đó và dừng lại.
>   - Nếu kết quả là `false` thì tiếp tục thực hiện với toán hạng tiếp theo.
> - Nếu không có giá trị **truthy** nào thì kết quả trả về là giá trị của toán hạng cuối cùng.

Ví dụ:

```js
console.log(1 || 0); // 1 (giá trị truthy đầu tiên là 1)
console.log(null || 2); // 2 (giá trị truthy đầu tiên là 2)
console.log("" || undefined || 0 || 10); // 10 (giá trị truthy đầu tiên là 10)
console.log(null || 100 || 5 || undefined); // 100 (giá trị truthy đầu tiên là 100)
console.log("" || 0 || null); // null (không có giá trị truthy, trả về giá trị cuối cùng)
```

#### Ứng dụng của toán tử OR trong JavaScript là gì?

##### Toán tử OR được dùng nhiều với câu lệnh `if`.

Nếu bạn chưa biết câu lệnh `if` là gì, thì đơn giản câu lệnh `if` dùng để kiểm tra điều kiện, nếu **đúng** sẽ thực hiện một hành động (mình sẽ có bài viết chi tiết về `if` sau).

```js
if (/* true */) {
  // làm gì đó ở đây
}
```

Ví dụ:

```js
const a = 1;
const b = 0;

if (a || b) {
  console.log("truthy!"); // câu lệnh này được thực hiện vì 1 || 0 trả về 1 - là truthy.
}
```

Ví dụ kết hợp [toán tử so sánh](/toan-tu-so-sanh-trong-javascript):

```js
const hour = 20;

if (hour < 9 || hour > 17) {
  console.log("Ngoài giờ làm việc"); // câu lệnh này được thực hiện
}
```

> 📝 **Chú ý**: toán tử so sánh có độ ưu tiên cao hơn toán tử logic, nên toán tử so sánh được thực hiện trước toán tử OR.

Vì `hour` bằng `20` nên `hour < 9` là `false` và `hour > 17` là `true`. Nghĩa là `hour < 9 || hour > 17` có thể quy đổi thành `false || true`. Suy ra, kết quả cuối cùng là `true`.

Do đó, câu lệnh `console.log("Ngoài giờ làm việc")` được thực hiện.

##### Toán tử OR được dùng để lấy ra giá trị **truthy** đầu tiên trong các giá trị.

Ví dụ bài toán hiển thị tên người dùng trên trang web, biết thông tin người dùng có hai trường liên quan đến tên là `fullName` và `nickName`.

Ưu tiên hiển thị tên `fullName` trước. Nếu `fullName` rỗng thì hiển thị `nickName`. Nếu `nickName` cũng rỗng thì hiển thị "Người dùng ẩn danh".

Với bài toán này, bạn có thể sử dụng toán tử OR như sau:

```js
const fullName = "";
const nickName = "jsDev";

const displayName = fullName || nickName || "Người dùng ẩn danh";
console.log(displayName); // jsDev
```

##### Toán tử OR có thể dùng cho "short-circuit evaluation"

Đặc điểm của toán tử OR trong JavaScript là sẽ xử lý các toán hạng cho đến khi tìm được giá trị **truthy** mới thôi.

Nhưng bạn cần chú ý, **toán hạng** ở đây không chỉ là giá trị, mà còn có thể là một biểu thức gán, hàm hoặc một câu lệnh,...

Ví dụ:

```js
true || console.log("Câu lệnh này không được thực hiện"); // (1)
false || console.log("Câu lệnh này được thực hiện"); // (2)
```

Câu lệnh `console.log` (1) không được thực hiện. Vì toán tử OR gặp giá trị `true` đầu tiên, sẽ dừng lại và trả về giá trị `true` luôn, không xử lý gì toán hạng tiếp theo.

Câu lệnh `console.log` (2) được thực hiện. Vì toán tử OR gặp giá trị `false` đầu tiên. Đây là giá trị **falsy** nên toán tử OR tiếp tục xử lý toán hạng thứ hai.

Vì vậy, câu lệnh `console.log("Câu lệnh này được thực hiện")` được thực hiện.

> 💡 Tổng quát, tính năng này được dùng để thực hiện một hành động nếu điều kiện bên trái là **falsy**.
>
> Tuy nhiên để dễ theo dõi code hơn, mình khuyên bạn nên sử dụng `if` thay vì dùng toán tử OR làm "short-circuit evaluation".

### Toán tử AND (`&&`)

Toán tử AND trong JavaScript kí hiệu là `&&` (tạm dịch là toán tử "và").

Trong lập trình nói chung, toán tử AND trả về giá trị `true` nếu cả hai toán hạng là `true`, ngược lại sẽ trả về `false`.

```js
console.log(true && true); // true
console.log(true && false); // false
console.log(false && true); // false
console.log(false && false); // false
```

Ngoài ra, bạn cũng có thể kết hợp nhiều toán tử AND:

```js
console.log(true && true && true); // true
console.log(true && false && true); // false
console.log(false && true && false); // false
console.log(false && false && false); // false
```

#### Quá trình xử lý của toán tử AND (`&&`)

Toán tử AND trong JavaScript sẽ tìm và trả về giá trị **falsy** đầu tiên. Nếu không có giá trị **falsy** nào thì kết quả sẽ là giá trị của toán hạng cuối cùng.

> **Quá trình xử lý như sau**:
>
> - Thứ tự thực hiện **từ trái sang phải**.
> - Lần lượt chuyển mỗi toán hạng về kiểu boolean.
>   - Nếu kết quả là `false` thì trả về giá trị gốc của toán hạng đó và dừng lại.
>   - Nếu kết quả là `true` thì tiếp tục thực hiện với toán hạng tiếp theo.
> - Nếu không có giá trị **falsy** nào thì kết quả trả về là giá trị của toán hạng cuối cùng.

Ví dụ:

```js
console.log(1 && 0); // 0 (giá trị falsy đầu tiên là 0)
console.log(null && 2); // null (giá trị falsy đầu tiên là null)
console.log(10 && "" && undefined && 0); // "" (giá trị falsy đầu tiên là "")
console.log("n" && undefined && 10); // undefined (giá trị falsy đầu tiên là undefined)
console.log(10 && "a"); // "a" (không có giá trị falsy, trả về giá trị cuối cùng)
```

#### Ứng dụng của toán tử AND trong JavaScript là gì?

##### Toán tử AND được dùng nhiều với câu lệnh `if`.

Tương tự như toán tử OR ở trên, toán tử AND cũng hay dùng với câu lệnh `if`

Ví dụ:

```js
const a = 1;
const b = "hello";

if (a && b) {
  console.log("truthy!");
  // câu lệnh trên được thực hiện vì 1 && "hello" trả về "hello" - là truthy.
}
```

Ví dụ kết hợp [toán tử so sánh](/toan-tu-so-sanh-trong-javascript):

```js
const hour = 12;

if (hour >= 9 && hour <= 17) {
  console.log("Trong giờ làm việc"); // câu lệnh này được thực hiện
}
```

> 📝 **Chú ý**: toán tử so sánh có độ ưu tiên cao hơn toán tử logic, nên toán tử so sánh được thực hiện trước toán tử AND.

Vì `hour` bằng `12` nên `hour >= 9` là `true` và `hour <= 17` là `true`. Nghĩa là `hour >= 9 && hour <= 17` có thể quy đổi thành `true && true`. Suy ra, kết quả cuối cùng là `true`.

Do đó, câu lệnh `console.log("Trong giờ làm việc")` được thực hiện.

##### Toán tử AND có thể dùng cho "short-circuit evaluation"

Tương tự như toán tử OR, toán tử AND cũng có thể dùng cho "short-circuit evaluation".

Vì đặc điểm của toán tử AND trong JavaScript là sẽ xử lý các toán hạng cho đến khi tìm được giá trị **falsy** mới thôi.

Ví dụ:

```js
true && console.log("Câu lệnh này được thực hiện"); // (1)
false && console.log("Câu lệnh này không được thực hiện"); // (2)
```

Câu lệnh `console.log` (1) được thực hiện. Vì toán tử AND gặp giá trị `true` đầu tiên. Đây là giá trị **truthy** nên toán tử AND tiếp tục xử lý toán hạng thứ hai. Vì vậy, câu lệnh `console.log` (1) được thực hiện.

Câu lệnh `console.log` (2) không được thực hiện. Vì toán tử AND gặp giá trị **falsy** đầu tiên. Nên dừng lại luôn và không xử lý toán tử thứ hai.

> 💡 Tổng quát, tính năng này được dùng để thực hiện một hành động nếu điều kiện bên trái là **truthy**.
>
> Để dễ theo dõi code hơn thì mình khuyên bạn nên sử dụng `if` thay vì dùng toán tử AND làm "short-circuit evaluation".

### Toán tử NOT (`!`)

Toán tử NOT trong JavaScript kí hiệu là `!` (tạm dịch là toán tử "phủ định").

Trong lập trình nói chung, toán tử NOT trả về giá trị `true` nếu toán hạng là `false` và trả về `false` nếu toán hạng là `true`.

Vì là toán tử một ngôi, nên toán tử NOT chỉ chứa một toán hạng, ví dụ:

```js
console.log(!true); // false
console.log(!false); // true
```

> **Quá trình xử lý của toán tử NOT như sau**:
>
> - Chuyển giá trị của toán hạng về dạng boolean: `true` hoặc `false`.
> - Rồi trả về giá trị ngược lại.

Ví dụ:

```js
console.log(!"hello"); // false ("hello" là truthy)
console.log(!100); // false (100 là truthy)
console.log(!""); // true ("" là falsy)
console.log(!0); // true (0 là falsy)
console.log(!null); // true (null là falsy)
console.log(!undefined); // true (undefined là falsy)
```

> Nếu bạn sử dụng hai toán tử NOT `!!` thì nó sẽ có tác dụng chuyển đổi kiểu dữ liệu về giá trị boolean, giống hàm `Boolean()` mà mình đã nhắc ở đầu.
>
> Ví dụ:
>
> ```js
> console.log(!!"hello"); // true
> console.log(!!null); // false
> ```
>
> Bởi vì toán tử NOT đầu tiên `!` đã chuyển giá trị về boolean rồi trả về giá trị ngược lại. Toán tử NOT thứ hai `!` lại trả về giá trị ngược lại một lần nữa. Kết hợp lại thì sẽ tương đương với chuyển giá trị ban đầu về boolean.
>
> Hay nói gắn gọn lại là: "phủ định của phủ định thành khẳng định".

### Thứ tự ưu tiên của các toán tử logic

Nếu so sánh với các toán tử đã học như [toán tử số học](/toan-tu-la-gi-toan-tu-trong-javascript) và [toán tử so sánh](/toan-tu-so-sanh-trong-javascript) thì toán tử logic trong JavaScript có độ ưu tiên thấp hơn.

Nếu so sánh thứ tự ưu tiên của các toán tử logic trong JavaScript với nhau thì toán tử NOT (`!`) có độ ưu tiên cao nhất. Xếp thứ hai là toán tử AND (`&&`). Và cuối cùng là toán tử OR (`||`).

Ví dụ:

```
console.log(1 + 2 || "javascript" && 4 > 5);
```

Dựa theo độ ưu tiên thì quá trình thực hiện sẽ như sau (mình sử dụng cặp dấu ngoặc đơn `()` để biểu thị phần được xử lý trước):

```
1 + 2 || !"javascript" && 4 > 5;
-> (1 + 2) || !"javascript" && 4 > 5; // toán tử số học có độ ưu tiên cao nhất
-> 3 || !"javascript" && 4 > 5;
-> 3 || !"javascript" && (4 > 5); // toán tử so sánh ưu tiên cao hơn toán tử logic
-> 3 || !"javascript" && false;
-> 3 || (!"javascript") && false; // toán tử NOT có độ ưu tiên cao hơn AND và OR
-> 3 || false && false;
-> 3 || (false && false); // toán tử AND có độ ưu tiên cao hơn OR
-> 3 || false;
-> 3 // giá trị truthy đầu tiên là 3
```

## Tổng kết

Sau đây là một số kiến thức cơ bản cần nhớ về các toán tử logic trong JavaScript:

- Các toán tử logic trong JavaScript bao gồm: toán tử OR `||`, toán tử AND `&&`, toán tử NOT `!` và toán tử "Nullish Coalescing" `??` (sẽ tìm hiểu ở bài viết sau).
- **Truthy** là những giá trị mà khi chuyển về kiểu dữ liệu boolean ra giá trị `true`. **Falsy** là những giá trị mà khi chuyển về kiểu dữ liệu boolean ra giá trị `false`.
- Toán tử OR tìm và trả về giá trị của toán hạng **truthy** đầu tiên. Nếu không có giá trị **truthy** nào thì toán tử OR trả về giá trị của toán hạng cuối cùng.
- Toán tử AND tìm và trả về giá trị của toán hạng **falsy** đầu tiên. Nếu không có giá trị **falsy** nào thì toán tử AND trả về giá trị của toán hạng cuối cùng.
- Toán tử NOT sẽ chuyển giá trị của toán hạng về kiểu dữ liệu boolean rồi lấy giá trị phủ định.
- So sánh với các toán tử đã học (toán tử số học, toán tử so sánh) thì toán tử logic có độ ưu tiên thấp hơn.
- Trong các toán tử logic trong JavaScript, toán tử NOT có độ ưu tiên cao nhất, sau đó đến toán tử AND và cuối cùng là toán tử OR.

## Thực hành

Kết quả của các biểu thức sau là gì?

```js
console.log("" || "0" || 99); // (1)
console.log(null || 0 || NaN); // (2)
console.log(100n && "" && true); // (3)
console.log(false && null && ""); // (4)
console.log(3 > "0" && null == 1); // (5)
console.log(null == undefined || 0 === "0"); // (6)
console.log(!"hello" && "apple" < "appLE"); // (7)
```

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

```js
console.log("" || "0" || 99); // "0" (1)
console.log(null || 0 || NaN); // NaN (2)
console.log(100n && "" && true); // "" (3)
console.log(false && null && ""); // false (4)
console.log(3 > "0" && null == 1); // false (5)
console.log(null == undefined || 0 === "0"); // true (6)
console.log(!!"hello" && "apple" < "appLE"); // false (7)
```

**Giải thích:**

1. Toán tử OR: Giá trị **truthy** đầu tiên là `"0"` (string khác rỗng).
2. Toán tử OR: Không có giá trị **truthy** nào nên đáp án là giá trị của toán hạng cuối cùng `NaN`.
3. Toán tử AND: Giá trị **falsy** đầu tiên là `""`.
4. Toán tử AND: Giá trị **falsy** đầu tiên là false.
5. Toán tử so sánh có độ ưu tiên cao hơn nên thực hiện trước. Mà `3 > "0"` trả về `true` vì đây là so sánh khác kiểu dữ liệu. String `"0"` chuyển về dạng số thành số `0`. Tiếp theo, `null == 1` trả về `false` vì `null` chỉ bằng `undefined` và khác tất cả các giá trị còn lại. Nên biểu thức ban đầu tương đương với `true && false`. Vì vậy, kết quả là `false`.
6. Tương tự, toán tử so sánh thực hiện trước. Đầu tiên `null == undefined` trả về `true`. Thứ hai `0 === "0"` trả về `false` vì đây là so sánh bằng "nghiêm ngặt", mà hai toán hạng khác kiểu dữ liệu. Nên biểu thức ban đầu tương đương với `true || false`. Vì vậy, kết quả là `true`.
7. Toán tử so sánh thực hiện trước. Do đó `"apple" < "appLE"` thực hiện trước. Đây là so sánh string nên sẽ so sánh từng kí tự một. Thành phần `"app"` là giống nhau, mà `"l"` lớn hơn `"L"` (theo bảng mã Unicode). Nên `"apple" < "appLE"` trả về false. Tiếp theo, toán tử NOT có độ ưu tiên cao hơn AND, nên `!!"hello"` thực hiện trước. Mà `!!"hello"` trả về `true`. Nên biểu thức ban đầu tương đương với `true && false`. Vì vậy, kết quả là `false`.

</div>
  </div>
</div>
