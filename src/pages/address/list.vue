<template>
  <div >
    <div class="sticky bg-primary font14 text-center pos-r" style="line-height:100rpx;">
      地址管理
      <img @click.stop="isEdit=!isEdit" v-if="list.length" class="pos-a" style="width:60rpx;height:60rpx;top:20rpx;right:60rpx" src="/static/img/right-blue.png" alt="">
    </div>
    <div class="font12 flex align-center justify-center" style="height:90rpx;color:#BCD0EB">
      我的收货地址
    </div>
    <div v-for="(i, inx) in list" :key="inx" class="address-item bg-white flex align-center pos-r">
      <div
        @click="onToggle(i)"
        v-if="isEdit"
        style="font-size:36rpx;left:42rpx;top:55rpx;"
        class="pos-a"
        :class="i.check?'color-primary icon-check':'icon-uncheck color-gray'"></div>
      <img style="width:55rpx;height:55rpx;margin:0 48rpx 0 120rpx;" src="/static/img/wepay.png" alt="">
      <div class="font12 left" style="color:#333;">
        <div class="flex">{{i.address}} <div v-if="curAddress.id==i.id">已选择</div></div>
        <div>{{`${i.consignee} ${i.phone}`}}</div>
      </div>
    </div>
    <bottom-bar :bar-height="120">
      <div style="height:120rpx" class="flex align-center justify-around">
        <div v-if="!isEdit" class="btn text-center" @click="$go('/pages/address/detail')">添加地址</div>
        <div v-else class="btn text-center" style="background:#E598A4;" @click="onDel">删除地址</div>
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
        this.list = r.data.map(i => {
          i.check = false
          return i
        })
      })
      .finally(_ => {
        this.$hideLoading()
      })
  },
  data() {
    return {
      list: [],
      isLoaded: false,
      isEdit: false,
    }
  },
  computed: {
    ...mapState('cart', ['curAddress'])
  },
  methods: {
    onToggle(i) {
      i.check = !i.check
      this.$forceUpdate()
    },
    onDel() {
      let arr = this.list.filter(i => i.check)
      if (!arr.length) {
        this.$toast('还没有选择删除的地址')
      } else {
        this.$showModal({
          content: '确定要删除选定的地址么?',
          showCancel: true,
          successCb: _ => {
            this.$toast('todo')
          }
        })
      }
    }
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