---
date: "2018-04-06T00:00:47Z"
template: "post"
cover: "../images/js-pattern-4-pubsub-pattern-completejavascript.com_.png"
keywords: "pubsub pattern"
description: "JavaScript PubSub Pattern, hay Publish / Subscribe Pattern, hay Events Pattern, là một loại JavaScript Design Pattern rất hữu dụng và khá phổ biến, được sử dụng trong rất nhiều thư viện JavaScript. Sau đây là một cách triển khai Pubsub Pattern cực kỳ ngắn gọn và dễ hiểu."
slug: js-pattern-4-pubsub-pattern
title: "JS Pattern #4 - PubSub Pattern"
categories:
  - JavaScript Design Pattern
tags:
  - Event
  - IIFE
---

JavaScript PubSub Pattern, hay Publish / Subscribe Pattern, hay Events Pattern, là một loại JavaScript Design Pattern rất hữu dụng và khá phổ biến, được sử dụng trong rất nhiều thư viện JavaScript. Sau đây là một cách triển khai Pubsub Pattern cực kỳ ngắn gọn và dễ hiểu.

## Triển khai PubSub Pattern

```js
let Events = (() => {
  let events = {};
  function on(eventName, fn) {
    events[eventName] = events[eventName] || [];
    events[eventName].push(fn);
  }
  function off(eventName, fn) {
    if (events[eventName]) {
      for (let i = 0; i < events[eventName].length; i++) {
        if (events[eventName][i] === fn) {
          events[eventName].splice(i, 1);
          break;
        }
      };
    }
  }
  function emit(eventName, data) {
    if (events[eventName]) {
      events[eventName].forEach((fn) => fn(data));
    }
  }
  return {
    on : on,
    off: off,
    emit : emit
  };
})();
```

Trước tiên, bạn thấy rằng cách triển khai pattern này sử dụng [Revealing Module Pattern](/js-pattern-2-module-pattern/), với 3 [function](/tim-hieu-function-javascript/) được public là: **on**, **off** và **emit**.

### Đăng ký sự kiện với hàm on

Hàm **on** có 2 tham số đầu vào:

- **eventName**: tên sự kiện
- **fn**: hàm xử lý sự kiện tương ứng.

Ví dụ:

```js
Events.on("addItem", onItemAdded);
```

Câu lệnh trên hiểu đơn giản là: khi có sự kiện **addItem** xảy ra thì sẽ gọi hàm **onItemAdded**.

#### Giải thích cách triển khai

```js
let events = {};
function on(eventName, fn) {
  events[eventName] = events[eventName] || [];
  events[eventName].push(fn);
}
```

Bạn có thể thấy rằng, **events** là một [object](/javascript-object-last-but-not-least/) rỗng. Sau này, mỗi thuộc tính (key) của events sẽ là tên của event được đăng ký. Giá trị của thuộc tính (value) là một [mảng](/javascript-array-co-ban/) của các function.

Ban đầu events[eventName] sẽ là **undefined**, nên ta sẽ khởi tạoevents[eventName] = [] - là một mảng rỗng. Ngược lại, khi thành phần này đã tồn tại thì chỉ cần [push](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/push) hàm số mới vào mảng.

Đối với ví dụ trên, events["addItem"] = [onItemAdded].

Giả sử, có 2 module khác cũng đăng ký sự kiện addItem:

```js
Events.on("addItem", updateItem1);
Events.on("addItem", updateItem2);
```

Lúc này, events["addItem"] = [onItemAdded, updateItem1, updateItem2].

### Hủy đăng ký sự kiện với hàm off

Hàm **off** có 2 tham số đầu vào:

- **eventName**: tên sự kiện
- **fn**: hàm đã đăng ký sự kiện, cần hủy đăng ký

Ví dụ:

```js
Events.off("addItem", onItemAdded);
```

Câu lệnh trên sẽ bỏ đăng ký sự kiện **addItem** với hàm **onItemAdded**. Hay nói cách khác, khi có sự kiện này xảy ra thì sẽ không gọi hàm onItemAdded nữa.

#### Giải thích cách triển khai

```js
function off(eventName, fn) {
  if (events[eventName]) {
    for (let i = 0; i < events[eventName].length; i++) {
      if (events[eventName][i] === fn) {
        events[eventName].splice(i, 1);
        break;
      }
    };
  }
}
```

Hàm số này sẽ duyệt mảng ứng với **eventName** và kiểm tra tất cả các hàm số thành phần trong mảng đó. Nếu gặp hàm số nào trùng với hàm số cần bỏ đăng ký thì sẽ bỏ hàm số đó ra khỏi mảng thông qua hàm [splice](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/splice).

Đối với ví dụ trên, hàm số onItemAdded sẽ bị loại bỏ khỏi mảng events["addItem"]. Do đó, kết quả là events["addItem"] = [updateItem1, updateItem2].

### Kích hoạt sự kiện với hàm emit

Hàm **emit** có 2 tham số:

- **eventName**: tên sự kiện
- **data**: dữ liệu truyền cho các hàm đã đăng ký sự kiện, trong đó, data có thể là tất cả các kiểu dữ liệu: [number](/values-types-va-operators-trong-javascript-phan-1/), array, string hay object,...

Ví dụ:

```js
Events.emit("addItem", {
  name : "apple",
  quantity: 2
});
```

Câu lệnh trên kích hoạt sự kiện addItem. Khi đó, tất cả những hàm số nào đã được đăng ký sự kiện với hàm **Events.on** ở trên, sẽ được gọi, với đối số là object **{name: "apple", quantity: 2}**;

#### Giải thích cách triển khai

```js
function emit(eventName, data) {
  if (events[eventName]) {
    events[eventName].forEach((fn) => fn(data));
  }
}
```

Hàm này sẽ duyệt toàn bộ mảng ứng với **eventName** sử dụng phương thức [forEach](/javascript-foreach-la-cai-quai-gi/). Sau đó, mỗi hàm số trong mảng sẽ được gọi và truyền vào đối số là data.

Trong ví dụ trên, events["addItem"] = [updateItem1, updateItem2]. Do đó, khi event addItem được kích hoạt, hàm số updateItem1({ name : "apple", quantity: 2 }) và updateItem2({ name : "apple", quantity: 2 }) sẽ được thực hiện.

## Ví dụ sử dụng Pubsub Pattern

https://codepen.io/completejavascript/pen/MVXWWY

Trong đó, module A sẽ thực hiện **addItem** và kích hoạt sự kiện. Và module B, module C sẽ đăng kí sự kiện addItem và với hàm số thực thi là **onAddingItem**.

**Chú ý**:

- Module B và module C đều đăng ký sự kiện với hàm số có cùng tên là onAddingItem. Nhưng thực tế là chúng khác nhau vì 2 hàm này nằm ở module khác nhau, phạm vi biến sẽ khác nhau.
- Trong ví dụ này, các module đều đặt trong cùng 1 file, tuy nhiên bạn có thể đặt mỗi module tách riêng ra các file khác nhau.

## Kết luận

Trên đây là cách triển khai PubSub Pattern và ví dụ đơn giản mô tả cách áp dụng pattern này. Nếu có phần nào mình giải thích chưa được rõ thì các bạn cứ đặt câu hỏi thoải mái nhé.

Xin chào và hẹn gặp lại bạn ở bài viết tiếp theo, thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
