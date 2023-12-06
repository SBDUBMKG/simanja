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
                    </form>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="saveTugas" class="btn btn-success btn-save">Save</button>
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
            masterTugas: [],
            masterTugasLoaded: false,
            tugas: [],
            tugasDb: [],
            tugasLoaded: false,
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

                console.log(this.tugas)

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
                
                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Data Berhasil Disimpan'
                }).then((result) => {
                    if (result.isConfirmed) {
                        this.$router.go()
                    }
                });

            } catch (error) {
                if (error.response.status === 404) {
                    this.pengalamanLoaded = true
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
    vertical-align: top;
}

.action-button {
    padding: 5px;
}

.btn-continue {
    margin-left: 10px;
}
</style>
  