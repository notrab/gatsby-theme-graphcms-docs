const { fontFamily } = require("tailwindcss/defaultTheme");

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
      fontFamily: {
        sans: ["Inter var", ...fontFamily.sans],
      },
      colors: {
        primary: {
          50: "#F8F9FB",
          100: "#DADEED",
          150: "#F0F2F7",
          200: "#F5F4FF",
          300: "#626E99",
          400: "#101B42",
          500: "#6663FD",
          600: "#583FD3",
          700: "#090E24",
          800: "#090E24",
          900: "#0F0F13",
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
          color: theme("colors.gray.600"),
          p: {
            color: theme("colors.gray.600"),
          },
          thead: {
            color: theme("colors.gray.900"),
            borderBottomColor: theme("colors.primary.150"),
          },
          "tbody tr": {
            borderBottomColor: theme("colors.primary.150"),
          },
          a: {
            color: theme("colors.primary.500"),
            textDecoration: theme("textDecoration.no-underline"),
            "&:hover": {
              color: theme("colors.primary.800"),
            },
          },
          h1: {
            fontWeight: theme("fontWeight.medium"),
            color: theme("colors.gray.900"),
          },
          h2: {
            fontWeight: theme("fontWeight.medium"),
            paddingBottom: theme("padding.2"),
            borderBottomWidth: theme("width.px"),
            borderBottomColor: theme("colors.primary.150"),
            display: "flex",
            alignItems: "center",
            "&:hover a.before": {
              opacity: 100,
            },
          },
          h3: {
            fontWeight: theme("fontWeight.medium"),
            paddingBottom: theme("padding.2"),
            borderBottomWidth: theme("width.px"),
            borderBottomColor: theme("colors.primary.150"),
            display: "flex",
            alignItems: "center",
            "&:hover a.before": {
              opacity: 100,
            },
          },
          h4: {
            fontWeight: theme("fontWeight.medium"),
            paddingBottom: theme("padding.2"),
            borderBottomWidth: theme("width.px"),
            borderBottomColor: theme("colors.primary.150"),
            display: "flex",
            alignItems: "center",
            "&:hover a.before": {
              opacity: 100,
            },
          },
          pre: {
            backgroundColor: theme("colors.primary.400"),
          },
          code: {
            color: theme("colors.primary.500"),
            fontWeight: theme("fontWeight.normal"),
            backgroundColor: theme("colors.primary.50"),
            padding: theme("padding.1"),
            borderRadius: theme("borderRadius.default"),
            borderWidth: 0,
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
            color: theme("colors.gray.300"),
          },
          "ul > li::before": {
            backgroundColor: theme("colors.gray.300"),
          },
        },
      },
      dark: {
        css: {
          color: theme("colors.white"),
          p: {
            color: theme("colors.gray.400"),
          },
          thead: {
            color: theme("colors.gray.400"),
            borderBottomColor: theme("colors.primary.800"),
          },
          "tbody tr": {
            color: theme("colors.gray.400"),
            borderBottomColor: theme("colors.primary.800"),
          },
          h1: {
            color: theme("colors.primary.600"),
          },
          h2: {
            color: theme("colors.primary.600"),
            borderBottomColor: theme("colors.primary.800"),
          },
          h3: {
            color: theme("colors.primary.600"),
            borderBottomColor: theme("colors.primary.800"),
          },
          h4: {
            color: theme("colors.primary.600"),
            borderBottomColor: theme("colors.primary.800"),
          },
          pre: {
            backgroundColor: theme("colors.primary.400"),
          },
          code: {
            color: theme("colors.primary.400"),
            backgroundColor: theme("colors.primary.900"),
          },
          "ol > li": {
            color: theme("colors.gray.400"),
          },
          "ol > li::before": {
            color: theme("colors.gray.400"),
          },
          "ul > li": {
            color: theme("colors.gray.400"),
          },
          "ul > li::before": {
            backgroundColor: theme("colors.gray.400"),
          },
        },
      },
    }),
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/ui")],
  variants: {
    textColor: ["responsive", "hover", "focus", "dark"],
    typography: ["responsive", "dark"],
  },
};
