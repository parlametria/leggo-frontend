<template>
    <el-row type="flex" justify="space-around" class="logo-container">
      <el-col :xs="24" :sm="18" :md="12" :lg="12" :xl="8">
        <div class="navbar">
            <router-link :to="{ name: 'proposicoes' }">
              <img :src="require(`@/assets/logo.png`)" class="logo" alt="">
            </router-link>
            <navigation-buttons class="navigation"/>
        </div>
        <p v-if="metaInfo && metaInfo.last_update_trams" class="last-update-date">
          Atualizado em {{ formattedLastUpdateDate }}
        </p>
      </el-col>
    </el-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import NavigationButtons from '@/components/header/NavigationButtons'
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
    NavigationButtons
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";
a {
  all: unset;
  cursor: pointer;
}
.logo {
  max-width: 100%;
  height: auto;
}
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
    .last-update-date {
      color: grey;
      text-align: right;
      margin-right: 1rem;
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
