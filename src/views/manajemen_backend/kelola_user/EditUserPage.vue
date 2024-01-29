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
                    <h2 class="title-content">Kelola User</h2>
                    <div class="d-flex justify-content-between subtitle-content">
                        <h6 id="subtitle-content">Edit User</h6>
                        <button @click="resetPassword" class="btn btn-info btn-sm btn-reset">Reset Password</button>
                    </div>
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
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Diklat Berhasil Diperbarui'
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
        },

        async resetPassword () {
            const {value: formValues} = await this.$swal.fire({
                title: 'Reset Password',
                html:
                    '<input type="password" id="swal-input1" class="form-control" placeholder="Masukan Password Baru" style="margin-bottom: 20px;">' +
                    '<input type="password" id="swal-input2" class="form-control" placeholder="Konfirmasi Password Baru">',
                focusConfirm: false,
                preConfirm: () => {
                    return [
                        document.getElementById('swal-input1').value,
                        document.getElementById('swal-input2').value
                    ]
                }
            })
            if (formValues[0] === '' || formValues[1] === '') {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Form Tidak Boleh Kosong'
                })
            } else if (formValues[0] !== formValues[1]) {
                this.$swal.fire({
                    icon: 'warning',
                    title: 'Warning',
                    text: 'Password yang dimasukan tidak sama'
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
                    password: formValues[0]
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/user/change-password/${this.userId}`, payload, config)
                .then(
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Password Berhasil Diperbarui'
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
        }
    },
};
</script>

<style scoped>
.container-edit-master-diklat{
    display: flex;
}

#subtitle-content {
    position: relative;
    top: 10px;
}
</style>
  