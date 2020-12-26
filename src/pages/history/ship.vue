<template>
  <div>
    <div class="sticky bg-primary flex align-center" style="height:100rpx;padding:0 48rpx;">
      <picker class="font14" mode="date" fields="month" @change="onSel">选择月份: {{selDate?selDate:'全部'}}</picker>
    </div>
    <div class="ship-item bg-white" v-for="(i, inx) in list" :key="inx" @click="$go(`/pages/ship/doing?id=${i.order_sn}`)">
      <div class="bg-primary text-center font10 text-bold" style="padding: 0 70rpx;">
        {{i.createtime|time('YYYY-MM-DD')}}
      </div>
      <div style="padding: 0 70rpx;">
        <div class="line flex">
          <div class="title">配送清单</div>
          <div class="left">
            <div class="flex justify-between" v-for="(j, index) in i.item" :key="index" style="margin-bottom:20rpx;">
              <div>{{j.goods_title}}</div>
              <div>X {{j.goods_num}}</div>
            </div>
          </div>
        </div>
        <div class="line flex">
          <div class="title">配送类型</div>
          <div class="left"></div>
          <div>试试配送</div>
        </div>
        <div class="line flex">
          <div class="title">配送地址</div>
          <div class="left"></div>
          <div>
            <div>{{i.address}}</div>
            <div>{{`${i.consignee} ${i.phone}`}}</div>
          </div>
        </div>
        <div class="line flex">
          <div class="title">配送人员</div>
          <div class="left"></div>
          <div>杨某某</div>
        </div>
        <div class="line flex">
          <div class="title">配送单号</div>
          <div class="left"></div>
          <div>{{i.order_sn}}</div>
        </div>
        <div class="line flex">
          <div class="title">下单时间</div>
          <div class="left"></div>
          <div>{{i.createtime|time}}</div>
        </div>
        <div class="line flex">
          <div class="title">送达时间</div>
          <div class="left"></div>
          <div>{{i.ext_arr.send_time|time}}</div>
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
      if (reset) {
        this.page = 1
        this.list = []
        this.isEnd = false
      }
      let d = {
        page: this.page,
        type: 'all',
        order_type: 'delivery'
      }
      if (this.selDate) {
        d.date = this.selDate
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
.ship-item{
  padding: 30rpx 0;
  margin-bottom: 20rpx;
  .line{
    margin-top: 30rpx;
    color: #010101;
    font-size: 12px;
    .title{
      color: #A6A6A6;
      width: 130rpx;
    }
  }
}
</style>