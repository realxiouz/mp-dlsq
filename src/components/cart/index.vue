<template>
  <div class="cart-wrap ">
    <div class="flex pos-r" style="z-index:1111;">
      <div class="left flex align-center bg-primary">
        <div style="width:72rpx;height:58rpx;margin: 0 24rpx 0 36rpx">
          <img src="/static/img/cart.png" style="width:100%;height:100%;"  />
        </div>
        <div style="font-size:12px;margin-right:24rpx;">购物车</div>
        <div style="height:48rpx;width:2rpx;background:#fff;"></div>
        <div class="left">
          <div class="text-center" v-if="!count" style="font-size:10px;">暂无任何商品  请添加商品后再进行结算</div>
          <div class="text-center" v-else style="font-size:10px;">共计: <span class="text-price text-bold" style="font-size:18px;">6.00</span>
          </div>
      </div>
    </div>
    <template v-if="count">
      <div style="height:100rpx;width:16rpx;"></div>
      <div class="bg-bold text-center" style="width:140rpx;font-size:12px;line-height:100rpx;" @click.stop="onShowDetail">{{!showDetail?'查看':'去结算'}}</div>
    </template>
    </div>
    

    <modal :show.sync="showDetail" :is-bottom="false">
      <div class="bg-white flex column" style="width:510rpx;height:685rpx;border-radius:16rpx;padding:0 32rpx;">
        <div class="color-primary flex align-center justify-around" style="height:76rpx;border-bottom: 1rpx solid #ADC3E5;font-size:12px">购物车</div>
        <scroll-view class="left" style="width:100%;" scroll-y>
          <div class="cart-item" v-for="(i,inx) in 3" :key="i">
            <div class="flex">
              <img src="/static/img/water.jpg" style="width:194rpx;height:206rpx;margin-right:27rpx" />
              <div class="left">
                <div class="flex column" style="height:100%;">
                  <div class="flex">
                    <div style="font-size:10px">
                      <div>大理山泉</div>
                      <div>袋装(10L)</div>
                    </div>
                    <div class="left"></div>
                    <div class="text-bold text-price color-primary">6</div>
                  </div>
                  <div class="left"></div>
                  <div class="text-center color-primary" style="font-size:10px;margin-bottom:20rpx;">购买数量</div>
                  <goods-number/>
                </div>
              </div>
            </div>
          </div>
        </scroll-view>
        <div class="color-primary flex align-center justify-around" style="height:76rpx;border-top: 1rpx solid #ADC3E5;font-size:10px;">
          <div @click.stop="onClear">清空购物车</div>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
export default {
  data() {
    return {
      count: 1,
      showDetail: false,
    }
  },
  methods: {
    onShowDetail() {
      if (!this.showDetail) {
        this.showDetail = true
      } else {
        this.$go(`/pages/order/pay`)
        this.showDetail = false
      }
    },
    onClear() {
      this.$showModal({
        content: '确定要清空购物车么?',
        showCancel: true,
        successCb: _ => {
          this.$toast('todo...')
        }
      })
    }
  }
}
</script>

<style lang="less">
.cart-wrap{
  position: fixed;
  width: 684rpx;
  height: 100rpx;
  left: 33rpx;
  border-radius: 18rpx;
  bottom: 30rpx;
  z-index: 11110;
  overflow: hidden;

  .cart-item{
    padding: 30rpx 0;
  }
}
</style>