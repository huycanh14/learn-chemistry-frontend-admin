import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/fontawesome'
import './plugins/bootstrap-vue'
import App from './App.vue'
import router from './router'
import store from './store'
import i18n from './helpers/i18n'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css';
import VueToast from 'vue-toast-notification';
// Import one of available themes
import 'vue-toast-notification/dist/theme-default.css';
import 'vue-toast-notification/dist/theme-sugar.css';
import VuePaginateAl from 'vue-paginate-al'


import { AUTH_HEADER } from "./helpers/auth-header";
import { CHECK_TOKEN } from "./helpers/axios-config";

import vuetify from './plugins/vuetify';
// import "@/assets/ckeditor/ckeditor"
// Vue.prototype.CKEDITOR = CKEDITOR
import LoadScript from 'vue-plugin-load-script';
Vue.use(LoadScript);

Vue.loadScript("@/assets/ckeditor/ckeditor.js")

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.component('vue-paginate-al', VuePaginateAl)
Vue.use(AUTH_HEADER())
Vue.use(CHECK_TOKEN())
Vue.use(VueToast, {
  position: 'top-right',
  duration: 3000
});


new Vue({
  router,
  store,
  i18n,
  vuetify,
  render: h => h(App)
}).$mount('#app')
