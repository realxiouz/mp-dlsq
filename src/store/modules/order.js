export default {
  namespaced: true,
  state: {
    updateOrderList: false,
    serviceGoods: {}
  },
  mutations: {
    setUpdateOrderList(state, isUpdate) {
      state.updateOrderList = isUpdate
    },
    setServiceGoods(state, goods) {
      state.serviceGoods = goods
    }
  },
  getters: {
    
  },
  actions:{

  }
}