---
date: "2018-12-06T22:30:43Z"
update: "2018-12-06T22:30:43Z"
template: "post"
directory: "React"
cover: "../../../images/react/hoc-react-qua-vi-du-9-draggable-note-completejavascript.com_.png"
keywords: "draggable note"
description: "Xin chào bạn đến với Học React qua ví dụ #9. Bài này mình sẽ thực hành React thông qua việc tạo Draggable Note. Mời bạn theo dõi bài viết."
slug: hoc-react-qua-vi-du-9-draggable-note
title: "Học React qua ví dụ #9: Draggable Note"
series: "React: Học react qua ví dụ"
tags:
  - Create-react-app
  - React Component
---

Xin chào bạn đến với Học React qua ví dụ #9. Bài này mình sẽ thực hành React thông qua việc tạo Draggable Note. Trước khi bắt đầu, mời bạn theo dõi ví dụ minh họa:

<a href="https://about.phamvanlam.com/learn-react-by-example/#/draggable-note/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

Thực tế, Draggable Note được phát triển lên từ [Draggable Element](/hoc-react-qua-vi-du-8-draggable-element/). Nghĩa là React Component này cũng có thể di chuyển, thay đổi vị trí được. Ngoài ra, vì là **note**, nên bạn có thể viết text lên đó.

Và sau đây sẽ là cách triển khai, mời bạn theo dõi bài viết!

> **Bạn chú ý:** Trong series [học React qua ví dụ](/tag/react-component/) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

## Khởi tạo Project

Trong bài học này, mình vẫn khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app/) để thực hành học React qua ví dụ #9 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages/).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------draggable-note/
    --------draggable-note.css
    --------draggable-note.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: chứa code của các Component. Bài này mình thực hành về **Draggable Note** nên mình tạo thêm thư mục **draggable-note** bên trong với 2 file **draggable-note.js** và **draggable-note.css** để định nghĩa cho component **Draggable Note** (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).

- Thư mục **images**: để chứa tất cả những ảnh mình sử dụng cho Demo.
- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component **Draggable Note** ở trên.
- Các file **index.css, index.js và serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Draggable Note Component

### Nội dung file draggable-note.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React Component Lifecycle](/tim-hieu-react-component-lifecycle/)
- [Đăng ký và hủy bỏ event](/xu-ly-mot-event-javascript-co-ban/) (**_mousedown, mouseup, mousemove_**).

Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

```jsx:title=draggable-note.js
import React from "react";
import ReactDOM from "react-dom";
import "./draggable-note.css";

/**
 * Cross-browser để xác định clientWidth cho IE8 trở về trước
 * Draggable Note chỉ cho phép di chuyển phần tử
 * ở trong phạm vi màn hình
 */
const maxWidth =
  window.innerWidth ||
  document.documentElement.clientWidth ||
  document.body.clientWidth;

/**
 * Cross-browser để xác định clientHeight cho IE8 trở về trước
 * Draggable Note chỉ cho phép di chuyển phần tử
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
export default class DraggableNote extends React.Component {
  constructor(props) {
    super(props);

    // Bind các phương thức để xử lý drag
    this.dragMouseDown = this.dragMouseDown.bind(this);
    this.elementDrag = this.elementDrag.bind(this);
    this.closeDragElement = this.closeDragElement.bind(this);

    // Bind các phương thức để resize content
    this.resizeMouseDown = this.resizeMouseDown.bind(this);
    this.contentResize = this.contentResize.bind(this);
    this.closeResizeContent = this.closeResizeContent.bind(this);
    this.contentChange = this.contentChange.bind(this);
    this.updateContentSize = this.updateContentSize.bind(this);
  }

  /**
   * Tính lại chiều rộng, cao cho vùng content,
   * chiều rộng của content luôn = 100% giá trị của root
   */
  updateContentSize() {
    this.content.style.width = `${this.root.offsetWidth}px`;

    const height = this.root.offsetHeight - this.header.offsetHeight;
    this.content.style.height = `${height}px`;
  }

  /**
   * Cập nhật khi component update
   */
  componentDidUpdate() {
    this.updateContentSize();
  }

  /**
   * Hàm này được gọi khi component render xong lên màn hình
   */
  componentDidMount() {
    // Lấy ra DOM node của đối tượng root - toàn bộ component
    this.root = ReactDOM.findDOMNode(this);

    // Lấy ra DOM node của content - vùng chứa nội dung
    this.content = this.root.querySelector(".content");

    // Lấy ra DOM node của header - vùng cho phép click chuột để di chuyển
    this.header = this.root.querySelector(".header");

    // update kích thước thực tế cho phần content
    this.updateContentSize();

    // Đăng ký sự kiện khi người dùng click chuột vào header
    this.header.addEventListener("mousedown", this.dragMouseDown);

    /**
     * Đăng ký sự kiện khi người dùng resize textarea,
     * Ở đây, mình phải dùng sự kiện mouseup
     * vì sự kiện resize không bắt được.
     */
    this.content.addEventListener("mousedown", this.resizeMouseDown);
  }

  componentWillUnmount() {
    // Huỷ đăng ký sự kiện khi người dùng click chuột vào header
    this.header.removeEventListener("mousedown", this.dragMouseDown);

    // Huỷ Đăng ký sự kiện khi người dùng resize textarea
    this.content.removeEventListener("mousedown", this.resizeMouseDown);
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

    let left = this.root.style.left;
    let top = this.root.style.top;

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
      left = newLeft;
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
      top = newTop;
    }

    // Cập nhật lại vị trí left, top cho Component
    this.root.style.left = `${left}px`;
    this.root.style.top = `${top}px`;

    /**
     * Nếu người dùng truyền vào hàm handleDataChange,
     * thì mình sẽ gọi để update state ở thằng cha nó
     */
    if (this.props.handleDataChange) {
      this.props.handleDataChange(this.props.id, { left, top });
    }
  }

  /**
   * Hàm này xử lý khi người dùng nhả chuột - ngừng di chuyển,
   * Mình phải huỷ các sự kiện mouseup và mousemove đã đăng ký
   */
  closeDragElement() {
    window.removeEventListener("mouseup", this.closeDragElement);
    window.removeEventListener("mousemove", this.elementDrag);
  }

  /**
   * Xử lý khi người dùng click vào khu vực textarea để resize
   */
  resizeMouseDown() {
    window.addEventListener("mousemove", this.contentResize);
    window.addEventListener("mouseup", this.closeResizeContent);
  }

  /**
   * Hàm này mục đích để kiểm tra phần textarea khi resize,
   * nhưng khi đăng ký sự kiện là mouseup.
   */
  contentResize() {
    const width = this.content.offsetWidth;
    const height = this.content.offsetHeight + this.header.offsetHeight;

    this.root.style.width = `${width}px`;
    this.root.style.height = `${height}px`;

    /**
     * Nếu người dùng truyền vào hàm handleDataChange,
     * thì mình sẽ gọi để update state ở thằng cha nó
     */
    if (this.props.handleDataChange) {
      this.props.handleDataChange(this.props.id, { width, height });
    }
  }

  /**
   * Khi resize kết thúc thì phải huỷ đăng ký các event lúc trước
   */
  closeResizeContent() {
    window.removeEventListener("mouseup", this.closeResizeContent);
    window.removeEventListener("mousemove", this.contentResize);
  }

  /**
   * Xử lý khi nội dung note thay đổi
   */
  contentChange(event) {
    /**
     * Nếu người dùng truyền vào hàm handleDataChange,
     * thì mình sẽ gọi để update state ở thằng cha nó
     */
    if (this.props.handleDataChange)
      this.props.handleDataChange(this.props.id, {
        content: event.target.value,
      });
  }

  render() {
    const title = this.props.title || "Click here to move";
    const elemStyle = {
      width: `${this.props.width || 300}px`,
      height: `${this.props.height || 300}px`,
      top: `${this.props.top || 0}px`,
      left: `${this.props.left || 0}px`,
    };

    /**
     * Set giá trị z-index cho Component nếu người dùng truyền,
     * ngược lại thì để giá trị mặc định mà trình duyệt cấp
     * khi khởi tạo
     */
    if (this.props.zIndex !== undefined) {
      elemStyle.zIndex = this.props.zIndex;
    }

    return (
      <div className="lp-draggable-note" style={elemStyle}>
        <div className="header">{title}</div>
        {this.props.handleDataChange ? (
          <textarea
            className="content"
            value={this.props.content}
            spellCheck="false"
            onChange={this.contentChange}
          />
        ) : (
          <textarea
            className="content"
            defaultValue={this.props.content}
            spellCheck="false"
          />
        )}
      </div>
    );
  }
}
```

### Nội dung file draggable-note.css

File này dùng để xác định style cho Draggable Note Component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-draggable-note** để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2** thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

````css:title=draggable-note.css
.lp-draggable-note,
.lp-draggable-note * {
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
}

/*
  * Thuộc tính quan trọng là ```position: absolute```;
  * Để có thể xét vị trí tuyệt đối khi di chuyển
  */
.lp-draggable-note {
  position: absolute;
  z-index: 9;
  background-color: #f1f1f1;
  border: none;
  text-align: center;
  max-width: 100%;
  max-height: 100%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -webkit-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  -moz-box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.lp-draggable-note > .header {
  padding: 10px;
  cursor: move;
  z-index: 10;
  background-color: #f8f7b6;
  color: #222;
}

.lp-draggable-note > .content {
  padding: 15px;
  background-color: #fdfccf;
  border: none;
  font: normal normal normal 0.9rem/1.6 Nunito Sans, Helvetica, Arial, sans-serif;
}

.lp-draggable-note > .content:focus {
  border: none;
  outline: none;
}
````

## Sử dụng Draggable Note component

```css:title=./src/App.css
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

import DraggableNote from "./components/draggable-note/draggable-note";

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <h2>Draggable Note</h2>
        <div>
          Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. Visit me
          at <a href="/">completejavascript.com</a>.
        </div>

        <DraggableNote
          title={`Click here to move the note`}
          width={`400`}
          height={`250`}
          top={`150`}
          left={`350`}
          content={""}
        />
      </div>
    );
  }
}
```

Trong đó, Draggable Note Component có các thuộc tính là:

- **title ([String](/kieu-du-lieu-trong-javascript/)):** là title của component.
- **width, height (String hoặc [Number](/kieu-du-lieu-trong-javascript/)):** lần lượt là chiều rộng và chiều cao của phần tử.
- **top, left (String hoặc Number):** lần lượt là vị trí top và left của phần tử so với window.
- **content (String)**: nội dung mặc định của Draggable Note.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #9 – Draggable Note. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

<a href="https://about.phamvanlam.com/learn-react-by-example/#/draggable-note/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!
