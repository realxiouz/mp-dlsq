import {http} from '@/common/js/request'
import { Promise } from 'core-js'
export default {
  namespaced: true,
  state: {
    token: '',
    info: {
      name: '还未登录',
      avatar: 'https://newsirme-fresh.oss-cn-shenzhen.aliyuncs.com/backend/spu/20201103143638.png',
    },
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setInfo(state, info) {
      state.info = info
    },
  },
  actions:{
    updateInfo({commit}) {
      return new Promise((resolve, reject) => {
        http('/user/index', null, 'get')
          .then(r => {
            commit('setInfo', r.data)
            commit('setInviteCode', r.data.inviteCode)
            resolve('ok')
          })
          .catch(e => {
            reject(e)
          })
      })
    }
  }
}