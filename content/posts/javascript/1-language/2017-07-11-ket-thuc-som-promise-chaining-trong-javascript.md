---
date: "2017-07-11T06:00:26Z"
update: "2019-01-18T02:00:26Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/ket-thuc-som-promise-chaining-trong-javascript-completejavascript.com_.png"
keywords: "kết thúc sớm Promise chaining"
description: "Bài viết này mình sẽ trình bày 2 cách để kết thúc sớm Promise chaining trong JavaScript là không thực hiện return hoặc sử dụng Promise.reject()."
slug: ket-thuc-som-promise-chaining-trong-javascript
title: "Kết thúc sớm Promise chaining trong JavaScript"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Promise
---

Có thể bạn đã quen với việc sử dụng [Promise](/promise-la-gi-promise-trong-javascript/) để xử lý bất đồng bộ trong JavaScript. Tuy nhiên, trong trường hợp thực hiện nhiều Promise liên tiếp nhau ([Promise chaining](/chuoi-promise-trong-javascript/)) mà bạn muốn dừng giữa chừng thì sao? Hay nói cách khác là làm sao để kết thúc sớm Promise chaining trong JavaScript?

## Bài toán thực tế

Thử xét một bài toán thực tế khi mà việc kết thúc sớm Promise chaining là cần thiết. Đó là khi triển khai API để đăng ký User qua Email. Mình có thể tóm tắt lại các bước thực hiện như sau:

```
Tìm kiếm User qua email
    .then(
      Nếu email đã tồn tại thì sẽ kết thúc sớm Promise chaining.
      Ngược lại sẽ thực hiện bước tiếp theo.
    )
    .then(
      Hash mật khẩu.
    )
    .then(
      Tạo User và lưu vào cơ sở dữ liệu.
    )
    .catch(
      Xử lý khi có bất kỳ lỗi gì xảy ra.
    )
```

Bạn thấy đó, ngay tại bước `then` đầu tiên, nếu email đã tồn tại thì mình sẽ kết thúc sớm chuỗi promise. Có thể bạn sẽ triển khai API để đăng ký User qua Email theo cách khác của mình. Tuy nhiên, đây chỉ là một ví dụ dùng để minh hoạ mà thôi.

Vậy làm sao để kết thúc sớm Promise chaining trong JavaScript?

Dưới đây, mình sẽ xem xét một bài toán phi thực tế để biết cách triển khai code như thế nào nhé!

## Bài toán ví dụ

Bài toán ví dụ về chuỗi promise.

### Giới thiệu bài toán

Giả sử mình có đoạn code dưới đây:

```js
const increase = (x) => {
  console.log(x);
  return x + 1;
};

const run = (x) => {
  new Promise((resolve, reject) => {
    resolve(x);
  })
    .then((res) => increase(res))
    .then((res) => increase(res))
    .then((res) => increase(res))
    .catch((err) => console.log("Catched: " + err));
};
```

Trong đó:

- [Hàm](/ham-la-gi-ham-trong-javascript/) `increase` sẽ trả về giá trị của đầu vào `+ 1`.
- Hàm `run` thực hiện một promise chaining, với mỗi mắt xích sẽ gọi hàm `increase`.

Với hàm `run` như trên thì với mọi giá trị của `x`, ba cái `.then` trên luôn được thực hiện.

Ví dụ với `x = 4` thì kết quả thu được là:

```js
run(4);
/*
 * 4
 * 5
 * 6
 */
```

Nếu mình muốn kết thúc sớm Promise chaining ngay tại `then` đầu tiên khi giá trị của `res` lớn hơn 3 thì sao?

Có 2 cách để giải quyết bài toán này, đó là: **không thực hiện return** hoặc **sử dụng [Promise.reject()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject)**

### Kết thúc sớm Promise chaining bằng cách không return

Bình thường, khi thực hiện `return`, giá trị `return` được đưa đến mắt xích tiếp theo của chuỗi Promise để xử lý.

Và nếu bạn không `return` thì giá trị đó được hiểu là `undefined`. Dựa vào đặc điểm này, mình sẽ thay đổi đoạn code trên như sau:

```js
const increase = (x) => {
  console.log(x);
  return x + 1;
};

const run = (x) => {
  new Promise((resolve, reject) => {
    resolve(x);
  })
    .then((res) => {
      if (res <= 3) return increase(res);
    })
    .then((res) => {
      if (res !== undefined) return increase(res);
    })
    .then((res) => {
      if (res !== undefined) return increase(res);
    })
    .catch((err) => console.log("Catched: " + err));
};

run(3);
/*
 * 3
 * 4
 * 5
 */

run(4);
// Nothing
```

Với `x = 3`: giá trị của `res` tại `then` đầu tiên là `3`, thoả mãn `res <= 3` nên đoạn code đó trả về `increase(res)`. Dẫn đến, giá trị của `res` tại các `then` tiếp theo lần lượt là `4` và `5`.

Với `x = 4`: ngay tại `then` đầu tiên `res` sẽ bằng `4`, không thoả mãn `res <= 3` nên đoạn code `return increase(res)` không được thực hiện. Dẫn đến, đoạn `then` này trả về `undefined`. Do đó các `then` tiếp theo, giá trị của `res` sẽ là `undefined`. Mà mình đã kiểm tra nếu `res !== undefined` thì mới thực hiện. Tóm lại, mình đã kết thúc sớm Promise chaining ngay tại `then` đầu tiên rồi.

Tuy nhiên, nếu để ý kĩ thì bạn sẽ thấy cách này chỉ giải quyết được về mặt kết quả. Còn về hình thức thì các mắt xích của chuỗi Promise vẫn được nhảy đến. Điều này có thể tiềm ẩn nhiều **Bug** sau này. Vì vậy, cái mà mình mong muốn thực sự là việc kết thúc sớm Promise chaining sẽ giúp thoát khỏi chuỗi Promise một cách hoàn toàn.

### Kết thúc sớm Promise chaining sử dụng Promise.reject()

Đúng vậy, việc sử dụng [`Promise.reject()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/reject) giúp bạn kết thúc sớm Promise chaining bằng cách nhảy thẳng đến phần `catch`. Khi đó, đoạn code trên sẽ trở thành:

```js
const increase = (x) => {
  console.log(x);
  return x + 1;
};

const run = (x) => {
  new Promise((resolve, reject) => {
    resolve(x);
  })
    .then((res) => {
      if (res <= 3) return increase(res);
      return Promise.reject(res);
    })
    .then((res) => increase(res))
    .then((res) => increase(res))
    .catch((err) => console.log("Catched: " + err));
};

run(3);
/*
 * 3
 * 4
 * 5
 */
run(4);
// Catched: 4
```

Trong trường hợp này, mình chỉ cần thêm phần xử lý tại `then` đầu tiên.

Với `x = 3`: Kết quả vẫn như phần trên.

Với `x = 4`: Tại `then` đầu tiên, `res` bằng `4`, không thoả mãn `res <= 3` nên đoạn đó sẽ thực hiện `return Promise.reject(res)`. Điều này dẫn đến các đoạn `then` tiếp theo bị bỏ qua mà nhảy thẳng đến đoạn `catch`. Tại đây, giá trị của `err` bằng giá trị của `res` đã bị reject bên trên, nên bằng `4`.

Rõ ràng, việc sử dụng `Promise.reject()` đã giúp kết thúc sớm Promise chaining một cách hoàn toàn rồi.

## Tổng kết

Như vậy là mình đã giới thiệu với bạn 2 cách để kết thúc sớm Promise chaining trong JavaScript. Nếu bạn biết thêm cách nào khác để thực hiện việc này thì hãy chia sẻ với mình trong phần bình luận phía dưới nhé!

Xin chào và hẹn gặp lại!
