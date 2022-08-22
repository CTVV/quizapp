const path = require("path");

module.exports = {
    entry: "./src/main.js",
    mode: "development",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
      publicPath: "/",
    },
      devServer: {
        static:
          {
            directory: path.resolve(__dirname, ''),
            publicPath: '/',
          },
        port: 9000,
        hot: true,
      },
      module: {
        rules: [
                { 
                    test: /\.css$/, 
                    use: ['style-loader', 'css-loader'] 
                }
            ]
      }
}