const config = {
  siteTitle: "Gatsby Blog Template", // Site title.
  siteTitleShort: "GB Template", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Gatsby Blog Template", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024x1024.png", // Logo used for SEO and manifest.
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
      label: "Email",
      url: "mailto:completejavascript.super@gmail.com",
      iconClassName: "far envelope"
    },
    {
      label: "Website",
      url: "https://completejavascript.com/",
      iconClassName: "fas globe"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/CmpltJavaScript",
      iconClassName: "fab twitter"
    },
    { 
      label: "Facebook", 
      link: "https://www.facebook.com/completejavascript/", 
      iconClassName: "fab facebook-f" 
    },
    { 
      label: "Linkedin", 
      link: "https://www.linkedin.com/in/completejavascript/", 
      iconClassName: "fab linkedin-in"
    },
  ],
  // Use for navigation
  navTitle: "GB Template",
  navLinks: [
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
  ],
  // Use for footer
  socialLinks: [
    { 
      label: "Codepen", 
      link: "https://codepen.io/completejavascript/", 
      iconClassName: "fab codepen" 
    },
    { 
      label: "FreeCodeCamp", 
      link: "", // Ignore 
      iconClassName: "fab free-code-camp"
    },
    { 
      label: "GitHub",
      url: "https://github.com/completejavascript",
      iconClassName: "fab github"
    },
    { 
      label: "Facebook", 
      link: "https://www.facebook.com/completejavascript/", 
      iconClassName: "fab facebook-f" 
    },
    { 
      label: "Linkedin", 
      link: "https://www.linkedin.com/in/completejavascript/", 
      iconClassName: "fab linkedin-in"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/CmpltJavaScript",
      iconClassName: "fab twitter"
    },
    {
      label: "RSS",
      url: "/rss.xml",
      iconClassName: "fas rss"
    },
  ],
  footerLinks: [
    { label: "Home", link: "/" },
    { label: "About", link: "/about" },
    { label: "Contact", link: "/contact" },
    { label: "Terms of Use", link: "/terms" },
    { label: "Privacy Policy", link: "/privacy" },
    { label: "Sitemap", link: "/sitemap.xml" },
  ],
  copyright: "Copyright © 2019 Lam Pham. All rights reserved.",
  // Use for manifest
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
