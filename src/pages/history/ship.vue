<template>
  <div>
    <div class="sticky bg-primary flex align-center" style="height:100rpx;padding:0 48rpx;">
      <picker class="font14" mode="date" fields="month" @change="onSel">选择月份: {{selDate?selDate:'全部'}}</picker>
    </div>
    <div class="ship-item bg-white" v-for="(i) in 4" :key="i">
      <div class="bg-primary text-center font10 text-bold" style="padding: 0 70rpx;">
        2020-10-27
      </div>
      <div style="padding: 0 70rpx;">
        <div class="line flex">
          <div class="title">配送清单</div>
          <div class="left">
            <div class="flex justify-between" v-for="(j) in 4" :key="j" style="margin-bottom:20rpx;">
              <div>大理山泉</div>
              <div>X 5</div>
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
            <div>摩玛大厦2期A座708室</div>
            <div>李先生 13669727535</div>
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
          <div>202010271006</div>
        </div>
        <div class="line flex">
          <div class="title">下单时间</div>
          <div class="left"></div>
          <div>2020-10-27 09：32：29</div>
        </div>
        <div class="line flex">
          <div class="title">送达时间</div>
          <div class="left"></div>
          <div>2020-10-27 09：32：29</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selDate: ''
    }
  },
  methods: {
    onSel(e) {
      this.selDate = e.detail.value
    }
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