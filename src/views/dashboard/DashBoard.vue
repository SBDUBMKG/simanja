<template>
    <div>
        <div class="container-dashboard">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div v-if="role" class="main-content-dashboard">
					<h2 class="title-content">Dashboard</h2>
                    <div class="d-flex justify-content-between">
                        <div class="box shadow">
                            <div class="content-box d-flex justify-content-between">
                                <div>
                                    <h4 class="total-text sudah-diverifikasi">{{ totalProgress.sudah_diverifikasi }}</h4>
                                    <h6 class="subtotal-text">Jabatan</h6>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checks" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="#636363" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M7 12l5 5l10 -10" /><path d="M2 12l5 5m5 -5l5 -5" /></svg>
                            </div>
                            <div class="lower-box sudah-diverifikasi">
                                <h6>Sudah Diverifikasi</h6>
                            </div>
                        </div>
                        <div class="box shadow">
                            <div class="content-box d-flex justify-content-between">
                                <div>
                                    <h4 class="total-text dikembalikan">{{ totalProgress.dikembalikan }}</h4>
                                    <h6 class="subtotal-text">Jabatan</h6>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-arrow-forward" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="#636363" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 11l4 4l-4 4m4 -4h-11a4 4 0 0 1 0 -8h1" /></svg>
                            </div>
                            <div class="lower-box dikembalikan">
                                <h6>Dikembalikan</h6>
                            </div>
                        </div>
                        <div class="box shadow">
                            <div class="content-box d-flex justify-content-between">
                                <div>
                                    <h4 class="total-text sudah-dikirim">{{ totalProgress.sudah_dikirim }}</h4>
                                    <h6 class="subtotal-text">Jabatan</h6>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-send" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="#636363" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M10 14l11 -11" /><path d="M21 3l-6.5 18a.55 .55 0 0 1 -1 0l-3.5 -7l-7 -3.5a.55 .55 0 0 1 0 -1l18 -6.5" /></svg>
                            </div>
                            <div class="lower-box sudah-dikirim">
                                <h6>Sudah Dikirim</h6>
                            </div>
                        </div>
                        <div class="box shadow">
                            <div class="content-box d-flex justify-content-between">
                                <div>
                                    <h4 class="total-text belum-dikirim">{{ totalProgress.belum_dikirim }}</h4>
                                    <h6 class="subtotal-text">Jabatan</h6>
                                </div>
                                <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-report" width="40" height="40" viewBox="0 0 24 24" stroke-width="2" stroke="#636363" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h5.697" /><path d="M18 14v4h4" /><path d="M18 11v-4a2 2 0 0 0 -2 -2h-2" /><path d="M8 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M18 18m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M8 11h4" /><path d="M8 15h3" /></svg>
                            </div>
                            <div class="lower-box belum-dikirim">
                                <h6>Belum Dikirim</h6>
                            </div>
                        </div>
                    </div>
                    <div class="graph shadow">
                        <div class="filter-graph d-flex justify-content-start">
                            <label class="mr-2 mt-1">Satker</label>
                            <select v-if="role === 'Administrator' || role === 'Verifikator'" v-model="selectedSatker" class="form-control form-control-sm mr-4" style="width: 300px;" @change="getDashboard">
                                <option v-for="satker in satker" :value="satker" :key="satker.id">{{ satker.satker }}</option>
                            </select>
                            <select v-else v-model="selectedSatker" disabled class="form-control form-control-sm mr-4" style="width: 300px;">
                                <option :value="selectedSatker">{{ selectedSatker.satker }}</option>
                            </select>
                            <label class="mr-2 mt-1">Tahun</label>
                            <select v-if="years.length !== 0" v-model="selectedYear" class="form-control form-control-sm" style="width: 100px;" @change="getDashboard">
                                <option v-for="year in years" :key="year.tahun_jabatan" :value="year.tahun_jabatan">{{ year.tahun_jabatan }}</option>
                            </select>
                        </div>
                    </div>
                    <div v-if="selectedYear">
                        <div class="row-1 d-flex justify-content-between">
                            <div class="graph shadow" style="width: 75%;">
                                <div class="graph-header">
                                    <h6 class="graph-title">Komposisi Pegawai Existing dan Kebutuhan</h6>
                                </div>
                                <VueApexCharts ref="komposisiPegawaiChart" type="bar" height="300" :options="dashboardKomposisiPegawai.chartOptions" :series="dashboardKomposisiPegawai.series"></VueApexCharts>
                            </div>
                            <div class="graph shadow" style="width: 24%;">
                                <div class="graph-header">
                                    <h6 class="graph-title">Komposisi Pegawai</h6>
                                </div>
                                <div class="d-flex justity-content-center">
                                    <VueApexCharts type="donut" height="300" :options="dashboardKomposisiPegawaiDonut.chartOptions" :series="dashboardKomposisiPegawaiDonut.series"></VueApexCharts>
                                </div>
                            </div>
                        </div>
                        <div class="graph shadow">
                            <div class="graph-header">
                                <h6 class="graph-title">Jumlah Kebutuhan Pegawai</h6>
                            </div>
                            <VueApexCharts ref="jumlahJabfungChart" type="bar" height="350" :options="dashboardJumlahJabfung.chartOptions" :series="dashboardJumlahJabfung.series"></VueApexCharts>
                        </div>
                        <div class="graph shadow">
                            <div class="graph-header">
                                <h6 class="graph-title">Status Progress Analisis Jabatan</h6>
                            </div>
                            <VueApexCharts ref="statusProgressChart" type="bar" height="350" :options="dashboardStatusProgress.chartOptions" :series="dashboardStatusProgress.series"></VueApexCharts>
                        </div>
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
import VueApexCharts from 'vue3-apexcharts'

export default {
    components: {
        NavbarDashboard,
        SidebarMenu,
        VueApexCharts
    },
    data () {
        return {
            role: null,
            totalProgress: {
                sudah_diverifikasi: 0,
                dikembalikan: 0,
                sudah_dikirim: 0,
                belum_dikirim: 0
            },
            years: [],
            selectedYear: null,
            satker: [
                { id: '01%', satker: 'BMKG Pusat' },
                { id: '0105%', satker: 'Kedeputian Meteorologi' },
                { id: '0104%', satker: 'Kedeputian Klimatologi' },
                { id: '0102%', satker: 'Kedeputian Geofisika' },
                { id: '0103%', satker: 'Kedeputian Inskalrekjarkom' },
                { id: '0109%', satker: 'Sekretariat Utama' },
                { id: '0108%', satker: 'Pusat Penelitian dan Pengembangan' },
                { id: '0107%', satker: 'Pusat Pendidikan dan Pelatihan' },
                { id: '0106%', satker: 'Inspektorat' },
                { id: '07%', satker: 'STMKG' },
                { id: '02%', satker: 'Balai I' },
                { id: '03%', satker: 'Balai II' },
                { id: '04%', satker: 'Balai III' },
                { id: '05%', satker: 'Balai IV' },
                { id: '06%', satker: 'Balai V' },
            ],
            selectedSatker: {
                id: '01%',
                satker: 'BMKG Pusat'
            },
            dashboardStatusProgress: {
                series: [],
                chartOptions: {
                    chart: {
                        type: 'bar',
                        height: 200,
                        stacked: true,
                        toolbar: {
                            show: true
                        },
                        zoom: {
                            enabled: true
                        }
                    },
                    responsive: [{
                        breakpoint: 1000,
                        options: {
                            legend: {
                                position: 'bottom',
                                offsetX: -10,
                                offsetY: 0
                            }
                        }
                    }],
                    plotOptions: {
                        bar: {
                            horizontal: false,
                            borderRadius: 10,
                            dataLabels: {
                                total: {
                                    enabled: true,
                                    style: {
                                        fontSize: '13px',
                                        fontWeight: 900
                                    }
                                }
                            }
                        },
                    },
                    xaxis: {
                        type: 'string',
                        categories: [],
                        labels: {
                            showDuplicates: true,
                            maxHeight: 100,
                            trim: true
                        },
                        decimalsInFloat: 0,
                    },
                    yaxis: {
                        forceNiceScale: true
                    },
                    legend: {
                        position: 'right',
                        offsetY: 40
                    },
                    fill: {
                        opacity: 1
                    },
                    title: {
                        text: undefined,
                        align: 'center',
                        margin: 10,
                        floating: false,
                        style: {
                            fontSize:  '14px',
                            fontWeight:  'bold',
                            color:  '#263238'
                        },
                    }
                }
            },
            dashboardJumlahJabfung: {
                series: [],
                chartOptions: {
                    chart: {
                        type: 'bar',
                        height: 350,
                        stacked: true,
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                            dataLabels: {
                            total: {
                                enabled: true,
                                offsetX: 0,
                                style: {
                                    fontSize: '13px',
                                    fontWeight: 900
                                }
                            }
                            }
                        },
                    },
                    stroke: {
                        width: 1,
                        colors: ['#fff']
                    },
                    responsive: [{
                        breakpoint: 1000,
                        options: {
                            legend: {
                                position: 'bottom',
                                offsetX: -10,
                                offsetY: 0
                            }
                        }
                    }],
                    title: {
                        text: 'Jumlah Kebutuhan Pegawai JFT dan JFU',
                        align: 'center',
                        margin: 10,
                        floating: false,
                        style: {
                            fontSize:  '14px',
                            fontWeight:  'bold',
                            color:  '#263238'
                        },
                    },
                    xaxis: {
                        categories: [],
                        labels: {
                            showDuplicates: true,
                            maxHeight: 100,
                            trim: true
                        },
                        forceNiceScale: true,
                        decimalsInFloat: 2,
                    },
                    yaxis: {
                        title: {
                            text: undefined
                        },
                        forceNiceScale: true,
                        decimalsInFloat: 2,
                    },
                    fill: {
                        opacity: 1
                    },
                    legend: {
                        position: 'right',
                        offsetY: 40,
                        width: 200
                    }
                },
            },
            dashboardKomposisiPegawai: {
                series: [
                    {
                        name: 'Jumlah Pegawai Existing',
                        data: []
                    }
                ],
                chartOptions: {
                    chart: {
                        height: 350,
                        type: 'bar'
                    },
                    plotOptions: {
                        bar: {
                            horizontal: true,
                        }
                    },
                    colors: ['#00E396'],
                    legend: {
                        show: true,
                        showForSingleSeries: true,
                        customLegendItems: ['Jumlah Pegawai Existing', 'Jumlah Kebutuhan Pegawai'],
                        markers: {
                            fillColors: ['#00E396', '#775DD0']
                        }
                    },
                    title: {
                        text: undefined,
                        align: 'center',
                        margin: 10,
                        floating: false,
                        style: {
                            fontSize:  '14px',
                            fontWeight:  'bold',
                            color:  '#263238'
                        },
                    },
                },
            },
            dashboardKomposisiPegawaiDonut: {
                series: [],
                chartOptions: {
                    chart: {
                        type: 'donut'
                    },
                    labels: ['Jumlah Existing', 'Jumlah Kebutuhan'],
                    dataLabels: {
                        formatter: function (val, opts) {
                            return `${opts.w.config.series[opts.seriesIndex]} / ${Math.round(val*100)/100}%`
                        },
                        style: {
                            colors: ['#111111', '#111111']
                        },
                    },
                    responsive: [{
                        breakpoint: 1000,
                        options: {
                            chart: {
                                width: 500
                            }
                        }
                    }],
                    legend: {
                        position: 'bottom'
                    }
                },
            },
        }
    },
    mounted () {
        this.checkAuthentication()
        this.getTotalProgress()
        this.getDistinctYear()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }

            this.role = localStorage.getItem('role')

            if (this.role !== 'Administrator' && this.role !== 'Verifikator') {
                this.selectedSatker = {
                    id: `${localStorage.getItem('idsatker')}%`,
                    satker: localStorage.getItem('satker')
                }
            }
        },

        async getTotalProgress () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const payload = {
                    idsatker: this.selectedSatker.id
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/dashboard/total-progress`, payload, config);
                const result = response.data.data.status[0]

                this.totalProgress.sudah_diverifikasi = Number(result.sudah_diverifikasi)
                this.totalProgress.dikembalikan = Number(result.dikembalikan)
                this.totalProgress.sudah_dikirim = Number(result.sudah_dikirim)
                this.totalProgress.belum_dikirim = Number(result.belum_dikirim)
            } catch (error) {
                if (error.response.status === 401) {
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

        async getDistinctYear () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }

                const payload = {
                    idsatker: this.selectedSatker.id
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/dashboard/distinct-year`, payload, config);
                const result = response.data.data.tahun

                this.years = result
                
                const latestYear = result.slice(-1)
                this.selectedYear = latestYear[0].tahun_jabatan

                this.getDashboard()
            } catch (error) {
                if (error.response.status === 401) {
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

        async getDashboard () {
            await Promise.all([
                this.getStatusProgress(),
                this.getKomposisiPegawai()
            ])
        },

        async getStatusProgress () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const payload = {
                    idsatker: this.selectedSatker.id,
                    tahun: this.selectedYear
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/dashboard/status-progress`, payload, config);
                const result = response.data.data.status

                this.dashboardStatusProgress.series = []
                this.dashboardStatusProgress.chartOptions.xaxis.categories.length = 0

                const statusProgressChart = this.$refs.statusProgressChart.chart
                statusProgressChart.updateOptions({
                    title: {
                        text: `Status Progress Analisis Jabatan ${this.selectedSatker.satker} Tahun ${this.selectedYear}`
                    }
                })

                const belumDikirim = {
                    name: 'Belum Dikirim',
                    data: []
                }

                const sudahDikirim = {
                    name: 'Sudah Dikirim',
                    data: []
                }
                
                const dikembalikan = {
                    name: 'Dikembalikan',
                    data: []
                }

                const sudahDiverifikasi = {
                    name: 'Sudah Diverifikasi',
                    data: []
                }

                for (let i=0; i<result.length; i++) {
                    belumDikirim.data.push(result[i].status.belum_dikirim)
                    sudahDikirim.data.push(result[i].status.sudah_dikirim)
                    dikembalikan.data.push(result[i].status.dikembalikan)
                    sudahDiverifikasi.data.push(result[i].status.sudah_diverivikasi)
                    this.dashboardStatusProgress.chartOptions.xaxis.categories.push(result[i].satker)  
                }

                this.dashboardStatusProgress.series.push(belumDikirim, sudahDikirim, dikembalikan, sudahDiverifikasi)
            } catch (error) {
                console.log(error)
                if (error.response.status === 401) {
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

        async getKomposisiPegawai () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const payload = {
                    idsatker: this.selectedSatker.id,
                    tahun: this.selectedYear
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/dashboard/komposisi-pegawai`, payload, config);
                const result = response.data.data.komposisi

                this.dashboardJumlahJabfung.series = []
                this.dashboardJumlahJabfung.chartOptions.xaxis.categories.length = 0

                this.dashboardKomposisiPegawai.series[0].data = []
                this.dashboardKomposisiPegawaiDonut.series = []

                const jumlahJabfungChart = this.$refs.jumlahJabfungChart.chart
                jumlahJabfungChart.updateOptions({
                    title: {
                        text: `Jumlah Kebutuhan Pegawai JFT dan JFU ${this.selectedSatker.satker} Tahun ${this.selectedYear}`
                    }
                })  
                
                const komposisiPegawaiChart = this.$refs.komposisiPegawaiChart.chart
                komposisiPegawaiChart.updateOptions({
                    title: {
                        text: `Komposisi Pegawai Existing dan Kebutuhan ${this.selectedSatker.satker} Tahun ${this.selectedYear}`
                    }
                })  

                const jabfung = []
                const jumlahKebutuhan = []
                const jumlahExisting = []

                const sumKebutuhan = []
                const sumExisting = []

                const satker = []
                const jumlahKebutuhanJFT = []
                
                for (let i=0; i<result.length; i++) {
                    jabfung.push(result[i].jabatan_fungsional)

                    if (jumlahKebutuhan[i] === undefined && jumlahExisting[i] === undefined) {
                        jumlahKebutuhan[i] = []
                        jumlahExisting[i] =[]
                    }

                    for (let j=0; j<result[i].jumlah_per_satker.length; j++) {
                        if (i === 0) {
                            satker.push(result[i].jumlah_per_satker[j].satker)
                        }
                        if (jumlahKebutuhanJFT[j] === undefined) {
                            jumlahKebutuhanJFT[j] = []
                        }
                        jumlahKebutuhanJFT[j].push(Number(result[i].jumlah_per_satker[j].jumlah_kebutuhan))
                        jumlahKebutuhan[i].push(Number(result[i].jumlah_per_satker[j].jumlah_kebutuhan))
                        jumlahExisting[i].push(Number(result[i].jumlah_per_satker[j].jumlah_existing))
                    }
                    this.dashboardJumlahJabfung.chartOptions.xaxis.categories.push(result[i].jabatan_fungsional)

                    sumKebutuhan.push(jumlahKebutuhan[i].reduce((a, b) =>  a + b, 0))
                    sumExisting.push(jumlahExisting[i].reduce((a, b) => a + b, 0))
                }

                this.dashboardJumlahJabfung.series = satker.map((satker, index) => {
                    return {
                        name: satker,
                        data: jumlahKebutuhanJFT[index]
                    }
                })

                this.dashboardKomposisiPegawai.series[0].data = jabfung.map((jabfung, index) => {
                    return {
                        x: jabfung,
                        y: sumExisting[index],
                        goals: [
                            {
                                name: 'Jumlah Kebutuhan Pegawai',
                                value: sumKebutuhan[index],
                                strokeWidth: 5,
                                strokeHeight: 15,
                                strokeColor: '#775DD0'
                            }
                        ]
                    }
                })

                this.dashboardKomposisiPegawaiDonut.series.push(sumExisting.reduce((a, b) => a + b, 0))
                this.dashboardKomposisiPegawaiDonut.series.push(sumKebutuhan.reduce((a, b) => a + b, 0))

            } catch (error) {
                if (error.response.status === 401) {
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
    }
};
</script>

<style scoped>
/* Gaya CSS khusus untuk komponen ini */
@import 'datatables.net-bs5';

.container-dashboard {
    display: flex;
    contain: paint;
}

.graph {
    border-radius: 5px;
    padding: 10px 10px 0 10px;
    margin: 10px 0;
    background-color: white;
}

.box {
    background-color: white;
    border-radius: 5px;
    margin-bottom: 10px;
    width: 24%;
    height: 150px;
    overflow: hidden;
}

.box .content-box {
    padding: 30px 30px 20px 30px;
}

.subtotal-text {
    color: grey;
}

.total-text.sudah-diverifikasi {
    color: rgb(43, 183, 38);
}

.total-text.dikembalikan {
    color: #b72626;
}

.total-text.sudah-dikirim {
    color: #266bb7;
}

.total-text.belum-dikirim {
    color: #b77826;
}

.lower-box {
    color: white;
    height: 40px;
    padding: 8px 15px 8px 15px;
}

.lower-box.sudah-diverifikasi {
    background: rgb(43,183,38);
    background: linear-gradient(90deg, rgba(43,183,38,1) 0%, rgba(77,214,72,1) 50%, rgba(97,255,89,1) 100%);
}

.lower-box.dikembalikan {
    background: rgb(183,38,38);
    background: linear-gradient(90deg, rgba(183,38,38,1) 0%, rgba(214,72,72,1) 50%, rgba(255,89,89,1) 100%);
}

.lower-box.sudah-dikirim {
    background: rgb(38,107,183);
    background: linear-gradient(90deg, rgba(38,107,183,1) 0%, rgba(72,142,214,1) 50%, rgba(89,179,255,1) 100%);
}

.lower-box.belum-dikirim {
    background: rgb(183,120,38);
    background: linear-gradient(90deg, rgba(183,120,38,1) 0%, rgba(214,155,72,1) 50%, rgba(255,183,89,1) 100%);
}
.graph-header {
    border-bottom-style: solid;
    border-bottom-color: grey;
    border-bottom-width: 2px;
}

.graph-title {
    color: rgb(98, 98, 98);
}

label {
    /* font-size: ; */
    color: grey;
}
</style>
  