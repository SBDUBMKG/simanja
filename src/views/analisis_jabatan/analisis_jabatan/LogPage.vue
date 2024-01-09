<template>
    <div>
        <div class="container-analisis-biodata">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Log Analisis Jabatan</h2>
                    <h6 v-if="jabatanLoaded" class="subtitle-content">{{ dataJabatan[0].satker }} - {{ dataJabatan[0].fungsional }}</h6>
                    <div v-if="logLoaded">
                        <div v-for="(log, index) in logAnalisis" :key="log.id_tbl_log">
                            <div class="d-flex">
                                <div v-if="index === 0" class="outer-round">
                                    <div class="inner-round"></div>
                                </div>
                                <div v-else class="outer-round-grey">
                                    <div class="inner-round-grey"></div>
                                </div>
                                <h6 class="log-title">{{ parseISOString(log.created_at) }}</h6>
                            </div>
                            <div class="log-list">
                                <h6 class="log-event">{{ log.satker }}</h6>
                                <h6 class="log-event">{{ log.event }}</h6>
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
import NavbarDashboard from '@/components/NavbarDashboard.vue'
import SidebarMenu from '@/components/SidebarMenu.vue'

export default {
    components: {
        NavbarDashboard,
        SidebarMenu
    },
    data() {
        return {
            jabatanId: this.$route.params.jabatanid,
            dataJabatan: [],
            jabatanLoaded: false,
            logAnalisis: [],
            logLoaded: false
        }
    },
    mounted () {
        this.checkAuthentication()
        this.getData()
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

        async getData () {
            await this.getJabatan()
            .catch((error) => {
                if (error.response.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                }
            })

            await Promise.all([
                this.getLogAnalisis()
            ])
            .catch((error) => {
                if (error.response.status === 401) {
                    this.$router.push({ name: 'Home' })
                } else {
                    this.$swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: error.response.data.message
                    })
                }
            })
        },

        async getJabatan () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/jabatan/id/${this.jabatanId}`, config);
            this.dataJabatan = response.data.data.jabatan
            this.jabatanLoaded = true
        },

        async getLogAnalisis () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            
            const responseLog = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/log-analisis/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            this.logAnalisis = responseLog.data.data.logAnalisis

            this.logLoaded = true
        },

        parseISOString(s) {
            var b = s.split(/\D+/);
            return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
        }
    }
};
</script>

<style scoped>
.container-analisis-biodata {
    display: flex;
}

.outer-round {
    background-color: rgb(163, 244, 163);
    border-radius: 50%;
    padding: 5px;
    height: 20px;
    width: 20px;
}
.inner-round {
    height: 10px;
    width: 10px;
    background-color: #00a534;
    border-radius: 50%;
}

.outer-round-grey {
    background-color: rgb(215, 215, 215);
    border-radius: 50%;
    padding: 5px;
    height: 20px;
    width: 20px;
}
.inner-round-grey {
    height: 10px;
    width: 10px;
    background-color: #7a7a7a;
    border-radius: 50%;
}

.log-list {
    border-left-style: dashed;
    border-left-color: rgb(194, 194, 194);
    border-left-width: thin;
    padding-left: 15px;
    margin-left: 10px;
}

.log-title {
    margin-top: 2px;
    margin-left: 5px;
    font-size: 15px;
    font-weight: 600;
    color: #505050;
}

.log-event {
    font-size: 15px;
    color: #505050;
}
</style>
  