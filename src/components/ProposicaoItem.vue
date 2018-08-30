<template>
    <el-card shadow="hover" class="box-card">
        {{ prop.ano }}{{ prop.ano_materia }} -
        <router-link :to="{ name: 'proposicaoDetails', params: { casa: prop.casa, idExt: prop.id_ext }}">
            {{ prop.sigla }}
        </router-link>
        <a :href="prop.page_url" target="_blank">link</a>
        <energy value="30" class="inline-content"/>
        <ul class="fases inline-content">
            <li :key="j" v-for="(fase, j) in prop.fases" :class="fase.casa" :title="fase.nome">
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

</style>
