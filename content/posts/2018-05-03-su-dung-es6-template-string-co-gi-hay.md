---
date: "2018-05-03T00:00:44Z"
template: "post"
cover: "../images/su-dung-es6-template-string-co-gi-hay-ho-completejavascript.com_.1.png"
keywords: "Sử dụng ES6 Template String"
description: "Đúng như tiêu đề, bài viết này mình sẽ đi tìm lời giải đáp cho câu hỏi: sử dụng ES6 Template String có gì hay hơn so với các phương pháp truyền thống."
slug: su-dung-es6-template-string-co-gi-hay
title: "Sử dụng ES6 Template String có gì hay?"
categories:
  - Thủ thuật JavaScript
tags:
  - ES6
  - Event
  - HTML
  - Template
---

Có thể bạn thừa biết, phiên bản ES6 của JavaScript đã giới thiệu rất nhiều những [tính năng hay hấp dẫn](https://webapplog.com/es6/) của ngôn ngữ lập trình này. Một trong số đó là **Template literals** hay **Template String**. Nếu vậy thì sử dụng ES6 Template String có gì hay hơn so với string thông thường? Sau đây, mình và bạn sẽ cùng nhau tìm hiểu.

## ES6 Template String là gì?

ES6 Template String tạm gọi là một cú pháp, cho phép bạn viết biểu thức ngay bên trong [string](/values-types-va-operators-trong-javascript-phan-2/). Trong đó, thay vì sử dụng cặp dấu ngoặc đơn ('') hay ngoặc kép (""), bạn sử dụng cặp dấu **backtick** hay **backqoute**, để biểu diễn string.

Xin lỗi vì mình chưa tìm ra cách để hiển thị cặp dấu này ở wordpress, nên dùng tạm cái này:

```
``
```

Khi đó, biểu thức bên trong template string sẽ được biểu diễn với cú pháp: **\${_expression_}**.

Ví dụ:

```js
let name = 'Lam Pham';
let greeting = `I'm ${name}`;

console.log(greeting);
// => I'm Lam Pham
```

Ở ví dụ này, _name_ biểu diễn string thông thường; _greeting_ biểu diễn template string.

Đến đây có lẽ bạn đã mường tượng ra cách sử dụng của Template String rồi và đang tự hỏi: _vậy thì nó có ưu điểm gì hơn so với việc sử dụng string thông thường không?_

## Những ưu điểm nổi bật của ES6 Template String

### Ghép nối string

Thông thường để ghép nối string trong JavaScript bạn có thể sử dụng phương thức [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/concat) hoặc toán tử +.

**Ví dụ sử dụng phương thức concat:**

```js
let intro = "Hello everyone, I'm";
let firstName = 'Lam';
let lastName = 'Pham';

let full1 = intro.concat(' ', firstName, ' ', lastName, '.');
console.log(full1);
// => Hello everyone, I'm Lam Pham.
```

**Ví dụ sử dụng toán tử +:**

```js
let intro = "Hello everyone, I'm";
let firstName = 'Lam';
let lastName = 'Pham';

let full2 = intro + ' ' + firstName + ' ' + lastName + '.';
console.log(full2);
// => Hello everyone, I'm Lam Pham.
```

Cả hai cách trên đều ra được kết quả như mong muốn. Tuy nhiên, cách viết lại không trực quan và đôi khi còn khó theo dõi. Trong khi đó, nếu sử dụng ES6 Template String thì bạn sẽ thấy cách viết **gọn gàng**, **dễ nhìn** và **đẹp hơn nhiều**.

```js
let intro = "Hello everyone, I'm";
let firstName = 'Lam';
let lastName = 'Pham';

let full3 = `${intro} ${firstName} ${lastName}.`;
console.log(full3);
// => Hello everyone, I'm Lam Pham.
```

_Nếu bạn đồng ý với nhận xét của mình thì có thể để lại bình luận ở phía dưới nhé, mình sẽ rất vui lòng !!!_

### Sử dụng đồng thời ngoặc đơn và ngoặc kép

Để sử dụng ngoặc đơn hoặc ngoặc kép trong string thì bạn có thể sử dụng các cách sau đây:

Sử dụng kí tự backslash (\\):

```js
let str = "I'm a \"JavaScript Lover\".";
console.log(str);
// => I'm a "JavaScript Lover".
```

Nếu muốn hiển thị ngoặc đơn thì bạn có thể sử dụng ngoặc kép để biểu diễn string:

```js
let str = "I'm Lam Pham.";
console.log(str);
// => I'm Lam Pham.
```

Nếu muốn hiển thị ngoặc kép thì bạn có thể sử dụng ngoặc đơn để biểu diễn string:

```js
let str = 'Call me "JavaScript Lover"';
console.log(str);
// => Call me "JavaScript Lover"
```

Rõ ràng, nếu so sánh với những ngôn ngữ khác thì việc JavaScript hỗ trợ sử dụng ngoặc đơn hoặc ngoặc kép để biểu diễn string đã tiện lợi hơn rất nhiều rồi.

Hơn nữa, khi sử dụng ES6 Template String, bạn thậm chí chẳng cần phải quan tâm đến vấn đề này nữa, vì bạn đã có cặp dấu **backtick** rồi.

```js
let str = `I'm a "JavaScript Lover".`;
console.log(str);
// => I'm a "JavaScript Lover".
```

Bạn thấy đấy, bạn vừa có thể hiển thị dấu ngoặc đơn và dấu ngoặc kép mà không cần sử dụng đến kí tự \\.

### Viết string trên nhiều dòng

Với cách thông thường, để viết string trên nhiều dòng, bạn có thể sử dụng kí tự (\\n) - **newline**.

```js
let str = 'Hello everyone!\n' +
          'This is line 1 of multiline string example.\n' +
          'This is line 2 of multiline string example.';

console.log(str);
/*
Hello everyone!
This is line 1 of multiline string example.
This is line 2 of multiline string example.
*/
```

Khi sử dụng ES6 Template String thì không cần dùng kí tự đó nữa:

```js
let str = `Hello everyone!
This is line 1 of multiline string example.
This is line 2 of multiline string example.`;

console.log(str);
/*
Hello everyone!
This is line 1 of multiline string example.
This is line 2 of multiline string example.
*/
```

### Viết biểu thức toán học hoặc hàm số ngay trong string

Cách thông thường:

```js
let x = 1;
let y = 2;
let sum = (x, y) => x + y;

console.log('Sum of x and y is: ' + (x + y));
// => Sum of x and y is: 3

console.log('Sum of x and y is: ' + sum(x, y));
// => Sum of x and y is: 3
```

Khi sử dụng ES6 Template String:

```js
let x = 1;
let y = 2;
let sum = (x, y) => x + y;

console.log(`Sum of x and y is: ${x + y}`);
// => Sum of x and y is: 3

console.log(`Sum of x and y is: ${sum(x, y)}`);
// => Sum of x and y is: 3
```

Trên đây là một số những tính năng mà mình thấy rất hữu ích của ES6 Template String. Ngoài ra, Template String còn hỗ trợ [Tagged Template Literals](https://wesbos.com/tagged-template-literals/). Bạn có thể đọc tham khảo và chia sẻ lại với mọi người - vì thực lòng là mình chưa sử dụng tính năng này bao giờ, nên không dám chém bừa.

**Vậy, với những ưu điểm như thế thì Template String có thể áp dụng được vào đâu nhỉ?**

Nghe tên có **Template** là mình nghĩ ngay đến việc sử dụng thằng này vào xây dựng HTML template. Vì mấy bài viết gần đây mình cũng có đề cập đến chủ đề này:

- [HTML String sang DOM Node với DOMParser](/html-string-sang-dom-node-voi-domparser/)
- [HTML Template sang DOM Node](/chuyen-html-template-sang-dom-node/)
- [Mustache Template với jQuery](/mustache-template-voi-jquery/)

**Liệu mình có thể xây dựng một thư viện tương đương như [Mustache.js](https://github.com/janl/mustache.js/) hay [Handlebars.js](https://handlebarsjs.com/)?**

Cũng có thể. Nhưng cái gì cũng có ưu, nhược điểm của nó:

- **Ưu điểm**: Không cần phải sử dụng thư viện bên thứ ba.
- **Nhược điểm**: Bạn phải quản lý code nhiều hơn và có thể **đẻ** ra nhiều issue.

**Vậy cách này chỉ nên áp dụng khi nào?**

Theo mình, cách này chỉ nên áp dụng với những ứng dụng đơn giản, HTML Template không quá phức tạp. Ngược lại, thì cứ dùng thư viện có sẵn cho lành.

Nhưng dù sao thì cứ thử làm xem nó ra cái gì nào.

## Sử dụng ES6 Template String xây dựng HTML Template

### Định nghĩa bài toán

Trước khi bắt đầu, mình nghĩ nên đưa ra một bài toán ví dụ để áp dụng cái này. Và như đã nói ở trên, mình có viết 3 bài về chủ đề này rồi, do đó, tốt nhất là lấy lại một ví dụ trong đấy.

Mình quyết định sử dụng ví dụ trong bài viết **[HTML Template sang DOM Node](/chuyen-html-template-sang-dom-node/):**

https://codepen.io/completejavascript/pen/MVyXyp

Bạn có thể đọc lại bài viết đó để hiểu rõ hơn. Nhưng túm gọn lại, bài toán này nhằm xây dựng template để hiển thị mục bình luận với dữ liệu được cung cấp dưới dạng [mảng](/javascript-array-co-ban/).

Trong bài đó, mình sử dụng thẻ [template](https://developer.mozilla.org/en/docs/Web/HTML/Element/template) của HTML để khai báo html template:

```html
<template id="my-temp">
  <div>
    <span class="name">a name</span>
  </div>
  <div>
    <span class="comment">a comment</span>
  </div>
</template>
```

Kết quả của phương pháp này là ta được [DocumentFragment](https://developer.mozilla.org/en-US/docs/Web/API/DocumentFragment), sau đó áp dụng [querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) để thu được giá trị như mong muốn.

```js
let data = [
  {name: "John", comment: "That is great"},
  {name: "Alex", comment: "It's helpful"},
  {name: "David", comment: "Thanks a lot"}
];

btnAdd.addEventListener("click", () => {
  data.forEach(item => {
    let tmpl = templateFrag.cloneNode(true);
    tmpl.querySelector('.name').innerText = item.name;
    tmpl.querySelector('.comment').innerText = item.comment;
    container.appendChild(tmpl);
  });
});
```

Tóm tắt lại như vậy thôi, sau đây mình sẽ sử dụng ES6 Template String vào bài toán này.

### Sử dụng ES6 Template String giải quyết bài toán

#### Định nghĩa Template

Trong ví dụ trên, mình cần thay thế a name và a comment thành giá trị thực tế định nghĩa trong mảng **data**. Vì vậy, mình sẽ đưa 2 thành phần này vào Template String. Khi đó, html template sẽ có dạng như sau:

```js
let itemTemplate = (data) => {
  return `
    <div>
      <span class="name">${data.name}</span>
    </div>
    <div>
      <span class="comment">${data.comment}</span>
    </div>
  `;
}
```

Bạn có thể thấy là cách định nghĩa này rất giống với Mustache, chỉ khác ở chỗ là:

- Mustache sử dụng cặp dấu {{}} để biểu diễn expression, ví dụ: {{data.name}}
- Mustache khai báo template trong thẻ script nằm ở file html.

Điều đó có nghĩa là mình hoàn toàn có thể sử dụng Template String tương tự như cách sử dụng của Mustache.js. Mình sẽ chứng minh điều này trong các phần phía dưới. Còn bây giờ, mình và bạn sẽ tìm hiểu xem cách render template này lên giao diện như thế nào?

#### Render template thành html

Dưới đây là đoạn code [xử lý sự kiện](/xu-ly-mot-event-javascript-co-ban/) khi người dùng click vào button **Add**:

```js
btnAdd.addEventListener("click", () => {
  data.forEach(item => {
    let tmpl = itemTemplate(item);
    let frag = document.createRange().createContextualFragment(tmpl);
    container.appendChild(frag);
  });
});
```

Với mảng **data**, mình sử dụng [forEach](/javascript-foreach-la-cai-quai-gi/) để duyệt từng phần tử một - **item** và gọi [hàm](/tim-hieu-function-javascript/):

```js
let tmpl = itemTemplate(item);
```

Kết quả của câu lệnh trên là một html string. Tiếp theo, mình cần tạo ra [DOM](/co-ban-ve-dom-javascript/) để chèn vào html.

Cách đơn giản nhất là sử dụng DocumentFragment bằng cách:

```js
let frag = document.createRange().createContextualFragment(tmpl);
```

_Tham khảo thêm:_

- _[Convert String to DOM Nodes](https://davidwalsh.name/convert-html-stings-dom-nodes)_
- _[Document.createRange()](https://developer.mozilla.org/en-US/docs/Web/API/Document/createRange)_
- _[Range.createContextualFragment()](https://developer.mozilla.org/en-US/docs/Web/API/Range/createContextualFragment)_

Công việc cuối cùng cần làm là [append](https://developer.mozilla.org/en/docs/Web/API/Node/appendChild) vào *container* thôi. Với cách làm như này, mình đã có thể tạo HTML Template mà không cần phải querySelector hay sử dụng thư viện như Mustache.js...

Bạn có thể tham khảo ví dụ hoàn chỉnh tại đây:

https://codepen.io/completejavascript/pen/YLpbzR

Dĩ nhiên, với ví dụ đơn giản như này thì chưa thể so sánh với Mustache.js được. Vì thư viện này còn hỗ trợ viết vòng lặp, câu điều kiện **if else** trong template. Nếu vậy, mình cũng thử triển khai các tính năng này xem sao.

### Sử dụng vòng lặp với ES6 Template String

Trong ví dụ trên, mình định nghĩa HTML template là một item. Sau đó, render từng item và chèn vào container bằng phương thức append. Tuy nhiên, bạn cũng có thể xử lý ngay bên trong của Template String để sinh ra html tổng và chỉ cần render 1 lần.

Khi đó, mình định nghĩa template như sau:

```js
let itemTemplate = (item) => {
  return `
    <div>
      <span class="name">${item.name}</span>
    </div>
    <div>
      <span class="comment">${item.comment}</span>
      </div>
    `;
}

let htmlTemplate = (data) => {
  return `${data.map(item => itemTemplate(item)).join('')}`;
}
```

Bạn chú ý:

- Hàm **itemTemplate** ở ví dụ này tương đương với hàm **itemTemplate** ở phần trước.
- Đoạn code **data.map(item => itemTemplate(item)** sẽ trả về một mảng gồm các string mà mỗi string thu được từ hàm **itemTemplate** phía trên. Sau đó, mình dùng phương thức [join](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/join) để thu được string tổng - chính là html string cần chèn vào _container_.

Công việc còn lại là tạo ra DOM và chèn vào container thì hoàn toàn giống với phần trước. Dưới đây là ví dụ cho phương pháp này:

https://codepen.io/completejavascript/pen/BxQeWN

Rõ ràng là mình đã có thể xử lý vòng lặp ngay bên trong Template String. Nghĩa là mình cũng có thể sử dụng điều kiện **if else**. Tuy nhiên, bài viết đến đây cũng khá dài rồi. Nên phần này mình để các bạn tự suy nghĩ cách làm. Nếu có khó khăn hay góp ý gì thì có thể để lại cho mình trong phần bình luận.

Hãy nhớ rằng:

> Practice makes perfect!

## Kết luận

Như vậy là mình đã giới thiệu với bạn về cách sử dụng ES6 Template String. Hy vọng bạn đã nắm được ES6 Template String là gì? Những ưu điểm và cách ứng dụng nó để xây dựng HTML Template.

Ngoài ra, nếu bạn biết ES6 Template String có thể ứng dụng vào đâu khác nữa thì chia sẻ lại với mình trong phần bình luận nhé.

Và nếu bạn có thắc mắc hay góp ý gì với bài viết của mình thì cũng vui lòng để lại dưới phần bình luận. Mình mong muốn nhận được góp ý của bạn để có thể viết được những bài viết chất lượng hơn sau này.

Cuối cùng, xin chào và hẹn gặp lại ở [bài viết tiếp theo](/6-cach-loai-bo-phan-tu-lap-trong-mang/), thân ái!

**Tham khảo:**

- [Getting Literal With ES6 Template Strings](https://developers.google.com/web/updates/2015/01/ES6-Template-Strings)
- [Template literals](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals)
- [Easy Creation of HTML with JavaScript's Template Strings](https://wesbos.com/template-strings-html/)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
