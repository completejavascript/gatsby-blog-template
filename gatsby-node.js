const path = require("path");
const kebabCase = require("lodash.kebabcase");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");

const postNodes = []

function addSiblingNodes(createNodeField) {
  postNodes.sort(({ frontmatter: { date: date1 } }, { frontmatter: { date: date2 } }) => {
    const dateA = moment(date1, siteConfig.dateFromFormat);
    const dateB = moment(date2, siteConfig.dateFromFormat);

    if (dateA.isBefore(dateB)) return 1;
    if (dateB.isBefore(dateA)) return -1;

    return 0;
  });

  for (let i = 0; i < postNodes.length; i += 1) {
    const nextID = i + 1 < postNodes.length ? i + 1 : 0;
    const prevID = i - 1 >= 0 ? i - 1 : postNodes.length - 1;
    const currNode = postNodes[i];
    const nextNode = postNodes[nextID];
    const prevNode = postNodes[prevID];

    createNodeField({
      node: currNode,
      name: 'nextTitle',
      value: nextNode.frontmatter.title,
    });

    createNodeField({
      node: currNode,
      name: 'nextSlug',
      value: nextNode.fields.slug,
    });

    createNodeField({
      node: currNode,
      name: 'prevTitle',
      value: prevNode.frontmatter.title,
    });

    createNodeField({
      node: currNode,
      name: 'prevSlug',
      value: prevNode.fields.slug,
    });
  }
}

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  let slug;
  if (node.internal.type === "MarkdownRemark") {
    const fileNode = getNode(node.parent);
    const parsedFilePath = path.parse(fileNode.relativePath);
    if (
      Object.prototype.hasOwnProperty.call(node, "frontmatter") &&
      Object.prototype.hasOwnProperty.call(node.frontmatter, "title")
    ) {
      slug = `/${kebabCase(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${kebabCase(node.frontmatter.slug)}`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, siteConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString()
        });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
    postNodes.push(node);
  }
};

exports.setFieldsOnGraphQLNodeType = ({ type, actions }) => {
  const { name } = type;
  const { createNodeField } = actions;
  if (name === 'MarkdownRemark') {
    addSiblingNodes(createNodeField);
  }
}

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPage = path.resolve("src/templates/post.jsx");
  const pagePage = path.resolve("src/templates/page.jsx");
  const tagPage = path.resolve("src/templates/tag.jsx");
  const categoryPage = path.resolve("src/templates/category.jsx");

  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                template
                title
                tags
                categories
                date
              }
            }
          }
        }
      }
    `
  );

  if (markdownQueryResult.errors) {
    console.error(markdownQueryResult.errors);
    throw markdownQueryResult.errors;
  }

  // Create tagList, categoryList
  const tagSet = new Set();
  const categorySet = new Set();

  const postsEdges = markdownQueryResult.data.allMarkdownRemark.edges;

  postsEdges.forEach(edge => {
    if (edge.node.frontmatter.tags) {
      edge.node.frontmatter.tags.forEach(tag => {
        tagSet.add(tag);
      });
    }

    if (edge.node.frontmatter.categories) {
      edge.node.frontmatter.categories.forEach(category => {
        categorySet.add(category);
      });
    }
  });

  const tagList = Array.from(tagSet);
  const categoryList = Array.from(categorySet);

  // Get latest posts
  const latestPostEdges = [];
  postsEdges.forEach(edge => {
    if (edge.node.frontmatter.template === "post" && latestPostEdges.length < 6) {
      latestPostEdges.push(edge)
    }
  });

  // Create post page
  postsEdges.forEach(edge => {
    if (edge.node.frontmatter.template === "post") {
      createPage({
        path: edge.node.fields.slug,
        component: postPage,
        context: {
          slug: edge.node.fields.slug,
          tagList,
          categoryList,
          latestPostEdges
        }
      });
    }
    
    if (edge.node.frontmatter.template === "page") {
      createPage({
        path: edge.node.fields.slug,
        component: pagePage,
        context: {
          slug: edge.node.fields.slug,
          tagList,
          categoryList,
          latestPostEdges
        }
      });
    }
  });

  // create tag page
  tagList.forEach(tag => {
    createPage({
      path: `${siteConfig.pathPrefixTag}/${kebabCase(tag)}/`,
      component: tagPage,
      context: {
        tag,
        tagList,
        categoryList
      }
    });
  });

  // create category page
  categorySet.forEach(category => {
    createPage({
      path: `${siteConfig.pathPrefixCategory}/${kebabCase(category)}/`,
      component: categoryPage,
      context: {
        category,
        tagList,
        categoryList
      }
    });
  });
};
