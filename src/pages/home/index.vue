<template>
  <div style="height:100vh" class="bg-white">
    <div class="flex align-center" style="padding: 70rpx 0 42rpx;">
      <div class="left flex justify-around align-center" style="height:234rpx" @click="onBannerPre">
        <img src="/static/img/left.png" style="width:30rpx;height:30rpx" />
      </div>
      <swiper style="width:666rpx;height:234rpx;" :current="bannerInx" circular @animationfinish="onBannerChange">
        <swiper-item v-for="(i, inx) in banner" :key="inx">
          <img class="fill" :src="i.image" style="border-radius:18rpx" />
        </swiper-item>
      </swiper>
      <div class="left flex justify-around align-center" style="height:234rpx" @click="onBannerNext">
        <img src="/static/img/right.png" style="width:30rpx;height:30rpx" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  onLoad() {
    this.$post('/index/template', {
      type: 'banner'
    })
      .then(r => {
        let {home} = r.data
        this.banner = home[1].content.list
        console.log(this.banner)
      })
    
  },
  data() {
    return {
      banner: [],
      bannerInx: 0,
      num:30000,
    }
  },
  methods: {
    onBannerPre() {
      this.bannerInx = (this.num--)%this.banner.length
    },
    onBannerNext() {
      this.bannerInx = (this.num++)%this.banner.length
    },
    onBannerChange(e) {
      console.log(e.detail.current)
      // this.bannerInx = e.detail.current
    }
  }
}
</script>

<style>

</style>