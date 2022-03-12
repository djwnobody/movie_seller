<template>
  <div class="box">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="-----  电影没有更多了  -----"
      @load="onLoad"
    >
      <van-card v-for="item in list" :key="item.firmId">
        <template #title>
          <div class="title">
            {{ item.name }}<span>{{ item.item.name }}</span>
          </div>
        </template>
        <template #desc>
          <div class="label">
            观众评分：<span>{{ item.grade || 0 }}</span>
          </div>
          <div class="label actors">
            主演：{{ item.actors | handlerActors }}
          </div>
          <div class="label">{{ item.nation }} | {{ item.runtime }}分钟</div>
        </template>
        <template #tags>
          <van-tag
            plain
            type="danger"
            color="#ff5f16"
            size="large"
            class="button"
            >购票</van-tag
          >
        </template>
        <template #thumb>
          <img :src="item.poster" alt="" width="66px" />
        </template>
      </van-card>
    </van-list>
  </div>
</template>

<script>
import api from '@/api'
export default {
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      pageNum: 1,
    }
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
  },
  created() {
    // let res = await this.$axios(api.getNow)
    // this.list = res.data.films
  },
  methods: {
    async onLoad() {
      // console.log('loading', this.loading) //立即变为true，特别快
      let res = await this.$axios(api.getNow + '?pageNum=' + this.pageNum)
      // console.log(res)
      if (this.list.length < res.data.total) {
        this.list.push(...res.data.films)
        this.pageNum++
      } else {
        this.finished = true
      }
      this.loading = false
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
