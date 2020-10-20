module.exports = {
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F7F6FE",
          100: "#EFEDFD",
          200: "#D8D1FA",
          300: "#C0B5F7",
          400: "#917EF0",
          500: "#6246EA",
          600: "#583FD3",
          700: "#3B2A8C",
          800: "#2C2069",
          900: "#1D1546",
        },
      },
      minHeight: {
        "(screen-16)": "calc(100vh - 4rem)",
      },
      maxHeight: {
        "(screen-16)": "calc(100vh - 4rem)",
      },
      spacing: {
        "(screen-16)": "calc(100vh - 4rem)",
      },
      inset: {
        16: "4rem",
      },
    },
    typography: (theme) => ({
      default: {
        css: {
          color: theme("colors.gray.800"),
          p: {
            color: theme("colors.gray.800"),
          },
          a: {
            color: theme("colors.primary.500"),
          },
          h2: {
            paddingBottom: theme("padding.2"),
            borderBottomWidth: theme("width.px"),
            borderBottomColor: theme("colors.gray.300"),
          },
          h3: {
            paddingBottom: theme("padding.2"),
            borderBottomWidth: theme("width.px"),
            borderBottomColor: theme("colors.gray.300"),
          },
          pre: {
            backgroundColor: theme("colors.primary.900"),
          },
          code: {
            color: theme("colors.primary.600"),
            fontWeight: theme("fontWeight.normal"),
            backgroundColor: theme("colors.primary.50"),
            padding: theme("padding.1"),
            borderColor: theme("colors.primary.200"),
            borderWidth: theme("width.px"),
            borderRadius: theme("borderRadius.default"),
          },
          "code::before": {
            content: "",
          },
          "code::after": {
            content: "",
          },
        },
      },
    }),
  },
  plugins: [require("@tailwindcss/typography")],
};
