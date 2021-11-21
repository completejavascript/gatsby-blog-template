---
date: "2017-05-17T16:00:00Z"
update: "2019-10-17T16:00:00Z"
template: "post"
directory: "JavaScript"
title: "Tagged template ES6 là gì?"
slug: tagged-template-es6-la-gi
keywords: "Tagged template ES6"
description: "Bạn đã bao giờ sử dụng Tagged template ES6 chưa? Bài viết này mình sẽ tìm hiểu xem cách sử dụng của nó như thế nào nhé."
cover: "../../../images/javascript/tagged-template-es6-la-gi-completejavascript.com.png"
series: "JavaScript: Các kiểu dữ liệu"
tags:
  - ES6
  - Kiểu dữ liệu
---

Trong bài viết [Sử dụng ES6 Template String có gì hay?](/su-dung-es6-template-string-co-gi-hay), mình đã giới thiệu với bạn về ES6 Template String là gì, cũng như cách dùng và ứng dụng của nó. Tuy nhiên, có một tính năng mà mình chưa đề cập đến, đó là: Tagged template. Vì vậy, bài viết này mình sẽ cùng tìm hiểu xem rốt cuộc Tagged template ES6 là như thế nào nhé.

## Cú pháp cơ bản của Tagged template ES6

Cú pháp:

```js
func`template string with ${expression}`;
```

Tagged template ES6 cho phép bạn parse [template](/tag/template) string với một [function](/ham-la-gi-ham-trong-javascript/).

Trong đó, **func** chính là function mà bạn tự định nghĩa. Tiếp sau là một đoạn template string có chứa các expression (hoặc không).

Ở đây, **func** nhận tham số đầu tiên là [mảng](/javascript-array-co-ban/) các string trong template string. Các tham số tiếp theo là các expression trong template string.

Và kết quả trả về của Tagged template là kết quả của hàm **func**. Đó có thể là bất cứ kiểu dữ liệu nào tùy thích. Chứ không phải luôn là string đâu nhé!

Đọc đến đây có thể bạn vẫn chưa hiểu được cách sử dụng của Tagged template ES6. Do đó, mình sẽ tìm hiểu nó qua một ví dụ cụ thể phía dưới.

## Ví dụ sử dụng Tagged template ES6

Cho đoạn code:

```js
const math = ([x, y], op) => op(Number(x), Number(y));
const plus = (x, y) => x + y;
const result = math`6 ${plus} 3`;
console.log(result); // 9
```

Ở đây, **func** chính là hàm **math()**. Còn template string chính là <code>6 ${plus} 3</code>.

Đối với hàm math(), tham số đầu tiên là mảng của các string trong template string. Do đó, mảng này gồm 2 phần tử là: <code>['6 ', ' 3']</code> (chú ý sự tồn tại của dấu cách trong các string nhé). Và tham số tiếp theo của hàm math() chính là hàm **plus()**.

Như vậy, bên trong hàm math():

```
x = '6 ' => Number(x) = 6
y = ' 3' => Number(y) = 3
op = plus

=> op(Number(x), Number(y)) = plus(6, 3) = 9
```

Cuối cùng kết quả của biến **result** bằng 9.

Có lẽ bạn đã phần nào mường tượng ra cách sử dụng của Tagged template ES6 rồi. Tuy nhiên, mình sẽ tiếp tục nghiên cứu thêm một ví dụ nữa để hiểu hơn về nó.

## Ví dụ khác của Tagged template ES6

Giả sử trường hợp template string với expression ở đầu hoặc/và ở cuối:

```js
const func = (arr, expr1, expr2) => {
  console.log(arr); // (1)
  console.log(expr1, expr2); // (2)
  return { x: "1" };
};

const a = 1;
const b = 2;
const result = func`${a} and then ${b}`;
console.log(result); // (3)

// (1) => ["", " and then ", ""]
// (2) => 1 2
// (3) => { x: "1" }
```

Đây chỉ là một ví dụ **vô nghĩa**. Tuy nhiên, qua ví dụ này bạn biết thêm một số vấn đề như:

- Tagged template ES6 sử dụng các expression để phân tách ra mảng các string. Do đó, nếu có expression ở đầu hay cuối thì mảng các string cũng có string rỗng ở đầu và cuối.
- Nếu có nhiều expression thì nó sẽ được điền kế tiếp nhau trong hàm, phía sau phần tử đầu tiên, các expression cách nhau bởi dấu phẩy.
- Kết quả trả về của **func** có thể là bất cứ thứ gì. Do đó, kết quả của Tagged template ES6 cũng có thể là bất cứ thứ gì.

## Lời kết

Trên đây là một số ví dụ cơ bản giúp bạn hiểu về Tagged template ES6. Vậy theo bạn, ứng dụng thực tế của Tagged template ES6 là gì? Chia sẻ quan điểm của bạn trong phần bình luận phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!
