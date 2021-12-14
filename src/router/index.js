import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/models',
    name: 'Models',
    component: () => import('../components/listModels.vue')
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/:model/',
    name: 'list',
    component: () => import('../components/listRegistrations')
  },
  // {
  //   path: '/:model/create',
  //   name: 'create',
  //   props: true,
  //   component: () => import('./components/createComponent')
  // },
  // {
  //   path: '/:model/edit/:id',
  //   name: 'edit',
  //   component: () => import('./components/editComponent')
  // },
]

const router = new VueRouter({
  routes
})

export default router
