---
date: "2017-05-04T20:00:00Z"
update: "2021-11-07T21:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/toan-su-so-sanh-trong-javascript.png"
keywords: "toán tử so sánh"
description: "Bài viết trước, bạn đã biết toán tử là gì và các toán tử giúp tính toán. Bài viết này sẽ tìm hiểu toán tử so sánh trong JavaScript, kết quả phép so sánh và một số trường hợp đặc biệt."
slug: toan-tu-so-sanh-trong-javascript
title: "Toán tử so sánh trong JavaScript"
series: "JavaScript: JavaScript cơ bản"
tags:
  - Toán tử
---

Qua bài viết trước, bạn đã biết [toán tử là gì](/toan-tu-la-gi-toan-tu-trong-javascript), cũng như các loại toán tử trong JavaScript giúp cho việc tính toán. Tiếp theo, mình sẽ tìm hiểu về **toán tử so sánh** trong JavaScript.

Cụ thể, bài viết này tập trung vào tìm hiểu toán tử so sánh là gì, các loại toán tử so sánh trong JS, kết quả của phép so sánh và một số trường hợp đặc biệt (dễ nhầm lẫn) khi so sánh.

## Toán tử so sánh là gì?

**Toán tử so sánh** là toán tử hai ngôi dùng để so sánh giá trị của hai toán hạng với nhau.

Các toán tử so sánh trong JavaScript bao gồm:

- Toán tử so sánh lớn hơn `>` và toán tử so sánh nhỏ hơn `<`.
- Toán tử so sánh lớn hơn hoặc bằng `>=` và toán tử so sánh nhỏ hơn hoặc bằng `<=`.
- Toán tử so sánh bằng "không nghiêm ngặt" `==` và toán tử so sánh bằng "nghiêm ngặt" `===`.
- Toán tử so sánh khác "không nghiêm ngặt" `!=` và toán tử so sánh khác "nghiêm ngặt" `!==`.

> 📝 **Chú ý:**
>
> Toán tử **so sánh bằng** có hai (hoặc ba) dấu bằng.
>
> Bạn chú ý để tránh nhầm lẫn với toán tử gán - chỉ có một dấu bằng `=`.

Ví dụ các phép toán so sánh:

```js
let a = 1;
let b = 2;

a > b; // so sánh lớn hơn
a < b; // so sánh lớn hơn
a >= b; // so sánh lớn hơn hoặc bằng
a <= b; // so sánh nhỏ hơn hoặc bằng
a == b; // so sánh bằng không nghiêm ngặt
a === b; // so sánh bằng nghiêm ngặt
a != b; // so sánh khác không nghiêm ngặt
a !== b; // so sánh khác nghiêm ngặt
```

## Kết quả của phép so sánh

Kết quả của phép so sánh luôn là một giá trị kiểu [boolean](/kieu-du-lieu-trong-javascript).

- `true`: đúng, chính xác
- `false`: sai, không chính xác

Ví dụ:

```js
console.log(5 > 6); // false (sai)
console.log(5 < 6); // true (đúng)
console.log(5 >= 6); // false (sai)
console.log(5 <= 6); // true (đúng)
console.log(5 == 6); // false (sai)
console.log(5 === 6); // false (sai)
console.log(5 != 6); // true (đúng)
console.log(5 !== 6); // true (đúng)
```

Bạn có thể gán kết quả của phép so sánh cho một biến khác:

```js
let ret = 6 > 9;
console.log(ret); // false (sai)
```

## So sánh string

Quy tắc so sánh hai string trong JavaScript cũng giống như hầu hết các ngôn ngữ lập trình khác. Đó là so sánh theo thứ tự "từ điển". Hay nói cách khác là so sánh từng chữ cái một (từ trái sang phải).

Ví dụ so sánh các string:

```js
console.log("A" < "Z"); // true
console.log("Small" < "Smart"); // true
console.log("Big" < "BigBang"); // true
```

> Tóm tắt **thuật toán so sánh hai string** như sau:
>
> So sánh kí tự đầu tiên của hai string.
>
> - Nếu kí tự đầu tiên của string(1) lớn hơn (hoặc nhỏ hơn) kí tự đầu tiên của string(2) thì string(1) lớn hơn (hoặc nhỏ hơn) string(2). Suy ra, **so sánh kết thúc**.
> - Ngược lại, nếu hai kí tự đầu tiên bằng nhau thì tiếp tục so sánh đến các kí tự thứ hai.
>
> Lặp lại việc so sánh như trên, cho đến khi **so sánh kết thúc** kết thúc hoặc **đã so sánh hết** các kí tự của ít nhất một string.
>
> - Nếu hai string có cùng độ dài thì chúng bằng nhau.
> - Ngược lại, string nào dài hơn thì string đó lớn hơn.

Trong ví dụ so sánh `"A" < "Z"` kết quả là `true`. Quá trình so sánh dừng lại ở bước một.

Trong ví dụ so sánh `"Small" < "Smart"` kết quả là `true`. Quá trình so sánh lặp lại nhiều lần.

1. Kí tự đầu tiên `S` là giống nhau
2. Kí tự thứ hai `m` cũng giống nhau
3. Kí tự thứ ba `a` cũng giống nhau
4. Kí tự thứ tư `l` nhỏ hơn `r`. Suy ra, string `"Small"` nhỏ hơn string `"Smart"`.

Trong ví dụ so sánh `"Big" < "BigBang"` kết quả là `true`. Quá trình so sánh cùng lặp lại nhiều lần. Ba kí tự đầu tiên là `"Big"` đều giống nhau. Lúc này, string `"Big"` kết thúc. Trong khi, string `"BigBang"` còn thêm các kí tự `"Bang"` (độ dài string lớn hơn). Suy ra, string `"Big"` nhỏ hơn string `"BigBang"`.

> 📝 **Chú ý**:
>
> Để so sánh hai kí tự với nhau, JavaScript so sánh giá trị của hai kí tự (dạng số) ở [bảng mã Unicode](https://vi.wikipedia.org/wiki/Unicode).
>
> Trong bảng mã này, ta có thứ tự `0 < 9 < A < Z < a < z`.
>
> Ngoài việc so sánh các chữ cái Latinh ra thì JavaScript còn có thể so sánh các chữ cái không phải Latinh.

## So sánh khác kiểu dữ liệu

Khi so sánh các toán hạng khác kiểu dữ liệu, JavaScript chuyển đổi giá trị các toán hạng ra dạng số, ví dụ:

```js
console.log("5" > 4); // true, vì "5" chuyển thành 5
console.log("01" == 1); // true, vì "01" chuyển thành 1
console.log("11" == 1); // false, vì "11" chuyển thành 11
```

Đối với kiểu dữ liệu boolean, `true` sẽ chuyển thành `1` và `false` chuyển thành `0`.

```js
console.log(true == 1); // true
console.log(false == 0); // false
```

Việc so sánh khác kiểu dữ liệu sử dụng toán tử bằng "không nghiêm ngặt" `==` dẫn đến một số trường hợp "phi logic", ví dụ:

```js
console.log("" == 0); // true
console.log("0" == 0); // true
console.log("" == "0"); // false
```

**Kì lạ phải không?**

Nếu theo tính chất "bắc cầu" trong toán học thì nếu `"" == 0` là `true` và `"0" == 0` là `true`, suy ra `"" == "0"` cũng phải là `true` (vì cùng bằng `0`).

Nhưng thực tế lại không phải như vậy, hai phép so sánh đầu tiên là **so sánh khác kiểu dữ liệu**, nên `""` và `"0"` đều được chuyển thành dạng số và bằng 0.

Trong khi phép so sánh thứ ba là **so sánh cùng kiểu dữ liệu**, nên không có quá trình chuyển đổi dữ liệu xảy ra. Dẫn đến, kết quả của phép so sánh cuối là `false`.

Để giải quyết vấn đế này, JavaScript tạo ra toán tử so sánh bằng "nghiêm ngặt" `===`.

## So sánh bằng nghiêm ngặt

Đối với toán tử so sánh bằng "nghiêm ngặt", JavaScript sẽ không thực hiện chuyển đổi kiểu dữ liệu.

Nói cách khác, hai giá trị **khác kiểu dữ liệu** thì luôn khác nhau, ví dụ:

```js{5}
// So sánh bằng không nghiêm ngặt
console.log("" == 0); // true

// So sánh bằng nghiêm ngặt
console.log("" === 0); // false
```

Tương tự với so sánh bằng nghiêm ngặt, JavaScript cũng có **so sánh khác nghiêm ngặt**, ví dụ:

```js{5}
// So sánh khác không nghiêm ngặt
console.log("" != 0); // false

// So sánh khác nghiêm ngặt
console.log("" !== 0); // true
```

> 💡 Để tránh mắc phải những lỗi sai ngớ ngẩn khi so sánh trong JavaScript, bạn nên sử dụng toán tử so sánh bằng "nghiêm ngặt" `===` và toán tử so sánh khác "nghiêm ngặt" `!==`.

## So sánh với `null` và `undefined`

Khác với các kiểu dữ liệu khác, việc so sánh `null` và `undefined` thường không rõ ràng cho lắm.

Khi sử dụng toán tử so sánh bằng "nghiêm ngặt" `===` thì dĩ nhiên là hai giá trị này khác nhau. Vì chúng khác kiểu dữ liệu.

```js
console.log(null === undefined); // false
```

Nhưng khi sử dụng toán tử so sánh bằng "không nghiêm ngặt" `==` thì kết quả lại là `true`.

```js
console.log(null == undefined); // true
```

> Thực tế, JavaScript đã quy định `null` và `undefined` là bằng nhau (với trường hợp `==`). Và chúng không bằng (`==`) các giá trị khác.

**Khi sử dụng các toán tử so sánh `>`, `<`, `>=` và `<=` thì sao?**

Hai giá trị này sẽ được chuyển sang dạng số. Cụ thể `null` chuyển thành `0` và `undefined` chuyển thành `NaN`.

Khi sử dụng các toán tử so sánh `>`, `<`, `>=` và `<=` với `null` và `undefined` thì kết quả đều `false` hết.

```js
console.log(null > undefined); // false
console.log(null < undefined); // false
console.log(null >= undefined); // false
console.log(null <= undefined); // false
```

Bây giờ, mình thử so sánh hai giá trị này với số `0` xem có gì kỳ lạ không nào!

**So sánh `null` với 0**

```js
console.log(null > 0); // false (1)
console.log(null >= 0); // true (2)
console.log(null == 0); // false (3)
```

Trong các phép so sánh (1), (2), `null` chuyển thành số `0` nên ta có đáp án lần lượt là `false` và `true`. Nhưng ở phép so sánh (3), `null` không chuyển thành `0` nên kết quả là `false`.

> Đây lại là một điều khá "phi logic". Vì theo kết quả trên thì `null` lớn hơn hoặc bằng 0 (sử dụng `>=`), nhưng lại không bằng 0 (sử dụng `==`).

**So sánh `undefined` với 0**

```js
console.log(undefined > 0); // false (1)
console.log(undefined >= 0); // false (2)
console.log(undefined == 0); // false (3)
```

Kết quả là `false` hết.

Trong các phép so sánh (1) và (2), `undefined` chuyển thành `NaN` nên chắc chắn khác `0`. Trong khi phép so sánh (3), `undefined` không bằng (`==`) `0`. Vì như mình đã nói ở trên, `undefined` chỉ bằng (`==`) `null` mà thôi.

> 💡 Để tránh những tình huống "phi logic" trên, bạn chỉ nên so sánh `null` hoặc `undefined` khi sử dụng toán tử so sánh bằng "nghiêm ngặt" (`===`) hoặc toán tử so sánh khác "nghiêm ngặt" (`!==`).
>
> Không nên sử dụng toán tử `>`, `<`, `>=` và `<=` với `null` và `undefined`.
>
> Trường hợp một biến có thể `null` hoặc `undefined` thì bạn nên kiểm tra giá trị có bằng `null` hoặc `undefined` hay không để xử lý trước. Khi biến khác `null` và `undefined` rồi thì mới thực hiện so sánh với các toán tử `>`, `<`, `>=` và `<=` sau.

## Tổng kết

Sau đây là những kiến thức cơ bản cần nhớ về toán tử so sánh trong JavaScript:

- **Toán tử so sánh** là toán tử hai ngôi dùng để so sánh giá trị của hai toán hạng với nhau. Và các toán tử so sánh trong JavaScript bao gồm:
  - Toán tử so sánh lớn hơn `>` và toán tử so sánh nhỏ hơn `<`.
  - Toán tử so sánh lớn hơn hoặc bằng `>=` và toán tử so sánh nhỏ hơn hoặc bằng `<=`.
  - Toán tử so sánh bằng "không nghiêm ngặt" `==` và toán tử so sánh bằng "nghiêm ngặt" `===`.
  - Toán tử so sánh khác "không nghiêm ngặt" `!=` và toán tử so sánh khác "nghiêm ngặt" `!==`.
- Kết quả của phép so sánh là giá trị kiểu boolean.
- Khi so sánh string, JavaScript thực hiện so sánh từng kí tự từ trái sang phải.
- Khi so sánh các giá trị với kiểu dữ liệu khác nhau, JavaScript chuyển các giá trị đó thành dạng số (trừ trường hợp so sánh với toán tử bằng "nghiêm ngặt" `===` và toán tử khác "nghiêm ngặt" `!==`).
- Hai giá trị `null` và `undefined` bằng nhau (khi sử dụng toán tử `==`) và luôn khác các giá trị còn lại.
- Không nên sử dụng toán tử `>`, `<`, `>=` và `<=` với `null` và `undefined`. Nếu các biến có thể bằng `null` hoặc `undefined` thì bạn nên kiểm tra giá trị có bằng `null` hoặc `undefined` hay không để xử lý trước. Khi biến khác `null` và `undefined` rồi thì mới thực hiện so sánh với các toán tử `>`, `<`, `>=` và `<=` sau.

## Thực hành

Kết quả của các phép so sánh sau là gì?

```js
console.log(15 > 9); // (1)
console.log("no" <= "none"); // (2)
console.log("3" >= "24"); // (3)
console.log("3" > 24); // (4)
console.log(null < undefined); // (5)
console.log(undefined == null); // (6)
console.log(undefined === null); // (7)
console.log(null == "\n0\n"); // (8)
console.log(null === +"\n0\n"); // (9)
console.log(null > -1); // (10)
```

<div class="wrap-collapsible margin-bottom">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

```js
console.log(15 > 9); // true
console.log("no" <= "none"); // true
console.log("3" >= "24"); // true
console.log("3" > 24); // false
console.log(null < undefined); // false
console.log(undefined == null); // true
console.log(undefined === null); // false
console.log(null == "\n0\n"); // false
console.log(null === +"\n0\n"); // false
console.log(null >= -1); // true
```

Giải thích:

1. Hiển nhiên số `15` lớn hơn số `9`.
2. Đây là so sánh hai string. Quy trình là so sánh kí tự lần lượt từ trái sang phải. Thành phần `"no"` giống nhau. Suy ra `"none"` lớn hơn `"no"` vì `"none"` nhiều kí tự hơn.
3. Đây cũng là so sánh hai string. Kí tự đầu tiên `"3"` lớn hơn kí tự `"2"` nên suy ra `"3"` lớn hơn `"24"`.
4. Đây là so sánh hai kiểu dữ liệu khác nhau. Do đó, string `"3"` sẽ chuyển thành số `3`. Hiển nhiên số `3` nhỏ hơn số `24`.
5. Hai giá trị `null` và `undefined` chỉ bằng nhau khi sử dụng toán tử `==`. Còn lại sẽ khác nhau và khác các giá trị khác. Nên kết quả là `false`.
6. Giải thích tương tự như (5).
7. Giải thích tương tự như (5).
8. Giải thích tương tự như (5).
9. Giải thích tương tự như (5).
10. Khi sử dụng toán tử `>` giữa `null` và một số, giá trị `null` sẽ chuyển thành dạng số và bằng số `0`. Mà hiển nhiên, số `0` sẽ lớn hơn số `-1`. Vì vậy, đáp án là `true`.

</div>

  </div>
</div>
