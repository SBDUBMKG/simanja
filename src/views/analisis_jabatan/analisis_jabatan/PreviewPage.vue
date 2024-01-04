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
                    <h2 class="title-content">Preview Analisis Jabatan</h2>
                    <h6 v-if="jabatanLoaded" class="subtitle-content">{{ dataJabatan[0].satker }} - {{ dataJabatan[0].fungsional }}</h6>
                    <table v-if="jabatanLoaded">
                        <tr>
                            <td>1.</td>
                            <td>Nama Jabatan</td>
                            <td width="70%">
                                {{ dataJabatan[0].fungsional }}
                            </td>
                        </tr>
                        <tr>
                            <td>2.</td>
                            <td>Kode Jabatan</td>
                            <td>
                                {{ dataJabatan[0].id_satker }}.{{ dataJabatan[0].id_fungsional }}
                            </td>
                        </tr>
                        <tr>
                            <td>3.</td>
                            <td>Unit Kerja</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>a. JPT Utama</td>
                            <td>
                                {{ jptUtama }}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>b. JPT Madya</td>
                            <td>
                                {{ dataJabatan[0].jpt_madya }}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>c. JPT Pratama</td>
                            <td>
                                {{ dataJabatan[0].jpt_pratama }}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>d. Administrator</td>
                            <td>
                                {{ dataJabatan[0].administrator }}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>e. Pengawas</td>
                            <td>
                                {{ dataJabatan[0].pengawas }}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>f. Pelaksana</td>
                            <td>
                                {{ dataJabatan[0].pelaksana }}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>g. Jabatan Fungsional</td>
                            <td>
                                {{ dataJabatan[0].fungsional }}
                            </td>
                        </tr>
                        <tr>
                            <td>4.</td>
                            <td>Ikhtisar Jabatan</td>
                            <td>
                                {{ ikhtisarJabatan[0] }}
                            </td>
                        </tr>
                        <tr>
                            <td>5.</td>
                            <td>Kualifikasi Jabatan</td>
                            <td></td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>a. Pendidikan Formal</td>
                            <td>
                                {{ pendidikanFormal[0] }}
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>b. Pendidikan dan Pelatihan</td>
                            <td>
                                <div v-for="diklat in diklat" :key="diklat.id_diklat">
                                    {{ diklat.diklat }}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td></td>
                            <td>c. Pengalaman Kerja</td>
                            <td>
                                {{ pengalaman }}
                            </td>
                        </tr>
                    </table>
                    <br>
                    <div class="tugas-pokok">
                        <h6>6. Tugas Pokok</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Uraian Tugas</th>
                                <th>Hasil Kerja</th>
                                <th>Jumlah Hasil</th>
                                <th>Waktu Penyelesaian</th>
                                <th>Waktu Efektif</th>
                                <th>Kebutuhan Pegawai</th>
                            </thead>
                            <tbody>
                                <tr v-if="tugas.length === 0">
                                    <td colspan="7">Belum memilih tugas</td>
                                </tr>
                                <tr v-for="(tugas, index) in tugas" :key="tugas.id_tugas">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ tugas.uraian_tugas }}</td>
                                    <td>{{ tugas.hasil_kerja }}</td>
                                    <td>{{ tugas.vol_hasil_kerja }}</td>
                                    <td>{{ tugas.waktu_penyelesaian }}</td>
                                    <td>{{ tugas.waktu_efektif }}</td>
                                    <td>
                                        <div>
                                            <input type="number" class="form-control form-control-sm kebutuhan-pegawai" :value="(tugas.vol_hasil_kerja * tugas.waktu_penyelesaian) / tugas.waktu_efektif" disabled>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td colspan="6">Jumlah</td>
                                    <td><input type="number" class="form-control form-control-sm" disabled :value="jumlahPegawai"></td>
                                </tr>
                                <tr>
                                    <td colspan="6">Jumlah Pegawai</td>
                                    <td><input type="number" class="form-control form-control-sm" disabled :value="jumlahPegawaiRounded"></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="hasil-kerja">
                        <h6>7. Hasil Kerja</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Hasil Kerja</th>
                            </thead>
                            <tbody>
                                <tr v-if="tugas.length === 0">
                                    <td colspan="2">Belum memilih tugas</td>
                                </tr>
                                <tr v-for="(tugas, index) in tugas" :key="tugas.id_tugas">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ tugas.uraian_hasil_kerja }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="bahan-kerja">
                        <h6>8. Bahan Kerja</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Bahan Kerja</th>
                                <th>Penggunaan</th>
                            </thead>
                            <tbody>
                                <tr v-if="bahanKerja.length === 0">
                                    <td colspan="3">Belum memilih bahan kerja</td>
                                </tr>
                                <tr v-for="(bahanKerja, index) in bahanKerja" :key="bahanKerja.id_bahan_kerja">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ bahanKerja.bahan_kerja }}</td>
                                    <td>{{ bahanKerja.penggunaan }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="perangkat-kerja">
                        <h6>9. Perangkat Kerja</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Perangkat Kerja</th>
                                <th>Penggunaan</th>
                            </thead>
                            <tbody>
                                <tr v-if="perangkatKerja.length === 0">
                                    <td colspan="3">Belum memilih tugas</td>
                                </tr>
                                <tr v-for="(perangkatKerja, index) in perangkatKerja" :key="perangkatKerja.id_perangkat_kerja">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ perangkatKerja.perangkat_kerja }}</td>
                                    <td>{{ perangkatKerja.penggunaan }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="tanggung-jawab">
                        <h6>10. Tanggung Jawab</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Tanggung Jawab</th>
                            </thead>
                            <tbody>
                                <tr v-if="tanggungJawab.length === 0">
                                    <td colspan="2">Belum memilih tanggung jawab</td>
                                </tr>
                                <tr v-for="(tanggungJawab, index) in tanggungJawab" :key="tanggungJawab.id_tanggung_jawab">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ tanggungJawab.tanggung_jawab }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="wewenang">
                        <h6>11. Wewenang</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Wewenang</th>
                            </thead>
                            <tbody>
                                <tr v-if="wewenang.length === 0">
                                    <td colspan="2">Belum memilih wewenang</td>
                                </tr>
                                <tr v-for="(wewenang, index) in wewenang" :key="wewenang.id_wewenang">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ wewenang.wewenang }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="korelasi-jabatan">
                        <h6>12. Korelasi Jabatan</h6>
                        <table class="table table-bordered table-sm table-hover table-responsive-xl">
                            <thead>
                                <tr class="table-head">
                                    <th class="column-title">Nama Jabatan</th>
                                    <th class="column-title">Unit Kerja</th>
                                    <th class="column-title">Dalam Hal</th>
                                </tr>
                            </thead>
                            <tbody id="list-table">
                                <tr v-if="korelasiJabatan.length === 0">
                                    <td colspan="3">Belum mengisi korelasi jabatan</td>
                                </tr>
                                <tr class="row-list" v-for="(korelasiJabatan) in korelasiJabatan" :key="korelasiJabatan.id_tbl_korelasi_jabatan">
                                    <td>{{ korelasiJabatan.nama_jabatan }}</td>
                                    <td>{{ korelasiJabatan.unit_kerja }}</td>
                                    <td>{{ korelasiJabatan.dalam_hal }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="lingkungan-kerja">
                        <h6>13. Lingkungan Kerja</h6>
                        <table class="table table-bordered table-sm table-responsive-xl">
                            <thead>
                                <tr class="table-head">
                                    <th class="column-title">No</th>
                                    <th class="column-title">Aspek</th>
                                    <th class="column-title">Faktor</th>
                                </tr>
                            </thead>
                            <tbody id="list-table">
                                <tr>
                                    <td>1</td>
                                    <td>Tempat Kerja</td>
                                    <td>
                                        {{ lingkunganKerja.tempat_kerja }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Suhu</td>
                                    <td>
                                        {{ lingkunganKerja.suhu }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Udara</td>
                                    <td>
                                        {{ lingkunganKerja.udara }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Keadaan Ruangan</td>
                                    <td>
                                        {{ lingkunganKerja.keadaan_ruangan }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Letak</td>
                                    <td>
                                        {{ lingkunganKerja.letak }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Penerangan</td>
                                    <td>
                                        {{ lingkunganKerja.penerangan }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>7</td>
                                    <td>Suara</td>
                                    <td>
                                        {{ lingkunganKerja.suara }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>8</td>
                                    <td>Keadaan Tempat Kerja</td>
                                    <td>
                                        {{ lingkunganKerja.keadaan_tempat_kerja }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>9</td>
                                    <td>Getaran</td>
                                    <td>
                                        {{ lingkunganKerja.getaran }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="resiko-bahaya">
                        <h6>14. Resiko Bahaya</h6>
                        <table class="table table-bordered table-sm table-hover table-responsive-xl">
                            <thead>
                                <tr class="table-head">
                                    <th class="column-title">Nama Resiko</th>
                                    <th class="column-title">Penyebab</th>
                                </tr>
                            </thead>
                            <tbody id="list-table-resiko">
                                <tr v-if="resikoBahaya.length === 0">
                                    <td colspan="2">Belum mengisi resiko bahaya</td>
                                </tr>
                                <tr class="row-list-resiko" v-for="(resikoBahaya) in resikoBahaya" :key="resikoBahaya.id_resiko_bahaya">
                                    <td>{{ resikoBahaya.nama_resiko }}</td>
                                    <td>{{ resikoBahaya.penyebab }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="keterampilan-kerja">
                        <h6>a. Keterampilan Kerja</h6>
                        <table class="table table-bordered table-sm table-hover table-responsive-xl">
                            <thead>
                                <tr class="table-head">
                                    <th class="column-title">Keterampilan Kerja</th>
                                </tr>
                            </thead>
                            <tbody id="list-table-keterampilan">
                                <tr v-if="keterampilanKerja.length === 0">
                                    <td>Belum mengisi keterampilan kerja</td>
                                </tr>
                                <tr class="row-list-keterampilan" v-for="(keterampilanKerja) in keterampilanKerja" :key="keterampilanKerja.id_tbl_keterampilan">
                                    <td>{{ keterampilanKerja.keterampilan_kerja }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="bakat-kerja">
                        <h6>b. Bakat Kerja</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Bakat Kerja</th>
                                <th>Uraian</th>
                            </thead>
                            <tbody>
                                <tr v-if="bakatKerja.length === 0">
                                    <td colspan="3">Belum memilih bakat kerja</td>
                                </tr>
                                <tr v-for="(bakatKerja, index) in bakatKerja" :key="bakatKerja.id_bakat_kerja">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ bakatKerja.bakat_kerja }}</td>
                                    <td>{{ bakatKerja.uraian }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="temperamen-kerja">
                        <h6>c. Temperamen Kerja</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Temperamen Kerja</th>
                                <th>Uraian</th>
                            </thead>
                            <tbody>
                                <tr v-if="bakatKerja.length === 0">
                                    <td colspan="3">Belum memilih temperamen kerja</td>
                                </tr>
                                <tr v-for="(temperamenKerja, index) in temperamenKerja" :key="temperamenKerja.id_temperamen_kerja">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ temperamenKerja.temperamen_kerja }}</td>
                                    <td>{{ temperamenKerja.uraian }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="minat-kerja">
                        <h6>d. Minat Kerja</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Minat Kerja</th>
                                <th>Uraian</th>
                            </thead>
                            <tbody>
                                <tr v-if="minatKerja.length === 0">
                                    <td colspan="3">Belum memilih minat kerja</td>
                                </tr>
                                <tr v-for="(minatKerja, index) in minatKerja" :key="minatKerja.id_minat_kerja">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ minatKerja.minat_kerja }}</td>
                                    <td>{{ minatKerja.uraian }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="upaya-fisik">
                        <h6>e. Upaya Fisik</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Upaya Fisik</th>
                                <th>Uraian</th>
                            </thead>
                            <tbody>
                                <tr v-if="upayaFisik.length === 0">
                                    <td colspan="3">Belum memilih upaya fisik</td>
                                </tr>
                                <tr v-for="(upayaFisik, index) in upayaFisik" :key="upayaFisik.id_tbl_upaya_fisik">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ upayaFisik.upaya_fisik }}</td>
                                    <td>{{ upayaFisik.uraian }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="kondisi-fisik">
                        <h6>f. Kondisi Fisik</h6>
                        <table class="table table-bordered table-sm table-responsive-xl">
                            <thead>
                                <tr class="table-head">
                                    <th class="column-title" width="5%">No</th>
                                    <th class="column-title">Kondisi fisik</th>
                                    <th class="column-title">Uraian</th>
                                </tr>
                            </thead>
                            <tbody id="list-table">
                                <tr>
                                    <td>1</td>
                                    <td>Jenis Kelamin</td>
                                    <td>
                                        {{ kondisiFisik['Jenis Kelamin'] }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Umur</td>
                                    <td>
                                        {{ kondisiFisik['Umur'] }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Tinggi Badan</td>
                                    <td>
                                        {{ kondisiFisik['Tinggi Badan'] }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>Berat Badan</td>
                                    <td>
                                        {{ kondisiFisik['Berat Badan'] }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>5</td>
                                    <td>Postur Badan</td>
                                    <td>
                                        {{ kondisiFisik['Postur Badan'] }}
                                    </td>
                                </tr>
                                <tr>
                                    <td>6</td>
                                    <td>Penampilan</td>
                                    <td>
                                        {{ kondisiFisik['Penampilan'] }}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="fungsi-pekerjaan">
                        <h6>g. Fungsi Pekerjaan</h6>
                        <table class="table table-sm table-bordered table-responsive-xl display">
                            <thead class="table-head">
                                <th>No</th>
                                <th>Fungsi Pekerjaan</th>
                                <th>Uraian</th>
                            </thead>
                            <tbody>
                                <tr v-if="fungsiPekerjaan.length === 0">
                                    <td colspan="3">Belum memilih fungsi pekerjaan</td>
                                </tr>
                                <tr v-for="(fungsiPekerjaan, index) in fungsiPekerjaan" :key="fungsiPekerjaan.id_tbl_fungsi_pekerjaan">
                                    <td>{{ index + 1 }}</td>
                                    <td>{{ fungsiPekerjaan.fungsi_pekerjaan }}</td>
                                    <td>{{ fungsiPekerjaan.uraian }}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                    <br>
                    <div class="prestasi dan kelas">
                        <table class="table table-borderless table-sm">
                            <tr>
                                <td width="30%">
                                    <h6>16. Prestasi Kerja yang Diharapkan</h6>
                                </td>
                                <td>
                                    {{ prestasiKerja }}
                                </td>
                            </tr>
                            <tr>
                                <td width="30%">
                                    <h6>17. Kelas Jabatan</h6>
                                </td>
                                <td>
                                    {{ kelasJabatan }}
                                </td>
                            </tr>
                        </table>
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
            jptUtama: 'Badan Meteorologi, Klimatologi, dan Geofisika',
            ikhtisarJabatan: [],
            pendidikanFormal: [],
            diklat: [],
            pengalaman: '',
            tugas: [],
            bahanKerja: [],
            perangkatKerja: [],
            tanggungJawab: [],
            wewenang: [],
            korelasiJabatan: [],
            lingkunganKerja: {},
            resikoBahaya: [],
            keterampilanKerja: [],
            bakatKerja: [],
            temperamenKerja: [],
            minatKerja: [],
            upayaFisik: [],
            kondisiFisik: {},
            fungsiPekerjaan: [],
            prestasiKerja: '',
            kelasJabatan: '',
        }
    },
    mounted () {
        this.checkAuthentication()
        this.getData()
    },
    computed: {
        jumlahPegawai () {
            return (
                this.tugas.reduce((a, b) => a + ((b.vol_hasil_kerja * b.waktu_penyelesaian) / b.waktu_efektif), 0)
            )
        },

        jumlahPegawaiRounded () {
            return Math.round(this.jumlahPegawai)
        }
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
            await Promise.all([
                this.getIkhtisarJabatan(),
                this.getPendidikanFormal(),
                this.getDiklat(),
                this.getPengalaman(),
                this.getTugasPokok(),
                this.getBahanKerja(),
                this.getPerangkatKerja(),
                this.getTanggungJawab(),
                this.getWewenang(),
                this.getKorelasiJabatan(),
                this.getLingkunganKerja(),
                this.getResikoBahaya(),
                this.getKeterampilanKerja(),
                this.getBakatKerja(),
                this.getTemperamenKerja(),
                this.getMinatKerja(),
                this.getUpayaFisik(),
                this.getKondisiFisik(),
                this.getFungsiPekerjaan(),
                this.getPrestasiKerja(),
                this.getKelasJabatan()
            ])
            .catch((error) => {
                if (error.response.status === 404) {
                    // pass
                } else if (error.response.status === 401) {
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

        async getIkhtisarJabatan () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            
            const responseIkhtisar = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/ikhtisar-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            this.ikhtisarJabatan.push(responseIkhtisar.data.data.ikhtisarJabatan[0].ikhtisar_jabatan)
        },

        async getPendidikanFormal () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responsePendidikan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/pendidikan/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            this.pendidikanFormal.push(responsePendidikan.data.data.pendidikan[0].pendidikan)
        },

        async getDiklat () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            
            const responseDiklat = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/diklat/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            for (let i = 0; i < responseDiklat.data.data.diklat.length; i++) {
                this.diklat.push(responseDiklat.data.data.diklat[i])
            }
        },

        async getPengalaman () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responsePengalaman = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/pengalaman-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config)
            this.pengalaman = responsePengalaman.data.data.pengalamanKerja[0].pengalaman
        },

        async getTugasPokok () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseTugas = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/tugas/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.tugas = responseTugas.data.data.tugas
        },

        async getBahanKerja () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseBahanKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/bahan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.bahanKerja = responseBahanKerja.data.data.bahanKerja
        },

        async getPerangkatKerja () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responsePerangkatKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/perangkat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.perangkatKerja = responsePerangkatKerja.data.data.perangkatKerja
        },

        async getTanggungJawab () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseTanggungJawab = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/tanggung-jawab/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.tanggungJawab = responseTanggungJawab.data.data.tanggungJawab
        },

        async getWewenang () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseWewenang = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/wewenang/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.wewenang = responseWewenang.data.data.wewenang
        },

        async getKorelasiJabatan () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseKorelasiJabatan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/korelasi-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.korelasiJabatan = responseKorelasiJabatan.data.data.korelasiJabatan
        },

        async getLingkunganKerja () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseLingkunganKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/lingkungan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            for (let i = 0; i < responseLingkunganKerja.data.data.lingkunganKerja.length; i++) {
                this.lingkunganKerja[responseLingkunganKerja.data.data.lingkunganKerja[i].aspek] = responseLingkunganKerja.data.data.lingkunganKerja[i].faktor
            }
        },

        async getResikoBahaya () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseResikoBahaya = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/resiko-bahaya/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.resikoBahaya = responseResikoBahaya.data.data.resikoBahaya
        },

        async getKeterampilanKerja () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseKeterampilanKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/keterampilan-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.keterampilanKerja = responseKeterampilanKerja.data.data.keterampilanKerja
        },

        async getBakatKerja () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseBakatKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/bakat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.bakatKerja = responseBakatKerja.data.data.bakatKerja
        },

        async getTemperamenKerja () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseTemperamenKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/temperamen-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.temperamenKerja = responseTemperamenKerja.data.data.temperamenKerja
        },

        async getMinatKerja () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseMinatKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/minat-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.minatKerja = responseMinatKerja.data.data.minatKerja
        },

        async getUpayaFisik () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseUpayaFisik = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/upaya-fisik/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.upayaFisik = responseUpayaFisik.data.data.upayaFisik
        },

        async getKondisiFisik () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }

            const responseKondisiFisik = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/kondisi-fisik/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            for (let i = 0; i < responseKondisiFisik.data.data.kondisiFisik.length; i++) {
                this.kondisiFisik[responseKondisiFisik.data.data.kondisiFisik[i].kondisi_fisik] = responseKondisiFisik.data.data.kondisiFisik[i].uraian
            }
        },

        async getFungsiPekerjaan () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseFungsiPekerjaan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/fungsi-pekerjaan/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.fungsiPekerjaan = responseFungsiPekerjaan.data.data.fungsiPekerjaan
        },

        async getPrestasiKerja () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responsePrestasiKerja = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/prestasi-kerja/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.prestasiKerja = responsePrestasiKerja.data.data.prestasiKerja[0].prestasi_kerja
        },

        async getKelasJabatan () {
            const token = localStorage.getItem('token')

            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }

            const responseKelasJabatan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/kelas-jabatan/jabatan/${this.dataJabatan[0].id_jabatan}`, config);
            this.kelasJabatan = responseKelasJabatan.data.data.kelasJabatan[0].kelas_jabatan
        },
    }
};
</script>

<style scoped>
.container-analisis-biodata {
    display: flex;
}

table {
    width: 100%;
}

tr td {
    padding: 10px;
    vertical-align: top;
}

.action-button {
    padding: 5px;
}

.btn-continue {
    margin-left: 10px;
}
</style>
  