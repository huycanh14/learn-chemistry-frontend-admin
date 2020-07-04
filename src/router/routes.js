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
          component: () => import('../views/Home.vue')
        },
        {
          path: "grade",
          name: "grade",
          component: () => import('../views/grade/Index.vue')
        },
        {
          path: 'about',
          name: 'about',
          component: () => import('../views/About.vue')
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
      component: () => import('../views/Login.vue')
    },
    { path: "*", redirect: "/" },
]

export default routes;