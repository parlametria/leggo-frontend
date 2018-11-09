<template>
<div class="pautas">
    <div v-if="id in pautas">
        <p class="descricao">Próximas pautas</p>
        <table>
            <tr v-for="(pauta, key) in propPautas" :key="key">
                <td>{{formatDate(pauta.data)}}</td>
                <td>{{pauta.local}}</td>
            </tr>
        </table>
    </div>
    <div class="empty-pautas" v-else></div>
</div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'listapauta',
  props: {
    id: Number
  },
  computed: {
    propPautas () {
      let now = Date.now()
      return this.pautas[this.id].filter(pauta => pauta.data >= now)
    },
    ...mapState({
      pautas: state => state.proposicoes.pautas
    })
  },
  methods: {
    formatDate: date => date.toISOString().slice(0, 10)
  }
}
</script>

<style scoped>
.pautas {
    text-align: center;
}
.descricao {
    font-weight: bold;
}
.empty-pautas {
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
