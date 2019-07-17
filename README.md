[![Netlify Status](https://api.netlify.com/api/v1/badges/89b8cdfb-af7f-48d5-863f-64fbbdfe8986/deploy-status)](https://app.netlify.com/sites/gb-template/deploys) [![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT) [![Maintainability](https://api.codeclimate.com/v1/badges/b23277cf6232a88f59ec/maintainability)](https://codeclimate.com/github/completejavascript/gatsby-blog-template/maintainability)

# gatsby-blog-template

A GatsbyJS Blog Template for blogging purpose.

## Installation

Install this template (assuming [Gatsby](https://github.com/gatsbyjs/gatsby/) is installed and updated) by running from your CLI:

```bash
gatsby new YourProjectName https://github.com/completejavascript/gatsby-blog-template
npm run develop # or gatsby develop
```

Or you can fork the project, make your changes there and merge new features when needed.

Alternatively:

```bash
git clone https://github.com/completejavascript/gatsby-blog-template YourProjectName # Clone the project
cd YourProjectname
rm -rf .git # So you can have your own changes stored in VCS.
npm install # or yarn install
npm run develop # or gatsby develop 
```

Navigate to localhost:8000.

## Features

  * Posts and pages in Markdown
  * Tags and categories with pagination
  * Homepage as list of articles, support "Load more" function
  * Code highlight using [Prism.js](https://prismjs.com/) and Tomorrow Night theme
  * Disqus for comment
  * Style using [Shiba.CSS](https://github.com/completejavascript/shiba-css)

## Configuration

Edit the export object in `data/SiteConfig`:

```js
const config = {
  // Site info
  siteTitle: "Gatsby Blog Template", // Site title.
  siteTitleShort: "GB Template", // Short site title for homescreen (PWA). Preferably should be under 12 characters to prevent truncation.
  siteTitleAlt: "Gatsby Blog Template", // Alternative site title for SEO.
  siteLogo: "/logos/logo-1024x1024.png", // Logo used for SEO and manifest.
  siteUrl: "https://gb-template.netlify.com", // Domain of your website without pathPrefix.
  pathPrefix: "", // Prefixes all links. For cases when deployed to example.github.io/gatsby-advanced-starter/.
  siteDescription: "A GatsbyJS Blog Template for blogging purpose.", // Website description used for RSS feeds/meta description tag.
  siteRss: "/rss.xml", // Path to the RSS file.
  siteLang: "en",
  siteFBAppID: "399626517562189", // FB Application ID for using app insights
  googleAnalyticsID: "UA-96543695-7", // GA tracking ID.
  postDefaultCategoryID: "", // Default category for posts.
  // Common for tag, category pages and widget
  numberLatestPost: 8,
  postsPerPage: 6,
  // Use for post
  dateFromFormat: "YYYY-MM-DD HH:mm", // Date format used in the frontmatter.
  dateFormat: "MMMM Do, YYYY", // Date format for display.
  postTagged: "TAGGED",
  postInCategories: "POSTED IN",
  postOnDate: "Posted on",
  // Use for comment
  lazyLoadComments: true,
  disqusShortname: "gb-template", // Disqus shortname.
  btnLoadComments: "Load comments",
  // Use for home page
  numberLoadmore: 6,
  btnLoadmore: "Load more",
  homeHasLoadmore: true,
  homeHasThumbnail: true,
  homeHeader: "Home",
  // Use for page
  pathPrefixPagination: "/page", // Prefix path for pagination
  pageNotFoundTitle: "Page Not Found", // 
  pageNotFoundBtn: "Back to our site",
  pageNotFoundContent: "Looks like you've followed a broken link or entered a URL that doesn't exist on this site.",
  // Use for tag
  pathPrefixTag: "/tag", // Prefix path for tags
  tagHeader: "Posts tagged as", // use in header of tag-template page
  tagHasThumbnail: true,
  // Use for category
  pathPrefixCategory: "/category", // Prefix path for category
  categoryHeader: "Posts in category", // use in header of category-template page
  categoryHasThumbnail: true,
  // Use for widget
  categoryWidgetTitle: "Categories",
  tagWidgetTitle: "Tags",
  latestPostsWidgetTitle: "Latest posts",
  // Use for user info
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
      url: "https://www.facebook.com/completejavascript/", 
      iconClassName: "fab facebook-f" 
    },
    { 
      label: "Linkedin", 
      url: "https://www.linkedin.com/in/completejavascript/", 
      iconClassName: "fab linkedin-in"
    },
  ],
  // Use for navigation
  navTitle: "GB Template",
  navLinks: [
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
  ],
  // Use for footer
  socialLinks: [
    { 
      label: "Codepen", 
      url: "https://codepen.io/completejavascript/", 
      iconClassName: "fab codepen" 
    },
    { 
      label: "FreeCodeCamp", 
      url: "", // Ignore 
      iconClassName: "fab free-code-camp"
    },
    { 
      label: "GitHub",
      url: "https://github.com/completejavascript",
      iconClassName: "fab github"
    },
    { 
      label: "Facebook", 
      url: "https://www.facebook.com/completejavascript/", 
      iconClassName: "fab facebook-f"
    },
    { 
      label: "Linkedin", 
      url: "https://www.linkedin.com/in/completejavascript/", 
      iconClassName: "fab linkedin-in"
    },
    {
      label: "Twitter",
      url: "https://twitter.com/CmpltJavaScript",
      iconClassName: "fab twitter"
    },
    {
      label: "RSS",
      url: "https://gb-template.netlify.com/rss.xml",
      iconClassName: "fas rss"
    },
  ],
  footerLinks: [
    { label: "Home", url: "/" },
    { label: "About", url: "/about" },
    { label: "Contact", url: "/contact" },
    { label: "Terms of Use", url: "/terms" },
    { label: "Privacy Policy", url: "/privacy" },
    { label: "Sitemap", url: "https://gb-template.netlify.com/sitemap.xml" },
  ],
  copyright: "Copyright © 2019 Lam Pham. Unless otherwise noted, all code MIT license.",
  // Use for manifest
  themeColor: "#2196F3", // Used for setting manifest and progress theme colors.
  backgroundColor: "#FFF" // Used for setting manifest background color.
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
```

## Acknowledgements

This project is based on: 
  
  * [gatsby-advanced-starter](https://github.com/vagr9k/gatsby-advanced-starter/)
  * [taniarascia.com](https://github.com/taniarascia/taniarascia.com)
  * [Shiba.CSS](https://github.com/completejavascript/shiba-css)

## Author

  * [Lam Pham](http://about.phamvanlam.com)

## License

This project is open source and available under the [MIT License](https://github.com/completejavascript/gatsby-blog-template/blob/dev/LICENSE).