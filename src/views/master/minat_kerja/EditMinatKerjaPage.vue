<template>
    <div>
        <NavbarDashboard/>
        <div class="container-edit-master-minat-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                    Back
                </button>
                <h2 id="title-content">Master Minat Kerja</h2>
                <h6 id="subtitle-content">Edit Master Minat Kerja</h6>
                <form v-if="minatKerjaLoaded">
                    <div class="form-group">
                        <label for="minat-kerja">Minat Kerja</label>
                        <textarea v-model="minatKerjaData.minat_kerja" class="form-control" id="minat-kerja" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="minat-kerja">Uraian</label>
                        <textarea v-model="minatKerjaData.uraian" class="form-control" id="uraian" rows="3"></textarea>
                    </div>
                </form>
                <div class="d-flex justify-content-end">
                    <button @click="saveMinatKerja" class="btn btn-success">Save</button>
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
            minatKerjaId: this.$route.params.minatkerjaid,
            minatKerjaData: null,
            minatKerjaLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadMinatKerjaData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadMinatKerjaData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/minat-kerja/id/${this.minatKerjaId}`, config);
                
                this.minatKerjaData = response.data.data.minatKerja[0]
                this.minatKerjaLoaded = true
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

        async saveMinatKerja () {
            const minatKerja = this.minatKerjaData.minat_kerja
            const uraian = this.minatKerjaData.uraian

            if (minatKerja === '' || uraian === '') {
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
                    minatkerja: minatKerja,
                    uraian: uraian
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/minat-kerja/${this.minatKerjaId}`, payload, config)
                console.log(payload)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Minat Kerja Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'MinatKerja' }))
                
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
.container-edit-master-minat-kerja {
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
  