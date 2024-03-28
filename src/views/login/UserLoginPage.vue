<!-- UserLogin.vue -->

<template>
  <div class="h-100">
    <div>
      <div class="ant-spin-nested-loading">
        <div class="ant-spin-container">
          <div class="auth-wrapper auth-v2">
            <div class="row auth-inner m-0">
              <a href="#" target="_self" class="brand-logo">
                  <b-img src="@/assets/logo-BMKG.png"></b-img>
              </a>
              <div class="d-none d-lg-flex align-items-center p-5 col-lg-9">
                <div class="w-100 d-lg-flex align-items-center justify-content-center">
                  <img src="@/assets/login-bg2.jpg" alt="Login" class="img-fluid">
                </div>
              </div>
              <div class="d-flex align-items-center auth-bg px-2 p-lg-3 col-lg-3">
                <div class="px-xl-2 mx-auto col-sm-8 col-md-6 col-lg-12">
                  <h2 class="card-title mb-4 font-weight-bolder text-center text-dark">
                    Login
                  </h2>
                  <span>
                    <div class="login-card d-flex justify-content-center align-items-center">
                      <div class="p-4 d-flex flex-column align-items-center">
                        <form @submit.prevent="login" class="needs-validation" novalidate>
                          <div class="mb-3">
                            <input type="text" class="form-control" placeholder="Masukkan Username" v-model="username" required>
                            <div class="invalid-feedback">Username harus diisi.</div>
                          </div>

                          <div class="mb-3">
                            <input type="password" class="form-control" placeholder="Masukkan Password" v-model="password" required>
                            <div class="invalid-feedback">Password harus diisi.</div>
                          </div>
                          <Checkbox class="mb-3" v-model="response"></Checkbox>
                          <button type="submit" class="btn btn-primary btn-block align-self-end">Sign In</button>
                        </form>
                      </div>
                    </div>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { Checkbox } from 'vue-recaptcha';

export default {
  components: {
    Checkbox
  },
  data() {
    return {
      token: localStorage.getItem('token'),
      username: '',
      password: '',
      response: null
    };
  },
  mounted () {
    if (this.token !== null) {
      this.$router.push('/dashboard');
    }
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/authentications`, {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('satker', response.data.data.satker);
        localStorage.setItem('idsatker', response.data.data.idsatker);
        localStorage.setItem('iduser', response.data.data.iduser);
        localStorage.setItem('role', response.data.data.role);

        if (this.response !== null) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.accessToken}`
          this.$router.push('/dashboard')
        } else {
          this.$swal.fire({
              icon: 'warning',
              title: 'Warning',
              text: 'Captcha Wajib Diisi'
          })
        }
        
      } catch (error) {
          this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data.message
          })
      }
    },
  },
};
</script>

<style scoped>

html{
  letter-spacing: .01rem;
}

body{
  padding: 0;
  margin: 0;
  text-align: left;
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.45;
  color: #6e6b7b;
}

div{
  display: block;
}

.h-100 {
  height: 100%!important;
}

.ant-spin-nested-loading {
  position: relative;
}

.ant-spin-container {
  position: relative;
}

.auth-wrapper.auth-v2 {
  align-items: flex-start;
}

.auth-wrapper.auth-v2 .auth-inner {
  height: 100vh;
  overflow-y: auto;
  height: calc(var(--vh, 1vh)*100);
}

.auth-wrapper .auth-inner {
  width: 100%;
  position: relative;
}

.m-0 {
  margin: 0!important;
}

.row {
  display: flex;
  flex-wrap: wrap;
}

.auth-wrapper {
  display: flex;
  flex-basis: 100%;
  min-height: 100vh;
  min-height: calc(var(--vh, 1vh)*100);
  width: 100%;
}

.auth-wrapper.auth-v2 .brand-logo {
  left: 2rem;
  margin: 0;
  position: absolute;
  top: 2rem;
  z-index: 1;
}

.auth-wrapper .brand-logo {
  display: flex;
  justify-content: center;
}

.auth-wrapper .auth-bg {
  background-color: #fff;
}



.mr-auto, .mx-auto {
  margin-right: auto!important;
  margin-left: auto!important;
}

.p-5 {
  padding: 0!important;
}

a {
  background-color: transparent;
  cursor: pointer;
  color: #007bff;
  text-decoration: none;
}

.img-fluid{
  max-width: 100%;
  max-height: 100%;
}

.logo img {
  width: 50px;
  height: auto;
  margin-right: 10px;
}

.card {
  max-width: 400px;
  text-align: right;
}

.btn-primary {
    border-color: #28c76f!important;
    background-color: #28c76f!important;
}

.h3{
  font-size: 20px;
}

input::placeholder{
  font-style: italic;
  font-size: 12px;
}

.invalid-feedback{
  font-size: 12px;
}
</style>
