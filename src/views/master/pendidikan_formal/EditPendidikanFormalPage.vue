<template>
    <div>
        <div class="container-edit-master-pendidikan-formal">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Pendidikan Formal</h2>
                    <h6 class="subtitle-content">Edit Master Pendidikan Formal</h6>
                    <form v-if="pendidikanFormalLoaded">
                        <div class="form-group">
                            <label for="pendidikan-formal">Pendidikan Formal</label>
                            <textarea v-model="pendidikanFormalData.pendidikan" class="form-control" id="pendidikan-formal" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="savePendidikanFormal" class="btn btn-success">Save</button>
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
            pendidikanFormalId: this.$route.params.pendidikanformalid,
            pendidikanFormalData: null,
            pendidikanFormalLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadPendidikanFormalData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadPendidikanFormalData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/pendidikan/id/${this.pendidikanFormalId}`, config);
                
                this.pendidikanFormalData = response.data.data.pendidikan[0]
                this.pendidikanFormalLoaded = true
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

        async savePendidikanFormal () {
            const pendidikanFormal = this.pendidikanFormalData.pendidikan

            if (pendidikanFormal === '') {
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
                    idfungsional: this.pendidikanFormalData.id_fungsional,
                    pendidikan: pendidikanFormal
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/pendidikan/${this.pendidikanFormalId}`, payload, config)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Pendidikan Formal Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'PendidikanFormalDetail', params: { fungsionalid: this.pendidikanFormalData.id_fungsional } }))
                
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
.container-edit-master-pendidikan-formal{
    display: flex;
}
</style>
  