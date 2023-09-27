/** COMMON CONFIG **/
const siteConfig = {
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
  jsGroupUrl: "https://www.facebook.com/groups/HoiDapJavascriptVN",
  googleAnalyticsID: "UA-96543695-5", // GA tracking ID.
  copyright:
    "Copyright © 2017-2021 Lam Pham. Unless otherwise noted, all code MIT license.",
  // Use for manifest
  themeColor: "#2196F3", // Used for setting manifest and progress theme colors.
  backgroundColor: "#FFF", // Used for setting manifest background color.
  // Common for tag, category pages and widget
  numberLatestPost: 10,
  numberLatestFreebie: 10,
  numberLatestQuestion: 10,
  // 404
  pageNotFoundTitle: "Trang không tồn tại", //
  pageNotFoundBtn: "Quay về trang chủ",
  pageNotFoundContent:
    "Rất tiếc, trang bạn đang tìm kiếm không tồn tại hoặc liên kết đã bị thay thế.",
  // tags
  tagsHeader: "Các chủ đề",
};

const postConfig = {
  txtShare: "Chia sẻ: ",
  postInCategories: "",
  postTagged: "",
  postOnDate: "Cập nhật ngày",
  postDefaultCategoryID: "", // Default category for posts.
  dateFromFormat: "YYYY-MM-DDTHH:mm:ssZ", // Date format used in the frontmatter.
  dateLocale: "vi-VI",
};

const githubCommentConfig = {
  repo: "completejavascript/completejavascript-comments",
  theme: "github-light", // github-dark
  title: "Bình luận",
};

const authorConfig = {
  userEmail: "admin@completejavascript.com", // Email used for RSS feed's author segment
  userTwitter: "CmpltJavaScript", // Optionally renders "Follow Me" in the UserInfo segment.
  serviceEmail: "admin@completejavascript.com",
  freeLancerLink: "https://www.upwork.com/freelancers/~015218a85e68b18cf6",
};

const pathPrefixConfig = {
  home: "/",
  blog: "/blog",
  freebie: "/freebie",
  question: "/question",
  pagination: "/page",
  directory: "",
  category: "/category",
  tag: "/tag",
  tags: "/tags",
  search: "/search",
  javascript: "/javascript",
  react: "/react",
  service: "/dich-vu",
  itTricks: "/thu-thuat-it",
  itLife: "/cuoc-song-it",
  introduction: "/gioi-thieu",
  contact: "/lien-he",
  term: "/dieu-khoan-su-dung",
  policy: "/chinh-sach-bao-mat",
  ebooks: "/ebooks",
  sponsors: "/bai-viet-duoc-tai-tro",
};

const subDomainSites = {
  tools: "https://tools.completejavascript.com/",
  oneLOC: "https://1loc.completejavascript.com/",
  appIdeas: "https://app-ideas.completejavascript.com/",
  css: "https://css.completejavascript.com/",
};

const frontmatterTemplateConfig = {
  post: "post",
  page: "page",
  freebie: "freebie",
  directory: "directory",
  question: "question",
};

const sidebarConfig = {
  sidebarSticky: true,
  latestPostsTitle: "Bài viết mới cập nhật",
  latestFreebieTitle: "Freebie mới cập nhật",
  latestQuestionTitle: "Câu hỏi mới cập nhật",
  sameSeriesPostsTitle: "Bài viết cùng series",
  categoryTitle: "Chuyên mục",
  tagTitle: "Chủ đề",
  linksTitle: "Liên Kết",
};

/** TAG TEMPLATE CONFIG */
const tagTemplateConfig = {
  pathPrefix: pathPrefixConfig.tag,
  header: "",
  postListingHasThumbnail: true,
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

/** BLOG/FREEBIE/QUESTION TEMPLATE CONFIG **/
const blogTemplateConfig = {
  frontmatterTemplate: frontmatterTemplateConfig.post,
  pathPrefix: pathPrefixConfig.blog,
  header: "Blog",
  postListingHasThumbnail: true,
  sidebarLatestPostsTitle: sidebarConfig.latestPostsTitle,
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

const freebieTemplateConfig = {
  frontmatterTemplate: frontmatterTemplateConfig.freebie,
  pathPrefix: pathPrefixConfig.freebie,
  header: "Freebie",
  postListingHasThumbnail: true,
  sidebarLatestPostsTitle: sidebarConfig.latestFreebieTitle,
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

const questionTemplateConfig = {
  frontmatterTemplate: frontmatterTemplateConfig.question,
  pathPrefix: pathPrefixConfig.question,
  header: "Question",
  postListingHasThumbnail: true,
  sidebarLatestPostsTitle: sidebarConfig.latestQuestionTitle,
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

/** ADSENSE CONFIG */
const adsClient = "ca-pub-7260245524211186";
const adsConfig = {
  hasAdsense: true,
  adsenseUnits: {
    sidebarTop: {
      client: adsClient,
      slot: "6206746745",
      style: { display: "inline-block", width: "300px", height: "250px" },
      format: "",
    },
    sidebarMiddle: {
      client: adsClient,
      slot: "3126009259",
      style: { display: "inline-block", width: "300px", height: "250px" },
      format: "",
    },
    // sidebarMiddle2: {
    //   client: adsClient,
    //   slot: "6458569398",
    //   style: { display: "inline-block", width: "300px", height: "250px" },
    //   format: "",
    // },
    // sidebarMiddle3: {
    //   client: adsClient,
    //   slot: "7764616475",
    //   style: { display: "inline-block", width: "300px", height: "250px" },
    //   format: "",
    // },
    // sidebarMiddle4: {
    //   client: adsClient,
    //   slot: "4098185274",
    //   style: { display: "inline-block", width: "300px", height: "250px" },
    //   format: "",
    // },
    sidebarBottomRight: {
      client: adsClient,
      slot: "4957801764",
      style: { display: "inline-block", width: "300px", height: "250px" },
      format: "",
    },
    sidebarBottomLeft: {
      client: adsClient,
      slot: "1883935539",
      style: { display: "inline-block", width: "300px", height: "600px" },
      format: "",
    },
    postTopSmall: {
      client: adsClient,
      slot: "9521138000",
      style: {
        display: "block",
        width: "320px",
        height: "50px",
        margin: "0 auto",
      },
      format: "",
    },
    postTopSmall2: {
      client: adsClient,
      slot: "4608039900",
      style: {
        display: "block",
        width: "728px",
        height: "90px",
        margin: "0 auto",
      },
      format: "",
    },
    postTop: {
      client: adsClient,
      slot: "5797848941",
      style: { display: "block" },
      format: "auto",
      responsive: "true",
    },
    postBottom: {
      client: adsClient,
      slot: "5905660151",
      style: { display: "block" },
      format: "auto",
      responsive: "true",
    },
    matchedPostBottom: {
      client: adsClient,
      slot: "2249007243",
      style: { display: "block" },
      format: "autorelaxed",
      responsive: "true",
    },
  },
};

const navConfig = {
  navTitle: siteConfig.siteTitle,
  navLinks: [
    { label: "JavaScript", url: pathPrefixConfig.javascript },
    { label: "React", url: pathPrefixConfig.react },
    { label: "Question", url: pathPrefixConfig.question },
    { label: "Freebie", url: pathPrefixConfig.freebie },
    { label: "Blog", url: pathPrefixConfig.blog },
    { label: "eBooks", url: pathPrefixConfig.ebooks },
    { label: "Snippets", url: subDomainSites.oneLOC },
    { label: "Tools", url: subDomainSites.tools, isNew: true },
  ],
};

const footerConfig = {
  socialLinks: [
    {
      label: "Codepen",
      url: "https://codepen.io/completejavascript/",
      iconClassName: "icon-codepen",
    },
    // {
    //   label: "FreeCodeCamp",
    //   url: "https://www.freecodecamp.org/completejavascript", // Ignore
    //   iconClassName: "icon-free-code-camp",
    // },
    {
      label: "GitHub",
      url: "https://github.com/completejavascript",
      iconClassName: "icon-github",
    },
    {
      label: "Facebook",
      url: "https://www.facebook.com/completejavascript/",
      iconClassName: "icon-facebook-f",
    },
    {
      label: "Linkedin",
      url: "https://www.linkedin.com/in/completejavascript/",
      iconClassName: "icon-linkedin",
    },
    {
      label: "Twitter",
      url: "https://twitter.com/CmpltJavaScript",
      iconClassName: "icon-twitter",
    },
    {
      label: "RSS",
      url: "https://completejavascript.com/rss.xml",
      iconClassName: "icon-rss",
    },
  ],
  aboutLinks: [
    { label: "JavaScript", url: pathPrefixConfig.javascript },
    { label: "React", url: pathPrefixConfig.react },
    { label: "Thủ thuật IT", url: pathPrefixConfig.itTricks },
    { label: "Cuộc sống IT", url: pathPrefixConfig.itLife },
    { label: "Bài viết được tài trợ", url: pathPrefixConfig.sponsors },
    { label: "Question", url: pathPrefixConfig.question },
    { label: "Freebie", url: pathPrefixConfig.freebie },
    { label: "Blog", url: pathPrefixConfig.blog },
    { label: "eBooks", url: pathPrefixConfig.ebooks },
    { label: "Tags", url: pathPrefixConfig.tags },
  ],
  footerLinks: [
    { label: "Trang chủ", url: pathPrefixConfig.home },
    { label: "Giới thiệu", url: pathPrefixConfig.introduction },
    { label: "Liên hệ", url: pathPrefixConfig.contact },
    { label: "Dịch vụ", url: pathPrefixConfig.service },
    {
      label: "Hire me on Upwork",
      url: authorConfig.freeLancerLink,
    },
    { label: "Điều khoản", url: pathPrefixConfig.term },
    { label: "Chính sách", url: pathPrefixConfig.policy },
  ],
  completeSiteLinks: [
    { label: "Complete Tools", url: subDomainSites.tools },
    { label: "Complete App Ideas", url: subDomainSites.appIdeas },
    { label: "Complete 1LOC", url: subDomainSites.oneLOC },
    { label: "Complete CSS", url: subDomainSites.css },
  ],
  networkLinks: [
    { label: "Blog Thuật toán", url: "https://thuattoan.phamvanlam.com/" },
    { label: "Lam Dev Blog", url: "https://dev.phamvanlam.com/" },
    { label: "Lam Pham Blog", url: "https://phamvanlam.com/" },
    { label: "Portfolio", url: "http://about.phamvanlam.com/" },
    {
      label: "My Android Apps",
      url: "https://play.google.com/store/apps/developer?id=LamPV",
    },
    {
      label: "Cộng đồng JavaScript",
      url: "https://www.facebook.com/groups/HoiDapJavascriptVN",
    },
    {
      label: "Fanpage",
      url: "https://www.facebook.com/completejavascript/",
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
    {
      label: "Drum Machine",
      url: "https://github.com/completejavascript/drum-machine",
    },
    {
      label: "Pomodoro Clock",
      url: "https://github.com/completejavascript/pomodoro-clock",
    },
    {
      label: "Basic Calculator",
      url: "https://github.com/completejavascript/calculator",
    },
  ],
};

const searchConfig = {
  searchWidgetTitle: "Bạn đang tìm gì?",
  searchWidgetPlaceHolder: "Nhập từ khóa",
  searchEngineID: "partner-pub-7260245524211186:4187549499",
  hasSearch: true,
};

////////////////// Validate

// Make sure pathPrefix is empty if not needed
if (siteConfig.pathPrefix === "/" || siteConfig.pathPrefix === "") {
  siteConfig.pathPrefix = "";
} else {
  // Make sure pathPrefix only contains the first forward slash
  siteConfig.pathPrefix = `/${siteConfig.pathPrefix.replace(/^\/|\/$/g, "")}`;
}

// Make sure siteUrl doesn't have an ending forward slash
if (siteConfig.siteUrl.slice(-1) === "/") {
  siteConfig.siteUrl = siteConfig.siteUrl.slice(
    0,
    siteConfig.siteUrl.length - 1
  );
}

// Make sure siteRss has a starting forward slash
if (siteConfig.siteRss && siteConfig.siteRss[0] !== "/") {
  siteConfig.siteRss = `/${siteConfig.siteRss}`;
}

module.exports = {
  siteConfig,
  authorConfig,
  pathPrefixConfig,
  postConfig,
  githubCommentConfig,
  navConfig,
  footerConfig,
  searchConfig,
  frontmatterTemplateConfig,
  sidebarConfig,
  tagTemplateConfig,
  blogTemplateConfig,
  freebieTemplateConfig,
  questionTemplateConfig,
  adsClient,
  adsConfig,
};
