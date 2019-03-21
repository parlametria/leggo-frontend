<template>
  <div>
    <span v-if="pending.comissao">Carregando composição da comissão {{ siglaComissao }} </span>
    <span v-else-if="error.comissao || !comissao ||comissao.length == 0" class="error">Não temos informações da composição dessa composição.</span>
    <div class="composicao" v-else >
      <parlamentar :key="index" v-for="(parlamentar, index) in comissao" :parlamentar="parlamentar"/>
    </div>
  </div>
</template>
<script>
import Parlamentar from '@/components/comissao/Parlamentar'
import { mapState, mapActions } from 'vuex'

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
      error: state => state.comissoes.error,
      pending: state => state.comissoes.pending
    })
  },
  async mounted () {
    await this.getComissao({
      params: { casa: this.casaComissao, sigla: this.siglaComissao }
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

.error {
  margin-top: 100px;
  display: block;
}
</style>
