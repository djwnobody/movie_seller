<template>
  <div>
    <div class="avatar">
      <img :src="shaonian" alt="" />
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="info" native-type="submit"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import shaonian from '@/assets/shaonian.jpg'
export default {
  data() {
    return {
      username: '',
      password: '',
      shaonian, //照片也可以放这
    }
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values)
    },
  },
}
</script>

<style lang="scss" scoped>
.avatar {
  width: 100%;
  background-color: #f4f4f4;
  padding: 60px 0;
  text-align: center;
  img {
    width: 150px;
    height: 150px;
    border-radius: 50%;
  }
}
</style>
