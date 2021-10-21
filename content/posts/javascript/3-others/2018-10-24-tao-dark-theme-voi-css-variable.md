---
date: "2018-10-24T22:30:40Z"
template: "post"
directory: "JavaScript"
cover: "../images/tao-dark-theme-voi-css-variable-completejavascript.com_.png"
keywords: "tạo dark theme với css variable"
description: "Bạn đã biết tạo Dark theme cho trang web. Bài viết này mình sẽ giới thiệu với bạn cách tạo Dark theme với CSS Variable rất hay."
slug: tao-dark-theme-voi-css-variable
title: "Tạo Dark Theme với CSS Variable"
tags:
  - CSS
---

**Dark theme**, **dark mode** hay **night mode**,... là một tính năng khá thú vị. Mình hay chuyển theme (trình duyệt, IDE) về chế độ này. Vì đơn giản là trông nó có vẻ chuyên nghiệp và mang màu sắc bí ẩn - kiểu hacker ấy.

Mà nói vậy chứ, thực ra mình để vậy cho **đỡ chói mắt** thôi. Không phải làm màu đâu nhé!

À, thế bạn biết cách xây dựng nhiều theme cho một trang web không? Mình thì không chắc đâu.

Nhưng sau khi tìm hiểu về CSS variable xong, mình đã nảy ra một ý tưởng. Đó là mình sẽ thử tạo dark theme với CSS variable cho trang web.

**Tại sao lại là CSS variable?**

## Cơ bản về CSS variable

### Khái niệm

CSS variable cho phép bạn định nghĩa biến số ngay trong CSS - việc mà bạn **ĐÃ TỪNG** chỉ làm ở các ngôn ngữ lập trình JavaScript, C/C++, Java,...

Việc sử dụng biến số có những ưu điểm là bạn có thể định nghĩa một nơi và sử dụng lại ở nhiều nơi khác. Bạn cũng có thể thay đổi giá trị CSS variable từ JavaScript. Và rõ ràng là bạn chỉ cần thay đổi một lần, chứ không phải thay thế thủ công kiểu **find-replace** nữa.

### Cách sử dụng cơ bản

Mọi CSS variable đều bắt đầu bằng hai dấu gạch ngang (--) và phải đặt trong một **element** nào đó. Ví dụ: _body, div, .class_bat_ky,..._

Ví dụ phần khai báo CSS variable:

```css
element {
  --main-bg-color: #000;
}
```

Để dụng biến số này, bạn sử dụng function [var()](https://developer.mozilla.org/en-US/docs/Web/CSS/var) với tham số là CSS variable. Ví dụ:

```css
element {
  background-color: var(--main-bg-color);
}
```

Ngoài ra, nếu bạn muốn sử dụng CSS variable ở mọi nơi trên trang web, bạn có thể khai báo chúng ở <code>:root</code> - phần tử cấp cao nhất trong [DOM tree](/co-ban-ve-dom-javascript).

Để biết thêm về các tính chất của CSS variable bạn có thể tham khảo thêm tại các bài viết sau:

- [Căn bản về CSS Variables](https://ehkoo.com/bai-viet/can-ban-ve-css-variables)
- [Khám phá những lợi ích của CSS Variables](https://viblo.asia/p/kham-pha-nhung-loi-ich-cua-css-variables-Eb85oBE6l2G)

## Áp dụng tạo dark theme với CSS variable

### Ý tưởng chung

Giả sử mình có một file _index.html_ với nội dung phần body như này:

```html
<body>
  <div class="option">
    <span class="btn">Dark</span>
    <span class="btn active">Light</span>
  </div>

  <main>
    <header>
      <h1>Exercitation ullamco laboris nisi ut aliquip commodo.
    </header>

    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
    Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris,
    nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor</p>

    <p>in reprehenderit in voluptate velit esse cillum dolore eu,
    fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident,
    sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
  </main>
</body>
```

Giao diện mặc định ban đầu là kiểu **Light**.

Để thay đổi giao diện sang kiểu **Dark**, mình sẽ thêm một class với tên "dark" vào _body_ - vì _body_ là cấp cao nhất chứa nội dung trang web.

```html
<body class="dark">
  <!-- Nội dung không thay đổi -->
</body>
```

Dĩ nhiên, việc thêm hay không thêm _class_, mình áp dụng thông qua 2 button _Dark_, _Light_ - bên trên cùng của _body_.

Ví dụ sử dụng jQuery:

```js
$(document).ready(function () {
  const $body = $("body");
  const $btns = $(".btn");

  $btns.on("click", function () {
    $btns.removeClass("active");
    $(this).addClass("active");
    $body.toggleClass("dark");
  });
});
```

Tiếp theo là việc thay đổi style.

### Khi không sử dụng CSS variable

Giả sử, giao diện Light theme ban đầu có style như sau:

```css
* {
  box-sizing: border-box;
}
body {
  margin: 0;
  padding: 15px;
  font: normal normal normal 1rem/1.6 Nunito Sans, Helvetica, Arial, sans-serif;
  color: #222;
  background-color: #e8edec;
}
main {
  width: 100%;
  max-width: 40rem;
  margin: 15px auto;
  padding: 15px;
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}
.option {
  font-size: 0.8rem;
}
.btn {
  padding: 5px 10px;
  background-color: #e8edec;
}
.btn.active {
  background-color: #222;
  color: #fff;
}
.btn:not(.active):hover {
  cursor: pointer;
}
```

Với Dark theme, mình phải đặt tất cả element cần thay đổi vào bên trong class "dark" để tuỳ chỉnh:

```css
.dark {
  color: #e8edec;
  background-color: #222;
}
.dark main {
  background-color: #000;
  box-shadow: 0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24);
  -webkit-box-shadow: 0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24);
  -moz-box-shadow: 0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24);
}
.dark .btn {
  background-color: #222;
}
.dark .btn.active {
  background-color: #fff;
  color: #000;
}
```

Rõ ràng là có bao nhiêu phần tử cần thay đổi thì mình cần phải đặt bấy nhiêu phần tử vào bên trong class _dark_ để tuỳ biến. Như vậy, vừa bị lặp code, mà mỗi khi muốn thay đổi thì sẽ rất vất vả.

Theo mình thấy, người ta thường sẽ tách phần code thành 2 file kiểu như:

- _main-theme-light.css_
- _main-theme-dark.css_

Rồi khi muốn thêm một theme mới, người ta sẽ tạo ra một file tương đương như _main-theme-dark.css_ (ví dụ _main-theme-custom.css_). Rồi lại sửa thủ công trong file này để tạo ra một theme mới. Nếu code ngắn thì không sao, nhưng khi lượng code lớn, việc tìm kiếm và thay thế quả thật rất khó khăn.

_Nếu bạn đã từng hard-code thì sẽ hiểu điều này!!!_

### Khi sử dụng CSS variable

Đầu tiên, mình phải xác định những thành phần sẽ sử dụng làm biến số để định nghĩa nó trong _body_. Khi đó, thẻ _body_ được định nghĩa như sau:

```css
body {
  --primary-color: #222;
  --primary-bg-color: #e8edec;
  --main-txt-color: #222;
  --main-bg-color: #fff;
  --active-txt-color: #fff;
  --shadow-style: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);

  margin: 0;
  padding: 15px;
  font: normal normal normal 1rem/1.6 Nunito Sans, Helvetica, Arial, sans-serif;
  color: var(--primary-color);
  background-color: var(--primary-bg-color);
}
```

Mình định nghĩa CSS variable ở ngay phần đầu của _body_ rồi sử dụng ngay _--primary-color_ và _--primary-bg-color_ phía dưới.

Để tạo Dark Theme với CSS variable, mình định nghĩa lại giá trị của các biến số như sau:

```css
body.dark {
  --primary-color: #e8edec;
  --primary-bg-color: #222;
  --main-txt-color: #e8edec;
  --main-bg-color: #000;
  --active-txt-color: #000;
  --shadow-style: 0 1px 3px rgba(255, 255, 255, 0.12), 0 1px 2px rgba(255, 255, 255, 0.24);
}
```

Rõ ràng, tất cả các biến số đã tập trung ở một nơi. Khi cần thay đổi giao diện thì mình chỉ cần thay đổi giá trị của biến số ở đây là được.

Rồi khi muốn thêm giao diện mới, mình chỉ cần định nghĩa thêm như sau:

```css
body.custom {
  /* Định nghĩa giá trị của biến số tại đây */
}
```

**Bây giờ sử dụng biến số này thế nào?**

Vì mình đã định nghĩa CSS variable rồi nên phần main không cần phải lặp lại nhiều nữa, mà chỉ cần sử dụng như sau:

```css
main {
  width: 100%;
  max-width: 40rem;
  margin: 15px auto;
  padding: 15px;
  background-color: var(--main-bg-color);
  color: var(--main-txt-color);
  box-shadow: var(--shadow-style);
  -webkit-box-shadow: var(--shadow-style);
  -moz-box-shadow: var(--shadow-style);
}
.option {
  font-size: 0.8rem;
}
.btn {
  padding: 5px 10px;
  background-color: var(--primary-bg-color);
}
.btn.active {
  background-color: var(--primary-color);
  color: var(--active-txt-color);
}
.btn:not(.active):hover {
  cursor: pointer;
}
```

## Demo

### Demo tạo dark theme không sử dụng css variable

https://codepen.io/completejavascript/pen/bmYVjR

### Demo tạo dark theme với css variable

https://codepen.io/completejavascript/pen/PyONOg

## Lời kết

Trên đây là cách tạo dark theme với CSS variable. Và dĩ nhiên, bạn có thể áp dụng để tạo thêm nhiều kiểu theme khác nhau một cách đơn giản.

Bài này mình chỉ làm một Demo chạy thử nghiệm, nên là không biết những phần mình giải thích phía trên bạn có hiểu hết không? Hy vọng là bạn hiểu được cái ý tưởng chính của nó.

Nếu có phần nào khó hiểu, hy vọng bạn góp ý lại với mình. Còn bây giờ thì xin chào và hẹn gặp lại!
