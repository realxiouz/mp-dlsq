<template>
  <div class="flex column" style="height:100vh;">
    <div class="left" style="width:100%;">
      <img :src="image" mode="widthFix" style="width:100%;"/>
    </div>
    <div class="info bg-white flex column">
      <div class="flex" style="margin-top:42rpx;">
        <div class="left">
          <div style="font-size: 16px;color:#2F2E2E;margin-bottom:10rpx;">{{title}}</div>
          <div style="font-size: 10px;color:#929292;">{{subtitle}}</div>
        </div>
        <div class="text-bold text-price color-primary" style="font-size: 14px;">{{curSku.price}}</div>
      </div>
      <div class="left"></div>
      <div class="flex">
        <div class="color-primary" style="font-size:12px;">购买数量</div>
        <div class="left"></div>
        <goods-number w="192rpx" :bean="curSku" />
      </div>
      <div style="height:170rpx;"></div>
    </div>
    <cart />
  </div>
</template>

<script>
import Cart from '@/components/cart'

export default {
  onLoad(opt) {
    this.$showLoading()
    this.$post('goods/detail', {
      id: opt.id
    }).then(r => {
      let {title, subtitle, image, sku_price} = r.data
      this.title = title
      this.subtitle = subtitle,
      this.image = image
      this.curSku= sku_price[0]
    })
      .finally(_ => {
        this.$hideLoading()
      })
  },
  components: {
    Cart,
  },
  data() {
    return {
      title: '',
      subtitle: '',
      image: '',
      curSku: {
        price: ''
      }
    }
  },
}
</script>

<style lang='less' scoped>
.info{
  height: 444rpx;
  border-radius: 36rpx 36rpx 0 0;
  padding: 0 100rpx;
}
</style>