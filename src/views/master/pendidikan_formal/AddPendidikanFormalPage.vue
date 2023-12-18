<template>
    <div>
        <div class="container-add-master-pendidikan-formal">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Pendidikan Formal</h2>
                    <h6 class="subtitle-content" v-if="dataLoaded">Tambah Master Pendidikan Formal {{ fungsionalData.fungsional }}</h6>
                    <div class="row-controller d-flex justify-content-start">
                        <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                        <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                    </div>
                    <table class="table table-bordered table-sm table-hover table-responsive-xl">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title" width="40%">PENDIDIKAN FORMAL</th>
                            </tr>
                        </thead>
                        <tbody id="list-table">
                            <tr class="row-list">
                                <td><textarea class="form-control form-control-sm pendidikan-formal" rows="2"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-end">
                        <button @click="savePendidikanFormal" class="btn btn-success">Save</button>
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
            fungsionalId: this.$route.params.fungsionalid,
            fungsionalData: null,
            dataLoaded: false
        };
    },
    mounted () {
        this.checkAuthentication()
        this.loadFungsionalData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadFungsionalData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/fungsional/id/${this.fungsionalId}`, config);

                this.fungsionalData = response.data.data.fungsional[0]
                this.dataLoaded = true
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

        addRow () {
            const listPendidikanFormal = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm pendidikan-formal" rows="2"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listPendidikanFormal.appendChild(row)
        },

        deleteRow () {
            const listPendidikanFormal = document.getElementById("list-table")
            listPendidikanFormal.removeChild(listPendidikanFormal.lastElementChild)
        },

        async savePendidikanFormal () {
            const listPendidikanFormal = document.getElementsByClassName('row-list')
            const pendidikanFormalList = []

            for (let i=0; i < listPendidikanFormal.length; i++) {
                let pendidikanFormal = listPendidikanFormal[i].childNodes[0].childNodes[0].value

                if (pendidikanFormal === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                pendidikanFormalList.push(pendidikanFormal)
            }

            for (let i = 0; i < pendidikanFormalList.length; i++) {
                try {
                    const token = localStorage.getItem('token');

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    };
                    const payload = {
                        idfungsional: this.fungsionalData.id_fungsional,
                        pendidikan: pendidikanFormalList[i]
                    }
                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/master/pendidikan`, payload, config)
                    .then( 
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Pendidikan Formal Berhasil Ditambahkan'
                        })
                    )
                    .then(
                        listPendidikanFormal[0].childNodes[0].childNodes[0].value = ''
                    )
                    .then(this.$router.push({ name: 'PendidikanFormalDetail', params: { pendidikanformalid: this.fungsionalData.id_fungsional } }))

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
        }
    },
};
</script>

<style scoped>
.container-add-master-pendidikan-formal{
    display: flex;
}
</style>
  