<template>
    <div>
        <div class="container-add-master-fungsi-pekerjaan">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Fungsi Pekerjaan</h2>
                    <h6 class="subtitle-content">Tambah Master Fungsi Pekerjaan</h6>
                    <div class="row-controller d-flex justify-content-start">
                        <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                        <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                    </div>
                    <table class="table table-bordered table-sm table-hover table-responsive-xl">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title" width="40%">FUNGSI PEKERJAAN</th>
                                <th class="column-title" width="60%">URAIAN</th>
                            </tr>
                        </thead>
                        <tbody id="list-table">
                            <tr class="row-list">
                                <td><textarea class="form-control form-control-sm fungsi-pekerjaan" rows="1"></textarea></td>
                                <td><textarea class="form-control form-control-sm uraian" rows="1"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-end">
                        <button @click="saveFungsiPekerjaan" class="btn btn-success">Save</button>
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
            
        };
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

        addRow () {
            const listFungsiPekerjaan = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm fungsi-pekerjaan" rows="1"></textarea></td>`
            html += `<td><textarea class="form-control form-control-sm uraian" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listFungsiPekerjaan.appendChild(row)
        },

        deleteRow () {
            const listFungsiPekerjaan = document.getElementById("list-table")
            listFungsiPekerjaan.removeChild(listFungsiPekerjaan.lastElementChild)
        },

        async saveFungsiPekerjaan () {
            const listFungsiPekerjaan = document.getElementsByClassName('row-list')
            const fungsiPekerjaanList = []
            const uraianList = []

            for (let i=0; i < listFungsiPekerjaan.length; i++) {
                let fungsiPekerjaan = listFungsiPekerjaan[i].childNodes[0].childNodes[0].value
                let uraian = listFungsiPekerjaan[i].childNodes[1].childNodes[0].value

                if (fungsiPekerjaan === '' || uraian === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                fungsiPekerjaanList.push(fungsiPekerjaan)
                uraianList.push(uraian)
            }

            for (let i = 0; i < fungsiPekerjaanList.length; i++) {
                try {
                    const token = localStorage.getItem('token');

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    };
                    const payload = {
                        fungsipekerjaan: fungsiPekerjaanList[i],
                        uraian: uraianList[i]
                    }

                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/master/fungsi-pekerjaan`, payload, config)
                    .then(
                        this.$swal.fire({
                            icon: 'success',
                            title: 'Success',
                            text: 'Fungsi Pekerjaan Berhasil Ditambahkan'
                        })
                    )
                    .then(
                        listFungsiPekerjaan[0].childNodes[0].childNodes[0].value = '',
                        listFungsiPekerjaan[0].childNodes[1].childNodes[0].value = ''
                    )
                    .then(this.$router.push({ name: 'FungsiPekerjaan' }))

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
.container-add-master-fungsi-pekerjaan {
    display: flex;
}
</style>
  