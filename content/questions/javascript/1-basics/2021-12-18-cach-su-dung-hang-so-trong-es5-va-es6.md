---
date: "2021-12-18T08:00:00Z"
update: "2021-12-18T21:00:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-basics.png"
keywords: "hằng số trong ES5 và ES6"
description: "Mình thường thấy nhiều bạn khi lập trình JavaScript sử dụng var trong mọi trường hợp, kể cả với hằng số. Tuy nhiên, nếu sử dụng như vậy, bạn sẽ không phản ánh được đúng tính chất của hằng số. Bài viết này mình sẽ giúp bạn khai báo và sử dụng hằng số trong ES5 và ES6."
slug: cach-su-dung-hang-so-trong-es5-va-es6
title: "Cách sử dụng hằng số trong ES5 và ES6?"
shortTitle: "Sử dụng hằng số trong ES5 và ES6?"
series: "JavaScript Question: cơ bản"
tags:
  - Câu hỏi JS cơ bản
---

Nhiều bạn khi lập trình JavaScript hay sử dụng `let` hoặc `var` trong mọi trường hợp, kể cả với **hằng số**.

Nếu sử dụng như vậy, bạn sẽ không phản ánh được đúng tính chất của hằng số. Đó là **tính bất biến** - không bao giờ thay đổi giá trị.

Bài viết này mình sẽ giúp bạn phân biệt cách khai báo và sử dụng hằng số trong ES5 và ES6.

## Sử dụng hằng số trong ES5

Để khai báo hằng số, bạn có thể sử dụng phương thức [`Object.defineProperties()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties).

```js
Object.defineProperties(obj, props);
```

Phương thức này có 2 tham số là:

- `obj`: là [object](/object-la-gi-object-trong-javascript/) chứa hằng số cần khai báo. Nếu bạn muốn sử dụng hằng số cho toàn bộ chương trình thì có thể sử dụng global object là `window`.
- `props`: là thuộc tính được định nghĩa. Mặc định, thuộc tính này có giá trị `writable = false`, tức là giá trị của nó không thể thay đổi.

Ví dụ:

```js
Object.defineProperties(window, {
  myconst: {
    value: 10,
    enumerable: true,
  },
});
console.log(myconst); // 10

myconst = 99;
console.log(myconst); // 10
```

Trong ví dụ trên, mình định nghĩa `myconst` là một hằng số của `window` có giá trị `value` bằng `10`.

Sau đó, mình có thay đổi giá trị `myconst = 99`, nhưng giá trị của `myconst` vẫn không thay đổi so với giá trị ban đầu là `10`.

Bạn cũng thấy là dù việc thay đổi giá trị `myconst = 99` không có ý nghĩa, nhưng vẫn **không có thông báo lỗi** khi bạn cố tình thay đổi giá trị của hằng số.

Để có thể nhận được thông báo lỗi này, bạn cần sử dụng ở [strict mode](/use-strict-trong-js/).

```js
"use strict";

Object.defineProperties(window, {
  myconst: {
    value: 10,
    enumerable: true,
  },
});

console.log(myconst); // 10

myconst = 99;
// TypeError:
// Cannot assign to read only property 'myconst' of object '#<Window>'

console.log(myconst);
```

Khi đó, bạn nhận được lỗi: **TypeError: Cannot assign to read only property 'myconst' of object '#&lt;Window&gt;'**. Rõ ràng là ý nghĩa của hằng số đã được thể hiện rất chặt chẽ.

Ngoài ra, bạn cũng có thể khai báo hằng số cho một object khác, không phải `window`:

```js
"use strict";

let obj = {};
Object.defineProperties(obj, {
  myconst: {
    value: 10,
    enumerable: true,
  },
});

console.log(obj.myconst); // 10

obj.myconst = 99;
// TypeError:
// Cannot assign to read only property 'myconst' of object '#<Object>'

console.log(obj.myconst);
```

Đó là cách khai báo và sử dụng hằng số trong ES5. Tuy nhiên, nếu sử dụng ES6 thì cách làm sẽ ngắn gọn hơn rất nhiều.

## Sử dụng hằng số trong ES6

ES6 cung cấp từ khóa `const` cho phép bạn định nghĩa hằng số rất ngắn gọn:

```js
const myconst = 10;
console.log(myconst); // 10

myconst = 99;
// TypeError: Assignment to constant variable.

console.log(myconst);
```

Ngoài ra, `const` có phạm vi sử dụng theo **block**, giống như [`let`](/phan-biet-var-va-let-trong-javascript/), ví dụ:

```js
function test() {
  const myconst = 10;
  console.log(myconst); // 10
}

console.log(myconst); // myconst is not defined
```

Bạn thấy đó, ở ngoài hàm `test`, `myconst` chưa được định nghĩa.

Tham khảo:

- [Hằng là gì? Hằng trong JS](/hang-la-gi-hang-trong-javascript/)
- [Immutable object - đối tượng bất biến](/2-cach-tao-immutable-object-javascript/)
