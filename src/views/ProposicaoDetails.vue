<template>
    <div id="proposicao-details">
        <el-row>
            <el-col>
                <h1>{{ prop.nome }}</h1>
                
                <h2>Informações Gerais</h2>
                <ul>
                    <li> <b>Autor:</b> {{ prop.autor }}</li>
                    <li> <b>Casa de Origem:</b> {{ prop.casa_origem }}</li>
                    <li> <b>Data de Apresentação:</b> {{ prop.data_apresentacao }}</li>
                    <li> <b>Ementa:</b> {{ prop.ementa }}</li>
                    <li> <b>Explicação da Ementa:</b> {{ prop.explicacao_ementa }}</li>
                    <li> <b>Status Atual:</b> {{ prop.status_atual }}</li>
                    <li> <b>Forma de Apreciação:</b> {{ prop.forma_apreciacao }}</li>
                    <li> <b>Regime de Tramitação:</b> {{ prop.regime_tramitacao }}</li>
                    <li> <b>Último Relator:</b> {{ prop.ultimo_relator }}</li>
                    <li><a :href='prop.url'>Link no site oficial</a></li>
                </ul>
            </el-col>
        </el-row>
        <!-- {{ $route.params.idProposicao }} -->
    </div>
</template>

<script>
    export default {
        name: 'ProposicaoDetails',
        data () {
            return {
                prop: {
                    nome: "PL 490/2007",
                    autor: "Homero Pereira PSD/SP",
                    casa_origem: "Câmara dos Deputados",
                    data_apresentacao: "20/03/2007",
                    ementa: "Altera a Lei n° 6.001, de 19 de dezembro de 1973, que dispõe sobre o Estatuto do Índio.",
                    explicacao_ementa: "Estabelece que as terras indígenas serão demarcadas através de leis.",
                    status_atual: "Não Deliberado",
                    forma_apreciacao: "Plenário",
                    regime_tramitacao: "Ordinária",
                    ultimo_relator: "Dep. Jerônimo Goergen (PP-RS)",
                    url: "http://www.camara.gov.br/proposicoesWeb/fichadetramitacao?idProposicao=345311"
                }
            }
        }
    
    }
</script>

<style>
#proposicao-details {
    text-align: left;
    padding: 0 3rem;
}
</style>