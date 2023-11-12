<template>
    <div class="navbar">
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
            Selamat datang, Pengguna
          </div>
          <div class="logout">
            <router-link to="/">Logout</router-link>
          </div>
        </div>
      </nav>
    </div>
</template>