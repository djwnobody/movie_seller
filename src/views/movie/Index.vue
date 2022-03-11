<template>
  <div>
    <!-- 当滚动一定距离，.top(一直有固定)显示，header只固定（一直显示） -->
    <div class="top" v-show="sticky">
      电影
      <span>上海<i class="iconfont icon-xiajiantou"></i> </span>
    </div>
    <Header :class="{ sticky: sticky }"></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import url from '@/api'
import Header from '@/components/Header'
export default {
  data() {
    return {
      // 控制top和header
      sticky: false,
    }
  },
  async created() {},
  mounted() {
    window.addEventListener('scroll', () => {
      let top = document.documentElement.scrollTop
      if (top > 220) {
        this.sticky = true
      } else {
        this.sticky = false
      }
    })
  },
  components: {
    Header,
  },
}
</script>

<style lang="scss" scoped>
.sticky {
  position: fixed;
  width: 100%;
  height: 44px;
  top: 44px;
  left: 0;
  z-index: 1;
}
.top {
  width: 100%;
  height: 44px;
  line-height: 44px;
  color: #191a1b;
  background-color: #fff;
  text-align: center;
  font-size: 17px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 1;
  span {
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 20px;
    i {
      font-size: 10px;
    }
  }
}
</style>
