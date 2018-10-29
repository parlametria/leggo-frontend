<template>
<el-table :data="pautas[id]">
    <el-table-column
    prop="data"
    label="Data">
    </el-table-column>
    <el-table-column
    prop="local"
    label="Local">
    </el-table-column>
</el-table>
</template>

<script>
import { mapState } from 'vuex'

export default {
    name: 'listapauta',
    props: {
        id: Number
    },
    computed: mapState ({
        pautas: state => state.proposicoes.pautas
    })
}
</script>
