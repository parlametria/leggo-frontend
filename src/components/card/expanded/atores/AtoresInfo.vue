<template>
  <div></div>
</template>

<script>
import { mapActions, mapState } from "vuex";

export default {
  computed: {
    ...mapState({
      atores: state => state.atores.atores
    })
  },
  methods: {
    ...mapActions(["getAtores"])
  }
};
</script>

<style lang="scss" scoped>
</style>