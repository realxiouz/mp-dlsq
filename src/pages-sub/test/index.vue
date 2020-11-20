<template>
  <div>
    <button open-type="getUserInfo" @getuserinfo="onUserInfo">onUserInfo</button>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
    wx.login({
      success: ({code}) => {
        this.$post('user/getWxMiniProgramSessionKey', { code })
          .then(r => {
            let { session_key } = r.data
            this.session_key = session_key
          })
      }
    })
  },
  methods: {
    onUserInfo(e) {
      console.log(e)
      let {encryptedData,signature,iv} = e.detail
      this.$post('user/wxMiniProgramLogin', {
        encryptedData,
        signature,
        iv,
        session_key: this.session_key
      }).then(r => {
        let {token, nickname} = r.data
        this.$setStorage('token', token)
        this.$store.commit('user/setToken', token)
      })
    }
  }
}
</script>

<style>

</style>