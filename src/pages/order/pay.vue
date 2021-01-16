<template>
  <div style="padding: 50rpx 40rpx 0;min-height:100vh;background:#fff">
    <div class="flex column align-center" style="width:100%;">
      <div class="color-primary" style="font-size:14px;">商城订单</div>
      <div style="color:#868787;margin-top:50rpx;font-size:8px;">支付剩余时间: {{str}}</div>
      <div class="text-bold text-price" style="color:#060606;font-size:30px;margin:30rpx 0;">{{totalPrice}}</div>
      <div class="flex align-center" style="color:#868787;font-size:10px;" @click="show=!show">
        查看订单详情 <div style="font-size:10px;margin-left:10rpx" :class="show?'icon-down':'icon-right'"></div>
      </div>
      <div v-if="show" style="width:400rpx;margin-top:30rpx;color:#5F5F5F;font-size:10px;">
        <!-- <div class="flex line">
          订单号码: {{'11111111'}}
        </div> -->
        <div class="flex line" v-for="(i, inx) in cartGoods" :key="inx">
          <div>{{i.title}}</div>
          <div>{{i.subtitle}}</div>
          <div class="left"></div>
          <div>X {{i.goods_num}}</div>
        </div>
        <div class="flex line">
          <div>共计</div>
          <div class="left"></div>
          <div>￥{{totalPrice}}</div>
        </div>
      </div>

      <div style="width:670rpx;height:2rpx;background:#A0A0A0;margin:60rpx 0;"></div>

      <div class="flex" style="margin-bottom:36rpx;width:670rpx;" @click="check0=!check0">
        <div style="padding-left:20rpx;width:88rpx" >
          <div :class="check0?'color-primary icon-check':'icon-uncheck color-gray'" style="font-size:14px;" ></div>
        </div>
        <div class="left" style="color:#868787;font-size:10px;">尊敬的用户，请您仔细核对订单详情并确认无误后，再进行支付。</div>
      </div>
      <div class="flex" style="margin-bottom:36rpx;width:670rpx;" @click="check1=!check1">
        <div style="padding-left:20rpx;width:88rpx"  >
          <div :class="check1?'color-primary icon-check':'icon-uncheck color-gray'" style="font-size:14px;"></div>
        </div>
        <div class="left" style="color:#868787;font-size:10px;">此订单如需实时╱预约配送，请勾选此选项。支付成功后系统将自动为您跳转至配送页面。否则此订单支付成功后，将默认进入我的存水库存中。</div>
      </div>

      <div class="flex align-center" style="width:670rpx;margin-top:10rpx" @click="check2=!check2">
        <div style="width:88rpx">
          <img src="/static/img/wepay.png" style="width:50rpx;height:50rpx;" alt="">
        </div>
        <div class="">微信支付</div>
        <div class="left"></div>
        <div :class="check2?'color-primary icon-check':'icon-uncheck color-gray'" style="font-size:50rpx;"></div>
      </div>

      <bottom-bar :bar-height="120">
        <div style="height:120rpx" class="flex align-center justify-around">
          <div class="btn text-center" :class="{can:check0&&check2}" @click="onPay">确定支付</div>
        </div>
      </bottom-bar>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters } from 'vuex'
export default {
  onLoad() {
    this.startTimer()
  },
  onUnload() {
    this.t && clearInterval(this.t)
  },
  data() {
    return {
      show: false,

      check0: true,
      check1: false,
      check2: true,

      str: '15:00'
    }
  },
  methods: {
    startTimer() {
      let countDown = 15 * 60
      this.t = setInterval(_ => {
        countDown--
        let m = parseInt(countDown / 60)
        let s = countDown % 60
        this.str = `${m<10?'0'+m:m}:${s<10?'0'+s:s}`
        if (countDown <= 0) {
          clearInterval(this.t)
          this.$showModal({
            content: '支付超时,重新支付',
            successCb: _ => {
              this.$go(1, 'back')
            }
          })
        }
      }, 1000)
    },
    onPay() {
      if (this.check0&&this.check2) {
        if (this.order_sn) {
          this.payBySN()
        } else {
          if (!this.curAddress.id && this.check1) {
            this.$showModal({
              content: '还没有选择配送地址,点击确定去选择',
              successCb: _ => {
                this.$go('/pages/address/list')
              }
            })
            return
          }
          let d = {
            from: 'cart',
            // address_id: this.curAddress.id,
            goods_list: this.cartGoods.map(i => {
              i.dispatch_type = this.check1 ? 'store' : 'selfetch'
              // i.store_id = 1
              return i
            })
          }
          this.$post('order/createOrder', d)
            .then(r => {
              this.order_sn = r.data.order_sn
              this.payBySN()
            })
        }
      }
    },
    payBySN() {
      this.$post('pay/prepay', {
        order_sn: this.order_sn,
        payment: 'wechat'
      }).then(res => {
        let { nonceStr, paySign, signType, timeStamp} = res.data.pay_data
        uni.requestPayment({
          timeStamp,
          nonceStr,
          package: res.data.pay_data.package,
          paySign,
          signType,
          success: (r) => {
            this.$store.dispatch('cart/updateCart')
            this.$go(`/pages/order/success?t=${this.check1?1:2}`)
          },
          fail: (e) => {
            console.log(e)
          },
          complete: _ => {

          }
        });
      })
    }
  },
  computed:{
    ...mapGetters('cart', ['totalCount', 'totalPrice']),
    ...mapState('cart', ['cartGoods', 'curAddress']),
  }
}
</script>

<style lang="less">
.line {
  margin-bottom: 30rpx;
  &:last-child{
    margin-bottom: 0;
  }
}

.btn {
  background: #B5B5B5;
  height: 77rpx;
  width: 584rpx;
  color: #fff;
  font-size: 12px;
  border-radius: 12rpx;
  line-height: 77rpx;
  &.can{
    background: #ADC3E5;

  }
}

.color-gray{
  color: #868787 !important;
}
</style>