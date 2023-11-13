<template>
    <NavbarDashboard/>
    <div class="container-jabatan">
        <SidebarMenu/>
        <div class="container-content">
            <h2>Daftar Pendidikan Formal</h2>
            <form @submit.prevent="loadPendidikanFormal" class="needs-validation" novalidate>
            <div class="mb-3">
                <label for="inputId" class="form-label">Masukkan ID:</label>
                <input type="text" class="form-control" v-model="search" required>
                <div class="invalid-feedback">ID harus diisi.</div>
            </div>

            <button type="submit" class="btn btn-primary">Cari</button>
            </form>
            <table>
                <thead>
                <tr>
                    <th>ID Fungsional</th>
                    <th>Pendidikan</th>
                    <!-- Tambah kolom sesuai kebutuhan -->
                </tr>
                </thead>
                <tbody>
                <!-- Gunakan v-for untuk menampilkan data PendidikanFormal -->
                <tr v-for="(data, index) in daftarPendidikan" :key="index">
                    <td>{{ data.id_fungsional }}</td>
                    <td>{{ data.pendidikan }}</td>
                    </tr>
                </tbody>
            </table>
        
            <!-- Tombol "Add" di bagian bawah kiri tabel -->
            <router-link to="/tambahpendidikanformal" class="add-button">Add</router-link>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavbarDashboard from '@/components/NavbarDashboard.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';

export default {
    components:{
		NavbarDashboard,
		SidebarMenu,
	},
    data() {
        return {
            daftarPendidikan: [],
            search:''
        };
    },
    mounted() {
        this.loadPendidikanFormal();
    },
    methods: {
        async loadPendidikanFormal() {
            try {
                console.log(this.search)
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

                // Melakukan permintaan API dengan token
                const response = await axios.get(`http://localhost:5000/master/pendidikan/fungsional/${this.search}`, config);
                // Menyimpan data ke dalam state
                this.daftarPendidikan = response.data.data.pendidikan;
                console.log(response.data.data.pendidikan)
            } catch (error) {
                console.error('Error fetching PendidikanFormal:', error);
            }
        },
    },
};
</script>

<style scoped>
/* Gaya CSS khusus untuk komponen ini */
.add-button {
position: absolute;
bottom: 10px;
left: 10px;
padding: 10px;
}

.container-jabatan{
    display: flex;
}

.container-content{
    flex: auto;
    padding: 20px;
}
</style>
  