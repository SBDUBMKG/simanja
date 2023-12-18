<template>
    <div>
        <div class="container-edit-master-bakat-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Bakat Kerja</h2>
                    <h6 class="subtitle-content">Edit Master Bakat Kerja</h6>
                    <form v-if="bakatKerjaLoaded">
                        <div class="form-group">
                            <label for="bakat-kerja">Bakat Kerja</label>
                            <textarea v-model="bakatKerjaData.bakat_kerja" class="form-control" id="bakat-kerja" rows="3"></textarea>
                        </div>
                        <div class="form-group">
                            <label for="bakat-kerja">Uraian</label>
                            <textarea v-model="bakatKerjaData.uraian" class="form-control" id="uraian" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveBakatKerja" class="btn btn-success">Save</button>
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
            bakatKerjaId: this.$route.params.bakatkerjaid,
            bakatKerjaData: null,
            bakatKerjaLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadBakatKerjaData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadBakatKerjaData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/bakat-kerja/id/${this.bakatKerjaId}`, config);
                
                this.bakatKerjaData = response.data.data.bakatKerja[0]
                this.bakatKerjaLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.dataLoaded = true
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

        async saveBakatKerja () {
            const bakatKerja = this.bakatKerjaData.bakat_kerja
            const uraian = this.bakatKerjaData.uraian

            if (bakatKerja === '' || uraian === '') {
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
                    bakatkerja: bakatKerja,
                    uraian: uraian
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/bakat-kerja/${this.bakatKerjaId}`, payload, config)
                .then(
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Bakat Kerja Berhasil Diperbarui'
                    })
                )
                .then(this.$router.push({ name: 'BakatKerja' }))
                
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
.container-edit-master-bakat-kerja {
    display: flex;
}
</style>
  