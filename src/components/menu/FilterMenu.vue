<template>
  <el-menu mode="vertical" :collapse="false" :collapse-transition="false">
    <Login />
    <el-menu-item-group title="Filtros:">

      <!-- Search -->
      <el-menu-item index="2">
        <i class="el-icon-search" @click="isCollapse = !isCollapse"></i>
        <template slot="title">
          <el-input
            @change="filtraNomeProposicao(nomeProposicaoFilter)"
            id="el-input"
            placeholder="Pesquisar Projeto"
            v-model="nomeProposicaoFilter.nomeProposicao"
            @keyup.enter="this.focus = false"/>
        </template>
      </el-menu-item>

      <!-- Date -->
      <el-menu-item index="3">
        <i class="el-icon-date"/>
        <template slot="title">
          <el-date-picker
            v-model="dateRef"
            type="date" placeholder="Data de referência" format="dd/MM/yyyy"
            :picker-options="datePickerOptions">
          </el-date-picker>
        </template>
      </el-menu-item>

      <!-- Sort -->
      <el-menu-item index="4">
        <i class="el-icon-sort"/>
        <template slot="title">
          <temperature-sort/>
        </template>
      </el-menu-item>

      <!-- Pauta -->
      <el-menu-item index="5" class="no-padding">
        <el-checkbox
          v-model="emPautaFilter[0].status" class="filterMenus">
          {{ emPautaFilter[0].tipo }}
        </el-checkbox>
      </el-menu-item>

      <!-- Vários Filtros -->
      <el-submenu v-for="(filterName, i) of filter.filters" :key="i" :index="filterName">
        <template slot="title">
          <i class="el-icon-edit-outline"></i>
          <span slot="title">{{ $t(filterName) }}</span>
        </template>
        <el-checkbox-group v-model="self[filterName]">
          <el-menu-item v-for="(opcao, j) in perFilterOptions[filterName]"
                        class="no-padding"
                        :key="j" index="j">
            <el-checkbox class="filterMenus" :label="opcao">{{ $t(opcao) }}</el-checkbox>
          </el-menu-item>
        </el-checkbox-group>
      </el-submenu>
    </el-menu-item-group>
  </el-menu>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import TemperatureSort from '@/components/menu/TemperatureSort'
import Login from '@/components/menu/Login'
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
    TemperatureSort,
    Login
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
.filter-section-header {
    text-align: center;
    font-weight: normal;
    margin-bottom: .5em;
}

.filterMenus {
  width: 100%;
  padding: 0 2rem;
}

@media only screen and (max-width: 800px) {
  .filterMenus {
    width: 250px;
  }
}
.no-padding {
  padding: 0 !important;
}

</style>
