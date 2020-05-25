<template>
  <div>
    <div v-if="formattedAnotacoes.length">
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
            <tr
              class="titulo-anotacao"
            > {{ anotacao.titulo }} </tr>
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
    <div v-else>
      <span>Ainda não foram adicionadas anotações à esta proposição.</span>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from 'vuex'
import moment from 'moment'
import mixin from '@/mixins/ExpandedTexts.js'

export default {
  name: 'AnotacaoProp',
  data () {
    return {
      MAX_TEXT_LENGTH: 200,
      TEXT_TO_BE_SHOWED_LENGTH: 50
    }
  },
  mixins: [mixin],
  props: {
    id: {
      type: Number,
      default: undefined
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
      this.getAnotacoesByProp(this.query)
    }
  },
  computed: {
    ...mapGetters(['getInteresse']),
    formattedAnotacoes () {
      return (this.anotacoesProp[this.id] || []).map((anotacao, index) => {
        return {
          dataModificacao: this.formatDate(anotacao.data_ultima_modificacao),
          dataModificacaoDiff: this.formatDateDifference(anotacao.data_ultima_modificacao),
          dataCriacao: this.formatDate(anotacao.data_criacao),
          dataCriacaoDiff: this.formatDateDifference(anotacao.data_criacao),
          autor: anotacao.autor === 'nan' ? '' : anotacao.autor,
          titulo: anotacao.titulo === 'nan' ? '' : anotacao.titulo,
          texto: this.formatTextoTramitacao(
            anotacao.anotacao,
            index,
            this.MAX_TEXT_LENGTH,
            this.TEXT_TO_BE_SHOWED_LENGTH
          ),
          collapsible: anotacao.anotacao.length > this.MAX_TEXT_LENGTH
        }
      })
    },
    groupAnotacoes () {
      let groups = {}
      let groupName
      this.formattedAnotacoes.forEach(anotacao => {
        console.log(anotacao)
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
      console.log(myArray)
      return myArray
    },
    ...mapState({
      anotacoesProp: state => state.anotacoes.anotacoesProp
    }),
    query () {
      return {
        params: {
          id: this.id,
          peso: 3,
          ultimasN: 10,
          interesse: this.getInteresse
        }
      }
    }
  },
  methods: {
    ...mapActions(['getAnotacoesByProp']),
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
      this.getAnotacoesByProp(this.query)
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
