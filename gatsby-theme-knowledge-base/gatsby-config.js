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
      "gatsby-plugin-mdx",
    ],
  };
};
