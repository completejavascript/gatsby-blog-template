---
date: "2018-12-24T12:30:53Z"
update: "2018-12-24T12:30:53Z"
template: "post"
directory: "Thủ thuật IT"
cover: "../../images/thu-thuat-it/tong-hop-mot-so-truong-hop-voi-git-completejavascript.com_.png"
keywords: "trường hợp với git"
description: "Đối với lập trình viên, Git là công cụ không thể thiếu. Bài viết này mình sẽ tổng hợp lại một số trường hợp với Git và cách mình giải quyết chúng."
slug: tong-hop-mot-so-truong-hop-voi-git
title: "Tổng hợp một số trường hợp với Git"
series: "Thủ thuật IT: Thủ thuật lập trình"
tags:
  - Command Line
  - Git
---

Trong bài viết [hướng dẫn các câu lệnh Git cơ bản](/huong-dan-cac-cau-lenh-git-co-ban), mình đã giới thiệu với bạn về Git, cũng như những câu lệnh thường dùng với Git. Tuy nhiên, khi làm việc với project thực tế bạn sẽ gặp phải nhiều trường hợp oái oăm hơn rất nhiều. Vì vậy, bài viết này mình sẽ tổng hợp lại một số trường hợp với Git mà mình gặp phải và cách mình giải quyết chúng.

## Đổi tên nhánh ở Local và Remote trong Git

**Đặt vấn đề**:

Khi làm việc với Git, có thể bạn sẽ gặp trường hợp bạn đặt tên sai cho một nhánh ở local và đã push nó lên remote. Đặt tên "sai" ở đây có thể là về mặt chính tả, hay về ý nghĩa (tên không phù hợp với mục đích của branch). Hoặc đơn giản vì nó quá dài nên bạn cần phải sửa tên cho ngắn lại. Như vậy, để đổi tên nhánh ở local và remote trong Git, bạn có thể thực hiện theo các bước sau đây.

**Giải pháp**:

**Bước 1:** Đổi tên nhánh ở Local

Nếu bạn đang ở trong nhánh muốn đổi tên:

```bash
$ git branch -m new-name
```

Nếu bạn đang ở một nhánh khác:

```bash
$ git branch -m old-name new-name
```

**Bước 2**: Xoá nhánh với tên cũ ở remote và push nhánh với tên mới lên remote

```bash
$ git push origin :old-name new-name
```

Đến đây là bạn đã hoàn thành việc đổi tên nhánh ở Local và Remote trong Git.

## Đồng bộ Git Fork với Original Repo

**Đặt vấn đề:**

Thông thường khi gặp một project hay trên Github, bạn thường **fork** nó về Repo của bạn để tuỳ ý phát triển. Tuy nhiên sau một thời gian, Original Repo thay đổi và cập nhật khá nhiều thứ. Vì vậy, bạn muốn đồng bộ Git Fork với Original Repo để cập nhật những tính năng mới nhất. Để thực hiện việc này bạn có thể thực hiện theo các bước sau đây.

**Giải pháp:**

**Bước 1:** Thêm Original Repo vào remote

```bash
$ git remote add upstream https://github.com/[Original Owner Username]/[Original Repository].git
```

**Bước 2:** Lấy về tất cả sự thay đổi từ Original Repo

```bash
$ git fetch upstream
```

**Bước 3:** Checkout nhánh bạn muốn đồng bộ, giả sử là **master**

```bash
$ git checkout master
```

**Bước 4:** Merge sự thay đổi từ upstream/master vào nhánh master ở local

```bash
$ git merge upstream/master
```

**Bước 5:** Push nhánh hiện tại (đã được đồng bộ với Original Repo) lên Remote

```bash
$ git push origin master
```

Đến đây là bạn đã đồng bộ Git Fork với Original Repo ở nhánh master. Để đồng bộ các nhánh khác, bạn chỉ cần thay "master" trong các câu lệnh trên với tên nhánh cần đổi.

## Di chuyển sự thay đổi ở một nhánh sang nhánh khác

**Đặt vấn đề:**

Giả sử bạn đang phát triển một tính năng mới. Bạn code điên đảo. Mọi thứ hoạt động đều trơn tru, tốt đẹp. Rồi bạn quyết định sẽ commit và push chúng lên Remote. Nhưng... bạn chợt nhận ra, mình đang code trong nhánh "master". Mà đang lẽ ra, bạn phải code trong nhánh "dev".

Bây giờ phải làm sao đây?

Bạn sẽ copy-paste phần code thay đổi ra một nơi khác. Sau đó, bạn checkout nhánh "dev" để paste phần code thay đổi vừa rồi vào. Cũng được đấy chứ? Mà làm thủ công như vậy khá mất thời gian. Thay vào đó, bạn có thể sử dụng tính năng "stash" có sẵn của Git, bằng cách làm theo các bước sau đây.

**Giải pháp:**

**Bước 1:** Lưu lại toàn bộ sự thay đổi

```bash
$ git stash
```

**Bước 2:** Di chuyển sang nhánh mà bạn mong muốn, giả sử là nhánh "dev"

```bash
$ git checkout dev
```

**Bước 3:** Cập nhật sự thay đổi vào nhánh "dev"

```bash
$ git stash pop
```

Xong bước này nghĩa là bạn đã thành công trong việc di chuyển sự thay đổi ở một nhánh sang nhánh khác trong Git. Bây giờ, bạn chỉ cần commit rồi push chúng lên Remote thôi hoặc làm gì đó khác mà bạn thích.

## Reset lại Repo ở Local

**Đặt vấn đề:**

Giả sử bạn đang code thử nghiệm một tính năng mới. Sau một loạt các thay đổi, bạn phát hiện ra giải pháp của mình bị sai. Vì vậy, bạn muốn reset lại repo ở Local để đưa nó về trạng thái trước khi bạn thay đổi. Để thực hiện được điều này, bạn có thể thực hiện các bước sau đây.

**Giải pháp:**

**Bước 1:** Lấy toàn bộ code mới nhất trên remote

```bash
$ git fetch --all
```

**Bước 2:** Reset lại Repo ở Local với nhánh mong muốn

```bash
$ git reset --hard origin/master
```

Câu lệnh trên reset lại nhánh "master". Nếu bạn muốn reset lại nhánh khác thì có thể thay "master" bằng tên nhánh mong muốn.

## Thay thế code ở một nhánh bởi code ở nhánh khác trong Git

**Đặt vấn đề:**

Gần đây mình có làm demo một project với Node.js và muốn deploy lên Heroku hoặc Zeit. Tuy nhiên, config để deploy app lên 2 nền tảng này hơi khác nhau một chút. Vì vậy, mình tạo ra 2 nhánh mới là **deploy-heroku** và **deploy-zeit** từ nhánh **master** để test. Đầu tiên, mình test với Heroku và kết quả khá tốt. Sau đó, mình quyết định hơi vội vã nên đã merge nhánh _deploy-heroku_ vào nhánh master mà không test với Zeit nữa.

Nhưng sau đó, mình phát hiện ra một số thứ bất tiện với Heroku, nên bắt đầu test thử với Zeit. Và kết quả là Zeit đã giải quyết được những điểm bất tiện trên. Bây giờ, mình muốn apply nhánh _deploy-zeit_ vào master. Tuy nhiên, ở nhánh master hiện tại đang có config của Heroku rồi mà. Nếu merge bình thường thì phần config của Heroku vẫn còn hoặc là mình phải xử lý xung đột.

Vậy tóm lại, vấn đề đặt ra là: làm sao thay thế hoàn toàn code ở nhánh master bằng code ở nhánh _deploy-zeit_?

**Giải pháp:**

**Bước 1:** Đổi tên nhánh _master_ thành *temp-master* và đổi tên nhánh _deploy-zeit_ thành _master_.

```bash
# Đổi tên nhánh master thành temp-master
$ git branch -m master temp-master

# Đổi tên nhánh deploy-zeit thành master
$ git branch -m deploy-zeit master
```

**Bước 2:** Vì nhánh master hiện tại ở local đang chứa code của nhánh _deploy-zeit_, nên mình sẽ push nhánh master này lên remote.

```bash
# Force push nhánh master lên remote
$ git push origin master -f
```

**Bước 3:** Tiếp theo, mình đổi lại tên nhánh như ban đầu trước khi thực hiện bước 1

```bash
# Đổi tên nhánh master hiện tại thành deploy-zeit
$ git branch -m master deploy-zeit

# Đổi tên nhánh temp-master từ bước 1 thành master
$ git branch -m temp-master master
```

**Bước 4:** Cập nhật local master với remote master

```bash
# Fetch tất cả thông tin ở remote về local repo và không merge
$ git fetch --all

# Thay thế hoàn toàn local master với remote master
$ git reset --hard origin/master

```

Đến đây thì mình đã thực hiện xong việc thay thế code ở một nhánh bởi code của nhánh khác rồi.

## Apply một commit từ nhánh này sang nhánh khác

**Đặt vấn đề:**

Giả sử bạn đang có 2 nhánh là: nhánh A và nhánh B. Tại nhánh B, bạn đã phát triển thêm tính năng hoặc fix một số bug quan trọng. Vì vậy, bạn muốn apply một commit nào đó mà bạn đã thực hiện ở nhánh B vào nhánh A.

Giải pháp cho vấn đề này là: bạn sẽ thực hiện [**cherry-pick**](https://git-scm.com/docs/git-cherry-pick) để apply một commit từ nhánh B sang nhánh A như sau đây.

**Giải pháp:**

**Bước 1:** Sử dụng **git log** để biết và lấy ra **hash-commit** ứng với commit mà bạn muốn thực hiện _cherry-pick_.

```bash
# Checkout nhánh B
$ git checkout B

# Hiển thị log
$ git log
```

Câu lệnh trên sẽ liệt kê ra các commit mà bạn đã thực hiện. Bạn tìm trong đó và chọn ra _hash-commit_ mong muốn. Ví dụ log:

```
commit 6d0b53753a795298192cbb8673b5e0d8fbaa5695
...
commit 4feaed3c967110777b1c706e91091cf90d78189f
...
```

Giả sử mình muốn thực hiện _cherry-pick_ với commit có _hash-commit_ là: **4feaed3c967110777b1c706e91091cf90d78189f**.

**Bước 2:** Apply commit trên vào nhánh A

```bash
# Checkout nhánh A
$ git checkout A

# Thực hiện cherry-pick
$ git cherry-pick 4feaed3c967110777b1c706e91091cf90d78189f
```

Đến đây là bạn đã thực hiện xong việc apply một commit từ nhánh này sang nhánh khác.

## Lời kết

Trên đây là tổng hợp lại một số trường hợp với Git mà mình gặp phải và cách mình giải quyết chúng. Nếu một trong số đó đúng là trường hợp mà bạn đang cần tìm thì bạn có thể thử giải pháp của mình.

Nếu có vấn đề gì chưa hiểu, bị lỗi hoặc gặp trường hợp nào khác chưa giải quyết được, bạn vui lòng để lại bình luận xuống phía dưới. Mình sẽ cố gắng giải đáp và cập nhật lại bài viết khi có thể.

Ngoài ra, nếu bạn muốn nhận được thông báo ngay sau khi mình hoặc ai đó trả lời bình luận của bạn thì nhớ nhập chính xác địa chỉ Email và nhấn vào hình cái chuông ngay bên cạnh nút "Gửi bình luận" nhé!

Xin chào và hẹn gặp lại, thân ái!

**Tham khảo:**

- [Rename a local and remote branch in git](https://multiplestates.wordpress.com/2015/02/05/rename-a-local-and-remote-branch-in-git/)
- [Sync your Git Fork to the Original Repo](https://digitaldrummerj.me/git-syncing-fork-with-original-repo/)
- [How to completely replace git branch code with another branch's code](https://www.nickang.com/replace-git-branch-code/)
- [Sử dụng git cherry-pick](https://kipalog.com/posts/Su-dung-git-cherry-pick)
