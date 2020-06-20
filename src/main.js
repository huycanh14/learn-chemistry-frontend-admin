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

import { AUTH_HEADER } from "./helpers/auth-header";
import { CHECK_TOKEN } from "./helpers/axios-config";

Vue.config.productionTip = false
Vue.use(VueSweetalert2);
Vue.use(AUTH_HEADER())
Vue.use(CHECK_TOKEN())

new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')
