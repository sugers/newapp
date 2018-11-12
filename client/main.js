// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import ElementUI from 'element-ui'
import wcSwiper from 'wc-swiper'
import VueLazyLoad from 'vue-lazyload'
import 'wc-swiper/style.css'
import 'jquery'
import axios from 'axios'

Vue.prototype.axios = axios
import 'element-ui/lib/theme-chalk/index.css'
import '@/assets/css/base.css'
Vue.config.debug = true;
Vue.use(VueResource)
Vue.use(ElementUI)
Vue.use(wcSwiper)
Vue.use(VueLazyLoad,{
  preLoad: 1,
  loading:'/static/img/loading.gif',
})


Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
