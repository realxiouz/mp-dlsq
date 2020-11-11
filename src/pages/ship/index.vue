<template>
  <div>
    <button @click="$go(`/pages/ship/doing`)">doing</button>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
    // this.getData()
  },
  methods: {
    getData() {
      setTimeout( _ => {
        this.$go(`/pages/ship/doing`)
      }, 1500)
    }
  }
}
</script>

<style>

</style>