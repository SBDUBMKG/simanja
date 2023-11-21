<template>
    <div>
        <div class="container-edit-master-perangkat-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Perangkat Kerja</h2>
                    <h6 class="subtitle-content">Edit Master Perangkat Kerja</h6>
                    <form v-if="perangkatKerjaLoaded">
                        <div class="form-group">
                            <label for="perangkat-kerja">Perangkat Kerja</label>
                            <textarea v-model="perangkatKerjaData.perangkat_kerja" class="form-control" id="perangkat-kerja" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="perangkat-kerja">Penggunaan</label>
                            <textarea v-model="perangkatKerjaData.penggunaan" class="form-control" id="penggunaan" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="savePerangkatKerja" class="btn btn-success">Save</button>
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
            perangkatKerjaId: this.$route.params.perangkatkerjaid,
            perangkatKerjaData: null,
            perangkatKerjaLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadPerangkatKerjaData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadPerangkatKerjaData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/perangkat-kerja/id/${this.perangkatKerjaId}`, config);
                
                this.perangkatKerjaData = response.data.data.perangkatKerja[0]
                this.perangkatKerjaLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.dataLoaded = true
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

        goToPreviousPage () {
            this.$router.go(-1)
        },

        async savePerangkatKerja () {
            const perangkatKerja = this.perangkatKerjaData.perangkat_kerja
            const penggunaan = this.perangkatKerjaData.penggunaan

            if (perangkatKerja === '' || penggunaan === '') {
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
                    idfungsional: this.perangkatKerjaData.id_fungsional,
                    perangkatkerja: perangkatKerja,
                    penggunaan: penggunaan
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/perangkat-kerja/${this.perangkatKerjaId}`, payload, config)
                console.log(payload)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Perangkat Kerja Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'PerangkatKerjaDetail', params: { fungsionalid: this.perangkatKerjaData.id_fungsional } }))
                
            } catch (error) {
                if (error.status === 401) {
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

<style scoped>
.container-edit-master-perangkat-kerja{
    display: flex;
}
</style>
  