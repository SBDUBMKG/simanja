<!-- UserLogin.vue -->

<template>
  <div class="container mt-5">
    <div class="login-card d-flex justify-content-center align-items-center">
      <div class="card p-4 d-flex flex-column align-items-center">
        <h2 class="h2 m-1 text-dark">Simanja</h2>
        <h3 class="h3 mt-1 mb-2 text-secondary">Sign In</h3>
        <!-- <p class="p mt-1">Selamat datang!</p> -->
        <form @submit.prevent="login" class="needs-validation" novalidate>
          <div class="mb-3">
            <input type="text" class="form-control" placeholder="Masukkan Username" v-model="username" required>
            <div class="invalid-feedback">Username harus diisi.</div>
          </div>

          <div class="mb-3">
            <input type="password" class="form-control" placeholder="Masukkan Password" v-model="password" required>
            <div class="invalid-feedback">Password harus diisi.</div>
          </div>

          <button type="submit" class="btn btn-primary align-self-end">Login</button>
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
.card {
  max-width: 400px;
  text-align: right;
  background-color: white; /* Warna latar belakang bagian card */
  margin-top: 150px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Contoh shadow untuk card */
}


.h3{
  font-size: 20px;
}

/* .p{
  font-size: 18px;
} */

input::placeholder{
  font-style: italic;
}
</style>
