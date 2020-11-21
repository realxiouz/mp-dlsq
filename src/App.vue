
<script>
import '@/common/css/common.less'
import '@/common/css/icon.css'

export default {
  onLaunch(opt) {
    // wx.login({
    //   success: ({code}) => {
    //     this.$post('user/wxMiniProgramLogin', {code})
    //       .then(r => {
            
    //       })
    //   }
    // })
    const token = this.$getStorage('token')
    if(token) {
      this.$store.commit('user/setToken', token)

      this.$store.dispatch('user/updateInfo')
        .then(r => {
          console.log('---登录成功---')
        })
    }

    this.$store.dispatch('device/setDeviceInfo')
  },

  onError(e) {
    console.log(e)
  }
};
</script>