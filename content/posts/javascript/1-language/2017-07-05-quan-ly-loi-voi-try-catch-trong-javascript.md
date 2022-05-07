---
date: "2017-07-05T08:00:00Z"
update: "2022-05-07T08:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/quan-ly-loi-voi-try-catch-trong-javascript.png"
keywords: "try catch trong javascript"
description: "Quản lý lỗi với try catch trong JavaScript là cần thiết vì dù bạn có giỏi lập trình đến đâu thì vẫn luôn có lỗi xảy ra."
slug: quan-ly-loi-voi-try-catch-trong-javascript
title: "Quản lý lỗi với try catch trong JavaScript"
series: "JavaScript: Error handling"
tags:
  - Error
---

Cho dù bạn giỏi lập trình đến đâu thì đôi khi các đoạn code của bạn vẫn có lỗi. Chúng có thể là do lỗi lập trình, do người dùng nhập dữ liệu không mong muốn, phản hồi sai từ máy chủ và rất nhiều lý do khác...

Thông thường, khi chương trình bị **crash** (dừng lại) do lỗi thì lỗi sẽ được in ra [console](/dev-tools-la-gi/) ngay lập tức.

Tuy nhiên, JavaScript có một cấu trúc cú pháp là `try...catch` cho phép bạn **bắt lỗi** để làm điều gì đó hợp lý hơn thay vì để chương trình **crash** như:

- Hiển thị thông báo lỗi.
- Thay đổi giao diện để hiển thị lỗi.
- ...vv

## Cú pháp "try...catch"

Cú pháp `try...catch` có hai khối chính là `try`, và sau đó là `catch`:

```js
try {
  // code...
} catch (err) {
  // xủ lý lỗi
}
```

Cách hoạt động của try-catch như sau:

1. Đầu tiên, đoạn mã trong `try {...}` được thực thi.
2. Nếu không có lỗi thì `catch (err)` bị bỏ qua, việc thực thi đến cuối `try` và tiếp tục, bỏ qua `catch`.
3. Nếu có lỗi xảy ra thì quá trình thực thi `try` bị dừng và chương trình chuyển đến đầu `catch (err)`. Trong đó, biến `err` (bạn có thể sử dụng bất kỳ tên nào tùy thích) sẽ chứa một đối tượng lỗi với thông tin chi tiết về lỗi đã xảy ra.

Vì vậy, lỗi xảy ra bên trong `try {...}` sẽ không làm chương trình bị crash - và sau đó bạn có thể làm gì đó trong `catch`.

Sau đây là một số ví dụ:

- Ví dụ không có lỗi thì đoạn code `console.log` tại `(1)` và `(2)` được thực thi:

  ```js
  try {
    console.log("Start of try runs"); // (1) <--

    //...đoạn code không có lỗi

    console.log("End of try runs"); // (2) <--
  } catch (err) {
    console.log("Catch is ignored, because there are no errors"); // (3)
  }
  ```

- Ví dụ có lỗi thì hiển thị `(1)` và `(3)`:

  ```js
  try {
    console.log("Start of try runs"); // (1) <--

    aha; // lỗi xảy ra, vì biến aha chưa được định nghĩa

    console.log("End of try (never reached)"); // (2)
  } catch (err) {
    console.log(`Error has occurred!`); // (3) <--
  }
  ```

**Chú ý:**

► Cú pháp `try...catch` chỉ hoạt động ở **runtime**. Nói cách khác, đoạn code chứa trong `try` phải đúng cú pháp.

Ví dụ đoạn code sai cú pháp sau:

```js{2}
try {
  {{{{{{{{{{{{
} catch (err) {
  console.log("The engine can't understand this code, it's invalid");
}
```

Đầu tiên, [JavaScript engine](/javascript-la-gi/) đọc mã, và sau đó thực thi. Các lỗi xảy ra trong giai đoạn đọc mã được gọi là lỗi **compile** và không thể khôi phục được. Bởi vì JavaScript Engine không thể hiểu được đoạn mã đó.

Vì vậy, `try...catch` chỉ xử lý được các lỗi xảy ra trong đoạn mã hợp lệ. Những lỗi như vậy được gọi là lỗi **runtime** hoặc đôi khi là **ngoại lệ** hay **exception**.

► Cú pháp **try-catch** hoạt động **đồng bộ**.

Đó là bởi vì bản thân hàm được thực thi ngay sau đó, khi quá trình thực thi đã rời khỏi khối `try...catch`.

Để **bắt một ngoại lệ** bên trong một hàm với **setTimeout**, khối `try...catch` phải được đặt bên trong hàm đó như sau:

```js
setTimeout(function () {
  try {
    abc; // lỗi xảy ra vì biến chưa định nghĩa
  } catch {
    console.log("error is caught here!");
  }
}, 1000);
```

## Đối tượng Error

Khi có lỗi xảy ra, JavaScript tạo ra một đối tượng chứa thông tin chi tiết về lỗi. Đối tượng này được truyền dưới dạng tham số đến `catch`:

```js
try {
  //...
} catch (err) {
  // đối tượng err - bạn có thể dùng tên bất kỳ
}
```

Đối với tất cả các lỗi có sẵn (built-in error), đối tượng **Error** có hai thuộc tính chính là:

- `name`: tên lỗi, ví dụ: đối với một biến không xác định là `"ReferenceError"`.
- `message`: đoạn string thông báo chi tiết về lỗi.

Ngoài ra, còn các thuộc tính khác cũng có sẵn trong hầu hết các môi trường. Một trong những thuộc tính được sử dụng và hỗ trợ rộng rãi nhất là: `stack`.

Thuộc tính `stack` hay **ngăn xếp** - **call stack** - thông tin về **chuỗi các lời gọi hàm lồng nhau**, được sử dụng cho mục đích gỡ lỗi (debug).

Ví dụ:

```js
try {
  aha; // lỗi, biến chưa được định nghĩa
} catch (err) {
  console.log(err.name); //ReferenceError
  console.log(err.message); //aha is not defined
  console.log(err.stack); //ReferenceError: aha is not defined at (...call stack)

  // Ngoài ra, bạn có thể hiển thị toàn bộ lỗi `err`.
  // Khi đó, lỗi được convert sang string có dạng "name: message"
  console.log(err); // ReferenceError: aha is not defined
}
```

## Cách sử dụng khác của `catch`

Nếu bạn không cần thông tin chi tiết về lỗi, `catch` có thể bỏ qua đối tượng `err` như sau:

```js
try {
  //...
} catch {
  // <-- không có (err)
  //...
}
```

> **Chú ý:** cách viết này mới có gần đây. Các trình duyệt cũ có thể không hỗ trợ.

## Sử dụng "try...catch"

Sau đây, mình hãy cùng khám phá một trường hợp thực tế sử dụng `try...catch`.

Như bạn đã biết, JavaScript hỗ trợ [JSON.parse(str)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse) để đọc các giá trị được mã hóa dạng [JSON](/tim-hieu-ve-json-trong-javascript/).

Thông thường, JSON được sử dụng để giải mã dữ liệu nhận được qua mạng, từ server hoặc một nguồn khác.

Bạn có thể nhận được JSON string và gọi `JSON.parse` như sau:

```js
// dữ liệu từ server
let json = '{"name":"Alex", "age": 29}';

// convert string thành JS object
let user = JSON.parse(json);

// bây giờ user là object với các thuộc tính là `name` và `age`
console.log(user.name); // Alex
console.log(user.age); // 29
```

Bây giờ, nếu `json` là **không đúng định dạng** thì `JSON.parse` sẽ tạo ra lỗi dẫn đến đoạn code trên bị crash.

Dĩ nhiên là bạn không muốn điều này xảy ra phải không?

Với cách xử lý trên, nếu có lỗi với dữ liệu, người dùng sẽ không bao giờ biết được điều đó - trừ khi mở [DevTool](/dev-tools-la-gi/).

Và mọi người thực sự không thoải mái khi một cái gì đó "chỉ chết" - "không hoạt động" mà không có bất kỳ thông báo lỗi nào.

Để giải quyết vấn đề này, bạn hãy sử dụng `try...catch` để xử lý lỗi:

```js
let json = "{ json lỗi }";

try {
  let user = JSON.parse(json); // <-- khi lỗi xảy ra

  console.log(user.name); // đoạn code này sẽ không được chạy
} catch (err) {
  // đoạn code sau đây sẽ được thực thi
  alert("The data has errors, we'll try to request it one more time.");
  console.log(err.name);
  console.log(err.message);
}
```

Ở đây, mình chỉ sử dụng `catch` để hiển thị thông báo lỗi. Tuy nhiên, bạn có thể làm được nhiều hơn thế, ví dụ:

- Gửi request mới lên server.
- Đề xuất phương án thay thế cho người dùng.
- Gửi thông tin chi tiết về lỗi.
- ...vv và nhiều cách xử lý khác nữa hơn là việc không có thông báo gì.

## "Throw" lỗi tự định nghĩa

Điều gì xảy ra nếu `json` về mặt cú pháp là đúng, nhưng **không có thông tin bắt buộc**?

Ví dụ `json` thiếu thuộc tính `name` như sau:

```js
let json = '{ "age": 30 }'; // thiếu trường `name`

try {
  let user = JSON.parse(json); // <-- không có lỗi khi parse JSON

  console.log(user.name); // không có thuộc tính `name` như mong muốn
} catch (err) {
  console.log("Đoạn code này không thực thi");
}
```

Trong đoạn code trên, `JSON.parse` chạy hoàn toàn bình thường, nhưng do không có `name` nên có thể gây ra lỗi phía sau. Để xử lý lỗi này, bạn có thể dùng toán tử [`throw`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/throw).

### Toán tử "throw"

Mỗi toán tử `throw` sẽ tạo ra một lỗi.

Cú pháp là:

```js
throw <error object>
```

Về cơ bản, bạn có thể dùng bất cứ thứ gì làm đối tượng lỗi. Đó có thể là một dữ liệu nguyên thủy, như một số hoặc một chuỗi. Nhưng **tốt hơn** là sử dụng các **object**, **tốt nhất** là đối tượng có thuộc tính `name` và `message` (để tương thích với các lỗi định nghĩa sẵn).

Ngoài ra, JavaScript có sẵn nhiều hàm khởi tạo lỗi như: `Error`, `SyntaxError`, `ReferenceError`, `TypeError`,... Do đó, bạn có thể sử dụng chúng để tạo ra các đối tượng lỗi như sau:

```js
let error = new Error(message);

// hoặc

let error = new SyntaxError(message);
let error = new ReferenceError(message);
// ...vv
```

Đối với những lỗi có sẵn, thuộc tính `name` chính xác là tên của hàm khởi tạo. Và `message` được lấy từ đối số truyền vào hàm, ví dụ:

```js
let error = new Error("Things happen o_O");

console.log(error.name); // Error
console.log(error.message); // Things happen o_O
```

Hãy xem loại lỗi nào `JSON.parse` tạo ra:

```js
try {
  JSON.parse("{ json lỗi o_O }");
} catch (err) {
  console.log(err.name); // SyntaxError
  console.log(err.message); // Unexpected token j in JSON at position 2
}
```

Như bạn có thể thấy, đó là một `SyntaxError`.

Quay lại ví dụ lúc trước, việc thiếu thuộc tính `name` là một lỗi, vì người dùng bắt buộc phải có `name`.

Vì vậy, bạn hãy `throw` lỗi:

```js
let json = '{ "age": 30 }'; // thiếu dữ liệu

try {
  let user = JSON.parse(json); // <-- không có lỗi

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name"); // (*)
  }

  console.log(user.name);
} catch (err) {
  console.log("JSON Error: " + err.message);
  // JSON Error: Incomplete data: no name
}
```

Tại dòng `(*)`, toán tử `throw` tạo ra một lỗi dạng `SyntaxError` với thông báo chi tiết `message`, giống như cách JavaScript tự tạo ra lỗi đó. Đoạn code thực hiện `try` ngay lập tức dừng lại và luồng điều khiển chuyển sang `catch`.

Bây giờ, `catch` đã trở thành một nơi duy nhất để xử lý tất cả các lỗi: cả hai cho `JSON.parse` và các trường hợp khác.

## Kĩ thuật "rethrowing"

Trong ví dụ trên, mình sử dụng `try...catch` để xử lý khi dữ liệu không chính xác. Nhưng liệu có thể **một lỗi không mong muốn khác** xảy ra trong khối `try {...}`?

Giống như một lỗi lập trình (biến không được xác định) hoặc một lỗi nào khác, không chỉ là lỗi **dữ liệu không chính xác** như trên.

Ví dụ:

```js
let json = '{ "age": 30 }'; // dữ liệu không đầy đủ

try {
  user = JSON.parse(json); // <-- quên đặt `let` trước biến user

  //...
} catch (err) {
  console.log("JSON Error: " + err);
  // JSON Error: ReferenceError: user is not defined
  // (có lỗi xảy ra nhưng không thực sự là lỗi do định dạng JSON)
}
```

Tất nhiên, mọi thứ đều có thể xảy ra! Và bạn hoàn toàn có thể mắc sai lầm.

Trong trường hợp trên, `try...catch` được đặt để bắt lỗi **dữ liệu không chính xác**. Nhưng bản chất, `catch` bắt được **tất cả các lỗi** từ khối `try`.

Ở đây, mình gặp lỗi không mong muốn nhưng vẫn hiển thị như cũ với nội dung `"JSON Error"`. Điều đó sai và cũng làm cho mình khó gỡ lỗi hơn (vì mình không biết bản chất lỗi thật sự là gì).

Để tránh những vấn đề như trên, bạn có thể sử dụng kỹ thuật **rethrowing** với quy tắc đơn giản là: `catch` chỉ nên xử lý các lỗi biết trước và **rethrowing** tất cả các lỗi khác.

Kỹ thuật **rethrowing** có thể được giải thích chi tiết hơn như sau:

1. Bắt được tất cả các lỗi.
2. Bên trong khối `catch (err) {...}`, bạn phân tích đối tượng lỗi `err`.
3. Nếu bạn không biết cách xử lý lỗi đó, bạn hãy `throw err`.

Thông thường, bạn có thể kiểm tra loại lỗi bằng cách sử dụng [toán tử `instanceof`](/kiem-tra-lop-toan-tu-instanceof-trong-javascript/):

```js
try {
  user = {
    /*...*/
  };
} catch (err) {
  // "ReferenceError" để xử lý trường hợp biến chưa được định nghĩa
  if (err instanceof ReferenceError) {
    console.log("ReferenceError");
  }
}
```

Mình cũng có thể lấy tên class lỗi từ thuộc tính `err.name`. Tất cả các lỗi **built-in** đều có thuộc tính `name`. Ngoài ra, một lựa chọn khác là bạn truy cập `err.constructor.name`.

Trong đoạn code dưới đây, mình sử dụng kĩ thuật **rethrowing** để `catch` chỉ xử lý lỗi `SyntaxError`:

```js{10,14-18}
let json = '{ "age": 30 }'; // dữ liệu thiếu

try {
  let user = JSON.parse(json);

  if (!user.name) {
    throw new SyntaxError("Incomplete data: no name");
  }

  hi(); // lỗi không mong muốn

  console.log(user.name);
} catch (err) {
  if (err instanceof SyntaxError) {
    console.log("JSON Error: " + err.message);
  } else {
    throw err; // rethrow (*)
  }
}
```

Câu lệnh `throw error` tại `(*)` từ bên trong khối `catch` đẩy lỗi ra khỏi `try...catch` và có thể bắt bởi một cấu trúc `try...catch` khác bên ngoài (nếu tồn tại), hoặc làm đoạn lệnh bị dừng lại.

Tóm lại, khối `catch` thực sự chỉ nên xử lý các lỗi biết cách xử lý và **bỏ qua** tất cả các lỗi khác.

Ví dụ dưới đây minh họa cách các lỗi như vậy có thể được phát hiện bởi một cấp `try...catch` nữa:

```js
function readData() {
  let json = '{ "age": 30 }';

  try {
    //...

    blabla(); // error!
  } catch (err) {
    //...
    if (!(err instanceof SyntaxError)) {
      throw err; // rethrow (vì không biết cách xử lý)
    }
  }
}

try {
  readData();
} catch (err) {
  console.log("External catch got: " + err); // bắt lỗi
}
```

Ở đây, hàm `readData` chỉ biết cách xử lý lỗi `SyntaxError`, trong khi cấu trúc `try...catch` bên ngoài biết cách làm thế nào để xử lý những lỗi khác.

## Cấu trúc "try...catch...finally"

Cấu trúc `try...catch` có thể có thêm một mệnh đề nữa là: `finally`.

Nếu `finally` tồn tại, đoạn code đó sẽ chạy trong mọi trường hợp:

- Sau `try`, nếu không có lỗi,
- Sau `catch`, nếu có sai sót.

Cú pháp mở rộng có dạng như sau:

```js
try {
  //...code xử lý
} catch (err) {
  //...xử lý lỗi
} finally {
  //...luôn luôn được thực thi
}
```

Ví dụ đoạn code sau:

```js
try {
  console.log("try");
  if (confirm("Make an error?")) BAD_CODE();
} catch (err) {
  console.log("catch");
} finally {
  console.log("finally");
}
```

Đoạn code trên có hai cách thực thi như sau:

1. Nếu bạn trả lời **OK**, thì kết quả là `try -> catch -> finally`.
2. Nếu bạn trả lời **Cancel**, thì kết quả là `try -> finally`.

Mệnh đề `finally` thường được sử dụng khi bạn bắt đầu làm điều gì đó và muốn hoàn thành với bất kỳ kết quả nào xảy ra.

Ví dụ, mình muốn đo thời gian mà hàm **Fibonacci** `fib(n)` hoạt động. Đương nhiên, bạn có thể bắt đầu đo trước khi hàm chạy và kết thúc sau đó. Nhưng nếu có lỗi trong khi gọi hàm thì sao?

Đặc biệt, việc thực hiện `fib(n)` trong đoạn code dưới đây trả về lỗi với các số `n` là **âm hoặc không phải số nguyên**.

Khi đó, mệnh đề `finally` là một vị trí phù hợp để hoàn thành các phép đo.

Ở đây, `finally` đảm bảo rằng thời gian sẽ được đo chính xác trong cả hai tình huống - trong trường hợp thực hiện thành công `fib(n)` cũng như trường hợp có lỗi xảy ra:

```js{18-20}
let num = +prompt("Enter a positive integer number?", 35);

let diff, result;

function fib(n) {
  if (n < 0 || Math.trunc(n) != n) {
    throw new Error("Must not be negative, and also an integer.");
  }
  return n <= 1 ? n : fib(n - 1) + fib(n - 2);
}

let start = Date.now();

try {
  result = fib(num);
} catch (err) {
  result = 0;
} finally {
  diff = Date.now() - start;
}

console.log(result || "error occurred");

console.log(`execution took ${diff}ms`);
```

Bạn có thể kiểm tra lại bằng cách chạy chương trình với việc nhập `n` bằng `35` vào trong [hàm `prompt`](/ham-tuong-tac-nguoi-dung-alert-confirm-prompt/) - trường hợp này hoạt động bình thường, `finally` sau `try`.

Và sau đó bạn thử nhập `-1` - sẽ có lỗi ngay lập tức và quá trình thực thi sẽ diễn ra sau `0ms`. Cả hai phép đo đều được thực hiện một cách chính xác.

Nói cách khác, hàm có thể kết thúc với `return` hoặc `throw`, điều đó không quan trọng. Mệnh đề `finally` luôn được thực hiện trong cả hai trường hợp.

**Chú ý:**

- Trong ví dụ trên, các biến `result` và `diff` được khai báo bên ngoài cấu trúc `try...catch...finally`. Ngược lại, nếu bạn khai báo các biến này với [`let`](/bien-la-gi-bien-trong-javascript/) trong khối `try` thì chúng chỉ được nhìn thấy trong đó.
- Mệnh đề `finally` được gọi trong mọi trường hợp, kể cả việc bạn sử dụng `return` trong `try...catch`.
- Cú pháp `try...finally` với việc bỏ qua `catch` đôi khi là hữu ích khi bạn **không muốn handle lỗi** nhưng lại muốn đảm bảo rằng đoạn code trong `finally` luôn được thực thi.

## Xử lý "catch" toàn cục

Giả sử, bạn gặp một lỗi nghiêm trọng bên ngoài `try...catch` khiến chương trình crash.

Và bạn có thể muốn ghi lại lỗi, hiển thị một điều gì đó cho người dùng (thông thường họ không thấy thông báo lỗi), v.v.

Không có một cách thức chung nào, nhưng các môi trường khác nhau (trình duyệt, Node.js,...) thường cung cấp công cụ cho việc đó, bởi vì điều này thực sự hữu ích.

Ví dụ, Node.js có [`process.on("uncaughtException")`](https://nodejs.org/api/process.html#process_event_uncaughtexception). Và trên trình duyệt, bạn có thể gán một hàm cho thuộc tính đặc biệt là [window.onerror](https://developer.mozilla.org/en-US/docs/Web/API/GlobalEventHandlers/onerror) - hàm đó sẽ chạy trong trường hợp có lỗi không giải quyết được.

Cú pháp của `window.onerrror` như sau:

```js
window.onerror = function (message, url, line, col, error) {
  //...
};
```

Trong đó:

- `message`: thông báo lỗi.
- `url`: URL của tập lệnh đã xảy ra lỗi.
- `line`,`col`: số dòng và số cột đã xảy ra lỗi.
- `error`: đối tượng lỗi.

Ví dụ:

```js
window.onerror = function (message, url, line, col, error) {
  console.log(`${message}\n At ${line}:${col} of ${url}`);
};

function readData() {
  badFunc(); // <- có lỗi xảy ra
}

readData();
```

Vai trò của `window.onerror` thường không phải để khôi phục việc thực thi tập lệnh - điều đó là không thể trong trường hợp lỗi do lập trình, mà là để gửi thông báo lỗi đến lập trình viên.

## Tổng kết

Cấu trúc `try...catch` cho phép xử lý các lỗi **runtime**. Theo nghĩa đen, cấu trúc này cho phép **thử** chạy đoạn mã và **bắt** các lỗi có thể xảy ra trong đó.

Cú pháp đầy đủ của `try...catch` như sau:

```js
try {
  // code thực hiện
} catch (err) {
  // nhảy vào đây nếu có lỗi,
  // thông tin lỗi lấy từ đối tượng error
} finally {
  // khối lệnh được thực thi trong mọi trường hợp
  // sau try/catch
}
```

Cấu trúc trên có thể không có `catch` hoặc không có `finally`. Do đó, các cấu trúc ngắn hơn như `try...catch` và `try...finally` cũng hợp lệ.

Các đối tượng lỗi bao gồm các thuộc tính sau:

- `message` - thông báo lỗi cụ thể - dễ dàng đọc hiểu được.
- `name` - đoạn string thể hiện tên lỗi (hoặc tên hàm tạo lỗi).
- `stack` (không chuẩn, nhưng được hỗ trợ tốt) - ngăn xếp (call stack) tại thời điểm tạo lỗi.

Nếu một đối tượng lỗi không cần thiết, bạn có thể bỏ qua nó bằng cách sử dụng `catch {` thay vì `catch (err) {`.

Ngoài ra, bạn cũng có thể tạo ra lỗi của riêng mình bằng cách sử dụng toán tử `throw`. Về cơ bản, tham số của `throw` có thể là bất cứ thứ gì, nhưng thường thì đó là một đối tượng lỗi [kế thừa](/ke-thua-class-trong-javascript/) từ class `Error` có sẵn.

**Rethrowing** là một cách xử lý lỗi rất quan trọng: khối `catch` thường chỉ xử lý các lỗi biết trước. Vì vậy, nếu bạn gặp các lỗi không mong đợi thì có thể `throw error` để khối `try...catch` bên ngoài bắt và xử lý.

Ngay cả khi bạn không có `try...catch`, hầu hết các môi trường (trình duyệt, Node.js,...) đều cho phép bạn thiết lập một hàm toàn cục để bắt các lỗi xảy ra. Với trình duyệt, đó là `window.onerror`.

Tham khảo: [Error handling, "try...catch"](https://javascript.info/try-catch).
