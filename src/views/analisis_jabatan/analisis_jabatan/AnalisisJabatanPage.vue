<template>
    <div>
        <div class="container-analisis-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Analisis Jabatan</h2>
                    <h6 class="subtitle-content">List Data Jabatan</h6>
                    <DataTable v-if="jabatanLoaded" class="table table-sm table-hover table-bordered table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th width="5%" class="column-title">No.</th>
                                <th width="40%" class="column-title">FUNGSIONAL</th>
                                <th width="10%" class="column-title">TAHUN ANJAB</th>
                                <th width="25%" class="column-title">STATUS</th>
                                <th width="10%" class="column-title">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(jabatan, index) in daftarJabatan" :key="jabatan.id_jabatan">
                                <td>{{ index+1 }}</td>
                                <td>{{ jabatan.fungsional }}</td>
                                <td>{{ jabatan.tahun_jabatan }}</td>
                                <td>{{ jabatan.status }}</td>
                                <td>
                                    <div class="d-flex justify-content-around">
                                        <button v-if="jabatan.status === 'Sudah Dikirim' || jabatan.status === 'Sudah Diverifikasi'" class="btn btn-secondary btn-sm ml-1 mr-1" disabled>
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                        </button>
                                        <button v-else @click="editBtn(jabatan.id_jabatan)" class="btn btn-info btn-sm ml-1 mr-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                        </button>
                                        <button @click="previewBtn(jabatan.id_jabatan)" class="btn btn-info btn-sm ml-1 mr-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-file-description" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M14 3v4a1 1 0 0 0 1 1h4" /><path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" /><path d="M9 17h6" /><path d="M9 13h6" /></svg>
                                        </button>
                                        <button @click="logBtn(jabatan.id_jabatan)" class="btn btn-info btn-sm ml-1 mr-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-hour-5" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /><path d="M12 12l2 3" /><path d="M12 7v5" /></svg>
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
    components: {
        NavbarDashboard,
        SidebarMenu,
        DataTable
    },
    data() {
        return {
            daftarJabatan: null,
            jabatanLoaded: false,
            logAnalisis: []
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadDataJabatan()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadDataJabatan() {
            try {
                const token = localStorage.getItem('token');
                const idsatker = localStorage.getItem('idsatker');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/jabatan/satker/${idsatker}`, config);

                this.daftarJabatan = response.data.data.jabatan
                this.jabatanLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.jabatanLoaded = true
                } else if (error.response.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                }
            }
        },

        editBtn (id_jabatan) {
            this.$router.push({ name: 'AnalisisBiodata', params: { jabatanid: id_jabatan } })    
        },

        previewBtn (id_jabatan) {
            this.$router.push({ name: 'PreviewAnalisis', params: { jabatanid: id_jabatan } })    
        },

        logBtn (id_jabatan) {
            this.$router.push({ name: 'LogAnalisis', params: { jabatanid: id_jabatan } })
        }
    },
};
</script>

<style scoped>
.container-analisis-jabatan {
    display: flex;
}
</style>
  