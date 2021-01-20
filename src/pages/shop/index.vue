<template>
  <div>
    <div class="sticky">
      <div class="shop-header flex">
        <div class="left" v-for="(i, inx) in navs" :key="inx" @click="toggle(inx)">
          <div class="flex column align-center nav-item bg-white" :class="{sel:inx==curInx}">
            <img :src="i.image" />
            <div>{{i.name}}</div>
            <div class="ind"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="flex wrap" style="padding: 33rpx 0 0 33rpx">
      <goods v-for="(i, inx) in list" :key="inx" :bean="i"/>
    </div>

    <cart />
  </div>
</template>

<script>
import Goods from '@/components/goods'
import Cart from '@/components/cart'
const mapGoods = i => ({
  title: i.title,
  subtitle: i.subtitle,
  curSku: i.sku_price[0] || {},
  image: i.image,
  id: i.id,
})

export default {
  onLoad(opt) {
    this.$post('category', {id: 1})
      .then(r => {
        if (r.data.children.length) {
          this.navs = r.data.children
          this.getCatData()
        } else {
          this.$toast('获取分类异常')
        }
      })
  },
  data() {
    return {
      navs: [],
      curInx: 0,
      page: 1,
      isLoading: false,
      isEnd: false,
      isLoaded: false,
      list: [],
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
      this.getCatData(true)
    },
    getCatData(reset = false) {
      if (reset) {
        this.list = []
        this.page = 1
        this.isEnd = false
        this.isLoaded = false
      }
      let cId = this.navs[this.curInx].id
      this.$get('goods/lists', {
        category_id: cId,
        page: this.page
      }).then(r => {
        this.list.push(...r.data.data.map(mapGoods))
        // this.list.push(...r.data.data)
        console.log(this.list)
        if (r.data.data.length < 10) {
          this.isEnd = true
        }
      })
      
    }
  },
  onReachBottom() {
    if (this.isLoading || this.isEnd) {
      return
    }
    this.page++
    this.getCatData()
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