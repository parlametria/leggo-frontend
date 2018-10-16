<template>
  <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="false" :collapse-transition="false">

    <!-- Search -->
    <el-menu-item index="2">
      <i class="el-icon-search" @click="isCollapse = !isCollapse"></i>
      <template slot="title">
        <el-input
          @change="filtraNomeProposicao(nomeProposicaoFilter)"
          id="el-input"
          placeholder="Pesquisar Projeto"
          v-model="nomeProposicaoFilter.nomeProposicao"/>
      </template>
    </el-menu-item>

    <!-- Date -->
    <el-menu-item index="3">
      <i class="el-icon-date"/>
      <template slot="title">
        <el-date-picker
          v-model="dateRef"
          type="date" placeholder="Data de referência"
          :picker-options="datePickerOptions">
        </el-date-picker>
      </template>
    </el-menu-item>

    <!-- Sort -->
    <el-menu-item index="4">
      <i class="el-icon-sort"/>
      <template slot="title">
        <energy-sort/>
      </template>
    </el-menu-item>

    <!-- Apreciação -->
    <el-submenu index="5">
      <template slot="title">
        <i class="el-icon-edit-outline"/>
        <span slot="title">Apreciação</span>
      </template>
      <el-menu-item
        v-for="(opcao, i) in apreciacaoFilter"
        :index="'1-' + (i+1)"
        :key="i">
        <el-checkbox
          @change="filtraApreciacao(apreciacaoFilter)"
          v-model="opcao.status">
          {{ opcao.tipo }}
        </el-checkbox>
      </el-menu-item>
    </el-submenu>

    <!-- Regime -->
    <el-submenu index="6">
      <template slot="title">
        <i class="el-icon-edit-outline"/>
        <span slot="title">Regime de tramitação</span>
      </template>
      <el-menu-item
        v-for="(opcao, i) in regimeFilter"
        :index="'1-' + (i+1)" :key="i">
        <el-checkbox
          @change="filtraRegime(regimeFilter)"
          v-model="opcao.status">
          {{ opcao.tipo }}
        </el-checkbox>
      </el-menu-item>
    </el-submenu>

    <!-- Casa -->
    <el-submenu index="7">
      <template slot="title">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">Casa</span>
      </template>
      <el-menu-item
        v-for="(opcao, i) in casaFilter"
        :index="'1-' + (i+1)" :key="i">
        <el-checkbox
          @change="filtraCasa(casaFilter)"
          v-model="opcao.status">
          {{ opcao.tipo }}
        </el-checkbox>
      </el-menu-item>
    </el-submenu>

    <!-- Pauta -->
    <el-submenu index="8">
      <template slot="title">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">Em pauta</span>
      </template>
      <el-menu-item
        v-for="(opcao, i) in emPautaFilter"
        :index="'1-' + (i+1)" :key="i">
        <el-checkbox
          @change="filtraEmPauta(emPautaFilter)"
          v-model="opcao.status">
          {{ opcao.tipo }}
        </el-checkbox>
      </el-menu-item>
    </el-submenu>

  </el-menu>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import EnergySort from '@/components/EnergySort'

export default {
  name: 'navMenu',
  components: {
    EnergySort
  },
  data () {
    return {
      isCollapse: true,
      windowWidth: 0,
      datePickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  // mounted () {
  //   this.$nextTick(function () {
  //     window.addEventListener('resize', this.getWindowWidth)
  //     this.getWindowWidth()
  //   })
  // },
  computed: {
    ...mapState({
      apreciacaoFilter: state => state.filter.apreciacaoFilter,
      regimeFilter: state => state.filter.regimeFilter,
      casaFilter: state => state.filter.casaFilter,
      emPautaFilter: state => state.filter.emPautaFilter,
      nomeProposicaoFilter: state => state.filter.nomeProposicaoFilter
    }),
    dateRef: {
      get () {
        return this.$store.state.filter.dateRef
      },
      set (value) {
        this.$store.commit('updateDateRef', value)
      }
    }
  },
  methods: {
    ...mapMutations([
      'filtraApreciacao',
      'filtraRegime',
      'filtraCasa',
      'filtraEmPauta',
      'filtraNomeProposicao'
    ])
    // getWindowWidth (event) {
    //   this.windowWidth = document.documentElement.clientWidth
    // },
    // widthCollapse () {
    //   return this.windowWidth < 660 && this.isCollapse
    // }
  }
}
</script>

<style scoped>
.el-input, .el-select {
  width: 200px !important;
}
</style>
