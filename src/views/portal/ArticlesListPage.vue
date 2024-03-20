<template>
  <div>
    <NavbarPortal :transparent="transparentNavbar" @scroll="handleScroll"/>
    <div class="jumbotron jumbotron-fluid" ref="jumbotron">
      <div class="container" style="margin-top: 100px;">
        <h1 class="display-4">Artikel</h1>
        <p class="lead">
          Kumpulan artikel yang berkaitan dengan analisis jabatan dan beban kerja
        </p>
      </div>
    </div>
    <div v-if="articlesLoaded" class="articles container">
      <div class="row">
        <div class="col-md-4 mb-4" v-for="article in articles" :key="article.id_article">
          <div class="card">
            <div class="article-image card-img-top" :style="{ backgroundImage: `url(${backendHost}/image/${article.img})` }"></div>
            <div class="card-body">
              <router-link :to="{ name: 'ArticleDetail', params: { articleid: article.id_article } }" style="text-decoration: none;">
                <h5 class="card-title">{{ truncateText(article.title, 100) }}</h5>
              </router-link>
            </div>
            <div class="card-footer">
              <div class="d-flex justify-content-start">
                <svg xmlns="http://www.w3.org/2000/svg"  width="20"  height="20"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-event"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" /><path d="M16 3l0 4" /><path d="M8 3l0 4" /><path d="M4 11l16 0" /><path d="M8 15h2v2h-2z" /></svg>
                <h6> {{ changeDateFormat(article.created_at) }}</h6>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import axios from 'axios';
import NavbarPortal from '@/components/NavbarPortal.vue';
import Footer from '@/components/Footer.vue';

export default {
  name: "ArticlesListPage",
  components: {
    NavbarPortal,
    Footer
  },
  data () {
    return {
      backendHost: process.env.VUE_APP_BACKENDHOST,
      transparentNavbar: true,
      articles: null,
      articlesLoaded: false
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted () {
    this.loadArticles()
  },
  computed: {
    
  },
  methods: {
    handleScroll () {
      const jumbotronTop = this.$refs.jumbotron.getBoundingClientRect().top
      this.transparentNavbar = jumbotronTop >= 0
    },

    async loadArticles () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/articles`)

        this.articles = response.data.data.articles
        this.articlesLoaded = true
      } catch (error) {
        this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
        })
      }
    },

    truncateText(text, maxWord) {
      if (text.length > maxWord) {
        return text.substring(0, maxWord) + '...';
      } else {
        return text;
      }
    },

    changeDateFormat (upload_time) {
      const date = new Date(upload_time)

      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      const months =  ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

      return (`${day} ${months[month]} ${year}`)
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

.card {
  height: 450px;
  padding: 0;
}

.card-title {
  margin-top: 20px;
  color: rgb(58, 58, 58);
}

.articles {
  padding: 100px 0;
}

.article-image {
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px;
}
.card-text {
  color: rgb(121, 121, 121);
  line-height: 1.4;
}

.card-footer {
  color: rgb(108, 108, 108);
}

.card-footer h6 {
  margin: 1px 0 0 5px;
}
</style>
