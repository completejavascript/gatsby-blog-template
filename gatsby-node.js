const path = require("path");
const slug = require("slug");
const moment = require("moment");

const {
  siteConfig,
  postConfig,
  sidebarConfig,
  tagTemplateConfig,
  blogTemplateConfig,
  freebieTemplateConfig,
  questionTemplateConfig,
  frontmatterTemplateConfig,
  pathPrefixConfig,
} = require("./data/config");

const slugify = (text) => slug(text).toLowerCase();

const useSlash = (slug) => {
  if (!slug) return "/";
  if (slug.charAt(slug.length - 1) !== "/") return `${slug}/`;
  return slug;
};

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
      slug = `/${slugify(node.frontmatter.title)}/`;
    } else if (parsedFilePath.name !== "index" && parsedFilePath.dir !== "") {
      slug = `/${parsedFilePath.dir}/${parsedFilePath.name}/`;
    } else if (parsedFilePath.dir === "") {
      slug = `/${parsedFilePath.name}/`;
    } else {
      slug = `/${parsedFilePath.dir}/`;
    }

    if (Object.prototype.hasOwnProperty.call(node, "frontmatter")) {
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "slug"))
        slug = `/${slugify(node.frontmatter.slug)}/`;
      if (Object.prototype.hasOwnProperty.call(node.frontmatter, "date")) {
        const date = moment(node.frontmatter.date, postConfig.dateFromFormat);
        if (!date.isValid)
          console.warn(`WARNING: Invalid date.`, node.frontmatter);

        createNodeField({
          node,
          name: "date",
          value: date.toISOString(),
        });
      }
    }
    createNodeField({ node, name: "slug", value: useSlash(slug) });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const postPageTemplate = path.resolve("src/templates/post-template.jsx");
  const pagePageTemplate = path.resolve("src/templates/page-template.jsx");
  const tagPageTemplate = path.resolve("src/templates/tag-template.jsx");
  const blogPageTemplate = path.resolve("src/templates/blog-template.jsx");
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
          filter: { frontmatter: { template: { eq: "${frontmatterTemplateConfig.post}" } } }
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
          filter: { frontmatter: { template: { eq: "${frontmatterTemplateConfig.freebie}" } } }
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

  // Get latest question posts by the updated date
  const latestUpdatedQuestionQueryResult = await graphql(
    `
      {
        allMarkdownRemark(
          limit: ${siteConfig.numberLatestQuestion}
          filter: { frontmatter: { template: { eq: "${frontmatterTemplateConfig.question}" } } }
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

  const latestQuestionEdges =
    latestUpdatedQuestionQueryResult.data.allMarkdownRemark.edges;

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
  const postTagSet = new Set();
  const freebieTagSet = new Set();
  const questionTagSet = new Set();
  const postEdges = [];
  const pageEdges = [];
  const freebieEdges = [];
  const questionEdges = [];
  const directoryEdges = [];

  markdownQueryResult.data.allMarkdownRemark.edges.forEach((edge) => {
    if (
      edge.node.frontmatter.tags &&
      edge.node.frontmatter.template === frontmatterTemplateConfig.post
    ) {
      edge.node.frontmatter.tags.forEach((tag) => {
        postTagSet.add(tag);
      });
    }

    if (
      edge.node.frontmatter.tags &&
      edge.node.frontmatter.template === frontmatterTemplateConfig.freebie
    ) {
      edge.node.frontmatter.tags.forEach((tag) => {
        freebieTagSet.add(tag);
      });
    }

    if (
      edge.node.frontmatter.tags &&
      edge.node.frontmatter.template === frontmatterTemplateConfig.question
    ) {
      edge.node.frontmatter.tags.forEach((tag) => {
        questionTagSet.add(tag);
      });
    }

    if (edge.node.frontmatter.template === frontmatterTemplateConfig.post) {
      postEdges.push(edge);
    }

    if (edge.node.frontmatter.template === frontmatterTemplateConfig.page) {
      pageEdges.push(edge);
    }

    if (edge.node.frontmatter.template === frontmatterTemplateConfig.freebie) {
      freebieEdges.push(edge);
    }

    if (edge.node.frontmatter.template === frontmatterTemplateConfig.question) {
      questionEdges.push(edge);
    }

    if (
      edge.node.frontmatter.template === frontmatterTemplateConfig.directory
    ) {
      directoryEdges.push(edge);
    }
  });

  // Create tagList
  const postTagList = Array.from(postTagSet);
  const freebieTagList = Array.from(freebieTagSet);
  const questionTagList = Array.from(questionTagSet);

  // sort tagList by localCompare
  postTagList.sort((a, b) => a.localeCompare(b));
  freebieTagList.sort((a, b) => a.localeCompare(b));
  questionTagList.sort((a, b) => a.localeCompare(b));

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

    // Create post pages
    createPostPages({
      createPage,
      totalEdges: postEdges,
      latestEdges: latestPostEdges,
      latestEdgesTitle: sidebarConfig.latestPostsTitle,
      postTemplate: postPageTemplate,
    });
  }

  // Create freebie pages
  createPostPages({
    createPage,
    totalEdges: freebieEdges,
    latestEdges: latestFreebieEdges,
    latestEdgesTitle: sidebarConfig.latestFreebieTitle,
    postTemplate: postPageTemplate,
  });

  // Create question pages
  createPostPages({
    createPage,
    totalEdges: questionEdges,
    latestEdges: latestQuestionEdges,
    latestEdgesTitle: sidebarConfig.latestQuestionTitle,
    postTemplate: postPageTemplate,
  });

  // create page page
  pageEdges.forEach((edge) => {
    createPage({
      path: useSlash(edge.node.fields.slug),
      component: pagePageTemplate,
      context: {
        slug: useSlash(edge.node.fields.slug),
      },
    });
  });

  // create directory page
  directoryEdges.forEach((edge) => {
    createPage({
      path: useSlash(edge.node.fields.slug),
      component: directoryPageTemplate,
      context: {
        slug: useSlash(edge.node.fields.slug),
      },
    });
  });

  // create page contains list of all tags
  createPage({
    path: useSlash(pathPrefixConfig.tags),
    component: tagsPageTemplate,
    context: {
      postTagList,
      freebieTagList,
      questionTagList,
    },
  });

  // create tag pages for blog posts
  createTagPages({
    createPage,
    tagList: postTagList,
    latestEdges: latestPostEdges,
    totalEdges: postEdges,
    pageTemplate: tagPageTemplate,
    tagConfig: tagTemplateConfig,
    template: frontmatterTemplateConfig.post,
    latestEdgesTitle: sidebarConfig.latestPostsTitle,
  });

  // create tag pages for freebie posts
  createTagPages({
    createPage,
    tagList: freebieTagList,
    latestEdges: latestFreebieEdges,
    totalEdges: freebieEdges,
    pageTemplate: tagPageTemplate,
    tagConfig: tagTemplateConfig,
    template: frontmatterTemplateConfig.freebie,
    latestEdgesTitle: sidebarConfig.latestFreebieTitle,
  });

  // create tag pages for question posts
  createTagPages({
    createPage,
    tagList: questionTagList,
    latestEdges: latestQuestionEdges,
    totalEdges: questionEdges,
    pageTemplate: tagPageTemplate,
    tagConfig: tagTemplateConfig,
    template: frontmatterTemplateConfig.question,
    latestEdgesTitle: sidebarConfig.latestQuestionTitle,
  });

  // Create blog pages
  createBlogPages({
    createPage,
    latestEdges: latestPostEdges,
    totalEdges: postEdges,
    pageTemplate: blogPageTemplate,
    templateConfig: blogTemplateConfig,
  });

  // Create freebie pages
  createBlogPages({
    createPage,
    latestEdges: latestFreebieEdges,
    totalEdges: freebieEdges,
    pageTemplate: blogPageTemplate,
    templateConfig: freebieTemplateConfig,
  });

  // Create question pages
  createBlogPages({
    createPage,
    latestEdges: latestQuestionEdges,
    totalEdges: questionEdges,
    pageTemplate: blogPageTemplate,
    templateConfig: questionTemplateConfig,
  });
};

function createTagPages({
  createPage,
  tagList = [],
  latestEdges = [],
  totalEdges = [],
  pageTemplate,
  tagConfig,
  template,
  latestEdgesTitle,
}) {
  const itemsPerPage = tagConfig.paginationItemsPerPage;

  tagList.forEach((tag) => {
    const tagEdges = totalEdges.filter((edge) => {
      const tags = edge.node.frontmatter.tags;
      return tags && tags.includes(tag);
    });

    const numTagPages = Math.ceil(tagEdges.length / itemsPerPage);
    const basePath = `${tagConfig.pathPrefix}/${slugify(tag)}`;

    for (let i = 0; i < numTagPages; i++) {
      createPage({
        path: useSlash(
          i === 0
            ? `${basePath}`
            : `${basePath}${tagConfig.paginationPrefix}/${i + 1}`
        ),
        component: pageTemplate,
        context: {
          template,
          tag,
          limit: itemsPerPage,
          skip: i * itemsPerPage,
          currentPage: i + 1,
          totalPages: numTagPages,
          latestEdges,
          latestEdgesTitle,
          tagConfig,
        },
      });
    }
  });
}

function createBlogPages({
  createPage,
  latestEdges = [],
  totalEdges = [],
  pageTemplate,
  templateConfig,
}) {
  const itemsPerPage = templateConfig.paginationItemsPerPage;
  const paginationPrefix = templateConfig.paginationPrefix;
  const numBlogPages = Math.ceil(totalEdges.length / itemsPerPage);
  const basePath = templateConfig.pathPrefix;

  for (let i = 0; i < numBlogPages; i++) {
    createPage({
      path: useSlash(
        i === 0 ? `${basePath}` : `${basePath}${paginationPrefix}/${i + 1}`
      ),
      component: pageTemplate,
      context: {
        template: templateConfig.frontmatterTemplate,
        limit: itemsPerPage,
        skip: i * itemsPerPage,
        currentPage: i + 1,
        totalPages: numBlogPages,
        templateConfig,
        latestEdges,
      },
    });
  }
}

function createPostPages({
  createPage,
  totalEdges = [],
  latestEdges = [],
  latestEdgesTitle,
  postTemplate,
}) {
  totalEdges.forEach((edge, index) => {
    const nextID = index + 1 < totalEdges.length ? index + 1 : 0;
    const prevID = index - 1 >= 0 ? index - 1 : totalEdges.length - 1;
    const nextEdge = totalEdges[nextID];
    const prevEdge = totalEdges[prevID];

    createPage({
      path: useSlash(edge.node.fields.slug),
      component: postTemplate,
      context: {
        slug: useSlash(edge.node.fields.slug),
        series: edge.node.frontmatter.series || "__IGNORED__",
        nextTitle: nextEdge.node.frontmatter.title,
        nextSlug: useSlash(nextEdge.node.fields.slug),
        prevTitle: prevEdge.node.frontmatter.title,
        prevSlug: useSlash(prevEdge.node.fields.slug),
        latestEdges,
        latestEdgesTitle,
      },
    });
  });
}
