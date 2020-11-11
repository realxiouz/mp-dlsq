import Vue from 'vue'
import Vuex from 'vuex'
import device from './modules/device'
import user from './modules/user'
import cart from './modules/cart'
import order from './modules/order'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    device,
    user,
    cart,
    order,
  }
})

export default store