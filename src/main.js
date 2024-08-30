import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'lib-flexible/flexible'
import vant from './vant.config'
import '../src/assets/css/iconfont_home.css'
import BScroll from '@better-scroll/core'
import VueTouch from 'vue-touch'
Vue
.use(VueAxios, axios)
.use(vant)
.use(VueTouch, {name: 'v-touch'})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
