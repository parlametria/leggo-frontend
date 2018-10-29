<template>
  <div class="collapse-box-wrapper">
    <input type="checkbox" :id="`collapsebox2-${visId}`" class="collapse-box-check">
    <label :for="`collapsebox2-${visId}`" class="collapse-box-label">
      <proposicao-header :prop="prop" />
    </label>
    <div class="collapse-box">
      <div shadow="hover" class="box-card prop-item" :class="{ 'border-pauta': this.prop.em_pauta }">
        <div class="flex">
          <fases-bar :fases="prop.resumo_progresso"/>
          <energy-graphic :date="dateRef" :visId="visId" :id="prop.id_ext" :casa="prop.casa"/>
          <lista-pauta :id="prop.id"></lista-pauta>
        </div>
        <a class="sigla" :href="prop.url">
          {{ prop.sigla }}
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import ProposicaoHeader from '@/components/ProposicaoHeader'
import RegimeTramitacao from '@/components/RegimeTramitacao.vue'
import FormaApreciacao from '@/components/FormaApreciacao.vue'
import EnergyGraphic from '@/components/EnergyGraphic'
import FasesBar from '@/components/FasesBar'
import ListaPauta from '@/components/ListaPauta'
import { mapState } from 'vuex'

export default {
  name: 'proposicaoitem',
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    EnergyGraphic,
    FasesBar,
    ProposicaoHeader,
    ListaPauta
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
  padding: 0 1rem;

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
    }
  }
  .collapse-box {
    display: none;
  }
  &:hover {
    box-shadow: 0 5px 5px rgb(198, 198, 198);
  }
}
.flex {
  display: flex;
  flex-wrap: wrap;
}
</style>
