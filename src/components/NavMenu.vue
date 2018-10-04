<template>
<div>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="isCollapse" :collapse-transition="false">
  <el-menu-item index="1" @click="isCollapse = !isCollapse">
    <i class="el-icon-menu"></i>
  </el-menu-item>

  <el-menu-item index="2">
    <template slot="title">
      <el-input id="el-input" placeholder="Pesquisar Projeto de Lei" prefix-icon="el-icon-search"></el-input>
    </template>
  </el-menu-item>

  <el-submenu index="3">
    <template slot="title">
      <span slot="title">Apreciação</span>
    </template>
    <el-menu-item v-for="(opcao, i) in apreciacaoFilter" :index="'1-' + (i+1)" :key="i">
      <el-checkbox @change="filtraApreciacao(apreciacaoFilter)" v-model="opcao.status">{{ opcao.tipo }}</el-checkbox>
    </el-menu-item>
  </el-submenu>

  <el-submenu index="4">
    <template slot="title">
      <span slot="title">Regime de tramitação</span>
    </template>
     <el-menu-item v-for="(opcao, i) in regimeFilter" :index="'1-' + (i+1)" :key="i">
      <el-checkbox @change="filtraRegime(regimeFilter)" v-model="opcao.status">{{ opcao.tipo }}</el-checkbox>
    </el-menu-item>
  </el-submenu>

   <el-submenu index="5">
    <template slot="title">
      <span slot="title">Casa</span>
    </template>
     <el-menu-item v-for="(opcao, i) in casaFilter" :index="'1-' + (i+1)" :key="i">
      <el-checkbox @change="filtraCasa(casaFilter)" v-model="opcao.status">{{ opcao.tipo }}</el-checkbox>
    </el-menu-item>
  </el-submenu>

  <el-submenu index="6">
    <template slot="title">
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
      isCollapse: true
    }
  },
  computed: mapState({
    apreciacaoFilter: state => state.filter.apreciacaoFilter,
    regimeFilter: state => state.filter.regimeFilter,
    casaFilter: state => state.filter.casaFilter,
    emPautaFilter: state => state.filter.emPautaFilter

  }),
  methods: {
    ...mapMutations(['filtraApreciacao', 'filtraRegime', 'filtraCasa', 'filtraEmPauta'])
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
</style>
