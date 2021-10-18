---
date: "2018-11-11T22:30:50Z"
template: "post"
directory: "React"
cover: "../images/hoc-react-qua-vi-du-5-tab-gallery-completejavascript.com_.png"
keywords: "tab gallery"
description: "Xin chào bạn đến với Học React qua ví dụ #5. Bài này mình sẽ thực hành React thông qua việc tạo Tab Gallery. Mời bạn theo dõi bài viết."
slug: hoc-react-qua-vi-du-5-tab-gallery
title: "Học React qua ví dụ #5: Tab Gallery"
tags:
  - Create-react-app
  - React Component
---

Xin chào bạn đến với Học React qua ví dụ #5. Bài này mình sẽ thực hành React thông qua việc tạo Tab Gallery. Trước khi bắt đầu, mời bạn theo dõi ví dụ minh họa:

<a href="https://about.phamvanlam.com/learn-react-by-example/#/tab-gallery/" class="btn btn-primary margin-bottom">
  Xem Demo Tab Gallery
</a>

Như bạn thấy đó, hình ảnh được xếp thành một dãy (dạng tab). Và khi bạn click vào mỗi ảnh thì phiên bản lớn của mỗi ảnh sẽ được hiển thị xuống bên dưới. Đó chính là cách hoạt động của Tab Gallery.

Bây giờ, mời bạn theo dõi cách giải quyết!

> **Bạn chú ý:** Trong series [học React qua ví dụ](/tag/hoc-react-qua-vi-du) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

## Khởi tạo Project

Trong bài học này, mình vẫn khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app) để thực hành học React qua ví dụ #5 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------tab-gallery/
    --------tab-gallery.css
    --------tab-gallery.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: chứa code của các Component. Bài này mình thực hành về **Tab Gallery** nên mình tạo thêm thư mục **tab-gallery** bên trong với 2 file **tab-gallery.js** và **tab-gallery.css** để định nghĩa cho component **Tab Gallery** (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).
- Thư mục **images**: để chứa tất cả những [ảnh](/web-tai-anh-mien-phi-chat-luong-cao) mình sử dụng cho Demo.
- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component **Tab Gallery** ở trên.
- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Tab Gallery Component

### Nội dung file tab-gallery.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React Component Lifecycle](/tim-hieu-react-component-lifecycle)
- [Đăng ký và hủy bỏ event](/xu-ly-mot-event-javascript-co-ban) (**_resize_**).

Và ý tưởng chung để xây dựng Tab Gallery Component là:

- Một tuyển tập các ảnh có kích thước nhỏ để hiển thị ban đầu, được sắp xếp theo hàng ngang. Mỗi ảnh nhỏ là một tab.
- Khi người dùng click vào ảnh nào, mình sẽ lấy thông tin ảnh đó (đường dẫn, caption) để hiển thị xuống bên dưới.

Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./tab-gallery.css";

export default class TabGallery extends React.Component {
  constructor(props) {
    super(props);

    /**
     * State lưu thông tin ảnh sẽ được hiển thị trong tab content,
     * bao gồm đường dẫn ảnh và caption của ảnh
     */
    this.state = {
      imageSrc: "",
      imageText: "",
    };

    /*
     * Khi sử dụng, mình sẽ truyền thuộc tính ratio, giả sử là "3:2"
     * Như vậy, tỉ lệ width/height là this.ratioWH = 3 / 2
     * Mình sẽ điều chỉnh các ảnh sao cho về cùng 1 kích thước.
     */
    const ratioWHArray = this.props.ratio.split(":");
    this.ratioWH = ratioWHArray[0] / ratioWHArray[1];

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showImage = this.showImage.bind(this);
    this.hideImage = this.hideImage.bind(this);
  }

  /**
   * Điều khiển việc hiển thị ảnh, với đầu vào là object lưu thông tin
   * của ảnh cần hiển thị
   */
  showImage(image) {
    this.setState({
      imageSrc: image.src,
      imageText: image.caption,
    });
  }

  /**
   * Điều khiển việc ẩn ảnh đi,
   * bằng cách cho đường dẫn ảnh về string rỗng.
   */
  hideImage() {
    this.setState({
      imageSrc: "",
      imageText: "",
    });

    /**
     * Khi set display thành none thì phần container
     * phía dưới sẽ không chiếm diện tích,
     * nên phải cập nhật lại kích thước của component
     */
    this.containerBottomElm.style.display = "none";
    this.updateDimensions();
  }

  /**
   * Cập nhật kích thước component
   */
  updateDimensions() {
    const tabHeight =
      this.containerElm.offsetWidth / this.props.input.length / this.ratioWH;
    this.containerElm.style.height = `${tabHeight}px`;

    const bottomHeight = this.containerBottomElm.offsetWidth / this.ratioWH;
    this.containerBottomElm.style.height = `${bottomHeight}px`;
  }

  /**
   * Hàm này được gọi khi component đã render lên HTML xong,
   * lúc này mình cần lưu lại DOM node ứng với các phần tử cần thiết.
   *
   * Đồng thời tính toán kích thước component và đăng ký
   * sự kiện khi resize màn hình thì sẽ tính toán lại kích thước của component.
   */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.containerElm = this.rootElm.querySelector(".container");
    this.containerBottomElm = this.rootElm.querySelector(".container-bottom");

    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Hàm này được gọi khi component bị xoá khỏi HTML,
   * lúc này mình cần huỷ bỏ sự kiện đã đăng ký.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  /**
   * Hàm này được gọi khi component update,
   * tức là khi click vào mỗi ảnh, mình sẽ hiển thị ảnh phía dưới,
   * sau đó tính toán lại kích thước phù hợp.
   */
  componentDidUpdate() {
    if (this.state.imageSrc !== "") {
      this.containerBottomElm.style.display = "block";
      this.updateDimensions();
    }
  }

  /**
   * Giao diện của tab gallery sẽ gồm 2 phần chính.
   * Phần div với tên class container sẽ hiển thị ảnh theo chiều ngang.
   *
   * Khi click vào mỗi ảnh thì phiên bản lớn hơn của ảnh sẽ hiển thị
   * phía dưới, ứng với thẻ div với class container-bottom
   */
  render() {
    return (
      <div className="lp-tab-gallery">
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
                  onClick={() => this.showImage(image)}
                />
              </div>
            );
          })}
        </div>

        <div className="container-bottom">
          <img
            className="image"
            src={this.state.imageSrc}
            alt={this.state.imageText}
          />
          <span className="close-btn" onClick={() => this.hideImage()}>
            ×
          </span>
          <div className="image-text">{this.state.imageText}</div>
        </div>
      </div>
    );
  }
}
```

### Nội dung file tab-gallery.css

File này dùng để xác định style cho Tab Gallery Component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-tab-gallery** để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2** thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

```css
.lp-tab-gallery,
.lp-tab-gallery * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.lp-tab-gallery {
  width: 100%;
}

.lp-tab-gallery > .container {
  width: 100%;
  display: flex;
  display: -webkit-flex;
}

.lp-tab-gallery > .container > .image-wrapper {
  flex: 1;
  padding: 0.35rem;
}

.lp-tab-gallery > .container > .image-wrapper > .image {
  object-fit: cover;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.6s ease;
  -webkit-transition: opacity 0.6s ease;
  -moz-transition: opacity 0.6s ease;
  -o-transition: opacity 0.6s ease;
}

.lp-tab-gallery > .container > .image-wrapper > .image:hover {
  opacity: 0.7;
  cursor: pointer;
}

.lp-tab-gallery > .container-bottom {
  width: 100%;
  display: none;
  position: relative;
  margin-top: 0.35rem;
  margin-bottom: 0.35rem;
}

.lp-tab-gallery > .container-bottom > .image {
  position: absolute;
  left: 0.35rem;
  top: 0;
  width: calc(100% - 0.7rem);
  height: 100%;
  object-fit: cover;
}

.lp-tab-gallery > .container-bottom > .image-text {
  position: absolute;
  bottom: 0;
  left: 15px;
  color: #fff;
  font-size: 20px;
}

.lp-tab-gallery > .container-bottom > .close-btn {
  position: absolute;
  top: 0px;
  right: 6px;
  color: #fff;
  width: auto;
  padding: 16px;
  font-size: 20px;
  font-weight: bold;
  line-height: 1rem;
  background-color: rgba(0, 0, 0, 0);
  transition: background-color 0.6s ease;
  -webkit-transition: background-color 0.6s ease;
  -moz-transition: background-color 0.6s ease;
  -o-transition: background-color 0.6s ease;
}

.lp-tab-gallery > .container-bottom:hover > .close-btn {
  background-color: rgba(0, 0, 0, 0.2);
}

.lp-tab-gallery > .container-bottom:hover > .close-btn:hover {
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.8);
}
```

## Sử dụng Tab Gallery component

**./src/App.css**

```css
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

import TabGallery from "./components/tab-gallery/tab-gallery";
import img11 from "./images/11.jpg";
import img12 from "./images/12.jpg";
import img13 from "./images/13.jpg";

const collection = [
  { src: img11, caption: "Caption eleven" },
  { src: img12, caption: "Caption twelve" },
  { src: img13, caption: "Caption thirteen" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Tab Gallery</h2>
        <p>Click on each image below to show the corresponding image.</p>

        <TabGallery input={collection} ratio={`3:2`} />

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. Visit me
          at <a href="/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
```

Trong đó, Tab Gallery Component có các thuộc tính là:

- **input ([Array](/javascript-array-co-ban)):** mảng chứa thông tin các ảnh, với mỗi phần tử là một [object ](/javascript-object-last-but-not-least)gồm _src_ – đường dẫn ảnh và _caption_ – tiêu đề ảnh.
- **ratio ([String](/values-types-va-operators-trong-javascript-phan-2)):** string biểu diễn tỉ lệ **width : height**, ví dụ là "3:2". Chú ý là chiều rộng, mình luôn luôn để 100% nên mình chỉ cần truyền vào tỉ lệ này là OK.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #5 – Tab Gallery. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

<a href="https://about.phamvanlam.com/learn-react-by-example/#/tab-gallery/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
