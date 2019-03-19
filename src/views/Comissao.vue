<template>
    <div>
        <span class="titulo">Comissão <span class="sigla">{{siglaComissao}}</span></span>
        <composicao :siglaComissao="siglaComissao"/>
    </div>
</template>
<script>
import Composicao from '@/components/comissao/Composicao'

export default {
    name: 'Comissao',
    props: {
      siglaComissao: String
    },
    components: {
      Composicao
    }
}
</script>
<style lang="scss" scoped>
  .titulo{
    color: #656565;
    font-size: 1.4rem;
  }
  .sigla {
    font-size: 1.6rem;
    text-transform: uppercase;
  }
</style>
