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
                    <h6 v-if="jabatanLoaded" class="subtitle-content">{{ dataJabatan[0].fungsional }}</h6>
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
                            />
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Tanggung Jawab</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(tanggungJawab, index) in tanggungJawab" :key="tanggungJawab.id_tanggung_jawab">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ tanggungJawab.tanggung_jawab }}</td>
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
                            />
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Wewenang</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(wewenang, index) in wewenang" :key="wewenang.id_wewenang">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ wewenang.wewenang }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div class="korelasi-jabatan">
                            <h6>12. Korelasi Jabatan</h6>
                            <div class="row-controller d-flex justify-content-start">
                                <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                                <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
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
                                    <tr class="row-list" v-for="(korelasiJabatan) in korelasiJabatan" :key="korelasiJabatan.id_korelasi_jabatan">
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
                            <p>{{ lingkunganKerja }}</p>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="saveTanggungJawab" class="btn btn-success btn-save">Save</button>
                        <button class="btn btn-primary btn-continue">Save & Continue</button>
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
            tanggungJawabLoaded: false,
            wewenang: [],
            wewenangDb: [],
            wewenangLoaded: false,
            korelasiJabatan: [],
            korelasiJabatanDb: [],
            korelasiJabatanLoaded: false,
            lingkunganKerja: {},
            lingkunganKerjaDb: {},
            lingkunganKerjaLoaded: false,
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

        addRow (e) {
            const listFungsiPekerjaan = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm nama-jabatan" rows="1"></textarea></td>`
            html += `<td><textarea class="form-control form-control-sm unit-kerja" rows="1"></textarea></td>`
            html += `<td><textarea class="form-control form-control-sm dalam-hal" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listFungsiPekerjaan.appendChild(row)
            e.preventDefault()
        },

        deleteRow (e) {
            const listFungsiPekerjaan = document.getElementById("list-table")
            listFungsiPekerjaan.removeChild(listFungsiPekerjaan.lastElementChild)
            e.preventDefault()
        },

        async getData () {
            await this.getJabatan()
            await this.getTanggungJawab()
            await this.getWewenang()
            await this.getKorelasiJabatan()
            await this.getLingkunganKerja()
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
                        text: error.message
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
                this.tanggungJawab = responseTanggungJawab.data.data.tanggungJawab
                this.tanggungJawabDb = responseTanggungJawab.data.data.tanggungJawab
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
                        text: error.message
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
                this.wewenang = responseWewenang.data.data.wewenang
                this.wewenangDb = responseWewenang.data.data.wewenang
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
                        text: error.message
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
                        text: error.message
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
                        text: error.message
                    })
                }
            }
        },

        async saveTanggungJawab () {
            try {
                this.$swal.fire({
                    text: 'Loading....',
                    showConfirmButton: false
                })

                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                if (this.tanggungJawabDb.length !== 0) {
                    await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/tanggung-jawab/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                }
                 
                for (let i = 0; i < this.tanggungJawab.length; i++) {
                    const payloadTanggungJawab = {
                        idjabatan: this.dataJabatan[0].id_jabatan,
                        idtanggungjawab: this.tanggungJawab[i].id_tanggung_jawab
                    }
                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/tanggung-jawab`, payloadTanggungJawab, config)
                }

                if (this.wewenangDb.length !== 0) {
                    await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/wewenang/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                }
                 
                for (let i = 0; i < this.wewenang.length; i++) {
                    const payloadWewenang = {
                        idjabatan: this.dataJabatan[0].id_jabatan,
                        idwewenang: this.wewenang[i].id_wewenang
                    }
                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/wewenang`, payloadWewenang, config)
                }

                const korelasiJabatan = document.getElementsByClassName('row-list')
                const namaJabatanList = []
                const unitKerjaList = []
                const dalamHalList = []

                for (let i=0; i < korelasiJabatan.length; i++) {
                    let namaJabatan = korelasiJabatan[i].childNodes[0].childNodes[0].value
                    let unitKerja = korelasiJabatan[i].childNodes[1].childNodes[0].value
                    let dalamHal = korelasiJabatan[i].childNodes[2].childNodes[0].value

                    if (namaJabatan === '' || unitKerja === '' || dalamHal === "") {
                        return this.$swal.fire({
                            icon: 'info',
                            title: 'Warning!!',
                            text: 'Kolom korelasi jabatan tidak boleh kosong'
                        })
                    }

                    namaJabatanList.push(namaJabatan)
                    unitKerjaList.push(unitKerja)
                    dalamHalList.push(dalamHal)
                }

                if (this.korelasiJabatanDb.length !== 0) {
                    await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/korelasi-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                }

                for (let i = 0; i < namaJabatanList.length; i++) {
                    const payloadKorelasiJabatan = {
                        idjabatan: this.dataJabatan[0].id_jabatan,
                        namajabatan: namaJabatanList[i],
                        unitkerja: unitKerjaList[i],
                        dalamhal: dalamHalList[i]
                    }

                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/korelasi-jabatan`, payloadKorelasiJabatan, config)
                }

                console.log(Object.keys(this.lingkunganKerjaDb).length)

                if (Object.keys(this.lingkunganKerjaDb).length !== 0) {
                    await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/lingkungan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                }

                let lingkunganKerjaKeys = Object.keys(this.lingkunganKerja)

                console.log(lingkunganKerjaKeys)

                for (let i = 0; i < lingkunganKerjaKeys.length; i++) {
                    const payloadLingkunganKerja = {
                        idjabatan: this.dataJabatan[0].id_jabatan,
                        aspek: lingkunganKerjaKeys[i],
                        faktor: this.lingkunganKerja[lingkunganKerjaKeys[i]]
                    }

                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/lingkungan-kerja`, payloadLingkunganKerja, config)
                }

                
                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Berhasil Disimpan'
                })
                // .then((result) => {
                //     if (result.isConfirmed) {
                //         this.$router.go()
                //     }
                // });

            } catch (error) {
                if (error.response.status === 404) {
                    this.tanggungJawabLoaded = true
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

        async saveContinue () {
            await this.saveTugas ()
            await this.$router.push({ name: 'AnalisisTanggungJawab', params: { jabatanid: this.jabatanId } })
        }
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
  