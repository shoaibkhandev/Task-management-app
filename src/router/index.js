import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'board',
    component: () => import('../pages/board/index.vue')
  },
  {
    path: '/error',
    name: 'error',
    component: () => import(/* webpackChunkName: "notFound" */ '../pages/error/index.vue')
  },

  {
    path: '*',
    redirect: '/error'
  }
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: () => import('../pages/login/index.vue'),
  //   meta: {
  //     layout: 'auth',
  //     requiresAuth: false,
  //   }
  // },
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   component: () => import('../pages/dashboard/index.vue'),
  //   meta: {
  //     requiresAuth: true,
  //   }
  // }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.matched.some((record) => record.meta.requiresAuth)) {
//     if (isAuthenticated()) {
//       next()
//       return
//     }
//     next('/')
//   }
//   next('/dashboard')
// })

// function isAuthenticated() {
//   return store.state.loggedIn
// }

export default router
