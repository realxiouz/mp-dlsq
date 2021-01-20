<template>
  <div style="height:100vh;" class="bg-white flex column">
    <div class="flex align-center" style="padding: 70rpx 0 42rpx;">
      <div class="left flex justify-around align-center" style="height:234rpx">
        <img src="/static/img/left.png" style="width:30rpx;height:30rpx" />
      </div>
      <swiper style="width:666rpx;height:234rpx;">
        <swiper-item v-for="(i, inx) in banner" :key="inx">
          <img class="fill" :src="i.image" style="border-radius:18rpx" />
        </swiper-item>
      </swiper>
      <div class="left flex justify-around align-center" style="height:234rpx">
        <img src="/static/img/right.png" style="width:30rpx;height:30rpx" />
      </div>
    </div>
    <!-- <div class="flex justify-around" style="height:145rpx">
      <div v-for="(i,inx) in icons" :key="inx" class="flex column align-center" @click="checkRt(i)">
        <img :src="i.image" style="width:48rpx;height:48rpx">
        <div style="color:#000;font-size:8px;">{{i.name}}</div>
      </div>
    </div> -->
    <div class="flex justify-around" style="height:145rpx">
      <div v-for="(i,inx) in eee" :key="inx" class="flex column align-center" @click="i.path&&$go(i.path)">
        <img :src="i.image" style="width:56rpx;height:56rpx;margin-bottom:8rpx;">
        <div style="color:#000;font-size:8px;">{{i.name}}</div>
      </div>
    </div>
    <div class="left pos-r" style="width:750rpx;">
      <swiper style="height:100%;" :current="bannerInx" circular @animationfinish="onBannerChange">
        <swiper-item v-for="(i, inx) in goods" :key="inx" @click="onGoDetail(i)">
          <img class="fill" :src="i.image" />
        </swiper-item>
      </swiper>
      <img class="pos-a" style="width:60rpx;height:60rpx;left:24rpx;top:350rpx" src="/static/img/left-blue.png" @click="onBannerPre">
      <img class="pos-a" style="width:60rpx;height:60rpx;right:24rpx;top:350rpx" src="/static/img/right-blue.png" @click="onBannerNext">
    </div>

    <div class="flex">
      <img v-for="(i,inx) in preImg" :key="inx" :src="i" style="width:0;height:0;" alt="">
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

      eee: [
        {
          image: 'http://xzj.csywlkj.com/uploads/20201230/fdae34518380a9b553a5c6e2b443117a.png',
          name: '现时优惠',
        },
        {
          image: 'http://xzj.csywlkj.com/uploads/20201230/23b6f0e65807a1482a03503bf3be1459.png',
          name: '企业资讯',
          path: `/pages/ad/index?inx=0`
        },
        {
          image: 'http://xzj.csywlkj.com/uploads/20201230/eaca47f5e0362f38b779f36d5c23757c.png',
          name: '生产工序',
          path: `/pages/ad/index?inx=1`
        },
        {
          image: 'http://xzj.csywlkj.com/uploads/20201230/b836d92430e8ee53268c21b687839f26.png',
          name: '水源介绍',
          path: `/pages/ad/index?inx=2`
        }
      ],

      preImg: [
        'https://yunnanxinzijia.com/uploads/20210114/803df5dccfa32e3bfc825a412eecaef8.png',
        'https://yunnanxinzijia.com/uploads/20210114/638ee5e8752eb5710af33f47252fa90b.png',
        'https://yunnanxinzijia.com/uploads/20210114/75517134a477b77ad0f53c90398d3626.png',
        'https://yunnanxinzijia.com/uploads/20210114/d29b6e3e01d9ecc03607c1284c3fee77.png',
        'https://yunnanxinzijia.com/uploads/20210114/e9c5292e8f5bf9598f6134ffdffeb2cd.png',
        'https://yunnanxinzijia.com/uploads/20210114/4c5a89f0200d235db295928016524652.png',
        'https://yunnanxinzijia.com/uploads/20210114/3323eb2db39c587c74c69dcefb80ec79.png',
      ]
    }
  },
  methods: {
    onBannerPre() {
      this.bannerInx = (this.num--)%this.goods.length
    },
    onBannerNext() {
      this.bannerInx = (this.num++)%this.goods.length
    },
    onBannerChange(e) {
      console.log(e.detail.current)
      // this.bannerInx = e.detail.current
    },
    checkRt(i) {
      if (i.path.indexOf('richtext') > -1) {
        let id = i.path.split('?')[1].split('=')[1]
        this.$go(`/pages/rt/index?id=${id}`)
      } else {
        this.$go(`/pages/ad/index`)
      }
    },
    onGoDetail(i) {
      if (i.path) {
        let idStr = i.path.split('?')[1]
        this.$go(`/pages/goods/detail?${idStr}`)
      } else {
        this.$toast('参数没有配置正确')
      }
    }
  }
}
</script>

<style>

</style>