---
date: "2017-05-07T04:50:40Z"
update: "2021-10-16T04:50:40Z"
template: "post"
directory: "JavaScript"
cover: "../../../images/javascript/cau-truc-chuong-trinh-trong-javascript-completejavascript.com_.png"
keywords: "cấu trúc chương trình"
description: "Làm thế nào để kết hợp những thành phần này thành một chương trình hoàn chỉnh? Để giải quyết vấn đề này, chúng ta sẽ cùng tìm hiểu về cấu trúc chương trình trong JavaScript."
slug: cau-truc-chuong-trinh-trong-javascript
title: "Cấu trúc chương trình trong JavaScript"
shortTitle: "Biểu thức, switch, vòng lặp"
series: "JavaScript: JavaScript cơ bản"
---

Trong các bài viết trước, mình đã giới thiệu với bạn những thành phần cơ bản của JavaScript ([kiểu dữ liệu](/kieu-du-lieu-trong-javascript), [toán tử](/toan-tu-la-gi-toan-tu-trong-javascript)). Nhưng đây mới chỉ là những nguyên liệu thô. Vậy làm thế nào để kết hợp những thành phần này thành một chương trình hoàn chỉnh. Để giải quyết vấn đề này, chúng ta sẽ cùng tìm hiểu về cấu trúc chương trình trong JavaScript.

## Biểu thức (expressions)

Theo wikipedia: _[Expression](https://en.wikipedia.org/wiki/Expression) (computer science), an instruction to execute something that will return a value_. Tạm dịch như sau: _biểu thức là một chỉ dẫn để thực hiện một vài công việc và trả về một giá trị_.

Do đó, mỗi giá trị được viết trực tiếp (66, 'hello', true, NaN,...) là một biểu thức (**expression**). Hay việc kết hợp những giá trị với toán tử (1 + 5, 'I' + ' love' + ' you', !false, ...) cũng là những biểu thức.

Biểu thức có thể đơn giản là những phép cộng, trừ,... Hoặc có thể là những công thức toán học, vật lý,... phức tạp. Và trong một biểu thức có thể chứa nhiều biểu thức con.

## Môi trường (enviroment)

Tập hợp những [biến số](/bien-la-gi-bien-trong-javascript) và giá trị của chúng tại một thời điểm được gọi là môi trường (**enviroment**). Khi chương trình bắt đầu, môi trường của nó không phải trống rỗng. Luôn luôn có những biến số giúp chương trình tương tác với môi trường xung quanh.

Ví dụ như trình duyệt. Luôn có những biến số và hàm giúp chương trình đọc được trạng thái của chuột và bàn phím.

## Hàm (functions)

Để giúp cho việc lập trình dễ dàng hơn, trình duyệt cung cấp sẵn một số hàm sau đây.

### Hàm alert

Cú pháp: alert(message);

Hàm này giúp đưa ra một thông báo tới người dùng. Ví dụ:

```js
alert("Say Hello from CompleteJavaScript.com");
```

Kết quả:

![Ví dụ hàm alert() tại completejavascript.com](../../../images/javascript/Screenshot-from-2017-05-07-06-49-44.png)

### Hàm console.log

Khác với hàm _alert_, hàm _console.log_ sẽ không đưa ra thông báo trực tiếp tới người dùng. Thông thường hàm này chỉ được sử dụng để ghi lại **log**.

Cú pháp: console.log(message);

Ở hầu hết các trình duyệt, để xem được log của hàm này, bạn chỉ cấn nhấn **F12** hoặc **Ctr Shift I** hay trên Mac là **Command Option I**. Nếu những phím tắt này không có tác dụng thì bạn có thể tìm trên **menu** thành phần **web console** hay **developer tools**.

Trong hầu hết các ví dụ, mình đều sử dụng hàm _console.log_ để kiểm tra kết quả.

### Hàm confirm

Tương tự như hàm _alert_, hàm _confirm_ cũng đưa ra một thông báo trực tiếp tới người dùng. Tuy nhiên, hàm này sẽ yêu cầu người dùng xác nhận bằng cách chọn _OK/Cancel_. Nếu người dùng chọn _OK_ thì hàm này sẽ trả về _true_. Ngược lại, nếu người dùng chọn _Cancel_ thì kết quả trả về sẽ là _false_.

Ví dụ:

```js
confirm("Bạn muốn tiếp tục sử dụng chương trình?");
```

Kết quả:

![Ví dụ hàm prompt tại completejavascript.com](../../../images/javascript/Screenshot-from-2017-05-07-07-01-29.png)

### Hàm prompt

Hàm _prompt_ cũng lại tương tự như hàm _confirm_ nhưng cho phép người dùng nhập vào string.

Ví dụ:

```js
prompt("Nhập vào tên của bạn:");
```

Kết quả:

![Ví dụ hàm prompt tại completejavascript.com](../../../images/javascript/Screenshot-from-2017-05-07-07-03-21.png)

Hai hàm _confirm_ và _prompt_ thường không được sử dụng ở trên trình duyệt hiện đại. Bởi bạn không thể quyết định được giao diện của nó sẽ như thế nào. Tuy nhiên, với mục đích để kiểm tra hay trong một vài chương trình đơn giản thì bạn vẫn có thể sử dụng chúng.

## Luồng điều khiển (control flow)

Như mình đã nói ở trên, chương trình là tập hợp của những câu lệnh. Thông thường, chương trình sẽ được thực hiện tuần tự từ trên xuống dưới.

Ví dụ: chương trình sau yêu cầu người dùng nhập vào một số và sau đó hiển thị ra bình phương của số đó.

```js
var theNumber = Number(prompt("Nhập vào một số: "));
alert("Bình phương của số đó là: " + theNumber * theNumber);
```

Chương trình sẽ thực hiện tuần tự từng câu lệnh. Và luồng điều khiển của chương trình sẽ như sau:

![Luồng điều kiển tuần tự tại completejavascript.com](../../../images/javascript/Screenshot-from-2017-05-07-07-11-44.png)

### Điều kiện rẽ nhánh (conditional execution)

Thỉnh thoảng chúng ta sẽ muốn chỉ thực hiện câu lệnh nếu một hay nhiều điều kiện thoả mãn. Lúc này chúng ta sẽ sử dụng điều kiện rẽ nhánh.

#### Từ khóa `if` và `else`

> Tham khảo bài viết [cấu trúc rẽ nhánh trong JavaScript](/cau-truc-re-nhanh-trong-javascript) để hiểu về câu lệnh **if/else** và toán tử `?`.

#### Từ khoá `switch`

Ngoài sử dụng từ khoá _if/else_, chúng ta còn có thể sử dụng _switch_. Tuy nhiên, theo như một số tài liệu mình đọc được, trong JavaScript bạn không nên sử dụng _switch_. Do đó, mình sẽ không trình bày chi tiết về phần này. Về lí do thì bạn có thể tự tìm hiểu thêm.

### Vòng lặp (loop)

Một bài toán đặt ra là: mình muốn in ra các số từ 1 đến 100. Mình sẽ phải viết ra 100 câu lệnh:

```js
console.log(1);
console.log(2);
console.log(3);
...
console.log(100);
```

_Nhanh mà, copy-paste một lúc là xong thôi._

Nhưng bây giờ mình muốn in ra các số từ 1 đến 1000000000. Cứ tính trung bình 1 dòng lệnh hết 1 giây để copy-paste. Suy ra thời gian để viết hết các câu lệnh là 1000000000 / (365 _ 24 _ 60 \* 60) = 31 (năm). Nghĩ đến đây là đã muốn bỏ cuộc rồi.

Nhưng không. Chúng ta có một công cụ rất mạnh mẽ đó là: vòng lặp (**loop**).

Vòng lặp giúp giải quyết những bài toán có tính lặp lại theo quy luật. Với bài toán trên, quy luật là số sau sẽ bằng số đằng trước nó cộng thêm 1.

Luồng điều khiển lúc này sẽ là:

![Vòng lặp điều khiển tại completejavascript.com](../../../images/javascript/Screenshot-from-2017-05-07-07-57-24.png)

Như vậy, khi áp dụng vòng lặp thì bài toán trên sẽ giải quyết thế nào?

#### Vòng lặp while

```js
var number = 1;
while (number <= 100) {
  console.log(number);
  number = number + 1;
}
```

Đoạn code trên có thể diễn tả bằng lời như sau: _Cho number = 1. Kiểm tra điều kiện nếu number &lt;= 100 thì sẽ ghi ra log số number. Rồi sau đó, tăng number lên 1 đơn vị. Tiếp tục quá trình kiểm tra điều kiện, log, tăng number cho đến khi nào number &gt; 100 thì dừng lại._

Ở đây, từ khoá _while_ chính là đại diện cho vòng lặp. Tiếp sau, trong cặp dấu ngoặc đơn là điều kiện để vòng lặp được thực hiện. Do đó, nếu như điều kiện trong dấu ngoặc kép luôn luôn đúng thì vòng lặp sẽ chạy vô hạn. Ngược lại, nếu ngay từ đầu điều kiện đã sai thì những lệnh trong vòng lặp sẽ không được thực hiện, dù chỉ một lần.

#### Vòng lặp do/while

Vòng lặp _do/while_ cũng tương tự vòng lặp _while_. Chỉ khác là nó sẽ chắc chắn thực hiện ít nhất một lần.

```js
var number = 1;
do {
  console.log(number);
  number = number + 1;
} while (number <= 100);
```

Nhìn chung, hai cách trên không khác nhau. Bạn có thể lựa chọn một trong hai cách trong từng trường hợp cụ thể sao cho hợp lý (còn riêng mình thì hầu như không sử dụng vòng lặp _do/while_).

#### Vòng lặp for

Nếu để ý thì bạn sẽ thấy cấu trúc chung khi sử dụng vòng lặp là:

- Khởi tạo giá trị đếm (number = 1)
- So sánh giá trị đếm với giới hạn tối đa (number &lt;= 100)
- Tăng giá trị đếm (number = number + 1)
  Để ngắn gọn, JavaScript sinh ra vòng lặp _for_.

```js
for (var number = 1; number <= 100; number = number + 1) {
  console.log(number);
}
```

Bạn có thể thấy là cấu trúc của vòng lặp vẫn được duy trì mà nhìn code gọn gàng hơn rất nhiều.

Cấu trúc chung của vòng lặp for như sau:

```js
for([khởi tạo]; [điều kiện]; [cập nhật]){
  statement1;
  statement2;
  ...
}
```

- [Khởi tạo]: được thực hiện một lần lúc bắt đầu vòng lặp
- [Điều kiện]: được kiểm tra mỗi lần vòng lặp được lặp lại
- [Cập nhật]: Thực hiện ở cuối mỗi vòng lặp.

#### Thoát vòng lặp

Trong các ví dụ trên, ta luôn luôn có điều kiện để thoát khỏi vòng lặp. Tuy nhiên, nếu như mình không biết trước khi nào sẽ thoát vòng lặp thì sao. Lúc này, mình sẽ phải sử dụng **vòng lặp vô hạn**. Nghĩa là điều kiện thực hiện vòng lặp luôn là true.

Vậy khi nào thì vòng lặp được dừng lại? Và dừng lại bằng cách nào?

Câu trả lời là: khi gặp điều kiện thoả mãn để kết thúc vòng lặp. Và sử dụng từ khoá **break** để thoát vòng lặp.

Ví dụ sau, mình sẽ tìm bội số nhỏ nhất của 7 bắt đầu từ 8:

```js
for (var number = 8; ; number++) {
  if (number % 7 == 0) {
    console.log(number); // => 14
    break;
  }
}
```

Trong vòng lặp _for_ trên, mình bỏ qua phần điều kiện. Lúc này có thể hiểu là: sẽ không kiểm tra điều kiện trước khi thực hiện vòng lặp. Hay vòng lặp luôn luôn được thực hiện. Mỗi vòng lặp mình sẽ kiểm tra xem nếu số đó chia hết cho 7 (số dư khi chia cho 7 == 0) thì đó chính là số cần tìm. Cuối cùng, mình dùng *break* để thoát khỏi vòng lặp.

Tương tự, bạn cũng có thể áp dụng từ khoá _break_ đối với vòng lặp _while_, _do/while_.

##### Từ khoá continue

Có một từ khoá khác gần giống break cũng hay được sử dụng là _continue_. Nếu như _break_ là để thoát khỏi vòng lặp thì _continue_ dùng để dừng lượt lặp hiện tại và chuyển tới lượt tiếp theo.

Ví dụ mình muốn tìm bội số nhỏ nhất của 7, bắt đầu từ 8 và là số lẻ.

```js
for (var number = 8; ; number++) {
  if (number % 2 == 0) continue;
  if (number % 7 == 0) {
    console.log(number); // => 21
    break;
  }
}
```

Khác với ví dụ trước, ví dụ này cần phải tìm ra bội số là số lẻ. Do đó, trước tiên mình sẽ kiểm tra xem số hiện tại là chẵn hay lẻ. Nếu _number % 2 == 0_, suy ra đó là số chẵn. Chắc chắn trường hợp này không thoả mãn nên mình không cần phải chạy tiếp các câu lệnh tiếp theo, mà chuyển ngay sang lượt lặp tiếp theo.

## Kết luận

Trên đây là những thành phần cơ bản trong cấu trúc chương trình JavaScript. Nếu bạn đã từng biết một ngôn ngữ lập trình nào khác thì bạn sẽ thấy chúng chẳng khác gì nhau. Ngược lại, nếu đây là lần đầu tiên bạn tiếp xúc với ngôn ngữ lập trình thì mình khuyên bạn nên thực hành nhiều để làm quen với những thành phần cơ bản này.

Dưới đây là một số ví dụ từ cơ bản đến nâng cao để giúp bạn làm quen với những thành phần cơ bản trong cấu trúc chương trình JavaScript.

Các cụ ta có câu: _Học đi đôi với hành_. Thực hành sẽ giúp bạn nhanh làm chủ ngôn ngữ lập trình hơn. Tin mình đi.

## Bài tập thực hành

### Bài 1:

Sử dụng _console.log_ để in ra hình tam giác như sau:

```
#
##
###
####
#####
######
#######
```

Xem code tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/program_structure/program_structure_triangle_1.js).

### Bài 2:

Sử dụng _prompt_ để yêu cầu người dùng nhập vào một số. Nếu người dùng nhập vào không phải là số thì hiển thị ra thông báo: _Bạn nhập vào không phải là số_. Nếu người dùng nhập vào là số thì hiển thị ra thông báo: _Số bạn nhập vào quá nhỏ_ khi số đó &lt; 10. Ngược lại thì dừng thông báo.

Xem code tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/program_structure/program_structure_prompt_2.js).

### Bài 3:

1. Sử dụng _console.log_ để in ra hình bàn cờ vua kích thước (8 x 8) như sau:

```
#_#_#_#_
_#_#_#_#
#_#_#_#_
_#_#_#_#
#_#_#_#_
_#_#_#_#
#_#_#_#_
_#_#_#_#
```

Xem code tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/program_structure/program_structure_chess_board_3_1.js).

2. Yêu cầu người dùng nhập vào một số **size (size &gt; 0)**. Sau đó hiển thị ra hình bàn cờ vua như trên với kích thước là **size x size**.

Xem code tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/program_structure/program_structure_chess_board_3_2.js).

### Bài 4:

Yêu cầu người dùng nhập vào một số. Nếu người dùng nhập vào một số &gt; 0 thì hiển thị ra thông báo xem số đó có phải số nguyên tố hay không.

Xem code tại [đây](https://github.com/completejavascript/practical-javascript/blob/master/program_structure/program_structure_prime_4.js).

**Chú ý:**

Bạn nên tự [thực hành](/hoc-lap-trinh-javascript-nhanh-hon) để giải quyết bài toán trước khi tham khảo code. Khi đấy bạn sẽ hiểu và nhớ kiến thức lâu hơn.

Nếu bạn đã giải quyết được hết những bài toán cơ bản này thì chúc mừng bạn đã nắm được những thành phần cơ bản trong cấu trúc chương trình JavaScript rồi.

Hẹn gặp lại bạn ở [bài viết tiếp theo](/tim-hieu-function-javascript), thân ái!

## Tham khảo

- [Program Structure](http://eloquentjavascript.net/02_program_structure.html)
