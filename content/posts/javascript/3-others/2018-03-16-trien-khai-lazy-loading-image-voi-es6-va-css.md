---
date: "2018-03-16T12:00:15Z"
update: "2018-10-02T12:00:15Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/trien-khai-lazy-loading-image-voi-es6-css-completejavascript.com_.png"
keywords: "lazy loading image với es6 và css"
description: "Triển khai Lazy Loading Image với ES6 và CSS khác với việc triển khai Lazy Loading Image trong React như thế nào? Mời bạn theo dõi để biết thêm chi tiết."
slug: trien-khai-lazy-loading-image-voi-es6-va-css
title: "Triển khai Lazy Loading Image với ES6 và CSS"
shortTitle: "Lazy Loading Image với ES6 và CSS"
series: "JavaScript: Tutorials"
tags:
  - CSS
  - ES6
  - Performance
  - Template
---

Xin chào bạn! Trong bài viết [triển khai Lazy Loading Image trong React](/trien-khai-lazy-loading-image-trong-react) mình đã giới thiệu với bạn tư tưởng chính của phương pháp Lazy Loading Image và cách mình triển khai nó trong React. Còn trong bài này, mình sẽ không sử dụng React nữa. Thay vào đó mình sẽ chỉ sử dụng ES6 và CSS thôi. Mời bạn theo dõi bài viết, xem mình đã triển khai Lazy Loading Image với ES6 và CSS như thế nào nhé!

## Triển khai Lazy Loading Image với ES6 và CSS

### Phần code quan trọng

**main.js**

```js
document.addEventListener("DOMContentLoaded", function () {
  const gridContainer = document.querySelector(".grid");

  // Template for each cell in grid
  const cellTemplate = (id) => `
    <div class="cell">
      <div class="lazy-image" id="${id}"></div>
      <div class="caption">${id.replace("-", " ")}</div>
    </div>
  `;

  const NUMBER_IMAGE = 18;

  // Render all images with default background as place_holder.png
  for (let i = 1; i <= NUMBER_IMAGE; i++) {
    const id = `image-${i < 10 ? `0${i}` : i}`;
    const tmpl = cellTemplate(id);
    const frag = document.createRange().createContextualFragment(tmpl);
    gridContainer.appendChild(frag);
  }

  // store all images DOM in array
  let arrayImages = [].slice.call(document.querySelectorAll(".lazy-image"));

  // handle scroll
  handleScroll();

  let debounceTimer;
  window.addEventListener("scroll", function () {
    if (debounceTimer) {
      window.clearTimeout(debounceTimer);
    }

    debounceTimer = window.setTimeout(function () {
      handleScroll();
    }, 100);
  });

  function handleScroll() {
    for (let i = arrayImages.length - 1; i >= 0; i--) {
      if (elementInViewport(arrayImages[i])) {
        arrayImages[i].classList.add("visible");
        arrayImages.splice(i, 1);
      }
    }
  }

  // Check if a DOM element is in the viewport
  function elementInViewport(el) {
    const rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.top <= (window.innerHeight || document.documentElement.clientHeight)
    );
  }
});
```

**main.css**

```css
.app .grid .cell .lazy-image {
  background-image: url("images/place-holder.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-top: 66.64%;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  -webkit-transition: opacity 0.2s ease-in-out;
  -moz-transition: opacity 0.2s ease-in-out;
}

.app .grid .cell .lazy-image.visible {
  opacity: 1;
}
#image-01.visible {
  background-image: url("images/01.jpg");
}
#image-02.visible {
  background-image: url("images/02.jpg");
}
#image-03.visible {
  background-image: url("images/03.jpg");
}
#image-04.visible {
  background-image: url("images/04.jpg");
}
#image-05.visible {
  background-image: url("images/05.jpg");
}
#image-06.visible {
  background-image: url("images/06.jpg");
}
#image-07.visible {
  background-image: url("images/07.jpg");
}
#image-08.visible {
  background-image: url("images/08.jpg");
}
#image-09.visible {
  background-image: url("images/09.jpg");
}
#image-10.visible {
  background-image: url("images/10.jpg");
}
#image-11.visible {
  background-image: url("images/11.jpg");
}
#image-12.visible {
  background-image: url("images/12.jpg");
}
#image-13.visible {
  background-image: url("images/13.jpg");
}
#image-14.visible {
  background-image: url("images/14.jpg");
}
#image-15.visible {
  background-image: url("images/15.jpg");
}
#image-16.visible {
  background-image: url("images/16.jpg");
}
#image-17.visible {
  background-image: url("images/17.jpg");
}
#image-18.visible {
  background-image: url("images/18.jpg");
}
```

`youtube: https://www.youtube.com/watch?v=6Y-fgdRyLUU`

<a href="https://github.com/completejavascript/lazy-loading-image-es6-css-demo" class="btn btn-primary margin-bottom">
  Xem code trên Github
</a>

<a href="http://about.phamvanlam.com/lazy-loading-image-es6-css-demo" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

### Giải thích cách triển khai Lazy Loading Image với ES6 và CSS

#### Render ảnh với Place Holder

Toàn bộ ảnh mình sẽ render bên trong thẻ _div_ với tên class là _grid_.

```html
<div class="grid">
  <!-- Render each cell here from JavaScript -->
</div>
```

Do đó, mình sẽ phải tạo ra reference đến thẻ đó trước để làm container.

```js
const gridContainer = document.querySelector(".grid");
```

Sau đó, mình sẽ sử dụng [ES6 Template String](/su-dung-es6-template-string-co-gi-hay) để định nghĩa template cho mỗi cell (chứa ảnh và caption).

```js
const cellTemplate = (id) => `
  <div class="cell">
    <div class="lazy-image" id="${id}"></div>
    <div class="caption">${id.replace("-", " ")}</div>
  </div>
`;
```

Cuối cùng, mình sẽ render 18 _cell_ vào trong _gridContainer_.

```js
const NUMBER_IMAGE = 18;

for (let i = 1; i <= NUMBER_IMAGE; i++) {
  const id = `image-${i < 10 ? `0${i}` : i}`;
  const tmpl = cellTemplate(id);
  const frag = document.createRange().createContextualFragment(tmpl);
  gridContainer.appendChild(frag);
}
```

Ở đây, mỗi ảnh được xác định trong thẻ _div_ với tên class là _lazy-image_ nên mặc định ảnh background sẽ là ảnh Place Holder. Phần này được định nghĩa trong _main.css_.

```css
.app .grid .cell .lazy-image {
  background-image: url("images/place-holder.png");
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 0;
  padding-top: 66.64%;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  -webkit-transition: opacity 0.2s ease-in-out;
  -moz-transition: opacity 0.2s ease-in-out;
}
```

Và id của mỗi ảnh lần lượt là: image-01, image-02, ..., image-18. Phần id này sẽ được dùng để xác định ảnh gốc được load ứng với mỗi _cell_.

Như vậy là đến đây mình đã xây dựng được [cấu trúc DOM Tree](/co-ban-ve-dom-javascript). Tiếp theo mình sẽ xử lý việc load ảnh khi scroll màn hình.

#### Xử lý việc load ảnh khi scroll màn hình

Trước tiên, mình sẽ query để lưu lại các phần tử DOM cần Lazy Loading Image vào một mảng để tiện xử lý sau này.

```js
let arrayImages = [].slice.call(document.querySelectorAll(".lazy-image"));
```

Ở đây phương thức [querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) trả về [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList) chứ không phải [Array](/javascript-array-co-ban). Nên mình sẽ phải convert NodeList sang Array. Bạn có thể tham khảo bài viết [Convert NodeList to Array](https://davidwalsh.name/nodelist-array) để biết thêm chi tiết.

**Mục đích của mình khi lưu các phần tử DOM này vào Array là gì?**

Khi scroll màn hình, mình sẽ duyệt mảng này để kiểm tra từng phần tử DOM trong mảng. Nếu nó nằm trong viewport thì mình sẽ tiến hành load ảnh gốc lên. Và sau khi load ảnh xong, mình sẽ xoá phần tử này khỏi mảng, để không cần phải kiểm tra lại mỗi khi scroll màn hình.

Cụ thể hàm _handleScroll_ là:

```js
function handleScroll() {
  for (let i = arrayImages.length - 1; i >= 0; i--) {
    if (elementInViewport(arrayImages[i])) {
      arrayImages[i].classList.add("visible");
      arrayImages.splice(i, 1);
    }
  }
}
```

Đọc đến đây có thể bạn sẽ thắc mắc tại sao mình lại duyệt từ phần tử **arrayImages.length - 1** về 0 mà không phải là ngược lại. Bởi lẽ, khi mình sử dụng phương thức [splice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice) thì số phần tử của mảng sẽ giảm đi. Tức giá trị **arrayImages.length** sẽ thay đổi. Dẫn đến việc duyệt mảng sẽ bị thiếu.

Ngoài ra, hàm kiểm tra xem 1 phần tử có nằm trong viewport hay không vẫn không thay đổi so với bài viết trước:

```js
function elementInViewport(el) {
  const rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.top <= (window.innerHeight || document.documentElement.clientHeight)
  );
}
```

Và để ảnh gốc hiện lên, mình sẽ thêm vào _classList_ giá trị _visible_. Vì mình đã định nghĩa trong _main.css_:

```css
.app .grid .cell .lazy-image.visible {
  opacity: 1;
}
#image-01.visible {
  background-image: url("images/01.jpg");
}
#image-02.visible {
  background-image: url("images/02.jpg");
}
#image-03.visible {
  background-image: url("images/03.jpg");
}
#image-04.visible {
  background-image: url("images/04.jpg");
}
#image-05.visible {
  background-image: url("images/05.jpg");
}
#image-06.visible {
  background-image: url("images/06.jpg");
}
#image-07.visible {
  background-image: url("images/07.jpg");
}
#image-08.visible {
  background-image: url("images/08.jpg");
}
#image-09.visible {
  background-image: url("images/09.jpg");
}
#image-10.visible {
  background-image: url("images/10.jpg");
}
#image-11.visible {
  background-image: url("images/11.jpg");
}
#image-12.visible {
  background-image: url("images/12.jpg");
}
#image-13.visible {
  background-image: url("images/13.jpg");
}
#image-14.visible {
  background-image: url("images/14.jpg");
}
#image-15.visible {
  background-image: url("images/15.jpg");
}
#image-16.visible {
  background-image: url("images/16.jpg");
}
#image-17.visible {
  background-image: url("images/17.jpg");
}
#image-18.visible {
  background-image: url("images/18.jpg");
}
```

Công việc cuối cùng là đăng ký sự kiện _scroll_ đối với _window_.

```js
let debounceTimer;
window.addEventListener("scroll", function () {
  if (debounceTimer) {
    window.clearTimeout(debounceTimer);
  }

  debounceTimer = window.setTimeout(function () {
    handleScroll();
  }, 100);
});
```

**Chú ý**: trong phần đăng ký sự kiện _scroll_ mình có sử dụng thêm _setTimeout_ để nâng cao performance cho trang web. Nghĩa là việc xử lý _handleScroll_ sẽ được thực hiện sau khi người dùng scroll màn hình xong khoảng _100 ms_.

Nếu không cần quan tâm đến performance thì bạn chỉ cần viết ngắn gọn là:

```js
window.addEventListener("scroll", handleScroll);
```

## Demo

Bạn có thể xem code đầy đủ và demo tại đây:

<a href="https://github.com/completejavascript/lazy-loading-image-es6-css-demo" class="btn btn-primary margin-bottom">
  Xem code trên Github
</a>

<a href="http://about.phamvanlam.com/lazy-loading-image-es6-css-demo" class="btn btn-primary margin-bottom">
  Xem Demo
</a>

## Lời kết

Trên đây là cách mình triển khai Lazy Loading Image với ES6 và CSS. Nhìn chung, mình thấy cách này không khác nhiều so với cách sử dụng React. Nếu bạn có thắc mắc hay góp ý gì thì có thể hỏi mình bằng cách để lại trong phần bình luận phía dưới.

Còn bây giờ thì xin chào và hẹn gặp lại trong [bài viết tiếp theo](/chuyen-anh-dong-gif-thanh-video), thân ái!
