<template>
    <div>
        <div class="container-add-link">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Kelola Tautan</h2>
                    <h6 class="subtitle-content">Tambah Tautan</h6>
                    <form>
                        <div class="form-group">
                            <label for="title">Judul Tautan</label>
                            <input type="text" v-model="linkData.link_title" class="form-control" id="title">
                        </div>
                        <div class="form-group">
                            <label for="address">Alamat Tautan</label>
                            <input type="text" v-model="linkData.link_address" class="form-control" id="address">
                        </div>
                        <div class="form-group">
                            <label for="type">Jenis Tautan</label>
                            <select v-model="linkData.link_type" class="form-control" id="type">
                                <option value="website">Website</option>
                                <option value="contact">Contact</option>
                            </select>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="addLink" class="btn btn-success">Save</button>
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
            linkData: {
                link_title: '',
                link_address: '',
                link_type: ''
            }
        }
    },
    mounted () {
        this.checkAuthentication()
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

        async addLink () {
            try {
                if (this.linkData.link_title !== '' && this.linkData.link_address !== '' && this.linkData.link_type !== '') {
                    const token = localStorage.getItem('token');
                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    }
    
                    const payload = {
                        linktitle: this.linkData.link_title,
                        linkaddress: this.linkData.link_address,
                        linktype: this.linkData.link_type
                    }
                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/link`, payload, config)
                    .then(
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Berhasil Menambah Tautan'
                        })
                    )
                    .then(this.$router.push({ name: 'Link' }))
                } else {
                    this.badRequestException('Semua kolom wajib diisi')
                }
                
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
.container-add-link {
    display: flex;
}

small {
    color: orangered;
}
</style>
  