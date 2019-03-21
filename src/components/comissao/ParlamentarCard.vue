<template>
    <div class="card" v-if="parlamentarValido()">
    <img :src="parlamentar.foto" alt="Foto do parlamentar" style="width:100%" @error="replacePhotoToDefault">
    <div class="container">
      <header>
        <span><b>{{ parlamentar.nome }}</b></span>
        <span class="partido" v-if="campoValido(parlamentar.partido)">{{ parlamentar.partido }} - {{ parlamentar.uf }}</span>
      </header>
      <div class="info">
        <span v-if="campoValido(parlamentar.cargo)" class="cargo">{{ parlamentar.cargo }}</span>
        <span v-else class="cargo">Membro</span>
        <span class="situacao"><b>Situação: </b>{{ parlamentar.situacao }}</span>
      </div>
    </div>
    </div>
</template>
<script>
export default {
  name: 'ParlamentarCard',
  props: {
    parlamentar: {
      type: Object
    }
  },
  methods: {
    parlamentarValido () {
      if (this.parlamentar.nome && this.parlamentar.nome !== 'nan' && !this.parlamentar.nome.replace(/\s/g, '').length) { return false }

      return true
    },
    campoValido (campo) {
      if (campo && campo !== 'nan') { return true }
      return false
    },
    replacePhotoToDefault (e) {
      e.target.src = require('@/assets/default-avatar-parlamentar.png')
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  height: 400px;
}

.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}

.container {
  padding: 15px 16px;

  header {
    display: flex;
    flex-flow: row wrap;
    align-items: center;
    justify-content: space-between;
  }
}

.partido {
  font-size: 10pt;
  color: gray;
}

.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: gray;
  .cargo {
    font-size: 10pt;
  }
  .situacao {
    margin-top: 10px;
  }
}

img {
  max-height: 300px;
}

</style>
