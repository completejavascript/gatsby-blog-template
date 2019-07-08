import config from "../../data/SiteConfig";
import moment from "moment";
import { kebabCase } from "lodash";

export const isInteralLink = link => link && link[0] === "/";
export const formatDate = date => moment(date).format(config.dateFormat);
export const getTagPath = tag => `${config.pathPrefixTag}/${kebabCase(tag)}/`;
export const getCategoryPath = category => `${config.pathPrefixCategory}/${kebabCase(category)}/`;
export const getPostList = postEdges => postEdges.map(postEdge => ({
  path: postEdge.node.fields.slug,
  tags: postEdge.node.frontmatter.tags,
  category: postEdge.node.frontmatter.category,
  cover: postEdge.node.frontmatter.cover,
  title: postEdge.node.frontmatter.title,
  date: postEdge.node.fields.date,
  slug: postEdge.node.fields.slug,
  excerpt: postEdge.node.excerpt,
  timeToRead: postEdge.node.timeToRead
}));

export const getTagCategoryList = postList => {
  const tagSet = new Set();
  const categorySet = new Set();
  
  postList.forEach(({ category, tags }) => {
    if (category) {
      categorySet.add(category);
    }

    if (tags) {
      tags.forEach(tag => {
        tagSet.add(tag);
      });
    }
  });

  return { 
    tagList: Array.from(tagSet),
    categoryList: Array.from(categorySet)
  }
}