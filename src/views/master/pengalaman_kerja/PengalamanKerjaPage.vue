<template>
    <div>
        <NavbarDashboard/>
        <div class="container-master-pengalaman-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <h2 id="title-content">Master Pengalaman Kerja</h2>
                <h6 id="subtitle-content">List Jabatan Fungsional</h6>
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
                                <router-link :to="{ name: 'PengalamanKerjaDetail', params: { fungsionalid: jabatan.id_fungsional } }">
                                    Detail
                                </router-link>
                            </td>
                        </tr>
                    </tbody>
                </DataTable>
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

.container-master-pengalaman-kerja {
    display: flex;
}

.container-content{
    flex: auto;
    padding: 20px;
}

#title-content {
    font-weight: bold;
    color: #0077b6;
    margin-top: 30px;
    margin-bottom: 30px;
}

#subtitle-content {
    color: #0096c7;
    padding-bottom: 5px;
    border-bottom-style: solid;
    border-bottom-width: 1.5px;
    border-bottom-color: #0096c7;
}

.table .table-head {
    background-color: #0077b6;
    color: #FAFAFA;
    font-size: 12px;
    text-align: center;
}

.table td {
    font-size: 14px;
}
</style>
  