<template>
  <nav class="navbar navbar-light navbar-expand-md">
    <div class="container">
      <router-link
        :to="{ name: 'proposicoes' }"
        :class="'navbar-brand'">
        <img
          class="logo"
          src="@/assets/logo.svg"
          width="120"
          @click="closeMenu"
        >
        <span>
          • {{ getNomeInteresse }}
        </span>
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
        @click="toogleMenu">
        <span class="navbar-toggler-icon"/>
      </button>
      <div
        class="collapse navbar-collapse"
        :class="{ show: openMenu }">
        <ul class="navbar-nav ml-auto">
          <li
            class="nav-item"
            v-if="getInteresse === 'leggo'">
            <router-link
              :to="{ name: 'proposicoes' }"><span @click="closeMenu">Proposições</span></router-link>
          </li>
          <li
            class="nav-item"
            v-if="getInteresse !== 'leggo'">
            <router-link
              :to="{ name: 'interesse', params: { slug_interesse: getInteresse } }"><span @click="closeMenu">Proposições</span></router-link>
          </li>
          <li class="nav-item">
            <a
              :href="'https://leggo-painel.parlametria.org.br/' + getInteresse"><span>Atores-chave</span></a>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'ajuda' }"><span @click="closeMenu">Ajuda</span></router-link>
          </li>
          <li
            class="nav-item"
            v-if="getInteresse !== 'congresso-remoto'">
            <a
              href="https://parlametria.github.io/leggo-frontend/"
              target="_blank"><span>Relatórios</span></a>
          </li>
          <li
            class="nav-item"
            v-if="getInteresse === 'congresso-remoto'">
            <router-link
              v-if="getInteresse === 'congresso-remoto'"
              :to="{ name: 'analises' }"><span>Análises</span></router-link>
          </li>
          <li class="nav-item">
            <router-link
              :to="{ name: 'sobre' }"><span @click="closeMenu">Sobre</span></router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
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
    },
    toogleMenu () {
      this.openMenu = !this.openMenu
    }
  },
  computed: {
    ...mapGetters(['getInteresse', 'getNomeInteresse'])
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

.navbar {
  border-bottom: 2px solid #20201e;
  position: relative;
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
  padding: 1rem 1rem;
}

.navbar .container,
.navbar .container-fluid, .navbar .container-sm, .navbar .container-md, .navbar .container-lg, .navbar .container-xl {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
  -ms-flex-align: center;
  align-items: center;
  -ms-flex-pack: justify;
  justify-content: space-between;
}

.navbar-brand {
  display: inline-block;
  padding-top: 0.3125rem;
  padding-bottom: 0.3125rem;
  margin-right: 1rem;
  font-size: 1.25rem;
  line-height: inherit;
  white-space: nowrap;
}

.navbar-brand:hover, .navbar-brand:focus {
  text-decoration: none;
}

.navbar-nav {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  list-style: none;
}

.navbar-nav .nav-item > a {
  padding-right: 0;
  padding-left: 0;
  color: #20201e;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.navbar-nav .dropdown-menu {
  position: static;
  float: none;
}

@media (max-width: 767.98px) {
  .navbar-expand-md > .container,
  .navbar-expand-md > .container-fluid, .navbar-expand-md > .container-sm, .navbar-expand-md > .container-md, .navbar-expand-md > .container-lg, .navbar-expand-md > .container-xl {
    padding-right: 0;
    padding-left: 0;
  }
}

@media (min-width: 768px) {
  .navbar-expand-md {
    -ms-flex-flow: row nowrap;
    flex-flow: row nowrap;
    -ms-flex-pack: start;
    justify-content: flex-start;
  }
  .navbar-expand-md .navbar-nav {
    -ms-flex-direction: row;
    flex-direction: row;
  }
  .navbar-expand-md .navbar-nav .dropdown-menu {
    position: absolute;
  }
  .navbar-expand-md .navbar-nav .nav-item > a {
    padding-right: 0.5rem;
    padding-left: 0.5rem;
  }
  .navbar-expand-md > .container,
  .navbar-expand-md > .container-fluid, .navbar-expand-md > .container-sm, .navbar-expand-md > .container-md, .navbar-expand-md > .container-lg, .navbar-expand-md > .container-xl {
    -ms-flex-wrap: nowrap;
    flex-wrap: nowrap;
  }
  .navbar-expand-md .navbar-collapse {
    display: -ms-flexbox !important;
    display: flex !important;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
  }
  .navbar-expand-md .navbar-toggler {
    display: none;
  }
}

.navbar-nav {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-direction: column;
  flex-direction: column;
  padding-left: 0;
  margin-bottom: 0;
  margin-top: 0;
  list-style: none;
}

.navbar-nav .nav-item > a {
  padding-right: 0;
  padding-left: 0;
}

.navbar-nav .dropdown-menu {
  position: static;
  float: none;
}

.nav-item > a {
  display: block;
  padding: 0.5rem 1rem;
}

.nav-item > a:hover, .nav-item > a:focus {
  text-decoration: none;
}

.nav-item > a.disabled {
  color: #6c757d;
  pointer-events: none;
  cursor: default;
}

.mr-auto {
    margin-right: auto;
}

.ml-auto {
    margin-left: auto;
}

.collapse:not(.show) {
  display: none;
}

.navbar-collapse {
  -ms-flex-preferred-size: 100%;
  flex-basis: 100%;
  -ms-flex-positive: 1;
  flex-grow: 1;
  -ms-flex-align: center;
  align-items: center;
}

.navbar-expand .navbar-collapse {
  display: -ms-flexbox !important;
  display: flex !important;
  -ms-flex-preferred-size: auto;
  flex-basis: auto;
}

.navbar-toggler {
  padding: 0.25rem 0.75rem;
  font-size: 1.25rem;
  line-height: 1;
  background-color: transparent;
  border: 1px solid transparent;
  border-radius: 0.25rem;
}

.navbar-toggler:hover, .navbar-toggler:focus {
  text-decoration: none;
}

.navbar-toggler-icon {
  display: inline-block;
  width: 1.5em;
  height: 1.5em;
  vertical-align: middle;
  content: "";
  background: no-repeat center center;
  background-size: 100% 100%;
}

.navbar-light .navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba%280, 0, 0, 0.5%29' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

.navbar-brand {
  display: flex;
  padding-top: .5rem;
  padding-bottom: .5rem;
  margin-right: 1rem;
  font-size: 1.2rem;
  line-height: inherit;
  white-space: nowrap;
  color: #20201e;
}

.navbar-brand > span {
  padding-left: 0.3rem;
}

.navbar-brand:hover, .navbar-brand:focus {
  text-decoration: none;
}
</style>
