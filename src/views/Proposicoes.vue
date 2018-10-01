<template>
  <el-container>
    <el-header>
      <el-date-picker class="energy-sort"
        v-model="date"
        type="date" placeholder="Data de referência"
        :picker-options="pickerOptions1">
    </el-date-picker>
      <energy-sort class="energy-sort" v-model="energyOrder"></energy-sort>
    </el-header>
    <el-container>
    <el-aside>
      <el-input id="el-input" placeholder="Pesquisar Projeto de Lei" prefix-icon="el-icon-search" v-model="text_searched"></el-input>
      <nav-menu></nav-menu>
    </el-aside>
      <el-main class="el-main">
        <p v-if="pending.proposicoes">loading posts...</p>
        <p v-if="error.proposicoes">loading failed</p>
        <el-row>
          <el-col v-for="(tema, i) in temas" :key="i" :span="24 / temas.length">
            {{ tema }}
            <el-row :key="j" v-for="(prop,j) in filteredProps.filter((prop) => prop.tema == tema)">
              <proposicao-item :date= date :prop= prop :visId= "`vis${i}-${j}`"/>
            </el-row>
          </el-col>
      </el-row>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import ProposicaoItem from "@/components/ProposicaoItem";
import NavMenu from "@/components/NavMenu";
import EnergySort from "@/components/EnergySort";
import { mapState, mapActions } from "vuex";
import orderBy from "lodash/orderBy";

export default {
  name: "proposicoes",
  components: {
    ProposicaoItem,
    NavMenu,
    EnergySort
  },
  data() {
    return {
      text_searched: "",
      energyOrder: "",
      temas: ["Meio Ambiente", "Agenda Nacional"],
      date: new Date(Date.now()),
      pickerOptions1: {
        disabledDate(time) {
          return time.getTime() > Date.now();
        }
      }
    };
  },
  mounted() {
    this.listProposicoes();
  },
  computed: mapState({
    proposicoes: state => state.proposicoes.proposicoes,
    pending: state => state.proposicoes.pending,
    error: state => state.proposicoes.error,
    apreciacaoFilter: state => state.filter.apreciacaoFilter,
    regimeFilter: state => state.filter.regimeFilter,
    casaFilter: state => state.filter.casaFilter,
    emPautaFilter: state => state.filter.emPautaFilter,
    filteredProps() {
      return this.orderByEnergy(
        this.proposicoes.filter(prop => {
          return this.processProps(prop) && this.searchMatch(prop);
        })
      );
    }
  }),
  methods: {
    ...mapActions(["listProposicoes"]),
    orderByEnergy(list) {
      return orderBy(list, "energia", this.energyOrder);
    },
    processProps(prop) {
      return (
        this.apreciacaoFilter.some(
          options => options.tipo === prop.forma_apreciacao && options.status
        ) &&
        this.regimeFilter.some(
          options => options.tipo === prop.regime_tramitacao && options.status
        ) &&
        this.casaFilter.some(
          options => options.tipo === prop.casa && options.status
        ) &&
        this.emPautaFilter.some(
          options =>
            ((options.tipo === "Sim" && prop.em_pauta) ||
              (options.tipo === "Não" && !prop.em_pauta)) &&
            options.status
        )
      );
    },
    searchMatch(prop) {
      return prop.apelido.toLowerCase().match(this.text_searched.toLowerCase());
    }
  }
};
</script>

<style lang="scss" scoped>
.el-main {
  margin: auto;
  align-items: center;
}
.el-row {
  margin: 5px;
}
.el-header {
  display: inline;
}
.el-aside {
  margin: 0px;
  padding: 0px;
}
.energy-sort {
  margin: 5px;
  float: right;
}
</style>
