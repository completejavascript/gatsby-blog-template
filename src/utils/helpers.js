import config from "../../data/SiteConfig";
import moment from "moment";
import slug from "slug";

export const useSlash = (slug) => {
  if (!slug) return "/";
  if (slug.charAt(slug.length - 1) !== "/") return `${slug}/`;
  return slug;
};

export const slugify = (text) => slug(text).toLowerCase();

export const isInteralLink = (link) => link && link[0] === "/";

export const formatDate = (date) => moment(date).format(config.dateFormat);

export const getTagPath = (tag) =>
  useSlash(`${config.pathPrefixTag}/${slugify(tag)}`);

export const getTagPathWithoutTrailingSlash = (tag) =>
  `${config.pathPrefixTag}/${slugify(tag)}`;

export const getCategoryPath = (category) =>
  useSlash(`${config.pathPrefixCategory}/${slugify(category)}`);

export const getCategoryPathWithoutTrailingSlash = (category) =>
  `${config.pathPrefixCategory}/${slugify(category)}`;

export const getPostList = (postEdges) =>
  postEdges.map((postEdge) => ({
    path: useSlash(postEdge.node.fields.slug),
    tags: postEdge.node.frontmatter.tags,
    categories: postEdge.node.frontmatter.categories,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    date: postEdge.node.fields.date,
    slug: useSlash(postEdge.node.fields.slug),
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
  }));

export const getTagCategoryList = (postList) => {
  const tagSet = new Set();
  const categorySet = new Set();

  postList.forEach(({ categories, tags }) => {
    if (categories) {
      categories.forEach((category) => {
        categorySet.add(category);
      });
    }

    if (tags) {
      tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }
  });

  return {
    tagList: Array.from(tagSet),
    categoryList: Array.from(categorySet),
  };
};
