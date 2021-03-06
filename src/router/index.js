import Vue from 'vue'
import Router from 'vue-router'
import Meta from 'vue-meta'
import Home from '../views/Home.vue'
import Profile from '../views/Profile.vue'
import ExternalApi from '../views/ExternalApi.vue'
import { authGuard } from '../auth'

Vue.use(Meta)
Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/profile',
      name: 'profile',
      component: Profile,
      beforeEnter: authGuard
    },
    {
      path: '/external-api',
      component: ExternalApi,
      beforeEnter: authGuard
    }
  ]
})

export default router
