<template>
  <div
    class="card"
    v-if="parlamentarValido()">
    <header class="header">
      <img
        :src="parlamentar.foto"
        alt="Foto do parlamentar"
        class="foto"
        @error="replacePhotoToDefault">
    </header>
    <div class="content">
      <div class="info">
        <span
          v-if="campoValido(parlamentar.cargo)"
          class="cargo">{{ parlamentar.cargo }}</span>
        <span
          v-else
          class="cargo">TITULAR</span>
      </div>
      <span>
        <a
          v-if="parlamentar.id_parlamentar && parlamentar.casa === 'camara'"
          :href="linkParlamentar(parlamentar)"
          target="_blank"
          class="link"
        >
          <b>{{ parlamentar.nome }}</b>
        </a>
        <b v-else>
          {{ parlamentar.nome }}
        </b>
      </span>
      <span
        class="partido"
        v-if="campoValido(parlamentar.partido)">{{ parlamentar.partido }} - {{ parlamentar.uf }}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: 'ParlamentarCard',
  props: {
    parlamentar: {
      type: Object,
      default: undefined
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
    },
    linkParlamentar (parlamentar) {
      let cargo = 0
      if (parlamentar.casa === 'camara') {
        cargo = 1
      } else if (parlamentar.casa === 'senado') {
        cargo = 2
      }
      return `${process.env.VUE_APP_API_VOZ_ATIVA}/parlamentar/${cargo}${parlamentar.id_parlamentar}`
    }
  }
}
</script>
<style lang="scss" scoped>
.card {
  box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
  transition: 0.3s;
  display: flex;
  flex-direction: row;
  align-content: stretch;
}
.card:hover {
  box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
}
.content {
  padding: 20px 20px;
  display: flex;
  flex-flow: column nowrap;
  align-items: stretch;
  justify-content: space-between;
}
.partido {
  font-size: 10pt;
  color: gray;
  font-weight: 900;
}
.info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  color: gray;
}
.cargo {
  font-size: 10pt;
}
.header {
  min-width: 0;
  margin: 5px;
}
.foto {
  width: 100px;
  max-width: 100%;
  max-height: 450px;
}
.icon {
  width: 20px;
  height: 20px;
}
.link {
  text-decoration: underline;
  color: #AA67AE;
}
.link:hover {
  color: #22BE86;
}
</style>
