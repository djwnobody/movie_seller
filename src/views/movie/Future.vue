<template>
  <div class="box">
    <van-card
      v-for="item in list"
      :key="item.filmId"
      @click="toDetail(item.filmId)"
    >
      <template #title>
        <div class="title">
          {{ item.name }}<span>{{ item.filmType.name }}</span>
        </div>
      </template>
      <template #desc>
        <div class="label actors">主演：{{ item.actors | handlerActors }}</div>
        <div class="label">
          上映日期: {{ item.premiereAt | handlePremiereAt }}
        </div>
      </template>
      <template #tags>
        <van-tag plain type="danger" color="#ff5f16" size="large" class="button"
          >预购</van-tag
        >
      </template>
      <template #thumb>
        <img :src="item.poster" alt="" width="66px" />
      </template>
    </van-card>
  </div>
</template>

<script>
import api from '@/api'
import moment from 'moment'
moment.locale('zh-cn') //汉化moment

export default {
  data() {
    return {
      list: [],
    }
  },
  async created() {
    let res = await this.$axios(api.getFuture)
    console.log(res)
    this.list = res.data.films
  },
  filters: {
    // 处理演员数组
    handlerActors(val) {
      if (!val) {
        return '无'
      }
      let arr = val.map((item) => item.name)
      return arr.join(' ')
    },
    //处理上映日期
    handlePremiereAt(val) {
      return moment().format('dddd LL')
    },
  },
  methods: {
    // 跳转详情页
    toDetail(id) {
      this.$router.push({
        path: '/movie/detail',
        query: {
          id,
        },
      })
    },
  },
}
</script>

<style lang="scss" scoped>
.box {
  padding-bottom: 50px; // 让 footer 不要挡住内容
  .title {
    color: #191a1b;
    font-size: 16px;
    height: 22px;
    line-height: 22px;
    span {
      font-size: 9px;
      color: #fff;
      background-color: #d2d6dc;
      height: 14px;
      line-height: 14px;
      padding: 0 2px;
      border-radius: 2px;
      margin-left: 5px;
      position: relative;
      top: -2px;
    }
  }
  .label {
    font-size: 13px;
    margin-top: 4px;
    color: #797d82;
    span {
      color: #ffb232;
      font-size: 14px;
    }
  }
  .van-card__thumb {
    width: 66px;
  }
  .actors {
    width: 174px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .button {
    position: absolute;
    right: 0;
    bottom: 42px;
  }
}
</style>
