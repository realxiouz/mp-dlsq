<template>
  <div>
    <rich-text :nodes="nodes"></rich-text>
  </div>
</template>

<script>
export default {
  onLoad(opt) {
    this.$get('index/richtext', {
      id: opt.id
    }).then(r => {
      let { content, title} = r.data
      this.$setTitle(title)
      this.nodes = content
    })
  },
  data() {
    return {
      nodes: ''
    }
  }
}
</script>

<style>

</style>