import React from "react";
import Helmet from "react-helmet";
import MainLayout from "../layout/index";
import config from "../../data/SiteConfig";
import "./index.scss";

const ServiceSection = () => {
  const serviceList = [
    {
      title: "Landing Page",
      description:
        "Phát triển các Landing Page về bản thân - portfolio, giới thiệu công ty, quảng bá sản phẩm...",
    },
    {
      title: "ReactJS",
      description:
        "Các ứng dụng web dùng ReactJS với các React Component tự viết theo yêu cầu hoặc thư viện Ant Design, Material-UI.",
    },
    {
      title: "GatsbyJS",
      description:
        "Xây dựng blog, website công ty, thương mại điện tử,... với sự hỗ trợ của rất nhiều theme, plugin và deploy đơn giản.",
    },
    {
      title: "Ứng dụng desktop Qt/QML",
      description:
        "Xây dựng các ứng dụng Desktop hiệu năng cao, đa nền tảng trên Windows, macOS và Linux.",
    },
    {
      title: "Thư viện đa nền tảng Qt/C++",
      description:
        "Thư viện cross-platform dễ dàng sử dụng trên Windows, macOS, Linux, Android (jni/Kotlin) và iOS (Swift/Objective-C).",
    },
    {
      title: "Android Application",
      description:
        "Phát triển ứng dụng Android trên điện thoại thông minh sử dụng Kotlin/Java hoặc React Native.",
    },
  ];

  return (
    <section className="service-section background-color-white">
      <div className="container padding padding-top-3 padding-bottom-3">
        <div className="text-center padding-bottom-3 padding-top-3">
          <h2 className="section-title margin-bottom-1">Dịch vụ</h2>
          <p className="section-subtitle margin-top-half">
            Ngoài công việc full-time và viết blog ra thì mình còn làm{" "}
            <b>freelancer</b>.
          </p>
        </div>
        <div className="service-container">
          {serviceList.map((service) => (
            <div className="service-item" key={service.title}>
              <h5 className="text-center color-blue">{service.title}</h5>
              <p>{service.description}</p>
            </div>
          ))}
        </div>
        <p className="text-center margin-top-3">
          🤝 Nếu có công việc phù hợp muốn hợp tác, bạn có thể liên hệ trực tiếp
          với mình qua{" "}
          <b>
            <a
              href={`mailto:${config.serviceEmail}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Email
            </a>
          </b>{" "}
          hoặc hợp tác với mình trên{" "}
          <b>
            <a
              href={config.freeLancerLink}
              target="_blank"
              rel="noopener noreferrer"
            >
              Upwork
            </a>
          </b>{" "}
          nhé! 🏆
        </p>
      </div>
    </section>
  );
};

function Service() {
  const canonical = `${config.siteUrl}/dich-vu`;
  return (
    <MainLayout hasFooter={true} hideOnScroll={true} adaptiveBoxShadow={true}>
      <Helmet title={`Dịch vụ - ${config.siteTitle}`}>
        <link rel="canonical" href={canonical} />
      </Helmet>
      <main className="index-container">
        <ServiceSection />
      </main>
    </MainLayout>
  );
}

export default Service;
