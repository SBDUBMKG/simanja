<template>
    <div>
        <div class="container-analisis-biodata">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Analisis Jabatan</h2>
                    <h6 v-if="jabatanLoaded" class="subtitle-content">{{ dataJabatan[0].satker }} - {{ dataJabatan[0].fungsional }}</h6>
                    <form>
                        <div class="tugas-pokok">
                            <h6>6. Tugas Pokok</h6>
                            <VueMultiselect
                                v-model="tugas"
                                :options="masterTugas"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Tugas Pokok"
                                label="uraian_tugas"
                                track-by="uraian_tugas"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Tugas Pokok Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Uraian Tugas</th>
                                    <th>Hasil Kerja</th>
                                    <th>Jumlah Hasil</th>
                                    <th>Waktu Penyelesaian</th>
                                    <th>Waktu Efektif</th>
                                    <th>Kebutuhan Pegawai</th>
                                </thead>
                                <tbody>
                                    <tr v-if="tugas.length === 0">
                                        <td colspan="7">Belum memilih tugas</td>
                                    </tr>
                                    <tr v-for="(tugas, index) in tugas" :key="tugas.id_tugas">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ tugas.uraian_tugas }}</td>
                                        <td>{{ tugas.hasil_kerja }}</td>
                                        <td><input type="number" v-model="tugas.vol_hasil_kerja" class="form-control form-control-sm jumlah-hasil"></td>
                                        <td>{{ tugas.waktu_penyelesaian }}</td>
                                        <td>{{ tugas.waktu_efektif }}</td>
                                        <td>
                                            <div>
                                                <input type="number" class="form-control form-control-sm kebutuhan-pegawai" :value="(tugas.vol_hasil_kerja * tugas.waktu_penyelesaian) / tugas.waktu_efektif" disabled>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <th colspan="7" class="table-head">Tugas Lainnya
                                            <button @click="addRow($event, 'tugas-pokok')" class="btn btn-sm btn-info btn-add-lainnya mr-2 ml-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                            </button>
                                            <button @click="deleteRow($event, 'tugas-pokok')" class="btn btn-sm btn-warning btn-add-lainnya">
                                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
                                            </button>
                                        </th>
                                    </tr>
                                    <tr v-if="tugasLainnya.length === 0">
                                        <td colspan="7">Belum ada tugas lainnya</td>
                                    </tr>
                                    <tr v-for="(tugas, index) in tugasLainnya" :key="tugas.id_tugas">
                                        <td>{{ index + 1 }}</td>
                                        <td><input type="text" v-model="tugas.uraian_tugas" class="form-control form-control-sm"></td>
                                        <td><input type="text" v-model="tugas.hasil_kerja" class="form-control form-control-sm"></td>
                                        <td><input type="number" v-model="tugas.vol_hasil_kerja" class="form-control form-control-sm jumlah-hasil"></td>
                                        <td><input type="number" v-model="tugas.waktu_penyelesaian" class="form-control form-control-sm"></td>
                                        <td><input type="number" v-model="tugas.waktu_efektif" class="form-control form-control-sm"></td>
                                        <td>
                                            <div>
                                                <input type="number" class="form-control form-control-sm kebutuhan-pegawai" :value="(tugas.vol_hasil_kerja * tugas.waktu_penyelesaian) / tugas.waktu_efektif" disabled>
                                            </div>
                                        </td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td colspan="6">Jumlah</td>
                                        <td><input type="number" class="form-control form-control-sm" disabled :value="jumlahPegawai"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="6">Jumlah Kebutuhan Pegawai</td>
                                        <td><input type="number" class="form-control form-control-sm" disabled :value="jumlahPegawaiRounded"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="6">Jumlah Pegawai Saat Ini</td>
                                        <td v-if="jabatanLoaded"><input type="number" class="form-control form-control-sm" v-model="dataJabatan[0].jumlah_pegawai_existing"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="6">Selisih Kelebihan/Kekurangan</td>
                                        <td v-if="jabatanLoaded"><input type="number" class="form-control form-control-sm" disabled :value="dataJabatan[0].jumlah_pegawai_existing - jumlahPegawaiRounded"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="hasil-kerja">
                            <h6>7. Hasil Kerja</h6>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Hasil Kerja</th>
                                </thead>
                                <tbody>
                                    <tr v-if="tugas.length === 0">
                                        <td colspan="2">Belum memilih tugas</td>
                                    </tr>
                                    <tr v-for="(tugas, index) in tugas" :key="tugas.id_tugas">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ tugas.uraian_hasil_kerja }}</td>
                                    </tr>
                                </tbody>
                                <thead class="table-head">
                                    <th colspan="2">Hasil Kerja Lainnya</th>
                                </thead>
                                <tbody>
                                    <tr v-if="tugasLainnya.length === 0">
                                        <td colspan="2">Belum ada tugas lainnya</td>
                                    </tr>
                                    <tr v-for="(tugas, index) in tugasLainnya" :key="tugas.id_tugas">
                                        <td>{{ index + 1 }}</td>
                                        <td><textarea class="form-control form-control-sm" v-model="tugas.uraian_hasil_kerja" rows="1"></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="bahan-kerja">
                            <h6>8. Bahan Kerja</h6>
                            <VueMultiselect
                                v-model="bahanKerja"
                                :options="masterBahanKerja"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Bahan Kerja"
                                label="bahan_kerja"
                                track-by="bahan_kerja"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Bahan Kerja Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Bahan Kerja</th>
                                    <th>Penggunaan</th>
                                </thead>
                                <tbody>
                                    <tr v-if="bahanKerja.length === 0">
                                        <td colspan="3">Belum memilih bahan kerja</td>
                                    </tr>
                                    <tr v-for="(bahanKerja, index) in bahanKerja" :key="bahanKerja.id_bahan_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ bahanKerja.bahan_kerja }}</td>
                                        <td>{{ bahanKerja.penggunaan }}</td>
                                    </tr>
                                </tbody>
                                <thead class="table-head">
                                    <th colspan="3">Bahan Kerja Lainnya
                                        <button @click="addRow($event, 'bahan-kerja')" class="btn btn-sm btn-info btn-add-lainnya mr-2 ml-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                        </button>
                                        <button @click="deleteRow($event, 'bahan-kerja')" class="btn btn-sm btn-warning btn-add-lainnya">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
                                        </button>
                                    </th>
                                </thead>
                                <tbody>
                                    <tr v-if="bahanKerjaLainnya.length === 0">
                                        <td colspan="3">Belum ada bahan kerja lainnya</td>
                                    </tr>
                                    <tr v-for="(bahanKerja, index) in bahanKerjaLainnya" :key="bahanKerja.id_bahan_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td><textarea class="form-control form-control-sm" v-model="bahanKerja.bahan_kerja" rows="1"></textarea></td>
                                        <td><textarea class="form-control form-control-sm" v-model="bahanKerja.penggunaan" rows="1"></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="perangkat-kerja">
                            <h6>9. Perangkat Kerja</h6>
                            <VueMultiselect
                                v-model="perangkatKerja"
                                :options="masterPerangkatKerja"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Perangkat Kerja"
                                label="perangkat_kerja"
                                track-by="perangkat_kerja"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Perangkat Kerja Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Perangkat Kerja</th>
                                    <th>Penggunaan</th>
                                </thead>
                                <tbody>
                                    <tr v-if="perangkatKerja.length === 0">
                                        <td colspan="3">Belum memilih tugas</td>
                                    </tr>
                                    <tr v-for="(perangkatKerja, index) in perangkatKerja" :key="perangkatKerja.id_perangkat_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ perangkatKerja.perangkat_kerja }}</td>
                                        <td>{{ perangkatKerja.penggunaan }}</td>
                                    </tr>
                                </tbody>
                                <thead class="table-head">
                                    <th colspan="3">Perangkat Kerja Lainnya
                                        <button @click="addRow($event, 'perangkat-kerja')" class="btn btn-sm btn-info btn-add-lainnya mr-2 ml-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                        </button>
                                        <button @click="deleteRow($event, 'perangkat-kerja')" class="btn btn-sm btn-warning btn-add-lainnya">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
                                        </button>
                                    </th>
                                </thead>
                                <tbody>
                                    <tr v-if="perangkatKerjaLainnya.length === 0">
                                        <td colspan="3">Belum memilih tugas</td>
                                    </tr>
                                    <tr v-for="(perangkatKerja, index) in perangkatKerjaLainnya" :key="perangkatKerja.id_bahan_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td><textarea class="form-control form-control-sm" v-model="perangkatKerja.perangkat_kerja" rows="1"></textarea></td>
                                        <td><textarea class="form-control form-control-sm" v-model="perangkatKerja.penggunaan" rows="1"></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="saveAll('save')" class="btn btn-success btn-save">Save</button>
                        <button @click="saveAll('continue')" class="btn btn-primary btn-continue">Save & Continue</button>
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

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        VueMultiselect
    },
    data() {
        return {
            jabatanId: this.$route.params.jabatanid,
            dataJabatan: [],
            jabatanLoaded: false,
            masterTugas: [],
            masterTugasLoaded: false,
            masterBahanKerja: [],
            masterBahanKerjaLoaded: false,
            masterPerangkatKerja: [],
            masterPerangkatKerjaLoaded: false,
            tugas: [],
            tugasDb: [],
            tugasBuffer: [],
            tugasLainnya: [],
            tugasLainnyaDb: [],
            tugasLainnyaBuffer: [],
            tugasLoaded: false,
            bahanKerja: [],
            bahanKerjaDb: [],
            bahanKerjaBuffer: [],
            bahanKerjaLainnya: [],
            bahanKerjaLainnyaDb: [],
            bahanKerjaLainnyaBuffer: [],
            bahanKerjaLoaded: false,
            perangkatKerja: [],
            perangkatKerjaDb: [],
            perangkatKerjaBuffer: [],
            perangkatKerjaLainnya: [],
            perangkatKerjaLainnyaDb: [],
            perangkatKerjaLainnyaBuffer: [],
            perangkatKerjaLoaded: false,
        };
    },
    mounted () {
        this.checkAuthentication()
        this.getData()          
    },
    computed: {
        jumlahPegawai () {
            return (
                this.tugas.reduce((a, b) => a + ((b.vol_hasil_kerja * b.waktu_penyelesaian) / b.waktu_efektif), 0) + 
                this.tugasLainnya.reduce((a, b) => a + ((b.vol_hasil_kerja * b.waktu_penyelesaian) / b.waktu_efektif), 0)
            )
        },

        jumlahPegawaiRounded () {
            return Math.round(this.jumlahPegawai)
        }
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                this.$router.push({ name: 'Home' })
            }
        },

        goToPreviousPage () {
            this.$router.go(-1)
        },

        addRow (e, param) {
            if (param === 'tugas-pokok') {
                this.tugasLainnya.push({
                    uraian_tugas: null,
                    hasil_kerja: null,
                    uraian_hasil_kerja: null,
                    vol_hasil_kerja: null,
                    waktu_penyelesaian: null,
                    waktu_efektif: null,
                    is_lainnya: true
                })
            } else if (param === 'bahan-kerja') {
                this.bahanKerjaLainnya.push({
                    bahan_kerja: null,
                    penggunaan: null,
                    is_lainnya: true
                })
            } else if (param === 'perangkat-kerja') {
                this.perangkatKerjaLainnya.push({
                    perangkat_kerja: null,
                    penggunaan: null,
                    is_lainnya: true
                })
            }
            e.preventDefault()
        },

        deleteRow (e, param) {
            if (param === 'tugas-pokok') {
                this.tugasLainnya.pop()
            } else if (param === 'bahan-kerja') {
                this.bahanKerjaLainnya.pop()
            } else if (param === 'perangkat-kerja') {
                this.perangkatKerjaLainnya.pop()
            }
            e.preventDefault()
        },

        async getData () {
            await this.getJabatan()
            await Promise.all([
                this.getTugasPokok(),
                this.getBahanKerja(),
                this.getPerangkatKerja()
            ])
        },

        async getJabatan () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/jabatan/id/${this.jabatanId}`, config);

                this.dataJabatan = response.data.data.jabatan
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

        async getTugasPokok () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/tugas/fungsional/${this.dataJabatan[0].id_fungsional}`, config);
                this.masterTugas = responseMaster.data.data.tugas
                this.masterTugasLoaded = true

                const responseTugas = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/tugas/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.tugas = responseTugas.data.data.tugas.filter(tugas => tugas.is_lainnya === false)
                this.tugasDb = responseTugas.data.data.tugas.filter(tugas => tugas.is_lainnya === false)
                this.tugasLainnya = responseTugas.data.data.tugas.filter(tugas => tugas.is_lainnya === true)
                this.tugasLainnyaDb = responseTugas.data.data.tugas.filter(tugas => tugas.is_lainnya === true)

                this.tugasLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.masterTugasLoaded = true
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

        async getBahanKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/bahan-kerja`, config);
                this.masterBahanKerja = responseMaster.data.data.bahanKerja
                this.masterBahanKerjaLoaded = true

                const responseBahanKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/bahan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.bahanKerja = responseBahanKerja.data.data.bahanKerja.filter(bahanKerja => bahanKerja.is_lainnya === false)
                this.bahanKerjaDb = responseBahanKerja.data.data.bahanKerja.filter(bahanKerja => bahanKerja.is_lainnya === false)
                this.bahanKerjaLainnya = responseBahanKerja.data.data.bahanKerja.filter(bahanKerja => bahanKerja.is_lainnya === true)
                this.bahanKerjaLainnyaDb = responseBahanKerja.data.data.bahanKerja.filter(bahanKerja => bahanKerja.is_lainnya === true)

                this.bahanKerjaLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.bahanKerjaLoaded = true
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

        async getPerangkatKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/perangkat-kerja`, config);
                this.masterPerangkatKerja = responseMaster.data.data.perangkatKerja
                this.masterPerangkatKerjaLoaded = true

                const responsePerangkatKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/perangkat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.perangkatKerja = responsePerangkatKerja.data.data.perangkatKerja.filter(perangkatKerja => perangkatKerja.is_lainnya === false)
                this.perangkatKerjaDb = responsePerangkatKerja.data.data.perangkatKerja.filter(perangkatKerja => perangkatKerja.is_lainnya === false)
                this.perangkatKerjaLainnya = responsePerangkatKerja.data.data.perangkatKerja.filter(perangkatKerja => perangkatKerja.is_lainnya === true)
                this.perangkatKerjaLainnyaDb = responsePerangkatKerja.data.data.perangkatKerja.filter(perangkatKerja => perangkatKerja.is_lainnya === true)

                this.perangkatKerjaLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.perangkatKerjaLoaded = true
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

        async badRequestException (message) {
            const exception = new Error();
            exception.name = "Bad Request";
            exception.response = {
                status: 400,
                data: {
                    message: message
                }
            }
            throw exception
        },

        async saveTugasPokok () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            if (this.tugas.length === 0) {
                await this.badRequestException("Tugas harus diisi minimal satu")
            }

            if (this.dataJabatan[0].jumlah_pegawai_existing === null) {
                await this.badRequestException("Jumlah pegawai saat ini wajib diisi")
            }

            if (this.tugasDb.length !== 0 || this.tugasBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/tugas/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
                 
            for (let i = 0; i < this.tugas.length; i++) {
                const payloadTugas = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idtugas: this.tugas[i].id_tugas,
                    volhasilkerja: this.tugas[i].vol_hasil_kerja
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/tugas`, payloadTugas, config)
                .then(
                    this.tugasBuffer.push(this.tugas[i].id_tugas)
                )
            }

            for (let i = 0; i < this.tugasLainnya.length; i++) {
                const payloadTugas = {
                    idfungsional: this.dataJabatan[0].id_fungsional, 
                    uraiantugas: this.tugasLainnya[i].uraian_tugas,
                    hasilkerja: this.tugasLainnya[i].hasil_kerja,
                    uraianhasilkerja: this.tugasLainnya[i].uraian_hasil_kerja,
                    waktupenyelesaian: this.tugasLainnya[i].waktu_penyelesaian,
                    waktuefektif: this.tugasLainnya[i].waktu_efektif,
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idsatker: this.dataJabatan[0].id_satker,
                    volhasilkerja: this.tugasLainnya[i].vol_hasil_kerja,
                    islainnya: true
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/tugas-lainnya`, payloadTugas, config)
                .then(
                    this.tugasLainnyaBuffer.push(this.tugasLainnya[i].uraian_tugas)
                )
            }

            const payloadJumlahPegawaiExisting = {
                jumlahpegawaiexisting: this.dataJabatan[0].jumlah_pegawai_existing
            }

            await axios.put(`${process.env.VUE_APP_BACKENDHOST}/jabatan/jumlahpegawaiexisting/${this.dataJabatan[0].id_jabatan}`, payloadJumlahPegawaiExisting, config)
        },

        async saveBahanKerja () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.bahanKerja.length === 0) {
                await this.badRequestException("Bahan kerja harus diisi minimal 1")
            }

            if (this.bahanKerjaDb.length !== 0 || this.bahanKerjaBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/bahan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
                 
            for (let i = 0; i < this.bahanKerja.length; i++) {
                const payloadBahanKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idbahankerja: this.bahanKerja[i].id_bahan_kerja
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/bahan-kerja`, payloadBahanKerja, config)
                .then(
                    this.bahanKerjaBuffer.push(this.bahanKerja[i].id_bahan_kerja)
                )
            }

            for (let i = 0; i < this.bahanKerjaLainnya.length; i++) {
                const payloadBahanKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idsatker: this.dataJabatan[0].id_satker,
                    bahankerja: this.bahanKerjaLainnya[i].bahan_kerja,
                    penggunaan: this.bahanKerjaLainnya[i].penggunaan,
                    islainnya: true
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/bahan-kerja-lainnya`, payloadBahanKerja, config)
                .then(
                    this.bahanKerjaLainnyaBuffer.push(this.bahanKerjaLainnya[i].bahan_kerja)
                )
            }
        },

        async savePerangkatKerja () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.perangkatKerja.length === 0) {
                await this.badRequestException("Perangkat kerja harus diisi minimal satu")
            }

            if (this.perangkatKerjaDb.length !== 0 || this.perangkatKerjaBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/perangkat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
                 
            for (let i = 0; i < this.perangkatKerja.length; i++) {
                const payloadPerangkatKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idperangkatkerja: this.perangkatKerja[i].id_perangkat_kerja
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/perangkat-kerja`, payloadPerangkatKerja, config)
                .then(
                    this.perangkatKerjaBuffer.push(this.perangkatKerja[i].id_perangkat_kerja)
                )
            }

            for (let i = 0; i < this.perangkatKerjaLainnya.length; i++) {
                const payloadPerangkatKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idsatker: this.dataJabatan[0].id_satker,
                    perangkatkerja: this.perangkatKerjaLainnya[i].perangkat_kerja,
                    penggunaan: this.perangkatKerjaLainnya[i].penggunaan,
                    islainnya: true
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/perangkat-kerja-lainnya`, payloadPerangkatKerja, config)
                .then(
                    this.perangkatKerjaLainnyaBuffer.push(this.perangkatKerjaLainnya[i].perangkat_kerja)
                )
            }
        },

        async saveAll (action) {
            this.$swal.fire({
                text: 'Loading....',
                showConfirmButton: false
            })

            await Promise.all([
                this.saveTugasPokok(),
                this.saveBahanKerja(),
                this.savePerangkatKerja()
            ])
            .then(
                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Berhasil Disimpan'
                })            
            )
            .then(() => {
                if (action === 'continue') {
                    this.$router.push({ name: 'AnalisisTanggungJawab', params: { jabatanid: this.jabatanId } })
                }
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                }
            })
        }
    }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.css"></style>

<style scoped>
.container-analisis-biodata {
    display: flex;
}

table {
    width: 100%;
    margin: 20px 0;
}

tr td {
    padding: 10px;
    vertical-align: middle;
}

.action-button {
    padding: 5px;
}

.btn-continue {
    margin-left: 10px;
}
</style>
  