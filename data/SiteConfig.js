const config = {
  siteTitle: "Gatsby Blog Template", // Site title.
  siteTitleShort: "GB Template", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Gatsby Blog Template", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://completejavascript.github.io", // Domain of your website without pathPrefix.
  pathPrefix: "/gatsby-blog-template", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "A GatsbyJS Blog Template for blogging purpose.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteFBAppID: "399626517562189", // FB Application ID for using app insights
  googleAnalyticsID: "UA-96543695-7", // GA tracking ID.
  disqusShortname: "gb-template", // Disqus shortname.
  postDefaultCategoryID: "", // Default category for posts.
  dateFromFormat: "YYYY-MM-DD", // Date format used in the frontmatter.
  dateFormat: "DD/MM/YYYY", // Date format for display.
  userName: "Lam Pham", // Username to display in the author segment.
  userEmail: "completejavascript.super@gmail.com", // Email used for RSS feed's author segment
  userTwitter: "CmpltJavaScript", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Hanoi, Vietnam", // User location to display in the author segment.
  userAvatar: "https://www.gravatar.com/avatar/42fd3d526fde1ef76d5002e4ebd303e9.jpg?s=300", // User avatar to display in the author segment.
  userDescription:
    "Software Engineer, Web Developer, JavaScript Lover & Blogger @completejavascript.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "GitHub",
      url: "https://github.com/completejavascript",
      iconClassName: "fa fa-github"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/CmpltJavaScript",
      iconClassName: "fa fa-twitter"
    },
    {
      label: "Email",
      url: "mailto:completejavascript.super@gmail.com",
      iconClassName: "fa fa-envelope"
    }
  ],
  copyright: "Copyright © 2019. Lam Pham", // Copyright string for the footer of the website and RSS feed.
  themeColor: "#2196F3", // Used for setting manifest and progress theme colors.
  backgroundColor: "#FFF" // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/") {
  config.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  config.pathPrefix = `/${config.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (config.siteUrl.substr(-1) === "/")
  config.siteUrl = config.siteUrl.slice(0, -1);

// Make sure siteRss has a starting forward slash
if (config.siteRss && config.siteRss[0] !== "/")
  config.siteRss = `/${config.siteRss}`;

module.exports = config;
