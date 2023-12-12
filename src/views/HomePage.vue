<template>
  <div class="home">
    <!-- Navbar -->
    <nav class="navbar-home">
      <!-- Left side: Logo and Website name together -->
      <div class="left-side">
        <div class="logo">
          <a href="/"><img src="@/assets/logo-BMKG.png" alt="Logo"/></a>
        </div>
        <div class="website-name">
            <a href="/">Badan Meteorologi, Klimatologi dan Geofisika</a>
        </div>
      </div>

      <!-- Right side: Login text -->
      <div class="right-side">
        <div class="website-name">
          Selamat datang, Pengguna
        </div>
        <div class="login">
          <router-link to="/login">Login</router-link>
        </div>
      </div>
    </nav>

    <!-- Main content -->
    <div class="main-content">
      <!-- Your main content goes here -->
      <!-- Carousel -->
      <!-- <carousel :items-to-show="1.5" :autoplay="5000" :wrap-around="true">
        <slide v-for="slide in 2" :key="slide">
          <div class="carousel__item">
            <img src="@/assets/gambar-simanja.png" alt="gambar simanja" class="inner-image" />
            <img src="@/assets/tahapan-simanja.png" alt="tahapan simanja" class="inner-image" />
          </div>          
        </slide>

        <template #addons>
          <navigation />
          <pagination />
        </template>
      </carousel> -->
      <img src="@/assets/gambar-simanja.png" alt="gambar simanja" class="inner-image" />
      <img src="@/assets/tahapan-simanja.png" alt="tahapan simanja" class="inner-image" />
    </div>

    <!-- Footer -->
    <footer class="footer">
      <!-- Column 1: Image -->
      <div class="footer-column">
        <img src="@/assets/gambar-footer.png" alt="Gambar Footer" />
      </div>

      <!-- Column 2: Text Links -->
      <div class="footer-column">
        <ul>
          <li><a class="footer-head">Link</a></li>
          <li><a href="https://www.bmkg.go.id" target="_blank">BMKG Pusat</a></li>
          <li><a href="https://jdih.bmkg.go.id" target="_blank">JDIH BMKG</a></li>
          <li><a href="https://simas.bmkg.go.id" target="_blank">New Simas BMKG</a></li>
          <li><a href="https://dataonline.bmkg.go.id" target="_blank">Dashboard Database Umum BMKG</a></li>
          <li><a href="#">FAQ</a></li>
          <!-- Add more links as needed -->
        </ul>
      </div>

      <!-- Column 3: Text Links -->
      <div class="footer-column">
        <ul>
          <li><a class="footer-head">Kontak Kami</a></li>
          <li><a>simanja@bmkg.co.id</a></li>
          <li><a><span>Jl. Angkasa I No. 2, Kemayoran, Jakarta Pusat 10720
            <br/>P.O Box 3540 Jakarta
          </span></a></li>
          <li><a><span>(021) 4246321
            <br/>(021) 4246703
          </span></a></li>
          <!-- Add more links as needed -->
        </ul>
      </div>
    </footer>
  </div>
</template>

<script>
import 'vue3-carousel/dist/carousel.css'
// import { Carousel, Slide, Navigation } from 'vue3-carousel'

export default {
  name: "HomePage",
  // components: {
  //     Carousel,
  //     Slide,
  //     Navigation,
  // },
};
</script>

<style scoped>
/* Add your CSS styles here */
  /* .home {

  } */

  .navbar-home {
    display: flex;
    justify-content: space-between; /* Spacing between left and right sides */
    align-items: center;
    padding: 10px;
    background-color: #c6d3e3; /* Set your desired background color */
    color: #00305d; /* Set your desired text color */
    font-weight: bold;
  }
  
  .left-side {
    display: flex; /* Use flexbox for left-side layout */
    align-items: center; /* Vertically center the logo and website name */
  }

  .right-side {
    display: flex; /* Use flexbox for left-side layout */
    align-items: center; /* Vertically center the logo and website name */
  }

  .logo img {
    width: 30px;
    height: auto;
    margin-right: 10px;
  }

  .website-name a {
    text-decoration: none; /* Ini menghapus garis bawah pada link */
    color: inherit; /* Ini menjaga warna link agar tetap seperti default */
  }
  
  .login {
    margin-left: 50px;
  }

  .main-content {
    margin-top: 0;
    padding: 0;
  }

  /* .carousel__item {
    min-height: 200px;
    width: flex;
    background-color: var(--vc-clr-primary);
    color: var(--vc-clr-white);
    font-size: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

   .carousel__slide {
    padding: 10px;
  }

  .carousel__prev,
  .carousel__next {
    box-sizing: content-box;
    border: 5px solid white;
  } */

  .inner-image {
    max-width: 100%; /* Ensure the image fits within its container */
    display: block; /* Remove any inline spacing issues */
    margin: 0; /* Center the image horizontally within the content */
    margin-top: 0; /* Add margin to separate the images vertically */
    /* Add any other shared styles for the images */

    &:nth-child(2) {
      max-width: 100%; /* Ensure the image fits within its container */
      display: block; /* Remove any inline spacing issues */
      /* Add specific styles for the second image */
      /* For example, margin-top, width, or any other styles */
    }
  }

  .footer {
    background-color: #c6d3e3;
    color: #00305d;
    padding: 20px 0; /* Add padding as needed */
    display: flex;
    justify-content: space-between;
    align-items: flex-start; /* Align columns at the top */
  }

  .footer-column {
    flex: 1; /* Distribute available space equally among columns */
    padding: 0 10px; /* Add horizontal padding to separate columns */
  }

  .footer img {
    max-width: 100%;
    height: auto;
  }

  ul {
    list-style: none;
    padding: 0;
  }

  ul li {
    margin-bottom: 10px; /* Add vertical spacing between links */
  }

  ul li a {
    color: #00305d;
    text-decoration: none;
  }

  .footer-head {
    font-weight: bold;
    font-size: 20px; /* Increase font size as needed */
  }

</style>
