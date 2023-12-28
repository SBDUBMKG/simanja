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
                    <table v-if="jabatanLoaded">
                        <tr>
                            <td>1.</td>
                            <td>Nama Jabatan</td>
                            <td width="70%">
                                <input v-model="dataJabatan[0].fungsional" type="text" name="" id="nama-jabatan" class="form-control form-control-sm" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td>2.</td>
                            <td>Kode Jabatan</td>
                            <td>
                                <input :value="`${dataJabatan[0].id_satker}.${dataJabatan[0].id_fungsional}`" type="text" name="" id="kode-jabatan" class="form-control form-control-sm" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td>3.</td>
                            <td>Unit Kerja</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>a. JPT Utama</td>
                            <td>
                                <input v-model="jptUtama" type="text" name="" id="jpt-utama" class="form-control form-control-sm" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>b. JPT Madya</td>
                            <td>
                                <select v-model="dataJabatan[0].jpt_madya" class="form-control form-control-sm" id="jpt-madya">
                                    <option value="-" selected>-</option>
                                    <option value="Sekretariat Utama">Sekretariat Utama</option>
                                    <option value="Deputi Bidang Meteorologi">Deputi Bidang Meteorologi</option>
                                    <option value="Deputi Bidang Klimatologi">Deputi Bidang Klimatologi</option>
                                    <option value="Deputi Bidang Geofisika">Deputi Bidang Geofisika</option>
                                    <option value="Deputi Bidang Instrumentasi Kalibrasi Rekayasa dan Jaringan Komunikasi">Deputi Bidang Instrumentasi Kalibrasi Rekayasa dan Jaringan Komunikasi</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>c. JPT Pratama</td>
                            <td>
                                <input v-model="dataJabatan[0].jpt_pratama" type="text" name="" id="jpt-pratama" class="form-control form-control-sm">
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>d. Administrator</td>
                            <td>
                                <input v-model="dataJabatan[0].administrator" type="text" name="" id="administrator" class="form-control form-control-sm">
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>e. Pengawas</td>
                            <td>
                                <input v-model="dataJabatan[0].pengawas" type="text" name="" id="pengawas" class="form-control form-control-sm">
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>f. Pelaksana</td>
                            <td>
                                <input v-model="dataJabatan[0].pelaksana" type="text" name="" id="pelaksana" class="form-control form-control-sm">
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>g. Jabatan Fungsional</td>
                            <td>
                                <!-- <input v-model="dataJabatan[0].jabatan_fungsional" type="text" name="" id="jabatan-fungsional" class="form-control form-control-sm"> -->
                                <input v-model="dataJabatan[0].fungsional" type="text" name="" id="nama-jabatan" class="form-control form-control-sm" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td>4.</td>
                            <td>Ikhtisar Jabatan</td>
                            <td v-if="masterIkhtisarJabatanLoaded">
                                <div class="form-check" v-for="(ikhtisar) in masterIkhtisarJabatan" :key="ikhtisar.id_ikhtisar_jabatan">
                                    <input v-model="ikhtisarJabatan" class="form-check-input" type="checkbox" :value="ikhtisar.id_ikhtisar_jabatan" :id="ikhtisar.id_ikhtisar_jabatan + '-ikhtisar'" checked>
                                    <label class="form-check-label" :for="ikhtisar.id_ikhtisar_jabatan + '-ikhtisar'">
                                        {{ ikhtisar.ikhtisar_jabatan }}
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td>5.</td>
                            <td>Kualifikasi Jabatan</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>a. Pendidikan Formal</td>
                            <td v-if="masterPendidikanFormalLoaded">
                                <div class="form-check" v-for="pendidikan in masterPendidikanFormal" :key="pendidikan.id_pendidikan">
                                    <input v-model="pendidikanFormal" class="form-check-input" type="checkbox" :value="pendidikan.id_pendidikan" :id="pendidikan.id_pendidikan + '-pendidikanformal'" checked>
                                    <label class="form-check-label" :for="pendidikan.id_pendidikan + '-pendidikanformal'">
                                        {{ pendidikan.pendidikan }}
                                    </label>
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>b. Pendidikan dan Pelatihan</td>
                            <td v-if="masterDiklatLoaded">
                                <VueMultiselect
                                    v-model="diklat"
                                    :options="masterDiklat"
                                    :multiple="true"
                                    :taggable="true"
                                    @tag="addTag"
                                    tag-placeholder="Pilih Diklat"
                                    placeholder="Cari Diklat"
                                    label="diklat"
                                    track-by="id_diklat"
                                />
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>c. Pengalaman Kerja</td>
                            <td v-if="masterPengalamanLoaded">
                                <div class="form-check" v-for="pengalamanList in masterPengalaman" :key="pengalamanList.id_pengalaman">
                                    <input v-model="pengalaman" class="form-check-input" type="radio" :value="pengalamanList.id_pengalaman" :id="pengalamanList.id_pengalaman + '-pengalaman'">
                                    <label class="form-check-label" :for="pengalamanList.id_pengalaman + '-pengalaman'">
                                        {{ pengalamanList.pengalaman }}
                                    </label>
                                </div>
                            </td>
                        </tr>
                    </table>
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
            masterIkhtisarJabatan: [],
            masterIkhtisarJabatanLoaded: false,
            masterPendidikanFormal: [],
            masterPendidikanFormalLoaded: false,
            masterDiklat: [],
            masterDiklatLoaded: false,
            masterPengalaman: [],
            masterPengalamanLoaded: false,
            jptUtama: 'Badan Meteorologi, Klimatologi, dan Geofisika',
            ikhtisarJabatan: [],
            ikhtisarJabatanDb: [],
            ikhtisarJabatanLoaded: false,
            pendidikanFormal: [],
            pendidikanFormalDb: [],
            pendidikanFormalLoaded: false,
            diklat: [],
            diklatDb: [],
            diklatLoaded: false,
            pengalaman: '',
            pengalamanDb: '',
            pengalamanLoaded: false
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

        addTag (newTag) {
            const tag = {
                diklat: newTag,
                id_diklat: newTag.substring(0, 2) + Math.floor((Math.random() * 10000000))
            }
            // this.masterDiklat.push(tag)
            this.diklat.push(tag)
        },

        async getData () {
            await this.getJabatan()
            await Promise.all([
                this.getIkhtisarJabatan(),
                this.getPendidikanFormal(),
                this.getDiklat(),
                this.getPengalaman()
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

        async getIkhtisarJabatan () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/ikhtisar-jabatan/fungsional/${this.dataJabatan[0].id_fungsional}`, config)
                this.masterIkhtisarJabatan = responseMaster.data.data.ikhtisarJabatan
                this.masterIkhtisarJabatanLoaded = true
                
                const responseIkhtisar = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/ikhtisar-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                for (let i = 0; i < responseIkhtisar.data.data.ikhtisarJabatan.length; i++) {
                    this.ikhtisarJabatan.push(responseIkhtisar.data.data.ikhtisarJabatan[i].id_ikhtisar_jabatan)
                    this.ikhtisarJabatanDb.push(responseIkhtisar.data.data.ikhtisarJabatan[i].id_ikhtisar_jabatan)
                }
                this.ikhtisarJabatanLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.masterIkhtisarJabatanLoaded = true
                    this.ikhtisarJabatanLoaded = true
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

        async getPendidikanFormal () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/pendidikan/fungsional/${this.dataJabatan[0].id_fungsional}`, config);
                this.masterPendidikanFormal = responseMaster.data.data.pendidikan
                this.masterPendidikanFormalLoaded = true

                const responsePendidikan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/pendidikan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                for (let i = 0; i < responsePendidikan.data.data.pendidikan.length; i++) {
                    this.pendidikanFormal.push(responsePendidikan.data.data.pendidikan[i].id_pendidikan)
                    this.pendidikanFormalDb.push(responsePendidikan.data.data.pendidikan[i].id_pendidikan)
                }
                this.pendidikanFormalLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.masterPendidikanFormalLoaded = true
                    this.pendidikanFormalLoaded = true
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

        async getDiklat () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/diklat`, config);
                this.masterDiklat = responseMaster.data.data.diklat
                this.masterDiklatLoaded = true

                const responseDiklat = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/diklat/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                for (let i = 0; i < responseDiklat.data.data.diklat.length; i++) {
                    this.diklat.push(responseDiklat.data.data.diklat[i])
                    this.diklatDb.push(responseDiklat.data.data.diklat[i].id_diklat)
                }
                this.diklatLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.masterDiklatLoaded = true
                    this.diklatLoaded = true
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

        async getPengalaman () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const responseMaster = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/pengalaman`, config);
                this.masterPengalaman = responseMaster.data.data.pengalaman
                this.masterPengalamanLoaded = true

                const responsePengalaman = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/pengalaman-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                
                this.pengalaman = responsePengalaman.data.data.pengalamanKerja[0].id_pengalaman
                this.pengalamanDb = responsePengalaman.data.data.pengalamanKerja[0].id_pengalaman
                
                this.pengalamanLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.masterPengalamanLoaded = true
                    this.pengalamanLoaded = true
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

        async saveJabatan () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const payload = {
                idfungsional: this.dataJabatan[0].id_fungsional,
                jptutama: this.jptUtama,
                jptmadya: this.dataJabatan[0].jpt_madya,
                jptpratama: this.dataJabatan[0].jpt_pratama,
                administrator: this.dataJabatan[0].administrator,
                pengawas: this.dataJabatan[0].pengawas,
                pelaksana: this.dataJabatan[0].pelaksana,
                jabfung: this.dataJabatan[0].fungsional,
                tahunjabatan: this.dataJabatan[0].tahun_jabatan
            }

            await axios.put(`${process.env.VUE_APP_BACKENDHOST}/jabatan/${this.dataJabatan[0].id_jabatan}`, payload, config)
        },

        async saveIkhtisarJabatan () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.ikhtisarJabatan.length === 0) {
                await this.badRequestException("Ikhtisar jabatan wajib diisi")
            }

            if (this.ikhtisarJabatanDb.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/ikhtisar-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }

            for (let i = 0; i < this.ikhtisarJabatan.length; i++) {
                const payloadIkhtisar = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idikhtisarjabatan: this.ikhtisarJabatan[i]
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/ikhtisar-jabatan`, payloadIkhtisar, config)
                this.ikhtisarJabatanDb = this.ikhtisarJabatan[i]
            }
        },

        async savePendidikanFormal () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.pendidikanFormal.length === 0) {
                await this.badRequestException("Pendidikan formal wajib diisi")
            }

            if (this.pendidikanFormalDb.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/pendidikan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
    
            for (let i = 0; i < this.pendidikanFormal.length; i++) {
                const payloadPendidikan = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    idpendidikan: this.pendidikanFormal[i]
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/pendidikan`, payloadPendidikan, config)
                this.pendidikanFormalDb.push(this.pendidikanFormal[i])
            }
        },

        async saveDiklat () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.diklat.length === 0) {
                await this.badRequestException("Diklat harus diisi minimal satu")
            }

            if (this.diklatDb.length !== 0) {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/diklat/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }

            for (let i = 0; i < this.diklat.length; i++) {
                const payloadDiklat = {
                    idjabatan: this.dataJabatan[0].id_jabatan,
                    iddiklat: this.diklat[i].id_diklat
                }
                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/diklat`, payloadDiklat, config)
                this.diklatDb.push(this.diklat[i].id_diklat)
            }
        },

        async savePengalaman () {
            const token = localStorage.getItem('token');

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            if (this.pengalaman === '') {
                await this.badRequestException("Pengalaman tidak boleh kosong")
            }

            if (this.pengalamanDb !== '') {
                await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/pengalaman-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            }
                
            const payloadPengalaman = {
                idjabatan: this.dataJabatan[0].id_jabatan,
                idpengalamankerja: this.pengalaman
            }
            await axios.post(`${process.env.VUE_APP_BACKENDHOST}/pengalaman-kerja`, payloadPengalaman, config)
            this.pengalamanDb = this.pengalaman
        },

        async saveAll (action) {
            this.$swal.fire({
                text: 'Loading....',
                showConfirmButton: false
            })

            await Promise.all([
                this.saveJabatan(),
                this.saveIkhtisarJabatan(),
                this.savePendidikanFormal(),
                this.saveDiklat(),
                this.savePengalaman()
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
                    this.$router.push({ name: 'AnalisisTugas', params: { jabatanid: this.jabatanId } })
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
  