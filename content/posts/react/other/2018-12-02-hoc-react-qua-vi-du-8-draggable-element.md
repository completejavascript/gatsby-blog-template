---
date: "2018-12-02T22:30:04Z"
template: "post"
directory: "React"
cover: "../images/hoc-react-qua-vi-du-8-draggable-element-completejavascript.com_.png"
keywords: "draggable element"
description: "Xin chào bạn đến với Học React qua ví dụ #8. Bài này mình sẽ thực hành React thông qua việc tạo Draggable Element. Mời bạn theo dõi bài viết."
slug: hoc-react-qua-vi-du-8-draggable-element
title: "Học React qua ví dụ #8: Draggable Element"
tags:
  - Create-react-app
  - React Component
---

Xin chào bạn đến với Học React qua ví dụ #8. Bài này mình sẽ thực hành React thông qua việc tạo Draggable Element. Trước khi bắt đầu, mời bạn theo dõi ví dụ minh họa:

<a href="https://about.phamvanlam.com/learn-react-by-example/#/draggable-element/" class="btn btn-primary margin-bottom">
  Xem Demo Draggable Element
</a>

Như bạn thấy đó, Draggable Element nghĩa là **phần tử có thể kéo đi, thay đổi vị trí được**. Như vậy, ý tưởng để giải quyết bài toán này rất đơn giản, đó là:

- Bắt sự kiện click chuột vào phần tử
- Tính toán khoảng cách khi người dùng di chuột
- Cập nhật lại vị trí của phần tử dựa vào tính toán trên

Và sau đây sẽ là cách triển khai, mời bạn theo dõi bài viết!

> **Bạn chú ý:** Trong series [học React qua ví dụ](/tag/react-component) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

## Khởi tạo Project

Trong bài học này, mình vẫn khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app) để thực hành học React qua ví dụ #8 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------draggable-element/
    --------draggable-element.css
    --------draggable-element.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: chứa code của các Component. Bài này mình thực hành về  **Draggable Element** nên mình tạo thêm thư mục **draggable-element** bên trong với 2 file **draggable-element.js** và **draggable-element.css** để định nghĩa cho component **Draggable Element** (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).
- Thư mục **images**: để chứa tất cả những ảnh mình sử dụng cho Demo.
- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component **Draggable Element** ở trên.
- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Draggable Element Component

### Nội dung file draggable-element.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React Component Lifecycle](/tim-hieu-react-component-lifecycle)
- [Đăng ký và hủy bỏ event](/xu-ly-mot-event-javascript-co-ban) (**_mousedown, mouseup, mousemove_**).

Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

```jsx
import React from "react";
import ReactDOM from "react-dom";
import "./draggable-element.css";

// Kiểm tra xem 1 element có vượt quá chiều rộng của container không
const isOverflowedX = (elm) => elm.scrollWidth > elm.clientWidth;

// Kiểm tra xem 1 element có vượt quá chiều cao của container không
const isOverflowedY = (elm) => elm.scrollHeight > elm.clientHeight;

/**
 * Nếu 1 element có chiều rộng vượt quá container,
 * thì sẽ thêm scrollbar theo chiều X
 */
const addScrollbarXIfNeeded = (elm) => {
  if (isOverflowedX(elm)) elm.style.setProperty("overflow-x", "scroll");
  else elm.style.setProperty("overflow-x", "initial");
};

/**
 * Nếu 1 element có chiều cao vượt quá container,
 * thì sẽ thêm scrollbar theo chiều Y
 */
const addScrollbarYIfNeeded = (elm) => {
  if (isOverflowedY(elm)) elm.style.setProperty("overflow-y", "scroll");
  else elm.style.setProperty("overflow-y", "initial");
};

/**
 * Cross-browser để xác định clientWidth cho IE8 trở về trước
 * Draggable Element chỉ cho phép di chuyển phần tử
 * ở trong phạm vi màn hình
 */
const maxWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

/**
 * Cross-browser để xác định clientHeight cho IE8 trở về trước
 * Draggable Element chỉ cho phép di chuyển phần tử
 * ở trong phạm vi màn hình
 */
const maxHeight =
  window.innerHeight ||
  document.documentElement.clientHeight ||
  document.body.clientHeight;

/**
 * React Component cho phép di chuyển 1 phần tử
 * trong phạm vi màn hình.
 * Hiện tại chỉ support di chuyển trên Desktop,
 * chưa support trên điện thoại
 */
export default class DraggableElement extends React.Component {
  constructor(props) {
    super(props);

    // Bind các phương thức để sử dụng phía dưới
    this.dragMouseDown = this.dragMouseDown.bind(this);
    this.elementDrag = this.elementDrag.bind(this);
    this.closeDragElement = this.closeDragElement.bind(this);
  }

  /**
   * Hàm này được gọi khi component render xong lên màn hình
   */
  componentDidMount() {
    // Lấy ra DOM node của đối tượng root - toàn bộ component
    this.root = ReactDOM.findDOMNode(this);

    // Lấy ra DOM node của content - vùng chứa nội dung
    this.content = this.root.querySelector(".content");

    /**
     * Lấy ra DOM node của header - vùng cho phép click chuột
     * để di chuyển
     */
    this.header = this.root.querySelector(".header");

    /**
     * Tính lại chiều cao cho vùng content,
     * chiều rộng của content luôn = 100% giá trị của root
     */
    const height = this.root.offsetHeight - this.header.offsetHeight;
    this.content.style.height = `${height}px`;

    /**
     * Sau đó, thêm scrollbar vào content,
     * nếu nội dung vượt quá kích thước của vùng
     */
    addScrollbarXIfNeeded(this.content);
    addScrollbarYIfNeeded(this.content);

    // Đăng ký sự kiện khi người dùng click chuột vào header
    this.header.addEventListener("mousedown", this.dragMouseDown);
  }

  componentWillUnmount() {
    // Huỷ đăng ký sự kiện khi người dùng click chuột vào header
    this.header.removeEventListener("mousedown", this.dragMouseDown);
  }

  /**
   * Hàm này xử lý khi người dùng click chuột vào header,
   * do đó đối số e - tương ứng với đối tượng MouseEvent
   */
  dragMouseDown(e) {
    // Huỷ bỏ tất cả các xử lý mặc định, nếu có
    e.preventDefault();

    /**
     * Lấy ra vị trí click chuột đầu tiên,
     * Mục đích là khi người dùng di chuyển,
     * mình sẽ tính vị trí chuột mới.
     * Sau đó, lấy giá vị trí mới trừ đi giá trị vị trí cũ,
     * sẽ tính được khoảng di chuyển của chuột
     * => cập nhật lại toạ độ cho Component
     */
    this.startX = e.clientX;
    this.startY = e.clientY;

    // Đăng ký sự kiện mousemove, để xử lý khi di chuyển chuột
    window.addEventListener("mousemove", this.elementDrag);

    /**
     * Đăng ký sự kiện mouseup, để xử lý khi người dùng nhả chuột.
     * Lúc này, đồng nghĩa với việc dừng di chuyển Component.
     */
    window.addEventListener("mouseup", this.closeDragElement);
  }

  /**
   * Xử lý khi người dùng đã click chuột vào header của component
   * và đang di chuyển => đối số e - là MouseEvent
   */
  elementDrag(e) {
    // Huỷ bỏ tất cả các xử lý mặc định, nếu có
    e.preventDefault();

    /**
     * Lúc này, mình cũng tính được vị trí của chuột hiện tại,
     * chính là e.clientX và e.clientY.
     * Sau đó, lấy giá trị cũ (this.startX, this.startY) trừ đi
     * giá trị mới là tính được khoảng di chuyển.
     */
    const deltaX = this.startX - e.clientX;
    const deltaY = this.startY - e.clientY;

    // Tính toán vị trí top, left, right, bottom mới của component
    const newTop = this.root.offsetTop - deltaY;
    const newLeft = this.root.offsetLeft - deltaX;
    const newRight = newLeft + this.root.offsetWidth;
    const newBottom = newTop + this.root.offsetHeight;

    /**
     * Kiểm tra thử xem ứng với vị trí mới này,
     * component có nằm trong chiều rộng màn hình không,
     * Nếu có, thì mới cập nhật vị trí mới
     */
    if (
      newLeft >= 0 &&
      newLeft <= maxWidth &&
      newRight >= 0 &&
      newRight <= maxWidth
    ) {
      this.startX = e.clientX;
      this.root.style.left = `${newLeft}px`;
    }

    /**
     * Kiểm tra thử xem ứng với vị trí mới này,
     * component có nằm trong chiều cao màn hình không,
     * Nếu có, thì mới cập nhật vị trí mới
     */
    if (
      newTop >= 0 &&
      newTop <= maxHeight &&
      newBottom >= 0 &&
      newBottom <= maxHeight
    ) {
      this.startY = e.clientY;
      this.root.style.top = `${newTop}px`;
    }
  }

  /**
   * Hàm này xử lý khi người dùng nhả chuột - ngừng di chuyển,
   * Mình phải huy các sự kiện mouseup và mousemove đã đăng ký
   */
  closeDragElement() {
    window.removeEventListener("mouseup", this.closeDragElement);
    window.removeEventListener("mousemove", this.elementDrag);
  }

  render() {
    const title = this.props.title || "Click here to move";
    const elemStyle = {
      width: `${this.props.width || 300}px`,
      height: `${this.props.height || 300}px`,
      top: `${this.props.top || 0}px`,
      left: `${this.props.left || 0}px`,
    };

    return (
      <div className="lp-draggable-element" style={elemStyle}>
        <div className="header">{title}</div>
        <div className="content">{this.props.children}</div>
      </div>
    );
  }
}
```

### Nội dung file draggable-element.css

File này dùng để xác định style cho Draggable Element Component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-draggable-element** để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2** thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

````css
.lp-draggable-element,
.lp-draggable-element * {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

/*
* Thuộc tính quan trọng là ```position: absolute```;
* Để có thể xét vị trí tuyệt đối khi di chuyển
*/
.lp-draggable-element {
  position: absolute;
  z-index: 9;
  background-color: #f1f1f1;
  border: 1px solid #d3d3d3;
  text-align: center;
  max-width: 100%;
  max-height: 100%;
}

.lp-draggable-element > .header {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #2196f3;
  color: #fff;
}

.lp-draggable-element > .content {
  padding: 15px;
}
````

## Sử dụng Draggable Element component

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

Trong đây mình có kết hợp Draggable Element với các React Component khác mà mình đã làm như: [Modal Image](/hoc-react-qua-vi-du-3-modal-image), [Slideshow](/hoc-react-qua-vi-du-1-slideshow).

```jsx
import React from "react";
import "./App.css";

import DraggableElement from "./components/draggable-element/draggable-element";

// Kết hợp Modal Image trong DraggableElement
import ModalImage from "./components/modal-image/modal-image";

// Kết Slideshow trong DraggableElement
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
        <h2>Draggable Element</h2>
        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. Visit me
          at <a href="/">completejavascript.com</a>.
        </div>

        <DraggableElement
          title={`Click here to move`}
          width={`400`}
          height={`250`}
          top={`150`}
          left={`200`}
        >
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris, nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </DraggableElement>

        <DraggableElement
          title={`Click here to move`}
          width={`400`}
          height={`450`}
          top={`350`}
          left={`300`}
        >
          <h3>Slideshow</h3>
          <Slideshow input={collection} ratio={`3:2`} mode={`manual`} />
        </DraggableElement>

        <DraggableElement
          title={`Click here to move`}
          width={`400`}
          height={`400`}
          top={`150`}
          left={`800`}
        >
          <h3>Modal Image</h3>
          <ModalImage
            src={img6}
            alt={`This is one of beautiful girls`}
            ratio={`3:2`}
          />
        </DraggableElement>
      </div>
    );
  }
}
```

Trong đó, Draggable Element Component là một [**Higher-Order Components**](https://reactjs.org/docs/higher-order-components.html) với các thuộc tính là:

- **title ([String](/values-types-va-operators-trong-javascript-phan-2)):** là title của component.
- **width, height (String hoặc [Number](/values-types-va-operators-trong-javascript-phan-1)):** lần lượt là chiều rộng và chiều cao của phần tử.
- **top, left (String hoặc Number):** lần lượt là vị trí top và left của phần tử so với window.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #8 – Draggable Element. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

<a href="https://about.phamvanlam.com/learn-react-by-example/#/draggable-element/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!
