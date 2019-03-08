<template>
  <div class="search-wrapper">
    <button class="filter-button" @click="handleButtonClick">
      <img
        :src="require('../../assets/search.svg')"
        width="15"
        alt="search-input"
      />
    </button>
    <input
      @change="filtraNomeProposicao(nomeProposicaoFilter)"
      @keyup.esc="handleInputEsc"
      class="input"
      ref="input"
      placeholder="Buscar proposição"
      v-model="nomeProposicaoFilter.nomeProposicao"
      v-show="!isCollapse"
    />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'SeachFilter',
  data () {
    return {
      isCollapse: true
    }
  },
  computed: {
    ...mapState({
      nomeProposicaoFilter: state => state.filter.nomeProposicaoFilter
    })
  },
  methods: {
    ...mapMutations([
      'filtraNomeProposicao'
    ]),
    handleButtonClick () {
      this.isCollapse = !this.isCollapse
      this.$nextTick(() => this.$refs.input.focus())
    },
    handleInputEsc () {
      this.nomeProposicaoFilter.nomeProposicao = ''
      this.isCollapse = true
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-button {
  background: #fff;
  border-radius: 50%;
  border: none;
  cursor: pointer;
  padding: 9px 10px 6px 9px;
}
.search-wrapper {
  display: flex;
  flex-direction: row-reverse;
  border: 1px solid black;
  border-radius: 50px;
}
.input {
  border: none;
  outline: none;
  margin-left: 1rem;
}
</style>
