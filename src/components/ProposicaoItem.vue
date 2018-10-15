<template>
  <el-card shadow="hover" class="box-card" :body-style= "highlight()">
    <el-row>
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
      <el-col :span="6">
        <a :href="prop.url">
          {{ prop.apelido }}
        </a>
          <span class="sigla">{{ prop.sigla }}</span>
          <br>
        <fases-bar :fases="prop.resumo_progresso"/>
      </el-col>
      <el-col :span="6">
        <energy-graphic :date="date" :visId="visId" :id="prop.id_ext" :casa="prop.casa"/>
      </el-col>
      <el-col id="tags">
        <regime-tramitacao :regime="prop.regime_tramitacao"></regime-tramitacao>
        <forma-apreciacao :apreciacao="prop.forma_apreciacao"></forma-apreciacao>
        <el-tag v-if="prop.em_pauta" type="info" size="mini">Em pauta</el-tag>
      </el-col>
    </el-row>
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
  },
  methods: {
    highlight () {
      if (this.prop.em_pauta) {
        return 'padding-right: 0px; padding-top: 0px;border: 2px solid #ffec00'
      } else {
        return 'padding-right: 0px; padding-top: 0px;'
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.fases {
  display: inline-block;
  padding: 0;
  li {
    display: inline-block;
    width: 10px;
    height: 20px;
    margin: 3px;
  }
  .senado {
    background-color: #cbd5e8;
  }
  .camara {
    background-color: #b3e2cd;
  }
}
.box-card {
  width: auto;
}
.inline-content {
  display: inline-block;
}
a {
  text-decoration: none;
}
#tags {
  display: flex;
}
.el-tag {
  margin-right: 3px;
}
.sigla {
  display: block;
  font-size: 12px;
  margin-top: 0.5rem;
  padding-top: 0.3rem;
  color: #8c8c8c;
  border-top: 1px solid #dadada;
}
.mark{
  width: 100%;
  right: -39px;
  cursor: pointer;
}
</style>
