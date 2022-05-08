---
date: "2017-07-09T13:45:00Z"
update: "2022-05-08T13:45:48Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/promise-la-gi-promise-trong-javascript.png"
keywords: "promise là gì, promise trong javascript"
description: "Promise trong JavaScript là một cách để xử lý bất đồng bộ một cách tốt hơn so với callback. Qua bài viết này, bạn sẽ biết promise là gì và cách sử dụng promise trong JavaScript."
slug: promise-la-gi-promise-trong-javascript
title: "Promise là gì? Promise trong JavaScript"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Promise
---

Giả sử, bạn là một ca sĩ hàng đầu và người hâm mộ luôn yêu cầu bài hát sắp tới của bạn.

Bạn hứa sẽ gửi bài hát cho họ sau khi được xuất bản. Bạn cung cấp cho người hâm mộ bạn một danh sách. Họ có thể điền địa chỉ email vào để khi bài hát có sẵn, tất cả người đã đăng ký sẽ nhận được ngay.

Và ngay cả khi có sự cố xảy ra, chẳng hạn như phòng thu bị chập cháy, khiến bạn không thể xuất bản bài hát, họ vẫn sẽ được thông báo.

Lúc này mọi người đều **win-win** bởi với:

- **Bạn**: vì mọi người không còn đông đúc bạn nữa.
- **Người hâm mộ**: vì họ sẽ không bỏ lỡ bài hát mới.

Đây là một điều tương tự trong cuộc sống mà chúng ta thường gặp trong lập trình:

1. Một đoạn mã `(1)` thực hiện một tác vụ nào đấy và cần thời gian, ví dụ: đoạn code tải dữ liệu qua mạng. Đó là một **ca sĩ**.
2. Một đoạn mã `(2)` muốn kết quả của đoạn mã trên khi mọi thứ đã sẵn sàng. Nhiều hàm có thể cần kết quả đó. Đây là những **người hâm mộ**.
3. Một [promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) (lời hứa) là một đối tượng JavaScript đặc biệt liên kết 2 đoạn mã trên lại với nhau. Đó có thể hiểu là một **danh sách đăng ký**. Đoạn `(1)` cần thời gian để thực hiện và **Promise** cung cấp kết quả đó cho tất cả các đoạn code đã đăng ký.

Ví dụ trên có thể không mô tả hoàn toàn chính xác những gì mà promise trong JavaScript có thể làm. Tuy nhiên, ví dụ đó cũng giúp bạn phần nào hiểu được promise là gì.

## Promise trong JavaScript

Cú pháp khởi tạo promise trong JavaScript là:

```js
let promise = new Promise(function (resolve, reject) {
  // xử lý
});
```

Hàm được truyền tới `new Promise` được gọi là **trình thực thi** - **executor**. Khi `new Promise` được tạo, trình thực thi sẽ tự động chạy.

Các đối số của trình thực thi promise là `resolve` và `reject`. Đó là các hàm [callback](/callback-la-gi-callback-trong-javascript/) do chính JavaScript cung cấp. Phần code xử lý chỉ nằm bên trong trình thực thi.

Khi trình thực thi nhận được kết quả, dù sớm hay muộn, nó sẽ gọi một trong các hàm callback như sau:

- `resolve(value)`: nếu công việc kết thúc thành công, có kết quả `value`.
- `reject(error)`: nếu một lỗi đã xảy ra, `error` là [đối tượng lỗi](/quan-ly-loi-voi-try-catch-trong-javascript/).

**Tóm lại**: trình thực thi chạy tự động và cố gắng thực hiện một công việc. Khi kết thúc quá trình, nó sẽ gọi `resolve` nếu thành công hoặc `reject` nếu có lỗi.

Đối tượng `promise` được trả về bởi hàm khởi tạo `new Promise` có các thuộc tính bên trong sau:

- `state`: ban đầu `"pending"`, sau đó chuyển thành `"fulfilled"` khi `resolve` được gọi hoặc `"rejected"` khi `reject` được gọi.
- `result`: lúc đầu `undefined`, sau đó chuyển thành `value` khi `resolve(value)` được gọi hoặc `error` khi nào `reject(error)` được gọi.

Cuối cùng, trình thực thi chuyển `promise` đến một trong hai trạng thái sau:

- `resolve` với `state="fulfilled"` và `result=value`.
- `reject` với `state="rejected"` và `result=error`.

Tiếp theo, mình sẽ xem cách để đăng ký những thay đổi này.

### Đăng ký thay đổi trạng thái Promise

Dưới đây là một ví dụ về hàm tạo promise và hàm thực thi đơn giản (thông qua `setTimeout`):

```js
let promise = new Promise(function (resolve, reject) {
  // hàm được chạy ngay khi promise được tạo
  // sau 1 giây, kết quả thu được là "done"
  setTimeout(() => resolve("done"), 1000);
});
```

Bạn có thể thấy rằng:

1. Trình thực thi được gọi tự động và ngay lập tức - sau `new Promise`.
2. Trình thực thi nhận được hai đối số: `resolve`và `reject`. Các hàm này được xác định trước bởi JavaScript engine. Vì vậy, bạn không cần tạo chúng. Bạn chỉ nên gọi một trong hai hàm khi kết quả sẵn sàng.

Sau một giây, trình thực thi sẽ gọi `resolve("done")` để đưa ra kết quả. Điều này làm thay đổi trạng thái của đối tượng `promise` thành:

- `state`: `fullfilled`
- `result`: `"done"`

Đó là một ví dụ về việc thực hiện công việc thành công, một **lời hứa được thực hiện**.

Tiếp theo là ví dụ khác về việc trình thực thi **từ chối lời hứa** với một lỗi:

```js
let promise = new Promise(function (resolve, reject) {
  // sau 1 giây, công việc kết thúc với một lỗi
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});
```

Việc gọi hàm `reject(...)` chuyển đối tượng promise sang trạng thái `"rejected"` như sau:

- `state`: `rejected`
- `result`: `"Whoops!"`

Như vậy, trình thực thi nên thực hiện một công việc (thường sẽ tốn thời gian) và sau đó gọi `resolve` hoặc `reject` để thay đổi trạng thái của đối tượng Promise tương ứng.

Một Promise được giải quyết hoặc bị từ chối được gọi là **settled** - **đã giải quyết**, ngược lại thì là **pending** - **đang chờ xử lý**.

**Chú ý:**

- Promise chỉ có một kết quả duy nhất hoặc một lỗi.
- Trình thực thi chỉ nên gọi một lần `resolve` hoặc `reject`. Bất kỳ thay đổi trạng thái nào đều là **final**, không thể thay đổi được.
- Tất cả các lời gọi hàm tiếp theo `resolve` và `reject` đều bị bỏ qua.

```js{2}
let promise = new Promise(function (resolve, reject) {
  resolve("done");

  reject(new Error("…")); // bị bỏ qua
  setTimeout(() => resolve("…")); // bị bỏ qua
});
```

Ngoài ra, `resolve` và `reject` chỉ xử lý một đối số (hoặc không có) và sẽ bỏ qua các đối số còn lại.

### Reject với đối tượng `Error`

Trong trường hợp có vấn đề gì đó xảy ra, trình thực thi nên gọi `reject`.

Điều đó có thể được thực hiện với bất kỳ loại đối số nào - giống như `resolve`. Nhưng nên sử dụng các đối tượng `Error` hoặc các [kế thừa từ `Error`](/tuy-bien-mo-rong-doi-tuong-error/) để đảm bảo code rõ ràng, dễ hiểu.

### Gọi ngay `resolve` hoặc `reject`

Trong thực tế, trình thực thi thường thực hiện điều gì đó không đồng bộ và gọi `resolve` hoặc `reject` sau một thời gian. Nhưng không nhất thiết phải như vậy, bạn cũng có thể gọi `resolve` hay `reject` ngay lập tức như sau:

```js
let promise = new Promise(function (resolve, reject) {
  // công việc không tốn thời gian
  resolve(123);
  // thu được kết quả ngay lập tức là: 123
});
```

Trường hợp này thường xảy ra khi bạn bắt đầu thực hiện một công việc. Nhưng sau đó, bạn thấy rằng mọi thứ đã được hoàn thành và lưu vào bộ nhớ cache.

Khi đó, bạn có thể gọi `resolve` ngay lập tức để có kết quả.

> **Chú ý:** các thuộc tính `state` và `result` của đối tượng Promise là nội bộ bên trong Promise. Bạn không thể truy cập trực tiếp vào chúng. Thay vào đó, bạn có thể sử dụng các phương thức `.then` hoặc `.catch` hoặc `.finally`.

## Sử dụng "then", "catch" và "finally"

Đối tượng Promise đóng vai trò là liên kết giữa trình thực thi và nơi sử dụng - sẽ nhận được kết quả hoặc lỗi. Các hàm sử dụng có thể được đăng ký bằng các phương thức `.then` hay `.catch` hoặc `.finally`.

### Thành phần "then" trong Promise

Thành cơ bản nhất là `.then` với cú pháp như sau:

```js
promise.then(
  function (result) {
    // xử lý kết quả thành công
  },
  function (error) {
    // xử lý lỗi
  }
);
```

Trong đó:

- Đối số đầu tiên của `.then` là một hàm chạy khi Promise được giải quyết và nhận kết quả.
- Đối số thứ hai của `.then` là một hàm chạy khi Promise bị từ chối và nhận được lỗi.

Ví dụ, đây là cách xử lý với một Promise được giải quyết thành công:

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve("done!"), 1000);
});

// xử lý kết quả ở hàm đầu tiên trong .then
promise.then(
  (result) => console.log(result), // hiển thị "done!" sau 1 giây
  (error) => console.log(error) // không thực hiện
);
```

Trong ví dụ trên, hàm đầu tiên đã được thực thi.

Và trong trường hợp Promise bị từ chối thì hàm thứ hai được thực thi:

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// reject thực hiện chạy hàm thứ hai trong .then
promise.then(
  (result) => console.log(result), // không chạy
  (error) => console.log(error) // hiển thị "Error: Whoops!" sau 1 giây
);
```

Nếu bạn chỉ quan tâm đến việc Promise thành công thì bạn chỉ cần cung cấp một đối số hàm cho `.then`:

```js
let promise = new Promise((resolve) => {
  setTimeout(() => resolve("done!"), 1000);
});

promise.then(alert); // hiển thị "done!" sau 1 giây
```

### Thành phần "catch" trong Promise

Nếu bạn chỉ quan tâm đến lỗi thì bạn có thể truyền đối số đầu tiên là `null` dạng `.then(null, errorHandlingFunction)`. Hoặc bạn có thể sử dụng `.catch(errorHandlingFunction)`, hoàn toàn giống nhau:

```js
let promise = new Promise((resolve, reject) => {
  setTimeout(() => reject(new Error("Whoops!")), 1000);
});

// .catch(f) tương đương với promise.then(null, f)
promise.catch(alert); // hiển thị "Error: Whoops!" sau 1 giây
```

Câu lệnh `.catch(f)` hoàn toàn tương tự `.then(null, f)`, vì đó chỉ là một cách viết tắt.

### Thành phần "finally" trong Promise

Cũng giống như mệnh đề `finally` thông thường trong `try {...} catch {...}`, Promise cũng có `finally`.

Lời gọi `.finally(f)` tương tự như `.then(f, f)` theo nghĩa hàm `f` luôn chạy khi Promise được giải quyết (thành công hay có lỗi).

Thành phần `finally` là một nơi tốt để xử lý việc **dọn dẹp**. Ví dụ như dừng các chỉ báo **đang tải dữ liệu**,... vì chúng không cần thiết nữa, bất kể kết quả là gì.

Ví dụ như sau:

```js
new Promise((resolve, reject) => {})
  .finally(() => {
    /* dừng loading */
  })
  .then(
    (result) => {
      /* xử lý result  */
    },
    (err) => {
      /* xử lý lỗi */
    }
  );
```

Điều đó nói rằng, `finally(f)` không thật sự chính xác là cách viết khác của `then(f,f)` mà có một số khác biệt nhỏ:

1. `finally` không có đối số. Trong `finally`, bạn không biết liệu Promise có thành công hay không. Vì nhiệm vụ của phần này là thực hiện các phần hoàn thiện **chung**.
2. `finally` chuyển kết quả và lỗi cho phần xử lý tiếp theo.

Ví dụ kết quả được chuyển từ `finally` đến `then`:

```js
new Promise((resolve, reject) => {
  setTimeout(() => resolve("result"), 2000);
})
  .finally(() => console.log("Promise ready"))
  .then((result) => console.log(result)); // <-- .then xử lý kết quả
```

Và đây là trường hợp lỗi được chuyển từ `finally` qua `catch`:

```js
new Promise((resolve, reject) => {
  throw new Error("error");
})
  .finally(() => console.log("Promise ready"))
  .catch((err) => console.log(err)); // <-- .catch xử lý lỗi
```

Nghĩa là `finally` không xử lý kết quả mà chỉ nhận và chuyển đến thành phần tiếp theo.

## Ví dụ "loadScript"

Trong bài viết về [callback](/callback-la-gi-callback-trong-javascript/), mình có đề cập tới ví dụ `loadScript` - chức năng tải một tập lệnh.

Đây là cách sử dụng callback:

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.append(script);
}
```

Sau đây mình sẽ viết lại bằng Promises.

Hàm `loadScript` mới không yêu cầu truyền vào callback. Thay vào đó, hàm này tạo và trả về một đối tượng Promise - sẽ xử lý khi quá trình tải hoàn tất. Phần code bên ngoài có thể thêm trình xử lý (hàm đăng ký) vào đó bằng cách sử dụng `.then`:

```js
function loadScript(src) {
  return new Promise(function (resolve, reject) {
    let script = document.createElement("script");
    script.src = src;

    script.onload = () => resolve(script);
    script.onerror = () => reject(new Error(`Script load error for ${src}`));

    document.head.append(script);
  });
}
```

Cách sử dụng hàm `loadScript` mới với Promise trong JavaScript:

```js
let promise = loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/4.17.11/lodash.js"
);

promise.then(
  (script) => console.log(`${script.src} is loaded!`),
  (error) => console.log(`Error: ${error.message}`)
);

promise.then((script) => console.log("Another handler..."));
```

## Tổng kết

Bạn có thể thấy ngay lợi ích của việc dùng Promise so với callback như sau:

- Promise:
  - Cho phép bạn làm mọi thứ theo trình tự tự nhiên. Đầu tiên, bạn chạy `loadScript(script)` và `.then` viết những gì cần làm với kết quả.
  - Bạn có thể gọi `.then` bao nhiều lần tùy ý. Mỗi lần như vậy, bạn lại thêm một hàm đăng ký mới vào **danh sách đăng ký**.
- Callback:
  - Bạn phải có một hàm `callback` khi gọi `loadScript(script, callback)`. Nói cách khác, bạn cần biết phải làm gì với kết quả **trước khi** `loadScript` được gọi.
  - Chỉ có thể gọi lại một lần.

Vì vậy, Promise cung cấp luồng code tốt hơn và tính linh hoạt tốt hơn so với callback. Nhưng còn nhiều hơn thế nữa. Mình sẽ cùng tìm hiểu trong các bài viết tiếp theo.

Tham khảo: [Promise](https://javascript.info/promise-basics)
