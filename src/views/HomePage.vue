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
        <img src="@/assets/gambar-simanja.png" alt="gambar simanja" class="gambar-simanja" />
        <img src="@/assets/tahapan-simanja.png" alt="tahapan simanja" class="tahapan-simanja" />
      </div>
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
      background-color: #fff; /* Set your desired background color */
      color: #000; /* Set your desired text color */
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
    
    /* Add any other styles you need for the image */
    /* Additional styles for the second image */
  
    &:nth-child(2) {
      max-width: 100%; /* Ensure the image fits within its container */
      display: block; /* Remove any inline spacing issues */
      object-position: center;
      /* Add specific styles for the second image */
      /* For example, margin-top, width, or any other styles */
    }
    }
</style>
  