<template>
  <div class="flex column align-center">
    <div style="color:#060606;font-size:18px;margin-top:260rpx;">支付成功</div>
    <img style="width:288rpx;height:186rpx;margin-top:60rpx;" src="" alt="">
    <div style="margin-top:60rpx;" class="flex">
      <div v-for="i in 3" :key="i" class="circle" :class="{dot: (i==0&&count<=3)||(i==1&&count<=2)||(i==2&&count<=1)}"></div>
    </div>
    <div style="color:#060606;font-size:14px;margin-top:50rpx;">{{count}}秒后将为您跳转至{{orderType==1?'配送界面':'首页界面'}}</div>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
    this.orderType = opt.t
    this.t = setInterval(_ => {
      this.count--
      if (this.count<=0) {
        clearInterval(this.t)
        if (this.orderType == 1) {
          this.$go('/pages/ship/index', 'switch')
        } else if (this.orderType == 2) {
          this.$go('/pages/home/index', 'switch')
        }
      }
    }, 1000)
  },
  data() {
    return {
      orderType: '1', // 1->即时配送 , 2->存水
      count: 3,
    }
  },
}
</script>

<style lang="less">
.circle{
  width: 28rpx;
  height: 28rpx;
  border-radius: 14rpx;
  border: 1rpx solid #ADC3E5;
  background: #fff;
  margin-right: 60rpx;
  &.dot{
    background: #ADC3E5;
  }
  &:last-child{
    margin-right: 0;
  }
}
</style>