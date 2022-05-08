---
date: "2017-07-08T10:40:00Z"
update: "2022-05-08T10:40:48Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/callback-la-gi-callback-trong-javascript.png"
keywords: "callback là gì, callback trong javascript"
description: "Callback trong JavaScript là một cách lập trình để xử lý các hành động bất đồng bộ. Callback là một hàm - đóng vai trò là đối số trong một hàm khác. Bài viết sau sẽ giúp bạn hiểu thực sự callback là gì."
slug: callback-la-gi-callback-trong-javascript
title: "Callback là gì? Callback trong JavaScript"
series: "JavaScript: Xử lý bất đồng bộ"
tags:
  - Callback
  - Hàm
---

Trong bài viết trước, mình đã giới thiệu cơ bản về [xử lý bất đồng bộ](/xu-ly-bat-dong-bo-callback-promise-async-await/) trong JavaScript. Bài viết này mình sẽ giới thiệu chi tiết hơn về **callback trong JavaScript**.

Thực tế, JavaScript có nhiều hàm cho phép bạn xử lý **không đồng bộ**. Nói cách khác, các hành động được bắt đầu ngay bây giờ, nhưng chúng sẽ kết thúc sau đó.

Ví dụ một trong những hàm như vậy là [`setTimeout`](https://developer.mozilla.org/en-US/docs/Web/API/setTimeout).

Ngoài ra, có những ví dụ thực tế khác về các hành động bất đồng bộ, như việc tải các tập lệnh và **module**.

Hãy xem hàm `loadScript(src)` sau - dùng để tải về một tập lệnh với `src`:

```js
function loadScript(src) {
  // tạo một phần tử script
  // gán giá trị cho thuộc tính `src` và thêm vào `head`
  // điều này sẽ giúp trình duyệt tải đoạn script đó về
  let script = document.createElement("script");
  script.src = src;
  document.head.append(script);
}
```

Đoạn code trên chèn vào `document` một đoạn `script` được tạo động bởi `<script src="…">` với đối số `src` được truyền vào hàm. Sau đó, trình duyệt tự động tải về `script` và thực thi khi tải hoàn tất.

Bạn có thể dùng hàm trên như sau:

```js
loadScript("/my/script.js");
```

Tập lệnh tải về được thực thi **bất đồng bộ**, vì nó bắt đầu tải về ngay khi gọi hàm, nhưng chạy sau khi tải về kết thúc.

Nếu có bất kỳ câu lệnh nào bên dưới `loadScript(…)` thì câu lệnh đó sẽ thực hiện ngay mà không đợi cho đến khi quá trình tải `script` kết thúc.

```js
loadScript("/my/script.js");
// code sau lệnh loadScript
// không đợi cho đến khi load script kết thúc
// ...
```

Giả sử, mình cần sử dụng tập lệnh mới ngay khi tải xong. Tập lệnh đó khai báo các chức năng mới và mình muốn chạy chúng (ví dụ các thư viện JavaScript).

Nhưng nếu mình làm điều đó ngay sau lời gọi hàm `loadScript(…)` thì sẽ bị lỗi:

```js
loadScript("/my/script.js"); // định nghĩa hàm "function newFunction(){…}"
newFunction(); // -> lỗi hàm newFunction() chưa được định nghĩa.
```

Bởi vì, việc tải về `script` là tốn thời gian. Và việc bạn gọi hàm `newFunction` ngay sau đó sẽ bị lỗi vì `script` chưa được tải xong.

Vấn đề đặt ra là: mình cần biết khi nào tập lệnh được tải xong để sử dụng các hàm và biến mới từ tập lệnh đó.

Để giải quyết vấn đề này, bạn có thể sử dụng **hàm callback**.

## Callback là gì?

Hãy thêm một hàm `callback` làm đối số thứ hai của hàm `loadScript` để thực thi khi tập lệnh tải xong:

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}
```

Bây giờ, nếu bạn muốn gọi các hàm mới từ script thì nên viết chúng bên trong `callback`:

```js
loadScript("/my/script.js", function () {
  // callback được gọi sau khi script được load
  newFunction(); // tại thời điểm này hàm newFunction đã tồn tại
});
```

Ý tưởng của callback trong JavaScript: sử dụng đối số thứ hai là một hàm (thường là [hàm ẩn danh](/function-expression-trong-javascript/)) để chạy khi hành động được hoàn thành.

Sau đây là một ví dụ thực tế với script là thư viện [lodash](https://lodash.com/):

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(script);
  document.head.append(script);
}

loadScript(
  "https://cdnjs.cloudflare.com/ajax/libs/lodash.js/3.2.0/lodash.js",
  (script) => {
    console.log(`Cool, the script ${script.src} is loaded`);
    console.log(_); // hàm _ là một hàm trong lodash
  }
);
```

Cách làm trên được gọi là: kiểu lập trình không đồng bộ **dựa trên callback**. Tức là một hàm thực hiện điều gì đó bất đồng bộ sẽ cung cấp một đối số `callback` - để đặt hàm muốn chạy trong đó ngay sau khi hàm bất đồng bộ hoàn tất.

Ở đây, mình ví dụ với việc `loadScript`. Tuy nhiên, **callback trong JavaScript** là một cách tiếp cận chung được áp dụng ở nhiều trường hợp.

## Callback trong callback

Làm cách nào để tải tuần tự hai `script`: tập lệnh đầu tiên và tập lệnh thứ hai ngay sau đó?

Giải pháp bình thường sẽ là đặt lời gọi hàm `loadScript` thứ hai bên trong callback của lần gọi thứ nhất, như sau:

```js
loadScript("/my/script.js", function (script) {
  console.log(`Cool, the ${script.src} is loaded, let's load one more`);

  loadScript("/my/script2.js", function (script) {
    console.log(`Cool, the second script is loaded`);
  });
});
```

Sau khi lần gọi `loadScript` bên ngoài hoàn tất, callback sẽ được gọi và thực hiện gọi `loadScript` lần thứ hai.

Nhưng vấn đề đặt ra nếu bạn phải tải về nhiều tập lệnh hơn thì sao?

```js
loadScript("/my/script.js", function (script) {
  loadScript("/my/script2.js", function (script) {
    loadScript("/my/script3.js", function (script) {
      // ...tiếp tục sau khi load xong
    });
  });
});
```

Như vậy, mọi hành động mới đều nằm trong callback của hành động trước.

Điều đó là **OK** trong trường hợp có một vài hành động, nhưng sẽ là **không OK** khi có nhiều hành động.

Đó là lý do mà JavaScript có các biến thể khác để xử lý bất đồng bộ như **Promise** hay **Async/await** mà mình sẽ giới thiệu kỹ hơn trong các bài viết sau.

## Xử lý lỗi trong callback

Trong các ví dụ trên, mình không quan tâm đến trường hợp lỗi.

**Nhưng điều gì sẽ xảy ra nếu quá trình tải tập lệnh không thành công?**

Callback cần phải xử lý được vấn đề đó.

Sau đây là một phiên bản cải tiến của hàm `loadScript` cho phép kiểm tra/xử lý lỗi:

```js
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;
  script.onload = () => callback(null, script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));
  document.head.append(script);
}
```

Bây giờ hàm `loadScript` sẽ gọi `callback(null, script)` nếu tải thành công và gọi `callback(error)` nếu có lỗi.

Cách sử dụng:

```js
loadScript("/my/script.js", function (error, script) {
  if (error) {
    // xử lý lỗi
  } else {
    // script được tải thành công
  }
});
```

Ở đây, cách thức mà mình sử dụng `loadScript` khá phổ biến. Cách này được gọi là **error-first callback** - nghĩa là callback với việc kiểm tra lỗi trước.

Quy ước là:

1. Đối số đầu tiên của hàm `callback` được dành riêng cho một lỗi nếu nó xảy ra. Sau đó `callback(err)` được gọi.
2. Đối số thứ hai (và những đối số tiếp theo nếu cần) là cho kết quả thành công. Sau đó `callback(null, result1, result2…)` được gọi.

Vì vậy, hàm `callback` được sử dụng cho cả việc báo lỗi và chuyển lại kết quả.

## Vấn đề callback hell

Thoạt nhìn, cách làm trên có vẻ khả thi đối với việc lập trình không đồng bộ. Và thực sự là như vậy. Đối với một hoặc có thể hai lời gọi hàm lồng nhau, cách làm trên vẫn tốt.

Nhưng với nhiều hành động không đồng bộ nối tiếp nhau, mình sẽ có đoạn code dạng như sau:

```js
loadScript("1.js", function (error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("2.js", function (error, script) {
      if (error) {
        handleError(error);
      } else {
        // ...
        loadScript("3.js", function (error, script) {
          if (error) {
            handleError(error);
          } else {
            // ...tiếp tục xử lý (*)
          }
        });
      }
    });
  }
});
```

Trong đoạn code trên:

1. Đầu tiên, tải `1.js`, sau đó nếu không có lỗi…
2. Tải `2.js`, sau đó nếu không có lỗi…
3. Tải `3.js`, sau đó nếu không có lỗi - làm điều gì đó khác `(*)`.

Khi các lời gọi hàm trở nên lồng nhau nhiều hơn, cấu trúc code trở nên sâu hơn và ngày càng khó quản lý hơn.

Đặc biệt, nếu bạn có đoạn code thực tế thay vì mã `...` như trên - đó có thể bao gồm nhiều [vòng lặp](/vong-lap-trong-javascript/) hay [câu lệnh điều kiện](/cau-truc-re-nhanh-trong-javascript/), v.v.

Đó chính là **callback hell** - làm cho đoạn code trở nên xấu và cực kỳ khó quản lý. Vì vậy, cách viết code như này là không thực sự tốt.

Để khắc phục vấn đề trên, mình có thể tách logic trên thành các hàm độc lập như sau:

```js
loadScript("1.js", step1);

function step1(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("2.js", step2);
  }
}

function step2(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...
    loadScript("3.js", step3);
  }
}

function step3(error, script) {
  if (error) {
    handleError(error);
  } else {
    // ...tiếp tục xử lý (*)
  }
}
```

Với cách làm trên, rõ ràng kết quả thu được hoàn toàn tương tự nhưng không còn cấu trúc code lồng nhau thành nhiều tầng như trước.

Tuy nhiên, có một vấn đề khác phát sinh. Đó là **logic code bị xé nhỏ**. Nghĩa là bạn phải di chuyển lên xuống nhiều để theo dõi và hiểu hết toàn bộ logic code.

Ngoài ra, các hàm `step*` trên đều chỉ sử dụng một lần. Chúng được tạo ra chỉ để tránh **callback hell**. Nói cách khác, các hàm đó chỉ nên được sử dụng trong một chuỗi các hàm, chứ không nên gọi độc lập.

## Tổng kết

Callback trong JavaScript cũng khá tốt khi xử lý bất đồng bộ, nhưng chỉ nên sử dụng khi có một hoặc hai hành động bất đồng bộ lồng nhau.

Trường hợp có nhiều hành động bất đồng bộ hơn thì bạn nên sử dụng các cách khác tốt hơn. Đó chính là: **Promise** hoặc **Async/await**.

Tham khảo: [Introduction: callbacks](https://javascript.info/callbacks)
