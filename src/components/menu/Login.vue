<template>
  <div>
    <el-button v-if="!isAuthenticated" class="button-entrar" @click="show()">Entrar</el-button>
    <div v-if="isAuthenticated" class="login-container">
      <el-popover placement="bottom" width="160" trigger="click" v-model="visible">
        <p>Tem certeza que deseja sair?</p>
        <div class="popover-options">
          <el-button size="mini" type="text" @click="visible = false">cancelar</el-button>
          <el-button type="primary" v-if="isAuthenticated" @click="logout(); visible = false">sair</el-button>
        </div>
        <img :src="getUser.photo" class="img" @error="replacePhotoToDefault" slot="reference">
      </el-popover>
      <span>{{ getUser.firstName }}</span>
    </div>
    <modal name="login-modal" adaptive>
      <div class="social-modal">
        <div class="header">Identifique-se</div>
        <div class="modal-text">Ao entrar no LEG.GO, suas preferências de temas ficarão salvas para que você possa ver notificações específicas sobre os temas escolhidos. Não guardaremos nenhuma informação sensível, apenas dados públicos (nome, e-mail e foto).</div>
        <div class="social-buttons">
          <button
            v-if="!isAuthenticated"
            @click="login({ provider:'google' }); hide()"
            class="btn googleBtn"
          >Entrar com Google</button>
          <button
            v-if="!isAuthenticated"
            @click="login({ provider:'facebook' }); hide()"
            class="btn facebookBtn"
          >Entrar com Facebook</button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
  name: 'Login',
  data () {
    return {
      visible: false
    }
  },
  methods: {
    ...mapActions(['login', 'logout']),
    replacePhotoToDefault (e) {
      e.target.src = require('@/assets/default-avatar-parlamentar.png')
    },
    show () {
      this.$modal.show('login-modal')
    },
    hide () {
      this.$modal.hide('login-modal')
    }
  },
  computed: {
    ...mapGetters(['isAuthenticated', 'getUser'])
  }
}
</script>

<style lang="scss" scoped>
.img {
  border-radius: 50%;
  width: 35px;
  margin-right: 0.5rem;
  cursor: pointer;
}

.login-container {
  display: flex;
  align-items: center;
  margin: 0.5rem 1rem;
}

.popover-options {
  text-align: right;
  margin: 0;
}

.button-entrar {
  margin: 1rem;
}

.social-modal {
  margin: 2rem;
}

.social-buttons {
  text-align: center;
  display: grid;
  grid-gap: 10px 0px;
  flex-direction: column;
}

.header {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.modal-text {
  margin-bottom: 1rem;
}

.btn {
      border-radius: 2px;
    font-size: 16px;
    border: 1px solid #DEDFE0;
    padding: 1rem;
    box-shadow: 0 2px 2px 0 rgba(41,48,59,0.24), 0 0 2px 0 rgba(41,48,59,0.12);
    cursor: pointer;
}

.facebookBtn {
      background-color: #1A538A;
      color: #FFF;
}

.btn:hover{
  opacity:0.8;
}

.googleBtn {
  color: #29303B;
    background-color: #FFF;
    border: 1px solid #DEDFE0;
}

</style>
