<template>
  <div>home</div>
</template>

<script>
export default {
  onLoad() {
    this.$post('/index/template', {
      type: 'banner'
    })
      .then(r => {

      })
    
    // wx.login({
    //   success: ({code}) => {
    //     console.log(code)
    //     this.$post('/user/getWxMiniProgramSessionKey', {code})
    //       .then(r => {
    //       })
    //   }
    // })
  }
}
</script>

<style>

</style>