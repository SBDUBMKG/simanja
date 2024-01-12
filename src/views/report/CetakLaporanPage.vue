<template>
    <div>
        <div class="container-analisis-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Cetak Laporan</h2>
                    <h6 class="subtitle-content">List Data Jabatan</h6>
                    <div class="export-section d-flex justify-content-between total-selected">
                        <div>
                            {{ totalReport.length }} Laporan Dipilih
                        </div>
                        <div>
                            <button @click="exportReport" class="btn btn-success btn-sm btn-export">
                                Export
                            </button>
                        </div>
                    </div>
                    <DataTable v-if="jabatanLoaded" class="table table-sm table-hover table-bordered table-responsive-xl display">
                        <thead>
                            <tr class="table-head">
                                <th width="5%" class="column-title">No.</th>
                                <th width="30%" class="column-title">FUNGSIONAL</th>
                                <th width="20%" class="column-title">SATKER</th>
                                <th width="10%" class="column-title">TAHUN ANJAB</th>
                                <th width="3%" class="column-title">SELECT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(jabatan, index) in daftarJabatan" :key="jabatan.id_jabatan">
                                <td>{{ index+1 }}</td>
                                <td>{{ jabatan.fungsional }}</td>
                                <td>{{ jabatan.satker }}</td>
                                <td>{{ jabatan.tahun_jabatan }}</td>
                                <td>
                                    <div class="form-group form-check d-flex justify-content-center">
                                        <input type="checkbox" class="form-check-input" v-model="jabatan['selected']">
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
            daftarJabatan: [],
            jabatanLoaded: false,
            logAnalisis: [],
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadDataJabatan()
    },
    computed: {
        totalReport () {
            return this.daftarJabatan.filter(({ selected }) => selected === true)
        }
    },
    methods: {
        async exportReport () {
            try {
                const token = localStorage.getItem('token')

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                let reportSelected = []
    
                for (let i = 0; i < this.totalReport.length; i++) {
                    reportSelected.push(this.totalReport[i].id_jabatan)
                }
    
                const payloadExport = {
                    idjabatanarray: reportSelected,
                }
    
                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/export`, payloadExport, config)

                const buffer = this.base64ToBuffer(response.data)
                const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
                const docxFile = URL.createObjectURL(blob);

                // Trigger download
                const link = document.createElement('a');
                link.href = docxFile;
                link.download = 'output.docx';
                link.click();

            } catch (error) {
                console.log(error)
                if (error.response.status === 401) {
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

        base64ToBuffer(base64String) {
            const binaryString = atob(base64String);
            const byteArray = new Uint8Array(binaryString.length);

            for (let i = 0; i < binaryString.length; i++) {
                byteArray[i] = binaryString.charCodeAt(i);
            }

            return byteArray;
        },

        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadDataJabatan() {
            try {
                const token = localStorage.getItem('token')

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/jabatan/report`, config);

                for (let i = 0; i < response.data.data.jabatan.length; i++) {
                    this.daftarJabatan.push(response.data.data.jabatan[i])
                    this.daftarJabatan[i].selected = false
                }
                // this.daftarJabatan = response.data.data.jabatan
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
        }
    },
};
</script>

<style scoped>
.container-analisis-jabatan {
    display: flex;
}

.total-selected {
    background-color: rgb(213, 213, 213);
    border-radius: 30px;
    margin: 0 0 20px 0;
    color: rgb(56, 56, 56);
    padding: 5px 20px;
}

.btn-export {
    border-radius: 30px;
    padding: 1px 15px;
    font-size: 13px;
}
</style>
  