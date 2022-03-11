// 作用：配置各个页面需要数据请求的地址
const prefix = '/api'
export default {
  getCity: prefix + '/getCitiesInfo',
  getNow: prefix + '/getNowPlayingFilmList',
}