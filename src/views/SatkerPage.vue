<template>
    <NavbarDashboard/>
    <div class="container-satker">
        <SidebarMenu/>
        <div class="container-content">
            <h2>Daftar Satker / UPT</h2>
            <table class="table table-bordered">
            <thead>
                <tr>
                <th>Nama Satker</th>
                <!-- Tambah kolom sesuai kebutuhan -->
                </tr>
            </thead>
            <tbody>
                <!-- Gunakan v-for untuk menampilkan data Satker -->
                <tr v-for="(data, index) in daftarSatker" :key="index">
                <td>{{ data.satker }}</td>
                </tr>
            </tbody>
            </table>

            <!-- Tombol "Add" di bagian bawah kiri tabel -->
            <button @click="tambahSatker" class="btn btn-primary">Tambah Satker</button>
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
            daftarSatker: [],
        };
    },
    mounted() {
        this.loadSatker();
    },
    methods: {
        async loadSatker() {
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

                // Melakukan permintaan API dengan token
                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/satker`, config);

                // Menyimpan data ke dalam state
                this.daftarSatker = response.data.data.satker;
            } catch (error) {
                console.error('Error fetching Satker:', error);
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

.container-satker{
    display: flex;
}

.container-content{
    flex: auto;
    padding: 20px;
}
</style>
  