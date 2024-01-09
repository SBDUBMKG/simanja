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
                        <div class="tanggung-jawab">
                            <h6>10. Tanggung Jawab</h6>
                            <VueMultiselect
                                v-model="tanggungJawab"
                                :options="masterTanggungJawab"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Tanggung Jawab"
                                label="tanggung_jawab"
                                track-by="tanggung_jawab"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Tanggung Jawab Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Tanggung Jawab</th>
                                </thead>
                                <tbody>
                                    <tr v-if="tanggungJawab.length === 0">
                                        <td colspan="2">Belum memilih tanggung jawab</td>
                                    </tr>
                                    <tr v-for="(tanggungJawab, index) in tanggungJawab" :key="tanggungJawab.id_tanggung_jawab">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ tanggungJawab.tanggung_jawab }}</td>
                                    </tr>
                                </tbody>
                                <thead class="table-head">
                                    <th colspan="3">Tanggung Jawab Lainnya
                                        <button @click="addRow($event, 'tanggung-jawab')" class="btn btn-sm btn-info btn-add-lainnya mr-2 ml-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                        </button>
                                        <button @click="deleteRow($event, 'tanggung-jawab')" class="btn btn-sm btn-warning btn-add-lainnya">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
                                        </button>
                                    </th>
                                </thead>
                                <tbody>
                                    <tr v-if="tanggungJawabLainnya.length === 0">
                                        <td colspan="2">Belum ada tanggung jawab tambahan</td>
                                    </tr>
                                    <tr v-for="(tanggungJawab, index) in tanggungJawabLainnya" :key="tanggungJawab.id_tanggung_jawab">
                                        <td>{{ index + 1 }}</td>
                                        <td><textarea class="form-control form-control-sm" v-model="tanggungJawab.tanggung_jawab" rows="1"></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="wewenang">
                            <h6>11. Wewenang</h6>
                            <VueMultiselect
                                v-model="wewenang"
                                :options="masterWewenang"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Wewenang"
                                label="wewenang"
                                track-by="wewenang"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Wewenang Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Wewenang</th>
                                </thead>
                                <tbody>
                                    <tr v-if="wewenang.length === 0">
                                        <td colspan="2">Belum memilih wewenang</td>
                                    </tr>
                                    <tr v-for="(wewenang, index) in wewenang" :key="wewenang.id_wewenang">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ wewenang.wewenang }}</td>
                                    </tr>
                                </tbody>
                                <thead class="table-head">
                                    <th colspan="3">Wewenang Lainnya
                                        <button @click="addRow($event, 'wewenang')" class="btn btn-sm btn-info btn-add-lainnya mr-2 ml-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-plus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 5l0 14" /><path d="M5 12l14 0" /></svg>
                                        </button>
                                        <button @click="deleteRow($event, 'wewenang')" class="btn btn-sm btn-warning btn-add-lainnya">
                                            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-minus" width="15" height="15" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /></svg>
                                        </button>
                                    </th>
                                </thead>
                                <tbody>
                                    <tr v-if="wewenangLainnya.length === 0">
                                        <td colspan="2">Belum ada wewenang tambahan</td>
                                    </tr>
                                    <tr v-for="(wewenang, index) in wewenangLainnya" :key="wewenang.id_wewenang">
                                        <td>{{ index + 1 }}</td>
                                        <td><textarea class="form-control form-control-sm" v-model="wewenang.wewenang" rows="1"></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="korelasi-jabatan">
                            <h6>12. Korelasi Jabatan</h6>
                            <div class="row-controller d-flex justify-content-start">
                                <button @click="addRow($event, 'korelasi-jabatan')" class="btn btn-info btn-sm">Tambah Baris</button>
                                <button @click="deleteRow($event, 'korelasi-jabatan')" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                            </div>
                            <table class="table table-bordered table-sm table-hover table-responsive-xl">
                                <thead>
                                    <tr class="table-head">
                                        <th class="column-title">Nama Jabatan</th>
                                        <th class="column-title">Unit Kerja</th>
                                        <th class="column-title">Dalam Hal</th>
                                    </tr>
                                </thead>
                                <tbody id="list-table">
                                    <tr v-if="korelasiJabatan.length === 0">
                                        <td colspan="3">Belum mengisi korelasi jabatan</td>
                                    </tr>
                                    <tr class="row-list" v-for="(korelasiJabatan) in korelasiJabatan" :key="korelasiJabatan.id_tbl_korelasi_jabatan">
                                        <td><textarea v-model="korelasiJabatan.nama_jabatan" class="form-control form-control-sm nama-jabatan" rows="1"></textarea></td>
                                        <td><textarea v-model="korelasiJabatan.unit_kerja" class="form-control form-control-sm unit-kerja" rows="1"></textarea></td>
                                        <td><textarea v-model="korelasiJabatan.dalam_hal" class="form-control form-control-sm dalam-hal" rows="1"></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="lingkungan-kerja">
                            <h6>13. Lingkungan Kerja</h6>
                            <table class="table table-bordered table-sm table-responsive-xl">
                                <thead>
                                    <tr class="table-head">
                                        <th class="column-title">No</th>
                                        <th class="column-title">Aspek</th>
                                        <th class="column-title">Faktor</th>
                                    </tr>
                                </thead>
                                <tbody id="list-table">
                                    <tr>
                                        <td>1</td>
                                        <td>Tempat Kerja</td>
                                        <td>
                                            <select v-model="lingkunganKerja.tempat_kerja" class="form-control form-control-sm">
                                                <option value="Dalam Ruangan" selected>Dalam Ruangan</option>
                                                <option value="Luar Ruangan">Luar Ruangan</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Suhu</td>
                                        <td>
                                            <select v-model="lingkunganKerja.suhu" class="form-control form-control-sm">
                                                <option value="Normal" selected>Normal</option>
                                                <option value="Di Bawah Normal">Di Bawah Normal</option>
                                                <option value="Di Atas Normal">Di Atas Normal</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Udara</td>
                                        <td>
                                            <select v-model="lingkunganKerja.udara" class="form-control form-control-sm">
                                                <option value="Normal" selected>Normal</option>
                                                <option value="Tidak Normal">Tidak Normal</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Keadaan Ruangan</td>
                                        <td>
                                            <select v-model="lingkunganKerja.keadaan_ruangan" class="form-control form-control-sm">
                                                <option value="Memadai" selected>Memadai</option>
                                                <option value="Kurang Memadai">Kurang Memadai</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Letak</td>
                                        <td>
                                            <select v-model="lingkunganKerja.letak" class="form-control form-control-sm">
                                                <option value="Strategis" selected>Strategis</option>
                                                <option value="Kurang Strategis">Kurang Strategis</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Penerangan</td>
                                        <td>
                                            <select v-model="lingkunganKerja.penerangan" class="form-control form-control-sm">
                                                <option value="Cukup" selected>Cukup</option>
                                                <option value="Kurang">Kurang</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>7</td>
                                        <td>Suara</td>
                                        <td>
                                            <select v-model="lingkunganKerja.suara" class="form-control form-control-sm">
                                                <option value="Tenang/Tidak Bising" selected>Tenang/Tidak Bising</option>
                                                <option value="Bising">Bising</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>8</td>
                                        <td>Keadaan Tempat Kerja</td>
                                        <td>
                                            <select v-model="lingkunganKerja.keadaan_tempat_kerja" class="form-control form-control-sm">
                                                <option value="Bersih" selected>Bersih</option>
                                                <option value="Kurang Bersih">Kurang Bersih</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>9</td>
                                        <td>Getaran</td>
                                        <td>
                                            <select v-model="lingkunganKerja.getaran" class="form-control form-control-sm">
                                                <option value="Ada" selected>Ada</option>
                                                <option value="Tidak Ada">Tidak Ada</option>
                                            </select>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="resiko-bahaya">
                            <h6>14. Resiko Bahaya</h6>
                            <div class="row-controller d-flex justify-content-start">
                                <button @click="addRow($event, 'resiko-bahaya')" class="btn btn-info btn-sm">Tambah Baris</button>
                                <button @click="deleteRow($event, 'resiko-bahaya')" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                            </div>
                            <table class="table table-bordered table-sm table-hover table-responsive-xl">
                                <thead>
                                    <tr class="table-head">
                                        <th class="column-title">Nama Resiko</th>
                                        <th class="column-title">Penyebab</th>
                                    </tr>
                                </thead>
                                <tbody id="list-table-resiko">
                                    <tr v-if="resikoBahaya.length === 0">
                                        <td colspan="2">Belum mengisi resiko bahaya</td>
                                    </tr>
                                    <tr class="row-list-resiko" v-for="(resikoBahaya) in resikoBahaya" :key="resikoBahaya.id_resiko_bahaya">
                                        <td><textarea v-model="resikoBahaya.nama_resiko" class="form-control form-control-sm nama-resiko" rows="1"></textarea></td>
                                        <td><textarea v-model="resikoBahaya.penyebab" class="form-control form-control-sm penyebab" rows="1"></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="saveAll" class="btn btn-warning btn-save">Edit</button>
                        <button @click="continuePage" class="btn btn-primary btn-continue">Continue</button>
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
            masterTanggungJawab: [],
            masterTanggungJawabLoaded: false,
            masterWewenang: [],
            masterWewenangLoaded: false,
            tanggungJawab: [],
            tanggungJawabDb: [],
            tanggungJawabBuffer: [],
            tanggungJawabLainnya: [],
            tanggungJawabLainnyaDb: [],
            tanggungJawabLainnyaBuffer: [],
            tanggungJawabLoaded: false,
            wewenang: [],
            wewenangDb: [],
            wewenangBuffer: [],
            wewenangLainnya: [],
            wewenangLainnyaDb: [],
            wewenangLainnyaBuffer: [],
            wewenangLoaded: false,
            korelasiJabatan: [],
            korelasiJabatanDb: [],
            korelasiJabatanBuffer: [],
            korelasiJabatanLoaded: false,
            lingkunganKerja: {},
            lingkunganKerjaDb: {},
            lingkunganKerjaLoaded: false,
            resikoBahaya: [],
            resikoBahayaDb: [],
            resikoBahayaBuffer: [],
            resikoBahayaLoaded: false,
        };
    },
    mounted () {
        this.checkAuthentication()
        this.getData()          
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        goToPreviousPage () {
            this.$router.go(-1)
        },

        addRow (e, param) {
            if (param === 'tanggung-jawab') {
                this.tanggungJawabLainnya.push({
                    tanggung_jawab: null,
                    is_lainnya: true
                })
            } else if (param === 'wewenang') {
                this.wewenangLainnya.push({
                    wewenang: null,
                    is_lainnya: true
                })
            } else if (param === 'korelasi-jabatan') {
                this.korelasiJabatan.push({
                    nama_jabatan: null,
                    unit_kerja: null,
                    dalam_hal: null
                })
            } else if (param === 'resiko-bahaya') {
                this.resikoBahaya.push({
                    nama_resiko: null,
                    penyebab: null
                })
            }
            e.preventDefault()
        },

        deleteRow (e, param) {
            if (param === 'tanggung-jawab') {
                this.tanggungJawabLainnya.pop()
            } else if (param === 'wewenang') {
                this.wewenangLainnya.pop()
            } else if (param === 'korelasi-jabatan') {
                this.korelasiJabatan.pop()
            } else if (param === 'resiko-bahaya') {
                this.resikoBahaya.pop()
            }
            e.preventDefault()
        },

        async getData () {
            await this.getJabatan()
            await Promise.all([
                this.getTanggungJawab(),
                this.getWewenang(),
                this.getKorelasiJabatan(),
                this.getLingkunganKerja(),
                this.getResikoBahaya()
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

        async getTanggungJawab () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/tanggung-jawab`, config);
                this.masterTanggungJawab = responseMaster.data.data.tanggungJawab
                this.masterTanggungJawabLoaded = true

                const responseTanggungJawab = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/tanggung-jawab/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.tanggungJawab = responseTanggungJawab.data.data.tanggungJawab.filter(tanggungJawab => tanggungJawab.is_lainnya === false)
                this.tanggungJawabDb = responseTanggungJawab.data.data.tanggungJawab.filter(tanggungJawab => tanggungJawab.is_lainnya === false)
                this.tanggungJawabLainnya = responseTanggungJawab.data.data.tanggungJawab.filter(tanggungJawab => tanggungJawab.is_lainnya === true)
                this.tanggungJawabLainnyaDb = responseTanggungJawab.data.data.tanggungJawab.filter(tanggungJawab => tanggungJawab.is_lainnya === true)

                this.tanggungJawabLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.tanggungJawabLoaded = true
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

        async getWewenang () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/wewenang`, config);
                this.masterWewenang = responseMaster.data.data.wewenang
                this.masterWewenangLoaded = true

                const responseWewenang = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/wewenang/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.wewenang = responseWewenang.data.data.wewenang.filter(wewenang => wewenang.is_lainnya === false)
                this.wewenangDb = responseWewenang.data.data.wewenang.filter(wewenang => wewenang.is_lainnya === false)
                this.wewenangLainnya = responseWewenang.data.data.wewenang.filter(wewenang => wewenang.is_lainnya === true)
                this.wewenangLainnyaDb = responseWewenang.data.data.wewenang.filter(wewenang => wewenang.is_lainnya === true)

                this.wewenangLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.wewenangLoaded = true
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

        async getKorelasiJabatan () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseKorelasiJabatan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/korelasi-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.korelasiJabatan = responseKorelasiJabatan.data.data.korelasiJabatan
                this.korelasiJabatanDb = responseKorelasiJabatan.data.data.korelasiJabatan
                this.korelasiJabatanLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.korelasiJabatanLoaded = true
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

        async getLingkunganKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseLingkunganKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/lingkungan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                for (let i = 0; i < responseLingkunganKerja.data.data.lingkunganKerja.length; i++) {
                    this.lingkunganKerja[responseLingkunganKerja.data.data.lingkunganKerja[i].aspek] = responseLingkunganKerja.data.data.lingkunganKerja[i].faktor
                    this.lingkunganKerjaDb[responseLingkunganKerja.data.data.lingkunganKerja[i].aspek] = responseLingkunganKerja.data.data.lingkunganKerja[i].faktor
                }
                this.lingkunganKerjaLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.lingkunganKerjaLoaded = true
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

        async getResikoBahaya () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseResikoBahaya = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/resiko-bahaya/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.resikoBahaya = responseResikoBahaya.data.data.resikoBahaya
                this.resikoBahayaDb = responseResikoBahaya.data.data.resikoBahaya
                this.resikoBahayaLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.resikoBahayaLoaded = true
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

        async saveTanggungJawab () {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.tanggungJawab.length === 0) {
                await this.badRequestException("Tanggung jawab harus diisi minimal satu")
            }

            if (this.tanggungJawabDb.length !== 0 || this.tanggungJawabBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/tanggung-jawab/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            for (let i = 0; i < this.tanggungJawab.length; i++) {
                const payloadTanggungJawab = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idtanggungjawab: this.tanggungJawab[i].id_tanggung_jawab
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/tanggung-jawab`, payloadTanggungJawab, config)
                .then(
                    this.tanggungJawabBuffer.push(this.tanggungJawab[i].id_tanggung_jawab)
                )
            }

            for (let i = 0; i < this.tanggungJawabLainnya.length; i++) {
                const payloadTanggungJawab = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idsatker: this.dataJabatan[0].id_satker,
                    tanggungjawab: this.tanggungJawabLainnya[i].tanggung_jawab,
                    islainnya: true
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/tanggung-jawab-lainnya`, payloadTanggungJawab, config)
                .then(
                    this.tanggungJawabLainnyaBuffer.push(this.tanggungJawabLainnya[i].tanggung_jawab)
                )
            }
        },

        async saveWewenang () {
            const token = localStorage.getItem('token');
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.wewenang.length === 0) {
                await this.badRequestException("Wewenang harus diisi minimal satu")
            }

            if (this.wewenangDb.length !== 0 || this.wewenangBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/wewenang/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            for (let i = 0; i < this.wewenang.length; i++) {
                const payloadWewenang = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idwewenang: this.wewenang[i].id_wewenang
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/wewenang`, payloadWewenang, config)
                .then(
                    this.wewenangBuffer.push(this.wewenang[i].id_wewenang)
                )
            }

            for (let i = 0; i < this.wewenangLainnya.length; i++) {
                const payloadWewenang = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idsatker: this.dataJabatan[0].id_satker,
                    wewenang: this.wewenangLainnya[i].wewenang,
                    islainnya: true
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/wewenang-lainnya`, payloadWewenang, config)
                .then(
                    this.wewenangLainnyaBuffer.push(this.wewenangLainnya[i].wewenang)
                )
            }
        },

        async saveKorelasiJabatan () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.korelasiJabatan.length === 0) {
                await this.badRequestException("Korelasi jabatan harus diisi minimal satu")
            }

            if (this.korelasiJabatanDb.length !== 0 || this.korelasiJabatanBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/korelasi-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }

            for (let i = 0; i < this.korelasiJabatan.length; i++) {
                const payloadKorelasiJabatan = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    namajabatan: this.korelasiJabatan[i].nama_jabatan,
                    unitkerja: this.korelasiJabatan[i].unit_kerja,
                    dalamhal: this.korelasiJabatan[i].dalam_hal
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/korelasi-jabatan`, payloadKorelasiJabatan, config)
                .then(
                    this.korelasiJabatanBuffer.push(this.korelasiJabatan[i].nama_jabatan)
                )
            }
        },

        async saveLingkunganKerja () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (Object.keys(this.lingkunganKerjaDb).length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/lingkungan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }

            let lingkunganKerjaKeys = Object.keys(this.lingkunganKerja)

            for (let i = 0; i < lingkunganKerjaKeys.length; i++) {
                const payloadLingkunganKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    aspek: lingkunganKerjaKeys[i],
                    faktor: this.lingkunganKerja[lingkunganKerjaKeys[i]]
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/lingkungan-kerja`, payloadLingkunganKerja, config)
            }
        },

        async saveResikoBahaya () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.resikoBahaya.length === 0) {
                await this.badRequestException("Resiko bahaya harus diisi minimal satu")
            }

            if (this.resikoBahayaDb.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/resiko-bahaya/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }

            for (let i = 0; i < this.resikoBahaya.length; i++) {
                const payloadResikoBahaya = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    namaresiko: this.resikoBahaya[i].nama_resiko,
                    penyebab: this.resikoBahaya[i].penyebab,
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/resiko-bahaya`, payloadResikoBahaya, config)
                .then(
                    this.resikoBahayaBuffer.push(this.resikoBahaya[i].nama_resiko)
                )
            }
        },

        async saveLog () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
                
            const payloadLog = {
                idjabatan: this.dataJabatan[0].id_jabatan,
                event: 'Telah mengubah form Tanggung Jawab'
            }

            await axios.post(`${process.env.VUE_APP_BACKENDHOST}/log-analisis`, payloadLog, config)
        },

        async saveAll () {
            this.$swal.fire({
                text: 'Loading....',
                showConfirmButton: false
            })

            await Promise.all([
                this.saveTanggungJawab(),
                this.saveWewenang(),
                this.saveKorelasiJabatan(),
                this.saveLingkunganKerja(),
                this.saveResikoBahaya()
            ])
            .then(
                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Berhasil Diubah'
                })            
            )
            .then(
                this.saveLog()
            )
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
        },

        continuePage () {
            this.$router.push({ name: 'VerifikasiSyaratJabatan', params: { jabatanid: this.jabatanId } })

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
    /* padding: 10px; */
    vertical-align: middle;
}

.action-button {
    padding: 5px;
}

.row-controller .btn {
    margin-bottom: 0;
}

.btn-continue {
    margin-left: 10px;
}
</style>
  