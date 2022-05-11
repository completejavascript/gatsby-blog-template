---
date: "2017-07-14T06:00:00Z"
update: "2022-05-11T20:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/chuyen-callback-thanh-promise-trong-javascript.png"
keywords: "callback thành promise"
description: "Callback có khá nhiều nhược điểm. Bài viết này sẽ hướng dẫn bạn cách chuyển callback thành promise trong JavaScript."
slug: chuyen-callback-thanh-promise-trong-javascript
title: "Chuyển callback thành promise trong JavaScript"
shortTitle: "Chuyển callback thành promise trong JS"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Callback
  - Promise
---

Trong các bài viết trước, bạn đã biết cách sử dụng [Callback](/callback-la-gi-callback-trong-javascript/) và [Promise](/promise-la-gi-promise-trong-javascript/) để xử lý bất đồng bộ trong JavaScript. Và bạn cũng thấy rằng callback có khá nhiều nhược điểm.

Vì vậy, bài viết này mình hãy cùng tìm hiểu về cách để chuyển đổi callback sang promise trong JavaScript.

Để hiểu rõ hơn, bạn hãy xem ví dụ sau đây.

## Ví dụ chuyển callback sang promise

Tiếp tục với ví dụ mà mình đề cập từ bài viết về callback, đó là hàm `loadScript(src, callback)` như sau:

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}

// Sử dụng:
// loadScript('path/script.js', (err, script) => {...})
```

Hàm trên tải một đoạn mã JavaScript từ đường dẫn cho trước là `src`, rồi gọi `callback(err)` trong trường hợp có lỗi hoặc `callback(null, script)` khi tải thành công.

Đó là quy ước thường được sử dụng với callback trong JavaScript.

## Chuyển callback thành promise

Sau đây, mình sẽ chuyển hàm trên từ callback thành promise.

Cụ thể, mình tạo hàm mới `loadScriptPromise(src)`. Hàm này hoạt động tương tự như trên, nhưng trả về promise thay vì sử dụng callback.

Nói cách khác, mình chỉ truyền vào hàm giá trị `src` mà không truyền `callback` và trả về một promise. Hàm này sẽ `resolve` khi tải `script` thành công, ngược lại thì `reject`.

Đây là code chuyển callback thành promise:

```js
let loadScriptPromise = function (src) {
  return new Promise((resolve, reject) => {
    loadScript(src, (err, script) => {
      if (err) {
        reject(err);
      } else {
        resolve(script);
      }
    });
  });
};

// Sử dụng:
// loadScriptPromise('path/script.js').then(...)
```

Như bạn có thể thấy, hàm mới là thực chất là một **wrapper** bọc lấy hàm ban đầu `loadScript`. Và rõ ràng, hàm `loadScriptPromise` đã khá tốt với cách dùng theo kiểu promise.

Trong thực tế, bạn có thể phải chuyển callback thành promise với nhiều hàm khác nhau chứ không chỉ một hàm. Vì vậy, cách tốt nhất là mình viết một hàm **helper** cho việc này.

Mình sẽ gọi hàm này là `promisify(f)` - nhận vào hàm `f` để chuyển thành promise và trả về một hàm **wrapper**.

```js
function promisify(f) {
  // trả về một hàm wrapper (*)
  return function (...args) {
    return new Promise((resolve, reject) => {
      // callback cho hàm f (**)
      function callback(err, result) {
        if (err) {
          reject(err);
        } else {
          resolve(result);
        }
      }

      // push callback vào cuối danh sách arguments trong f
      args.push(callback);

      // gọi hàm gốc
      f.call(this, ...args);
    });
  };
}

// Sử dụng:
// let loadScriptPromise = promisify(loadScript);
// loadScriptPromise(...).then(...);
```

Đoạn code trên có vẻ hơi phức tạp, nhưng về cơ bản cách này giống với những gì mình đã viết ở trên - khi chuyển hàm `loadScript` thành promise `loadScriptPromise`.

Lời gọi hàm `promisify(f)` trả về một **wrapper** bọc xung quanh hàm `f` tại `(*)`. Hàm wrapper đó trả về một promise và [chuyển tiếp lời gọi hàm](/decorator-forwarding-ham-trong-javascript/) đến hàm gốc `f`. Sau đó, kết quả được kiểm tra trong hàm callback tại `(**)`.

Ở đây, hàm `promisify` giả sử rằng hàm ban đầu mong đợi một hàm callback với chính xác hai đối số `(err, result)`. Đó là cách làm phổ biến nhất.

Sau đó, hàm callback có định dạng chính xác và `promisify` hoạt động tốt cho trường hợp như vậy.

Nhưng điều gì sẽ xảy ra nếu hàm gốc`f` cần một hàm callback với nhiều đối số hơn như sau: `callback(err, res1, res2, ...)`?

Mình có thể cải thiện hàm **helper** bằng cách:

- Khi được gọi dạng `promisify(f)`, hàm `promisify` hoạt động tương tự như trên.
- Khi được gọi dạng `promisify(f, true)`, hàm `promisify` trả về promise với việc `resolve` một mảng các kết quả.

```js
// promisify(f, true) để trả về một mảng kết quả
function promisify(f, manyArgs = false) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      // callback
      function callback(err, ...results) {
        if (err) {
          reject(err);
        } else {
          // nếu manyArgs thì resolve với một mảng kết quả
          resolve(manyArgs ? results : results[0]);
        }
      }

      args.push(callback);
      f.call(this, ...args);
    });
  };
}

// Sử dụng:
// f = promisify(f, true);
// f(...).then(arrayOfResults => ..., err => ...);
```

Như bạn thấy về cơ bản, hàm này khá giống với cách làm trước đó. Nhưng `resolve` được gọi với một đối số hay một mảng là tùy thuộc vào giá trị của `manyArgs`.

Đối với các định dạng hàm callback lạ hơn, chẳng hạn như không có `err`, kiểu như `callback(result)`, bạn có thể chuyển callback về promise theo cách riêng tùy từng trường hợp.

Ngoài ra, có nhiều **module** có chức năng chuyển callback về promise linh hoạt hơn một chút, ví dụ như [es6-promisify](https://github.com/mikehall314/es6-promisify). Trong Node.js, có sẵn một hàm cho việc đó là: [`util.promisify`](https://nodejs.org/api/util.html#utilpromisifyoriginal).

## Tổng kết

Chuyển callback thành promise là một cách tiếp cận tuyệt vời, đặc biệt là khi bạn sử dụng `async/await`.

Tuy nhiên, không phải là mọi trường hợp đều tương đương khi chuyển callback về promise. Bởi vì, một promise chỉ có một kết quả, nhưng về mặt kỹ thuật, callback có thể được gọi nhiều lần.

Vì vậy, cách chuyển callback về promise như trên chỉ phù hợp với các hàm gọi callback một lần.

Tham khảo: [Promisification](https://javascript.info/promisify)
