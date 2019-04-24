<template>
  <div>
    <div class="container-tema">
      <h2 class="text-center">Quais temas você tem mais interesse?</h2>
      <div class="gutters-sm">
        <div v-for="(tema,i) in this.temas" :key="i" class="col">
          <button @click="mudaSelecao(i)" :class="getTema(i)">
            <span :class="tema.icon"></span>
            <p class="btn-tema-text">{{tema.texto}}</p>
          </button>
        </div>
      </div>
    </div>
    <div class="text-center btn-form">
      <button class="btn btn-primary">Ver as proposições</button>
    </div>
  </div>
</template>
<script>
export default {
  name: "Tema",
  data() {
    return {
      temas: [
        {
          texto: "Meio Ambiente",
          icon: "icon-meio-ambiente",
          selecionado: false
        },
        {
          texto: "Direitos Humanos",
          icon: "icon-direitos-humanos",
          selecionado: false
        },
        {
          texto: "Educação",
          icon: "icon-educacao",
          selecionado: false
        },
        {
          texto: "Agenda Nacional",
          icon: "icon-agenda-nacional",
          selecionado: false
        },
        {
          texto: "Integridade e Transparência",
          icon: "icon-transparencia",
          selecionado: false
        }
      ]
    };
  },
  methods: {
    mudaSelecao(index) {
      this.temas[index].selecionado = !this.temas[index].selecionado;
    },
    getTema(index) {
      return this.temas[index].selecionado
        ? "tema-btn tema-btn-clicado"
        : "tema-btn";
    }
  }
};
</script>
<style lang="scss" scoped>
@font-face {
  font-family: "icomoon";
  src: url("../assets/fonts/icomoon.eot");
  src: url("../assets/fonts/icomoon.eot#iefix") format("embedded-opentype"),
    url("../assets/fonts/icomoon.ttf") format("truetype"),
    url("../assets/fonts/icomoon.woff") format("woff"),
    url("../assets/fonts/icomoon.svg") format("svg");
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"],
[class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: "icomoon" !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  font-size: 3rem;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.btn-tema-text {
  text-transform: uppercase;
  font-size: 0.65rem;
  margin: 0;
  padding: 0;
}

.btn-form {
  height: 30%;
}

.text-center {
  text-align: center !important;
}

.icon-meio-ambiente:before {
  content: "\e900";
}
.icon-agenda-nacional:before {
  content: "\e901";
}
.icon-educacao:before {
  content: "\e904";
}
.icon-direitos-humanos:before {
  content: "\e907";
}
.icon-transparencia:before {
  content: "\e908";
}

.tema-btn {
  padding: 1rem;
  background-color: white;
  width: 100%;
  height: 100%;
  margin: 1rem;
  font-size: 1.5rem;
  border-color: black;
  cursor: pointer;
}

.tema-btn:hover {
  background-color: #dc6060;
  color: white;
}

.gutters-sm {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding-bottom: 30px;
}

.col {
  margin: 5px;
  width: 45%;
}

.btn {
  border-radius: 3px;
}

.btn-primary {
  cursor: pointer;
  color: #fff;
  background-color: #dc6060;
  border-color: #dc6060;
  padding: 8px;
  font-size: 1rem;
  height: 100%;
}
.btn-primary:hover {
  color: #fff;
  background-color: #e70c0c;
  border-color: #e70c0c;
}

.tema-btn-clicado {
  color: #fff;
  background-color: #dc6060;
  border-color: #dc6060;
  box-shadow: 0 0 0 0.2rem rgba(91, 39, 98, 0.5);
}
</style>
