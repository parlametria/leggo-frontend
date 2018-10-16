<template>
  <el-card shadow="hover" class="box-card" :class="{ 'border-pauta': this.prop.em_pauta }">
    <a class="sigla" :href="prop.url">
      {{ prop.sigla }}
    </a>
    <fases-bar :fases="prop.resumo_progresso"/>
    <energy-graphic :date="date" :visId="visId" :id="prop.id_ext" :casa="prop.casa"/>
  </el-card>
</template>

<script>
import RegimeTramitacao from '@/components/RegimeTramitacao.vue'
import FormaApreciacao from '@/components/FormaApreciacao.vue'
import EnergyGraphic from '@/components/EnergyGraphic'
import FasesBar from '@/components/FasesBar'
import { mapState } from 'vuex'

export default {
  name: 'proposicaoitem',
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    EnergyGraphic,
    FasesBar
  },
  computed: mapState({
    dateFilter: state => state.dateFilter,
    gridData () {
      // fake data
      return [
        { data: '10-10-2010', evento: 'correu', local: 'praça' }
      ]
    }
  }),
  props: {
    prop: Object,
    visId: String,
    date: Date
  }
}
</script>

<style lang="scss" scoped>
.sigla {
    font-size: 12px;
}
.border-pauta {
    border: 2px solid #ffec00;
}
.flex-between {
    display: flex;
    justify-content: space-between;
}
</style>
