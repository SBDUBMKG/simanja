<template>
    <div class="home">
      <!-- Navbar -->
      <nav class="navbar">
        <!-- Left side: Logo and Website name together -->
        <div class="left-side">
          <div class="logo">
            <img src="@/assets/logo-BMKG.png" alt="Logo"/>
          </div>
          <div class="website-name">
            Badan Meteorologi, Klimatologi dan Geofisika
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
            <li><a href="#">BMKG Pusat</a></li>
            <li><a href="#">JDIH BMKG</a></li>
            <li><a href="#">New Simas BMKG</a></li>
            <li><a href="#">Dashboard Database Umum BMKG</a></li>
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
    export default {
        name: "HomePage",
    };
</script>
  
<style scoped>
/* Add your CSS styles here */
    .home {
        /* Define styles for the home page container */
    }
  
    .navbar {
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
        width: 20px;
        height: auto;
        margin-right: 10px;
    }
    
    .login {
      margin-left: 50px;
    }

    .main-content {
        /* Style your login text or button */
    }

    .inner-image {
      max-width: 100%; /* Ensure the image fits within its container */
      display: block; /* Remove any inline spacing issues */
      margin: 0 auto; /* Center the image horizontally within the content */
      margin-top: auto;
      object-fit: fill; /* Add margin to separate the images vertically */
      /* Add any other shared styles for the images */
  
      &:nth-child(2) {
        max-width: 100%; /* Ensure the image fits within its container */
        display: block; /* Remove any inline spacing issues */
        object-fit:fill;
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
  