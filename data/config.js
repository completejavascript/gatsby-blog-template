/** COMMON CONFIG **/
const pathPrefixConfig = {
  blog: "/blog",
  freebie: "/freebie",
  pagination: "/page",
  tag: "/tag",
};

const frontmatterTemplateConfig = {
  post: "post",
  page: "page",
  freebie: "freebie",
  directory: "directory",
};

const latestEdgesTitleConfig = {
  post: "Bài viết mới cập nhật",
  freebie: "Freebie mới cập nhật",
};

/** TAG TEMPLATE CONFIG */
const tagTemplateConfig = {
  pathPrefix: pathPrefixConfig.tag,
  header: "Chủ đề",
  postListingHasThumbnail: true,
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

/** BLOG/FREEBIE TEMPLATE CONFIG **/
const blogTemplateConfig = {
  frontmatterTemplate: frontmatterTemplateConfig.post,
  pathPrefix: pathPrefixConfig.blog,
  header: "Blog",
  postListingHasThumbnail: true,
  sidebarLatestPostsTitle: latestEdgesTitleConfig.post,
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

const freebieTemplateConfig = {
  frontmatterTemplate: frontmatterTemplateConfig.freebie,
  pathPrefix: pathPrefixConfig.freebie,
  header: "Freebie",
  postListingHasThumbnail: true,
  sidebarLatestPostsTitle: latestEdgesTitleConfig.freebie,
  paginationPrefix: pathPrefixConfig.pagination,
  paginationItemsPerPage: 10,
};

module.exports = {
  pathPrefixConfig,
  frontmatterTemplateConfig,
  latestEdgesTitleConfig,
  tagTemplateConfig,
  blogTemplateConfig,
  freebieTemplateConfig,
};
