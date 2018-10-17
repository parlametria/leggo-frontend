<template>
  <div class="collapse-box-wrapper">
    <input type="checkbox" :id="`collapsebox2-${visId}`" class="collapse-box-check">
    <label :for="`collapsebox2-${visId}`" class="collapse-box-label">
      <proposicao-header :prop="prop" />
    </label>
    <div class="collapse-box">
      <el-card shadow="hover" class="box-card prop-item" :class="{ 'border-pauta': this.prop.em_pauta }">
        <el-row>
          <el-col :sm="2" :md="6" :lg="6"><fases-bar :fases="prop.resumo_progresso"/></el-col>
          <el-col :sm="2" :md="6" :lg="6"><energy-graphic :date="dateRef" :visId="visId" :id="prop.id_ext" :casa="prop.casa"/></el-col>
        </el-row>
        <a class="sigla" :href="prop.url">
          {{ prop.sigla }}
        </a>
      </el-card>
    </div>
  </div>
</template>

<script>
import ProposicaoHeader from '@/components/ProposicaoHeader'
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
    FasesBar,
    ProposicaoHeader
  },
  computed: mapState({
    dateRef: state => state.filter.dateRef
  }),
  props: {
    prop: Object,
    visId: String
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
.prop-item {
    margin: 10px;
}
.el-badge {
    margin: 10px;
}

.collapse-box-wrapper {
  position: relative;
  margin-bottom: 0.5rem;
  border-bottom: 1px solid #d6d6d6;

  label.collapse-box-label{
    width:100%;
    display:inline-block;
    cursor: pointer;
  }
  .collapse-box-check {
    position: fixed;
    left:-9999px;
    opacity: 0;

    &:checked + label.collapse-box-label + .collapse-box {
      display: block;
      opacity: 1;
    }
  }
  .collapse-box {
    display: none;
    opacity:0;
    transition: all 2s ease-in-out;
  }
}
</style>
