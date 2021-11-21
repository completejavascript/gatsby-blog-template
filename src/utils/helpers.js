import config from "../../data/SiteConfig";
import slug from "slug";

export const useSlash = (slug) => {
  if (!slug) return "/";
  if (slug.charAt(slug.length - 1) !== "/") return `${slug}/`;
  return slug;
};

export const slugify = (text) => slug(text || "").toLowerCase();

export const isInteralLink = (link) => link && link[0] === "/";

export const formatDate = (date) =>
  new Date(date).toLocaleDateString(config.dateLocale, {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

export const getTagPath = (tag) =>
  useSlash(`${config.pathPrefixTag}/${slugify(tag)}`);

export const getCategoryPath = (category) =>
  useSlash(`${config.pathPrefixCategory}/${slugify(category)}`);

export const getDirectoryPath = (directory) =>
  useSlash(`${config.pathPrefixDirectory}/${slugify(directory)}`);

export const getPostList = (postEdges) =>
  postEdges.map((postEdge) => ({
    path: useSlash(postEdge.node.fields.slug),
    tags: postEdge.node.frontmatter.tags,
    cover: postEdge.node.frontmatter.cover,
    title: postEdge.node.frontmatter.title,
    shortTitle: postEdge.node.frontmatter.shortTitle,
    update: postEdge.node.frontmatter.update,
    date: postEdge.node.fields.date,
    slug: useSlash(postEdge.node.fields.slug),
    excerpt: postEdge.node.excerpt,
    timeToRead: postEdge.node.timeToRead,
  }));

export const getTagList = (postList) => {
  const tagSet = new Set();

  postList.forEach(({ tags }) => {
    if (tags) {
      tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }
  });

  return {
    tagList: Array.from(tagSet),
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
