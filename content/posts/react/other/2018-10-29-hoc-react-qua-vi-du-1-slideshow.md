---
date: "2018-10-29T22:30:30Z"
update: "2018-10-29T22:30:30Z"
template: "post"
directory: "React"
cover: "../images/hoc-react-qua-vi-du-1-slideshow-completejavascript.com_.png"
keywords: "Slideshow"
description: "Xin chào bạn đến với Học React qua ví dụ #1. Bài viết này mình sẽ thực hành React thông qua cách tạo Slideshow để trình diễn ảnh."
slug: hoc-react-qua-vi-du-1-slideshow
title: "Học React qua ví dụ #1: Slideshow"
tags:
  - Create-react-app
  - Event
  - React Component
---

Xin chào bạn đến với Học React qua ví dụ #1. Bài viết này mình sẽ thực hành React thông qua cách tạo Slideshow để trình diễn ảnh.

**Vậy Slideshow là gì?**

Mời bạn theo dõi ví dụ Demo sau đây sẽ rõ:

<a href="https://about.phamvanlam.com/learn-react-by-example/#/slideshow/" class="btn btn-primary margin-bottom">
  Xem demo Slideshow
</a>

Trong ví dụ trên, mình tạo ra hai Slideshow. Cái bên trên điều khiển thủ công thông qua việc click chuột. Còn cái bên dưới được điều khiển tự động, với mỗi ảnh cách nhau 3 giây (dĩ nhiên bạn vẫn có thể điều khiển thủ công được).

Nếu không có vấn đề gì thì mình bắt đầu học React qua ví dụ #1 thôi nào!

## Khởi tạo Project

Có nhiều cách để thực hiện demo Slideshow. Tuy nhiên, mình khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app) để thực hành học React qua ví dụ #1 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------slideshow/
    --------slideshow.css
    --------slideshow.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: để chứa code của các Component. Bài này mình thực hành về Slideshow nên mình tạo thêm thư mục **slideshow** bên trong với 2 file **slideshow.js** và **slideshow.css** để định nghĩa cho component Slideshow (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).
- Thư mục **images**: để chứa tất cả những [ảnh](/web-tai-anh-mien-phi-chat-luong-cao) mình sử dụng cho Demo.
- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component Slideshow ở trên.
- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Slideshow Component

### Nội dung file slideshow.js

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./slideshow.css";

export default class Slideshow extends React.Component {
  constructor(props) {
    super(props);

    /*
     * State slideIndex dùng để xác định xem slide nào đang được active.
     * Các ảnh sẽ được xếp chồng lên nhau, cái nào active thì hiển thị,
     * Cái nào không active thì ẩn đi.
     */
    this.state = {
      slideIndex: 0,
    };

    /*
     * Khi sử dụng, mình sẽ truyền thuộc tính ratio, giả sử là "3:2"
     * Như vậy, tỉ lệ width/height là this.ratioWH = 3 / 2
     * Mình sẽ điều chỉnh các ảnh sao cho về cùng 1 kích thước.
     */
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.backward = this.backward.bind(this);
    this.forward = this.forward.bind(this);
    this.setSlideIndex = this.setSlideIndex.bind(this);
    this.getNewSlideIndex = this.getNewSlideIndex.bind(this);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.runAutomatic = this.runAutomatic.bind(this);
  }

  /*
   * Tính chỉ số SlideIndex mới, với step là bước nhảy: +1 hoặc -1
   * Giả sử, mình có 6 ảnh => các chỉ số lần lượt là: 0, 1, 2,...5
   * Chú ý:
   * Nếu đang ở chỉ số 5 mà đi về phía trước thì slideIndex = 0
   * Nếu đang ở chỉ số 0 mà về sau thì slideIndex = 5
   */
  getNewSlideIndex(step) {
    const slideIndex = this.state.slideIndex;
    const numberSlide = this.props.input.length;

    let newSlideIndex = slideIndex + step;

    if (newSlideIndex >= numberSlide) newSlideIndex = 0;
    else if (newSlideIndex < 0) newSlideIndex = numberSlide - 1;

    return newSlideIndex;
  }

  // Quay về ảnh phía trước, tức index giảm 1 => step = -1
  backward() {
    this.setState({
      slideIndex: this.getNewSlideIndex(-1),
    });
  }

  // Tiến tới ảnh phía sau, tức index tăng 1 => step = 1
  forward() {
    this.setState({
      slideIndex: this.getNewSlideIndex(1),
    });
  }

  // Xác định slideIndex nào sẽ được active
  setSlideIndex(index) {
    this.setState({
      slideIndex: index,
    });
  }

  /*
   * Cập nhật chiều cao cho container khi thay đổi kích thước màn hình
   * Trong phần CSS, mình để container có width = 100%,
   * Nên dù kéo to hay thu nhỏ thì width vẫn bằng 100%
   * Nhưng chiều cao phải tính lại dựa vào width và tỉ lệ this.ratioWH
   */
  updateDimensions() {
    this.containerElm.style.height = `${
      this.containerElm.offsetWidth / this.ratioWH
    }px`;
  }

  /*
   * Nếu người dùng truyền vào thuộc tính mode = automatic
   * thì Slideshow sẽ chạy tự động dựa vào interval.
   * Hàm này sẽ được gọi trong mỗi lượt lặp lại
   * để cập nhật slideIndex mới cho Slideshow
   */
  runAutomatic() {
    this.setState({
      slideIndex: this.getNewSlideIndex(1),
    });
  }

  /*
   * Hàm này thuộc về React Component Lifecycle
   * được gọi sau khi component này được render xong
   * Trong đây, sẽ lưu lại reference cho container - this.containerElm
   * Cập nhật lại chiều cao cho container - this.updateDimensions();
   * Đăng ký sự kiện thay đổi kích thước - resize
   * Kiểm tra nếu mode === "automatic" thì sẽ tạo mới một interval
   * để thay đổi hình ảnh - this.runAutomatic()
   * với giá trị timeout được truyền từ props hoặc mặc định là 5000 ms
   */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);

    if (this.props.mode === "automatic") {
      const timeout = this.props.timeout || 5000;

      this.automaticInterval = setInterval(
        () => this.runAutomatic(),
        Number.parseInt(timeout)
      );
    }
  }

  /*
   * Hàm này cũng thuộc về React Component Lifecycle -
   * được gọi khi component này bị xóa khỏi màn hình
   * Lúc này, mình phải hủy bỏ sự kiện khi resize
   * và xóa bỏ interval đã khai bảo bên trên để tránh leak memory.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
    if (this.automaticInterval) clearInterval(this.automaticInterval);
  }

  /*
   * Giao diện của component
   * với phần tử ngoài cùng mình để className="lp-slideshow"
   * để tránh xung đột về tên với các component khác
   */
  render() {
    return (
      <div className="lp-slideshow">
        <div className="container">
          {this.props.input.map((image, index) => {
            return (
              <div
                key={index}
                className={`slide ${
                  this.state.slideIndex === index ? "active" : ""
                }`}
              >
                <div className="number-text">
                  {`${index + 1} / ${this.props.input.length}`}
                </div>
                <img className="image" src={image.src} alt={image.caption} />
                <div className="caption-text">{image.caption}</div>
              </div>
            );
          })}

          <span className="prev" onClick={this.backward}>
            ❮
          </span>
          <span className="next" onClick={this.forward}>
            ❯
          </span>
        </div>

        <div className="dot-container">
          {this.props.input.map((_, index) => {
            return (
              <span
                key={index}
                className={`dot ${
                  this.state.slideIndex === index ? "active" : ""
                }`}
                onClick={() => this.setSlideIndex(index)}
              ></span>
            );
          })}
        </div>
      </div>
    );
  }
}
```

### Nội dung file slideshow.css

File này dùng để xác định style cho Slideshow component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-slideshow** để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2** thì hiểu là style này được áp dụng cho **element2** là con trực tiếp của **element1** - không phải cháu, chắt,...

```css
.lp-slideshow,
.lp-slideshow * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.lp-slideshow {
  width: 100%;
}

.lp-slideshow > .container {
  position: relative;
  margin: auto;
  width: 100%;
}

.lp-slideshow > .container > .slide {
  width: 100%;
  height: 100%;
  position: absolute;
  margin: auto;
  opacity: 0;
  transition: opacity 0.6s ease;
  -webkit-transition: opacity 0.6s ease;
  -moz-transition: opacity 0.6s ease;
  -o-transition: opacity 0.6s ease;
}

.lp-slideshow > .container > .slide.active {
  opacity: 1;
}

.lp-slideshow > .container > .slide > .image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lp-slideshow > .container > .slide > .number-text {
  color: #fff;
  font-size: 1rem;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

.lp-slideshow > .container > .slide > .caption-text {
  color: #fff;
  font-size: 1.3rem;
  padding: 8px 12px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.lp-slideshow > .container > .prev,
.lp-slideshow > .container > .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  font-size: 18px;
  background-color: rgba(0, 0, 0, 0);
  color: #fff;
  font-weight: bold;
  transition: background-color 0.6s ease;
  -webkit-transition: background-color 0.6s ease;
  -moz-transition: background-color 0.6s ease;
  -o-transition: background-color 0.6s ease;
}

.lp-slideshow:hover > .container > .prev,
.lp-slideshow:hover > .container > .next {
  background-color: rgba(0, 0, 0, 0.2);
}

.lp-slideshow:hover > .container > .prev:hover,
.lp-slideshow:hover > .container > .next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.lp-slideshow > .container > .next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.lp-slideshow > .container > .prev {
  left: 0;
  border-radius: 0 3px 3px 0;
}

.lp-slideshow > .dot-container {
  text-align: center;
  margin: 1rem auto;
}

.lp-slideshow > .dot-container > .dot {
  height: 15px;
  width: 15px;
  margin: 0 0.4rem;
  background-color: #bbb;
  border-radius: 50%;
  display: inline-block;
  transition: background-color 0.6s ease;
  -webkit-transition: background-color 0.6s ease;
  -moz-transition: background-color 0.6s ease;
  -o-transition: background-color 0.6s ease;
}

.lp-slideshow > .dot-container > .dot.active,
.lp-slideshow > .dot-container > .dot:hover {
  background-color: #717171;
}

.lp-slideshow > .dot-container > .dot:not(.active):hover {
  cursor: pointer;
}
```

## Sử dụng Slideshow component

**./src/App.css**

```css
/* Không thay đổi */
.App,
.App * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.App {
  text-align: center;
  width: 100%;
  max-width: 780px;
  margin: auto;
  padding: 15px;
  color: #222;
  font: normal normal normal 1rem/1.6 Nunito Sans, Helvetica, Arial, sans-serif;
}
```

**./src/App.js**

```jsx
import React from "react";
import "./App.css";

import Slideshow from "./components/slideshow/slideshow";
import img1 from "./images/01.jpg";
import img2 from "./images/02.jpg";
import img3 from "./images/03.jpg";
import img4 from "./images/04.jpg";
import img5 from "./images/05.jpg";
import img6 from "./images/06.jpg";

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
  { src: img4, caption: "Caption four" },
  { src: img5, caption: "Caption five" },
  { src: img6, caption: "Caption six" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Slideshow input={collection} ratio={`3:2`} mode={`manual`} />

        <Slideshow
          input={collection}
          ratio={`3:2`}
          mode={`automatic`}
          timeout={`3000`}
        />

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. Visit me
          at <a href="/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
```

Trong đó, component Slideshow có các thuộc tính là:

- **input ([Array](/javascript-array-co-ban)):** mảng chứa thông tin các ảnh, với mỗi phần tử là một [object ](/javascript-object-last-but-not-least)gồm src - đường dẫn ảnh và caption - tiêu đề ảnh.
- **ratio ([String](/values-types-va-operators-trong-javascript-phan-2)):** string biểu diễn tỉ lệ **width : height**, ví dụ là "3:2". Chú ý là chiều rộng, mình luôn luôn để 100% nên mình chỉ cần truyền vào tỉ lệ này là OK.
- **mode (String):** kiểu chạy, có 2 giá trị là "manual" - thủ công và "automatic" - tự động. Riêng với trường hợp, chạy tự động thì bạn cần truyền thêm giá trị "timeout" - thời gian giữa các ảnh, mặc định là 5000 ms.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #1 - Slideshow. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

<a href="https://about.phamvanlam.com/learn-react-by-example/#/slideshow/" class="btn btn-primary margin-bottom">
  Xem Demo Slideshow
</a>

Mình thấy React hay ở chỗ là mình có thể tách code ra thành các component. Nghĩa là khi nào cần mình sẽ lấy ra sử dụng, không cần phải viết lại nữa.

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!
