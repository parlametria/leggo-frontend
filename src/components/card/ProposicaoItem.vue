<template>
  <div class="proposicao-card">
    <div @click="dropShow = !dropShow" class="card-header">
      <proposicao-header :prop="prop" :emPauta="emPauta"/>
    </div>
    <el-collapse-transition>
      <div v-show="dropShow" class="card-body">
        <div shadow="hover" class="prop-item">
          <div class="flex">
            <fases-bar :fases="prop.resumo_progresso"/>
            <energy-graphic
              :date="dateRef"
              :id="prop.lastEtapa.id_ext"
              :casa="prop.lastEtapa.casa"/>
            <lista-pauta :id="prop.id"></lista-pauta>
          </div>
          <p style = "font-size:14px">Informações Gerais:</p>
          <ul style = "font-size:13px">
            <li v-for="(etapa,i) in prop.etapas" :key="i">
              Etapa {{i+1}} ({{$t(etapa.casa)}}): <a class="sigla" :href="etapa.url">{{ etapa.sigla }}</a>
            </li>
            <li> Autor: {{ prop.lastEtapa.autor_nome }} </li>
            <li> Local Atual: {{ localAtual }} </li>
          </ul>
        </div>
      </div>
    </el-collapse-transition>
    <!-- <pressure-bar :id="prop.lastEtapa.id_ext"></pressure-bar> -->
  </div>
</template>

<script>
import ProposicaoHeader from './ProposicaoHeader'
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import EnergyGraphic from './expanded/EnergyGraphic'
import FasesBar from './expanded/FasesBar'
import ListaPauta from './expanded/ListaPauta'
import PressureBar from './collapsed/PressureBar'
import { mapState } from 'vuex'

export default {
  name: 'proposicaoitem',
  data () {
    return {
      dropShow: false
    }
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    EnergyGraphic,
    FasesBar,
    ProposicaoHeader,
    ListaPauta,
    PressureBar
  },
  computed: {
    emPauta () {
      return this.pautas[this.prop.id]
    },
    localAtual () {
      let locais = this.prop.lastEtapa.resumo_tramitacao
      let localAtual = locais[locais.length - 1].nome
      if (localAtual.startsWith('PL')) {
        localAtual = 'Comissão Especial - ' + localAtual
      }
      return localAtual
    },
    ...mapState({
      dateRef: state => state.filter.dateRef,
      pautas: state => state.proposicoes.pautas
    })
  },
  props: {
    prop: Object
  }
}
</script>

<style lang="scss" scoped>
.sigla {
  font-size: 12px;
}
.flex-between {
  display: flex;
  justify-content: space-between;
}
.prop-item {
  margin: 10px;
}
.el-badge {
  margin: 10px;
}
.proposicao-card {
  position: relative;
  margin-bottom: 0.5rem;
  padding-top: 0.5rem;
  border-bottom: solid 1px #e9e9e9;
  &:hover {
    box-shadow: 0 5px 5px #c6c6c6;
  }
  .card-header {
    cursor: pointer;
  }
}

.border-pauta {
  border-left: 5px solid #f56c6c;
}

.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
.pauta-label {
  position: absolute;
  top: 2px;
  left: 2px;
}
</style>
