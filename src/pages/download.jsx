import React, { useEffect, useState } from "react";
import Helmet from "react-helmet";
import AdSense from "react-adsense";
import MainLayout from "../layout/index";
import MainContainer from "../components/MainContainer/MainContainer";
import useWindowSize from "../hooks/useWindowSize";
import { SidebarLeft, SidebarRightAds } from "../components/Sidebar/Sidebar";
import { siteConfig, adsConfig } from "../../data/config";
import { useSlash, delay } from "../utils/helpers";
import { decodeDownloadUrl } from "../utils/downloadUrlHelper";

function DownloadContent({ locationSearch }) {
  const [time, setTime] = useState(10);
  const [downloadLink, setDownloadLink] = useState("");
  const [error, setError] = useState("");
  const size = useWindowSize();

  useEffect(() => {
    async function countDownTime() {
      try {
        await delay(1000);
        setTime((time) => time - 1);
      } catch (error) {
        console.log({ error });
      }
    }

    if (time > 0) {
      countDownTime();
    } else {
      const { url, callback } = decodeDownloadUrl(locationSearch);
      if (url) {
        setDownloadLink(url);
        setError("");
      } else {
        setError(
          "Rất tiếc, tệp tin không tồn tại hoặc liên kết đã bị thay thế."
        );
        setDownloadLink(useSlash(`/${callback}`));
      }
    }
  }, [time, locationSearch]);

  return (
    <>
      {size?.width >= 1000 &&
        size?.width < 1200 &&
        adsConfig.hasAdsense &&
        adsConfig.adsenseUnits.postTopSmall && (
          <AdSense.Google {...adsConfig.adsenseUnits.postTopSmall} />
        )}

      {size?.width >= 1200 &&
        adsConfig.hasAdsense &&
        adsConfig.adsenseUnits.postTopSmall2 && (
          <AdSense.Google {...adsConfig.adsenseUnits.postTopSmall2} />
        )}

      <div className="margin-top-3 margin-bottom-3">
        <h2 className="text-center">Đang tải dữ liệu</h2>
        <div className="text-center">
          Vui lòng chờ trong <span className="text-important">{time}</span>{" "}
          giây...
        </div>
        {error && <div className="text-center margin-top">{error}</div>}
        {time <= 0 && (
          <div className="text-center margin-top">
            {error ? (
              <a className="btn btn-primary" href={downloadLink}>
                Quay lại
              </a>
            ) : (
              <a
                className="btn btn-primary"
                href={downloadLink}
                target={"_blank"}
                rel="noopener noreferrer"
              >
                Download
              </a>
            )}
          </div>
        )}
      </div>

      <div className="margin-top-3 margin-bottom-3">
        <blockquote>
          <p>
            📝 <strong>Chú ý:</strong>
          </p>
          <p>
            Trang web này dùng để chia sẻ các tài liệu{" "}
            <strong>
              hoàn toàn miễn phí và không lưu trữ bất kỳ tệp tin nào
            </strong>{" "}
            trên máy chủ.
          </p>
          <p>
            Vui lòng <strong>liên hệ với các nhà cung cấp nội dung</strong> để
            xóa nội dung bản quyền (nếu có).
          </p>
        </blockquote>
      </div>

      {adsConfig.hasAdsense && adsConfig.adsenseUnits?.postBottom && (
        <AdSense.Google {...adsConfig.adsenseUnits?.postBottom} />
      )}
    </>
  );
}

export default function DownloadPage({ location }) {
  const canonical = `${siteConfig.siteUrl}/download`;
  return (
    <MainLayout>
      <Helmet title={`Free Download - ${siteConfig.siteTitle}`}>
        <link rel="canonical" href={useSlash(canonical)} />
      </Helmet>
      <MainContainer
        content={<DownloadContent locationSearch={location.search} />}
        sidebarLeft={<SidebarLeft />}
        sidebarRight={<SidebarRightAds />}
      />
    </MainLayout>
  );
}
