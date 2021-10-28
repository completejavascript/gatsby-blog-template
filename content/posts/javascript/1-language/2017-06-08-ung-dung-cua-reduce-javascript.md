---
date: "2017-06-08T23:00:53Z"
update: "2021-10-17T23:00:53Z"
template: "post"
directory: "JavaScript"
cover: "../images/mot-so-ung-dung-cua-reduce-trong-javascript-completejavascript.com_.png"
keywords: "ứng dụng của reduce"
description: "Bài viết này mình sẽ giới thiệu với bạn một vài ứng dụng của Reduce trong JavaScript giúp code của bạn trở nên ngắn gọn và dễ hiểu hơn. Qua đó, bạn có thể làm chủ và biết cách áp dụng JavaScript reduce."
slug: ung-dung-cua-reduce-javascript
title: "Ứng dụng của Reduce trong JavaScript"
tags:
  - Array
---

Trước khi bắt đầu, mình muốn bạn hiểu tại sao mình lại viết về phương thức Reduce trong JavaScript mà không phải là một cái nào khác.

Bởi lẽ, Reduce là một trong 3 phương thức quan trọng hay sử dụng trong lập trình hàm, đó là [Map](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map), [Filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) và [Reduce](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce). Việc sử dụng Reduce sẽ giúp cho code của bạn trở nên sáng sủa và ngắn gọn hơn rất nhiều.

Dĩ nhiên, đây chỉ là quan điểm cá nhân của mình thôi. Nếu bạn có ý kiến đóng góp, thảo luận, vui lòng để lại dưới phần bình luận nhé. Còn bây giờ thì mời bạn theo dõi bài viết!

## Cú pháp

JavaScript Reduce là một phương thức có sẵn của Array, được sử dụng để thực thi một [hàm](/tim-hieu-function-javascript) lên các phần tử của [mảng](/javascript-array-co-ban) (từ trái sang phải) với một biến tích lũy để thu về một giá trị duy nhất.

**Cú pháp:**

```js
arr.reduce(callback[, initialValue])
```

Trong đó:

- **callback**: là hàm thực thi với từng phần tử của hàm, với 4 tham số là: accumulator, currentValue, currentIndex và array.
  - **accumulator**: biến tích lũy, được trả về sau mỗi lần gọi hàm callback.
  - **currentValue**: phần tử của mảng đang được xử lý.
  - **currentIndex**: chỉ số của phần tử trong mảng đang được xử lý.
  - **array**: mảng hiện tại gọi hàm reduce().
- **initialValue**: là giá trị cho tham số thứ nhất (accumulator) của hàm callback trong lần gọi hàm đầu tiên. Nếu giá trị này không được cung cấp thì giá trị phần tử đầu tiên của mảng sẽ được sử dụng.
- **Giá trị trả về**: chính là giá trị của accumulator sau lần gọi hàm callback cuối cùng.

Trên đây là giới thiệu cơ bản về hàm Reduce. Tiếp theo mình sẽ giới thiệu với bạn một số ứng dụng của Reduce trong JavaScript.

## Ứng dụng của Reduce trong JavaScript

### Chuyển mảng 2 chiều thành mảng 1 chiều

#### Đặt vấn đề

Giả sử mình đang có một mảng các chủ đề trên blog, với mỗi chủ đề lại chứa một mảng các bài viết như sau:

```js
const topics = [
  {
    topic: "ReactJS",
    posts: [
      { postID: "id1", title: "title1" },
      { postID: "id2", title: "title2" },
    ],
  },
  {
    topic: "Vue.js",
    posts: [
      { postID: "id3", title: "title3" },
      { postID: "id4", title: "title4" },
    ],
  },
];
```

Bây giờ, mình muốn có một mảng các bài viết để hiển thị chúng thành một danh sách. Vậy mình phải làm sao?

#### Ứng dụng JavaScript Reduce để giải quyết vấn đề

Nếu quay trở lại thời điểm vài năm trước, khi mới chuyển từ C/C++ sang JavaScript thì mình sẽ luôn sử dụng vòng lặp **for** mà không cần phải suy nghĩ nhiều.

```js
const allPosts = [];

for (let t = 0, tl = topics.length; t < tl; t++) {
  const posts = topics[t].posts;

  for (let p = 0, pl = posts.length; p < pl; p++) {
    const post = posts[p];
    allPosts.push(post);
  }
}

console.log(allPosts);
/*
[
    { postID: "id1", title: "title1" },
    { postID: "id2", title: "title2" },
    { postID: "id3", title: "title3" },
    { postID: "id4", title: "title4" }
]
*/
```

Thậm chí lúc đó, mình còn không biết cách sử dụng mấy phương thức của array như: [forEach](/javascript-foreach-la-cai-quai-gi), map, filter,... nữa cơ. Nên bài toán nào mình cũng sử dụng vòng lặp for kiểu như trên.

Tuy nhiên, sau một khoảng thời gian học hành, thực hành nhiều và tiếp cận với tư tưởng lập trình hàm, mình sẽ sử dụng phương thức Reduce để giải quyết bài toán trên:

```js
const allPosts = topics.reduce((acc, cur) => {
  return [...acc, ...cur.posts];
}, []);
```

Trong đó, **initialValue** là một mảng rỗng **[]**. Và khi thực thi hàm callback với mỗi phần tử của mảng topics thì:

- Với lượt đầu tiên: **acc** là **[]** và **cur** ứng với phần tử đầu tiên (về "ReactJS") nên:

```js
acc = [];
cur.posts = [
 { postID: 'id1', title: 'title1' },
 { postID: 'id2', title: 'title2' },
]

// Kết quả
acc = [...acc, ...cur.posts] = [
 { postID: 'id1', title: 'title1' },
 { postID: 'id2', title: 'title2' },
]
```

- Với lượt tiếp theo:

```js
acc = [
 { postID: 'id1', title: 'title1' },
 { postID: 'id2', title: 'title2' },
]

cur.posts = [
 { postID: 'id3', title: 'title3' },
 { postID: 'id4', title: 'title4' },
]

// Kết quả
acc = [...acc, ...cur.posts] => [
 { postID: 'id1', title: 'title1' },
 { postID: 'id2', title: 'title2' },
 { postID: 'id3', title: 'title3' },
 { postID: 'id4', title: 'title4' },
]
```

Đó chính là cách mà mình vẫn đang sử dụng hằng ngày. Rõ ràng, nhờ ứng dụng của Reduce trong JavaScript mà code trở nên ngắn gọn hơn rất nhiều mà vẫn dễ hiểu phải không bạn?

### Chuyển array thành object theo giá trị của một thuộc tính

#### Đặt vấn đề

Giả sử mình đang có danh sách các bài viết như trên. Bây giờ mình muốn lấy tiêu đề bài viết (**title**) ứng với giá trị của một **postID** nào đó.

```js
const posts = [
  { postID: "id1", title: "title1" },
  { postID: "id2", title: "title2" },
  { postID: "id3", title: "title3" },
  { postID: "id4", title: "title4" },
];

const getPost = (postID, posts) => {
  // TODO: triển khai sau
};

// Thực hiện truy vấn
getPost("id1", posts).title; // => title1
getPost("id2", posts).title; // => title2
getPost("id3", posts).title; // => title3
getPost("id4", posts).title; // => title4
```

Vậy mình phải làm sao đây?

#### Ứng dụng JavaScript Reduce để giải quyết vấn đề

Cách suy nghĩ thông thường nhất là mình sẽ duyệt mảng trên. Với mỗi bài viết, mình sẽ so sánh giá trị **postID** của nó với cái mà mình đang tìm. Mình sẽ duyệt lần lượt từng phần tử cho đến khi tìm được đúng bài viết thì thôi.

```js
const getPost = (postID, posts) => {
  for (let p = 0, pl = posts.length; p < pl; p++) {
    const post = posts[p];

    if (post.postID === postID) {
      return post;
    }
  }
};
```

Theo mình thấy, đây cũng là một cách làm hay và dễ hiểu bởi cách suy nghĩ trực tiếp vào bài toán. Tuy nhiên, cách làm này có một vấn đề là: nếu mảng các bài viết không phải 4 phần tử mà là hàng nghìn, hàng triệu phần tử thì việc dùng vòng lặp for để duyệt mảng với mỗi lần truy vấn thật sự rất tốn thời gian - độ phức tạp thuật toán là O(N).

Cách giải quyết cho vấn đề trên là mình sẽ xây dựng một [object](/javascript-object-last-but-not-least) để map mỗi **postID** với giá trị tương ứng của bài viết. Và khi đã có một object như vậy thì việc tìm kiếm sẽ vô cùng đơn giản - độ phức tạp thuật toán là O(1).

```js
// Object để map mỗi postID với mỗi post tương ứng
const dictionary = {
  id1: { postID: "id1", title: "title1" },
  id2: { postID: "id2", title: "title2" },
  id3: { postID: "id3", title: "title3" },
  id4: { postID: "id4", title: "title4" },
};

const getPost = (postID, dictionary) => {
  return dictionary[postID];
};

// Thực hiện truy vấn
getPost("id1", dictionary).title; // => title1
getPost("id2", dictionary).title; // => title2
getPost("id3", dictionary).title; // => title3
getPost("id4", dictionary).title; // => title4
```

Vấn đề bây giờ chỉ là làm sao mình xây dựng được object **dictionary** như trên? Dĩ nhiên, mình có thể sử dụng vòng lặp for như sau:

```js
const dictionary = {};

for (let p = 0, pl = posts.length; p < pl; p++) {
  const post = posts[p];
  const postID = post.postID;
  dictionary[postID] = post;
}
```

Còn khi ứng dụng Reduce vào đây thì kết quả sẽ ngắn gọn hơn và **functional** hơn như sau:

```js
const dictionary = posts.reduce((acc, cur) => {
  const postID = cur.postID;
  return { ...acc, [postID]: cur };
}, {});
```

Trong đó, **initialValue** là một object rỗng **{}**. Và khi thực thi hàm callback với mỗi phần tử của mảng posts thì:

- Với lượt đầu tiên: **acc** là **{}** và **cur** ứng với post đầu tiên nên:

```js
acc = {};
cur = { postID: "id1", title: "title1" };
postID = cur.postID = "id1";

// kết quả
acc = {...acc, [postID]: cur } = {
 'id1': { postID: 'id1', title: 'title1' }
}
```

- Với lần thứ 2:

```js
acc = {
 'id1': { postID: 'id1', title: 'title1' }
};

cur = { postID: "id2", title: "title2" };
postID = cur.postID = "id2";

// kết quả
acc = {...acc, [postID]: cur } = {
 'id1': { postID: 'id1', title: 'title1' },
 'id2': { postID: 'id2', title: 'title2' }
}
```

Cứ như vậy cho đến hết thì mình sẽ thu được kết quả như mong muốn.

## Lời kết

Trên đây là một số ứng dụng của Reduce trong JavaScript, cụ thể là:

- Chuyển mảng 2 chiều thành mảng một chiều
- Chuyển array thành object theo giá trị của một thuộc tính

Hy vọng qua bài viết này, bạn hiểu hơn về Reduce JS và ứng dụng nó nhiều hơn trong các project của mình - giúp code trở nên rõ ràng, dễ hiểu hơn.

Ngoài 2 ứng dụng mình đã kể ra ở trên thì bạn còn biết cái nào khác nữa không? Chia sẻ trong phần bình luận phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!
