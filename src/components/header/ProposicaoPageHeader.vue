<template>
  <div>
    <navigation-buttons class="navigation" />
    <div
      v-if="metaInfo && metaInfo.last_update_trams"
      class="container last-update-date"
    >Atualizado em {{ formattedLastUpdateDate }}</div>
    <h2
      :class="'link-site'">
      <a
        :href="'https://leggo-painel.parlametria.org.br/' + getInteresse">
        <span>
          Acesso ao novo Parlametria
        </span>
      </a>
    </h2>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import NavigationButtons from '@/components/header/NavigationButtons'
import moment from 'moment'

export default {
  name: 'ProposicaoPageHeader',
  computed: {
    ...mapGetters(['getInteresse']),
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
  cursor: pointer;
}
.link-site {
  text-align: center;
  text-decoration: underline;
  cursor: pointer;
}
.last-update-date {
  color: grey;
  text-align: right;
  margin-top: 1rem;
  font-size: 0.9rem;
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
