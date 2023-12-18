<template>
    <div>
        <div class="container-edit-master-satker">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Unit Kerja</h2>
                    <h6 class="subtitle-content">Edit Master Unit Kerja</h6>
                    <form v-if="satkerLoaded">
                        <div class="form-group">
                            <label for="id-satker">ID Unit Kerja</label>
                            <input type="text" v-model="satkerData.id_satker" class="form-control" id="id-satker"/>
                        </div>
                        <div class="form-group">
                            <label for="satker">Unit Kerja</label>
                            <textarea v-model="satkerData.satker" class="form-control" id="satker" rows="2"></textarea>
                        </div>
                        <div class="form-group">Is Aktif:
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="true" v-model="satkerData.is_aktif" />
                                <label class="form-check-label">True</label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" value="false" v-model="satkerData.is_aktif" />
                                <label class="form-check-label">False</label>
                            </div>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveSatker" class="btn btn-success">Save</button>
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
            satkerId: this.$route.params.satkerid,
            satkerData: null,
            satkerLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadSatkerData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadSatkerData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/satker/id/${this.satkerId}`, config);
                
                this.satkerData = response.data.data.satker[0]
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

        goToPreviousPage () {
            this.$router.go(-1)
        },

        async saveSatker () {
            const idSatker = this.satkerData.id_satker
            const satker = this.satkerData.satker
            const isAktif = this.satkerData.is_aktif

            if (idSatker === '' || satker === '' || isAktif === '') {
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
                    idsatker: idSatker,
                    satker: satker,
                    isaktif: isAktif
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/satker/${this.satkerId}`, payload, config)
                .then(
                    this.$swal.fire({
                        icon: 'success',
                        title: 'Success',
                        text: 'Satker Berhasil Diperbarui'
                    })
                )
                .then(this.$router.push({ name: 'Satker' }))
                
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
.container-edit-master-satker {
    display: flex;
}
</style>
  