<template>
  <div class="comissao">
    <router-link :to="{ name: 'proposicoes' }">
      <span class="titulo">
        Comissão
        <span class="sigla">{{siglaComissao}} - {{casaFormatada}}</span>
      </span>
    </router-link>
    <composicao :casaComissao="casaComissao" :siglaComissao="siglaComissao"/>
  </div>
</template>
<script>
import Composicao from '@/components/comissao/Composicao'

export default {
  name: 'Comissao',
  props: {
    siglaComissao: String,
    casaComissao: String
  },
  components: {
    Composicao
  },
  computed: {
    casaFormatada () {
      return this.casaComissao === 'camara' ? 'Câmara' : 'Senado'
    }
  }
}
</script>
<style lang="scss" scoped>
.comissao {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding-left: 20px;
  padding-right: 20px;
}
.titulo {
  color: #656565;
  font-size: 2rem;
  padding-right: 15px;
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
.sigla {
  font-size: 2rem;
  text-transform: uppercase;
}
.composicao {
  margin-top: 20px;
}
</style>
