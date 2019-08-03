---
date: "2018-11-18T22:30:53Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: hoc-react-qua-vi-du-6-tab-content
title: "Học React qua ví dụ #6: Tab Content"
categories:
  - Thư viện và Framework JavaScript
tags:
  - Create-react-app
  - Học React qua ví dụ
  - React
---

Xin chào bạn đến với Học React qua ví dụ #6. Bài này mình sẽ thực hành React thông qua việc tạo Tab Content. Trước khi bắt đầu, mời bạn theo dõi ví dụ minh họa:

[Xem Demo Tab Content](https://about.phamvanlam.com/learn-react-by-example/#/tab-content/)

Về cơ bản thì phần này khá giống với Tab Gallery, chỉ khác ở chỗ là nội dung ứng với mỗi tab là bất kỳ chứ không phải chỉ mỗi ảnh. Vì vậy, nếu bạn đã theo dõi bài viết về [Tab Gallery](/hoc-react-qua-vi-du-5-tab-gallery/) thì bài này sẽ rất đơn giản. Vì nó hoàn toàn tương tự.

Sau đây sẽ là cách triển khai, mời bạn theo dõi bài viết!

**Bạn chú ý:** Trong series [học React qua ví dụ](/tag/hoc-react-qua-vi-du/) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

## Khởi tạo Project

Trong bài học này, mình vẫn khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app/) để thực hành học React qua ví dụ #6 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages/).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------tab-content/
    --------tab-content.css
    --------tab-content.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```

Trong đó:

- Thư mục **components**: chứa code của các Component. Bài này mình thực hành về **Tab Content** nên mình tạo thêm thư mục **tab-content** bên trong với 2 file **tab-content.js** và **tab-content.css** để định nghĩa cho component **Tab Content** (bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).

- Thư mục **images**: để chứa tất cả những ảnh mình sử dụng cho Demo.

- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component **Tab Content** ở trên.

- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Tab Content Component

### Nội dung file tab-content.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React Component Lifecycle](/tim-hieu-react-component-lifecycle/)

- [Đăng ký và hủy bỏ event](/xu-ly-mot-event-javascript-co-ban/) (**_resize_**).

Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

```js
x;
import React from "react";
import "./tab-content.css";

export default class TabContent extends React.Component {
  constructor(props) {
    super(props);

    // Tạo ra một mảng để lưu ref của các tab content
    this.refTabContents = [];
    this.props.input.forEach(_ => {
      this.refTabContents.push(React.createRef());
    });

    // Mặc định sẽ hiển thị tab đầu tiên, nên this.state.tabIndex = 0
    this.state = {
      tabIndex: 0
    };

    this.changeTabIndex = this.changeTabIndex.bind(this);
    this.updateTabContent = this.updateTabContent.bind(this);
  }

  /**
   * Thay đổi tabIndex khi người dùng thay đổi tab
   */
  changeTabIndex(index) {
    this.setState({
      tabIndex: index
    });
  }

  /**
   * Cập nhật tab content
   *
   * Hàm này sẽ duyệt từng tab content,
   *  + Nếu this.state.tabIndex trùng với index của tab => tab đó được active
   *    => gán maxHeight cho nó bằng với giá trị scrollHeight - độ cao cần thiết
   *    => và gán opacity = 1 để hiển thị nó
   *  + Ngược lại, khi nó không được active
   *    => gán maxHeight cho nó bằng 0.
   *    => mà trong file css mình đã set overflow = hidden nên nó sẽ bị ẩn
   *    => tuy nhiên nó vẫn có padding và border
   *    => nên cần set opacity = 0 để ẩn nốt border đi
   */
  updateTabContent() {
    this.refTabContents.forEach((refTab, index) => {
      const elmTab = refTab.current;

      if (this.state.tabIndex === index) {
        elmTab.style.maxHeight = elmTab.scrollHeight + "px";
        elmTab.style.opacity = "1";
      } else {
        elmTab.style.maxHeight = null;
        elmTab.style.opacity = "0";
      }
    });
  }

  /**
   * Hàm này được gọi khi TabContent được render xong.
   * Khi đó mình sẽ cập nhật TabContent - updateTabContent lần đầu tiên.
   * Sau đó, đăng ký sự kiện khi thay đổi kích thước màn hình,
   * sẽ cập nhật lại TabContent,
   * (thực chất là mình chỉ cập nhật lại maxHeight)
   */
  componentDidMount() {
    this.updateTabContent();
    window.addEventListener("resize", this.updateTabContent);
  }

  /**
   * Hàm này được gọi khi TabContent bị huỷ.
   * Lúc này cần huỷ đăng ký sự kiện resize lúc trước để tránh leak memory
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateTabContent);
  }

  /**
   * Hàm này được gọi mỗi khi this.state.tabIndex thay đổi.
   * Tức là mình cần phải cập nhật lại nội dung của Tab content
   * ứng với từng tab
   */
  componentDidUpdate() {
    this.updateTabContent();
  }

  render() {
    return (
      <div className="lp-tab-content">
        <div className="tab">
          {this.props.input.map((tabContent, index) => {
            return (
              <button
                key={index}
                className={`tab-link ${this.state.tabIndex === index ? "active" : ""}`}
                onClick={() => this.changeTabIndex(index)}
              >
                {tabContent.title}
              </button>
            );
          })}
        </div>

        <div className="tab-content-wrapper">
          {this.props.input.map((tabContent, index) => {
            return (
              <div ref={this.refTabContents[index]} key={index} className={`tab-content`}>
                {tabContent.content}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}
```

### Nội dung file tab-content.css

File này dùng để xác định style cho Tab Content Component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-tab-content **để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2**thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

    <code class="language-css">.lp-tab-content,
    .lp-tab-content * {
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }

    .lp-tab-content {
      width: 100%;
    }

    /* Style the tab */

    .lp-tab-content>.tab {
      overflow: hidden;
      border: 1px solid #ccc;
      background-color: #f1f1f1;
    }

    /* Style the buttons that are used to open the tab content */

    .lp-tab-content>.tab>.tab-link {
      background-color: inherit;
      font-size: 1.05rem;
      float: left;
      border: none;
      outline: none;
      cursor: pointer;
      color: #444;
      border-radius: 0;
      margin: 0;
      padding: 14px 16px;
      transition: background-color 0.3s ease;
      -webkit-transition: background-color 0.3s ease;
      -moz-transition: background-color 0.3s ease;
      -o-transition: background-color 0.3s ease;
    }

    /* Change background color of buttons on hover */

    .lp-tab-content>.tab>.tab-link:hover {
      background-color: #ddd;
    }

    /* Create an active/current tablink class */

    .lp-tab-content>.tab>.tab-link.active {
      background-color: #ccc;
    }

    .lp-tab-content>.tab-content-wrapper{
      position: relative;
      width: 100%;
    }

    /* Style the tab content */

    .lp-tab-content>.tab-content-wrapper>.tab-content {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      padding: 6px 12px;
      background-color: #fff;
      border: 1px solid #ccc;
      border-top: none;
      max-height: 0;
      overflow: hidden;
    }

```

## Sử dụng Tab Gallery component

**./src/App.css**

    <code class="language-css">.App,
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

Trong đây, mình kết hợp Tab Content với các React Component khác mà mình đã làm như: [Slideshow](/hoc-react-qua-vi-du-1-slideshow/), [Modal Image](/hoc-react-qua-vi-du-3-modal-image/) và [Lightbox](/hoc-react-qua-vi-du-4-lightbox/).

```js
x;
import React from "react";
import "./App.css";
import TabContent from "./components/tab-content/tab-content";

// Kết hợp Slideshow trong Tab Content
import Slideshow from "./components/slideshow/slideshow";
import img1 from "./images/01.jpg";
import img2 from "./images/02.jpg";
import img3 from "./images/03.jpg";

// Kết hợp Modal Image trong Tab Content
import ModalImage from "./components/modal-image/modal-image";

// Kết hợp Lightbox trong Tab Content
import LightBox from "./components/lightbox/lightbox";

const collection = [
  { src: img1, caption: "Caption one" },
  { src: img2, caption: "Caption two" },
  { src: img3, caption: "Caption three" }
];

export default class App extends React.Component {
  render() {
    const contents = [
      {
        title: "Section1",
        content: (
          <p>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
        )
      },
      {
        title: "Section2",
        content: (
          <div>
            <h2> Slideshow </h2>
            <Slideshow input={collection} ratio={`3:2`} mode={`manual`} />
          </div>
        )
      },
      {
        title: "Section3",
        content: (
          <div>
            <h2>Image Modal</h2>
            <p>Click the image below to show the modal.</p>
            <ModalImage src={img2} alt={`This is one of beautiful girls`} ratio={`3:2`} />
          </div>
        )
      },
      {
        title: "Section 4",
        content: (
          <div>
            <h2>LightBox</h2>
            <p>Click on each image below to show the modal.</p>

            <LightBox input={collection} ratio={`3:2`} />
          </div>
        )
      }
    ];
    return (
      <div className="App">
        <h2>Tab Content</h2>
        <p>Click on each section to change the tab's content</p>

        <TabContent input={contents} />

        <div>
          <p>
            Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>. Visit me at{" "}
            <a href="/">completejavascript.com</a>.
          </p>
        </div>
      </div>
    );
  }
}
```

Trong đó, Tab Content Component có các thuộc tính là:

- **input ([Array](/javascript-array-co-ban/)):** mảng chứa thông tin các tab, với mỗi phần tử là một [object ](/javascript-object-last-but-not-least/)gồm **title** - tên của tab và **content** - là một react element được viết theo JSX để miêu tả nội dung phần content.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #6 – Tab Content. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

[Xem Demo](https://about.phamvanlam.com/learn-react-by-example/#/tab-content/)

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
