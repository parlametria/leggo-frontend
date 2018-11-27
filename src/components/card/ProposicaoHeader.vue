<template>
  <div class="container">
    <fases class="fases" :fases="prop.resumo_progresso"/>
    <pressure-bar class="pressao" :id="prop.lastEtapa.id_ext"/>
    <span class="prop-apelido">{{prop.apelido}}</span>
    <div class="tags">
        <el-tag :class="{'emPautaTag': true, 'emPauta': na_pauta}" size="small">NA PAUTA</el-tag>
        <el-tag class="tag" size="small">{{prop.lastEtapa.regime_tramitacao}}</el-tag>
        <el-tag class="tag" size="small">{{prop.lastEtapa.forma_apreciacao}}</el-tag>
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
      console.log(this.pautas && this.pautas[id] !== undefined && this.pautas[id].length > 0)
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
  background: #000;
  color: #fff;
  grid-row-gap: .3rem;
}
.fases {
  justify-self: end;
  margin: .7rem 1rem;
}
.pressao {
  grid-column: 1/2;
  grid-row: 1/4;
}
.prop-apelido {
  grid-column: 2/3;
  grid-row: 2/3;
  margin: 0 .5rem;
}

.emPauta {
  background-color: white;
  color:red;
}

.foraPauta {
  background-color: white;
  color:grey;
}

.emPautaTag {
    color:grey;
    width: 80px;
    text-align: center;
}
.tags {
  grid-column: 2/3;
  grid-row: 3/4;
  margin: .5rem;

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
</style>
