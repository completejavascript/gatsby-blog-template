---
date: '2019-10-15T06:00:00Z'
template: 'post'
title: 'Sắp xếp Tiếng Việt trong JavaScript'
slug: sap-xep-tieng-viet-javascript
keywords: 'sắp xếp tiếng việt trong JavaScript'
description: 'Bài viết này sẽ giới thiệu với bạn một cách sắp xếp Tiếng Việt trong JavaScript cực kỳ đơn giản, ngắn gọn và hiệu quả.'
cover: '../images/sap-xep-tieng-viet-javascript-completejavascript.com.png'
categories:
  - Thủ thuật JavaScript
tags:
  - Array
---

Sắp xếp là một bài toán không thể thiếu trong lập trình. Tuy nhiên, mình thấy nhiều bạn vẫn đang gặp khó khăn với việc sắp xếp Tiếng việt trong JavaScript. Vì vậy, bài viết này sẽ giới thiệu với bạn về cách mình giải quyết bài toán này.

## Cơ bản về hàm sort() trong JavaScript

Trong bài viết [Array Sorting - vấn đề muôn thuở](/array-sorting-van-de-muon-thuo), mình đã giới thiệu với bạn khá chi tiết về hàm [sort()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort), cũng như cách implement một số [thuật toán](/tag/thuat-toan) sắp xếp cơ bản. Bạn có thể đọc bài viết đó để hiểu rõ hơn về chúng.

Còn bây giờ, mình sẽ nhắc lại hàm sort() một chút cho bạn tiện theo dõi. Vì mình sẽ sử dụng hàm này để sắp xếp Tiếng Việt trong JavaScript.

Cú pháp cơ bản của hàm sort() với **compareFunction**:

```js
arr.sort(compareFunction);
```

### Tham số

Tham số **compareFunction** là [hàm](/tim-hieu-function-javascript/) dùng để xác định thứ tự sắp xếp. Nếu bạn bỏ qua tham số này thì mặc định JavaScript sẽ sắp xếp theo thứ tự tăng dần trong bảng mã Unicode (hay đơn giản thì cứ gọi là thứ tự tăng dần bảng chữ cái).

### Giá trị trả về

[Mảng](/javascript-array-co-ban/) đã được sắp xếp (mảng ban đầu có bị thay đổi).

Ví dụ:

```js
const a = ['c', 'g', 'w', 'a'];
const b = a.sort();
console.log(a); // => ["a", "c", "g", "w"]
console.log(b); // => ["a", "c", "g", "w"]
```

### Tìm hiểu compareFunction

Hàm **compareFunction** dùng để xác định thứ tự sắp xếp. Giả sử, a và b là hai phần tử dùng để so sánh:

- Nếu compareFunction(a, b) trả về giá trị &lt; 0 thì a sẽ đứng trước b.
- Nếu compareFunction(a, b) trả về giá trị &gt; 0 thì a sẽ đứng sau b.
- Nếu compareFunction(a, b) trả về giá trị bằng 0 thì không sắp xếp (giữ nguyên thứ tự).

Như vậy là mình đã giúp bạn nhớ lại cơ bản về cách sử dụng hàm sort() trong JavaScript rồi. Tiếp theo, mình bắt đầu áp dụng nó để sắp xếp Tiếng Việt trong JavaScript.

## Sắp xếp Tiếng Việt trong JavaScript

### Đặt bài toán

Giả sử mình có một mảng string Tiếng Việt là tên một số tỉnh thành tại Việt Nam:

```js
const provinces = [
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hòa Bình',
  'Hưng Yên',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang'
];
```

Mình cần sắp xếp các tên này theo thứ tự tăng dần của bảng chữ cái Tiếng Việt. Kết quả mong muốn thu được là:

```js
const sorted = [
  'Hà Giang',
  'Hà Nam',
  'Hà Nội',
  'Hà Tĩnh',
  'Hải Dương',
  'Hải Phòng',
  'Hậu Giang',
  'Hòa Bình',
  'Hưng Yên'
];
```

### Sắp xếp Tiếng Việt bằng hàm sort() thông thường

Bây giờ, mình thử sắp xếp mảng trên bằng hàm sort() xem sao. Vì mặc định hàm sort() sẽ sắp xếp string theo thứ tự tăng dần nên mình không cần truyền vào **compareFunction**.

Do đó, kết quả thu được như sau:

```js
const result = provinces.sort();
console.log(result);

/*
[
  "Hà Giang", 
  "Hà Nam", 
  "Hà Nội", 
  "Hà Tĩnh", 
  "Hòa Bình", 
  "Hưng Yên", 
  "Hải Dương", 
  "Hải Phòng", 
  "Hậu Giang"
]
*/
```

Bạn thấy đó, kết quả trên là sai so với mong muốn ban đầu. Vậy mình phải làm sao đây?

### Sắp xếp Tiếng Việt trong JavaScript với localeCompare()

Nguyên nhân hàm sort() trên thực hiện sai là vì nó đang thực hiện so sánh string với Tiếng Anh. Do đó, mấu chốt của vấn đề là: làm sao mình có thể so sánh được string với Tiếng Việt để đưa vào hàm sort() mặc định?

Câu trả lời là: sử dụng hàm **localeCompare()**.

Nếu cần thì bạn có thể tìm hiểu sâu hơn về hàm [localeCompare()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/localeCompare). Tuy nhiên, trong phạm vi bài viết này, bạn chỉ cần biết rằng: hàm này dùng để so sánh string ở các ngôn ngữ trên thế giới.

Cú pháp cơ bản của hàm localeCompare() là:

```js
a.localeCompare(b);
```

Có 3 trường hợp xảy ra với kết quả trả về:

- Nếu kết quả trả về &lt; 0 thì a sẽ đứng trước b.
- Nếu kết quả trả về &gt; 0 thì a sẽ đứng sau b.
- Nếu kết quả trả về bằng 0 thì a và b giống nhau.

Thật là trùng hợp, cách hoạt động của hàm localeCompare() lại hoàn toàn giống với **compareFunction** bên trên. Vì vậy, mình có thể áp dụng ngay vào để sắp xếp Tiếng Việt như sau:

```js
const result = provinces.sort((a, b) => a.localeCompare(b));
console.log(result);

/*
[
  "Hà Giang", 
  "Hà Nam", 
  "Hà Nội", 
  "Hà Tĩnh", 
  "Hải Dương", 
  "Hải Phòng", 
  "Hậu Giang", 
  "Hòa Bình", 
  "Hưng Yên"
]
*/
```

Kết quả thu được bây giờ hoàn toàn đúng với mong đợi.

## Lời kết

Như vậy là mình đã có thể sắp xếp Tiếng Việt trong JavaScript một cách đơn giản rồi phải không bạn?

Ngoài cách làm trên ra thì bạn còn phương pháp nào khác có thể áp dụng để sắp xếp Tiếng Việt trong JavaScript không?

Nếu có thì chia sẻ với mình và mọi người nhé!

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
