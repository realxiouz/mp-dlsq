<template>
  <div v-if="!isFixed" class="sticky flex align-center" :style="{height: `${navBarHeight}px`, padding: navBarPadding}" style="background:#fff;">
    <slot></slot>
  </div>
  <div v-else class="fixed-header">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  props: {
    isFixed: {
      type: Boolean,
      default: false,
    }
  },
  computed: {
    ...mapState('device', ['navBarHeight', 'navBarPadding']),
  }
}
</script>

<style lang="less">
.fixed-header{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
</style>