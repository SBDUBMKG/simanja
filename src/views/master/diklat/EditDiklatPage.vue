<template>
    <div>
        <div class="container-edit-master-diklat">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Pendidikan dan Pelatihan</h2>
                    <h6 class="subtitle-content">Edit Master Pendidikan dan Pelatihan</h6>
                    <form v-if="diklatLoaded">
                        <div class="form-group">
                            <label for="diklat">Pendidikan dan Pelatihan</label>
                            <textarea v-model="diklatData.diklat" class="form-control" id="diklat" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveDiklat" class="btn btn-success">Save</button>
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
            diklatId: this.$route.params.diklatid,
            diklatData: null,
            diklatLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadDiklatData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadDiklatData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/diklat/id/${this.diklatId}`, config);
                
                this.diklatData = response.data.data.diklat[0]
                this.diklatLoaded = true
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

        async saveDiklat () {
            const diklat = this.diklatData.diklat

            if (diklat === '') {
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
                    idfungsional: this.diklatData.id_fungsional,
                    diklat: diklat
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/diklat/${this.diklatId}`, payload, config)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Diklat Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'Diklat' }))
                
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
.container-edit-master-diklat{
    display: flex;
}
</style>
  