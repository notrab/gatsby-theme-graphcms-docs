const path = require("path");
const fs = require("fs");
const { createFilePath } = require(`gatsby-source-filesystem`);

const withThemeOptions = require("./theme-options");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const {
    data: { publicFiles, hiddenFiles, navItems },
    errors,
  } = await graphql(`
    fragment Page on File {
      id
      childMdx {
        fields {
          slug
        }
        frontmatter {
          title
          disableTOC
          disablePagination
        }
        body
        headings {
          depth
          value
        }
      }
    }

    fragment PaginationPage on File {
      childMdx {
        fields {
          slug
        }
        frontmatter {
          title
        }
      }
    }

    {
      publicFiles: allFile(
        filter: {
          extension: { in: ["md", "mdx"] }
          childMdx: { frontmatter: { hidden: { ne: true } } }
        }
        sort: { fields: childMdx___frontmatter___position, order: ASC }
      ) {
        edges {
          node {
            ...Page
          }
          next {
            ...PaginationPage
          }
          previous {
            ...PaginationPage
          }
        }
      }
      hiddenFiles: allFile(
        filter: {
          extension: { in: ["md", "mdx"] }
          childMdx: { frontmatter: { hidden: { eq: true } } }
        }
      ) {
        nodes {
          ...Page
        }
      }
      navItems: allFile(
        filter: {
          extension: { in: ["md", "mdx"] }
          childMdx: { frontmatter: { hidden: { ne: true } } }
        }
        sort: { fields: childMdx___frontmatter___position, order: ASC }
      ) {
        group(field: relativeDirectory) {
          title: fieldValue
          totalCount
          nodes {
            id
            childMdx {
              fields {
                slug
              }
              frontmatter {
                title
                disableTOC
              }
            }
          }
        }
      }
    }
  `);

  if (errors) throw errors;

  publicFiles.edges.forEach(({ node, next, previous }) =>
    createPage({
      component: require.resolve("./src/templates/doc-page.js"),
      context: {
        node,
        next,
        previous,
        navItems,
      },
      path: node.childMdx.fields.slug,
    })
  );

  hiddenFiles.nodes.forEach((node) =>
    createPage({
      component: require.resolve("./src/templates/doc-page.js"),
      context: {
        node,
        navItems,
      },
      path: node.childMdx.fields.slug,
    })
  );
};

exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
  const { docsDir } = withThemeOptions(themeOptions);
  const { program } = store.getState();

  const docsSrcPath = path.join(program.directory, docsDir);

  if (!fs.existsSync(docsSrcPath)) {
    reporter.log(`Creating directory ${docsSrcPath}`);
    fs.mkdirSync(docsDir);
  }
};

exports.onCreateNode = async ({ node, getNode, actions }, themeOptions) => {
  if (node.internal.type === "Mdx") {
    const { createNodeField } = actions;

    const { basePath } = withThemeOptions(themeOptions);

    const slug = createFilePath({ node, getNode, trailingSlash: false });

    createNodeField({
      node,
      name: "slug",
      value: `${basePath}${slug}`,
    });
  }
};

exports.createSchemaCustomization = ({ actions }) => {
  const { createTypes } = actions;

  createTypes(`
    type Mdx implements Node @infer {
      frontmatter: MdxFrontmatter
      fields: MdxFields
    }

    type MdxFrontmatter @infer {
      title: String!
      hidden: Boolean
      position: Int
      disableTOC: Boolean
      disablePagination: Boolean
    }

    type MdxFields @infer {
      slug: String!
    }
 `);
};
