<template>
    <div>
        <div class="container-edit-master-tanggung-jawab">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Tanggung Jawab</h2>
                    <h6 class="subtitle-content">Edit Master Tanggung Jawab</h6>
                    <form v-if="tanggungJawabLoaded">
                        <div class="form-group">
                            <label for="tanggung-jawab">Tanggung Jawab</label>
                            <textarea v-model="tanggungJawabData.tanggung_jawab" class="form-control" id="tanggung-jawab" rows="3"></textarea>
                        </div>
                    </form>
                    <div class="d-flex justify-content-end">
                        <button @click="saveTanggungJawab" class="btn btn-success">Save</button>
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
            tanggungJawabId: this.$route.params.tanggungjawabid,
            tanggungJawabData: null,
            tanggungJawabLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadTanggungJawabData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadTanggungJawabData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/tanggung-jawab/id/${this.tanggungJawabId}`, config);
                
                this.tanggungJawabData = response.data.data.tanggungJawab[0]
                this.tanggungJawabLoaded = true
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

        async saveTanggungJawab () {
            const tanggungJawab = this.tanggungJawabData.tanggung_jawab

            if (tanggungJawab === '') {
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
                    tanggungjawab: tanggungJawab
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/tanggung-jawab/${this.tanggungJawabId}`, payload, config)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Tanggung Jawab Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'TanggungJawab' }))
                
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
.container-edit-master-tanggung-jawab {
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
  