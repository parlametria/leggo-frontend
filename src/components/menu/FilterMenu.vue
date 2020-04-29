<template>
  <el-menu
    mode="vertical"
    :collapse="false"
    :collapse-transition="false">
    <el-menu-item-group>

      <!-- Date >
      <el-menu-item index="3">
        <i class="el-icon-date"/>
        <template slot="title">
          <el-date-picker
            v-model="dateRef"
            type="date"
            placeholder="Data de referência"
            format="dd/MM/yyyy"
            :clearable="false"
            :picker-options="datePickerOptions"/>
        </template>
      </el-menu-item-->

      <!-- Sort -->
      <el-menu-item index="4">
        <i class="el-icon-sort"/>
        <template slot="title">
          <temperature-sort/>
        </template>
      </el-menu-item>

      <!-- Pauta -->
      <el-menu-item
        index="5"
        class="no-padding">
        <el-checkbox
          v-model="emPautaFilter[0].status"
          class="filterMenus">
          {{ emPautaFilter[0].tipo }}
        </el-checkbox>
      </el-menu-item>

      <!-- Finalizada -->
      <el-menu-item
        index="5"
        class="no-padding">
        <el-checkbox
          v-model="showFinalizadas.status"
          class="filterMenus">
          {{ showFinalizadas.tipo }}
        </el-checkbox>
      </el-menu-item>

      <!-- Vários Filtros -->
      <el-submenu
        v-for="(filterName, i) of getFilters()"
        :key="i"
        :index="filterName">
        <template slot="title">
          <i class="el-icon-edit-outline"/>
          <span
            slot="title"
            class="filter">{{ $t(filterName).replace('_', ' ') }}</span>
        </template>
        <el-checkbox-group v-model="models[filterName]">
          <el-menu-item
            v-for="(opcao, j) in perFilterOptions[filterName]"
            class="no-padding"
            :key="j"
            index="j">
            <el-checkbox
              class="filterMenus"
              :label="opcao"
              @change="() => handleChangeSelect(filterName, opcao)"
            >{{ $t(opcao) }}
            </el-checkbox>
          </el-menu-item>
        </el-checkbox-group>
      </el-submenu>
    </el-menu-item-group>
  </el-menu>
</template>

<script>
import { mapState, mapGetters, mapActions } from 'vuex'
import TemperatureSort from '@/components/menu/TemperatureSort'
import Login from '@/components/menu/Login'
import store from '@/stores/store'

function generateFilterModels () {
  let models = {}
  let filterStore = store.state.filter
  for (let filter of filterStore.filters) {
    models[filter] = []
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
    return {
      windowWidth: 0,
      datePickerOptions: {
        disabledDate (time) {
          return time.getTime() > Date.now()
        }
      },
      models: generateFilterModels()
    }
  },
  computed: {
    ...mapState({
      filter: state => state.filter,
      apreciacaoFilter: state => state.filter.apreciacaoFilter,
      regimeFilter: state => state.filter.regimeFilter,
      casaFilter: state => state.filter.casaFilter,
      emPautaFilter: state => state.filter.emPautaFilter,
      nomeProposicaoFilter: state => state.filter.nomeProposicaoFilter,
      showFinalizadas: state => state.filter.showFinalizadas
    }),
    ...mapGetters(['perFilterOptions']),
    dateRef: {
      get () {
        return this.$store.state.filter.dateRef
      },
      set (value) {
        this.updateDateRef(value)
      }
    }
  },
  methods: {
    ...mapActions(['updateDateRef', 'setFilter']),
    handleChangeSelect (filterName, option) {
      this.models[filterName][option] = !this.models[filterName][option]
      this.setFilter({ filter: filterName, value: this.models[filterName] })
    },
    getFilters () {
      return this.filter.filters.filter(f => this.perFilterOptions[f][0] !== undefined)
    }
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

.filter {
  text-transform: capitalize;
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
