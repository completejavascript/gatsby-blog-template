import React, { Component } from "react";
import { getSrc } from "gatsby-plugin-image";
import Helmet from "react-helmet";
import urljoin from "url-join";
import { siteConfig, authorConfig } from "../../../data/config";

class SEO extends Component {
  render() {
    const { postNode, postPath, postSEO } = this.props;
    let title;
    let description;
    let keywords;
    let image = "";
    let postURL;
    if (postSEO) {
      const postMeta = postNode.frontmatter;
      ({ title } = postMeta);
      description = postMeta.description
        ? postMeta.description
        : postNode.excerpt;

      keywords = postMeta.keywords;

      if (postMeta.cover) {
        image = getSrc(postMeta.cover);
      }

      postURL = urljoin(siteConfig.siteUrl, siteConfig.pathPrefix, postPath);
    } else {
      title = siteConfig.siteTitle;
      description = siteConfig.siteDescription;
      image = siteConfig.siteLogo;
    }

    image = urljoin(siteConfig.siteUrl, siteConfig.pathPrefix, image);
    const blogURL = urljoin(siteConfig.siteUrl, siteConfig.pathPrefix);
    const schemaOrgJSONLD = [
      {
        "@context": "http://schema.org",
        "@type": "WebSite",
        url: blogURL,
        name: title,
        alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : "",
      },
    ];
    if (postSEO) {
      schemaOrgJSONLD.push(
        {
          "@context": "http://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              item: {
                "@id": postURL,
                name: title,
                image,
              },
            },
          ],
        },
        {
          "@context": "http://schema.org",
          "@type": "BlogPosting",
          url: blogURL,
          name: title,
          alternateName: siteConfig.siteTitleAlt ? siteConfig.siteTitleAlt : "",
          headline: title,
          image: {
            "@type": "ImageObject",
            url: image,
          },
          description,
        }
      );
    }
    return (
      <Helmet>
        {/* General tags */}
        <meta name="description" content={description} />
        <meta name="image" content={image} />
        {keywords && <meta name="keywords" content={keywords} />}

        {/* Schema.org tags */}
        <script type="application/ld+json">
          {JSON.stringify(schemaOrgJSONLD)}
        </script>

        {/* OpenGraph tags */}
        <meta property="og:url" content={postSEO ? postURL : blogURL} />
        {postSEO ? <meta property="og:type" content="article" /> : null}
        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:image" content={image} />
        <meta
          property="fb:app_id"
          content={siteConfig.siteFBAppID ? siteConfig.siteFBAppID : ""}
        />

        {/* Twitter Card tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:creator"
          content={authorConfig.userTwitter ? authorConfig.userTwitter : ""}
        />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={image} />
      </Helmet>
    );
  }
}

export default SEO;
