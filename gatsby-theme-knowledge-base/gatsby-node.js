const path = require("path");
const fs = require("fs");
const { createFilePath } = require(`gatsby-source-filesystem`);

const withThemeOptions = require("./theme-options");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const { data, errors } = await graphql(`
    fragment Page on File {
      id
      childMdx {
        fields {
          slug
        }
        frontmatter {
          title
          disableTOC
        }
        body
        headings {
          depth
          value
        }
      }
    }

    {
      allFile(
        filter: { extension: { in: ["md", "mdx"] } }
        sort: { fields: childMdx___frontmatter___position }
      ) {
        edges {
          node {
            ...Page
          }
          next {
            ...Page
          }
          previous {
            ...Page
          }
        }
      }
    }
  `);

  if (errors) throw errors;

  data.allFile.edges.forEach(({ node, next, previous }) =>
    createPage({
      component: require.resolve("./src/templates/doc-page.js"),
      context: {
        node,
        next,
        previous,
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

exports.createSchemaCustomization = ({ actions: { createTypes } }) => {
  createTypes(`
    type MdxFrontmatter {
      title: String!
      disableTOC: Boolean
    }
 `);
};
