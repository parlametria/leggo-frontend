<template>
  <div>
    <div v-if="formattedAnotacoes.length">
      <h2>Insights</h2>
      <table class="tabela-anotacoes-prop">
        <div
          v-for="(anotacao, key) in formattedAnotacoes"
          :key="key">
          <td class="date-field">
            {{ anotacao.autor }}
            <tr class="autor-anotacao">
              <el-tooltip
                :content="anotacao.dataModificacao"
                placement="bottom">
                <div>{{ anotacao.dataModificacaoDiff }}</div>
              </el-tooltip>
            </tr>
          </td>

          <td>
            <div
              class="titulo-anotacao"
            > <span>{{ anotacao.titulo }}</span> - <router-link :to="{ name: 'proposicao', params: { id_leggo: anotacao.id_leggo, slug_interesse: anotacao.interesse }}">{{ anotacao.propName }}</router-link>
            </div>
            <tr
              :class="{ clickable: anotacao.collapsible }"
              @click="toggleCollapseDescription(key)"
            >
              {{ anotacao.texto }}
            </tr>
            <span
              v-if="!isExpanded(key) && anotacao.collapsible"
              class="el-icon-circle-plus-outline"
            />
          </td>
        </div>
      </table>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import moment from 'moment'
import mixin from '@/mixins/ExpandedTexts.js'

export default {
  name: 'ListaDeAnotacoes',
  data () {
    return {
      MAX_TEXT_LENGTH: 200,
      TEXT_TO_BE_SHOWED_LENGTH: 50
    }
  },
  mixins: [mixin],
  props: {
    peso: {
      type: Number,
      default: 1
    },
    date: {
      type: Date,
      default: function () {
        return new Date()
      }
    }
  },
  mounted () {
    if (!this.formattedAnotacoes.length) {
      this.getUltimasAnotacoes(this.query)
    }
  },
  computed: {
    ...mapGetters([
      'getPropById',
      'getInteresse'
    ]),
    formattedAnotacoes () {
      if (this.ultimasAnotacoes) {
        return (this.ultimasAnotacoes || []).map((anotacao, index) => {
          var prop = this.getPropById(anotacao.id_leggo)
          let propName = ''
          if (prop) {
            propName = prop.apelido !== 'nan' ? prop.apelido : prop.lastEtapa.sigla
          }
          return {
            dataModificacao: this.formatDate(anotacao.data_ultima_modificacao),
            dataModificacaoDiff: this.formatDateDifference(anotacao.data_ultima_modificacao),
            dataCriacao: this.formatDate(anotacao.data_criacao),
            dataCriacaoDiff: this.formatDateDifference(anotacao.data_criacao),
            autor: anotacao.autor === 'nan' ? '' : anotacao.autor,
            titulo: anotacao.titulo === 'nan' ? '' : anotacao.titulo,
            id_leggo: anotacao.id_leggo === 'nan' ? '' : anotacao.id_leggo,
            propName,
            texto: this.formatTextoTramitacao(
              anotacao.anotacao,
              index,
              this.MAX_TEXT_LENGTH,
              this.TEXT_TO_BE_SHOWED_LENGTH
            ),
            collapsible: anotacao.anotacao.length > this.MAX_TEXT_LENGTH
          }
        })
      }
    },
    groupAnotacoes () {
      let groups = {}
      let groupName
      this.formattedAnotacoes.forEach(anotacao => {
        groupName = anotacao.data
        if (!groups[groupName]) {
          groups[groupName] = []
        }
        groups[groupName].push(anotacao)
      })
      let myArray = []
      for (groupName in groups) {
        myArray.push({ group: groupName, anotacao: groups[groupName] })
      }
      return myArray
    },
    ...mapState({
      ultimasAnotacoes: state => state.anotacoes.ultimasAnotacoes
    }),
    query () {
      return {
        params: {
          peso: 100,
          ultimasN: 10,
          interesse: this.getInteresse
        }
      }
    }
  },
  methods: {
    ...mapActions(['getUltimasAnotacoes']),
    formatDateDifference (date) {
      const formattedDate = moment(this.formatDate(date), moment.ISO_8601)
      const differenceInDays = moment().diff(formattedDate, 'days')
      const differenceInMinutes = moment().diff(formattedDate, 'minutes')
      let dateInTextFormat = `Há ${differenceInDays} dias`

      if (differenceInDays > 365) {
        const differenceInYears = Math.floor(differenceInDays / 365)
        dateInTextFormat =
          differenceInYears === 1
            ? 'Há ± 1 ano'
            : `Há ± ${differenceInYears} anos`
      } else if (differenceInDays > 30) {
        const differenceInMonths = Math.floor(differenceInDays / 30)
        dateInTextFormat =
          differenceInMonths === 1
            ? 'Há ± 1 mês'
            : `Há ± ${differenceInMonths} meses`
      } else if (differenceInDays <= 1) {
        if (differenceInMinutes >= 60) {
          const differenceInHours = Math.floor(differenceInMinutes / 60)
          dateInTextFormat = `Há ± ${differenceInHours} h`
        } else {
          dateInTextFormat = `Há ± ${differenceInMinutes} min`
        }
      }

      return dateInTextFormat
    },
    formatDate (date) {
      return date.replace('T', ' ').replace('Z', '')
    }
  },
  watch: {
    date () {
      this.getUltimasAnotacoes(this.query)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/base.scss";
.el-collapse {
  margin-top: 1rem;
}
.tabela-anotacoes-prop {
  font-size: 10pt;
}
table {
  border-collapse: collapse;
  width: 100%;
}
th,
td {
  padding: 0.5rem;
  text-align: left;
  vertical-align: top;
}
.date-field {
  width: 100px;
  white-space: nowrap;
  padding-right: 2rem;
}
.titulo-anotacao {
  width: 100%;
  font-weight: bold;
  text-transform: capitalize;
}
.autor-anotacao {
  color: #999;
}
.el-icon-circle-plus-outline {
  color: $--color-primary;
}
</style>
