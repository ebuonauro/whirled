<template>
  <div class="article-list">
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-5 col-lg-6">{{ featuredArticle.title }}</h1>
        <p class="col-lg-6">
          {{ featuredArticle.description }}
          <a class="btn btn-primary mt-3" :href="'/articles/' + featuredArticle.id" role="button"><span>Read More</span></a>  
        </p>
        
      </div>
    </div>
    <div class="list row container">
      <div class="col-lg-4">
        <div class="sticky-sidebar" v-sticky='stickyScroll'>
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="Search by title"
              v-model="title" v-filter />
            <div class="input-group-append">
              <button class="btn btn-primary" type="button"
                @click="searchTitle">
                <span>Search</span>
              </button>
            </div>
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
      </div>
      <div v-if="showAllArticles" class="col-lg-8 article-container">
        <div class="card-container row">
          <div class="card col-lg-6"
          :class="{ active: index == 2 }"
            v-for="(article, index) in articles"
            :key="index">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">{{ article.description }}</p>
            <a :href="'/articles/' + article.id" class="stretched-link btn-secondary">Read More</a>
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
      title: "",
      showAllArticles: true,
      subNavPosFromTop: null,
      currentPosFromTop: null
    };
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
    },
    filter: {
      update: function(el) {
        if (el.value.length > 2) {
          this.searchTitle(el.value);
        }
      }
    }

  },
  methods: {
    retrieveArticles() {
      ArticleDataService.getAll()
        .then(response => {
          this.articles = response.data;
          this.featuredArticle = response.data[0];
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
.jumbotron {
  background-color: $neutralLight;
  border-radius: 0;
  position: relative;
  margin-bottom: 60px;
}
.jumbotron:after {
  content: '';
  background-image: linear-gradient(135deg, $primaryBase 0%, $secondaryBase 100%);
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
  height: 20px;
}
.active {
  font-weight: 600;
}
.container {
  padding: 0;
}
.list {
  text-align: left;
  margin: auto;
}
.article-container {
  min-height: 1200px;
}
.card-container {
  justify-content: space-between;
}
.card {
  flex-basis: calc(50% - 10px);
  margin-bottom: 20px;
}

.col-lg-4 {
  margin-bottom: 30px;
}
@media (min-width: 992px) {
  .col-lg-4 {
    padding: 0 15px;
    margin-bottom: 0;
  }
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