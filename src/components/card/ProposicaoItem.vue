<template>
  <div class="proposicao-card">
    <router-link :to="linkProp" tag="div" class="card-header">
      <proposicao-header :prop="prop" :clicked="dropShow" />
    </router-link>
  </div>
</template>

<script>
import ProposicaoHeader from './ProposicaoHeader'

export default {
  name: 'proposicaoitem',
  data () {
    return {
      dropShow: false
    }
  },
  components: {
    ProposicaoHeader
  },
  props: {
    prop: Object
  },
  computed: {
    linkProp () {
      return {
        name: 'proposicao',
        params: {
          id: this.prop.id
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.proposicao-card {
  position: relative;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  .card-header {
    cursor: pointer;
  }
}
.card-body {
  border: 1px solid #dadada;
  border-top: none;
}
</style>
