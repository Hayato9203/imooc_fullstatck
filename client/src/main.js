// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
// 全局启用vuex和vuex配置
import {
  sync
} from 'vuex-router-sync'
import store from '@/store/store'

import VueLazyload from 'vue-lazyload'
var infiniteScroll = require('vue-infinite-scroll')

Vue.config.productionTip = false

Vue.use(infiniteScroll)
Vue.use(VueLazyload, {
  error: '/static/loading-svg/loading-broken.svg',
  loading: '/static/loading-svg/loading-bars.svg'
})
sync(store, router)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

// 另一种方式
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
