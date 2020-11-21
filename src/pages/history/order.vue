<template>
  <div>
    <div class="sticky bg-primary flex align-center" style="height:100rpx;padding:0 48rpx;">
      <picker class="font14" mode="date" fields="month" @change="onSel">选择月份: {{selDate?selDate:'全部'}}</picker>
    </div>
    <div class="order-item bg-white" v-for="(i) in 4" :key="i">
      <div class="bg-primary flex align-center font10 text-bold" style="padding: 0 70rpx;">
        <div class="left">2020-10-27</div>
        <div>10:00</div>
      </div>
      <div style="padding: 0 70rpx;">
        <div class="line flex">
          <div class="left">订单号码<span style="margin-left:24rpx">{{'1111111'}}</span></div>
        </div>
        <div class="line flex">
          <div class="left">大理山泉</div>
          <div>X 1</div>
        </div>
        <div class="line flex">
          <div class="left">大理山泉</div>
          <div>X 1</div>
        </div>
        <div class="line flex">
          <div class="left">共计</div>
          <div>￥18.00</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selDate: ''
    }
  },
  methods: {
    onSel(e) {
      this.selDate = e.detail.value
    }
  }
}
</script>

<style lang="less">
.order-item{
  padding: 30rpx 0;
  margin-bottom: 30rpx;
  .line{
    margin-top: 30rpx;
    color: #010101;
    font-size: 12px;

  }
}
</style>