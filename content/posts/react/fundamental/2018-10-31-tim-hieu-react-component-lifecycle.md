---
date: "2018-10-31T22:30:03Z"
template: "post"
directory: "React"
cover: "../images/tim-hieu-react-component-lifecycle-completejavascript.com_.png"
keywords: "react component lifecycle"
description: "Bạn có biết các phương thức trong React Component Lifecycle hay chưa? Chúng được gọi khi nào và chúng được sử dụng để làm gì?"
slug: tim-hieu-react-component-lifecycle
title: "Tìm hiểu React Component Lifecycle"
tags:
  - React Lifecycle
---

Khi học và tìm hiểu về React Component, có lẽ bạn đã đôi lần nhìn thấy các phương thức như _componentDidMount(), componentDidUpdate(), componentWillUnmount(),..._ Chúng được gọi là các "React lifecycle methods" - các phương thức trong vòng đời của React Component. Chúng cho phép bạn **override** để thực hiện một số nhiệm vụ nhất định. Do đó, việc hiểu và biết cách sử dụng các phương thức này là vô cùng quan trọng. Vì vậy, bài viết này mình sẽ đi vào tìm hiểu về React Component Lifecycle. Hay nói ngắn gọn hơn là "React Lifecycle".

**Mục đích của bài viết:**

- Biết các phương thức trong React Component Lifecycle.
- Biết khi nào các phương thức này được gọi.
- Và ứng dụng các React lifecycle methods này trong trường hợp nào.

## Các phương thức trong React Component Lifecycle

Các phương thức trong React Component Lifecycle có thể chia ra làm 3 pha chính là: **Mounting**, **Updating** và **Unmounting**.

![Sơ đồ các phương thức chính của React Component Lifecycle](../images/react-lifecycle-diagram.png)

### Các phương thức trong pha Mounting

Mounting là giai đoạn khi React Component được tạo ra và render lên trên [DOM](/co-ban-ve-dom-javascript) tree.

Các React lifecycle methods được gọi trong giai đoạn này lần lượt là:

- constructor()
- static getDerivedStateFromProps()
- render()
- componentDidMount()

Trong đó, phương thức *render()* **BẮT BUỘC** phải có; phương thức  [getDerivedStateFromProps()](https://reactjs.org/docs/react-component.html#static-getderivedstatefromprops) ít khi sử dụng; phương thức _constructor()_ và _componentDidMount()_ thường xuyên được sử dụng - nhưng không bắt buộc.

Vì vậy, dưới đây mình sẽ chỉ trình bày về các React lifecycle methods quan trọng và hay sử dụng.

#### Phương thức constructor()

Đối với class nói chung, **constructor()** luôn là phương thức được gọi đến **ĐẦU TIÊN** mỗi khi [khởi tạo](/js-pattern-constructor-pattern). Tuy nhiên, bạn chỉ nên sử dụng phương thức này với 2 mục đích:

- Khởi tạo state cho React Component.

* [Bind](/phan-biet-call-apply-va-bind-trong-javascript) method (xử lý event, sử dụng trong [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) hoặc [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)) với **this**.

Ngược lại thì bạn có thể bỏ qua phương thức này, ví dụ:

```jsx
constructor(props) {
  super(props);
  this.state = { count: 0 };
  this.updateCounter = this.updateCounter.bind(this);
}
```

Trong đó:

- Component bạn khai báo [kế thừa](/ke-thua-co-ban-trong-javascript) từ React.Component, nên bạn cần phải gọi hàm *super(props)* để gọi đến hàm khởi tạo của thằng cha React.Component. Nếu thiếu thì *this.props* sẽ là **undefined**.
- <code>this.state = { count: 0 }</code>: khởi tạo biến thuộc state là: **count = 0**.
- Cuối cùng, *this.updateCounter* là hàm được sử dụng trong _setInterval_ mà mình sẽ sử dụng trong ví dụ dưới. Mình cần phải **bind** phương thức này với **this** - là tham chiếu đến đối tượng Component hiện tại.

#### Phương thức render()

Đây là phương thức duy nhất **bắt buộc** phải có đối với React Component và có cấu trúc như sau:

```jsx
render() {
  return (
    /* Định nghĩa cấu trúc Component tại đây */
  )
}
```

Phương thức này dùng để miêu tả cấu trúc của Component sau khi nó được chèn vào DOM tree. Nó bắt buộc được gọi lần đầu tiên để chèn Component vào [HTML](/tag/html), và có thể được gọi lại để cập nhật giao diện mỗi khi state của Component thay đổi.

Đặc biệt, bạn nên để phương thức này là **Pure Function** - nghĩa là nó không làm thay đổi state của Component, không tương tác với trình duyệt, không lấy dữ liệu từ server,...

Chỉ đơn giản là nó lấy data từ **this.props** và **this.state** để xây dựng và cập nhật giao diện.

#### Phương thức componentDidMount()

Phương thức *componentDidMount()* được gọi **một lần duy nhất** ngay sau khi Component được render xong. Và nếu để so sánh với [JavaScript thuần](/javascript) thì mình thấy phương thức này khá giống với việc bạn đăng ký sự kiện [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/Events/DOMContentLoaded).

Chính vì tính chỉ được gọi **một lần duy nhất** nên bên trong phương thức này, mình có thể:

- Lấy dữ liệu từ server để cập lại state cho Component.
- Định nghĩa interval thông qua *setInterval* để thực hiện một số nhiệm vụ lặp lại.
- Lấy thông tin liên quan đến DOM node như kích thước thực tế (width, height) - vì lúc này chúng đã được hiển thị lên màn hình.
- Đăng ký [sự kiện](/xu-ly-mot-event-javascript-co-ban): *resize, scroll,...*

Hết phương thức này, nghĩa là mình đã xử lý xong trong pha Mounting. Có 3 phương thức **quan trọng** mà bạn cần nhớ là:

- constructor()
- render()
- componentDidMount()

Tiếp theo, mình sẽ xử lý việc cập nhật giao diện trong pha Updating.

![Sơ đồ đầy đủ các phương thức của React Component Lifecycle (sưu tầm)](../images/react-lifecycle-diagram-full.png)

_Sơ đồ đầy đủ các phương thức của React Component Lifecycle (sưu tầm)_

### Các phương thức trong pha Updating

Updating là giai đoạn khi React Component cần cập nhật giao diện mỗi khi **props** hoặc **state** của nó thay đổi.

Các React lifecycle methods được gọi trong giai đoạn này lần lượt là:

- static getDerivedStateFromProps()
- shouldComponentUpdate()
- render()
- getSnapshotBeforeUpdate()
- componentDidUpdate()

Trong đó, phương thức _render()_ là bắt buộc và đã được trình bày ở phần trước; phương thức _getDerivedStateFromProps()_, _shouldComponentUpdate()_ và _getSnapshotBeforeUpdate()_ ít khi được sử dụng; phương thức _componentDidUpdate()_ thường xuyên được sử dụng nên mình sẽ trình bày ở phía dưới.

#### Phương thức render() vả shouldComponentUpdate()

Như mình đã nói ở trên, phương thức _render()_ trong pha **Updating** có thể được gọi hoặc không, phụ thuộc vào phương thức _shouldComponentUpdate()_.

Mặc định, phương thức _shouldComponentUpdate()_ sẽ trả về **true**. Nghĩa là mỗi khi bạn gọi phương thức _this.setState_ để cập nhật **state** của Component thì _render()_ sẽ được gọi lại để cập nhật giao diện.

Tuy nhiên, sẽ có trường hợp dù bạn gọi lại _this.setState_, nhưng giá trị của **state** vẫn **không thay đổi**. Khi đó, việc gọi lại hàm _render()_ là vô nghĩa.

Trong ví dụ phía trên, giả sử bạn chủ động gọi hàm _this.setState_ để cập nhật giá trị của biến **count**, nhưng giá trị mới vẫn là 0 - bằng giá trị ban đầu.

```jsx
this.setState({
  count: 0,
});
```

Lúc này, phương thức _render()_ mặc định sẽ bị gọi lại, nhưng như vậy chẳng phải là vô nghĩa hay sao?

Tuy nhiên, nếu bạn định nghĩa thêm phương thức _shouldComponentUpdate()_ như này:

```jsx
shouldComponentUpdate(nextProps, nextState) {
  return nextState.count !== this.state.count;
}
```

thì phương thức _render()_ sẽ không bị gọi lại nữa.

Bởi vì, _nextState.count_ và _this.state.count_ lúc này đều bằng 0, nên <code>nextState.count !== this.state.count</code> sẽ trả về **false**. Suy ra, hàm _render()_ sẽ không bị gọi lại. Hay nói tổng quát hơn là: phương thức _render()_ chỉ bị gọi lại khi **props** hoặc **state** mới **có giá trị khác** so với hiện tại.

Tuy nhiên, nếu không quá quan trọng về [hiệu năng](/tag/performance) thì bạn có thể bỏ qua phương thức _shouldComponentUpdate()_.

#### Phương thức componentDidUpdate()

Phương thức này được gọi sau khi việc update kết thúc - component với những dữ liệu mới đã được cập nhật xong lên giao diện. Trong phương thức này, bạn có thể xử lý việc lấy dữ liệu từ server, ví dụ:

```jsx
componentDidUpdate(prevProps) {
  if (this.props.userID !== prevProps.userID) {
    this.fetchData(this.props.userID);
  }
}
```

Tức là nếu giá trị của props _userID_ thay đổi thì bạn sẽ lấy dữ liệu từ server xuống và làm một số thứ sau đó. Ở đây, bạn cần chú ý điều kiện trong _if_. Nếu không có điều kiện này thì việc _this.fetchData_ từ server xuống vẫn được thực hiện dù cho giá trị _userID_ không thay đổi.

Ngoài ra, bạn cũng có thể xử lý DOM node trong phương thức này, ví dụ như: ẩn hiện 1 phần tử, thay đổi width/height của nó để phù hợp với dữ liệu mới,...

Hoặc thậm chí bạn cũng có thể thay đổi state của Component tại đây. Nhưng phải cẩn thận với điều này vì: khi bạn gọi _this.setState_ thì _componentDidUpdate()_ lại được gọi. Nếu bạn không xử lý điều kiện **if else** hợp lý thì rất có thể vòng lặp vô hạn sẽ xảy ra.

Tóm lại trong pha Updating này có 3 phương thức bạn cần chú ý là:

- shouldComponentUpdate()
- render()
- componentDidUpdate()

### Phương thức trong pha Unmouting - componentWillUnmount()

Unmounting là giai đoạn khi React Component bị xoá khỏi DOM tree.

Trong giai đoạn này, chỉ có một phương thức được gọi duy nhất là: _componentWillUnmount()_.

Phương thức này tương ứng với phương thức _componentDidMount()_ trong giai đoạn Mounting. Nghĩa là phương thức này cũng chỉ được gọi **1 lần duy nhất**. Và quan trọng là những thứ bạn khởi tạo, đăng ký ở _componentDidMount()_ thì bạn phải xoá, huỷ đăng ký trong phương thức _componentWillUnmount()_.

Giả sử mình khởi tạo Interval và đăng ký sự kiện **resize** bên trong _componentDidMount()_:

```jsx
this.counterInterval = setInterval(this.updateCounter, 1000);
window.addEventListener("resize", this.updateDimensions);
```

Thì sau đó, mình phải xoá interval và huỷ đăng ký sự kiện _resize_ trong _componentWillUnmount()_:

```jsx
window.removeEventListener("resize", this.updateDimensions);
clearInterval(this.counterInterval);
```

## Ví dụ minh hoạ

<a href="https://about.phamvanlam.com/demo/understand-react-component-lifecycle/" class="btn btn-primary margin-bottom">
  Xem Demo React Component Lifecycle
</a>

Giả sử mình xây dựng **Counter Component** như sau.

### Code demo về React Component Lifecycle

_index.html_

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta http-equiv="X-UA-Compatible" content="ie=edge" />
    <title>Understand React Component Lifecycle</title>
    <script src="https://unpkg.com/react@16/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@16/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>
    <link href="../main.css" rel="stylesheet" />
    <style>
      main {
        width: 100%;
        max-width: 640px;
        margin: auto;
        padding: 15px;
      }
    </style>
  </head>

  <body>
    <main>
      <h3>Understand React Component Lifecycle</h3>
      <div id="container"></div>
    </main>
    <script src="main.js" type="text/babel"></script>
  </body>
</html>
```

_main.js_

```jsx
class Counter extends React.Component {
  /**
   * Hàm constructor - dùng để khai báo state và bind function
   */
  constructor(props) {
    /*
     * Gọi hàm super(props) để tham chiếu đến hàm khởi tạo của React.Component,
     * để đảm bảo this.props không bị undefined
     */
    super(props);

    // Khai báo state là count với giá trị ban đầu là 0
    this.state = {
      count: 0,
    };

    /*
     * Bind hàm updateCounter với this,
     * hàm này được sử dụng trong 1 interval
     * để tăng biến đếm state - count lên 1 đơn vị sau mỗi 1 giây
     */
    this.updateCounter = this.updateCounter.bind(this);
    console.log("constructor");
  }

  /**
   * Phương thức này được gọi sau khi Counter Component được render xong.
   * Trong đây, mình khởi tạo một interval thông qua phương thức setInterval.
   *
   * Vì bên trên, mình đã bind this.updateCounter với this rồi,
   * nên ở đây mình truyền thẳng.
   *
   * Ngược lại, nếu bên trên không bind nó với this thì mình phải sửa lại thành:
   *
   *   + this.counterInterval = setInterval(this.updateCounter.bind(this), 1000);
   *   + Hoặc: this.counterInterval = setInterval(() => this.updateCounter(), 1000);
   */
  componentDidMount() {
    this.counterInterval = setInterval(this.updateCounter, 1000);
    console.log("componentDidMount");
  }

  /**
   * Trong hàm này mình sẽ sử dụng phương thức this.setState,
   * để tăng giá trị của this.state.count lên 1 đơn vị.
   *
   * Giả sử, bên trên mình không bind updateCounter với this,
   * cũng không sử dụng arrow function,
   * thì bên trong hàm này, this sẽ không phải là Counter Component,
   * tức this.state là undefined => bị sai.
   */
  updateCounter() {
    this.setState({
      count: this.state.count + 1,
    });
  }

  /**
   * Phương thức này được gọi mỗi khi hàm this.setState được gọi,
   * để cập nhật lại giao diện.
   *
   * Trong hàm này, mình cũng kiểm tra khi nào giá trị state count = 5
   * thì mình sẽ xoá Component này khỏi DOM tree
   * để test phương thức componentWillUnmount
   */
  componentDidUpdate(prevProps, prevState) {
    console.log(
      `componentDidUpdate: count from ${prevState.count} to ${this.state.count}`
    );
    if (this.state.count === 5) {
      ReactDOM.unmountComponentAtNode(document.querySelector("#container"));
    }
  }

  /**
   * Phương thức này được gọi khi Component bị xoá khỏi DOM tree.
   * Trong đây, mình sẽ xoá interval đã đăng ký từ componentDidMount,
   * thông qua phương thức clearInterval.
   */
  componentWillUnmount() {
    console.log("componentWillUnmount");
    clearInterval(this.counterInterval);
  }

  /**
   * Phương thức render sử dụng giá trị this.state.count để in lên màn hình.
   */
  render() {
    console.log(`render: count = ${this.state.count}`);

    return <div style={{ fontSize: `2rem` }}>{this.state.count}</div>;
  }
}

// Render Counter Component lên DOM tree
ReactDOM.render(<Counter />, document.querySelector("#container"));
```

### Kết quả

Nếu bạn chạy ví dụ Demo và mở **console** trên **DevTool** lên (sử dụng phím tắt **Ctrl + Shift + I** hoặc **F12**), thì sẽ thấy kết quả hiển thị như sau:

```
main.js:19 constructor
main.js:56 render: count = 0
main.js:40 componentDidMount
main.js:56 render: count = 1
main.js:44 componentDidUpdate: count from 0 to 1
main.js:56 render: count = 2
main.js:44 componentDidUpdate: count from 1 to 2
main.js:56 render: count = 3
main.js:44 componentDidUpdate: count from 2 to 3
main.js:56 render: count = 4
main.js:44 componentDidUpdate: count from 3 to 4
main.js:56 render: count = 5
main.js:44 componentDidUpdate: count from 4 to 5
main.js:51 componentWillUnmount
```

Trong đó, pha Mounting ứng với 3 dòng đầu tiên. Suy ra, thứ tự các React lifecycle methods là:

```
main.js:19 constructor                           # constructor()
main.js:56 render: count = 0                     # render()
main.js:40 componentDidMount                     # componentDidMount();
```

Tiếp theo, pha Updating:

```
main.js:56 render: count = 1                     # render()
main.js:44 componentDidUpdate: count from 0 to 1 # componentDidUpdate()
main.js:56 render: count = 2                     # render()
main.js:44 componentDidUpdate: count from 1 to 2 # componentDidUpdate()
main.js:56 render: count = 3                     # render()
main.js:44 componentDidUpdate: count from 2 to 3 # componentDidUpdate()
main.js:56 render: count = 4                     # render()
main.js:44 componentDidUpdate: count from 3 to 4 # componentDidUpdate()
main.js:56 render: count = 5                     # render()
main.js:44 componentDidUpdate: count from 4 to 5 # componentDidUpdate()
```

Cuối cùng, pha Unmounting:

```
main.js:51 componentWillUnmount                  # componentWillUnmount()
```

## Lời kết

Trên đây là một số kiến thức cơ bản mà mình đã tìm hiểu về React Component Lifecycle. Trước khi kết thúc bài viết, mình xin nhắc lại các React Lifecycle Methods quan trọng mà bạn cần quan tâm là:

- Mounting:
  - constructor()
  - render()
  - componentDidMount()
- Updating:
  - shouldComponentUpdate()
  - render()
  - componentDidUpdate()
- Mounting:
  - componentWillUnmount()

Nếu có phần nào khó hiểu, bạn có thể để lại bình luận xuống phía dưới nhé! Mình sẽ cố gắng giải đáp. Xin chào và hẹn gặp lại, thân ái!

**Tham khảo:**

- [React.Component](https://reactjs.org/docs/react-component.html)
- [React Lifecycle Methods Diagram](http://projects.wojtekmaj.pl/react-lifecycle-methods-diagram/)
- [The Component Lifecycle](https://www.kirupa.com/react/component_lifecycle.htm)
