<template>
  <div class="goods-bean bg-white flex column" @click.stop="$go(`/pages/goods/detail?${bean.id}`)">
    <img src="/static/img/water.jpg" style="width:100%;height:364rpx" />
    <div class="left" style="padding: 26rpx;font-size:10px;color:#010101;width:100%;">
      <div>大理山泉</div>
      <div>桶装(20L)</div>
      <div class="color-primary text-bold text-price" style="font-size:12px;margin-top:16rpx;">8</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    bean: {
      type: Object,
      default: {}
    }
  }
}
</script>

<style lang="less">
.goods-bean{
  width: 330rpx;
  height: 520rpx;
  margin: 0 24rpx 24rpx 0;
  border-radius: 18rpx;
  overflow: hidden;
}
</style>