<template>
    <div>
        <div class="container-add-user">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Kelola User</h2>
                    <h6 class="subtitle-content">Tambah User</h6>
                    <form>
                        <div class="form-group">
                            <label for="username">Username</label>
                            <input type="text" v-model="userData.username" class="form-control" id="username">
                        </div>
                        <div class="form-group">
                            <label>Satker</label>
                            <VueMultiselect
                                v-model="satkerSelected"
                                :options="masterSatker"
                                :close-on-select="true"
                                :allow-empty="false"
                                label="satker"
                                track-by="satker"
                            >
                            </VueMultiselect>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="userData.password" class="form-control" id="password">
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Konfirmasi Password</label>
                            <input type="password" v-model="userData.confirm_password" class="form-control" id="confirm-password">
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveUser" class="btn btn-success">Save</button>
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
import VueMultiselect from 'vue-multiselect'

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        VueMultiselect
    },
    data() {
        return {
            userData: {
                username: '',
                satker: '',
                password: '',
                confirm_password: '',
            },
            satkerLoaded: false,
            masterSatker: [],
            satkerSelected: null,
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadSatker()
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

        async loadSatker () {
            try {
                const token = localStorage.getItem('token')

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/satker/aktif`, config);

                this.masterSatker = response.data.data.satker
                this.satkerLoaded = true
            } catch (error) {
                if (error.response.status === 404) {
                    this.satkerLoaded = true
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

        async saveUser () {
            try {
                const token = localStorage.getItem('token');
                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }

                const payload = {
                    username: this.userData.username,
                    idsatker: this.satkerSelected.id_satker,
                    password: this.userData.password
                }

                await axios.post(`${process.env.VUE_APP_BACKENDHOST}/user`, payload, config)
                .then(
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Berhasil Menambah User'
                    })
                )
                .then(this.$router.push({ name: 'KelolaUser' }))
                
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
.container-add-user{
    display: flex;
}
</style>
  