---
date: "2018-04-11T00:00:05Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: cach-su-dung-hang-so-trong-es5-va-es6
title: "Cách sử dụng hằng số trong ES5 và ES6"
categories:
  - Thủ thuật JavaScript
tags:
  - ES6
  - Strict Mode
---

Mình thường thấy nhiều bạn khi lập trình JavaScript sử dụng **var** trong mọi trường hợp, kể cả với hằng số. Tuy nhiên, nếu sử dụng như vậy, bạn sẽ không phản ánh được đúng tính chất của hằng số. Đó là **tính bất biến **- không bao giờ thay đổi giá trị. Bài viết này mình sẽ giúp bạn khai báo và sử dụng hằng số trong ES5 và ES6.

## Sử dụng hằng số trong ES5

Để khai báo hằng số, bạn có thể sử dụng phương thức [Object.defineProperties()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties).

```
Object.defineProperties(obj, props)
```

Phương thức này có 2 tham số là:

- **obj**: là [object](/javascript-object-last-but-not-least/) chứa hằng số cần khai báo. Nếu bạn muốn sử dụng hằng số cho toàn bộ chương trình thì có thể sử dụng obj là **window**.
- **props**: là thuộc tính được định nghĩa. Mặc định, thuộc tính này có giá trị **writable = false**, tức là giá trị của nó không thể thay đổi

Ví dụ:

```
Object.defineProperties(window, {
      myconst: {
        value: 10,
        enumerable: true
      }
    });

    console.log(myconst); // => 10
    myconst = 99;
    console.log(myconst); // => 10
```
Trong ví dụ trên, mình định nghĩa **myconst** là một hằng số của window có giá trị value = 10. Sau đó, dù mình có thay đổi giá trị **myconst = 99**, thì giá trị của myconst vẫn không thay đổi so với giá trị gốc là 10.

Tuy nhiên, bạn cũng thấy là dù việc thay đổi giá trị **myconst = 99 **không có ý nghĩa, nhưng vẫn không có hề có thông báo lỗi khi bạn cố tình thay đổi giá trị của hằng số.

Để có thể nhận được thông báo lỗi này, bạn cần sử dụng ở [strict mode](/mot-so-loi-khi-su-dung-strict-mode-javascript/).

```
"use strict";

    Object.defineProperties(window, {
      myconst: {
        value: 10,
        enumerable: true
      }
    });

    console.log(myconst); // => 10

    myconst = 99; // => TypeError: Cannot assign to read only property 'myconst' of object '#<Window>'
    console.log(myconst);
```

Khi đó bạn sẽ nhận được lỗi: **TypeError: Cannot assign to read only property 'myconst' of object '#<Window>'**. Rõ ràng là ý nghĩa của hằng số đã được thể hiện rất chặt chẽ.

Ngoài ra, bạn cũng có thể khai báo hằng số cho một object khác, không phải window:

```
"use strict";

    let obj = {};
    Object.defineProperties(obj, {
      myconst: {
        value: 10,
        enumerable: true
      }
    });

    console.log(obj.myconst); // => 10

    obj.myconst = 99; // => TypeError: Cannot assign to read only property 'myconst' of object '#<Object>'
    console.log(obj.myconst);
```

Đó là cách khai báo và sử dụng hằng số trong ES5. Tuy nhiên, nếu sử dụng ES6 thì cách làm sẽ ngắn gọn đi cực kỳ, cực kỳ nhiều.

## Sử dụng hằng số trong ES6

ES6 cung cấp từ khóa **const** cho phép bạn định nghĩa hằng số rất ngắn gọn:

```
const myconst = 10;
    console.log(myconst); // => 10

    myconst = 99; // => TypeError: Assignment to constant variable.
    console.log(myconst);
```

Ngoài ra, const có phạm vi sử dụng theo **block**, giống như [let](/phan-biet-var-va-let-trong-javascript/). Ví dụ:

```
function test() {
      const myconst = 10;
      console.log(myconst); // => 10
    }

    console.log(myconst); // => myconst is not defined
```
Bạn thấy đó, ở ngoài hàm **test**, myconst chưa được định nghĩa.

## Kết luận

Trên đây là cách sử dụng hằng số trong ES5 và ES6. Rõ ràng, việc sử dụng ES6 giúp code ngắn gọn hơn rất nhiều. Vì vậy, trong các bài viết tiếp theo mình sẽ tiếp tục giới thiệu với các bạn các đặc điểm hay và nổi bật của ES6.

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/tao-google-analytics-plugin-cho-wordpress/), thân ái!

---

★ Theo dõi [Lam Pham](/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)  
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
**☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
