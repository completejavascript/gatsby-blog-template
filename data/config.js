/** COMMON CONFIG **/
const pathPrefixConfig = {
  blog: "/blog",
  freebie: "/freebie",
  pagination: "/page",
};

/** BLOG/FREEBIE TEMPLATE CONFIG **/
const blogTemplateConfig = {
  frontmatterTemplate: "post",
  pathPrefix: pathPrefixConfig.blog,
  header: "Blog",
  postListingHasThumbnail: true,
  sidebarLatestPostsTitle: "Bài viết mới cập nhật",
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

const freebieTemplateConfig = {
  frontmatterTemplate: "freebie",
  pathPrefix: pathPrefixConfig.freebie,
  header: "Freebie",
  postListingHasThumbnail: true,
  sidebarLatestPostsTitle: "Freebie mới cập nhật",
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

module.exports = {
  blogTemplateConfig,
  freebieTemplateConfig,
  pathPrefixConfig,
};
