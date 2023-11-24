<template>
    <div>
        <div class="container-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Master Satker / UPT</h2>
                    <h6 class="subtitle-content">List Satker / UPT</h6>
                    <DataTable v-if="loaded" class="table table-bordered table-sm table-hover table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title">JABATAN</th>
                                <!-- <th class="column-title">DETAIL</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in daftarJabatan" :key="index">
                                <td>{{ data.fungsional }}</td>
                                <!-- <td>
                                    <router-link :to="{ name: 'IkhtisarJabatanDetail', params: { fungsionalid: jabatan.id_fungsional } }">
                                        Detail
                                    </router-link>
                                </td> -->
                            </tr>
                        </tbody>
                    </DataTable>
                    <!-- <h2>Daftar Jabatan / UPT</h2>
                    <table class="table table-bordered">
                        <thead>
                            <tr>
                                <th>ID Fungsional</th>
                                <th>Nama Jabatan</th>
                                </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in daftarJabatan" :key="index">
                                <td>{{ data.id_fungsional }}</td>
                                <td>{{ data.fungsional }}</td>
                            </tr>
                        </tbody>
                    </table> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
import NavbarDashboard from '@/components/NavbarDashboard.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';

DataTable.use(DataTablesCore)

export default {
    components:{
		NavbarDashboard,
		SidebarMenu,
        DataTable
	},
    data() {
        return {
            daftarJabatan: null,
            loaded: false
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
                this.daftarJabatan = response.data.data.fungsional;
                this.loaded = true;
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
