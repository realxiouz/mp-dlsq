<template>
  <div>
    <div class="sticky bg-primary flex align-center" style="height:100rpx;padding:0 48rpx;">
      <picker class="font14" mode="date" fields="month" @change="onSel">选择月份: {{selDate?selDate:'全部'}}</picker>
    </div>
    <div class="order-item bg-white" v-for="(i) in list" :key="i.id">
      <div class="bg-primary flex align-center font10 text-bold" style="padding: 0 70rpx;">
        <div class="left">{{i.createtime|time('YYYY-MM-DD')}}</div>
        <div>{{i.createtime|time('HH:mm')}}</div>
      </div>
      <div style="padding: 0 70rpx;">
        <!-- <div class="line flex">
          <div class="left">订单状态</div>
          <div>{{i.status_name}}</div>
        </div> -->
        <div class="line flex">
          <div class="left">订单号码<span style="margin-left:24rpx">{{i.order_sn}}</span></div>
        </div>
        <div class="line flex" v-for="(item, index) in i.item" :key="index">
          <div class="left">{{item.goods_title}}</div>
          <div>X {{item.goods_num}}</div>
        </div>
        <div class="line flex">
          <div class="left">共计</div>
          <div>￥{{i.total_fee}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
    this.getData()
  },
  data() {
    return {
      selDate: '',
      page: 1,
      list: [],
      isLoading: false,
      isEnd: false,
    }
  },
  methods: {
    onSel(e) {
      this.selDate = e.detail.value
      this.getData(true)
    },
    getData(reset = false) {
      let d = {
        page: this.page,
        type: 'payed',
      }
      if (this.selDate) {
        d.date = this.selDate
      }
      if (reset) {
        this.page = 1
        this.list = []
        this.isEnd = false
      }
      this.isLoading = true
      this.$showLoading()
      this.$get('order/index', d)
        .then(r => {
          this.list.push(...r.data.data)
          if (this.page >= r.data.last_page) {
            this.isEnd = true
          }
        })
        .finally(_ => {
          this.isLoading = false
          this.$hideLoading()
        })
    }
  },
  onReachBottom() {
    if (this.isLoading||this.isEnd) {
      return
    }
    this.page++
    this.getData()
  }
}
</script>

<style lang="less">
.order-item{
  padding: 30rpx 0;
  margin-bottom: 30rpx;
  .line{
    margin-top: 30rpx;
    color: #010101;
    font-size: 12px;

  }
}
</style>