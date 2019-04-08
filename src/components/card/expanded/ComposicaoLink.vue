<template>
  <div class="status-bar">
    <span class="small-text-field">
      Desde {{ dataLocalAtual }} na(o)
      <router-link v-if="hasComposicao" :to="linkComissao">{{ siglaComissao }}</router-link>
      <span v-else >{{ siglaComissao }}</span>
    </span>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex'

export default {
  name: 'ComposicaoLink',
  props: {
    siglaComissao: {
      type: String
    },
    casaComissao: {
      type: String
    },
    dataLocalAtual: {
      type: String
    }
  },
  data () {
    return {
      composicao: Object
    }
  },
  methods: {
    ...mapActions(['getComissao'])
  },
  computed: {
    linkComissao () {
      return {
        name: 'comissao',
        params: {
          casaComissao: this.casaComissao,
          siglaComissao: this.siglaComissao
        }
      }
    },
    hasComposicao () {
      return this.composicao === undefined ? 0 : this.composicao.length
    },
    ...mapState({
      orgao: state => state.comissoes.orgao
    })
  },
  async mounted () {
    await this.getComissao({
      params: { casa: this.casaComissao, sigla: this.siglaComissao }
    })
    this.composicao = this.orgao[this.siglaComissao]
  }
}
</script>
<style lang="scss" scoped>
</style>
