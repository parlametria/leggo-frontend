<template>
  <div class="collapse-box-wrapper">
    <img src="@/assets/pauta.png" v-if="emPauta" class="pauta-label" alt="Label da pauta">
    <input type="checkbox" :id="`collapsebox-${prop.casa}-${prop.id}`" class="collapse-box-check">
    <label :for="`collapsebox-${prop.casa}-${prop.id}`" class="collapse-box-label">
      <proposicao-header :prop="prop" />
    </label>
    <div class="collapse-box">
      <div shadow="hover" class="box-card prop-item">
        <div class="flex">
          <fases-bar :fases="prop.resumo_progresso"/>
          <energy-graphic :date="dateRef" :id="prop.id_ext" :casa="prop.casa"/>
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
  computed: {
    emPauta () {
      return this.pautas[this.prop.id]
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
.collapse-box-wrapper {
    position: relative;
    margin-bottom: 0.5rem;
    /* border-bottom: 1px solid #d6d6d6; */
    /* padding: 0 1rem; */
    padding: 0.5rem 1.5rem;
    border: solid 1px #e9e9e9;

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
  justify-content: space-around;
}
.pauta-label {
  position: absolute;
  top: 2px;
  left: 2px;
}
</style>
