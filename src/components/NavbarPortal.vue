<template>
  <div class="navbar-portal">
    <nav id="navbar" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" :class="{ 'transparent-navbar': transparent === true }">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo-simanja-white.svg" width="140" alt="simanja-logo">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>  
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item">
            <router-link :to="{ name: 'Home' }" class="nav-link">Beranda</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Jabatan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Unit Kerja</a>
          </li>
          <li class="nav-item">
            <router-link :to="{ name: 'ArticlesList' }" class="nav-link">Artikel</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Regulasi</a>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <button class="btn btn-primary my-2 my-sm-0" @click="toLoginPage">
            <svg style="margin-top: -3px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg> Login
          </button>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'NavbarPortalComponent',
  props: ['transparent'],
  data() {
    return {
    }
  },
  methods: {
    toLoginPage () {
      this.$router.push('/login')
    },
  },
}
</script>

<style scoped>
.transparent-navbar {
  background-color: transparent !important;
  transition: background-color 0.3s ease;
}

</style>