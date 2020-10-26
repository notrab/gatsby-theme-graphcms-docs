const path = require("path");
const fs = require("fs");
const { createFilePath } = require(`gatsby-source-filesystem`);

const withThemeOptions = require("./theme-options");

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const {
    data: { docs, integrations, quickstarts },
    errors,
  } = await graphql(`
    fragment DocPage on File {
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
      docs: allFile(
        filter: {
          extension: { in: ["md", "mdx"] }
          childMdx: { frontmatter: { hidden: { ne: true } } }
          relativeDirectory: { regex: "/^docs/" }
        }
        sort: { fields: childMdx___frontmatter___position }
      ) {
        nodes {
          ...DocPage
        }
      }
      integrations: allFile(
        filter: {
          extension: { in: ["md", "mdx"] }
          childMdx: { frontmatter: { hidden: { ne: true } } }
          relativeDirectory: { regex: "/^integrations/" }
        }
        sort: { fields: childMdx___frontmatter___position }
      ) {
        nodes {
          ...DocPage
        }
      }
      quickstarts: allFile(
        filter: {
          extension: { in: ["md", "mdx"] }
          childMdx: { frontmatter: { hidden: { ne: true } } }
          relativeDirectory: { regex: "/^quickstarts/" }
        }
        sort: { fields: childMdx___frontmatter___position }
      ) {
        nodes {
          ...DocPage
        }
      }
    }
  `);

  if (errors) throw errors;

  docs.nodes.forEach((node) =>
    createPage({
      component: require.resolve("./src/templates/doc-page.js"),
      context: {
        node,
        relativeDirectory: `/^docs/`,
      },
      path: node.childMdx.fields.slug,
    })
  );

  integrations.nodes.forEach((node) =>
    createPage({
      component: require.resolve("./src/templates/doc-page.js"),
      context: {
        node,
        relativeDirectory: `/^integrations/`,
      },
      path: node.childMdx.fields.slug,
    })
  );

  quickstarts.nodes.forEach((node) =>
    createPage({
      component: require.resolve("./src/templates/doc-page.js"),
      context: {
        node,
        relativeDirectory: `/^quickstarts/`,
      },
      path: node.childMdx.fields.slug,
    })
  );

  // hiddenFiles.nodes.forEach((node) =>
  //   createPage({
  //     component: require.resolve("./src/templates/doc-page.js"),
  //     context: {
  //       node,
  //       navItems,
  //     },
  //     path: node.childMdx.fields.slug,
  //   })
  // );
};

exports.onPreBootstrap = ({ store, reporter }, themeOptions) => {
  const { contentDir } = withThemeOptions(themeOptions);
  const { program } = store.getState();

  const contentSrcPath = path.join(program.directory, contentDir);

  if (!fs.existsSync(contentSrcPath)) {
    reporter.log(`Creating directory ${contentSrcPath}`);
    fs.mkdirSync(contentDir);
  }
};

exports.onCreateNode = async ({ node, getNode, actions }, themeOptions) => {
  if (node.internal.type === "Mdx") {
    const { createNodeField } = actions;

    const slug = createFilePath({ node, getNode, trailingSlash: false });

    createNodeField({
      node,
      name: "slug",
      value: slug,
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
    }

    type MdxFields @infer {
      slug: String!
    }
 `);
};
