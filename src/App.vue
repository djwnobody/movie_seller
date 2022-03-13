<template>
  <div id="app">
    <router-view></router-view>
    <Footer v-show="detail" v-if="$store.state.footerShowing"></Footer>
  </div>
</template>

<script>
import Footer from '@/components/Footer'
export default {
  data() {
    return {
      // 不在detail页面显示
      detail: true,
    }
  },
  created() {
    this.$eventBus.$on('header', (boolen) => {
      this.detail = boolen
    })
  },
  components: {
    Footer,
  },
}
</script>

<style></style>
