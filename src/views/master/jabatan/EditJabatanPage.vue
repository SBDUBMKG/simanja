<template>
    <div>
        <div class="container-edit-master-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Jabatan</h2>
                    <h6 class="subtitle-content">Edit Master Jabatan</h6>
                    <form v-if="fungsionalLoaded">
                        <div class="form-group">
                            <label for="id-fungsional">ID Fungsional</label>
                            <input type="text" v-model="fungsionalData.id_fungsional" class="form-control" id="id-fungsional"/>
                        </div>
                        <div class="form-group">
                            <label for="fungsional">Fungsional</label>
                            <textarea v-model="fungsionalData.fungsional" class="form-control" id="fungsional" rows="2"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="id-fungsional">Kelas Jabatan</label>
                            <input type="number" v-model="fungsionalData.job_grade" class="form-control" id="job-grade"/>
                        </div>
                        <div class="form-group">Is Aktif:
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="true" v-model="fungsionalData.is_aktif" />
                                <label class="form-check-label">True</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="false" v-model="fungsionalData.is_aktif" />
                                <label class="form-check-label">False</label>
                            </div>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveJabatan" class="btn btn-success">Save</button>
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
        SidebarMenu
    },
    data() {
        return {
            fungsionalId: this.$route.params.fungsionalid,
            fungsionalData: null,
            fungsionalLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadFungsionalData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadFungsionalData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/fungsional/id/${this.fungsionalId}`, config);
                
                this.fungsionalData = response.data.data.fungsional[0]
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

        goToPreviousPage () {
            this.$router.go(-1)
        },

        async saveJabatan () {
            const idFungsional = this.fungsionalData.id_fungsional
            const fungsional = this.fungsionalData.fungsional
            const jobGrade = this.fungsionalData.job_grade
            const isAktif = this.fungsionalData.is_aktif

            if (idFungsional === '' || fungsional === '' || isAktif === '') {
                return this.$swal.fire({
                    icon: 'info',
                    title: 'Warning!!',
                    text: 'Kolom tidak boleh kosong'
                })
            }

            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }

                const payload = {
                    idfungsional: idFungsional,
                    fungsional: fungsional,
                    jobgrade: jobGrade,
                    isaktif: isAktif
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/fungsional/${this.fungsionalId}`, payload, config)
                .then(
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Jabatan Fungsional Berhasil Diperbarui'
                    })
                )
                .then(this.$router.push({ name: 'Jabatan' }))
                
            } catch (error) {
                if (error.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                }
            }
        }
    },
};
</script>

<style scoped>
.container-edit-master-jabatan {
    display: flex;
}
</style>
  