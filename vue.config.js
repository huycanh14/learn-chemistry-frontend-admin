module.exports = {
  "pluginOptions": {
    "i18n": {
      "locale": "vn",
      "fallbackLocale": "en",
      "localeDir": "locales",
      "enableInSFC": false
    }
  },
  "transpileDependencies": [
    "vuetify"
  ],
  configureWebpack: {
      "externals": {
      "CKEDITOR": "window.CKEDITOR"
    }
  }
  
}