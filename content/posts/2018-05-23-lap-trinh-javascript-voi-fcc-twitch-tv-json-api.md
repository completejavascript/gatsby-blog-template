---
date: "2018-05-23T13:23:59Z"
template: "post"
cover: "../images/"
keywords: ""
slug: lap-trinh-javascript-voi-fcc-twitch-tv-json-api
title: "Lập trình JavaScript với FCC - Use the Twitch.tv JSON API"
categories:
  - JavaScript Tutorial
tags:
  - API
  - ES6
  - Lập trình JavaScript với FCC
  - Template
---

Tiếp tục với chủ đề [Lập trình JavaScript với FCC](https://completejavascript.com/tag/lap-trinh-javascript-voi-fcc/), bài viết này mình sẽ chia sẻ với bạn về project **Use the Twitch.tv [JSON](https://completejavascript.com/tim-hieu-ve-json-trong-javascript/) API** trên freeCodeCamp.

Trước tiên, project này cũng tương tự như các project trước, mình chỉ sử dụng HTML5, CSS3, JavaScript thuần và kết hợp thêm [jQuery](https://completejavascript.com/tag/jquery/). Vì vậy, nếu bạn đã theo dõi các project trước đây của mình thì sẽ thấy những kiến thức ở đây không có gì mới mẻ cả.

Chỉ có một thứ mà mình muốn chia sẻ ở bài viết này. Đó là cách sử dụng [Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Storage), để lưu lại những thông tin cài đặt của người dùng.

Mời bạn theo dõi sau đây.

## Yêu cầu của project Use the Twitch.tv JSON API

Project này bao gồm những yêu cầu cơ bản sau:

- Có thể nhìn thấy được là Free Code Camp có đang streaming trên Twitch.tv hay không.
- Có thể click vào và di chuyển đến Twitch.tv
- Nếu một người dùng Twitch đang streaming, thì có thể nhìn thấy thông tin chi tiết về cái mà họ đang streaming.

Ngoài ra, mình còn tự đưa thêm các yêu cầu khác như:

- Cho phép người dùng thêm kênh mà họ muốn theo dõi
- Cho phép người dùng xoá kênh mà họ không muốn theo dõi
- Lọc các kênh đang online hoặc offline.

## Demo project Use the Twitch.tv JSON API

[codepen_embed height="446" theme_id="0" slug_hash="aGKjGQ" default_tab="js,result" user="completejavascript"]See the Pen <a href='https://codepen.io/completejavascript/pen/aGKjGQ/'>[FCC] TwitchTV JSON API</a> by Lam Pham (<a href='https://codepen.io/completejavascript'>@completejavascript</a>) on <a href='https://codepen.io'>CodePen</a>.[/codepen_embed]

Bạn có thể nhập tên kênh mà bạn muốn vào phần input và nhấn **ADD** để thêm vào danh sách kênh. Dữ liệu này sẽ không bị mất đi kể cả khi bạn đóng trình duyệt.

## Một số thủ thuật cần lưu ý

### Xây dựng HTML Template

Mặc dù trong project này sử dụng jQuery, nhưng phần [HTML Template](https://completejavascript.com/tag/template/) mình không sử dụng Mustache.js giống như trong bài viết [Mustache Template với jQuery](https://completejavascript.com/mustache-template-voi-jquery/). Ở đây, mình tiếp tục sử dụng [ES6 Template String](https://completejavascript.com/su-dung-es6-template-string-co-gi-hay/) để xây dựng HTML Template.

Bạn có thể xem thêm project [Lập trình JavaScript với FCC – Wikipedia Viewer](https://completejavascript.com/lap-trinh-javascript-voi-fcc-wikipedia-viewer/) để hiểu thêm về vấn đề này.

### Sử dụng Web Storage API

Storage trong JavaScript bao gồm 2 loại: [localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) và [sessionStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/sessionStorage).

#### localStorage và sessionStorage giống và khác nhau thế nào?

- Giống:
  - Đều cho phép lưu trữ dữ liệu của trang web tương ứng với địa chỉ của trang. Nghĩa là dữ liệu của trang abc.com không thể truy cập đến dữ liệu của trang xyz.com được.
  - Đều [giới hạn dung lượng cho phép](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Browser_storage_limits_and_eviction_criteria), trong khoảng 5MB đến 8MB.
  - Đều lưu trữ và quản lý dữ liệu theo kiểu key - value, với các API giống nhau là: Storage.key(), Storage.getItem(), Storage.setItem(), Storage.removeItem(), Storage.clear().
- Khác: Dữ liệu lưu bằng sessionStorage sẽ bị xoá khi trang web bị đóng hoặc khi người dùng đóng trình duyệt. Trong khi, localStorage cho phép bạn lưu dữ liệu mãi mãi.

#### Cách sử dụng

Về cách [sử dụng API](https://completejavascript.com/tag/api/) thì khá đơn giản và mình nghĩ bạn có thể dễ dàng hiểu được. Nên mình sẽ không giới thiệu lại phần này.

Vấn đề quan trọng là: API của hai thằng này giống nhau nên mình sẽ xây dựng một class chung cho cả 2. Như vậy sẽ tiện sử dụng sau này.

    <code>class AppStorage {
        constructor(type) {
          if (this._storageAvailable(type)) {
            this._appStorage = window[type];
          } else {
            console.log('app-storage', `Your browser doesn't support ${type}!`);
          }
        }
        set(key, value) {
          if (this._appStorage) {
            this._appStorage.setItem(key, value);
          }
        }
        get(key) {
          if (this._appStorage) {
            return this._appStorage.getItem(key);
          }
        }
        remove(key) {
          if (this._appStorage) {
            this._appStorage.removeItem(key);
          }
        }
        _storageAvailable(type) {
          try {
            let storage = window[type],
              x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
          }
          catch (e) {
            console.log('app-storage', e);
            return e instanceof DOMException && (
              // everything except Firefox
              e.code === 22 ||
              // Firefox
              e.code === 1014 ||
              /**
               * test name field too, because code might not be present
               * everything except Firefox
               */
              e.name === 'QuotaExceededError' ||
              // Firefox
              e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
              // acknowledge QuotaExceededError only if there's something already stored
              storage.length !== 0;
          }
        }
      }</code>

Ở đây mình [ứng dụng class](https://completejavascript.com/js-pattern-constructor-pattern/) để xây dựng một lớp chung cho localStorage và sessionStorage. Trong hàm khởi tạo constructor, mình cần phải kiểm tra xem trình duyệt hiện tại có hỗ trợ kiểu storage hay không?

    <code>constructor(type) {
      if (this._storageAvailable(type)) {
        this._appStorage = window[type];
      } else {
        console.log('app-storage', `Your browser doesn't support ${type}!`);
      }
    }</code>

Với _type_ có thể là: "localStorage" hoặc "sessionStorage". Và hàm \__storageAvailable_ đơn giản là sẽ sử dụng thử một số API của nó. Nếu không có lỗi gì xảy ra thì [hàm](https://completejavascript.com/tim-hieu-function-javascript/) này sẽ trả về true, ngược lại kết quả sẽ là false.

Bạn có thể xem thêm bài này để hiểu rõ hơn: [Using the Web Storage API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API).

Sau khi đã kiểm tra và chắc chắn rằng trình duyệt bạn đang sử dụng hỗ trợ localStorage hoặc sessionStorage thì việc sử dụng các API còn lại hoàn toàn giống với API ban đầu của chúng.

## Kết luận

Trên đây là một chút kiến thức, kinh nghiệm mà mình rút ra từ project Use the Twitch.tv JSON API. Nếu bạn thấy hữu ích hoặc có góp ý gì thì vui lòng để lại dưới phần bình luận cho mình nhé.

Xin chào và hẹn gặp lại bạn ở bài viết tiếp theo, thân ái!

---

★ Theo dõi [Lam Pham](https://completejavascript.com/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

**☛ Facebook Fanpage:** [Complete JavaScript](https://www.facebook.com/completejavascript/)  
**☛ Facebook Group:** [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
**☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
