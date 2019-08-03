---
date: "2018-03-19T00:00:54Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: html-string-sang-dom-node-voi-domparser
title: "HTML String sang DOM Node với DOMParser"
categories:
  - Thủ thuật JavaScript
tags:
  - DOM
  - Event
  - HTML
  - Template
---

Khi lập trình Web nói chung và [lập trình JavaScript](/category/javascript/javascript-co-ban/) nói riêng, nhiều khi bạn sẽ cần phải render thêm các thành phần trang web từ JavaScript. Và trong trường hợp thành phần HTML đó được lưu dưới dạng string, bạn có thể sử dụng [DOMParser](https://developer.mozilla.org/en-US/docs/Web/API/DOMParser) để chuyển HTML String sang DOM Node. Cách làm vô cùng đơn giản như sau.

## Cách chuyển HTML String sang DOM

**Bước 1**: Tạo mới một đối tượng của **DOMParser**.

```
let domParser = new DOMParser();
```

**Bước 2**: Sử dụng phương thức **parseFromString** của DOMParser.

```
let doc = domParser.parseFromString('<div>Hello</div>', 'text/html');
    console.log(doc);

    /* Kết quả trả về là một document
    <html>
    <head></head>
    <body>
      <div>Hello</div>
    </body>
    </html>
    */
```

Trong hàm parseFromString, tham số đầu tiên là nội dung HTML [string](/values-types-va-operators-trong-javascript-phan-2/) mà bạn muốn parse; và tham số tiếp theo là kiểu string.

Có 3 kiểu string được support là: **application/xml**, **image/svg+xml** và **text/html**. Đối với bài toán này, bạn sẽ chọn kiểu text/html.

Kết quả trả về sẽ là một [**document**](/co-ban-ve-dom-javascript/), với đầy đủ các thẻ <html>, <head>, <body> và các node được tạo ra từ string đầu vào như trên.

**Bước 3**: Lấy ra mảng các node mới được tạo ra

Thực tế, thường bạn chỉ cần các node mới để chèn vào một file HTML có sẵn của riêng bạn. Khi đó bạn có thể làm như này:

```
let nodes = document.body.chidNodes;
    console.log(nodes);

    // => NodeList [div]
```

Đến đây, bạn sẽ thu được một [mảng](/javascript-array-co-ban/) các node - NodeList. Và bây giờ, bạn hoàn toàn tự do sử dụng NodeList này để chèn vào bất cứ đâu trên trang HTML.

## Chuyển HTML String thành DOM và vẽ lên HTML

Sau đây là một ví dụ minh họa cho phần phía trên. Bạn nhấn vào button **Add** để chuyển HTML String thành DOM Node, sau đó vẽ lên giao diện. Sau đó, bạn có thể nhấn button **Remove** để xóa bỏ đi các node mới thêm vào vừa rồi.

[codepen_embed height="405" theme_id="0" slug_hash="BrKrrJ" default_tab="js,result" user="completejavascript"]See the Pen <a href='https://codepen.io/completejavascript/pen/BrKrrJ/'>HTML String to DOM nodes Example</a> by Lam Pham (<a href='https://codepen.io/completejavascript'>@completejavascript</a>) on <a href='https://codepen.io'>CodePen</a>.[/codepen_embed]

### Giao diện HTML

Trên giao diện ngoài 2 button Add và Remove, có một phần tử quan trọng là thẻ div với **id="container"**. Thẻ này được dùng làm container để chứa các node mới được parse từ JavaScript.

```
<div id="container">

    </div>
```

### Code phần JavaScript

Ở đây, mình gộp cả 3 bước phía trên thành hàm getNodes:

```
let getNodes = str => new DOMParser().parseFromString(str, 'text/html').body.childNodes;
```

Bạn sử dụng hàm số này để lấy về mảng các node với đầu vào là một HTML string.

```
let nodes = getNodes('<div><span>1</span></div><div><span>2</span></div>');
```

Sau đó, bạn thêm các node này vào HTML bằng cách nhấn button Add:

```
btnAdd.addEventListener("click", function() {
     nodes.forEach(node => container.appendChild(node.cloneNode(true)));
    });
```

Vì nodes là kiểu mảng, nên mình sử dụng phương thức [forEach](/javascript-foreach-la-cai-quai-gi/) để duyệt. Mỗi phần tử node trong mảng sẽ được sao chép ([clone](https://developer.mozilla.org/en-US/docs/Web/API/Node/cloneNode)) ra một node mới, để dùng lại sau này.

```
node.cloneNode(true)
```

Sau đó, chèn node mới này vào node container sử dụng phương thức [Node.appendChild](https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild).

```
container.appendChild(node.cloneNode(true))
```

Ngoài ra, để bỏ đi các node mới thêm vào, mình sẽ sử dụng một vòng lặp lấy ra [Node.firstChild](https://developer.mozilla.org/en/docs/Web/API/Node/firstChild) của node container và **delete** nó đi, cho đến khi container không còn node con nữa là hoàn thành công việc.

```
btnRm.addEventListener("click", function() {
     while(container.firstChild) {
       delete container.removeChild(container.firstChild);
     }
    });
```

**Chú ý:** Thông thường, bạn sẽ chỉ sử dụng hàm [Node.removeChild()](https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild) mà không delete. Việc này sẽ dẫn đến leak memory.

## Kết luận

Trên đây là cách làm đơn giản để chuyển HTML String sang DOM node và thêm chúng vào giao diện HTML. Tuy nhiên, cách làm này có một nhược điểm là khi cấu trúc của HTML string phức tạp, sẽ rất khó để bạn theo dõi. Vì vậy, bài viết sau mình sẽ giới thiệu với các bạn phương pháp sử dụng thẻ template trong HTML.

Hẹn gặp lại bạn ở [bài viết tiếp theo](/chuyen-html-template-sang-dom-node/), thân ái!

## **Tham khảo**

- [Convert String to DOM Nodes](https://davidwalsh.name/convert-html-stings-dom-nodes)

---

★ Theo dõi [Lam Pham](/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
