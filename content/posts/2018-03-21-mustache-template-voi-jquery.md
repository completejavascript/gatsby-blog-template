---
date: "2018-03-21T00:00:21Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: mustache-template-voi-jquery
title: "Mustache Template với jQuery"
categories:
  - Thư viện và Framework JavaScript
tags:
  - jQuery
  - Mustache.js
  - Template
---

Đến hẹn lại lên, hôm nay mình sẽ chia sẻ với các bạn cách sử dụng Mustache Template với jQuery trong [lập trình JavaScript](/category/javascript/javascript-co-ban/). Việc sử dụng Mustache.js sẽ giúp bạn hạn chế việc xử lý logic trong JavaScript. Qua đó, giúp code bạn trở nên ngắn gọn và sáng sủa hơn.

## Mustache Template trong HTML

Mình đã chuẩn bị sẵn một ví dụ cho các bạn tiện tham khảo:

[codepen_embed height="430" theme_id="0" slug_hash="rderNq" default_tab="js,result" user="completejavascript"]See the Pen <a href='https://codepen.io/completejavascript/pen/rderNq/'>Mustache Template with JQuery Example</a> by Lam Pham (<a href='https://codepen.io/completejavascript'>@completejavascript</a>) on <a href='https://codepen.io'>CodePen</a>.[/codepen_embed]

Việc đầu tiên cần làm là include mustache.js trong file HTML:

```
<script src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"></script>
```

Tiếp đó là khai báo Mustache Template sử dụng thẻ [script](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/script):

```
<script id="my-template" type="x-tmpl-mustache">
      <div>
        <span class="name">{{name}}</span>
      </div>
      <div>
        <span class="comment">{{comment}}</span>
      </div>
    </script>
```

Thẻ script này mình set **id="my-template"** để tiện sử dụng đến trong JavaScript, và **type="x-tmpl-mustache"** - bắt buộc để thông báo rằng đây là Mustache Template, chứ không phải **script** để thực thi.

Bên trong thẻ là đoạn HTML bạn dùng làm template. Với đặc điểm quan trọng là mỗi tham số được đặt trong cặp dấu **{{**variable**}}**. Qua đó, Mustache sẽ biết và thay nó với đối số tương ứng khi bạn truyền vào.

## Sử dụng Mustache Template với jQuery

Bạn có thể sử dụng Mustache.js mà không cần tới jQuery. Tuy nhiên, việc sử dụng thư viện jQuery sẽ giúp code sạch sẽ hơn.

Để sử dụng template, trước tiên, bạn phải trích xuất nó ra từ file HTML:

```
let tmpl = $('#my-template').html();
```

Đến đây bạn đã có template rồi, tiếp theo sử dụng phương thức **parse** của Mustache để parse template trên. Việc sử dụng phương thức này là không bắt buộc, nhưng nó sẽ giúp tăng tốc độ **render** sau này.

```
Mustache.parse(tmpl);
```

Tương tự như [bài viết trước](/chuyen-html-template-sang-dom-node/), bài này mình cũng mô phỏng lại việc render các bình luận cho một bài viết. Dữ liệu được lưu trong mảng các [object](/javascript-object-last-but-not-least/) với 2 thuộc tính là name và comment.

```
let data = [
      {name: "John", comment: "That is great"},
      {name: "Alex", comment: "It's helpful"},
      {name: "David", comment: "Thanks a lot"}
    ];
```

Công việc cuối cùng là render Mustache Template với jQuery và dữ liệu trên khi người dùng nhấn vào button **Add**:

```
$("#btn-add").click(() => {
      data.forEach((item) => {
        let rendered = Mustache.render(tmpl, item);
        $("#container").append(rendered);
      });
    });
```

Trong phương thức render, thành phần đầu tiên là Mustache Template đã được lấy ra từ trước; thành phần thứ hai là mỗi phần tử của [mảng](/javascript-array-co-ban/) sau khi sử dụng phương thức [forEach](/javascript-foreach-la-cai-quai-gi/).

Kết quả thu được là [DOM,](/co-ban-ve-dom-javascript/) có cấu trúc như template với tham số đã được thay thế bằng dữ liệu data trên. Bây giờ, bạn chỉ cần sử dụng phương thức [append](http://api.jquery.com/append/) để đưa nó vào bên trong của thẻ div - với **id="container"**.

Ngoài ra, để bỏ đi thành phần HTML mới thêm vào, bạn có thể đơn giản sử dụng phương thức [empty](https://api.jquery.com/empty/) để xóa nó khỏi HTML.

```
$("#btn-rm").click(() => {
      $("#container").empty();
    });
```

## Kết luận

Trên đây là cách mình sử dụng Mustache Template với jQuery. Rõ ràng, việc sử dụng kết hợp 2 thư viện JavaScript này giúp code trở nên ngắn gọn và khá rõ ràng. Hy vọng với những hướng dẫn đơn giản trên, bạn có thể biết cách sử dụng Mustache.js.

Xin chào và hẹn gặp lại ở [bài viết tiếp theo](/smooth-scrolling-trang-web-voi-jquery/), thân ái!

---

★ Theo dõi [Lam Pham](/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
