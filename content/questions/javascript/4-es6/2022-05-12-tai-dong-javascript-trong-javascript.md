---
date: "2022-05-12T23:30:00Z"
update: "2022-05-12T23:30:00Z"
template: "question"
directory: "Question"
cover: "../../../images/questions/javascript-question-es6.png"
keywords: "tải động javascript"
description: "ES6 cung cấp cấu trúc import() giúp tải về một module theo yêu cầu. Cấu trúc import() trả về một promise cung cấp một đối tượng bao gồm các module được yêu cầu."
slug: tai-dong-javascript-trong-javascript
title: "Tải động JavaScript trong JavaScript"
series: "JavaScript Question: ES6"
tags:
  - Câu hỏi JS ES6
---

Thông thường, bạn có thể sẽ sử dụng phương pháp **tải tĩnh** để tải về tất cả các hàm được export trong một file JS **ngay từ đầu**.

Việc import tĩnh diễn ra mỗi khi tập lệnh được sử dụng, cho dù module có được sử dụng hay không. Vì vậy, nếu bạn muốn import một module khi cần thiết, thì cách import tĩnh sẽ không giúp ích được gì.

Do đó, với một mã JavaScript, mình cần tìm giải pháp để **chỉ tải các module JavaScript khi cần thiết**.

## Cách tải động JavaScript

ES6 cung cấp cấu trúc `import()` giúp tải về một module theo yêu cầu.

Cấu trúc `import()` trả về một [promise](/promise-la-gi-promise-trong-javascript/) cung cấp một đối tượng bao gồm các module được yêu cầu.

**Cú pháp `import()`:**

```js
import("#duong-dan-module").then((module) => {
  // sử dụng đối tượng module
});
```

**Ví dụ:** mình muốn chạy tập lệnh để thực hiện một số thao tác trên chuỗi, tùy thuộc vào button được click.

Module để đảo ngược chuỗi:

```js:title=reverseString.mjs
export function reverseString(str) {
  return str.split("").reverse().join("");
}
```

Module để kiểm tra xem một string có phải palindrome hay không

```js:title=isPalindrome.mjs
export function isPalindrome(str) {
  return str === str.split("").reverse().join("");
}
```

Sử dụng trong file `index.html`:

```html:title=index.html
<!DOCTYPE html>
<html>
  <head>
    <title>String operations</title>
  </head>

  <body style="text-align:center;">
    <h1 style="color:green;">CompleteJavaScript</h1>

    <input type="text" id="myString" />

    <button id="reverse" style="padding: 0.5em 0.5em;">
      Reverse the String !!
    </button>

    <button id="palindrome" style="padding: 0.5em 0.5em;">
      Check whether palindrome !!
    </button>

    <div
      id="answer"
      style="color: green;
                font-size: 2em;
                padding: 1em;"
    ></div>

    <!-- script để thực hiện các tác vụ lên chuỗi -->
    <script type="text/javascript">
      let reverseButton = document.getElementById("reverse");
      let palindromeButton = document.getElementById("palindrome");

      // module chứa hàm để đảo ngược chuỗi
      let module1 = "/reverseString.mjs";

      // module chứa hàm để kiểm tra string có phải palindrome hay không
      let module2 = "/isPalindrome.mjs";

      // xử lý khi `reverseButton` được click
      reverseButton.addEventListener("click", () => {
        let str = document.getElementById("myString").value;

        import(module1).then((module) => {
          document.getElementById("answer").innerHTML =
            module.reverseString(str);
        });
      });

      // xử lý khi `palindromeButton` được click
      palindromeButton.addEventListener("click", () => {
        //consuming the value of input
        let str = document.getElementById("myString").value;

        import(module2).then((module) => {
          if (module.isPalindrome(str)) {
            document.getElementById("answer").innerHTML =
              "The string is a palindrome";
          } else {
            document.getElementById("answer").innerHTML =
              "The string is not a palindrome";
          }
        });
      });
    </script>
  </body>
</html>
```

## Một số chú ý khi tải động javascript

- Các module cũng có thể được tải động bên trong các file script thông thường.
- Server cục bộ cần được thiết lập để tránh lỗi về [cross-origin](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) khi sử dụng module ES6.

**Khi nào sử dụng cái gì?**

Tải JavaScript động rất hữu ích khi một số module hiếm khi được sử dụng. Điều này giúp cải thiện hiệu suất ở thời gian tải trang ban đầu.

Nhưng nếu bất kỳ module nào được sử dụng thường xuyên trong một tập lệnh, thì điều đó có thể gây ra **độ trễ** trong quá trình thực thi.

Tham khảo:

- [ES6 Modules trên trình duyệt](/su-dung-es-modules-tren-trinh-duyet/)
- [Promise là gì? Promise trong JavaScript](/promise-la-gi-promise-trong-javascript/)
- [How to dynamically load JS inside JS?](https://www.geeksforgeeks.org/how-to-dynamically-load-js-inside-js/)
