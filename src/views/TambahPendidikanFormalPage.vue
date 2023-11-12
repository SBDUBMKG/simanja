<template>
  <div class="container mt-5">
    <h2 class="mb-4">Tambah Pendidikan Formal</h2>
    <form @submit.prevent="submitForm" class="needs-validation" novalidate>
      <div class="mb-3">
        <label for="idfungsional" class="form-label">ID Fungsional:</label>
        <input type="text" class="form-control" v-model="idfungsional" required>
        <div class="invalid-feedback">ID Fungsional harus diisi.</div>
      </div>

      <div class="mb-3">
        <label for="pendidikan" class="form-label">Pendidikan:</label>
        <input type="text" class="form-control" v-model="pendidikan" required>
        <div class="invalid-feedback">Pendidikan harus diisi.</div>
      </div>

      <!-- Tambahkan input lainnya sesuai kebutuhan -->

      <button type="submit" class="btn btn-primary">Simpan</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      idfungsional: '',
      pendidikan: '',
      // Tambahkan variabel lainnya sesuai kebutuhan
    };
  },
  methods: {
    async submitForm() {
      try {
        // Mendapatkan token dari local storage
        const token = localStorage.getItem('token');

        if (!token) {
          console.error('Token not available');
          // Handle sesuai dengan kebutuhan, seperti redirect ke halaman login
          return;
        }

        // Menambahkan token dalam header Authorization
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // Data yang akan dikirimkan ke server
        const dataToSubmit = {
          idfungsional: this.idfungsional,
          pendidikan: this.pendidikan,
          // Tambahkan data lainnya sesuai kebutuhan
        };

        // Melakukan permintaan ke server dengan menggunakan Axios
        const response = await axios.post('http://localhost:5000/master/pendidikan', dataToSubmit, config);

        // Lakukan sesuatu dengan respons dari server jika diperlukan
        console.log('Server response:', response.data);

        // Contoh navigasi ke halaman lain setelah berhasil menyimpan data
        // this.$router.push('/dashboard'); // Anda harus memiliki Vue Router untuk ini
      } catch (error) {
        console.error('Error submitting form:', error);
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
