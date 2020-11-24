<template>
  <div >
    <bottom-bar :bar-height="120">
      <div style="height:120rpx" class="flex align-center justify-around">
        <div class="btn text-center" @click="$go('/pages/address/detail')">添加地址</div>
      </div>
    </bottom-bar>
  </div>
</template>

<script>
export default {
  onShow() {
    this.$post('address')
      .then(r => {
        console.log(r)
      })
  }
}
</script>

<style lang="less">
.btn {
  background: #ADC3E5;
  height: 77rpx;
  width: 700rpx;
  color: #fff;
  font-size: 12px;
  border-radius: 12rpx;
  line-height: 77rpx;
}
</style>