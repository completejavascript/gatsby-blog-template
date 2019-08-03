---
date: "2018-07-28T02:49:59Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: lam-tuong-tai-hai-ve-react
title: "Lầm tưởng tai hại về React"
categories:
  - Thư viện và Framework JavaScript
tags:
  - React
---

Xin chào bạn đến với bài viết **Lầm tưởng tai hại về React. **Nếu bạn theo dõi blog này từ lâu thì sẽ thấy rằng mình chủ yếu viết về [JavaScript thuần](/category/javascript/javascript-co-ban/). Ngoài ra, thư viện JavaScript mình dùng chủ yếu cũng chỉ là [jQuery](/tag/jquery/). Tuy nhiên, sau một thời gian suy nghĩ, mình quyết định sẽ học sâu một [framework hoặc thư viện JavaScript](/top-5-framework-javascript-moi-nhat-cho-phat-trien-web-va-app/) (về front-end) để khỏi bị lạc hậu so với thế giới.

## Đôi điều suy nghĩ trước khi vào nội dung chính

Tại thời điểm của bài viết, có 2 ông lớn là Angular và React. Về Angular thì mình cũng đã có cơ hội tìm hiểu trước đây rồi. Nên bây giờ mình dành thời gian nghiên cứu về React. Mình sẽ tìm hiểu về React một thời gian, sau đó so sánh nó với Angular, để xem ưu điểm của từng cái. Và quan trọng là cái nào phù hợp với mình hơn để gắn bó lâu dài.

Nói về React, mình thấy trên mạng đã có rất nhiều hướng dẫn về nó rồi, nên mình sẽ không mất công làm lại những thứ đó nữa. Mình sẽ chỉ chia sẻ lại những kinh nghiệm mà mình chắt lọc được mà thôi.

Một số tài liệu về React mà bạn có thể tham khảo:

- Tài liệu từ trang chủ của React - [Getting Started](https://reactjs.org/docs/getting-started.html)
- Tổng hợp những bài viết về React của Codeaholicguy [Tổng hợp những bài viết về ReactJS](https://codeaholicguy.com/category/chuyen-coding/javascript/reactjs/)
- ...

Bản thân mình thì thích mấy cái **OFFICAL** hơn nên sẽ ráng đọc tài liệu tiếng Anh trên trang chủ của React. Còn bạn thấy cái nào phù hợp thì cứ đọc theo, chỗ nào chưa hiểu có thể đặt câu hỏi cho mình. Mình không hứa sẽ trả lời ngay cho bạn, nhưng mình sẽ cố gắng cùng tìm hiểu với bạn để có thể giải quyết được vấn đề.

Quay lại nội dung chính của bài viết, mình sẽ nói về một lầm tưởng tai hại về React mà mình đã mắc phải trước khi bắt đầu tìm hiểu về thư viện JavaScript này. Và mình tin rằng có nhiều bạn cũng có suy nghĩ giống mình. Đó là: "Trước khi học React là phải biết về Nodejs và muốn deploy ứng dụng sử dụng React thì phải kiếm server hỗ trợ Nodejs".

## Nguyên nhân dẫn đến lầm tưởng tai hại về React

Chả là từ trước đến giờ mình vẫn hay lên [Tutorialspoint](https://www.tutorialspoint.com) để học về các ngôn ngữ lập trình, công nghệ mới. Và React cũng không ngoại lệ.

Bài viết về [ReactJS - Home](https://www.tutorialspoint.com/reactjs/index.htm), [ReactJS - Overview](https://www.tutorialspoint.com/reactjs/reactjs_overview.htm) thì không nói làm gì. Đến [ReactJS - Environment Setup](https://www.tutorialspoint.com/reactjs/reactjs_environment_setup.htm) thì mình phải cài NodeJS, sau đó là một loạt những thứ sau:

```
npm install -g babel
    npm install -g babel-cli
    npm install webpack --save
    npm install webpack-dev-server --save
    npm install react --save
    npm install react-dom --save
    npm install babel-core
    npm install babel-loader
    npm install babel-preset-react
    npm install babel-preset-es2015
```

Mình suy nghĩ trong đầu: _Mình chỉ cần React thôi mà, sao phải cài một đống thứ như thế này? Vai trò của từng cái là gì?_

Không hề có một lời giải thích nào. Và đó là lí do chính dẫn đến lầm tưởng tai hại về React. Vì vậy, mình đã từ bỏ để quay về trang chủ của React và học theo nó.

## Giác ngộ lần 1

Sau khi đọc qua một vài bài viết trên trang chủ React, mình phát hiện ra rằng: mình đâu cần thiết phải cài đặt NodeJS, đâu cần những thứ loằng ngoằng kia mà vẫn có thể code được React mà.

Đây là [ví dụ cơ bản nhất](https://reactjs.org/docs/add-react-to-a-website.html#add-react-in-one-minute) trên trang chủ, mình clone lại và đưa lên CodePen.io:

[codepen_embed height="265" theme_id="0" slug_hash="pZWNqK" default_tab="html,result" user="completejavascript"]See the Pen [Add React in One Minute - Like Button](https://codepen.io/completejavascript/pen/pZWNqK/) by Lam Pham ([@completejavascript](https://codepen.io/completejavascript)) on [CodePen](https://codepen.io).[/codepen_embed]

Bạn thấy đấy, mình chỉ cần thêm 2 file .js là có thể lập trình được React rồi. Đó là:

- [react.development.js](https://unpkg.com/react@16/umd/react.development.js)
- [react-dom.development.js](https://unpkg.com/react-dom@16/umd/react-dom.development.js)

Đối chiếu lại với phần cài đặt phía trên thì chúng tương đương với:

```
npm install react --save
    npm install react-dom --save
```

Vậy mấy cái _webpack_ với _babel_ để làm gì?

## Giác ngộ lần 2

Ví dụ cơ bản tiếp theo [Optional: Try React with JSX](https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx).

[Xem Demo trên Codepen](https://codepen.io/completejavascript/pen/MBEJwL)

À thì ra, React hỗ trợ sử dụng cú pháp **JSX** - JavaScript XML. JSX không phải string, cũng không phải HTML mà là XML-like. Nghĩa là nó gần giống với cú pháp của XML.

Bạn có thể xem thêm về JSX tại các bài viết sau:

- [Introducing JSX](https://reactjs.org/docs/introducing-jsx.html)
- [JSX In Depth](https://reactjs.org/docs/jsx-in-depth.html)

Nghĩa là React hỗ trợ JSX. Mà nếu muốn trình duyệt hiểu được thì mình phải convert cái JSX đấy sang HTML. Vậy mình cần phải có 1 thằng chịu trách nhiệm làm **preprocessor** để convert JSX sang HTML.

Đó chính là [babel](https://unpkg.com/babel-standalone@6.15.0/babel.min.js).

Đối chiếu lại với phần cài đặt phía trên xem nó tương đương với thằng nào:

```
npm install -g babel
    npm install -g babel-cli
    npm install babel-core
    npm install babel-loader
    npm install babel-preset-react
    npm install babel-preset-es2015
```

Mình đoán nó tương đương với _npm install -g babel_. Còn những thằng còn lại có nhiệm vụ như thế nào thì mình vẫn chưa rõ.

Bạn có thể giải thích cho mình không?

Nhưng dù sao thì mình cũng có thể hiểu rằng: _babel_ giữ vai trò là JSX preprocessor. Còn _webpack_, có lẽ nó là thằng quản lý các _node_modules_ trong NodeJS. Mình sẽ tìm hiểu và chia sẻ với các bạn trong các bài viết tiếp theo.

## Ứng dụng React đầu tiên của mình

Mời các bạn xem qua ứng dụng React đầu tiên của mình: Todo List.

[Xem Demo trên Codepen](https://codepen.io/completejavascript/pen/XBeMBe)

Ứng dụng khá đơn giản và chưa hoàn thiện. Nhưng không sao:

<blockquote>A journey of a thousand miles begins with a single step.
> 
> </blockquote>

## Lời kết

Như vậy là mình đã giác ngộ được cái lầm tưởng tại hại về React là: "trước khi học React phải biết về Nodejs và muốn deploy ứng dụng sử dụng React thì phải kiếm server hỗ trợ Nodejs".

Thực tế, mình chỉ cần 3 file .js là đã có thể lập trình React với JSX được rồi.

- [react.development.js](https://unpkg.com/react@16/umd/react.development.js)
- [react-dom.development.js](https://unpkg.com/react-dom@16/umd/react-dom.development.js)
- [babel](https://unpkg.com/babel-standalone@6.15.0/babel.min.js)

Và mình có thể deploy nó trên Codepen.io, Github Pages,... mà không cần phải sử dụng đến server hỗ trợ NodeJS.

Nếu bạn có phần nào chưa rõ hoặc có gì muốn góp ý với mình thì vui lòng để lại bình luận xuống phía dưới nhé!

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/deploy-ung-dung-react-len-github-pages/), thân ái!

---

★ Theo dõi [Lam Pham](/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
