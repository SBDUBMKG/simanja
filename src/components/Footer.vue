<template>
  <div class="footer container-fluid">
    <div class="row container-fluid d-flex justify-content-around">
      <div class="col-md-2 footer-link">
        <h1><strong>SIMANJA</strong></h1>
        <h6>Sistem Informasi Manajemen Analisis Jabatan dan Beban Kerja</h6>
        <h6>BMKG</h6>
      </div>
      <div class="col-md-3">
        <h6 class="footer-link">Tautan</h6>
        <div v-for="link in linksWebsite" :key="link.id_link">
          <a class="footer-link" :href="link.link_address" target="_blank">{{ link.link_title }}</a>
        </div>
      </div>
      <div class="col-md-3">
        <h6 class="footer-link">Kontak Kami</h6>
        <div v-if="linksContactLoaded" class="footer-link d-flex justify-content-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-at" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 12m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" /><path d="M16 12v1.5a2.5 2.5 0 0 0 5 0v-1.5a9 9 0 1 0 -5.5 8.28" /></svg>
          <p>{{ linksContact.find(link => link.link_title === "Email")?.link_address }}</p>
        </div>
        <div class="footer-link d-flex justify-content-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-map-pin-pin" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M9 11a3 3 0 1 0 6 0a3 3 0 0 0 -6 0" /><path d="M12.783 21.326a2 2 0 0 1 -2.196 -.426l-4.244 -4.243a8 8 0 1 1 13.657 -5.62" /><path d="M21.121 20.121a3 3 0 1 0 -4.242 0c.418 .419 1.125 1.045 2.121 1.879c1.051 -.89 1.759 -1.516 2.121 -1.879z" /><path d="M19 18v.01" /></svg>
          <p>{{ linksContact.find(link => link.link_title === "Alamat Kantor")?.link_address }}</p>
        </div>
        <div class="footer-link d-flex justify-content-start">
          <svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-phone-call" width="20" height="20" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 4h4l2 5l-2.5 1.5a11 11 0 0 0 5 5l1.5 -2.5l5 2v4a2 2 0 0 1 -2 2a16 16 0 0 1 -15 -15a2 2 0 0 1 2 -2" /><path d="M15 7a2 2 0 0 1 2 2" /><path d="M15 3a6 6 0 0 1 6 6" /></svg>
          <p>{{ linksContact.find(link => link.link_title === "Telepon")?.link_address }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'FooterComponent',
  data() {
    return {
      links: [],
      linksWebsite: [],
      linksWebsiteLoaded: false,
      linksContact: [],
      linksContactLoaded: false
    }
  },
  mounted () {
    this.loadLinks()
  },
  methods: {
    async loadLinks () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/links`);
        this.links = response.data.data.links
        this.linksWebsite = this.links.filter(link => link.link_type === "website")
        this.linksWebsiteLoaded = true
        this.linksContact = this.links.filter(link => link.link_type === "contact")
        this.linksContactLoaded = true
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
}
</script>

<style scoped>
.footer {
  background-color: #343A40;
  padding: 40px 10px 30px 10px;
}

.footer-link {
  margin: 10px 0;
  font-size: 15px;
  color: rgb(210, 210, 210);
}

h6.footer-link {
  color: rgb(255, 255, 255);
}

div.footer-link svg {
  margin-right: 5px;
}

div.footer-link p {
  margin: 0;
}

</style>