<template>
    <div  class="tagTemas">
       <div v-for="(tema, i) in temas" :key="i">
           <span class="tag">{{ tema }}</span>
        </div>
    </div>
</template>

<script>
export default {
    name: "Temas",
    props: {
        temas: Array
    }
}
</script>

<style lang="scss" scoped>
.tagTemas {
    display: flex;
    flex-direction: row;
}
.tag {
    background-color: #FFA07A;
    margin-right: 10px;
    border-radius: 5%;
}
</style>
