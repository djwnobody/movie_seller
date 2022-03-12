import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from '@/http/axios'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/assets/font/iconfont.css' //字体图标
Vue.use(Vant)

// 事件中心，打开detail时，不显示footer和header
const eventBus = new Vue()
Vue.prototype.$eventBus = eventBus

Vue.prototype.$axios = axios
Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
