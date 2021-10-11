---
date: "2018-04-13T00:00:40Z"
template: "post"
cover: "../images/lap-trinh-javascript-voi-fcc-local-weather-completejavascript.com_.png"
keywords: "local weather"
description: "Tiếp tục series lập trình JavaScript với FCC, hôm nay mình sẽ giới thiệu một project thuộc chủ đề Intermediate Front-End là Show the Local Weather. Dưới đây là demo trên codepen. Ngoài ra, bạn có thể xem bản đầy đủ tại đây."
slug: lap-trinh-javascript-voi-fcc-local-weather
title: "Lập trình JavaScript với FCC - Local Weather"
categories:
  - JavaScript Tutorial
  - Lập trình JavaScript với FCC
tags:
  - API
  - Canvas
  - CORS
  - CSS
  - jQuery
---

Tiếp tục series[ lập trình JavaScript với FCC](/tag/lap-trinh-javascript-voi-fcc/), hôm nay mình sẽ giới thiệu một project là **Show the Local Weather**. Dưới đây là demo trên codepen. Ngoài ra, bạn có thể xem bản đầy đủ tại [đây](http://about.phamvanlam.com/fcc-local-weather/).

https://codepen.io/completejavascript/pen/JLeEao

## Yêu cầu bài toán Show the Local Weather

Ứng dụng này sẽ bao gồm 3 yêu cầu chính:

- Hiển thị thông tin thời tiết ở vị trí hiện tại của người dùng
- Có những hình ảnh khác nhau biểu thị trạng thái thời tiết (mưa, nắng, tuyết,...).
- Có thể chuyển đổi đơn vị nhiệt độ giữa độ F và độ C.

Về cách thiết kế UX/UI cho ứng dụng, bạn có thể xem tại [đây](/lap-trinh-javascript-voi-fcc-random-quote-machine/). Còn trong bài viết này, mình sẽ giới thiệu một số thủ thuật JavaScript cần thiết để giải quyết bài toán.

## Giải quyết bài toán

### Lấy vị trí người dùng

Đúng vậy, để lấy được thông tin thời tiết ở vị trí hiện tại của người dùng, bạn phải lấy được tọa độ (kinh độ, vĩ độ) của họ. Trong bài viết [Hai cách lấy vị trí người dùng với JavaScript](/hai-cach-lay-vi-tri-nguoi-dung/), mình đã hướng dẫn các bạn rồi đó. Còn cụ thể trong project này, mình sử dụng phương pháp thứ hai, đó là dùng **ipinfo.io API**.

### Lấy thông tin thời tiết tại một vị trí xác định

Sau khi đã có tọa độ của người dùng, mình sử dụng [Dark Sky API](https://darksky.net/dev/) để lấy thông tin thời tiết. Bạn chỉ cần vào trang chủ, đăng ký, đăng nhập rồi lấy ra **DarkSky API Key** và gửi request lên server để lấy thông tin thời tiết.

```js
let secretKey = "yourDarkSkyAPIKey";
let requestURL = `https://api.darksky.net/forecast/${secretKey}/${lat},${lon}`;

$.getJSON(requestURL, (info) => {
  // Cập nhật thông tin thời tiết dựa vào info
});
```

Kết quả trả về sẽ là [object](/javascript-object-last-but-not-least/) **info**, với đầy đủ những thông tin cần thiết như nhiệt độ, độ ẩm, tốc độ gió,... ứng với thời điểm hiện tại, 48 giờ tới và 7 ngày tới.

Về lý thuyết thì đến đây là xong, vì bạn đã có được thông tin thời tiết rồi. Nhưng thực tế thì khi bạn chỉ làm như trên bạn sẽ bị lỗi:

No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin 'https:\/\/s.codepen.io' is therefore not allowed access.

Đó là vì domain thực hiện request và domain của server là khác nhau. Để khắc phục tình trạng này, mình sử dụng [CORS Anywhere](https://github.com/Rob--W/cors-anywhere/), đóng vai trò như là một proxy cho phép thực hiện **request cross-origin**.

Theo mình hiểu, **cơ chế hoạt động** sẽ là: thay vì bạn gửi [request](/xmlhttprequest-tao-http-request-den-server-trong-javascript/) trực tiếp lên server Darksky từ ứng dụng web, bạn sẽ gửi request lên server CORS Anywhere. Server này sẽ thực hiện request giúp bạn. Sau khi có kết quả trả về từ Darksky thì CORS Anywhere sẽ trả lại cho bạn.

Mình mới chỉ hiểu đơn giản vậy thôi. Còn sâu xa hơn thì nhờ bạn nào có kinh nghiệm giải thích hộ nhé. Còn cách code thì đơn giản là bạn sẽ ghép thêm vào đầu request trên địa chỉ server của CORS Anywhere như sau:

```js
`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${secretKey}/${lat},${lon}`;
```

Đến đây, bạn đã có thể hiển thị được thông tin thời tiết ở vị trí hiện tại của người dùng rồi. Tiếp theo, bạn cần hiển thị hình ảnh tương ứng với thông tin thời tiết đó.

### Hiển thị icon ứng với thông tin thời tiết

Có nhiều thư viện để bạn có thể thực hiện việc này như sau:

**Animated Weather Icons** by [Josh Bader](https://codepen.io/joshbader) - cách này bạn chỉ cần dùng thuần CSS3.

https://codepen.io/joshbader/pen/EjXgqr

Hoặc **[weather-icon](/icon-mien-phi-dan-it#b%E1%BB%99-icon-v%E1%BB%81-th%E1%BB%9Di-ti%E1%BA%BFt)** với cách này sử dụng gần giống với **font-awesome**.

Còn với project này, mình sử dụng [Skycons](https://darkskyapp.github.io/skycons/) - vẽ icon dựa trên canvas.

#### Cách sử dụng Skycons

https://codepen.io/completejavascript/pen/EEOJrZ

Để sử dụng thư viện này, bạn cần khai báo script của Skycons vào file html:

```html
<script src="https://rawgit.com/darkskyapp/skycons/master/skycons.js"></script>
```

Tiếp theo, bạn khai báo một thẻ canvas (với mỗi icon). Mỗi thẻ canvas này cần có id, chiều rộng (width) và chiều dài (height).

```html
<canvas id="icon1" width="128" height="128"></canvas>
```

Trong file script, bạn khai báo đối tượng Skycons, với thuộc tính color là màu sắc của icon.

```js
let skycons = new Skycons({ color: "#3da4ab" });
```

Để add icon vào một canvas bạn có thể sử dụng một trong hai cách: id hoặc [DOM](/co-ban-ve-dom-javascript/).

```js
// Thêm icon theo id
skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);

// Them icon theo DOM
skycons.add(document.getElementById("icon2"), Skycons.RAIN);
```

Với thông tin thứ 2, chính là kiểu icon - ứng với thời tiết và có các loại như sau:

- Skycons.CLEAR_DAY
- Skycons.CLEAR_NIGHT
- Skycons.RAIN
- Skycons.SNOW
- Skycons.WIND
- Skycons.SLEET
- Skycons.FOG
- Skycons.CLOUDY
- Skycons.PARTLY_CLOUDY_DAY
- Skycons.PARTLY_CLOUDY_NIGHT

Đến đây là bạn đã có được icon rồi, tiếp theo là thêm hiệu ứng animation cho nó:

```js
// start animation!
skycons.play();
```

Ngoài ra, còn một số API khác như:

- skycons.pause() : dừng hiệu ứng animation
- skycons.remove("icon2"): bỏ đi icon2
- skycons.set("icon", Skycons.SNOW): thay đổi kiểu icon cho một canvas hiện tại.

### Chuyển đổi đơn vị giữa độ F và độ C

Đơn giản lắm, chỉ có 2 công thức như này:

```js
// Hàm convert từ độ F sang độ C
let F2C = (F) => (((F - 32) * 5) / 9).toFixed();

// Hàm convert từ độ C sang độ F
let C2F = (C) => ((C * 9) / 5 + 32).toFixed();
```

## Kết luận

Trên đây là cách giải quyết bài toán Show the Local Weather. Nếu có phần nào mình giải thích chưa rõ, thì bạn có thể đặt câu hỏi ở phần bình luận.

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/lap-trinh-javascript-voi-fcc-wikipedia-viewer/), thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
