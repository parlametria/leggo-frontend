<template>
  <div>
    <router-link :to="{ name: 'proposicoes' }">
      <img
        class="logo"
        src="@/assets/PNGleggo.png"
        @click="closeMenu"
      >
    </router-link>
    <div>
      <input
        id="menu-hamburguer"
        type="checkbox"
        v-model="openMenu">
      <label for="menu-hamburguer" >
        <div class="menu" >
          <span class="hamburguer"/>
        </div>
      </label>
    </div>
    <div
      class="menubar"
      :class="{ menuexpanded: openMenu }">
      <router-link
        v-if="getInteresse === 'leggo'"
        :to="{ name: 'proposicoes' }"><span @click="closeMenu">Proposições</span></router-link>
      <router-link
        v-if="getInteresse !== 'leggo'"
        :to="{ name: 'interesse', params: { slug_interesse: getInteresse } }"><span @click="closeMenu">Proposições</span></router-link>
      <!--router-link
        :to="{ name: 'semanarios' }"><span @click="closeMenu">Semanário</span></router-link-->
      <router-link
        :to="{ name: 'ajuda' }"><span @click="closeMenu">Ajuda</span></router-link>
      <a
        href="https://parlametria.github.io/leggo-frontend/"
        target="_blank"><span>Relatórios</span></a>
      <!-- <router-link
        :to="{ name: 'relatorios' }"><span @click="closeMenu">Relatórios</span></router-link> -->
      <router-link
        :to="{ name: 'sobre' }"><span @click="closeMenu">Sobre</span></router-link>
    </div>
  </div>

</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'NavigationButtons',
  data () {
    return {
      openMenu: false
    }
  },
  methods: {
    checkPage (page) {
      return this.$route.name === page
    },
    closeMenu () {
      this.openMenu = false
    }
  },
  computed: {
    ...mapGetters(['getInteresse'])
  }
}
</script>

<style lang="scss" scoped>
@import "@/base.scss";
.menubar {
  display: flex;
  flex-wrap: wrap;
    * {
      color: gray;
      font-family: sans-serif;
      padding-right: 1rem;
      text-transform: uppercase;
    }
    &:last-child {
        margin-right: 0;
    }
}

.router-link-exact-active {
  font-weight: bold;
}

input {
  display: none;
}

.logo {
  width: 100%;
  height: auto;
  max-width: 400px;
  margin-bottom: -20px;
  margin-left: -40px;
  background-color: rgba(0, 0, 0, 0);
  @media screen and (max-width: 600px) {
    max-width: 300px;
    margin-top: -15px;
    margin-bottom: -15px;
    margin-left: -20px;
  }
}

@media screen and (max-width: 450px) {
  .menubar {
    background: white;
    flex-wrap: nowrap;
    border: $--color-primary-dark solid 0px;
    flex-direction: column;
    z-index: 1;
    position: absolute;
    right: 20px;
    top: 70px;
    width: 170px;
    height: 0px;
    overflow: hidden;
    -webkit-transition: height 1s, font-size 1s, border 1s; /* For Safari 3.1 to 6.0 */
    transition: height 1s, font-size 1s, border 1s;
    a {
      padding: 0px;
      span{
        color: $--color-primary-dark;
        padding: 10px;
        font-size: 18px;
        display: block;
        white-space: nowrap;
      }
    }
    a.router-link-exact-active > span{
      background-color:  $--color-primary-dark;
      color: white;
    }
  }

  .menu {
    background: #fff;
    border-radius: 50%;
    width: 60px;
    height: 30px;
    position: absolute;
    top: 48px;
    right: 0px;
  }

  .hamburguer {
    position: absolute;
    display: block;
    background: $--color-primary-dark;
    width: 30px;
    height: 2px;
    transition: .5s ease-in-out;
  }

  .hamburguer:before,
  .hamburguer:after {
    background: $--color-primary-dark;
    content: '';
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    transition: .5s ease-in-out;
  }
  .menuexpanded {
    display: block;
    width: 170px;
    height: 160px;
    border: $--color-primary-dark solid 1px;
  }

  .hamburguer:before {
    top: -10px;
  }

  .hamburguer:after {
    bottom: -10px;
  }

  input:checked ~ label .hamburguer {
    transform: rotate(45deg);
  }

  input:checked ~ label .hamburguer:before {
    transform: rotate(90deg);
    top: 0;
  }

  input:checked ~ label .hamburguer:after {
    transform: rotate(90deg);
    bottom: 0;
  }
}
</style>
