<template>
  <div>
    <h1>news</h1>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('hideFooter')
  },
  beforeDestroy() {
    this.$store.commit('showFooter')
  },
}
</script>

<style></style>
