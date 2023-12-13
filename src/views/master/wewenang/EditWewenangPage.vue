<template>
    <div>
        <div class="container-edit-master-wewenang">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Wewenang</h2>
                    <h6 class="subtitle-content">Edit Master Wewenang</h6>
                    <form v-if="wewenangLoaded">
                        <div class="form-group">
                            <label for="wewenang">Wewenang</label>
                            <textarea v-model="wewenangData.wewenang" class="form-control" id="wewenang" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveWewenang" class="btn btn-success">Save</button>
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
            wewenangId: this.$route.params.wewenangid,
            wewenangData: null,
            wewenangLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadWewenangData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadWewenangData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/wewenang/id/${this.wewenangId}`, config);
                
                this.wewenangData = response.data.data.wewenang[0]
                this.wewenangLoaded = true
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

        async saveWewenang () {
            const wewenang = this.wewenangData.wewenang

            if (wewenang === '') {
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
                    wewenang: wewenang
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/wewenang/${this.wewenangId}`, payload, config)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Wewenang Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'Wewenang' }))
                
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
.container-edit-master-wewenang {
    display: flex;
}
</style>
  