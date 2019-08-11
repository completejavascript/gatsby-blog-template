---
date: "2017-09-19T23:19:32Z"
template: "post"
cover: "../images/phan-biet-var-va-let-trong-javascript-complete-javascript.png"
keywords: "phân biệt var và let"
description: "let giống và khác var như thế nào? Bài viết này sẽ giúp bạn phân biệt var và let trong JavaScript. Qua đó, bạn biết cách sử dụng chúng sao cho phù hợp nhất."
slug: phan-biet-var-va-let-trong-javascript
title: "Phân biệt var và let trong JavaScript"
categories:
  - Javascript cơ bản
tags:
  - ES6
---

Từ trước tới giờ, có thể bạn đã quen dùng **var** để khai báo [biến](/values-types-va-operators-trong-javascript-phan-1/) trong JavaScript. Tuy nhiên, từ phiên bản ES6, bạn có thêm một sự lựa chọn nữa là **let**. Vậy **let** giống và khác **var** như thế nào? Bài viết này sẽ giúp bạn phân biệt **var** và **let** trong JavaScript. Qua đó, bạn biết cách sử dụng chúng sao cho phù hợp nhất.

## Giống nhau

- **Var** và **let** đều là từ khoá - keyword.
- **Var** và **let** cùng được dùng để khai báo biến trong [JavaScript](/category/javascript/javascript-co-ban/)

## Khác nhau

- Phạm vi của biến số sử dụng **var** là phạm vi hàm số hoặc bên ngoài [hàm số](/tim-hieu-function-javascript/), toàn cục.
- Phạm vi của biến số sử dụng **let** là phạm vi một khối, xác định bởi cặp {}

### Ví dụ phân biệt var và let

```js
function varvslet() {
  console.log(i); // i is undefined due to hoisting
  console.log(j); // ReferenceError: j is not defined

  for( var i = 0; i < 3; i++ ) {
    console.log("i inside ", i); // 0, 1, 2
  };

  console.log("i outside ", i); // 3
  console.log(j); // ReferenceError: j is not defined

  for( let j = 0; j < 3; j++ ) {
    console.log("j inside ", j); // 0, 1, 2
  };

  console.log("i outside ", i); // 3
  console.log("j outside ", j); // ReferenceError: j is not defined
}
varvslet();
```

- **Let**: trong ví dụ trên biến j được khai báo sử dụng **let**. Bạn có thể thấy rằng biến j chỉ được phép sử dụng trong vòng lặp for. Nếu bạn gọi biến j ngoài vòng lặp for thì đều bị lỗi **ReferenceError: j is not defined**.
- **Var**: phạm vi của biến var là phạm vi của hàm số chứa phần khai báo biến. Do đó, mặc dù biến i được khai báo trong vòng lặp for, nhưng bạn vẫn có thể gọi đến biến i ở mọi vị trí trong hàm số này. Lúc đầu, giá trị của biến i là **undefined**, nên khi bạn gọi console.log(i) lần đầu tiên, giá trị in ra là undefined chứ không phải là lỗi **ReferenceError: i is not defined**.

### Nên sử dụng var hay let?

Câu trả lời là cả hai. Mặc dù, việc sử dụng **let** có vẻ giống với việc khai báo biến trong c/c++. Tuy nhiên, trong nhiều trường hợp, việc sử dụng **var** giúp code ngắn gọn hơn.

Hy vọng qua bài viết ngắn gọn này bạn có thể phân biệt **var** và **let** trong JavaScript.

Cuối cùng, hẹn gặp lại bạn trong [bài viết tiếp theo](/gui-mail-bang-html-va-formspree-io/), thân ái!

## Tham khảo

- [let](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/let)
- [var](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/var)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
