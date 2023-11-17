<template>
    <div>
        <NavbarDashboard/>
        <div class="container-add-master-perangkat-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                    Back
                </button>
                <h2 id="title-content">Master Perangkat Kerja</h2>
                <h6 id="subtitle-content" v-if="dataLoaded">Tambah Master Perangkat Kerja {{ fungsionalData.fungsional }}</h6>
                <div class="row-controller d-flex justify-content-start">
                    <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                    <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                </div>
                <table class="table table-bordered table-sm table-hover table-responsive-xl">
                    <thead>
                        <tr class="table-head">
                            <th class="column-title" width="40%">PERANGKAT KERJA</th>
                            <th class="column-title" width="10%">PENGGUNAAN</th>
                        </tr>
                    </thead>
                    <tbody id="list-table">
                        <tr class="row-list">
                            <td><textarea class="form-control form-control-sm perangkat-kerja" rows="1"></textarea></td>
                            <td><textarea class="form-control form-control-sm penggunaan" rows="1"></textarea></td>
                        </tr>
                    </tbody>
                </table>
                <div class="d-flex justify-content-end">
                    <button @click="savePerangkatKerja" class="btn btn-success">Save</button>
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

                const response = await axios.get(`http://localhost:5000/master/fungsional/id/${this.fungsionalId}`, config);

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
                        text: error.message
                    })

                }
            }
        },

        goToPreviousPage () {
            this.$router.go(-1)
        },

        addRow () {
            const listPerangkatKerja = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm perangkat-kerja" rows="1"></textarea></td>`
            html += `<td><textarea class="form-control form-control-sm penggunaan" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listPerangkatKerja.appendChild(row)
        },

        deleteRow () {
            const listPerangkatKerja = document.getElementById("list-table")
            listPerangkatKerja.removeChild(listPerangkatKerja.lastElementChild)
        },

        async savePerangkatKerja () {
            const listPerangkatKerja = document.getElementsByClassName('row-list')
            const perangkatKerjaList = []
            const penggunaanList = []

            for (let i=0; i < listPerangkatKerja.length; i++) {
                let perangkatKerja = listPerangkatKerja[i].childNodes[0].childNodes[0].value
                let penggunaan = listPerangkatKerja[i].childNodes[1].childNodes[0].value

                if (perangkatKerja === '' || penggunaan === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                perangkatKerjaList.push(perangkatKerja)
                penggunaanList.push(penggunaan)
            }

            if (perangkatKerjaList.length === penggunaanList.length) {
                for (let i = 0; i < perangkatKerjaList.length; i++) {
                    try {
                        const token = localStorage.getItem('token');
    
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        };

                        const payload = {
                            idfungsional: this.fungsionalData.id_fungsional,
                            perangkatkerja: perangkatKerjaList[i],
                            penggunaan: penggunaanList[i]
                        }
    
                        await axios.post(`http://localhost:5000/master/perangkat-kerja`, payload, config);

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

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Perangkat Kerja Berhasil Ditambahkan'
                }).then(this.$router.push({ name: 'PerangkatKerjaDetail', params: { fungsionalid: this.fungsionalData.id_fungsional } }))

            } else {
                this.$swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Terjadi kesalahan di server'
                })
            }
        }
    },
};
</script>

<style scoped>
.container-add-master-perangkat-kerja{
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
  