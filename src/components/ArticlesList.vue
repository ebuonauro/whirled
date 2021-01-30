<template>
  <div class="article-list">
    <div class="jumbotron">
      <div class="container">
        <span class="label col">Featured Article</span>
        <h1 class="display-5 col-lg-6">{{ featuredArticle.title }}</h1>
        <p class="col-lg-6">
          {{ featuredArticle.description }}
          <br>
          <a class="btn btn-primary mt-3" :href="'/articles/' + featuredArticle.id" role="button"><span>Read More</span></a>  
        </p>
        
      </div>
    </div>
    <div class="list row container">
      <!-- <div class="col-lg-4">
        <div class="sticky-sidebar" v-sticky='stickyScroll'>
          <div class="input-group mb-3">
            <input type="text" class="form-control" id="filter"  placeholder="Search by title or description" v-model="filter" />
          </div>
          <ul class="list-group">
            <li class="list-group-item"
              :class="{ active: index == currentIndex }"
              v-for="(article, index) in articles"
              :key="index"
              @click="setActiveArticle(article, index)">
              {{ article.title }}
            </li>
          </ul>
        </div>
      </div> -->
      <div class="input-group mb-3">
        <input type="text" class="form-control" id="filter" placeholder="Search by title" v-model="filter" />
      </div>
      <div v-if="showAllArticles" class="col article-container">
        <div class="card-container row">
          <div class="card col-lg-4"
           v-for="article in filteredArticles" :key="article">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">{{ article.description }}</p>
            <a :href="'/articles/' + article.id" class="btn-secondary">Read More</a>
          </div>
        </div>
      </div>
      </div>
      <div v-else class="col-lg-8 article-container">
        <div class="card col-12">
          <div class="card-body">
            <h4 class="card-title">{{ currentArticle.title }}</h4>
            <h6 class="card-subtitle mb-4">{{ currentArticle.description }}</h6>
            <div class="card-text" v-html="currentArticle.article"></div>
            <a href="#" @click="refreshList" role="button">Show All Articles</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ArticleDataService from "../services/ArticleDataService";

export default {
  name: "articles-list",
  data() {
    return {
      articles: [],
      featuredArticle: "",
      lastArticleNum: null,
      currentArticle: null,
      currentIndex: -1,
      filter: "",
      showAllArticles: true,
      subNavPosFromTop: null,
      currentPosFromTop: null
    };
  },
  computed: {
    filteredArticles: function () {
      return this.articles.filter(article => {
        return article.title.toLowerCase().indexOf(this.filter.toLowerCase()) > -1
      })
    }
  },
  directives: {
    sticky: {
      inserted: function(el, binding) {
        let f = function(e) {
          if (binding.value(e, el)) {
            window.removeEventListener('scroll', f)
          }
        }
        window.addEventListener('scroll', f)
      }
    }
  },
  methods: {
    retrieveArticles() {
      ArticleDataService.getAll()
        .then(response => {
          this.articles = response.data;
          this.featuredArticle = response.data[3];
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveArticles();
      this.currentArticle = null;
      this.currentIndex = -1;
      this.showAllArticles = true;
    },

    setActiveArticle(article, index) {
      this.currentArticle = article;
      this.currentIndex = index;
      this.showAllArticles = false;
    },
    
    searchTitle() {
      ArticleDataService.findByTitle(this.title)
        .then(response => {
          this.articles = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    stickyScroll(e, el) {
      if (window.scrollY > 458 && window.innerWidth > 992) {
        el.style.position = 'fixed';
        el.style.top = '30px';
      } else {
        el.style.position = 'relative';
        el.style.top = '0px';
      }
    }

  },
  mounted() {
    this.retrieveArticles();
  }
};

</script>

<style lang="scss">
.active {
  font-weight: 600;
}
.label {
  text-transform: uppercase;
  font-weight: 500;
}
.list {
  text-align: left;
  margin: auto;
}
.article-container {
  min-height: 1200px;
}
.card {
  flex-basis: calc(33.333% - 20px);
  margin: 0 10px;
  margin-bottom: 15px;
}
.input-group {
  padding: 0 10px;
}

@media (min-width: 992px) {
  .sticky-sidebar {
    width: 290px;
    top: 0;
  }
}
@media (min-width: 1200px) {
  .sticky-sidebar {
    width: 350px;
  }
}
</style>