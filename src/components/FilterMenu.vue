<template>
  <el-menu mode="vertical" :collapse="false" :collapse-transition="false">

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

    <!-- Pauta -->
    <el-submenu index="5">
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

    <!-- Vários Filtros -->
    <el-submenu v-for="(filterName, i) of filter.filters" :key="i" :index="filterName">
      <template slot="title">
        <i class="el-icon-edit-outline"></i>
        <span slot="title">{{ $t(filterName) }}</span>
      </template>
      <el-checkbox-group v-model="self[filterName]">
        <el-menu-item v-for="(opcao, j) in perFilterOptions[filterName]" :key="j" index="j">
          <el-checkbox :label="opcao">{{ $t(opcao) }}</el-checkbox>
        </el-menu-item>
      </el-checkbox-group>
    </el-submenu>

  </el-menu>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import EnergySort from '@/components/EnergySort'
import store from '@/stores/store'

function generateFilterModels () {
  let models = {}
  let filterStore = store.state.filter
  for (let filter of filterStore.filters) {
    models[filter] = {
      get () {
        return filterStore.current[filter]
      },
      set (value) {
        store.commit('setFilter', { value, filter })
      }
    }
  }
  return models
}

export default {
  name: 'FilterMenu',
  components: {
    EnergySort
  },
  data () {
    let self = this
    return {
      isCollapse: true,
      windowWidth: 0,
      datePickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      self
    }
  },
  computed: {
    ...mapState({
      filter: state => state.filter,
      apreciacaoFilter: state => state.filter.apreciacaoFilter,
      regimeFilter: state => state.filter.regimeFilter,
      casaFilter: state => state.filter.casaFilter,
      emPautaFilter: state => state.filter.emPautaFilter,
      nomeProposicaoFilter: state => state.filter.nomeProposicaoFilter
    }),
    ...mapGetters(['perFilterOptions']),
    ...generateFilterModels(),
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
  }
}
</script>

<style scoped>
.el-input, .el-select {
  width: 200px !important;
}
</style>
