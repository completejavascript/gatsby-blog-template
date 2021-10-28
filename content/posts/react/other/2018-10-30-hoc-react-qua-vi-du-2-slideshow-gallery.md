---
date: "2018-10-30T22:30:09Z"
update: "2018-10-30T22:30:09Z"
template: "post"
directory: "React"
cover: "../images/hoc-react-qua-vi-du-2-slideshow-gallery-completejavascript.com_.png"
keywords: "Slideshow Gallery"
description: "Xin chào bạn đến với Học React qua ví dụ #2. Bài trước mình đã thực hành Slideshow rồi. Bài viết này mình sẽ cải tiến nó trở thành Slideshow Gallery."
slug: hoc-react-qua-vi-du-2-slideshow-gallery
title: "Học React qua ví dụ #2: Slideshow Gallery"
tags:
  - Create-react-app
  - Event
  - React Component
---

Xin chào bạn đến với Học React qua ví dụ #2. Bài trước mình đã thực hành React với [Slideshow](/hoc-react-qua-vi-du-1-slideshow) rồi. Vì vậy, bài viết này mình sẽ cải tiến nó một chút, trở thành Slideshow Gallery.

Tuy nhiên, **Slideshow Gallery** lại tương đối giống với Slideshow. Do đó, nếu bạn đã hiểu cách tạo Slideshow rồi thì bài này sẽ vô cùng dễ hiểu.

Dưới đây là ví dụ demo:

<a href="https://about.phamvanlam.com/learn-react-by-example/#/slideshow-gallery/" class="btn btn-primary margin-bottom">
  Xem demo Slideshow Gallery
</a>

Trong ví dụ trên, mình cũng tạo ra hai Slideshow Gallery. Cái bên trên điều khiển thủ công thông qua việc click chuột. Còn cái bên dưới được điều khiển tự động, với mỗi ảnh cách nhau 3 giây (dĩ nhiên bạn vẫn có thể điều khiển thủ công được).

> **Bạn chú ý:** Trong series [học React qua ví dụ](/tag/react-component) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

Nếu không có vấn đề gì thì mình bắt đầu học React qua ví dụ #2 thôi nào!

## Khởi tạo Project

Có nhiều cách để thực hiện demo Slideshow Gallery. Tuy nhiên, mình khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app) để thực hành học React qua ví dụ #2 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages).

## Cấu trúc Project

Như đã nói ở bài viết trước, mình sẽ thực hiện các bài học React qua ví dụ trên cùng một project. Tuy nhiên, nếu bạn chưa xem qua bài trước thì có thể bắt đầu ngay tại đây.

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------slideshow-gallery/
    --------slideshow-gallery.css
    --------slideshow-gallery.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: để chứa code của các Component. Bài này mình thực hành về Slideshow Gallery nên mình tạo thêm thư mục **slideshow-gallery** bên trong với 2 file **slideshow-gallery.js** và **slideshow-gallery.css** để định nghĩa cho component Slideshow Gallery (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).
- Thư mục **images**: để chứa tất cả những [ảnh](/web-tai-anh-mien-phi-chat-luong-cao) mình sử dụng cho Demo.
- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component Slideshow Gallery ở trên.
- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Slideshow Gallery Component

### Nội dung file slideshow-gallery.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React Component Lifecycle](/tim-hieu-react-component-lifecycle)
- [Đăng ký và hủy bỏ event](/xu-ly-mot-event-javascript-co-ban) (_resize_).
- Cách sử dụng [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval) để xây dựng vòng lặp.

Còn nội dung chi tiết mình giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./slideshow-gallery.css";

export default class SlideshowGallery extends React.Component {
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
   * Nếu đang ở chỉ số 5 mà đi về phía sau thì slideIndex = 0
   * Nếu đang ở chỉ số 0 mà về trước thì slideIndex = 5
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
   * Nên dù kéo to hay thu nhỏ thì width vẫn bằng 100% kích thước parent.
   * Nhưng chiều cao là giá trị tuyệt đối nên phải tính lại,
   * dựa vào width và tỉ lệ this.ratioWH = width / height
   *
   * Chú ý: ví dụ Slideshow Gallery này khác với ví dụ Slideshow thông thường
   * ở chỗ là mình thay những chấm tròn ở dưới thành dãy các ảnh.
   * Vì vậy, mình cũng phải tính lại chiều cao của phần đó - this.containerBottomElm.
   *
   * Ngoài ra, số lượng ảnh ở phía dưới là this.props.input.length chứ không phải 1 ảnh
   * nên mình phải chia cho this.props.input.length - đây là phần khác so với
   * khi tính toán với this.containerElm
   */
  updateDimensions() {
    this.containerElm.style.height = `${
      this.containerElm.offsetWidth / this.ratioWH
    }px`;
    this.containerBottomElm.style.height = `${
      this.containerBottomElm.offsetWidth /
      this.props.input.length /
      this.ratioWH
    }px`;
  }

  /*
   * Nếu người dùng truyền vào thuộc tính mode = automatic
   * thì Slideshow Gallery sẽ chạy tự động dựa vào interval.
   * Hàm này sẽ được gọi trong mỗi lượt lặp lại
   * để cập nhật slideIndex mới cho Slideshow Gallery
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
    this.containerBottomElm = this.rootElm.querySelector(".container-bottom");

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

  render() {
    return (
      <div className="lp-slideshow-gallery">
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

        <div className="container-bottom">
          {this.props.input.map((image, index) => {
            return (
              <img
                key={index}
                src={image.src}
                alt={image.caption}
                className={`image ${
                  this.state.slideIndex === index ? "active" : ""
                }`}
                onClick={() => this.setSlideIndex(index)}
                style={{
                  width: `${(1 / this.props.input.length) * 100}%`,
                  height: `100%`,
                }}
              />
            );
          })}
        </div>
      </div>
    );
  }
}
```

### Nội dung file slideshow-gallery.css

File này dùng để xác định style cho Slideshow Gallery component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-slideshow-gallery** để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2** thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

```css
.lp-slideshow-gallery,
.lp-slideshow-gallery * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.lp-slideshow-gallery {
  width: 100%;
}

.lp-slideshow-gallery > .container {
  position: relative;
  margin: auto;
  width: 100%;
}

.lp-slideshow-gallery > .container > .slide {
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

.lp-slideshow-gallery > .container > .slide.active {
  opacity: 1;
}

.lp-slideshow-gallery > .container > .slide > .image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lp-slideshow-gallery > .container > .slide > .number-text {
  color: #fff;
  font-size: 1rem;
  padding: 8px 12px;
  position: absolute;
  top: 0;
}

.lp-slideshow-gallery > .container > .slide > .caption-text {
  color: #fff;
  font-size: 1.3rem;
  padding: 8px 12px;
  position: absolute;
  bottom: 0px;
  width: 100%;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.2);
}

.lp-slideshow-gallery > .container > .prev,
.lp-slideshow-gallery > .container > .next {
  cursor: pointer;
  position: absolute;
  top: 50%;
  width: auto;
  margin-top: -22px;
  padding: 16px;
  font-size: 18px;
  color: #fff;
  font-weight: bold;
  transition: background-color 0.6s ease;
  -webkit-transition: background-color 0.6s ease;
  -moz-transition: background-color 0.6s ease;
  -o-transition: background-color 0.6s ease;
}

.lp-slideshow-gallery:hover > .container > .prev,
.lp-slideshow-gallery:hover > .container > .next {
  background-color: rgba(0, 0, 0, 0.2);
}

.lp-slideshow-gallery:hover > .container > .prev:hover,
.lp-slideshow-gallery:hover > .container > .next:hover {
  background-color: rgba(0, 0, 0, 0.8);
}

.lp-slideshow-gallery > .container > .next {
  right: 0;
  border-radius: 3px 0 0 3px;
}

.lp-slideshow-gallery > .container > .prev {
  left: 0;
  border-radius: 0 3px 3px 0;
}

.lp-slideshow-gallery > .container-bottom {
  margin-bottom: 1rem;
  width: 100%;
  display: flex;
  display: -webkit-flex;
}

.lp-slideshow-gallery > .container-bottom > .image {
  flex: 1;
  object-fit: cover;
  opacity: 0.5;
  transition: opacity 0.6s ease;
  -webkit-transition: opacity 0.6s ease;
  -moz-transition: opacity 0.6s ease;
  -o-transition: opacity 0.6s ease;
}

.lp-slideshow-gallery > .container-bottom > .image.active,
.lp-slideshow-gallery > .container-bottom > .image:hover {
  opacity: 1;
}
.lp-slideshow-gallery > .container-bottom > .image:not(.active):hover {
  cursor: pointer;
}
```

## Sử dụng Slideshow Gallery component

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

import SlideshowGallery from "./components/slideshow-gallery/slideshow-gallery";
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
        <SlideshowGallery input={collection} ratio={`3:2`} mode={`manual`} />

        <SlideshowGallery
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

Trong đó, component Slideshow Gallery có các thuộc tính là:

- **input ([Array](/javascript-array-co-ban)):** mảng chứa thông tin các ảnh, với mỗi phần tử là một [object ](/javascript-object-last-but-not-least) gồm src – đường dẫn ảnh và caption – tiêu đề ảnh.
- **ratio ([String](/values-types-va-operators-trong-javascript-phan-2)):** string biểu diễn tỉ lệ **width : height**, ví dụ là "3:2". Chú ý là chiều rộng, mình luôn luôn để 100% nên mình chỉ cần truyền vào tỉ lệ này là OK.
- **mode (String):** kiểu chạy, có 2 giá trị là "manual" – thủ công và "automatic" – tự động. Riêng với trường hợp, chạy tự động thì bạn cần truyền thêm giá trị "timeout" – thời gian giữa các ảnh, mặc định là 5000 ms.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #2 – Slideshow Gallery. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

<a href="https://about.phamvanlam.com/learn-react-by-example/#/slideshow-gallery/" class="btn btn-primary margin-bottom">
  Xem Demo Slideshow Gallery
</a>

Mình thấy React hay ở chỗ là mình có thể tách code ra thành các component. Nghĩa là khi nào cần mình sẽ lấy ra sử dụng, không cần phải viết lại nữa.

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!
