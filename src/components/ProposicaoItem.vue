<template>
    <el-card shadow="hover" class="box-card">
        <router-link :to="{ name: 'proposicaoDetails', params: { casa: prop.casa, idExt: prop.id_ext }}">
            {{ prop.apelido }}
        </router-link>
        <energy :value="prop.energia" class="inline-content"/>
        <ul class="fases inline-content">
          <li
            v-for="(event, j) in prop.resumo_tramitacao" :key="j"
            :class="event.casa" :title="event.nome">
          </li>
        </ul>
        <div id="tags">
            <regime-tramitacao :regime="prop.regime_tramitacao"></regime-tramitacao>
            <el-tag v-if="prop.em_pauta" type="info" size="mini">Em pauta</el-tag>
        </div>
    </el-card>
</template>

<script>
import Energy from '@/components/Energy.vue'
import RegimeTramitacao from '@/components/RegimeTramitacao.vue'

export default {
  name: 'proposicaoitem',
  components: {
    Energy,
    RegimeTramitacao
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
