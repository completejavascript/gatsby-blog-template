---
date: "2019-02-18T23:00:10Z"
template: "post"
cover: "../images/"
keywords: ""
slug: destructuring-assignment-trong-javascript
title: "Destructuring Assignment trong JavaScript"
categories:
  - Javascript cơ bản
tags:
  - Destructuring Assignment
  - ES6
---

Destructuring Assignment trong JavaScript là một cú pháp đặc biệt cho phép bạn **lấy ra dữ liệu** từ [Object](https://completejavascript.com/javascript-object-last-but-not-least/) hoặc [Array](https://completejavascript.com/javascript-array-co-ban/) và gán chúng vào các biến thông thường. Tuy nhiên, việc "lấy ra dữ liệu" này sẽ chỉ copy mà không làm thay đổi cấu trúc của Object hoặc Array. Dưới đây, mình sẽ tìm hiểu về cách sử dụng và ứng dụng của Destructuring Assignment trong JavaScript với hai kiểu dữ liệu cơ bản là Array và Object.

## Destructuring Assignment với Array

### Cách sử dụng cơ bản

Ví dụ:

    <code>let [firstName, lastName] = ["David", "Walsh"];
    /*
    * => firstName = David
    * => lastName = Walsh
    */</code>

Ví dụ trên thực hiện khai báo và gán luôn giá trị cho các biến _firstName_ và _lastName_. Ngoài ra, bạn có thể tách biệt việc khai báo và gán giá trị như sau:

    <code>let firstName, lastName;

    [firstName, lastName] = ["David", "Walsh"];
    /*
    * => firstName = David
    * => lastName = Walsh
    */</code>

Ở đây, JavaScript sẽ thực hiện việc gán giá trị ở **vế phải** cho biến số ở **vế trái** theo đúng thứ tự chỉ số xuất hiện trong mảng.

![Array destructuring assignment](https://completejavascript.com/wp-content/uploads/2019/02/array-destructuring-assignment-completejavascript.com_.png)

Khi đó, đoạn code trên sẽ tương đương với:

    <code>let arr = ["David", "Walsh"];
    let firstName, lastName;

    firstName = arr[0];
    lastName = arr[1];
    </code>

**Chú ý**: Trong trường hợp, số lượng phần tử vế trái nhiều hơn vế phải thì thành phần thừa ra sẽ có giá trị là **undefined**.

    <code>let [firstName, lastName] = ["David"];
    /*
    * => firstName = David
    * => lastName = undefined
    */</code>

Để tránh trường hợp này, bạn có thể khai báo giá trị **default** cho biến như dưới đây.

### Khai báo giá trị default

Ví dụ:

    <code>let [firstName, lastName = "Anonymous"] = ["David"];
    /*
    * => firstName = David
    * => lastName = Anonymous
    */</code>

### Bỏ qua một số phần tử trong mảng

Trong mảng có thể chứa nhiều phần tử, mình chỉ muốn lấy ra một vài giá trị trong đó thì có thể làm như sau:

    <code>let [title, , , color] = ["window", 300, 400, "#000"];
    /*
    * => title = "window"
    * => color = "#000"
    */</code>

Lúc này, phần tử ứng chỉ số 1 (_300_) và 2 (_400_) bị bỏ qua.

### Gán các giá trị còn lại của mảng cho một biến khác

Ví dụ:

    <code>let [title, ...others] = ["window", 300, 400, "#000"];
    /*
    * => title = "window"
    * => others = [300, 400, "#000"]
    */</code>

### Một số ứng dụng khác

#### Hoán đổi giá trị của biến

Trước khi có Destructuring Assignment, bạn có thể hoán đổi giá trị của hai biến bằng một số cách như sau.

**Sử dụng biến trung gian:**

    <code>let a = 1, b = 2;
    let c = a;

    a = b;
    b = c;
    /*
    * => a = 2
    * => b = 1
    */</code>

**Hoặc sử dụng cách này** (mình chưa biết gọi tên thế nào cho đúng):

    <code>let a = 1, b = 2;
    a = a + b;

    b = a - b;
    a = a - b;
    /*
    * => a = 2
    * => b = 1
    */</code>

Khi **áp dụng Destructuring Assignment**, mọi việc trở nên vô cùng đơn giản:

    <code>let a = 1, b = 2;

    [a, b] = [b, a];
    /*
    * => a = 2
    * => b = 1
    */</code>

#### Sao chép mảng

Trong JavaScript, bạn không thể sử dụng toán tử "=" để sao chép mảng được.

Ví dụ:

    <code>const a = [1, 2];
    const b = a;

    console.log(b);       // => [1, 2]
    console.log(b === a); // => true
    </code>

Nếu mình muốn **b** vẫn có giá trị như trên nhưng `b === a` có giá trị **false**, thì mình phải làm như sau:

    <code>const a = [1, 2];
    const b = [...a];

    console.log(b);       // => [1, 2]
    console.log(b === a); // => false
    </code>

## Destructuring Assignment với Object

### Cách sử dụng cơ bản

Ví dụ:

    <code>let { firstName, lastName } = { firstName: "David", lastName: "Walsh" };
    /*
    * => firstName = David
    * => lastName = Walsh
    */</code>

Ví dụ trên thực hiện khai báo và gán luôn giá trị cho các biến _firstName_ và _lastName_. Ngoài ra, bạn có thể tách biệt việc khai báo và gán như sau:

    <code>let firstName, lastName;
    ({ firstName, lastName } = { firstName: "David", lastName: "Walsh" });
    /*
    * => firstName = David
    * => lastName = Walsh
    */</code>

Có thể hiểu đơn giản là: JavaScript sẽ thực hiện việc gán giá trị ở **vế phải** cho biến số ở **vế trái** tương ứng với giá trị của **key** trong Object mà không phân biệt thứ tự.

![Object destructuring assignment](https://completejavascript.com/wp-content/uploads/2019/02/object-destructuring-assignment-completejavascript.com_.png)

Giả sử mình đổi thứ tự của _firstName_ và _lastName_ như sau:

    <code>let firstName, lastName;
    ({ lastName, firstName } = { firstName: "David", lastName: "Walsh" });
    /*
    * => firstName = David
    * => lastName = Walsh
    */</code>

Đọc đến đây có thể bạn sẽ thắc mắc: _**tại sao đoạn code thực hiện Destructuring Assignment bên trên phải đặt trong cặp dấu ngoặc đơn**_. Vì nếu thiếu nó, bạn sẽ bị lỗi.

    <code>let firstName, lastName;
    { lastName, firstName } = { firstName: "David", lastName: "Walsh" };
    // => Uncaught SyntaxError: Unexpected token =
    </code>

Bởi lúc này, JavaScript sẽ hiểu cặp dấu ngoặc kép đầu tiên là một **block**, chứ không phải đang thực hiện Destructuring Assignment.

Ngoài ra, đoạn code phía trên sẽ tương đương với cách làm thông thường như sau:

    <code>let obj = { firstName: "David", lastName: "Walsh" };

    let firstName = obj.firstName;
    let lastName = obj.lastName;
    </code>

**Chú ý**: Trong trường hợp, object thiếu thành phần mà bạn muốn lấy ra giá trị thì dĩ nhiên giá trị của nó sẽ là **undefined**.

    <code>let { firstName, lastName } = { firstName: "David" };
    /*
    * => firstName = David
    * => lastName = undefined
    */</code>

Để giải quyết trường hợp này, bạn có thể khai báo giá trị **default** như dưới đây.

### Khai báo giá trị default

Ví dụ:

    <code>let { firstName, lastName = "Anonymous"} = { firstName: "David" };
    /*
    * => firstName = David
    * => lastName = Anonymous
    */</code>

### Gán tên mới cho biến

Nhiều khi thành phần bạn muốn thực hiện Destructuring Assignment ở Object quá dài hoặc tên của nó trùng với một biến khác, lúc này bạn có thể đặt tên mới cho biến khi destructure như sau:

    <code>let { firstName: fn, lastName: ln } = { firstName: "David", lastName: "Walsh" };
    /*
    * => fn = David
    * => ln = Walsh
    */</code>

Đoạn code trên có thể hiểu: bạn lấy ra giá trị của _firstName_ rồi gán giá trị đó vào biến _fn_ và giá trị của _lastName_ gán cho _ln_. Lúc này, bạn chỉ có thể sử dụng 2 biến _fn_ và _ln_ vì chúng đã được định nghĩa. Ngược lại, 2 biến _firstName_ và _lastName_ không được định nghĩa nên có giá trị là **undefined**.

Ngoài ra, để set giá trị **default** cho biến trong trường hợp này, bạn có thể thực hiện theo cách:

    <code>let { firstName: fn, lastName: ln = "Anonymous" } = { firstName: "David" };
    /*
    * => fn = David
    * => ln = Anonymous
    */</code>

### Gán các giá trị còn lại của Object cho một biến khác

Ví dụ:

    <code>let {a, b, ...rest} = {a: 10, b: 20, c: 30, d: 40}
    /*
    * => a = 10
    * => b = 20
    * => rest = { c: 30, d: 40 }
    */</code>

### Destructuring với Object và Array lồng nhau nhiều tầng

Ví dụ:

    <code>let options = {
      size: {
        width: 100,
        height: 200
      },
      items: ["Cake", "Donut"],
      extra: true    // trường này không destruct
    };

    // cấu trúc để destruct phải giống với cấu trúc của Object
    let {
      size: {
        width,
        height
      },
      items: [item1, item2],
      title = "Menu" // gán giá trị bởi default
    } = options;

    /*
    * Kết quả các biến thu được sau khi destructure assignment:
    * => title = "Menu"
    * => width = 100
    * => height = 200
    * => item1 = "Cake"
    * => item2 = "Donut"
    */</code>

### Cài đặt giá trị default cho các tham số của hàm

#### Cách làm thông thường

Thông thường để cài đặt giá trị **default** cho các tham số của hàm, bạn có thể làm như sau:

    <code>function drawCicle(x = 0, y = 0, radius = 1, color = "black") {
      // code here
    }
    // Usage:
    drawCicle();                 // valid
    drawCicle(1, 2, 3);          // valid
    drawCicle(1, 2, 3, "red");   // valid
    drawCicle("red");            // invalid !!!
    drawCicle("red", 1, 2, 3);   // invalid !!!
    </code>

Tuy nhiên, làm theo cách trên có **một số nhược điểm** là bạn phải **ghi nhớ vị trí** của các tham số. Hơn nữa nếu muốn áp dụng giá trị **default** thì bạn chỉ có thể áp dụng đối với tất cả các tham số bên phải, ngoài cùng. Không có cách nào để áp dụng giá trị default cho 1, 2 tham số ở giữa.

Giả sử bạn muốn áp dụng giá trị default cho _y_ và _radius_ bằng cách gọi hàm:

    <code>drawCicle(1, "red");
    </code>

Cách gọi hàm trên không sai về cú pháp nhưng sai về mặt ý nghĩa vì JavaScript sẽ hiểu **x = 1, y = "red", radius = 1 (default), color = "black"(default)**.

Để tránh việc phải ghi nhớ thứ tự các biến, bạn có thể gộp chúng vào một Object và chỉ cần truyền 1 tham số vào [function](https://completejavascript.com/tim-hieu-function-javascript/) như dưới đây.

#### Gộp các tham số vào thành một Object

Ví dụ:

    <code>function drawCicle(options) {
      let x = options.x || 0;
      let y = options.y || 0;
      let radius = options.radius || 1;
      let color = options.color || "black";
      // code here
    }
    // Usage:
    drawCicle({ });                                        // valid
    drawCicle({ x : 1, y: 2, radius: 3 });                 // valid
    drawCicle({ x : 1, y: 2, radius: 3, color: "red" });   // valid
    drawCicle({ color: "red", y: 2, x : 1, radius: 3 });   // valid !!!
    </code>

Rõ ràng, khi các tham số trên được gộp vào một Object _options_ thì việc bạn viết nó vào theo thứ nào cũng không còn quan trọng. Tuy nhiên, cách cài đặt giá trị default như trên vẫn còn khá dài dòng và phức tạp.

Bây giờ mình thử áp dụng Destructuring Assigment vào xem sao nhé!

#### Gộp các tham số vào thành một Object kết hợp Destructuring Assignment

Ví dụ:

    <code>function drawCicle({ x = 0, y = 0, radius = 1, color = "black"}) {
      // code here
    }
    // Usage:
    drawCicle({ });                                        // valid
    drawCicle({ x : 1, y: 2, radius: 3 });                 // valid
    drawCicle({ x : 1, y: 2, radius: 3, color: "red" });   // valid
    drawCicle({ color: "red", y: 2, x : 1, radius: 3 });   // valid !!!
    </code>

Với cách làm trên bạn đã **khắc phục được 2 nhược điểm** mà mình đã đề cập bên trên. Tuy nhiên, cách làm này vẫn chưa thật hoàn thiện.

**Vì sao?**

Trong trường hợp, bạn muốn sử dụng giá trị default cho tất cả các thành phần bên trong Object, bạn vẫn phải truyền vào một Object rỗng (**{}**). Để khắc phục vấn đề này, bạn có thể sửa lại đoạn code trên một chút:

    <code>function drawCicle({ x = 0, y = 0, radius = 1, color = "black"} = {}) {
      // code here
    }

    drawCicle({});      // valid
    drawCircle();       // still valid
    </code>

Bây giờ bạn không cần truyền bất kỳ tham số nào vào hàm trên mà không bị lỗi. Vì lúc này giá trị _options_ sẽ lấy giá trị default của nó là một Object rỗng.

## Lời kết

Trên đây là cách sử dụng cơ bản và một số ứng dụng của Destructuring Assignment trong JavaScript. Nếu có phần nào chưa hiểu hoặc muốn đóng góp, bạn vui lòng để lại trong phần bình luận phía dưới nhé.

Xin chào và hẹn gặp lại, thân ái!

Tham khảo:

- [Destructuring assignment - MDN](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment)

- [Destructuring assignment - JavaScript.info](https://javascript.info/destructuring-assignment)

- [Destructuring and Function Arguments - DavidWalsh](https://davidwalsh.name/destructuring-function-arguments)

- [Aliases with JavaScript Destructuring - DavidWalsh](https://davidwalsh.name/destructuring-alias)

- [Array Destructuring - DavidWalsh](https://davidwalsh.name/array-destructuring)

---

★ Nếu bạn thấy bài viết này hay thì hãy đăng ký nhận bài viết qua Email hoặc theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

**☛ Facebook Fanpage:** [Complete JavaScript](https://www.facebook.com/completejavascript/)
**☛ Facebook Group:** [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
**☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
