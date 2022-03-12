<template>
  <div class="detail">
    <div class="img">
      <img :src="film.poster" />
    </div>
    <div class="film-detail">
      <div>{{ film.name }}</div>
      <div>剧情 | {{ film.category }}</div>
      <div>{{ film.premiereAt | parsePremiereAt }}上映</div>
      <div>{{ film.nation }} | {{ film.runtime }} 分钟</div>
      <div>{{ film.synopsis }}</div>
    </div>
    <Swiper :key="'actors_' + film.actors.length">
      <div
        v-for="(item, index) in film.actors"
        :key="index"
        class="swiper-slide"
      >
        <div>
          <img :src="item.avatarAddress" alt="" />
        </div>
      </div>
    </Swiper>
  </div>
</template>

<script>
import api from '@/api'
import moment from 'moment'
import Swiper from '../../components/Swiper.vue'

export default {
  data() {
    return {
      // 这部电影详情
      film: { actors: [] },
    }
  },
  components: {
    Swiper,
  },
  async created() {
    let id = this.$route.query.id
    let res = await this.$axios(api.getDetail + '?filmId=' + id)
    this.film = res.data.film
    this.$eventBus.$emit("header", false);
    this.$eventBus.$emit("footer", false);
  },
  beforeDestroy() {
    this.$eventBus.$emit("header", true);
    this.$eventBus.$emit("footerNav", true);
  },
  filters: {
    parsePremiereAt(premiereAt) {
      // premiereAt 是秒，moment 参数是毫秒
      return moment(premiereAt * 1000).format('YYYY-MM-DD')
    },
  },
}
</script>

<style lang="scss" scoped>
.detail {
  .img {
    width: 100%;
    height: 260px;

    img {
      width: 100%;
      height: 100%;
    }
  }
}
.swiper-slide {
  img {
    width: 80px;
  }
}
</style>
