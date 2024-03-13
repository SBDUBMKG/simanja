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
      <div class="grid-container">
        <div class="grid-item" v-for="article in articles" :key="article.id_article">
          <div class="article-image" :style="{ backgroundImage: `url(${backendHost}/image/${article.img})` }"></div>
          <div class="card-body">
            <h5 class="card-title">{{ truncateText(article.title, 50) }}</h5>
            <p class="card-text">{{ removeHtmlTags(truncateText(article.content, 200)) }}</p>
            <router-link :to="{ name: 'ArticleDetail', params: { articleid: article.id_article } }" class="btn btn-primary">Selengkapnya</router-link>
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

    removeHtmlTags(html) {
      const tempElement = document.createElement('div');
      tempElement.innerHTML = html;
      return tempElement.textContent || tempElement.innerText || '';
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

.articles {
  padding: 100px 50px;
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 50px 30px;
  grid-auto-flow: dense;
}

.article-image {
  border-radius: 5px;
  background-size: cover;
  background-position: center;
  width: 100%;
  height: 200px;
}

.card-body {
  padding: 0;
}

.card-title {
  margin: 15px 0;
}
.card-text {
  color: rgb(121, 121, 121);
  line-height: 1.4;
}
</style>
