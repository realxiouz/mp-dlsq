<template>
  <div>
    <map id="map" :longitude="longitude" :latitude="latitude" :markers="markers" :polyline="polyline">
      <cover-image src="/static/img/back-fix.png" class="back" @click.stop="$go(1, 'back')"/>
    </map>
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
}
</script>

<style lang="less">
#map{
  width: 750rpx;
  height: 750rpx;
}

.back{
  width: 48rpx;
  height: 48rpx;
  left: 18px;
  top: 60px;
  position: absolute;
}
</style>