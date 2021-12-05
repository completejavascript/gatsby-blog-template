---
date: "2018-03-15T08:00:00Z"
update: "2021-12-05T20:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/mustache-template-voi-jquery-completejavascript.com_.png"
keywords: "html template với template string"
description: "Như bạn đã biết, ES6 template string có rất nhiều tính năng hay ho. Một trong số đó là việc xây dựng html template với template string."
slug: html-template-voi-template-string
title: "HTML template với template string"
series: "JavaScript: Tutorials"
tags:
  - ES6
  - HTML
  - Template
  - String
---

Như bạn đã biết, [ES6 template string](/su-dung-es6-template-string-co-gi-hay/) có rất nhiều tính năng hay ho. Một trong số đó là việc xây dựng **html template với template string**.

> 💡 Một số bài viết liên quan đến việc **xây dựng HTML template**:
>
> - [HTML String sang DOM Node với DOMParser](/html-string-sang-dom-node-voi-domparser/)
> - [HTML Template sang DOM Node](/chuyen-html-template-sang-dom-node/)
> - [Mustache Template với jQuery](/mustache-template-voi-jquery/)

**Liệu mình có thể xây dựng một thư viện về HTML template tương đương như [Mustache.js](https://github.com/janl/mustache.js/) hay [Handlebars.js](https://handlebarsjs.com/) không?**

Cũng có thể, nhưng cái gì cũng có ưu, nhược điểm của nó. Việc tự xây dựng HTML template với template string:

- **Ưu điểm**: không cần phải sử dụng thư viện bên thứ ba.
- **Nhược điểm**: bạn phải quản lý code nhiều hơn và có thể **đẻ** ra nhiều lỗi.

**Vậy cách này chỉ nên áp dụng khi nào?**

Theo mình, việc tự xây dựng HTML template với template string chỉ nên áp dụng với **những ứng dụng đơn giản**.

Ngược lại, với những ứng dụng phức tạp, bạn nên dùng **thư viện có sẵn, tốt, phổ biến** cho nhanh và an toàn.

Nhưng dù sao, mình thử xem xây dựng HTML template với template string sẽ như thế nào nhé!

## Bài toán về HTML template với template string

Trước khi bắt đầu, mình nghĩ nên đưa ra một bài toán ví dụ để áp dụng. Và như đã nói ở trên, mình có viết **ba bài về chủ đề này rồi**.

Do đó, mình sẽ lấy lại một ví dụ trong đấy để bạn dễ dàng so sánh. Và đó là bài viết **[HTML Template sang DOM Node](/chuyen-html-template-sang-dom-node/):**

https://codepen.io/completejavascript/pen/MVyXyp

Bạn có thể đọc lại bài viết đó để hiểu rõ hơn. Nhưng tóm gọn lại, bài toán này nhằm **xây dựng template để hiển thị mục bình luận** với dữ liệu được cung cấp dưới dạng [mảng](/javascript-array-co-ban/).

Trong bài đó, mình sử dụng thẻ [`template`](https://developer.mozilla.org/en/docs/Web/HTML/Element/template) của HTML để khai báo **HTML template**:

```html:title=index.html
<template id="my-temp">
  <div>
    <span class="name">a name</span>
  </div>
  <div>
    <span class="comment">a comment</span>
  </div>
</template>
```

Kết quả của phương pháp này ta thu được [`DocumentFragment`](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment). Sau đó, mình dùng phương thức [`querySelector`](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) để tìm và cập nhật DOM để thu được giá trị như mong muốn.

```js:title=main.js
let data = [
  { name: "John", comment: "That is great" },
  { name: "Alex", comment: "It's helpful" },
  { name: "David", comment: "Thanks a lot" },
];

btnAdd.addEventListener("click", () => {
  data.forEach((item) => {
    let tmpl = templateFrag.cloneNode(true);
    tmpl.querySelector(".name").innerText = item.name;
    tmpl.querySelector(".comment").innerText = item.comment;
    container.appendChild(tmpl);
  });
});
```

Tóm tắt lại như vậy thôi, sau đây mình sẽ **sử dụng ES6 Template String** vào bài toán này.

## Sử dụng ES6 Template String giải quyết bài toán

Sau đây là cách mình xây dựng HTML template với template string.

### Định nghĩa Template

Để định nghĩa template, mình cần bê đoạn code về `template` ở `index.html` trên về file `main.js`.

Mình cần thay thế `a name` và `a comment` thành giá trị thực tế được định nghĩa trong mảng `data`. Vì vậy, mình đưa 2 phần này vào template string.

Khi đó, HTML template có dạng như sau:

```js:title=main.js
let itemTemplate = (data) => {
  return `
    <div>
      <span class="name">${data.name}</span>
    </div>
    <div>
      <span class="comment">${data.comment}</span>
    </div>
  `;
};
```

Cách định nghĩa này **rất giống với Mustache.js**, chỉ khác ở chỗ là:

- Mustache sử dụng cặp dấu `{{}}` để biểu diễn **expression**, ví dụ: `{{data.name}}`
- Mustache khai báo template trong **thẻ script** nằm ở file html.

Điều đó nghĩa là: mình hoàn toàn có thể sử dụng Template String tương tự như cách sử dụng của Mustache.js.

Mình sẽ chứng minh điều này trong các phần phía dưới. Còn bây giờ, mình sẽ tìm hiểu xem **cách render template** này lên giao diện như thế nào?

#### Render template lên html

Dưới đây là đoạn code [xử lý sự kiện](/xu-ly-mot-event-javascript-co-ban/) khi người dùng click vào button **Add**:

```js:title=main.js
btnAdd.addEventListener("click", () => {
  data.forEach((item) => {
    let tmpl = itemTemplate(item);
    let frag = document.createRange().createContextualFragment(tmpl);
    container.appendChild(frag);
  });
});
```

Với mảng `data`, mình sử dụng [forEach](/javascript-foreach-la-cai-quai-gi/) để duyệt từng phần tử một `item` và gọi [hàm](/ham-la-gi-ham-trong-javascript/):

```js:title=main.js
let tmpl = itemTemplate(item);
```

Kết quả của câu lệnh trên là **một HTML string**. Và tiếp theo, mình cần tạo ra [DOM](/co-ban-ve-dom-javascript/) để chèn vào html. Cách đơn giản nhất là sử dụng `DocumentFragment` như sau:

```js:title=main.js
let frag = document.createRange().createContextualFragment(tmpl);
```

> Tham khảo thêm:
>
> - [Convert String to DOM Nodes](https://davidwalsh.name/convert-html-stings-dom-nodes)
> - [Document.createRange()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createRange)
> - [Range.createContextualFragment()](https://developer.mozilla.org/en-US/docs/Web/API/Range/createContextualFragment)

Bước cuối cùng là [append](https://developer.mozilla.org/en/docs/Web/API/Node/appendChild) vào `container` thôi.

Với cách làm như này, mình đã tạo được HTML Template với template string mà không cần phải `querySelector` hay sử dụng thư viện như **Mustache.js** như trên...

Bạn có thể tham khảo ví dụ hoàn chỉnh tại đây:

https://codepen.io/completejavascript/pen/YLpbzR

Dĩ nhiên, ví dụ đơn giản như này chưa thể so sánh với Mustache.js được.

Vì thư viện này còn hỗ trợ viết [vòng lặp](/vong-lap-trong-javascript/), câu [điều kiện rẽ nhánh](/cau-truc-re-nhanh-trong-javascript/) `if/else` trong template. Nếu vậy, mình cũng thử triển khai các tính năng này xem sao.

### Sử dụng vòng lặp với ES6 Template String

Trong ví dụ trên, mình định nghĩa HTML template là một **item**. Sau đó, render từng item và chèn vào `container` bằng phương thức `append`.

Tuy nhiên, bạn cũng có thể xử lý ngay bên trong của Template String để sinh ra html tổng và chỉ cần render 1 lần.

Khi đó, mình định nghĩa template như sau:

```js:title=main.js
let itemTemplate = (item) => {
  return `
    <div>
      <span class="name">${item.name}</span>
    </div>
    <div>
      <span class="comment">${item.comment}</span>
      </div>
    `;
};

let htmlTemplate = (data) => {
  return `${data.map((item) => itemTemplate(item)).join("")}`;
};
```

**Chú ý:**

- Hàm `itemTemplate` ở ví dụ này tương đương với hàm `itemTemplate` ở phần trước.
- Đoạn code `data.map(item => itemTemplate(item)` trả về một mảng gồm các string mà mỗi string thu được từ hàm `itemTemplate` phía trên.
- Sau đó, mình dùng phương thức [`join`](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join) để thu được string tổng - chính là html string cần chèn vào `container`.

Công việc còn lại là **tạo ra DOM và chèn vào `container`** thì hoàn toàn giống với phần trước. Dưới đây là ví dụ cho phương pháp này:

https://codepen.io/completejavascript/pen/BxQeWN

Rõ ràng, mình đã có thể **xử lý vòng lặp** ngay bên trong Template String. Nghĩa là mình cũng có thể sử dụng điều kiện `if/else`.

Tuy nhiên, mình sẽ để phần này cho bạn đọc **tự suy nghĩ và giải quyết vấn về**. Nếu có khó khăn hay góp ý gì thì có thể để lại cho mình trong phần bình luận.

Hãy nhớ rằng:

> Practice makes perfect!

## Tổng kết

Trên đây là cách xây dựng HTML template với template string. Việc tự xây dựng HTML template với template string:

- **Ưu điểm**: không cần phải sử dụng thư viện bên thứ ba.
- **Nhược điểm**: bạn phải quản lý code nhiều hơn và có thể **đẻ** ra nhiều lỗi.

Vì vậy, bạn nên cân nhắc khi chọn phương pháp này so với việc sử dụng thư viện.

**Tham khảo:**

- [Getting Literal With ES6 Template Strings](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings)
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Easy Creation of HTML with JavaScript's Template Strings](https://wesbos.com/template-strings-html)
