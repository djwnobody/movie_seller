import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 因为footer是在App内用的，所以控制其他页面不显示footer
    footerShowing: true,
  },
  mutations: {
    showFooter(state) {
      state.footerShowing = true
    },
    hideFooter(state) {
      state.footerShowing = false
    },
  },
  actions: {},
  modules: {},
})
