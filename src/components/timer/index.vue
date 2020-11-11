<template>
  <div class="timer-wrap">
    <div class="b">{{h}}</div>
    <div class="d">:</div>
    <div class="b">{{m}}</div>
    <div class="d">:</div>
    <div class="b">{{s}}</div>
  </div>
</template>

<script>
export default {
  created() {
    this.startTimer()
  },
  beforeDestroy() {
    this.stopTimer()
  },
  props: {
    end: {
      type: Number,
      default: 1604966400000
    }
  },
  data() {
    return {
      t: null,
      h: '00',
      m: '00',
      s: '00'
    }
  },
  methods: {
    startTimer() {
      let delta = (this.end - new Date().valueOf())/1000
      this.t = setInterval(_ => {
        delta--
        if (delta<=0) {
          this.stopTimer()
          this.h = '00'
          this.m = '00'
          this.s = '00'
        } else {
          let h = Math.floor((delta / 60 / 60) % 24)
          let m = Math.floor((delta / 60) % 60)
          let s = Math.floor(delta % 60)
          this.h = h < 10 ? `0${h}` : h
          this.m = m < 10 ? `0${m}` : m
          this.s = s < 10 ? `0${s}` : s
        }
      }, 1000)
    },
    stopTimer() {
      this.t && clearInterval(this.t)
    }
  }
}
</script>

<style lang="less">
.timer-wrap{
  display: flex;
  align-items: center;
  .b{
    width: 32rpx;
    height: 32rpx;
    text-align: center;
    color: #fff;
    background: #D81719;
    border-radius: 4rpx;
    line-height: 32rpx;
    font-size: 10px;
  }
  .d{
    color: #D81719;
    font-size: 12px;
    margin: 0 6rpx;
    font-weight: bold;
  }
}
</style>