import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/articles",
      name: "articles",
      component: () => import("./components/ArticlesList")
    },
    {
      path: "/articles/:id",
      name: "article-details",
      component: () => import("./components/Article")
    },
    {
      path: "/add",
      name: "add",
      component: () => import("./components/AddArticle")
    }
  ]
});