<template>
    <div>
        <div class="container-satker">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Master Satker / UPT</h2>
                    <h6 class="subtitle-content">List Satker / UPT</h6>
                    <div class="d-flex justify-content-start add-button">
                        <button @click="addJabatan" class="btn btn-success">Tambah Jabatan</button>
                    </div>
                    <DataTable v-if="loaded" class="table table-bordered table-sm table-hover table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title">SATKER UPT</th>
                                <th width="10%" class="column-title">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(data, index) in daftarSatker" :key="index">
                                <td>{{ data.satker }}</td>
                                <td>
                                    <div class="d-flex justify-content-around">
                                        <button @click="editBtn(data.id_satker)" class="btn btn-secondary btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                        </button>
                                    </div>
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
        addJabatan () {
            this.$router.push({ name: 'AddSatker' })
        },

        editBtn (id_satker) {
            this.$router.push({ name: 'EditSatker', params: { satkerid: id_satker } })    
        },

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
  