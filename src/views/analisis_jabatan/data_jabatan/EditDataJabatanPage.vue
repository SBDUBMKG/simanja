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
                    <h6 class="subtitle-content">Edit Data Jabatan</h6>
                    <table v-if="jabatanLoaded">
                        <tr>
                            <td>Nama Jabatan</td>
                            <td>
                                <input v-model="jabatanData[0].fungsional" type="text" name="" id="nama-jabatan" class="form-control" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td>Kode Jabatan</td>
                            <td>
                                <input v-model="jabatanData[0].id_fungsional" type="text" name="" id="kode-jabatan" class="form-control" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td>Unit Kerja</td>
                            <td>
                                <input v-model="jabatanData[0].satker" type="text" name="" id="unit-kerja" class="form-control" disabled>
                            </td>
                        </tr>
                        <tr>
                            <td>Tahun Anjab</td>
                            <td>
                                <input v-model="jabatanData[0].tahun_jabatan" type="number" name="" id="tahun-jabatan" class="form-control">
                            </td>
                        </tr>
                    </table>
                    <div class="d-flex justify-content-end action-button">
                        <button @click="editJabatan" class="btn btn-success btn-save">Save</button>
                        <button @click="editContinue" class="btn btn-primary btn-continue">Save & Continue</button>
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

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
    },
    data() {
        return {
            jabatanId: this.$route.params.jabatanid,
            jabatanData: null,
            jabatanLoaded: false
        };
    },
    mounted () {
        this.checkAuthentication()
        this.getJabatan()
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

        async getJabatan () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/jabatan/id/${this.jabatanId}`, config);

                this.jabatanData = response.data.data.jabatan
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

        async editJabatan() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const payload = {
                    idfungsional: this.jabatanData[0].id_fungsional,
                    jptutama: this.jptUtama,
                    jptmadya: this.jabatanData[0].jpt_madya,
                    jptpratama: this.jabatanData[0].jpt_pratama,
                    administrator: this.jabatanData[0].administrator,
                    pengawas: this.jabatanData[0].pengawas,
                    pelaksana: this.jabatanData[0].pelaksana,
                    jabfung: this.jabatanData[0].jabatan_fungsional,
                    tahunjabatan: this.jabatanData[0].tahun_jabatan
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/jabatan/${this.jabatanId}`, payload, config);

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Jabatan Berhasil Diubah'
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

        async editContinue () {
            await this.editJabatan()
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
  