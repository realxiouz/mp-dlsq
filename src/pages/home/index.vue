<template>
  <div>
    <div class="flex align-center" style="padding: 70rpx 0 42rpx;">
      <div class="left"></div>
      <swiper style="width:666rpx;height:234rpx;">
        <swiper-item v-for="(i, inx) in banner" :key="inx">
          <img class="fill" :src="i.image" style="border-radius:18rpx" />
        </swiper-item>
      </swiper>
      <div class="left"></div>
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
      banner: []
    }
  },
}
</script>

<style>

</style>