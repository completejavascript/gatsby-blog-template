const config = {
  // Site info
  siteTitle: "Complete JavaScript", // Site title.
  siteTitleShort: "Complete JavaScript", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Complete JavaScript", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024x1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://completejavascript.com", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription:
    "Chia sẻ về JavaScript, lập trình JavaScript từ cơ bản đến nâng cao.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteLang: "vi",
  siteFBAppID: "531084654023054", // FB Application ID for using app insights
  googleAnalyticsID: "UA-96543695-5", // GA tracking ID.
  postDefaultCategoryID: "", // Default category for posts.
  // Common for tag, category pages and widget
  numberLatestPost: 6,
  postsPerPage: 12,
  // Use for post
  dateFromFormat: "YYYY-MM-DDTHH:mm:ssZ", // Date format used in the frontmatter.
  dateFormat: "MMMM Do, YYYY", // Date format for display.
  postTagged: "",
  postInCategories: "",
  postOnDate: "Posted on",
  // Use for comment
  githubCommentRepo: "completejavascript/completejavascript-comments",
  githubCommentTheme: "github-light", // github-dark
  githubCommentTitle: "Bình luận",
  /** DEPRECATED: not use disqus anymore */
  lazyLoadComments: true,
  disqusShortname: "complete-javascript", // Disqus shortname.
  btnLoadComments: "Xem bình luận",
  /** DEPRECATED: not use disqus anymore */
  // Use for home page
  numberLoadmore: 6,
  btnLoadmore: "Xem thêm",
  homeHasLoadmore: false,
  homeHasThumbnail: true,
  homeHeader: "Trang chủ",
  homeMoreArticles: "Xem thêm",
  blogHeader: "Blog",
  jsGroupUrl: "https://www.facebook.com/groups/HoiDapJavascriptVN",
  blogPageUrl: "/blog",
  serviceEmail: "completejavascript.super@gmail.com",
  freeLancerLink: "https://www.upwork.com/freelancers/~015218a85e68b18cf6",
  // Use for page
  pathPrefixPagination: "/page", // Prefix path for pagination
  pageNotFoundTitle: "Trang không tồn tại", //
  pageNotFoundBtn: "Quay về trang chủ",
  pageNotFoundContent:
    "Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc liên kết đã bị thay thế.",
  // Use for tag
  pathPrefixTag: "/tag", // Prefix path for tags
  tagHeader: "Chủ đề", // use in header of tag-template page
  tagHasThumbnail: true,
  // Use for category
  pathPrefixCategory: "/category", // Prefix path for category
  categoryHeader: "Chuyên mục", // use in header of category-template page
  categoryHasThumbnail: true,
  // Use for blog
  pathPrefixBlog: "/blog", // Prefix path for blog
  blogHeader: "Blog", // use in header of category-template page
  blogHasThumbnail: true,
  // Use for widget
  categoryWidgetTitle: "Chuyên mục",
  tagWidgetTitle: "Chủ đề",
  latestPostsWidgetTitle: "Bài viết mới nhất",
  linksWidgetTitle: "Liên Kết",
  // Use for Google custom search
  searchWidgetTitle: "Bạn đang tìm gì?",
  searchWidgetPlaceHolder: "Nhập từ khóa",
  searchEngineID: "partner-pub-7260245524211186:4187549499",
  hasSearch: true,
  // Set up for google adsense
  hasAdsense: true,
  adsenseUnits: {
    sidebarTop: {
      client: "ca-pub-7260245524211186",
      slot: "6206746745",
      style: { display: "inline-block", width: "300px", height: "250px" },
      format: "",
    },
    sidebarMiddle: {
      client: "ca-pub-7260245524211186",
      slot: "3126009259",
      style: { display: "inline-block", width: "300px", height: "250px" },
      format: "",
    },
    sidebarBottom: {
      client: "ca-pub-7260245524211186",
      slot: "4957801764",
      style: { display: "inline-block", width: "300px", height: "250px" },
      format: "",
    },
    postTop: {
      client: "ca-pub-7260245524211186",
      slot: "5797848941",
      style: { display: "block" },
      format: "auto",
      responsive: "true",
    },
    postBottom: {
      client: "ca-pub-7260245524211186",
      slot: "5905660151",
      style: { display: "block" },
      format: "auto",
      responsive: "true",
    },
    matchedPostBottom: {
      client: "ca-pub-7260245524211186",
      slot: "2249007243",
      style: { display: "block" },
      format: "autorelaxed",
      responsive: "true",
    },
  },
  // Use for links widget
  sidebarSticky: true,
  sidebarLinks: [
    {
      label: "Blog Thuật toán",
      url: "https://thuattoan.phamvanlam.com/",
    },
    {
      label: "Lam Dev Blog",
      url: "https://dev.phamvanlam.com/",
    },
    {
      label: "Lam Pham Blog",
      url: "https://phamvanlam.com/",
    },
    {
      label: "Portfolio",
      url: "http://about.phamvanlam.com/",
    },
  ],
  // Use for user info
  userName: "Lam Pham", // Username to display in the author segment.
  userEmail: "completejavascript.super@gmail.com", // Email used for RSS feed's author segment
  userTwitter: "CmpltJavaScript", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Hanoi, Vietnam", // User location to display in the author segment.
  userAvatar:
    "https://www.gravatar.com/avatar/42fd3d526fde1ef76d5002e4ebd303e9.jpg?s=300", // User avatar to display in the author segment.
  userDescription:
    "Software Engineer, Web Developer, JavaScript Lover & Blogger @completejavascript.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "Email",
      url: "mailto:completejavascript.super@gmail.com",
      iconClassName: "far envelope",
    },
    {
      label: "Website",
      url: "https://completejavascript.com/",
      iconClassName: "fas globe",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/CmpltJavaScript",
      iconClassName: "fab twitter",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/completejavascript/",
      iconClassName: "fab facebook-f",
    },
    {
      label: "Linkedin",
      url: "https://www.linkedin.com/in/completejavascript/",
      iconClassName: "fab linkedin-in",
    },
  ],
  // Use for navigation
  navTitle: "Complete JavaScript",
  navLinks: [
    { label: "Blog", url: "/blog" },
    { label: "Wiki", url: "/wiki" },
    { label: "Giới thiệu", url: "/gioi-thieu" },
    { label: "Liên hệ", url: "/lien-he" },
  ],
  // Use for footer
  socialLinks: [
    {
      label: "Codepen",
      url: "https://codepen.io/completejavascript/",
      iconClassName: "fab codepen",
    },
    {
      label: "FreeCodeCamp",
      url: "https://www.freecodecamp.org/completejavascript", // Ignore
      iconClassName: "fab free-code-camp",
    },
    {
      label: "GitHub",
      url: "https://github.com/completejavascript",
      iconClassName: "fab github",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/completejavascript/",
      iconClassName: "fab facebook-f",
    },
    {
      label: "Linkedin",
      url: "https://www.linkedin.com/in/completejavascript/",
      iconClassName: "fab linkedin-in",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/CmpltJavaScript",
      iconClassName: "fab twitter",
    },
    {
      label: "RSS",
      url: "https://completejavascript.com/rss.xml",
      iconClassName: "fas rss",
    },
  ],
  footerLinks: [
    { label: "Trang chủ", url: "/" },
    { label: "Giới thiệu", url: "/gioi-thieu" },
    { label: "Liên hệ", url: "/lien-he" },
    { label: "Điều khoản sử dụng", url: "/dieu-khoan-su-dung" },
    { label: "Chính sách bảo mật", url: "/chinh-sach-bao-mat" },
    { label: "Sitemap", url: "https://completejavascript.com/sitemap.xml" },
  ],
  networkLinks: [
    { label: "Blog Thuật toán", url: "https://thuattoan.phamvanlam.com/" },
    { label: "Lam Dev Blog", url: "https://dev.phamvanlam.com/" },
    { label: "Lam Pham Blog", url: "https://phamvanlam.com/" },
    { label: "Amazing CSS", url: "https://amazingcss.com/" },
    { label: "Portfolio", url: "http://about.phamvanlam.com/" },
    {
      label: "Cộng đồng JavaScript",
      url: "https://www.facebook.com/groups/HoiDapJavascriptVN",
    },
  ],
  projectLinks: [
    {
      label: "Gatsby Blog Template",
      url: "https://github.com/completejavascript/gatsby-blog-template",
    },
    {
      label: "Shiba.css",
      url: "https://github.com/completejavascript/shiba-css",
    },
    {
      label: "Tic Tac Toe",
      url: "https://github.com/completejavascript/tic-tac-toe",
    },
    {
      label: "React App Template",
      url: "https://github.com/completejavascript/react-app-template",
    },
    {
      label: "Markdown Editor",
      url: "https://github.com/completejavascript/markdown-editor",
    },
    {
      label: "NinePatch.js",
      url: "https://github.com/completejavascript/nine-patch-js",
    },
  ],
  copyright:
    "Copyright © 2017-2021 Lam Pham. Unless otherwise noted, all code MIT license.",
  // Use for manifest
  themeColor: "#2196F3", // Used for setting manifest and progress theme colors.
  backgroundColor: "#FFF", // Used for setting manifest background color.
};

// Validate

// Make sure pathPrefix is empty if not needed
if (config.pathPrefix === "/" || config.pathPrefix === "") {
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
