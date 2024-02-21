<template>
  <div>
    <nav id="navbar" class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" :class="{ 'transparent-navbar': transparentNavbar }">
      <a class="navbar-brand" href="#">
        <img src="@/assets/logo-simanja-white.svg" width="140" alt="simanja-logo">
      </a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>  
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item active">
            <a class="nav-link" href="#">Beranda</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Jabatan</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Unit Kerja</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Artikel</a>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Regulasi</a>
          </li>
        </ul>
        <div class="form-inline my-2 my-lg-0">
          <button class="btn btn-primary my-2 my-sm-0" @click="toLoginPage">
            <svg style="margin-top: -3px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg> Login
          </button>
        </div>
      </div>
    </nav>
    <div class="jumbotron jumbotron-fluid" ref="jumbotron">
      <div class="container" style="margin-top: 100px;">
        <div class="d-flex justify-content-center" style="margin-bottom: 10px;">
          <img src="@/assets/logo-BMKG.png" width="80" alt="bmkg-logo">
        </div>
        <h1 class="display-4">SIMANJA</h1>
        <p class="lead">
          Sistem Informasi Manajemen Analisis Jabatan dan Beban Kerja<br>Badan Meteorologi, Klimatologi, dan Geofisika
        </p>
        <!-- <div class="d-flex justify-content-center">
          <button class="btn btn-primary my-2 my-sm-0" @click="toLoginPage">
            <svg style="margin-top: -3px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-login-2" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 8v-2a2 2 0 0 1 2 -2h7a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-7a2 2 0 0 1 -2 -2v-2" /><path d="M3 12h13l-3 -3" /><path d="M13 15l3 -3" /></svg> Login
          </button>
        </div> -->
      </div>
    </div>
    <div class="process-steps container-fluid content" @scroll="handleScroll">
      <div class="title-content text-center">
        <h5>
          Alur Analisis Jabatan<br>
          <svg style="margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-separator" width="100" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12l0 .01" /><path d="M7 12l10 0" /><path d="M21 12l0 .01" /></svg>
        </h5>
      </div>
      <div class="text-center sub-title">
        <p>User dapat melakukan analisis jabatan dengan alur sebagai berikut</p>
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
    <div class="articles container-fluid content">
      <div class="title-content text-center">
        <h5>
          Berita dan Artikel<br>
          <svg style="margin-top: -5px;" xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-separator" width="100" height="50" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12l0 .01" /><path d="M7 12l10 0" /><path d="M21 12l0 .01" /></svg>
        </h5>
      </div>
      <div class="row container-fluid justify-content-center">
        <div class="column">
          <div class="article-box article-1" :style="{ backgroundImage: `url(${require('@/assets/article-1.jpeg')})` }">
            <div class="overlay">
              <div class="article-content">
                <h5 class="article-title">LOREM IPSUM DOLOR SIT AMET.</h5>
                <div class="separator"></div>
                <p class="article-upload-time">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-up" width="14" height="14" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.983 12.548a9 9 0 1 0 -8.45 8.436" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /><path d="M12 7v5l2.5 2.5" /></svg> 20 Februari 2024
                </p>
              </div>
            </div>
          </div>
          <div class="article-box article-4" :style="{ backgroundImage: `url(${require('@/assets/article-2.webp')})` }">
            <div class="overlay">
              <div class="article-content">
                <h6 class="article-title">LOREM IPSUM DOLOR SIT AMET.</h6>
                <div class="separator"></div>
                <p class="article-upload-time">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-up" width="14" height="14" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.983 12.548a9 9 0 1 0 -8.45 8.436" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /><path d="M12 7v5l2.5 2.5" /></svg> 20 Februari 2024
                </p>
              </div>
            </div>
          </div>
        </div>
        <div class="column">
          <div class="article-box article-2" :style="{ backgroundImage: `url(${require('@/assets/article-2.webp')})` }">
            <div class="overlay">
              <div class="article-content">
                <h6 class="article-title">LOREM IPSUM DOLOR SIT AMET.</h6>
                <div class="separator"></div>
                <p class="article-upload-time">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-up" width="14" height="14" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.983 12.548a9 9 0 1 0 -8.45 8.436" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /><path d="M12 7v5l2.5 2.5" /></svg> 20 Februari 2024
                </p>
              </div>
            </div>
          </div>
          <div class="article-box article-3" :style="{ backgroundImage: `url(${require('@/assets/article-3.jpg')})` }">
            <div class="overlay">
              <div class="article-content">
                <h6 class="article-title">LOREM IPSUM DOLOR SIT AMET.</h6>
                <div class="separator"></div>
                <p class="article-upload-time">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-up" width="14" height="14" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.983 12.548a9 9 0 1 0 -8.45 8.436" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /><path d="M12 7v5l2.5 2.5" /></svg> 20 Februari 2024
                </p>
              </div>
            </div>
          </div>
          <div class="article-box article-5" :style="{ backgroundImage: `url(${require('@/assets/article-3.jpg')})` }">
            <div class="overlay">
              <div class="article-content">
                <h6 class="article-title">LOREM IPSUM DOLOR SIT AMET.</h6>
                <div class="separator"></div>
                <p class="article-upload-time">
                  <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-clock-up" width="14" height="14" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M20.983 12.548a9 9 0 1 0 -8.45 8.436" /><path d="M19 22v-6" /><path d="M22 19l-3 -3l-3 3" /><path d="M12 7v5l2.5 2.5" /></svg> 20 Februari 2024
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer container-fluid">
      <div class="row container-fluid d-flex justify-content-around">
        <div class="col-md-2 footer-link">
          <h1><strong>SIMANJA</strong></h1>
          <h6>Sistem Informasi Manajemen Analisis Jabatan dan Beban Kerja</h6>
          <h6>BMKG</h6>
        </div>
        <div class="col-md-2">
          <h6 class="footer-link">Tautan</h6>
          <p class="footer-link">Website BMKG</p>
          <p class="footer-link">JDIH BMKG</p>
          <p class="footer-link">New SIMAS BMKG</p>
          <p class="footer-link">Dashboard Database Umum BMKG</p>
        </div>
        <div class="col-md-2">
          <h6 class="footer-link">Kontak Kami</h6>
          <div class="footer-link d-flex justify-content-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-at" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" /></svg>
            <p>simanja@bmkg.go.id</p>
          </div>
          <div class="footer-link d-flex justify-content-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-pin" width="24" height="24" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M12.783 21.326a2 2 0 0 1 -2.196 -.426l-4.244 -4.243a8 8 0 1 1 13.657 -5.62" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" /><path d="M19 18v.01" /></svg>
            <p>Jl. Angkasa I No.2 Kemayoran, Jakarta Pusat</p>
          </div>
          <div class="footer-link d-flex justify-content-start">
            <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-call" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" /></svg>
            <p>(021) 196</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "HomePage",
  data () {
    return {
      transparentNavbar: true
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      const jumbotronTop = this.$refs.jumbotron.getBoundingClientRect().top
      this.transparentNavbar = jumbotronTop >= 0
    },
    toLoginPage () {
      this.$router.push('/login')
    }
  }
};

</script>

<style scoped>
  .transparent-navbar {
    background-color: transparent !important;
    transition: background-color 0.3s ease;
  }
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
    padding: 50px 10px 0 10px;
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

  .row {
    display: flex;
    flex-wrap: wrap;
    padding: 0 4px;
  }

  .column {
    flex: 35%;
    max-width: 35%;
    padding: 0 5px;
  }

  .column div {
    margin-top: 10px;
    vertical-align: middle;
  }

  .article-box {
    background-size: cover;
    background-position: center;
    transition: transform 0.3s;
  }

  .article-box:hover {
    transform: scale(1.02);
  }
  .overlay {
    background-color: rgba(0, 0, 0, 0.4);
    position: relative;
    width: 100%;
    height: 100%;
  }

  .article-1 {
    width: 100%;
    height: 410px;
  }

  .article-2, .article-3, .article-4, .article-5 {
    width: 100%;
    height: 200px;
  }

  .article-content {
    position: absolute;
    bottom: 0;
    padding: 5px 20px;
  }

  .article-content, .footer-link {
    color: rgb(240, 240, 240);
  }

  .article-content .article-title {
    font-weight: 500;
  }

  .article-content .separator {
    border-bottom-style: solid;
    border-bottom-width: 3px;
    width: 40%;
    margin-bottom: 10px;
  }

  .article-content .article-upload-time {
    font-size: 14px;
    margin: 0;
  }

  .footer {
    margin-top: 50px;
    background-color: #343A40;
    padding: 40px 10px 30px 10px;
  }

  p.footer-link, div.footer-link {
    margin: 10px 0;
    color: rgb(210, 210, 210);
    font-size: 15px;
  }

  div.footer-link svg {
    margin-right: 5px;
  }

  div.footer-link p {
    margin: 0;
  }
</style>
