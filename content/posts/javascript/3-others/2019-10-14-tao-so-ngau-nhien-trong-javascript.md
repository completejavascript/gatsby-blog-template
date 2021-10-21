---
date: "2019-10-14T06:00:00Z"
template: "post"
directory: "JavaScript"
title: "Tạo số ngẫu nhiên trong JavaScript"
slug: tao-so-ngau-nhien-trong-javascript
keywords: "tạo số ngẫu nhiên trong JavaScript"
description: "Bài viết này mình sẽ tổng hợp lại một số biến thể của việc tạo số ngẫu nhiên trong JavaScript với phương thức Math.random() và các ứng dụng của chúng."
cover: "../images/tao-so-ngau-nhien-trong-javascript-completejavascript.com.png"
tags:
  - Thuật toán
---

Có thể bạn đã biết hoặc chưa biết về các cách tạo số ngẫu nhiên trong JavaScript. Tuy nhiên, bài viết này mình sẽ tổng hợp lại một số biến thể của việc tạo số ngẫu nhiên với phương thức **Math.random()**, cũng như các ứng dụng của chúng trong lập trình JavaScript.

## Các phương thức tạo số ngẫu nhiên trong JavaScript

Trước khi bắt đầu, mình cùng điểm qua một số [phương thức](/tim-hieu-function-javascript) tạo số ngẫu nhiên trong JavaScript.

Theo mình biết, JavaScript có hai phương thức tạo số ngẫu nhiên là: [Math.random()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random) và [window.crypto.getRandomValues()](https://developer.mozilla.org/en-US/docs/Web/API/Crypto/getRandomValues).

Trong đó, phương thức **Math.random()** đơn giản và thường hay được sử dụng. Tuy nhiên, phương thức này không an toàn. Vì vậy, nó không được sử dụng trong những bài toán mà số random liên quan đến bảo mật. Thay vào đó, bạn có thể sử dụng phương thức **window.crypto.getRandomValues()**.

> Math.random() does not provide cryptographically secure random numbers. Do not use them for anything related to security. Use the Web Crypto API instead, and more precisely the window.crypto.getRandomValues() method.

Ngoài hai phương án trên, bạn cũng có thể sử dụng thư viện bên thứ 3 như: [random-js](https://www.npmjs.com/package/random-js) hoặc tự implement riêng một phương thức random theo cách của bạn.

Tuy nhiên, trong phạm vi bài viết này, mình sẽ lựa chọn phương thức cơ bản và phổ biến nhất để giới thiệu với bạn. Đó là **Math.random()**.

## Cơ bản về phương thức Math.random()

Phương thức Math.random() trả về số thực trong khoảng lớn hơn hoặc bằng 0 và nhỏ hơn 1.

Ví dụ:

```js
for (let i = 0; i < 10; i += 1) {
  console.log(`Random number ${i}: ${Math.random()}`);
}

/*
Random number 0: 0.6362790593396368
Random number 1: 0.20016914689051535
Random number 2: 0.9761540182954889
Random number 3: 0.7946745165188283
Random number 4: 0.5788527311039566
Random number 5: 0.4805653264156753
Random number 6: 0.12773726117109918
Random number 7: 0.04089013569111888
Random number 8: 0.23153222422299158
Random number 9: 0.5951577021881835
*/
```

Như bạn thấy, kết quả bên trên đều là những số thực ngẫu nhiên lớn hơn hoặc bằng 0 và nhỏ hơn 1.

Nhưng nếu mình muốn tạo số ngẫu nhiên lớn hơn 1 thì sao?

## Các biến thể tạo số ngẫu nhiên trong JavaScript

### Tạo số ngẫu nhiên giữa 2 giá trị

Để tạo số ngẫu nhiên giữa 2 giá trị **min** và **max**, bạn có thể tùy biến phương thức Math.random() như sau:

```js
const getRandomArbitrary = (min, max) => {
  return Math.random() * (max - min) + min;
};
```

Ví dụ tạo số ngẫu nhiên từ 5 đến 20:

```js
for (let i = 0; i < 10; i += 1) {
  console.log(`Random number ${i}: ${getRandomArbitrary(5, 20)}`);
}

/*
Random number 0: 17.615712267356862
Random number 1: 12.854543118290293
Random number 2: 16.70271502093547
Random number 3: 6.809095214107975
Random number 4: 11.191247745457495
Random number 5: 13.933168532576273
Random number 6: 11.900280444819856
Random number 7: 6.0318833321746625
Random number 8: 18.488450961349642
Random number 9: 7.360576167002292
*/
```

Kết quả in ra là hoàn toàn đúng như yêu cầu. Tuy nhiên, nếu mình lại muốn tạo ra các số **nguyên** ngẫu nhiên thì sao?

### Tạo số nguyên ngẫu nhiên giữa 2 giá trị

Để tạo số **nguyên** ngẫu nhiên giữa 2 giá trị, bạn có thể sử dụng kết hợp với phương thức [Math.floor()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/floor) như sau với điều kiện **min** và **max** cũng là 2 số nguyên:

```js
const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};
```

Ví dụ tạo số nguyên ngẫu nhiên từ 5 đến 20:

```js
for (let i = 0; i < 10; i += 1) {
  console.log(`Random number ${i}: ${getRandomInt(5, 20)}`);
}

/*
Random number 0: 11
Random number 1: 19
Random number 2: 8
Random number 3: 11
Random number 4: 19
Random number 5: 13
Random number 6: 18
Random number 7: 8
Random number 8: 6
Random number 9: 17
*/
```

**Chú ý:** Vì phương thức Math.random() trả về số ngẫu nhiên lớn hơn hoặc bằng 0 và nhỏ hơn 1. Nên phương thức **getRandomInt()** sẽ trả về số nguyên ngẫu nhiên lớn hơn hoặc bằng **min** và nhỏ hơn **max**. Để kết quả có thể _nhỏ hơn hoặc bằng max_, bạn có thể tùy chỉnh như sau:

```js
const getRandomIntInclusive = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Ví dụ tạo số nguyên >= 5 và <= 20
for (let i = 0; i < 10; i += 1) {
  console.log(`Random number ${i}: ${getRandomIntInclusive(5, 20)}`);
}

/*
Random number 0: 14
Random number 1: 16
Random number 2: 20
Random number 3: 12
Random number 4: 13
Random number 5: 5
Random number 6: 10
Random number 7: 17
Random number 8: 17
Random number 9: 9
*/
```

**Chú ý:** Kết quả chạy của bạn có thể khác với mình và không xuất hiện số 20. Tuy nhiên, đó cũng là điều bình thường. Vì đây là tạo số ngẫu nhiên mà phải không bạn?

Như vậy là mình đã giới thiệu với bạn một số biến thể của việc tạo số ngẫu nhiên trong JavaScript rồi. Tiếp theo, mình sẽ cùng tìm hiểu về một số ứng dụng của việc tạo số ngẫu nhiên trong JavaScript nhé.

## Một số ứng dụng tạo số ngẫu nhiên trong JavaScript

### Tạo ngẫu nhiên mã màu RGB

Mã màu RGB có dạng như sau: <code>rgb(rValue, gValue, bValue)</code>.

Trong đó, giá trị của _rValue, gValue và bValue_ sẽ lớn hơn hoặc bằng 0 và nhỏ hơn hoặc bằng 255. Vì vậy, mình sẽ sử dụng phương thức **getRandomIntInclusive()** bên trên như sau:

```js
const getRandomRGB = () => {
  const r = getRandomIntInclusive(0, 255);
  const g = getRandomIntInclusive(0, 255);
  const b = getRandomIntInclusive(0, 255);
  return `rgb(${r}, ${g}, ${b})`;
};

// Ví dụ:
for (let i = 0; i < 10; i += 1) {
  console.log(`Random RGB ${i}: ${getRandomRGB()}`);
}

/*
Random RGB 0: rgb(32, 78, 62)
Random RGB 1: rgb(112, 223, 127)
Random RGB 2: rgb(117, 96, 219)
Random RGB 3: rgb(240, 55, 189)
Random RGB 4: rgb(247, 193, 98)
Random RGB 5: rgb(116, 131, 163)
Random RGB 6: rgb(109, 7, 173)
Random RGB 7: rgb(176, 78, 159)
Random RGB 8: rgb(230, 146, 59)
Random RGB 9: rgb(66, 34, 226)
*/
```

### Tạo ngẫu nhiên mã màu HEX

Mã màu HEX có dạng: <code>#RRGGBB</code>.

Trong đó, thành phần _RR_, _GG_ và _BB_ bên trên lần lượt là giá trị của _rValue, gValue và bValue_ ở hệ hexa (thập lục phân hay cơ số 16).

Bạn có thể áp dụng chiến thuật trên bằng cách tạo ngẫu nhiên các giá trị R, G và B bình thường, sau đó format lại chúng thành dạng Hexa như sau:

```js
const getRandomHEX = () => {
  const r = getRandomIntInclusive(0, 255);
  const g = getRandomIntInclusive(0, 255);
  const b = getRandomIntInclusive(0, 255);

  const toHexa = (v) => v.toString(16).padStart(2, "0");
  return `#${toHexa(r)}${toHexa(g)}${toHexa(b)}`;
};

// Ví dụ:
for (let i = 0; i < 10; i += 1) {
  console.log(`Random HEX ${i}: ${getRandomHEX()}`);
}

/*
Random HEX 0: #522220
Random HEX 1: #8921ec
Random HEX 2: #b228f2
Random HEX 3: #53815c
Random HEX 4: #3a3cfd
Random HEX 5: #9d3266
Random HEX 6: #d04b82
Random HEX 7: #3760b9
Random HEX 8: #230ae6
Random HEX 9: #ee7fc7
*/
```

Dưới đây là một ví dụ trực quan về việc tạo ngẫu nhiên mã màu:

https://codepen.io/completejavascript/pen/ExxPENE

### Tạo chuỗi string ngẫu nhiên

Từ nãy giờ, mình mới chỉ tạo số ngẫu nhiên trong JavaScript. Tuy nhiên, nếu mình muốn tạo chuỗi string ngẫu nhiên thì sao?

Đơn giản lắm! Dưới đây là [thuật toán](/tag/thuat-toan) của mình.

Giả sử mình muốn tạo chuỗi string ngẫu nhiên độ dài L với các ký tự thuộc tập hợp cho trước. Khi đó, các bước làm sẽ như sau:

- **Bước 1**: Tạo một chuỗi base string chứa tất cả những ký tự đó.
- **Bước 2**: Tạo số nguyên ngẫu nhiên từ 0 đến độ dài của base string. Đây chính là chỉ số của ký tự trong base string.
- **Bước 3**: Lấy ra ký tự ứng với chỉ số ngẫu nhiên trên.
- **Bước 4**: Lặp lại bước 2 và bước 3 cho đến khi lấy ra đủ số ký tự mong muốn

Cách triển khai:

```js
const baseString =
  "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

const getRandomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

const getRandomString = (length, base) => {
  let result = "";
  const baseLength = base.length;

  for (let i = 0; i < length; i++) {
    const randomIndex = getRandomInt(0, baseLength);
    result += base[randomIndex];
  }

  return result;
};
```

Ví dụ tạo chuỗi string ngẫu nhiên với độ dài 6 với các ký tự từ 0 đến 9, từ a đến z và từ A đến Z:

```js
const baseString =
  "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";

for (let i = 0; i < 10; i += 1) {
  console.log(`Random string ${i}: ${getRandomString(6, baseString)}`);
}

/*
Random string 0: xFfbgC
Random string 1: 6aiAhV
Random string 2: ByyZdz
Random string 3: QbnnvW
Random string 4: R2nlc7
Random string 5: zfYRzV
Random string 6: UixWJ6
Random string 7: 1GrB4B
Random string 8: 8dSpIP
Random string 9: c13nEG
*/
```

Với cách làm trên, mình có thể áp dụng vào bài toán tạo ngẫu nhiên mã màu HEX bằng cách định nghĩa lại base string là các ký tự từ 0 đến 9 và từ a đến f (hoặc từ A đến F):

```js
const getRandomHex2 = () => {
  const baseString = "0123456789ABCDEF";
  return `#${getRandomString(6, baseString)}`;
};

// Ví dụ:
for (let i = 0; i < 10; i += 1) {
  console.log(`Random Hex ${i}: ${getRandomHex2()}`);
}

/*
Random Hex 0: #34A2B9
Random Hex 1: #DFF7EC
Random Hex 2: #B77F77
Random Hex 3: #971AC6
Random Hex 4: #EC9440
Random Hex 5: #B7D8C1
Random Hex 6: #6239AD
Random Hex 7: #FFEEDB
Random Hex 8: #DD5B22
Random Hex 9: #1E0991
*/
```

## Lời kết

Trên đây là một số cách tạo số ngẫu nhiên trong JavaScript và ứng dụng của chúng. Qua bài viết này, bạn đã biết cách:

- Tạo số ngẫu nhiên từ 0 đến 1
- Tạo số ngẫu nhiên giữa 2 giá trị min, max
- Tạo số nguyên ngẫu nhiên giữa 2 giá trị min, max
- Ứng dụng tạo ngẫu nhiên mã màu RGB
- Ứng dụng tạo ngẫu nhiên mã màu HEX
- Ứng dụng tạo chuỗi string ngẫu nhiên với độ dài và các ký tự cho trước

Bạn có thường sử dụng những cách tạo số ngẫu nhiên trên không? Ngoài những cái mình đã đề cập bên trên, bạn còn biết ứng dụng nào khác nữa?

Nếu câu trả lời là **CÓ** thì đừng ngần ngại chia sẻ với mình và mọi người nhé!

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!
