<template>
  <div>
    <van-tabbar
      v-model="active"
      active-color="#ee0a24"
      inactive-color="#000"
      @change="onChange"
    >
      <van-tabbar-item>
        <i class="iconfont icon-dianyingpiaoiocn" slot="icon"></i>
        电影
      </van-tabbar-item>
      <van-tabbar-item>
        <i class="iconfont icon-yingyuan" slot="icon"></i>
        影院
      </van-tabbar-item>
      <van-tabbar-item>
        <i class="iconfont icon-xinwenzixun" slot="icon"></i>
        资讯
      </van-tabbar-item>
      <van-tabbar-item>
        <i class="iconfont icon-shouye" slot="icon"></i>我的</van-tabbar-item
      >
    </van-tabbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 选中的index
      active: 0,
      routes: ['/movie/playing', '/cinema', '/news', '/my'],
    }
  },
  created() {
    // router-view是根据url显示的；而组件高亮是通过active显示的
    let index = this.routes.indexOf(this.$route.path)
    // 即将上映的index为-1，footer一个都不高亮
    if (index < 0) {
      index = 0
    }
    this.active = index
  },
  methods: {
    onChange(index) {
      this.$router.push(this.routes[index])
    },
  },
}
</script>

<style></style>
