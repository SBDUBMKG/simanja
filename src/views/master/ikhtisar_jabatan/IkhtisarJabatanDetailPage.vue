<template>
    <div>
        <div class="container-detail-master-ikhtisar-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="back-button btn btn-secondary btn-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Ikhtisar Jabatan</h2>
                    <h6 class="subtitle-content" v-if="dataLoaded">List Ikhtisar Jabatan {{ fungsionalData.fungsional }}</h6>
                    <div v-if="ikhtisarJabatanLoaded" class="d-flex justify-content-start add-button">
                        <button v-if="daftarIkhtisarJabatan.length === 0" @click="addIkhtisarJabatan" class="btn btn-success">Tambah Ikhtisar Jabatan</button>
                        <button v-else @click="addIkhtisarJabatan" class="btn btn-secondary" disabled>Tambah Ikhtisar Jabatan</button>
                    </div>
                    <DataTable v-if="ikhtisarJabatanLoaded" class="table table-bordered table-sm table-hover table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th width="5%" class="column-title">No.</th>
                                <th width="85%" class="column-title">IKHTISAR JABATAN</th>
                                <th width="10%" class="column-title">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(ikhtisarJabatan, index) in daftarIkhtisarJabatan" :key="ikhtisarJabatan.id_ikhtisar_jabatan">
                                <td>{{ index+1 }}</td>
                                <td>{{ ikhtisarJabatan.ikhtisar_jabatan }}</td>
                                <td>
                                    <div class="d-flex justify-content-around">
                                        <button @click="editBtn(ikhtisarJabatan.id_ikhtisar_jabatan)" class="btn btn-secondary btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                        </button>
                                        <button @click="deleteBtn(ikhtisarJabatan.id_ikhtisar_jabatan)" class="btn btn-secondary btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-trash" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 7l16 0" /><path d="M10 11l0 6" /><path d="M14 11l0 6" /><path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" /><path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" /></svg>
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
            fungsionalId: this.$route.params.fungsionalid,
            daftarIkhtisarJabatan: null,
            ikhtisarJabatanLoaded: false,
            fungsionalData: null,
            dataLoaded: false
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadIkhtisarJabatan()
        this.loadFungsionalData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadIkhtisarJabatan() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/ikhtisar-jabatan/fungsional/${this.fungsionalId}`, config);

                this.daftarIkhtisarJabatan = response.data.data.ikhtisarJabatan
                this.ikhtisarJabatanLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.ikhtisarJabatanLoaded = true
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

        async loadFungsionalData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/fungsional/id/${this.fungsionalId}`, config);

                this.fungsionalData = response.data.data.fungsional[0]
                this.dataLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.dataLoaded = true
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

        goToPreviousPage () {
            this.$router.go(-1)
        },

        addIkhtisarJabatan () {
            this.$router.push({ name: 'AddIkhtisarJabatan' })
        },

        editBtn (id_ikhtisar_jabatan) {
            this.$router.push({ name: 'EditIkhtisarJabatan', params: { ikhtisarjabatanid: id_ikhtisar_jabatan } })    
        },

        deleteBtn (id_ikhtisar_jabatan) {
            try {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Peringatan!!',
                    text: 'Yakin ingin menghapus ikhtisar jabatan?',
                    showCancelButton: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const token = localStorage.getItem('token')
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
        
                        await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/master/ikhtisar-jabatan/${id_ikhtisar_jabatan}`, config)
                        this.daftarIkhtisarJabatan = null
                        this.ikhtisarJabatanLoaded = false,
                        this.loadIkhtisarJabatan()
                    }
                })

            } catch (error) {
                if (error.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                }
            }
        }
    },
};
</script>

<style scoped>
.container-detail-master-ikhtisar-jabatan {
    display: flex;
}
</style>
  