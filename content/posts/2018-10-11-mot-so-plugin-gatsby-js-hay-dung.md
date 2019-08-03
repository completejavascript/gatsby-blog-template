---
date: "2018-10-11T11:53:05Z"
template: "post"
cover: "../images/"
keywords: ""
slug: mot-so-plugin-gatsby-js-hay-dung
title: "Một số plugin Gatsby.js hay dùng"
categories:
  - Thư viện và Framework JavaScript
tags:
  - Command Line
  - Gatsby.js
  - Plugin
---

Như mình đã nói trong bài viết về [Tạo trang blog với Gatsby.js](https://completejavascript.com/tao-trang-blog-voi-gatsby-js/), framework này hỗ trợ lập trình viên rất nhiều plugin hay. Trong đó, một số plugin là bắt buộc phải có, số còn lại sẽ hỗ trợ bạn trong một số nhiệm vụ như: hiển thị code, nhúng video, SEO,... Mà theo như thống kê tại trang chủ thì [số lượng plugin hiện tại](https://www.gatsbyjs.org/plugins/?=) đã hơn 450 rồi. Tuy nhiên, trong đó chỉ có một số plugin Gatsby.js là hay sử dụng. Vậy chúng là những plugin nào, tác dụng của mỗi plugin là gì? Mời bạn theo dõi bài viết để biết thêm chi tiết nhé!

## Tạo File node từ file hệ thống với gatsby-source-filesystem

Plugin này giúp bạn quét tất cả những file trong project và biến chúng thành File node. Những File node này, sau đó sẽ được sử dụng bởi các plugin khác. Ví dụ như plugin _gatsby-transformer-remark_ sẽ biến File node được tạo từ file Markdown thành _MarkdownRemark_ node. Mà thông qua đó bạn có thể lấy được dữ liệu trong file Markdown bao gồm _frontmatter_ (chứa title, date, chuyên mục, thẻ,...) và nội dung bài viết.

- Mức độ: cần thiết
- Cài đặt: `npm install --save gatsby-source-filesystem`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-source-filesystem/?=gatsby-source-filesystem#how-to-use).

## Parse file Markdown sử dụng gatsby-transformer-remark

Như mình đã nói ở trên, plugin này giúp bạn parse file Markdown (sử dụng Remark) thành _MarkdownRemark_ node. Qua đó, bạn có thể lấy được data từ file Markdown.

- Mức độ: cần thiết
- Cài đặt: `npm install --save gatsby-transformer-remark`
- Cách sử dụng cơ bản: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-transformer-remark/?=gatsby-transformer-remark#how-to-use).

## Xử lý ảnh trong file Markdown với gatsby-remark-images

Nếu như nội dung bài viết trong file Markdown sử dụng hình ảnh thì bạn cần phải sử dụng plugin này để có thể xử lý chúng trong sản phẩm thực tế.

Quá trình xử lý ảnh sẽ làm cho hình ảnh trở nên responsive bằng cách:

- Thêm container để giữ kích thước hình ảnh, tránh gây vỡ giao diện khi load ảnh.
- Tạo ra nhiều phiên bản của hình ảnh với kích thước khác nhau, sau đó thiết lập giá trị cho _srcset_ và _sizes_ cho thẻ _img_. Qua đó, tuỳ thuộc vào kích thước màn hình mà hình ảnh tương ứng sẽ được tải.
- Sử dụng kĩ thuật "blur up" được sử dụng bởi Facebook và Medium. Phương pháp này sử dụng hình ảnh với độ rộng 20px làm _placeholder_ cho đến khi hình ảnh thực tế được tải về.

Plugin này có những đặc điểm:

- Mức độ: tuỳ chọn (nếu sử dụng hình ảnh trong Markdown)
- Phụ thuộc vào các plugin: _gatsby-plugin-sharp_, _gatsby-transformer-remark_
- Cài đặt: `npm install --save gatsby-remark-images gatsby-plugin-sharp`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-remark-images/?=gatsby-remark-images#how-to-use).

## Nhúng video vào file Markdown với gatsby-remark-embed-video

Để có thể nhúng video từ _Youtube_, _Vimeo_, _Twitch_, _VideoPress_ một cách dễ dàng vào bài viết từ file Markdown, bạn nên sử dụng plugin này.

- Mức độ: tuỳ chọn
- Phụ thuộc vào plugin: _gatsby-transformer-remark_
- Cài đặt: `npm install --save gatsby-remark-embed-video`
- Cách sử dụng cơ bản: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-remark-embed-video/?=gatsby-remark-embed-video).

## Sử dụng iframe trong Markdown với gatsby-remark-responsive-iframe

Plugin này sẽ wrap iframe bên trong file Markdown, đảm bảo cho iframe giữ nguyên tỉ lệ và độ rộng bằng 100% container.

- Mức độ: tuỳ chọn
- Phụ thuộc vào plugin: _gatsby-transformer-remark_
- Cài đặt: `npm install --save gatsby-remark-responsive-iframe`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-remark-responsive-iframe/?=gatsby-remark-responsive-iframe#how-to-use).

## Hiển thị code trong Markdown với gatsby-remark-prismjs

Đối với những trang web hay phải chia sẻ code thì plugin này là không thể thiếu để hiển thị code một cách đẹp mắt. Để làm được việc này, _gatsby-remark-prismjs_ sử dụng [PrismJS](https://prismjs.com/).

- Mức độ: tuỳ chọn
- Phụ thuộc vào plugin: _gatsby-transformer-remark_
- Cài đặt: `npm install --save gatsby-transformer-remark gatsby-remark-prismjs prismjs`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-remark-prismjs/?=gatsby-remark-prismjs#how-to-use).

## Hiển thị code trên Gist với gatsby-remark-embed-gist

Nếu bạn cần hiển thị code được lưu trên [Gist](https://gist.github.com/discover) thì đây đúng là plugin mà bạn cần.

- Mức độ: tuỳ chọn
- Phụ thuộc vào plugin: _gatsby-transformer-remark_
- Cài đặt: `npm install --save gatsby-remark-embed-gist`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-remark-embed-gist/?=gatsby-remark-embed-gist#getting-started)

## Thêm Google Analytics vào trang web với gatsby-plugin-google-analytics

Nếu bạn đã từng làm web thì có thể sẽ không còn xa lạ gì với Google Analytics. Đây là một dịch vụ của Google giúp bạn quản lý, theo dõi và phân tích mọi hoạt động trên trang web.

Dĩ nhiên, khi đăng ký Google Analytics thì bạn sẽ nhận được một đoạn _script_ để thêm vào trang web. Đối với trang web tĩnh thì việc này khá đơn giản, bạn chỉ cần copy-paste đoạn script đó vào bên trong thẻ _head_ là được. Còn đối với trang Gatsby, việc sử dụng plugin này là đơn giản hơn cả.

- Mức độ: tuỳ chọn
- Cài đặt: `npm install --save gatsby-plugin-google-analytics`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-plugin-google-analytics/?=gatsby-plugin-google-analytics#how-to-use).

## Tạo sitemap cho trang web với gatsby-plugin-sitemap

Để trang web của bạn được index nhanh hơn bởi các search engine (ví dụ Google Search) thì bạn cần phải gửi sitemap cho các search engine xử lý.

Sitemap là một file có cấu trúc mà bạn hoàn toàn có thể tạo thủ công và cập nhật mỗi khi có một bài viết mới được tạo ra. Tuy nhiên, nếu sử dụng plugin này thì mọi tiến trình sẽ được thực hiện tự động.

- Mức độ: tuỳ chọn
- Cài đặt: `npm install --save gatsby-plugin-sitemap`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-plugin-sitemap/?=gatsby-plugin-sitemap#how-to-use).

## Tạo file robots.txt với gatsby-plugin-robots-txt

Mặc định, khi search engine quét trang web của bạn để index thì nó sẽ quét hết tất cả các trang. Tuy nhiên, có một số file chứa thông tin nhạy cảm mà bạn không muốn hiển thị lên kết quả tìm kiếm thì sao? Lúc này, bạn cần phải định nghĩa trong file robots.txt xem trang nào được phép và trang nào thì không.

Vì vậy, plugin này sẽ giúp bạn tạo file robots.txt cho trang Gatsby.

- Mức độ: tuỳ chọn
- Cài đặt: `npm install --save gatsby-plugin-robots-txt`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-plugin-robots-txt/?=gatsby-plugin-robots-txt#how-to-use).

## Thêm metadata vào trang web với gatsby-plugin-react-helmet

Đối với mỗi trang web, metadata là thứ đóng vai trò quan trọng cho việc SEO, bao gồm: tiêu đề, mô tả, đường dẫn hình ảnh, từ khoá,... Những thông tin này tuy không hiển thị trực tiếp cho người xem nhưng lại cung cấp thông tin quan trọng cho các Search Engine để hiển thị bài viết trong kết quả tìm kiếm.

Plugin _gatsby-plugin-react-helmet_ sẽ giúp bạn dễ dàng thêm những thông tin cần thiết vào thẻ _head_ của mỗi trang.

- Mức độ: tuỳ chọn
- Cài đặt: `npm install --save gatsby-plugin-react-helmet react-helmet`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-plugin-react-helmet/?=gatsby-plugin-react-helmet#how-to-use).

## Không reload trang khi di chuyển giữa các trang nội bộ với gatsby-plugin-catch-links

Như trong bài viết trước, mình cũng đã trình bày về tác dụng của việc sử dụng _Link_ component thay vì thẻ _a_. Việc sử dụng component này giúp bạn di chuyển giữa các trang thuộc trang web mà không cần phải reload lại trình duyệt. Qua đó, người dùng sẽ thấy trang web hoạt động nhanh hơn.

Tuy nhiên, bạn sẽ không thể sử dụng _Link_ component trong file Markdown được. Do đó, plugin này sẽ làm nhiệm vụ tự động tìm kiếm những link nội bộ trong file Markdown và giúp chúng hoạt động tương tự như khi bạn sử dụng _Link_ component vậy.

- Mức độ: tuỳ chọn
- Cài đặt: `npm install --save gatsby-plugin-catch-links`
- Cách sử dụng: xem tại [đây](https://www.gatsbyjs.org/packages/gatsby-plugin-catch-links/?=gatsby-plugin-catch-links#how-to-use)

## Lời kết

Trên đây là một số plugin Gatsby.js hay dùng. Với những plugin này, bạn có thể tạo nên một blog tương đối hoàn chỉnh như mình đã làm với: <del>[Lam Pham Blog](https://phamvanlam.com)</del> và [Ôn luyện thuật toán](https://thuattoan.phamvanlam.com). Nếu có plugin nào chưa hiểu thì bạn có thể hỏi mình bằng cách để lại bình luận phía dưới. Mình sẽ cố gắng giải đáp.

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!

---

★ Theo dõi [Lam Pham](https://completejavascript.com/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

**☛ Facebook Fanpage:** [Complete JavaScript](https://www.facebook.com/completejavascript/)  
**☛ Facebook Group:** [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
**☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
