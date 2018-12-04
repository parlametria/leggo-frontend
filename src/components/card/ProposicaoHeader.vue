<template>
  <div class="container">
    <fases class="fases" :class="{'hidden': clicked, 'visible': !clicked}" :fases="prop.resumo_progresso"/>
    <temperature-bar class="temperatura" :id="prop.lastEtapa.id_ext"/>
    <el-tag class="na_pauta" :class="{'emPautaTag': true, 'emPauta': na_pauta}" size="small"><span>NA PAUTA</span></el-tag>
    <span class="prop-apelido">{{prop.apelido}}</span>
    <div class="tags">
        <span class="tag">{{prop.lastEtapa.regime_tramitacao}}</span>
        <span class="tag">{{prop.lastEtapa.forma_apreciacao}}</span>
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
import Fases from './collapsed/Fases.vue'
import TemperatureBar from './collapsed/TemperatureBar.vue'
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
    Fases,
    TemperatureBar
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
      pautas: state => state.pautas.pautasDic
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

<style scoped>
.container {
  display: grid;
  grid-template-columns: 41px auto 30px;
  grid-template-rows: 25px auto auto;
  background: #444444;
  color: #fff;
  grid-row-gap: 1.5rem;
}
.fases {
  grid-column: 3/3;
  grid-row: 1/3;
  justify-self: end;
  margin-top: .9rem;
  margin-right: 1.5rem;
}

.visible {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.5s linear;
}

.hidden {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 2s, opacity 0.5s linear;
}

.temperatura {
  grid-column: 1/2;
  grid-row: 1/4;
}

.na_pauta {
  grid-column: 2/3;
  grid-row: 1/3;
  margin-left: .6rem;
  margin-top: .7rem;
}

.prop-apelido {
  grid-column: 2/3;
  grid-row: 2/3;
  margin-left: .6rem;
  font-size: 16pt;
}

.tags {
  grid-column: 2/3;
  grid-row: 3/4;
  margin-bottom: .9rem;
  margin-left: .5rem;
}

.emPauta {
  color:#dc6060 !important;
  border-color: #dc6060 !important;
  font-weight: bolder;
  opacity: 1 !important;
}

.emPauta span {
  animation: blinker 2s linear infinite;
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
  margin-bottom: 20px;
  margin-right: 20px;
  text-align: center;
}
.selector {
  grid-column: 3/4;
  grid-row: 1/4;
  display: flex;
  align-items: center;
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

@keyframes float {
    0% {
        box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
        transform: translatey(0px);
    }
    50% {
        box-shadow: 0 25px 15px 0px rgba(0,0,0,0.2);
        transform: translatey(-3px);
    }
    100% {
        box-shadow: 0 5px 15px 0px rgba(0,0,0,0.6);
        transform: translatey(0px);
    }
  }

@keyframes blinker {
  50% {
    opacity: 0.5;
  }
}
</style>
