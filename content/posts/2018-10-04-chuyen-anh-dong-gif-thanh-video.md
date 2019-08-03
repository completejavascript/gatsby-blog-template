---
date: "2018-10-04T11:45:05Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: chuyen-anh-dong-gif-thanh-video
title: "Chuyển ảnh động GIF thành video"
categories:
  - Thủ thuật máy tính
tags:
  - FFmpeg
  - Performance
---

Có lẽ bạn đã quá quen thuộc với ảnh động GIF. Việc sử dụng ảnh động GIF sẽ giúp cho trang web, bài viết trở nên sinh động hơn. Tuy nhiên, ảnh động GIF thường có dung lượng khá lớn. Điều này sẽ làm giảm [hiệu năng của trang web](/tag/performance/). May mắn thay, có một giải pháp cho vấn đề này, đó là: chuyển ảnh động GIF thành video. Do đó, bài viết này sẽ giới thiệu với bạn cách chuyển ảnh động GIF thành video và sử dụng video mà đem lại hiệu quả tương tự như ảnh động GIF. Mời bạn theo dõi bài viết.

## Tại sao ảnh động GIF lại nặng hơn video?

Thông thường, khi so sánh giữa ảnh và video, chúng ta thường nghĩ rằng ảnh thì bao giờ cũng nhẹ hơn video.

**Nhưng tại sao ảnh động GIF lại nặng hơn video?**

Đó là vì với ảnh động, mỗi frame đều là một ảnh riêng biệt. Do vậy, dung lượng của ảnh động GIF thường sẽ bằng tổng dung lượng của các frame. Nhưng rõ ràng, khoảng thời gian giữa 2 frame thường rất ngắn, nên sự khác nhau giữa chúng là rất ít. Nên việc lưu toàn bộ bức ảnh ở mỗi frame là không cần thiết.

Trong khi với video, người ta mã video thành dãy các frame I, P, B (tuỳ thuộc vào kiểu mã hoá mà tỉ lệ I, P, B là khác nhau). Các frame I, P, B có đặc điểm là:

- Frame I (Intra-coded picture): chứa toàn bộ nội dung của bức ảnh, giống như một ảnh JPG, BMP,...
- Frame P (Predicted picture): lưu sự thay đổi của frame hiện tại so với frame trước.
- Frame B (Bidirectional predicted picture): lưu sự thay đổi của frame hiện tại so với cả frame trước và frame đằng sau nó.

Vì frame loại P và B chỉ lưu sự thay đổi giữa các frame, nên dung lượng của chúng rất nhỏ so với frame loại I. Nhờ vậy, tổng dung lượng của video sẽ nhỏ hơn nhiều so với ảnh động GIF tương ứng.

## Chuyển ảnh động GIF thành video

Nếu bạn search trên Google thì sẽ thấy có rất nhiều trang giúp chuyển ảnh động GIF thành video online. Tuy nhiên, bài viết này sẽ giới thiệu với bạn một phần mềm mã nguồn mở rất mạnh mẽ, đó là **ffmpeg**. Đây là công cụ chuyên dùng để xử lý hình ảnh, audio và video.

Để tải và cài đặt ffmpeg bạn có thể tham khảo bài viết: [Hướng dẫn tìm hiểu FFmpeg cơ bản](/huong-dan-tim-hieu-ffmpeg-co-ban/).

### Câu lệnh cơ bản

Để chuyển ảnh động GIF thành video bạn sử dụng câu lệnh sau:

```
ffmpeg -i input.gif output.mp4
```

Trong đó:

- _ffmpeg_: tên của chương trình
- _-i_: là cờ dùng để chỉ định đầu vào, tên đầu vào đặt ngay sau đó
- _iniput.gif_: tên ảnh động GIF đầu vào
- _output.mp4_: tên video đầu ra với định dạng MPEG-4

![](/wp-content/uploads/2018/09/gif_to_mp4.png)
Dung lượng của video giảm đáng kể so với ảnh động GIF

### Sử dụng phương pháp CRF

Ngoài ra, ffmpeg còn hỗ trợ sử dụng một phương pháp mã hoá, được gọi là [Constant Rate Factor](https://trac.ffmpeg.org/wiki/Encode/H.264#crf) (hay CRF). CRF giúp bạn dễ dàng điều chỉnh được chất lượng của video đầu ra. Câu lệnh là:

```
ffmpeg -i input.gif -b:v 0 -crf 25 output.mp4
```

Lệnh này tương tự lệnh trên, chỉ khác ở chỗ:

- _-b:v_: là cờ dùng để giới hạn bitrate của output. Vì mình đang sử dụng CRF, nên giá trị này phải đặt là 0
- _-crf_: là cờ dùng để xác định hệ số của CRF. Giá trị này nằm trong khoảng từ 0 đến 51. Hệ số CRF càng thấp sẽ cho video chất lượng càng cao, nhưng càng nặng. Ngược lại, hệ số CRF càng cao sẽ cho video chất lượng càng thấp nhưng càng nhẹ.

![](/wp-content/uploads/2018/09/gif_to_mp4_crf.png)
Sử dụng CRF với các giá trị khác nhau sẽ cho ra chất lượng video khác nhau

Với kết quả thử nghiệm trên, mình thấy rằng sử dụng hệ số CRF bằng 25 là hợp lý nhất. Vì dung lượng giảm đi đáng kể mà chất lượng hình ảnh gần như không đổi.

Như vậy là mình đã chuyển ảnh động GIF thành video xong rồi. Tiếp theo, làm sao có thể sử dụng video tương tự như việc sử dụng ảnh động GIF?

## Sử dụng thẻ <video> thay cho thẻ <img>

Trước tiên, để sử dụng ảnh GIF, mình phải sử dụng thẻ <img> (giống các loại ảnh khác), như sau:

```
<img src="input.gif" />
```

Nhưng khi đã chuyển ảnh động GIF thành video thì mình phải chuyển sang sử dụng thẻ <video>. Cơ bản là như này:

```
<video>
      <source src="input.mp4" type="video/mp4">
    </video>
```

Tuy nhiên, nếu chỉ dừng lại như trên thì video sẽ không giống với ảnh động GIF. Vì ảnh động GIF có 3 đặc điểm quan trọng là:

- Tự động play
- Chạy liên tục (looping)
- Không có tiếng

Vì vậy, đoạn code trên sửa thành:

```
<video autoplay loop muted playsinline>
      <source src="input.mp4" type="video/mp4">
    </video>
```

## Ví dụ minh hoạ

Để minh hoạ cho cách làm trên, mình có chuẩn bị một project mà bạn có thể tham khảo.

[Xem code trên Github](https://github.com/completejavascript/replace-gif-with-video) [Xem Demo](http://about.phamvanlam.com/replace-gif-with-video/)

## Lời kết

Trên đây là cách mình chuyển ảnh động GIF thành video và sử dụng video tương tự như ảnh động GIF. Nếu có gì thắc mắc hoặc góp ý, bạn có thể để lại cho mình trong phần bình luận phía dưới. Mình sẽ cố gắng giải đáp.

Xin chào và hẹn gặp lại bạn trong bài viết tiếp theo, thân ái!

★ Tham khảo

- [Replace Animated GIFs with Video](https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/replace-animated-gifs-with-video/)
- [Có nên tiếp tục sử dụng GIF trên website nữa không?](https://viblo.asia/p/co-nen-tiep-tuc-su-dung-gif-tren-website-nua-khong-WAyK8My9ZxX)

---

★ Theo dõi [Lam Pham](/gioi-thieu/) để nhận được thông báo khi có bài viết mới nhất:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)  
  **☛ Portfoflio** : [Lam Pham](http://about.phamvanlam.com/)
