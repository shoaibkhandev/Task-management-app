import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import AppLayout from './layouts/AppLayout.vue'
import storeGetters from './mixins/store-getters.js'

Vue.component('AppLayout', AppLayout)

Vue.config.productionTip = false

Vue.mixin(storeGetters)

Vue.filter('truncatedDescription', (value = '') => {
  return value.length < 60 ? value : value.substring(0, 60) + '...'
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
