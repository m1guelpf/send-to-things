const tailwindcss = require("tailwindcss");
const autoprefixer = require("autoprefixer");
const purgecss = require("@fullhuman/postcss-purgecss");

module.exports = {
  plugins: [
    tailwindcss(),
    autoprefixer({
      add: true,
      grid: true
    }),
    process.env.NODE_ENV === "production"
      ? purgecss({
          content: ["./public/**/*.html", "./src/**/*.vue"]
        })
      : ""
  ]
};
