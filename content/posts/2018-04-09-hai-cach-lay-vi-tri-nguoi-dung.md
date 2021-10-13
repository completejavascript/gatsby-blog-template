---
date: "2018-04-09T00:00:40Z"
template: "post"
cover: "../images/hai-cach-lay-vi-tri-nguoi-dung-trong-javascript-completejavascript.com_.png"
keywords: "vị trí người dùng"
description: "Trong nhiều trường hợp, việc xác định vị trí (kinh độ, vĩ độ) là vô cùng cần thiết, ví dụ như: chỉ đường, hiển thị thông tin thời tiết,... Bài viết này mình sẽ hướng dẫn các bạn hai cách lấy vị trí người dùng vô cùng đơn giản. Đó là sử dụng Geolocation API và ipinfo.io API."
slug: hai-cach-lay-vi-tri-nguoi-dung
title: "Hai cách lấy vị trí người dùng với JavaScript"
categories:
  - Thủ thuật JavaScript
tags:
  - AJAX
  - API
  - jQuery
  - JSON
---

Trong nhiều trường hợp, việc xác định vị trí (kinh độ, vĩ độ) là vô cùng cần thiết, ví dụ như: chỉ đường, hiển thị thông tin thời tiết,... Bài viết này mình sẽ hướng dẫn các bạn hai cách lấy vị trí người dùng vô cùng đơn giản. Đó là sử dụng Geolocation API và [ipinfo.io](https://ipinfo.io/) API.

## Lấy vị trí người dùng sử dụng Geolocation API

Geolocation API được hỗ trợ bởi hầu hết các trình duyệt, cho phép người dùng cung cấp vị trí của họ cho một ứng dụng web.

Một số đặc điểm quan trọng của Geolocation API:

- Người dùng sẽ được hỏi để cung cấp vị trí hay không. Nếu họ đồng ý thì API này mới được phép lấy vị trí người dùng.
- Chỉ hỗ trợ **https.**

Với những đặc điểm trên, bạn có thể thấy rằng Geolocation API sẽ đảm bảo được tính riêng tư cho người dùng. Tuy nhiên, do chỉ hỗ trợ https nên bạn sẽ không thể test được API này nếu sử dụng trên localhost (**http**). Nhưng không sao, bạn vẫn có thể tạo một Pen trên [codepen.io](https://codepen.io/) để test tính năng này.

Đây là ví dụ mà mình đã làm:

https://codepen.io/completejavascript/pen/PRxxNz

### Cách sử dụng Geolocation API

Trước tiên, bạn cần kiểm tra xem trình duyệt có hỗ trợ Geolocation hay không:

```js
let geolocation = navigator.geolocation;
if (geolocation) {
  // Có hỗ trợ geolocation
} else {
  // Không hỗ trợ geolocation
}
```

Sau khi đã chắc chắn rằng trình duyệt có hỗ trợ Geolocation, bạn có thể gọi phương thức [getCurrentPosition](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/getCurrentPosition) để lấy vị trí người dùng.

```js
let options = {
  enableHighAccuracy: true,
  timeout: 5000,
  maximumAge: 0,
};
geolocation.getCurrentPosition(onGeoSuccess, onGeoError, options);
```

[Hàm](/tim-hieu-function-javascript) này có 3 tham số đầu vào:

- **onGeoSuccess**: hàm callback được gọi khi việc lấy vị trí thành công
- **onGeoError**: hàm callback được gọi khi việc lấy vị trí bị lỗi
- **options**: là một [object](/javascript-object-last-but-not-least), chứa một số cài đặt kèm theo, như độ chính xác, timeout, thời gian position được cached (giá trị này = 0 nghĩa là không bao giờ cache position). Bạn có thể đọc thêm về các option trên tại [đây](https://developer.mozilla.org/en-US/docs/Web/API/PositionOptions).

#### Xử lý khi lấy vị trí người dùng thành công

```js
function onGeoSuccess(position) {
  $("#lat").innerHTML = position.coords.latitude;
  $("#lon").innerHTML = position.coords.longitude;
}
```

Có 2 thông số quan trọng trong kết quả **position** trả về là vĩ độ (**position.coords.latitude**) và kinh độ (**position.coords.longitude**). Như vậy là bạn đã có được vị trí người dùng rồi, phải không?

#### Xử lý lỗi

```js
function onGeoError(error) {
  let detailError;

  if (error.code === error.PERMISSION_DENIED) {
    detailError = "User denied the request for Geolocation.";
  } else if (error.code === error.POSITION_UNAVAILABLE) {
    detailError = "Location information is unavailable.";
  } else if (error.code === error.TIMEOUT) {
    detailError = "The request to get user location timed out.";
  } else if (error.code === error.UNKNOWN_ERROR) {
    detailError = "An unknown error occurred.";
  }

  $("#error").innerHTML = `Error: ${detailError}`;
}
```

Có nhiều trường hợp có thể xảy ra lỗi khi lấy vị trí người dùng, nhưng quan trọng nhất là 2 lỗi sau:

- **PERMISSION_DENIED**: người dùng không cho phép lấy vị trí khi được hỏi.
- **TIMEOUT**: quá thời gian cho phép mà chưa có phản hồi, thường do tốc độ mạng chậm.

Trên đây là cách sử dụng cơ bản của [Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/Using_geolocation), ngoài ra bạn có thể đọc thêm về [watch_position](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation/watchPosition) - phương thức này dùng để theo dõi sự thay đổi vị trí người dùng.

## Lấy vị trí người dùng sử dụng ipinfo.io API

Ý tưởng của phương pháp này là: khi người dùng sử dụng ứng dụng web, ứng dụng sẽ gửi một request lên server ipinfo.io. Server sẽ sử dụng request này để lấy ra thông tin địa chỉ IP của nơi cung cấp dịch vụ mạng, từ đó, suy ra vị trí của người dùng.

Với cách này bạn luôn có thể lấy được thông tin vị trí người dùng. Ngoài ra, cách này còn cho phép bạn test trên localhost. Nếu không tin thì bạn có thể lấy code của mình về chạy thử.

https://codepen.io/completejavascript/pen/Ovaajp

### Cách sử dụng ipinfo.io API

Bạn chỉ cần gửi một [request](/xmlhttprequest-tao-http-request-den-server-trong-javascript) dạng GET với kiểu dữ liệu là [JSON](/tim-hieu-ve-json-trong-javascript). Trong ví dụ trên, mình sử dụng jQuery, nên chỉ cần sử dụng phương thức [\$.getJSON](http://api.jquery.com/jquery.getjson/) là được.

```js
$.getJSON("https://ipinfo.io/", onLocationGot);
```

Kết quả trả về sẽ là một object, qua đó bạn có thể lấy ra thông tin kinh độ và vĩ độ như sau:

```js
function onLocationGot(info) {
  let position = info.loc.split(",");
  $("#lat").text(position[0]);
  $("#lon").text(position[1]);
}
```

## Kết luận

Như vậy là mình đã giới thiệu xong với các bạn hai cách để lấy vị trí người dùng thông qua Geolocation API và ipinfo.io API. Tóm tắt lại đặc điểm của 2 cách như sau:

- Geolocation API:
  - Hỏi người dùng xem có cho phép lấy vị trí hay không.
  - Chỉ hỗ trợ https.
- ipinfo.io API
  - Luôn luôn có thể lấy được vị trí người dùng
  - Có hỗ trợ http, có thể test trên localhost.

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/21-thu-thuat-javascript-huu-ich), thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
