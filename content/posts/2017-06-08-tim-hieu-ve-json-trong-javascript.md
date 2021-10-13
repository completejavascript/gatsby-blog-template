---
date: "2017-06-08T00:21:47Z"
template: "post"
cover: "../images/tim-hieu-ve-json-trong-javascript-completejavascript.com_.png"
keywords: "json"
description: "Bài viết này mình sẽ tìm hiểu tổng quan về JSON, ứng dụng và cách sử dụng JSON trong JavaScript. Ngoài ra, mình cũng so sánh nó với JavaScript Object."
slug: tim-hieu-ve-json-trong-javascript
title: "Tìm hiểu về JSON trong JavaScript"
categories:
  - Javascript cơ bản
tags:
  - JSON
---

Cách đây khoảng 3 - 4 năm, khi đang học về lập trình Android, mình đã bắt đầu được tiếp xúc với JSON. Gần đây, mình mới biết nguồn gốc của nó lại liên quan đến JavaScript - khi mình bắt đầu học ngôn ngữ này. Vậy JSON là gì? Nó có tác dụng gì ? Và cách sử dụng nó như thế nào? Sau đây, chúng ta sẽ cùng tìm hiểu.

## Tổng quan về JSON

JSON viết tắt bởi **JavaScript Object Notation**. Dịch nôm na thì nó là "Kí hiệu object trong JavaScript".

```json
{
  "type": "laptop",
  "brand": "Sony",
  "operating system": "Windows 7",
  "graphic card": "NVIDIA"
}
```

Nếu bạn đã biết về [JavaScript Object](/javascript-object-last-but-not-least) thì bạn có thể thấy rằng ví dụ trên cũng chính là biểu diễn cho một Object trong JavaScript. Trong đó, gồm có hai thành phần:

- **keys**: _type, brand, operating system, graphic card_
- **values**: _laptop, Sony, Windows 7, NVIDIA_

> **Chú ý:** Trong bài viết này, mình sẽ chỉ quan tâm đến **JSONObject** - nghĩa là sau khi parse string loại này mình sẽ thu được Object. Nhưng thực chất, JSON có nhiều loại: _null, boolean, JSONNumber, JSONArray,..._ Để biết thêm chi tiết về cú pháp các loại này, mới bạn theo dõi tại [đây](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#Full_JSON_syntax).

## Ứng dụng

JSON thường được dùng trong cơ sở dữ liệu NoSQL (ví dụ như [MongoDB](/cai-dat-mongodb-tren-windows-moi-nhat)) và là một chuẩn giao tiếp trên web.

Khi một client gửi [request](/xmlhttprequest-tao-http-request-den-server-trong-javascript) lên server thì server có thể gửi kết quả trả về dạng JSON (hoặc XML). Client bóc tách kết quả đó và dựa vào **key** để lấy ra thông tin cần thiết. Việc sử dụng JSON thay vì XML giúp giảm thời gian truy xuất dữ liệu và giảm dung lượng gói tin.

Quay lại ví dụ trên, nếu mình dùng XML để biểu diễn thì nó sẽ như sau:

```xml
<type> laptop </type>
<brand> Sony </brand>
<operatin_system> Windows 7 </operating_system>
<graphic_card> NVIDIA </graphic_card>
```

Rõ ràng, XML phức tạp hơn ở chỗ là XML cần phải có 2 thành phần **thẻ** **đóng** và **thẻ mở** để xác định một thuộc tính. Trong khi JSON chỉ cần 1 thành phần là **key**.

## So sánh với JavaScript Object

Mặc dù JSON rất giống JavaScript Object nhưng vẫn có một số giới hạn khác như:

- **Key**: luôn luôn phải được đóng gói trong cặp dấu ngoặc kép, không phải ngoặc đơn, cũng không được phép là biến số (variable)
- **Value**: Chỉ được phép là những dữ liệu cơ bản như [numbers](/values-types-va-operators-trong-javascript-phan-1), [strings, Boolean](/values-types-va-operators-trong-javascript-phan-2), [array](/javascript-array-co-ban), object, null, không được phép là [function](/tim-hieu-function-javascript), date, undefined hoặc là một biểu thức tính toán.
- Không được phép tồn tại **dấu phẩy cuối cùng** như JavaScript Object.
- Đối với **number** thì không được phép có chữ số 0 ở đầu. Ngoài ra, nếu đó là chữ số thập phân thì phải có ít nhất 1 chữ số sau dấu chấm **(.)**.

Sau đây là ví dụ minh họa.

### Ví dụ về JSON không hợp lệ

```js
// Key dạng biến số - không nằm trong cặp dầu ngoặc kép
const str1 = `{ text : "X", "number": 1990 }`;

// Key đặt trong cặp dấu ngoặc đơn
const str2 = `{'text': "X", "number": 1990 }`;

// Có dấu phẩy cuối cùng
const str3 = `{"text": "X", "number": 1990, }`;

// Value là undefined
const str4 = `{"text": "X", "number": undefined }`;

// Value chứa biểu thức tính toán
const str5 = `{"text": "X", "number": 1 + 1 }`;

// Value là kiểu Date
const str6 = `{"text": "X", "number": new Date() }`;

// Value là function
const str7 = `{"text": "X", "number": function () {} }`;

// Value là number nhưng tồn tại số 0 ở đầu
const str8 = `{"text": "X", "number": 01990 }`;

// Value là số thập phân nhưng sau dấu (.) không có chữ số nào
const str9 = `{"text": "X", "number": 1990. }`;
```

### Ví dụ về JSON hợp lệ

```js
/**
 * Key đặt trong cặp dấu ngoặc kép,
 * không có dấu phẩy ở cuối cùng.
 *
 * Value là string hoặc number - không có chữ số 0 ở đầu
 */
const str1 = `{"text": "X", "number": 1990 }`;

// Nếu value là số thập phân thì sau dấu (.) phải có số
const str2 = `{"text": "X", "number": 1990.2 }`;

// Value có thể là null
const str3 = `{"text": "X", "number": null }`;

// Value có thể là boolean (true, false)
const str4 = `{"text": "X", "number": true }`;

// Value có thể là array
const str5 = `{"text": "X", "number": [1, 2] }`;
```

## Cách sử dụng

JavaScript cung cấp sẵn cho chúng ta hai hàm số là: [JSON.stringify](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify) và [JSON.parse](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse):

- **JSON.stringify** dùng để convert một JavaScript Object thành JSON string.
- **JSON.parse** dùng để convert string biểu diễn JSON thành JavaScript Object.

Hãy xem ví dụ sau:

```js
const string = JSON.stringify({ name: "X", born: 1990 });
console.log(string);
// => {"name":"X","born":1990}

const obj = JSON.parse(string);
console.log(obj.name);
// => X
console.log(obj.born);
// => 1990
```

Điều đó đồng nghĩa với việc nếu bạn muốn chỉnh sửa JSON thì có thể convert nó thành Object để sửa đổi các thuộc tính, giá trị. Sau đó convert JavaScript Object đó ngược lại thành JSON.

## Lời kết

JSON là một thành phần quan trọng dùng để lưu trữ dữ liệu và là chuẩn giao tiếp giữa client và server. Hy vọng qua bài viết này bạn hiểu được JSON là gì và cách sử dụng nó. Vì chắc chắn là bạn sẽ phải sử dụng nó nhiều.

Hẹn gặp lại bạn ở [bài viết sau](/lap-trinh-huong-doi-tuong-voi-javascript), thân ái!

**Tham khảo**

- [Higher-Order Functions](http://eloquentjavascript.net/05_higher_order.html)
- [JavaScript and JSON differences](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON#JavaScript_and_JSON_differences)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
