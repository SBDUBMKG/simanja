<template>
    <div>
        <div class="container-dashboard">
            <SidebarMenu/>
            <div class="container-content">
                <NavbarDashboard/>
                <div class="main-content-dashboard">
					<h2 class="title-content">Dashboard</h2>
                    <div class="graph shadow">
                        <div class="filter-graph d-flex justify-content-start">
                            <label class="mr-2 mt-1">Satker</label>
                            <select v-model="selectedSatker" class="form-control form-control-sm mr-4" style="width: 300px;" @change="getDashboard">
                                <option value="01%">BMKG Pusat</option>
                                <option value="0105%">Kedeputian Meteorologi</option>
                                <option value="0104%">Kedeputian Klimatologi</option>
                                <option value="0102%">Kedeputian Geofisika</option>
                                <option value="0103%">Kedeputian Inskalrekjarkom</option>
                                <option value="0109%">Sekretariat Utama</option>
                                <option value="0108%">Pusat Penelitian dan Pengembangan</option>
                                <option value="0107%">Pusat Pendidikan dan Pelatihan</option>
                                <option value="0106%">Inspektorat</option>
                                <option value="07%">STMKG</option>
                                <option value="02%">Balai I</option>
                                <option value="03%">Balai II</option>
                                <option value="04%">Balai III</option>
                                <option value="05%">Balai IV</option>
                                <option value="06%">Balai V</option>
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
                                <VueApexCharts type="bar" height="250" :options="dashboardKomposisiPegawai.chartOptions" :series="dashboardKomposisiPegawai.series"></VueApexCharts>
                            </div>
                            <div class="graph shadow" style="width: 24%;">
                                <div class="graph-header">
                                    <h6 class="graph-title">Komposisi Pegawai</h6>
                                </div>
                                <div class="d-flex justity-content-center">
                                    <VueApexCharts type="donut" height="250" :options="dashboardKomposisiPegawaiDonut.chartOptions" :series="dashboardKomposisiPegawaiDonut.series"></VueApexCharts>
                                </div>
                            </div>
                        </div>
                        <div class="graph shadow">
                            <div class="graph-header">
                                <h6 class="graph-title">Status Progress Analisis Jabatan</h6>
                            </div>
                            <VueApexCharts type="bar" height="350" :options="dashboardStatusProgress.chartOptions" :series="dashboardStatusProgress.series"></VueApexCharts>
                        </div>
                        <div class="graph shadow">
                            <div class="graph-header">
                                <h6 class="graph-title">Jumlah Kebutuhan Pegawai</h6>
                            </div>
                            <VueApexCharts type="bar" height="350" :options="dashboardJumlahJabfung.chartOptions" :series="dashboardJumlahJabfung.series"></VueApexCharts>
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
            years: [],
            selectedYear: null,
            selectedSatker: '01%',
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
                        }
                    },
                    legend: {
                        position: 'right',
                        offsetY: 40
                    },
                    fill: {
                        opacity: 1
                    },
                    title: {
                        text: 'Status Progress Analisis Jabatan',
                        align: 'center',
                        margin: 10,
                        floating: false,
                        style: {
                            fontSize:  '14px',
                            fontWeight:  'bold',
                            color:  '#263238'
                        },
                    }
                },
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
                        }
                    },
                    yaxis: {
                        title: {
                            text: undefined
                        },
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
                        markers: {
                            fillColors: ['#00E396', '#775DD0']
                        }
                    }
                },
            },
            dashboardKomposisiPegawaiDonut: {
                series: [],
                chartOptions: {
                    chart: {
                        type: 'donut'
                    },
                    labels: ['Jumlah Existing', 'Jumlah Kebutuhan'],
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
        this.getDistinctYear()
    },
    methods: {
        async checkAuthentication () {
            const token = localStorage.getItem('token');

            if (!token) {
                console.error('Token not available');
                this.$router.push({ name: 'Home' })
            }
        },

        async getDistinctYear () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/dashboard/distinct-year`, config);
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
                this.getJumlahJabfung(),
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
                    idsatker: this.selectedSatker,
                    tahun: this.selectedYear
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/dashboard/status-progress`, payload, config);
                const result = response.data.data.status

                this.dashboardStatusProgress.series = []
                this.dashboardStatusProgress.chartOptions.xaxis.categories.length = 0

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

        async getJumlahJabfung () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const payload = {
                    idsatker: this.selectedSatker,
                    tahun: this.selectedYear
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/dashboard/kebutuhan-pegawai`, payload, config);
                const result = response.data.data.jabfung

                this.dashboardJumlahJabfung.series = []
                this.dashboardJumlahJabfung.chartOptions.xaxis.categories.length = 0

                const satker = []
                const jumlahKebutuhan = []
                
                for (let i=0; i<result.length; i++) {
                    for (let j=0; j<result[i].jumlah_per_satker.length; j++) {
                        if (i === 0) {
                            satker.push(result[i].jumlah_per_satker[j].satker)
                        }
                        if (jumlahKebutuhan[j] === undefined) {
                            jumlahKebutuhan[j] = []
                        }
                        jumlahKebutuhan[j].push(result[i].jumlah_per_satker[j].jumlah_kebutuhan)
                    }
                    this.dashboardJumlahJabfung.chartOptions.xaxis.categories.push(result[i].jabatan_fungsional)
                }

                this.dashboardJumlahJabfung.series = satker.map((satker, index) => {
                    return {
                        name: satker,
                        data: jumlahKebutuhan[index]
                    }
                })

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

        async getKomposisiPegawai () {
            try {
                const token = localStorage.getItem('token');

                const config = {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                };

                const payload = {
                    idsatker: this.selectedSatker,
                    tahun: this.selectedYear
                }

                const response = await axios.post(`${process.env.VUE_APP_BACKENDHOST}/dashboard/komposisi-pegawai`, payload, config);
                const result = response.data.data.komposisi

                this.dashboardKomposisiPegawai.series[0].data = []
                this.dashboardKomposisiPegawaiDonut.series = []

                const jabfung = []
                const jumlahKebutuhan = []
                const jumlahExisting = []

                const sumKebutuhan = []
                const sumExisting = []
                
                for (let i=0; i<result.length; i++) {
                    jabfung.push(result[i].jabatan_fungsional)

                    if (jumlahKebutuhan[i] === undefined && jumlahExisting[i] === undefined) {
                        jumlahKebutuhan[i] = []
                        jumlahExisting[i] =[]
                    }

                    for (let j=0; j<result[i].jumlah_per_satker.length; j++) {
                        jumlahKebutuhan[i].push(Number(result[i].jumlah_per_satker[j].jumlah_kebutuhan))
                        jumlahExisting[i].push(Number(result[i].jumlah_per_satker[j].jumlah_existing))
                    }

                    sumKebutuhan.push(jumlahKebutuhan[i].reduce((a, b) =>  a + b, 0))
                    sumExisting.push(jumlahExisting[i].reduce((a, b) => a + b, 0))
                }

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
    margin-top: 10px;
    background-color: white;
}

.graph-header {
    /* padding: 5px; */
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
  