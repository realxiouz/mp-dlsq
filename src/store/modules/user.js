import {http} from '@/common/js/request'
import { Promise } from 'core-js'
export default {
  namespaced: true,
  state: {
    token: '',
    info: {
      name: '还未登录',
      avatar: 'https://newsirme-fresh.oss-cn-shenzhen.aliyuncs.com/backend/spu/20201103143638.png',
      like_count: 0,
      collect_count: 0,
      comment_count: 0,
      trace_count: 0,
      coupon: 0,
      balance: '0.00',
      is_soldier: 0,
      uid: '',
      score: 0,
      tel: '',
      sex: 0,
      birthday:''
    },
    inviteCode: ''
  },
  mutations: {
    setToken(state, token) {
      state.token = token
    },
    setInfo(state, info) {
      state.info = info
    },
    setInviteCode(state, code) {
      state.inviteCode = code
    }
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