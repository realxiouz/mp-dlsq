<template>
  <div>
    <div class="sticky">
      <div class="shop-header flex">
        <div class="left" v-for="(i, inx) in navs" :key="inx" @click="toggle(inx)">
          <div class="flex column align-center nav-item bg-white" :class="{sel:inx==curInx}">
            <img :src="inx==curInx?i.icona:i.icon" />
            <div>{{i.txt}}</div>
            <div class="ind"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex wrap" style="padding: 33rpx 0 0 33rpx">
      <goods v-for="(i, inx) in 8" :key="i" />
    </div>

    <cart />
  </div>
</template>

<script>
import Goods from '@/components/goods'
import Cart from '@/components/cart'

const NAVS = [
  {
    txt: '全部',
    icon: '/static/img/nav0.png',
    icona: '/static/img/nav0a.png'
  },
  {
    txt: '桶装',
    icon: '/static/img/nav0.png',
    icona: '/static/img/nav0a.png'
  },
  {
    txt: '袋装',
    icon: '/static/img/nav0.png',
    icona: '/static/img/nav0a.png'
  },
  {
    txt: '瓶装',
    icon: '/static/img/nav0.png',
    icona: '/static/img/nav0a.png'
  },
  {
    txt: '套餐',
    icon: '/static/img/nav0.png',
    icona: '/static/img/nav0a.png'
  },
]
export default {
  data() {
    return {
      navs: NAVS,
      curInx: 0,
    }
  },
  components: {
    Goods,
    Cart,
  },
  methods: {
    toggle(inx) {
      if (inx != this.curInx) {
        this.curInx = inx
      }
    }
  }
}
</script>

<style lang="less" scoped>
.nav-item{
  font-size: 10px;
  color:#030303;
  &.sel{
    color: #AEC3E5;
    .ind{
      background: #AEC3E5;
    }
  }
  .ind{
    width: 12rpx;
    height: 12rpx;
    border-radius: 6rpx;
    background: transparent;
    margin: 14rpx 0 22rpx;
  }
  >img{
    width: 80rpx;
    height: 80rpx;
    margin: 18rpx 0 14rpx;
  }
}

</style>