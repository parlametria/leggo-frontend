<template>
  <div class="tagTemas">
    <div
      v-for="(tema, i) in temas"
      :key="i">
      <span class="tag">{{ tema }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Temas',
  props: {
    temas: {
      type: Array,
      default () { return [] }
    }
  }
}
</script>

<style lang="scss" scoped>
.tagTemas {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    font-size: 9pt;
}
.tag {
    margin-right: 10px;
    border-radius: 5%;
}

@media (min-width: 321px) {
  .tagTemas {
    font-size: 12pt;
  }

}

</style>
