---
date: "2017-07-12T06:00:26Z"
update: "2022-05-08T20:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/xu-ly-loi-voi-promise-trong-javascript.png"
keywords: "xử lý lỗi với promise, catch trong promise"
description: "Promise cũng giống như try...catch, bạn có thể xử lý lỗi với promise tại catch. Catch nên đặt ở cuối chuỗi promise để bắt được tất cả các lỗi trước đó trong promise chaining."
slug: xu-ly-loi-voi-promise-trong-javascript
title: "Xử lý lỗi với promise trong JavaScript"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Promise
---

[Chuỗi promise](/chuoi-promise-trong-javascript/) rất hiệu quả trong việc xử lý lỗi. Khi một promise bị từ chối, luồng điều khiển sẽ chuyển đến phần xử lý từ chối gần nhất. Điều đó rất thuận tiện trong thực tế.

Ví dụ với đoạn code bên dưới, URL truyền vào hàm `fetch` là sai (không có trang web nào như vậy) và `.catch` xử lý lỗi:

```js
fetch("https://no-such-server.blabla") // rejects vì URL bị sai
  .then((response) => response.json())
  .catch((err) => console.log(err)); // TypeError: failed to fetch
```

Như bạn thấy, `.catch` không nhất thiết phải có ngay lập tức mà có thể sau một hoặc vài lần `.then`.

Hoặc có thể, mọi thứ đều ổn với trang web, nhưng kết quả trả về là một [JSON](/tim-hieu-ve-json-trong-javascript/) không hợp lệ. Khi đó, cách dễ nhất để bắt tất cả các lỗi là thêm `.catch` vào cuối chuỗi promise:

```js
fetch("/api/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise((resolve, reject) => {
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser);
        }, 3000);
      })
  )
  .catch((error) => console.log(error.message));
```

Thông thường, `.catch` sẽ không kích hoạt. Nhưng nếu bất kỳ promise nào ở trên bị từ chối (sự cố mạng hoặc json không hợp lệ hoặc bất cứ điều gì) thì `.catch` sẽ bắt được lỗi đó.

## Try...catch ẩn

Code thực thi của promise và các trình xử lý promise luôn có [`try..catch`](/quan-ly-loi-voi-try-catch-trong-javascript/) ẩn xung quanh. Nếu ngoại lệ (exception) xảy ra, lỗi đó sẽ bị bắt bởi `.catch` và đó coi như một sự từ chối.

Ví dụ đoạn code sau:

```js
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
}).catch(console.log); // Error: Whoops!
```

Hoạt động tương tự như sau:

```js
new Promise((resolve, reject) => {
  reject(new Error("Whoops!"));
}).catch(console.log); // Error: Whoops!
```

Phần `try..catch` ẩn xung quanh trình thực thi sẽ tự động bắt lỗi và biến promise trở thành trạng thái bị từ chối.

Điều này xảy ra không chỉ trong hàm thực thi mà còn trong các trình xử lý của nó. Nếu bạn `throw` bên trong một trình xử lý `.then`, điều đó có nghĩa là một promise bị từ chối. Do đó, luồng điều khiển sẽ chuyển đến trình xử lý lỗi gần nhất - `.catch` gần nhất.

Sau đây là ví dụ:

```js
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    throw new Error("Whoops!"); // từ chối promise
  })
  .catch(console.log); // Error: Whoops!
```

Điều này xảy ra với tất cả các lỗi, không chỉ những lỗi do câu lệnh `throw`. Ví dụ lỗi lập trình như sau:

```js
new Promise((resolve, reject) => {
  resolve("ok");
})
  .then((result) => {
    aha(); // hàm chưa định nghĩa
  })
  .catch(console.log); // ReferenceError: aha is not defined
```

Tóm lại, `.catch` không chỉ bắt những lời từ chối promise cụ thể, mà còn những lỗi vô tình như trên.

## Rethrowing khi có lỗi

Như bạn nhận thấy, `.catch` ở cuối chuỗi promise tương tự như `try..catch`. Mình có thể có **nhiều** trình xử lý `.then` tùy thích và sau đó sử dụng **một** trình xử lý `.catch` duy nhất ở cuối để bắt lỗi trong tất cả các trường hợp.

Ở cấu trúc `try..catch` thông thường, mình sẽ phân tích lỗi và `throw` ra lỗi nếu không thể xử lý được. Điều tương tự cũng xảy ra với promise.

Nếu bạn `throw` bên trong `.catch` thì luồng điều khiển sẽ chuyển đến trình xử lý lỗi gần nhất tiếp theo. Sau đó, giả sử bạn xử lý lỗi và kết thúc bình thường, thì luồng điều khiển sẽ tiếp tục chuyển đến `.then` gần nhất tiếp theo.

Trong ví dụ bên dưới, `.catch` xử lý lỗi thành công:

```js
// thực hiện catch -> then
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    console.log("The error is handled, continue normally");
  })
  .then(() => console.log("Next successful handler runs"));
```

Ở đây khối `.catch` kết thúc bình thường. Vì vậy, trình xử lý `.then` tiếp theo được gọi.

Ví dụ sau đây, bạn thấy trường hợp khác với `.catch`. Trình xử lý tại `(*)` bắt lỗi và không thể xử lý vì nó chỉ biết cách xử lý lỗi `URIError`. Vì vậy, `throw` error một lần nữa:

```js
// thực hiện catch -> catch
new Promise((resolve, reject) => {
  throw new Error("Whoops!");
})
  .catch(function (error) {
    // (*)
    if (error instanceof URIError) {
      // nếu lỗi là URIError thì xử lý nó
    } else {
      console.log("Can't handle such error");
      throw error; // lỗi không biết -> throw để xử lý ở catch tiếp
    }
  })
  .then(function () {
    // không chạy vào đây
  })
  .catch((error) => {
    // (**)
    console.log(`The unknown error has occurred: ${error}`);
    // don't return anything => execution goes the normal way
  });
```

Quá trình thực hiện sẽ nhảy từ bước `.catch` đầu tiên tại `(*)` sang lần tiếp theo tại `(**)`.

## Từ chối promise mà không xử lý

Điều gì xảy ra khi lỗi không được xử lý?

Ví dụ, mình quên thêm `.catch` vào cuối chuỗi promise, như sau:

```js
new Promise(function () {
  noSuchFunction(); // lỗi hàm chưa định nghĩa
}).then(() => {
  // trình xử lý promise thành công
}); // không có .catch ở cuối
```

Trường hợp có lỗi, promise bị từ chối và việc thực thi sẽ chuyển đến `.catch` gần nhất. Nhưng không có. Vì vậy, lỗi bị **kẹt**, không có đoạn code nào xử lý lỗi.

Thực tế, giống như với các lỗi thông thường trong code, điều đó có nghĩa là một điều gì đó đã có lỗi sai nghiêm trọng.

Điều gì xảy ra khi một lỗi thường xuyên xuất hiện và không được bắt bởi `try..catch`?

Chương trình sẽ bị **crash** với một thông báo trong [DevTool](/dev-tools-la-gi/). Điều tương tự cũng xảy ra với những promise bị từ chối mà không được catch.

JavaScript engine theo dõi những từ chối promise như vậy và tạo ra **lỗi toàn cục**. Bạn có thể thấy trong console nếu chạy ví dụ trên.

Trong trình duyệt, bạn có thể thấy các lỗi như vậy bằng cách dùng sự kiện `unhandledrejection`:

```js
window.addEventListener("unhandledrejection", function (event) {
  // object event có hai thuộc tính đặc biệt là promise và reason.
  console.log(event.promise); // [object Promise] - promise sinh ra lỗi
  console.log(event.reason); // Error: Whoops! - error object chưa được bắt
});

new Promise(function () {
  throw new Error("Whoops!");
}); // không có catch để bắt lỗi
```

Nếu lỗi xảy ra và không có `.catch`, trình xử lý `unhandledrejection` sẽ kích hoạt và lấy đối tượng `event` chứa thông tin về lỗi. Sau đó, bạn có thể làm điều gì đó.

Thông thường, những lỗi như vậy là **không thể khôi phục được**. Do đó, cách tốt nhất là thông báo cho người dùng về sự cố và có thể báo cáo sự cố cho máy chủ.

Trong các môi trường không phải trình duyệt như Node.js, có nhiều cách khác để theo dõi các lỗi chưa được khắc phục.

## Tổng kết

- `.catch` xử lý lỗi trong tất cả các loại promise: có thể là lời gọi `reject()` hoặc lỗi được đưa ra trong một trình xử lý.
- Bạn nên đặt chính xác `.catch` tại những nơi mà bạn muốn xử lý lỗi và biết cách xử lý. Trình xử lý nên phân tích lỗi và `throw` ra những lỗi chưa biết.
- Nếu không có cách nào để khôi phục sau lỗi, bạn có thể không cần dùng `.catch`.
- Trong mọi trường hợp, bạn nên có trình xử lý sự kiện `unhandledrejection` (đối với trình duyệt và các môi trường tương tự khác) để theo dõi các lỗi chưa được khắc phục và thông báo cho người dùng (hoặc có thể là máy chủ của mình), để chương trình không bao giờ **chết**.

Tham khảo: [Error handling with promises](https://javascript.info/promise-error-handling)
