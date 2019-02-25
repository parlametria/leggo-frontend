<template>
  <div v-if="isArquivada">
    <span class="pauta">{{this.status}}</span>
  </div>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'ArquivadaTag',
  props: {
    status: String
  },
  methods: {
    ...mapActions(['getPautas'])
  },
  computed: {
    isArquivada () {
      return (this.status === 'Arquivada')
    }
  }
}

</script>

<style lang="scss" scoped>
  .pauta {
    font-size: 9pt;
  }
</style>
