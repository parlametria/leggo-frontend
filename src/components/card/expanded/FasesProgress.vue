<template>
  <div>
    <ul class="progressbar">
      <el-tooltip
        placement="bottom"
        v-for="(fase, i) in fasesResumidas"
        :key="i"
        effect="light">
        <div class="tooltip-content" slot="content">
          <p>Fase: <strong>{{fase.fase_global}} - {{fase.local}}</strong></p>
          <p>Casa: <strong>{{ $t(fase.local_casa) }}</strong></p>
          <p v-if="fase.data_inicio">Início: {{ formatDate(fase.data_inicio) }}</p>
          <p v-if="fase.data_fim">Fim: {{ formatDate(fase.data_fim) }}</p>
          <p>Histórico de comissões: {{comissoesHistoric(fase)}}</p>
          <p v-if="fase.pulou">Esta proposição não precisou passar por esta fase.</p>
          <p v-if="isInProgress(fase)">Fase atual desta proposição.</p>
          <p v-if="isFuture(fase)">Esta proposição ainda não chegou nesta fase.</p>
        </div>
        <li :class="styleFase(fase)"/>
      </el-tooltip>
      <hr class="linha"/>
    </ul>
  </div>
</template>

<script>
import { resumirFases } from '@/utils'
import moment from 'moment'

export default {
  name: 'FasesProgress',
  props: {
    fases: Array,
    etapas: Array
  },
  computed: {
    fasesResumidas () {
      return resumirFases(this.fases)
    }
  },
  methods: {
    styleFase (fase) {
      return {
        'active': this.isFinished(fase),
        'future': this.isFuture(fase),
        'jumped': this.isJumpedFase(fase),
        'inProgress': this.isInProgress(fase),
        'senado': fase.local_casa === 'senado',
        'camara': fase.local_casa === 'camara',
        'planalto': fase.local_casa === 'presidência da república' || fase.local_casa === 'congresso'
      }
    },
    isInProgress (fase) {
      const now = Date.now()
      return (fase.data_inicio != null && fase.data_fim == null) || new Date(fase.data_fim) > now
    },
    isComissoes (fase) {
      return fase.local === 'Comissões'
    },
    isFinished (fase) {
      const now = Date.now()
      return fase.data_fim != null && new Date(fase.data_fim) < now
    },
    isJumpedFase (fase) {
      return fase.pulou
    },
    isFuture (fase) {
      return fase.data_fim == null && fase.data_inicio == null && !this.isJumpedFase(fase)
    },
    formatDate (date) {
      return moment(date).format('DD/MM/YYYY')
    },

    formatArray (arrayComissoes) {
      var resposta = ''
      var i
      for (i = 0; i < arrayComissoes.length; i++) {
        if (i !== arrayComissoes.length - 1) {
          resposta += arrayComissoes[i] + ', '
        } else {
          resposta += arrayComissoes[i]
        }
      }
      return resposta
    },

    comissoesHistoric(fase) {
      if(this.isComissoes(fase) && !fase.pulou && !this.isFuture(fase))
        if(fase.fase_global == "Construção")
          return this.formatArray(this.etapas[0].comissoes_passadas)
        else if(fase.fase_global == "Revisão I")
          return this.formatArray(this.etapas[1].comissoes_passadas)
    }
  }
}
</script>

<style lang="scss" scoped>
.tooltip-content {
    p {
        margin: 0;
        color: gray;
    }
}
strong {
    font-weight: normal;
    color: #000;
}
.progressbar {
    padding: 0;
    display: flex;
    justify-content: space-between;
    position: relative;
}
.progressbar li {
    list-style-type: none;
    position: relative;
}

/* os before fazem os circulos */

.progressbar li:before {
    width: 30px;
    height: 30px;
    content: '';
    position: relative;
    display: block;
    margin: 0 auto 10px auto;
    background-size: cover;
}

/* linhas */
.linha {
    width: 99%;
    height: 2px;
    position: absolute;
    background-color: grey;
    top: 5px;
    left: 1%;
    z-index: -1;
    border: none;
}
.camara:before {
    background-image: url('../../../assets/colored_camara.png');
    background-size: cover;
}
.senado:before {
    background-image: url('../../../assets/colored_senado.png');
}

.future:before {
    filter: brightness(1.4) saturate(.1);
}

.planalto:before {
    background-image: url('../../../assets/colored_planalto.png');
}

.jumped:before {
    background-image: url('../../../assets/colored_vazio.png');
}

.inProgress:before {
    transform: scale(1.7);
    z-index: 1;
}

</style>
