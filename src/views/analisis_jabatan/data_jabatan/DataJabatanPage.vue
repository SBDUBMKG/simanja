<template>
    <div>
        <div class="container-data-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Data Jabatan</h2>
                    <h6 class="subtitle-content">List Data Jabatan</h6>
                    <div class="d-flex justify-content-start add-button">
                        <button @click="addJabatan" class="btn btn-success">Tambah Data Jabatan</button>
                    </div>
                    <DataTable v-if="jabatanLoaded" class="table table-sm table-hover table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th width="5%" class="column-title">No.</th>
                                <th width="50%" class="column-title">FUNGSIONAL</th>
                                <th width="10%" class="column-title">TAHUN JABATAN</th>
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
                                        <button @click="editBtn(jabatan.id_jabatan)" class="btn btn-secondary btn-sm">Edit</button>
                                        <button @click="deleteBtn(jabatan.id_jabatan)" class="btn btn-secondary btn-sm">Delete</button>
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
                        text: error.message
                    })
                }
            }
        },

        addJabatan () {
            this.$router.push({ name: 'AddDataJabatan' })
        },

        editBtn (id_jabatan) {
            this.$router.push({ name: 'EditDataJabatan', params: { jabatanid: id_jabatan } })    
        },

        deleteBtn (id_jabatan) {
            try {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Peringatan!!',
                    text: 'Yakin ingin menghapus data jabatan?',
                    showCancelButton: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const token = localStorage.getItem('token')
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
        
                        await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/jabatan/${id_jabatan}`, config)
                        this.daftarJabatan = null
                        this.jabatanLoaded = false,
                        this.loadDataJabatan()
                    }
                })

            } catch (error) {
                if (error.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.message
                    })
                }
            }
        }
    },
};
</script>

<style scoped>
.container-data-jabatan {
    display: flex;
}
</style>
  