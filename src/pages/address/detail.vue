<template>
  <div>
    <div class="sticky">
      <div class="bg-primary doing flex align-center justify-around">
        <div style="font-size:14px;">添加收货地址</div>
      </div>
    </div>
    <div class="line flex align-center bg-white">
      <div class="title">
        联系人
      </div>
      <input v-model="name" placeholder="请填写收货人的姓名" class="left" />
      <picker class="left" :range="sexTypes" :value="sexInx" @change="sexInx=$event.detail.value">
        <div class="flex">
          <div class="left"></div>
          <div>{{sexTypes[sexInx]}}</div>
          <div class="icon-right" style="font-size:16px;color:#A0A0A0;margin-left:10rpx;"></div>
        </div>
      </picker>
    </div>
    <div class="line flex align-center bg-white">
      <div class="title">
        手机号
      </div>
      <input v-model="phone" placeholder="请填写收货人手机号" class="left" />
    </div>
    <div class="line flex align-center bg-white" @click="onChooseLocation">
      <div class="title">
        收货地址
      </div>
      <div class="left text-cut">{{selAddress?selAddress:'选择送货地址'}}</div>
      <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
    </div>
    <div class="line flex align-center bg-white">
      <div class="title">
        详细地址
      </div>
      <input v-model="addressDetail" placeholder="详细地址-小区-栋-单元-层-室" class="left" />
    </div>
  </div>
</template>

<script>
import { getWxAuthSetting } from '@/common/js/utils'

export default {
  data() {
    return {
      sexInx: 0,
      sexTypes: ['先生', '女士'],
      selAddress: '',

      addressDetail: '',
      name: '',
      phone: '',
      
    }
  },
  methods: {
    async onChooseLocation() {
      let {isRequired, isAllowed} = await getWxAuthSetting('userLocation')
      if ((isRequired && isAllowed) || !isRequired) {
        try {
          let {latitude, longitude, address, name} = await wx.chooseLocation({})
          this.latitude = latitude
          this.longitude = longitude
          this.selAddress = address || name
        } catch(e) {
          this.locationTip()
        }
      } else {
        this.locationTip()
      }
    },
    async locationTip() {
      this.$showModal({
        content: '必须授权地理权限',
        showCancel: true,
        successCb: _ => {
          wx.openSetting({
            success: r => {
              this.onChooseLocation()
            }
          })
        }
      })
    },
  }
}
</script>

<style lang="less">
.doing{
  height: 76rpx;
}

.line{
  border-bottom: 1px solid #BCD0EB;
  min-height: 80rpx;
  padding: 0 36rpx;
  color:#010101;
  font-size:10px;
  line-height:80rpx;
  .title{
    width: 130rpx;
  }
}
</style>