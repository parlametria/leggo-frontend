<template>
    <el-card shadow="hover" class="box-card">
        <router-link :to="{ name: 'proposicaoDetails', params: { casa: prop.casa, idExt: prop.id_ext }}">
            {{ prop.apelido }}
        </router-link>
        <energy :value="prop.energia" class="inline-content"/>
        <fases-bar :fases="prop.resumo_progresso" />
        <div id="tags">
             <regime-tramitacao :regime="prop.regime_tramitacao"></regime-tramitacao>
             <forma-apreciacao :apreciacao="prop.forma_apreciacao"></forma-apreciacao>
            <el-tag v-if="prop.em_pauta" type="info" size="mini">Em pauta</el-tag>
        </div>
    </el-card>
</template>

<script>
import Energy from '@/components/Energy.vue'
import RegimeTramitacao from '@/components/RegimeTramitacao.vue'
import FormaApreciacao from '@/components/FormaApreciacao.vue'
import FasesBar from '@/components/FasesBar'

export default {
  name: 'proposicaoitem',
  components: {
    Energy,
    RegimeTramitacao,
    FormaApreciacao,
    FasesBar
  },
  props: {
    prop: Object
  }
}
</script>

<style lang="scss">
.fases {
    display: inline-block;
    padding: 0;
    li {
        display: inline-block;
        width: 10px;
        height: 20px;
        margin: 3px;
    }
    .senado {
        background-color: #cbd5e8;
    }
    .camara {
        background-color: #b3e2cd;
    }
}
.box-card {
    width: auto;
}
.inline-content {
    display: inline-block;
}
a {
    text-decoration: none;
}

#tags {
    display: flex;
}

 .el-tag {
    margin-right: 3px;
}

</style>
