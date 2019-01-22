<template>
  <el-container id="app">
    <el-aside class="aside-menu">
      <nav-menu>
        <el-collapse-transition mode="out-in">
          <router-view name="menu"/>
        </el-collapse-transition>
      </nav-menu>
    </el-aside>
    <el-container>
      <el-main>
        <transition name="el-fade-in" mode="out-in">
          <router-view/>
        </transition>
      </el-main>
      <el-footer class="footer">
        <p>
          <span v-if="commitHash">versão <a :href="`https://github.com/analytics-ufcg/agora-digital-frontend/commit/${commitHash}`" target="_blank">{{ commitHash }}</a></span>
          <span v-if="buildDate"> compilada em {{ buildDate }}</span>
        </p>
        <p v-if="metaInfo && metaInfo.last_update_trams">
          dados de {{ moment(metaInfo.last_update_trams).format('DD/MM/YYYY') }}
        </p>
      </el-footer>
    </el-container>
  </el-container>
</template>

<script>
import NavMenu from '@/components/menu/NavMenu.vue'
import { mapState, mapActions } from 'vuex'
import moment from 'moment'

export default {
  components: {
    NavMenu
  },
  data () {
    return {
      commitHash: process.env.VUE_APP_COMMIT_HASH,
      buildDate: process.env.VUE_APP_BUILD_DATE
    }
  },
  computed: {
    ...mapState({
      metaInfo: state => state.proposicoes.metaInfo
    })
  },
  methods: {
    ...mapActions(['getMetaInfo']),
    moment
  },
  mounted () {
    this.getMetaInfo()
  }
}
</script>
<style lang="scss">
@import "@/base.scss";

.el-container > .el-main {
    padding: 0px;
}

body {
    margin: 0;
    font-family: 'Ubuntu', sans-serif;
}
.flex-center {
    justify-content: center;
}
.aside-menu {
    width: 300px !important;
    @media (max-width: $nav-menu-break-width) {
        width: 0px !important;
    }
}
a {
    color: $--color-primary;
    text-decoration: none;
}
.footer {
    text-align: center;
    font-size: 10pt;
    color: grey;
}
</style>
