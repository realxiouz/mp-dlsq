import {http} from '@/common/js/request'
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
  },
  getters: {
    totalCount(state) {
      return state.cartGoods.length
    }
  },
  actions:{

  }
}