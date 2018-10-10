<template>
<div>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="widthCollapse()" :collapse-transition="false">
  <el-menu-item index="2">
    <i class="el-icon-search" @click="isCollapse = !isCollapse"></i>
    <template slot="title">
      <el-input @change="filtraNomeProposicao(nomeProposicaoFilter)" id="el-input" placeholder="Pesquisar Projeto" v-model="nomeProposicaoFilter.nomeProposicao"></el-input>
    </template>
  </el-menu-item>

  <el-submenu index="3">
    <template slot="title">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">Apreciação</span>
    </template>
    <el-menu-item v-for="(opcao, i) in apreciacaoFilter" :index="'1-' + (i+1)" :key="i">
      <el-checkbox @change="filtraApreciacao(apreciacaoFilter)" v-model="opcao.status">{{ opcao.tipo }}</el-checkbox>
    </el-menu-item>
  </el-submenu>

  <el-submenu index="4">
    <template slot="title">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">Regime de tramitação</span>
    </template>
     <el-menu-item v-for="(opcao, i) in regimeFilter" :index="'1-' + (i+1)" :key="i">
      <el-checkbox @change="filtraRegime(regimeFilter)" v-model="opcao.status">{{ opcao.tipo }}</el-checkbox>
    </el-menu-item>
  </el-submenu>

   <el-submenu index="5">
    <template slot="title">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">Casa</span>
    </template>
     <el-menu-item v-for="(opcao, i) in casaFilter" :index="'1-' + (i+1)" :key="i">
      <el-checkbox @change="filtraCasa(casaFilter)" v-model="opcao.status">{{ opcao.tipo }}</el-checkbox>
    </el-menu-item>
  </el-submenu>

  <el-submenu index="6">
    <template slot="title">
      <i class="el-icon-edit-outline"></i>
      <span slot="title">Em pauta</span>
    </template>
     <el-menu-item v-for="(opcao, i) in emPautaFilter" :index="'1-' + (i+1)" :key="i">
      <el-checkbox @change="filtraEmPauta(emPautaFilter)" v-model="opcao.status">{{ opcao.tipo }}</el-checkbox>
    </el-menu-item>
  </el-submenu>
</el-menu>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'navMenu',
  data() {
    return {
      isCollapse: true,
      windowWidth: 0
    }
  },
  mounted() {
    this.$nextTick(function() {
      window.addEventListener('resize', this.getWindowWidth);
      this.getWindowWidth()
    })
  },
  computed: mapState({
    apreciacaoFilter: state => state.filter.apreciacaoFilter,
    regimeFilter: state => state.filter.regimeFilter,
    casaFilter: state => state.filter.casaFilter,
    emPautaFilter: state => state.filter.emPautaFilter,
    nomeProposicaoFilter: state => state.filter.nomeProposicaoFilter
  }),
  methods: {
    ...mapMutations(['filtraApreciacao', 'filtraRegime', 'filtraCasa', 'filtraEmPauta', 'filtraNomeProposicao']),
    getWindowWidth(event) {
      this.windowWidth = document.documentElement.clientWidth;
    },
    widthCollapse() {
      return this.windowWidth < 660 && this.isCollapse;
    }
  }
}
</script>

<style scoped>
.el-menu-vertical-demo{
    height:100%,
}
.el-submenu{
  text-align: left;
}
.el-input {
  width: 200px;
}
</style>
