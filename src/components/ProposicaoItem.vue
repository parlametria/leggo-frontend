<template>
  <div class="collapse-box-wrapper">
    <img src="@/assets/pauta.png" v-if="emPauta" class="pauta-label" alt="Label da pauta">
    <input type="checkbox" :id="`collapsebox-${prop.casa}-${prop.id}`" class="collapse-box-check">
    <label :for="`collapsebox-${prop.casa}-${prop.id}`" class="collapse-box-label">
      <proposicao-header :prop="prop.lastEtapa" />
    </label>
    <div class="collapse-box">
      <div shadow="hover" class="box-card prop-item">
        <div class="flex">
          <fases-bar :fases="prop.lastEtapa.resumo_progresso"/>
          <energy-graphic
            :date="dateRef"
            :id="prop.lastEtapa.id_ext"
            :casa="prop.lastEtapa.casa"/>
          <lista-pauta :id="prop.id"></lista-pauta>
        </div>
        <p style = "font-size:14px">Informações Gerais:</p>
        <ul style = "font-size:13px">
          <li v-for="(etapa,i) in prop.etapas" :key="i">
            Etapa {{i+1}}: <a class="sigla" :href="etapa.url">{{ etapa.sigla }}</a>
          </li>
          <li> Autor: {{ prop.lastEtapa.autor_nome }} </li>
          <li> Local Atual: {{ localAtual }} </li>
        </ul>
      </div>
    </div>
    <pressure-bar :energia="prop.lastEtapa.energia"></pressure-bar>
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
    localAtual () {
      let locais = this.prop.lastEtapa.resumo_tramitacao
      let local_atual = locais[locais.length - 1].nome
      if (local_atual.startsWith('PL')) {
        local_atual = 'Comissão Especial - ' + local_atual
      }
      return local_atual
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
.pauta-label {
  position: absolute;
  top: 2px;
  left: 2px;
}
</style>
