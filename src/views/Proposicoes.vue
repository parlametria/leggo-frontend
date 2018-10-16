<template>
  <el-container>
    <el-header>
      <el-date-picker class="energy-sort"
        v-model="date"
        type="date" placeholder="Data de referência"
        :picker-options="pickerOptions1">
    </el-date-picker>
      <energy-sort class="energy-sort" v-model="energyOrder"></energy-sort>
    </el-header>
    <el-container>
      <nav-menu></nav-menu>

      <el-main class="el-main">
        <p v-if="pending.proposicoes">loading posts...</p>
        <p v-if="error.proposicoes">loading failed</p>
        <el-col :span="24">
          {{ tema }}
          <tema-graphic :tema="tema" />
          <el-row :key="j" v-for="(prop,j) in filteredProps.filter((prop) => prop.tema == tema)">
            <proposicao-item :date= date :prop= prop :visId= "`vis-${j}`"/>
          </el-row>
        </el-col>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ProposicaoItem from '@/components/ProposicaoItem'
import NavMenu from '@/components/NavMenu'
import EnergySort from '@/components/EnergySort'
import TemaGraphic from '@/components/TemaGraphic'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'proposicoes',
  components: {
    ProposicaoItem,
    NavMenu,
    EnergySort,
    TemaGraphic
  },
  data () {
    return {
      text_searched: '',
      energyOrder: '',
      temas: ['Meio Ambiente', 'Agenda Nacional'],
      date: new Date(),
      pickerOptions1: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  mounted () {
    this.listProposicoes()
  },
  computed: {
    tema () { return this.$route.params.tema },
    filteredProps () {
      return this.orderByEnergy(
        this.proposicoes.filter(prop => {
          return this.processProps(prop)
        })
      )
    },
    ...mapState({
      proposicoes: state => state.proposicoes.proposicoes,
      pending: state => state.proposicoes.pending,
      error: state => state.proposicoes.error,
      apreciacaoFilter: state => state.filter.apreciacaoFilter,
      regimeFilter: state => state.filter.regimeFilter,
      casaFilter: state => state.filter.casaFilter,
      emPautaFilter: state => state.filter.emPautaFilter,
      nomeProposicaoFilter: state => state.filter.nomeProposicaoFilter,
      energias: state => state.filter.energias
    })
  },
  methods: {
    ...mapActions(['listProposicoes']),

    orderByEnergy (list) {
      if (this.energyOrder === 'desc') { return list.sort((a, b) => this.energias[b.id_ext] - this.energias[a.id_ext]) } else { return list.sort((a, b) => this.energias[a.id_ext] - this.energias[b.id_ext]) }
    },
    processProps (prop) {
      return (
        this.apreciacaoFilter.some(
          options => options.tipo === prop.forma_apreciacao && options.status
        ) &&
        this.regimeFilter.some(
          options => options.tipo === prop.regime_tramitacao && options.status
        ) &&
        this.casaFilter.some(
          options => options.tipo === prop.casa && options.status
        ) &&
        this.emPautaFilter.some(
          options =>
            ((options.tipo === 'Sim' && prop.em_pauta) ||
              (options.tipo === 'Não' && !prop.em_pauta)) &&
            options.status
        ) &&
        prop.apelido.toLowerCase().match(this.nomeProposicaoFilter.nomeProposicao.toLowerCase())
      )
    }
  }
}
</script>

<style lang="scss" scoped>
.el-main {
  margin: 0;
  align-items: center;
}
.el-row {
  margin: 5px;
}
.el-header {
  display: inline;
}
.el-aside {
  margin: 0px;
  padding: 0px;
}
.energy-sort {
  margin: 5px;
  float: right;
}
</style>
