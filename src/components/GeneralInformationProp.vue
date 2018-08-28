<template>
    <el-card class="box-card" id="general-information">
        <div slot="header" class="clearfix">
            <span>Informações Gerais</span>
        </div>

        <table style="width:100%">
            <tr class="text item">
                <td><b>Autor</b></td>
                <td>{{ proposicao.autor }}</td>
            </tr>
            <tr class="text item">
                <td><b>Casa de Origem</b></td>
                <td>{{ proposicao.casa_origem }}</td>
            </tr>
            <tr class="text item">
                <td><b>Data de Apresentação</b></td>
                <td>{{ proposicao.data_apresentacao }}</td>
            </tr>
            <tr class="text item">
                <td><b>Ementa</b></td>
                <td>{{ proposicao.ementa }}</td>
            </tr>
            <tr class="text item">
                <td><b>Explicação da Ementa</b></td>
                <td>{{ proposicao.explicacao_ementa }}</td>
            </tr>
            <tr class="text item">
                <td><b>Status Atual</b></td>
                <td>{{ proposicao.status_atual }}</td>
            </tr>
            <tr class="text item">
                <td><b>Forma de Apreciação</b></td>
                <td>{{ proposicao.forma_apreciacao }}</td>
            </tr>
            <tr class="text item">
                <td><b>Regime de Tramitação</b></td>
                <td>{{ proposicao.regime_tramitacao }}</td>
            </tr>
            <tr class="text item">
                <td><b>Último Relator</b></td>
                <td>{{ proposicao.ultimo_relator }}</td>
            </tr>
        </table>

        <p class="text item"><a :href='proposicao.url'>Link no site oficial</a></p>
    </el-card>
</template>

<script>
export default {
  name: 'GerenalInformationProp',
  props: ['proposicao']
}
</script>

<style>
    #general-information {
        text-align: left;
    }
</style>
