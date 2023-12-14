<template>
    <div>
        <div class="container-analisis-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Analisis Jabatan</h2>
                    <h6 class="subtitle-content">List Data Jabatan</h6>
                    <DataTable v-if="jabatanLoaded" class="table table-sm table-hover table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th width="5%" class="column-title">No.</th>
                                <th width="50%" class="column-title">FUNGSIONAL</th>
                                <th width="10%" class="column-title">TAHUN ANJAB</th>
                                <th width="25%" class="column-title">STATUS</th>
                                <th width="10%" class="column-title">PENGATURAN</th>
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
                                        <button @click="editBtn(jabatan.id_jabatan)" class="btn btn-secondary btn-sm">Analisis</button>
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
            jabatanLoaded: false
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
    },
};
</script>

<style scoped>
.container-analisis-jabatan {
    display: flex;
}
</style>
  