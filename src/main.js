import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/http/axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/font/iconfont.css' //字体图标
Vue.use(Vant)

Vue.prototype.$axios = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
