<template>
    <el-card shadow="hover" class="box-card">
        <router-link :to="{ name: 'proposicaoDetails', params: { casa: prop.casa, idExt: prop.id_ext }}">
            {{ prop.sigla }}
        </router-link>
        <energy value="30" class="inline-content"/>
        <ul class="fases inline-content">
          <li
            v-for="(event, j) in prop.resumo_tramitacao" :key="j"
            :class="event.casa" :title="event.nome">
          </li>
        </ul>
    </el-card>
</template>

<script>
import Energy from '@/components/Energy.vue'

export default {
  name: 'proposicaoitem',
  components: {
    Energy
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

</style>
