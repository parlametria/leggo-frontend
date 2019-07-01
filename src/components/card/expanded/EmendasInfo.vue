<template>
    <el-collapse v-if="verificaSeMostraEmendas">
      <el-collapse-item>
        <template slot="title">
          <span class="title">Análise das Emendas - {{getCasa | toFormattedName}} (total: {{propEmendas.length}}, analisadas: {{getAnalisadas}})</span>
        </template>
          <el-tabs>
            <el-tab-pane  v-if="verificaSeMostraEmendasAparentes" label="Mudanças Mais Aparentes">
              <emendas-tab-content :emendas='getDiscrepantes' :categoria="'drásticas'"/>
            </el-tab-pane>
            <el-tab-pane label="Mudanças Mais Sutis">
               <emendas-tab-content :emendas='getSemelhantes' :categoria="'pontuais'"/>
            </el-tab-pane>
          </el-tabs>
      </el-collapse-item>
    </el-collapse>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'
import _ from 'lodash'
import EmendasTabContent from './EmendasTabContent'

export default {
  name: 'EmendasInfo',
  components: {
    EmendasTabContent
  },
  props: {
    id: Number,
    casa: String,
    date: {
      type: Date,
      default: function () {
        return moment()
      }
    }
  },
  data () {
    return {
      LIMIAR: 10
    }
  },
  filters: {
    toFormattedName: function (value) {
      if (value === 'senado') {
        return 'Senado'
      } else if (value === 'camara') {
        return 'Câmara'
      } else {
        return value
      }
    }
  },
  mounted () {
    this.getEmendas(this.query)
  },
  computed: {
    propEmendas () {
      return this.emendas[this.id]
    },
    ...mapState({
      emendas: state => state.emendas.emendasDict
    }),
    formattedDate () {
      return moment(this.date).format('YYYY-MM-DD')
    },
    query () {
      return {
        params: {
          casa: this.casa,
          id: this.id,
          dataFim: this.formattedDate
        }
      }
    },
    orderedEmendas () {
      const result = this.emendas[this.id].filter(function (emenda) { return emenda.distancia !== -1 })
      return result.sort((a, b) => b.distancia - a.distancia)
    },
    getDiscrepantes () {
      return _.take(this.orderedEmendas, Math.min(5, _.ceil(this.orderedEmendas.length / 2)))
    },
    getSemelhantes () {
      if (!this.verificaSeMostraEmendasAparentes) {
        return _.reverse(_.takeRight(this.orderedEmendas, Math.min(5, this.orderedEmendas.length)))
      } else {
        return _.reverse(_.takeRight(this.orderedEmendas, Math.min(5, _.floor(this.orderedEmendas.length / 2))))
      }
    },
    verificaSeMostraEmendas () {
      if (this.propEmendas && this.propEmendas.length) {
        return this.orderedEmendas[0] && this.orderedEmendas[0].distancia !== -1
      } else {
        return false
      }
    },
    getAnalisadas () {
      var analisadas = 0
      this.orderedEmendas.forEach(function (emenda) {
        if (emenda.distancia !== -1) { analisadas++ }
      })
      return analisadas
    },
    getCasa () {
      return this.orderedEmendas[0].local.startsWith('CMMPV') ? 'Congresso Nacional' : this.casa
    },
    verificaSeMostraEmendasAparentes () {
      return this.verificaSeMostraEmendas && this.propEmendas.length > this.LIMIAR
    }
  },
  methods: {
    ...mapActions(['getEmendas']),
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    }
  },
  watch: {
    date () {
      this.getEmendas(this.query)
    }
  }
}
</script>

<style scoped>
.title {
  font-size: .97rem;
}
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
