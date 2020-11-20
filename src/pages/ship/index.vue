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
      <div class="img-wrap1">
      </div>
      <picker class="left" :range="types" @change="onTypeChange" :value="typeInx">
        <div class="flex align-center">
          <div class="left" style="color:#010101;font-size:10px;line-height:80rpx;">{{typeInx>=0?types[typeInx]:'选择配送类型'}}</div>
          <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
        </div>
      </picker>
    </div>
    <div class="ship-line flex align-center bg-white" v-if="typeInx==1">
      <div class="img-wrap1">
      </div>
      <picker class="left" :range="types" @change="onDateChange" :value="selDate" mode="date">
        <div class="flex align-center">
          <div class="left" style="color:#010101;font-size:10px;line-height:80rpx;">
            {{!selDate?'选择配送日期':`选择的日期: ${selDate}`}}
          </div>
          <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
        </div>
      </picker>
    </div>
    <div class="ship-line flex align-center bg-white" v-if="typeInx==1">
      <div class="img-wrap1">
      </div>
      <picker class="left" :range="types" @change="onTimeChange" :value="selTime" mode="time">
        <div class="flex align-center">
          <div class="left" style="color:#010101;font-size:10px;line-height:80rpx;">
            {{!selDate?'选择配送时间':`选择的时间: ${selTime}`}}
          </div>
          <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
        </div>
      </picker>
    </div>
    <div class="ship-line flex align-center bg-white" @click="$go('/pages/address/list')">
      <div class="img-wrap1">
      </div>
      <div class="left" style="color:#010101;font-size:10px;line-height:80rpx;">
        选择配送地址
      </div>
      <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
    </div>

    <bottom-bar :bar-height="100">
      <div style="height:100rpx;">
        
      </div>
    </bottom-bar>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
  },
  data() {
    return {
      typeInx: -1,
      types: ['实时配送', '预约配送'],
      selDate: '',
      selTime: '',
    }
  },
  methods: {
    
    onChaoose() {
      wx.chooseLocation({
        success: r => {
          console.log(r)
        }
      })
    },
    onTypeChange(e) {
      this.typeInx = e.detail.value
    },
    onDateChange(e) {
      this.selDate = e.detail.value
    },
    onTimeChange(e) {
      this.selTime = e.detail.value
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
  .img-wrap1{
    width: 80rpx;
    height: 80rpx;
    margin-right: 36rpx;
  }
}
</style>