<template>
    <div>
        <div class="container-satker">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Master Satker / UPT</h2>
                    <h6 class="subtitle-content">List Satker / UPT</h6>
                    <DataTable v-if="loaded" class="table table-bordered table-sm table-hover table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title">SATKER UPT</th>
                                <!-- <th class="column-title">DETAIL</th> -->
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in daftarSatker" :key="index">
                                <td>{{ data.satker }}</td>
                                <!-- <td>
                                    <router-link :to="{ name: 'IkhtisarJabatanDetail', params: { fungsionalid: jabatan.id_fungsional } }">
                                        Detail
                                    </router-link>
                                </td> -->
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
    components:{
		NavbarDashboard,
		SidebarMenu,
        DataTable
	},
    data() {
        return {
            daftarSatker: null,
            loaded: false
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
                this.loaded = true;
            } catch (error) {
                console.error('Error fetching Satker:', error);
            }
        },
    },
};
</script>


<style scoped>
.container-satker{
    display: flex;
}
</style>
  