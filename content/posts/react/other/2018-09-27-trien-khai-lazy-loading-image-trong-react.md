---
date: "2018-09-27T12:30:31Z"
update: "2018-09-27T12:30:31Z"
template: "post"
directory: "React"
cover: "../../../images/react/trien-khai-lazy-loading-image-trong-react-completejavascript.com_-1.png"
keywords: "triển khai Lazy Loading Image trong React"
description: "Lazy Loading Image là một phương pháp rất hay. Vì vậy, bài viết này sẽ giúp bạn hiểu được tư tưởng chính và cách triển khai Lazy Loading Image trong React."
slug: trien-khai-lazy-loading-image-trong-react
title: "Triển khai Lazy Loading Image trong React"
series: "React: Học react qua ví dụ"
tags:
  - Create-react-app
  - Performance
---

Đối với hầu hết các trang web thì ảnh là thứ không thể thiếu. Tuy nhiên, nếu ảnh có kích thước và dung lượng lớn, mà ta lại load ảnh theo cách thông thường thì sẽ dẫn đến ảnh load bị chậm, làm phá vỡ cấu trúc giao diện. Điều này làm giảm trải nghiệm của người dùng. Để khắc phục tình trạng này, người ta thường sẽ sử dụng phương pháp _**Lazy Loading Image**_. Vậy _Lazy Loading Image_ là gì và cách triển khai Lazy Loading Image trong React như thế nào?

Mời bạn theo dõi bài viết!

## Tư tưởng chính của phương pháp Lazy Loading Image

Về cơ bản, phương pháp Lazy Loading Image gồm các bước sau:

- **Bước 1**: Sử dụng ảnh đơn sắc, hoặc ảnh đã làm mờ đóng vai trò là _place holder_ (giữ chỗ). Vì những ảnh này có kích thước rất nhỏ (cỡ 200 byte là đủ) nên sẽ được load rất nhanh. Do đó, giao diện chương trình sẽ không bị vỡ.
- **Bước 2**: Kiểm tra các phần tử [DOM](/co-ban-ve-dom-javascript/) liên quan đến hình ảnh xem nó có ở trên viewport (phạm vi màn hình) hay không. Nếu có thì sẽ load ảnh gốc một cách bất đồng bộ. Sau khi load ảnh xong thì mới set lại ảnh gốc đó cho phần tử DOM.
- **Bước 3**:Trong quá trình [scroll màn hình](/smooth-scrolling-trang-web-voi-jquery/), thực hiện lại **Bước 2** cho đến khi tất cả các ảnh gốc được load hết thì thôi.

Tư tưởng chính là vậy. Bây giờ, mình sẽ bắt đầu triển khai Lazy Loading Image trong React.

`youtube: https://www.youtube.com/watch?v=zOn-8mazuJ8`

## Triển khai Lazy Loading Image trong React

### Chuẩn bị ảnh Place Holder

Bạn có thể sử dụng bất kì công cụ chỉnh sửa ảnh nào để tạo ảnh này. Còn mình thì sử dụng [Dynamic Dummy Image Generator](https://dummyimage.com/) cho nhanh. Bạn có thể vào trang đó để xem cách sử dụng hoặc đơn giản sử dụng đường link này: [https://dummyimage.com/674x384/fff/ffffff.png](https://dummyimage.com/674x384/fff/ffffff.png). Ảnh tải về sẽ có dung lượng cỡ 1 KB.

Tiếp theo, bạn có thể vào trang [tinypng.com](https://tinypng.com) để giảm dung lượng ảnh lại. Ảnh sau optimize sẽ có dung lượng cỡ **126 B** thôi. Như vậy là đủ nhỏ rồi phải không bạn?

<a href="https://github.com/completejavascript/lazy-loading-image-demo" class="btn btn-primary margin-bottom">
  Xem code trên Github
</a>

<a href="https://about.phamvanlam.com/lazy-loading-image-demo/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

### Code toàn bộ component Lazy Loading Image

```jsx:title=lazy-image.js
import React from "react";
import "./lazy-image.css";

function elementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}

export default class LazyImage extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loaded: false,
    };

    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    this.handleScroll();

    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll() {
    if (!this.state.loaded && elementInViewport(this.imgElm)) {
      // Load real image
      const imgLoader = new Image();
      imgLoader.src = this.props.src;
      imgLoader.onload = () => {
        const ratioWH = imgLoader.width / imgLoader.height;

        this.imgElm.setAttribute(`src`, `${this.props.src}`);

        this.props.keepRatio &&
          this.imgElm.setAttribute(`height`, `${this.props.width / ratioWH}`);

        this.imgElm.classList.add(`${this.props.effect}`);

        this.setState({
          loaded: true,
        });
      };
    }
  }

  render() {
    const width = this.props.width || "100%";
    const height = this.props.height || "100%";

    return (
      <img
        src={this.props.placeHolder}
        width={width}
        height={height}
        ref={(imgElm) => (this.imgElm = imgElm)}
        className="lazy-image"
        alt={this.props.alt}
      />
    );
  }
}
```

```css:title=lazy-image.css
.lazy-image {
  opacity: 0;
  transition: opacity 0.1s ease-in-out;
  -webkit-transition: opacity 0.1s ease-in-out;
  -moz-transition: opacity 0.1s ease-in-out;
}

.lazy-image.opacity {
  opacity: 1;
}
```

### Giải thích cách triển khai Lazy Loading Image trong React

#### Hàm khởi tạo

Khởi tạo biến state _loaded_. Biến này dùng để lưu trạng thái ảnh đã được load hay chưa. Ban đầu ảnh chưa được load nên giá trị này là _false_.

```jsx
this.state = {
  loaded: false,
};
```

[Bind](/phan-biet-call-apply-va-bind-trong-javascript/) function _handleScroll_ với _this_. [Function](/ham-la-gi-ham-trong-javascript/) này dùng để xử lý [event](/xu-ly-mot-event-javascript-co-ban/) khi scroll màn hình.

```jsx
this.handleScroll = this.handleScroll.bind(this);
```

#### Hàm render

Hàm này tương ứng với **Bước 1** mà mình đã nói phía trên. Trong hàm này, mình thực hiện các công việc sau đây.

Tính giá trị của _width_ và _height_. Nếu người dùng không truyền 2 thuộc tính này vào thì mặc định giá trị là **100%**

```jsx
const width = this.props.width || "100%";
const height = this.props.height || "100%";
```

Component này khi render lên HTML sẽ đóng vai trò là một [thẻ img](https://www.w3schools.com/tags/tag_img.asp) với các thuộc tính là:

- <code>src={this.props.placeHolder}</code> : ban đầu gán _src_ của ảnh là ảnh Place Holder mà mình đã tải ở phần trước.
- <code>width={width}</code>: xác định chiều rộng ảnh
- <code>height={height}</code>: xác định chiều cao ảnh
- <code>ref={imgElm => this.imgElm = imgElm}</code>: định nghĩa biến _this.imgElm_ chính là reference đến phần tử DOM
- <code>className="lazy-image"</code>: định nghĩa tên class, dùng để tuỳ biến style trong file _lazy-image.css_. Mình đang để mặc định _opacity: 0_ - nghĩa là ảnh ban đầu sẽ bị ẩn đi. Khi nào ảnh gốc được load xong mình sẽ gán _opacity: 1_ để tạo hiệu ứng xuất hiện. Bạn có thể tuỳ biến tuỳ theo ý thích.
- <code>alt={this.props.alt}</code>: định nghĩa thuộc tính _alt_ dùng để hiển thị khi không tải được ảnh

#### Hàm componentDidMount

Hàm [componentDidMount](https://reactjs.org/docs/react-component.html#componentdidmount) dùng để xử lý khi component đã được mount (đơn giản là nó được render lên HTML). Trong hàm này, mình làm 2 việc:

- Kiểm tra xem component có đang nằm trong viewport hay không (nếu có thì mình sẽ load ảnh gốc lên) bằng cách gọi hàm _this.handleScroll()_ - tương ứng với **Bước 2**.
- Đăng ký sự kiện scroll của màn hình Window - dùng để xử lý **Bước 3**.

```jsx
window.addEventListener("scroll", this.handleScroll);
```

#### Hàm componentWillUnmount

Hàm [componentWillUnmount](https://reactjs.org/docs/react-component.html#componentwillunmount) dùng để xử lý trước khi component bị huỷ. Lúc này, mình phải huỷ sự kiện đã đăng ký ở phần trước, để tránh bị leak memory.

```jsx
window.removeEventListener("scroll", this.handleScroll);
```

#### Hàm handleScroll

Như mình đã nói ở trên, hàm này dùng để xử lý khi scroll màn hình. Trong hàm này, mình sẽ phải kiểm tra xem ảnh gốc đã được load hay chưa - thông qua biến _this.state.loaded_. Đồng thời kiểm tra xem phần tử DOM có đang nằm trong viewport hay không - thông qua hàm _elementInViewport_.

```jsx
function elementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}
```

Rõ ràng, nếu ảnh đã được load hoặc nó không nằm trên viewport thì mình không cần thiết phải gọi phần xử lý load ảnh làm gì cả. Ngược lại, mình sẽ phải load ảnh gốc lên thông qua đối tượng [Image](https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/Image).

Đầu tiên, khởi tạo đối tượng _Image_:

```jsx
const imgLoader = new Image();
```

Tiếp theo, gán thuộc tính _src_ với đường dẫn ảnh gốc cần tải:

```jsx
imgLoader.src = this.props.src;
```

Định nghĩa hàm _onload_ - hàm này được gọi khi ảnh đã được load hoàn toàn. Việc load ảnh là **bất đồng bộ** nên sẽ không ảnh hưởng đến hoạt động của trang web.

**Trong hàm _onload_ mình thực hiện các công việc đó là:**

Tính tỉ lệ chiều rộng / chiều cao của ảnh thực tế <code>const ratioWH = imgLoader.width / imgLoader.height</code>. Mục đích là để điều chỉnh lại tỉ lệ chiều rộng / chiều cao nếu cần thiết.

Gán _src_ với đường dẫn ảnh gốc cần tải.

```jsx
this.imgElm.setAttribute(`src`, `${this.props.src}`);
```

Nếu người dùng muốn giữ nguyên tỉ lệ ảnh gốc thì mình sẽ điều chỉnh lại chiều cao của ảnh

```jsx
this.props.keepRatio &&
  this.imgElm.setAttribute(`height`, `${this.props.width / ratioWH}`);
```

Về cơ bản, khi đến bước này thì ảnh đã sẵn sàng để hiển thị. Nhưng người dùng vẫn chưa nhìn thấy ảnh, vì _opacity: 0_. Do đó, mình sẽ thêm vào thuộc tính _class_ của ảnh giá trị _this.props.effect_. Mặc định, mình mới định nghĩa 1 effect là _opacity_.

```jsx
this.imgElm.classList.add(`${this.props.effect}`);
```

Định nghĩa trong css:

```css
.lazy-image.opacity {
  opacity: 1;
}
```

Đến đây thì ảnh hoàn toàn được hiện lên, công việc cuối cùng là thay đổi state _this.state.loaded_. Mục đích là khi mình scroll màn hình, phần xử lý này sẽ không được gọi nữa - đảm bảo chỉ gọi phần load ảnh đúng 1 lần.

```jsx
this.setState({
  loaded: true,
});
```

Như vậy, mình đã định nghĩa xong component _LazyImage_. Bây giờ, chỉ cần áp dụng nó thôi.

## Cách sử dụng component LazyImage

Mình có làm một ví dụ trên Github. Bạn có thể tham khảo [source code](https://github.com/completejavascript/lazy-loading-image-demo) hoặc [xem demo trực tiếp](https://about.phamvanlam.com/lazy-loading-image-demo).

Ví dụ demo mình sử dụng [create-react-app](https://reactjs.org/docs/create-a-new-react-app.html). Bạn có thể tham khảo thêm tại bài viết [Tạo và deploy ứng dụng React lên Github Pages](/deploy-ung-dung-react-len-github-pages/) để biết cách tạo project và deploy lên Github Pages.

Trong _App.js_ mình đã sử dụng component LazyImage như sau:

```jsx
<LazyImage
  placeHolder={placeHolder}
  src={props.src}
  width={`100%`}
  height={`auto`}
  effect={"opacity"}
  alt={props.alt}
/>
```

Về chi tiết, bạn có thể tham khảo thêm trong project demo của mình. Có gì khó hiểu, bạn có thể để lại trong phần bình luận phía dưới, mình sẽ cố gắng giải đáp.

## Lời kết

Trên đây là cách mà mình đã triển khai Lazy Loading Image trong React. Hy vọng bạn có thể hiểu được tư tưởng chính của phương pháp này và tự implement theo cách của riêng mình. Còn phần ví dụ của mình chỉ dùng để tham khảo nên có thể sẽ có issue. Mong bạn thông cảm.

Tiếp theo, mình dự định sẽ tìm hiểu và chia sẻ tiếp về Lazy Loading Video, Lazy Loading JavaScript,... Rất mong bạn sẽ theo dõi blog của mình thường xuyên. Và nếu bạn thấy bài viết này hay thì có thể cho mình đánh giá ở phần dưới.

<a href="https://github.com/completejavascript/lazy-loading-image-demo" class="btn btn-primary margin-bottom">
  Xem code trên Github
</a>

<a href="https://about.phamvanlam.com/lazy-loading-image-demo/" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!
