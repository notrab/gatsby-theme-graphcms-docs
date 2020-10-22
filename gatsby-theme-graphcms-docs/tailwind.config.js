module.exports = {
  dark: "class",
  experimental: {
    darkModeVariant: true,
  },
  future: {
    removeDeprecatedGapUtilities: true,
    purgeLayersByDefault: true,
    defaultLineHeights: true,
    standardFontWeights: true,
  },
  theme: {
    extend: {
      colors: {
        // primary: {
        //   50: "#F7F6FE",
        //   100: "#EFEDFD",
        //   200: "#D8D1FA",
        //   300: "#C0B5F7",
        //   400: "#917EF0",
        //   500: "#6246EA",
        //   600: "#583FD3",
        //   700: "#3B2A8C",
        //   800: "#2C2069",
        //   900: "#1D1546",
        // },
        // primary: {
        //   50: "#f8f9fb",
        //   100: "#EFEDFD",
        //   200: "#D8D1FA",
        //   300: "#C0B5F7",
        //   400: "#F87FA5",
        //   500: "#6246ea",
        //   600: "#583FD3",
        //   700: "#3B2A8C",
        //   800: "#0d1b44",
        //   900: "#090e24",
        // },
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
          color: theme("colors.gray.700"),
          p: {
            color: theme("colors.gray.700"),
          },
          thead: {
            color: theme("colors.gray.900"),
            borderBottomColor: theme("colors.gray.300"),
          },
          "tbody tr": {
            borderBottomColor: theme("colors.gray.300"),
          },
          a: {
            color: theme("colors.primary.500"),
          },
          h1: {
            fontWeight: theme("fontWeight.medium"),
            color: theme("colors.gray.900"),
          },
          h2: {
            fontWeight: theme("fontWeight.medium"),
            paddingBottom: theme("padding.2"),
            borderBottomWidth: theme("width.px"),
            borderBottomColor: theme("colors.gray.300"),
          },
          h3: {
            fontWeight: theme("fontWeight.medium"),
            paddingBottom: theme("padding.2"),
            borderBottomWidth: theme("width.px"),
            borderBottomColor: theme("colors.gray.300"),
          },
          h4: {
            fontWeight: theme("fontWeight.medium"),
            paddingBottom: theme("padding.2"),
            borderBottomWidth: theme("width.px"),
            borderBottomColor: theme("colors.gray.300"),
          },
          pre: {
            backgroundColor: theme("colors.gray.900"),
          },
          code: {
            color: theme("colors.primary.500"),
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
          blockquote: {
            color: theme("colors.gray.500"),
            fontWeight: theme("fontWeight.normal"),
            fontStyle: theme("fontStyle.not-italic"),
          },
          "blockquote p:first-of-type::before": {
            content: "",
          },
          "blockquote p:last-of-type::after": {
            content: "",
          },
          "ol > li::before": {
            color: theme("colors.primary.500"),
          },
          "ul > li::before": {
            backgroundColor: theme("colors.primary.500"),
          },
        },
      },
      dark: {
        css: {
          color: theme("colors.gray.700"),
          p: {
            color: theme("colors.gray.700"),
          },
          h1: {
            color: theme("colors.white"),
          },
          h2: {
            color: theme("colors.white"),
          },
          h3: {
            color: theme("colors.white"),
          },
          h4: {
            color: theme("colors.white"),
          },
        },
      },
    }),
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/ui")],
  variants: {
    textColor: ["responsive", "hover", "focus", "dark"],
  },
};
