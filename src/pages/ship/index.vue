<template>
  <div>
    <div class="sticky">
      <div v-if="shipList.length" class="bg-bold doing  flex align-center justify-center" style="width:100%;" >
        <div class="pos-r" style="margin-right:40rpx;">
          <img style="width:48rpx;height:48rpx" src="/static/img/shiping.png" alt="">
        </div>
        <picker :range="shipList" range-key="order_sn" @change="onOrderChange">
          <div style="font-size:12px;">未完成的订单</div>
        </picker>
      </div>
      <div class="bg-primary doing flex align-center justify-center">
        <img style="width:36rpx;height:36rpx;margin-right:12rpx;" src="/static/img/cz.png" alt="">
        <div style="font-size:14px;"> 我的存水</div>
      </div>
    </div>
    <template v-if="list.length">
      <div class="ship-line flex align-center bg-white" v-for="(i, inx) in list" :key="inx">
        <div class="img-wrap">
          <img :src="i.goods_image" style="width:100%;height:100%;" />
        </div>
        <div class="left">
          <div style="color:#010101;font-size:14px;">{{i.goods_title}}</div>
          <div style="font-size:14px;" :style="{color: i.goods_num<=1 ? '#EB6877' :'#5677AB'}">库存: {{i.goods_num}}</div>
        </div>
        <div class="flex column align-center">
          <div class="color-primary" style="font-size:14px;margin-bottom:24rpx;">配送数量</div>
          <ship-number w="190rpx" v-model="i.count" :max="i.max"/>
        </div>
      </div>
      <div class="ship-line flex align-center bg-white">
        <div class="img-wrap1 flex align-center justify-center">
          <img src="/static/img/time.png" style="width:44rpx;height:44rpx;" alt="">
        </div>
        <picker class="left" :range="types" @change="onTypeChange" :value="typeInx">
          <div class="flex align-center">
            <div class="left" style="color:#010101;font-size:14px;line-height:80rpx;">{{typeInx>=0?types[typeInx]:'选择配送类型'}}</div>
            <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
          </div>
        </picker>
      </div>
      <div class="ship-line flex align-center bg-white" v-if="typeInx==1">
        <div class="img-wrap1 flex align-center justify-center">
          <img src="/static/img/time.png" style="width:44rpx;height:44rpx;" alt="">
        </div>
        <picker class="left" :range="types" @change="onDateChange" :value="selDate" mode="date">
          <div class="flex align-center">
            <div class="left" style="color:#010101;font-size:14px;line-height:80rpx;">
              {{!selDate?'选择配送日期':`选择的日期: ${selDate}`}}
            </div>
            <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
          </div>
        </picker>
      </div>
      <div class="ship-line flex align-center bg-white" v-if="typeInx==1">
        <div class="img-wrap1 flex align-center justify-center">
          <img src="/static/img/time.png" style="width:44rpx;height:44rpx;" alt="">
        </div>
        <picker class="left" :range="types" @change="onTimeChange" :value="selTime" mode="time">
          <div class="flex align-center">
            <div class="left" style="color:#010101;font-size:14px;line-height:80rpx;">
              {{!selDate?'选择配送时间':`选择的时间: ${selTime}`}}
            </div>
            <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
          </div>
        </picker>
      </div>
      <div class="ship-line flex align-center bg-white" @click="$go('/pages/address/list')">
        <div class="img-wrap1 flex align-center justify-center">
          <img src="/static/img/loc.png" style="width:44rpx;height:44rpx;" alt="">
        </div>
        <div class="left" style="color:#010101;font-size:14px;line-height:80rpx;">
          {{curAddress.id?curAddress.address:'选择配送地址'}}
        </div>
        <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
      </div>

      <bottom-bar :bar-height="120">
        <div style="height:120rpx" class="flex align-center justify-around">
          <div class="btn flex align-center justify-center" :class="{dis}" @click="onConfirm">发起配送</div>
        </div>
      </bottom-bar>
    </template>
    <template v-else>
      <div class="flex column align-center">
        <div class="font12" style="color:#0606060;margin:120rpx 0 80rpx">我的存水空空如也，请移步商城购水后方可查看。</div>
        <img style="width:323rpx;height:323rpx;" src="/static/img/empty-w.png" alt="">
      </div>
    </template>
  </div>
</template>

<script>
import shipNumber from '@/components/shipNumber'
import dayjs from 'dayjs'
import { mapState } from 'vuex'

export default {
  onLoad(opt) {
  },
  onShow() {
    this.$showLoading()
    Promise.all([
      this.$get('order/deposit'),
      this.$get('order/index?type=noget&order_type=delivery')
    ]).then(r => {
      this.list = r[0].data.filter(i => i.goods_num).map(i => {
        i.count = 0
        i.max = i.goods_num
        return i
      })
      let {data = []} = r[1].data
      this.shipList = data
    }).finally(_ => {
      this.$hideLoading()
    })
  },
  data() {
    return {
      typeInx: -1,
      types: ['实时配送', '预约配送'],
      selDate: '',
      selTime: '',

      list: [],

      shipList: [],
    }
  },
  methods: {
    
    onTypeChange(e) {
      this.typeInx = e.detail.value
    },
    onDateChange(e) {
      this.selDate = e.detail.value
    },
    onTimeChange(e) {
      this.selTime = e.detail.value
    },
    onConfirm() {
      if (this.dis) {
        return
      }
      let d = {
        address_id: this.curAddress.id,
        from: 'cart',
        reservation: this.typeInx,
        goods_list: this.list.filter(i => i.count).map(i => ({
          sku_price_id: i.goods_sku_price_id,
          goods_id: i.goods_id,
          goods_num: i.count,
          dispatch_date: this.typeInx == 0 ? dayjs(new Date()).format('YYYY-MM-DD HH:mm') : `${this.selDate} ${this.selTime}`,
          dispatch_phone: this.curAddress.phone,
        }))
      }
      this.$post('order/delivery', d)
        .then(r => {
          this.$showModal({
            content: '下单成功,等待配送员配送',
            successCb: _ => {
              this.$go('/pages/shop/index', 'switch')
            }
          })
        })
    },
    onOrderChange(e) {
      let id = this.shipList[e.detail.value].id
      this.$go(`/pages/ship/doing?id=${id}`)
    }
  },
  components: {
    shipNumber
  },
  computed: {
    ...mapState('cart', ['curAddress']),
    dis() {
      if ((this.typeInx==0 || (this.typeInx == 1 && this.selDate && this.selTime)) && this.curAddress.id && this.list.some(i => i.count)) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="less">
.doing{
  height: 76rpx;
}

.ship-line{
  border-bottom: 1px solid #BCD0EB;
  min-height: 134rpx;
  padding: 30rpx 36rpx;
  .img-wrap{
    width: 110rpx;
    height: 110rpx;
    margin-right: 36rpx;
  }
  .img-wrap1{
    width: 80rpx;
    height: 80rpx;
    margin-right: 36rpx;
  }
}

.btn {
  background: #ADC3E5;
  height: 77rpx;
  width: 700rpx;
  color: #fff;
  font-size: 12px;
  border-radius: 12rpx;
  line-height: 77rpx;
  &.dis{
    background: #B5B5B5;
  }
}
</style>