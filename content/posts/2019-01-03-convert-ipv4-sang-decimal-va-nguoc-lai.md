---
date: "2019-01-03T22:30:26Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: convert-ipv4-sang-decimal-va-nguoc-lai
title: "Convert IPv4 sang Decimal và ngược lại"
categories:
  - Thủ thuật JavaScript
tags:
  - ES6
  - Vanilla Js Snippets
---

Chào bạn! Năm mới 2019, mình chúc bạn mạnh khỏe và đạt được tất cả các mục tiêu đã đặt ra... Trong năm 2019, mình cố gắng tìm hiểu, giải quyết và tổng hợp lại những thủ thuật JavaScript hay dùng. Và bài đầu tiên hôm nay, mình sẽ viết về cách convert IPv4 sang Decimal và sau đó là convert ngược lại từ Decimal sang IPv4.

Trước khi bắt đầu, mình muốn giới thiệu với bạn [link của project](https://github.com/jscenter/vanilla-js-snippets) này trên Github. Mình rất trân trọng nếu bạn có thể đóng góp chút ít cho project mã nguồn mở này. Một cách đơn giản nhất là bạn vào phần [Issues](https://github.com/jscenter/vanilla-js-snippets/issues). Sau đó, bạn nhấn vào phần [New issue](https://github.com/jscenter/vanilla-js-snippets/issues/new). Tại đây bạn có thể đưa ra ý tưởng về thủ thuật JavaScript nào đó mà bạn cảm thấy hữu ích. Bất kể thứ gì, dù đơn giản hay phúc tạp cũng được nhé! Mình sẽ cố gắng giải quyết hoặc tìm kiếm giải pháp trên Google, rồi cập nhật vào project. Mình tin rằng đây sẽ là một nguồn tài liệu quý giá cho bạn, cho mình và người khác sau này.

[Xem code trên Github](https://github.com/jscenter/vanilla-js-snippets)

Thôi không lan man nữa, mời bạn theo dõi bài viết!

## Đặc điểm cơ bản của IPv4

[IPv4](https://vi.wikipedia.org/wiki/IPv4) sử dụng 32 bit để đánh địa chỉ. Và địa chỉ IP này được chia ra làm 4 nhóm. Mỗi nhóm gồm 8 bit (gọi là một octet). Mỗi nhóm được phân cách nhau bởi một dấu chấm (**.**). Để tiện theo dõi, mỗi nhóm sẽ được biểu diễn bởi một số ở hệ cơ số 10, ví dụ: **192.0.2.235**

Cách biểu diễn trên là cơ bản nhất. Ngoài ra, còn một số cách biểu diễn địa chỉ IPv4 khác như sau:

- Octet ở hệ cơ số 16: **0xC0.0x00.0x02.0xEB**

- Octet ở hệ cơ số 8: **0300.0000.0002.0353**

- Hệ cơ số 16: **0xC00002EB**

- Hệ cơ số 10: **3221226219**

- Hệ cơ số 8: **030000001353**

Trong phạm vi bài viết này, mình sẽ chia sẻ với bạn cách để convert IPv4 sang Decimal - tức địa chỉ **192.0.2.235** sang địa chỉ **3221226219** và ngược lại.

## Convert IPv4 sang Decimal

### Ý tưởng để convert IPv4 sang Decimal

Như mình đã nói ở trên, mỗi octet sẽ gồm 8 bit - tương ứng với một byte. Vì vậy, mình sẽ chuyển đổi địa chỉ **192.0.2.235** như sau:

[caption id="attachment_3273" align="aligncenter" width="590"]![Ý tưởng convert IPv4 sang Decimal](/wp-content/uploads/2019/01/nguyen-ly-1.png) Ý tưởng convert IPv4 sang Decimal[/caption]

Theo như hình trên, số 235 ở vị trí byte 0, số 2 ở vị trí byte 1, số 0 ở vị trí byte 2 và số 192 ở vị trí byte 3. Hay nói cách khác, số 235 vẫn giữ nguyên vị trí, số 2 dịch trái 1 byte, số 0 dịch trái 2 byte và số 192 dịch trái 3 byte. Khi đó, mình có thể mô phỏng lại bằng hình vẽ sau:

[caption id="attachment_3274" align="aligncenter" width="470"]![Nguyên lý dịch bit](/wp-content/uploads/2019/01/nguyen-ly-dich-bit-1.png) Mô phỏng nguyên lý dịch bit[/caption]

Như vậy, ý tưởng đầu tiên để convert IPv4 sang Decimal đó là: **thực hiện phép dịch bit sang trái (<<) với các số 235, 2, 0, 192 lần lượt là 0, 8, 16, 24 bit. **Sau đó, sử dụng phép bitwise OR (|) để hợp chúng lại với nhau là thu được kết quả.

### Triển khai convert IPv4 sang Decimal theo lý thuyết

Theo như phân tích trên thì giải pháp sẽ là:

```js
const ip = "192.0.2.235";
    const octets = ip.split('.');

    const byte3 = octets[0] << 24; // -> -1073741824
    const byte2 = octets[1] << 16; // -> 0
    const byte1 = octets[2] << 8;  // -> 512
    const byte0 = octets[3] << 0;  // -> 235

    const decimal = byte3 | byte2 | byte1 | byte0;
    console.log(decimal); // => -1073741077
```
Tuy nhiên, như bạn có thể thấy kết quả phép dịch trái 24 bit ra số âm (**-1073741824**). Tại sao lại như vậy?

Đơn giản, vì khi thực hiện phép dịch trái (<<), JavaScript sẽ hiểu kết quả thu được là dạng số nguyên 32 bit có dấu. Mà với số nguyên **32 bit có dấu**, [phạm vi biểu diễn](https://vi.wikipedia.org/wiki/32-bit) sẽ là: -2147483648 đến 2147483647. Với số nguyên **32 bit không dấu**, phạm vi biểu diễn là: 0 đến 4294967295.

Trong khi, nếu đó là số nguyên không dấu thì ta có số **192 << 24** tương đương với **192 \* (2 ^ 24)** (tức 192 nhân với 2 mũ 24 - đây là kiến thức dịch bit căn bản) và bằng **3221225472 **- vượt quá phạm vi biểu diễn số nguyên có dấu. Do đó, mình không thể sử dụng cách này được. Phải nghĩ cách khác thôi.

### Triển khai convert IPv4 sang Decimal cơ bản

Bạn để ý, mỗi octet là một byte nên có giá trị trong khoảng từ 0 đến 255. Nghĩa là mình có thể coi IPv4 là một số có 4 chữ số trong hệ cơ số 256.

Khi đó, địa chỉ **192.0.2.235** có thể được viết là **(192)(0)(2)(235)** - mình cho mỗi số vào trong cặp dấu ngoặc đơn để hiểu đó là một chữ số trong hệ cơ số 256. Suy ra, giá trị trong hệ thập phân của nó là:

    ```html
192 x (256)^3 + 0 x (256)^2 + 2 x (256)^1 + 235 x (256)^0
    = 3221225472 + 0 + 512 + 235
    = 3221226219
```
Kết quả thu được đúng như mong đợi. Vậy code để convert IPv4 sang Decimal bây giờ là:

```js
const ip = "192.0.2.235";
    const octets = ip.split('.');

    const byte3 = octets[0] * Math.pow(2, 24);
    const byte2 = octets[1] * Math.pow(2, 16);
    const byte1 = octets[2] * Math.pow(2, 8);
    const byte0 = octets[3] * Math.pow(2, 0);

    const decimal = byte3 + byte2 + byte1 + byte0;
    console.log(decimal); // => 3221226219
```
### Triển khai convert IPv4 sang Decimal đầy đủ

Đoạn code trên đã giải quyết khá tốt việc convert IPv4 sang Decimal. Tuy nhiên, mình vẫn chưa xử lý việc kiểm tra đầu vào có hợp lệ hay không và cũng chưa viết nó thành một [function](/tim-hieu-function-javascript/) riêng biệt để dễ dàng tái sử dụng sau này. Và sau đây chính là đoạn code khá đầy đủ mà mình đã viết:

```js
/**
     * Convert IPv4 to Decimal
     * @param {String} ip - a String represents an IPv4
     * @returns a decimal if the input is valid. Otherwise, it returns -1.
     */
    function convertIPv4toDecimal(ip) {
      // Simply validate input as IPv4
      const ipv4RegEx = /^(\d{1,3}\.){3}(\d{1,3})$/;
      const valid = ipv4RegEx.test(ip);
      if (!valid) {
        return -1;
      }

      let ipDecimal = 0;
      const octets = ip.split('.');

      for (let i = 0; i < 4; i++) {
        const octet = Number(octets[i]);

        // make sure each value is between 0 and 255
        if (octet > 255 || octet < 0) {
          return -1;
        }

        ipDecimal = ipDecimal * 256 + octet;
      }

      return ipDecimal;
    }
```

Trong đoạn code trên, mình sử dụng [Regex](/tim-hieu-regular-expression-javascript/) để xác định một cách cơ bản đầu vào là địa chỉ IPv4. Tức là địa chỉ IP phải có 4 nhóm, phân tách nhau bởi dấu chấm (**.**) và mỗi nhóm sẽ có số kí tự từ 1 đến 3 (tương ứng giá trị từ 0 đến 255).

Sau đó, mình tách 4 cụm của địa chỉ IP thành [mảng](/javascript-array-co-ban/) để duyệt. Mỗi phần phải đảm bảo có giá trị từ 0 đến 255 thì mới hợp lệ. Nếu địa chỉ IPv4 đầu vào là hợp lệ thì mình sẽ trả về giá trị Decimal của nó. Ngược lại, mình trả về giá trị -1.

Bạn thử tìm hiểu kỹ hơn xem nó hoạt động thế nào nhé! Nếu có gì khó hiểu thì để lại bình luận xuống phía dưới, mình sẽ cố gắng giải đáp.

## Convert Decimal sang IPv4

### Ý tưởng convert Decimal sang IPv4

Bên trên mình đã phân tích khá chi tiết phần dịch bit để convert IPv4 sang Decimal. Qua đó, bạn có thể thấy là: **để convert Decimal sang IPv4 mình sẽ thực hiện dịch bit ngược lại.**

Nghĩa là mình sẽ phân tách số Decimal thành 4 thành byte. Sau đó, thực hiện phép dịch bit sang bên phải với số lần xác định để thu được giá trị octet. Cuối cùng, mình kết hợp 4 giá trị octet lại để thu được giá trị IPv4.

Xét ví dụ cụ thể với số **3221226219**. Và mình cần thu được địa chỉ IPv4 là: **192.0.2.235**

Về cơ bản số, **3221226219** (hệ cơ số 10) sẽ tương ứng với số **0xC00002EB** (hệ cơ số 16). Để tách ra từng byte, mình sẽ thực hiện phép AND (&) với một số đóng vai trò là **mặt nạ** (mask). Sau đó, mình thực hiện dịch bit sang phải để thu được kết quả như mong muốn.

Nói xuông thì hơi khó hiểu, mình sẽ minh họa lại như sau:

3221226219 & 0x**FF**000000 = 0x**C0**0002EB & 0x**FF**000000 = 0x**C0**000000 (lấy byte 3)
3221226219 & 0x00**FF**0000 = 0xC0**00**02EB & 0x00**FF**0000 = 0x00**00**0000 (lấy byte 2)
3221226219 & 0x0000**FF**00 = 0xC000**02**EB & 0x0000**FF**00 = 0x0000**02**00 (lấy byte 1)
3221226219 & 0x000000**FF** = 0xC00002**EB** & 0x000000**FF** = 0x000000**EB** (lấy byte 0)

**Bạn nhớ rằng**: số nào **AND** với 1 thì bằng chính nó, số nào **AND** với 0 thì được 0. Như vậy, giá trị ở những byte cần lấy đã được giữ nguyên, giá trị ở những byte còn lại mình đưa về 0 hết. Rồi tiếp theo, mình thực hiện dịch bit:

    ```html
0xC0000000 >> 24 = 0xC0 = 192
    0x00000000 >> 16 = 0x00 = 0
    0x00000200 >> 8 = 0x02 = 2
    0x000000EB >> 0 = 0xEB = 235
```
Như vậy là mình đã thu được 4 giá trị octet. Công việc còn lại là vô cùng đơn giản.

### Triển khai convert Decimal sang IPv4 theo lý thuyết

Tuy nhiên, bên trên mới chỉ là lý thuyết thôi. Với phần dịch bit này, JavaScript sẽ ngầm định các số là số nguyên 32 bit có dấu. Do đó, kết quả trên sẽ trở thành:

```js
0xC0000000 >> 24 // => -64
    0x00000000 >> 16 // => 0
    0x00000200 >> 8  // => 2
    0x000000EB >> 0  // => 235
```
May thay, JavaScript có hỗ trợ [toán tử >>>](<https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Bitwise_Operators#%3E%3E%3E_(Zero-fill_right_shift)>). Thực ra, mình đọc giải thích cũng thấy hơi loằng ngoằng, khó hiểu. Mình chỉ hiểu đơn giản là toán tử này cho phép dịch bit theo kiểu số nguyên không dấu. Khi đó, đoạn code trên trở thành:

```js
0xC0000000 >>> 24 // => 192
    0x00000000 >>> 16 // => 0
    0x00000200 >>> 8  // => 2
    0x000000EB >>> 0  // => 235
```
### Triển khai convert Decimal sang IPv4 đầy đủ

Tổng hợp những điều trên lại, mình viết được đoạn code đầy đủ như sau:

```js
/**
     * Convert Decimal to IPv4
     * @param {Number} decimal - a Number represents a Decimal
     * @returns an IPv4 as String if the input is valid.
     * Otherwise, it returns an empty string ("").
     */
    function convertDecimalToIPv4(decimal) {
      if (typeof decimal !== "number" ||
          Number.isInteger(decimal) === false ||
          decimal < 0 || decimal > 4294967295
      ) {
        return "";
      }

      const p1 = decimal >>> 24;
      const p2 = (decimal & 0x00ff0000) >>> 16;
      const p3 = (decimal & 0x0000ff00) >>> 8;
      const p4 = (decimal & 0x000000ff);

      if (p1 > 255 || p2 > 255 || p3 > 255 || p4 > 255) {
         return "";
      }

      return `${p1}.${p2}.${p3}.${p4}`;
    }
```

Trong đó, mình có kiểm tra điều kiện cơ bản của số Decimal đầu vào. Tiếp theo, mình thực hiện phép **AND** và dịch bit để thu được các octet. Cuối cùng, mình sử dụng [ES6 Template String](/su-dung-es6-template-string-co-gi-hay/) để hợp các octet lại thành giá trị IPv4.

## Lời kết

Trên đây là cách mình convert IPv4 sang Decimal và ngược lại, convert Decimal sang IPv4. Theo bạn, cách giải thích của mình có dễ hiểu không? Code trên đã tối ưu hay chưa? Mình rất mong nhận được sự góp ý của bạn để hoàn thiện các giải pháp trên.

Ngoài ra, mình rất trân trọng sự đóng góp của bạn vào [project mã nguồn mở](https://github.com/jscenter/vanilla-js-snippets) này trên Github. Vì mình tin rằng project này sẽ đem lại lợi ích to lớn cho bạn và mọi người sau này.

Cuối cùng, xin chào và hẹn gặp lại, thân ái!

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
