<template>
<div>
  <el-menu default-active="2" class="el-menu-vertical-demo">
  <el-submenu index="1">
    <template slot="title">
      <span slot="title">Apreciação</span>
    </template>
    <el-menu-item v-for="(opcao, i) in apreciacaoFilter" :index="'1-' + (i+1)" :key="i">
      <el-checkbox @change="filtraApreciacao(apreciacaoFilter)" v-model="opcao.status">{{ opcao.tipo }}</el-checkbox>
    </el-menu-item>
  </el-submenu>

  <el-submenu index="2">
    <template slot="title">
      <span slot="title">Regime de tramitação</span>
    </template>
  </el-submenu>

   <el-submenu index="3">
    <template slot="title">
      <span slot="title">Casa</span>
    </template>
  </el-submenu>

  <el-submenu index="4">
    <template slot="title">
      <span slot="title">Finalizada</span>
    </template>
  </el-submenu>
</el-menu>
</div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'

export default {
  name: 'navMenu',
  computed: mapState({
    apreciacaoFilter: state => state.filter.apreciacaoFilter
  }),
  methods: {
    ...mapMutations(['filtraApreciacao'])
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
