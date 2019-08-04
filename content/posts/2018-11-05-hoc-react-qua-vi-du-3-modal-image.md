---
date: "2018-11-05T22:30:33Z"
template: "post"
cover: "../images/hoc-react-qua-vi-du-3-modal-image-completejavascript.com_.png"
keywords: "modal image"
slug: hoc-react-qua-vi-du-3-modal-image
title: "Học React qua ví dụ #3: Modal Image"
categories:
  - Thư viện và Framework JavaScript
tags:
  - Create-react-app
  - Học React qua ví dụ
  - React
---

Xin chào bạn đến với Học React qua ví dụ #3. Bài viết này mình sẽ thực hành React thông qua cách tạo Modal Image.

Trước tiên, để hiểu **Modal Image** là gì, mời bạn theo dõi **demo**:

<a href="https://about.phamvanlam.com/learn-react-by-example/#/modal-image/" class="btn btn-primary margin-bottom">
  Xem Demo Modal Image
</a>

Trong ví dụ trên mình để demo 2 bức ảnh. Và khi bạn click vào mỗi bức ảnh thì **phiên bản lớn** của chúng sẽ được hiển thị lên. Đó chính là cách hoạt động của Modal Image.

Vậy xây dựng Modal Image trong React như thế nào?

Mời bạn theo dõi bài viết!

> **Bạn chú ý:** Trong series [học React qua ví dụ](/tag/hoc-react-qua-vi-du/) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

## Khởi tạo Project

Có nhiều cách để thực hiện demo Modal Image. Tuy nhiên, mình khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app/) để thực hành học React qua ví dụ #3 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages/).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------modal-image/
    --------modal-image.css
    --------modal-image.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: để chứa code của các Component. Bài này mình thực hành về Modal Image nên mình tạo thêm thư mục **modal-image** bên trong với 2 file **modal-image.js** và **modal-image.css** để định nghĩa cho component **Modal Image** (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).
- Thư mục **images**: để chứa tất cả những ảnh mình sử dụng cho Demo.
- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component Modal Image ở trên.
- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Modal Image Component

### Nội dung file modal-image.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React Component Lifecycle](/tim-hieu-react-component-lifecycle/)
- [Đăng ký và hủy bỏ event](/xu-ly-mot-event-javascript-co-ban/) (**_resize_**).

Và ý tưởng chung để xây dựng Modal Image Component là:

- Một ảnh có kích thước nhỏ để hiển thị ban đầu
- Một ảnh phiên bản lớn. Ban đầu, mình để ảnh này ẩn đi. Khi người dùng click vào ảnh nhỏ thì sẽ hiển thị ảnh lớn lên.

Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

```jsx
import React from 'react';
import ReactDOM from 'react-dom';
import './modal-image.css';

export default class ModalImage extends React.Component {
  constructor(props) {
    super(props);

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
   * Hiển thị Modal Image bằng cách set giá trị
   * cho thuộc tính display của style,
   * của phần tử đóng vai trò là Modal Image là "initial",
   * để hiển thị nó
  */
  showModal() {
    this.modalElm.style.display = "initial";
  }

  /**
   * Ẩn ảnh Modal Image bằng cách set giá trị
   * cho thuộc tính display của style,
   * của phần tử đóng vai trò là Modal Image là "none",
   * để ẩn nó đi
  */
  hideModal() {
    this.modalElm.style.display = "none";
  }

  /*
  * Cập nhật chiều cao cho mỗi ảnh khi thay đổi kích thước màn hình
  * Trong phần CSS, mình để mỗi ảnh có width = 100%,
  * Nên dù kéo to hay thu nhỏ thì width vẫn bằng 100% kích thước parent.
  * Nhưng chiều cao là giá trị tuyệt đối nên phải tính lại,
  * dựa vào width và tỉ lệ this.ratioWH = width / height
  */
  updateDimensions() {
    this.imageElm.style.height = 
      `${this.imageElm.offsetWidth / this.ratioWH}px`;
  }

  /**
   * Hàm này được gọi khi Modal Image đã render lên HTML.
   * Trong này mình sẽ lưu lại DOM node ứng với các phần tử
   *   + this.rootElm -> toàn bộ component
   *   + this.imageElm -> phiên bản ảnh nhỏ, hiển thị lúc đầu
   *   + this.modalElm -> phiên bản ảnh lớn, modal image
   *
   * Tiếp theo, gọi hàm this.updateDimensions() để cập nhật chiều cao
   * cho ảnh nhỏ ban đầu.
   *
   * Và cuối cùng là đăng ký sự kiên resize màn hình, với hàm xử lý
   * là updateDimensions(). Tức là mỗi khi thay đổi kích thước màn hình
   * thì sẽ tính lại chiều cao ảnh - đảm bảo tính responsive.
  */
  componentDidMount() {
    this.rootElm = ReactDOM.findDOMNode(this);
    this.imageElm = this.rootElm.querySelector(".image");
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

  render() {
    return (
      <div className="lp-modal-image">
        <img
          className="image"
          src={this.props.src}
          alt={this.props.alt}
          onClick={this.showModal}
        />

        <div className="modal">
          <span className="close" onClick={this.hideModal}>×</span>
          <img 
            className="modal-content" 
            src={this.props.src} 
            alt={this.props.alt + " modal"} 
          />
          <div className="caption">{this.props.alt}</div>
        </div>
      </div>
    )
  }
}
```

### Nội dung file modal-image.css

File này dùng để xác định style cho Modal Image Component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-modal-image** để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2** thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

```css
.lp-modal-image,
.lp-modal-image * {
  box-sizing: border-box;
  -moz-box-sizing: border-box;
  -webkit-box-sizing: border-box;
}

.lp-modal-image {
  width: 100%;
}

.lp-modal-image>.image {
  width: 100%;
  object-fit: cover;
  opacity: 1;
  transition: opacity 0.6s ease;
  -webkit-transition: opacity 0.6s ease;
  -moz-transition: opacity 0.6s ease;
  -o-transition: opacity 0.6s ease;
}

.lp-modal-image>.image:hover {
  opacity: 0.7;
  cursor: pointer;
}

.lp-modal-image>.modal {
  display: none;
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

.lp-modal-image>.modal>.modal-content {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 780px;
}

.lp-modal-image>.modal>.caption {
  margin: auto;
  display: block;
  width: 80%;
  max-width: 780px;
  text-align: center;
  color: #ccc;
  padding: 10px 0;
  height: 150px;
}

.lp-modal-image>.modal>.modal-content,
.lp-modal-image>.modal>.caption {
  animation-name: zoom;
  animation-duration: 0.6s;
}

.lp-modal-image>.modal>.close {
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

.lp-modal-image>.modal>.close:hover,
.lp-modal-image>.modal>.close:focus {
  color: #bbb;
  text-decoration: none;
  cursor: pointer;
}

@keyframes zoom {
  from {
    transform: scale(0)
  }
  to {
    transform: scale(1)
  }
}

@media only screen and (max-width: 780px) {
  .lp-modal-image>.modal>.modal-content {
    width: 100%;
  }
}
```

## Sử dụng Modal Image component

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
import React from 'react';
import './App.css';

import ModalImage from './components/modal-image/modal-image';
import img8 from './images/08.jpg';
import img9 from './images/09.jpg';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Image Modal</h2>
        <p>Click the image below to show the modal.</p>

        <div
          style={{
            display: `flex`
          }}
        >
          <ModalImage
            src={img8}
            alt={`This is one of beautiful girls`}
            ratio={`3:2`}
          />
          <ModalImage
            src={img9}
            alt={`This is also one of beautiful girls`}
            ratio={`3:2`}
          />
        </div>

        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>.
          Visit me at <a href="/">completejavascript.com</a>.
        </div>
      </div>
    );
  }
}
```

Trong đó, Modal Image Component có các thuộc tính là:

- **src ([String](/values-types-va-operators-trong-javascript-phan-2/)):** string biểu diễn đường dẫn ảnh sử dụng.
- **alt (String):** string để gán cho thuộc tính [alt](https://www.w3schools.com/tags/att_img_alt.asp) - được hiển thị thay thế cho ảnh, khi ảnh không được tải thành công (vì một lý do nào đó) hoặc không thể hiển thị.
- **ratio ([String](/values-types-va-operators-trong-javascript-phan-2/)):** string biểu diễn tỉ lệ **width : height**, ví dụ là "3:2". Chú ý là chiều rộng, mình luôn luôn để 100% nên mình chỉ cần truyền vào tỉ lệ này là OK.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #3 – Modal Image. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

<a href="https://about.phamvanlam.com/learn-react-by-example/#/modal-image/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

Mình thấy React hay ở chỗ là mình có thể tách code ra thành các component. Nghĩa là khi nào cần mình sẽ lấy ra sử dụng, không cần phải viết lại nữa.

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
