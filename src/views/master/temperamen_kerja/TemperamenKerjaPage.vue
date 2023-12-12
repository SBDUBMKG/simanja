<template>
    <div>
        <div class="container-detail-master-temperamen-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Master Temperamen Kerja</h2>
                    <h6 class="subtitle-content">List Temperamen Kerja</h6>
                    <div class="d-flex justify-content-start add-button">
                        <button @click="addTemperamenKerja" class="btn btn-success">Tambah Temperamen Kerja</button>
                    </div>
                    <DataTable v-if="temperamenKerjaLoaded" class="table table-bordered table-sm table-hover table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th width="5%" class="column-title">No.</th>
                                <th width="30%" class="column-title">TEMPERAMEN KERJA</th>
                                <th width="55%" class="column-title">URAIAN</th>
                                <th width="10%" class="column-title">ACTION</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(temperamenKerja, index) in daftarTemperamenKerja" :key="temperamenKerja.id_temperamen_kerja">
                                <td>{{ index+1 }}</td>
                                <td>{{ temperamenKerja.temperamen_kerja }}</td>
                                <td>{{ temperamenKerja.uraian }}</td>
                                <td>
                                    <div class="d-flex justify-content-around">
                                        <button @click="editBtn(temperamenKerja.id_temperamen_kerja)" class="btn btn-secondary btn-sm">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                        </button>
                                        <button @click="deleteBtn(temperamenKerja.id_temperamen_kerja)" class="btn btn-secondary btn-sm">
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
            daftarTemperamenKerja: null,
            temperamenKerjaLoaded: false
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadTemperamenKerja()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadTemperamenKerja() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/temperamen-kerja`, config);

                this.daftarTemperamenKerja = response.data.data.temperamenKerja
                this.temperamenKerjaLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.temperamenKerjaLoaded = true
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

        addTemperamenKerja () {
            this.$router.push({ name: 'AddTemperamenKerja' })
        },

        editBtn (id_temperamen_kerja) {
            this.$router.push({ name: 'EditTemperamenKerja', params: { temperamenkerjaid: id_temperamen_kerja } })    
        },

        deleteBtn (id_temperamen_kerja) {
            try {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Peringatan!!',
                    text: 'Yakin ingin menghapus temperamen kerja?',
                    showCancelButton: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const token = localStorage.getItem('token')
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
        
                        await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/master/temperamen-kerja/${id_temperamen_kerja}`, config)
                        this.daftarTemperamenKerja = null
                        this.temperamenKerjaLoaded = false,
                        this.loadTemperamenKerja()
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
.container-detail-master-temperamen-kerja {
    display: flex;
}
</style>
  