<template>
  <div v-if="formattedStatus">
    <span class="tag">{{ formattedStatus }}</span>
  </div>
</template>

<script>
export default {
  name: 'TextTag',
  props: {
    etapas: {
      type: Array,
      default () { return [] }
    }
  },
  computed: {
    formattedStatus () {
      let result = ''
      for (let etapa of this.etapas) {
        switch (etapa.status) {
          case 'Lei':
            result = 'Transformada em Lei'
            break
          case 'Arquivada':
            result = 'Arquivada'
            break
          case 'Caducou':
            result = 'Caducou'
            break
          case 'Rejeitada':
            result = 'Rejeitada'
            break
        }
      }
      return result
    }
  }
}
</script>

<style lang="scss" scoped>
.tag {
  font-size: 9pt;
}
</style>
