---
date: "2018-03-26T00:00:37Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: xmlhttprequest-voi-promise-javascript
title: "XMLHttpRequest với Promise JavaScript"
categories:
  - Thủ thuật JavaScript
tags:
  - AJAX
  - ES6
  - Promise
---

Nếu các bạn đã đọc qua bài viết của mình về [XMLHttpRequest](/xmlhttprequest-tao-http-request-den-server-trong-javascript/), thì sẽ biết rằng có 2 cách sử dụng đối tượng này là: **đồng bộ** và **bất đồng bộ**. Với xử lý đồng bộ, bạn quản lý chương trình dễ hơn, nhưng thường nó sẽ chạy chậm. Trong khi xử lý bất đồng bộ, chương trình chạy nhanh hơn nhưng code sẽ khó khăn hơn. Vì vậy, bài viết này sẽ hướng dẫn các bạn kết hợp XMLHttpRequest với **Promise JavaScript** trong xử lý bất đồng bộ.

## Promise JavaScript là gì?

Promise JavaScript là một [đối tượng](/javascript-object-last-but-not-least/) cho phép bạn thực hiện những tác vụ bất đồng bộ. Sau đây là cách sử dụng cơ bản của Promise (sử dụng ES6):

```
let p = new Promise((resolve, reject) => {
      // Do an async task and then...
      if(/* good condition */)
        resolve(data);
      else
        reject(error);
    });

    p.then(
      data => { /* do something with the result */ },
      error => { /* error */ }
    })
    .catch((event) => {
       /* do something with other errors here */
    });
```

Khi tạo mới một đối tượng Promise, tham số truyền vào sẽ là 2 hàm số **resolve** và **reject** - tương tự như các hàm **callback**. Đúng như tên gọi của chúng, resolve dùng để xử lý khi tác vụ bất đồng bộ thành công. Ngược lại, reject dùng để xử lý khi tác vụ đó thất bại.

Tuy nhiên, resolve và reject ở đây chỉ là tên gọi. Thực tế, chúng sẽ được triển khai ở phần **.then**. Trong đó, .then cũng có 2 tham số tương ứng là phần triển khai của 2 hàm số resolve và reject phía trên.

Ngoài ra, bạn cũng có thể bỏ qua phần reject ở đây mà xử lý sau ở trong phần **.catch** cũng được.

## XMLHttpRequest với Promise JavaScript

Phần này mình đã làm một ví dụ sử dụng XMLHttpRequest để thực hiện phương thức **GET** với API cung cấp bởi [https://fcc-weather-api.glitch.me](https://fcc-weather-api.glitch.me),để lấy thông tin thời tiết tại một điểm có kinh độ và vĩ độ xác định.

[codepen_embed height="539" theme_id="0" slug_hash="vRxWdQ" default_tab="js,result" user="completejavascript"]See the Pen <a href='https://codepen.io/completejavascript/pen/vRxWdQ/'>Test XMLHttpRequest Wrapper by Promise</a> by Lam Pham (<a href='https://codepen.io/completejavascript'>@completejavascript</a>) on <a href='https://codepen.io'>CodePen</a>.[/codepen_embed]

Trong ví dụ trên, bạn có thể nhập tọa độ kinh tuyến và vĩ tuyến, sau đó, nhấn **request** để lấy thông tin thời tiết tại tọa độ đó. Khi request thành công, kết quả sẽ hiển thị lên màn hình.

Ngoài ra, bạn cũng có thể nhấn **Ctrl Shift I** hoặc **F12** (tùy trình duyệt) để mở **console** của trình duyệt. Mình có ghi log ra đó.

### Khởi tạo đối tượng XMLHttpRequest support IE

Đối với hầu hết các trình duyệt, bạn có thể sử dụng trực tiếp đối tượng XMLHttpRequest của window. Nhưng đối với trình duyệt IE, bạn cần phải sử dụng **ActiveXObject("Microsoft.XMLHTTP")** thay thế. Do đó, bạn cần định nghĩa lại XMLHttpRequest.

```
let XMLHttpRequest = window.XMLHttpRequest || ActiveXObject("Microsoft.XMLHTTP");
```

Đoạn code trên hiểu là: Nếu như trình duyệt có hỗ trợ XMLHttpRequest thì window.XMLHttpRequest sẽ khác **undefined**. Khi đó, ta có XMLHttpRequest = window.XMLHttpRequest. Ngược lại thì window.XMLHttpRequest sẽ là undefined nên XMLHttpRequest = ActiveXObject("Microsoft.XMLHTTP").

Đây là cách viết ngắn gọn nhấn. Nó tương đương với cách viết khác dài hơn là:

```
let XMLHttpRequest = window.XMLHttpRequest ? window.XMLHttpRequest : ActiveXObject("Microsoft.XMLHTTP");
```

Hoặc:

```
let XMLHttpRequest = window.XMLHttpRequest;
    if(XMLHttpRequest == undefined) XMLHttpRequest = ActiveXObject("Microsoft.XMLHTTP");
```

Tóm lại, để tạo mới đối tượng XMLHttpRequest, bạn sẽ làm như sau:

```
let XMLHttpRequest = window.XMLHttpRequest || ActiveXObject("Microsoft.XMLHTTP");
    let xmlHttpRequest = new XMLHttpRequest();
```

### Triển khai XMLHttpRequest với Promise JavaScript

Trong khuôn khổ bài viết này, mình sẽ viết lại phương thức **GET**. Bạn có thể áp dụng một cách tương tự để viết các hàm số cho phương thức **POST, PUT**,...

```
function get(requestURL) {
      return new Promise(function(resolve, reject){
        let XMLHttpRequest = window.XMLHttpRequest || ActiveXObject("Microsoft.XMLHTTP");
        let req = new XMLHttpRequest();
        req.open("GET", requestURL, true);
        req.addEventListener('load', function() {
          if(req.status == 200) resolve(req.responseText);
          else if(req.status == 404) throw new Error(xmlPath, "404");
        });
        req.addEventListener('error', function(event) {
          reject(event);
        });
        req.send(null);
      });
    }
```

Hàm số trên nhận tham số đầu vào là địa chỉ URL dùng để request lên server và kết quả trả về là một Promise. Tác vụ bất đồng bộ ở đây chính là XMLHttpRequest thực hiện GET đối với địa chỉ URL trên.

Khi request thành công, kết quả trả về với **status = 200**, thì truyền **response** vào hàm resolve. Ngược lại, request thất bại thì sẽ truyền giá trị lỗi cho hàm reject.

### Sử dụng XMLHttpRequest với Promise

Với hàm số trên, bạn có thể sử dụng một cách đơn giản:

```
let request = 'https://fcc-weather-api.glitch.me/api/current?lat=21&lon=105';
    get(request)
    .then(function(data) {
      console.log(data);
      $("#result").textContent = data.toString();
    })
    .catch(function(error) {
      console.log(error);
    });
```

Khi thành công, kết quả data sẽ được ghi ra console và đổi giá trị **textContent** của **#result** với data vừa nhận được trong phần **.then**. Ngược lại, khi có lỗi thì in ra kết quả error trên console trong phần **.catch**.

## Kết luận

Trên đây là cách mà mình kết hợp XMLHttpRequest với Promise JavaScript. Bạn cũng hoàn toàn có thể sử dụng cách trên để áp dụng cho bất kì phương thức bất đồng bộ nào khác.

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/js-pattern-constructor-pattern/), thân ái!

## Tham khảo

- [JavaScript Promise API](https://davidwalsh.name/promises)

- [Promise MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
