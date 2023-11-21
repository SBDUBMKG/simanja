<template>
    <div>
        <div class="container-master-keterampilan-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Master Keterampilan Kerja</h2>
                    <h6 class="subtitle-content">List Jabatan Fungsional</h6>
                    <DataTable v-if="loaded" class="table table-bordered table-sm table-hover table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title">JABATAN FUNGSIONAL</th>
                                <th class="column-title">DETAIL</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="jabatan in daftarjabatan" :key="jabatan.id_fungsional">
                                <td>{{ jabatan.fungsional }}</td>
                                <td>
                                    <router-link :to="{ name: 'KeterampilanKerjaDetail', params: { fungsionalid: jabatan.id_fungsional } }">
                                        Detail
                                    </router-link>
                                </td>
                            </tr>
                        </tbody>
                    </DataTable>
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
    components: {
        NavbarDashboard,
        SidebarMenu,
        DataTable
    },
    data() {
        return {
            daftarjabatan: null,
            loaded: false
        };
    },
    mounted () {
        this.loadJabatan()
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
                this.daftarjabatan = response.data.data.fungsional
                this.loaded = true
            } catch (error) {
                console.error('Error fetching jabatan:', error);
            }
        },
    },
};
</script>

<style scoped>
/* Gaya CSS khusus untuk komponen ini */
@import 'datatables.net-bs5';

.container-master-keterampilan-kerja {
    display: flex;
}
</style>
  