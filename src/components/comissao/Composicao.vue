<template>
  <div>
      <parlamentar/>
  </div>
</template>
<script>
import Parlamentar from '@/components/comissao/Parlamentar'

export default {
    name: 'Comissao',
    props: {
      siglaComissao: {
        type: String
      }
    },
    components: {
      Parlamentar
    }
}
</script>
<style lang="scss" scoped>

</style>
