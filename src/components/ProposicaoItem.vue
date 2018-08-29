<template>
    <el-card shadow="hover" class="box-card">
        {{ prop.ano }}{{ prop.ano_materia }} -
        <router-link :to="{ name: 'proposicaoDetails', params: { idProposicao: prop.id }}" />
            {{ prop.id }}
        -
        <a :href="prop.page_url" target="_blank">link</a> -
        fases:
        <ul class="fases">
            <li :key="j" v-for="(fase, j) in prop.fases" :class="fase.casa" :title="fase.nome">
            </li>
        </ul>
        <energy value="30"/>
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
    width: 480px;
}

</style>
