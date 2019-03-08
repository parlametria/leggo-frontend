<template>
  <div class="header-wrapper">
    <div class="header-top">
        <h1>Leg<span class="dot">.</span>go</h1>
        <navigation-buttons class="navigation"/>
    </div>
    <div class="prop-filters" v-show="$route.name === 'proposicoes'">
      <filter-menu />
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NavigationButtons from '@/components/header/NavigationButtons'
import FilterMenu from '@/components/header/FilterMenu'
import moment from 'moment'

export default {
  name: 'PageHeader',
  computed: {
    ...mapState({
      metaInfo: state => state.proposicoes.metaInfo
    }),
    formattedLastUpdateDate () {
      return moment(this.metaInfo.last_update_trams).format('DD/MM/YYYY')
    }
  },
  methods: {
    ...mapActions(['getMetaInfo'])
  },
  async mounted () {
    await this.getMetaInfo()
  },
  components: {
    NavigationButtons,
    FilterMenu
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";
.header-wrapper {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  h1 {
    font-family: 'Rajdhani', sans-serif;
    line-height: 36pt;
    font-size: 50pt;
    text-align: center;
    font-weight: normal;
    margin-bottom: 0;
    .dot {
      font-family: Arial, Helvetica, sans-serif;
      font-size: 2.4rem;
    }
  }
}
.prop-filters {
  align-self: flex-end;
  margin-top: .5rem;
  margin-right: .5rem;
}
.header-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: solid 2px #dc6060;
  padding-bottom: 7px;
  flex-wrap: wrap;
}
.navigation {
  align-self: flex-end;
}
@media screen and (max-width: 1024px) {
  .navigation {
    margin-top: 1rem;
  }
}
@media screen and (max-width: $nav-menu-break-width) {
  .header-top h1 {
    margin-top: 1.2rem;
  }
}
</style>
