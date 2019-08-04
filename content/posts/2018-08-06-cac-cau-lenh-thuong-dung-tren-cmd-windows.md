---
date: "2018-08-06T14:33:35Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: cac-cau-lenh-thuong-dung-tren-cmd-windows
title: "Các câu lệnh thường dùng trên CMD – Windows"
categories:
  - Thủ thuật máy tính
tags:
  - Command Line
  - Windows
---

Trong bài viết [các câu lệnh thường dùng trên Ubuntu – Linux](/cac-cau-lenh-thuong-dung-tren-ubuntu-linux/), mình đã giới thiệu với bạn những câu lệnh thường hay được sử dụng trên Terminal của Ubuntu. Việc thành thạo những câu lệnh này giúp bạn sử dụng Ubuntu một cách nhanh chóng và hiệu quả. Tuy nhiên, nếu bạn là người dùng Windows thì sao? Yên tâm đi, bạn cũng vẫn có thể sử dụng những câu lệnh tương đương trên CMD của Windows. Bạn sẽ sử dụng Windows theo cách "like a boss" và dễ dàng nhận được "sự ngưỡng mộ" từ những người xung quanh. Vì vậy, bài viết này mình sẽ giúp bạn tổng hợp lại những câu lệnh thường dùng trên CMD - Windows.

Mời bạn theo dõi bài viết!

## Khởi động cửa sổ CMD

Tại thời điểm của bài viết, máy mình vẫn đang cài hệ điều hành Windows 7 nên cách khởi động cửa sổ CMD có thể khác so với máy chạy Windows 10.

_Đối với hệ điều hành Windows 10, bạn có thể tham khảo bài viết [10 Ways to Open the Command Prompt in Windows 10](https://www.howtogeek.com/235101/10-ways-to-open-the-command-prompt-in-windows-10/) để biết cách mở CMD._

Sau đây là một số cách mở CMD trên hệ điều hành Windows 7.

### Mở cửa sổ CMD tại vị trí thư mục mặc định

Khi bạn mở cửa sổ CMD, vị trí mặc định sẽ là: **_C:\Users\user-name>_**.

Ví dụ đối với máy mình là: \_C:\Users\LamPV> \_thì kết quả thu được như sau:

![Khởi động CMD windows 7](/wp-content/uploads/2018/08/khoi-dong-cmd-windows-mac-dinh-completejavascript.com_.png)Cửa sổ CMD mặc định trên Windows 7 sau khi khởi động

Có 2 cách để thực hiện là:

- Cách 1: Bạn click chuột vào biểu tượng **Start** ở góc dưới bên trái màn hình. Sau đó, gõ **cmd** vào khu vực tìm kiếm. Windows sẽ tìm ra chương trình **cmd.exe** cho bạn. Bạn chỉ cần click vào nó là xong.

![Cách mở CMD tại vị trí mặc định - cách 1](/wp-content/uploads/2018/08/khoi-dong-cmd-windows-mac-dinh-cach-1-completejavascript.com_.png)Cách 1 để mở CMD tại vị trí mặc định

- Cách 2: Bạn click chuột vào biểu tượng **Start** ở góc dưới bên trái màn hình. Sau đó, gõ **run** vào khu vực tìm kiếm và nhấn **Enter**. Cửa sổ **run** hiện lên, rồi bạn chỉ việc gõ **cmd** và nhấn **Enter** (hoặc click vào OK) là được.

![Khởi động CMD windows 7 cách 2](/wp-content/uploads/2018/08/khoi-dong-cmd-windows-mac-dinh-cach-2-completejavascript.com_.png)Cách 2 để mở CMD tại vị trí mặc định

### Mở cửa sổ CMD tại vị trí thư mục bất kỳ

Nhiều khi bạn muốn mở CMD tại vị trí thư mục chứa project mà bạn đang làm việc để tiện xử lý và gõ các câu lệnh sau này.

Ví dụ mình muốn mở CMD tại vị trí thư mục có đường dẫn: **_F:\cmd-demo\demo1_**

![Khởi động CMD tại vị trí bất kỳ](/wp-content/uploads/2018/08/khoi-dong-cmd-windows-bat-ky-completejavascript.com_.png)Cửa sổ CMD Windows 7 khi mở ở vị trí F:\cmd-demo\demo1

Cũng có 2 cách để thực hiện là:

- Cách 1: Bạn mở **Windows Explore** đến thư mục muốn mở CMD. Tại đó, bạn đồng thời nhấn **Shift** và click **chuột phải**. Lúc đó, sẽ có một context menu hiện lên, bạn chọn mục **Open command window here**.

![khởi động cmd windows bất kỳ cách 1](/wp-content/uploads/2018/08/khoi-dong-cmd-windows-bat-ky-cach-1-completejavascript.com_.png)Cách 1 để mở cmd windows ở vị trí bất kỳ

- Cách 2: Bạn cũng mở **Windows Explore** đến thư mục muốn mở CMD. Bạn tìm đến thanh địa chỉ và gõ **cmd**, rồi nhấn **Enter**.

![khởi động cmd windows bất kỳ cách 2](/wp-content/uploads/2018/08/khoi-dong-cmd-windows-bat-ky-cach-2-completejavascript.com_.png)Cách 2 để mở cmd windows ở vị trí bất kỳ

### Mở cửa sổ CMD với quyền Admin

Để mở cửa sổ CMD với quyền Admin, đầu tiên bạn làm giống **cách 1** của phần **Mở cửa sổ CMD tại vị trí thư mục gốc**.

Sau đó, thay vì click vào **cmd.exe** thì bạn click **chuột phải** và chọn **Run as administrator, **rồi chọn** OK.**

![Khởi động CMD windows với quyền admin](/wp-content/uploads/2018/08/khoi-dong-cmd-windows-quyen-admin-completejavascript.com_.png)Cách để mở CMD windows với quyền admin

Kết quả là CMD hiện lên với vị trí mặc định là: _**C:\Windows\system32>**_

![Kết quả khởi động CMD windows với quyền admin](/wp-content/uploads/2018/08/khoi-dong-cmd-windows-quyen-admin-ket-qua-completejavascript.com_.png)Cửa sổ CMD windows sau khi mở với quyền admin

Trên đây là một số cách để mở CMD trên Windows 7. Tiếp theo, mình sẽ giới thiệu với bạn các câu lệnh thường dùng trên CMD.

## Các câu lệnh thường dùng trên CMD

### Các câu lệnh về thư mục và tập tin

#### In ra tên đường dẫn hiện tại

Có 2 câu lệnh giúp in ra đường dẫn đến vị trí hiện tại đang đứng:

- Câu lệnh **echo %CD%**
- Hoặc **cd**

#### Xoá màn hình

Để xoá màn hình CMD bạn có thể sử dụng lệnh: **cls**

#### dir (directory)

Hiển thị danh sách các tập tin và thư mục trong thư mục hiện tại bạn đang đứng. Mặc định, lệnh này sẽ không in ra các tập tin và thư mục ẩn.

Để in ra danh sách tất cả các tập tin và thư mục (bao gồm những thành phần không bị ẩn và bị ẩn) bạn chỉ cần thêm tuỳ chọn **/a**. Câu lệnh trên trở thành: **dir /a**.

Ngoài ra bạn có thể sử dụng một số tuỳ chọn khác như:

- Chỉ in ra thành phần bị ẩn: **dir /a:h**
- Chỉ in ra thư mục (cả bị ẩn lẫn không bị ẩn): **dir /a:d**
- Chỉ in ra thư mục bị ẩn: **dir /a:hd**

#### cd (change directory)

Tương tự như trên Ubuntu, câu lệnh này dùng để thay đổi vị trí thư mục hiện tại – di chuyển đến vị trí thư mục khác. Một số cách khác nhau khi sử dụng lệnh **cd** là:

- **cd .** : đứng nguyên ở thư mục hiện tại
- **cd ..** : di chuyển đến thư mục cha của thư mục hiện tại
- **cd /**: di chuyển đến thư mục gốc của ố đĩa hiện tại (ví dụ: C:\ hoặc D:\,...)
- **cd <tên thư mục con>** : di chuyển đến thư mục con bên trong thư mục hiện tại
- **cd <đường dẫn đến thư mục>** : di chuyển đến thư mục với đường dẫn là đường dẫn cho trước.

**Chú ý:**

- Để thay đổi vị trí đến ổ đĩa khác với hiện tại thì bạn cần thêm tuỳ chọn **/D** phía trước đường dẫn muốn tới. Ví dụ: bạn đang ở một vị trí trên ổ C và muốn đến một vị trí khác trên ổ D thì bạn có thể dùng câu lệnh: **cd /D D:\<đường-dẫn-thư-mục-bất-kì>**.
- Ngoài ra, để di chuyển sang root của một ổ đĩa, bạn có thể sử dụng câu lệnh **<Chữ-cái-tên-ổ-đĩa>:**. Ví dụ: **E:**

#### copy

Dùng để sao chép tập tin hay thư mục đến một vị trí bất kỳ.

- **copy <tên file nguồn> <tên file đích>**: tạo file đích là bản copy của file nguồn trong cùng một thư mục (tên file đích phải khác tên file nguồn).
- **copy <tên file nguồn> <tên thư mục>**: dùng để copy một tập tin vào một thư mục
- **copy <tên file nguồn 1> + <tên file nguồn 2> + ... + <tên file nguồn n> <tên thư mục đích>**: copy các file nguồn 1, file nguồn 2,..., file nguồn n vào thư mục đích
- **copy <tên thư mục nguồn> <tên thư mục đích>**: copy toàn bộ file trong thư mục nguồn đến thư mục đích

**Chú ý:**

- Bạn có thể sử dụng _wildcard_ để copy nhiều file có định dạng cho trước. Ví dụ: mình cần copy các file bắt đầu bằng chữ _b_ vào thư mục _folder1_ thì câu lệnh sẽ là: **copy b\* folder1**.

#### move

Dùng để di chuyển tập tin đến một thư mục mới và có thể đổi tên tập tin đó.

- **move <tên file nguồn> <tên thư mục đích \ tên file đích>**: di chuyển file nguồn đến thư mục đích đồng thời đổi tên file nguồn.
- **move <tên file nguồn> <tên thư mục đích>** : di chuyển tập tin đến thư mục đích và không đổi tên.

#### del (delete)

Dùng để xoá một hay nhiều file

- **del <tên file 1> <tên file 2> <tên file 3> ... <tên file n>**: xoá file 1, file 2, file 3,..., file n trong thư mục hiện tại
- **del <tên thư mục đích>**: xoá tất cả các file trong thư mục đích (thư mục đích không bị xoá)
- **del <đường dẫn file 1> <đường dẫn file 2> ... <đường dẫn file n>**: xoá các file tương ứng với các đường dẫn cho trước

#### rd (remove directory)

Dùng để xoá một hay nhiều thư mục, kể cả các file và thư mục con.

- **rd <tên thư mục 1> <tên thư mục 2> ... <tên thư mục n>**: xoá các thư mục rỗng 1, 2, ..., n
- **rd /S <tên thư mục 1> <tên thư mục 2> ... <tên thư mục n>**: xoá các thư mục 1, 2, ..., n, kể cả các file và thư mục con.

#### md (make directory)

Dùng để tạo mới một hay nhiều thư mục.

- **md <tên thư mục 1> <tên thư mục 2> ... <tên thư mục n>**: tạo mới thư mục rỗng 1, 2, ..., n

#### Tạo file mới

Để tạo file mới bằng CMD bạn có thể làm theo một trong hai các cách sau:

- **type nul > <tên file>**
- **echo nul > <tên file>**

Hai câu lệnh trên thực chất là để ghi giá trị _nul_ vào file mới. Nhưng vì file mới này chưa tồn tại nên Windows sẽ tự động tạo file này.

#### help

Dùng để hiển thị hướng dẫn các câu lệnh: **help <tên câu lệnh>**, tương tự như lệnh _man_ trên Ubuntu.

Ví dụ: _help copy_, _help md_,…

### Các câu lệnh về thông tin hệ thống và mạng

#### ipconfig

Hiển thị danh sách các thiết bị mạng trên máy tính. Qua đó, bạn có thể biết được địa chỉ IP hiện tại của máy.

#### hostname

Hiển thị host name của máy.

#### ping

Kiểm tra tình trạng kết nối của mạng.

- **ping <địa chỉ host đích>**: thông thường nhất là ping đến google, khi đó câu lệnh sẽ là: **ping google.com**
- **ping -t <địa chỉ host đích>**: ping cho đến khi mạng bị đứt kết nối thì mới dừng lại
- **ping 127.0.0.1**: kiểm tra xem TCP/IP đã được cài đặt và configure chính xác hay chưa
- **ping <địa chỉ ip của máy tính>**: kiểm tra xem máy tính đã kết nối vào mạng local hay chưa

#### shutdown

Hẹn thời gian tắt hoặc khởi động lại máy.

- **shutdown -s -t [a]**: tắt máy.
- **shutdown -r -t [a]**: khởi động máy.

Trong đó: a là thời gian tắt hoặc mở máy được tính theo đơn vị giây.

## Lời kết

Trên đây là các câu lệnh thường dùng trên CMD của Windows. Ngoài ra, nếu bạn thường sử dụng những câu lệnh nào khác, hoặc có câu lệnh nào chưa hiểu rõ thì có thể hỏi mình ở phần bình luận phía dưới. Mình sẽ cố gắng giải đáp khi có thể.

Cuối cùng, xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!

## Tham khảo

- [An A-Z Index of the Windows CMD command line](https://ss64.com/nt/)
- [Tổng hợp những lệnh Run CMD thông dụng](https://quantrimang.com/nhung-lenh-dos-pho-bien-trong-cmd-118351)

<hr class="border-color-light-grey" />

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
