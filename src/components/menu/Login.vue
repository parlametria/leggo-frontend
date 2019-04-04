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
          <el-button
            v-if="!isAuthenticated"            
            @click="login({ provider:'google' }); hide()"
          >Entrar com Google</el-button>
          <el-button
            v-if="!isAuthenticated"             
            @click="login({ provider:'facebook' }); hide()"
          >Entrar com Facebook</el-button>
        </div>
      </div>
    </modal>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      visible: false
    };
  },
  methods: {
    ...mapActions(["login", "logout"]),
    replacePhotoToDefault(e) {
      e.target.src = require("@/assets/default-avatar-parlamentar.png");
    },
    show() {
      this.$modal.show("login-modal");
    },
    hide() {
      this.$modal.hide("login-modal");
    }
  },
  computed: {
    ...mapGetters(["isAuthenticated", "getUser"])
  }
};
</script>

<style lang="scss" scoped>
.img {
  border-radius: 50%;
  width: 35px;
  margin-right: 0.5rem;
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

</style>
