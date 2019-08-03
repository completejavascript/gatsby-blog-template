---
date: "2018-11-22T22:30:58Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: trien-khai-queue-trong-javascript
title: "Triển khai Queue trong JavaScript"
categories:
  - Thủ thuật JavaScript
tags:
  - ES6
  - Thuật toán
---

Tiếp tục ý tưởng từ bài viết [Triển khai Stack trong JavaScript với Array, Object hay Map](/trien-khai-stack-trong-javascript-voi-array-object-hay-map/), bài viết này sẽ tiếp tục triển khai Queue trong JavaScript. Tuy nhiên, mình sẽ chỉ triển khai Queue với [Array](/javascript-array-co-ban/) mà bỏ qua [Object](/javascript-object-last-but-not-least/) và [Map](/map-trong-javascript-thi-sao/). Thay vào đó, mình sẽ triển khai Queue theo hai cách là: **queue thông thường** và **queue vòng** (thực ra còn có cả [queue ưu tiên](http://voer.edu.vn/c/hang-uu-tien-priority-queue/c5e6dc01/2b75617e) nữa, nhưng cách triển khai khá phức tạp, nên mình sẽ không trình bày ở đây).

Trước khi bắt tay vào triển khai code, mình cần phải tìm hiểu xem nó là cái gì, ứng dụng và các phép toán cơ bản trước. Khi đó, bạn không những triển khai Queue trong JavaScript được, mà còn có thể triển khai nó với các ngôn ngữ khác.

Vì dù sao thì:

<blockquote>A programming language is simply just a tool.</blockquote>

## Cơ bản về Queue

### Queue là gì?

Queue là một kiểu cấu trúc dữ liệu tuyến tính, tuân theo quy luật FIFO (First In First Out). Hay "first-come, first-served", nghĩa là: "ai đến trước thì được phục vụ trước".

Rõ ràng, cấu trúc dữ liệu này quá phổ biến và gần gũi với mọi người rồi. Vì đã là người văn minh thì khi đi đâu, làm gì thì cũng nên xếp hàng phải không?

[caption id="attachment_3118" align="aligncenter" width="660"]![Hoạt động xếp hàng](/wp-content/uploads/2018/11/line-up-1.png) Vector Designed By Andrea Panzetti from [pngtree.com](https://pngtree.com/freepng/vector-cartoon-bus-station-queue_2749406.html)[/caption]

### Ứng dụng Queue trong lập trình

Tương tự như Stack, Queue cũng là một cấu trúc dữ liệu được sử dụng khá nhiều trong lập trình như:

- Sử dụng trong thuật toán [tìm kiếm theo chiều rộng BFS](https://vi.wikipedia.org/wiki/Tìm_kiếm_theo_chiều_rộng).

- [Event Queue](https://hackernoon.com/understanding-js-the-event-loop-959beae3ac40) trong JavaScript.

- Hệ thống xử lý các lệnh trong máy tính (ứng dụng trong hệ điều hành, trình biên dịch), hàng đợi các tiến trình chờ được xử lý.

- Bộ nhớ đệm khi xử lý đa luồng, đa tiến trình (download, xử lý audio, xử lý video,...)

### Các phép toán cơ bản

Một số phép toán cơ bản với Queue là:

- **enqueue()**: thêm một phần tử vào cuối của Queue khi nó **chưa đầy**. Nếu thành công thì trả về **true**, ngược lại thì trả về **false**.

- **dequeue()**: lấy ra một phần tử ở đầu của Queue khi nó **không rỗng**. Nếu thành công thì trả về giá trị phần tử đó, ngược lại thì trả về **undefined**;

- **front()**: trả về giá trị của phần tử **ở đầu** của Queue khi nó không rỗng (phần tử đó **vẫn tồn tại** trong Queue).

- **rear()**: trả về giá trị của phần tử **ở cuối** của Queue khi nó không rỗng (phần tử đó **vẫn tồn tại** trong Queue).

- **isEmpty()**: kiểm tra xem Queue có rỗng hay không. Nếu đúng thì trả về **true**, ngược lại thì trả về **false**.

- **isFull()**: kiểm tra xem Queue có đầy hay không. Nếu đúng thì trả về **true**, ngược lại thì trả về **false**.

- **clear()**: xoá **hết các phần tử** khỏi Queue.

## Triển khai Queue trong JavaScript

### Triển khai Queue trong JavaScript với Array

```js
class AQueue {
  constructor(capacity) {
    this.data = [];
    this.capacity = capacity;
    this.size = 0;
  }

  isFull() {
    return this.size === this.capacity;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(item) {
    if (this.isFull()) return false;

    this.data.push(item);
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    return this.data.shift();
  }

  front() {
    if (this.isEmpty()) return undefined;

    return this.data[0];
  }

  rear() {
    if (this.isEmpty()) return undefined;

    return this.data[this.size - 1];
  }

  clear() {
    this.data.length = 0;
    this.size = 0;
  }
}
```

Cách triển khai Queue trong JavaScript cũng tương tự như triển khai Stack trong JavaScript vậy. Chỉ khác 3 chỗ là:

- Nếu như Stack sử dụng [pop()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop) để lấy ra phần tử **cuối cùng**, thì Queue sử dụng [shift()](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Array/shift) để lấy ra phần tử **đầu tiên**.

- Stack chỉ cho phép trả về giá trị của phần tử đầu tiên với **peek()**, còn Queue cho phép trả về giá trị phần tử đầu tiên với **front()** và phần tử cuối cùng với **rear()**.

- Ngoài ra, trong phần Queue này, mình sử dụng một biến trung gian `this.size` để quản lý kích thước của Queue thay vì sử dụng `this.data.length` như phần Stack. Vì mình thấy rằng, nếu như mỗi lần cần truy cập kích thước của Queue mà dùng `this.data.length` sẽ khá lâu.

### Triển khai Queue vòng với Array

```js
class CQueue {
  constructor(capacity) {
    this.data = [];
    this.capacity = capacity;
    this.size = 0;
    this.front = 0;
    this.rear = 0;
  }

  isFull() {
    return this.size === this.capacity;
  }

  isEmpty() {
    return this.size === 0;
  }

  enqueue(item) {
    if (this.isFull()) return false;

    this.data[this.rear] = item;
    this.rear = (this.rear + 1) % this.capacity;
    this.size++;
    return true;
  }

  dequeue() {
    if (this.isEmpty()) return undefined;

    let item = this.data[this.front];
    this.front = (this.front + 1) % this.capacity;
    this.size--;
    return item;
  }

  front() {
    if (this.isEmpty()) return undefined;

    return this.data[0];
  }

  rear() {
    if (this.isEmpty()) return undefined;

    return this.data[this.size - 1];
  }

  clear() {
    this.data.length = 0;
    this.size = 0;
    this.front = 0;
    this.rear = 0;
  }
}
```

Queue vòng cũng tương tự như Queue thông thường. Tuy nhiên, bạn cũng có thể thấy là mình không sử dụng phương thức **push()** hay **shift()** nữa.

Thực chất, khi mình **enqueue()** thì kích thước của Array tự mở rộng ra, ví dụ:

```js
const a = [];
a[0] = 1;
a[1] = 2;

console.log(a);
// => (2) [1, 2]
```

Còn khi **dequeue()**, do mình không sử dụng **shift()** nên kích thước của array không thay đổi. Vì vậy, để quản lý các phần tử trong Queue, mình cần thêm 3 biến là: _size_, _front_ và _rear_.

Trong đó:

- _size_: số lượng phần tử trong Queue

- _front_: là chỉ số của phần tử đầu tiên

- _rear_: là chỉ số của phần tử cuối cùng

Ngoài ra, để thể hiện **tính vòng của Queue** thì mình tận dụng chức năng của **phép chia dư**, cụ thể:

```js
// enqueue
this.rear = (this.rear + 1) % this.capacity;

// dequeue
this.front = (this.front + 1) % this.capacity;
```

**Tại sao sử dụng như trên lại vòng được?**

Để đơn giản, giả sử capacity = 10. Khi đó chỉ số của các phần tử trong mảng là: 0, 1, 2,...9. Nếu chỉ số đang là 9 thì cộng vượt lên 1 đơn vị sẽ thành 10. Mà ta có kết quả `10 % 10` bằng 0. Nên chỉ số mới sẽ là 0. Như vậy, ta luôn thu được chỉ số của các phần tử trong mảng là: 0, 1, 2,...9.

Ngoài ra, cách trên có thể biểu diễn đơn giản nhưng dài dòng hơn là:

```js
// enqueue
this.rear++;
if (this.rear >= this.capacity) this.rear = 0;

// dequeue
this.front++;
if (this.front >= this.capacity) this.front = 0;
```

## So sánh hiệu năng 2 cách triển khai Queue trong JavaScript

### Kịch bản test

Để test 2 cách triển khai Queue trong JavaScript với Queue thông thường và Queue vòng, mình viết một đoạn code như sau:

```js
const Capacity = 5000000;
const TestCase = 10;

// Test queue thông thường
const queue = new AQueue(Capacity);

/**
 * // Test queue vòng
 * const queue = new CQueue(Capacity);
 */

const start = performance.now();

for (let tc = 0; tc < TestCase; tc++) {
  for (let i = 0; i < Capacity; i++) {
    queue.enqueue(i);
  }

  for (let i = 0; i < Capacity; i++) {
    queue.dequeue();
  }
}

const end = performance.now();
const duration = (end - start) / TestCase;

console.log(`Duration: ${duration} ms`);
```

Cách test hoàn toàn tương tự như khi test với Stack nên mình sẽ không giải thích gì thêm.

### Môi trường test

Lần này mình cũng test trên Console của Google Chrome. Bạn có thể mở Console này bằng cách nhấn tổ hợp phím (Ctrl + Shift + I) hoặc F12 giống như test với Stack.

### Kết quả

Sau khi test xong mình thu được kết quả:

- Queue thông thường: **~80 ms/testcase**

- Queue vòng: **~120 ms/testcase**

Kết quả có sự chênh lệnh chút ít. Tuy nhiên, theo mình thấy thì độ lệnh cũng không đáng kể. Vì rất có thể thời gian này còn phụ thuộc vào lúc đó, máy tính của bạn đang chạy mượt mà hay ì ạch nữa.

Vì vậy, mình đánh giá 2 cách này có hiệu quả tương đương nhau. Tuy nhiên, về cách triển khai thì cách 1 sẽ đơn giản hơn - nhưng đây chỉ là đánh giá với JavaScript thôi nhé, vì JavaScript có hỗ trợ phương thức **shift()**.

## Lời kết

Trên đây là 2 cách triển khai Queue trong JavaScript với Array là: **queue thường** và **queue vòng**. Hy vọng qua bài viết này bạn hiểu được cấu trúc dữ liệu Queue, các phương thức cơ bản và ứng dụng của nó.

_Bình thường, bạn có hay sử dụng và triển khai Queue chưa? Nếu có, thì cách mà bạn triển khai Queue là như thế nào? Chia sẻ lại với mình và mọi người nhé!_

Xin cám ơn và hẹn gặp lại!

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
