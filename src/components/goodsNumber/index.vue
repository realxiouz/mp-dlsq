<template>
  <div class="number-wrap flex" :style="{width: w}">
    <div class="btn">-</div>
    <div class="text-center left" style="font-size:12px;line-height:36rpx;">{{bean.count}}</div>
    <div class="btn">+</div>
  </div>
</template>

<script>
export default {
  props: {
    bean: {
      type: Object,
      default: _ => ({
        count: 1,
      })
    },
    w: {
      type: String,
      default: '100%'
    }
  }
}
</script>

<style lang="less">
.number-wrap{
  .btn{
    color: #fff;
    width: 36rpx;
    height: 36rpx;
    text-align: center;
    line-height: 36rpx;
    background: #ADC3E5;
    border-radius: 6rpx;
    &.fb{
      background: #A0A0A0;
    }
  }
}
</style>