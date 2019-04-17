<template>
  <div>
    <div class="container-tema">
      <h4 class="text-center">Quais temas você tem mais interesse?</h4>
      <div class="gutters-sm">
        <div v-for="(tema,i) in this.temas" :key="i" class="col">
          <button class="tema-btn icon-meio-ambiente" icon="meio-ambiente">{{tema}}</button>
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
  font-family: icomoon;
}

@font-face {
  font-family: 'icomoon';
  src: url('../assets/fonts/icomoon.woff') format('woff'),
        url('../assets/fonts/icomoon.svg') format('svg'),
        url('../assets/fonts/icomoon.ttf') format('truetype'),
        url('../assets/fonts/icomoon.eot') format('embedded-opentype');
  font-weight: bold;
  font-style: normal;
}

.icon-meio-ambiente:before {
  content: "\e900";
}

.tema-btn {
  padding: 1rem;
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
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
}

.col {
  margin: 0.3rem;
}
</style>
