<template>
  <div>
    <div class="sticky">
      <div class="bg-bold doing  flex align-center justify-around" @click="$go(`/pages/ship/doing`)">
        <div style="font-size:12px;">正在进行的配送</div>
      </div>
      <div class="bg-primary doing flex align-center justify-around">
        <div style="font-size:14px;">我的存水</div>
      </div>
    </div>
    <div class="ship-line flex align-center bg-white">
      <div class="img-wrap">
        <img src="/static/img/water.jpg" style="width:100%;height:100%;" />
      </div>
      <div class="left">
        <div style="color:#010101;font-size:10px;">大理山泉 瓶装(4.2L)</div>
      </div>
      <div class="flex column align-center">
        <div class="color-primary" style="font-size:10px;margin-bottom:24rpx;">配送数量</div>
        <goods-number w="190rpx"/>
      </div>
    </div>
    <div class="ship-line flex align-center bg-white">
      <div class="img-wrap">
        <img src="/static/img/water.jpg" style="width:100%;height:100%;" />
      </div>
      <div class="left">
        <div style="color:#010101;font-size:10px;">大理山泉 瓶装(4.2L)</div>
      </div>
      <div class="flex column align-center">
        <div class="color-primary" style="font-size:10px;margin-bottom:24rpx;">配送数量</div>
        <goods-number w="190rpx"/>
      </div>
    </div>
    <div class="ship-line flex align-center bg-white">
      <div class="img-wrap">
        
      </div>
      <div class="left">
        <div style="color:#010101;font-size:10px;">选择配送类型</div>
      </div>
      <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
    </div>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
  },
  methods: {
    
    onChaoose() {
      wx.chooseLocation({
        success: r => {
          console.log(r)
        }
      })
    }
  }
}
</script>

<style lang="less">
.doing{
  height: 76rpx;
}

.ship-line{
  border-bottom: 1px solid #BCD0EB;
  min-height: 134rpx;
  padding: 30rpx 36rpx;
  .img-wrap{
    width: 110rpx;
    height: 110rpx;
    margin-right: 36rpx;
  }
}
</style>