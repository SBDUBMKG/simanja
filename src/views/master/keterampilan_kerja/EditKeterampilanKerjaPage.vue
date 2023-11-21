<template>
    <div>
        <div class="container-edit-master-keterampilan-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Keterampilan Kerja</h2>
                    <h6 class="subtitle-content">Edit Master Keterampilan Kerja</h6>
                    <form v-if="keterampilanKerjaLoaded">
                        <div class="form-group">
                            <label for="keterampilan-kerja">Keterampilan Kerja</label>
                            <textarea v-model="keterampilanKerjaData.keterampilan_kerja" class="form-control" id="keterampilan-kerja" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveKeterampilanKerja" class="btn btn-success">Save</button>
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
            keterampilanKerjaId: this.$route.params.keterampilankerjaid,
            keterampilanKerjaData: null,
            keterampilanKerjaLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadKeterampilanKerjaData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadKeterampilanKerjaData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/keterampilan-kerja/id/${this.keterampilanKerjaId}`, config);
                
                this.keterampilanKerjaData = response.data.data.keterampilanKerja[0]
                this.keterampilanKerjaLoaded = true
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

        async saveKeterampilanKerja () {
            const keterampilanKerja = this.keterampilanKerjaData.keterampilan_kerja

            if (keterampilanKerja === '') {
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
                    idfungsional: this.keterampilanKerjaData.id_fungsional,
                    keterampilankerja: keterampilanKerja
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/keterampilan-kerja/${this.keterampilanKerjaId}`, payload, config)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Keterampilan Kerja Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'KeterampilanKerjaDetail', params: { fungsionalid: this.keterampilanKerjaData.id_fungsional } }))
                
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
.container-edit-master-keterampilan-kerja {
    display: flex;
}
</style>
  