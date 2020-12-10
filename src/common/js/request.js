import { BASE_URL } from './const'
import store from '@/store'

function getUrl(url) {
  if (url.startsWith('http')) {
    return url
  }

  return url.startsWith('/') ? `${BASE_URL}${url}` : `${BASE_URL}/${url}`
}

export const http = (url, data, method = 'post', showErrToast = true) => {
  return new Promise((resolve, reject) => {
    let header = {
      platform: 'wxMiniProgram'
    }
    let token = store.state.user.token
    token && (header.token = token)
    uni
      .request({
        url: getUrl(url),
        data,
        method: method.toUpperCase(),
        header,
      })
      .then((r) => {
        let [err, data] = r
        if (err) {
          reject(err)
          return
        }
        let status = data.statusCode
        switch (status) {
          case 200:
            if (data.data.code === 1) {
              resolve(data.data)
              return
            } else {
              reject(data.data)
              if (showErrToast) {
                uni.showToast({
                  title: data.data.msg,
                  icon: 'none',
                })
              }
              return
            }
            break
          case 500:
            uni.showModal({
              title: '温馨提示',
              content: '后端出问题了,工程师在抓紧修复中...'
            })
            reject(new Error(`${getUrl(url)}`))
            break
          case 400:
            if (data.data.code == 4001) {
              uni.showModal({
                title: '温馨提示',
                content: '系统检测您还未登录,无法完成此操作!',
                confirmText: '去登陆',
                success: r => {
                  if(r.confirm){
                    uni.navigateTo({
                      url: '/pages/auth/index'
                    })
                  }
                }
              })
            } else {
              uni.showToast({
                title: `${data.data.data}`,
                icon: 'none'
              })
            }
            reject(new Error(`${getUrl(url)}`))
            break
          default:
            uni.showToast({
              title: `${status||'unknow status'}`,
              icon: 'none',
            })
            
            reject(new Error('不是规范的响应'))
        }
      })
  })
}
