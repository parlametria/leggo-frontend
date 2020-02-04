<template>
  <div>
    <h5>{{ propName }} - {{ capitalizeFirstLetter(casa) }}</h5>
    <div v-if="verificaSeMostraEmendas">
      <div class="emendas-info">
        <span class="emendas-info-text">Total: {{ propEmendas.length }} | Analisadas: {{ getAnalisadas }}</span>
        <el-tooltip
          placement="bottom"
          effect="light"
        >
          <div
            class="tooltip-content"
            slot="content"
          >
            Analisamos todas as <strong>emendas disponibilizadas como texto</strong> por meio do serviço de Dados Abertos da Câmara e do Senado.
            Não analisamos emendas disponibilizadas como imagem ou fotocópias.
          </div>
          <span
            target="_blank"
            class="link icon-info">
            <i class="bx bx-info-circle"/>
          </span>
        </el-tooltip>
      </div>
      <el-tabs>
        <el-tab-pane label="Todas as emendas">
          <emendas-tab-content
            :emendas="emendas[id]"
            :categoria="'todas'" />
        </el-tab-pane>
        <el-tab-pane
          v-if="verificaSeMostraEmendasAnalisadas"
          label="Mudanças Mais Aparentes">
          <emendas-tab-content
            :emendas="getDiscrepantes"
            :categoria="'drásticas'"
            :show-texto-explicacao="showTextoExplicacao"
          />
        </el-tab-pane>
        <el-tab-pane
          v-if="verificaSeMostraEmendasAnalisadas"
          label="Mudanças Mais Sutis">
          <emendas-tab-content
            :emendas="getSemelhantes"
            :categoria="'pontuais'"
            :show-texto-explicacao="showTextoExplicacao"
          />
        </el-tab-pane>
      </el-tabs>
    </div>
    <div v-else-if="(propEmendas === undefined || propEmendas.length === 0)">
      <div
        v-if="getCasa === 'camara'"
        class="title sem-emendas"
      >Não foram apresentadas emendas para esta proposição {{ getCasa | toFormattedName }}
      </div>
      <div
        v-else
        class="title sem-emendas">
        As emendas {{ getCasa | toFormattedName }} estão temporariamente indisponíveis. Estamos trabalhando nisso.
      </div>
    </div>
    <div v-else>
      <div class="title sem-emendas">
        Não foi possível analisar as emendas {{ getCasa | toFormattedName }}.
      </div>
    </div>
  </div>
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
    id: {
      type: Number,
      default: undefined
    },
    casa: {
      type: String,
      default: ''
    },
    date: {
      type: Date,
      default: function () {
        return moment()
      }
    },
    numEtapas: {
      type: Number,
      default: undefined
    },
    propName: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      LIMIAR: 10
    }
  },
  filters: {
    toFormattedName (value) {
      if (value === 'senado') {
        return 'no Senado'
      } else if (value === 'camara') {
        return 'na Câmara'
      } else {
        return value
      }
    }
  },
  mounted () {
    this.getEmendas(this.query)
  },
  methods: {
    capitalizeFirstLetter (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    },
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },
    ...mapActions(['getEmendas'])
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
      return this.emendas[this.id]
        ? this.emendas[this.id]
          .filter(emenda => emenda.distancia !== -1)
          .sort((a, b) => b.distancia - a.distancia)
        : this.emendas[this.id]
    },
    getDiscrepantes () {
      return _.take(
        this.orderedEmendas,
        _.ceil(this.orderedEmendas.length / 2)
      )
    },
    getSemelhantes () {
      return _.reverse(_.takeRight(
        this.orderedEmendas,
        _.floor(this.orderedEmendas.length / 2)
      ))
    },
    verificaSeMostraEmendas () {
      return (
        this.propEmendas &&
        this.propEmendas.length
      )
    },
    getAnalisadas () {
      var analisadas = 0
      this.orderedEmendas.forEach(function (emenda) {
        if (emenda.distancia !== -1) {
          analisadas++
        }
      })
      return analisadas
    },
    getCasa () {
      return this.orderedEmendas &&
        this.orderedEmendas[0] &&
        this.orderedEmendas[0].local.startsWith('CMMPV')
        ? 'Congresso Nacional'
        : this.casa
    },
    verificaSeMostraEmendasAnalisadas () {
      return (
        this.verificaSeMostraEmendas &&
        this.getAnalisadas &&
        this.getAnalisadas > this.LIMIAR
      )
    },
    showTextoExplicacao () {
      return this.propEmendas.length !== this.getAnalisadas
    }
  },
  watch: {
    date () {
      this.getEmendas(this.query)
    }
  }
}
</script>

<style lang="scss" scoped>
.title {
  font-size: 0.97rem;
  line-height: 15px;
}
.emendas {
  font-size: 10pt;
  text-align: center;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 0.5rem;
  text-align: left;
}
.sem-emendas {
  color: #969696;
  font-size: 0.8em;
}
.link {
  cursor: pointer;
  color: #AA67AE;
}
.tooltip-content {
  max-width: 200px;
}
.emendas-info {
  display: flex;
  margin-bottom: 10px;
}
.icon-info {
  margin: 1px 4px 0px 8px;
  font-size: 1rem;
}
.emendas-info-text {
  font-size: 0.9rem;
  font-weight: bold;
}
</style>
