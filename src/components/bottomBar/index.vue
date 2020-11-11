<template>
  <div :style="{height}">
    <div class="bb-content bg-white" :style="{height}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    barHeight: {
      type: Number,
      default: 98
    },
    isTabPage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState('device', ['isIponeX']),

    height() {
      let h = uni.upx2px(this.barHeight)
      return (!this.isTabPage && this.isIponeX) ? `${h + 34}px` : `${h}px`
    }
  }
}
</script>

<style>
.bb-content{
  position: fixed;
  z-index: 10;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>