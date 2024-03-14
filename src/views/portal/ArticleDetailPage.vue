<template>
  <div>
    <NavbarPortal :transparent="transparentNavbar" @scroll="handleScroll"/>
    <div ref="jumbotron">
      <div v-if="articleLoaded" class="jumbotron jumbotron-fluid" :style="{ backgroundImage: `url(${backendHost}/image/${article.img})` }">
        <div class="overlay">
          <div class="container article-header">
            <h2>{{ article.title }}</h2>
            <p class="lead">
              By {{ article.creator }}, {{ changeDateFormat(article.created_at) }}
            </p>
          </div>
        </div>
      </div>
    </div>  
    <div v-if="articleLoaded" class="container d-flex justify-content-center">
      <div class="article-content col-md-8" v-html="article.content"></div>
      <aside class="col-md-4">
        <h5 class="aside-title">Artikel Lainnya</h5>
        <div class="aside-container">
          <div class="aside-content d-flex" v-for="article in articles" :key="article.id_article">
            <div class="aside-img" :style="{ backgroundImage: `url(${backendHost}/image/${article.img})` }"></div>
            <router-link class="aside-content-title" :to="{ name: 'RedirectArticle', params: { articleid: article.id_article } }">
              {{ article.title }}
            </router-link>
          </div>
        </div>
      </aside>
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
      articleId: this.$route.params.articleid,
      backendHost: process.env.VUE_APP_BACKENDHOST,
      transparentNavbar: true,
      article: null,
      articleLoaded: false,
      articles: null,
      articlesLoaded: false,
    }
  },
  created () {
    window.addEventListener('scroll', this.handleScroll)
  },
  unmounted () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  mounted () {
    Promise.all([
        this.loadArticle(),
        this.loadLatestArticles()
    ])
  },
  methods: {
    handleScroll () {
      const jumbotronTop = this.$refs.jumbotron.getBoundingClientRect().top
      this.transparentNavbar = jumbotronTop >= 0
    },

    async loadLatestArticles () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/articles/latest`)

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

    async loadArticle () {
      try {
        const response = await axios.get(`${process.env.VUE_APP_BACKENDHOST}/article/${this.articleId}`)

        this.article = response.data.data.article[0]
        this.articleLoaded = true
      } catch (error) {
        this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.response.data.message
        })
      }
    },

    changeDateFormat (upload_time) {
      const date = new Date(upload_time)

      const day = date.getDate()
      const month = date.getMonth()
      const year = date.getFullYear()

      const months =  ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"]

      return (`${day} ${months[month]} ${year}`)
    },
  }
};

</script>

<style scoped>
.jumbotron {
  position: relative;
  background-size: cover;
  background-position: center;
  color: #FEFEFE;
  margin-bottom: 0;
  padding: 0;
  height: 400px;
}

.jumbotron h1, .jumbotron p {
  color: #FEFEFE;
}

.overlay {
  height: 100%;
  width: 100%;
  background-color: rgba(0, 0, 0, 0.4);
}

.article-header {
  position: relative;
  padding-bottom: 10px;
  top: 100%;
  transform: translateY(-100%);
}

.article-content {
  padding-top: 50px;
  padding-bottom: 50px;
}

aside {
  padding-top: 50px;
  padding-left: 15px;
  margin-left: 15px;
  float: right;
}

.aside-title {
  border-bottom-color: rgb(14, 138, 0);
  border-bottom-style: solid;
  border-bottom-width: 3px;
  padding-bottom: 5px;
}

.aside-container {
  margin-top: 20px;
  padding: 0 15px 0 15px;
  background-color: rgb(228, 228, 228);
}

.aside-img {
  height: 100px;
  width: 50%;
  background-size: cover;
  background-position: center;
}

.aside-content {
  padding: 10px 0 10px 0;
  border-bottom-color: rgb(190, 190, 190);
  border-bottom-style: solid;
  border-bottom-width: 1px;
}

.aside-content-title {
  width: 50%;
  margin-left: 10px;
  font-size: 13px;
  color: #515151;
}
</style>
