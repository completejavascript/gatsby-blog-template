---
date: "2017-06-20T00:15:00Z"
update: "2019-10-18T12:00:00Z"
template: "post"
directory: "JavaScript"
title: "Làm sao để bắt buộc truyền tham số vào hàm?"
slug: lam-sao-bat-buoc-truyen-tham-so-vao-ham
keywords: "bắt buộc truyền tham số"
description: "Khi lập trình, nhiều hàm phải bắt buộc truyền tham số vào. Ngược lại thì hàm sẽ không có ý nghĩa gì cả. Bài viết này sẽ giới thiệu với bạn cách để làm được điều đó."
cover: "../../../images/javascript/bat-buoc-truyen-tham-so-vao-ham-1-completejavascript.com.png"
series: "JavaScript: Kiến thức nâng cao về hàm"
tags:
  - ES6
  - Hàm
---

Khi lập trình, nhiều hàm phải bắt buộc truyền tham số vào. Ngược lại thì hàm sẽ không có ý nghĩa gì cả. Do đó, bài viết này sẽ giới thiệu với bạn cách để làm được điều đó.

Tuy nhiên, trước khi bắt đầu, mình sẽ tìm hiểu về tham số mặc định của hàm trước.

## Tham số mặc định của hàm

Trong JavaScript, khi bạn không truyền tham số vào [hàm](/ham-la-gi-ham-trong-javascript/) thì giá trị của nó trong hàm sẽ là **undefined**.

Ví dụ:

```js
const sayHello = (name) => {
  console.log(`Hello ${name}!`);
};

sayHello(); // Hello undefined!
```

Như bạn thấy đó, giá trị của **name** trong hàm trên là **undefined**. Để set giá trị mặc định cho nó khi người dùng không truyền vào, mình có thể làm theo hai cách sau đây.

### Set giá trị mặc định cho tham số hàm với ES5

Với ES5, mình có thể sử dụng toán tử **||** (toán tử OR) để set giá trị mặc định cho tham số hàm như sau:

```js
function sayHello(name) {
  var finalName = name || "World";
  console.log(`Hello ${finalName}!`);
}

sayHello("Lam Pham"); // Hello Lam Pham!
sayHello(); // Hello World!
```

Ở đây, toán tử **||** sẽ thực hiện ước lượng biểu thức từ trái sang phải và dừng lại cho đến khi gặp thành phần mà giá trị của nó sau khi ước lượng được là **true**.

Nếu bạn không truyền tham số gì vào, nghĩa là giá trị của _name_ là **undefined**. Mà giá trị này được quy về **false**. Do đó, kết quả _finalName_ sẽ bằng _World_.

Ngược lại nếu bạn truyền vào đó một string khác rỗng, mà string khác rỗng bất kỳ thì luôn được ước lượng thành **true**. Do đó, _finalName_ sẽ bằng _name_.

Một điều chú ý là: Nếu bạn truyền vào các giá trị **falsy** thì kết quả cũng tương tự như **undefined**.

Ví dụ:

```js
function sayHello(name) {
  var finalName = name || "World";
  console.log(`Hello ${finalName}!`);
}

sayHello(""); // Hello World!
sayHello(0); // Hello World!
sayHello(false); // Hello World!
sayHello(undefined); // Hello World!
sayHello(null); // Hello World!
```

### Set giá trị mặc định cho tham số hàm với ES6

Với [ES6](/tag/es6/), mình có thể khởi tạo giá trị mặc định cho tham số hàm như sau:

```js
const sayHello = (name = "World") => {
  console.log(`Hello ${name}!`);
};

sayHello("Lam Pham"); // Hello Lam Pham!
sayHello(); // Hello World!
```

Tuy nhiên, việc truyền các giá trị **falsy** vào sẽ cho kết quả khác so với cách ES5 trên:

```js
const sayHello = (name = "World") => {
  console.log(`Hello ${name}!`);
};

sayHello(""); // Hello !
sayHello(0); // Hello 0!
sayHello(false); // Hello false!
sayHello(undefined); // Hello World!
sayHello(null); // Hello World!
```

Nghĩa là chỉ khi nào giá trị của tham số là **undefined** thì nó mới nhận giá trị mặc định.

## Cách bắt buộc truyền tham số vào hàm

Quay lại nội dung chính của bài viết hôm nay. Nhiều khi mình không muốn sử dụng giá trị mặc định, mà bắt buộc truyền tham số vào hàm thì sao?

Khi đó, mình có thể tận dụng cách làm trên, nhưng mình sẽ custom lại giá trị mặc định như sau:

```js
const isRequired = (param) => {
  throw Error(`Parameter: ${param} is required!`);
};

const sayHello = (name = isRequired("name")) => {
  console.log(`Hello ${name}!`);
};

sayHello("Lam Pham"); // Hello Lam Pham!
sayHello(); // Uncaught Error: Parameter: name is required!
```

Ở đây, giá trị mặc định là kết quả của việc gọi hàm _isRequired()_. Nghĩa là nếu bạn không truyền tham số vào hàm thì hàm _isRequired()_ sẽ được gọi.

Điều này dẫn đến kết quả là một thông báo lỗi sẽ được **throw** ra như trên.

## Lời kết

Trên đây là cách triển khai việc bắt buộc truyền tham số vào hàm. Nếu bạn có thắc mắc hay góp ý gì thì vui lòng để lại trong phần bình luận phía dưới.

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!
