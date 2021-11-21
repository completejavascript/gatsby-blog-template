---
date: "2017-04-29T20:00:00Z"
update: "2021-10-31T21:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/use-strict-trong-js.png"
keywords: "use strict trong js"
description: "Use strict trong js giúp kích hoạt strict mode trong JavaScript. Khi đó, code JavaScript sẽ chặt chẽ và rõ ràng hơn vì phải tuân theo quy tắc hiện đại của JavaScript."
slug: use-strict-trong-js
title: "Use strict trong JS"
series: "JavaScript: JavaScript cơ bản"
tags:
  - Strict Mode
---

JavaScript tồn tại đến nay là hơn 20 năm. Vậy mà code JavaScript từ lâu giờ vẫn chạy tốt. Bạn có bao giờ thắc mắc lý do tại sao không?

Đó là vì những tính năng cũ của JS vẫn được hỗ trợ mặc cho rất nhiều tính năng mới được tạo ra mỗi năm.

> Điều này là tốt, vì nó giúp cho các trang web cũ vẫn chạy tốt trên những trình duyệt mới. Nhưng ngược lại, nó làm cho nhiều lập trình viên lười trong việc cập nhật các tính năng mới của JavaScript.

Nghĩa là những thay đổi của JavaScript mặc định sẽ không được kích hoạt. Để kích hoạt những tính năng mới này, bạn cần chủ động khai báo `"use strict"`.

Vậy use strict là gì? Sau đây, mình sẽ cùng tìm hiểu về use strict trong JS.

## Use strict trong JS

Chỉ dẫn này giống như một chuỗi ký tự: `"use strict"` hoặc `'use strict'`. Khi bạn đặt `"use strict"` ở đầu file JavaScript, toàn bộ code JavaScript sau đó phải tuân theo quy tắc hiện đại của JavaScript.

Ví dụ:

```js
"use strict";

// Toàn bộ code sau đây phải tuân theo quy tắc hiện đại của JS
```

Ngoài đặt ở đầu của file JS, `"use strict"` còn có thể đặt ở đầu mỗi hàm. Khi đó, toàn bộ code trong hàm đó phải tuân theo strict mode.

> Hàm là một cách để tập hợp các câu lệnh nhằm thực hiện một nhiệm vụ nào đó. Hàm sẽ được giới thiệu ở bài [cơ bản về hàm - functions](/ham-la-gi-ham-trong-javascript/).

## Một số câu hỏi về use strict trong JS

**Nếu không đặt `"use strict"` ở đầu file JS (hoặc đầu hàm) thì có được không?**

Câu trả lời là **KHÔNG**.

Chỉ dẫn `"use strict"` luôn phải đặt ở đầu. Ngược lại, nó sẽ không có tác dụng.

Ví dụ sau đây sẽ không kích hoạt strict mode trong JavaScript:

```
console.log("Hello world!");

"use strict"

// Toàn bộ code sau đây sẽ không bị ảnh hưởng bởi use strict trong JS.
// Vì trước "use strict" có một câu lệnh console.log().
```

> 📝 **Chú ý**: bạn có thể viết chú thích code trước `"use strict"` thì strict mode vẫn sẽ được kích hoạt.
>
> Vì thực chất là [JavaScript engine](/javascript-la-gi/) bỏ qua không xử lý phần chú thích code.
>
> Nên trường hợp này, ta vẫn hiểu là `"use strict"` được đặt ở đầu.

**Có thể hủy strict mode được không?**

Câu trả lời cũng là **KHÔNG**.

Nếu bạn đã khai báo `"use strict"` ở đầu file JS rồi thì strict mode đã được kích hoạt. Sau đó, bạn không thể hủy bỏ chế độ này.

**Có nên sử dụng `"use strict"` không?**

Câu trả lời là **CÓ**.

> Dĩ nhiên, đây chỉ là quan điểm cá nhân của mình. Bạn có thể không sử dụng strict mode trong JavaScript cũng không sao.
>
> Nhưng chắc chắn, khi sử dụng `"use strict"` bạn sẽ tránh được rất nhiều lỗi không đoán trước được. Code JavaScript sẽ chặt chẽ và rõ ràng hơn.
>
> Bạn có thể tham khảo bài viết [một số lỗi khi sử dụng Strict mode JavaScript](/mot-so-loi-khi-su-dung-strict-mode-javascript/) sau khi đã học cơ bản về JavaScript.

## Use strict với console

Trước tiên, bạn cần biết rằng console ở [Dev Tools](/dev-tools-la-gi/) cũng không mặc định sử dụng strict mode. Vì vậy, bạn cần phải đặt `"use strict"` ở đầu trước khi gõ bất kỳ lệnh gì.

Nhưng nhớ rằng, `"use strict"` chỉ có tác dụng trong một lần chạy. Nghĩa là sau khi bạn nhấn **Enter** thì lần khai báo `"use strict"` trước đó không còn tác dụng.

Vì vậy, hãy nhấn tổ hợp **Shift Enter** để xuống dòng sau khi khai báo `"use strict"`. Sau đó bạn có thể viết code ở strict mode như bình thường.

Quy trình sử dụng `"use strict"` ở console của Dev Tools như sau:

```
"use strict"; <Nhấn tổ hợp Shift Enter để xuống dòng>

// Viết code của bạn ở đây

<Nhấn Enter để chạy>
```

## Tổng kết

Sau đây là một số kiến thức cần nhớ về use strict trong JS:

- `"use strict"` giúp kích hoạt tính năng hiện đại của JavaScript. Khi kích hoạt strict mode JS, toàn bộ code sau đó phải tuân theo quy tắc hiện đại của JavaScript.
- `"use strict"` phải được đặt ở đầu file JS hoặc đầu hàm, không đặt bất kỳ câu lệnh nào phía trước, trừ chú thích code. Ngược lại, `"use strict"` sẽ không có tác dụng.
- Một khi đã khai báo strict mode thì không có cách nào hủy chế độ này sau đó.
- Bạn nên sử dụng `"use strict"` để code theo quy tắc nghiêm ngặt hơn, giúp tránh nhiều lỗi không đoán trước được.
