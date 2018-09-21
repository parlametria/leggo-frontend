<template>
  <el-container>
    <el-header>
      <energy-sort class="energy-sort" v-model="energyOrder"></energy-sort>
    </el-header>
    <el-container>
    <el-aside>
      <el-input id="el-input" placeholder="Pesquisar Projeto de Lei" prefix-icon="el-icon-search" v-model="text_searched"></el-input>
      <nav-menu></nav-menu>
    </el-aside>
      <el-main class="el-main">
        <p v-if="pending.proposicoes">loading posts...</p>
        <p v-if="error.proposicoes">loading failed</p>
        <el-row>
          <el-col v-for="(tema, i) in temas" :key="i" :span="24 / temas.length">
            {{ tema }}
            <el-row :key="j" v-for="(prop,j) in (filteredProps.filter((prop) => prop.tema == tema))">
              <proposicao-item :prop= prop />
            </el-row>
          </el-col>
      </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ProposicaoItem from '@/components/ProposicaoItem'
import NavMenu from '@/components/NavMenu'
import EnergySort from '@/components/EnergySort'
import { mapState, mapActions } from 'vuex'
import orderBy from 'lodash/orderBy'

export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem,
    NavMenu,
    EnergySort
  },
  data () {
    return {
      text_searched: '',
      energyOrder: '',
      temas: ['Meio Ambiente', 'Agenda Nacional']
    }
  },
  mounted () {
    this.listProposicoes()
  },
  computed: mapState({
    proposicoes: state => state.proposicoes.proposicoes,
    pending: state => state.proposicoes.pending,
    error: state => state.proposicoes.error,
    apreciacaoFilter: state => state.filter.apreciacaoFilter,
    filteredProps () {
      let result = this.proposicoes;
      if (!this.text_searched) {
        result = result.filter((proposicao) => proposicao.apelido.toLowerCase().match(this.text_searched.toLowerCase()))
      }else {
      result = this.result.filter(j => this.apreciacaoFilter.includes(j.forma_apreciacao))
      }
      return result;
    }
  }),
  methods: {
    ...mapActions(['listProposicoes']),
    orderByEnergy (list) {
      return orderBy(list, 'energia', this.energyOrder)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  margin: auto;
  align-items: center;
}
.el-row {
  margin: 5px;
}
.el-header {
  display: contents;
}
.el-aside {
  margin: 0px;
  padding: 0px;
}
.energy-sort {
  margin-left: auto;
  margin-right: 0;
}
</style>
