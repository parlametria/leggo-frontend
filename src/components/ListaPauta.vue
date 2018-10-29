<template>
<div id="pautas">
    <div v-if="id in pautas">
        <p id="descricao">Próximas pautas</p>
        <table>
            <tr v-for="(pauta, key) in pautas[id]" :key="key">
                <td>{{pauta.data.getDate()}}-{{pauta.data.getMonth()}}-{{pauta.data.getFullYear()}}</td>
                <td>{{pauta.local}}</td>
            </tr>
        </table>
    </div>
    <div id="empty-pautas" v-else>Calendário de pautas não disponível</div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'listapauta',
    props: {
        id: Number
    },
    computed: mapState ({
        pautas: state => state.proposicoes.pautas
    })
}
</script>

<style scoped>
#pautas {
    text-align: center;
}
#descricao {
    font-weight: bold;
}
#empty-pautas {
    color: #999;
}
table {
    border-collapse: collapse;
    width: 100%;
}
th, td {
    padding: 1rem;
    text-align: left;
    border-bottom: 1px solid #ddd;
}
</style>
 
