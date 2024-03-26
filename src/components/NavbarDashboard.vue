<template>
  <div class="navbar-dashboard">
    <nav class="navbar">
      <!-- Left side: Logo and Website name together -->
      <div class="left-side">
        
      </div>

      <!-- Right side: Login text -->
      <div class="right-side">
        <div class="website-name">
          Halo, {{ pengguna }}
        </div>
        <div @click="logout" class="logout">
          <button class="btn btn-danger btn-sm">
            <router-link :to="{ name: 'Home' }">
              <i class="fa fa-sign-out"></i><span> Logout</span>
            </router-link>
          </button>
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
      localStorage.clear()
    },
  },
};
</script>

<style scoped>
.navbar-dashboard {
    position: fixed;
    top: 0;
    right: 0;
    width: 100%;
    z-index: 1;
}

.navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 25px;
    background-color: #343A40;
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

.website-name {
  color: #FAFAFA;
  font-size: 15px;
}

.logout {
  margin-left: 20px;
}

.logout a { 
  text-decoration: none; 
  color: #FAFAFA;
}

</style>