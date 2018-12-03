<template>
  <div class="proposicao-card">
    <div @click="dropShow = !dropShow" class="card-header">
      <proposicao-header :prop="prop" :clicked="dropShow" :dateRef="dateRef"/>
    </div>
    <el-collapse-transition>
      <div v-show="dropShow" class="card-body">
        <div shadow="hover" class="prop-item">
          <div class ="informations">
            <div>
              <p class = "small-text-field" style="margin-bottom: 0px">Autor</p>
              <p class = "big-text-field">{{ autor }}</p>
              <p class = "medium-text-field" style="margin-top: 0px"> {{ casa }}</p>
            </div>

          <hr class = "divider">
            <div class="pressure-area">
              <p>Temperatura</p>
              <energy-graphic
                :date="dateRef"
                :id="prop.lastEtapa.id_ext"
                :casa="prop.lastEtapa.casa"
                style="margin-bottom: 10 px"/>
              <pressure-info :id="prop.lastEtapa.id_ext" class="pressure-info"/>
              <pautas-info :id="prop.lastEtapa.id_ext" :casa="prop.lastEtapa.casa"/>
            </div>

          <hr class = "divider" style="margin-top: 35px; margin-bottom: 0px;">
          <div>
            <el-row>
              <fases-progress style="margin-bottom: 8px" :fases="prop.resumo_progresso"/>
            </el-row>
              <el-row>
                <p class = "small-text-field" style = "margin-top: 3px;">Desde {{ dataLocalAtual }} na(o) {{ localAtual }}</p>
                <p class = "medium-text-field" style = "margin-top: 0px; margin-bottom: 0px">{{ localAtual }}</p>
                <p class = "small-text-field" style = "opacity: 1; margin-top: 0px; margin-bottom: 0px;">Relator:</p>
                <p class = "medium-text-field" style = "margin-top: 0px">{{ prop.lastEtapa.relator_nome }}</p>
              </el-row>
            </div>
            <div>
              <p class = "small-text-field" style="margin-bottom: 0px;">Informações Gerais</p>
              <p class = "medium-text-field" style="margin-top: 0px; margin-bottom: 0px;" v-for="(etapa,i) in prop.etapas" :key="i">
                Link da proposição ({{ etapa.casa }}): <a class="sigla" :href="etapa.url" target="_blank">{{ etapa.sigla }}</a>
              </p>
            </div>

          </div>
        </div>
      </div>
    </el-collapse-transition>
  </div>
</template>

<script>
import ProposicaoHeader from './ProposicaoHeader'
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import EnergyGraphic from './expanded/EnergyGraphic'
import FasesBar from './expanded/FasesBar'
import FasesProgress from './expanded/FasesProgress'
import PautasInfo from './expanded/PautasInfo'
import PressureBar from './collapsed/PressureBar'
import PressureInfo from './expanded/PressureInfo'
import { mapState } from 'vuex'
import moment from 'moment'

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
    PautasInfo,
    FasesProgress,
    PressureBar,
    PressureInfo
  },
  computed: {
    emPauta () {
      return this.prop.lastEtapa.emPauta
    },
    dataLocalAtual () {
      const data = this.prop.lastEtapa.resumo_tramitacao.slice(-1)[0].data
      return moment(data).format('DD/MM/YYYY')
    },
    localAtual () {
      let locais = this.prop.lastEtapa.resumo_tramitacao
      let localAtual = locais[locais.length - 1].nome
      if (localAtual.startsWith('PL')) {
        localAtual = 'Comissão Especial - ' + localAtual
      }
      return localAtual
    },
    casa () {
      let autores = (this.prop.lastEtapa.autor_nome).split(' - ')
      let casa = ''
      if (autores.length > 1) {
        casa = autores[0]
      } else {
        casa = 'Câmara dos Deputados'
      }
      return casa
    },
    autor () {
      let autor = (this.prop.lastEtapa.autor_nome).split(' - ')
      if (autor.length > 1) {
        autor = autor[autor.length - 1].toString()
      }
      return autor.toString()
    },
    ...mapState({
      dateRef: state => state.filter.dateRef,
      pautas: state => state.pautas.pautasDic
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

.informations{
  margin-left: 30px;
}

.small-text-field {
    font-size: 12px;
    text-decoration-color: #000;
    opacity: 0.5;
}

.big-text-field{
  margin-top: 0px;
  font-size: 22px;
  margin-bottom: 0px;
}

.medium-text-field{
  font-size: 15px;
  max-width: 70%;
}

.divider {
  margin-right: 15px;
  margin-left: -15px;
  color: #000;
}

.pressure-info {
  font-size: 12px;
}

.pressure-area {
  margin-bottom: 20px;
}

</style>
