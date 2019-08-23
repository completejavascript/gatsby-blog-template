---
date: "2017-05-05T14:29:33Z"
template: "post"
cover: "../images/values-types-operators-trong-javascript-phan-2-strings-boolean-operators-completejavascript.com_.png"
keywords: "Values, types và operators"
description: "Hôm nay, mình sẽ tiếp tục giới thiệu về hai kiểu dữ liệu cơ bản khác đó là strings và Booleans, cùng với một số toán tử (operator) phổ biến."
slug: values-types-va-operators-trong-javascript-phan-2
title: "Values, types và operators trong JavaScript - Phần 2"
categories:
  - Javascript cơ bản
---

Trong [bài viết trước](/values-types-va-operators-trong-javascript-phan-1/), mình đã giới thiệu với bạn cơ bản về giá trị (values) và kiểu dữ liệu (numbers). Hôm nay, mình sẽ tiếp tục giới thiệu về hai kiểu dữ liệu cơ bản khác đó là **strings** và **Booleans**, cùng với một số toán tử (**operators**) phổ biến.

## Strings

Strings là giá trị dùng để biểu diễn text (văn bản, đoạn văn bản). Strings bao gồm chữ cái (letters), số (numbers), kí tự (symbols), dấu câu (punctuation) và thậm chí là biểu tượng hình ảnh (emoji).

Có thể nói, strings là một kiểu dữ liệu khá phổ biến. Những thứ bạn đang đọc ở đây chính là strings.

Trong JavaScript, để biểu diễn strings, bạn có thể đặt chúng trong cặp dấu ngoặc đơn '' hay trong cặp dấu ngoặc kép "".

Ví dụ:

- "JavaScript is powerful !!! ? ?"
- 'I love JavaScript ❤ - 05-2017'

Đọc đến đây, có thể có bạn sẽ tò mò rằng: _nếu mình muốn đặt dấu " " vào trong string thì sao?_ Hãy xem ví dụ sau:

```js
var str = "Just say "thank you" more";
console.log(str); // => Uncaught SyntaxError: Unexpected identifier
```

Đúng vậy, bạn sẽ nhận được thông báo lỗi như trên nếu như bạn khai báo string kiểu này. Theo như định nghĩa, string phải được đặt trong cặp dấu ngoặc đơn hay ngoặc kép. Do đó, vế phải của phép gán trên chứa 2 string là "Just say " và " more". Còn từ _thank you_ thì đứng bơ vơ nên lỗi là đúng rồi.

Để hiển thị dấu " " nói riêng và các kí tự đặc biệt nói chung trong string, chúng ta có 2 cách:

- Sử dụng dấu backslash (\)
- Sử dụng kết hợp dấu ngoặc kép và dấu ngoặc đơn.

### Chèn một số kí tự đặc biệt sử dụng backslash (\)

```
\' => '
\" => "
\\ => \
\b => backspace
\t => dấu tab theo chiều ngang
\n => xuống dòng mới
```

Ví dụ:

```js
var x = 'It\'s six o\'clock now.';
console.log(x); // => It's six o'clock now.
var y = "Call me \"JavaScripter\"";
console.log(y); // => Call me "JavaScripter"
var z = 'It\'s a backslash \\';
console.log(z); // => It's a backslash \
var z = 'Monday\tTuesday';
console.log(z); // => Monday    Tuesday
var w = 'January\nFebruary';
console.log(w);
/*
* January
* February
*/
```

Đây chỉ là những kí tự đặc biệt hay sử dụng. Còn nhiều kí tự đặc biệt khác nữa, bạn có thể tự tìm hiểu thêm.

### Sử dụng dấu ngoặc kép kết hợp dấu ngoặc đơn

Trong ví dụ trên:

```js
var x = 'It\'s six o\'clock now.'
```

Thay vì sử dụng backslash để chèn kí tự ' vào trong string, mình có thể thay thế cặp dấu ngoặc đơn ở ngoài cùng bằng cặp dấu ngoặc kép.

```js
var x = "It's six o'clock now.";
console.log(x); => It's six o'clock now.
```

Tư tưởng ở đây là: _nếu bạn muốn chèn kí tự ' trong string thì dùng cặp dấu ngoặc kép để đóng, mở string. Ngược lại, nếu bạn muốn chèn kí tự " vào trong string thì dùng cặp dấu ngoặc đơn để đóng, mở string._

```js
var y = 'Call me "JavaScripter"';
console.log(y); // => Call me "JavaScripter"
```

Rõ ràng, việc sử dụng kết hợp dấu ngoặc đơn và ngoặc kép giúp cho việc viết string được ngắn gọn hơn và dễ theo dõi hơn.

Sự linh động này trong việc biểu diễn string là rất đặc biệt trong JavaScript mà C/C++ hay Java không có. Một lần nữa, JavaScript lại tỏ ra khá hiệu quả trong vai trò [nâng cao hiệu suất làm việc](/gioi-thieu-tong-quan-ve-ngon-ngu-lap-trinh-javascript/) của lập trình viên.

### Biểu diễn string dài

Khi lập trình nói chung và lập trình JavaScript nói riêng, để code dễ đọc và dễ theo dõi hơn thì mỗi dòng code chỉ nên dài tối đa 80 kí tự. Vậy nếu string của mình quá dài ( &gt; 80 kí tự) thì làm sao mình có thể biểu diễn được tối đa 80 kí tự trên một dòng?

Có hai cách để giải quyết vấn đề này.

- Ghép nối string dùng toán tử +:
- Sử dụng dấu backslash \: (một vài trình duyệt không hỗ trợ kiểu này)

Ví dụ:

```js
var x = 'Both single and double quotes can be used to mark strings as
long as the quotes at the start and the end of the string match.';
console.log(x); // => Uncaught SyntaxError: Invalid or unexpected token

var y = 'Both single and double quotes can be used to mark strings as' +
'long as the quotes at the start and the end of the string match.';
console.log(y); // OK

var z = 'Both single and double quotes can be used to mark strings as \
long as the quotes at the start and the end of the string match.';
console.log(z) // OK
```

Với riêng bản thân, mình hay sử dụng toán tử + để ghép nối string thay vì sử dụng dấu backslash (\). Cái này là tuỳ thuộc vào sở thích của bạn. Bạn có thể tuỳ ý chọn một trong hai cách.

### Thuộc tính (properties) và phương thức (methods) của strings

Strings có sẵn một số thuộc tính và phương phức. Qua đó, lập trình viên có thể dễ dàng sử dụng strings một cách hiệu quả.

Thuộc tính **length** dùng để xác định độ dài của string.

```js
var x = 'Just for laugh';
console.log(x.length); // => 14
```

Các phương thức của strings bao gồm:

- **toLowerCase()**: trả về string mới với tất cả các kí viết thường (số, kí tự không có tác dụng)
- **toUpperCase()**: trả về string mới với tất cả các kí tự viết hoa (số, kí tự không có tác dụng)
- **trim()**: trả về một string mới với tất cả dấu cách ở đầu và cuối bị bỏ đi.
- **concat(str1, str2, str3,...)**: trả về string mới bằng cách lấy string ban đầu ghép với **str1, str2, str3,... **Tương tự như việc sử dụng toán tử +.
- **indexOf(str, [start])**: trả về vị trí của *str* xuất hiện đầu tiên trong string ban đầu, bắt đầu từ vị trí _start_. Nếu không tìm thấy thì trả về -1.
- **lastIndexOf(str, [end])**: trả về vị trí của str xuất hiện cuối cùng trong string ban đầu, kết thúc tại vị trí _end_. Nếu không tìm thấy thì trả về -1.
- **search()**: tương tự như **indexOf() (**tuy nhiên **search()** mạnh mẽ hơn vì nó hỗ trợ Regular Expression, mình sẽ nói về phần này sau).
- **slice(start, [end])**: trả về string mới là một phần của string ban đầu tính từ vị trí **start** đến **end** (chú ý ở đây là string được cắt tính từ vị trí &gt;= start và &lt; end). Trong đó, **start** và **end** có thể là những số nguyên âm. Khi đó, vị trí được tính từ cuối string. Trường hợp bạn không sử dụng tham số **end** thì mặc định là cắt string đến cuối dãy.
- **substring(start, [end])**: tương tự như **slice()**, nhưng các hệ số không thể là số nguyên âm.
- **substr(start, [length])**: tương tự như **slice()**, tuy nhiên tham số **length** sẽ là độ dài của string mới.
- **replace(oldString, newString)**: tạo ra string mới bằng cách lấy string ban đầu và thay thế **oldString** bằng **newString**. Mặc định, phương thức này sẽ chỉ thay thế một string đầu tiên. Để thay thế tất cả các string trùng khớp, bạn phải sử dụng Regular Expression (mình sẽ nói ở các phần sau).
- **charAt(index)**: trả về kí tự tại vị trí **index**
- **charCodeAt(index)**: trả về mã Unicode của kí tự tại vị trí **index**.

Ví dụ:

```js
var x = 'JavaScript is a Object-Based Languague.';
console.log(x.toUpperCase()); // => JAVASCRIPT IS A OBJECT-BASED LANGUAGUE.
console.log(x.toLowerCase()); // => javascript is a object-based languague.

var y = '  TrumpScript   ';
console.log(y.length);        // => 16
console.log(y.trim().length); // => 11 : độ dài giảm bớt do bớt đi các kí tự cách phía trước và sau

var t1 = 'Hello';
var t2 = 'World';
var t3 = '!';
console.log(t1.concat(' ', t2, t3)); // => Hello World!

var z = "We don't talk anymore, we don't love anymore";
console.log(z.indexOf("don't", 1));      // => 3
console.log(z.indexOf("don't", 22));     // => 26
console.log(z.indexOf("hehe"));          // => -1

console.log(z.lastIndexOf("don't", 10)); // => 3
console.log(z.lastIndexOf("don't", 25)); // => 3
console.log(z.indexOf("hihi"));          // => -1
console.log(z.search('anymore'));        // => 14

console.log(z.slice(9, 13));    // => talk
console.log(z.slice(9));        // => talk anymore, we don't love anymore
console.log(z.slice(-12, -8));  // => love
console.log(z.slice(-12));      // => love anymore

console.log(z.substring(4, 9)); // => on't 
console.log(z.substring(4));    // => on't talk anymore, we don't love anymore

console.log(z.substr(14, 4));   // => anym
console.log(z.substr(14));      // => anymore, we don't love anymore

console.log(z.replace('love', 'hate')); // => We don't talk anymore, we don't hate anymore

console.log(z.charAt(10));     // => a
console.log(z.charCodeAt(10)); // => 97
```

Trên đây là một số ví dụ cơ bản về các phương thức với strings. Để hiểu rõ và nhớ những phương thức này lâu hơn thì bạn nên [thực hành nhiều hơn](/sau-meo-don-gian-giup-hoc-lap-trinh-javascript-nhanh-hon/) và thử các trường hợp có thể để hiểu rõ hoạt động của chúng.

## Booleans

Tiếp theo là một kiểu dữ liệu cơ bản và cũng khá phổ biến. Đó là **Boolean**. Kiểu dữ liệu Boolean chỉ bao gồm hai giá trị là **true** và **false**.

Boolean thường được sử dụng để lưu các trạng thái _on_ hay _off_, _yes_ hay _no_,*...* Bạn sẽ gặp kiểu dữ này nhiều trong phần điều kiện rẽ nhánh (ở các phần sau).

```js
var Friday = true;
console.log(Friday); // => true;
```

### Một số cách để sinh ra booleans

#### So sánh (Comparisons)

Các loại so sánh bao gồm: _&gt;, &lt;, &gt;=, &lt;=, ==, ===, _!=, !==. Và ta có thể áp dụng việc so sánh cho numbers, strings, booleans...

```js
console.log(6 > 4);    	          // => true
console.log(6 < 3);               // => false
console.log(6 == 6);              // => true
console.log(8 >= 6);              // => true
console.log('hello' >= 'hehe');   // => true
console.log('mama' == 'papa');    // => false
console.log('olala' === 'olala'); // => true
console.log('aaa' != 'aaa');      // => false
console.log(true == true);        // => true
console.log(NaN == NaN);          // => false
```

#### Sử dụng toán tử logic (Logical Operators)

Trong JavaScript có 3 toán tử logic là: _and_ (&&), _or_ (||), _not_ (!).

```js
console.log(true && true);   // => true
console.log(false && true);  // => false

console.log(true || false);  // => true
console.log(false || false); // => false

console.log(!true);          // => false
console.log(!false);         // => true
```

Theo mình, Booleans là một kiểu dữ liệu đơn giản nhất. Tuy nhiên, tầm quan trọng của nó thì không ít. Bạn sẽ tiếp tục thấy kiểu dữ liệu này ở trong các bài viết tiếp theo.

## Operators

Một thành phần quan trọng tiếp theo là toán tử (**operators**). Thực ra bạn đã nhìn thấy nó nhiều ở các ví dụ phía trên. Phần này sẽ nói rõ hơn về toán tử.

> Toán tử là kí tự được sử dụng giữa các giá trị để thực hiện một hành động (cái này là do mình tự định nghĩa).

Có rất nhiều loại toán tử. Sau đây, mình sẽ tập trung vào một số loại toán tử phổ biến nhất.

### Toán tử số học (Arithmetic Operators)

Toán tử số học thực hiện các phép tính số học như: cộng (+), trừ (-), nhân (\*), chia (/), chia dư (%) và được áp dụng đối với numbers. Phần này hoàn toàn giống như kiến thức số học mà bạn đã học nên mình sẽ không giải thích gì thêm.

```js
console.log(3 + 5);    // => 8
console.log(6 - 10.5); // => -4.5
console.log(4 * 3);    // => 12
console.log(10 / 3);   // => 3.3333333333333335
console.log(10 % 4);   // => 2
```

Về độ ưu tiên, bạn chỉ cần nhớ câu _nhân chia trước, cộng trừ sau_. Nghĩa là phép nhân, phép chia, phép chia dư có cùng độ ưu tiên (I). Phép cộng, trừ có cùng độ ưu tiên (II). Độ ưu tiên của nhóm (I) lớn hơn độ ưu tiên của (II).

Và cái nào có độ ưu tiên lớn hơn thì sẽ được thực hiện trước. Trong trường hợp các toán tử có cùng độ ưu tiên thì sẽ được thực hiện từ trái sang phải. (Khi viết đến đây, mình chợt nghĩ là không biết mấy nước mà chúng nó viết chữ từ phải sang trái thì sao nhỉ? Chắc là chúng nó cũng tính toán từ phải sang trái luôn. ???)

```js
console.log(1 + 2 * 3 - 8 / 4 + 5 % 3); // => 7
console.log(3 + 4 - 8 - 2 + 6); // => 3
```

### Toán tử ghép nối (Concatenation Operators)

Toán tử ghép nối (+) chỉ được dùng với strings. Nó dùng để ghép nối 2 strings với nhau.

```js
console.log("I" + " " + "love " + 'you'); // => I love you
```

### Toán tử logic (Logical Operators)

Ở phần trên, mình đã nhắc tới toán tử logic trong việc tạo ra giá trị **Booleans**. Toán tử logic bao gồm: *and* (&&), _or_ (||), _not_ (!).

### Toán tử so sánh (Comparison operators)

Tương tự, toán tử so sánh bao gồm: &gt;, &lt;, &gt;=, &lt;=, ==, ===, !=, !==.

### Toán tử nhóm (Grouping operator)

Trước khi bàn về toán tử này, mình muốn bạn chú ý rằng: các nhóm toán tử trên có độ ưu tiên khác nhau. Nhìn chung, toán tử số học có độ ưu tiên cao nhất, sau đó là toán tử so sánh, và cuối cùng là toán tử logics.

Đối với những biểu thức đơn giản, bạn có thể dễ dàng sử dụng chúng mà không sợ nhầm lẫn gì cả. Tuy nhiên, đối với những phép tính phức tạp, có thể bạn sẽ bị nhầm lẫn trong thứ tự thực hiện các phép toán. Dẫn đến bạn bị sai kết quả.

Để tránh rắc rối này, bạn nên sử dụng toán tử nhóm (). Nghĩa là những thành phần nằm trong cặp dấu ngoặc đơn này sẽ được thực hiện trước.

```js
console.log((3 + 4) * 2 - 2); // => = 7 * 2 - 2 = 12
```

**Toán tử gán (Assignement operator)**

Tiếng anh hay nói là "last but not least" hay "last but certainly not least". Tức là _cuối cùng nhưng không kém phần quan trọng_. Toán tử gán được sử dụng khi bạn muốn gán dữ liệu cho một biến.

```js
var x = 10;
var y = "string";
```

Trên đây là những kiến thức cơ bản về strings, booleans và operators. Thực tế, để đào sâu vào từng thành phần thì còn rất nhiều thứ. Nhưng nếu nói hết ở đây thì sau này còn gì để mà nói nữa.

Do đó, hy vọng bạn sẽ tiếp tục theo dõi các [bài viết sau](/cau-truc-chuong-trinh-trong-javascript/), thân ái!

## Tham khảo

- [Boolean - JavaScript | MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
