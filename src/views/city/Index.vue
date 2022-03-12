<template>
  <div>
    <!-- .fixed 这个盒子是为了解决fixed不占位置 -->
    <div class="fixed">
      <div class="top">当前城市 - <span>×</span></div>
      <div class="search">
        <div class="input-wrap">
          <i class="iconfont icon-sousuo"></i>
          <input
            type="text"
            class="search-input"
            placeholder="输入城市名或拼音"
          />
        </div>
      </div>
    </div>
    <div class="hot">热门城市</div>
    <van-grid :gutter="10">
      <van-grid-item
        v-for="(city, index) in hotCity"
        :key="index"
        :text="city"
      />
    </van-grid>
    <van-index-bar :index-list="indexList">
      <div v-for="(value, key) in cityObj" :key="key">
        <van-index-anchor>{{ key }}</van-index-anchor>
        <van-cell :title="item" v-for="(item, index) in value" :key="index" />
      </div>
    </van-index-bar>
  </div>
</template>

<script>
import api from '@/api'
export default {
  components: {},
  data() {
    return {
      alphabet: [], //  26个字母
      indexList: [], //  22个字母
      cityObj: {}, //  带索引的城市  { 'A':['鞍山','安庆'],'B'：['北京'] }
      hotCity: [], //热门城市
    }
  },
  async created() {
    // 生成26个字母
    for (let i = 65; i <= 90; i++) {
      this.alphabet.push(String.fromCharCode(i))
    }
    // 生成热门城市
    let res = await this.$axios(api.getCity)
    console.log(res)
    let cityArr = res.data.cities
    cityArr.forEach((item) => {
      if (item.isHot === 1) {
        this.hotCity.push(item.name)
      }
    })
    console.log(this.hotCity)
    // 循环生成22个字母
    this.alphabet.forEach((letter) => {
      cityArr.forEach((item) => {
        if (
          item.pinyin[0].toUpperCase() === letter &&
          !this.indexList.includes(letter)
        ) {
          this.indexList.push(letter)
        }
      })
    })
    this.indexList.forEach((index) => {
      this.cityObj[index] = [] //下一步就不用判断为undefined
    })
    // 生成带字母索引的城市数据
    this.indexList.forEach((letter) => {
      cityArr.forEach((item) => {
        if (item.pinyin[0].toUpperCase() === letter) {
          this.cityObj[letter].push(item.name)
        }
      })
    })
    console.log(this.cityObj)
  },
}
</script>

<style lang="scss" scoped>
* {
  padding: 0;
  margin: 0;
}
.fixed {
  width: 100%;
  height: 93px;
}
.top {
  width: 100%;
  height: 44px;
  line-height: 44px;
  text-align: center;
  font-size: 17px;
  position: fixed;
  z-index: 2000;
  top: 0;
  left: 0;
  background-color: #fff;
  span {
    position: absolute;
    top: 0;
    left: 7px;
    font-size: 40px;
  }
}
.search {
  width: 100%;
  height: 49px;
  background-color: #f4f4f4;
  box-sizing: border-box; // 不让padding撑大
  padding: 9.5px 15px;
  position: fixed;
  top: 44px;
  left: 0;
  z-index: 2000; // 不然会被vant遮盖掉，不知道vant内部的z-index设置的是2？6？
  text-align: center;
  .input-wrap {
    width: 100%;
    height: 30px;
    background-color: #fff;
    text-align: center;
    position: relative;
    i {
      display: inline-block;
      width: 20px;
      height: 20px;
      margin: 5px;
      position: absolute;
      top: 2px;
      left: 3px;
    }
    .search-input {
      width: 280.2px;
      border: 0;
      height: 30px;
      font-size: 12px;
    }
  }
}
// 修改placeholder颜色，上面的只是修改输入的字的颜色
input::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #aab2bd;
  /* placeholder字体大小  */
  font-size: 12px;
}
.hot {
  font-size: 13px;
  color: #797d82;
  margin-bottom: 10px;
  margin-left: 15px;
}
</style>
