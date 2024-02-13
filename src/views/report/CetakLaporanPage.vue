<template>
    <div>
        <div class="container-analisis-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Cetak Laporan</h2>
                    <h6 class="subtitle-content">List Data Jabatan</h6>
                    <div v-if="satkerLoaded" class="query-container d-flex justify-content-start">
                        <div v-if="role==='Administrator' || role==='Verifikator'" class="query-select query-satker">
                            <label>Satker</label>
                            <VueMultiselect
                                v-model="satkerSelected"
                                :options="masterSatker"
                                :close-on-select="true"
                                :allow-empty="false"
                                label="satker"
                                track-by="satker"
                            >
                            </VueMultiselect>
                        </div>
                        <div v-if="role==='Administrator' || role==='Verifikator'" class="query-select ml-3">
                            <label>Tahun</label>
                            <VueDatePicker v-model="tahunSelected" year-picker></VueDatePicker>
                        </div>
                        <div v-else class="query-select">
                            <label>Tahun</label>
                            <VueDatePicker v-model="tahunSelected" year-picker></VueDatePicker>
                        </div>
                        <div class="query-select ml-3">
                            <label for=""></label>
                            <div>
                                <button class="btn btn-success btn-search" @click="searchQuery">Search</button>
                            </div>
                        </div>
                    </div>
                    <div v-if="jabatanLoaded" class="export-section d-flex justify-content-between total-selected">
                        <div>
                            {{ totalReport.length }} Laporan Dipilih
                        </div>
                        <div>
                            <button v-if="totalReport.length > 0" @click="exportReport" class="btn btn-success btn-sm btn-export">
                                Export
                            </button>
                            <button v-else class="btn btn-secondary btn-sm btn-export" disabled>
                                Export
                            </button>
                        </div>
                    </div>
                    <div v-if="jabatanLoaded" class="data-table">
                        <DataTable :options="dataTableOptions" class="table table-sm table-hover table-bordered table-responsive-xl display">
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
                                <tr class="table-body" v-for="(jabatan, index) in daftarJabatan" :key="jabatan.id_jabatan">
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
    </div>
</template>

<script>
import axios from 'axios';
import NavbarDashboard from '@/components/NavbarDashboard.vue';
import SidebarMenu from '@/components/SidebarMenu.vue';
import DataTable from 'datatables.net-vue3';
import DataTablesCore from 'datatables.net-bs5';
import VueMultiselect from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

DataTable.use(DataTablesCore)

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        DataTable,
        VueMultiselect,
        VueDatePicker
    },
    data() {
        return {
            role: localStorage.getItem('role'),
            isDisabled: true,
            daftarJabatan: [],
            jabatanLoaded: false,
            satkerLoaded: false,
            masterSatker: [],
            satkerSelected: [],
            daftarTahun: [],
            tahunSelected:[],
            logAnalisis: [],
            dataTableOptions: {
                searching: false
            }
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadSatker()
    },
    computed: {
        totalReport () {
            return this.daftarJabatan.filter(({ selected }) => selected === true)
        }
    },
    methods: {
        async searchQuery () {
            try {
                this.jabatanLoaded = false

                const token = localStorage.getItem('token')

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                let queryPayload

                if (this.role === 'Administrator' || this.role === 'Verifikator') {
                    queryPayload = {
                        idsatkerpayload: `${this.satkerSelected.id_satker}%`,
                        tahun: this.tahunSelected
                    }
                } else {
                    queryPayload = {
                        idsatkerpayload: `${localStorage.getItem('idsatker')}%`,
                        tahun: this.tahunSelected
                    }
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/jabatan/report`, queryPayload, config);

                this.daftarJabatan = response.data.data.jabatan.map(jabatan => {
                    return {
                        fungsional: jabatan.fungsional,
                        id_jabatan: jabatan.id_jabatan,
                        satker: jabatan.satker,
                        selected: false,
                        status: jabatan.status,
                        tahun_jabatan: jabatan.tahun_jabatan
                    }
                })

                this.jabatanLoaded = true
            } catch (error) {
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
                link.download = `Report ${this.satkerSelected.satker} ${this.tahunSelected}.docx`;
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

        async loadSatker () {
            try {
                const token = localStorage.getItem('token')

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/satker/aktif`, config);

                this.masterSatker = response.data.data.satker
                this.satkerLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.satkerLoaded = true
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
    },
};
</script>

<style scoped>
.container-analisis-jabatan {
    display: flex;
}

label {
    margin: 0 0 -5px 3px;
    font-size: small;
    color: rgb(112, 112, 112);
}

.query-container {
    margin-bottom: 20px;
}

.query-satker {
    width: 50%;
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
    padding: 1px 10px;
    font-size: 13px;
}

.data-table {
    padding: 10px;
    background-color: rgb(244, 244, 244);
    border-radius: 10px;
}
</style>
  