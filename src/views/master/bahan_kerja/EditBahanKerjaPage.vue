<template>
    <div>
        <div class="container-edit-master-bahan-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Bahan Kerja</h2>
                    <h6 class="subtitle-content">Edit Master Bahan Kerja</h6>
                    <form v-if="bahanKerjaLoaded">
                        <div class="form-group">
                            <label for="bahan-kerja">Bahan Kerja</label>
                            <textarea v-model="bahanKerjaData.bahan_kerja" class="form-control" id="bahan-kerja" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="bahan-kerja">Penggunaan</label>
                            <textarea v-model="bahanKerjaData.penggunaan" class="form-control" id="penggunaan" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveBahanKerja" class="btn btn-success">Save</button>
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
            bahanKerjaId: this.$route.params.bahankerjaid,
            bahanKerjaData: null,
            bahanKerjaLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadBahanKerjaData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadBahanKerjaData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/bahan-kerja/id/${this.bahanKerjaId}`, config);
                
                this.bahanKerjaData = response.data.data.bahanKerja[0]
                this.bahanKerjaLoaded = true
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

        async saveBahanKerja () {
            const bahanKerja = this.bahanKerjaData.bahan_kerja
            const penggunaan = this.bahanKerjaData.penggunaan

            if (bahanKerja === '' || penggunaan === '') {
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
                    idfungsional: this.bahanKerjaData.id_fungsional,
                    bahankerja: bahanKerja,
                    penggunaan: penggunaan
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/bahan-kerja/${this.bahanKerjaId}`, payload, config)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Bahan Kerja Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'BahanKerjaDetail', params: { fungsionalid: this.bahanKerjaData.id_fungsional } }))
                
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
.container-edit-master-bahan-kerja{
    display: flex;
}
</style>
  