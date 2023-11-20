<template>
    <div>
        <NavbarDashboard/>
        <div class="container-edit-master-ikhtisar-jabatan">
            <SidebarMenu/>
            <div class="container-content">
                <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                    Back
                </button>
                <h2 id="title-content">Master Ikhtisar Jabatan</h2>
                <h6 id="subtitle-content">Edit Master Ikhtisar Jabatan</h6>
                <form v-if="ikhtisarJabatanLoaded">
                    <div class="form-group">
                        <label for="ikhtisar-jabatan">Ikhtisar Jabatan</label>
                        <textarea v-model="ikhtisarJabatanData.ikhtisar_jabatan" class="form-control" id="ikhtisar-jabatan" rows="3"></textarea>
                    </div>
                </form>
                <div class="d-flex justify-content-end">
                    <button @click="saveIkhtisarJabatan" class="btn btn-success">Save</button>
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
            ikhtisarJabatanId: this.$route.params.ikhtisarjabatanid,
            ikhtisarJabatanData: null,
            ikhtisarJabatanLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadIkhtisarJabatanData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadIkhtisarJabatanData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/ikhtisar-jabatan/id/${this.ikhtisarJabatanId}`, config);
                
                this.ikhtisarJabatanData = response.data.data.ikhtisarJabatan[0]
                this.ikhtisarJabatanLoaded = true
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

        async saveIkhtisarJabatan () {
            const ikhtisarJabatan = this.ikhtisarJabatanData.ikhtisar_jabatan

            if (ikhtisarJabatan === '') {
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
                    idfungsional: this.ikhtisarJabatanData.id_fungsional,
                    ikhtisarjabatan: ikhtisarJabatan
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/ikhtisar-jabatan/${this.ikhtisarJabatanId}`, payload, config)
                console.log(payload)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Ikhtisar Jabatan Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'IkhtisarJabatanDetail', params: { fungsionalid: this.ikhtisarJabatanData.id_fungsional } }))
                
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
.container-edit-master-ikhtisar-jabatan {
    display: flex;
}

.container-content{
    flex: auto;
    padding: 20px;
}

.back-button {
    display: inline-flex;
    align-items: center; 
    padding-right: 15px;  
    border-radius: 30px;
}

#title-content {
    font-weight: bold;
    color: #0077b6;
    margin-top: 30px;
    margin-bottom: 30px;
}

#subtitle-content {
    color: #0096c7;
    padding-bottom: 5px;
    border-bottom-style: solid;
    border-bottom-width: 1.5px;
    border-bottom-color: #0096c7;
}

.row-controller .btn {
    margin: 10px 5px 20px 0;
}

.table-head {
    background-color: #0077b6;
    color: #FAFAFA;
    font-size: 12px;
    text-align: center;
}

.column-title {
    vertical-align: middle;
}

</style>
  