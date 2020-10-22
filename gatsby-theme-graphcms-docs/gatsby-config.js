const resolveConfig = require("tailwindcss/resolveConfig");
const tailwindConfig = require("./tailwind.config.js");

const withThemeOptions = require("./theme-options");

const resolvedTailwindConfig = resolveConfig(tailwindConfig);

module.exports = (themeOptions) => {
  const { contentDir } = withThemeOptions(themeOptions);

  return {
    plugins: [
      {
        resolve: "gatsby-plugin-use-dark-mode",
        options: {
          classNameDark: "dark",
        },
      },
      {
        resolve: "gatsby-source-filesystem",
        options: {
          name: "content",
          path: contentDir,
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
          postCssPlugins: [require("tailwindcss")(resolvedTailwindConfig)],
        },
      },
    ],
  };
};
