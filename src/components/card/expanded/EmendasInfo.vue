<template>
    <el-collapse v-if="propEmendas && propEmendas.length">
      <el-collapse-item>
        <template slot="title">
          <span class="title">Últimas Emendas</span>
        </template>
          <el-tabs>
            <el-tab-pane label="Mais Discrepantes">
              <emendas-tab-content :emendas='getDiscrepantes'/>
            </el-tab-pane>
            <el-tab-pane label="Mais Semelhantes">
               <emendas-tab-content :emendas='getSemelhantes'/>
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
      return this.emendas[this.id].sort((a,b) => b.distancia - a.distancia)
    },
    getDiscrepantes () {
      return _.take(this.orderedEmendas, _.ceil(this.orderedEmendas.length / 2))
    },
    getSemelhantes () {
      console.log(_.ceil(this.orderedEmendas.length / 2))
      return _.reverse(_.takeRight(this.orderedEmendas, _.ceil(this.orderedEmendas.length / 2)))
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
