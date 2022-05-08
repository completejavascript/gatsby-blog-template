---
date: "2017-07-10T16:24:00Z"
update: "2022-05-08T16:24:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/chuoi-promise-trong-javascript.png"
keywords: "chuỗi promise, promise chaining"
description: "Chuỗi promise hay promise chaining là một cách viết code giúp bạn xử lý các hành động bất đồng bộ tốt hơn. tránh được hiện tượng callback hell. Điều này giúp quản lý code tốt hơn."
slug: chuoi-promise-trong-javascript
title: "Chuỗi promise trong JavaScript"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Promise
---

Như đã nói đến trong bài [Callback là gì? Callback trong JavaScript](/callback-la-gi-callback-trong-javascript/), ở đó mình có một chuỗi các tác vụ không đồng bộ được thực hiện lần lượt - ví dụ tải các tập lệnh.

**Vậy làm sao để code chúng một cách tốt nhất?**

Promise cung cấp một vài cách để giúp bạn làm điều đó.

Trong bài viết này, mình sẽ giới thiệu với bạn về **chuỗi promise** trong JavaScript hay tiếng anh là **promise chaining**.

## Chuỗi promise là gì?

Ví dụ về chuỗi promise trong JavaScript:

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000); // (*)
})
  .then(function (result) {
    // (**)
    console.log(result); // 1
    return result * 2;
  })
  .then(function (result) {
    // (***)
    console.log(result); // 2
    return result * 2;
  })
  .then(function (result) {
    console.log(result); // 4
    return result * 2;
  });
```

Ý tưởng của chuỗi promise là kết quả được chuyển qua chuỗi các `.then` với cách thức thực hiện là:

1. Promise ban đầu được giải quyết sau 1 giây `(*)`.
2. Sau đó, `.then` được gọi tại `(**)`, lần lượt tạo ra một promise mới (được giải quyết bằng giá trị `2`).
3. Tiếp theo, `.then` tại `(***)` lấy kết quả của phần trước, xử lý (nhân đôi) và chuyển kết quả cho `.then` tiếp theo.
4. …cứ như vậy (tạo thành chuỗi promise).

Khi kết quả được chuyển dọc theo chuỗi trên, bạn thấy rằng một chuỗi các lệnh `console.log` gọi: `1` → `2`→ `4`.

**Chú ý:** mỗi lần gọi `.then` đều trả về một promise mới, để bạn có thể gọi promise tiếp theo với `.then` trên đó.

Khi một trình xử lý trả về một giá trị, nó sẽ trở thành kết quả của promise. Vì vậy, giá trị tiếp theo `.then` được gọi với giá trị đó.

Một lỗi cơ bản với những người mới học lập trình JavaScript là: **thêm nhiều `.then` vào một promise duy nhất**. Điều này là có thể. Nhưng đây không phải là chuỗi promise.

Ví dụ:

```js
let promise = new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
});

promise.then(function (result) {
  console.log(result); // 1
  return result * 2;
});

promise.then(function (result) {
  console.log(result); // 1
  return result * 2;
});

promise.then(function (result) {
  console.log(result); // 1
  return result * 2;
});
```

Trong ví dụ trên, mỗi `.then` thực chất chỉ xử lý cho promise đầu tiên. Chúng không chuyển kết quả cho nhau, thay vào đó chúng xử lý kết quả một cách độc lập. Do đó, giá trị `result` tại mỗi `.then` đều giống nhau và bằng `1`.

Thực tế, bạn thường không cần nhiều trình xử lý cho một promise. Thay vào đó, promise chaining được sử dụng nhiều hơn.

## Trả về promise

Một trình xử lý, được sử dụng trong `.then(handler)` có thể tạo và trả về promise.

Trong trường hợp này, các trình xử lý tiếp theo sẽ đợi cho đến khi promise trước xử lý xong, rồi sẽ nhận được kết quả đó.

```js
new Promise(function (resolve, reject) {
  setTimeout(() => resolve(1), 1000);
})
  .then(function (result) {
    console.log(result); // 1

    return new Promise((resolve, reject) => {
      // (*)
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    // (**)
    console.log(result); // 2

    return new Promise((resolve, reject) => {
      setTimeout(() => resolve(result * 2), 1000);
    });
  })
  .then(function (result) {
    console.log(result); // 4
  });
```

Với `.then` đầu tiên, giá trị hiển thị là `1` và trả về `new Promise(…)` tại dòng `(*)`. Sau 1 giây, promise được giải quyết và kết quả (đối số của `resolve`, ở đây là `result * 2`) được chuyển cho `.then` tiếp theo. Trình xử lý đó nằm tại dòng `(**)`, và kết quả hiển thị là `2` rồi lặp lại tương tự...

Vì vậy, kết quả thu được giống như ví dụ trước: `1 → 2 → 4`, nhưng bây giờ với độ trễ 1 giây giữa các lệnh `console.log`.

Việc trả về promise cho phép bạn xây dựng chuỗi các hành động không đồng bộ.

## Ví dụ "loadScript"

Hãy sử dụng promise chaining vào hàm `loadScript`, được định nghĩa trong bài về [callback](/callback-la-gi-callback-trong-javascript/), để tải từng tập lệnh theo trình tự:

```js
loadScript("one.js")
  .then(function (script) {
    return loadScript("two.js");
  })
  .then(function (script) {
    return loadScript("three.js");
  })
  .then(function (script) {
    // xử lý
  });
```

Đoạn code này có thể ngắn hơn một chút với cách sử dụng [arrow function](/arrow-function-la-gi-arrow-function-trong-js/):

```js
loadScript("one.js")
  .then((script) => loadScript("two.js"))
  .then((script) => loadScript("three.js"))
  .then((script) => {
    // xử lý
  });
```

Ở đây, mỗi lần gọi `loadScript` đều trả về một promise. Và lệnh `.then` tiếp theo sẽ chạy khi promise được giải quyết, sau đó, bắt đầu tải tập lệnh tiếp theo. Vì vậy, các tập lệnh được tải lần lượt.

Mình có thể thêm nhiều hành động không đồng bộ hơn vào chuỗi mà đoạn code vẫn "phẳng" - tiếp tục phát triển xuống phía dưới, không phải ở bên phải giống như **callback hell**.

Về cơ bản, mình có thể thêm `.then` trực tiếp vào từng `loadScript` như sau:

```js
loadScript("one.js").then((script1) => {
  loadScript("two.js").then((script2) => {
    loadScript("three.js").then((script3) => {
      // gọi các hàm được định nghĩa trong script1, script2, script3
      one();
      two();
      three();
    });
  });
});
```

Đoạn code trên thực hiện tương tự: **tải 3 tập lệnh theo thứ tự**. Nhưng cấu trúc code lại "phát triển sang bên phải" - tương tự như **callback hell**. Do đó, đây không phải cách viết code hợp lý.

Đôi khi, bạn có thể viết `.then` trực tiếp vì hàm lồng nhau có quyền truy cập vào phạm vi bên ngoài. Trong ví dụ trên, lệnh callback **sâu nhất** có quyền truy cập vào tất cả các biến/hàm ở `script1`, `script2`, `script3`.

Nhưng đó là một ngoại lệ hơn là một quy tắc.

## Đối tượng "Thenable"

Thực tế, trình xử lý `.then` có thể không trả về promise, mà là đối tượng "thenable" - đối tượng tùy ý có phương thức `.then`. Khi đó, đối tượng **thenable** được đối xử giống như promise.

Ý tưởng là các thư viện của bên thứ 3 có thể triển khai các đối tượng "tương thích với Promise" của riêng họ. Chúng có thể là tập hợp các phương thức mở rộng, nhưng cũng phải tương thích với các promise vì chúng thực thi `.then`.

Đây là ví dụ về đối tượng **thenable**:

```js
class Thenable {
  constructor(num) {
    this.num = num;
  }

  then(resolve, reject) {
    console.log(resolve); // function() { native code }

    // resolve với this.num*2 sau 1 giây
    setTimeout(() => resolve(this.num * 2), 1000); // (**)
  }
}

new Promise((resolve) => resolve(1))
  .then((result) => {
    return new Thenable(result); // (*)
  })
  .then(console.log); // hiển thị 2 sau 1000ms
```

JavaScript kiểm tra đối tượng được `.then` trả về theo dòng `(*)`:

- Nếu đối tượng đó có một phương thức **có thể gọi** được đặt tên là `then` thì JavaScript sẽ gọi phương thức đó với các hàm `resolve`, `reject` dưới dạng đối số và đợi đến khi một trong hai hàm được gọi.
- Trong ví dụ trên, `resolve(2)` được gọi sau 1 giây `(**)`.
- Sau đó, kết quả được chuyển tiếp xuống chuỗi promise.

Tính năng này cho phép tích hợp các đối tượng tùy chỉnh với chuỗi promise mà không cần phải kế thừa từ `Promise`.

## Ví dụ về "fetch"

Trong lập trình web frontend, các promise thường được sử dụng cho các request lên server. Vì vậy, hãy xem ví dụ mở rộng về điều đó.

Mình sẽ sử dụng phương thức [fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch) để tải thông tin về người dùng từ server. Phương thức này có rất nhiều tham số tùy chọn, nhưng cú pháp cơ bản khá đơn giản:

```js
let promise = fetch(url);
```

Câu lệnh trên thực hiện một request đến `url` và trả về promise. Promise resolve bằng đối tượng `response` khi server phản hồi với các **header**, trước khi phản hồi đầy đủ được tải xuống.

Để đọc response đầy đủ, bạn nên gọi phương thức `response.text()` - trả về một promise sẽ resolve toàn bộ nội dung response mà server trả về dưới dạng text.

Đoạn code dưới đây thực hiện yêu cầu tới `user.json` và tải về toàn bộ giá trị text từ server:

```js
fetch("/api/user.json")
  .then(function (response) {
    // .then chạy và trả về response từ server
    // response.text() trả về một promise với toàn bộ response dạng text
    return response.text();
  })
  .then(function (text) {
    // nội dung của response
    console.log(text); // {"name": "lampham", "isAdmin": true}
  });
```

Đối tượng `response` được trả về từ `fetch` cũng bao gồm phương thức `response.json()` - đọc dữ liệu và phân tích cú pháp dưới dạng JSON. Trong trường hợp trên, điều đó là thuận tiện hơn, vì vậy hãy chuyển sang phương thức này.

Mình cũng sẽ sử dụng các **hàm mũi tên** cho ngắn gọn:

```js
// tương tự nhưng response.json() parse response dưới dạng JSON
fetch("/api/user.json")
  .then((response) => response.json())
  .then((user) => console.log(user.name)); // lampham
```

Bây giờ, bạn hãy làm điều gì đó với dữ liệu đã tải về.

Ví dụ, mình có thể thực hiện thêm một yêu cầu tới GitHub, tải hồ sơ người dùng và hiển thị hình đại diện:

```js
fetch("/api/user.json")
  // load dữ liệu dạng json
  .then((response) => response.json())
  // request lên GitHub
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  // load dữ liệu dạng json
  .then((response) => response.json())
  // hiển thị avatar (githubUser.avatar_url) trong 3 giây
  .then((githubUser) => {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => img.remove(), 3000); // (*)
  });
```

Đoạn code trên hoạt động. Tuy nhiên lại có vấn đề đặt ra ở đây.

Tại dòng `(*)`, nếu bạn cần phải làm gì đó, **sau khi** hình đại diện đã hiển thị xong và bị xóa. Bạn sẽ làm thế nào?

Giả sử, mình muốn hiển thị biểu mẫu để chỉnh sửa thông tin người dùng đó,... Và như đoạn code trên thì rõ ràng là không có cách nào.

Để làm cho chuỗi promise có thể mở rộng, mình cần phải trả lại promise - sẽ **resolve** khi hình đại diện hiển thị xong, như sau:

```js
fetch("/api/user.json")
  .then((response) => response.json())
  .then((user) => fetch(`https://api.github.com/users/${user.name}`))
  .then((response) => response.json())
  .then(
    (githubUser) =>
      new Promise(function (resolve, reject) {
        // (*)
        let img = document.createElement("img");
        img.src = githubUser.avatar_url;
        img.className = "promise-avatar-example";
        document.body.append(img);

        setTimeout(() => {
          img.remove();
          resolve(githubUser); // (**)
        }, 3000);
      })
  )
  // được gọi sau 3 giây
  .then((githubUser) => console.log(`Finished showing ${githubUser.name}`));
```

Đoạn code trên có nghĩa là, trình xử lý `.then` tại dòng `(*)` trả lại `new Promise`. Khi `resolve(githubUser)` trong `setTimeout` tại `(**)` được gọi sau 3 giây thì promise được resolve. Sau đó, `.then` trong chuỗi promise tiếp tục thực hiện.

Như vậy, một hành động không đồng bộ **nên luôn trả về promise**. Điều này giúp bạn lập kế hoạch các hành động sau đó dễ dàng hơn. Ngay cả khi bạn không có kế hoạch mở rộng chuỗi promise ngay bây giờ, bạn vẫn có thể cần sử dụng về sau.

Cuối cùng, bạn nên chia code thành các hàm có thể dùng lại:

```js
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);
    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}

// Sử dụng:
loadJson("/api/user.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => console.log(`Finished showing ${githubUser.name}`));
// ...
```

## Tổng kết

Nếu trình xử lý `.then` (hoặc `catch` hay `finally`) trả về một promise. Phần còn lại của chuỗi promise sẽ đợi cho đến khi promise xử lý xong. Sau đó, kết quả (hoặc lỗi) của promise trước sẽ được truyền vào trình xử lý sau trong promise chaining.

Tham khảo: [Promises chaining](https://javascript.info/promise-chaining)
