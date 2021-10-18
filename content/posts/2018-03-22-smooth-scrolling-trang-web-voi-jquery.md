---
date: "2018-03-22T00:00:21Z"
template: "post"
directory: "JavaScript"
cover: "../images/smooth-scolling-trang-web-voi-jquery-completejavascript.com_.png"
keywords: "smooth scrolling trang web"
description: "Đối với các trang web dạng Landing Page, việc di chuyển giữa các mục trên trang là chắc chắn phải có. Tuy nhiên làm sao để hoạt động này diễn ra mượt và tự nhiên nhất. Bài viết này sẽ hướng dẫn bạn một cách đơn giản mà hiệu quả để có thể smooth scrolling trang web với jQuery."
slug: smooth-scrolling-trang-web-voi-jquery
title: "Smooth Scrolling trang web với jQuery"
tags:
  - Event
  - HTML
  - jQuery
---

Đối với các trang web dạng Landing Page, việc di chuyển giữa các mục trên trang là chắc chắn phải có. Tuy nhiên làm sao để hoạt động này diễn ra mượt và tự nhiên nhất. Bài viết này sẽ hướng dẫn bạn một cách đơn giản mà hiệu quả để có thể smooth scrolling trang web với jQuery.

## Demo

Dưới đây là một ví dụ demo. Bạn có thể nhấn thử vào các button **section 1**, **section 2** và **section 3** để thấy sự chuyển động mượt mà của nó.

https://codepen.io/completejavascript/pen/MVyPqr

## Cấu trúc trang web với HTML

Để có thể di chuyển đến các mục khác nhau trên trang web, mỗi mục bạn cần phải xác định một id cho nó. Trong ví dụ trên, mình có 3 mục với 3 id lần lượt là: **sec1**, **sec2**, **sec3**.

```html
<div id="sec1">This is section 1</div>
<div id="sec2">This is section 2</div>
<div id="sec3">This is section 3</div>
```

Tiếp theo là thanh menu (hay navigation), cho phép người dùng lựa chọn sẽ di chuyển tới đâu.

```html
<div id="nav">
  <a href="#sec1">Section1</a>
  <a href="#sec2">Section2</a>
  <a href="#sec3">Section3</a>
</div>
```

Ở đây, mình sử dụng thẻ **a** với thuộc tính **href** là id của mỗi phần tương ứng.

## Smooth Scrolling trang web với jQuery

Mặc định, khi người dùng nhấn vào thẻ a thì trang web sẽ nhảy đến vị trí có địa chỉ xác định trong thẻ href. Vì vậy, để có thể smooth scrolling trang web, bạn cần phải bắt sự kiện khi người dùng nhấn thẻ a vào và chặn lại [event](/xu-ly-mot-event-javascript-co-ban) mặc định.

```js
$("a[href*='#']:not([href='#])").click(function () {
  let target = $(this).attr("href");
  $("html,body")
    .stop()
    .animate(
      {
        scrollTop: $(target).offset().top,
      },
      1000
    );
  event.preventDefault();
});
```

Trong đó, đoạn code **\$("a[href*='#']:not([href='#])")** ý nghĩa là: lấy ra các thẻ a, với giá trị của thuộc tính href bắt đầu bằng **#** mà không phải là **#** (đôi khi người ta hay sử dụng **&lt;a href="#"&gt;&lt;/a&gt;** để biểu diễn việc link đến chính trang web hiện tại).

Để chặn việc thực hiện các hoạt động mặc định, bạn có thể sử dụng phương thức preventDefault:

```js
event.preventDefault();
```

Tiếp theo, sử dụng jQuery để xác định đích đến - chính là id của section đó, hay giá trị của thẻ href. Khi đã có target rồi, bây giờ bạn chỉ cần thêm animation vào thông qua phương thức [animate](http://api.jquery.com/animate/) như trên.

Một điều lạ là ở trên, mình có sử dụng phương thức **stop**. Tại sao vậy?

Vì đôi khi người dùng sẽ nhấn liên tục các button section1, section2, section3. Khi đó, trang web sẽ scroll lần lượt đến từng mục. Điều này là không cần thiết. Thực tế, bạn chỉ cần thực hiện lệnh cuối cùng và bỏ qua các câu lệnh phía trên. Đó là lí do mình sử dụng phương thức stop.

Như vậy, phần thêm animation trên có thể diễn giải thành lời là: chỉ thực hiện event cuối cùng trong chuỗi event liên tiếp; di chuyển (html, body) đến vị trí có top là giá trị top của target; hoạt động này diễn ra trong 1 giây.

## Kết luận

Trên đây là cách mà mình sử dụng để triển khai smooth scrolling trên trang web. Hy vọng nó hữu ích với bạn.

Xin chào và hẹn gặp lại trong [bài viết tiếp theo](/xmlhttprequest-voi-promise-javascript), thân ái!

## Tham khảo

- [Smooth Scrolling](https://css-tricks.com/snippets/jquery/smooth-scrolling/)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
