<template>
  <div>
    <div style="background:#5077a9;">
      <div :style="{height: `${navBarHeight}px`}"></div>
      <div class="flex column align-center" style="padding-top:100rpx;">
        <div style="width:180rpx;height:180rpx;background:rgba(255,255,255,.4);border-radius:50%;" class="pos-r">
          <img
            class="pos-a"
            style="width:132rpx;height:132rpx;border-radius:50%;top:50%;left:50%;margin-left:-66rpx;margin-top:-66rpx;"
            :src="info.id?info.avatar:'/static/img/water.jpg'"
          />
        </div>
        <div style="margin-top:16rpx">
          <button v-if="!info.id" class="reset font14" style="color:#fff;" open-type="getUserInfo" @getuserinfo="onUserInfo">点击登录</button>
          <div v-else class="font14" style="color:#fff;">{{info.nickname}}</div>
        </div>
      </div>
    </div>
    
    <div class="bg-white flex" style="margin-top:60rpx;border-radius:16rpx;">
      <div v-for="(i, inx) in navs" :key="inx" class="left flex align-center justify-around" style="height:144rpx;" @click="onNav(i)">
        <div class="color-primary font10 flex align-center column">
          <img style="width:48rpx;height:48rpx;margin-bottom:14rpx;" :src="i.img" alt="">
          <div>{{i.name}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
const NAVS = [
  {
    img: '/static/img/water.jpg',
    name: '存水管理',
    path: '/pages/water/list'
  },
  {
    img: '/static/img/water.jpg',
    name: '地址管理',
    path: '/pages/address/list'
  },
  {
    img: '/static/img/water.jpg',
    name: '购水记录',
    path: '/pages/history/order'
  },
  {
    img: '/static/img/water.jpg',
    name: '配送记录',
    path: '/pages/history/ship'
  },
]

export default {
  onLoad(opt) {
    if (!this.info.id) {
      wx.login({
        success: ({code}) => {
          this.$post('user/getWxMiniProgramSessionKey', { code })
            .then(r => {
              let { session_key } = r.data
              this.session_key = session_key
            })
        }
      })
    }
  },
  data() {
    return {
      navs: NAVS
    }
  },
  computed: {
    ...mapState('device', ['navBarHeight']),
    ...mapState('user', ['info']),
  },
  methods: {
    onUserInfo(e) {
      let {encryptedData,signature,iv} = e.detail
      this.$post('user/wxMiniProgramLogin', {
        encryptedData,
        signature,
        iv,
        session_key: this.session_key
      }).then(r => {
        let { token } = r.data
        this.$setStorage('token', token)
        this.$store.commit('user/setToken', token)
        return this.$store.dispatch('user/updateInfo')
      }).then(r => {
        this.$toast('登录成功~~~')
      })
    },
    onNav(i) {
      if (this.info.id) {
        this.$go(i.path)
      } else {
        this.$toast('还未登录呢~~~')
      }
    }
  }
}
</script>

<style>

</style>