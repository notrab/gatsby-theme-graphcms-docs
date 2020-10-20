const withThemeOptions = require("./theme-options");

module.exports = (themeOptions) => {
  const { docsDir } = withThemeOptions(themeOptions);

  return {
    plugins: [
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "docs",
          path: docsDir,
        },
      },
      {
        resolve: "gatsby-plugin-mdx",
        options: {
          gatsbyRemarkPlugins: ["gatsby-remark-autolink-headers"],
        },
      },
      {
        resolve: "gatsby-plugin-postcss",
        options: {
          postCssPlugins: [require("tailwindcss")],
        },
      },
    ],
  };
};
