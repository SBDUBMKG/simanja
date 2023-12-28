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
                    <h6>15. Syarat Jabatan</h6>
                    <form>
                        <div class="keterampilan-kerja">
                            <h6>a. Keterampilan Kerja</h6>
                            <div class="row-controller d-flex justify-content-start">
                                <button @click="addRowKeterampilan" class="btn btn-info btn-sm">Tambah Baris</button>
                                <button @click="deleteRowKeterampilan" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                            </div>
                            <table class="table table-bordered table-sm table-hover table-responsive-xl">
                                <thead>
                                    <tr class="table-head">
                                        <th class="column-title">Keterampilan Kerja</th>
                                    </tr>
                                </thead>
                                <tbody id="list-table-keterampilan">
                                    <tr class="row-list-keterampilan" v-for="(keterampilanKerja) in keterampilanKerja" :key="keterampilanKerja.id_tbl_keterampilan">
                                        <td><textarea v-model="keterampilanKerja.keterampilan_kerja" class="form-control form-control-sm keterampilan-kerja" rows="1"></textarea></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="bakat-kerja">
                            <h6>b. Bakat Kerja</h6>
                            <VueMultiselect
                                v-model="bakatKerja"
                                :options="masterBakatKerja"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Bakat Kerja"
                                label="bakat_kerja"
                                track-by="bakat_kerja"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Bakat Kerja Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Bakat Kerja</th>
                                    <th>Uraian</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(bakatKerja, index) in bakatKerja" :key="bakatKerja.id_bakat_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ bakatKerja.bakat_kerja }}</td>
                                        <td>{{ bakatKerja.uraian }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="temperamen-kerja">
                            <h6>c. Temperamen Kerja</h6>
                            <VueMultiselect
                                v-model="temperamenKerja"
                                :options="masterTemperamenKerja"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Temperamen Kerja"
                                label="temperamen_kerja"
                                track-by="temperamen_kerja"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Temperamen Kerja Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Temperamen Kerja</th>
                                    <th>Uraian</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(temperamenKerja, index) in temperamenKerja" :key="temperamenKerja.id_temperamen_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ temperamenKerja.temperamen_kerja }}</td>
                                        <td>{{ temperamenKerja.uraian }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="minat-kerja">
                            <h6>d. Minat Kerja</h6>
                            <VueMultiselect
                                v-model="minatKerja"
                                :options="masterMinatKerja"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Minat Kerja"
                                label="minat_kerja"
                                track-by="minat_kerja"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Minat Kerja Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Minat Kerja</th>
                                    <th>Uraian</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(minatKerja, index) in minatKerja" :key="minatKerja.id_minat_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ minatKerja.minat_kerja }}</td>
                                        <td>{{ minatKerja.uraian }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="upaya-fisik">
                            <h6>e. Upaya Fisik</h6>
                            <VueMultiselect
                                v-model="upayaFisik"
                                :options="masterUpayaFisik"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Upaya Fisik"
                                label="upaya_fisik"
                                track-by="upaya_fisik"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Upaya Fisik Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Upaya Fisik</th>
                                    <th>Uraian</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(upayaFisik, index) in upayaFisik" :key="upayaFisik.id_tbl_upaya_fisik">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ upayaFisik.upaya_fisik }}</td>
                                        <td>{{ upayaFisik.uraian }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="kondisi-fisik">
                            <h6>f. Kondisi Fisik</h6>
                            <table class="table table-bordered table-sm table-responsive-xl">
                                <thead>
                                    <tr class="table-head">
                                        <th class="column-title" width="5%">No</th>
                                        <th class="column-title">Kondisi fisik</th>
                                        <th class="column-title">Uraian</th>
                                    </tr>
                                </thead>
                                <tbody id="list-table">
                                    <tr>
                                        <td>1</td>
                                        <td>Jenis Kelamin</td>
                                        <td>
                                            <input v-model="kondisiFisik['Jenis Kelamin']" type="text" class="form-control form-control-sm">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>2</td>
                                        <td>Umur</td>
                                        <td>
                                            <input v-model="kondisiFisik['Umur']" type="text" class="form-control form-control-sm">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>3</td>
                                        <td>Tinggi Badan</td>
                                        <td>
                                            <input v-model="kondisiFisik['Tinggi Badan']" type="text" class="form-control form-control-sm">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>4</td>
                                        <td>Berat Badan</td>
                                        <td>
                                            <input v-model="kondisiFisik['Berat Badan']" type="text" class="form-control form-control-sm">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>5</td>
                                        <td>Postur Badan</td>
                                        <td>
                                            <input v-model="kondisiFisik['Postur Badan']" type="text" class="form-control form-control-sm">
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>6</td>
                                        <td>Penampilan</td>
                                        <td>
                                            <input v-model="kondisiFisik['Penampilan']" type="text" class="form-control form-control-sm">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="fungsi-pekerjaan">
                            <h6>g. Fungsi Pekerjaan</h6>
                            <VueMultiselect
                                v-model="fungsiPekerjaan"
                                :options="masterFungsiPekerjaan"
                                :multiple="true"
                                :close-on-select="true"
                                :taggable="false"
                                placeholder="Pilih Fungsi Pekerjaan"
                                label="fungsi_pekerjaan"
                                track-by="fungsi_pekerjaan"
                            >
                                <template v-slot:selection="{ values, isOpen }"><span class="multiselect__single" v-if="values.length" v-show="!isOpen">{{ values.length }} Fungsi Pekerjaan Dipilih</span></template>
                            </VueMultiselect>
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Fungsi Pekerjaan</th>
                                    <th>Uraian</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(fungsiPekerjaan, index) in fungsiPekerjaan" :key="fungsiPekerjaan.id_tbl_fungsi_pekerjaan">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ fungsiPekerjaan.fungsi_pekerjaan }}</td>
                                        <td>{{ fungsiPekerjaan.uraian }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="prestasi dan kelas">
                            <table class="table table-borderless table-sm">
                                <tr>
                                    <td width="30%">
                                        <h6>16. Prestasi Kerja yang Diharapkan</h6>
                                    </td>
                                    <td>
                                        <select v-model="prestasiKerja" class="form-control form-control-sm">
                                            <option value="Sangat Baik" selected>Sangat Baik</option>
                                            <option value="Baik">Baik</option>
                                            <option value="Cukup Baik">Cukup Baik</option>
                                            <option value="Kurang Baik">Kurang Baik</option>
                                        </select>
                                    </td>
                                </tr>
                                <tr>
                                    <td width="30%">
                                        <h6>17. Kelas Jabatan</h6>
                                    </td>
                                    <td>
                                        <input v-model="kelasJabatan" type="number" class="form-control form-control-sm">
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="saveAll('save')" class="btn btn-success btn-save">Save</button>
                        <button @click="saveAll('continue')" class="btn btn-primary btn-continue">Save & Send</button>
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
            masterBakatKerja: [],
            masterBakatKerjaLoaded: false,
            masterTemperamenKerja: [],
            masterTemperamenKerjaLoaded: false,
            masterMinatKerja: [],
            masterMinatKerjaLoaded: false,
            masterUpayaFisik: [],
            masterUpayaFisikLoaded: false,
            masterFungsiPekerjaan: [],
            masterFungsiPekerjaanLoaded: false,
            keterampilanKerja: [],
            keterampilanKerjaDb: [],
            keterampilanKerjaBuffer: [],
            keterampilanKerjaLoaded: false,
            bakatKerja: [],
            bakatKerjaDb: [],
            bakatKerjaBuffer: [],
            bakatKerjaLoaded: false,
            temperamenKerja: [],
            temperamenKerjaDb: [],
            temperamenKerjaBuffer: [],
            temperamenKerjaLoaded: false,
            minatKerja: [],
            minatKerjaDb: [],
            minatKerjaBuffer: [],
            minatKerjaLoaded: false,
            upayaFisik: [],
            upayaFisikDb: [],
            upayaFisikBuffer: [],
            upayaFisikLoaded: false,
            kondisiFisik: {},
            kondisiFisikDb: {},
            kondisiFisikBuffer: [],
            kondisiFisikLoaded: false,
            fungsiPekerjaan: [],
            fungsiPekerjaanDb: [],
            fungsiPekerjaanBuffer: [],
            fungsiPekerjaanLoaded: false,
            prestasiKerja: '',
            prestasiKerjaDb: '',
            prestasiKerjaBuffer: '',
            prestasiKerjaLoaded: false,
            kelasJabatan: '',
            kelasJabatanDb: '',
            kelasJabatanBuffer: '',
            kelasJabatanLoaded: false,
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

        addRowKeterampilan (e) {
            const listKeterampilanKerja = document.getElementById("list-table-keterampilan")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm keterampilan-kerja" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list-keterampilan')

            listKeterampilanKerja.appendChild(row)
            e.preventDefault()
        },

        deleteRowKeterampilan (e) {
            const listKeterampilanKerja = document.getElementById("list-table-keterampilan")
            listKeterampilanKerja.removeChild(listKeterampilanKerja.lastElementChild)
            e.preventDefault()
        },

        async getData () {
            await this.getJabatan()
            await Promise.all([
                this.getKeterampilanKerja(),
                this.getBakatKerja(),
                this.getTemperamenKerja(),
                this.getMinatKerja(),
                this.getUpayaFisik(),
                this.getKondisiFisik(),
                this.getFungsiPekerjaan(),
                this.getPrestasiKerja(),
                this.getKelasJabatan()
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

        async getKeterampilanKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const responseKeterampilanKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/keterampilan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.keterampilanKerja = responseKeterampilanKerja.data.data.keterampilanKerja
                this.keterampilanKerjaDb = responseKeterampilanKerja.data.data.keterampilanKerja
                this.keterampilanKerjaLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.keterampilanKerjaLoaded = true
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

        async getBakatKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/bakat-kerja`, config);
                this.masterBakatKerja = responseMaster.data.data.bakatKerja
                this.masterBakatKerjaLoaded = true

                const responseBakatKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/bakat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.bakatKerja = responseBakatKerja.data.data.bakatKerja
                this.bakatKerjaDb = responseBakatKerja.data.data.bakatKerja
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
                        text: error.response.data.message
                    })
                }
            }
        },

        async getTemperamenKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/temperamen-kerja`, config);
                this.masterTemperamenKerja = responseMaster.data.data.temperamenKerja
                this.masterTemperamenKerjaLoaded = true

                const responseTemperamenKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/temperamen-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.temperamenKerja = responseTemperamenKerja.data.data.temperamenKerja
                this.temperamenKerjaDb = responseTemperamenKerja.data.data.temperamenKerja
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
                        text: error.response.data.message
                    })
                }
            }
        },

        async getMinatKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/minat-kerja`, config);
                this.masterMinatKerja = responseMaster.data.data.minatKerja
                this.masterMinatKerjaLoaded = true

                const responseMinatKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/minat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.minatKerja = responseMinatKerja.data.data.minatKerja
                this.minatKerjaDb = responseMinatKerja.data.data.minatKerja
                this.minatKerjaLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.minatKerjaLoaded = true
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

        async getUpayaFisik () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/upaya-fisik`, config);
                this.masterUpayaFisik = responseMaster.data.data.upayaFisik
                this.masterUpayaFisikLoaded = true

                const responseUpayaFisik = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/upaya-fisik/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.upayaFisik = responseUpayaFisik.data.data.upayaFisik
                this.upayaFisikDb = responseUpayaFisik.data.data.upayaFisik
                this.upayaFisikLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.upayaFisikLoaded = true
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

        async getKondisiFisik () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseKondisiFisik = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/kondisi-fisik/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                for (let i = 0; i < responseKondisiFisik.data.data.kondisiFisik.length; i++) {
                    this.kondisiFisik[responseKondisiFisik.data.data.kondisiFisik[i].kondisi_fisik] = responseKondisiFisik.data.data.kondisiFisik[i].uraian
                    this.kondisiFisikDb[responseKondisiFisik.data.data.kondisiFisik[i].kondisi_fisik] = responseKondisiFisik.data.data.kondisiFisik[i].uraian
                }
                this.kondisiFisikLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.kondisiFisikLoaded = true
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

        async getFungsiPekerjaan () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/fungsi-pekerjaan`, config);
                this.masterFungsiPekerjaan = responseMaster.data.data.fungsiPekerjaan
                this.masterFungsiPekerjaanLoaded = true

                const responseFungsiPekerjaan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/fungsi-pekerjaan/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.fungsiPekerjaan = responseFungsiPekerjaan.data.data.fungsiPekerjaan
                this.fungsiPekerjaanDb = responseFungsiPekerjaan.data.data.fungsiPekerjaan
                this.fungsiPekerjaanLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.upayaFisikLoaded = true
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

        async getPrestasiKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const responsePrestasiKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/prestasi-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.prestasiKerja = responsePrestasiKerja.data.data.prestasiKerja[0].prestasi_kerja
                this.prestasiKerjaDb = responsePrestasiKerja.data.data.prestasiKerja[0].prestasi_kerja
                this.prestasiKerjaLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.prestasiKerjaLoaded = true
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

        async getKelasJabatan () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const responseKelasJabatan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/kelas-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
                this.kelasJabatan = responseKelasJabatan.data.data.kelasJabatan[0].kelas_jabatan
                this.kelasJabatanDb = responseKelasJabatan.data.data.kelasJabatan[0].kelas_jabatan
                this.kelasJabatanLoaded = true

            } catch (error) {
                if (error.response.status === 404) {
                    this.kelasJabatanLoaded = true
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

        async saveKeterampilanKerja () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const keterampilanKerjaClass = document.getElementsByClassName('row-list-keterampilan')
            const keterampilanKerjaList = []

            for (let i=0; i < keterampilanKerjaClass.length; i++) {
                let keterampilanKerja = keterampilanKerjaClass[i].childNodes[0].childNodes[0].value
                if (keterampilanKerja === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom korelasi jabatan tidak boleh kosong'
                    })
                }
                keterampilanKerjaList.push(keterampilanKerja)
            }

            if (keterampilanKerjaList.length === 0) {
                await this.badRequestException("Keterampilan kerja harus diisi minimal satu")
            }

            if (this.keterampilanKerjaDb.length !== 0 || this.keterampilanKerjaBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/keterampilan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }

            for (let i = 0; i < keterampilanKerjaList.length; i++) {
                const payloadKeterampilanKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    keterampilankerja: keterampilanKerjaList[i]
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/keterampilan-kerja`, payloadKeterampilanKerja, config)
                .then(
                    this.keterampilanKerjaBuffer.push(keterampilanKerjaList[i])
                )
            }
        },

        async saveBakatKerja () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.bakatKerja.length === 0) {
                await this.badRequestException("Bakat kerja harus diisi minimal satu")
            }

            if (this.bakatKerjaDb.length !== 0 || this.bakatKerjaBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/bakat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            for (let i = 0; i < this.bakatKerja.length; i++) {
                const payloadBakatKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idbakatkerja: this.bakatKerja[i].id_bakat_kerja
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/bakat-kerja`, payloadBakatKerja, config)
                .then(
                    this.bakatKerjaBuffer.push(this.bakatKerja[i].id_bakat_kerja)
                )
            }
        },

        async saveTemperamenKerja () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.temperamenKerja.length === 0) {
                await this.badRequestException("Temperamen kerja harus diisi minimal satu")
            }

            if (this.temperamenKerjaDb.length !== 0 || this.temperamenKerjaBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/temperamen-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            for (let i = 0; i < this.temperamenKerja.length; i++) {
                const payloadTemperamenKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idtemperamenkerja: this.temperamenKerja[i].id_temperamen_kerja
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/temperamen-kerja`, payloadTemperamenKerja, config)
                .then(
                    this.temperamenKerjaBuffer.push(this.temperamenKerja[i].id_temperamen_kerja)
                )
            }
        },

        async saveMinatKerja () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.minatKerja.length === 0) {
                await this.badRequestException("Minat kerja harus diisi minimal satu")
            }

            if (this.minatKerjaDb.length !== 0 || this.minatKerjaBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/minat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            for (let i = 0; i < this.minatKerja.length; i++) {
                const payloadMinatKerja = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idminatkerja: this.minatKerja[i].id_minat_kerja
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/minat-kerja`, payloadMinatKerja, config)
                .then(
                    this.minatKerjaBuffer.push(this.minatKerja[i].id_minat_kerja)
                )
            }
        },

        async saveUpayaFisik () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.upayaFisik.length === 0) {
                await this.badRequestException("Upaya fisik harus diisi minimal satu")
            }

            if (this.upayaFisikDb.length !== 0 || this.upayaFisikBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/upaya-fisik/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            for (let i = 0; i < this.upayaFisik.length; i++) {
                const payloadUpayaFisik = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idupayafisik: this.upayaFisik[i].id_upaya_fisik
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/upaya-fisik`, payloadUpayaFisik, config)
                .then(
                    this.upayaFisikBuffer.push(this.upayaFisik[i].id_upaya_fisik)
                )
            }
        },

        async saveKondisiFisik () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (Object.keys(this.kondisiFisikDb).length !== 0 || this.kondisiFisikBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/kondisi-fisik/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }

            let kondisiFisikKeys = Object.keys(this.kondisiFisik)
            for (let i = 0; i < kondisiFisikKeys.length; i++) {
                const payloadKondisiFisik = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    kondisifisik: kondisiFisikKeys[i],
                    uraian: this.kondisiFisik[kondisiFisikKeys[i]]
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/kondisi-fisik`, payloadKondisiFisik, config)
                .then(
                    this.kondisiFisikBuffer.push(kondisiFisikKeys[i])
                )
            }
        },

        async saveFungsiPekerjaan () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.fungsiPekerjaan.length === 0) {
                await this.badRequestException("Fungsi pekerjaan harus diisi minimal satu")
            }

            if (this.fungsiPekerjaanDb.length !== 0 || this.fungsiPekerjaanBuffer.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/fungsi-pekerjaan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            for (let i = 0; i < this.fungsiPekerjaan.length; i++) {
                const payloadFungsiPekerjaan = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idfungsipekerjaan: this.fungsiPekerjaan[i].id_fungsi_pekerjaan
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/fungsi-pekerjaan`, payloadFungsiPekerjaan, config)
                .then(
                    this.fungsiPekerjaanBuffer.push(this.fungsiPekerjaan[i].id_fungsi_pekerjaan)
                )
            }
        },

        async savePrestasiKerja () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.prestasiKerja === '') {
                await this.badRequestException("Prestasi Kerja harus diisi")
            }

            if (this.prestasiKerjaDb !== '' || this.prestasiKerjaBuffer !== '') {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/prestasi-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            const payloadPrestasiKerja = {
                idjabatan: this.dataJabatan[0].id_jabatan,
                prestasikerja: this.prestasiKerja
            }

            await axios.post(`${process.env.VUE_APP_BACKENDHOST}/prestasi-kerja`, payloadPrestasiKerja, config)
            .then(
                this.prestasiKerjaBuffer = this.prestasikerja
            )
        },

        async saveKelasJabatan () {
            const token = localStorage.getItem('token')
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.kelasJabatan === '') {
                await this.badRequestException("Kelas jabatan harus diisi")
            }

            if (this.kelasJabatanDb !== '' || this.kelasJabatanBuffer !== '') {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/kelas-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
             
            const payloadKelasJabatan = {
                idjabatan: this.dataJabatan[0].id_jabatan,
                kelasjabatan: this.kelasJabatan
            }

            await axios.post(`${process.env.VUE_APP_BACKENDHOST}/kelas-jabatan`, payloadKelasJabatan, config)
            .then(
                this.kelasJabatanBuffer = this.kelasJabatan
            )
        },

        async saveAll (action) {
            this.$swal.fire({
                text: 'Loading....',
                showConfirmButton: false
            })

            await Promise.all([
                this.saveKeterampilanKerja(),
                this.saveBakatKerja(),
                this.saveTemperamenKerja(),
                this.saveMinatKerja(),
                this.saveUpayaFisik(),
                this.saveKondisiFisik(),
                this.saveFungsiPekerjaan(),
                this.savePrestasiKerja(),
                this.saveKelasJabatan()
            ]).then(
                this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data Berhasil Disimpan'
            }))
            .then(async () => {
                if (action === 'continue') {
                    await this.changStatusSendToVerificator()
                    .then (
                        this.$router.push({ name: 'AnalisisJabatan' })
                    )
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
        },

        async changStatusSendToVerificator () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
                 
                const payloadStatus = {
                    status: 'Sudah Dikirim'
                }
                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/jabatan/status/${this.dataJabatan[0].id_jabatan}`, payloadStatus, config)
                
            } catch (error) {
                if (error.response.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Status ' + error.response.data.message
                    })
                }
            }
        },

        // async saveSend () {
        //     await this.saveAll ()
        //     .then(
        //         await this.changStatusSendToVerificator()
        //     )
        //     .then(this.$router.push({ name: 'AnalisisJabatan' }))
        // }
    },
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
  