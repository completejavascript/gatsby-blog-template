---
date: "2018-01-24T12:00:10Z"
update: "2018-08-01T12:00:10Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/trien-khai-thuat-toan-undo-redo-javascript-completejavascript.com_.png"
keywords: "triển khai thuật toán undo-redo"
description: "Đối với hầu hết các ứng dụng (text editor, sửa ảnh,...) việc triển khai thuật toán Undo-Redo là thật sự cần thiết. Dưới đây là một cách triển khai đơn giản."
slug: trien-khai-thuat-toan-undo-redo-trong-javascript
title: "Triển khai thuật toán Undo-Redo trong JavaScript"
series: "JavaScript: Bài toán thực tế"
tags:
  - Thuật toán
---

Đối với hầu hết các ứng dụng (text editor, chỉnh sửa ảnh,...), việc triển khai [thuật toán](/tag/thuat-toan/) Undo-Redo là thật sự cần thiết. Tuy nhiên, để hiểu và triển khai thuật toán này thì không hề đơn giản chút nào. Vì vậy, bài viết này mình sẽ cố gắng chia sẻ với các bạn những kiến thức mà mình rút ra sau khi đọc và tìm hiểu rất nhiều hướng dẫn trên mạng. Qua đó, bạn có thể dễ dàng triển khai thuật toán Undo-Redo với bất kì ngôn ngữ nào, chứ không chỉ giới hạn ở JavaScript.

## Vai trò của việc triển khai thuật toán Undo-Redo

Có lẽ không cần phải nói nhiều về vai trò của thuật toán Undo-Redo. Vì nó hiện diện ở hầu hết các ứng dụng mà lập trình viên chúng ta sử dụng hằng ngày. Công cụ này giúp lưu lại trạng thái của ứng dụng mỗi khi có một sự thay đổi diễn ra.

Nhờ đó mà người dùng có thể đưa ứng dụng quay trở lại trạng thái cũ hoặc từ trạng thái cũ tiến lên trạng thái mới hơn.

## Cách thức hoạt động của Undo-Redo

Giả sử, bạn đã lưu lại trạng thái ứng dụng là: S[0], S[1], S[2],..., S[i],..., S[n-1], S[n].

Trong đó:

- S[0] là trạng thái đầu tiên
- S[n] là trạng thái mới nhất của ứng dụng
- S[i] là trạng thái hiện tại của ứng dụng

### Cách thức hoạt động của Undo

**Undo** là hoạt động đưa ứng dụng về trạng thái cũ hơn với bước nhảy là 1: S[n] → S[n-1] → ... → S[1] → S[0]. Nghĩa là bạn chỉ có thể thực hiện Undo khi bạn đang ở trạng thái S[i] với i > 0.

![Cách thức hoạt động của Undo](../../../images/javascript/cach-thuc-hoat-dong-undo-completejavascript.com_.png)

### Cách thức hoạt động của Redo

Ngược lại với Undo, **Redo** là hoạt động đưa ứng dụng về trạng thái mới hơn với bước nhảy là 1: S[0] → S[1] → ... → S[n-1] → S[n]. Nghĩa là bạn chỉ có thể thực hiện Redo khi bạn đang ở trạng thái thứ S[i] với i < n.

![Cách thức hoạt động của Redo](../../../images/javascript/cach-thuc-hoat-dong-redo-completejavascript.com_.png)

### Cách thức hoạt động của phần Thêm trạng thái

Khi có một trạng thái mới được thêm vào tập các trạng thái của Undo-Redo, sẽ có 2 trường hợp mà bạn cần phải quan tâm:

- Ứng dụng đang ở trạng thái mới nhất S[n]: Trường hợp này đơn giản, bạn chỉ cần thêm trạng thái S[n + 1] vào sau trạng thái S[n]. Khi đó, tập trạng thái của ứng dụng là: S[0], S[1], S[2],..., S[n-1], S[n], S[n+1].

![Thêm trạng thái vào Undo-Redo trường hợp 1](../../../images/javascript/them-trang-thai-th1-completejavascript.com_.png)

- Ứng dụng đang ở trạng thái cũ S[i] với i < n: Trường hợp này xảy ra khi bạn đã thực hiện ít nhất một lần Undo. Lúc này, bạn phải xoá đi toàn bộ các trạng thái từ S[i+1] đến S[n]. Sau đó, mới thêm trạng thái S'[i+1] vào sau S[i]. Khi đó, tập trạng thái của ứng dụng là: S[0], S[1], S[2],..., S[i], S'[i+1]. Điều đó cũng có nghĩa là bạn sẽ không thể đưa ứng dụng tới các trạng thái S[i+1], S[i+2],..., S[n], sau khi đã chèn trạng thái S'[i+1] vào.

![Thêm trạng thái vào Undo-Redo trường hợp 2](../../../images/javascript/them-trang-thai-th2-completejavascript.com_.png)

_Chú ý: Trạng thái S'[i+1] khác với S[i+1] và S'[i+1] đang là trạng thái mới nhất hiện tại._

## Triển khai thuật toán Undo-Redo

Dựa vào cách thức hoạt động của Undo-Redo đã trình bày phía trên, mình quyết định sẽ sử dụng Stack để lưu lại tập các trạng thái của ứng dụng. Tuy nhiên, để đơn giản mình sẽ sử dụng 2 Stack, 1 stack cho Undo và 1 stack cho Redo.

Dưới đây là code mình triển khai thuật toán Undo-Redo trong JavaScript (các ngôn ngữ khác cũng tương tự):

```js
class UndoRedoHandler {
  constructor(currentstate) {
    this._undoStack = [];
    this._redoStack = [];
    this._redoStack.push(currentstate);
  }

  insert(state) {
    this._undoStack.push(this._redoStack.pop());
    this._redoStack.length = 0;
    this._redoStack.push(state);
  }

  getPrevState() {
    if (this._undoStack.length >= 1) {
      let state = this._undoStack.pop();
      this._redoStack.push(state);
      return state;
    }
  }

  getNextState() {
    if (this._redoStack.length >= 2) {
      let state = this._redoStack.pop();
      this._undoStack.push(state);
      return this._redoStack[this._redoStack.length - 1];
    }
  }

  clear() {
    if (this._redoStack.length >= 1) {
      let state = this._redoStack.pop();
      this._undoStack.length = 0;
      this._redoStack.length = 0;
      this._redoStack.push(state);
    }
  }
}
```

### Triển khai phần Khởi tạo

```js
constructor(currentstate) {
  this._undoStack = [];
  this._redoStack = [];
  this._redoStack.push(currentstate);
}
```

Thực chất, [array trong JavaScript](/javascript-array-co-ban/) có thể đóng vai trò là Stack, với sự hỗ trợ của các phương thức _push_, _pop_. Do đó, mình khởi tạo Undo Stack - _this.\_undoStack_ và Redo Stack - _this.\_redoStack_ là các mảng rỗng. Sau đó, _push_ trạng thái hiện tại của ứng dụng _currentstate_ vào _this.\_redoStack_.

![Khởi tạo Undo, Redo Stack](../../../images/javascript/khoi-tao-completejavascript.com_.png)

**Mục đích: mình sẽ sử dụng đỉnh của Redo Stack để lưu giá trị hiện tại của ứng dụng.**

Nghĩa là: một cách tổng quát, _this.\_undoStack_ sẽ lưu các trạng thái từ S[0] đến S[i-1] và _this.\_redoStack_ sẽ lưu các trạng thái từ S[i] đến S[n]. Với S[i] là giá trị hiện tại của ứng dụng, nằm tại đỉnh của _this.\_redoStack_.

![Trạng thái tổng quát của Undo, Redo Stack](../../../images/javascript/trang-thai-undo-redo-stack-completejavascript.com_.png)

Dĩ nhiên, bạn có thể cho trạng thái hiện tại vào _this.\_undoStack_ hoặc tạo thêm một biến để lưu trạng thái này. Khi đó, bạn chỉ cần sửa lại code một chút. Về cơ bản, chúng vẫn giống nhau, nên bạn có thể làm theo cách của mình.

### Triển khai phần Thêm trạng thái

```js
insert(state) {
  this._undoStack.push(this._redoStack.pop());
  this._redoStack.length = 0;
  this._redoStack.push(state);
}
```

Khi thêm một trạng mới vào ứng dụng thì trạng thái hiện tại phải được đưa vào Undo Stack. Do đó mình phải _pop_ state S[i] tại đỉnh của Redo Stack (là giá trị hiện tại của ứng dụng), để _push_ vào Undo Stack:

```js
this._undoStack.push(this._redoStack.pop());
```

Sau đó, toàn bộ trạng thái S[i+1] đến S[n] bị xoá đi. Tức là _this.\_redoStack_ phải bị xoá đi:

```js
this._redoStack.length = 0;
```

Cuối cùng trạng thái _state_ mới nhất sẽ được đưa vào _this.\_redoStack_:

```js
this._redoStack.push(state);
```

![Trạng thái của Undo, Redo Stack sau khi thêm trạng thái](../../../images/javascript/trang-thai-undo-redo-stack-sau-khi-them-trang-thai-completejavascript.com_.png)

### Triển khai phần Undo

```js
getPrevState() {
  if (this._undoStack.length >= 1) {
    let state = this._undoStack.pop();
    this._redoStack.push(state);
    return state;
  }
}
```

Undo tức là quay trở về trạng thái cũ. Nghĩa là trạng thái cũ phải tồn tại thì bạn mới thực hiện Undo được. Ở đây, điều kiện Undo được là _this.\_undoStack_ phải khác rỗng hay _this.\_undoStack.length >= 1_.

Khi điều kiện Undo thoả mãn, bạn có thể thực hiện những thứ sau đây.

Bạn nhớ rằng, trạng thái hiện tại của ứng dụng là S[i]. Undo sẽ đưa ứng dụng về trạng thái S[i-1].

Nghĩa là bạn phải _pop_ trạng thái S[i-1] từ _this.\_undoStack_.

```js
let state = this._undoStack.pop();
```

Trạng thái S[i-1] này sẽ được _push_ vào _this.\_redoStack_.

```js
this._redoStack.push(state);
```

Và _return_ để sử dụng cho việc thay đổi trạng thái ứng dụng.

```js
return state;
```

![Trạng thái của Undo, Redo Stack sau khi Undo](../../../images/javascript/trang-thai-undo-redo-stack-sau-khi-undo-completejavascript.com_.png)

### Triển khai phần Redo

```js
getNextState() {
  if (this._redoStack.length >= 2) {
    let state = this._redoStack.pop();
    this._undoStack.push(state);
    return this._redoStack[this._redoStack.length - 1];
  }
}
```

Redo tức là đưa về trạng thái mới hơn. Mà trạng thái mới hơn lại được lưu trữ tại Redo Stack.

Khác với Undo Stack, trạng thái tại đỉnh của Redo Stack luôn là trạng thái hiện tại của ứng dụng. Do đó, để thực hiện Redo thì trong Redo Stack phải có ít nhất 2 phần tử (1 là trạng thái hiện tại, 1 là trạng thái mới hơn).

```js
this._redoStack.length >= 2;
```

Khi thực hiện Redo, trạng thái hiện tại phải được _pop_ khỏi Redo Stack.

```js
let state = this._redoStack.pop();
```

Sau đó, trạng thái này được _push_ ngược lại vào Undo Stack.

```js
this._undoStack.push(state);
```

Lúc này trạng thái mới hơn (cần di chuyển đến) đang nằm ở đỉnh của Redo Stack. Mình cần phải _return_ lại giá trị này để sử dụng cho việc thay đổi trạng thái ứng dụng:

```js
return this._redoStack[this._redoStack.length - 1];
```

![Trạng thái của Undo, Redo Stack sau khi redo](../../../images/javascript/trang-thai-undo-redo-stack-sau-khi-redo-completejavascript.com_.png)

### Triển khai phần Clear

```js
clear() {
  if (this._redoStack.length >= 1) {
    let state = this._redoStack.pop();
    this._undoStack.length = 0;
    this._redoStack.length = 0;
    this._redoStack.push(state);
  }
}
```

Đây là phần mình thêm vào. Phương thức _clear_ này sẽ giữ lại trạng thái hiện tại của ứng dụng, bằng cách _pop_ trạng thái tại đỉnh của Redo Stack:

```js
let state = this._redoStack.pop();
```

Tiếp theo là xoá bỏ hết tất cả các trạng thái trong 2 Stack bằng cách gán _length_ của chúng bằng 0:

```js
this._undoStack.length = 0;
this._redoStack.length = 0;
```

Cuối cùng lưu lại trạng thái hiện tại của ứng dụng vào Redo Stack - giống như mình đã làm trong phần khởi tạo.

```js
this._redoStack.push(state);
```

![Trạng thái của Undo, Redo Stack sau khi clear](../../../images/javascript/trang-thai-undo-redo-stack-sau-khi-clear-completejavascript.com_.png)

## Demo sử dụng thuật toán Undo-Redo

https://codepen.io/completejavascript/pen/EpoKZo

Đây là một ứng dụng demo đơn giản sử dụng thuật toán Undo-Redo. Ứng dụng này có khả năng thay đổi **nội dung** và **màu sắc** của chữ _UNDO-REDO_.

Nghĩa là mình có thể lưu trạng thái của ứng dụng bằng một [object](/javascript-object-last-but-not-least/) với 2 trường thông tin là: **text** và **color**.

Cụ thể:

**Phần khởi tạo**:

```js
const undoRedoHandler = new UndoRedoHandler({
  text: textDefault,
  color: colorDefault,
});
```

**Phần thêm trạng thái**:

```js
undoRedoHandler.insert({
  text: _content.value,
  color: _color.value,
});
```

**Phần Undo**:

```js
const state = undoRedoHandler.getPrevState();

if (state) {
  applyPreview(state.text, state.color);
}
```

**Phần Redo**:

```js
const state = undoRedoHandler.getNextState();

if (state) {
  applyPreview(state.text, state.color);
}
```

**Phần clear**:

```js
undoRedoHandler.clear();
```

Bạn có thể chạy thử chương trình để thấy rõ được sự thay đổi sau khi thực hiện các lệnh Undo, Redo và Clear.

## Lời kết

Trên đây là cách thức triển khai thuật toán Undo-Redo, cũng như cách mình áp dụng nó trong ví dụ thực tế. Dĩ nhiên, với mỗi bài toán cụ thể, bạn sẽ cần phải tuỳ chỉnh lại cách triển khai sao cho phù hợp và tối ưu nhất. Chưa kể đến việc triển khai thuật toán này trên các ngôn ngữ khác có thể sẽ phức tạp hơn JavaScript một chút. Nhưng dù sao thì mình hy vọng rằng bạn đã phần nào hiểu được cách thức triển khai thuật toán Undo-Redo này. Và biến nó thành của chính bạn.

Nếu có phần nào chưa hiểu, cần góp ý hoặc sự giúp đỡ của mình thì bạn có thể để lại dưới phần bình luận phía dưới.

Còn bây giờ thì xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/trien-khai-lazy-loading-image-voi-es6-va-css/), thân ái!

## Tham khảo

- [Part 1: Undo/Redo Implementation in C# using Single Object Representing Change Approach](https://www.codeproject.com/Articles/33371/Multilevel-Undo-and-Redo-Implementation-in-C-Part)
- [Part 2: Undo/Redo Implementation in C# using Command Pattern](https://www.codeproject.com/Articles/33384/Multilevel-Undo-and-Redo-Implementation-in-Cshar-2)
- [Part 3: Undo/Redo Implementation in C# using Memento Pattern](https://www.codeproject.com/Articles/33397/Multilevel-Undo-and-Redo-Implementation-in-Csharp)
