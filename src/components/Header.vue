<template>
  <div>
    <van-tabs @click="onClick" line-width="56px" v-model="active">
      <van-tab title="正在热映"></van-tab>
      <van-tab title="即将上映"></van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: 0,
      urlArr: ['/movie/playing', '/movie/future'],
    }
  },
  methods: {
    onClick(index) {
      this.$router.push(this.urlArr[index])
    },
  },
  created() {
    // router-view取决于url；vant组件高亮显示取决于active，让active与url建立联系。
    let index = this.urlArr.indexOf(this.$route.path)
    this.active = index
  },
}
</script>

<style></style>
