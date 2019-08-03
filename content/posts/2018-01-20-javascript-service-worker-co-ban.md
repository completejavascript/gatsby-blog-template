---
date: "2018-01-20T05:16:13Z"
template: "post"
cover: "../images/placeholder-660x400-344359.png"
keywords: "lập trình JavaScript"
slug: javascript-service-worker-co-ban
title: "JavaScript Service Worker cơ bản"
categories:
  - Javascript cơ bản
tags:
  - AJAX
  - Event
---

Xin chào bạn! Không biết bạn đã từng nghe về **Offline Web App** chưa? Có thể bạn đã biết hoặc chưa. Hiểu một cách đơn giản, Offline Web App là một ứng dụng web có thể chạy ngay cả khi không có kết nối internet. Bây giờ, mình phân tích chút xíu nhé. Có 2 thứ cần thiết để web app có thể chạy được là: resources (html, js, css, ảnh,...) và định tuyến. Thì thằng mà chúng ta sẽ tìm hiểu sau đây là **JavaScript Service Worker** có thể đáp ứng được cả hai việc đó. Vậy...

## JavaScript Service Worker là gì?

Service Worker là một script mà trình duyệt chạy ở dưới background, tách khỏi trang web và giúp thực hiện các tính năng không cần đến trang web, hay tương tác người dùng.

Service Worker có một số đặc điểm quan trọng là:

- Không liên kết với một trang cụ thể

- Không truy cập đến [DOM](/co-ban-ve-dom-javascript/)

- Có thể dừng khi không sử dụng và chạy khi cần thiết.

- Chỉ hỗ trợ HTTPS

Với Service Worker chúng ta có thể:

- Làm cho trang web chạy nhanh hơn và có thể chạy offline

- Thực hiện một số tính năng ở background như: [push message](http://updates.html5rocks.com/2015/03/push-notificatons-on-the-open-web) và [background synchronization](https://github.com/slightlyoff/BackgroundSync/blob/master/explainer.md).

Có lẽ đến đây thì bạn đã hiểu phần nào về JavaScript Service Worker rồi. Tiếp theo, chúng ta sẽ tìm hiểu về cách sử dụng nó.

## Đăng ký JavaScript Service Worker

Giả sử, mình có một trang web đơn giản và cấu trúc các tệp tin như sau:

```
index.html
    service_worker.js
    main.js
    style.css
```

Lúc này, mình sẽ đăng ký Service Worker trong file _**main.js**_:

```
if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service_worker.js')
      .then(reg => {
        console.log('Registered service worker');
      }).catch(err => {
        console.log('Register service worker failed', err);
      });
    }
```

Có một số lưu ý quan trọng khi đăng ký Service Worker là:

- Vị trí của file _**service_worker.js**_ quyết định đến URL của các trang mà nó điều khiển. Ở đây, mình đặt file _**service_worker.js**_ cùng thư mục với **_index.html_**. Có nghĩa là Service Worker sẽ quản lý URL của toàn bộ trang web. Ngược lại, nếu mình đặt nó ở một thư mục khác, giả sử là: **_/apps/service_worker.js_** thì Service Worker sẽ chỉ quản lý các URL bắt đầu từ _**/apps/**_.

- Hàm đăng ký _**.register**_ trả về một [Promise](https://www.tutorialspoint.com/es6/es6_promises.htm).

- Trang đăng ký Service Worker phải là HTTPS.

- Service Worker phải nằm trên cùng trang web đăng ký nó (same origin). Vì vậy, bạn không thể đặt file _**service_worker.js**_ ở một nơi khác, rồi sử dụng [importScripts()](https://developer.mozilla.org/en-US/docs/Web/API/WorkerGlobalScope/importScripts) được.

Mình có tham khảo được một ví dụ mẫu về cách triển khai JavaScript Service Worker như sau (mình không nhớ mình tham khảo được ở đâu, chỉ nhớ là của Google, nên mong tác giả của script thông cảm):

```
/*
    * Names of the two caches used in this version of the service worker.
    * Change to v2, etc. when you update any of the local resources, which will
    * in turn trigger the install event again.
    */
    const PRECACHE = 'my-precache-v1';
    const RUNTIME = 'my-runtime';

    // A list of local resources we always want to be cached.
    const PRECACHE_URLS = [
      'index.html',
      './', // Alias for index.html
      'style.css',
      'main.js'
    ];

    // The install handler takes care of precaching the resources we always need.
    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(PRECACHE)
          .then(cache => cache.addAll(PRECACHE_URLS))
          .then(self.skipWaiting())
      );
    });

    // The activate handler takes care of cleaning up old caches.
    self.addEventListener('activate', event => {
      const currentCaches = [PRECACHE, RUNTIME];
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
          return Promise.all(cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          }));
        }).then(() => self.clients.claim())
      );
    });

    /*
    * The fetch handler serves responses for same-origin resources from a cache.
    * If no response is found, it populates the runtime cache with the response
    * from the network before returning it to the page.
    */
    self.addEventListener('fetch', event => {
      // Skip cross-origin requests, like those for Google Analytics.
      if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
          caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }

            return caches.open(RUNTIME).then(cache => {
              return fetch(event.request).then(response => {
                // Put a copy of the response in the runtime cache.
                return cache.put(event.request, response.clone()).then(() => {
                  return response;
                });
              });
            });
          })
        );
      }
    });

```

Sau khi đăng ký thành công, Service Worker sẽ được download về phía client và thực hiện những việc sau đây.

## JavaScript Service Worker - Install

Đoạn code dùng để install Service Worker:

```
const PRECACHE = 'my-precache-v1';
    const RUNTIME = 'my-runtime'; // A list of local resources we always want to be cached.
    const PRECACHE_URLS = [
      'index.html',
      './', // Alias for index.html
      'style.css',
      'main.js'
    ];

    // The install handler takes care of precaching the resources we always need.
    self.addEventListener('install', event => {
      event.waitUntil(
        caches.open(PRECACHE)
          .then(cache => cache.addAll(PRECACHE_URLS))
          .then(self.skipWaiting())
      );
    });
```

Mục đích của của việc **install** là để lưu một số resources được định nghĩa ở [array](/javascript-array-co-ban/) **\*PRECACHE_URLS** _vào bộ nhớ đệm **cache** với tên định nghĩa bởi \*\*\_PRECACHE\*. \*\*

Sau khi lưu xong hết tất cả các resources cần thiết, hàm [self.skipWaiting()](https://developer.mozilla.org/en-US/docs/Web/API/ServiceWorkerGlobalScope/skipWaiting) dùng để dừng công việc hiện tại lại và chuyển ngay sang công việc tiếp theo.

## JavaScript Service Worker - activate

Đoạn code dùng để active Service Worker là:

```
// The activate handler takes care of cleaning up old caches.
    self.addEventListener('activate', event => {
      const currentCaches = [PRECACHE, RUNTIME];
      event.waitUntil(
        caches.keys().then(cacheNames => {
          return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
        }).then(cachesToDelete => {
          return Promise.all(cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          }));
        }).then(() => self.clients.claim())
      );
    });
```

Mục đích của công việc **activate** này là để xóa đi bộ nhớ đệm **cache** cũ, và giữ lại **cache** mới nhất, cuối cùng là kích hoạt Service Worker.

Giả sử ban đầu bạn có hai cache là: _**PRECACHE = my-precache-v1**_ và _**RUNTIME**_. Bây giờ, bạn muốn thay đổi resources.

Làm sao để cập nhật được những resources mới này vào cache?

Bạn cần thay đổi tên của _**PRECACHE**_, ví dụ là: **_my-precache-v2._** Lúc này **_currentCaches = ['my-precache-v2', RUNTIME]._** Bây giờ chỉ cần dùng [filter](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter) để lọc ra tên của cache không có trong _**currentCaches**_:

```
cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
```

Đó chính là **_my-precache-v1._** Tiếp theo, xóa cache này đi:

```
.then(cachesToDelete => {
          return Promise.all(cachesToDelete.map(cacheToDelete => {
            return caches.delete(cacheToDelete);
          }));
```

Cuối cùng là kích hoạt Service Worker sử dụng [self.clients.claim()](https://developer.mozilla.org/en-US/docs/Web/API/Clients/claim).

Bạn có thể kiểm tra lại bằng cách nhấn **Ctrl Shift I** hoặc **F12 **(tùy thuộc trình duyệt) để vào phần Công cụ dành cho nhà phát triển:

![Google Dev Tool - Check Service Worker](/wp-content/uploads/2018/01/google-dev-tool-service-worker-check.png)

Theo như hình trên thì bạn có thể thấy là Service Worker đã được kích hoạt (**activated**) và đang chạy (**running**).

## JavaScript Service Worker - fetch

Đoạn code xử lý lệnh fetch:

```
/*
    * The fetch handler serves responses for same-origin resources from a cache.
    * If no response is found, it populates the runtime cache with the response
    * from the network before returning it to the page.
    */
    self.addEventListener('fetch', event => {
      // Skip cross-origin requests, like those for Google Analytics.
      if (event.request.url.startsWith(self.location.origin)) {
        event.respondWith(
          caches.match(event.request).then(cachedResponse => {
            if (cachedResponse) {
              return cachedResponse;
            }

            return caches.open(RUNTIME).then(cache => {
              return fetch(event.request).then(response => {
                // Put a copy of the response in the runtime cache.
                return cache.put(event.request, response.clone()).then(() => {
                  return response;
                });
              });
            });
          })
        );
      }
    });
```

Đoạn code trên có thể mô tả thành lời như sau:

1. Khi có request từ phía client (trình duyệt): Nếu url không thuộc cùng origin (không cùng trang web) thì bỏ qua.

2) Ngược lại, kiểm tra trong bộ nhớ đệm cache xem đã có response tương ứng với request chưa. Nếu tồn tại, thì trả về response đó cho trình duyệt.

3. Ngược lại, gửi request đó lên server, rồi lấy response trả về.

4) Clone response đó và lưu vào \_**RUNTIME** \_cache để phục vụ cho lần request tiếp theo, rồi sau đó trả về response đó cho trình duyệt.

Toàn bộ quá trình có thể được mô phỏng thông qua hình vẽ dưới đây:

[caption id="" align="aligncenter" width="767"]![Offline workflow](https://mdn.mozillademos.org/files/7311/lifeOfOffline-05.svg)](https://mdn.mozillademos.org/files/7311/lifeOfOffline-05.svg) Tham khảo tại [https://developer.mozilla.org/en-US/Apps/Fundamentals/Offline](https://developer.mozilla.org/en-US/Apps/Fundamentals/Offline)[/caption]

## Kết luận

Trên đây là những kiến thức cơ bản về JavaScript Service Worker mà mình tìm hiểu được, và còn rất nhiều vấn đề liên quan khác cần nghiên cứu thêm.

Đến đây có thể đã giải đáp được cho vấn đề đưa ra ở đầu bài viết: c*ó 2 thứ cần thiết để web app có thể chạy được là: resources (html, js, css, ảnh,...) và định tuyến*.

- Dùng listener _**install** \_và _**activate** \_để lưu resources vào bộ nhớ đệm cache.

- Dùng listener **\*fetch** \*để định tuyến.

Nếu bạn có **thắc mắc** gì, vui lòng để lại bình luận để mọi người có thể cùng trao đổi. Mình không hứa là sẽ giải đáp ngay cho bạn. Nhưng mình hứa sẽ tìm hiểu để giải quyết cùng bạn.

Xin chào và hẹn gặp lại bạn trong [bài viết tiếp theo](/anh-nine-patch-scale-khong-vo-trong-javascript/), thân ái!

## Tham khảo

- [Service Worker API](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)

- [Using Service Workers](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API/Using_Service_Workers)

- [Service Workers: an Introduction](https://developers.google.com/web/fundamentals/primers/service-workers/)

- [Introduction to Service Worker](https://developers.google.com/web/ilt/pwa/introduction-to-service-worker)

- [Service Worker CookBook](https://serviceworke.rs/)

- [Working offline](https://developer.mozilla.org/en-US/Apps/Fundamentals/Offline)

- [Adding a Service Worker and Offline into your Web App](https://developers.google.com/web/fundamentals/codelabs/offline/)

- [Service Worker Explainer](https://github.com/w3c/ServiceWorker/blob/master/explainer.md)

---

★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để nhận được thông báo khi có bài viết mới nhất nhé:

- Facebook Fanpage: [Complete JavaScript](https://www.facebook.com/completejavascript/)
- Facebook Group: [Hỏi đáp JavaScript VN](https://www.facebook.com/groups/HoiDapJavascriptVN)
- Portfoflio: [Lam Pham](http://about.phamvanlam.com/)
