<template>
    <div>
        <div class="container-edit-master-fungsi-pekerjaan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Fungsi Pekerjaan</h2>
                    <h6 class="subtitle-content">Edit Master Fungsi Pekerjaan</h6>
                    <form v-if="fungsiPekerjaanLoaded">
                        <div class="form-group">
                            <label for="fungsi-pekerjaan">Fungsi Pekerjaan</label>
                            <textarea v-model="fungsiPekerjaanData.fungsi_pekerjaan" class="form-control" id="fungsi-pekerjaan" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="fungsi-pekerjaan">Uraian</label>
                            <textarea v-model="fungsiPekerjaanData.uraian" class="form-control" id="uraian" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveFungsiPekerjaan" class="btn btn-success">Save</button>
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
            fungsiPekerjaanId: this.$route.params.fungsipekerjaanid,
            fungsiPekerjaanData: null,
            fungsiPekerjaanLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadFungsiPekerjaanData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadFungsiPekerjaanData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/fungsi-pekerjaan/id/${this.fungsiPekerjaanId}`, config);
                
                this.fungsiPekerjaanData = response.data.data.fungsiPekerjaan[0]
                this.fungsiPekerjaanLoaded = true
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

        async saveFungsiPekerjaan () {
            const fungsiPekerjaan = this.fungsiPekerjaanData.fungsi_pekerjaan
            const uraian = this.fungsiPekerjaanData.uraian

            if (fungsiPekerjaan === '' || uraian === '') {
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
                    fungsipekerjaan: fungsiPekerjaan,
                    uraian: uraian
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/fungsi-pekerjaan/${this.fungsiPekerjaanId}`, payload, config)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Fungsi Pekerjaan Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'FungsiPekerjaan' }))
                
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
.container-edit-master-fungsi-pekerjaan {
    display: flex;
}
</style>
  