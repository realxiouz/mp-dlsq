
<script>
import '@/common/css/common.less'
import '@/common/css/icon.css'

export default {
  onLaunch(opt) {
    const token = this.$getStorage('token')
    if(token) {

      this.$store.commit('user/setToken', token)

      this.$store.dispatch('user/updateInfo')
        .then(r => {
          console.log('---登录成功---')
        })

      this.$store.dispatch('cart/updateCart')
        .then(r => {
          console.log('---购物车初始成功---')
        })
    }

    this.$store.dispatch('device/setDeviceInfo')

    let address = this.$getStorage('address')
    if (address) {
      this.$store.commit('cart/setCurAddress', address)
      console.log('---地址初始成功---')
    }
  },

  onError(e) {
    console.log(e)
  }
};
</script>