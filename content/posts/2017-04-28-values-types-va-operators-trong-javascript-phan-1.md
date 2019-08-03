---
date: "2017-04-28T15:46:25Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: values-types-va-operators-trong-javascript-phan-1
title: "Values, types và operators trong JavaScript - Phần 1"
categories:
  - Javascript cơ bản
---

Trong ngôn ngữ lập trình nói chung và ngôn ngữ lập trình [JavaScript](/gioi-thieu-tong-quan-ve-ngon-ngu-lap-trinh-javascript/) nói riêng, những thành phần cơ bản, quan trọng cấu thành nên một chương trình là: values, types và operators. Hay trong tiếng việt, chúng ta gọi là: giá trị, kiểu dữ liệu và toán tử. Chúng giống như là những nguyên liệu để làm nên một món ăn. Và để làm nên một món ăn ngon, hoàn chỉnh, chúng ta cần phải hiểu rõ từng thành phần và cách sử dụng nó như thế nào. Vì vậy hôm nay, mình và bạn sẽ cùng tìm hiểu về **values, types** và **operators** trong JavaScript.

## Values (giá trị)

Mình nhận thấy rằng là con người chúng ta rất hay nói chuyện theo kiểu \_**chắc là, có thể**,...\_Thực tế là mình cũng hay nói chuyện kiểu đó. Đơn giản là vì mình sợ nói chắc chắn quá nhỡ sai thì sẽ bị người khác cười (chắc phải sửa thói quen này). Nghĩa là một hiện tượng sẽ có các trạng thái như: đúng, sai, chắc đúng, chắc sai,...

Nhưng với thế giới của máy tính, tất cả đều là dữ liệu được biểu diễn dưới dạng bit (0 và 1). Tức là chỉ có đúng (1) hoặc sai (0). Ví dụ số 13 sẽ được biểu diễn dưới dạng bit như sau:

![number 13 respresent in values, types, operators post at completejavascript.com](/wp-content/uploads/2017/04/number-13-respresent-values-types-operators-completejavascript.com_-300x71.png)

Như trên, số nhị phân 00001101 hay 8 + 4 + 1 = 13.

Tưởng tượng, chúng ta có rất nhiều chuỗi bit như vậy. Và làm sao chúng ta có thể lấy ra được thông tin từ đó?

Câu trả lời là: chúng ta sẽ chia chúng ra thành các khối. Trong JavaScript, những khối đó được gọi là **values**. Mặc dù, values (giá trị) được tạo bởi các bit. Tuy nhiên, mỗi giá trị sẽ có một kiểu dữ liệu để xác định chúng.

## Types (kiểu dữ liệu)

Có 6 kiểu dữ liệu cơ bản (types) là: **numbers**, **strings**, **Booleans**, **objects** (đối tượng), **functions** (hàm) và **undefinded values** (giá trị không được định nghĩa). Trong bài viết này, mình sẽ giới thiệu những kiểu dữ liệu cơ bản nhất là numbers, strings và Booleans. Những kiểu dữ liệu còn lại mình sẽ giới thiệu trong các bài viết tiếp theo.

### Numbers (số)

Numbers là những gía trị có thể được sử dụng trong các phép toán số học. Trong JavaScript, không có cú pháp đặc biệt nào cho numbers, bạn chỉ cần trực tiếp viết nó ra.

Ví dụ một số loại số:

```
var x = 66;     // positive integer
    var x = -66;    // negative integer
    var x = 3.14;   // positve float
    var x = -3.14;  // negative float
    var x = 2e3;    // => 2*10^3 = 2000
    var x = 2e-3;   // => 2*10^(-3) = 0.002
    var x = 0xFF;   // hexadecimal: 15*16 + 15 = 255
    var x = 067;    // octal: 6*8 + 7 = 55
```
Đối với ngôn ngữ lập trình C/C++, numbers được chia ra nhiều kiểu như: int, long, float, double,...Mỗi kiểu sẽ sử dụng số lượng bit khác nhau để lưu numbers. Nhưng JavaScript lại chỉ sử dụng 64 bit để biểu diễn numbers theo chuẩn IEEE 754.

Mỗi cách sẽ có những ưu, nhược điểm riêng. Theo quan điểm cá nhân thì mình thấy cách lưu trữ của JavaScript có ưu nhược điểm sau:

#### **Ưu điểm: **

- Lấy chuỗi bit dữ liệu ra nhanh hơn vì độ dài của nó lúc nào cũng là 64 bit (Cái này mình suy luận thôi chứ chưa thấy sách vở nào ghi cả. Bạn nào có thông tin chính xác thì vui lòng bình luận ở dưới nhé.)

- Không cần phải mất công nhớ xem kiểu dữ liệu A dùng mấy byte, kiểu dữ liệu B dùng mấy byte sao cho phù hợp với yêu cầu. Mình nhớ là trước đây trong C: kiểu **int** dài 2 byte, nhưng bây giờ **int** dài 4 byte. Trong Java, **long** dài 8 byte. Nhưng trong C++, **long** chỉ là 4 byte => Đau đầu.

#### **Nhược điểm:**

- Không tối ưu cho phần bộ nhớ: rõ ràng nếu mình chỉ cần quan tâm các số từ 1 đến 100, thì chẳng lý do gì mình phải dùng 64 bit bộ nhớ để lưu.

Nhưng dù sao, ưu điểm vẫn nhiều hơn nhược điểm. Đó là lý do mình lập nên website [CompleteJavaScript.com](/) chứ không phải CompleteJava.com hay CompleteCPlusPlus.com.

#### Những số đặc biệt

Có 3 số đặc biệt trong JavaScript là **Infinity**, **-Infinity** và **NaN**. Chúng được coi là numbers, nhưng lại không giống numbers thông thường.

- **Infinity** và **-Infinity**: tương ứng là số dương vô cùng và âm vô cùng trong toán học. Đây là những số ảo diệu nhất mà mình từng biết với một số tính chất như sau (không khác những kiến thức về dương vô cùng và âm vô cùng đã học ở cấp 3):


```
var x = 4 / 0;
    var y = -5 / 0;
    var z = 6 / 0;
    console.log(x);       // => Infinity
    console.log(y);       // => -Infinity
    console.log(z);       // => Infinity
    console.log(x + y);   // => Infinity - Infinity = NaN
    console.log(x + z);   // => Infinity + Infinity = Infinity
    console.log(x === z); // => Infinity === Infinity = true
    console.log(x == z);  // => Infinity == Infinity = true
    console.log(x > z);   // => Infinity > Infinity = false
    console.log(x == y);  // => Infinity == -Infinity = false
    console.log(x > y);   // => Infinity > -Infinity = true
```
- **NaN** viết tắt của _Not a Number_. Nó được dùng để biểu diễn cho kết quả một số phép tính như: Infinity - Infinity = NaN hay 0 / 0 = NaN hoặc 2 \* 'ba' = NaN... Một số ví dụ để bạn thấy:


```
var x = 3 / 0;
    var y = -4 / 0;
    var z = x + y;
    var t = 0 / 0;
    var w = 2 * 'ba';
    console.log(x);   // => Infinity
    console.log(y);   // => -Infinity
    console.log(z);   // => NaN
    console.log(t);   // => NaN
    console.log(w);   // => NaN
```
#### Methods (phương thức) đối với numbers

Trong các ngôn ngữ như C/C++, Java,...những kiểu dữ liệu cơ bản như int, long, float...sẽ không có thuộc tính hay phương thức kèm theo. Bởi chúng nó không phải đối tượng ([object](/javascript-object-last-but-not-least/)).

Nhưng JavaScript thì khác, những kiểu dữ liệu cơ bản cũng có thuộc tính và phương thức giống như đối tượng (object). Đó, rõ ràng là JavaScript đã được tối ưu để [nâng cao hiệu suất](/gioi-thieu-tong-quan-ve-ngon-ngu-lap-trinh-javascript/) của lập trình viên.

Một số phương thức chính đối với numbers trong JavaScript là:

- **toString()**: trả về một số biểu diễn dạng string (mình sẽ nói về _string_ ở bài sau)

- **toExponential([number])**: trả về string biểu diễn số dạng số mũ (exponential), với số lượng chữ số thập phân là _number _(có làm tròn). Chú ý: số chữ số phần nguyên luôn là 1.

- **toFixed(number)**: trả về string biểu diễn số với số lượng của chữ số thập phân là _number _(có làm tròn)

- **toPrecision([number])**: trả về string với số lượng chữ số (phần nguyên và phần thập phân) là _number _(có làm tròn)

- **valueOf()**: trả về số như là một số (đối với trường hợp numbers thì phương thức này chỉ dùng để làm màu thôi, chứ mới đọc mình đã thấy nó chả có ý nghĩa gì).


```
var x = 66;
    console.log(x.toString());       // => 66

    var y = 69.9696;
    console.log(y.toExponential());  // => 6.99696e+1 : đưa số chữ số phần nguyên về 1
    console.log(y.toExponential(1)); // => 7.0e+1 : làm tròn
    console.log(y.toExponential(8)); // => 6.99696000e+1 : mở rộng thêm đuôi 0

    var z = 96.69;
    console.log(z.toFixed(0));       // => 97 : làm tròn
    console.log(z.toFixed(1));       // => 96.7 : làm tròn
    console.log(z.toFixed(6));       // => 96.690000 : mở rộng đuôi 0

    var l = 99.696;
    console.log(l.toPrecision());    // => 99.696 : không làm gì
    console.log(l.toPrecision(2));   // => 1.0e+2 : đưa số chữ số về 2 nên kết hợp với exponential
    console.log(l.toPrecision(4));   // => 99.70 : làm tròn

    var o = 1.234;
    console.log(o.valueOf());        // => 1.234 : không làm gì (đặc biệt kết quả vẫn là number)
```

#### Một số phương thức toàn cục (Global Methods)

Ngoài những phương thức gắn với bản thân numbers, JavaScript còn cung cấp một số phương thức toàn cục dành cho numbers như:

- **Number()**: chuyển đổi một biến trong JavaScript thành numbers

- **parseInt()**: chuyển đầu vào là string thành một số. **Chú ý**: nếu đầu vào là nhiều số cách nhau bằng dấu cách thì chỉ thành phần đầu tiên được chuyển đổi. Và nếu không thể chuyển thành numbers được thì kết quả trả về sẽ là NaN.

- **parseFloat()**: cũng tương tự như **parseInt()** nhưng kết quả trả về sẽ là số thực.


```
var x = true;
    var y = false;
    var z = new Date();
    var t = '69';
    var u = '100.01 34';
    console.log(Number(x));     // => 1
    console.log(Number(y));     // => 0
    console.log(Number(z));     // => 1493393286011
    console.log(Number(t));     // => 69
    console.log(Number(u));     // => NaN

    console.log(parseInt(t));   // => 69
    console.log(parseInt(u));   // => 100 => lấy phần nguyên

    console.log(parseFloat(t)); // => 69
    console.log(parseFloat(u)); // => 101.01
```
Trên đây là những kiến thức cơ bản về values, types. Theo dự kiến ban đầu thì mình định viết gộp cả phần **strings**, **booleans** và **operators** vào. Nhưng khi viết đến đây thì thấy dài quá. Một phần vì nghĩ dài quá bạn không đọc. Một phần cũng vì lười. Nên mình sẽ viết tiếp phần 2 sau.

Xin chào và hẹn gặp lại bạn ở [bài viết tiếp theo](/values-types-va-operators-trong-javascript-phan-2/), thân ái!

## Tham khảo

- [Values, Types, and Operators](http://eloquentjavascript.net/01_values.html)

- [JavaScript Tutorial](https://www.w3schools.com/js/)

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
