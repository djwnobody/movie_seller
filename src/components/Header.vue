<template>
  <div>
    <van-tabs @click="onClick" line-width="56px">
      <van-tab title="正在热映"></van-tab>
      <van-tab title="即将上映"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      urlArr: ['/movie/playing', '/movie/future'],
    }
  },
  methods: {
    onClick(index) {
      this.$router.push(this.urlArr[index])
    },
  },
}
</script>

<style></style>
