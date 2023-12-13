<template>
    <div>
        <div class="container-add-data-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Data Jabatan</h2>
                    <h6 class="subtitle-content">Tambah Data Jabatan</h6>
                    <table>
                        <tr>
                            <td>Nama Jabatan</td>
                            <td v-if="fungsionalLoaded">
                                <!-- <select v-model="jabatanFungsional" class="form-control form-control-sm" id="jabatan-fungsional">
                                    <option v-for="fungsional in daftarFungsional" :key="fungsional.id_fungsional" :value="fungsional.id_fungsional">{{ fungsional.fungsional }}</option>
                                </select> -->
                                <model-list-select
                                    :list="daftarFungsional"
                                    v-model="jabatanFungsional"
                                    option-value="id_fungsional"
                                    option-text="fungsional"
                                    placeholder="Pilih Jabatan Fungsional">
                                </model-list-select>
                            </td>
                        </tr>
                        <tr>
                            <td>Kode Jabatan</td>
                            <td>
                                <input :value="jabatanFungsional.id_fungsional" type="text" name="" id="kode-jabatan" class="form-control" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td>Unit Kerja</td>
                            <td v-if="stationLoaded">
                                <input :value="satker[0].satker" type="text" name="" id="unit-kerja" class="form-control" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td>Tahun Jabatan</td>
                            <td>
                                <input v-model="tahunJabatan" type="number" name="" id="tahun-jabatan" class="form-control">
                            </td>
                        </tr>
                    </table>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="addJabatan" class="btn btn-success btn-save">Save</button>
                        <button @click="addContinue" class="btn btn-primary btn-continue">Save & Continue</button>
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
import { ModelListSelect } from 'vue-search-select'
import 'vue-search-select/dist/VueSearchSelect.css'

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        ModelListSelect
    },
    data() {
        return {
            jabatanFungsional: {},
            daftarFungsional: [],
            fungsionalLoaded: false,
            satker: [],
            stationLoaded: false,
            tahunJabatan: null,
            jabatanId: null
        };
    },
    mounted () {
        this.checkAuthentication()
        this.getFungsional()
        this.getStation()
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

        async getFungsional () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/fungsional`, config);

                this.daftarFungsional = response.data.data.fungsional
                this.fungsionalLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.fungsionalLoaded = true
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

        async getStation () {
            try {
                const token = localStorage.getItem('token');
                const idSatker = localStorage.getItem('idsatker');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/satker/id/${idSatker}`, config);

                this.satker = response.data.data.satker
                this.stationLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.stationLoaded = true
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

        async addJabatan() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const payload = {
                    idsatker: this.satker[0].id_satker,
                    idfungsional: this.jabatanFungsional.id_fungsional,
                    tahunjabatan: this.tahunJabatan
                }

                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/jabatan`, payload, config)
                .then((response) => this.jabatanId = response.data.data.jabatanId)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Jabatan Berhasil Ditambahkan'
                }).then(this.$router.push({ name: 'DataJabatan' }))

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

        async addContinue () {
            await this.addJabatan()
            await this.$router.push({ name: 'AnalisisBiodata', params: { jabatanid: this.jabatanId } })
        }
    },
};
</script>

<style scoped>
.container-add-data-jabatan {
    display: flex;
}

table {
    width: 100%;
}

tr td {
    padding: 10px;
}

.action-button {
    padding: 10px;
}

.btn-continue {
    margin-left: 10px;
}
</style>
  