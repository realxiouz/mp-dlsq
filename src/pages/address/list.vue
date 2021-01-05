<template>
  <div >
    <div class="sticky bg-primary font14 text-center pos-r" style="line-height:100rpx;">
      地址管理
      <img @click.stop="isEdit=!isEdit" v-if="list.length" class="pos-a" style="width:60rpx;height:60rpx;top:20rpx;right:60rpx" src="/static/img/setting.png" alt="">
    </div>
    <template v-if="list.length">
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
        <div class="pos-r flex align-center justify-around" style="width:55rpx;height:55rpx;margin:0 48rpx 0 120rpx;">
          <img class="pos-a" style="width:55rpx;height:55rpx;" src="/static/img/house.png" alt="">
          <div style="color:#97B5E5" class="text-bold">{{inx+1}}</div>
        </div>
        <div class="font12 left" style="color:#333;" @click="onSel(i)">
          <div class="flex">{{i.address}} </div>
          <div class="flex align-center">
            {{`${i.consignee} ${i.phone}`}} <div class="bg-primary" style="padding:4rpx 8rpx;margin-left:8rpx;border-radius:4rpx;" v-if="curAddress.id==i.id">已选择</div>
          </div>
        </div>
        <div class="icon-right" style="margin-right:16rpx" @click="$go(`/pages/address/detail?id=${i.id}`)"></div>
      </div>
    </template>
    <div class="flex column align-center" v-else>
      <div style="color:#060606;margin: 60rpx 0;" class="font14">您还未添加过任何收货地址</div>
      <img src="/static/img/empty-address.png" style="width:376rpx;height:376rpx;" alt="">
    </div>
    <bottom-bar :bar-height="120">
      <div style="height:120rpx" class="flex align-center justify-around">
        <div v-if="!isEdit" class="add-btn flex align-center justify-center" @click="$go('/pages/address/detail')">
         <img src="/static/img/add.png" style="width:40rpx;height:40rpx;margin-right:16rpx;" alt=""> 添加地址</div>
        <div v-else class="btn flex align-center justify-center" style="background:#E598A4;" @click="onDel">
          <img src="/static/img/close.png" style="width:40rpx;height:40rpx;margin-right:16rpx;" alt="">删除地址</div>
      </div>
    </bottom-bar>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  onShow() {
    this.getData()
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
    getData() {
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
    onDel() {
      let arr = this.list.filter(i => i.check).map(i => i.id)
      if (arr.findIndex(i => i == this.curAddress.id)>-1) {
        this.$toast('不能删除已选择地址')
        return
      }
      if (!arr.length) {
        this.$toast('还没有选择删除的地址')
      } else {
        this.$showModal({
          content: '确定要删除选定的地址么?',
          showCancel: true,
          successCb: _ => {
            this.$del('address/del', {
              id: arr
            }).then(r => {
              this.getData()
              this.isEdit = false
            })
          }
        })
      }
    },
    onSel(i) {
      this.$setStorage('address', i)
      this.$store.commit('cart/setCurAddress', i)
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

.add-btn{
  background: #fff;
  height: 77rpx;
  width: 700rpx;
  border: 1rpx solid #5677AB;
  color: #5677AB;
  font-size: 12px;
  border-radius: 10rpx;
}
.address-item{
  height: 150rpx;
  border-bottom: 1rpx solid #BCD0EB;
}
</style>