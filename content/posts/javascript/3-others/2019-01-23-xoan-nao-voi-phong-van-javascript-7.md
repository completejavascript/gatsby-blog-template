---
date: "2019-01-23T02:00:43Z"
template: "post"
directory: "JavaScript"
cover: "../images/xoan-nao-voi-phong-van-javascript-7-completejavascript.com_.png"
keywords: "Xoắn não với phỏng vấn JavaScript 7"
description: "Xin chào bạn đến bài viết Xoắn não với phỏng vấn JavaScript 7, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay."
slug: xoan-nao-voi-phong-van-javascript-7
title: "Xoắn não với phỏng vấn JavaScript 7"
tags:
  - Map
  - Promise
  - Quiz
---

Xin chào bạn đến bài viết **Xoắn não với phỏng vấn JavaScript 7**, hôm nay mình lại tiếp tục chia sẻ với bạn những câu hỏi phỏng vấn JavaScript rất hay.

Mời bạn theo dõi bài viết!

## Xoắn não với phỏng vấn JavaScript 7 – Câu 1

```js
const map = new Map();
map.set(1, 1).set("a", 2).set([1], 3).set(1, 4).set("a", 5).set([1], 6);

const a = map.get(1),
  b = map.get("a"),
  c = map.get([1]);

console.log(a, b, c);
```

Hỏi console in ra kết quả như thế nào? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible1" class="toggle" type="checkbox">
  <label for="collapsible1" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** 4 5 undefined

**Giải thích:**

Mấu chốt để giải quyết câu hỏi này là: bạn phải hiểu được cơ chế thêm phần tử vào Map khi sử dụng **Map.prototype.set(key, value)**. Phương thức này sẽ gán giá trị _value_ cho _key_ bên trong Map.

Nếu *key* chưa tồn tại thì Map sẽ tạo mới phần tử với *key* tương ứng. Ngược lại, nếu *key* đã tồn tại thì Map sẽ gán giá trị mới cho nó.

**Và quan trọng là**: Map sử dụng thuật toán [SameValueZero](https://tc39.github.io/ecma262/#sec-samevaluezero) để so sánh giá trị của các key với nhau. Về cơ bản, thuật toán này sẽ tương đương với việc sử dụng toán tử "===" để so sánh.

Mà ở đây, các _key_ lần lượt là: **1, "a" và [1]** và ta có:

```
1 === 1     // => true
"a" === "a" // => true
[1] === [1] // => false
```

Do đó, key **1** và **"a"** coi như đã tồn tại, nên giá trị của nó được cập nhật với giá trị mới nhất lần lượt là: **4** và **5**.

Trong khi đó, key **[1]** coi như chưa tồn tại. Và dĩ nhiên, khi lấy ra giá trị của nó thì kết quả sẽ là **undefined**.

Để biết thêm về Map, mời bạn theo dõi bài viết: [Map trong JavaScript thì sao?](/map-trong-javascript-thi-sao)

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 7 – Câu 2

```
0 == "0"         // true
0 == []          // true

"0" == []        // (1)
"" == []         // (2)
"1, 2" == [1, 2] // (3)
"1,2" == [1,2]   // (4)
```

Hỏi giá trị của (1), (2), (3), (4) là gì? Tại sao?

<div class="wrap-collapsible">
  <input id="collapsible2" class="toggle" type="checkbox">
  <label for="collapsible2" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** (1) - false, (2) - true, (3) - false, (4) - true

**Giải thích:**

Câu hỏi này liên quan đến việc so sánh 2 giá trị có kiểu dữ liệu khác nhau, sử dụng toán tử "==". Trong trường hợp này, JavaScript sẽ convert chúng về cùng kiểu dữ liệu để so sánh.

Cụ thể convert như thế nào thì mình không dám chắc. Mình chỉ dự đoán thôi, đó là JavaScript sẽ convert giá trị thứ hai về cùng kiểu với giá trị thứ nhất.

Đối với **0 == "0"** và **0 == []**, JavaScript sẽ convert string **"0"** và array rỗng **[]** về dạng số, nên giá trị của chúng đều là 0. Do đó, kết quả của 2 phép so sánh này là **true**.

Đối với các phép so sánh (1), (2), (3) và (4), JavaScript sẽ convert thành phần thứ 2 (kiểu array) về thành phần thứ nhất (kiểu string). Mà để convert array sang kiểu string thì JavaScript sẽ sử dụng phương thức [Array.prototype.toString()](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/toString).

Và ta có:

```js
[].toString(); // => ""
[1, 2].toString(); // => "1,2"
```

Vì vậy mà mình thu được kết quả như trên.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 7 – Câu 3

```js
const a = () => console.log("a");
const b = () => console.log("b");
const c = () => console.log("c");
const d = () => {
  console.log("d");
  setTimeout(a, 0);
  b();
  c();
};
d();
```

Hỏi console in ra kết quả theo thứ tự như thế nào?

<div class="wrap-collapsible">
  <input id="collapsible3" class="toggle" type="checkbox">
  <label for="collapsible3" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án:** d b c a

**Giải thích:**

Khi [function](/tim-hieu-function-javascript) **d()** được gọi, dĩ nhiên _d_ sẽ được in ra đầu tiên. Ngoài ra, function **b()** và **c()** là hàm xử lý đồng bộ nên chắc chắn _b_ sẽ in ra trước _c_. Vấn đề ở đây chỉ là _a_ mà thôi.

Ở đây, hàm **a()** được đặt trong hàm [setTimeout()](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout). Mà khi được đặt trong hàm này, hàm _a()_ sẽ được thực hiện ngay sau một khoảng thời gian *timeout* cho trước.

Ở đây, mình truyền vào thời gian _timeout_ là 0. Nhưng thực tế, thời gian này tối thiểu phải là **4ms**. Về chi tiết bạn có thể tham khảo tại [đây](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout#Reasons_for_delays_longer_than_specified). Do vậy, _a_ sẽ được in ra sau _b_ và _c_. Và dĩ nhiên, kết quả cuối cùng phải là: **d b c a**.

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Xoắn não với phỏng vấn JavaScript 7 – Câu 4

```js
const a = () => console.log("a");
const b = () => console.log("b");
const c = () => {
  console.log("c");
  setTimeout(a, 0);
  new Promise((resolve, reject) => {
    resolve("d");
  })
    .then((res) => console.log(res))
    .catch((err) => console.log(err));
  b();
};
c();
```

Hỏi console in ra kết quả theo thứ tự như thế nào?

<div class="wrap-collapsible">
  <input id="collapsible4" class="toggle" type="checkbox">
  <label for="collapsible4" class="lbl-toggle">Xem đáp án</label>
  <div class="collapsible-content">
    <div class="content-inner">

**Đáp án**: c b d a

**Giải thích**:

Câu hỏi này cũng tương tự như câu hỏi bên trên. Do đó, chắc chắn **c** và **b** sẽ được in ra trước. Vấn đề bây giờ chỉ là **a** và **d** mà thôi.

Trong đó: **a()** được đặt trong hàm **setTimeout()**, còn **d()** lại được đặt trong một [Promise](https://developer.mozilla.org/vi/docs/Web/JavaScript/Reference/Global_Objects/Promise). Mà cả 2 thành phần này đều là xử lý bất đồng bộ.

Tuy nhiên, JavaScript quy định những hành động được lên kế hoạch từ _setTimeout()_ là **Task.** Còn những hành động từ _Promise_ là **MicroTask**. Trong đó, _microtask_ bao giờ cũng được ưu tiên hơn _task_ và cũng sẽ được thực hiện sớm nhất có thể.

Vì vậy, d sẽ được in ra trước a. Và kết quả cuối cùng là: **c b d a**.

Để hiểu hơn về sự khác nhau giữa setTimeout và Promise, bạn có thể đọc thêm 2 bài viết sau: [Tasks, microtasks, queues and schedules](https://jakearchibald.com/2015/tasks-microtasks-queues-and-schedules/) và [The JavaScript Event Loop](https://flaviocopes.com/javascript-event-loop/).

</div>

  </div>
</div>
<div class="margin-bottom"></div>

## Lời kết

Trên đây là 4 câu hỏi phỏng vấn JavaScript cũng rất hay. Nếu bạn có cùng nhận xét với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!
