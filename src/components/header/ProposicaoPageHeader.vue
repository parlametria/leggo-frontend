<template>
    <el-row type="flex" justify="space-around" class="logo-container">
      <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="8" class="header-wrapper">
        <div class="navbar">
            <h1>Leg<span class="dot">.</span>go</h1>
            <navigation-buttons class="navigation"/>
        </div>
        <div class="prop-filters" v-show="$route.name === 'proposicoes'">
          <filter-menu />
        </div>
      </el-col>
    </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NavigationButtons from '@/components/header/NavigationButtons'
import FilterMenu from '@/components/menu/FilterMenu'
import moment from 'moment'

export default {
  name: 'ProposicaoPageHeader',
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
.logo-container {
  margin-bottom: 2rem;
  h1 {
    font-family: 'Rajdhani', sans-serif;
    line-height: 36pt;
    font-size: 50pt;
    text-align: center;
    font-weight: normal;
    margin-bottom: 0;
  }
  .header-wrapper {
    display: flex;
    flex-direction: column;
    .prop-filters {
      align-self: flex-end;
      margin-top: .5rem;
      margin-right: .5rem;
    }
  }
}
.navbar {
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
.dot {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 2.4rem;
}
@media screen and (max-width: 1024px) {
  .navigation {
    margin-top: 1rem;
  }
}
@media screen and (max-width: $nav-menu-break-width) {
  .navbar h1 {
    margin-top: 1.2rem;
  }
}
</style>
