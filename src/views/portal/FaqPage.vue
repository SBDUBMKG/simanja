<template>
  <div>
    <NavbarPortal :transparent="transparentNavbar" @scroll="handleScroll"/>
    <div class="jumbotron jumbotron-fluid" ref="jumbotron">
      <div class="container" style="margin-top: 100px;">
        <h1 class="display-4">FAQ</h1>
        <p class="lead">
          Forum Answer and Question
        </p>
      </div>
    </div>
    <div v-if="faqsLoaded" class="faq container">
      <Question
        v-for="faq in faqs"
        :key="faq.id_faq"
        :title="faq.faq_title"
        :info="faq.faq_desc"
      />
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarPortal from '@/components/NavbarPortal.vue';
import Question from '@/components/Faq.vue'
import Footer from '@/components/Footer.vue';

export default {
  name: "FaqPage",
  components: {
    NavbarPortal,
    Question,
    Footer
  },
  data () {
    return {
      backendHost: process.env.VUE_APP_BACKENDHOST,
      transparentNavbar: true,
      faqs: null,
      faqsLoaded: false
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted () {
    this.loadFaq()
  },
  computed: {
    
  },
  methods: {
    handleScroll () {
      const jumbotronTop = this.$refs.jumbotron.getBoundingClientRect().top
      this.transparentNavbar = jumbotronTop >= 0
    },

    async loadFaq () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/faq`)

        this.faqs = response.data.data.faq
        this.faqsLoaded = true
      } catch (error) {
        this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
        })
      }
    }
  }
};

</script>

<style scoped>
.jumbotron {
  background-image: url('@/assets/jumbotron-article.jpg');
  background-size: cover;
  background-position: center;
  color: #fff;
  padding: 4rem 0;
  margin-bottom: 0;
  height: 400px;
}

.jumbotron h1, .jumbotron p {
  text-align: center;
  color: #FEFEFE;
}

.faq {
  padding: 100px 0;
}
</style>
