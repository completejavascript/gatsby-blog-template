---
date: "2018-11-27T22:30:49Z"
update: "2018-11-27T22:30:49Z"
template: "post"
directory: "React"
cover: "../../../images/react/hoc-react-qua-vi-du-7-collapsible-content-completejavascript.com_.png"
keywords: "collapsible content"
description: "Xin chào bạn đến với Học React qua ví dụ #7. Bài này mình sẽ thực hành React thông qua việc tạo Collapsible Content. Mời bạn theo dõi bài viết."
slug: hoc-react-qua-vi-du-7-collapsible-content
title: "Học React qua ví dụ #7: Collapsible Content"
tags:
  - Create-react-app
  - React Component
---

Xin chào bạn đến với Học React qua ví dụ #7. Bài này mình sẽ thực hành React thông qua việc tạo Collapsible Content. Trước khi bắt đầu, mời bạn theo dõi ví dụ minh họa:

<a href="https://about.phamvanlam.com/learn-react-by-example/#/collapsible-content/" class="btn btn-primary margin-bottom">
  Xem Demo Collapsible Content
</a>

Theo như từ điển anh việt thì Collapsible nghĩa là: **có thể gập lại, xếp lại được**. Do đó, Collapsible Content Component là một phần tử cho phép mình hiển thị mở rộng hoặc thu nhỏ nội dung, tùy thuộc vào lựa chọn của người dùng.

Và sau đây sẽ là cách triển khai, mời bạn theo dõi bài viết!

> **Bạn chú ý:** Trong series [học React qua ví dụ](/tag/react-component) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

## Khởi tạo Project

Trong bài học này, mình vẫn khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app) để thực hành học React qua ví dụ #7 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------collapsible-content/
    --------collapsible-content.css
    --------collapsible-content.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: chứa code của các Component. Bài này mình thực hành về  **Collapsible Content** nên mình tạo thêm thư mục **collapsible-content** bên trong với 2 file **collapsible-content.js** và **collapsible-content.css** để định nghĩa cho component **Collapsible Content** (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).
- Thư mục **images**: để chứa tất cả những ảnh mình sử dụng cho Demo.
- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component **Collapsible Content** ở trên.
- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Collapsible Content Component

### Nội dung file collapsible-content.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React Component Lifecycle](/tim-hieu-react-component-lifecycle)
- [Đăng ký và hủy bỏ event](/xu-ly-mot-event-javascript-co-ban) (**_resize_**).

Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./collapsible-content.css";

export default class CollapsibleContent extends React.Component {
  constructor(props) {
    super(props);

    /*
     * State isActive để quản lý xem CollapsibleContent có đang active không.
     * Nếu Active thì content sẽ được hiển thị, ngược lại thì không.
     * Nếu người dùng không truyền thuộc tính isActive vào,
     * thì mặc định this.state.isActive là false
     */
    this.state = {
      isActive: this.props.isActive || false,
    };

    this.toggleCollapseContent = this.toggleCollapseContent.bind(this);
    this.updateContentMaxHeight = this.updateContentMaxHeight.bind(this);
  }

  /**
   * Hàm này được gọi khi người dùng click vào khu vực button title.
   * Khi đó trạng thái của this.state.isActive sẽ bị lật ngược lại.
   * Nếu nó là true => false,
   * Nếu nó là false => true
   */
  toggleCollapseContent() {
    this.setState({
      isActive: !this.state.isActive,
    });
  }

  /**
   * Cập nhật maxHeight của khu vực content,
   *
   * Nếu this.state.isActive là true thì
   * khu vực content có maxHeight = giá trị thực tế nó cần.
   *
   * Nếu this.state.isActive là false thì
   * khu vực content có maxHeight = 0 => content bị ẩn.
   */
  updateContentMaxHeight() {
    if (this.state.isActive) {
      this.panelContent.style.maxHeight = this.panelContent.scrollHeight + "px";
    } else {
      this.panelContent.style.maxHeight = null;
    }
  }

  /**
   * Hàm này được gọi sau khi Collapsible content được render lên.
   * Trong này, mình sẽ lưu lại DOM node ứng với khu vực content là this.panelContent.
   * Sau đó, cập nhật lại maxHeight cho nó, tuỳ thuộc vào giá trị this.state.isActive.
   * Đồng thời, mình đăng ký sự kiện khi resize màn hình,
   * để gọi hàm updateContentMaxHeight => cập nhật lại maxHeight cho content
   */
  componentDidMount() {
    this.root = ReactDOM.findDOMNode(this);
    this.panelContent = this.root.querySelector(".content");

    this.updateContentMaxHeight();
    window.addEventListener("resize", this.updateContentMaxHeight);
  }

  /**
   * Hàm này được gọi khi Collapsible Content bị xoá.
   * Khi đó, mình phải huỷ đăng ký sự kiện resize lúc trước.
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateContentMaxHeight);
  }

  /**
   * Hàm này được gọi mỗi khi this.state.isActive thay đổi.
   * Trong này, mình phải gọi hàm this.updateContentMaxHeight(),
   * để cập nhật lại maxHeight cho content, ứng với trường hợp đóng hoặc mở
   */
  componentDidUpdate() {
    this.updateContentMaxHeight();
  }

  /**
   * Giao diện cho Collapsible Content
   */
  render() {
    return (
      <div className="lp-collapsible-content">
        <div
          className={`title ${this.state.isActive ? "active" : ""}`}
          onClick={this.toggleCollapseContent}
        >
          {this.props.title}
        </div>

        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
```

### Nội dung file collapsible-content.css

File này dùng để xác định style cho Collapsible Content Component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-collapsible-content** để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2** thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

```css
.lp-collapsible-content,
.lp-collapsible-content * {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

.lp-collapsible-content {
  width: 100%;
}

/* Style the buttons that are used to open and close the content */

.lp-collapsible-content > .title {
  background-color: #eee;
  color: #444;
  cursor: pointer;
  padding: 18px;
  width: 100%;
  text-align: left;
  border: none;
  outline: none;
  transition: background-color 0.4s ease;
  -webkit-transition: background-color 0.4s ease;
  -moz-transition: background-color 0.4s ease;
  -o-transition: background-color 0.4s ease;
}

/* Add a background color to the button
* if it is clicked on (add the .active class with JS),
* and when you move the mouse over it (hover)
*/

.lp-collapsible-content > .title.active,
.lp-collapsible-content > .title:hover {
  background-color: #ccc;
}

/* Style the content. Note: hidden by default */

.lp-collapsible-content > .content {
  padding: 0 18px;
  background-color: white;
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.2s ease-out;
  -webkit-transition: max-height 0.2s ease-out;
  -moz-transition: max-height 0.2s ease-out;
  -o-transition: max-height 0.2s ease-out;
}

.lp-collapsible-content > .title:after {
  content: "\02795";
  /* Unicode character for "plus" sign (+) */
  font-size: 13px;
  color: #777;
  float: right;
  margin-left: 5px;
  margin-top: 3px;
}

.lp-collapsible-content > .title.active:after {
  content: "\2796";
  /* Unicode character for "minus" sign (-) */
}
```

## Sử dụng Collapsible Content component

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

Trong đây, mình kết hợp Tab Content với các React Component khác mà mình đã làm như: [Slideshow](/hoc-react-qua-vi-du-1-slideshow), [Modal Image](/hoc-react-qua-vi-du-3-modal-image) và [Lightbox](/hoc-react-qua-vi-du-4-lightbox).

```jsx
import React from "react";
import "./App.css";
import CollapsibleContent from "./components/collapsible-content/collapsible-content";

// Kết hợp Slideshow trong Collapsible Content
import Slideshow from "./components/slideshow/slideshow";
import img1 from "./images/01.jpg";
import img2 from "./images/02.jpg";
import img3 from "./images/03.jpg";

// Kết hợp Modal Image trong Collapsible Content
import ModalImage from "./components/modal-image/modal-image";

// Kết hợp Lightbox trong Collapsible Content
import LightBox from "./components/lightbox/lightbox";

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" },
];

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Collapsible Content</h2>
        <p>
          Click on each section to toggle between hiding and showing the content
        </p>

        <CollapsibleContent title={`Section 1`} isActive={true}>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </CollapsibleContent>

        <CollapsibleContent title={`Section 2`}>
          <h2> Slideshow </h2>
          <Slideshow input={collection} ratio={`3:2`} mode={`manual`} />
        </CollapsibleContent>

        <CollapsibleContent title={`Section 3`}>
          <h2>Image Modal</h2>
          <p>Click the image below to show the modal.</p>
          <ModalImage
            src={img2}
            alt={`This is one of beautiful girls`}
            ratio={`3:2`}
          />
        </CollapsibleContent>

        <CollapsibleContent title={`Section 4`}>
          <h2>LightBox</h2>
          <p>Click on each image below to show the modal.</p>

          <LightBox input={collection} ratio={`3:2`} />
        </CollapsibleContent>

        <div>
          <p>
            Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. Visit
            me at <a href="/">completejavascript.com</a>.
          </p>
        </div>
      </div>
    );
  }
}
```

Trong đó, Collapsible Content Component là một [**Higher-Order Components**](https://reactjs.org/docs/higher-order-components.html) với các thuộc tính là:

- **title ([String](/values-types-va-operators-trong-javascript-phan-2)):** là title của component
- **isActive** (**Boolean**): là biến để xác định xem Component có được active hay không. Nếu **isActive** có giá trị **true** thì Component sẽ hiển thị nội dung dạng mở rộng.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #7 – Collapsible Content. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

<a href="https://about.phamvanlam.com/learn-react-by-example/#/collapsible-content/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!
