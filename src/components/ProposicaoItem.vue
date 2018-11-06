<template>
  <div class="collapse-box-wrapper" :class="{ 'border-pauta': emPauta }">
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
    <pressure-bar :id="prop.id_ext"></pressure-bar>
  </div>
</template>

<script>
import ProposicaoHeader from "@/components/ProposicaoHeader";
import RegimeTramitacao from "@/components/RegimeTramitacao.vue";
import FormaApreciacao from "@/components/FormaApreciacao.vue";
import EnergyGraphic from "@/components/EnergyGraphic";
import FasesBar from "@/components/FasesBar";
import ListaPauta from "@/components/ListaPauta";
import PressureBar from "@/components/PressureBar";
import { mapState } from "vuex";

export default {
  name: "proposicaoitem",
  components: {
    RegimeTramitacao,
    FormaApreciacao,
    EnergyGraphic,
    FasesBar,
    ProposicaoHeader,
    ListaPauta,
    PressureBar
  },
  computed: {
    emPauta() {
      return this.pautas[this.prop.id];
    },
    ...mapState({
      dateRef: state => state.filter.dateRef,
      pautas: state => state.proposicoes.pautas
    })
  },
  props: {
    prop: Object
  }
};
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
  padding: 0.5rem 0.5rem 0 0.5rem;
  border-bottom: solid 1px #e9e9e9;

  label.collapse-box-label {
    width: 100%;
    display: inline-block;
    cursor: pointer;
  }
  .collapse-box-check {
    position: fixed;
    left: -9999px;
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
.border-pauta {
  border-left: 5px solid #f56c6c;
}
.flex {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}
</style>
