<template>
  <div>
    <div class="button-group">
      <search-input />
      <button class="filter-button" :class="{'black-background': showFilter}" @click="showFilter = !showFilter">
        <img :class="{white: showFilter}" :src="require('../../assets/filter.svg')" width="18" alt="filtro">
      </button>
    </div>
    <div v-show="showFilter">
      <!-- Date -->
      <div class="filter-item">
        <div slot="title">Semana</div>
        <el-date-picker
          class="filterMenus"
          v-model="dateRef"
          type="date" placeholder="Data de referência" format="dd/MM/yyyy"
          :picker-options="datePickerOptions">
        </el-date-picker>
      </div>

      <!-- Vários Filtros -->
      <div class="filter-item" v-for="(filterName, i) of filter.filters" :key="i" :index="filterName">
        <div slot="title">{{ $t(filterName) }}</div>
        <el-checkbox-group class="checkbox-group" v-model="self[filterName]">
          <div v-for="(opcao, j) in perFilterOptions[filterName]"
                        class="no-padding"
                        :key="j" index="j">
            <el-checkbox class="filterMenus" :label="opcao">{{ $t(opcao) }}</el-checkbox>
          </div>
        </el-checkbox-group>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations, mapGetters } from 'vuex'
import TemperatureSort from '@/components/menu/TemperatureSort'
import SearchInput from '@/components/menu/SearchInput'
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
    SearchInput
  },
  data () {
    let self = this
    return {
      showFilter: false,
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
.filter-button {
  background: #fff;
  border-radius: 50%;
  border: 1px solid black;
  padding: 9px 8px 5px 8px;
  margin-left: .5rem;
  cursor: pointer;
}
.button-group {
  display: flex;
}
.black-background {
  background: #000;
}
.white {
  filter: invert(1);
}
.filter-section-header {
  text-align: center;
  font-weight: normal;
  margin-bottom: .5em;
}
.filter-item {
  margin-bottom: .7rem;
}
.checkbox-group {
  display: flex;
  flex-wrap: wrap;
}
.filterMenus {
  padding-right: 1rem;
  margin-top: .7rem;
}
.no-padding {
  padding: 0 !important;
}
</style>
