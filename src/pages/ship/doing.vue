<template>
  <div class="flex column" style="height:100vh;">
    <div class="left pos-r" style="width:750rpx;">
      <map  id="map" :longitude="longitude" :latitude="latitude" :markers="markers" :polyline="polyline">
        <cover-image src="/static/img/back-fix.png" class="back" @click.stop="$go(1, 'back')"/>
      </map>

      <cover-image src="/static/img/refresh.png" class="pos-a" style="width:60rpx;height:60rpx;bottom:40rpx;left:40rpx;" @click="onRefresh" />
    </div>
    <div class="ship-info bg-white">
      <div style="padding:30rpx 0;" class="font14">
        <div>预计<span style="color:#FFCE50">{{'10:20'}}</span>送达</div>
        <div style="margin-top:16rpx">配送信息</div>
      </div>
      <div style="border-top:1rpx solid #A0A0A0;border-bottom:1rpx solid #A0A0A0;">
        <div class="line flex">
          <div class="title">配送清单</div>
          <div class="left">
            <div class="flex justify-between in-line" v-for="(j) in 4" :key="j">
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
        <div style="height:20rpx;"></div>
      </div>
      <div class="flex align-center" style="padding:24rpx 0" @click="onTel">
        <img style="width:56rpx;height:56rpx;" src="/static/img/phone.png" alt="">
        <div style="margin-left:100rpx;color:#494949">联系配送人员</div>
      </div>
    </div>
  </div>
</template>

<script>
import { getWxAuthSetting } from '@/common/js/utils'
export default {
  async onLoad(opt) {
    
  },
  async onShow() {
    let {isRequired, isAllowed} = await getWxAuthSetting('userLocation')

    if ((isRequired && isAllowed) || !isRequired) {
      try {
        let {latitude, longitude} = await wx.getLocation({})
        this.latitude = latitude
        this.longitude = longitude
      } catch(e) {
        this.$showModal({
          content: '必须授权地理权限',
          showCancel: true,
          successCb: _ => {
            wx.openSetting()
          }
        })
      }
    } else {
      this.$showModal({
        content: '必须授权地理权限',
        showCancel: true,
        successCb: _ => {
          wx.openSetting()
        }
      })
    }
  },
  data() {
    return {
      longitude: '',
      latitude: '',
      markers: [],
      polyline: [],
    }
  },
  methods: {
    onTel() {
      wx.makePhoneCall({
        phoneNumber: '10086'
      })
    },
    onRefresh() {
      console.log(1)
      this.$get('/order/locationList', {
        order_id: 2
      })
        .then(r => {

        })
    }
  }
}
</script>

<style lang="less">
#map{
  width: 100%;
  height: 100%;
}

.back{
  width: 48rpx;
  height: 48rpx;
  left: 18px;
  top: 60px;
  position: absolute;
}

.ship-info{
  padding: 0 100rpx;
  border-radius: 36rpx 36rpx 0 0;
}

.line{
  margin-top: 16rpx;
  color: #010101;
  font-size: 12px;
  .title{
    color: #A6A6A6;
    width: 130rpx;
  }
}

.in-line{
  margin-bottom: 16rpx;
  &:last-child{
    margin-bottom: 0;
  }
}
</style>