<template>
    <div class="navbar-dashboard">
        <nav class="navbar">
        <!-- Left side: Logo and Website name together -->
        <div class="left-side">
          <div class="logo">
            <a><img src="@/assets/logo-BMKG.png" alt="Logo"/></a>
          </div>
          <div class="website-name">
            <a>Badan Meteorologi, Klimatologi dan Geofisika</a>
          </div>
        </div>

        <!-- Right side: Login text -->
        <div class="right-side">
          <div class="website-name">
            Selamat datang, {{ pengguna }}
          </div>
          <div class="logout">
            <router-link to="/">Logout</router-link>
          </div>
        </div>
      </nav>
    </div>
</template>

<script>
export default {
  data() {
    return {
      pengguna: 'Admin',
    };
  },
  methods: {
    logout() {
      // Membersihkan token dari penyimpanan lokal atau melakukan tindakan logout lainnya
      localStorage.removeItem('token');
      
      // Contoh navigasi ke halaman login setelah logout
      // Anda harus memiliki Vue Router untuk ini
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
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

.logout {
  margin-left: 50px;
}
</style>