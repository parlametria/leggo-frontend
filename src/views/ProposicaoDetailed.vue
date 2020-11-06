<template>
  <div>
    <div v-if="prop === undefined">Falha no carregamento</div>
    <div v-else>
      <temas
        class="tema"
        :temas="prop.temas" />
      <a>
        <span
          v-if="prop.apelido !== 'nan'"
          class="titulo">{{ this.prop.apelido }}</span>
        <span
          v-else
          class="titulo">{{ prop.lastEtapa.sigla }}</span>
      </a>
      <proposicao-expanded :prop="this.prop" />
    </div>
  </div>
</template>

<script>
import ProposicaoItem from '@/components/card/ProposicaoItem'
import ProposicaoExpanded from '@/components/card/ProposicaoExpanded'
import Temas from '@/components/card/collapsed/Temas.vue'

export default {
  name: 'Proposicoes',
  props: {
    prop: {
      type: Object,
      default: undefined
    }
  },
  components: {
    ProposicaoItem,
    ProposicaoExpanded,
    Temas
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";

.titulo {
  color: #656565;
  font-size: 2rem;
  padding: 0rem 2rem;
}

.tema {
  padding-left: 20px;
}
</style>
