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
                    </form>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="saveAll" class="btn btn-success btn-save">Save</button>
                        <button class="btn btn-primary btn-continue">Save & Send</button>
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
// import VueMultiselect from 'vue-multiselect'

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        // VueMultiselect
    },
    data() {
        return {
            jabatanId: this.$route.params.jabatanid,
            dataJabatan: [],
            jabatanLoaded: false,
            keterampilanKerja: [],
            keterampilanKerjaDb: [],
            keterampilanKerjaLoaded: false
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
                this.getKeterampilanKerja()
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

        async saveKeterampilanKerja () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
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

                if (this.keterampilanKerjaDb.length !== 0) {
                    await axios.delete(`${process.env.VUE_APP_BACKENDHOST}/keterampilan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
                }

                for (let i = 0; i < keterampilanKerjaList.length; i++) {
                    const payloadKeterampilanKerja = {
                        idjabatan: this.dataJabatan[0].id_jabatan,
                        keterampilankerja: keterampilanKerjaList[i]
                    }

                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/keterampilan-kerja`, payloadKeterampilanKerja, config)
                }
            } catch (error) {
                if (error.response.status === 404) {
                    this.keterampilanKerjaLoaded = true
                } else if (error.response.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Keterampilan kerja error ' + error.response.data.message
                    })
                }
            }
        },

        async saveAll () {
            this.$swal.fire({
                text: 'Loading....',
                showConfirmButton: false
            })

            await Promise.all([
                this.saveKeterampilanKerja()
            ]).then(
                this.$swal.fire({
                icon: 'success',
                title: 'Success',
                text: 'Data Berhasil Disimpan'
            }))
        },

        async saveSend () {
            await this.saveAll ()
            .then(this.$router.push({ name: 'AnalisisTanggungJawab', params: { jabatanid: this.jabatanId } }))
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
  