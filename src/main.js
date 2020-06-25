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


import { AUTH_HEADER } from "./helpers/auth-header";
import { CHECK_TOKEN } from "./helpers/axios-config";

const $ = require('jquery');
window.$ = $;

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
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
  render: h => h(App)
}).$mount('#app')
