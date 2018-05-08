// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueLazyload from 'vue-lazyload'

Vue.config.productionTip = false

Vue.use(VueLazyload, {
  error: '/static/loading-svg/loading-broken.svg',
  loading: '/static/loading-svg/loading-bars.svg',
  preLoad: 1.3
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

// 另一种方式
// new Vue({
//   router,
//   render: h => h(App)
// }).$mount('#app')
