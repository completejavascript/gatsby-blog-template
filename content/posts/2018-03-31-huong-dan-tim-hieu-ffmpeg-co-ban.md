---
date: "2018-03-31T00:00:52Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: huong-dan-tim-hieu-ffmpeg-co-ban
title: "Hướng dẫn tìm hiểu FFmpeg cơ bản"
categories:
  - Thủ thuật máy tính
tags:
  - Command Line
  - FFmpeg
---

Sau quá trình học tập và làm việc với FFMPEG, mình phải khẳng định rằng FFMPEG là một phần mềm xử lý audio, video đơn giản, miễn phí và hiệu quả. Vì vậy, bài viết này sẽ hướng dẫn tìm hiểu FFmpeg cơ bản.

Tuy nhiên, trước khi bắt đầu đọc bài viết này, mình mong bạn hiểu rõ về vấn đề, đó là:

★ FFMPEG là hoàn toàn miễn phí, mã nguồn mở. Do đó bạn hoàn toàn yên tâm sử dụng nó ở bất kì đầu mà không sợ vi phạm bản quyền.

★ Sử dụng FFMPEG để xử lý audio, video - nghĩa là bạn phải sử dụng dòng lệnh thông qua Command line (cmd). Nếu bạn cảm thấy mình lười trong việc sử dụng câu lệnh và mong muốn có một giao diện để xử lý audio, video thì mình xin lỗi rằng bài viết này không dành cho bạn. Mình xin cám ơn và hẹn gặp lại bạn ở các bài viết khác.

★ Nếu bạn đọc đến đây thì có nghĩa là bạn tò mò và sẵn sàng sử dụng FFMPEG. Có thể bạn cũng đang hướng tới sự tự do và đơn giản. Cũng giống như một triết lý nổi tiếng của Lý Tiểu Long đó là:

<blockquote>

> Cảnh giới cao nhất trong võ thuật là lấy vô chiêu thắng hữu chiêu. Không có chiêu thức chính là chiêu thức tối thượng.

</blockquote>

Không làm mất thời gian của bạn nữa, sau đây chúng ta sẽ cùng tìm hiểu FFMPEG. Rốt cuộc nó là cái gì, nó có sức mạnh lớn đến mức nào.

## **Tìm hiểu FFMPEG cơ bản**

### Tổng quan

FFMPEG là một framework hàng đầu về đa phương tiện (xử lý audio, video). Nó có thể decode (giải mã), encode (mã hóa), transcode (chuyển mã), mux (ghép kênh), demux (phân kênh, tách kênh), stream (ví dụ như livestream trên youtube, facebook,..), filter (lọc) và play (chạy, phát video) rất nhiều thứ mà con người hay máy móc tạo ra.

FFMPEG hỗ trợ hầu hết các định dạng. Và nó khá là linh hoạt, có thể compile, run và chạy trên nhiều nền tảng như Linux, Mac OS X, Microsoft Windows, BSD, Solaris,...và ở trên nhiều môi trường, kiến trúc khác nhau.

Nó chứa các thư viện libavcodec, libavutil, libavformat, libavfilter, libavdevice, libswscale và libswresample. Chúng có thể được sử dụng bởi ứng dụng. Cũng giống như ffmpeg, ffserver, ffplay và ffprobe được sử dụng để transcoding, streaming và playing.

Rõ ràng, FFMPEG là một phần mềm xử lý audio, video đơn giản, miễn phí và hiệu quả. Dù bạn là lập trình viên hay là một người sử dụng bình thường thì đều có thể sử dụng được FFMPEG cho những mục đích của mình.

### Các công cụ xử lý audio, video

FFMPEG cung cấp sẵn cho người dùng những tiện ích là: ffmpeg, ffserver, ffplay và ffprobe.

**ffmpeg**

Tiện ích dựa trên command line giúp người sử dụng chuyển đổi định dạng tệp tin (hỗ trợ rất nhiều định dạng khác nhau).

**ffserver**

Server cho việc streaming

**ffplay**

Một chương trình đơn giản giúp chạy, phát video dựa trên thư viện SDL và ffmpeg

**ffprobe**

Một chương trình đơn giản giúp phân tích việc stream các tệp tin đa phương tiện.

### Các gói thư viện của ffmpeg

**libavutil**: là một thư viện chứa các hàm cho việc đơn giản chương trình, bao gồm việc sinh ra số ngẫu nhiên, cấu trúc dữ liệu, chương trình toán học, tiện ích đa phương tiện cơ bản,...

**libavcodec**: là một thư viện chứa bộ encoder (mã hóa) và decoder (giải mã) cho audio/video.

**libavformat**: là thư viện chứa bộ demuxer (phân kênh) và muxer (ghép kênh) cho những định dạng đa phương tiện.

**libavdevice**: là thư viện chứa những thiết bị đầu vào và đầu ra cho việc lấy vào hay xuất ra nội dung đa phương tiện với những phần mềm phổ biến như Video4Linux, Video4Linux2, VfW, and ALSA.

**libavfilter**: là thư viện cho việc lọc video

**libswscale**: là thư viện cho việc tối ưu hóa ảnh về co dãn, màu sắc,...

**libswresample**: là thư viện cho việc tối ưu hóa về việc lấy mẫu lại audio,...

## **Hướng dẫn tải và cài đặt FFMPEG**

### Tải phần mềm

Các bạn có thể vào trang chủ để tải về phần mềm, tại [đây](https://ffmpeg.org/download.html). Có 3 nền tảng cho bạn lựa chọn là: Linux, Windows và Mac OS X. Ở đây mình chọn nền tảng Windows.

![Tải cài đặt ffmpeg](/wp-content/uploads/2018/03/tai-cai-dat-ffmpeg-phamvanlam-com.png)

Sau đó bạn sẽ được chuyển đến trang để tải phần mềm về. Lúc này bạn có 3 lựa chọn để tải về:

**Static**: chỉ bao gồm các tiện ích như mình đã kể trên, tức chỉ chứa file chạy .exe

**Shared**: ngoài những thành phần kể trên giống như của phần **static** thì còn có thêm thư viện dạng liên kết động .dll

**Dev**: chứa những tệp tin như trên cộng thêm các tệp tin header, lib,...

★ Nếu bạn là người dùng bình thường thì bạn có thể chỉ cần tải về dạng **Static**

★ Nếu bạn là lập trình viên và muốn phát triển ứng dụng cho riêng mình thì có thể tải về dạng **Shared** hoặc **Dev**

★ Sau đây, mình sẽ chỉ nói về việc sử dụng FFMPEG như là một người dùng bình thường mà không phải là một lập trình viên.

### Cài đặt phần mềm

Sau khi tải về thành công bạn sẽ có một tệp tin .zip. Tiếp theo bạn hãy giải nén nó ra và copy toàn bộ nội dung đó vào thư mục **C:\ffmpeg**.

Thực tế là đến lúc này bạn đã có thể sử dụng FFMPEG rồi mà không cần phải cài đặt gì cả. Tuy nhiên để cho việc xử lý audio, video đơn giản, nhanh chóng và hiệu quả, công việc tiếp theo đó là cài đặt biến môi trường cho phần mềm. Khái niệm cái đặt biến môi trường đối với lập trình viên thì rất đơn giản và dễ hiểu rồi. Còn trong trường hợp bạn không hiểu cài đặt biến môi trường để làm gì thì mình khuyên bạn là cũng không cần phải hiểu làm gì. Vì bạn sẽ chỉ cần phải thực hiện nó đúng một lần mà thôi.

Để cài đặt biến môi trường cho phần mềm FFMPEG bạn làm theo những bước sau:

1. Nhấn chuột phải vào **My Computer** và chọn **Properties**

2) Cửa sổ hiện ra, bạn chọn **Advanced system settings.**

![Cài đặt môi trường cho ffmpeg 1](/wp-content/uploads/2018/03/cai-dat-moi-truong-1-phamvanlam-com.png)

3. Cửa sổ tiếp theo hiện ra thì bạn chọn tab **Advanced** => **Enviroment Variables**

![Cài đặt môi trường cho ffmpeg 2](/wp-content/uploads/2018/03/cai-dat-moi-truong-2-phamvanlam-com.png)

4. Cửa sổ tiếp theo hiện ra bạn chọn trong mục **System variables** => **Path** => **Edit**. Trong mục **variable value**, bạn thêm vào đường dẫn sau **C:\ffmpeg\bin là đường dẫn đến file chạy của ffmpeg.exe, ffplay.exe, ffprobe.exe**

[![Cài đặt môi trường cho ffmpeg 3](/wp-content/uploads/2018/03/cai-dat-moi-truong-3-phamvanlam-com.png)]()

Sau đó bạn chỉ cần lưu lại là xong. Đến đây bạn có thể sử dụng FFMPEG ở mọi thư mục trên máy tính.

Tiếp theo, phần quan trọng nhất trong bài viết ngày hôm nay (tiếng anh nó gọi là **last but not least **hoặc đôi khi là **last and certainly not least **- tức là cuối cùng nhưng không phải ít quan trọng), đó là các câu lệnh để sử dụng FFMPEG.

## **Hướng dẫn sử dụng FFMPEG Tools**

Để hiểu rõ hơn, cũng như biết nhiều hơn về các câu lệnh của FFMPEG, bạn có thể vào trang chủ của nó, tại [đây](https://ffmpeg.org/documentation.html). Sau đây, mình sẽ tóm tắt lại một số những câu lệnh mà theo mình nó phù hợp với những người sử dụng bình thường và dĩ nhiên nó rất hiệu quả.

Trước tiên, để sử dụng tiện ích của ffmpeg, bạn phải mở CMD lên. Vì chúng ta đã cài đặt biến môi trường cho phần mềm nên bạn có thể mở CMD lên ở mọi thư mục và sử dụng FFMPEG. Để mở CMD ở một thư mục, bạn nhấn **Shift**, đồng thời **nhấn chuột phải**, rồi chọn **Open command window here**. Lúc này, bạn có thể sử dụng FFMPEG để xử lý audio, video được rồi.

### Công cụ ffmpeg

Một chú ý nhỏ trước khi bắt đầu đó là: các ảnh, audio và video có thể có nhiều định dạng khác nhau. Tuy nhiên, sau đây mình sẽ chỉ ví dụ mặc định với ảnh .png, audio .mp3 và video .mp4

#### Ý nghĩa một số loại option

- i : đầu vào input
- f : định dạng format
- vn : vô hiệu hóa việc recoding video trong quá trình chuyển đổi
- ar : cài đặt thông số tần số lấy mẫu của audio (sample rate)
- ac : cài đặt số kênh (channel) của audio
- ab : cài đặt audio bitrate
- vf : cài đặt bộ lọc video (video filter)

#### Code FFmpeg hiển thị thông tin của file

```
ffmpeg -i test.mp4
```

#### Code FFmpeg chuyển đổi ảnh thành video

```
ffmpeg -f image2 -i img%d.png video.mp4
```

Trong đó, img%d.png là tất cả những ảnh đầu vào của bạn trong thư mục hiện tại và video.mp4 là tên video đầu ra. Ví dụ: bạn có các bức ảnh img1.png, img2.png,...,img100.png (định dạng có thể là png hoặc jpg,...) và bạn muốn tập hợp lại thành video có tên là video.mp4 (có thể là định dạng khác như .avi, .mpg,...). Thực tế thì chức năng này chỉ có ích khi bạn có rất nhiều bức ảnh là tập hợp các Frame của video. Và dĩ nhiên video này sẽ không có âm thanh.

#### Code FFmpeg chuyển đổi video thành ảnh

```
ffmpeg -i video.mp4 image%d.png
```

Ở đây, đầu vào là file video có tên là video.mp4 và đầu ra là các ảnh có tên dạng image%d.png (image1.png, image2.png, image3.png,...)

#### Code FFmpeg tách âm thanh từ video và lưu lại thành file mp3

```
ffmpeg -i video.mp4 -vn -ar 44100 -ac 2 -ab 192k -f mp3 sound.mp3
```

Trong đó:

- File video đầu vào có tên: video.mp4
- Tần số lấy mẫu sample rate: 44100 Hz.
- Audio bitrate: 192kb/s
- Đầu ra: định dạng .mp3
- Tên file đầu ra là: sound.mp3

#### Code FFmpeg chuyển đổi định dạng video

```
ffmpeg -i video_input.xxx video_output.yyy
```

Trong đó:

- File đầu vào là video_input.xxx với xxx là các định dạng video của file đầu vào: mp4, avi, mpg, flv,...
- File đầu ra là video_output.yyy với yyy cũng là các định dạng video của file đầu vào: mp4, avi, mpg, flv,...

Ví dụ, mình muốn chuyển từ định dạng flv sang mp4, thì câu lệnh sẽ là:

```
ffmpeg -i video_input.flv video_output.mp4
```

#### Code FFmpeg chuyển video thành ảnh động .gif

```
ffmpeg -i video.mp4 gif_anime.gif
```

Trong đó:

- File video đầu vào là video.mp4
- Ảnh động đầu ra là: gif_anime.gif

#### Code FFmpeg trộn video với một file âm thanh

```
ffmpeg -i sound.mp3 -i video_input.mp4 video_output.mp4
```

Trong đó:

- Tệp tin âm thanh đầu vào là sound.mp3
- Tệp tin video đầu vào là video_input.mp4
- Tệp tin video đầu ra là video_output.mp4

Chú ý là: độ dài video đầu ra sẽ là độ dài lớn hơn của một trong hai cái đầu vào.

#### Code FFmpeg tăng - giảm tốc độ video

```
ffmpeg -i video.mp4 -vf "setpts=0.5*PTS" highspeed.mp4
```

Trong đó:

- video.mp4 là video đầu vào
- setpts=0.5\*PTS giúp tăng tốc video lên gấp 2 lần
- File video đầu ra là: highspeed.mp4

Nếu muốn giảm tốc độ đi 2 lần thì chỉ cần thay đổi thành:

```
ffmpeg -i video.mp4 -vf "setpts=2*PTS" highspeed.mp4
```

Còn muốn tốc độ khác thì bạn tự suy luận ra nhé.

#### Code FFmpeg thêm ảnh vào audio và xuất bản thành video

```
ffmpeg -loop 1 -i image.png -i sound.mp3 -c:v libx264 -c:a aac -strict experimental -b:a 192k -shortest output.mp4
```

Trong đó:

- File ảnh đầu vào là image.png
- File âm thanh đầu vào là sound.mp3
- File video đầu ra là: output.mp4

#### Code FFmpeg thêm phụ đề cho video

```
ffmpeg -i video.mp4 -i subtitles.srt -map 0 -map 1 -c copy -c:v libx264 -crf 23 -preset veryfast video-output.mp4
```

Trong đó:

- File video đầu vào là video.mp4
- File phụ đề đầu vào là subtitles.srt
- File video đầu ra là video-output.mp4

#### Code FFmpeg cắt lấy một phần nhỏ của video

```
ffmpeg -i video.mp4 -ss 00:00:50.0 -codec copy -t 20 output.mp4
```

Trong đó:

- File đầu vào là video.mp4
- Option ss để chỉ ra thời điểm bắt đầu của video đầu ra. Tiếp theo sau là thời gian theo định dạng HH:MM:SS.ms
- Option t để chỉ ra thời lượng của video đầu ra. Sau đó là thời gian tính theo giây.

#### Code FFmpeg chia video ra thành nhiều phần

```
ffmpeg -i video.mp4 -t 00:00:50 -c copy small-1.mp4 -ss 00:00:50 -codec copy small-2.mp4
```

Trong đó:

- File video đầu vào là video.mp4
- File sẽ được chia làm 2 phần: phần 1 có tên small-1.mp4 sẽ có thời lượng 50 giây tính từ đầu video, phần 2 sẽ có tên small-2.mp4 sẽ bắt đầu từ giây thứ 50 và kéo dài đến cuối video

#### Code FFmpeg ghép video từ những video nhỏ

```
ffmpeg -f concat -i file-list.txt -c copy output.mp4
```

Trong đó:

- File đầu vào là file file-list.txt - chứa tên của các video cần ghép, ở cùng thư mục đang xét. Ví dụ nội dung file sẽ như sau:

```
file 'small-1.mp4'
    file 'small-2.mp4'
```

- File đầu ra là output.mp4

#### Code FFmpeg tắt âm thanh của video

```
ffmpeg -i video.mp4 -an mute-video.mp4
```

Trong đó:

- File đầu vào là video.mp4
- Option **an **là để tắt âm thanh video
- File đầu ra là mute-video.mp4

### Công cụ ffplay

Dùng để chạy, phát video. Câu lệnh đơn giản là:

```
ffplay dir/video.mp4
```

Trong đó:

- dir là đường dẫn đến tệp tin video
- video.mp4 là tên video

## Lời kết

Trên đây là những gì mình tìm hiểu được về FFMPEG và những công cụ của nó ffpmeg, ffplay. Những câu lệnh trên đây mới chỉ là những câu lệnh đơn giản. Để tìm hiểu sâu hơn, bạn có thể vào trang chủ của ffmpeg, tại [đây](https://ffmpeg.org/documentation.html).

Hy vọng, bài viết trên đây có thể giúp ích cho bạn. Nếu có gì thắc mắc bạn có thể để lại comment phía dưới hoặc gửi lại email cho mình.

Xin chào và hẹn gặp lại bạn ở [bài viết tiếp theo](/lay-anh-thumbnail-cua-video-tren-youtube/), thân ái!

Có thể bạn quan tâm:

- [[FFmpeg tutorial] Những câu lệnh FFmpeg xử lý video](https://phamvanlam.com/ffmpeg-tutorial-nhung-cau-lenh-ffmpeg-xu-ly-video/)

* [[FFmpeg Tutorial] Lấy thông tin video bằng FFmpeg](https://phamvanlam.com/ffmpeg-tutorial-lay-thong-tin-video-bang-ffmpeg/)

- [[FFmpeg Tutorial] Lấy ảnh từ video với FFmpeg](https://phamvanlam.com/ffmpeg-tutorial-lay-anh-tu-video-voi-ffmpeg/)

* [[FFmpeg Tutorial] Chuyển video thành ảnh động GIF](https://phamvanlam.com/ffmpeg-tutorial-chuyen-video-thanh-anh-dong-gif/)

- [[FFmpeg Tutorial] Convert video thành MP4 với FFmpeg](https://phamvanlam.com/ffmpeg-tutorial-convert-video-thanh-mp4-voi-ffmpeg/)

* [[FFmpeg Tutorial] Convert video thành WEBM với FFmpeg](https://phamvanlam.com/ffmpeg-tutorial-convert-video-thanh-webm-voi-ffmpeg/)

- [[FFmpeg Tutorial] Crop video với FFmpeg](https://phamvanlam.com/ffmpeg-tutorial-crop-video-voi-ffmpeg/)

* [[FFmpeg Tutorial] Cut video với FFmpeg](https://phamvanlam.com/ffmpeg-tutorial-cut-video-voi-ffmpeg/)

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
