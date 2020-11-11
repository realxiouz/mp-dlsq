import {http} from '@/common/js/request'
export default {
  namespaced: true,
  state: {
    cartGoods: [],
    curAddress: {},
  },
  mutations: {
    setCartGoods(state, goods) {
      state.cartGoods = goods.map(i => {
        i.is_choose = i.list.every(j => j.is_choose == 1) ? 1 : 0
        return i
      })
    },
    changeCountByDelta(state, {shop_id, sku, delta=1}) {
      let newArr = JSON.parse(JSON.stringify(state.cartGoods))
      let curShop = newArr.find(i => i.shop_id == shop_id)
      let cur = curShop.list.find(i => i.sku == sku)
      cur.amount = cur.amount + delta
      state.cartGoods = newArr 
    },
    removeBySku(state, {shop_id, sku}) {
      let newArr = JSON.parse(JSON.stringify(state.cartGoods))
      let curShop = newArr.find(i => i.shop_id == shop_id)
      let inx = curShop.list.findIndex(i => i.sku == sku)
      curShop.list.splice(inx,1)
      if (!curShop.list.length) {
        let index = newArr.findIndex(i => i.shop_id == shop_id)
        newArr.splice(index,1)
      }
      state.cartGoods = newArr
    },
    changeAllChoose(state, choose) {
      let newArr = JSON.parse(JSON.stringify(state.cartGoods))
      newArr = newArr.map(i => {
        i.list = i.list.map(j => {
          j.is_choose = choose
          return j
        })
        i.is_choose = choose
        return i
      })
      state.cartGoods = newArr
    },
    changeChooseBySku(state, {shop_id, sku}) {
      let newArr = JSON.parse(JSON.stringify(state.cartGoods))
      let curShop = newArr.find(i => i.shop_id == shop_id)
      let cur = curShop.list.find(i => i.sku == sku)
      cur.is_choose = cur.is_choose == 0 ? 1 : 0
      curShop.is_choose = curShop.list.every(i => i.is_choose == 1) ? 1 : 0
      state.cartGoods = newArr
    },
    changeShopChoose(state, {shop_id, is_choose}) {
      let newArr = JSON.parse(JSON.stringify(state.cartGoods))
      let curShop = newArr.find(i => i.shop_id == shop_id)
      curShop.list = curShop.list.map(i => {
        i.is_choose = is_choose
        return i
      })
      curShop.is_choose = is_choose
      state.cartGoods = newArr
    },
    setCurAddress(state, address) {
      state.curAddress = address
    }
  },
  getters: {
    total(state) {
      let arr = []
      for (let i = 0; i < state.cartGoods.length; i++) {
        arr = [...arr, ...state.cartGoods[i].list]
      }
      return arr.filter(i => i.is_choose).reduce((pre, cur) => pre + cur.amount * cur.price, 0).toFixed(2)
    },
    isAllChoose(state) {
      return state.cartGoods.every(i => i.is_choose == 1)
    },
    totalCount(state) {
      let arr = []
      for (let i = 0; i < state.cartGoods.length; i++) {
        arr = [...arr, ...state.cartGoods[i].list]
      }
      return arr.filter(i => i.is_choose == 1).length
    }
  },
  actions:{

  }
}