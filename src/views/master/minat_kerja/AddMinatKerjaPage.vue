<template>
    <div>
        <div class="container-add-master-minat-kerja">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Minat Kerja</h2>
                    <h6 class="subtitle-content">Tambah Master Minat Kerja</h6>
                    <div class="row-controller d-flex justify-content-start">
                        <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                        <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                    </div>
                    <table class="table table-bordered table-sm table-hover table-responsive-xl">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title" width="40%">MINAT KERJA</th>
                                <th class="column-title" width="60%">URAIAN</th>
                            </tr>
                        </thead>
                        <tbody id="list-table">
                            <tr class="row-list">
                                <td><textarea class="form-control form-control-sm minat-kerja" rows="1"></textarea></td>
                                <td><textarea class="form-control form-control-sm uraian" rows="1"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-end">
                        <button @click="saveMinatKerja" class="btn btn-success">Save</button>
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
            const listMinatKerja = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm minat-kerja" rows="1"></textarea></td>`
            html += `<td><textarea class="form-control form-control-sm uraian" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listMinatKerja.appendChild(row)
        },

        deleteRow () {
            const listMinatKerja = document.getElementById("list-table")
            listMinatKerja.removeChild(listMinatKerja.lastElementChild)
        },

        async saveMinatKerja () {
            const listMinatKerja = document.getElementsByClassName('row-list')
            const minatKerjaList = []
            const uraianList = []

            for (let i=0; i < listMinatKerja.length; i++) {
                let minatKerja = listMinatKerja[i].childNodes[0].childNodes[0].value
                let uraian = listMinatKerja[i].childNodes[1].childNodes[0].value

                if (minatKerja === '' || uraian === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                minatKerjaList.push(minatKerja)
                uraianList.push(uraian)
            }

            for (let i = 0; i < minatKerjaList.length; i++) {
                try {
                    const token = localStorage.getItem('token');

                    const config = {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        }
                    };
                    const payload = {
                        minatkerja: minatKerjaList[i],
                        uraian: uraianList[i]
                    }

                    await axios.post(`${process.env.VUE_APP_BACKENDHOST}/master/minat-kerja`, payload, config);

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
                text: 'Minat Kerja Berhasil Ditambahkan'
            }).then(this.$router.push({ name: 'MinatKerja' }))
        }
    },
};
</script>

<style scoped>
.container-add-master-minat-kerja {
    display: flex;
}
</style>
  