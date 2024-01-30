<template>
    <div>
        <div class="container-profile">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <h2 class="title-content">Profile User</h2>
                    <h6 class="subtitle-content">Informasi User</h6>
                    <div v-if="userLoaded">
                        <div class="informasi-user mb-5">
                            <div class="form-group">
                                <label for="username">Username</label>
                                <input type="text" id="username" class="form-control form-control-sm" v-model="user.username" disabled>
                            </div>
                            <div class="form-group">
                                <label for="satker">Satker</label>
                                <input type="text" id="satker" class="form-control form-control-sm" v-model="user.satker" disabled>
                            </div>
                            <div class="form-group">
                                <label for="role">Role</label>
                                <input type="text" id="role" class="form-control form-control-sm" v-model="user.role" disabled>
                            </div>
                        </div>
                        <div class="change-password">
                            <h6 class="subtitle-content">Ganti Password</h6>
                            <div class="form-group">
                                <label for="password">Password Lama</label>
                                <input type="password" v-model="userPassword.password" class="form-control form-control-sm" id="password">
                            </div>
                            <div class="form-group">
                                <label for="new-password">Password Baru</label>
                                <input type="password" v-model="userPassword.newPassword" class="form-control form-control-sm" id="new-password">
                                <small>Password harus memiliki minimal 8 karakter dengan kombinasi angka, simbol dan huruf besar</small>
                            </div>
                            <div class="form-group">
                                <label for="confirm-password">Konfirmasi Password Baru</label>
                                <input type="password" v-model="userPassword.confirmNewPassword" class="form-control form-control-sm" id="confirm-password">
                            </div>
                            <div class="d-flex justify-content-end">
                                <button @click="changePassword(userPassword.password, userPassword.newPassword, userPassword.confirmNewPassword)" class="btn btn-success btn-sm">Change Password</button>
                            </div>
                        </div>
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
            userLoaded: false,
            user: [],
            userPassword: {
                password: '',
                newPassword: '',
                confirmNewPassword: ''
            }
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadUser()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadUser () {
            try {
                const token = localStorage.getItem('token')
                const iduser = localStorage.getItem('iduser')

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/user/${iduser}`, config);

                this.user = response.data.data.user
                this.userLoaded = true
                console.log(this.user)
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

        async changePassword (password, newPassword, confirmNewPassword) {
            try {
                if (password !== '' || newPassword !== '' || confirmNewPassword !== '') {
                    if (newPassword === confirmNewPassword) {
                        const iduser = localStorage.getItem('iduser')

                        if (newPassword === newPassword.toLowerCase()) {
                            this.badRequestException('Password harus memiliki minimal 1 huruf kapital')
                        }
    
                        if (newPassword.length < 8) {
                            this.badRequestException('Password harus memiliki minimal 8 karakter')
                        }
    
                        if (!/\d/.test(newPassword)) {
                            this.badRequestException('Password harus memiliki minimal 1 angka')
                        }
    
                        // eslint-disable-next-line
                        const symbol = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
    
                        if (!symbol.test(newPassword)) {
                            this.badRequestException('Password harus memiliki minimal 1 symbol')
                        }
                        const token = localStorage.getItem('token');
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        }
        
                        const payload = {
                            password: password,
                            newPassword: newPassword
                        }
        
                        await axios.put(`${process.env.VUE_APP_BACKENDHOST}/user/change-password/${iduser}`, payload, config)
                        .then(
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Password berhasil diubah'
                            })
                        )
                    } else {
                        this.badRequestException('Password dan Konfirmasi Password harus sama')
                    }
    
                } else {
                    this.badRequestException('Semua form harus diisi')
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
.container-profile {
    display: flex;
}

#subtitle-content {
    position: relative;
    top: 10px;
}

label {
    font-size: small;
    color: rgb(112, 112, 112);
}

.query-container {
    margin-bottom: 20px;
}

small {
    color: orangered;
}
</style>
  