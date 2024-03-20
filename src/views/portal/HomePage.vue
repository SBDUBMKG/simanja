<template>
  <div>
    <NavbarPortal :transparent="transparentNavbar" @scroll="handleScroll"/>
    <div class="jumbotron jumbotron-fluid" ref="jumbotron">
      <div class="container" style="margin-top: 100px;">
        <div class="d-flex justify-content-center" style="margin-bottom: 10px;">
          <img src="@/assets/logo-BMKG.png" width="80" alt="bmkg-logo">
        </div>
        <h1 class="display-4">SIMANJA</h1>
        <p class="lead">
          Sistem Informasi Manajemen Analisis Jabatan dan Beban Kerja<br>Badan Meteorologi, Klimatologi, dan Geofisika
        </p>
      </div>
    </div>
    <div class="process-steps container-fluid content" @scroll="handleScroll">
      <div class="title-content text-center">
        <p>Alur Analisis Jabatan</p>
      </div>
      <div class="container-fluid row d-flex justify-content-center">
        <div class="col-lg-2 item-content">
          <div class="d-flex justify-content-between">
            <div class="step-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-table-plus" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12.5 21h-7.5a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v7.5" /><path d="M3 10h18" /><path d="M10 3v18" /><path d="M16 19h6" /><path d="M19 16v6" /></svg>
            </div>
            <h1 class="display-4 step-number">01</h1>
          </div>
          <h6 class="step-title">Tambah Data Jabatan</h6>
          <p class="step-desc">User menginput salah satu jabatan fungsional dan tahun anjab</p>
        </div>
        <div class="col-lg-2 item-content">
          <div class="d-flex justify-content-between">
            <div class="step-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clipboard-list" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 5h-2a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-12a2 2 0 0 0 -2 -2h-2" /><path d="M9 3m0 2a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-2a2 2 0 0 1 -2 -2z" /><path d="M9 12l.01 0" /><path d="M13 12l2 0" /><path d="M9 16l.01 0" /><path d="M13 16l2 0" /></svg>
            </div>
            <h1 class="display-4 step-number">02</h1>
          </div>
          <h6 class="step-title">Input Analisis Jabatan</h6>
          <p class="step-desc">User menginput form analisis berdasarkan data di tahun anjab</p>
        </div>
        <div class="col-lg-2 item-content">
          <div class="d-flex justify-content-between">
            <div class="step-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-brand-telegram" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 10l-4 4l6 6l4 -16l-18 7l4 2l2 6l3 -4" /></svg>
            </div>
            <h1 class="display-4 step-number">03</h1>
          </div>
          <h6 class="step-title">Kirim Analisis Jabatan</h6>
          <p class="step-desc">User mengirim analisis jabatan kepada verifikator</p>
        </div>
        <div class="col-lg-2 item-content">
          <div class="d-flex justify-content-between">
            <div class="step-icon">
              <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-checklist" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9.615 20h-2.615a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v8" /><path d="M14 19l2 2l4 -4" /><path d="M9 8h4" /><path d="M9 12h2" /></svg>
            </div>
            <h1 class="display-4 step-number">04</h1>
          </div>
          <h6 class="step-title">Verifikasi Analisis Jabatan</h6>
          <p class="step-desc">Verifikator melakukan verifikasi terhadap data anjab yang dikirimkan</p>
        </div>
      </div>
    </div>
    <div v-if="statisticLoaded" class="statistic container-fluid content">
      <div class="title-content text-center">
        <p>Statistik</p>
      </div>
      <div class="stat-container container d-flex justify-content-center align-item-center text-center shadow">
          <div class="col-lg-4">
            <h1><strong>{{ statistic.fungsional }}</strong></h1>
            <p class="badge bg-pale-blue">Jabatan Fungsional</p>
          </div>
          <div class="col-lg-4">
            <h1><strong>{{ statistic.struktural }}</strong></h1>
            <p class="badge bg-pale-green">Jabatan Struktural</p>
          </div>
          <div class="col-lg-4">
            <h1><strong>{{ statistic.satker }}</strong></h1>
            <p class="badge bg-pale-grey">Unit Kerja</p>
          </div>
      </div>
    </div>
    <div v-if="articlesLoaded" class="articles container-fluid content">
      <div class="title-content text-left">
        <p>Berita dan Artikel</p>
      </div>
      <Carousel v-bind="settings" :autoplay="5000" :breakpoints="breakpoints">
        <Slide v-for="article in articles" :key="article.id_article">
          <div class="carousel__item" style="width: 450px; height: 500px; vertical-align: top;">
            <router-link :to="{ name: 'ArticleDetail', params: { articleid: article.id_article } }" style="text-decoration: none;">
              <div class="article-img" :style="{ backgroundImage: `url(${backendHost}/image/${article.img})` }"></div>
              <div class="article-type">
                <p class="text-left">ARTIKEL</p>
              </div>
              <div class="article-title">
                <p class="text-justify">{{ article.title }}</p>
              </div>
              <div class="article-date">
                <p class="text-justify">{{ changeDateFormat(article.created_at) }}</p>
              </div>
            </router-link>
          </div>
        </Slide>

        <template #addons>
          <Pagination />
        </template>
      </Carousel>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarPortal from '@/components/NavbarPortal.vue';
import Footer from '@/components/Footer.vue';
import { Carousel, Pagination, Slide } from 'vue3-carousel'
import 'vue3-carousel/dist/carousel.css'

export default {
  name: "HomePage",
  components: {
    NavbarPortal,
    Footer,
    Carousel,
    Pagination,
    Slide
  },
  data () {
    return {
      backendHost: process.env.VUE_APP_BACKENDHOST,
      transparentNavbar: true,
      statistic: {
        fungsional: null,
        struktural: null,
        satker: null,
      },
      statisticLoaded: false,
      articles: null,
      articlesLoaded: false,
      settings: {
        itemsToShow: 1,
        snapAlign: 'center',
      },
      breakpoints: {
        1024: {
          itemsToShow: 2,
          snapAlign: 'center',
        },
        1300: {
          itemsToShow: 3,
          snapAlign: 'start',
        },
        1600: {
          itemsToShow: 4,
          snapAlign: 'start',
        },
      },
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted () {
    Promise.all([
      this.loadStatistic(),
      this.loadArticles()
    ])
  },
  methods: {
    handleScroll () {
      const jumbotronTop = this.$refs.jumbotron.getBoundingClientRect().top
      this.transparentNavbar = jumbotronTop >= 0
    },

    changeDateFormat (upload_time) {
        const date = new Date(upload_time)

        const day = date.getDate()
        const month = date.getMonth()
        const year = date.getFullYear()

        const months =  ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]
        
        return (`${day} ${months[month]} ${year}`)
    },

    async loadStatistic () {
      try {
        const responseJabatan = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/fungsional/count`)
        this.statistic.fungsional = responseJabatan.data.data.jabatan[0].fungsionalcount
        this.statistic.struktural = responseJabatan.data.data.jabatan[0].strukturalcount

        const responseSatker = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/master/satker/count`)
        this.statistic.satker = responseSatker.data.data.satker[0].satkercount

        this.statisticLoaded = true
      } catch (error) {
          this.$swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.response.data.message
          })
        
      }
    },

    async loadArticles () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/articles/latest`)
        this.articles = response.data.data.articles
        this.articlesLoaded = true
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
  .jumbotron {
    background-image: url('@/assets/jumbotron.jpg');
    background-size: cover;
    background-position: center;
    color: #fff;
    padding: 4rem 0;
    margin-bottom: 0;
    height: 550px;
  }

  .jumbotron h1, .jumbotron p {
    text-align: center;
    color: #FEFEFE;
  }

  .content {
    padding: 30px 30px 100px 30px;
  }

  .title-content {
    margin: 30px 0 30px 0;
  }

  .sub-title {
    margin-bottom: 50px;
  }

  .sub-title, .step-desc {
    color: rgb(105, 105, 105);
  }

  .item-content {
    padding: 10px;
  }

  .step-number {
    color: rgb(176, 176, 176);
  }

  .step-icon {
    color: rgb(50, 50, 50);
    display: flex;
    flex-direction: column-reverse;
    padding-bottom: 15px;
  }

  .step-title {
    color: rgb(50, 50, 50);
    font-weight: 600;
  }

  .stat-container {
    background-color: white;
    padding: 50px;
    border-radius: 10px;
    border-style: solid;
    border-color: rgb(216, 216, 216);
    border-width: 1px;
  }

  .badge {
    padding: 10px;
    font-size: 15px;
  }

  .bg-pale-blue {
    background-color: #e0e9fa;
    color: #3f78e0;
  }

  .bg-pale-green {
    background-color: #e1f6f0;
    color: #3f78e0;
  }

  .bg-pale-grey {
    background-color: #dfe0e3;
    color: #343f52;
  }

  .row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }

  .process-steps, .articles {
    background-color: #eff1ff;
  }

  .article-img {
    background-size: cover;
    background-position: center;
    border-radius: 5px;
    height: 50%;
    width: 100%;
  }

  .article-type {
    margin: 20px 0;
    font-size: 15px;
    height: 5%;
    color: #3f78e0;
    font-weight: 600;
    letter-spacing: 0.5px;
  }

  .article-title {
    line-height: 1.55;
    height: 25%;
    letter-spacing: 0.5px;
    color: rgb(50, 50, 50);
    font-weight: 600;
  }

  .article-date {
    height: 20%;
    color: rgb(105, 105, 105);
  }

  .overlay {
    background-color: rgba(0, 0, 0, 0.4);
    position: relative;
    width: 100%;
    height: 100%;
  }
</style>
