---
date: "2018-10-17T22:30:56Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: map-trong-javascript-thi-sao
title: "Map trong JavaScript thì sao?"
categories:
  - Javascript cơ bản
tags:
  - ES6
  - Map
---

Map trong JavaScript là một loại object cho phép lưu trữ dữ liệu theo kiểu key-value.

**Nghe thì có vẻ giống với [object](/javascript-object-last-but-not-least/) bình thường nhỉ? Vì object cũng cho phép bạn làm điều này mà.**

Nhưng mọi thứ trên đời này đều có ý nghĩa của riêng nó. Map cũng không ngoại lệ. Map có **những đặc điểm riêng biệt** so với object thông thường.

Sau đây mình sẽ cùng tìm hiểu về Map trong JavaScript nhé!

## Map trong JavaScript là gì?

Nói một cách đầy đủ thì Map trong JavaScript là một cấu trúc dữ liệu cho phép lưu trữ dữ liệu theo kiểu key-value, tương tự như object.

Nhưng khác ở chỗ là:

- Object chỉ cho phép sử dụng [String](/values-types-va-operators-trong-javascript-phan-2/) hay [Symbol](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol) làm key
- Map cho phép mọi kiểu dữ liệu (String, Number, Boolean, NaN, Object,...) có thể làm key

**Chú ý:** về cơ bản thì Map cũng là Object, tuy nhiên, để tránh hiểu lầm, từ nay mỗi khi mình dùng từ object thì bạn hiểu đó là object thông thường mà từ trước đến giờ bạn vẫn sử dụng, không phải Map.

```
const map1 = new Map();
    console.log(typeof map1);
    // => object
```

## Các hoạt động có thể làm với Map trong JavaScript

### Khởi tạo Map

Cú pháp khởi tạo Map trong JavaScript là:

```
new Map([iterable])
```

Cũng tương tự như Set, bạn có thể truyền vào một [iterable object](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of) để khởi tạo Map. Khi đó, mỗi phần tử của iterable object sẽ tương ứng với một phần tử của Map.

Dĩ nhiên, bạn cũng có thể không truyền tham số vào, khi đó Map sẽ rỗng và không có phần tử nào.

Một điều cần lưu ý ở đây: vì Map lưu trữ dữ liệu theo kiểu **key-value** nên mỗi phần tử của iterable object phải là một mảng gồm 2 phần tử có dạng: `[key, value]`.

Ví dụ:

- `[1, 2, 3, 4]`: là một iterable object, nhưng mỗi phần tử của nó là Number (1, 2, 3, 4). Suy ra, đây **không phải là tham số hợp lệ**.
- `[[1, 2], [3, 4]]`: là một **tham số hợp lệ**, vì nó là iterable object mà mỗi phần tử là mảng 2 phần tử ([1, 2] và [3, 4]). Khi đó, "1" là key - "2" là value và "3" là key - "4" là value.

Dựa trên những đặc điểm nêu trên, mình có thể khởi tạo Map theo những cách sau đây.

#### Khởi tạo Map rỗng

```
const map1 = new Map();
    console.log(map1);
    // => Map(0) {}
```

#### Khởi tạo Map từ Array

```
const map2 = new Map([[1, "a"], [2, "b"]]);
    console.log(map2);
    // => Map(2) {1 => "a", 2 => "b"}

    const map3 = new Map([1, "a", 2, "b"]);
    // => Uncaught TypeError: Iterator value 1 is not an entry object
```

#### Khởi tạo Map từ arguments

```
function func4() {
      const map4 = new Map(arguments);
      console.log(map4);
    }
    func4(["one", 1], ["two", 2], ["three", 3]);
    // => Map(3) {"one" => 1, "two" => 2, "three" => 3}
```

#### Khởi tạo Map từ Set

```
const set5 = new Set([["a", 1], ["b", 2]]);
    console.log(set5);
    // => Set(2) {Array(2), Array(2)}

    const map5 = new Map(set5);
    console.log(map5);
    // => Map(2) {"a" => 1, "b" => 2}
```

#### Khởi tạo Map từ Map

```
const map6 = new Map([["a", 1], ["b", 2]]);
    console.log(map6);
    // => Map(2) {"a" => 1, "b" => 2}

    const map6_clone = new Map(map6);
    console.log(map6_clone);
    // => Map(2) {"a" => 1, "b" => 2}
```

**Chú ý:** Ngoài các kiểu iterable object trên thì còn có String, [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList), TypedArray. Nhưng tiếc là mình chưa tìm thấy cách nào có thể tạo ra những iterable object kiểu này mà mỗi phần tử của nó là một mảng chứa 2 phần tử dạng (`["key", "value"]`).

Nếu bạn tìm ra cách cho vấn đề này, vui lòng chia sẻ lại với mình nhé, **thank you!**

### Thêm phần tử vào Map

Để thêm phần tử vào Map, bạn có thể sử dụng phương thức _set_, với cú pháp:

```
Map.prototype.set(key, value)
```

Phương thức này sẽ gán giá trị _value_ cho khoá _key_ bên trong Map. Nói vậy nghĩa là, nếu _key_ chưa tồn tại thì Map sẽ tạo mới phần tử với _key_ tương ứng. Ngược lại, nếu _key_ đã tồn tại thì Map sẽ gán giá trị mới cho nó.

**Vấn đề làm sao biết được _key_ đã tồn tại hay chưa?**

Map sử dụng thuật toán [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) để so sánh giá trị của các key với nhau. Thuật toán _SameValueZero_ về cơ bản là giống với việc sử dụng toán tử "===" để so sánh. Chỉ khác là nó coi NaN là giống nhau (mặc dù `NaN !== NaN`);

Ví dụ:

```
const map7 = new Map();
    map7.set("a", 1);
    // => Map(1) {"a" => 1}

    map7.set("b", 2);
    // => Map(2) {"a" => 1, "b" => 2}

    map7.set([1], 3);
    // => Map(3) {"a" => 1, "b" => 2, [1] => 3}

    map7.set("a", 4);
    // => Map(3) {"a" => 4, "b" => 2, [1] => 3}

    map7.set([1], 5);
    // => Map(4) {"a" => 4, "b" => 2, [1] => 3, [1] => 5}

    map7.set(NaN, 6);
    // => Map(5) {"a" => 4, "b" => 2, [1] => 3, [1] => 5, NaN => 6}
```

Bạn nhớ là khi sử dụng toán tử "===" để so sánh thì `[1] !== [1]`. Nên trong Map sẽ tồn tại 2 cặp phần tử với key là `[1]` với value lần lượt là 3 và 5 như trên.

Ngoài ra, phương thức _set_ còn trả về chính đối tượng Map. Nên mình có thể áp dụng [kỹ thuật Method Chaining](/tim-hieu-ki-thuat-method-chaining-co-ban/) ở đây, sẽ giúp cho code trở nên ngắn gọn hơn.

Đoạn code trên có thể trở nên gọn hơn bằng cách:

```
const map7 = new Map();
    map7.set("a", 1)
        .set("b", 2)
        .set([1], 3)
        .set("a", 4)
        .set([1], 5)
        .set(NaN, 6);
    // => Map(5) {"a" => 4, "b" => 2, [1] => 3, [1] => 5, NaN => 6}
```

### Lấy giá trị của phần tử trong Map

Để lấy _value_ của phần tử tương ứng với _key_, bạn có thể sử dụng phương thức _Map.prototype.get(key)_.

```
const map7 = new Map([["a", 1], ["b", 1]]);
    console.log(map7.get("a")); // => 1
    console.log(map7.get("c")); // => undefined
```

Nếu _key_ tồn tại trong Map thì phương thức này trả về _value_ tương ứng. Ngược lại, nó sẽ trả về **undefined**.

### Lấy số lượng phần tử trong Map

Tương tự như Set, bạn có thể sử dụng phương thức `Map.prototype.size` để lấy ra kích thước của Map.

```
const map8 = new Map();
    console.log(map8.size);
    // => 0

    map8.set("a", 1).set("b", 2);
    console.log(map8.size);
    // => 2
```

### Kiểm tra phần tử tồn tại trong Map

Để kiểm tra xem một phần tử đã tồn tại trong Map hay chưa - thực chất là kiểm tra xem một giá trị _key_ đã tồn tại hay chưa, bạn có thể dùng phương thức _has_ như sau:

```
Map.prototype.has(key)
```

Nếu trong Map tồn tại _key_ thì phương thức này trả về **true** và ngược lại, nó sẽ trả về **false**.

```
const map9 = new Map([["a", 1], [1, 2], [[2], 3], [NaN, 4]]);
    console.log(map9.has("a")); // => true
    console.log(map9.has("1")); // => false
    console.log(map9.has(1));   // => true
    console.log(map9.has([2])); // => false
    console.log(map9.has(NaN)); // => true
```

**Nhớ là Map sử dụng thuật toán _SameValueZero_ để so sánh nhé!**

### Xoá một phần tử trong Map

Để xóa một phần tử trong Map, bạn có thể sử dụng phương thức _delete_:

```
Map.prototype.delete(key)
```

Nếu trong Map tồn tại _key_ thì phần tử ứng với _key_ sẽ bị xóa khỏi Map và phương thức này trả về **true**. Ngược lại, phương thức này sẽ trả về **false**.

```
const map10 = new Map([["one", 1], ["two", 2], ["three", 3]]);
    console.log(map10);
    // Map(3) {"one" => 1, "two" => 2, "three" => 3}

    console.log(map10.delete("two"));
    // true

    console.log(map10);
    // {"one" => 1, "three" => 3}
```

### Xoá tất cả phần tử trong Map

Bên trên là xóa **một** phần tử khỏi Map. Còn để xóa hết **tất cả** các phần tử khỏi Map, bạn sử dụng phương thức _clear_:

```
const map11 = new Map([["a", 1], ["b", 2], ["c", 3]]);
    console.log(map11);
    // Map(3) {"a" => 1, "b" => 2, "c" => 3}

    map11.clear();
    console.log(map11);
    // Map(0) {}
```

### Duyệt qua các phần tử trong Map

Tương tự như Set, bạn cũng có thể duyệt qua các phần tử trong Map thông qua các cách sau đây.

#### Sử dụng for...of

```
const map12 = new Map([[1, "a"], [2, "b"], [3, "c"]]);

    for (const item of map12) {
      console.log(item);
    }
    /*
    * [1, "a"]
    * [2, "b"]
    * [3, "c"]
    */
```

#### Sử dụng phương thức forEach

```
const map13 = new Map([[1, "a"], [2, "b"], [3, "c"]]);

    map13.forEach((value, key, map) => {
      console.log(value, key, map);
    });
    /*
    * a 1 Map(3) {1 => "a", 2 => "b", 3 => "c"}
    * b 2 Map(3) {1 => "a", 2 => "b", 3 => "c"}
    * c 3 Map(3) {1 => "a", 2 => "b", 3 => "c"}
    */
```

Trong đó, bạn chú ý trong hàm callback, tham số đầu tiên là **value**, tiếp theo mới là **key**. Chứ không phải theo thứ tự thông thương là **key-value**.

#### Sử dụng phương thức keys(), values(), entries()

Phương thức `Map.prototype.keys()` trả về một iterable object chứa giá trị **key** của các phần tử theo thứ tự chèn vào.

Phương thức `Map.prototype.values()` trả về một iterable object chứa giá trị **value** của các phần tử theo thứ tự chèn vào.

Phương thức `Map.prototype.entries()` trả về một iterable object mà mỗi phần tử tương ứng là một mảng `[key, value]`.

```
const map14 = new Map([[1, "a"], ["b", 2], [3, "c"]]);

    for (const key of map14.keys()) {
      console.log(key);
    }
    /*
    * 1
    * b
    * 3
    */

    for (const value of map14.values()) {
      console.log(value);
    }
    /*
    * a
    * 2
    * c
    */

    for (const item of map14.entries()) {
      console.log(item);
    }
    /*
    * [1, "a"]
    * ["b", 2]
    * [3, "c"]
    */
```

### Chuyển Map thành Array

#### Chuyển Map Keys thành Array

```
const map15 = new Map([[1, "a"], ["b", 2], [3, "c"]]);
    const keys = [...map15.keys()];
    console.log(keys);
    // => [1, "b", 3]
```

#### Chuyển Map Values thành Array

```
const map16 = new Map([[1, "a"], ["b", 2], [3, "c"]]);
    const values = [...map16.values()];
    console.log(values);
    // => ["a", 2, "c"]
```

## Lời kết

Trên đây là những kiến thức cơ bản về Map trong JavaScript. Hy vọng nó có thể giúp bạn hiểu hơn về kiểu dữ liệu này và có thể áp dụng vào các project thực tế của mình.

Nếu có gì thắc mắc, đừng ngại hỏi mình bằng cách bình luận phía dưới nhé!

Xin chào và hẹn gặp lại trong bài viết tiếp theo, thân ái!

**Tham khảo**:

- [Map - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map)
- [Map, Map, WeakMap and WeakSet](https://javascript.info/map-set-weakmap-weakset)
- [The Map JavaScript Data Structure](https://flaviocopes.com/javascript-data-structures-map/)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
