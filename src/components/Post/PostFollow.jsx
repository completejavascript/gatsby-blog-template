import React from "react";
import AutoLink from "../AutoLink/AutoLink";

function PostFollow() {
  return (
    <>
      <p className="padding-top">
        ★ Nếu bạn thấy bài viết này hay thì hãy theo dõi mình trên Facebook để
        nhận được thông báo khi có bài viết mới nhất nhé:
      </p>
      <ul className="padding-bottom-half">
        <li>
          Facebook Fanpage:{` `}
          <AutoLink to="https://www.facebook.com/completejavascript/">
            Complete JavaScript
          </AutoLink>
        </li>
        <li>
          Facebook Group:{` `}
          <AutoLink to="https://www.facebook.com/groups/HoiDapJavascriptVN">
            Hỏi đáp JavaScript VN
          </AutoLink>
        </li>
      </ul>
    </>
  );
}

export default PostFollow;
