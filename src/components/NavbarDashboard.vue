<template>
  <div class="navbar-dashboard">
    <nav class="navbar shadow">
      <!-- Left side: Logo and Website name together -->
      <div class="left-side">
        
      </div>

      <!-- Right side: Login text -->
      <div class="right-side">
        <div class="website-name">
          Halo, {{ pengguna }}
        </div>
        <div @click="logout" class="logout">
          <router-link to="/">
            <i class="fa fa-sign-out"></i><span> Logout</span>
          </router-link>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  data() {
    return {
      pengguna: localStorage.getItem("satker"),
    };
  },
  methods: {
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('satker');
      localStorage.removeItem('idsatker');
      localStorage.removeItem('role');
      
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
  background-color: #FFFFFF; /* Set your desired background color */
  color: #00305d; /* Set your desired text color */
  font-weight: bold;
}

.left-side {
  display: flex; /* Use flexbox for left-side layout */
  align-items: center; /* Vertically center the logo and website name */
}

.right-side {
  display: flex;
  align-items: center;
  color: #555555;
}

.logout {
  margin-left: 20px;
}

.logout a { 
  text-decoration: none; 
  color: crimson;
}

</style>