<template>
  <div>
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import url from '@/api'
import Header from '@/components/Header'
export default {
  async created() {
    // let res = await this.$axios(url.getNow)
    // console.log(res)
  },
  components: {
    Header,
  },
}
</script>

<style></style>
