---
date: "2018-12-09T22:30:37Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: hoc-react-qua-vi-du-10-sticky-notes
title: "Học React qua ví dụ #10: Sticky Notes"
categories:
  - Thư viện và Framework JavaScript
tags:
  - Create-react-app
  - Học React qua ví dụ
  - React
---

Xin chào bạn đến với Học React qua ví dụ #10. Bài này mình sẽ thực hành React thông qua việc tạo Sticky Notes. Trước khi bắt đầu, mời bạn theo dõi ví dụ minh họa:

[Xem Demo](https://about.phamvanlam.com/learn-react-by-example/#/sticky-notes/)

Bạn thấy cái này quen không ạ? Nó chính là phần mềm Sticky Notes trên hệ điều hành Windows 7. Thực tế, mình đã xây dựng nó dựa trên [Draggable Note](/hoc-react-qua-vi-du-9-draggable-note/), bằng cách thêm chức năng tạo note mới.

Và sau đây sẽ là cách triển khai, mời bạn theo dõi bài viết!

**Bạn chú ý:** Trong series [học React qua ví dụ](/tag/hoc-react-qua-vi-du/) này, mình sẽ thực hành xây dựng các Component trên cùng một Project. Vì vậy, sẽ có những phần mình lặp lại trong các bài viết. Mục đích của mình là dù bạn có bắt đầu đọc từ bài nào (bài số 1 hay bài số N) thì bạn cũng có thể làm theo được.

## Khởi tạo Project

Trong bài học này, mình vẫn khuyến khích bạn sử dụng [Create-react-app](/tag/create-react-app/) để thực hành học React qua ví dụ #10 ngay trên máy tính của mình.

Để tạo mới một project React với Creat-react-app, bạn có thể tham khảo thêm bài viết: [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages/).

## Cấu trúc Project

Đầu tiên, bạn tạo ra các thư mục và file như sau (bạn chỉ cần quan tâm tới thư mục **/src**):

```
learn-react-by-example/
    --src/
    ----components/
    ------sticky-notes/
    --------sticky-notes.css
    --------sticky-notes.js
    ----images/
    ----App.css
    ----App.js
    ----index.css
    ----index.js
    ----serviceWorker.js
```
Trong đó:

- Thư mục **components**: chứa code của các Component. Bài này mình thực hành về **Sticky Notes** nên mình tạo thêm thư mục **sticky-notes **bên trong với 2 file **sticky-notes\*\***.js** và **sticky-notes\***\*.css** để định nghĩa cho component **Sticky Notes **(bài viết sau thực hành về cái khác thì mình sẽ tạo thêm thư mục vào bên trong **components** như này).

- Thư mục **images**: để chứa tất cả những ảnh mình sử dụng cho Demo.

- Các file **App.css** và **App.js** dùng để demo chính. Bên trong **App.js** mình sẽ sử dụng component **Sticky Notes **ở trên.

- Các file **index.css**, **index.js** và **serviceWorker.js** thì **KHÔNG THAY ĐỔI** với mọi bài thực hành.

## Xây dựng Sticky Note Component

### Nội dung file sticky-note.js

Trong phần này bạn cần phải chú ý đến một số kiến thức như:

- [React.Fragment](https://reactjs.org/docs/fragments.html)

-

[Event.stopPropagation()](https://developer.mozilla.org/en-US/docs/Web/API/Event/stopPropagation)

-

[Spread syntax](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax)

Về nội dung chi tiết mình sẽ giải thích trong phần comment code dưới đây. Bạn chịu khó đọc nhé! Có phần nào chưa hiểu thì có thể để lại bình luận phía dưới.

    ```jsx
import React from 'react';
    import './sticky-notes.css';
    import DraggableNote from '../draggable-note/draggable-note';

    /**
     * Xác định vị trí top, left của 1 element so với document
     * Tham khảo: https://bit.ly/2qBz4KK
     */
    function getOffset(el) {
      const rect = el.getBoundingClientRect(),
        scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
        scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      return { top: rect.top + scrollTop, left: rect.left + scrollLeft }
    }

    export default class StickyNotes extends React.Component {
      constructor(props) {
        super(props);

        // Giá trị khởi tạo cho state của mỗi note
        this.initialStateForEachNote = {
          title: this.props.title || 'Click here to move',
          width: this.props.width || 300,
          height: this.props.height || 300,
          top: this.props.top || 0,
          left: this.props.left || 0,
          content: this.props.content || ''
        }

        /**
         * Biến đếm - đại diện cho id của mỗi note thêm vào,
         * biến này sẽ tăng dần 1 đơn vị mỗi khi thêm một note
         */
        this.count = 0;

        /**
         * khởi tạo state cho Component, với:
         *  + activeId: là giá trị id của note đang được active
         *  + notes: là mảng lưu lại thông tin của các note
         */
        this.state = {
          activeId: this.count,
          notes: [
            this.initNoteData()
          ]
        }

        this.initNoteData = this.initNoteData.bind(this);
        this.onAddNote = this.onAddNote.bind(this);
        this.onRemoveNote = this.onRemoveNote.bind(this);
        this.makeActive = this.makeActive.bind(this);
        this.handleDataChange = this.handleDataChange.bind(this);
      }

      /**
       * Khởi tạo thông tin cho mỗi note mới được tạo lên,
       * với offset là thông tin về vị trí của note hiện tại
       *
       * Mình dựa vào đó để tính vị trí của note mới thêm vào.
       */
      initNoteData(offset) {
        // mỗi lần tạo một note mới thì this.count++
        const noteData = {
          ...this.initialStateForEachNote,
          id: this.count++
        };

        if (offset) {
          noteData.top = offset.top + 20;
          noteData.left = offset.left + 20;
        }

        return noteData;
      }

      /**
       * Xử lý event khi người dùng click vào dấu cộng (+) để thêm note
       */
      onAddNote(event) {
        /**
        * Dừng việc lan truyền event, đảm bảo khi click vào dấu cộng (+)
        * để thêm note mới thì chỉ hàm này được gọi, không lan truyền đến hàm khác
        */
        event.stopPropagation();

        // Lấy vị trí của note hiện tại, từ đó tính toán vị trí của note mới
        const offset = getOffset(event.target);
        const noteData = this.initNoteData(offset);

        // Cập nhật lại state
        this.setState((state) => {
          return {
            activeId: noteData.id,
            notes: [
              ...state.notes,
              noteData
            ]
          }
        })
      }

      /**
       * Xử lý khi người dùng click vào dầu nhân (x) để bỏ note.
       * Trong đó, id là giá trị id - để phân biệt các note.
       */
      onRemoveNote(id) {
        // Nếu hiện tại chỉ có 1 note thì không cho phép xoá note đi
        if (this.state.notes.length === 1) return;

        // Dùng filter lọc lấy các note có id khác với id cần xoá
        this.setState((state) => {
          const remainNotes = [...state.notes].filter((note) => {
            return note.id !== id;
          });

          return {
            activeId: remainNotes[remainNotes.length - 1].id,
            notes: remainNotes
          }
        });
      }

      /**
       * Vì có nhiều note nên chúng có thể chồng lên nhau.
       * Do đó, hàm này nhằm mục đích làm cho một note,
       * ứng với id truyền vào được active - nghĩa là,
       * nó sẽ được hiển thị lên trên so với các note còn lại.
       *
       * Cụ thể là note active sẽ có z-index = 1, các cái còn lại,
       * sẽ có z-index = 0.
       *
       * Ngoài ra, chỉ update state nếu giá trị id mới cần update khác với
       * giá trị hiện tại.
       */
      makeActive(id) {
        if (this.state.activeId !== id) {
          this.setState({
            activeId: id
          });
        }
      }

      /**
       * Hàm này được gọi lên từ mỗi Draggable Note.
       * Khi có một note ứng với id - thay đổi dữ liệu của nó,
       * bao gồm một trong các loại: width, height, top, left, content,
       * thì hàm này được gọi để cập nhật lại state cho component.
       */
      handleDataChange(id, data) {
        this.setState((state) => {
          const newNotes = [...state.notes].map(note => {
            if (note.id === id) {
              if (data.width !== undefined) note.width = data.width;
              if (data.height !== undefined) note.height = data.height;
              if (data.top !== undefined) note.top = data.top;
              if (data.left !== undefined) note.left = data.left;
              if (data.content !== undefined) note.content = data.content;
            }

            return note;
          })

          return {
            notes: newNotes
          }
        });
      }

      render() {
        /**
         * Khác với Draggable bình thường, mỗi note của StickyNotes
         * cần phải có thêm 2 button: (+) để thêm note và (x) để xoá note.
         * Vì vậy, mình cần định nghĩa nó là header -
         * để truyền vào thuộc tính title của DraggableNote
         */
        const header = (title, id) => (
          <div className="lp-sticky-notes-header">
            <span className="add" onClick={this.onAddNote}>+</span>
            <span>{title}</span>
            <span className="remove" onClick={() => this.onRemoveNote(id)}>x</span>
          </div>
        )

        /**
         * Khác với việc sử dụng DraggableNote thông thường,
         * phần này mình có nhiều DragableNote - mà cho phép thêm, xoá note.
         *
         * Vì vậy, mình cần truyền vào;
         *   + id: để phân biệt note
         *   + zIndex: để hiển thị lên top cái note đang được active
         *   + handleDataChange: là hàm callback, để mỗi khi một note thay đổi
         *      thì hàm này sẽ được gọi để cập nhật state.
         */
        return (
          <React.Fragment>
            {
              this.state.notes.map((note, index) => {
                return (
                  <div
                    onClick={() => this.makeActive(note.id)}
                    key={index}
                  >
                    <DraggableNote
                      title={header(note.title, note.id)}
                      width={note.width}
                      height={note.height}
                      top={note.top}
                      left={note.left}
                      content={note.content}
                      zIndex={note.id === this.state.activeId ? 1 : 0}
                      id={note.id}
                      handleDataChange={this.handleDataChange}
                    />
                  </div>
                )
              })
            }
          </React.Fragment>
        )
      }
    }
```

### Nội dung file sticky-notes.css

File này dùng để xác định style cho Sticky Notes Component. Bạn chú ý là mọi thành phần mình đều để trong class **.lp-sticky-notes **để đảm bảo không bị xung đột với các component khác (khi kết hợp các component lại với nhau).

Ngoài ra, mình sử dụng [CSS selector](https://www.w3schools.com/cssref/css_selectors.asp) là **>**. Với ý nghĩa, ví dụ khi mình dùng **element1 > element2 **thì sẽ hiểu style này được áp dụng cho **element2** là con trực tiếp của **element1** mà không phải cháu, chắt,…

    <code class="language-css">.lp-sticky-notes-header,
    .lp-sticky-notes-header * {
      box-sizing: border-box;
      -webkit-box-sizing: border-box;
      -moz-box-sizing: border-box;
    }

    .lp-sticky-notes-header {
      display: flex;
      display: -webkit-flex;
      justify-content: space-between;
    }

    .lp-sticky-notes-header>.add,
    .lp-sticky-notes-header>.remove{
      font-size: 1.1rem;
      opacity: 0.2;
      padding: 0 5px;
      color: #404040;
      transition: opacity 0.6s ease, color 0.6s ease;
      -webkit-transition: opacity 0.6s ease, color 0.6s ease;
      -moz-transition: opacity 0.6s ease, color 0.6s ease;
      -o-transition: opacity 0.6s ease, color 0.6s ease;
    }

    .lp-sticky-notes-header:hover>.add,
    .lp-sticky-notes-header:hover>.remove{
      opacity: 1;
    }

    .lp-sticky-notes-header:hover>.add:hover,
    .lp-sticky-notes-header:hover>.remove:hover {
      color: #222;
      cursor: pointer;
    }
```

## Sử dụng Sticky Notes component

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

    ```jsx
import React from 'react';
    import './App.css';

    import StickyNotes from './components/sticky-notes/sticky-notes';

    export default class App extends React.Component {
      render() {
        return (
          <div className="App">
            <h2>Sticky Notes</h2>
            <div>
              Made by <a href="https://about.phamvanlam.com/">Lam Pham</a>.
              Visit me at <a href="/">completejavascript.com</a>.
            </div>

            <StickyNotes
              title={`Click here to move the note`}
              width={`400`}
              height={`250`}
              top={`150`}
              left={`350`}
              content={''}
            />
          </div>
        );
      }
    }
```

Trong đó, Sticky Notes Component có các thuộc tính là:

- **title ([String](/values-types-va-operators-trong-javascript-phan-2/)):** là title của component.

- **width, height (String hoặc [Number](/values-types-va-operators-trong-javascript-phan-1/)):** lần lượt là chiều rộng và chiều cao của phần tử.

- **top, left (String hoặc Number):** lần lượt là vị trí top và left của phần tử so với window.

- **content (String)**: nội dung mặc định của Sticky Notes đầu tiên.

## Lời kết

Trên đây là kết quả sau khi mình học React qua ví dụ #10 – Sticky Notes. Nếu bạn thấy hay thì có thể thực hành làm thử và tùy biến theo ý thích của bạn.

[Xem Demo](https://about.phamvanlam.com/learn-react-by-example/#/sticky-notes/)

Sắp tới mình sẽ tiếp tục chia sẻ với bạn các bài thực hành của mình. Nếu bạn thấy hay hoặc muốn tìm hiểu về **LOẠI COMPONENT** nào thì có thể để lại bình luận phía dưới nhé!

Còn bây giờ thì xin chào và hẹn gặp lại, thân ái!

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
