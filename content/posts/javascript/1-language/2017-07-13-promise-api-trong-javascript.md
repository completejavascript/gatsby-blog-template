---
date: "2017-07-13T06:00:00Z"
update: "2022-05-08T21:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/promise-api-trong-javascript.png"
keywords: "promise api, promise.all, promise.allSettled, promise.race, promise.any, promise.resolve, promise.reject"
description: "Class Promise có 6 phương thức tính. Bài viết này sẽ trình bày cơ bản về 6 phương thức này: promise.all, promise.allSettled, promise.race, promise.any, promise.resolve, promise.reject."
slug: promise-api-trong-javascript
title: "Các promise API trong JavaScript"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Promise
---

Có 6 phương thức tĩnh (static) trong class `Promise`. Sau đây, mình sẽ trình bày cơ bản về các trường hợp sử dụng chúng.

## Promise.all

Giả sử, bạn muốn nhiều promise thực hiện song song và đợi cho đến khi tất cả chúng sẵn sàng.

Ví dụ bạn tải xuống một số URL một cách song song và xử lý nội dung khi tất cả hoàn tất.

Đó là trường hợp mà bạn nên dùng `Promise.all` với cú pháp là:

```js
let promise = Promise.all(iterable);
```

`Promise.all` nhận vào một [iterable object](/iterable-la-gi-iterable-trong-javascript/) - thường là một mảng các promise, và trả về một promise mới.

Promise mới được giải quyết khi tất cả các promise thành phần được giải quyết và mảng kết quả của từng promise trở thành kết quả của promise mới.

Ví dụ `Promise.all` bên dưới được giải quyết sau 3 giây và kết quả thu được là một mảng `[1, 2, 3]`:

```js
Promise.all([
  new Promise((resolve) => setTimeout(() => resolve(1), 3000)), // 1
  new Promise((resolve) => setTimeout(() => resolve(2), 2000)), // 2
  new Promise((resolve) => setTimeout(() => resolve(3), 1000)), // 3
]).then(console.log); // 1,2,3 - khi các promise thành phần được giải quyết
```

**Chú ý:** thứ tự của các phần tử trong mảng kết quả giống như thứ tự các promise nguồn. Mặc dù, promise đầu tiên mất nhiều thời gian nhất để giải quyết, thì kết quả của promise đó vẫn là phần tử đầu tiên trong mảng kết quả.

Một thủ thuật phổ biến là **map** một mảng dữ liệu công việc thành một mảng các promise, rồi đóng gói vào `Promise.all`.

Ví dụ, nếu bạn có một mảng URL, bạn có thể gọi `fetch` với tất cả chúng như sau:

```js
let urls = [
  "https://api.github.com/users/alex",
  "https://api.github.com/users/anna",
  "https://api.github.com/users/david",
];

// map từng URL thành promise với fetch
let requests = urls.map((url) => fetch(url));

// Promise.all đợi tất cả các công việc hoàn thành
Promise.all(requests).then((responses) =>
  responses.forEach((response) =>
    console.log(`${response.url}: ${response.status}`)
  )
);
```

Một ví dụ phức tạp hơn về việc lấy thông tin một mảng người dùng GitHub theo tên của họ:

```js
let names = ["anna", "alex", "david"];

let requests = names.map((name) =>
  fetch(`https://api.github.com/users/${name}`)
);

Promise.all(requests)
  .then((responses) => {
    // tất cả response được resolve thành công
    for (let response of responses) {
      console.log(`${response.url}: ${response.status}`);
    }
    return responses;
  })
  // map mảng response thành mảng của response.json() để đọc thông tin của chúng
  .then((responses) => Promise.all(responses.map((r) => r.json())));
  // tất cả json được parse, "users" là mảng của các response
  .then(users => users.forEach(user => console.log(user.name)));
```

**Chú ý:** nếu bất kỳ promise thành phần nào bị từ chối thì promise được trả về từ `Promise.all` sẽ bị từ chối ngay lập tức với lỗi tương ứng, ví dụ:

```js
Promise.all([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).catch(console.log); // Error: Whoops!
```

Trong ví dụ trên, promise thứ hai bị từ chối sau 2 giây. Điều đó dẫn đến việc từ chối ngay lập tức `Promise.all`. Vì vậy, `.catch` sẽ thực thi: lỗi từ chối ở promise thứ hai trở thành kết quả của toàn bộ `Promise.all`.

**Chú ý:**

- Trong trường hợp có lỗi, các promise khác sẽ bị bỏ qua.
  - Nếu một promise bị từ chối, `Promise.all` ngay lập tức từ chối, hoàn toàn không quan tâm những promise khác trong danh sách. Và kết quả của chúng bị bỏ qua.
  - Ví dụ, nếu có nhiều lời gọi hàm `fetch` như trong ví dụ trên và một lời gọi hàm không thành công. Những cuộc gọi khác sẽ vẫn tiếp tục thực hiện, nhưng `Promise.all` sẽ không quan tâm đến chúng nữa.
  - Các promise đó có thể vẫn thành công, nhưng kết quả của chúng đều bị bỏ qua.
  - `Promise.all` không làm gì để hủy bỏ các promise còn lại, vì không có khái niệm **hủy bỏ** trong promise.
- `Promise.all(iterable)` cho phép các giá trị không phải promise bên trong **iterable object**.
  - Thông thường, `Promise.all(...)` sẽ chấp nhận một iterable object là một mảng các promise. Nhưng nếu bất kỳ đối tượng nào trong đó không phải là promise thì giá trị của đối tượng đó sẽ được chuyển thẳng đến mảng kết quả ngay lập tức.
  - Ví dụ sau đây có kết quả là `[1, 2, 3]`:
    ```js
    Promise.all([
      new Promise((resolve, reject) => {
        setTimeout(() => resolve(1), 1000);
      }),
      2, // không phải promise -> giá trị chuyển thẳng đến mảng kết quả
      3, // không phải promise -> giá trị chuyển thẳng đến mảng kết quả
    ]).then(console.log); // 1, 2, 3
    ```

## Promise.allSettled

`Promise.all` bị từ chối toàn bộ nếu bất kỳ promise nào bị từ chối. Điều đó tốt trong các trường hợp **tất cả hoặc không có gì**, khi bạn cần **tất cả các kết quả thành công** để tiếp tục:

```js
Promise.all([
  fetch("/template.html"),
  fetch("/style.css"),
  fetch("/data.json"),
]).then(render); // phương thức render cần tất cả các kết quả trên
```

`Promise.allSettled` chỉ cần đợi cho tất cả các promise được giải quyết, bất kể kết quả là thành công hay lỗi. Mảng kết quả có hai trường hợp sau:

- `{status:"fulfilled", value:result}` - để có phản hồi thành công,
- `{status:"rejected", reason:error}` - cho các lỗi.

Ví dụ, mình muốn lấy thông tin về nhiều người dùng. Ngay cả khi một request không thành công, mình vẫn quan tâm đến những request khác.

Khi đó mình sẽ sử dụng `Promise.allSettled` như sau:

```js
let urls = [
  "https://api.github.com/users/alex",
  "https://api.github.com/users/anna",
  "https://no-such-url",
];

Promise.allSettled(urls.map((url) => fetch(url))).then((results) => {
  // (*)
  results.forEach((result, num) => {
    if (result.status == "fulfilled") {
      console.log(`${urls[num]}: ${result.value.status}`);
    }
    if (result.status == "rejected") {
      console.log(`${urls[num]}: ${result.reason}`);
    }
  });
});
```

Kết quả `results` tại `(*)` trên sẽ có dạng là:

```js
[
  {status: 'fulfilled', value: ...response...},
  {status: 'fulfilled', value: ...response...},
  {status: 'rejected', reason: ...error object...}
]
```

Vì vậy, đối với mỗi promise, mình nhận được trạng thái `status` và `value`/`error`.

**Chú ý:** phương thức `Promise.allSettled` mới có gần đây, nên chưa được hỗ trợ ở nhiều trình duyệt. Vì vậy, bạn có thể sử dụng **polyfill** cho phương thức này.

### Polyfill cho Promise.allSettled

Nếu trình duyệt không hỗ trợ `Promise.allSettled`, bạn có thể dùng **polyfill** sau để thay thế:

```js
if (!Promise.allSettled) {
  const rejectHandler = (reason) => ({ status: "rejected", reason });
  const resolveHandler = (value) => ({ status: "fulfilled", value });

  Promise.allSettled = function (promises) {
    const convertedPromises = promises.map((p) =>
      Promise.resolve(p).then(resolveHandler, rejectHandler)
    );
    return Promise.all(convertedPromises);
  };
}
```

Trong đoạn code trên, `promises.map` nhận các giá trị đầu vào và biến chúng thành các promise với `p => Promise.resolve(p)`, và sau đó thêm `.then` cho mọi giá trị.

Trình xử lý `.then` đó biến kết quả thành công `value` thành `{status:'fulfilled', value}` và lỗi `reason` thành `{status:'rejected', reason}`. Đó chính xác là định dạng của phương thức `Promise.allSettled`.

Bây giờ, bạn có thể sử dụng `Promise.allSettled` để nhận được kết quả của **tất cả các promise** đã cho, ngay cả khi một trong số đó từ chối.

## Promise.race

Tương tự như `Promise.all`, nhưng `Promise.race` chỉ đợi promise đã giải quyết đầu tiên và nhận được kết quả (hoặc lỗi) của promise đó.

Cú pháp của `Promise.race` là:

```js
let promise = Promise.race(iterable);
```

Ví dụ ở đây kết quả sẽ là `1`:

```js
Promise.race([
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 1000)),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 2000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log);
// 1
```

Promise đầu tiên là nhanh nhất. Vì vậy, promise đó trở thành kết quả cuối cùng. Sau khi promise đầu tiên được giải quyết, tất cả các kết quả / lỗi khác đều được bỏ qua.

## Promise.any

Tương tự như `Promise.race`, nhưng `Promise.any` chỉ đợi **promise thành công đầu tiên** được thực hiện và nhận được kết quả đó.

Nếu tất cả các promise đã cho đều bị từ chối, thì promise trả về sẽ bị từ chối với [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) - một đối tượng lỗi đặc biệt lưu trữ tất cả các lỗi của promise trong thuộc tính `errors`.

Cú pháp `Promise.any` là:

```js
let promise = Promise.any(iterable);
```

Ví dụ ở đây kết quả sẽ là `1`:

```js
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Whoops!")), 1000)
  ),
  new Promise((resolve, reject) => setTimeout(() => resolve(1), 2000)),
  new Promise((resolve, reject) => setTimeout(() => resolve(3), 3000)),
]).then(console.log);
// 1
```

Promise đầu tiên là nhanh nhất, nhưng promise đó đã bị từ chối. Vì vậy, promise thứ hai trở thành kết quả. Sau đó, tất cả các promise khác đều bị bỏ qua.

Đây là ví dụ khi tất cả các promise đều thất bại:

```js
Promise.any([
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Ouch!")), 1000)
  ),
  new Promise((resolve, reject) =>
    setTimeout(() => reject(new Error("Error!")), 2000)
  ),
]).catch((error) => {
  console.log(error.constructor.name); // AggregateError
  console.log(error.errors[0]); // Error: Ouch!
  console.log(error.errors[1]); // Error: Error!
});
```

Như bạn thấy, các đối tượng lỗi cho những promise không thành công có sẵn trong thuộc tính `errors` của đối tượng `AggregateError`.

## Promise.resolve và Promise.reject

Các phương thức `Promise.resolve` và `Promise.reject` hiếm khi dùng trong JavaScript hiện đại, vì cú pháp `async/await` khiến chúng trở nên lỗi thời.

Mình đề cập đến 2 phương này ở đây để hoàn thiện và cho những bạn không thể sử dụng `async/await` vì lý do nào đó.

### Promise.resolve

`Promise.resolve(value)` tạo ra một promise được giải quyết với kết quả `value` như sau:

```js
let promise = new Promise((resolve) => resolve(value));
```

Phương thức này được sử dụng để đảm bảo tính tương thích, khi một hàm mong đợi kết quả trả về là promise.

Ví dụ: hàm `loadCached` bên dưới `fetch` một URL và ghi nhớ nội dung vào bộ nhớ đệm. Đối với các lời gọi hàm sau đó với cùng một URL, ngay lập tức trả về nội dung trước đó từ bộ nhớ cache, nhưng sử dụng `Promise.resolve` để tạo ra một promise. Vì vậy, giá trị trả về luôn là promise:

```js
let cache = new Map();

function loadCached(url) {
  if (cache.has(url)) {
    return Promise.resolve(cache.get(url)); // (*)
  }

  return fetch(url)
    .then((response) => response.text())
    .then((text) => {
      cache.set(url, text);
      return text;
    });
}
```

Bạn có thể viết `loadCached(url).then(…)`, vì hàm này được đảm bảo luôn trả về một promise. Do đó, bạn luôn có thể sử dụng `.then` sau `loadCached`. Đó là mục đích của `Promise.resolve` tại dòng `(*)`.

### Promise.reject

`Promise.reject(error)` tạo ra một promise bị từ chối với `error` như sau:

```js
let promise = new Promise((resolve, reject) => reject(error));
```

Trong thực tế, phương thức này hầu như ít khi được sử dụng.

## Tổng kết

Có 6 phương thức tĩnh (static) của class `Promise` là:

1. `Promise.all(promises)`: đợi tất cả các promise giải quyết và trả về một mảng kết quả của chúng. Nếu bất kỳ promise đã cho nào bị từ chối, kết quả đó sẽ trở thành lỗi của `Promise.all` và tất cả các kết quả khác sẽ bị bỏ qua.
2. `Promise.allSettled(promises)`(phương thức được thêm gần đây): đợi tất cả các promise giải quyết và trả về kết quả của chúng dưới dạng một mảng đối tượng với:
   - `status`: `"fulfilled"` hoặc `"rejected"`
   - `value`(nếu được giải quyết) hoặc `reason` (nếu bị từ chối).
3. `Promise.race(promises)`: đợi promise đầu tiên kết thúc, và kết quả / lỗi của promise đó trở thành kết quả.
4. `Promise.any(promises)`(phương thức được thêm gần đây): đợi promise đầu tiên thực hiện thành công và kết quả đó trở thành kết quả. Nếu tất cả các promise đã cho đều bị từ chối, [`AggregateError`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/AggregateError) sẽ trở thành lỗi của `Promise.any`.
5. `Promise.resolve(value)`: tạo một promise đã giải quyết với giá trị `value` đã cho.
6. `Promise.reject(error)`: tạo một promise bị từ chối với lỗi `error` đã cho.

Trong số các API trên, có lẽ `Promise.all` là phổ biến và hay sử dụng nhất trong thực tế.

Tham khảo: [Promise API](https://javascript.info/promise-api)
