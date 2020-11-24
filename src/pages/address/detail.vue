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
      <input v-model="consignee" placeholder="请填写收货人的姓名" class="left" />
      <picker class="left" :range="sexTypes" :value="sexInx" @change="sexInx=$event.detail.value">
        <div class="flex">
          <div class="left"></div>
          <div >{{sexTypes[sexInx]}} </div>
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
      <div class="left text-cut">{{name?name:'选择送货地址'}}</div>
      <div class="icon-right" style="font-size:16px;color:#A0A0A0"></div>
    </div>
    <div class="line flex align-center bg-white">
      <div class="title">
        详细地址
      </div>
      <input v-model="address" placeholder="详细地址-小区-栋-单元-层-室" class="left" />
    </div>

    <bottom-bar :bar-height="120">
      <div style="height:120rpx" class="flex align-center justify-around">
        <div class="btn text-center" @click="onConfirm">添加地址</div>
      </div>
    </bottom-bar>
  </div>
</template>

<script>
import { getWxAuthSetting } from '@/common/js/utils'

export default {
  data() {
    return {
      sexInx: 0,
      sexTypes: ['先生', '女士'],
      address: '',
      consignee: '',
      address: '',
      name: '',
      phone: '',
      
    }
  },
  methods: {
    async onChooseLocation() {
      let {isRequired, isAllowed} = await getWxAuthSetting('userLocation')
      if ((isRequired && isAllowed) || !isRequired) {
        try {
          let res = await wx.chooseLocation({})
          let {latitude, longitude, address, name} = res
          if (address.indexOf('昆明') == -1) {
            this.$showModal({
              content: '暂时只在昆明开放配送业务！',
              showCancel: true,
              confirmText: '重新选择',
              successCb: _ => {
                wx.chooseLocation({})
              }
            })
          } else {
            this.latitude = latitude
            this.longitude = longitude
            this.address = address
            this.name = name
          }
          
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
    onConfirm() {
      if (!this.consignee) {
        this.$toast('必须填写收货人姓名')
        return
      }
      // if (!/^1\d[10]$/.test(this.phone)) {
      //   this.$toast('填写正确的手机号码')
      //   return
      // }
      if (!this.latitude||!this.longitude) {
        this.$toast('还未选择配送地址')
        return
      }
      if (!this.address) {
        this.$toast('还未填写详细地址')
        return
      }
      let d = {
        consignee: this.consignee,
        longitude: this.longitude,
        latitude: this.latitude,
        phone: this.phone,
        address: this.address,
        area_id: 150124
      }
      this.$post('address/edit', d)
        .then(r => {
          this.$toast('操作成功')
          this.$setStorage('address', r.data)
          this.$store.commit('cart/setCurAddress', r.data)
          setTimeout(_ => {
            this.$go(1, 'back')
          }, 1000)
        })
    },
  },
  
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