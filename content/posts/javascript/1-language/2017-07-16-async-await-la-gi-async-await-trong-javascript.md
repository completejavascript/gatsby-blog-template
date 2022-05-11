---
date: "2017-07-16T06:00:00Z"
update: "2022-05-11T21:45:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/async-await-la-gi-async-await-trong-javascript.png"
keywords: "async/await là gì, async/await trong javascript"
description: "Có một cú pháp đặc biệt để làm việc với các promise theo cách thoải mái hơn, được gọi là async / await. Cách này thật sự dễ hiểu và dễ sử dụng."
slug: async-await-la-gi-async-await-trong-javascript
title: "Async/await là gì? Async/await trong JavaScript"
shortTitle: "Async/await là gì? Async/await trong JS"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Async - Await
  - Promise
---

Có một **cú pháp đặc biệt** để làm việc với các promise theo cách thoải mái hơn, được gọi là **async / await**. Cách này thật sự dễ hiểu và dễ sử dụng.

## Hàm "async"

Hãy bắt đầu với từ khóa `async`. Từ khóa này có thể được đặt trước một hàm như sau:

```js
async function f() {
  return 1;
}
```

Từ khóa `async` đặt trước một hàm giúp hàm đó luôn trả về **promise**. Các giá trị khác được bao bọc trong một promise đã được resolve.

Ví dụ hàm sau trả về một promise đã được resolve với kết quả là `1`:

```js
async function f() {
  return 1;
}

f().then(console.log); // 1
```

Bạn có thể trả lại promise **một cách rõ ràng hơn**:

```js
async function f() {
  return Promise.resolve(1);
}

f().then(console.log); // 1
```

Vì vậy, từ khóa `async` đảm bảo rằng hàm trả về một promise bao bọc lấy những giá trị không phải promise bên trong.

Nhưng không chỉ có vậy. Có một từ khóa khác, đó là `await` - chỉ hoạt động bên trong hàm `async`.

## Từ khóa "await"

Cú pháp sử dụng từ khóa `await`

```js
// chỉ hoạt động bên trong hàm async
let value = await promise;
```

Từ khóa `await` làm JavaScript đợi đến khi promise được giải quyết thành công và sau đó trả về kết quả.

Dưới đây là ví dụ với một promise được giải quyết sau 1 giây:

```js
async function f() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  // Đợi cho đến khi promise resolve thành công
  let result = await promise; // (*)

  console.log(result); // "done!"
}

f();
```

Việc thực thi hàm `f()` **tạm dừng** tại dòng `(*)` và tiếp tục khi promise giải quyết xong, với kết quả là `result`. Vì vậy, đoạn mã trên hiển thị `"done!"` sau 1 giây.

**Chú ý:** từ khóa `await` theo đúng nghĩa đen thì sẽ tạm dừng việc thực thi hàm cho đến khi promise được giải quyết. và sau đó tiếp tục với kết quả của promise.

Điều đó không tốn bất kỳ tài nguyên CPU nào, bởi vì JavaScript engine có thể **thực hiện các công việc khác** trong thời gian chờ đợi: thực thi các tập lệnh khác, xử lý các sự kiện, v.v.

Đó chỉ là một cú pháp gọn gàng hơn để nhận được kết quả promise so với `promise.then`. Và rõ ràng, cú pháp đó dễ để đọc và viết hơn.

**Chú ý:** Không thể sử dụng từ khóa `await` trong các hàm thông thường

Nếu bạn cố gắng sử dụng `await` trong một hàm không đồng bộ, sẽ xảy ra lỗi cú pháp:

```js
function f() {
  let promise = Promise.resolve(1);
  let result = await promise; // Syntax error
}
```

Bạn có thể gặp lỗi này nếu quên đặt từ khóa `async` trước hàm. Như đã nói trước đó, `await` chỉ hoạt động bên trong hàm `async`.

Quay lại ví dụ về hàm `showAvatar()` từ bài viết về [chuỗi promise](/chuoi-promise-trong-javascript/) và viết lại hàm đó bằng cách sử dụng `async/await`:

1.  Bạn sẽ cần thay thế `.then` bằng `await`.
2.  Ngoài ra, bạn nên tạo hàm `async` để `await` hoạt động.

```js
async function showAvatar() {
  // lấy về json từ server và đọc nó
  let response = await fetch("/api/user.json");
  let user = await response.json();

  // lấy thông tin user tương ứng và đọc nó
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // hiển thị avatar
  let img = document.createElement("img");
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.append(img);

  // đợi 3 giây
  await new Promise((resolve, reject) => setTimeout(resolve, 3000));

  img.remove();

  return githubUser;
}

// sử dụng
showAvatar();
```

Đoạn code trên khá gọn gàng và dễ đọc hơn cách sử dụng promise rồi phải không?

**Chú ý:** Các trình duyệt hiện đại cho phép đặt `await` ở đầu của module ví dụ:

```js
// giả sử đoạn code sau ở đầu của một module
let response = await fetch("/api/user.json");
let user = await response.json();

console.log(user);
```

Nếu bạn sử dụng trình duyệt cũ hơn, bạn cần phải phải đặt đoạn code trên vào trong một [hàm ẩn danh](/function-expression-trong-javascript/) như sau:

```js
(async () => {
  let response = await fetch("/api/user.json");
  let user = await response.json();
  // ...
})();
```

**Chú ý:** `await` là **thenable**.

Giống như `promise.then`, từ khóa `await` cho phép bạn sử dụng các đối tượng **thenable**. Ý tưởng ở đây là các đối tượng ở thư viện bên thứ 3 có thể **không phải là promise**, nhưng tương thích với promise: nếu hỗ trợ `.then`, thì có thể sử dụng với `await`.

Đây là một class demo `Thenable`, từ khóa `await` chấp nhận các trường hợp như vậy:

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    console.log(resolve);
    // resolve với this.num*2 sau 1000ms
    setTimeout(() => resolve(this.num * 2), 1000); // (*)
  }
}

async function f() {
  // đợi 1 giây -> kết quả trở thành 2
  let result = await new Thenable(1);
  console.log(result);
}

f();
```

Nếu `await` nhận được một đối tượng không phải là promise với `.then`, từ khóa `await` sẽ gọi phương thức đó, cung cấp các hàm tích hợp sẵn `resolve` và `reject` dưới dạng các đối số - giống như cách thực thi của `Promise` bình thường.

Sau đó, `await` đợi cho đến khi một trong số chúng được gọi. Trong ví dụ trên, `resolve` được gọi tại `(*)`. Và sau đó, chương trình tiếp tục với kết quả sau khi resolve.

**Chú ý:** `async` có thể dùng với phương thức trong class.

Để khai báo một phương thức `async` trong class, bạn chỉ cần thêm `async` vào trước phương thức đó như sau:

```js
class Waiter {
  async wait() {
    return await Promise.resolve(1);
  }
}

new Waiter().wait().then(console.log); // 1
// then(console.log) tương tự như: result => console.log(result)
```

Ý nghĩa giống với hàm async thông thường: phương thức async trong class đảm bảo rằng giá trị trả về là promise và cho phép sử dụng với `await`.

## Xử lý lỗi

Nếu một promise giải quyết bình thường thì `await promise` trả về kết quả. Nhưng trong trường hợp promise bị từ chối, cách viết trên sẽ tạo ra lỗi, giống như có một câu lệnh `throw` ở đó.

Đoạn code này:

```js
async function f() {
  await Promise.reject(new Error("Whoops!"));
}
```

...là giống như sau:

```js
async function f() {
  throw new Error("Whoops!");
}
```

Trong các tình huống thực tế, promise có thể mất thời gian trước khi bị từ chối. Trong trường hợp đó, sẽ có một khoảng thời gian trễ trước khi `await` ném ra một lỗi.

Bạn có thể bắt lỗi đó bằng cách sử dụng `try..catch`, giống như cách `throw` thông thường:

```js
async function f() {
  try {
    let response = await fetch("http://no-such-url");
  } catch (err) {
    console.log(err); // TypeError: failed to fetch
  }
}

f();
```

Trong trường hợp có lỗi, luồng điều khiển sẽ nhảy đến khối `catch`. Và bạn có thể có nhiều dòng `await` trong cùng một khối `try...catch`:

```js
async function f() {
  try {
    let response = await fetch("/no-user-here");
    let user = await response.json();
  } catch (err) {
    // bắt lỗi từ cả hai await trên
    console.log(err);
  }
}

f();
```

Nếu không có `try..catch`, thì promise được tạo bởi lệnh gọi của hàm không đồng bộ `f()` trở thành một promise bị từ chối. Do đó, bạn có thể thêm `.catch` để xử lý:

```js
async function f() {
  let response = await fetch("http://no-such-url");
}

// f() trở thành một promise bị từ chối
f().catch(console.log); // TypeError: failed to fetch // (*)
```

Nếu bạn quên thêm vào `.catch` sau đó, thì bạn sẽ gặp lỗi promise chưa được xử lý [`unhandledrejection`](/xu-ly-loi-voi-promise-trong-javascript/).

**Một số chú ý khác:**

- Khi bạn sử dụng `async/await`, bạn hiếm khi cần `.then`, vì `await` xử lý việc chờ đợi. Và bạn có thể sử dụng `try..catch` thông thường thay vì `.catch`. Điều đó thường thuận tiện hơn.
- Khi bạn cần đợi nhiều promise, bạn có thể gói chúng lại trong [`Promise.all`](/promise-api-trong-javascript/) và sau đó dùng `await`:
  ```js
  // đợi một mảng kết quả
  let results = await Promise.all([
    fetch(url1),
    fetch(url2),
    //...
  ]);
  ```

## Tổng kết

Từ khóa `async` đặt trước một hàm có 2 tác dụng:

1.  Làm cho hàm đó luôn luôn trả lại một promise.
2.  Cho phép `await` được sử dụng trong hàm.

Từ khóa `await` đặt trước một promise khiến JavaScript đợi cho đến khi promise giải quyết xong và sau đó:

1.  Nếu kết quả là một lỗi, một ngoại lệ sẽ được tạo ra - giống như `throw error` gọi tại đó.
2.  Nếu không có lỗi, nó trả về kết quả.

`Async/await` kết hợp với nhau tạo ra một cách tuyệt vời để viết code không đồng bộ dễ dàng hơn, cũng như dễ đọc hơn.

Với `async/await`, bạn hiếm khi cần viết `promise.then/catch`. Nhưng bạn cũng không nên quên rằng `async/await` dựa trên các promise, vì đôi khi bạn cũng phải dùng các phương pháp này.

Cuối cùng, `Promise.all` là một cách tốt khi bạn đang chờ đợi nhiều tác vụ đồng thời.

Tham khảo: [Async/await](https://javascript.info/async-await)
