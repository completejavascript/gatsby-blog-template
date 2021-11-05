const path = require("path");
const slug = require("slug");
const moment = require("moment");
const siteConfig = require("./data/SiteConfig");
const slugify = (text) => slug(text).toLowerCase();

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
          value: date.toISOString(),
        });
      }
    }
    createNodeField({ node, name: "slug", value: slug });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPageTemplate = path.resolve("src/templates/post-template.jsx");
  const pagePageTemplate = path.resolve("src/templates/page-template.jsx");
  const tagPageTemplate = path.resolve("src/templates/tag-template.jsx");
  const blogPageTemplate = path.resolve("src/templates/blog-template.jsx");
  const freebiePageTemplate = path.resolve(
    "src/templates/freebie-template.jsx"
  );
  const directoryPageTemplate = path.resolve(
    "src/templates/directory-template.jsx"
  );
  const tagsPageTemplate = path.resolve("src/templates/tags-template.jsx");

  // Get latest blog posts by the updated date
  const latestUpdatedPostQueryResult = await graphql(
    `
      {
        allMarkdownRemark(
          limit: ${siteConfig.numberLatestPost}
          filter: { frontmatter: { template: { eq: "post" } } }
          sort: { fields: [frontmatter___update], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                directory
                template
                title
                shortTitle
                tags
                date
                update
              }
            }
          }
        }
      }
    `
  );

  const latestPostEdges =
    latestUpdatedPostQueryResult.data.allMarkdownRemark.edges;

  // Get latest freebie posts by the updated date
  const latestUpdatedFreebieQueryResult = await graphql(
    `
      {
        allMarkdownRemark(
          limit: ${siteConfig.numberLatestFreebie}
          filter: { frontmatter: { template: { eq: "freebie" } } }
          sort: { fields: [frontmatter___update], order: DESC }
        ) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                directory
                template
                title
                shortTitle
                tags
                date
                update
              }
            }
          }
        }
      }
    `
  );

  const latestFreebieEdges =
    latestUpdatedFreebieQueryResult.data.allMarkdownRemark.edges;

  // Get all markdown remarks
  const markdownQueryResult = await graphql(
    `
      {
        allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
          edges {
            node {
              fields {
                slug
              }
              frontmatter {
                directory
                template
                title
                shortTitle
                tags
                date
                update
                series
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
  const postEdges = [];
  const pageEdges = [];
  const freebieEdges = [];
  const directoryEdges = [];

  markdownQueryResult.data.allMarkdownRemark.edges.forEach((edge) => {
    if (
      edge.node.frontmatter.tags &&
      edge.node.frontmatter.template === "post"
    ) {
      edge.node.frontmatter.tags.forEach((tag) => {
        tagSet.add(tag);
      });
    }

    if (edge.node.frontmatter.template === "post") {
      postEdges.push(edge);
    }

    if (edge.node.frontmatter.template === "page") {
      pageEdges.push(edge);
    }

    if (edge.node.frontmatter.template === "freebie") {
      freebieEdges.push(edge);
    }

    if (edge.node.frontmatter.template === "directory") {
      directoryEdges.push(edge);
    }
  });

  // Create tagList
  const tagList = Array.from(tagSet);

  // // Get latest posts
  // const latestPostEdges = [];
  // postEdges.forEach((edge) => {
  //   if (latestPostEdges.length < siteConfig.numberLatestPost) {
  //     latestPostEdges.push(edge);
  //   }
  // });

  // // Get latest freebie posts
  // const latestFreebieEdges = [];
  // freebieEdges.forEach((edge) => {
  //   if (latestFreebieEdges.length < siteConfig.numberLatestFreebie) {
  //     latestFreebieEdges.push(edge);
  //   }
  // });

  // Map posts by directory
  const mapPostsByDirectory = {};
  postEdges.forEach((edge) => {
    const directory = edge?.node?.frontmatter?.directory;
    if (directory) {
      if (!mapPostsByDirectory[directory]) {
        mapPostsByDirectory[directory] = [];
      }

      mapPostsByDirectory[directory].push(edge);
    }
  });

  // Create post by directory to be sure next/prev posts are same directory
  for (let directory in mapPostsByDirectory) {
    const postEdges = mapPostsByDirectory[directory];

    // Create post page
    postEdges.forEach((edge, index) => {
      const nextID = index + 1 < postEdges.length ? index + 1 : 0;
      const prevID = index - 1 >= 0 ? index - 1 : postEdges.length - 1;
      const nextEdge = postEdges[nextID];
      const prevEdge = postEdges[prevID];

      createPage({
        path: edge.node.fields.slug,
        component: postPageTemplate,
        context: {
          slug: edge.node.fields.slug,
          template: edge.node.frontmatter.template,
          tags: edge.node.frontmatter.tags || [],
          series: edge.node.frontmatter.series || "__IGNORED__",
          nextTitle: nextEdge.node.frontmatter.title,
          nextSlug: nextEdge.node.fields.slug,
          prevTitle: prevEdge.node.frontmatter.title,
          prevSlug: prevEdge.node.fields.slug,
          tagList,
          latestPostEdges,
          latestFreebieEdges,
        },
      });
    });
  }

  // Create freebie page
  freebieEdges.forEach((edge, index) => {
    const nextID = index + 1 < freebieEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : freebieEdges.length - 1;
    const nextEdge = freebieEdges[nextID];
    const prevEdge = freebieEdges[prevID];

    createPage({
      path: edge.node.fields.slug,
      component: postPageTemplate,
      context: {
        slug: edge.node.fields.slug,
        template: edge.node.frontmatter.template,
        tags: edge.node.frontmatter.tags || [],
        series: edge.node.frontmatter.series || "__IGNORED__",
        nextTitle: nextEdge.node.frontmatter.title,
        nextSlug: nextEdge.node.fields.slug,
        prevTitle: prevEdge.node.frontmatter.title,
        prevSlug: prevEdge.node.fields.slug,
        tagList,
        latestPostEdges,
        latestFreebieEdges,
      },
    });
  });

  // create page page
  pageEdges.forEach((edge) => {
    createPage({
      path: edge.node.fields.slug,
      component: pagePageTemplate,
      context: {
        slug: edge.node.fields.slug,
        tagList,
        latestPostEdges,
        latestFreebieEdges,
      },
    });
  });

  // create directory page
  directoryEdges.forEach((edge) => {
    createPage({
      path: edge.node.fields.slug,
      component: directoryPageTemplate,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  // create page contains list of all tags
  createPage({
    path: siteConfig.pathPrefixTags,
    component: tagsPageTemplate,
    context: {
      tagList,
    },
  });

  // common config for pagination
  const postsPerPage = siteConfig.postsPerPage;
  const pathPrefixPagination = siteConfig.pathPrefixPagination;

  // create tag page
  tagList.forEach((tag) => {
    const tagPosts = postEdges.filter((edge) => {
      const tags = edge.node.frontmatter.tags;
      return tags && tags.includes(tag);
    });

    const numTagPages = Math.ceil(tagPosts.length / postsPerPage);
    const basePath = `${siteConfig.pathPrefixTag}/${slugify(tag)}`;

    for (let i = 0; i < numTagPages; i++) {
      createPage({
        path:
          i === 0
            ? `${basePath}`
            : `${basePath}${pathPrefixPagination}/${i + 1}`,
        component: tagPageTemplate,
        context: {
          tag,
          tagList,
          latestPostEdges,
          latestFreebieEdges,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          totalPages: numTagPages,
        },
      });
    }
  });

  // Create blog page
  {
    const numBlogPages = Math.ceil(postEdges.length / postsPerPage);
    const basePath = siteConfig.pathPrefixBlog;

    for (let i = 0; i < numBlogPages; i++) {
      createPage({
        path:
          i === 0
            ? `${basePath}`
            : `${basePath}${pathPrefixPagination}/${i + 1}`,
        component: blogPageTemplate,
        context: {
          tagList,
          latestPostEdges,
          latestFreebieEdges,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          totalPages: numBlogPages,
        },
      });
    }
  }

  // Create freebie page
  {
    const numFreebiePages = Math.ceil(freebieEdges.length / postsPerPage);
    const basePath = siteConfig.pathPrefixFreebie;

    for (let i = 0; i < numFreebiePages; i++) {
      createPage({
        path:
          i === 0
            ? `${basePath}`
            : `${basePath}${pathPrefixPagination}/${i + 1}`,
        component: freebiePageTemplate,
        context: {
          tagList,
          latestPostEdges,
          latestFreebieEdges,
          limit: postsPerPage,
          skip: i * postsPerPage,
          currentPage: i + 1,
          totalPages: numFreebiePages,
        },
      });
    }
  }
};
