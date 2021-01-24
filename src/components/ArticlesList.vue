<template>
  <div class="article-list">
    <div class="jumbotron">
      <div class="container">
        <h1 class="display-5 col-6">{{ featuredArticle.title }}</h1>
        <p class="col-lg-6">{{ featuredArticle.description }}</p>
        <p class="lead col">
          <a class="btn btn-primary btn-lg" :href="'/articles/' + featuredArticle.id" role="button">Learn more</a>
        </p>
      </div>
    </div>
    <div class="list row container">
      <div class="col-md-12">
        <div class="input-group mb-3">
          <input type="text" class="form-control" placeholder="Search by title"
            v-model="title"/>
          <div class="input-group-append">
            <button class="btn btn-secondary" type="button"
              @click="searchTitle">
              Search
            </button>
          </div>
        </div>
      </div>
      <div class="col-lg-4">
        <ul class="list-group">
          <li class="list-group-item"
            :class="{ active: index == currentIndex }"
            v-for="(article, index) in articles"
            :key="index">
            <a
              :href="'/articles/' + article.id"
            >{{ article.title }}</a>
          </li>
        </ul>
      </div>
      <div class="col-lg-8 article-container">
        <div class="card-container row">
          <div class="card col-lg-6"
          :class="{ active: index == 2 }"
            v-for="(article, index) in articles"
            :key="index">
          <div class="card-body">
            <h5 class="card-title">{{ article.title }}</h5>
            <p class="card-text">{{ article.description }}</p>
            <a :href="'/articles/' + article.id" class="stretched-link">Read More</a>
          </div>
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
      currentIndex: -1,
      title: ""
    };
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
    }
  },
  mounted() {
    this.retrieveArticles();
  }
};
</script>

<style>
.jumbotron {
  background-color: #f2f2f2;
  border-radius: 0;
  position: relative;
  margin-bottom: 60px;
}
.jumbotron:after {
  content: '';
  background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: absolute;
  bottom: -20px;
  left: 0;
  width: 100%;
  height: 20px;
}
.container {
  padding: 0;
}
.list {
  text-align: left;
  margin: auto;
}
.card-container {
  justify-content: space-between;
}
.card {
  flex-basis: calc(50% - 10px);
  margin-bottom: 20px;
}
@media (min-width: 1200px) {
  .article-container {
    margin-top: -54px;
  }
  .input-group {
    max-width: 350px;
  }
}
</style>