const config = {
  // Site info
  siteTitle: "Bilgi Mozaiği", // Site title.
  siteTitleShort: "Bilgi Mozaiği", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Merak dolu yolculuğa çıkın! Bilgi Mozaiği, renkli içeriklerle dolu eğlenceli ve bilgilendirici bir platform.", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024x1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://bilgimozaigi.netlify.com", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "Keşfetmeye hazır mısınız? Bilgi Mozaiği, merakla dolu bir yolculuğa çıkmak için kapılarını açıyor. Farklı türlerden, ilgi alanlarından ve bakış açılarından beslenen renkli içeriklerle dolu bu platformda, bilgi ve ilham dolu bir deneyim sizi bekliyor. Gelin, birlikte çeşitliliğin ve keşfin büyülü dünyasına dalalım!", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteLang: "tr",
  siteFBAppID: "", // FB Application ID for using app insights
  googleAnalyticsID: "", // GA tracking ID.
  postDefaultCategoryID: "", // Default category for posts.
  // Common for tag, category pages and widget
  numberLatestPost: 8,
  postsPerPage: 6,
  // Use for post
  dateFromFormat: "YYYY-MM-DDTHH:mm:ssZ", // Date format used in the frontmatter.
  dateFormat: "MMMM Do, YYYY", // Date format for display.
  postTagged: "",
  postInCategories: "",
  postOnDate: "Posted on",
  // Use for comment
  lazyLoadComments: true,
  disqusShortname: "gb-template", // Disqus shortname.
  btnLoadComments: "Load comments",
  // Use for home page
  numberLoadmore: 6,
  btnLoadmore: "Devamını Oku",
  homeHasLoadmore: false,
  homeHasThumbnail: true,
  homeHeader: "Ana Sayfa",
  homeMoreArticles: "Daha fazla makale",
  // Use for page
  pathPrefixPagination: "/page", // Prefix path for pagination
  pageNotFoundTitle: "Sayfa Bulunamadı!", //
  pageNotFoundBtn: "Siteye geri dön",
  pageNotFoundContent:
    "Bozuk bir bağlantıyı takip ettiğiniz veya bu sitede bulunmayan bir URL girdiğiniz anlaşılıyor.",
  // Use for tag
  pathPrefixTag: "/tag", // Prefix path for tags
  tagHeader: "olarak etiketlenen gönderiler", // use in header of tag-template page
  tagHasThumbnail: true,
  // Use for category
  pathPrefixCategory: "/category", // Prefix path for category
  categoryHeader: "Kategorideki gönderiler", // use in header of category-template page
  categoryHasThumbnail: true,
  // Use for blog
  pathPrefixBlog: "/blog", // Prefix path for blog
  blogHeader: "Blog", // use in header of category-template page
  blogHasThumbnail: true,
  // Use for widget
  categoryWidgetTitle: "Kategoriler",
  tagWidgetTitle: "Etiketler",
  latestPostsWidgetTitle: "Son Gönderiler",
  linksWidgetTitle: "Linkler",
  // Use for Google custom search
  searchWidgetTitle: "Ne arıyorsun?",
  searchWidgetPlaceHolder: "Anahtar kelimeyi girin",
  searchEngineID: "008548374781244864787:9ybvtnkbt7o",
  hasSearch: true,
  // Use for links widget
  sidebarSticky: true,
  sidebarLinks: [
    {
      label: "Complete JavaScript",
      url: "https://completejavascript.com/",
    },
    {
      label: "Discord Botum",
      url: "https://deprembilgi.xyz/",
    },
    {
      label: "Eklenecek",
      url: "",
    },
  ],
  // Use for user info
  userName: "Mustafa Eren", // Username to display in the author segment.
  userEmail: "dexarcontact@gmail.com", // Email used for RSS feed"s author segment
  userTwitter: "CmpltJavaScript", // Optionally renders "Follow Me" in the UserInfo segment.
  userLocation: "Turkey", // User location to display in the author segment.
  userAvatar:
    "https://www.gravatar.com/avatar/42fd3d526fde1ef76d5002e4ebd303e9.jpg?s=300", // User avatar to display in the author segment.
  userDescription:
    "Software Engineer, Web Developer, JavaScript Lover & Blogger @completejavascript.", // User description to display in the author segment.
  // Links to social profiles/projects you want to display in the author segment/navigation bar.
  userLinks: [
    {
      label: "E-posta",
      url: "mailto:dexarcontact@gmail.com",
      iconClassName: "far envelope",
    },
    {
      label: "Website",
      url: "",
      iconClassName: "fas globe",
    },
    {
      label: "Twitter",
      url: "",
      iconClassName: "fab twitter",
    },
    {
      label: "Facebook",
      url: "",
      iconClassName: "fab facebook-f",
    },
    {
      label: "Linkedin",
      url: "",
      iconClassName: "fab linkedin-in",
    },
  ],
  // Use for navigation
  navTitle: "Bilgi Mozaiği",
  navLinks: [
    { label: "Hakkında", url: "/about" },
    { label: "İletişim", url: "/contact" },
  ],
  // Use for footer
  socialLinks: [
    {
      label: "Codepen",
      url: "",
      iconClassName: "fab codepen",
    },
    {
      label: "FreeCodeCamp",
      url: "", // Ignore
      iconClassName: "fab free-code-camp",
    },
    {
      label: "GitHub",
      url: "",
      iconClassName: "fab github",
    },
    {
      label: "Facebook",
      url: "",
      iconClassName: "fab facebook-f",
    },
    {
      label: "Linkedin",
      url: "",
      iconClassName: "fab linkedin-in",
    },
    {
      label: "Twitter",
      url: "",
      iconClassName: "fab twitter",
    },
    {
      label: "RSS",
      url: "https://bilgimozaigi.netlify.com/rss.xml",
      iconClassName: "fas rss",
    },
  ],
  footerLinks: [
    { label: "Ana Sayfa", url: "/" },
    { label: "Hakkında", url: "/about" },
    { label: "İletişim", url: "/contact" },
    { label: "Kullanım Koşulları", url: "/terms" },
    { label: "Gizlilik Politikası", url: "/privacy" },
    { label: "Site Haritası", url: "https://bilgimozaigi.netlify.com/sitemap.xml" },
  ],
  copyright:
    "Copyright © 2019-2023 Lam Pham. Unless otherwise noted, all code MIT license.",
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
