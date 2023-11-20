<template>
    <div>
        <NavbarDashboard/>
        <div class="container-detail-master-bakat-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                    Back
                </button>
                <h2 id="title-content">Master Bakat Kerja</h2>
                <h6 id="subtitle-content">List Bakat Kerja</h6>
                <div class="d-flex justify-content-start add-button">
                    <button @click="addBakatKerja" class="btn btn-success">Tambah Bakat Kerja</button>
                </div>
                <DataTable v-if="bakatKerjaLoaded" class="table table-bordered table-sm table-hover table-responsive-xl display">
                    <thead>
                        <tr class="table-head">
                            <th width="5%" class="column-title">No.</th>
                            <th width="30%" class="column-title">BAKAT KERJA</th>
                            <th width="55%" class="column-title">URAIAN</th>
                            <th width="10%" class="column-title">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(bakatKerja, index) in daftarBakatKerja" :key="bakatKerja.id_bakat_kerja">
                            <td>{{ index+1 }}</td>
                            <td>{{ bakatKerja.bakat_kerja }}</td>
                            <td>{{ bakatKerja.uraian }}</td>
                            <td>
                                <div class="d-flex justify-content-around">
                                    <button @click="editBtn(bakatKerja.id_bakat_kerja)" class="btn btn-warning btn-sm">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-edit" width="20" height="20" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 7h-1a2 2 0 0 0 -2 2v9a2 2 0 0 0 2 2h9a2 2 0 0 0 2 -2v-1" /><path d="M20.385 6.585a2.1 2.1 0 0 0 -2.97 -2.97l-8.415 8.385v3h3l8.385 -8.415z" /><path d="M16 5l3 3" /></svg>
                                    </button>
                                    <button @click="deleteBtn(bakatKerja.id_bakat_kerja)" class="btn btn-danger btn-sm">
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
            daftarBakatKerja: null,
            bakatKerjaLoaded: false
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadBakatKerja()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadBakatKerja() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/bakat-kerja`, config);

                this.daftarBakatKerja = response.data.data.bakatKerja
                this.bakatKerjaLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.bakatKerjaLoaded = true
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

        goToPreviousPage () {
            this.$router.go(-1)
        },

        addBakatKerja () {
            this.$router.push({ name: 'AddBakatKerja' })
        },

        editBtn (id_bakat_kerja) {
            this.$router.push({ name: 'EditBakatKerja', params: { bakatkerjaid: id_bakat_kerja } })    
        },

        deleteBtn (id_bakat_kerja) {
            try {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Peringatan!!',
                    text: 'Yakin ingin menghapus bakat kerja?',
                    showCancelButton: true,
                }).then(async (result) => {
                    if (result.isConfirmed) {
                        const token = localStorage.getItem('token')
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
        
                        await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/master/bakat-kerja/${id_bakat_kerja}`, config)
                        this.daftarBakatKerja = null
                        this.bakatKerjaLoaded = false,
                        this.loadBakatKerja()
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
.container-detail-master-bakat-kerja {
    display: flex;
}

.container-content{
    flex: auto;
    padding: 20px;
}

.back-button {
    display: inline-flex;
    align-items: center; 
    padding-right: 15px;  
    border-radius: 30px;
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

.add-button {
    margin: 30px 0 10px 0;
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

.column-title {
    vertical-align: middle;
    text-align: center;
}

</style>
  