<template>
  <div/>
</template>

<script>
import { mapState } from 'vuex'

export default {
  computed: {
    ...mapState({
      atores: state => state.atores.atores
    })
  }
}
</script>

<style lang="scss" scoped>
</style>
