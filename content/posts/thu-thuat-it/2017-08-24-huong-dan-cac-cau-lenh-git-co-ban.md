---
date: "2017-08-24T00:23:59Z"
update: "2017-08-24T00:23:59Z"
template: "post"
directory: "Thủ thuật IT"
cover: "../../images/thu-thuat-it/huong-dan-cac-cau-lenh-git-co-ban-completejavascript.com_.png"
keywords: "câu lệnh git"
description: "Việc biết cách sử dụng Git là điều vô cùng quan trọng. Bài viết này sẽ hướng dẫn cơ bản về Git cũng như các câu lệnh Git cơ bản."
slug: huong-dan-cac-cau-lenh-git-co-ban
title: "Hướng dẫn các câu lệnh Git cơ bản"
series: "Thủ thuật IT: Thủ thuật lập trình"
tags:
  - Command Line
  - Git
  - Ubuntu
---

Ngày nay, Github đã trở nên vô cùng phổ biến đối với lập trình viên. Bạn có thể tìm thấy rất nhiều tài liệu, project khác nhau trên Github. Do đó, việc biết cách sử dụng Git là điều vô cùng quan trọng. Bài viết này sẽ hướng dẫn cơ bản về Git cũng như các câu lệnh Git cơ bản.

## Git là gì?

Git là một hệ thống quản lý phiên bản phân tán (_Distributed Version Control System_ – **DVCS**). Tức là khi sử dụng Git, bạn phải lấy toàn bộ source code về máy, gọi là **clone**.

Lúc này, trên máy bạn sẽ có hai thành phần chính là: **Local Repository** và **Working Space**.

- Local Repository: chứa toàn bộ thông tin của project giống hệt như trên server.
- Working Space: chứa source code mà bạn đang làm việc (_**check-out**_).

## Cài đặt Git

Git hỗ trợ Windows, Macs và Linux. Đối với Macs, mình chưa dùng bao giờ nên không dám chia sẻ.

- Windows: bạn có thể cài [Git for windows](https://git-scm.com/download) hoặc [Tortoisegit](https://tortoisegit.org/download/) (giao diện đồ hoạ).
- Linux: xem hướng dẫn tại [đây](https://git-scm.com/download/linux).

Nếu bạn không quen sử dụng các câu lệnh thì có thể sử dụng TortoiseGit. Còn cá nhân, mình sử dụng Git trên [Ubuntu](/cac-cau-lenh-thuong-dung-tren-ubuntu-linux).

Sau khi cài đặt Git xong, chúng ta bắt đầu tìm hiểu về Git.

## Luồng cơ bản khi sử dụng Git

Sau đây là luồng cơ bản khi bạn sử dụng Git:

- Clone project từ server về Local Repository
- Check-out 1 nhánh từ Local Repository về Working Space
- Bạn sẽ làm việc (thêm, sửa, xoá tại Working Space)
- Add: xác nhận sự thay đổi của các files (đưa đến vùng Staging Area)
- Commit: cập nhật sự thay đổi lên Local Repository

Về cơ bản đến đây là bạn đã hoàn thành 1 chu trình sử dụng Git. Lúc này, nếu như bạn muốn cập nhật sự thay đổi này lên server thì bạn sẽ dùng lệnh push để đẩy chúng lên server.

## Các câu lệnh Git cơ bản

Trước khi giới thiệu các câu lệnh Git, mình muốn nhấn mạnh với bạn rằng Git là công cụ để quản lý source code. Trong khi đó, Github là server chứa code.

Vì vậy, trước khi bắt đầu bạn hãy đăng ký một tài khoản trên Github. Sau khi đăng ký xong, bạn cần nhớ 3 thông tin chính là: **username**, **email** và **password**.

### Config

Đầu tiên, bạn sẽ cần phải config username và email mà bạn đã đăng ký trên Github. Thực tế, Git hỗ trợ 3 tuỳ chọn là `--global`, `--system`, `--local`. Tuy nhiên, mình thường chọn `--global`.

```bash
$ git config --global user.name <username>
$ git config --global user.email <email>
```

Để kiểm tra lại thông tin mà bạn đã config, sử dụng câu lệnh Git sau:

```bash
$ git config --list
```

### Init

Câu lệnh Git này dùng để tạo mới một project trên máy. Bạn có thể tạo ở bất kì đâu tuỳ thích.

```bash
$ git init
```

Sau khi chạy câu lệnh này xong, một thư mục ẩn **.git** sẽ xuất hiện. Thư mục này chứa thông tin cấu hình của project Git.

### Clone

Câu lệnh Git này dùng để copy 1 project từ Local Respository đến một thư mục khác, hoặc từ server về máy tính của bạn.

Để clone một project từ Local Respository trên máy:

```bash
$ git clone /path/to/repository/
```

Để clone một project trên server, bạn có thể sử dụng https hoặc ssh:

- https:

```bash
$ git clone username@serverAddress:/path/to/project
```

- ssh:

```bash
$ git clone ssh://username@serverAddress/path/to/project
```

### Branch

Khi sử dụng Git, bạn có thể tạo ra nhiều nhánh (branch) khác nhau. Câu lệnh Git này dùng để kiểm tra branch hiện tại:

```bash
$ git branch
```

Mặc định ban đầu bạn sẽ ở nhánh **master** - nhánh chính.

Để tạo mới một branch:

```bash
$ git branch <name_branch>
```

### Checkout

Trước khi muốn thay đổi source code, điều đầu tiên mà bạn cần phải làm là **checkout** một nhánh.

Để checkout một nhánh, bạn dùng câu lệnh Git sau:

```bash
$ git checkout <name_branch>
```

Để tạo mới một nhánh và checkout luôn nhánh đó thì bạn dùng câu lệnh:

```bash
$ git checkout -b <name_branch>
```

Ngoài ra, để quay lại nhánh master:

```bash
$ git checkout master
```

### Add

Sau khi bạn thay đổi source code: thêm mới, sửa, xoá files,... Bạn cần phải cập nhật lên Staging Area.

Để cập nhật hết các files:

```bash
$ git add .
```

Cập nhật các files với đuôi xác định:

```bash
$ git add .<tên đuôi>
```

Cập nhật các files dựa vào tên của chúng:

```bash
$ git add <name_file_1> [<name_file_2> ... <name_file_n>]
```

### Commit

Sau lệnh add, bạn cần sử dụng câu lệnh Commit để đây thông tin thay đổi lên Local Respository:

```bash
$ git commit -am 'nội dung tuỳ thích'
```

### Push

Sau câu lệnh Commit, thông tin mới chỉ được cập nhật lên Local Repository. Nếu muốn cập nhật lên server thì bạn phải sử dụng câu lệnh push:

```bash
$ git push origin <name_branch>
```

Ngoài ra, nếu chưa tồn tại remote trên server thì bạn cần phải add mới một remote trước rồi mới push:

```bash
$ git remote add origin <remote_url>
$ git push origin <name_branch>
```

**Chú ý**: **remote_url** ở đây cũng chính là link đến project trên server, ví dụ: `https://github.com/user/repo.git`

### Fetch

Câu lệnh Git này dùng để lấy source code từ server về Local Repository:

```bash
$ git fetch <name_branch>
```

### Pull

Câu lệnh Git này dùng để lấy source code từ server về Working Space và merge với code hiện tại trên máy bạn nếu có thể. Trường hợp không thể merge tự động được thì bạn phải merge thủ công.

Trong trường hợp bạn làm việc một mình thì hầu như sẽ chẳng có rắc rối gì xảy ra. Nhưng khi làm việc theo nhóm thì chuyện xung đột và giải quyết xung đột là điều không thể tránh khỏi. Phần này mình sẽ giới thiệu với các bạn trong một bài viết khác sau.

Bài viết này dừng lại tại đây, hẹn gặp bạn trong bài viết tiếp theo, thân ái!
