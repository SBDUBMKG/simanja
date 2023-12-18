<template>
    <div>
        <div class="container-add-master-tugas">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content shadow">
                    <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                        <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                        Back
                    </button>
                    <h2 class="title-content">Master Tugas Pokok</h2>
                    <h6 class="subtitle-content" v-if="dataLoaded">Tambah Master Tugas Pokok {{ fungsionalData.fungsional }}</h6>
                    <div class="row-controller d-flex justify-content-start">
                        <button @click="addRow" class="btn btn-info btn-sm">Tambah Baris</button>
                        <button @click="deleteRow" class="btn btn-secondary btn-sm">Kurangi Baris</button>
                    </div>
                    <table class="table table-bordered table-sm table-hover table-responsive-xl">
                        <thead>
                            <tr class="table-head">
                                <th class="column-title" width="40%">URAIAN TUGAS</th>
                                <th class="column-title" width="10%">HASIL KERJA</th>
                                <th class="column-title" width="10%">WAKTU PENYELESAIAN</th>
                                <th class="column-title" width="10%">WAKTU EFEKTIF</th>
                                <th class="column-title" width="30%">URAIAN HASIL KERJA</th>
                            </tr>
                        </thead>
                        <tbody id="list-table">
                            <tr class="row-list">
                                <td><textarea class="form-control form-control-sm uraian-tugas" rows="1"></textarea></td>
                                <td>
                                    <select class="form-control form-control-sm hasil-kerja">
                                        <option value="Data">Data</option>
                                        <option value="Laporan">Laporan</option>
                                        <option value="Kegiatan">Kegiatan</option>
                                        <option value="Dokumen">Dokumen</option>
                                    </select>
                                </td>
                                <td><input type="number" class="form-control form-control-sm waktu-penyelesaian"></td>
                                <td><input type="number" class="form-control form-control-sm waktu-efektif"></td>
                                <td><textarea class="form-control form-control-sm uraian-hasil-kerja" rows="1"></textarea></td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="d-flex justify-content-end">
                        <button @click="saveTugas" class="btn btn-success">Save</button>
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
            const listTugas = document.getElementById("list-table")

            const row = document.createElement('tr')
            let html = `<td><textarea class="form-control form-control-sm uraian-tugas" rows="1"></textarea></td>`
            html += `<td>`
            html += `<select class="form-control form-control-sm hasil-kerja">`
            html += `<option value="Data">Data</option>`
            html += `<option value="Laporan">Laporan</option>`
            html += `<option value="Kegiatan">Kegiatan</option>`
            html += `<option value="Dokumen">Dokumen</option>`
            html += `</select>`
            html += `<td><input type="number" class="form-control form-control-sm waktu-penyelesaian"></td>`
            html += `<td><input type="number" class="form-control form-control-sm waktu-efektif"></td>`
            html += `<td><textarea class="form-control form-control-sm uraian-hasil-kerja" rows="1"></textarea></td>`

            row.innerHTML = html            
            row.classList.add('row-list')

            listTugas.appendChild(row)
        },

        deleteRow () {
            const listTugas = document.getElementById("list-table")
            listTugas.removeChild(listTugas.lastElementChild)
        },

        async saveTugas () {
            const listTugas = document.getElementsByClassName('row-list')
            const uraianTugasList = []
            const hasilKerjaList = []
            const waktuPenyelesaianList = []
            const waktuEfektifList = []
            const uraianHasilKerjaList = []

            for (let i=0; i < listTugas.length; i++) {
                let uraianTugas = listTugas[i].childNodes[0].childNodes[0].value
                let hasilKerja = listTugas[i].childNodes[1].childNodes[0].value
                let waktuPenyelesaian = listTugas[i].childNodes[2].childNodes[0].value
                let waktuEfektif = listTugas[i].childNodes[3].childNodes[0].value
                let uraianHasilKerja = listTugas[i].childNodes[4].childNodes[0].value

                if (uraianTugas === '' || hasilKerja === '' || waktuPenyelesaian === '' || waktuEfektif === '' || uraianHasilKerja === '') {
                    return this.$swal.fire({
                        icon: 'info',
                        title: 'Warning!!',
                        text: 'Kolom tidak boleh kosong'
                    })
                }

                uraianTugasList.push(uraianTugas)
                hasilKerjaList.push(hasilKerja)
                waktuPenyelesaianList.push(waktuPenyelesaian)
                waktuEfektifList.push(waktuEfektif)
                uraianHasilKerjaList.push(uraianHasilKerja)
            }

            if (uraianTugasList.length === hasilKerjaList.length && uraianTugasList.length === waktuPenyelesaianList.length && uraianTugasList.length === waktuEfektifList.length && uraianTugasList.length === uraianHasilKerjaList.length) {
                for (let i = 0; i < uraianTugasList.length; i++) {
                    try {
                        const token = localStorage.getItem('token');
    
                        const config = {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            }
                        };

                        const payload = {
                            idfungsional: this.fungsionalData.id_fungsional,
                            uraiantugas: uraianTugasList[i],
                            hasilkerja: hasilKerjaList[i],
                            uraianhasilkerja: uraianHasilKerjaList[i],
                            waktupenyelesaian: waktuPenyelesaianList[i],
                            waktuefektif: waktuEfektifList[i]
                        }
    
                        await axios.post(`${process.env.VUE_APP_BACKENDHOST}/master/tugas`, payload, config)
                        .then(
                            this.$swal.fire({
                                icon: 'success',
                                title: 'Success',
                                text: 'Tugas Pokok Berhasil Ditambahkan'
                            })
                        )
                        .then(
                            listTugas[0].childNodes[0].childNodes[0].value = '',
                            listTugas[0].childNodes[1].childNodes[0].value = '',
                            listTugas[0].childNodes[2].childNodes[0].value = '',
                            listTugas[0].childNodes[3].childNodes[0].value = '',
                            listTugas[0].childNodes[4].childNodes[0].value = ''
                        )
                        .then(this.$router.push({ name: 'TugasPokokDetail', params: { fungsionalid: this.fungsionalData.id_fungsional } }))

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
.container-add-master-tugas{
    display: flex;
}
</style>
  