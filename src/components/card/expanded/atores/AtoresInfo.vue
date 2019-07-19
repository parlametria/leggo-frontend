<template>
  <div/>
</template>

<script>
import { mapActions, mapState } from 'vuex'

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
