<template>
  <div style="padding: 50rpx 40rpx 0;min-height:100vh;background:#fff">
    <div class="flex column align-center" style="width:100%;">
      <div class="color-primary" style="font-size:14px;">商城订单</div>
      <div style="color:#868787;margin-top:50rpx;font-size:8px;">支付剩余时间: {{'15:00'}}</div>
      <div class="text-bold text-price" style="color:#060606;font-size:30px;margin:30rpx 0;">16.00</div>
      <div class="flex align-center" style="color:#868787;font-size:10px;" @click="show=!show">
        查看订单详情 <div style="font-size:10px;margin-left:10rpx" :class="show?'icon-down':'icon-right'"></div>
      </div>
      <div v-if="show" style="width:330rpx;margin-top:30rpx;color:#5F5F5F;font-size:10px;">
        <div class="flex line">
          订单号码: {{'11111111'}}
        </div>
        <div class="flex line">
          <div>大理山泉</div>
          <div>袋装(10L)</div>
          <div class="left"></div>
          <div>X 1</div>
        </div>
        <div class="flex line">
          <div>大理山泉</div>
          <div>袋装(10L)</div>
          <div class="left"></div>
          <div>X 1</div>
        </div>
        <div class="flex line">
          <div>共计</div>
          <div class="left"></div>
          <div>￥14.00</div>
        </div>
      </div>

      <div style="width:670rpx;height:2rpx;background:#A0A0A0;margin:60rpx 0;"></div>

      <div class="flex" style="margin-bottom:36rpx;width:670rpx;" @click="check0=!check0">
        <div style="padding-left:20rpx;width:88rpx" >
          <div :class="check0?'color-primary icon-check':'icon-uncheck color-gray'" style="font-size:14px;" ></div>
        </div>
        <div class="left" style="color:#868787;font-size:10px;">尊敬的用户，请您仔细核对订单详情并确认无误后，再进行支付。</div>
      </div>
      <div class="flex" style="margin-bottom:36rpx;width:670rpx;" @click="check1=!check1">
        <div style="padding-left:20rpx;width:88rpx"  >
          <div :class="check1?'color-primary icon-check':'icon-uncheck color-gray'" style="font-size:14px;"></div>
        </div>
        <div class="left" style="color:#868787;font-size:10px;">此订单如需实时╱预约配送，请勾选此选项。支付成功后系统将自动为您跳转至配送页面。否则此订单支付成功后，将默认进入我的存水库存中。</div>
      </div>

      <div class="flex align-center" style="width:670rpx;margin-top:10rpx" @click="check2=!check2">
        <div style="width:88rpx">
        </div>
        <div class="">微信支付</div>
        <div class="left"></div>
        <div :class="check2?'color-primary icon-check':'icon-uncheck color-gray'" style="font-size:50rpx;"></div>
      </div>

      <bottom-bar :bar-height="120">
        <div style="height:120rpx" class="flex align-center justify-around">
          <div class="btn text-center" :class="{can:check0&&check2}" @click="onPay">确定支付</div>
        </div>
      </bottom-bar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,

      check0: false,
      check1: false,
      check2: false,
    }
  },
  methods: {
    onPay() {
      if (this.check0&&this.check2) {
        this.$toast('todo...')
      }
    }
  }
}
</script>

<style lang="less">
.line {
  margin-bottom: 30rpx;
  &:last-child{
    margin-bottom: 0;
  }
}

.btn {
  background: #B5B5B5;
  height: 77rpx;
  width: 584rpx;
  color: #fff;
  font-size: 12px;
  border-radius: 12rpx;
  line-height: 77rpx;
  &.can{
    background: #ADC3E5;

  }
}

.color-gray{
  color: #868787 !important;
}
</style>