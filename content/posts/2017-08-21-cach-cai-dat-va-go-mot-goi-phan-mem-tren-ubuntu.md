---
date: "2017-08-21T14:46:46Z"
template: "post"
directory: "Thủ thuật IT"
cover: "../images/cach-cai-dat-va-go-mot-goi-phan-mem-tren-ubuntu-completejavascript.c.png"
keywords: "phần mềm trên Ubuntu"
description: "Bài viết này sẽ hướng dẫn các bạn cách cài đặt và gỡ một gói phần mềm trên Ubuntu như sử dụng Ubuntu Software Center, apt-get hay dùng MakeFile,..."
slug: cach-cai-dat-va-go-mot-goi-phan-mem-tren-ubuntu
title: "Cách cài đặt và gỡ một gói phần mềm trên Ubuntu"
tags:
  - Command Line
  - Ubuntu
---

Trong bài viết [Các câu lệnh thường dùng đến trong Ubuntu - Linux](/cac-cau-lenh-thuong-dung-tren-ubuntu-linux), mình đã giới thiệu với bạn những câu lệnh cơ bản thường dùng trong Ubuntu để làm việc với file, folder, thông tin hệ thống,... Tiếp tục, bài viết này sẽ hướng dẫn bạn cách cài đặt và gỡ một gói phần mềm trên Ubuntu.

## Dùng Ubuntu Software Center

Đây là cách cài đặt và gỡ phần mềm đơn giản nhất trong Ubuntu, vì bạn sẽ sử dụng thông qua giao diện đồ hoạ. Việc cài đặt này chẳng khác gì việc bạn lên Google Store hay App Store để cài đặt phần mềm cho điện thoại Android hoặc Iphone cả.

Để cài đặt 1 phần mềm, bạn làm theo các bước sau:

- Mở Ubuntu Software Center
- Viết tên phần mềm cần cài đặt
- Chọn phần mềm cần cài đặt và nhấn Install
- Nhập mật khẩu root và đợi nó cài đặt xong

Để gỡ phần mềm vừa cài đặt:

- Trong Ubuntu Software Center, chọn tab **Installed**.
- Danh sách phần mềm đã được cài đặt hiện lên
- Bạn chọn **Remove** để gỡ cài đặt.
- Nhập mật khẩu root và đợi quá trình hoàn thành.

## Sử dụng apt-get trên Terminal

### Cài đặt online

Để cài đặt 1 gói phần mềm trên Ubuntu sử dụng Terminal theo cách **online**, bạn cần có kết nối Internet (dĩ nhiên rồi). Bạn tìm kiếm trên Google tên những gói phần mềm mình cần cài đặt rồi:

- Mở Terminal: Ctrl Alt T
- **sudo apt-get install ten_goi1 ten_goi2 ten_goi3**
- Nhập mật khẩu và đợi cài đặt xong

Để gỡ cài đặt:

- Mở Terminal: Ctr Alt T
- **sudo apt-get remove ten_goi1 ten_goi2 ten_goi3**
- Nhập mật khẩu và chờ đợi

**Bonus:**

Trong quá trình cài đặt và gỡ phần mềm trên Ubuntu, việc sinh ra rác là điều không tránh khỏi. Để bỏ đi những thứ không cần thiết:

- Mở Terminal
- **sudo apt-get autoremove** và nhập mật khẩu
- **sudo apt-get autoclean** (và nhập mật khẩu nếu cần thiết)

### Cài đặt offline

Cài đặt Offline nghĩa là: bạn đã tải về gói phần mềm rồi. Bây giờ ta chỉ việc cài đặt chúng thôi, nên việc này không cần thiết phải có mạng Internet.

Các gói phần mềm thường có đuôi là: .deb, .rpm, .bin và dạng nén tarball (.tar, .tar.gz, .tgz,...)

#### Cài đặt file .deb

Cài đặt loại này cực kì đơn giản, bạn chỉ cần click vào là tự nó sẽ cài đặt - sử dụng Ubuntu Software Center.

#### Cài đặt file .rpm

Mình sẽ chuyển file **.rpm** thành file **.deb** để làm giống như trên:

- Mở Terminal
- Cài đặt gói **alien** với câu lệnh: **sudo apt-get install alien**
- Convert file từ **.rpm** thành **.deb** với câu lệnh: **sudo alien -k filename.rpm**
- Sau bước trên bạn đã có một tệp tin là **filename.deb**, tiếp tục click vào để cài đặt.

#### Cài đặt file .bin

Đầu tiên lưu file **.bin** tới Desktop. Mở Terminal:

- Di chuyển đến thư mục chứa file: **cd Desktop** (đây chỉ là ví dụ, thực tế bạn có thể đặt file ở thư mục khác)
- Thêm quyền cho file: **sudo chmod +x filename.bin**
- Cài đặt: **./filename.bin**
- Sau đó chương trình sẽ cài đặt trong Terminal!

#### Cài đặt phần mềm từ tarball

Một tarball (thường là các file .tar , .tar.gz , .tgz , .tar.bz2 , .tbz2 ) gồm có mã nguồn cho chương trình mà ta phải tự biên dịch, trình biên dịch (compile) như GCC... thì thường có sẵn trong Linux . Các bước cài đặt Tarball về cơ bản như sau:

##### Giải nén tarball

**Cách 1**: click vào file, nhấn chuột phải, chọn **extract here**

**Cách 2**: dùng dòng lệnh:

```bash
$ tar zxvf file.tar.gz
$ tar zxf file.tar.gz
$ tar zxf file.tgz
$ tar jxf file.tar.bz2
$ tar jxf file.tbz2
```

Các tùy chọn chúng ta cung cấp cho tar được mô tả bên dưới:

- -z để lệnh cho tar chạy file này thông qua gzip để giải nén (sử dụng –j cho các file bzip)
- -x để bung các file
- -v cho "verbose", để chúng ta có thể thấy danh sách các file đang bung
- -f để lệnh cho tar rằng chúng ta đang làm việc với một file

##### Configure

- Mở terminal lên, dùng lệnh cd để di chuyển tới nơi đã bung file ở bước trước
- gõ **./configure** : mục đích là để kiểm tra xem hệ thống có đầy đủ các phần mềm để cài đặt chưa, nếu thiếu thì ta phải cài đặt các phần mềm đó trước
- gõ **make**: chờ cho tới khi hoàn thành rồi đến bước tiếp theo
- gõ **sudo make install** : đợi cho tới khi kết thúc là hoàn thành cài đặt.

##### Gỡ phần mềm

- dùng lệnh cd di chuyển tới thư mục chứa file nguồn của phần mềm vừa bung ra.
- gõ **make uninstall**

Trên đây là một số cách để cài đặt và gỡ một gói phần mềm trên Ubuntu. Nếu bạn có thắc mắc hay góp ý gì, vui lòng để lại dưới phần bình luận.

Xin chào và hẹn gặp lại bạn ở [bài viết sau](/huong-dan-tim-hieu-ffmpeg-co-ban), thân ái!

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
