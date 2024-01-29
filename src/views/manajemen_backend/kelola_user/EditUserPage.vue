<template>
    <div>
        <div class="container-edit-user">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Kelola User</h2>
                    <h6 class="subtitle-content">Edit User</h6>
                    <form v-if="userLoaded">
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
                            <label for="role">Role</label>
                            <select v-model="userData.id_role" class="form-control">
                                <option value="3">User</option>
                                <option value="2">Verifikator</option>
                                <option value="1">Administrator</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label for="password">Password</label>
                            <input type="password" v-model="userPassword.password" class="form-control" id="password">
                            <small>Password harus memiliki minimal 8 karakter dengan kombinasi angka, simbol dan huruf besar</small>
                        </div>
                        <div class="form-group">
                            <label for="confirm-password">Konfirmasi Password</label>
                            <input type="password" v-model="userPassword.confirmPassword" class="form-control" id="confirm-password">
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
            userId: this.$route.params.userid,
            userData: null,
            userPassword: {
                password: '',
                confirmPassword: ''
            },
            userLoaded: false,
            satkerLoaded: false,
            masterSatker: [],
            satkerSelected: null,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadUserData()
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

        async loadUserData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/user/${this.userId}`, config);
                
                this.userData = response.data.data.user
                this.userLoaded = true
                this.satkerSelected = {
                    id_satker: response.data.data.user.id_satker,
                    satker: response.data.data.user.satker
                }
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
                    role: this.userData.id_role
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/user/${this.userId}`, payload, config)
                .then(
                    await this.resetPassword(this.userPassword.password, this.userPassword.confirmPassword)
                )
                .then(
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'User Berhasil Diperbarui'
                    })
                )                
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
        },

        async resetPassword (password, confirmPassword) {
            if (password !== '' || confirmPassword !== '') {
                if (password === confirmPassword) {
                    if (password === password.toLowerCase()) {
                        this.badRequestException('Password harus memiliki minimal 1 huruf kapital')
                    }

                    if (password.length < 8) {
                        this.badRequestException('Password harus memiliki minimal 8 karakter')
                    }

                    if (!/\d/.test(password)) {
                        this.badRequestException('Password harus memiliki minimal 1 angka')
                    }

                    // eslint-disable-next-line
                    const symbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/

                    if (!symbol.test(password)) {
                        this.badRequestException('Password harus memiliki minimal 1 symbol')
                    }
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
    
                    const payload = {
                        password: password
                    }
    
                    await axios.put(`${process.env.VUE_APP_BACKENDHOST}/user/change-password/${this.userId}`, payload, config)
                } else {
                    this.badRequestException('Password dan Konfirmasi Password harus sama')
                }

            }
        },

        badRequestException (message) {
            const exception = new Error();
            exception.name = "Bad Request";
            exception.response = {
                status: 400,
                data: {
                    message: message
                }
            }
            throw exception
        }
    },
};
</script>

<style scoped>
.container-edit-user{
    display: flex;
}

small {
    color: orangered;
}
</style>
  