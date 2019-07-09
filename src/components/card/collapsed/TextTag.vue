<template>
  <div v-if="formattedStatus">
    <span class="tag">{{formattedStatus}}</span>
  </div>
</template>

<script>

export default {
  name: 'TextTag',
  props: {
    status: String
  },
  computed: {
    formattedStatus () {
      let result = ''
      switch (this.status) {
        case 'Lei':
          result = 'Transformada em Lei'
          break
        case 'Arquivada':
          result = 'Arquivada'
          break
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
