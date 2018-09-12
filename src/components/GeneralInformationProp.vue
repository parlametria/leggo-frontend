<template>
    <el-card class="box-card" id="general-information">
        <div slot="header" class="clearfix">
            <span>Informações Gerais</span>
        </div>

        <table style="width:100%">
            <tr>
                <td><b>Autor</b></td>
                <td>{{ proposicao.autor }}</td>
            </tr>
            <tr>
                <td><b>Casa de Origem</b></td>
                <td>{{ proposicao.casa }}</td>
            </tr>
            <tr>
                <td><b>Data de Apresentação</b></td>
                <td>{{ proposicao.data_apresentacao }}</td>
            </tr>
            <tr>
                <td><b>Ementa</b></td>
                <td>{{ proposicao.ementa }}</td>
            </tr>
            <tr>
                <td><b>Justificativa da Ementa</b></td>
                <td>{{ proposicao.justificativa }}</td>
            </tr>
            <tr>
                <td><b>Forma de Apreciação</b></td>
                <td>{{ proposicao.forma_apreciacao }}</td>
            </tr>
            <tr>
                <td><b>Regime de Tramitação</b></td>
                <td>{{ proposicao.regime_tramitacao }}</td>
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
