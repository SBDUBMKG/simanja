<!-- UserLogin.vue -->

<template>
  <div class="container mt-5">
    <div class="d-flex justify-content-center align-items-center">
      <div>
        <h2>Login</h2>
        <form @submit.prevent="login" class="needs-validation" novalidate>
          <div class="mb-3">
            <label for="username" class="form-label">Username:</label>
            <input type="text" class="form-control" v-model="username" required>
            <div class="invalid-feedback">Username harus diisi.</div>
          </div>

          <div class="mb-3">
            <label for="password" class="form-label">Password:</label>
            <input type="password" class="form-control" v-model="password" required>
            <div class="invalid-feedback">Password harus diisi.</div>
          </div>

          <button type="submit" class="btn btn-primary">Login</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    async login() {
      try {
        const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/authentications`, {
          username: this.username,
          password: this.password,
        });

        // Simpan token ke dalam local storage
        localStorage.setItem('token', response.data.data.accessToken);
        localStorage.setItem('satker', response.data.data.satker);
        localStorage.setItem('idsatker', response.data.data.idsatker);
        localStorage.setItem('role', response.data.data.role);

        // Setel token dalam header untuk permintaan selanjutnya
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.data.accessToken}`;
        
        // Contoh navigasi ke halaman lain setelah login
        this.$router.push('/dashboard'); // Anda harus memiliki Vue Router untuk ini
      } catch (error) {
        console.error('Error saat login:', error);
        // Tampilkan pesan kesalahan kepada pengguna jika diperlukan
      }
    },
  },
};
</script>

<style scoped>
/* Gaya CSS khusus untuk komponen ini */
/* ... */
</style>
