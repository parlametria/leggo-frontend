<template>
    <div>
        <h1>{{ prop.nome }}</h1>
        <p v-if="pending.proposicao">loading posts...</p>
        <p v-if="error.proposicao">loading failed</p>
        <el-main>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="18">
                    <general-information-prop :proposicao="prop" />
                </el-col>
            </el-row>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="18">
                    <summary-prop :proposicao="prop.resumo" />
                </el-col>
            </el-row>
        </el-main>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'

import GeneralInformationProp from '@/components/GeneralInformationProp'
import SummaryProp from '@/components/SummaryProp'

export default {
  name: 'ProposicaoDetails',
  components: {
    GeneralInformationProp,
    SummaryProp
  },
  mounted () {
    this.getProposicao(
      {params: {casa: this.$route.params.casa, idExt: this.$route.params.idExt}}
    )
  },
  computed: mapState({
    prop: state => state.proposicao,
    pending: state => state.pending,
    error: state => state.error
  }),
  methods: {
    ...mapActions([
      'getProposicao'
    ])
  }
}
</script>

<style>
  .box-card {
    text-align: left;
  }
  .row-bg {
    margin-bottom: 2rem;
  }
</style>
