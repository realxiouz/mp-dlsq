<template>
  <div>
    me
    <div @click="$go('/pages-sub/test/index')">test</div>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
    this.$get('user')
      .then(r => {

      })
  }
}
</script>

<style>

</style>