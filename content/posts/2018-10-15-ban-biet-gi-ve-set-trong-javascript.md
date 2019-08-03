---
date: "2018-10-15T22:30:13Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: ban-biet-gi-ve-set-trong-javascript
title: "Bạn biết gì về Set trong JavaScript?"
categories:
  - Javascript cơ bản
tags:
  - ES6
---

Set trong Javascript là một loại object cho phép bạn lưu trữ dữ liệu một cách duy nhất, không trùng lặp.

"**Nói vậy thì ai chẳng nói được**". Có phải bạn đang suy nghĩ như vậy không?

Dù có hay không thì mình tin chắc rằng có một số thứ bạn chưa hiểu rõ hết về Set trong JavaScript, cũng như những thứ bạn có thể làm với nó.

Còn nếu như bạn cứ khăng khăng rằng mình biết hết về Set rồi thì khỏi mất công đọc bài viết này nữa.

Ngược lại, mình tin là bạn sẽ **KHÔNG** cảm thấy phí vài phút đồng hồ khi đọc bài viết này đâu.

Tin mình đi và bắt đầu nhé!

## Set trong JavaScript là gì?

Mình xin nhắc lại: "Set trong Javascript là một loại object cho phép bạn lưu trữ dữ liệu một cách duy nhất, không trùng lặp."

Có 2 điều bạn cần chú ý ở đây.

### Set là một loại object

Vì vậy mà `typeof <Set>` sẽ trả về `object` (cái này không phải ai cũng biết đâu nhé !!!).

```
const set1 = new Set();
    console.log(typeof set1);
    // => object
```
Xem thêm:[JavaScript Object – last but not least](/javascript-object-last-but-not-least/)

### Dữ liệu trong Set là duy nhất, không trùng lặp

Vậy hiểu thế nào là _**duy nhất, không trùng lặp**_.

Nói nôm na thì nghĩa là "giá trị" của các phần tử không được giống nhau. Nhưng thực chất, Set sử dụng thuật toán [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) để so sánh giá trị của các phần tử.

Thuật toán này cũng tương tự như việc sử dụng toán tử "===" để so sánh giá trị giữa chúng. Chỉ khác ở chỗ nó coi **NaN** là giống nhau (mặc dù **_NaN !== NaN_**)

Vì vậy, cái mà mình nói ở trên chỉ đúng với [Number](/values-types-va-operators-trong-javascript-phan-1/) và [String](/values-types-va-operators-trong-javascript-phan-2/). Còn đối với Object thì khác. Bởi 2 object nhìn giống nhau nhưng rõ ràng chúng không bằng nhau:

```
const obj1 = { x: 1, y: 2};
    const obj2 = { x: 1, y: 2};

    console.log(obj1 === obj2);
    // => false

    const set1 = new Set([obj1, obj2]);
    console.log(set1.size);
    // => 2
```
Ngoài ra, bạn cũng có thể lưu `NaN` và `undefined` vào Set trong JavaScript.

```
const set2 = new Set([NaN, undefined, NaN]);
    console.log(set2);
    // => Set(2) {NaN, undefined}
```

Đọc đến đây thì chắc bạn đã hiểu Set là gì rồi phải không?

Vậy mình có thể làm được những gì với Set?

## Các hoạt động có thể làm với Set trong JavaScript

### Khởi tạo Set

Khởi tạo Set là điều đầu tiên mà bạn cần làm nếu muốn sử dụng Set.

Cú pháp khởi tạo Set trong Javascript là:

```
new Set([iterable]);
```

Trong đó:

- Nếu bạn không truyền tham số vào hàm khởi tạo thì Set sẽ rỗng, không có phần tử nào.
- Ngược lại, nếu bạn truyền vào một [iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) thì tất cả các phần tử của nó sẽ được thêm vào Set.

Có một điều mình nhấn mạnh ở đây là: **Bạn có thể truyền vào iterable object, chứ không chỉ có Array**.

Mình đọc rất nhiều bài viết trên mạng về Set thì chỉ thấy họ khởi tạo Set bằng [Array](/javascript-array-co-ban/).

Sẽ là rất thiếu sót nếu như không kể đến String, Array-like objects ([arguments](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/arguments), [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList)), [TypedArray](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray), [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map), và cả Set luôn - vì chúng đều là iterable object mà.

Mời bạn xem các ví dụ khởi tạo Set trong JavaScript.

#### Khởi tạo Set rỗng

```
const set1 = new Set();
    console.log(set1);
    // => Set(0) {}
```

#### Khởi tạo Set từ Array

```
const set2 = new Set([1, 2, "a", "b", 1]);
    console.log(set2);
    // => Set(4) {1, 2, "a", "b"}
```

#### Khởi tạo Set từ String

```
const set3 = new Set("abcba");
    console.log(set3);
    // => Set(3) {"a", "b", "c"}
```

#### Khởi tạo Set từ arguments

```
function func4() {
      const set4 = new Set(arguments);
      console.log(set4);
    }
    func4("a", "b", "c", "b", 0, 1);
    // => Set(5) {"a", "b", "c", 0, 1}
```

#### Khởi tạo Set từ NodeList

Kết quả của các phương thức liên quan đến DOM như [document.querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll), [document.getElementsByClassName](https://developer.mozilla.org/en-US/docs/Web/API/Document/getElementsByClassName),... đều trả về NodeList.

Ví dụ luôn tại console của trình duyệt:

```
const head = document.querySelectorAll("head");
    const set1 = new Set(head);
    console.log(set1);
    // => Set(1) {head}
```

#### Khởi tạo Set từ TypedArray

TypedArray là một kiểu object tương tự như Array.

Và bạn cũng có thể sử dụng TypedArray để khởi tạo Set như sau:

```
const typedArray1 = new Int8Array(2);
    typedArray1[0] = 12;
    typedArray1[1] = 34;

    const set1 = new Set(typedArray1);
    console.log(set1);
    // => Set(2) {12, 34}
```

#### Khởi tạo Set từ Map

```
const map1 = new Map();
    map1.set("one", 1);
    map1.set("two", 2);

    const set1 = new Set(map1);
    console.log(set1);
    // => Set(2) {Array(2), Array(2)}

    for (const x of set1) {
      console.log(x);
    }
    /*
    * ["one", 1]
    * ["two", 2]
    */
```

#### Khởi tạo Set từ Set

```
const set1 = new Set([1, 2]);
    const set2 = new Set(set1);
    console.log(set2);
    // => Set(2) {1, 2}
```

Trên đây là một số cách để khởi tạo Set.

Đối với trường hợp khởi tạo Set rỗng, thì rõ ràng mình sẽ cần phải thêm phần tử vào cho nó thì mới có ý nghĩa phải không?

### Thêm phần tử vào Set

Để thêm phần tử vào Set, bạn có thể sử dụng phương thức _add_ như sau:

```
Set.prototype.add(value)
```

Trong đó:

- Nếu trong Set không có phần tử _value_ thì phương thức này sẽ thêm _value_ vào Set và return về chính Set đó.
- Nếu _value_ đã tồn tại, thì phương thức này sẽ bỏ qua và cũng return về chính Set đó.

Ví dụ:

```
const set1 = new Set();
    set1.add(1);
    console.log(set1);
    // => Set(1) {1}

    set1.add(2);
    console.log(set1);
    // => Set(2) {1, 2}

    set1.add(1).add(2).add(3);
    console.log(set1);
    // => Set(3) {1, 2, 3}
```

Rõ ràng, việc trả về chính đối tượng Set sau khi _add_ giúp code trở trên ngắn gọn hơn nhiều.

Xem thêm: [Tìm hiểu kĩ thuật Method Chaining cơ bản](/tim-hieu-ki-thuat-method-chaining-co-ban/)

### Lấy số lượng phần tử trong Set

Để lấy được số phần tử của Set trong JavaScript, bạn có thể sử dụng thuộc tính _size_.

```
const set1 = new Set(["a", "b", "a"]);
    console.log(set1.size);
    // => 2
```
### Kiểm tra phần tử tồn tại trong Set

Để kiểm tra xem một phần tử có tồn tại trong Set hay không, bạn có thể sử dụng phương thức _has_.

```
const set1 = new Set([1, "a", [1, 2]]);
    console.log(set1.has(1));       // => true
    console.log(set1.has("1"));     // => false
    console.log(set1.has("a"));     // => true
    console.log(set1.has("b"));     // => false
    console.log(set1.has([1, 2]));  // => false
```
Kết quả trên là hoàn toàn dễ hiểu phải không?

Ở đây, mình chỉ muốn nhắc lại, Set sẽ sử dụng toán tử "===" để so sánh. Do đó:

```
console.log(1 === 1);           // => true
    console.log(1 === "1");         // => false
    console.log("a" === "a");       // => true
    console.log([1, 2] === [1, 2]); // => false
```
### Xoá một phần tử trong Set

Bên trên là thêm phần tử vào Set, còn bây giờ là xóa phần tử khỏi Set trong JavaScript.

Ở đây, bạn có thể sử dụng phương thức _delete_.

```
const set1 = new Set("abcdcba");
    console.log(set1); // => Set(4) {a, b, c, d}

    set1.delete("a");
    console.log(set1); // => Set(4) {b, c, d}

    set1.delete("d");
    console.log(set1); // => Set(2) {b, c}
```

### Xoá tất cả phần tử trong Set

Để xóa tất cả các phần tử trong Set, bạn có thể sử dụng phương thức _clear_. Khi đó, Set sẽ trở thành rỗng.

```
const set1 = new Set([1, 2, 3]);
    console.log(set1);  // => Set(3) {1, 2, 3}

    set1.clear();
    console.log(set1);  // => Set(0) {}
```

### Duyệt qua các phần tử trong Set

Việc duyệt qua các phần tử trong Set là cần thiết. Và Set có hỗ trợ một số cách để bạn có thể duyệt như sau.

#### Sử dụng for of

Như trong ví dụ phần định nghĩa Set, mình đã sử dụng `for of` để duyệt qua và liệt kê các phần tử trong Set.

Nhắc lại ví dụ về `for of`:

```
const set1 = new Set(["a", { x : 1}, 1]);
    for(const x of set1) {
      console.log(x);
    }
    /*
    * a
    * { x : 1}
    * 1
    */
```

#### Sử dụng forEach

Sử dụng _forEach_ trong Set cũng tương tự như [forEach trong Array](/javascript-foreach-la-cai-quai-gi/).

```
const set1 = new Set(["a", "b", "c"]);
    console.log(set1);
    // => Set(3) {"a", "b", "c"}

    set1.forEach(function(value) {
      console.log(value);
    });
    /*
    * a
    * b
    * c
    */
```

#### Sử dụng phương thức keys(), value(), entries()

Phần này mình chỉ liệt kê ra thôi, chứ mình thấy cũng chả có ý nghĩa lắm.

Vì 3 phương thức này đều trả về iterable object, với mỗi phần tử tương ứng với một phần tử trong Set (theo thứ tự mà mình chèn vào).

Mà mình thấy cách sử dụng cũng tương tự như 2 phần trên.

```
const set1 = new Set(["a", { x : 1}, 1]);

    for(const x of set1) {
      console.log(x);
    }
    /*
    * a
    * { x : 1}
    * 1
    */

    for(const x of set1.keys()) {
      console.log(x);
    }
    /*
    * a
    * { x : 1}
    * 1
    */

    for(const x of set1.values()) {
      console.log(x);
    }
    /*
    * a
    * { x : 1}
    * 1
    */

    for(const x of set1.entries()) {
      console.log(x);
    }
    /*
    * ["a", "a"]
    * [{ x : 1}, { x : 1}]
    * [1, 1]
    */
```

Có mỗi phần _entries()_ hơi khác một chút. Mỗi phần tử trong iterable object là một mảng gồm 2 phần tử giống nhau.

Suy cho cùng, mình thấy để duyệt qua các phần tử trong Set thì sử dụng _for of_ hoặc _forEach_ là quá đủ rồi.

### Chuyển Set thành Array và ngược lại

Bạn thấy đấy, mình có thể sử dụng _forEach_ trong Set, tương tự như Array. Nhưng còn các phương thức khác như: _map, filter,..._ thì sao?

Thực tế, Set không hỗ trợ những phương thức này. Nhưng bạn hoàn toàn có thể chuyển Set thành Array để có thể sử dụng các phương thức của Array rồi sau đó lại chuyển Array ngược lại thành Set.

Để chuyển Set thành Array, bạn có thể sử dụng [Array.from](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from) hoặc sử dụng [toán tử spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax).

Ví dụ:

```
const set1 = new Set([1, 2, 3, 4, 5]);

    const arr1 = Array.from(set1);
    console.log(arr1);
    // => [1, 2, 3, 4, 5]

    const arr2 = [...set1];
    console.log(arr2);
    // => [1, 2, 3, 4, 5]
```
Giả sử lúc này mình sử dụng phương thức [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) để lọc lấy những phần tử là số chẵn.

```
const arr3 = arr1.filter(x => x%2 === 0);
    console.log(arr3);
    // => (2) [2, 4]
```
Bây giờ, mình chuyển Array này ngược lại thành Set - sử dụng công thức phần khởi tạo Set:

```
const set2 = new Set(arr3);
    console.log(set2);
    // => Set(2) {2, 4}
```

Toàn bộ quá trình trên có thể viết gọn lại thành:

```
const set1 = new Set([1, 2, 3, 4, 5]);
    console.log(set1);
    // => Set(5) {1, 2, 3, 4, 5}

    const set2 = new Set([...set1].filter(x => x%2 == 0));
    console.log(set2);
    // => Set(2) {2, 4}
```

Dĩ nhiên, khi đã chuyển Set thành Array rồi thì bạn có thể sử dụng bất kể [phương thức](/javascript-foreach-la-cai-quai-gi/) nào mà Array hỗ trợ, tùy thích!

## Một ví dụ thực tế sử dụng Set

Trong bài viết về [Tạo blog với Gatsby.js](/tao-trang-blog-voi-gatsby-js/), mình đã nói về vấn đề tạo danh sách các thẻ, chuyên mục cho tất cả các bài viết.

Đó chính là một ví dụ thực tế sử dụng Set. Vì mình cần phải lưu lại danh sách các thẻ, chuyên mục với các phần tử là duy nhất, rồi sau đó hiển thị danh sách này lên sidebar.

Ví dụ: mỗi bài viết của mình sẽ có một mảng lưu các thẻ tag.

```
const post1 = ["tag1", "tag2", "tag4"];
    const post2 = ["tag3", "tag4"];
```

Khi đó, mảng các thẻ tag với các phần tử duy nhất có thể được tạo bằng cách:

```
let arrTag = [];
    arrTag = Array.from(new Set([...arrTag, ...post1]));
    arrTag = Array.from(new Set([...arrTag, ...post2]));
    console.log(arrTag);
    // => (4) ["tag1", "tag2", "tag4", "tag3"]
```
Giả sử, mình tạo thêm một bài viết mới với mảng các thẻ tag là:

```
const post3 = ["tag1", "tag3", "tag5"];
```

Để cập nhật danh sách thẻ tag mình có thể làm như sau:

```
arrTag =  Array.from(new Set([...arrTag, ...post3]));
    // => (5) ["tag1", "tag2", "tag4", "tag3", "tag5"]
```
Rõ ràng, mỗi khi thêm một bài viết mới, mình chỉ cần làm như trên là có thể cập nhật được danh sách các thẻ của bài viết một cách không trùng lặp.

Có thể còn rất nhiều ví dụ khác nữa sử dụng Set mà **mình rất muốn nghe ý kiến từ bạn!**

## Lời kết

Trên đây là một số kiến thức mà mình đã nghiên cứu được về Set trong JavaScript. Trong đó mình chỉ muốn nhấn mạnh một chỗ là: **bạn có thể khởi tạo Set bằng cách truyền vào Iterable object (như String, Array-like objects(arguments, NodeList), TypedArray, Map, và cả Set), chứ không phải chỉ mỗi Array**.

Nếu có gì không hiểu, hoặc có chỗ nào đó mình làm sai thì bạn có thể góp ý với mình. Mình sẵn sàng đón nhận.

Còn bây giờ thì xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!

### Tham khảo

- [Set - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set)
- [The Set JavaScript Data Structure](https://flaviocopes.com/javascript-data-structures-set/)

---

★ Theo dõi [Lam Pham](/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)  
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
**☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
