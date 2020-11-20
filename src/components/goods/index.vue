<template>
  <div class="goods-bean bg-white flex column" @click.stop="$go(`/pages/goods/detail?id=${bean.id}`)">
    <img :src="bean.image" style="width:100%;height:364rpx" />
    <div class="left" style="padding: 26rpx;font-size:10px;color:#010101;width:100%;">
      <div>{{bean.title}}</div>
      <div>{{bean.subtitle}}</div>
      <div class="color-primary text-bold text-price" style="font-size:12px;margin-top:16rpx;">
        {{bean.curSku.price}}
      </div>
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