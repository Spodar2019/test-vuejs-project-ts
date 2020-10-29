module.exports = {
  chainWebpack: config => {
    const svgRule = config.module.rule("svg");
    svgRule.uses.clear();
    svgRule
      .oneOf("external")
      .resourceQuery(/external/)
      .use("file-loader")
      .loader("file-loader")
      .options({
        name: "[name].[hash:8].[ext]"
      })
      .end()
      .end()
      .oneOf("inline")
      .use("babel-loader")
      .loader("babel-loader")
      .end()
      .use("vue-svg-loader")
      .loader("vue-svg-loader");
  }
};
