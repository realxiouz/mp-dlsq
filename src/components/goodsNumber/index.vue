<template>
  <div class="number-wrap flex" :style="{width: w}">
    <div class="btn" @click.stop="onMinus">-</div>
    <div class="text-center left" style="font-size:12px;line-height:36rpx;">{{bean.count}}</div>
    <div class="btn" @click.stop="onAdd">+</div>
  </div>
</template>

<script>
export default {
  props: {
    bean: {
      type: Object,
      default: _ => ({
        count: 1,
      })
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
      this.changeDelta(-1)
    },
    changeDelta(delta) {
      let goods_list = [
        {
          goods_id: this.bean.goods_id,
          goods_num: delta,
          sku_price_id: this.bean.id,
          goods_price: this.bean.price
        }
      ]
      this.$post('cart/add', { goods_list })
        .then(r => {
          
        })
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