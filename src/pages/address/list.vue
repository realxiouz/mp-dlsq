<template>
  <div >
    <div v-for="(i, inx) in list" :key="inx" class="address-item bg-white flex align-center">
      <div class="font12 left" style="color:#333;">
        <div class="flex">{{i.address}} <div v-if="curAddress.id==i.id">已选择</div></div>
        <div>{{`${i.consignee} ${i.phone}`}}</div>
      </div>
    </div>
    <bottom-bar :bar-height="120">
      <div style="height:120rpx" class="flex align-center justify-around">
        <div class="btn text-center" @click="$go('/pages/address/detail')">添加地址</div>
      </div>
    </bottom-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  onShow() {
    this.$showLoading()
    this.$post('address')
      .then(r => {
        this.list = r.data
      })
      .finally(_ => {
        this.$hideLoading()
      })
  },
  data() {
    return {
      list: [],
      isLoaded: false,
    }
  },
  computed: {
    ...mapState('cart', ['curAddress'])
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
.address-item{
  height: 150rpx;
  border-bottom: 1rpx solid #BCD0EB;
}
</style>