module.exports = {
  purge: {
    enabled: true,
    content: ["./public/**/*.html", "./public/**/*.js"],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        primary: ["Open Sans", "sans-serif"],
      },
      textColor: {
        primary: "#343a40",
        secondary: {
          200: "#fa7578",
          300: "#fa6467",
          400: "#f95356",
          500: "#e04b4d",
          600: "#c74245",
        },
        accent: "#284477",
      },
      backgroundColor: {
        secondary: {
          200: "#fa7578",
          300: "#fa6467",
          400: "#f95356",
          500: "#e04b4d",
          600: "#c74245",
        },
        accent: "#284477",
        primary: "#343a40",
        pink: {
          300: "#F1D9E1",
          500: "#D59294",
        },
        maroon: "#25121A",
        sky: "#7DAAD8",
      },
      borderColor: {
        primary: "#343a40",
        secondary: "#fa6467",
      },
      gridTemplateColumns: {
        reviews: "repeat(auto-fit, minmax(17rem, 1fr))",
        destinations: "repeat(auto-fit, minmax(15.5rem, 1fr))",
        "destinations-small": "repeat(auto-fit, minmax(auto, 15.5rem))",
        shop: "repeat(auto-fit, minmax(16.875rem, 1fr))",
        profile: "max-content repeat(2, 1fr)",
      },
      gridAutoRows: {
        destination: "minmax(auto, 13rem)",
      },
      maxHeight: {
        destination: "28rem",
      },
      minHeight: {
        product: "19rem",
      },
      spacing: {
        "fixed-sm": "4.5rem",
        "fixed-md": "5.5rem",
      },
      padding: {
        carousel: "21.0625rem",
      },
      backgroundImage: {
        "shop-hero2": "url('/img/man-in-flowers.webp')",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
