---
date: "2018-11-07T22:30:49Z"
update: "2018-11-07T22:30:49Z"
template: "post"
directory: "React"
cover: "../../../images/react/hoc-react-qua-vi-du-4-lightbox-completejavascript.com_.png"
keywords: "lightbox"
description: "Xin chào bạn đến với Học React qua ví dụ #4. Bài viết này mình sẽ thực hành React với Lightbox - sự kết hợp giữa Slideshow Gallery và Modal Image."
slug: hoc-react-qua-vi-du-4-lightbox
title: "Học React qua ví dụ #4: Lightbox"
series: "Học React qua ví dụ"
tags:
  - Create-react-app
  - React Component
---

Xin chào bạn đến với Học React qua ví dụ #4. Bài viết này mình sẽ thực hành React thông qua cách tạo Lightbox. Trong đó, Lightbox chính là sự kết hợp giữa [Slideshow Gallery](/hoc-react-qua-vi-du-2-slideshow-gallery/) và [Modal Image](/hoc-react-qua-vi-du-3-modal-image/).

Cụ thể là: thay vì click vào 1 ảnh nhỏ để hiển thị 1 ảnh lớn (giống Modal Image) thì mình sẽ hiển thị 1 Slideshow Gallery. Để dễ hiểu hơn, mời bạn theo dõi **demo**:

<a href="https://about.phamvanlam.com/learn-react-by-example/#/lightbox/" class="btn btn-primary margin-bottom">
  Xem Demo Lightbox
</a>

Trong ví dụ trên, ban đầu mình để demo 3 bức ảnh nhỏ. Và khi bạn click vào mỗi bức ảnh thì một **Slideshow Gallery** ứng với 3 bức ảnh đó sẽ được hiển thị lên theo kiểu giống **Modal Image**.

Và vì Lightbox kế thừa ý tưởng từ Modal Image, nên nếu bạn đã theo dõi bài viết về Modal Image rồi thì bài này sẽ rất đơn giản.

Bạn chỉ cần triển khai tương tự như Modal Image, rồi trong phần nội dung của Modal, mình không đưa vào một phần tử **[DOM](/co-ban-ve-dom-javascript/)** chứa ảnh nữa, mà thay vào đó là một **Slideshow Gallery Component**.

Chi tiết thế nào, mời bạn theo dõi bài viết!

> **Bạn chú ý:** Trong series [học React qua ví dụ](/tag/react-component) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

## Khởi tạo Project

Trong bài học này, mình vẫn khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app) để thực hành học React qua ví dụ #4 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages/).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------lightbox/
    --------lightbox.css
    --------lightbox.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: để chứa code của các Component. Bài này mình thực hành về **Lightbox** nên mình tạo thêm thư mục **lightbox** bên trong với 2 file **lightbox.js** và **lightbox.css** để định nghĩa cho component **Lightbox** (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).
- Thư mục **images**: để chứa tất cả những [ảnh](/web-tai-anh-mien-phi-chat-luong-cao/) mình sử dụng cho Demo.
- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component **Lightbox** ở trên.
- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Lightbox Component

### Nội dung file lightbox.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React Component Lifecycle](/tim-hieu-react-component-lifecycle/)
- [Đăng ký và hủy bỏ event](/xu-ly-mot-event-javascript-co-ban/) (**_resize_**).

Và ý tưởng chung để xây dựng Lightbox Component là:

- Một tuyển tập các ảnh có kích thước nhỏ để hiển thị ban đầu.
- Một Slideshow Gallery gồm các ảnh phiên bản lớn, ứng với các ảnh nhỏ. Ban đầu, mình để Slideshow Gallery này ẩn đi. Khi người dùng click vào ảnh nhỏ thì sẽ hiển thị Slideshow Gallery lên, với ảnh đang active tương ứng.

Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

```jsx:title=lightbox.js
import React from "react";
import ReactDOM from "react-dom";
import "./lightbox.css";
import SlideshowGallery from "../slideshow-gallery/slideshow-gallery";

export default class LightBox extends React.Component {
  constructor(props) {
    super(props);

    // Tạo reference ứng với Slideshow Gallery
    this.slideshowGallery = React.createRef();

    /*
     * Khi sử dụng, mình sẽ truyền thuộc tính ratio, giả sử là "3:2"
     * Như vậy, tỉ lệ width/height là this.ratioWH = 3 / 2
     * Mình sẽ điều chỉnh các ảnh sao cho về cùng 1 kích thước.
     */
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
  }

  /**
   * Hiển thị Slideshow Gallery như Modal
   * bằng cách set giá trị cho thuộc tính visibility của style,
   * của phần tử đóng vai trò là Modal là "visible" để hiển thị nó
   *
   * Ngoài ra, khi hiển thị Slidshow Gallery lên,
   * mình phải gọi phương thức setSlideIndex()
   * để xác định ảnh nào đang được active
   */
  showModal(index) {
    this.slideshowGallery.current.setSlideIndex(index);
    this.modalElm.style.visibility = "visible";
  }

  /**
   * Ẩn phần tử Slideshow Gallery đi bằng cách set giá trị
   * cho thuộc tính visibility của style,
   * của phần tử đóng vai trò là Modal Image là "hidden",
   * để ẩn nó đi
   */
  hideModal() {
    this.modalElm.style.visibility = "hidden";
  }

  /*
   * Cập nhật chiều cao cho mỗi ảnh khi thay đổi kích thước màn hình
   * Trong phần CSS, mình để mỗi ảnh có width = 100%,
   * Nên dù kéo to hay thu nhỏ thì width vẫn bằng 100% kích thước parent.
   * Nhưng chiều cao là giá trị tuyệt đối nên phải tính lại,
   * dựa vào width và tỉ lệ this.ratioWH = width / height
   *
   * Ngoài ra, số lượng ảnh ban đầu là this.props.input.length
   * chứ không phải 1 ảnh nên mình phải chia cho this.props.input.length
   */
  updateDimensions() {
    const height =
      this.containerElm.offsetWidth / this.props.input.length / this.ratioWH;
    this.containerElm.style.height = `${height}px`;
  }

  /**
   * Hàm này được gọi khi Lightbox đã render lên HTML.
   * Trong này mình sẽ lưu lại DOM node ứng với các phần tử
   *   + this.rootElm -> toàn bộ component
   *   + this.containerElm -> container chứa các ảnh phiên bản nhỏ,
   *   + this.modalElm -> chứa thành phần là modal - slideshow gallery
   *
   * Tiếp theo, gọi hàm this.updateDimensions() để cập nhật chiều cao
   * cho ảnh nhỏ ban đầu.
   *
   * Và cuối cùng là đăng ký sự kiên resize màn hình, với hàm xử lý
   * là updateDimensions(). Tức là mỗi khi thay đổi kích thước màn hình
   * thì sẽ tính lại chiều cao.
   */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");
    this.modalElm = this.rootElm.querySelector(".modal");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Hàm này được gọi khi Component bị xóa khỏi HTML.
   * Lúc này mình phải hủy bỏ sự kiện đã đăng ký lúc trước.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  /**
   * Chú ý: thành phần bên trong phần Modal bây giờ không chỉ
   * là một ảnh như Modal Image.
   *
   * Mà trong đó, mình truyền vào Slideshow Gallery Component
   */
  render() {
    return (
      <div className="lp-lightbox">
        <div className="container">
          {this.props.input.map((image, index) => {
            return (
              <div
                key={index}
                className="image-wrapper"
                style={{
                  width: `${(1 / this.props.input.length) * 100}%`,
                  height: `100%`,
                }}
              >
                <img
                  className="image"
                  src={image.src}
                  alt={image.caption}
                  onClick={() => this.showModal(index)}
                />
              </div>
            );
          })}
        </div>

        <div className="modal">
          <span className="close" onClick={this.hideModal}>
            ×
          </span>
          <div className="modal-content">
            <SlideshowGallery
              ref={this.slideshowGallery}
              input={this.props.input}
              ratio={this.props.ratio}
              mode={`manual`}
            />
          </div>
        </div>
      </div>
    );
  }
}
```

### Nội dung file lightbox.css

File này dùng để xác định style cho Lightbox Component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-lightbox** để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2** thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

```css:title=lightbox.css
.lp-lightbox,
.lp-lightbox * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.lp-lightbox {
  width: 100%;
}

.lp-lightbox > .container {
  width: 100%;
  display: flex;
  display: -webkit-flex;
}

.lp-lightbox > .container > .image-wrapper {
  flex: 1;
  padding: 0.35rem;
}

.lp-lightbox > .container > .image-wrapper > .image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.6s ease;
  -webkit-transition: opacity 0.6s ease;
  -moz-transition: opacity 0.6s ease;
  -o-transition: opacity 0.6s ease;
}

.lp-lightbox > .container > .image-wrapper > .image:hover {
  opacity: 0.7;
  cursor: pointer;
}

.lp-lightbox > .modal {
  visibility: hidden;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.9);
}

.lp-lightbox > .modal > .close {
  position: absolute;
  top: 15px;
  right: 35px;
  color: #f1f1f1;
  font-size: 40px;
  font-weight: bold;
  transition: color 0.3s;
  -webkit-transition: color 0.3s;
  -moz-transition: color 0.3s;
  -o-transition: color 0.3s;
}

.lp-lightbox > .modal > .close:hover,
.lp-lightbox > .modal > .close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

.lp-lightbox > .modal > .modal-content {
  margin: auto;
  width: 80%;
  max-width: 600px;
}

@media only screen and (max-width: 600px) {
  .lp-lightbox > .modal > .modal-content {
    width: 100%;
  }
}
```

## Sử dụng Lightbox component

```css:title=./src/App.css
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

```jsx:title=./src/App.js
import React from "react";
import "./App.css";

import LightBox from "./components/lightbox/lightbox";
import img8 from "./images/08.jpg";
import img9 from "./images/09.jpg";
import img10 from "./images/10.jpg";

const collection = [
  { src: img8, caption: "Caption eight" },
  { src: img9, caption: "Caption nine" },
  { src: img10, caption: "Caption ten" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>LightBox</h2>
        <p>Click on each image below to show the Slideshow Gallery.</p>

        <LightBox input={collection} ratio={`3:2`} />

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. Visit me
          at <a href="/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
```

Trong đó, Lightbox Component có các thuộc tính là:

- **input ([Array](/javascript-array-co-ban/)):** mảng chứa thông tin các ảnh, với mỗi phần tử là một [object ](/javascript-object-last-but-not-least/)gồm _src_ – đường dẫn ảnh và _caption_ – tiêu đề ảnh.
- **ratio ([String](/kieu-du-lieu-trong-javascript/)):** string biểu diễn tỉ lệ **width : height**, ví dụ là "3:2". Chú ý là chiều rộng, mình luôn luôn để 100% nên mình chỉ cần truyền vào tỉ lệ này là OK.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #4 – Lightbox. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

<a href="https://about.phamvanlam.com/learn-react-by-example/#/lightbox/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

Bạn thấy đó, trong bài này, mình hầu như tái sử dụng lại những Component đã viết từ trước mà không cần phải viết lại nhiều. Vì vậy, mình tiết kiệm được một lượng thời gian kha khá.

Đặc biệt là sau này, khi làm các project lớn hơn, mình chỉ cần **copy-paste** lại các Component đã làm trong [series](/tag/react-component) này (sửa style nếu cần) mà không mất công xây dựng lại những thành phần cơ bản này nữa. Đó chính là lợi ích lớn nhất khi mình xây dựng React Component.

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!
