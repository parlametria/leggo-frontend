<template>
    <div class="comissao">
        <span class="titulo">Comissão <span class="sigla">{{siglaComissao}}</span></span>
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
    }
}
</script>
<style lang="scss" scoped>
  .comissao {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .titulo {
    color: #656565;
    font-size: 2.0rem;
  }
  .sigla {
    font-size: 2.0rem;
    text-transform: uppercase;
  }
  .composicao {
    margin-top: 20px;
  }
</style>
