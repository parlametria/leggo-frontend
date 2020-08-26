<template>
  <div>
    <emendas-info
      :id="etapa.id_ext"
      :casa="etapa.casa"
      :date="date"
      :prop-name="etapa.sigla" />
  </div>
</template>

<script>
import EmendasInfo from './expanded/EmendasInfo'
import moment from 'moment'

export default {
  name: 'Etapaproposicao',
  data () {
    return {
      dropShow: false
    }
  },
  props: {
    id_leggo: {
      type: String,
      default: '-1'
    },
    etapa: {
      type: Object,
      default: undefined
    },
    idLastEtapa: {
      type: Number,
      default: -1
    },
    date: {
      type: Date,
      default: function () {
        return moment()
      }
    },
    casa: {
      type: String,
      default: ''
    }
  },
  components: {
    EmendasInfo
  },
  methods: {
    hasNumber (myString) {
      return /\d/.test(myString)
    }
  },
  computed: {
    isLastEtapa () {
      if (this.etapa.sigla_tipo === 'MPV') {
        return this.etapa.id !== this.idLastEtapa
      }
      return this.etapa.id === this.idLastEtapa
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";
.small-text-field {
  font-size: 10pt;
  color: gray;
  margin: 0;
}
.big-text-field {
  margin-top: 0px;
  font-size: 22px;
  margin-bottom: 0px;
}
.medium-text-field {
  font-size: 12pt;
  margin: 0;
}
.small-margin-top {
  padding-top: 5px;
}
.btn {
  background-color: transparent;
}
</style>
