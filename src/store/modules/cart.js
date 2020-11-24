import {http} from '@/common/js/request'

const mapCartItem = i => ({
  goods_id: i.goods_id,
  sku_price_id: i.sku_price_id,
  goods_num: i.goods_num,
  price: i.sku_price.price,
  image: i.goods.image,
  title: i.goods.title,
  subtitle: i.goods.subtitle
})

export default {
  namespaced: true,
  state: {
    cartGoods: [],
    curAddress: {},
  },
  mutations: {
    setCartGoods(state, goods) {
      state.cartGoods = goods
    },
    changeCartGoods(state, {i, delta=1}) {
      
    },
    setCurAddress(state, address) {
      state.curAddress = address
    }
  },
  getters: {
    totalCount(state) {
      return state.cartGoods.length
    },
    totalPrice(state) {
      return state.cartGoods.reduce((pre,cur) => pre + cur.goods_num * cur.price, 0).toFixed(2)
    }
  },
  actions:{
    updateCart({commit}) {
      return new Promise((resolve, reject) => {
        http('cart', null, 'post')
          .then(r => {
            commit('setCartGoods', r.data.map(mapCartItem).filter(i => i.goods_num))
            resolve('ok')
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}