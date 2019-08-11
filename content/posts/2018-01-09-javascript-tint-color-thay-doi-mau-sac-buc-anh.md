---
date: "2018-01-09T14:39:22Z"
template: "post"
cover: "../images/javascript-tint-color-thay-doi-mau-sac-cua-buc-anh-completejavascript-completejavascript.com_.png"
keywords: "javascript tint color"
description: "Xin chào các bạn. Hình như là đã lâu rồi tôi chưa viết bài nào về lập trình JavaScript. Nguyên nhân là vừa rồi tôi cũng không có nhiều thời gian để học và tìm hiểu về nó. Từ hôm nay, tôi sẽ bắt đầu lại với chủ đề này, đó là JavaScript nâng cao. Bài viết đầu tiên là JavaScript Tint Color - thay đổi màu sắc của bức ảnh."
slug: javascript-tint-color-thay-doi-mau-sac-buc-anh
title: "JavaScript Tint Color - thay đổi màu sắc bức ảnh"
categories:
  - Thủ thuật JavaScript
tags:
  - Canvas
  - CSS
  - DOM
  - RegExp
---

Xin chào bạn. Hình như là đã lâu rồi mình chưa viết bài nào về lập trình JavaScript. Nguyên nhân là vừa rồi mình cũng không có nhiều thời gian để học và tìm hiểu về nó. Từ hôm nay, mình sẽ bắt đầu lại với chủ đề này, đó là JavaScript nâng cao. Bài viết đầu tiên là JavaScript Tint Color - thay đổi màu sắc của bức ảnh.

## JavaScript Tint Color là gì?

JavaScript Tint Color là việc sử dụng [JavaScript](/gioi-thieu-tong-quan-ve-ngon-ngu-lap-trinh-javascript/) ([Canvas](https://www.tutorialspoint.com/html5/html5_canvas.htm)) để thay đổi màu sắc của một bức ảnh. Bạn có thể thấy ở phía trên. Cùng là ảnh một ngôi sao nhưng màu sắc của chúng là khác nhau. Bình thường, bạn cần phải tạo ra những tệp tin ảnh tương ứng với mỗi màu. Nhưng khi áp dụng JavaScript Tint Color, chúng ta chỉ cần một bức ảnh ban đầu, sau đó có thể tạo ra vô số bức ảnh tương tự với màu sắc khác nhau.

## Những lợi ích của JavaScript Tint Color

Lúc đầu, mình định viết về ưu, nhược điểm của JavaScript Tint Color. Tuy nhiên, vì hiện tại mình chưa biết cách nào khác để so sánh, nên bài viết này sẽ bàn về lợi ích của JavaScript Tint Color:

- Tiết kiệm thời gian: vì bạn chỉ cần thiết kế ảnh 1 lần, không phải mỗi màu sắc cần thiết kế lại.
- Tiết kiệm dung lượng của host: nếu như với mỗi màu sắc bạn lại upload lên host thì không lâu sau dung lượng của bạn sẽ hết.

## Cách sử dụng JavaScript Tint Color

Với mục đích tái sử dụng, mình đã viết thành một thư viện như sau:

### TintColor.js

```js
class TintColor {
  constructor(_srcImage, _tintColor) {
    this._srcImage = _srcImage;
    this._tintColorArray = this._getRGBAArray(_tintColor);
  }
  setSourceImage(_srcImage) {
    this._srcImage = _srcImage;
    return this;
  }
  setTintColorArray(_tintColor) {
    this._tintColorArray = this._getRGBAArray(_tintColor);
    return this;
  }
  run() {
    return new Promise((resolve, reject) => {
      let canvas = document.createElement('canvas');
      let context = canvas.getContext('2d');
      let image = new Image();
      image.crossOrigin = "Anonymous";
      image.onload = () => {
        canvas.width  = image.width;
        canvas.height = image.height;

        context.drawImage(image, 0, 0, canvas.width, canvas.height);

        let imgData = context.getImageData(0, 0, canvas.width, canvas.height);
        let data = imgData.data;

        for (let i = 0; i < data.length; i += 4) {
          // Change color of pixel which is different from transparent
          if (data[i + 0] || data[i + 1] || data[i + 2] || data[i + 3]) {
            data[i + 0] = this._tintColorArray[0];
            data[i + 1] = this._tintColorArray[1];
            data[i + 2] = this._tintColorArray[2];
            data[i + 3] = this._tintColorArray[3];
          }
        }
        context.putImageData(imgData, 0, 0);
        resolve({url: canvas.toDataURL(), width: image.width, height: image.height});
      };
      image.onerror = error => reject(this._srcImage, error);
      image.src = this._srcImage;
    });
  }
  _getRGBAArray(color) {
    // Check input as rgba/rgb color
    let m = 
      /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d+(?:\.\d+)?)\s*)?\)$/
      .exec(color);

    if(m) {
      if(m[4]) return [m[1], m[2], m[3], m[4] * 255];
      return [m[1], m[2], m[3], 255];
    }

    // Check input as hex 6-digit color
    m = /^#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})$/.exec(color);
    if(m) {
      return [parseInt(m[1], 16), parseInt(m[2], 16) , parseInt(m[3], 16), 255];
    }
  }
}
```

#### Hàm khởi tạo

**TintColor(srcImage, tintColor)**

Trong đó:

- **srcImage**: ([string](/values-types-va-operators-trong-javascript-phan-2/)) là đường dẫn đến bức ảnh, có thể là đường dẫn tương đối đến một vị trí trên server hoặc đường dẫn tuyệt đối đến một host (cdn) lưu trữ ảnh.

- **tintColor**: (string) là mã màu mới dạng HEX hoặc RGB hay RGBA. Ví dụ: *#ff00ff* hoặc _rgb(255, 0, 255)_ hay _rgba(255, 0, 255, 0.5)_.

#### Các hàm setter

- **setSourceImage(srcImage)**
- **setTintColorArray(tintColor)**

Mục đích của những hàm này là để set lại các thông số url của ảnh, mã màu mới.

### Hàm run()

Hàm này là hàm quan trọng nhất. Nó sẽ load ảnh lên, sau đó thay thế tất cả các điểm ảnh khác transparent thành mã màu mới. Kết quả trả về sẽ là **dataURL** của bức ảnh mới và kích thước (width, height) của bức ảnh.

### Cách sử dụng TintColor.js

https://codepen.io/completejavascript/pen/vpWyjG

Trước tiên mình sẽ hiển thị ảnh gốc.

```js
let $ = document.querySelector.bind(document);
setImage($("#originImg"), srcImg, 150, 150);

function setImage(divElement, srcURL, width, height) {
  divElement.style.width = width + "px";
  divElement.style.height = height + "px";
  divElement.style.backgroundImage = "url('" + srcURL + "')";
  divElement.style.backgroundSize = "" + width + "px " + height + "px";
}
```

Trong đó, hàm setImage() áp dụng [DOM](/co-ban-ve-dom-javascript/) để set lại giá trị width, height, url cho thẻ div hiển thị bức ảnh.

Tiếp theo, mình sẽ sử dụng **TintColor.js** để thay đổi màu sắc của bức ảnh. Ở đây, mình thử với cả 3 loại mã màu khác nhau là: HEX, RGB và RGBA.

```js
new TintColor(srcImg, "#ff0000").run()
  .then(result => setImage($("#newImg1"), result.url, 150, 150))
  .catch(err => console.log(err));

  new TintColor(srcImg, "rgba(255, 0, 255, 0.8)").run()
  .then(result => setImage($("#newImg2"), result.url, 150, 150))
  .catch(err => console.log(err));

  new TintColor(srcImg, "rgb(127, 127, 255)").run()
  .then(result => setImage($("#newImg3"), result.url, 150, 150))
  .catch(err => console.log(err));
```

Bạn có thể thấy là cách sử dụng TintColor.js rất là đơn giản phải không ạ!

Tuy nhiên, mình rất mong muốn nhận được phản hồi của bạn đọc để có thể cải tiến và hoàn thiện thư viện này. Vì vậy, mình sẽ vui khi nhận được phản hồi của bạn.

Xin chào và hẹn gặp lại bạn ở [bài viết tiếp theo](/javascript-web-worker-javascript-o-background/), thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
