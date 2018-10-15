<template>
  <el-card shadow="hover" class="box-card" :class="{ 'border-pauta': this.prop.em_pauta }">

    <!-- Header -->
    <div slot="header" class="flex-between">
      <!-- Apelido -->
      <span>
        {{ prop.apelido }}
      </span>
      <!-- Notifications -->
      <el-popover
        placement="right"
        width="400"
        trigger="click">
        <el-table :data="gridData">
          <el-table-column width="100" property="data" label="data"></el-table-column>
          <el-table-column width="100" property="evento" label="evento"></el-table-column>
          <el-table-column width="200" property="local" label="local"></el-table-column>
        </el-table>
        <el-badge slot="reference" :value="4">
          <el-button type="info" icon="el-icon-message" circle></el-button>
        </el-badge>
      </el-popover>
    </div>

    <a class="sigla" :href="prop.url">
      {{ prop.sigla }}
    </a>

    <fases-bar :fases="prop.resumo_progresso"/>
    <energy-graphic :date="date" :visId="visId" :id="prop.id_ext" :casa="prop.casa"/>
    <regime-tramitacao :regime="prop.regime_tramitacao"></regime-tramitacao>
    <forma-apreciacao :apreciacao="prop.forma_apreciacao"></forma-apreciacao>
    <el-tag v-if="prop.em_pauta" type="info" size="mini">Em pauta</el-tag>
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
