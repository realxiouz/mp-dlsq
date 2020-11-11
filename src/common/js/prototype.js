import Vue from 'vue'
import { http } from '@/common/js/request'
// import {TAB_PAGES} from '@/common/js/const'

Vue.prototype.$go = (url, type = 'navigate', opt = {}) => {
  url = `${url}`
  if (url.startsWith('http')) {
    url = `/pages/h5/index?src=${encodeURIComponent(url)}`
  }
  // if (TAB_PAGES.findIndex(i => i.startsWith(url))>-1) {
  //   type = 'switch'
  // }
  switch (type) {
    case 'navigate':
      uni.navigateTo({
        url,
      })
      break
    case 'relanch':
      uni.reLaunch({
        url,
      })
      break
    case 'redirect':
      uni.redirectTo({
        url,
      })
      break
    case 'switch':
      uni.switchTab({
        url,
      })
      break
    case 'back':
      uni.navigateBack({
        delta: url,
      })
      break
    // case 'single':
    //   let urls = getCurrentPages().map((i) => i.route)
    //   let inx = urls.findIndex((i) => i == getRoute(url))
    //   if (inx >= 0) {
    //     uni.navigateBack({
    //       delta: urls.length - 1 - inx,
    //     })
    //   } else {
    //     uni.navigateTo({ url })
    //   }
    //   break
    case 'mp':
      uni.navigateToMiniProgram({
        appId: opt.appId,
        path: url,
        extraData: opt.extraData,
        success: opt.success,
        fail: opt.fail,
      })
      break
  }
}

Vue.prototype.$showModal = ({
  title = '温馨提示',
  content,
  successCb,
  showCancel = false,
  confirmText = '确定',
}) => {
  uni.showModal({
    title,
    content,
    showCancel,
    confirmText,
    success: (r) => {
      if (r.confirm && successCb) {
        successCb()
      }
    },
  })
}

Vue.prototype.$showLoading = (_) => {
  uni.showLoading({
    title: '加载中...',
    mask: true,
  })
}

Vue.prototype.$hideLoading = (_) => {
  uni.hideLoading()
}

Vue.prototype.$setStorage = (key, val) => {
  try {
    uni.setStorageSync(key, val)
  } catch (e) {
    uni.showModal({
      title: '缓存api出错',
      content: e.toString(),
      showCancel: false,
      confirmText: '去反馈',
    })
  }
}

Vue.prototype.$getStorage = (key, defaultVal) => {
  try {
    let val = uni.getStorageSync(key)
    return val ? val : defaultVal
  } catch (e) {
    uni.showModal({
      title: '缓存api出错',
      content: e.toString(),
      showCancel: false,
      confirmText: '去反馈',
    })
  }
}

Vue.prototype.$get = (url, data, showErrToast = true) =>
  http(url, data, 'get', showErrToast)
Vue.prototype.$post = (url, data, showErrToast = true) =>
  http(url, data, 'post', showErrToast)
Vue.prototype.$put = (url, data, showErrToast = true) =>
  http(url, data, 'put', showErrToast)

Vue.prototype.$del = (url, data, showErrToast = true) =>
  http(url, data, 'delete', showErrToast)

Vue.prototype.$toast = (title = '', icon = 'none') =>
  uni.showToast({
    title,
    icon,
  })

  Vue.prototype.$setTitle = (title='81号兵站') => wx.setNavigationBarTitle({
    title
  })