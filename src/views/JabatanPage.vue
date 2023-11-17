<template>
    <NavbarDashboard/>
    <div class="container-jabatan">
        <SidebarMenu/>
        <div class="container-content">
            <h2>Daftar Jabatan / UPT</h2>
            <table class="table table-bordered">
                <thead>
                    <tr>
                        <th>ID Fungsional</th>
                        <th>Nama Jabatan</th>
                        <!-- Tambah kolom sesuai kebutuhan -->
                    </tr>
                </thead>
                <tbody>
                    <!-- Gunakan v-for untuk menampilkan data jabatan -->
                    <tr v-for="(data, index) in daftarJabatan" :key="index">
                        <td>{{ data.jabatan }}</td>
                        <td>{{ data.jabatan }}</td>
                    </tr>
                </tbody>
            </table>
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
            daftarJabatan: [],
        };
    },
    mounted() {
        this.loadJabatan();
    },
    methods: {
        async loadJabatan() {
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
                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/fungsional`, config);

                // Menyimpan data ke dalam state
                this.daftarjabatan = response.data.data.fungsional;
            } catch (error) {
                console.error('Error fetching jabatan:', error);
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
