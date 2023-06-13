const path = require("path");
module.exports = {
  webpack: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  devServer: {
    port: 4000,
  },
};
