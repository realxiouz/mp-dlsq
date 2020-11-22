<template>
  <div class="number-wrap flex" :style="{width: w}">
    <div class="btn" :class="{fb: curCount<=0}" @click.stop="onMinus">-</div>
    <div class="text-center left" style="font-size:12px;line-height:36rpx;">{{curCount}}</div>
    <div class="btn" @click.stop="onAdd">+</div>
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  props: {
    bean: {
      type: Object,
    },
    w: {
      type: String,
      default: '100%'
    }
  },
  methods: {
    onAdd() {
      this.changeDelta(1)
    },
    onMinus() {
      if (this.curCount <= 0) {
        return
      }
      this.changeDelta(-1)
    },
    changeDelta(delta) {
      if (this.isLoading) {
        return
      }
      this.isLoading = true
      let goods_list = [
        {
          goods_id: this.bean.goods_id,
          goods_num: delta,
          sku_price_id: this.bean.sku_price_id,
          goods_price: this.bean.price
        }
      ]
      this.$post('cart/add', { goods_list })
        .then(r => {
          this.$store.dispatch('cart/updateCart')
        })
        .finally(_ => {
          this.isLoading = false
        })
    }
  },
  computed: {
    ...mapState('cart', ['cartGoods']),

    curCount() {
      let item = this.cartGoods.find(i => i.goods_id == this.bean.goods_id && i.sku_price_id == this.bean.sku_price_id)
      return item ? item.goods_num : 0
    }
  }
}
</script>

<style lang="less">
.number-wrap{
  .btn{
    color: #fff;
    width: 36rpx;
    height: 36rpx;
    text-align: center;
    line-height: 36rpx;
    background: #ADC3E5;
    border-radius: 6rpx;
    &.fb{
      background: #A0A0A0;
    }
  }
}
</style>