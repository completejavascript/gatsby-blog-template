---
date: "2017-07-15T06:00:00Z"
update: "2022-05-11T21:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/microtasks-la-gi-microtasks-trong-javascript.png"
keywords: "microtasks là gì, microtasks trong javascript"
description: "Bạn liệu đã biết microtasks là gì? Micro tasks trong JavaScript hoạt động như thế nào? Bài viết sau đây sẽ giúp bạn giải đáp các câu hỏi trên về microtasks."
slug: microtasks-la-gi-microtasks-trong-javascript
title: "Microtasks là gì? Microtasks trong JavaScript"
shortTitle: "Microtasks là gì? Microtasks trong JS"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Callback
  - Promise
---

Trình xử lý promise `.then`, `.catch` và `.finally` luôn không đồng bộ.

Ngay cả khi một promise được giải quyết ngay lập tức, dòng code bên dưới `.then`, `.catch`, `.finally` vẫn sẽ thực thi trước các trình xử lý này.

Ví dụ:

```js
let promise = Promise.resolve();

promise.then(() => console.log("promise done!"));

console.log("code finished"); // đoạn này hiển thị trước
```

Khi chạy đoạn code trên, bạn sẽ thấy `"code finished"` hiển thị trước và sau đó là `"promise done!"`.

Tại sao lại như vậy, khi mà promise gần như resolve ngay lập tức?

## Hàng đợi microtasks

Các tác vụ không đồng bộ cần được quản lý thích hợp. Vì vậy, tiêu chuẩn ECMA chỉ định một hàng đợi nội bộ `PromiseJobs`, thường được gọi là **hàng đợi microtask** (thuật ngữ V8).

Như được nêu trong [đặc tả kỹ thuật](https://tc39.github.io/ecma262/#sec-jobs-and-job-queues):

- Hàng đợi là **first-in-first-out** - các tác vụ được xếp trước sẽ chạy trước.
- Việc thực thi một tác vụ chỉ được bắt đầu khi không có tác vụ nào khác đang chạy.

Nói một cách đơn giản, khi một promise đã sẵn sàng, các trình xử lý `.then/catch/finally` tương ứng sẽ được đưa vào hàng đợi. Và chúng vẫn chưa được thực hiện.

Khi JavaScript engine chạy xong luồng code hiện tại, engine sẽ nhận một tác vụ từ hàng đợi để thực thi.

Đó là lý do tại sao `"code finished"` hiển thị trước `"promise done!"`.

Nếu có một chuỗi với nhiều `.then/catch/finally` thì mỗi tác vụ trong số đó được thực thi không đồng bộ. Có nghĩa là, tác vụ đầu tiên được xếp vào hàng đợi. Sau đó, tác vụ được thực thi khi mã hiện tại hoàn tất và các trình xử lý được **xếp hàng trước đó** đã hoàn thành.

Làm thế nào nếu bạn cần các tác vụ thực hiện theo đúng thứ tự? Làm sao để `code finished` xuất hiện sau `promise done`?

Cách giải quyết đơn giản là bạn chỉ cần đưa chúng vào hàng đợi với `.then`:

```js
Promise.resolve()
  .then(() => console.log("promise done!"))
  .then(() => console.log("code finished"));

// promise done!
// code finished
```

Bạn thấy rằng kết quả đã đúng như mong đợi.

## Từ chối không được xử lý

Hãy nhớ sự kiện `unhandledrejection` từ bài viết [xử lý lỗi với promise](/xu-ly-loi-voi-promise-trong-javascript/).

Bây giờ, bạn có thể **thấy chính xác** cách JavaScript phát hiện ra có một sự từ chối không được xử lý. Cái này gọi là "Unhandled rejection".

**Unhandled rejection** xảy ra khi lỗi promise không được xử lý ở cuối hàng đợi microtasks.

Thông thường, nếu mình cần xử lý lỗi, mình sẽ thêm `.catch` vào chuỗi promise để xử lý:

```js
let promise = Promise.reject(new Error("Promise Failed!"));
promise.catch((err) => console.log("caught"));

// phần event này không chạy vì lỗi đã được xử lý bên trên
window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);
```

Nếu bạn quên thêm `.catch` thì sau khi hàng đợi microtask trống, JavaScript sẽ kích hoạt sự kiện `unhandledrejection`:

```js
let promise = Promise.reject(new Error("Promise Failed!"));

// Promise Failed!
window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);
```

Và điều gì xảy ra nếu bạn xử lý lỗi sau một khoảng thời gian:

```js
let promise = Promise.reject(new Error("Promise Failed!"));
setTimeout(() => promise.catch((err) => console.log("caught")), 1000);

// Error: Promise Failed!
window.addEventListener("unhandledrejection", (event) =>
  console.log(event.reason)
);
```

Nếu chạy đoạn code trên, bạn sẽ thấy rằng `Promise Failed!` hiển thị trước và sau đó là `caught`.

Nếu bạn không biết về hàng đợi microtasks, có thể bạn sẽ hỏi: "Tại sao trình xử lý `unhandledrejection` lại chạy, trong khi promise đã được `catch`?"

Bây giờ, bạn hiểu rằng `unhandledrejection` được tạo ra khi hàng đợi microtasks hoàn tất: JavaScript engine kiểm tra các promise và nếu bất kỳ promise nào trong số chúng ở trạng thái **bị từ chối**, thì sự kiện sẽ kích hoạt.

## Tổng kết

Việc xử lý promise luôn không đồng bộ, vì tất cả các hành động đi qua hàng đợi microtasks. Do đó, các trình xử lý `.then/catch/finally` luôn được gọi sau khi luồng code hiện tại kết thúc.

Nếu bạn cần đảm bảo rằng một đoạn mã được thực thi sau `.then/catch/finally`, bạn có thể đặt đoạn code đó vào chuỗi promise sau `.then`.

Trong hầu hết các Javascript engine, bao gồm cả trình duyệt và Node.js, khái niệm microtasks được gắn chặt với **vòng lặp sự kiện** và **macrotasks**.

Tuy nhiên, vì những khái niệm này không có liên quan trực tiếp đến promise, nên mình sẽ giới thiệu ở các bài viết sau.

Tham khảo: [Microtasks](https://javascript.info/microtask-queue)
