<template>
  <div class="number-wrap flex" :style="{width: w}">
    <div class="btn" :class="{fb: value<=0}" @click.stop="onMinus">-</div>
    <div class="text-center left" style="font-size:12px;line-height:36rpx;">{{value}}</div>
    <div class="btn" :class="{fb: value>=max}" @click.stop="onAdd">+</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    w: {
      type: String,
      default: '100%'
    },
    value: {
      type: Number,
    },
    max: {
      type: Number,
    }
  },
  methods: {
    onAdd() {
      if (this.value >= this.max) {
        return
      }
      this.$emit('input', this.value + 1)
    },
    onMinus() {
      if (this.value <= 0) {
        return
      }
      this.$emit('input', this.value - 1)
    },
    
  },
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