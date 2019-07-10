const path = require("path");
const slug = require("slug");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");
const slugify = text => slug(text).toLowerCase();

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
      slug = `/${slugify(node.frontmatter.title)}`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${slugify(node.frontmatter.slug)}`;
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
  }
};

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

  // Filter data
  const tagSet = new Set();
  const categorySet = new Set();
  const postEdges = [];
  const pageEdges = [];
  
  markdownQueryResult.data.allMarkdownRemark.edges.forEach(edge => {
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

    if (edge.node.frontmatter.template === "post") {
      postEdges.push(edge);
    }

    if (edge.node.frontmatter.template === "page") {
      pageEdges.push(edge);
    }
  });
  
  // Create tagList, categoryList
  const tagList = Array.from(tagSet);
  const categoryList = Array.from(categorySet);

  // Get latest posts
  const latestPostEdges = [];
  postEdges.forEach(edge => {
    if (latestPostEdges.length < 6) {
      latestPostEdges.push(edge)
    }
  });

  // Create post page
  postEdges.forEach((edge, index) => {
    const nextID = index + 1 < postEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : postEdges.length - 1;
    const nextEdge = postEdges[nextID];
    const prevEdge = postEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPage,
      context: {
        slug: edge.node.fields.slug,
        nexttitle: nextEdge.node.frontmatter.title,
        nextslug: nextEdge.node.fields.slug,
        prevtitle: prevEdge.node.frontmatter.title,
        prevslug: prevEdge.node.fields.slug,
        tagList,
        categoryList,
        latestPostEdges
      }
    });
  });

  // create page page
  pageEdges.forEach(edge => {
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
  });

  // create tag page
  tagList.forEach(tag => {
    createPage({
      path: `${siteConfig.pathPrefixTag}/${slugify(tag)}/`,
      component: tagPage,
      context: {
        tag,
        tagList,
        categoryList,
        latestPostEdges
      }
    });
  });

  // create category page
  categorySet.forEach(category => {
    createPage({
      path: `${siteConfig.pathPrefixCategory}/${slugify(category)}/`,
      component: categoryPage,
      context: {
        category,
        tagList,
        categoryList,
        latestPostEdges
      }
    });
  });
};
