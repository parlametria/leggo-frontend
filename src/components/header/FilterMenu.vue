<template>
  <div class="filter-menu-wrapper">
    <div class="button-group">
      <search-filter class="search" />
      <button
        class="filter-button"
        :class="{'selected-button': showFilter}"
        @click="showFilter = !showFilter"
      >
        <img :class="{white: showFilter}" :src="require('../../assets/filter.svg')" width="18" alt="filtro">
      </button>
    </div>

    <div v-show="showFilter" class="filters-form">
      <div class="filter-item">
        <div>Data</div>
        <el-date-picker
          class="filterMenus"
          v-model="dateRef"
          type="date" placeholder="Data de referência" format="dd/MM/yyyy"
          :picker-options="datePickerOptions">
        </el-date-picker>
      </div>

      <div class="filter-item" v-for="(filterName, i) of filter.filters" :key="i" :index="filterName">
        <div>{{ $t(filterName) }}</div>
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
import store from '@/stores/store'
import SearchFilter from '@/components/header/SearchFilter'

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
  components: {
    SearchFilter
  },
  computed: {
    ...mapState({
      filter: state => state.filter,
      apreciacaoFilter: state => state.filter.apreciacaoFilter,
      regimeFilter: state => state.filter.regimeFilter,
      casaFilter: state => state.filter.casaFilter,
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

<style lang="scss" scoped>
@import "@/base.scss";
.filter-menu-wrapper {
  display: flex;
  flex-direction: column;
  .button-group {
    display: flex;
    align-self: flex-end;
  }
}
.filter-button {
  background: #fff;
  border-radius: 50%;
  border: 1px solid black;
  padding: 9px 8px 5px 8px;
  margin-left: .5rem;
  cursor: pointer;
}
.white {
  filter: invert(1);
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
.selected-button {
  background: #000;
}
@media (max-width: $nav-menu-break-width) {
  .filters-form {
    margin: 1rem 1rem 0 1rem;
  }
}
</style>
