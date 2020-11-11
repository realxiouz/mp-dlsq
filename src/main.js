import Vue from 'vue'
import App from './App'
import store from '@/store/index.js'
import '@/common/js/prototype'
import '@/common/js/filter'

import PageHeader from '@/components/pageHeader'
import BottomBar from '@/components/bottomBar'
import Modal from '@/components/modal'
import Empty from '@/components/empty'

Vue.config.productionTip = false

App.mpType = 'app'

Vue.component('PageHeader', PageHeader)
Vue.component('BottomBar', BottomBar)
Vue.component('Modal', Modal)
Vue.component('Empty', Empty)

const app = new Vue({
  store,
  ...App
})
app.$mount()
