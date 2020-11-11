<template>
  <div class="empty-wrap" :style="{paddingTop: `${pt}rpx`, paddingBottom: `${pb}rpx`}">
    <img :src="url" :style="{width: `${w}rpx`}" mode="widthFix"/>
    <div class="font12" style="color:#929292">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: '暂无数据~~'
    },
    url: {
      type: String,
      default: '/static/img/empty.png'
    },
    pb: {
      type: Number,
      default: 100,
    },
    pt: {
      type: Number,
      default: 100,
    },
    w: {
      type: Number,
      default: 82
    }
  }
}
</script>

<style lang="less">
.empty-wrap{
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>