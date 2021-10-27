---
date: "2019-05-15T23:00:23Z"
template: "post"
directory: "React"
cover: "../images/tai-sao-react-yeu-cau-render-single-element-va-cac-cach-giai-quyet-completejavascript.com_.png"
keywords: "render single DOM element"
description: "Khi viết React, chắc hẳn đã ít nhất một lần bạn gặp phải lỗi liên quan đến việc React yêu cầu render single DOM element. Có 4 cách giải quyết vấn đề này."
slug: react-render-single-dom-element
title: "Tại sao React yêu cầu render single DOM element?"
---

Khi viết code [React](/react), chắc hẳn đã ít nhất một lần bạn gặp phải lỗi liên quan đến việc React yêu cầu render single [DOM](/co-ban-ve-dom-javascript) element. Lúc này, cách giải quyết đơn giản nhất là bạn đóng gói các element bởi một cặp thẻ **div** bên ngoài.

Tuy nhiên, đã bao giờ bạn tự hỏi lý do thực sự là do đâu? Liệu đây có phải đây là [bug](/debug-javascript-de-hay-kho) của React? Cách giải quyết lỗi này như thế nào? Và việc đóng gói các element vào thẻ **div** như trên có ưu, nhược điểm gì?

Bài viết này mình sẽ cố gắng giúp bạn giải đáp những thắc mắc trên. Mời bạn theo dõi bài viết!

## Tại sao phải render single DOM element?

Giả sử mình có một component bị **sai** như sau:

```jsx
class App extends React.Component {
  render() {
    return (
      <div> Type: Dog </div>
      <div> Type: Cat </div>
    )
  }
}
```

Phần render trên mình sử dụng [JSX](https://reactjs.org/docs/jsx-in-depth.html) để định nghĩa component. Tuy nhiên, đây chỉ là "syntactic sugar" cho phương thức [React.createElement(component, props, ...children)](https://reactjs.org/docs/react-api.html#createelement) mà thôi.

Do đó, đoạn code trên sẽ tương đương với đoạn code sau:

```jsx
class App extends React.Component {
  render() {
    return (
      React.createElement('div', null, 'Type: Dog')
      React.createElement('div', null, 'Type: Cat')
    )
  }
}
```

Trong đoạn code trên, mỗi hàm **React.createElement** sẽ trả về một React Element. Nghĩa là hàm **render()** của class _App_ sẽ trả về đồng thời về 2 element.

Điều này là hoàn toàn không thể với [hàm](/tim-hieu-function-javascript) trong JavaScript nói riêng và bất kỳ một ngôn ngữ lập trình nào khác nói chung, chứ không phải chỉ có React.

Ví dụ như mình viết một hàm bằng JavaScript thuần sau:

```js
const func = (x, y) => {
  return (x + y)(x - y);
};
```

Hàm _func_ trên là một [arrow function](/phan-biet-arrow-function-va-function-trong-javascript) - return đồng thời _(x + y)_ và _(x - y)_. Và dĩ nhiên là nó sẽ bị thông báo lỗi.

Nói tóm lại, việc React yêu cầu render single DOM element là bắt buộc, chứ không phải do bug của React.

## Một số cách giải quyết vấn đề render single DOM element?

Để giải quyết vấn đề trên, mình thấy có 4 cách như dưới đây.

### Sử dụng thêm một thẻ để đóng gói các Elements

Đây là cách đơn giản nhất mà hầu như ai cũng có thể nghĩ đến đầu tiên. Đó là sử dụng một thẻ để đóng gói các Elements lại.

Khi đó, đoạn code bên trên trở thành:

```jsx
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <div> Type: Dog </div>
        <div> Type: Cat </div>
      </div>
    );
  }
}
```

Rõ ràng, hàm _render()_ trên chỉ return về một React Element duy nhất - thẻ div với _className="app"_.

### Sử dụng React.Fragment

Giả sử mình sửa lại đoạn code trên một chút thành:

```jsx
class App extends React.Component {
  render() {
    return (
      <div className="app">
        <p>Animals:</p>
        <div>Type: Dog</div>
        <div>Type: Cat</div>
      </div>
    );
  }
}
```

Sau đó, mình refactor lại code một chút bằng cách tách 2 thẻ div liên quan đến **Dog** và **Cat** ra một Components mới là **Animals** (việc mình refactor như sau chỉ vì mục đích minh họa):

```jsx
const Animals = () => {
  return (
      <div>Type: Dog</div>
      <div>Type: Cat</div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <p>Animals:</p>
        <Animals />
      </div>
    );
  }
}
```

Tuy nhiên, đến đây thì element _Animals_ lại bị lỗi liên quan đến việc render single DOM element như mình đã nói. Và nếu lại sử dụng cách trên thì đoạn code này trở thành:

```jsx
const Animals = () => {
  return (
    <div>
      <div>Type: Dog</div>
      <div>Type: Cat</div>
    </div>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <p>Animals:</p>
        <Animals />
      </div>
    );
  }
}
```

Về cơ bản thì code đã hết lỗi rồi. Tuy nhiên, nó lại **nảy sinh ra một vấn đề khác**. Đó là đoạn code cuối cùng so với đoạn code ban đầu đã xuất hiện thêm một cặp thẻ **div** không mong muốn.

```html
<div className="app">
  <p>Animals:</p>
  <div>
    <!-- Thẻ div không mong muốn -->
    <div>Type: Dog</div>
    <div>Type: Cat</div>
  </div>
</div>
```

Để giải quyết vấn đề này, bạn có thể sử dụng [React.Fragment](https://reactjs.org/docs/fragments.html) như sau:

```jsx
const Animals = () => {
  return (
    <React.Fragment>
      <div>Type: Dog</div>
      <div>Type: Cat</div>
    </React.Fragment>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <p>Animals:</p>
        <Animals />
      </div>
    );
  }
}
```

Với cách này thì vừa giúp không bị lỗi liên quan đến render single DOM element, mà kết quả cuối cùng lại không bị xuất hiện thêm một thẻ div không mong muốn.

### Sử dụng <></>

Ngoài việc sử dụng _React.Fragment_ như trên, bạn có thể sử dụng cặp **<></>** với kết quả hoàn toàn tương đương nhau:

```jsx
const Animals = () => {
  return (
    <>
      <div>Type: Dog</div>
      <div>Type: Cat</div>
    </>
  );
};

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <p>Animals:</p>
        <Animals />
      </div>
    );
  }
}
```

**Chú ý:** Đây chỉ là một **cú pháp rút gọn** cho React.Fragment chứ không phải một cách hoàn toàn khác.

### Render một mảng các Elements

Ngoài cách làm trên ra, mình mới biết thêm một cách làm khác có vẻ ít dùng hơn. Đó là hàm render sẽ trả về một [mảng](/javascript-array-co-ban) các Elements như sau:

```jsx
const Animals = () => {
  return [<div>Type: Dog</div>, <div>Type: Cat</div>];
};

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <p>Animals:</p>
        <Animals />
      </div>
    );
  }
}
```

## Lời kết

Như vậy, mình đã trình bày xong về lý do tại sao React yêu cầu render single DOM element. Và một số cách giúp bạn khắc phục lỗi trên, đó là:

- Sử dụng thêm một cặp thẻ đóng gói các Elements
- Sử dụng React.Fragment
- Sử dụng <></>
- Render một mảng các Elements

Ngoài các cách làm trên, bạn còn biết cách nào khác nữa không? Nếu biết thì chia sẻ với mình và mọi người nhé!

Xin chào và hẹn gặp lại, thân ái!
