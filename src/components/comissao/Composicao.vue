<template>
  <div class="composicao">
    <parlamentar :key="index" v-for="(parlamentar, index) in comissao" :parlamentar="parlamentar"/>
  </div>
</template>
<script>
import Parlamentar from '@/components/comissao/Parlamentar'
import { mapState, mapActions, mapGetters, mapMutations } from 'vuex'

export default {
    name: 'Comissao',
    props: {
      siglaComissao: {
        type: String
      },
      casaComissao: {
        type: String
      }
    },
    components: {
      Parlamentar
    },
    methods: {
      ...mapActions(['getComissao'])
    },
    computed: {
      ...mapState({
        comissao: state => state.comissoes.comissao,
      })
    },
    async mounted () {
      await this.getComissao({
        params: {casa: this.casaComissao, sigla: this.siglaComissao}
      })
    }
}
</script>
<style lang="scss" scoped>
.composicao {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  grid-gap: 20px 20px;
  grid-template-rows: auto;
}
</style>
