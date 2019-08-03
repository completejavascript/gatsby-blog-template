---
date: "2018-05-15T12:44:37Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: 6-cach-loai-bo-phan-tu-lap-trong-mang
title: "6 cách loại bỏ phần tử lặp trong mảng"
categories:
  - Thủ thuật JavaScript
tags:
  - Array
---

Trong con đường lập trình, có lẽ bạn sẽ phải ít nhất một lần đối mặt với bài toán **Loại bỏ phần tử lặp trong mảng**. Đây là bài toán cơ bản và khá hay. Nếu bạn đã xử lý bài toán này rồi thì có thể chia sẻ cách làm với mình trong phần bình luận phía dưới. Trường hợp bạn chưa gặp bao giờ thì sau đây mình sẽ giới thiệu thuật toán chung và triển khai 6 cách loại bỏ phần tử lặp trong mảng.

## Thuật toán loại bỏ phần tử lặp trong mảng

### Phân tích bài toán

Với bài toán này, yêu cầu là loại bỏ phần tử lặp trong mảng.

_**Vậy như nào gọi là phần tử lặp?**_

Hiểu đơn giản: khi hai phần tử a, b trong mảng mà (a === b) là true thì gọi đó là phần tử lặp.

Tiếp theo, mình cần quan tâm đến kiểu dữ liệu của các phần tử trong mảng. JavaScript có 7 kiểu dữ liệu là: [number](/values-types-va-operators-trong-javascript-phan-1/), [string, boolean](/values-types-va-operators-trong-javascript-phan-2/), [array](/javascript-array-co-ban/), [object](/javascript-object-last-but-not-least/), null và undefined. Tuy nhiên, mình tạm thời bỏ qua trường hợp phần tử trong mảng có kiểu dữ liệu là: array và object. Vì xử lý 2 trường hợp này sẽ khá phức tạp.

Ví dụ phần tử trong mảng có kiểu dữ liệu là object:

```
let arr = [{x : 1}, {x : 2}, 3, 'a', {x : 1}];
```

Về mặt trực quan, bạn sẽ thấy rằng mảng trên có phần tử lặp là {x : 1}, vì nó lặp lại 2 lần. Nhưng thực tế thì không phải vậy. Bởi lẽ,

```
console.log({x : 1} === {x : 1});
    // => false
```

Tương tự với array:

```
console.log([1, 2] === [1, 2]);
    // => false
```

Với những phân tích và ràng buộc như vậy, sau đây mình sẽ xây dựng thuật toán.

### Thuật toán

Theo mình thấy, thuật toán bài này khá đơn giản và có thể tóm tắt lại thành các bước như sau:

- B1: Khai báo mảng chứa kết quả, ví dụ: dst = []

* B2: Duyệt từng phần tử trong mảng nguồn (src), rồi kiểm tra:


    * Nếu phần tử này chưa tồn tại trong mảng dst thì thêm nó vào mảng dst


    * Nếu phần tử này đã tồn tại trong mảng dst rồi thì bỏ qua

- B3: Trả về mảng dst là mảng đã loại bỏ phần tử lặp.

Ý tưởng chung là như vậy, sau đây mình sẽ triển khai thuật toán này thành code.

## Cách triển khai thuật toán loại bỏ phần tử lặp trong mảng

### Sử dụng mảng thông thường

```
let arr = [1, 5, 'a', 3, 'f', '3', 5, 3, 'b', 'e', 'f'];
    let ans = deduplicate(arr);

    console.log(ans);
    // Expected output: [1, 5, "a", 3, "f", "3", "b", "e"]

    function deduplicate(arr) {
      let isExist = (arr, x) => {
        for(let i = 0; i < arr.length; i++) {
          if (arr[i] === x) return true;
        }
        return false;
      }

      let ans = [];
      arr.forEach(element => {
        if(!isExist(ans, element)) ans.push(element);
      });
      return ans;
    }
```

Cái mà bạn cần quan tâm ở đây là [function](/tim-hieu-function-javascript/) **deduplicate**. Vậy cách triển khai function này tương ứng với thuật toán sẽ như thế nào?

**B1:** Khai báo mảng chứa kết quả, ví dụ: dst = []

```
let ans = [];
```

**B2:** Duyệt từng phần tử trong mảng nguồn (src), rồi kiểm tra:

```
arr.forEach(element => {
      //
    });
```

Nếu phần tử chưa tồn tại trong mảng dst thì thêm nó vào mảng:

```
if(!isExist(ans, element)) ans.push(element);
```

Nếu phần tử đã tồn tại trong mảng dst thì bỏ qua (không làm gì).

**B3:** Trả về mảng dst là mảng đã loại bỏ phần tử lặp.

```
return ans;
```

_**Tiếp theo, triển khai hàm kiểm tra tính tồn tại isExist thế nào?**_

```
let isExist = (arr, x) => {
      for(let i = 0; i < arr.length; i++) {
        if (arr[i] === x) return true;
      }
      return false;
    }
```

Ở đây, mình không sử dụng phương thức có sẵn. Đơn giản là sử dụng vòng lặp, duyệt từng phần tử trong mảng arr[i]. Nếu nó bằng với phần tử cần so sánh x, tức (arr[i] === x) trả về giá trị **true**, thì phần tử x đã tồn tại trong mảng arr. Hay nói cách khác là hàm _isExist(arr, x)_ trả về giá trị true.

Trên đây là cách triển khai dài nhất, nhưng cơ bản nhất và nó sẽ giúp bạn hiểu rõ về thuật toán. Một khi đã hiểu rõ thuật toán rồi, bạn có thể sử dụng các phương thức sẵn có để rút ngắn lượng code phải viết, như các cách mà mình sẽ trình bày dưới đây.

### Sử dụng phương thức indexOf để kiểm tra tính tồn tại

```
let arr = [1, 5, 'a', 3, 'f', '3', 5, 3, 'b', 'e', 'f'];
    let ans = deduplicate(arr);

    console.log(ans);
    // Expected output: [1, 5, "a", 3, "f", "3", "b", "e"]

    function deduplicate(arr) {
      let isExist = (arr, x) => arr.indexOf(x) > -1;
      let ans = [];

      arr.forEach(element => {
        if(!isExist(ans, element)) ans.push(element);
      });

      return ans;
    }
```

Nếu bạn để ý thì thấy rằng, mình đã rút ngắn hàm isExist **từ 6 dòng xuống thành 1 dòng** bằng cách sử dụng phương thức [indexOf](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/indexOf) - đây là phương thức có sẵn của Array. Phương thức này trả về vị trí của phần tử x nếu tìm thấy, ngược lại sẽ trả về -1.

### Sử dụng phương thức includes để kiểm tra tính tồn tại

Cũng tương tự như indexOf, bạn có thể sử dụng phương thức [includes](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes) để kiểm tra tính tồn tại của một phần tử trong mảng:

```
let arr = [1, 5, 'a', 3, 'f', '3', 5, 3, 'b', 'e', 'f'];
    let ans = deduplicate(arr);

    console.log(ans);
    // Expected output: [1, 5, "a", 3, "f", "3", "b", "e"]

    function deduplicate(arr) {
      let isExist = (arr, x) => arr.includes(x);
      let ans = [];

      arr.forEach(element => {
        if(!isExist(ans, element)) ans.push(element);
      });

      return ans;
    }
```

Phương thức includes sẽ trả về true nếu mảng arr chứa phần tử x.

### Sử dụng phương thức filter và indexOf

```
let arr = [1, 5, 'a', 3, 'f', '3', 5, 3, 'b', 'e', 'f'];
    let ans = deduplicate(arr);

    console.log(ans);
    // Expected output: [1, 5, "a", 3, "f", "3", "b", "e"]

    function deduplicate(arr) {
      return arr.filter((value, index, arr) => arr.indexOf(value) === index);
    }
```

Cách này có vẻ không theo logic của thuật toán phía trên, tuy nhiên cũng khá **dễ hiểu**. Phương thức [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) sẽ trả về một mảng mới chứa các phần tử thoả mãn hàm test.

Ở đây hàm test (arrow function) là:

```
(value, index, arr) => arr.indexOf(value) === index
```

Trong đó, value là giá trị của mỗi phần tử trong mảng, index là chỉ số tương ứng và arr là mảng gốc ban đầu.

Một phần tử trong mảng thoả mãn hàm test trên khi và chỉ khi nó là phần tử đầu tiên.

_**Tại sao lại như vậy?**_

Vì phương thức indexOf chỉ trả về chỉ số của phần tử đầu tiên tìm thấy trong mảng.

Ví dụ trong mảng arr trên, phần tử 5 xuất hiện ở vị trí số 1 và số 6. Do đó, arr.indexOf(5) sẽ luôn trả về 1, nên chỉ có phần tử 5 ở vị trí số 1 được đưa vào mảng kết quả, phần tử còn lại sẽ bỏ qua.

Cứ như vậy, mình sẽ thu được mảng mới mà không có phần tử nào bị lặp.

### Sử dụng Set và Array.from

```
let arr = [1, 5, 'a', 3, 'f', '3', 5, 3, 'b', 'e', 'f'];
    let ans = deduplicate(arr);

    console.log(ans);
    // Expected output: [1, 5, "a", 3, "f", "3", "b", "e"]

    function deduplicate(arr) {
      let set = new Set(arr);
      return Array.from(set);
    }
```

Ý tưởng của phương pháp này bắt nguồn từ định nghĩa của [Set](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Set).

_The Set object lets you store unique values of any type, whether primitive values or object references._

Nghĩa là: Set cho phép lưu giá trị của bất kì các kiểu dữ liệu nào một cách duy nhất. Do đó, bạn chỉ cần sử dụng hàm khởi tạo của Set với đầu vào là array để loại bỏ phần tử bị lặp.

```
let set = new Set(arr);
```

Kết quả thu được sau câu lệnh trên là kiểu Set. Công việc còn lại cần làm là chuyển từ Set sang Array bằng cách sử dụng [Array.from](https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Array/from):

```
return Array.from(set);
```

### Sử dụng Set và toán tử spread

```
let arr = [1, 5, 'a', 3, 'f', '3', 5, 3, 'b', 'e', 'f'];
    let ans = deduplicate(arr);

    console.log(ans);
    // Expected output: [1, 5, "a", 3, "f", "3", "b", "e"]

    function deduplicate(arr) {
      let set = new Set(arr);
      return [...set];
    }
```

Cách này cũng tương tự như cách trên, chỉ khác là mình sử dụng toán tử [spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) để convert Set sang mảng:

```
return [...set];
```

## Kết luận

Trên đây là 6 cách loại bỏ phần tử lặp trong mảng:

- Sử dụng mảng thông thường

* Sử dụng phương thức indexOf để kiểm tra tính tồn tại

- Sử dụng phương thức includes để kiểm tra tính tồn tại

* Sử dụng phương thức filter và indexOf

- Sử dụng Set và Array.from

* Sử dụng Set và toán tử spread

Nếu bạn có thắc mắc hay góp ý gì thì có thể để lại cho mình trong phần bình luận. Ngoài ra, nếu bạn có cách làm khác nữa thì mong bạn chia sẻ lại với mình nhé!

Xin chào và hẹn gặp lại bạn ở [bài viết tiếp theo](/2-cach-tao-immutable-object-javascript/), thân ái!

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
