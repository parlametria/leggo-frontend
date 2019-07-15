<template>
  <div>
    <div v-if="prop === undefined">Falha no carregamento</div>
    <div v-else>
      <router-link :to="{ path: $store.state.route.from.fullPath }">
        <span class="titulo">
          {{ this.prop.apelido }}
        </span>
      </router-link>
      <proposicao-expanded :prop="this.prop"/>
    </div>
  </div>
</template>

<script>
import ProposicaoItem from '@/components/card/ProposicaoItem'
import ProposicaoExpanded from '@/components/card/ProposicaoExpanded'

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
    ProposicaoExpanded
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";

.titulo {
  color: #656565;
  font-size: 2rem;
  padding: 0rem 0.5rem;
}
.titulo::before {
  height: 12px;
  width: 12px;
  border: solid #dc6060;
  border-width: 0px 3px 3px 0;
  margin-bottom: 4px;
  margin-right: -5px;
  transform: rotate(130deg);
  content: "";
  display: inline-block;
}

</style>
