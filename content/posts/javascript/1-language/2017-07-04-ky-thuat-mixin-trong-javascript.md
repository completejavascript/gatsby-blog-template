---
date: "2017-07-03T20:00:00Z"
update: "2022-05-06T22:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/ky-thuat-mixin-trong-javascript.png"
keywords: "mixin trong JavaScript, mixin là gì"
description: "Mixin là một thuật ngữ lập trình hướng đối tượng chung - một lớp chứa các phương thức cho các lớp khác sử dụng. Mixin là giải pháp thay thế đa kế thừa."
slug: ky-thuat-mixin-trong-javascript
title: "Kĩ thuật Mixin trong JavaScript"
series: "JavaScript: class"
tags:
  - Class
---

Trong JavaScript, bạn chỉ có thể [kế thừa](/ke-thua-class-trong-javascript/) từ một đối tượng duy nhất. Nghĩa là chỉ có một `[[Prototype]]` cho một đối tượng. Và mỗi lớp chỉ có thể mở rộng **duy nhất** - một lớp khác.

Nhưng đôi khi việc này lại gây ra sự hạn chế. Ví dụ, mình có class `StreetSweeper` và class `Bicycle`. Sau đó, mình muốn kết hợp chúng để tạo ra class `StreetSweepingBicycle`.

Hoặc mình có class `User` với class `EventEmitter` - lớp triển khai tạo sự kiện. Và mình muốn thêm chức năng của `EventEmitter` vào `User`, để đối tượng của class `User` có thể tạo ra các sự kiện.

Để làm được việc này, có một khái niệm hữu ích trong lập trình mà bạn cần biết, đó là **mixin**.

Như được định nghĩa trong Wikipedia, [mixin](https://en.wikipedia.org/wiki/Mixin) là một lớp chứa các phương thức có thể được sử dụng bởi các lớp khác mà **không cần kế thừa** từ nó.

Nói cách khác, **mixin** cung cấp các phương thức triển khai một hành vi, nhiệm vụ nhất định. Nhưng bạn không sử dụng các phương thức đó một mình, bạn sử dụng chúng để thêm hành vi vào các lớp khác.

## Một ví dụ về mixin

**Cách đơn giản nhất để triển khai một mixin trong JavaScript** là tạo ra đối tượng với các phương thức để có thể dễ dàng tích hợp chúng thành nguyên mẫu (prototype) của bất kỳ lớp nào.

Ví dụ, mixin `sayHiMixin` sau đây cung cấp một số phương thức cho `User` để `sayHi` và `sayBye`:

```js
// Định nghĩa mixin
let sayHiMixin = {
  sayHi() {
    console.log(`Hello ${this.name}`);
  },
  sayBye() {
    console.log(`Bye ${this.name}`);
  },
};

// Sử dụng:
class User {
  constructor(name) {
    this.name = name;
  }
}

// copy các phương thức từ sayHiMixin vào User
Object.assign(User.prototype, sayHiMixin);

// Sau đó, đối tượng thuộc user có thể dùng sayHi
new User("Alex").sayHi(); // Hello Alex!
```

Ví dụ trên không có sự kế thừa, mà chỉ đơn giản là **thực hiện sao chép** với phương thức [`Object.assign`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign). Do đó, `User` có thể kế thừa từ một lớp khác và cũng bao gồm mixin với các phương thức bổ sung, ví dụ:

```js
// User kế thừa từ Person
class User extends Person {
  //...
}

// Copy các phương thức từ mixin vào User.prototype
Object.assign(User.prototype, sayHiMixin);
```

Ngoài ra, **mixin** có thể tận dụng tính kế thừa bên trong chúng. Ví dụ, ở đây `sayHiMixin` kế thừa từ `sayMixin`:

```js
// Định nghĩa sayMixin
let sayMixin = {
  say(phrase) {
    console.log(phrase);
  },
};

// sayHiMixin kế thừa từ sayMixin
let sayHiMixin = {
  __proto__: sayMixin, // (hoặc dùng Object.setPrototypeOf)

  sayHi() {
    // gọi phương thức cha
    super.say(`Hello ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Bye ${this.name}`); // (*)
  },
};

// Định nghĩa User
class User {
  constructor(name) {
    this.name = name;
  }
}

// Sao chép phương thức từ sayHiMixin vào User.prototype
Object.assign(User.prototype, sayHiMixin);

// Đối tượng thuộc user có thể gọi sayHi
new User("Alex").sayHi(); // Hello Alex!
```

> **Chú ý:** câu lệnh gọi phương thức cha `super.say()` từ `sayHiMixin` tại `(*)` tìm kiếm phương thức trong nguyên mẫu (prototype) của chính mixin đó, mà không phải từ class.

Đó là bởi phương thức `sayHi` và `sayBye` ban đầu được tạo trong `sayHiMixin`. Vì vậy, mặc dù các phương thức này đã bị sao chép, nhưng thuộc tính nội bộ [`[[HomeObject]]`](https://262.ecma-international.org/10.0/#table-16) vẫn được tham chiếu đến `sayHiMixin`.

Vì phương thức `super` tìm kiếm các phương thức gốc trong `[[HomeObject]].[[Prototype]]`, nói cách khác là tìm kiếm `sayHiMixin.[[Prototype]]`, chứ không phải `User.[[Prototype]]`.

## Ví dụ về EventMixin

Sau đây, mình sẽ cùng thử xây dựng một mixin thực tế hơn. Đó là `EventMixin` - được áp dụng nhiều trong trình duyệt.

Như bạn đã biết, một tính năng quan trọng của **nhiều đối tượng trên trình duyệt** là khả năng tạo ra các sự kiện. **Sự kiện** là một cách hiệu quả để **phát thông tin** cho bất kỳ đối tượng nào muốn nhận.

Sau đây, mình tạo mixin `EventMixin` cho phép dễ dàng **thêm các hàm liên quan đến sự kiện** vào bất kỳ **class/đối tượng** nào.

### Mô tả về `EventMixin`:

`EventMixin` bao gồm các phương thức sau:

- Phương thức `.trigger(name, [...data])` để **tạo một sự kiện** khi có điều gì đó xảy ra.
  - Đối số `name` là tên của sự kiện.
  - Theo sau đó là đối số bổ sung với dữ liệu sự kiện (nếu có).
- Phương thức `.on(name, handler)` bổ sung hàm `handler` như trình xử lý cho các sự kiện với **tên đã cho**.
  - Các `handler` được gọi khi một sự kiện có tên là `name` được kích hoạt và nhận các đối số từ lệnh gọi `.trigger`.
- Phương thức `.off(name, handler)` loại bỏ hàm `handler` đã đăng ký.

Sau khi thêm mixin, đối tượng `user` sẽ có thể tạo sự kiện `login` khi khách truy cập đăng nhập. Và một đối tượng khác, ví dụ như `calendar` muốn **lắng nghe các sự kiện như vậy để tải lịch** cho người đã đăng nhập.

Hoặc, một `menu` tạo ra sự kiện `select` khi một menu item được chọn và các đối tượng khác có thể **chỉ định hàm xử lý** để phản ứng với sự kiện đó.

### Code triển khai `EventMixin`

Sau đây là đoạn code triển khai `EventMixin`:

```js
let eventMixin = {
  /**
   * Đăng ký sự kiện, ví dụ:
   *  menu.on('select', function(item) {... }
   */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Hủy bỏ đăng ký, ví dụ:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Kích hoạt sự kiện với tên `eventName`, ví dụ:
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // khi không có handler tương ứng
    }

    // gọi các handler tương ứng
    this._eventHandlers[eventName].forEach((handler) =>
      handler.apply(this, args)
    );
  },
};
```

Trong đó:

- Phương thức `.on(eventName, handler)`: gán hàm `handler` để chạy khi sự kiện có tên `eventName` xảy ra. Về cơ bản, có một thuộc tính `_eventHandlers` dùng để lưu trữ một loạt các `handler` cho mỗi tên sự kiện và mình chỉ thêm vào danh sách.
- Phương thức `.off(eventName, handler)`: xóa hàm khỏi danh sách các `handler`.
- Phương thức `.trigger(eventName,...args)`: tạo ra sự kiện. Sau đó, tất cả các hàm từ `_eventHandlers[eventName]` sẽ được gọi với danh sách các đối số `...args`.

Ví dụ về cách sử dụng `EventMixin` trên:

```js
// Định nghĩa tạo class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}

// thêm mixin vào class Menu
Object.assign(Menu.prototype, eventMixin);

// Khởi tạo đối tượng menu
let menu = new Menu();

// Đăng ký handler để gọi khi có sự kiện "select"
menu.on("select", (value) => console.log(`Value selected: ${value}`));

// Kích hoạt sự kiện => sau đó handler trên sẽ được gọi:
menu.choose("456"); // Value selected: 456
```

Bây giờ, nếu bạn muốn bất kỳ đoạn code nào được gọi khi menu được **select**, bạn có thể lắng nghe nó với `menu.on("select",...)`.

Rõ ràng, mixin `EventMixin` giúp bạn dễ dàng thêm các phương thức vào nhiều lớp tùy thích mà không can thiệp vào chuỗi prototype của class.

> Mình có một bài viết khác về PubSub Pattern cũng sử dụng Event như trên, bạn có thể tham khảo tại bài viết: [PubSub Pattern](/js-pattern-4-pubsub-pattern/).

## Tổng kết

**Mixin** là một thuật ngữ chung trong lập trình hướng đối tượng. Đó là một lớp chứa các phương thức cho các lớp khác sử dụng.

Thực tế, một số ngôn ngữ khác cho phép đa kế thừa. Còn JavaScript thì **không hỗ trợ đa kế thừa**, nhưng các mixin có thể được áp dụng bằng cách sao chép các phương thức vào prototype.

Bạn có thể sử dụng mixin như một cách để **làm giàu** một class bằng cách thêm nhiều phương thức, ví dụ cách xử lý sự kiện như bạn đã thấy ở trên...

Tuy nhiên, mixin có thể **vô tình ghi đè** lên các phương thức hiện có trong class (nếu cùng tên). Vì vậy, nói chung bạn nên cân nhắc kỹ về các **phương pháp đặt tên** của một mixin giúp giảm thiểu xác suất xung đột.

Tham khảo: [Mixins](https://javascript.info/mixins)
