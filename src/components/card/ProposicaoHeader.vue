<template>
  <div class="container">
    <pressure-bar class="pressao" :id="prop.lastEtapa.id_ext"/>
    <div class="informations">
      <el-tag class="na_pauta emPautaTag" :class="{'emPauta': na_pauta}" size="small"><span>NA PAUTA</span></el-tag>
      <span class="prop-apelido">{{prop.apelido}}</span>
      <div>
          <el-tag class="tag" size="small">{{prop.lastEtapa.regime_tramitacao}}</el-tag>
          <el-tag class="tag" size="small">{{prop.lastEtapa.forma_apreciacao}}</el-tag>
      </div>
      <fases :fases="prop.resumo_progresso"/>
    </div>  
    <div class="selector">
      <span class="arrow" :class="{'arrow-down': clicked}"/>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import RegimeTramitacao from './collapsed/RegimeTramitacao.vue'
import FormaApreciacao from './collapsed/FormaApreciacao.vue'
import FaseAtualBlock from './collapsed/FaseAtualBlock.vue'
import Fases from './collapsed/Fases.vue'
import PressureBar from './collapsed/PressureBar.vue'
import moment from 'moment'

export default {
  name: 'proposicaoheader',
  props: {
    prop: Object,
    clicked: Boolean,
    dateRef: Date
  },
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    FaseAtualBlock,
    Fases,
    PressureBar
  },
  async mounted () {
    this.getStatusPauta({ params: {
      id: this.prop.lastEtapa.id_ext,
      casa: this.prop.lastEtapa.casa,
      date: this.formattedDate
    } })
  },
  methods: {
    ...mapActions(['getStatusPauta'])
  },
  computed: {
    ...mapState({
      pautas: state => state.proposicoes.pautas
    }),
    na_pauta () {
      let id = this.prop.lastEtapa.id_ext
      return this.pautas && this.pautas[id] !== undefined && this.pautas[id].length > 0
    },
    eventos () {
      return [
        { data: '10-10-2010', evento: 'Audiência pública', local: 'CCJ' },
        { data: '12-10-2010', evento: 'Outro evento', local: 'CAPADR' }
      ]
    },
    formattedDate () {
      return moment(this.dateRef).format('YYYY-MM-DD')
    }
  },
  watch: {
    dateRef () {
      this.getStatusPauta({ params: {
        id: this.prop.lastEtapa.id_ext,
        casa: this.prop.lastEtapa.casa,
        date: this.formattedDate
      } })
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
  display: grid;
  grid-template-columns: 41px auto 30px;
  background: #444;
  color: #fff;
}
.pressao {
  grid-column: 1/2;
}
.informations {
  grid-column: 2/3;
  display: flex;
  flex-direction: column;
  padding: .1rem .5rem;
  & > * {
    margin: .3rem 0;
  }
}
.selector {
  grid-column: 3/4;
  display: flex;
  align-items: center;
}
.prop-apelido {
  font-size: 16pt;
}
.emPauta {
  color:#dc6060 !important;
  border-color: #dc6060 !important;
  font-weight: bolder;
  opacity: 1 !important;
  span {
    animation: blinker 2s linear infinite;
  }
}
.emPautaTag {
  color:grey;
  opacity: 0.4;
  width: 85px;
  text-align: center;
  border-color: white;
}
.tag {
  font-size: 8pt;
  user-select: none;
  text-transform: uppercase;
  margin: 0 3px;
  color: #FFF;
  border-color: #FFF;
  width: 85px;
  text-align: center;
}
.arrow {
  height: 10px;
  width: 10px;
  border: solid #fff;
  border-width: 0px 4px 4px 0;
  transform: rotate(-45deg);
  transition: transform .5s;
  border-radius: 1px;
}
.arrow-down {
  transform: rotate(45deg);
}

@keyframes blinker {
  50% {
    opacity: 0.5;
  }
}
</style>
