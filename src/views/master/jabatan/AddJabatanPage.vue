<template>
    <div>
        <div class="container-add-master-bahan-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Jabatan</h2>
                    <h6 class="subtitle-content">Tambah Master Jabatan</h6>
                    <div class="row-controller d-flex justify-content-start">
                        <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                        <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                    </div>
                    <table class="table table-bordered table-sm table-hover table-responsive-xl">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title" width="10%">ID</th>
                                <th class="column-title">FUNGSIONAL</th>
                            </tr>
                        </thead>
                        <tbody id="list-table">
                            <tr class="row-list">
                                <td><textarea class="form-control form-control-sm id-fungsional" rows="1"></textarea></td>
                                <td><textarea class="form-control form-control-sm fungsional" rows="1"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-end">
                        <button @click="saveJabatan" class="btn btn-success">Save</button>
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
            const listBahanKerja = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm bahan-kerja" rows="1"></textarea></td>`
            html += `<td><textarea class="form-control form-control-sm penggunaan" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listBahanKerja.appendChild(row)
        },

        deleteRow () {
            const listBahanKerja = document.getElementById("list-table")
            listBahanKerja.removeChild(listBahanKerja.lastElementChild)
        },

        async saveJabatan () {
            const listJabatan = document.getElementsByClassName('row-list')
            const idFungsionalList = []
            const fungsionalList = []

            for (let i=0; i < listJabatan.length; i++) {
                let idFungsional = listJabatan[i].childNodes[0].childNodes[0].value
                let fungsional = listJabatan[i].childNodes[1].childNodes[0].value

                if (idFungsional === '' || fungsional === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                idFungsionalList.push(idFungsional)
                fungsionalList.push(fungsional)
            }

            if (idFungsionalList.length === fungsionalList.length) {
                for (let i = 0; i < idFungsionalList.length; i++) {
                    try {
                        const token = localStorage.getItem('token');
    
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        };

                        const payload = {
                            idfungsional: idFungsionalList[i],
                            fungsional: fungsionalList[i],
                            isaktif: true
                        }
    
                        await axios.post(`${process.env.VUE_APP_BACKENDHOST}/master/fungsional`, payload, config);

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
                    text: 'Jabatan Fungsional Berhasil Ditambahkan'
                }).then(this.$router.push({ name: 'Jabatan' }))

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
.container-add-master-bahan-kerja{
    display: flex;
}
</style>
  