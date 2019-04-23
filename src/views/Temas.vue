<template>
  <div>
    <div class="container-tema">
      <h4 class="text-center">Quais temas você tem mais interesse?</h4>
      <div class="gutters-sm">
        <div v-for="(tema,i) in this.temas" :key="i" class="col">
          <button class="tema-btn">
            <span class="icon-".concat(tema)></span>
          <p>{{tema}}</p>
          </button>
        </div>
      </div>
    </div>
        <div class="text-center">
      <button
        class="btn btn-primary"
      >
        Dar minha opinião
      </button>
    </div>
  </div>
</template>
<script>

export default {
  name: "Tema",
  computed: {
    temas() {
      return ["meio-ambiente", "direitos-humanos", "educacao", "agenda-nacional", "transparencia"];
    }
  }
}
</script>
<style lang="scss" scoped>

@font-face {
  font-family: 'icomoon';
  src:  url('../assets/fonts/icomoon.eot');
  src:  url('../assets/fonts/icomoon.eot#iefix') format('embedded-opentype'),
    url('../assets/fonts/icomoon.ttf') format('truetype'),
    url('../assets/fonts/icomoon.woff') format('woff'),
    url('../assets/fonts/icomoon.svg') format('svg');
  font-weight: normal;
  font-style: normal;
}

[class^="icon-"], [class*=" icon-"] {
  /* use !important to prevent issues with browser extensions that change fonts */
  font-family: 'icomoon' !important;
  speak: none;
  font-style: normal;
  font-weight: normal;
  font-variant: normal;
  text-transform: none;
  line-height: 1;

  /* Better Font Rendering =========== */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.text-center{text-align:center!important}

.container-tema {
  align-items: center;
  font-family: 'icomoon';
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
  padding-bottom: 2rem;
}

.col {
  margin: 0.3rem;
}

.btn {
  text-transform: lowercase;
  border-radius: 20px;
}
.btn-sm {
  border-radius: 0;
}
.btn-primary {
  color: #fff;
  background-color: #a963b3;
  border-color: #a963b3;
}
.btn-primary:hover {
  color: #fff;
  background-color: #a963b3;
  border-color: #a963b3;
}
.btn-primary:not(:disabled):not(.disabled).active:focus,
.btn-primary:not(:disabled):not(.disabled):active:focus,
.show > .btn-primary.dropdown-toggle:focus,
.btn-primary:not(:disabled):not(.disabled).active,
.btn-primary:not(:disabled):not(.disabled):active,
.show > .btn-primary.dropdown-toggle {
  color: #fff;
  background-color: #a963b3;
  border-color: #a963b3;
}
.btn-primary.focus,
.btn-primary:focus {
  box-shadow: 0 0 0 0.2rem rgba(91, 39, 98, 0.5);
}
</style>
