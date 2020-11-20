
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
    }
  },

  onError(e) {
    console.log(e)
  }
};
</script>