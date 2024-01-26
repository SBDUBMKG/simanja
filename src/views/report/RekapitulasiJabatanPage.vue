<template>
    <div>
        <div class="container-analisis-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Rekapitulasi Jabatan</h2>
                    <h6 class="subtitle-content">List Data Jabatan</h6>
                    <div v-if="satkerLoaded" class="query-container d-flex justify-content-start">
                        <div class="query-select query-satker">
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
                        <div class="query-select ml-3">
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
                    <div v-if="jabatanLoaded">
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Kode Jabatan</th>
                                <th>Nama Jabatan</th>
                                <th>Jumlah Pegawai Saat Ini</th>
                                <th>Jumlah Kebutuhan Pegawai</th>
                                <th>Kekurangan / Kelebihan</th>
                            </thead>
                            <tbody>
                                <tr v-for="(jabatan, index) in daftarJabatan" :key="jabatan.id_jabatan">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ jabatan.id_fungsional }}</td>
                                    <td>{{ jabatan.fungsional }}</td>
                                    <td>{{ jabatan.jumlah_pegawai_existing }}</td>
                                    <td>{{ jabatan.jumlah_kebutuhan_pegawai }}</td>
                                    <td>{{ jabatan.jumlah_pegawai_existing - jabatan.jumlah_kebutuhan_pegawai }}</td>
                                </tr>
                                <tr>
                                    <td colspan="3"><strong>Total</strong></td>
                                    <td><strong>{{ jumlahPegawaiExisting }}</strong></td>
                                    <td><strong>{{ jumlahKebutuhanPegawai }}</strong></td>
                                    <td><strong>{{ jumlahPegawaiExisting - jumlahKebutuhanPegawai }}</strong></td>
                                </tr>
                            </tbody>
                        </table>
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
import VueMultiselect from 'vue-multiselect'
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        VueMultiselect,
        VueDatePicker
    },
    data() {
        return {
            daftarJabatan: [],
            jabatanLoaded: false,
            satkerLoaded: false,
            masterSatker: [],
            satkerSelected: [],
            daftarTahun: [],
            tahunSelected:[]
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadSatker()
    },
    computed: {
        totalReport () {
            return this.daftarJabatan.filter(({ selected }) => selected === true)
        },
        jumlahPegawaiExisting () {
            return this.daftarJabatan.reduce((a, b) => a + b.jumlah_pegawai_existing, 0)
        },
        jumlahKebutuhanPegawai () {
            return this.daftarJabatan.reduce((a, b) => a + b.jumlah_kebutuhan_pegawai, 0)
        }
    },
    methods: {
        async searchQuery () {
            try {
                const token = localStorage.getItem('token')
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const queryPayload = {
                    idsatkerpayload: this.satkerSelected.id_satker,
                    tahun: this.tahunSelected
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/jabatan/rekapitulasi`, queryPayload, config);
                
                this.daftarJabatan = response.data.data.jabatan
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
  