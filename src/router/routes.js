import DashboardLayout from '../layouts/DashboardLayout.vue'
const routes = [
    {
      path: '/',
      name: 'DashboardLayout',
      component: DashboardLayout,
      redirect: "/",
      children: [
        {
          path: "",
          name: "home",
          component: () => import('../views/pages/Home.vue')
        },
        {
          path: "grade",
          name: "grade",
          component: () => import('../views/grade/Index.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/pages/About.vue')
        },
        {
          'path': 'chapter',
          'name': 'chapter',
          component: () => import('../views/chapter/Index.vue'),
        },
        {
          'path': 'chapter/list-lessons/:id',
          'name': 'list-lessons',
          component: () => import('../views/lesson/ListLessons.vue')
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/pages/Login.vue')
    },
    { path: "*", redirect: "/" },
]

export default routes;