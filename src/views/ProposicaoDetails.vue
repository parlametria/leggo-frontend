<template>
    <div>
        <h1>{{ prop.nome }}</h1>
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
import GeneralInformationProp from '@/components/GeneralInformationProp'
import SummaryProp from '@/components/SummaryProp'

export default {
  name: 'ProposicaoDetails',
  components: {
    GeneralInformationProp,
    SummaryProp
  },
  data () {
    return {
      prop: {
        // nome: 'PL 490/2007',
        // autor: 'Homero Pereira PSD/SP',
        // casa_origem: 'Câmara dos Deputados',
        // data_apresentacao: '20/03/2007',
        // ementa: 'Altera a Lei n° 6.001, de 19 de dezembro de 1973, que dispõe sobre o Estatuto do Índio.',
        // explicacao_ementa: 'Estabelece que as terras indígenas serão demarcadas através de leis.',
        // status_atual: 'Não Deliberado',
        // forma_apreciacao: 'Plenário',
        // regime_tramitacao: 'Ordinária',
        // ultimo_relator: 'Dep. Jerônimo Goergen (PP-RS)',
        // url: 'http://www.camara.gov.br/proposicoesWeb/fichadetramitacao?idProposicao=345311'
      }
    }
  },
  async mounted () {
    var url = 'http://localhost:8000/proposicoes/' + this.$route.params.idProposicao
    this.prop = await (await fetch(url)).json()
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
