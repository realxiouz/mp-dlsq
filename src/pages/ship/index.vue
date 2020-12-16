<template>
  <div>
    <div class="sticky">
      <div class="bg-bold doing  flex align-center justify-around" @click="$go(`/pages/ship/doing`)">
        <div style="font-size:12px;">正在进行的配送</div>
      </div>
      <div class="bg-primary doing flex align-center justify-around">
        <div style="font-size:14px;">我的存水</div>
      </div>
    </div>
    <div class="ship-line flex align-center bg-white" v-for="(i, inx) in list" :key="inx">
      <div class="img-wrap">
        <img :src="i.goods_image" style="width:100%;height:100%;" />
      </div>
      <div class="left">
        <div style="color:#010101;font-size:10px;">{{i.goods_title}}</div>
      </div>
      <div class="flex column align-center">
        <div class="color-primary" style="font-size:10px;margin-bottom:24rpx;">配送数量</div>
        <ship-number w="190rpx" v-model="i.goods_num" :max="i.max"/>
      </div>
    </div>
    <div class="ship-line flex align-center bg-white">
      <div class="img-wrap1 flex align-center justify-center">
        <img src="/static/img/time.png" style="width:44rpx;height:44rpx;" alt="">
      </div>
      <picker class="left" :range="types" @change="onTypeChange" :value="typeInx">
        <div class="flex align-center">
          <div class="left" style="color:#010101;font-size:10px;line-height:80rpx;">{{typeInx>=0?types[typeInx]:'选择配送类型'}}</div>
          <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
        </div>
      </picker>
    </div>
    <div class="ship-line flex align-center bg-white" v-if="typeInx==1">
      <div class="img-wrap1 flex align-center justify-center">
      </div>
      <picker class="left" :range="types" @change="onDateChange" :value="selDate" mode="date">
        <div class="flex align-center">
          <div class="left" style="color:#010101;font-size:10px;line-height:80rpx;">
            {{!selDate?'选择配送日期':`选择的日期: ${selDate}`}}
          </div>
          <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
        </div>
      </picker>
    </div>
    <div class="ship-line flex align-center bg-white" v-if="typeInx==1">
      <div class="img-wrap1">
      </div>
      <picker class="left" :range="types" @change="onTimeChange" :value="selTime" mode="time">
        <div class="flex align-center">
          <div class="left" style="color:#010101;font-size:10px;line-height:80rpx;">
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
      <div class="left" style="color:#010101;font-size:10px;line-height:80rpx;">
        选择配送地址
      </div>
      <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
    </div>

    <bottom-bar :bar-height="120">
      <div style="height:120rpx" class="flex align-center justify-around">
        <div class="btn flex align-center justify-center" @click="onConfirm">发起配送</div>
      </div>
    </bottom-bar>
  </div>
</template>

<script>
import shipNumber from '@/components/shipNumber'
import dayjs from 'dayjs'

export default {
  onLoad(opt) {
  },
  onShow() {
    this.$showLoading()
    this.$get('order/deposit')
      .then(r => {
        this.list = r.data.map(i => {
          i.max = i.goods_num
          return i
        })
      })
      .finally(_ => {
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
      let d = {
        address_id: 10,
        from: 'cart',
        goods_list: this.list.map(i => ({
          sku_price_id: i.goods_sku_price_id,
          goods_id: i.goods_id,
          goods_num: i.goods_num,
          dispatch_date: this.typeInx == 0 ? dayjs(new Date()).format('YYYY-MM-DD HH:mm') : `${this.selDate} ${this.selTime}`,
          dispatch_phone: '15912510617'
        }))
      }
      console.log(d)
      this.$post('order/delivery', d)
        .then(r => {

        })
    }
  },
  components: {
    shipNumber
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
}
</style>