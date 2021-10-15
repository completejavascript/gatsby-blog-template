import config from "../../data/SiteConfig";
import slug from "slug";

export const slugify = (text) => slug(text).toLowerCase();

export const isInteralLink = (link) => link && link[0] === "/";

export const formatDate = (date) =>
  new Date(date).toLocaleDateString(config.dateLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export const getTagPath = (tag) => `${config.pathPrefixTag}/${slugify(tag)}`;

export const getCategoryPath = (category) =>
  `${config.pathPrefixCategory}/${slugify(category)}`;

export const getPostList = (postEdges) =>
  postEdges.map((postEdge) => ({
    path: postEdge.node.fields.slug,
    tags: postEdge.node.frontmatter.tags,
    categories: postEdge.node.frontmatter.categories,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    update: postEdge.node.frontmatter.update,
    date: postEdge.node.fields.date,
    slug: postEdge.node.fields.slug,
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

export const getRandom = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

export const getRandomExclude = (min, max, currentValue, numRetry = 10) => {
  let randomValue = currentValue;

  for (let i = 0; i < numRetry; i++) {
    randomValue = Math.floor(Math.random() * (max - min)) + min;
    if (randomValue != currentValue) {
      return randomValue;
    }
  }

  return (randomValue + 1) % max;
};

export const getCurrentYear = () => new Date().getFullYear();
