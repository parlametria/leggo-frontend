<template>
  <div class="status-bar">
    <span class="small-text-field">
      {{ geraFrase() }}
      <router-link v-if="hasComposicao" :to="linkComissao" class="link">{{ siglaComissaoFront }}</router-link>
      <span v-else>{{ siglaComissaoFront }}</span>
    </span>
  </div>
</template>
<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "ComposicaoLink",
  props: {
    siglaComissaoLink: {
      type: String,
      default: ""
    },
    siglaComissaoFront: {
      type: String,
      default: ""
    },
    casaComissao: {
      type: String,
      default: ""
    },
    dataLocalAtual: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      composicao: Object
    };
  },
  methods: {
    ...mapActions(["getComissao"]),
    geraFrase: function() {
      return ["Plenário", "PLEN"].includes(this.siglaComissaoFront)
        ? "Desde " + this.dataLocalAtual + " no"
        : "Desde " + this.dataLocalAtual + " na";
    }
  },
  computed: {
    linkComissao() {
      return {
        name: "comissao",
        params: {
          casaComissao: this.casaComissao,
          siglaComissao: this.siglaComissaoLink
        }
      };
    },
    hasComposicao() {
      return this.composicao === undefined ? 0 : this.composicao.length;
    },
    ...mapState({
      orgao: state => state.comissoes.orgao
    })
  },
  async mounted() {
    try {
      await this.getComissao({
        params: { casa: this.casaComissao, sigla: this.siglaComissaoLink }
      });
      this.composicao = this.orgao[this.siglaComissaoLink];
    } catch (exc) {
      this.composicao = undefined;
    }
  }
};
</script>
<style lang="scss" scoped>
.link {
  text-decoration: underline;
}

.status-bar {
  padding-bottom: 5px;
}
</style>
