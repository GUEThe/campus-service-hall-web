module.exports = {
  // 修改的配置
  // 将baseUrl: '/api',改为baseUrl: '/',
  devServer: {
    proxy: {
      "/v1": {
        target: "http://118.89.50.76:9466",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/v1": ""
        }
      }
    }
  }
};
