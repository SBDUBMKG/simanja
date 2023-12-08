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
                            />
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
                                    <tr>
                                        <td colspan="6">Jumlah</td>
                                        <td><input type="number" class="form-control form-control-sm" disabled :value="tugas.reduce((a, b) => a + ((b.vol_hasil_kerja * b.waktu_penyelesaian) / b.waktu_efektif), 0)"></td>
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
                                    <tr v-for="(tugas, index) in tugas" :key="tugas.id_tugas">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ tugas.uraian_hasil_kerja }}</td>
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
                            />
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Bahan Kerja</th>
                                    <th>Penggunaan</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(bahanKerja, index) in bahanKerja" :key="bahanKerja.id_bahan_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ bahanKerja.bahan_kerja }}</td>
                                        <td>{{ bahanKerja.penggunaan }}</td>
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
                            />
                            <table class="table table-sm table-bordered table-responsive-xl display">
                                <thead class="table-head">
                                    <th>No</th>
                                    <th>Perangkat Kerja</th>
                                    <th>Penggunaan</th>
                                </thead>
                                <tbody>
                                    <tr v-for="(perangkatKerja, index) in perangkatKerja" :key="perangkatKerja.id_perangkat_kerja">
                                        <td>{{ index + 1 }}</td>
                                        <td>{{ perangkatKerja.perangkat_kerja }}</td>
                                        <td>{{ perangkatKerja.penggunaan }}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="saveTugas" class="btn btn-success btn-save">Save</button>
                        <button @click="saveContinue" class="btn btn-primary btn-continue">Save & Continue</button>
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
            tugasLoaded: false,
            bahanKerja: [],
            bahanKerjaDb: [],
            bahanKerjaLoaded: false,
            perangkatKerja: [],
            perangkatKerjaDb: [],
            perangkatKerjaLoaded: false,
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

        async getData () {
            await this.getJabatan()
            await this.getTugasPokok()
            await this.getBahanKerja()
            await this.getPerangkatKerja()
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
                this.tugas = responseTugas.data.data.tugas
                this.tugasDb = responseTugas.data.data.tugas
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
                        text: error.message
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
                this.bahanKerja = responseBahanKerja.data.data.bahanKerja
                this.bahanKerjaDb = responseBahanKerja.data.data.bahanKerja
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
                        text: error.message
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
                this.perangkatKerja = responsePerangkatKerja.data.data.perangkatKerja
                this.perangkatKerjaDb = responsePerangkatKerja.data.data.perangkatKerja
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
                        text: error.message
                    })
                }
            }
        },

        async saveTugas () {
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

                if (this.tugasDb.length !== 0) {
                    await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/tugas/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                }
                 
                for (let i = 0; i < this.tugas.length; i++) {
                    const payloadTugas = {
                        idjabatan: this.dataJabatan[0].id_jabatan,
                        idtugas: this.tugas[i].id_tugas,
                        volhasilkerja: this.tugas[i].vol_hasil_kerja
                    }
                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/tugas`, payloadTugas, config)
                }

                if (this.bahanKerjaDb.length !== 0) {
                    await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/bahan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                }
                 
                for (let i = 0; i < this.bahanKerja.length; i++) {
                    const payloadBahanKerja = {
                        idjabatan: this.dataJabatan[0].id_jabatan,
                        idbahankerja: this.bahanKerja[i].id_bahan_kerja
                    }
                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/bahan-kerja`, payloadBahanKerja, config)
                }

                if (this.perangkatKerjaDb.length !== 0) {
                    await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/perangkat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                }
                 
                for (let i = 0; i < this.perangkatKerja.length; i++) {
                    const payloadPerangkatKerja = {
                        idjabatan: this.dataJabatan[0].id_jabatan,
                        idperangkatkerja: this.perangkatKerja[i].id_perangkat_kerja
                    }
                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/perangkat-kerja`, payloadPerangkatKerja, config)
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
                    this.tugasLoaded = true
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
  