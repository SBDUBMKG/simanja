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
            wewenangLoaded: false
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
            await this.getTanggungJawab()
            await this.getWewenang()
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
  