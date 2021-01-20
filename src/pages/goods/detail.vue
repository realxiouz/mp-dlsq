<template>
  <div class="flex column" style="height:100vh;">
    <div style="width:100%;">
      <img :src="curSku.image" mode="widthFix" style="width:100%;"/>
    </div>
    <div class="left" style="width:100%;">
      <div v-if="curSku.content" style="padding:20rpx 40rpx;color:#222;" class="font10">
        {{curSku.content}}
      </div>
    </div>
    <div class="info bg-white flex column">
      <div class="flex" style="margin-top:42rpx;">
        <div class="left">
          <div style="font-size: 16px;color:#2F2E2E;margin-bottom:10rpx;">{{curSku.title}}</div>
          <div style="font-size: 10px;color:#929292;">{{curSku.subtitle}}</div>
        </div>
        <div class="text-bold text-price color-primary" style="font-size: 14px;">{{curSku.price}}</div>
      </div>
      <div class="left" style="color:#2D2D2D;font-size:10px;width:100%;padding-top:30rpx;">
        <div class="flex">
          <div style="width:50%" v-for="(i, inx) in curSku.params" :key="inx">
            {{`${i.title}:${i.content}`}}
          </div>
        </div>
      </div>
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
      let {title, subtitle, image, sku_price, id, params, content} = r.data
      this.curSku= {
        goods_id: id,
        sku_price_id: sku_price[0].id,
        price: sku_price[0].price,
        image,
        title,
        subtitle,
        params,
        content,
      }
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
      curSku: {
        price: ''
      }
    }
  },
}
</script>

<style lang='less' scoped>
.info{
  height: 344rpx;
  border-radius: 36rpx 36rpx 0 0;
  padding: 0 100rpx;
}
</style>