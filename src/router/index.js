import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import store from '../store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  { path: "*", redirect: "/" },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const access_token = window.localStorage.getItem('access_token');
  let store_refresh_token = store.state['accounts']["account"].refresh_token;
  let window_refresh_token = window.localStorage.getItem("refresh_token");
  if((access_token == "" || typeof access_token == 'undefined' || access_token == null) 
      && to.path != '/login' 
      && (store_refresh_token !==window_refresh_token
  )) {
    next('/login');
  } else if(access_token == 'undefined' && to.path == '/login'){
    next("*");
  } else {
    next();
  }
});

export default router;
