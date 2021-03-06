import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import userProfile from "../components/userProfile.vue";
import { authGuard } from "../auth/authGuard";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: "/profile",
    name: "profile",
    component: userProfile,
    beforeEnter: authGuard
  },
  {
    path: '/events',
    name: 'events',
    component: () => import('../components/listModels.vue'),
    beforeEnter: authGuard
  },
  {
    path:'/events/create',
    name: 'create_events',
    component: () => import('../components/createEvent'),
    beforeEnter: authGuard
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
    path:'/:model/editEvent',
    name: 'edit_event',
    component: () => import('../components/editEvent'),
    beforeEnter: authGuard
  },
  {
    path: '/:model/',
    name: 'list',
    component: () => import('../components/listRegistrations'),
    beforeEnter: authGuard
  },
  {
    path: '/:model/create',
    name: 'create',
    props: true,
    component: () => import('../components/createRegistration')
  },
  {
    path: '/:model/edit/:id',
    name: 'edit',
    component: () => import('../components/editRegistration'),
    beforeEnter: authGuard
  },
]

const router = new VueRouter({
  routes
})

export default router
