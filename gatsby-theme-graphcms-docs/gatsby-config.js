// const resolveConfig = require("tailwindcss/resolveConfig");
// const tailwindConfig = require("./tailwind.config.js");

const withThemeOptions = require("./theme-options");

// const resolvedTailwindConfig = resolveConfig(tailwindConfig);

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
      "gatsby-plugin-sharp",
      "gatsby-transformer-sharp",
      {
        resolve: "gatsby-plugin-mdx",
        options: {
          gatsbyRemarkPlugins: [
            {
              resolve: "gatsby-remark-autolink-headers",
              options: {
                className:
                  "flex items-center justify-center text-primary-300 -ml-6 absolute opacity-0",
              },
            },
            "gatsby-remark-copy-linked-files",
            {
              resolve: "gatsby-remark-images",
              options: {
                maxWidth: 760,
                linkImagesToOriginal: false,
                quality: 100,
                withWebp: true,
              },
            },
          ],
        },
      },
      {
        resolve: "gatsby-plugin-postcss",
        options: {
          // postCssPlugins: [require("tailwindcss")(resolvedTailwindConfig)],
          postCssPlugins: [require("tailwindcss")],
        },
      },
    ],
  };
};
