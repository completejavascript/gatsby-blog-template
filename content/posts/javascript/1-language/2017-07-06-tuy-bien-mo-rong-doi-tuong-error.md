---
date: "2017-07-06T08:00:00Z"
update: "2022-05-08T08:24:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/tuy-bien-mo-rong-doi-tuong-error.png"
keywords: "tùy biến error, mở rộng error"
description: "Tùy biến error hay mở rộng error là cần thiết khi phát triển phần mềm. Vì bạn cần các class Error đặc trưng cho từng loại lỗi xảy ra."
slug: tuy-bien-mo-rong-doi-tuong-error
title: "Tùy biến và mở rộng đối tượng Error trong JavaScript"
shortTitle: "Tùy biến và mở rộng đối tượng Error trong JS"
series: "JavaScript: Error handling"
tags:
  - Error
---

Khi phát triển một thứ gì đó, mình thường cần các **class Error đặc trưng** để miêu tả những lỗi sai trong chương trình. Đối với các lỗi trong hoạt động mạng, mình có thể cần `HttpError`, đối với hoạt động cơ sở dữ liệu là `DbError` và đối với hoạt động tìm kiếm là `NotFoundError`, v.v.

Các lỗi phải hỗ trợ [các thuộc tính cơ bản](/quan-ly-loi-voi-try-catch-trong-javascript/) như `message`, `name` và tốt nhất là `stack`. Nhưng chúng cũng có thể chứa các thuộc tính khác đặc trưng, ví dụ như đối tượng `HttpError` có một thuộc tính `statusCode` với giá trị như `404` hoặc `403` hay `500`...

JavaScript cho phép sử dụng `throw` với bất kỳ đối số nào. Vì vậy, về mặt kỹ thuật, các class lỗi tùy chỉnh không cần kế thừa từ `Error`. Nhưng nếu bạn kế thừa, thì class đó có thể dùng được với [`obj instanceof Error`](/kiem-tra-lop-toan-tu-instanceof-trong-javascript/) để xác định các đối tượng lỗi. Do đó, bạn nên kế thừa từ class `Error` của JavaScript.

Khi ứng dụng mở rộng ra, các lỗi của bạn có thể tạo thành một hệ thống phân cấp. Ví dụ, `HttpTimeoutError` kế thừa từ `HttpError`, v.v.

## Mở rộng đối tượng Error

Giả sử, mình có một hàm `readUser(json)` để đọc [JSON](/tim-hieu-ve-json-trong-javascript/) với dữ liệu người dùng.

Dưới đây là ví dụ về một giá trị `json` hợp lệ:

```js
let json = `{ "name": "Alex", "age": 29 }`;
```

Trong hàm `readUser`, mình sẽ sử dụng `JSON.parse` để parse `json`. Nếu tham số nhận được không đúng định dạng JSON thì hàm `parse` sẽ `throw` ra lỗi `SyntaxError`.

Nhưng kể cả khi `json` chính xác về mặt cú pháp, điều đó không có nghĩa đó là **một người dùng hợp lệ**, phải không?

Vì dữ liệu đó có thể thiếu dữ liệu cần thiết. Ví dụ: `json` có thể thiếu `name` hoặc `age` - các thuộc tính cần thiết mô tả một người dùng.

Do đó, hàm `readUser(json)` sẽ không chỉ đọc JSON mà còn kiểm tra - xác thực dữ liệu. Nếu không có trường bắt buộc hoặc định dạng sai thì **đó là lỗi**.

Và dĩ nhiên, đây không phải là lỗi `SyntaxError`. Bởi vì, dữ liệu đúng về mặt cú pháp, nhưng lại bị một loại lỗi khác. Mình sẽ gọi lỗi đó là `ValidationError` và tạo một class riêng kế thừa từ `Error`.

Lớp `Error` là **built-in** class, nhưng sau đây là đoạn code gần đúng của `Error` để bạn hiểu được về những gì mình sẽ kế thừa:

```js
class Error {
  constructor(message) {
    // Nội dung lỗi
    this.message = message;

    // tên khác nhau với từng loại Error
    this.name = "Error";

    // không phải tiêu chuẩn, nhưng support bởi nhiều môi trường
    this.stack = []; // <call stack>
  }
}
```

Bây giờ, class `ValidationError` kế thừa từ class `Error` trên:

```js
class ValidationError extends Error {
  constructor(message) {
    super(message); // (1)
    this.name = "ValidationError"; // (2)
  }
}

function test() {
  throw new ValidationError("Whoops!");
}

try {
  test();
} catch (err) {
  console.log(err.message); // Whoops!
  console.log(err.name); // ValidationError
  console.log(err.stack); // danh sách nested calls với dòng tương ứng
}
```

**Chú ý:** tại dòng `(1)` mình gọi là hàm khởi tạo của class cha. JavaScript yêu cầu bạn gọi hàm `super` ở hàm tạo của class con. Điều đó là bắt buộc.

Hàm tạo cha sẽ gán giá trị cho thuộc tính `message`, cũng như set giá trị của `name` thành `"Error"`. Vì vậy ở dòng `(2)`, mình đặt lại giá trị phù hợp.

Hãy thử sử dụng `ValidationError` trong hàm `readUser(json)` như sau:

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

// Sử dụng
function readUser(json) {
  let user = JSON.parse(json);
  if (!user.age) {
    throw new ValidationError("No field: age");
  }
  if (!user.name) {
    throw new ValidationError("No field: name");
  }
  return user;
}

// ví dụ với try..catch
try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    console.error("Invalid data: " + err.message);
    // Invalid data: No field: name
  } else if (err instanceof SyntaxError) {
    // (*)
    console.error("JSON Syntax Error: " + err.message);
  } else {
    throw err; // lỗi không rõ, rethrow err (**)
  }
}
```

Khối `try..catch` trong đoạn code trên xử lý cả lỗi tự định nghĩa `ValidationError` và built-in error `SyntaxError` từ hàm `JSON.parse`.

**Chú ý** cách sử dụng `instanceof` để kiểm tra loại lỗi cụ thể tại dòng `(*)`. Ngoài ra, mình cũng có thể xem xét `err.name` như sau:

```js
// ...
// thay vì dùng (err instanceof SyntaxError)
// bạn có thể dùng như sau
} else if (err.name == "SyntaxError") { // (*)
// ...
```

Cách sử dụng `instanceof` là tốt hơn nhiều, vì có thể mình sẽ tiếp tục mở rộng class `ValidationError`, tạo ra các loại khác, như `PropertyRequiredError`. Và toán tử `instanceof` vẫn tiếp tục hoạt động với các lớp kế thừa mới.

Ngoài ra, điều quan trọng là nếu `catch` gặp một lỗi không xác định, thì luồng chương trình sẽ nhảy vào dòng `(**)`. Ở đây, khối `catch` chỉ biết cách xử lý lỗi xác thực và lỗi cú pháp, các loại khác (do lỗi chính tả hoặc các lý do không xác định) sẽ được `throw` để xử lý chỗ khác.

## Kế thừa class `ValidationError`

Class `ValidationError` khá chung chung. Trong khi có khá nhiều điều có thể sai như: thuộc tính có thể không có hoặc có định dạng sai - ví dụ `age` là string thay vì số.

Vì vậy, hãy tạo một class cụ thể hơn là `PropertyRequiredError` để mô tả chính xác cho các thuộc tính bị thiếu.

```js
class ValidationError extends Error {
  constructor(message) {
    super(message);
    this.name = "ValidationError";
  }
}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.name = "PropertyRequiredError";
    this.property = property;
  }
}

// Sử dụng
function readUser(json) {
  let user = JSON.parse(json);
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
  return user;
}

// Ví dụ với try..catch
try {
  let user = readUser('{ "age": 25 }');
} catch (err) {
  if (err instanceof ValidationError) {
    console.log("Invalid data: " + err.message);
    // Invalid data: No property: name

    console.log(err.name); // PropertyRequiredError
    console.log(err.property); // name
  } else if (err instanceof SyntaxError) {
    console.log("JSON Syntax Error: " + err.message);
  } else {
    throw err; // lỗi không xác định, rethrow error
  }
}
```

Class mới `PropertyRequiredError` rất dễ sử dụng. Bạn chỉ cần truyền tên thuộc tính `new PropertyRequiredError(property)`. Sau đó, thông tin `message` cụ thể được sẽ được sinh ra từ hàm khởi tạo.

**Chú ý:**

- `this.name` trong hàm `PropertyRequiredError` được tạo lại một cách thủ công. Điều đó là không cần thiết khi chỉ định `this.name = <class name>` trong mọi class lỗi tùy chỉnh.
- Bạn có thể tránh lặp lại bằng cách tạo ra class "lỗi cơ bản" và chỉ định `this.name = this.constructor.name`. Và sau đó kế thừa tất cả các lỗi tùy chỉnh từ đó.

Giả sử, mình gọi class đó là `MyError`, đoạn code trên có thể sửa thành:

```js{4}
class MyError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
  }
}

class ValidationError extends MyError {}

class PropertyRequiredError extends ValidationError {
  constructor(property) {
    super("No property: " + property);
    this.property = property;
  }
}

// giá trị của `name` là chính xác
console.log(new PropertyRequiredError("field").name); // PropertyRequiredError
```

Bây giờ, các lỗi tùy chỉnh đã ngắn gọn hơn nhiều. Ví dụ như class `ValidationError` trên, vì bạn đã loại bỏ câu lệnh `"this.name = ..."` trong hàm tạo.

## Đóng gói các ngoại lệ

Mục đích của hàm `readUser` trên là **đọc dữ liệu người dùng**. Và có thể xảy ra các loại lỗi khác nhau trong quá trình này.

Bây giờ, bạn có `SyntaxError` và `ValidationError`. Nhưng sau này hàm `readUser` phát triển và có thể tạo ra các loại lỗi khác.

Đoạn code gọi `readUser` sẽ xử lý những lỗi này: sử dụng nhiều câu lệnh `if` trong khối `catch`, kiểm tra lớp, xử lý các lỗi đã biết và `throw` các lỗi chưa biết như sau:

```js
try {
  // ...
  readUser(); // tiềm ẩn lỗi
  // ...
} catch (err) {
  if (err instanceof ValidationError) {
    // xử lý lỗi xác thực
  } else if (err instanceof SyntaxError) {
    // xử lý lỗi cú pháp
  } else {
    throw err; // lỗi không biết, throw error
  }
}
```

Trong đoạn code trên, bạn thấy mình xử lý hai loại lỗi, nhưng thực tế có thể nhiều lỗi hơn.

Nếu hàm `readUser` tạo ra một số loại lỗi, thì câu hỏi đặt ra là: **bạn có thực sự muốn kiểm tra từng loại lỗi một không?**

Thường thì câu trả lời là **Không**.

Thực tế, mình chỉ muốn biết liệu có **lỗi đọc dữ liệu** hay không? Nguyên nhân chính xác lỗi đó lại xảy ra thường không liên quan đến thông báo mô tả lỗi. Hoặc, thậm chí tốt hơn, mình muốn có một cách để lấy chi tiết lỗi, nhưng chỉ khi cần thiết.

Kỹ thuật ở đây có thể được gọi là **đóng gói các ngoại lệ** hay **wrapping exceptions**:

1.  Mình tạo một class mới là `ReadError` - để biểu thị lỗi chung khi "đọc dữ liệu".
2.  Hàm `readUser` sẽ bắt các lỗi đọc dữ liệu xảy ra bên trong, chẳng hạn như `ValidationError` hay `SyntaxError` và sẽ đó tạo ra một lỗi `ReadError`.
3.  Đối tượng `ReadError` sẽ giữ tham chiếu đến lỗi ban đầu trong thuộc tính `cause`.

Sau đó, các đoạn code gọi `readUser` sẽ chỉ phải kiểm tra `ReadError`, không phải mọi loại lỗi đọc dữ liệu. Và nếu cần thêm thông tin chi tiết về lỗi thì có thể kiểm tra thêm thuộc tính `cause`.

Đây là đoạn code về `ReadError` và cách sử dụng trong hàm `readUser` và `try..catch`:

```js
class ReadError extends Error {
  constructor(message, cause) {
    super(message);
    this.cause = cause;
    this.name = "ReadError";
  }
}

class ValidationError extends Error {
  /*...*/
}

class PropertyRequiredError extends ValidationError {
  /* ... */
}

function validateUser(user) {
  if (!user.age) {
    throw new PropertyRequiredError("age");
  }
  if (!user.name) {
    throw new PropertyRequiredError("name");
  }
}

function readUser(json) {
  let user;

  try {
    user = JSON.parse(json);
  } catch (err) {
    if (err instanceof SyntaxError) {
      throw new ReadError("Syntax Error", err);
    } else {
      throw err;
    }
  }

  try {
    validateUser(user);
  } catch (err) {
    if (err instanceof ValidationError) {
      throw new ReadError("Validation Error", err);
    } else {
      throw err;
    }
  }
}

try {
  readUser("{bad json}");
} catch (e) {
  if (e instanceof ReadError) {
    console.log(e);
    // SyntaxError: Unexpected token b in JSON at position 1
    console.log("Original error: " + e.cause);
  } else {
    throw e;
  }
}
```

Trong đoạn code trên, hàm `readUser` hoạt động chính xác như mô tả - bắt lỗi cú pháp hay xác thực và ném ra lỗi `ReadError`.

Vì vậy, đoạn code bên ngoài chỉ cần kiểm tra `instanceof ReadError` là xong, không cần liệt kê tất cả các loại lỗi có thể xảy ra.

Phương pháp này được gọi là **đóng gói các ngoại lệ**. Bởi vì, mình lấy các ngoại lệ **cấp thấp** và **bọc** các ngoại lệ vào trong một class trừu tượng hơn `ReadError`.

Đây là một trong những tính chất quan trọng được sử dụng rộng rãi trong lập trình hướng đối tượng.

## Tổng kết

- Bạn có thể kế thừa từ class `Error` và các **built-in class** khác một cách bình thường. Bạn chỉ cần chú ý đến thuộc tính `name` và gọi hàm `super` trong hàm khởi tạo.
- Có thể sử dụng `instanceof` để kiểm tra các lỗi cụ thể. Toán tử này cũng hoạt động với class kế thừa. Nhưng đôi khi bạn gặp một đối tượng lỗi đến từ thư viện của bên thứ 3 và không dễ dàng để lấy được class từ đó. Khi đó, thuộc tính `name` có thể được sử dụng để kiểm tra loại lỗi.
- Đóng gói các ngoại lệ là một kỹ thuật phổ biến: một hàm xử lý các ngoại lệ cấp thấp và tạo ra các lỗi cấp cao hơn thay vì các lỗi cấp thấp khác nhau. Các ngoại lệ cấp thấp có thể trở thành thuộc tính của đối tượng đó, như `err.cause` trong các ví dụ trên. Tuy nhiên, điều đó không bắt buộc phải nghiêm ngặt.

Tham khảo: [Custom errors, extending Error](https://javascript.info/custom-errors)
