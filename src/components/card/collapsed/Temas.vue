<template>
    <div  class="tagTemas">
      <span class="tag">{{ temas }}</span>
    </div>
</template>

<script>
export default {
  name: 'Temas',
  props: {
    temas: Array
  }
}
</script>

<style lang="scss" scoped>
.tagTemas {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
}
.tag {
    background-color: #DCDCDC;
    margin-right: 10px;
    border-radius: 5%;
}

</style>
