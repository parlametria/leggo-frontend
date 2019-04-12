<template>
    <table class="emendas">
        <tr>
            <th>Coerência</th>
            <th>Data de apresentação</th>
            <th>Local de apresentação</th>
            <th>Autor</th>
            <th>Número</th>
        </tr>
        <tr v-for="(emenda, key) in emendas" :key="key">
            <td><p>{{emenda.distancia}}</p></td>
            <!--td><p>{{formatDate(emenda.data_apresentacao)}}</p></td-->
            <td><p>{{emenda.local}}</p></td>
            <td><p>{{emenda.autor}}</p></td>
            <td><a :href="emenda.inteiro_teor" target="_blank">Emenda {{emenda.numero}}</a></td>
        </tr>
    </table>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'EmendasTabContent',
  props: {
    emendas: Array
  }
}
</script>

<style scoped>
.emendas {
    font-size: 10pt;
    text-align: center;
}
table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    padding: .5rem;
    text-align: left;
}
</style>
