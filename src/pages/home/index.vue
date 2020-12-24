<template>
  <div style="height:100vh;" class="bg-white flex column">
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
    <div class="flex justify-around" style="height:145rpx">
      <div v-for="(i,inx) in icons" :key="inx" class="flex column align-center" @click="checkRt(i)">
        <img :src="i.image" style="width:48rpx;height:48rpx">
        <div style="color:#000;font-size:8px;">{{i.name}}</div>
      </div>
    </div>
    <div class="left pos-r" style="width:750rpx;">
      <swiper style="height:100%;">
        <swiper-item v-for="(i, inx) in goods" :key="inx">
          <img class="fill" :src="i.image" />
        </swiper-item>
      </swiper>
      <img class="pos-a" style="width:60rpx;height:60rpx;left:24rpx;top:350rpx" src="/static/img/left-blue.png" alt="">
      <img class="pos-a" style="width:60rpx;height:60rpx;right:24rpx;top:350rpx" src="/static/img/right-blue.png" alt="">
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

        this.goods = home[10].content.list

        this.icons = home[2].content.list
      })
  },
  data() {
    return {
      banner: [],
      bannerInx: 0,
      num:30000,
      goods: [],
      icons: [],
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
    },
    checkRt(i) {
      if (i.path.indexOf('richtext') > -1) {
        let id = i.path.split('?')[1].split('=')[1]
        this.$go(`/pages/rt/index?id=${id}`)
      }
    }
  }
}
</script>

<style>

</style>