<template>
    <div >
        <div v-if="id in pautas">
            <p class="descricao">Próximas pautas</p>
            <table class="pautas">
                <tr v-for="(pauta, key) in propPautas" :key="key">
                    <td><p>{{formatDate(pauta.data)}}</p></td>
                    <td><p>{{pauta.local}}</p></td>
                </tr>
            </table>
        </div>
        <div class="empty-pautas" v-else></div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

export default {
  name: 'PautasInfo',
  props: {
    id: Number,
    casa: String,
    date: {
      type: Date,
      default: function () {
        return new Date()
      }
    }
  },
  mounted () {
    const query = {
      'casa': this.casa,
      'id': this.id,
      'date': this.formattedDate
    }
    this.getPautas(query)
  },
  computed: {
    propPautas () {
      return this.pautas[this.id]
    },
    ...mapState({
      pautas: state => state.pautas.pautasDic
    }),
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    }
  },
  methods: {
    ...mapActions(['getPautas']),
    formatDate: date => moment(date).format('DD/MM/YYYY')
  }
}
</script>

<style scoped>
.pautas {
    font-size: 12px;
    text-align: center;
}
.descricao {
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
