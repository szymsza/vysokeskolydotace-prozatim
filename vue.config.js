module.exports = {
  publicPath: "",
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/sass/app.sass"`
      },
      scss: {
        data: `@import "@/sass/app.sass";`
      }
    }
  }
};
