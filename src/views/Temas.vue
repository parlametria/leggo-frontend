<template>
  <div>
    <div class="container-tema">
      <h4 class="text-center">Quais temas você tem mais interesse?</h4>
      <div class="row gutters-sm mt-4">
        <div v-for="(tema,i) in this.temas" :key="i" class="col-6 col-md-4 col-lg-3">
          <button class="tema-btn">{{tema}}</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tema",
  computed: {
    temas() {
      return ["Meio Ambiente", "Direitos Humanos", "Educação", "Agenda Governo", "Integridade e Transparência"];
    }
  }
};
</script>
<style lang="scss" scoped>
.container-tema {
  align-items: center;
}

.tema-btn {
  background-color: white;
  width: 100%;
  height: 100%;
  margin: 1rem;
  font-size: 1.5rem;
  border-color: black;
}

.tema-btn:hover {
  background-color: black;
  color: white;
}

.gutters-sm {
    margin-right: -5px;
  margin-left: -5px;
  display: flex;
  flex-direction: row;
   flex-wrap: wrap;
   justify-content: flex-start;
}
</style>
