import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'board',
    component: () => import('../pages/board/index.vue'),
  },
  {
    path: '/error',
    name: 'error',
    component: () => import('../pages/error/index.vue')
  },
  {
    path: '*',
    redirect: '/error'
  }
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
