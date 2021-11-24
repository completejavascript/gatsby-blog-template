---
date: "2017-05-02T20:00:00Z"
update: "2021-11-04T21:00:00Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/kieu-du-lieu-trong-javascript.png"
keywords: "kiểu dữ liệu trong JavaScript"
description: "Mỗi giá trị đều có một kiểu dữ liệu nhất định. Sau đây mình sẽ tìm hiểu xem kiểu dữ liệu là gì, các kiểu dữ liệu trong JavaScript và cách kiểm tra kiểu dữ liệu của một biến."
slug: kieu-du-lieu-trong-javascript
title: "Các kiểu dữ liệu trong JavaScript"
series: "JavaScript: JavaScript cơ bản"
tags:
  - Kiểu dữ liệu
---

Trong hai bài viết về [biến](/bien-la-gi-bien-trong-javascript/) và [hằng](/hang-la-gi-hang-trong-javascript/) trong JavaScript, mình có đề cập đến việc **gán giá trị** cho biến và hằng. Ở đó, mỗi giá trị đều có một kiểu dữ liệu nhất định. Vậy bạn có biết kiểu dữ liệu là gì và các kiểu dữ liệu trong JavaScript là gì không?

Sau đây mình sẽ cùng tìm hiểu về các kiểu dữ liệu cơ bản trong JavaScript. Còn về chi tiết của từng kiểu dữ liệu thì mình sẽ giới thiệu ở các bài tiếp theo.

Bạn nhớ theo dõi chuyên mục [JavaScript](/javascript/) để không bỏ lỡ bài viết mới nhất.

## Kiểu dữ liệu là gì?

Kiểu dữ liệu là một cách phân loại dữ liệu cho [trình biên dịch](https://vi.wikipedia.org/wiki/Tr%C3%ACnh_bi%C3%AAn_d%E1%BB%8Bch) hoặc [trình thông dịch](https://vi.wikipedia.org/wiki/Tr%C3%ACnh_th%C3%B4ng_d%E1%BB%8Bch) hiểu về kiểu của dữ liệu đang sử dụng.

Đối với nhiều ngôn ngữ lập trình, khi khai báo một biến, bạn phải chỉ rõ biến đó thuộc kiểu dữ liệu gì. Nhưng đối với JavaScript thì khác, một biến có thể thuộc bất kỳ kiểu dữ liệu nào, ví dụ:

```js
let x = 999;
console.log(x); // 999

x = "Helloworld";
console.log(x); // Helloworld
```

Bạn thấy rằng, biến `x` ban đầu được gán giá trị **kiểu số**. Nhưng sau đó, mình gán lại giá trị kiểu **chuỗi kí tự** cho biến `x` và không có lỗi nào xảy ra.

> Đây vừa là **ưu điểm**, nhưng cũng là **nhược điểm** của JavaScript.
>
> - **Ưu điểm**: kiểu dữ liệu linh động giúp việc lập trình trở nên linh hoạt hơn.
> - **Nhược điểm**: khi chương trình trở nên phức tạp, số lượng dòng code nhiều lên, có thể bạn sẽ khó kiểm soát kiểu dữ liệu của biến, dẫn đến sai trong việc xử lý, tính toán.

## Các kiểu dữ liệu trong JavaScript

JavaScript có **8 kiểu dữ liệu cơ bản**, trong đó, có 7 kiểu dữ liệu nguyên thủy (**boolean, null, undefined, number, BigInt, string, symbol**) và 1 kiểu dữ liệu dạng tham chiếu (**object**).

> **Kiểu dữ liệu nguyên thủy**: là kiểu dữ liệu mà giá trị không thể thay đổi được. Đây là kiểu dữ liệu ứng với "level thấp nhất" của ngôn ngữ lập trình.
>
> **Kiểu dữ liệu tham chiếu** (object): là tập hợp của các thuộc tính (key) và giá trị (value). Mà số lượng các key có thể thay đổi, giá trị ứng với key cũng có thể thay đổi. Do đó, giá trị của kiểu dữ liệu tham chiếu có thể thay đổi được.

### Kiểu dữ liệu boolean (kiểu logic)

Boolean là kiểu dữ liệu logic chỉ bao gồm hai giá trị là `true` (đúng, chính xác) và `false` (sai, không chính xác), ví dụ:

```js
let isWebLoaded = true; // => Trang web đã được tải xong
console.log(isWebLoaded); // true

let isProgramRunning = false; // Chương trình đang không chạy
console.log(isProgramRunning); // false
```

### Kiểu dữ liệu null

Kiểu dữ liệu **null** là một kiểu dữ liệu đặc biệt, chỉ bao gồm một giá trị là `null`, ví dụ:

```js
let language = null;
console.log(language); // null
```

Trong ví dụ trên, biến `language` được hiểu là **không biết giá trị** hoặc **không có giá trị**.

### Kiểu dữ liệu undefined

Cũng tương tự như **null**, **undefined** là một kiểu dữ liệu đặc biệt trong JavaScript, chỉ bao gồm một giá trị `undefined`, ví dụ:

```js
let language = undefined;
console.log(language); // undefined
```

Kiểu dữ liệu **undefined** có nghĩa là **giá trị chưa được gán**.

> 📝 Khác nhau cơ bản giữa **undefined** và **null**:
>
> Kiểu dữ liệu **null** là kiểu dữ liệu **được gán** cho biến, thường được hiểu là **không biết** (không có).
>
> Trong khi đó, kiểu dữ liệu **undefined** là giá trị mặc định của biến sau khi khai báo mà **không gán giá trị** cho biến.

Ví dụ khai báo biến mà không gán giá trị:

```js
let language;
console.log(language); // undefined
```

Trường hợp biến đã có giá trị rồi, bạn vẫn có thể chủ động gán lại giá trị **undefined** cho biến. Tuy nhiên, điều này là không nên. Vì như vậy là không đúng ý nghĩa của kiểu dữ liệu **undefined**.

```js
let language = "JavaScript";
console.log(language); // JavaScript

// KHÔNG NÊN
language = undefined;
console.log(language); // undefined

// NÊN
language = null;
console.log(language); // null
```

### Kiểu dữ liệu number

Kiểu dữ liệu number là kiểu dữ liệu dạng số (tương tự trong toán học). Number trong JavaScript không có cú pháp gì đặc biệt. Bạn chỉ cần viết số ra.

JavaScript có hai loại số là: **số nguyên** và **số thực**.

```js
let n1 = 66; // số nguyên dương
let n2 = -66; // số nguyên âm
let n3 = 3.14; // số thực dương
let n4 = -3.14; // số thực âm
let n5 = 2e3; // => 2*10^3 = 2000
let n6 = 2e-3; // => 2*10^(-3) = 0.002
let n7 = 0xff; // số dạng hexa (hệ cơ số 16): 15*16 + 15 = 255
let n8 = 067; // số dạng octa (hệ cơ số 8): 6*8 + 7 = 55
let n9 = 0b11; // số dạng nhị phân (hệ cơ số 2): 1*2 + 1 = 3
```

Ngoài những loại số trên, JavaScript còn có 3 số đặc biệt là: **Infinity**, **-Infinity** và **NaN**.

- **Infinity**: là số dương vô cùng. Đây là giá trị đặc biệt và nó **lớn hơn** bất kỳ số nào khác. Bạn có thể sử dụng giá trị này trực tiếp hoặc thu được nó bằng cách lấy **lấy số dương bất kỳ chia cho 0** (toán tử chia trong JavaScript là `/`).

```js
console.log(Infinity); // Infinity
console.log(1 / 0); // Infinity
```

- **-Infinity**: là số âm vô cùng. Đây cũng là giá trị đặc biệt và nó **nhỏ hơn** bất kỳ số nào khác. Bạn có thể sử dụng giá trị này trực tiếp hoặc thu được nó bằng cách lấy **lấy số âm bất kỳ chia cho 0**.

```js
console.log(-Infinity); // -Infinity
console.log(-1 / 0); // -Infinity
```

- **NaN**: là viết tắt của **Not a Number**, được sử dụng để đại diện cho những trường hợp tính toán sai hoặc kết quả của một phép tính không xác định.

```js
// Lấy 0 / 0
console.log(0 / 0); // NaN

// Lấy chuỗi ký tự chia cho số
console.log("JavaScript" / 2); // NaN

// Lấy hai số Infinity trừ cho nhau
console.log(Infinity - Infinity); // NaN
```

> Nhờ những số đặc biệt này mà việc tính toán trong JavaScript "luôn an toàn".
>
> Vì chương trình sẽ không bao giờ bị [crash](<https://vi.wikipedia.org/wiki/Crash_(m%C3%A1y_t%C3%ADnh)>) do lỗi **chia cho 0** hay giá trị **không phải số**. Điều mà bạn có thể gặp phải ở nhiều ngôn ngữ khác như C/C++, Java,...

### Kiểu dữ liệu BigInt

Trong JavaScript, kiểu dữ liệu **number** không thể biểu diễn một số **nguyên** lớn hơn <code>(2<sup>53</sup>-1)</code> (bằng **9007199254740991**) và nhỏ hơn <code>-(2<sup>53</sup>-1)</code>.

Với hầu hết các trường hợp, việc sử dụng kiểu dữ liệu **number** là quá đủ. Nhưng đôi khi, bạn vẫn cần biểu diễn và tính toán với những số nguyên cực kỳ lớn. Do đó, kiểu dữ liệu **BigInt** ra đời nhằm giải quyết vấn đề này.

Để biểu diễn số nguyên với kiểu **BigInt**, bạn chỉ cần thêm chữ cái `n` ở phía sau, ví dụ:

```js
const reallyBigNumber = 12345678987654321012345678987654321n;
console.log(reallyBigNumber); // 12345678987654321012345678987654321n
```

### Kiểu dữ liệu string

String là kiểu dữ liệu dùng để biểu diễn chữ, văn bản, đoạn văn bản,...

Có ba cách để biểu diễn string trong JavaScript:

- Dùng dấu nháy đơn (`'`)
- Dùng dấu nháy kép (`"`)
- Dùng dấu "backtick" (<code>`</code>)

Ví dụ:

```
const msg1 = 'Đây là string dùng dấu nháy đơn';
const msg2 = "Đây là string dùng dấu nháy kép";
const msg3 = `Đây là string dùng dấu backtick`;
```

Dấu nháy đơn và dấu nháy kép là hoàn toàn giống nhau.

Riêng với dấu "backtick", bạn có thể sử dụng biến, hằng hoặc thậm chí viết một biểu thức trong đó, với cú pháp `${…}`, ví dụ:

```js
// Truyền biến vào trong dấu "backtick"
let name = "Lam";
console.log(`My name is ${name}`); // My name is Lam

// Truyền hằng vào trong dấu "backtick"
const language = "JavaScript";
console.log(`You are learning ${language}`); // You are learning JavaScript

// Truyền vào biểu thức
console.log(`1 + 2 = ${1 + 2}`); // 1 + 2 = 3
```

> String trong JavaScript có thể chỉ gồm 1 kí tự `"a"`, nhiều kí tự `"abc"` hoặc không kí tự nào `""` (empty string).

### Kiểu dữ liệu symbol

Symbol là một kiểu dữ liệu nguyên thủy dùng để tạo ra các giá trị duy nhất (**unique value**) và bất biến (**immutable**). Symbol thường được dùng làm **key** cho kiểu dữ liệu **object** sau đây.

> Mình đã viết một bài chi tiết về Symbol. Bạn có thể [tìm hiểu về Symbol trong JavaScript](/tim-hieu-ve-symbol-trong-javascript/) để hiểu nhiều hơn về kiểu dữ liệu này.

### Kiểu dữ liệu object

Object là kiểu dữ liệu tham chiếu. Có thể hiểu **object** là một tập hợp gồm các cặp **key - value (khóa - giá trị)**.

Trong đó, kiểu dữ liệu của **key** có thể là **string** hoặc **symbol**. Và **value** ứng với **key** có thể là bất kỳ kiểu dữ liệu nào.

> Mình sẽ tìm hiểu sâu hơn về **object** trong bài viết [JavaScript Object - last but not least](/object-la-gi-object-trong-javascript/).

## Cách xác định kiểu dữ liệu của biến

Như mình đã nói ở trên, một biến trong JavaScript có thể thuộc bất kỳ kiểu dữ liệu nào. Để xác định kiểu dữ liệu hiện tại của một biến, JavaScript cung cấp cho bạn `typeof`, với hai loại cú pháp:

- Dạng toán tử `typeof x`.
- Dạng hàm `typeof(x)`.

Kết quả trả về sẽ là một `string` ứng với tên của kiểu dữ liệu. Ví dụ về toán tử `typeof` với các kiểu dữ liệu trong JS:

```js{17,18,21,22,25,26}
let x;
console.log(typeof x); // undefined

x = true;
console.log(typeof x); // boolean

x = 1;
console.log(typeof x); // number

x = 1234567891234567890123456789125345362n;
console.log(typeof x); // bigint

x = "hello";
console.log(typeof x); // string

// (1)
x = Symbol("id");
console.log(typeof x); // symbol

// (2)
x = { n: 1 };
console.log(typeof x); // object

// (3)
x = null;
console.log(typeof x); // object
```

> Cần nói thêm về ba trường hợp (1), (2), (3).
>
> (1): Cách khởi tạo **symbol** sẽ trình bày chi tiết ở bài [tìm hiểu về Symbol trong JavaScript](/tim-hieu-ve-symbol-trong-javascript/).
>
> (2): Cách tạo **object** sẽ trình bày chi tiết ở bài [JavaScript Object - last but not least](/object-la-gi-object-trong-javascript/).
>
> (3): Đây có thể coi là một lỗi của `typeof` được tạo ra khi JavaScript mới xuất hiện. Nhưng vì tính tương thích ngược, nên đặc điểm này của `typeof` vẫn được giữ đến bây giờ.

## Tổng kết

Sau đây là tóm tắt những kiến thức cơ bản về các kiểu dữ liệu trong JavaScript:

JavaScript có **8 kiểu dữ liệu cơ bản**, trong đó, có 7 kiểu dữ liệu nguyên thủy (**boolean, null, undefined, number, BigInt, string, symbol**) và 1 kiểu dữ liệu dạng tham chiếu (**object**).

- Kiểu dữ liệu `boolean`: bao gồm hai giá trị `true` và `false` dùng để biểu diễn **đúng** và **sai**.
- Kiểu dữ liệu `null`: chỉ gồm một giá trị `null`, dùng để biểu thị trạng thái **không biết giá trị**.
- Kiểu dữ liệu `undefined`: chỉ gồm một giá trị `undefined`, dùng để biểu thị trạng thái **chưa gán giá trị**.
- Kiểu dữ liệu `number`: dùng để biểu diễn số nguyên hoặc số thực. Trong đó, số nguyên giới hạn trong đoạn <code>±(2<sup>53</sup>-1</code>.
- Kiểu dữ liệu `BigInt`: dùng để biểu diễn số nguyên lớn, có độ dài tùy ý. Để biểu diễn số thuộc kiểu `BigInt`, bạn chỉ cần thêm chữ cái `n` ở cuối.
- Kiểu dữ liệu `string`: dùng để biểu diễn kí tự, chuỗi ký tự,... bằng cách sử dụng dấu nháy đơn (`'`), nháy kép (`"`) hoặc dấu "backtick" (<code>`</code>). Mỗi string có thể chứa một kí tự, nhiều kí tự hoặc không chứa kí tự nào (empty string).
- Kiểu dữ liệu `symbol`: dùng để tạo ra những giá trị duy nhất, thường dùng làm "key" cho `object`.
- Kiểu dữ liệu `object`: là tập hợp của các cập **key-value**.

Để kiểm tra kiểu dữ liệu của một biến, bạn có thể sử dụng `typeof`.

- Có hai dạng: dạng toán tử `typeof x` hoặc ở dạng hàm `typeof(x)`.
- Kết quả trả về là một `string` ứng với tên của kiểu dữ liệu.
- `typeof null` trả về `object`. Đây là một lỗi sơ khai của JavaScript. Thực chất, `null` không phải là `object`.
