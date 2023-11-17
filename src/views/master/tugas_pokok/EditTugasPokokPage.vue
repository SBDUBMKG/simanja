<template>
    <div>
        <NavbarDashboard/>
        <div class="container-edit-master-tugas">
            <SidebarMenu/>
            <div class="container-content">
                <button @click="goToPreviousPage" class="btn btn-secondary btn-sm back-button">
                    <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-chevron-left" width="19" height="19" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 6l-6 6l6 6" /></svg> 
                    Back
                </button>
                <h2 id="title-content">Master Tugas Pokok</h2>
                <h6 id="subtitle-content">Edit Master Tugas Pokok</h6>
                <form v-if="tugasLoaded">
                    <div class="form-group">
                        <label for="uraian-tugas">Uraian Tugas</label>
                        <textarea v-model="tugasData.uraian_tugas" class="form-control" id="uraian-tugas" rows="3"></textarea>
                    </div>
                    <div class="form-group">
                        <label for="hasil-kerja">Hasil Kerja</label>
                        <select v-model="tugasData.hasil_kerja" class="form-control hasil-kerja">
                            <option value="Data">Data</option>
                            <option value="Laporan">Laporan</option>
                            <option value="Kegiatan">Kegiatan</option>
                            <option value="Dokumen">Dokumen</option>
                        </select>
                    </div>
                    <div class="form-group">
                        <label for="waktu-penyelesaian">Waktu Penyelesaian</label>
                        <input v-model="tugasData.waktu_penyelesaian" type="number" class="form-control" id="waktu-penyelesaian">
                    </div>
                    <div class="form-group">
                        <label for="waktu-efektif">Waktu Efektif</label>
                        <input v-model="tugasData.waktu_efektif" type="number" class="form-control" id="waktu-efektif">
                    </div>
                    <div class="form-group">
                        <label for="uraian-hasil-kerja">Uraian Hasil Kerja</label>
                        <textarea v-model="tugasData.uraian_hasil_kerja" class="form-control" id="uraian-hasil-kerja" rows="3"></textarea>
                    </div>
                </form>
                <div class="d-flex justify-content-end">
                    <button @click="saveTugas" class="btn btn-success">Save</button>
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
            tugasId: this.$route.params.tugaspokokid,
            tugasData: null,
            tugasLoaded: false,
        }
    },
    mounted () {
        this.checkAuthentication()
        this.loadTugasData()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async loadTugasData() {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/tugas/id/${this.tugasId}`, config);
                
                this.tugasData = response.data.data.tugas[0]
                console.log(this.tugasData)
                this.tugasLoaded = true
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

        async saveTugas () {
            const uraianTugas = this.tugasData.uraian_tugas
            const hasilKerja = this.tugasData.hasil_kerja
            const waktuPenyelesaian = this.tugasData.waktu_penyelesaian
            const waktuEfektif = this.tugasData.waktu_efektif
            const uraianHasilKerja = this.tugasData.uraian_hasil_kerja

            if (uraianTugas === '' || hasilKerja === '' || waktuPenyelesaian === '' || waktuEfektif === '' || uraianHasilKerja === '') {
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
                    idfungsional: this.tugasData.id_fungsional,
                    uraiantugas: uraianTugas,
                    hasilkerja: hasilKerja,
                    uraianhasilkerja: uraianHasilKerja,
                    waktupenyelesaian: waktuPenyelesaian,
                    waktuefektif: waktuEfektif
                }

                await axios.put(`${process.env.VUE_APP_BACKENDHOST}/master/tugas/${this.tugasId}`, payload, config)
                console.log(payload)

                this.$swal.fire({
                    icon: 'success',
                    title: 'Success',
                    text: 'Tugas Pokok Berhasil Diperbarui'
                }).then(this.$router.push({ name: 'TugasPokokDetail', params: { fungsionalid: this.tugasData.id_fungsional } }))
                
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
.container-edit-master-tugas{
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
  